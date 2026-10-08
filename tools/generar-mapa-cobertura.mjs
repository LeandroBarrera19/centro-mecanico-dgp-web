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

// Sin carteles de rutas ni nombre del río: esos textos no están en
// datos-verificados y quedan a decisión de Ramiro (P-072). La base se dibuja
// sin rótulos.

// ── Acomodo de nombres ──────────────────────────────────────────────────────
// Cada nombre puede ir en 8 lados de su punto y a 3 distancias. Primero se
// ubica cada uno donde menos choca; después se repasan todos varias veces,
// moviendo cada uno al lugar que más baja el total de choques, hasta que no
// mejora más.
const LADOS = ['d', 'i', 'ar', 'ab', 'ard', 'ari', 'abd', 'abi'].flatMap(l => [l, l + '2', l + '3']);
function cajas(x, y, w, h, lado) {
  const sep = { 2: 16, 3: 26 }[lado.slice(-1)] || 9, l = lado.replace(/[23]$/, '');
  switch (l) {
    case 'd': return [x + sep, y - h / 2, x + sep + w, y + h / 2];
    case 'i': return [x - sep - w, y - h / 2, x - sep, y + h / 2];
    case 'ar': return [x - w / 2, y - sep - h, x + w / 2, y - sep];
    case 'ab': return [x - w / 2, y + sep, x + w / 2, y + sep + h];
    case 'ard': return [x + sep * 0.6, y - sep * 0.6 - h, x + sep * 0.6 + w, y - sep * 0.6];
    case 'ari': return [x - sep * 0.6 - w, y - sep * 0.6 - h, x - sep * 0.6, y - sep * 0.6];
    case 'abd': return [x + sep * 0.6, y + sep * 0.6, x + sep * 0.6 + w, y + sep * 0.6 + h];
    case 'abi': return [x - sep * 0.6 - w, y + sep * 0.6, x - sep * 0.6, y + sep * 0.6 + h];
  }
}
const choque = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
// Dónde va la distancia del borde punteado ("80 km"): en el ángulo con menos
// localidades cerca.
let anguloKm = 0, mejorCosto = Infinity;
for (let g = 0; g < 360; g += 5) {
  const a = g * Math.PI / 180, x = C + RADIO_PX * Math.cos(a), y = C + RADIO_PX * Math.sin(a);
  const costo = localidades.filter(l => { const [px, py] = pos(l); return Math.hypot(px - x, py - y) < 70; }).length;
  if (costo < mejorCosto) { mejorCosto = costo; anguloKm = a; }
}
const km80 = [C + RADIO_PX * Math.cos(anguloKm), C + RADIO_PX * Math.sin(anguloKm)];

// Desplazamiento CSS equivalente a cada lado de cajas(): va en --td
// (escritorio) y --tm (celular) de cada nombre.
function desplazamiento(lado) {
  const sep = { 2: 16, 3: 26 }[lado.slice(-1)] || 9, d = Math.round(sep * 0.6), l = lado.replace(/[23]$/, '');
  return {
    d: `translate(${sep}px,-50%)`, i: `translate(calc(-100% - ${sep}px),-50%)`,
    ar: `translate(-50%,calc(-100% - ${sep}px))`, ab: `translate(-50%,${sep}px)`,
    ard: `translate(${d}px,calc(-100% - ${d}px))`, ari: `translate(calc(-100% - ${d}px),calc(-100% - ${d}px))`,
    abd: `translate(${d}px,${d}px)`, abi: `translate(calc(-100% - ${d}px),${d}px)`,
  }[l];
}

