// Genera el mapa de cobertura a partir de docs/datos-verificados.md (§11,
// "Coordenadas para el mapa de cobertura") y de la geografía de base de
// assets-src/mapa/base.json (OpenStreetMap, ver tools/descargar-base-mapa.mjs),
// y lo escribe entre las marcas <!-- MAPA:INICIO --> y <!-- MAPA:FIN --> de
// cada página indicada.
// Uso: node tools/generar-mapa-cobertura.mjs public/index.html [otra.html…]
// Es reejecutable: siempre reemplaza lo que hay entre las marcas.
//
// La base (rutas, ríos, tren, límites) y los puntos van en un SVG que escala
// con la pantalla. Los nombres van en HTML encima, con tamaño fijo en px, para
// que nunca bajen de 12 px. El lado de cada nombre lo elige un acomodo simple
// que evita que se pisen, calculado para dos tamaños de mapa: escritorio
// (todas las localidades) y celular (solo las 10 principales).
//
// Proyección equirectangular centrada en el taller (coordenadas de §2): a
// 80 km de radio el error frente a una proyección exacta es menor a 1 px.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const datos = fs.readFileSync(path.join(RAIZ, 'docs', 'datos-verificados.md'), 'utf8');
const base = JSON.parse(fs.readFileSync(path.join(RAIZ, 'assets-src', 'mapa', 'base.json'), 'utf8'));

const m = datos.match(/latitud `(-?[\d.]+)`, longitud `(-?[\d.]+)`/);
if (!m) throw new Error('No encontré las coordenadas del taller en §2');
const TALLER = [parseFloat(m[1]), parseFloat(m[2])];

const ini = datos.indexOf('### Coordenadas para el mapa de cobertura');
const tabla = datos.slice(ini, datos.indexOf('\n## ', ini));
const localidades = [...tabla.matchAll(/^\| ([^|]+?) \| [^|]+ \| (-[\d.]+) \| (-[\d.]+) \| ([\d,]+) \| \w+ \|$/gm)]
  .map(x => ({ nombre: x[1], lat: +x[2], lon: +x[3], km: +x[4].replace(',', '.') }));
if (localidades.length !== 42) throw new Error(`Esperaba 42 localidades y encontré ${localidades.length}`);

const iniTop = datos.indexOf('**Localidades con más clientes**');
const principales = new Set([...datos.slice(iniTop, datos.indexOf('"Córdoba" figura', iniTop))
  .matchAll(/^\| \d+ \| ([^|]+?) \|/gm)].map(x => x[1]));
if (principales.size !== 10) throw new Error(`Esperaba 10 principales y encontré ${principales.size}`);

// Geometría en unidades del viewBox.
const LADO = 760, C = LADO / 2, RADIO_KM = 80, RADIO_PX = 330;
const escala = RADIO_PX / RADIO_KM;
const kmLat = 111.32, kmLon = 111.32 * Math.cos(TALLER[0] * Math.PI / 180);
const proy = (lat, lon) => [C + (lon - TALLER[1]) * kmLon * escala, C - (lat - TALLER[0]) * kmLat * escala];
const pos = l => proy(l.lat, l.lon);
const pct = v => (v / LADO * 100).toFixed(2) + '%';
const f = n => n.toFixed(1);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const orden = [...localidades].sort((a, b) => a.km - b.km);

