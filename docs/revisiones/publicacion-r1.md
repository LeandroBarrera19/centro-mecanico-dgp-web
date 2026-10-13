# Control final antes de publicar (2026-10-13)

**Veredicto: APROBADO CON OBSERVACIONES**

Sin infracciones de reglas escritas. Lo que queda para Ramiro está en P-084.

## Hallazgos
1. [MENOR] El dominio centromecanicodgp.com.ar no resuelve todavía
   (§4 lo prevé). → P-084, punto 1.
2. [MENOR, no verificable sin desplegar] Sin 404.html ni _redirects: en
   Cloudflare Pages /x.html podría redirigir a /x y lo inexistente mostraría
   la portada. → P-084, punto 2.
3. [MENOR] F-07-2 se publica con el cartel legible (horario y teléfono
   distintos de los verificados). → P-084, punto 3.
4. [MENOR] 12 "Próximamente" visibles en repuestos; el brief pide no
   publicar huecos. → P-084, punto 4.
5. [MENOR] 18 JPG huérfanos (2 031 722 bytes) en public/assets/fotos.
   → P-084, punto 5.
6. [MENOR] "octubre 2025" de las reseñas no figura literal en
   datos-verificados (§6 dice que las fechas están verificadas).
7. [MENOR] JSON-LD url sin barra final vs. canonical con barra: misma URL.
8. [MENOR] P-078 punto 5 (alt) y P-057 abiertas, no bloquean.

## Verificaciones corridas
- Referencias de HTML, CSS, JSON-LD, og y twitter: 0 faltantes.
- 108 archivos de public/ por HTTP: todos 200.
- Puppeteer en las 3 páginas a 375 y 1440 px, con scroll, pestañas, flechas
  y menú: 0 respuestas ≥ 400, 0 errores, 0 imágenes rotas, sin desborde.
- Sin marcadores visibles (TODO solo en comentarios de repuestos).
- Sin hero-bg, originales, capturas ni archivos de desarrollo en public/.
- Un h1 por página; canonical, og:url, sitemap y robots coherentes, sin www.
- JSON-LD parseable, sin AggregateRating ni Review; datos iguales a §2–§5.
- target=_blank con rel=noopener; alt en todas las imágenes.
- Datos y cifras visibles coinciden con datos-verificados.
- Sin CDN, localStorage ni cookies.
