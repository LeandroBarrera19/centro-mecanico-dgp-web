// Genera el mapa de cobertura a partir de docs/datos-verificados.md (§11,
// "Coordenadas para el mapa de cobertura") y lo escribe entre las marcas
// <!-- MAPA:INICIO --> y <!-- MAPA:FIN --> de cada página indicada.
// Uso: node tools/generar-mapa-cobertura.mjs public/index.html [otra.html…]
// Es reejecutable: siempre reemplaza lo que hay entre las marcas.
//
// Los puntos y los anillos van en un SVG que escala con la pantalla. Los
// nombres van en HTML encima, con tamaño fijo en px, para que nunca bajen de
// 12 px. El lado de cada nombre (derecha, izquierda, arriba, abajo) lo elige
// un acomodo simple que evita que se pisen, calculado para dos tamaños de
// mapa: el de escritorio (todas las localidades) y el más chico de celular
// (solo las 10 principales).
//
// Proyección equirectangular centrada en el taller (coordenadas de §2): a
// 80 km de radio el error frente a una proyección exacta es menor a 1 px.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const datos = fs.readFileSync(path.join(RAIZ, 'docs', 'datos-verificados.md'), 'utf8');

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
const pos = l => [C + (l.lon - TALLER[1]) * kmLon * escala, C - (l.lat - TALLER[0]) * kmLat * escala];
const pct = v => (v / LADO * 100).toFixed(2) + '%';
const f = n => n.toFixed(1);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const orden = [...localidades].sort((a, b) => a.km - b.km);

// ── Etiquetas de distancia de los anillos ────────────────────────────────────
// Van todas sobre un mismo radio, en el ángulo (de a 5°) con menos
// localidades cerca, para no tapar ningún punto.
const ANILLOS = [20, 40, 60, 80];
const kmPos = a => ANILLOS.map(km => [C + km * escala * Math.cos(a), C + km * escala * Math.sin(a)]);
let anguloKm = 0, mejorCosto = Infinity;
for (let g = 0; g < 360; g += 5) {
  const a = g * Math.PI / 180;
  const costo = kmPos(a).reduce((t, [x, y]) => t + localidades.filter(l => {
    const [px, py] = pos(l);
    return Math.hypot(px - x, py - y) < 60;
  }).length, 0);
  if (costo < mejorCosto) { mejorCosto = costo; anguloKm = a; }
}

// ── Acomodo de nombres ──────────────────────────────────────────────────────
// Ancho estimado del texto en px, con un margen a favor (Roboto 12 px y
// Montserrat 800 13 px). Los lados se prueban en orden y gana el primero sin
// choques; si todos chocan, el de menos superposición.
const LADOS = ['d', 'i', 'ar', 'ab', 'ard', 'ari', 'abd', 'abi'];
const SEP = 9; // px entre el punto y el texto
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
// celular: los nombres pueden pasar sobre los puntos chicos (no sobre otros
// nombres ni sobre las principales), y la letra es Roboto 700 de 12 px.
function acomodar(anchoMapa, lista, celular = false) {
  const k = anchoMapa / LADO;
  const ocupado = [];
  // Los puntos también ocupan lugar: el nombre no tiene que taparlos.
  for (const l of localidades) {
    if (celular && !principales.has(l.nombre)) continue;
    const [x, y] = pos(l); ocupado.push([x * k - 5, y * k - 5, x * k + 5, y * k + 5]);
  }
  ocupado.push([C * k - 14, C * k - 14, C * k + 14, C * k + 14]); // el taller
  for (const [x, y] of kmPos(anguloKm)) ocupado.push([x * k - 22, y * k - 8, x * k + 22, y * k + 8]); // "NN km"
  const lados = {};
  // Principales primero, después por distancia.
  const turno = [...lista].sort((a, b) => (principales.has(b.nombre) - principales.has(a.nombre)) || a.km - b.km);
  for (const l of turno) {
    const [x, y] = pos(l).map(v => v * k);
    const princ = principales.has(l.nombre);
    const w = l.nombre.length * (celular ? 7.4 : princ ? 9.4 : 6.9) + 6, h = princ ? 17 : 15;
    let mejor = null;
    for (const lado of LADOS) {
      const c = cajas(x, y, w, h, lado);
      // Que no se salga del mapa.
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
let html = `<div class="mapa-caja">
  <svg class="mapa" viewBox="0 0 ${LADO} ${LADO}" aria-hidden="true" focusable="false">
    <g class="mapa-anillos">\n`;
for (const km of [20, 40, 60, 80]) html += `      <circle cx="${C}" cy="${C}" r="${f(km * escala)}"${km === 80 ? ' class="mapa-borde"' : ''}/>\n`;
html += `      <path d="M${C} ${C - RADIO_PX - 14}V${C + RADIO_PX + 14}M${C - RADIO_PX - 14} ${C}H${C + RADIO_PX + 14}"/>
    </g>
    <g class="mapa-puntos">\n`;
orden.forEach((l, i) => {
  const [x, y] = pos(l);
  const p = principales.has(l.nombre);
  html += `      <circle class="mapa-punto${p ? ' es-principal' : ''}" style="--i:${i}" cx="${f(x)}" cy="${f(y)}" r="${p ? 7 : 4.5}"/>\n`;
});
html += `    </g>
    <g class="mapa-taller"><circle class="mapa-pulso" cx="${C}" cy="${C}" r="11"/><circle cx="${C}" cy="${C}" r="11"/></g>
  </svg>
  <span class="mapa-norte" style="left:50%;top:${pct(C - RADIO_PX - 30)}">N</span>\n`;
kmPos(anguloKm).forEach(([x, y], i) => {
  html += `  <span class="mapa-km" style="left:${pct(x)};top:${pct(y)}">${ANILLOS[i]} km</span>\n`;
});
orden.forEach((l, i) => {
  const [x, y] = pos(l);
  const p = principales.has(l.nombre);
  html += `  <span class="mapa-et lado-${ladoD[l.nombre].lado}${p ? ` es-principal lado-m-${ladoM[l.nombre].lado}` : ''}" style="--i:${i};left:${pct(x)};top:${pct(y)}" translate="no">${esc(l.nombre)}</span>\n`;
});
html += `</div>
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
console.log(`Etiquetas de distancia a ${Math.round(anguloKm * 180 / Math.PI)}° (localidades a menos de 60 unidades: ${mejorCosto}).`);
console.log(`Nombres con superposición: escritorio ${choquesD} de 42, celular ${choquesM} de 10.`);
