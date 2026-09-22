// Auditoría de contraste de la página servida por tools/serve.mjs (M2c, Tarea 9).
// Uso: node tools/auditar-contraste.mjs [salida.md]
//
// Solo mide: no cambia ningún color.
//
// Método, para cada estado de la página:
// 1. Toma cada elemento con texto propio, su color computado (con la opacidad
//    de sus ancestros), su tamaño, su peso y las cajas de su texto.
// 2. Saca una captura con todo el texto transparente: lo que queda debajo de
//    cada caja es el fondo real (color liso, degradado, foto o capa
//    semitransparente, todo junto).
// 3. Calcula la relación de contraste WCAG 2 del texto contra cada píxel de
//    fondo. Informa la mediana y el percentil 10 (el 10 % de fondo más
//    desfavorable). Una combinación no llega cuando el percentil 10 queda por
//    debajo del mínimo: 4,5:1 en texto normal, 3:1 en texto grande (24 px, o
//    18,66 px en negrita).
//
// Levanta el servidor y lo apaga al terminar.

import puppeteer from 'puppeteer';
import sharp from 'sharp';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL_LOCAL = 'http://localhost:3000/';
const salida = process.argv[2];

function esperar(ms) { return new Promise(r => setTimeout(r, ms)); }

async function levantarServidor() {
  const proc = spawn(process.execPath, [path.join(__dirname, 'serve.mjs')], { stdio: 'ignore' });
  for (let i = 0; i < 50; i++) {
    try { const r = await fetch(URL_LOCAL); if (r.ok) return proc; } catch {}
    await esperar(100);
  }
  proc.kill();
  throw new Error('El servidor local no respondió en el puerto 3000');
}

// Estados de la página que se miden. "ambito" limita qué textos se toman en
// cada estado, para no medir dos veces lo mismo.
const ESTADOS = [
  { id: 'inicial', anchos: [1440, 390], ambito: 'body' },
  ...[2, 3, 4, 5].map(n => ({ id: `pestaña ${n} de servicios`, anchos: [1440, 390], ambito: '.tab-panel.active', preparar: async page => { await page.evaluate(i => document.querySelectorAll('.tab-btn')[i].click(), n - 1); } })),
  { id: 'menú móvil abierto', anchos: [390], ambito: '#navMobile', preparar: async page => { await page.click('#navToggle'); } },
  { id: 'enlace de salto con foco', anchos: [1440], ambito: '.skip-link', preparar: async page => { await page.evaluate(() => scrollTo(0, 0)); await page.keyboard.press('Tab'); } },
];

function luminancia([r, g, b]) {
  const c = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
}
function contraste(a, b) {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
const hex = ([r, g, b]) => '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
const percentil = (arr, p) => { const s = [...arr].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };

async function medirEstado(browser, estado, ancho) {
  const page = await browser.newPage();
  await page.setViewport({ width: ancho, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL_LOCAL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('.fade-in').forEach(e => e.classList.add('visible'));
    // Sin transiciones, para que cada estado se mida ya asentado.
    const s = document.createElement('style');
    s.textContent = '*, *::before, *::after { transition: none !important; animation: none !important; }';
    document.head.appendChild(s);
  });
  if (estado.preparar) await estado.preparar(page);
  await esperar(600);

  const textos = await page.evaluate(ambito => {
    const raiz = document.querySelector(ambito);
    if (!raiz) return [];
    const lista = [];
    const candidatos = [raiz, ...raiz.querySelectorAll('*')];
    for (const el of candidatos) {
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'SVG', 'svg'].includes(el.tagName) || el.closest('svg')) continue;
      const nodos = [...el.childNodes].filter(n => n.nodeType === 3 && n.data.trim());
      if (!nodos.length) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      let opacidad = 1;
      for (let a = el; a; a = a.parentElement) opacidad *= parseFloat(getComputedStyle(a).opacity);
      if (opacidad < 0.01) continue;
      const cajas = [];
      for (const n of nodos) {
        const rango = document.createRange(); rango.selectNodeContents(n);
        for (const r of rango.getClientRects()) if (r.width > 1 && r.height > 1) cajas.push([r.left, r.top + scrollY, r.width, r.height]);
      }
      if (!cajas.length) continue;
      const m = cs.color.match(/rgba?\(([^)]+)\)/)[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      const seccion = el.closest('section[id], header, footer, nav, [id]');
      lista.push({
        texto: nodos.map(n => n.data).join(' ').replace(/\s+/g, ' ').trim(),
        donde: `${seccion ? (seccion.id ? '#' + seccion.id : seccion.tagName.toLowerCase()) : ''} ${el.tagName.toLowerCase()}${el.classList.length ? '.' + [...el.classList].join('.') : ''}`.trim(),
        color: m.slice(0, 3), alfa: (m[3] ?? 1) * opacidad,
        px: parseFloat(cs.fontSize), peso: parseInt(cs.fontWeight, 10), cajas,
        decorativo: !!el.closest('[aria-hidden="true"]'),
      });
    }
    return lista;
  }, estado.ambito);

  const alto = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.addStyleTag({ content: '*, *::before, *::after { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; text-decoration-color: transparent !important; caret-color: transparent !important; }' });
  await esperar(200);
  // Recorte del ancho de la ventana, sin rearmar la página: una captura de página completa se
  // ensancharía hasta un desborde horizontal y cambiaría la posición de los textos.
  const referencia = () => page.evaluate(() => [...document.querySelectorAll('h1, h2, footer')].map(e => Math.round(e.getBoundingClientRect().top + scrollY)).join(','));
  const antes = await referencia();
  const buf = await page.screenshot({ clip: { x: 0, y: 0, width: ancho, height: alto }, captureBeyondViewport: true });
  if (await referencia() !== antes) throw new Error(`La página se rearmó durante la captura (${estado.id}, ${ancho} px)`);
  await page.close();
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.width !== ancho || info.height !== alto) throw new Error(`La captura (${info.width}×${info.height}) no coincide con la página (${ancho}×${alto})`);

  const resultados = [];
  for (const t of textos) {
    const razones = [], fondos = [];
    for (const [x, y, w, h] of t.cajas) {
      const x0 = Math.max(0, Math.floor(x)), y0 = Math.max(0, Math.floor(y));
      const x1 = Math.min(info.width, Math.ceil(x + w)), y1 = Math.min(info.height, Math.ceil(y + h));
      const paso = Math.max(1, Math.floor(Math.sqrt(((x1 - x0) * (y1 - y0)) / 4000)));
      for (let j = y0; j < y1; j += paso) for (let i = x0; i < x1; i += paso) {
        const p = (j * info.width + i) * 3;
        const fondo = [data[p], data[p + 1], data[p + 2]];
        const letra = t.color.map((c, k) => t.alfa * c + (1 - t.alfa) * fondo[k]);
        razones.push(contraste(letra, fondo)); fondos.push(fondo);
      }
    }
    if (!razones.length) continue;
    const mediana = [0, 1, 2].map(k => percentil(fondos.map(f => f[k]), 0.5));
    const lum = fondos.map(luminancia);
    const variable = percentil(lum, 0.95) - percentil(lum, 0.05) > 0.02;
    const grande = t.px >= 24 || (t.px >= 18.66 && t.peso >= 700);
    resultados.push({ ...t, ancho, estado: estado.id, fondo: hex(mediana), variable, grande, minimo: grande ? 3 : 4.5, p10: percentil(razones, 0.1), mediana: percentil(razones, 0.5) });
  }
  return resultados;
}