// celular: solo las principales. Ningún nombre puede pasar sobre un punto
// ni sobre otro nombre.
function acomodar(anchos, lista, celular = false) {
  // Para cada ancho de mapa: cajas fijas (puntos, taller, "80 km", "N").
  const fijosPor = anchos.map(anchoMapa => {
    const k = anchoMapa / LADO, fijos = [];
    for (const l of localidades) {
      // Todos los puntos, también en celular: un nombre no puede tapar el
      // punto de otra localidad aunque su nombre no se muestre.
      // La caja del punto, a su tamaño real en esta escala, con 2 px de aire.
      const [x, y] = pos(l), r = (principales.has(l.nombre) ? 7 : 4.5) * k + 2;
      fijos.push([x * k - r, y * k - r, x * k + r, y * k + r]);
    }
    fijos.push([C * k - 14, C * k - 14, C * k + 14, C * k + 14]);
    fijos.push([km80[0] * k - 24, km80[1] * k - 9, km80[0] * k + 24, km80[1] * k + 9]);
    fijos.push([anchoMapa - 50, 0, anchoMapa, 50]); // la "N"
    return fijos;
  });
  const items = lista.map(l => {
    const princ = principales.has(l.nombre);
    // Anchos por letra algo generosos (Roboto 400 12 px, Montserrat 800 13 px,
    // Roboto 700 12 px), más el relleno de la etiqueta.
    const w = l.nombre.length * (celular ? 7.6 : princ ? 10 : 7.1) + 8, h = princ ? 18 : 16;
    const opciones = LADOS.map(lado => {
      // Una caja por ancho de mapa; el costo base suma todos los anchos.
      const cs = anchos.map(anchoMapa => { const [x, y] = pos(l).map(v => v * anchoMapa / LADO); return cajas(x, y, w, h, lado); });
      const base = cs.reduce((t, c, i) => t + ((c[0] < 0 || c[2] > anchos[i] || c[1] < 0 || c[3] > anchos[i]) ? 1e6 : 0)
        // Tapar un punto, el taller o un rótulo pesa 10 veces más que rozar otro nombre.
        + 10 * fijosPor[i].reduce((u, o) => u + choque(c, o), 0), 0);
      return { lado, cs, base };
    });
    return { l, opciones, elegido: null };
  });
  const costo = (it, op) => op.base + items.reduce((t, o) => t + (o !== it && o.elegido
    ? op.cs.reduce((u, c, i) => u + choque(c, o.elegido.cs[i]), 0) : 0), 0);
  const turno = [...items].sort((a, b) => (principales.has(b.l.nombre) - principales.has(a.l.nombre)) || a.l.km - b.l.km);
  // Repaso: mover cada nombre a su mejor lugar dados los demás, hasta que no
  // mejora más.
  const repasar = () => {
    for (let vuelta = 0; vuelta < 40; vuelta++) {
      let mejoro = false;
      for (const it of turno) {
        const actual = costo(it, it.elegido);
        const mejor = it.opciones.reduce((m, op) => costo(it, op) < costo(it, m) ? op : m);
        if (costo(it, mejor) < actual - 0.01) { it.elegido = mejor; mejoro = true; }
      }
      if (!mejoro) break;
    }
    return items.reduce((t, it) => t + costo(it, it.elegido), 0);
  };
  // Primer intento: cada nombre en su mejor lugar, principales primero.
  for (const it of turno) it.elegido = it.opciones.reduce((m, op) => costo(it, op) < costo(it, m) ? op : m);
  let mejorTotal = repasar(), mejorEleccion = items.map(it => it.elegido);
  // 40 intentos más desde puntos de partida al azar (semilla fija: el
  // resultado es siempre el mismo); queda el de menor choque total.
  let semilla = 12345;
  const azar = () => (semilla = (semilla * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let intento = 0; intento < 40 && mejorTotal > 0; intento++) {
    for (const it of items) it.elegido = it.opciones[Math.floor(azar() * it.opciones.length)];
    const total = repasar();
    if (total < mejorTotal) { mejorTotal = total; mejorEleccion = items.map(it => it.elegido); }
  }
  items.forEach((it, i) => { it.elegido = mejorEleccion[i]; });
  const lados = {};
  for (const it of items) lados[it.l.nombre] = { lado: it.elegido.lado, s: costo(it, it.elegido) };
  return lados;
}
// Escritorio: el mapa mide 582 px desde 1200 de pantalla. Celular: el acomodo
// se usa de 320 a 1199 px de pantalla, con el mapa entre 280 y ~540 px.
const ladoD = acomodar([582], localidades);
const ladoM = acomodar([280, 340, 440, 540], localidades.filter(l => principales.has(l.nombre)), true);
const choquesD = Object.values(ladoD).filter(v => v.s > 0).length;
const detalle = l => Object.entries(l).filter(([, v]) => v.s > 0).map(([n, v]) => `${n} (${Math.round(v.s)} px²)`).join(", ");
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
orden.forEach((l, i) => {
  const [x, y] = pos(l);
  const p = principales.has(l.nombre);
  const tm = p ? `;--tm:${desplazamiento(ladoM[l.nombre].lado)}` : '';
  html += `  <span class="mapa-et${p ? ' es-principal' : ''}" style="--i:${i};left:${pct(x)};top:${pct(y)};--td:${desplazamiento(ladoD[l.nombre].lado)}${tm}" translate="no">${esc(l.nombre)}</span>\n`;
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
console.log(`Base: ${(svgBase.length / 1000).toFixed(1)} KB de SVG.`);
console.log(`Nombres con superposición: escritorio ${choquesD} de 42 [${detalle(ladoD)}], celular ${choquesM} de 10 [${detalle(ladoM)}].`);
