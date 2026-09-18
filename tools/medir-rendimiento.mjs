// Mide el peso y el LCP de la página servida por tools/serve.mjs.
// Uso: node tools/medir-rendimiento.mjs [archivo-salida.json]
// Levanta el servidor, mide cada configuración sin caché y en un contexto
// limpio, y lo apaga al terminar. Se usa en las Tareas 1 y 7 de M2b para
// medir las dos veces en las mismas condiciones.

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL_LOCAL = 'http://localhost:3000/';
const HOST_LOCAL = 'localhost:3000';
const RONDAS = 3;

const CONFIGURACIONES = [
  { id: '1440', viewport: { width: 1440, height: 900, deviceScaleFactor: 1 } },
  { id: '390', viewport: { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true } },
  { id: '390-dpr3', viewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true } },
];

// Perfil de red "4G lento" de Lighthouse para móvil: 150 ms de latencia,
// 1,6 Mbit/s de bajada, 750 kbit/s de subida.
const REDES = [
  { id: 'sin-limite', condiciones: null },
  { id: '4g-lento', condiciones: { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 } },
];

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

async function medirUnaVez(browser, config, red) {
  const contexto = await browser.createBrowserContext();
  const page = await contexto.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport(config.viewport);

  const cdp = await page.createCDPSession();
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  if (red.condiciones) await cdp.send('Network.emulateNetworkConditions', red.condiciones);

  const recursos = new Map();
  cdp.on('Network.requestWillBeSent', e => {
    if (e.request.url.startsWith('data:')) return;
    recursos.set(e.requestId, { url: e.request.url, tipo: e.type, estado: null, bytes: 0 });
  });
  cdp.on('Network.responseReceived', e => {
    const r = recursos.get(e.requestId); if (r) { r.estado = e.response.status; r.tipo = e.type; }
  });
  cdp.on('Network.loadingFinished', e => {
    const r = recursos.get(e.requestId); if (r) r.bytes = e.encodedDataLength;
  });
  cdp.on('Network.loadingFailed', e => {
    const r = recursos.get(e.requestId); if (r) r.fallo = e.errorText;
  });

  await page.evaluateOnNewDocument(() => {
    window.__lcp = null;
    new PerformanceObserver(lista => {
      for (const e of lista.getEntries()) {
        const el = e.element;
        window.__lcp = {
          ms: e.startTime,
          tamano: e.size,
          elemento: el ? el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\s+/).join('.') : '') : null,
          url: e.url || null,
        };
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  await page.goto(URL_LOCAL, { waitUntil: 'load', timeout: 180000 });
  await page.waitForNetworkIdle({ idleTime: 1500, timeout: 180000 });
  await esperar(500);
  const lcp = await page.evaluate(() => window.__lcp);
  await contexto.close();

  const lista = [...recursos.values()].map(r => {
    const u = new URL(r.url);
    return { ...r, externo: u.host !== HOST_LOCAL, dominio: u.host };
  }).sort((a, b) => b.bytes - a.bytes);

  return {
    lcp,
    peticiones: lista.length,
    externas: lista.filter(r => r.externo).length,
    dominiosExternos: [...new Set(lista.filter(r => r.externo).map(r => r.dominio))],
    bytesTotales: lista.reduce((s, r) => s + r.bytes, 0),
    recursos: lista,
  };
}

function mediana(nums) {
  const s = [...nums].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

const salida = process.argv[2];
const servidor = await levantarServidor();
const browser = await puppeteer.launch({
  headless: true,
  // Sin aislamiento de sitios, para que las peticiones de un iframe externo
  // aparezcan en la misma sesión de red que la página.
  args: ['--no-sandbox', '--disable-features=site-per-process,IsolateOrigins'],
});

const resultados = {};
try {
  for (const config of CONFIGURACIONES) {
    for (const red of REDES) {
      const rondas = red.condiciones ? 1 : RONDAS;
      const corridas = [];
      for (let i = 0; i < rondas; i++) corridas.push(await medirUnaVez(browser, config, red));
      const clave = `${config.id}/${red.id}`;
      resultados[clave] = {
        rondas,
        lcpMs: corridas.map(c => Math.round(c.lcp?.ms ?? NaN)),
        lcpMedianaMs: Math.round(mediana(corridas.map(c => c.lcp?.ms ?? NaN))),
        lcpElemento: corridas[0].lcp?.elemento,
        lcpUrl: corridas[0].lcp?.url,
        ...corridas[0],
        lcp: undefined,
      };
      const r = resultados[clave];
      console.log(`${clave}: ${r.bytesTotales} B, ${r.peticiones} peticiones (${r.externas} externas), LCP ${r.lcpMedianaMs} ms [${r.lcpMs.join(', ')}] en ${r.lcpElemento}${r.lcpUrl ? ' ' + r.lcpUrl : ''}`);
    }
  }
} finally {
  await browser.close();
  servidor.kill();
}

for (const [clave, r] of Object.entries(resultados)) {
  if (!clave.endsWith('/sin-limite')) continue;
  console.log(`\n## ${clave} — ${r.bytesTotales} B`);
  for (const x of r.recursos) {
    console.log(`${String(x.bytes).padStart(9)}  ${x.estado ?? '-'}  ${x.tipo ?? '-'}  ${x.url.length > 110 ? x.url.slice(0, 110) + '…' : x.url}${x.fallo ? '  FALLO ' + x.fallo : ''}`);
  }
}

if (salida) fs.writeFileSync(salida, JSON.stringify(resultados, null, 2));