// ── Base: proyectar, recortar al marco, simplificar a escala de pantalla ────
const MARGEN = 20;
const dentro = ([x, y]) => x > -MARGEN && x < LADO + MARGEN && y > -MARGEN && y < LADO + MARGEN;
function dp(pts, tol) {
  if (pts.length < 3) return pts;
  let max = 0, idx = 0; const [a, b] = [pts[0], pts[pts.length - 1]];
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i], dx = b[0] - a[0], dy = b[1] - a[1];
    const d = (dx || dy) ? Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / Math.hypot(dx, dy) : Math.hypot(p[0] - a[0], p[1] - a[1]);
    if (d > max) { max = d; idx = i; }
  }
  return max <= tol ? [a, b] : [...dp(pts.slice(0, idx + 1), tol).slice(0, -1), ...dp(pts.slice(idx), tol)];
}
// Corta cada línea en los tramos que caen dentro del marco (con margen).
function tramos(p) {
  const pts = p.map(([la, lo]) => proy(la, lo)), out = [];
  let actual = [];
  pts.forEach((q, i) => {
    const ok = dentro(q) || (i && dentro(pts[i - 1])) || (i < pts.length - 1 && dentro(pts[i + 1]));
    if (ok) actual.push(q); else if (actual.length) { out.push(actual); actual = []; }
  });
  if (actual.length) out.push(actual);
  return out.filter(t => t.length > 1);
}
function trazo(lineas, tol = 0.9) {
  return lineas.flatMap(tramos).map(t => dp(t, tol)).filter(t => t.length > 1)
    .map(t => 'M' + t.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')).join('');
}
const rutasTroncales = base.rutas.filter(r => r.tipo === 'motorway' || r.tipo === 'trunk').map(r => r.p);
const rutasPrimarias = base.rutas.filter(r => r.tipo === 'primary').map(r => r.p);
const rioTercero = base.rios.filter(r => r.nombre === 'Río Tercero').map(r => r.p);
const otrosRios = base.rios.filter(r => r.nombre !== 'Río Tercero').map(r => r.p);
const limitesDepto = base.limites.filter(l => l.nivel === 5).map(l => l.p);
const limitesProv = base.limites.filter(l => l.nivel === 4).map(l => l.p);
const tren = base.tren.map(t => t.p);

// Carteles de las rutas nacionales que cruzan la zona, y el nombre del río:
// en el punto de su recorrido más cercano a una distancia dada del taller,
// del lado con menos localidades.
function puntoSobre(lineas, distanciaPx, evitar) {
  let mejor = null;
  for (const l of lineas) for (const t of tramos(l)) for (const [x, y] of t) {
    const d = Math.hypot(x - C, y - C);
    if (Math.abs(d - distanciaPx) > 30 || !dentro([x, y])) continue;
    const cerca = localidades.filter(lo => { const [px, py] = pos(lo); return Math.hypot(px - x, py - y) < 45; }).length
      + evitar.filter(([ex, ey]) => Math.hypot(ex - x, ey - y) < 90).length * 5;
    if (!mejor || cerca < mejor.cerca) mejor = { x, y, cerca };
  }
  return mejor;
}
const usados = [];
const cartel = (ref, distanciaKm) => {
  const lineas = base.rutas.filter(r => r.ref.split(';').map(s => s.trim()).includes(ref)).map(r => r.p);
  const p = puntoSobre(lineas, distanciaKm * escala, usados);
  if (p) usados.push([p.x, p.y]);
  return p;
};
const carteles = [];
for (const [ref, texto, km] of [['RN9', 'RN 9', 44], ['RN158', 'RN 158', 40]]) {
  const p1 = cartel(ref, km);
  if (!p1) continue;
  carteles.push({ texto, p: p1, extra: false });
  // El segundo, del otro lado de Villa María: se descartan los puntos a
  // menos de 120° del primero.
  const a1 = Math.atan2(p1.y - C, p1.x - C);
  const lineas = base.rutas.filter(r => r.ref.split(';').map(x => x.trim()).includes(ref)).map(r => r.p);
  let mejor = null;
  for (const l of lineas) for (const t of tramos(l)) for (const [x, y] of t) {
    const d = Math.hypot(x - C, y - C), a = Math.atan2(y - C, x - C);
    const dif = Math.abs(((a - a1 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);
    if (Math.abs(d - km * escala) > 30 || dif < 2 * Math.PI / 3 || !dentro([x, y])) continue;
    const cerca = localidades.filter(lo => { const [px, py] = pos(lo); return Math.hypot(px - x, py - y) < 45; }).length;
    if (!mejor || cerca < mejor.cerca) mejor = { x, y, cerca };
  }
  if (mejor) { carteles.push({ texto, p: mejor, extra: true }); usados.push([mejor.x, mejor.y]); }
}
const rioPunto = puntoSobre(rioTercero, 55 * escala, usados);
if (rioPunto) usados.push([rioPunto.x, rioPunto.y]);

// ── Acomodo de nombres ──────────────────────────────────────────────────────
const LADOS = ['d', 'i', 'ar', 'ab', 'ard', 'ari', 'abd', 'abi'];
const SEP = 9;
function cajas(x, y, w, h, lado) {
  switch (lado) {
    case 'd': return [x + SEP, y - h / 2, x + SEP + w, y + h / 2];
    case 'i': return [x - SEP - w, y - h / 2, x - SEP, y + h / 2];
    case 'ar': return [x - w / 2, y - SEP - h, x + w / 2, y - SEP];
    case 'ab': return [x - w / 2, y + SEP, x + w / 2, y + SEP + h];
    case 'ard': return [x + SEP * 0.6, y - SEP * 0.6 - h, x + SEP * 0.6 + w, y - SEP * 0.6];
    case 'ari': return [x - SEP * 0.6 - w, y - SEP * 0.6 - h, x - SEP * 0.6, y - SEP * 0.6];
    case 'abd': return [x + SEP * 0.6, y + SEP * 0.6, x + SEP * 0.6 + w, y + SEP * 0.6 + h];
    case 'abi': return [x - SEP * 0.6 - w, y + SEP * 0.6, x - SEP * 0.6, y + SEP * 0.6 + h];
  }
}
const choque = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
// Dónde va la distancia del borde punteado ("80 km"): en el ángulo con menos
// localidades cerca.
let anguloKm = 0, mejorCosto = Infinity;
for (let g = 0; g < 360; g += 5) {
  const a = g * Math.PI / 180, x = C + RADIO_PX * Math.cos(a), y = C + RADIO_PX * Math.sin(a);
  const costo = localidades.filter(l => { const [px, py] = pos(l); return Math.hypot(px - x, py - y) < 70; }).length
    + usados.filter(([ux, uy]) => Math.hypot(ux - x, uy - y) < 70).length;
  if (costo < mejorCosto) { mejorCosto = costo; anguloKm = a; }
}
const km80 = [C + RADIO_PX * Math.cos(anguloKm), C + RADIO_PX * Math.sin(anguloKm)];

function acomodar(anchoMapa, lista, celular = false) {
  const k = anchoMapa / LADO;
  const ocupado = [];
  for (const l of localidades) {
    if (celular && !principales.has(l.nombre)) continue;
    const [x, y] = pos(l); ocupado.push([x * k - 5, y * k - 5, x * k + 5, y * k + 5]);
  }
  ocupado.push([C * k - 14, C * k - 14, C * k + 14, C * k + 14]);
  ocupado.push([km80[0] * k - 24, km80[1] * k - 9, km80[0] * k + 24, km80[1] * k + 9]);
  for (const c of carteles) if (!celular || !c.extra) ocupado.push([c.p.x * k - 28, c.p.y * k - 12, c.p.x * k + 28, c.p.y * k + 12]);
  if (rioPunto) ocupado.push([rioPunto.x * k - 42, rioPunto.y * k - 22, rioPunto.x * k + 42, rioPunto.y * k]);
  const lados = {};
  const turno = [...lista].sort((a, b) => (principales.has(b.nombre) - principales.has(a.nombre)) || a.km - b.km);
  for (const l of turno) {
    const [x, y] = pos(l).map(v => v * k);
    const princ = principales.has(l.nombre);
    const w = l.nombre.length * (celular ? 7.4 : princ ? 9.4 : 6.9) + 6, h = princ ? 17 : 15;
    let mejor = null;
    for (const lado of LADOS) {
      const c = cajas(x, y, w, h, lado);
      const fuera = (c[0] < 0 || c[2] > anchoMapa || c[1] < 0 || c[3] > anchoMapa) ? 1e6 : 0;
      const s = fuera + ocupado.reduce((t, o) => t + choque(c, o), 0);
      if (!mejor || s < mejor.s) mejor = { lado, c, s };
      if (s === 0) break;
    }
    lados[l.nombre] = mejor;
    ocupado.push(mejor.c);
  }
  return lados;
}
const ESCRITORIO = 582, CELULAR = 280;
const ladoD = acomodar(ESCRITORIO, localidades);
const ladoM = acomodar(CELULAR, localidades.filter(l => principales.has(l.nombre)), true);
const choquesD = Object.values(ladoD).filter(v => v.s > 0).length;
const choquesM = Object.values(ladoM).filter(v => v.s > 0).length;

// ── Marcado ─────────────────────────────────────────────────────────────────
const svgBase = `    <defs><clipPath id="mapa-marco"><rect width="${LADO}" height="${LADO}"/></clipPath></defs>
    <g clip-path="url(#mapa-marco)">
      <rect class="mapa-tierra" width="${LADO}" height="${LADO}"/>
      <path class="mapa-limite-depto" d="${trazo(limitesDepto, 2)}"/>
      <path class="mapa-limite-prov" d="${trazo(limitesProv, 2)}"/>
      <path class="mapa-rio" d="${trazo(otrosRios, 1.6)}"/>
      <path class="mapa-rio mapa-rio--principal" d="${trazo(rioTercero, 1.2)}"/>
      <path class="mapa-tren" d="${trazo(tren, 1.6)}"/>
      <path class="mapa-ruta-borde" d="${trazo(rutasPrimarias, 1.6)}"/>
      <path class="mapa-ruta" d="${trazo(rutasPrimarias, 1.6)}"/>
      <path class="mapa-ruta-borde mapa-ruta--troncal" d="${trazo(rutasTroncales, 1.4)}"/>
      <path class="mapa-ruta mapa-ruta--troncal" d="${trazo(rutasTroncales, 1.4)}"/>
      <circle class="mapa-radio" cx="${C}" cy="${C}" r="${RADIO_PX}"/>
    </g>`;
let html = `<div class="mapa-caja">
  <svg class="mapa" viewBox="0 0 ${LADO} ${LADO}" aria-hidden="true" focusable="false">
${svgBase}
    <g class="mapa-puntos">\n`;
orden.forEach((l, i) => {
  const [x, y] = pos(l);
  const p = principales.has(l.nombre);
  html += `      <circle class="mapa-punto${p ? ' es-principal' : ''}" style="--i:${i}" cx="${f(x)}" cy="${f(y)}" r="${p ? 7 : 4.5}"/>\n`;
});
html += `    </g>
    <g class="mapa-taller"><circle class="mapa-pulso" cx="${C}" cy="${C}" r="11"/><circle cx="${C}" cy="${C}" r="11"/></g>
  </svg>
  <span class="mapa-norte" style="left:${pct(LADO - 34)};top:${pct(34)}">N</span>
  <span class="mapa-km" style="left:${pct(km80[0])};top:${pct(km80[1])}">${RADIO_KM} km</span>\n`;
for (const c of carteles) html += `  <span class="mapa-cartel${c.extra ? ' mapa-cartel--extra' : ''}" style="left:${pct(c.p.x)};top:${pct(c.p.y)}" translate="no">${c.texto}</span>\n`;
if (rioPunto) html += `  <span class="mapa-rio-nombre" style="left:${pct(rioPunto.x)};top:${pct(rioPunto.y)}" translate="no">Río Tercero</span>\n`;
orden.forEach((l, i) => {
  const [x, y] = pos(l);
  const p = principales.has(l.nombre);
  html += `  <span class="mapa-et lado-${ladoD[l.nombre].lado}${p ? ` es-principal lado-m-${ladoM[l.nombre].lado}` : ''}" style="--i:${i};left:${pct(x)};top:${pct(y)}" translate="no">${esc(l.nombre)}</span>\n`;
});
html += `  <small class="mapa-atribucion">© colaboradores de <span translate="no">OpenStreetMap</span></small>
</div>
<ul class="mapa-lista" translate="no">
${orden.map(l => `  <li>${esc(l.nombre)}</li>`).join('\n')}
</ul>`;

for (const rel of process.argv.slice(2)) {
  const archivo = path.resolve(rel);
  let doc = fs.readFileSync(archivo, 'utf8');
  const a = doc.indexOf('<!-- MAPA:INICIO -->'), b = doc.indexOf('<!-- MAPA:FIN -->');
  if (a < 0 || b < 0) throw new Error(`Faltan las marcas MAPA en ${rel}`);
  doc = doc.slice(0, a) + '<!-- MAPA:INICIO -->\n' + html + '\n' + doc.slice(b);
  fs.writeFileSync(archivo, doc);
  console.log(`Mapa escrito en ${rel}: ${localidades.length} localidades, ${principales.size} principales.`);
}
console.log(`Base: ${(svgBase.length / 1000).toFixed(1)} KB de SVG · carteles: ${carteles.map(c => c.texto).join(', ')} · río: ${rioPunto ? 'sí' : 'no'}`);
console.log(`Nombres con superposición: escritorio ${choquesD} de 42, celular ${choquesM} de 10.`);
