// Descarga, una sola vez, la geografía de base del mapa de cobertura desde
// OpenStreetMap (API Overpass): rutas troncales y principales, ríos con
// nombre, vías del tren y límites de departamentos (nivel 5 en Argentina; el
// 6 son pedanías) y de provincia, alrededor de Villa María. La simplifica y la guarda
// en assets-src/mapa/base.json, que es lo que lee
// tools/generar-mapa-cobertura.mjs. El sitio publicado no consulta nada de
// afuera: el dibujo queda dentro del HTML.
// Uso: node tools/descargar-base-mapa.mjs
//
// Datos © colaboradores de OpenStreetMap, licencia ODbL: el mapa publicado
// lleva esa atribución.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const datos = fs.readFileSync(path.join(RAIZ, 'docs', 'datos-verificados.md'), 'utf8');
const m = datos.match(/latitud `(-?[\d.]+)`, longitud `(-?[\d.]+)`/);
const [LAT, LON] = [parseFloat(m[1]), parseFloat(m[2])];

// Recuadro: 80 km de radio más margen, para que el dibujo llene el marco.
const dLat = 1.0, dLon = 1.2;
const bbox = [LAT - dLat, LON - dLon, LAT + dLat, LON + dLon].map(v => v.toFixed(4)).join(',');
const consulta = `[out:json][timeout:180];
(
  way["highway"~"^(motorway|trunk|primary)$"](${bbox});
  way["waterway"="river"](${bbox});
  way["railway"="rail"](${bbox});
  relation["boundary"="administrative"]["admin_level"~"^(4|5)$"](${bbox});
);
out geom;`;

const servidores = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
let json = null;
for (const url of servidores) {
  try {
    const r = await fetch(url, { method: 'POST', body: 'data=' + encodeURIComponent(consulta), headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'sitio-centro-mecanico-dgp/1.0' } });
    if (!r.ok) { console.log(url, r.status); continue; }
    json = await r.json();
    console.log('Descargado de', url, '—', json.elements.length, 'elementos');
    break;
  } catch (e) { console.log(url, e.message); }
}
if (!json) throw new Error('No se pudo descargar de ningún servidor de Overpass');

// Douglas-Peucker sobre lat/lon (tolerancia en grados, ~110 m).
function simplificar(pts, tol) {
  if (pts.length < 3) return pts;
  let max = 0, idx = 0;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const d = (dx || dy) ? Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / Math.hypot(dx, dy) : Math.hypot(p[0] - a[0], p[1] - a[1]);
    if (d > max) { max = d; idx = i; }
  }
  if (max <= tol) return [a, b];
  return [...simplificar(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplificar(pts.slice(idx), tol)];
}
const TOL = 0.001;
const r5 = v => Math.round(v * 1e5) / 1e5;
const linea = g => simplificar(g.map(p => [p.lat, p.lon]), TOL).map(([a, b]) => [r5(a), r5(b)]);

const base = { fuente: 'OpenStreetMap (Overpass API), © colaboradores de OpenStreetMap, ODbL', descargado: new Date().toISOString().slice(0, 10), bbox, rutas: [], rios: [], tren: [], limites: [] };
const vistos = new Set();
for (const el of json.elements) {
  if (el.type === 'way' && el.tags.highway) base.rutas.push({ tipo: el.tags.highway, ref: el.tags.ref || '', p: linea(el.geometry) });
  else if (el.type === 'way' && el.tags.waterway && el.tags.name) base.rios.push({ nombre: el.tags.name || '', p: linea(el.geometry) });
  else if (el.type === 'way' && el.tags.railway) base.tren.push({ p: linea(el.geometry) });
  else if (el.type === 'relation') {
    for (const mb of el.members || []) {
      if (mb.type !== 'way' || mb.role !== 'outer' || !mb.geometry || vistos.has(mb.ref)) continue;
      vistos.add(mb.ref);
      base.limites.push({ nivel: +el.tags.admin_level, p: linea(mb.geometry) });
    }
  }
}
const salida = path.join(RAIZ, 'assets-src', 'mapa', 'base.json');
fs.mkdirSync(path.dirname(salida), { recursive: true });
fs.writeFileSync(salida, JSON.stringify(base));
const n = k => base[k].length + ' (' + base[k].reduce((t, x) => t + x.p.length, 0) + ' puntos)';
console.log(`rutas ${n('rutas')} · ríos ${n('rios')} · tren ${n('tren')} · límites ${n('limites')}`);
console.log('Guardado en', path.relative(RAIZ, salida), (fs.statSync(salida).size / 1000).toFixed(1), 'KB');
