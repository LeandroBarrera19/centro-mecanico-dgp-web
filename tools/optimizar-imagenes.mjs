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