const servidor = await levantarServidor();
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const todos = [];
try {
  for (const estado of ESTADOS) for (const ancho of estado.anchos) todos.push(...await medirEstado(browser, estado, ancho));
} finally {
  await browser.close();
  servidor.kill();
}

// Agrupar por combinación: color de texto (con su opacidad), fondo, tamaño y peso.
const grupos = new Map();
for (const r of todos) {
  const colorTexto = hex(r.color) + (r.alfa < 0.999 ? ` al ${Math.round(r.alfa * 100)} %` : '');
  const clave = `${colorTexto}|${r.variable ? 'variable' : r.fondo}|${r.px}|${r.peso}|${r.decorativo}`;
  const g = grupos.get(clave) ?? { colorTexto, fondo: r.variable ? `variable (mediana ${r.fondo})` : r.fondo, px: r.px, peso: r.peso, grande: r.grande, minimo: r.minimo, decorativo: r.decorativo, p10: Infinity, mediana: Infinity, usos: 0, ejemplo: null, anchos: new Set(), estados: new Set() };
  g.usos++; g.anchos.add(r.ancho); g.estados.add(r.estado);
  if (r.p10 < g.p10) { g.p10 = r.p10; g.mediana = r.mediana; g.ejemplo = r; }
  grupos.set(clave, g);
}
const filas = [...grupos.values()].sort((a, b) => a.p10 - b.p10);
const num = v => v.toFixed(2).replace('.', ',');
const corto = s => (s.length > 48 ? s.slice(0, 46) + '…' : s).replace(/\|/g, '\\|');
const fila = g => `| ${num(g.p10)}:1 | ${num(g.mediana)}:1 | ${num(g.minimo)}:1 | \`${g.colorTexto}\` | \`${g.fondo}\` | ${String(g.px).replace('.', ',')} px, ${g.peso}${g.grande ? ' (grande)' : ''} | «${corto(g.ejemplo.texto)}» — \`${g.ejemplo.donde}\` | ${[...g.anchos].join(', ')} | ${g.usos} |`;
const cabecera = '| Contraste (p10) | Mediana | Mínimo | Texto | Fondo | Tamaño y peso | Ejemplo — dónde | Anchos | Usos |\n|---|---|---|---|---|---|---|---|---|';
// Texto con aria-hidden="true" (propio o de un ancestro): decorativo, exento del mínimo.
const exentos = filas.filter(g => g.decorativo);
const fallan = filas.filter(g => !g.decorativo && g.p10 < g.minimo);
const pasan = filas.filter(g => !g.decorativo && g.p10 >= g.minimo);

const md = [
  `Estados medidos: ${ESTADOS.map(e => `${e.id} (${e.anchos.join(' y ')} px)`).join('; ')}.`,
  `Textos medidos: ${todos.length}. Combinaciones distintas: ${filas.length}. No llegan al mínimo: **${fallan.length}**. Exentas por decorativas: ${exentos.length}.`,
  '',
  '### Combinaciones que no llegan al mínimo, de peor a mejor',
  '',
  fallan.length ? cabecera + '\n' + fallan.map(fila).join('\n') : 'Ninguna.',
  '',
  '### Combinaciones que llegan al mínimo',
  '',
  cabecera + '\n' + pasan.map(fila).join('\n'),
  '',
  '### Exentas por decorativas (`aria-hidden="true"`)',
  '',
  exentos.length ? cabecera + '\n' + exentos.map(fila).join('\n') : 'Ninguna.',
  '',
].join('\n');

if (salida) { fs.writeFileSync(salida, md); console.log(`Resultado en ${salida}`); }
else console.log(md);
