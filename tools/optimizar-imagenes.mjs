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
