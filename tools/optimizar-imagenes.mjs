// Genera las versiones publicadas de las imágenes a partir de sus originales.
// Uso: node tools/optimizar-imagenes.mjs
// Es reejecutable: lee siempre de los originales y sobrescribe las salidas,
// así que correrlo dos veces produce los mismos archivos.

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(RAIZ, 'assets-src');
const ASSETS = path.join(RAIZ, 'public', 'assets');

function kb(bytes) { return (bytes / 1000).toFixed(1).padStart(8) + ' KB'; }

async function generar(entrada, salida, transformar) {
  const info = await transformar(sharp(entrada)).toFile(salida);
  console.log(`${kb(fs.statSync(salida).size)}  ${info.width}×${info.height}  ${path.relative(RAIZ, salida)}`);
}

// ── Hero ─────────────────────────────────────────────────────────────────────
const HERO = path.join(SRC, 'hero-bg-original.png');
const FORMATOS_HERO = [
  { ext: 'avif', anchos: [768, 1280, 1920], aplicar: s => s.avif({ quality: 50 }) },
  { ext: 'webp', anchos: [768, 1280, 1920], aplicar: s => s.webp({ quality: 75 }) },
  { ext: 'jpg', anchos: [1280], aplicar: s => s.jpeg({ quality: 80 }) },
];

for (const f of FORMATOS_HERO) {
  for (const ancho of f.anchos) {
    await generar(HERO, path.join(ASSETS, `hero-bg-${ancho}.${f.ext}`),
      s => f.aplicar(s.resize({ width: ancho, withoutEnlargement: true })));
  }
}

// ── Logo ─────────────────────────────────────────────────────────────────────
// El de 428 px solo lo usa el "logo" del JSON-LD (Google pide al menos
// 112×112); va sin pérdida. La página muestra el de 96 px: el doble de los
// 48 px de la barra de navegación, para pantallas de densidad 2.
const LOGO = path.join(SRC, 'logo-dgp-original.png');
await generar(LOGO, path.join(ASSETS, 'logo-dgp.png'),
  s => s.png({ compressionLevel: 9, adaptiveFiltering: true }));
await generar(LOGO, path.join(ASSETS, 'logo-dgp-96.png'),
  s => s.resize(96, 96).png({ compressionLevel: 9, adaptiveFiltering: true }));
await generar(LOGO, path.join(ASSETS, 'logo-dgp-96.webp'),
  s => s.resize(96, 96).webp({ lossless: true, effort: 6 }));

// ── Imagen para compartir (F-10) ─────────────────────────────────────────────
// Placa institucional sin foto: el logo centrado, al 40 % del ancho, sobre el
// azul corporativo. Así no se publica ningún dato de terceros (ver P-003).
const PLACA = path.join(ASSETS, 'og-placa.jpg');
const logoPlaca = await sharp(LOGO).resize(480, 480).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#124B8F' } })
  .composite([{ input: logoPlaca, gravity: 'centre' }])
  .jpeg({ quality: 80 })
  .toFile(PLACA);
console.log(`${kb(fs.statSync(PLACA).size)}  1200×630  ${path.relative(RAIZ, PLACA)}`);

// ── Favicon ──────────────────────────────────────────────────────────────────
const FAVICON = path.join(SRC, 'favicon-original.png');
const PUBLIC = path.join(RAIZ, 'public');
await generar(FAVICON, path.join(PUBLIC, 'favicon-32.png'),
  s => s.resize(32, 32).png({ compressionLevel: 9, adaptiveFiltering: true }));
await generar(FAVICON, path.join(PUBLIC, 'apple-touch-icon.png'),
  s => s.resize(180, 180).png({ compressionLevel: 9, adaptiveFiltering: true }));

// ── Fotos del taller (docs/brief-fotografico.md) ─────────────────────────────
// F-07, frente del taller. Los originales son copias de WhatsApp de 1280 px
// (P-063): no se agrandan, así que el ancho mayor es 1280.
const FOTOS = path.join(SRC, 'fotos');
const SALIDA_FOTOS = path.join(ASSETS, 'fotos');
fs.mkdirSync(SALIDA_FOTOS, { recursive: true });
const FORMATOS_FOTO = [
  { ext: 'avif', aplicar: s => s.avif({ quality: 50 }) },
  { ext: 'webp', aplicar: s => s.webp({ quality: 75 }) },
  { ext: 'jpg', aplicar: s => s.jpeg({ quality: 80, mozjpeg: true }) },
];
for (const f of fs.readdirSync(FOTOS).filter(f => /-original-\d+\.jpg$/.test(f)).sort()) {
  const id = f.replace('-original', '').replace('.jpg', '');
  for (const ancho of [480, 800, 1280]) {
    for (const fmt of FORMATOS_FOTO) {
      await generar(path.join(FOTOS, f), path.join(SALIDA_FOTOS, `${id}-${ancho}.${fmt.ext}`),
        s => fmt.aplicar(s.rotate().resize({ width: ancho, withoutEnlargement: true })));
    }
  }
}

// ── Logos de las marcas que se atienden (P-062) ──────────────────────────────
// Un solo color, el azul corporativo. Los de Simple Icons (CC0) son SVG
// simples: se publican igual, con el color puesto. El de Dodge (Wikimedia
// Commons, dominio público) trae degradados y grupos que no hacen falta: se
// convierte a una imagen de su silueta, a 480 px (el doble de lo que se
// muestra), en el mismo azul.
const MARCAS = path.join(SRC, 'marcas');
const SALIDA_MARCAS = path.join(ASSETS, 'marcas');
fs.mkdirSync(SALIDA_MARCAS, { recursive: true });
for (const f of fs.readdirSync(MARCAS).filter(f => f.endsWith('.svg')).sort()) {
  const entrada = path.join(MARCAS, f);
  if (f === 'dodge.svg') {
    const silueta = await sharp(entrada, { density: 300 }).resize({ width: 480 })
      .ensureAlpha().extractChannel('alpha').raw().toBuffer({ resolveWithObject: true });
    const salida = path.join(SALIDA_MARCAS, 'dodge.webp');
    await sharp({ create: { width: silueta.info.width, height: silueta.info.height, channels: 3, background: '#124B8F' } })
      .joinChannel(silueta.data, { raw: { width: silueta.info.width, height: silueta.info.height, channels: 1 } })
      .webp({ lossless: true, effort: 6 }).toFile(salida);
    console.log(`${kb(fs.statSync(salida).size)}  ${silueta.info.width}×${silueta.info.height}  ${path.relative(RAIZ, salida)}`);
    continue;
  }
  const svg = fs.readFileSync(entrada, 'utf8')
    .replace(/<title>[^<]*<\/title>/, '')
    .replace('<svg ', '<svg fill="#124B8F" ');
  const salida = path.join(SALIDA_MARCAS, f);
  fs.writeFileSync(salida, svg);
  console.log(`${kb(fs.statSync(salida).size)}  svg  ${path.relative(RAIZ, salida)}`);
}
