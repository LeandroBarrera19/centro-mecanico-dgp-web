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

// ── Imagen para compartir (F-10) ─────────────────────────────────────────────
// Recorte centrado de 1200×630 de la imagen del hero. Se rehace cuando lleguen
// F-01 o F-07 (docs/brief-fotografico.md).
await generar(HERO, path.join(ASSETS, 'og-image.jpg'),
  s => s.resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' }).jpeg({ quality: 80 }));

// ── Logo ─────────────────────────────────────────────────────────────────────
// Sin pérdida en los dos formatos: los píxeles visibles quedan idénticos.
const LOGO = path.join(SRC, 'logo-dgp-original.png');
await generar(LOGO, path.join(ASSETS, 'logo-dgp.png'),
  s => s.png({ compressionLevel: 9, adaptiveFiltering: true }));
await generar(LOGO, path.join(ASSETS, 'logo-dgp.webp'),
  s => s.webp({ lossless: true, effort: 6 }));

// ── Favicon ──────────────────────────────────────────────────────────────────
const FAVICON = path.join(SRC, 'favicon-original.png');
const PUBLIC = path.join(RAIZ, 'public');
await generar(FAVICON, path.join(PUBLIC, 'favicon-32.png'),
  s => s.resize(32, 32).png({ compressionLevel: 9, adaptiveFiltering: true }));
await generar(FAVICON, path.join(PUBLIC, 'apple-touch-icon.png'),
  s => s.resize(180, 180).png({ compressionLevel: 9, adaptiveFiltering: true }));
