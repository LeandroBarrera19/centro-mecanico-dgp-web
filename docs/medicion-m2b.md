# Medición de rendimiento — M2b

"Antes" se midió el 2026-09-18 sobre el commit `65258f9`, en la Tarea 1.
"Después" se midió el 2026-09-18 sobre el commit `fa95e91`, en la Tarea 7, con
la misma herramienta y las mismas condiciones.
"Después, logo de 96 px" repite la medición de la Tarea 7 el mismo día, en las
mismas condiciones, con el logo servido al tamaño en que se muestra (commit
"Logo al tamano en que se muestra", tarea agregada a M2b después del cierre).
Es la medición vigente.

## Cómo se mide

Herramienta: `node tools/medir-rendimiento.mjs [salida.json]`. Levanta
`tools/serve.mjs`, abre la página con Puppeteer (Chrome 147, sin interfaz) y la
apaga al terminar.

- **Sin caché**, cada carga en un contexto de navegador limpio.
- **Primera carga, sin scroll**: se espera al evento `load` y a 1,5 s sin
  actividad de red. El iframe del mapa lleva `loading="lazy"` y está lejos del
  primer pantallazo, así que en esta carga no se pide.
- **Bytes transferidos**: `encodedDataLength` de cada petición (cuerpo más
  cabeceras), tal como sale por la red. `tools/serve.mjs` no comprime; en
  Cloudflare Pages el HTML va a viajar comprimido y pesar menos que acá.
- **LCP**: `PerformanceObserver` de tipo `largest-contentful-paint`, con
  `buffered: true`, leído al terminar la carga.
- **Configuraciones**: 1440×900 y 390×844, las dos con densidad de píxeles 1.
  Se agregó una tercera, 390×844 con densidad 3 (la de un celular actual), que
  la spec no pide: con `srcset`, la densidad cambia qué imagen baja el
  navegador.
- **Red**: "sin límite" es la red local, con tres cargas (se informa la
  mediana del LCP). "4G lento" es el perfil de Lighthouse para móvil (150 ms de
  latencia, 1,6 Mbit/s de bajada, 750 kbit/s de subida), con una carga. Se
  agregó porque en red local una imagen de 5,5 MB baja en milisegundos y el LCP
  sin límite no refleja lo que ve un celular. Las peticiones a Google Fonts
  salen por internet real en los dos casos.
- 1 KB = 1000 bytes, igual que el objetivo de 500 KB de `CLAUDE.md` §5.

## Resumen

| Medida | Configuración | Antes | Después | Después, logo de 96 px |
|---|---|---|---|---|
| Bytes transferidos | 1440 | 5.860.374 (5.860 KB) | 385.230 (385 KB), −93,4 % | 318.629 (319 KB), −94,6 % |
| Bytes transferidos | 390 | 5.860.374 (5.860 KB) | 297.393 (297 KB), −94,9 % | **230.792 (231 KB), −96,1 %** |
| Bytes transferidos | 390, densidad 3 | 5.860.374 (5.860 KB) | 334.075 (334 KB), −94,3 % | 267.474 (267 KB), −95,4 % |
| Peticiones | todas | 8 | 7 | 7 |
| Peticiones a dominios externos | todas | 4 (`fonts.googleapis.com` 1, `fonts.gstatic.com` 3) | 0 | 0 |
| LCP, sin límite (mediana de 3) | 1440 | 896 ms (1756 / 860 / 896) | 788 ms (1756 / 576 / 788) | 556 ms (1576 / 464 / 556) |
| LCP, sin límite (mediana de 3) | 390 | 768 ms (768 / 640 / 772) | 572 ms (804 / 544 / 572) | 464 ms (492 / 456 / 464) |
| LCP, sin límite (mediana de 3) | 390, densidad 3 | 772 ms (772 / 792 / 744) | 660 ms (712 / 564 / 660) | 472 ms (576 / 472 / 388) |
| LCP, 4G lento | 1440 | 28.344 ms | 684 ms (elemento: `h1`, ver nota) | 644 ms (`h1`) |
| LCP, 4G lento | 390 | 28.296 ms | 648 ms (elemento: `p`, ver nota) | 636 ms (`p`) |
| LCP, 4G lento | 390, densidad 3 | 28.188 ms | 644 ms (elemento: `p`, ver nota) | 608 ms (`p`) |
| Elemento LCP | todas | `div.hero-bg` (`assets/hero-bg.png`) | sin límite: `img` del hero; 4G lento: texto | igual que "después" |
| Imagen del hero descargada, 4G lento | 1440 | ≈ 28 s (era el propio elemento LCP) | 2.013 ms (`hero-bg-1920.avif`) | 1.685 ms |
| Imagen del hero descargada, 4G lento | 390 | ≈ 28 s (era el propio elemento LCP) | 1.105 ms (`hero-bg-768.avif`) | 1.070 ms |

En las tres mediciones, la primera carga de la serie a 1440 (1756 y 1576 ms) es
la del navegador recién abierto. Con red local, las diferencias de LCP entre
"después" y "después, logo de 96 px" son en parte ruido de la medición. Con
4G lento, la foto del hero termina de bajar antes porque ya no compite con los
80 KB del logo.

**Nota sobre el LCP con 4G lento.** Antes, el elemento LCP era la foto del hero
en las dos redes. Después, con 4G lento, el primer texto (`h1` o un `p`) se
pinta antes de que llegue la foto, y Chrome no registra la foto como candidata
nueva cuando se pinta después. Por eso el LCP "después" con 4G lento mide un
texto, y no se puede comparar directamente con los 28 s de antes. Para comparar
la foto con la foto están las dos filas de "Imagen del hero descargada"
(`responseEnd` de la Resource Timing API, en una carga aparte con el mismo
perfil de red): pasó de unos 28 s a 1,1 s en el celular y a 2,0 s en
escritorio.

**Objetivo de 500 KB en móvil (`CLAUDE.md` §5): cumplido.** Medición vigente:
231 KB a 390 px con densidad 1 y 267 KB con densidad 3. El recurso más pesado
en móvil es el propio `index.html` (80 KB sin comprimir; Cloudflare lo va a
servir comprimido), seguido de `roboto-latin.woff2` (43 KB). El logo pasó de
80 KB a 13 KB.

## Desglose por recurso — antes

Idéntico en las tres configuraciones: con `background-image` el navegador baja
la misma imagen en cualquier pantalla.

| Bytes | Tipo | Recurso |
|---|---|---|
| 5.513.964 | imagen | `assets/hero-bg.png` |
| 133.629 | imagen | `assets/logo-dgp.png` |
| 73.370 | documento | `index.html` |
| 43.168 | tipografía | `fonts.gstatic.com` Roboto (`KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBA.woff2`) |
| 37.988 | tipografía | `fonts.gstatic.com` Montserrat (`JTUSjIg1_i6t8kCHKm459Wlhyw.woff2`) |
| 35.168 | ícono | `favicon.png` |
| 20.585 | tipografía | `fonts.gstatic.com` Roboto (`KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMaxKUBGEe.woff2`) |
| 2.502 | hoja de estilo | `fonts.googleapis.com/css2?family=Montserrat…&family=Roboto…` |
| **5.860.374** | | **Total** |

## Desglose por recurso — después

Con `<picture>` y `srcset` cada pantalla baja una sola versión de la foto:
la que corresponde a su ancho y su densidad.

| Bytes | Tipo | Recurso | 1440 | 390 | 390, densidad 3 |
|---|---|---|---|---|---|
| 119.969 | imagen | `assets/hero-bg-1920.avif` | sí | | |
| 68.814 | imagen | `assets/hero-bg-1280.avif` | | | sí |
| 32.132 | imagen | `assets/hero-bg-768.avif` | | sí | |
| 80.059 | documento | `index.html` | sí | sí | sí |
| 79.909 | imagen | `assets/logo-dgp.webp` | sí | sí | sí |
| 43.306 | tipografía | `assets/fonts/roboto-latin.woff2` | sí | sí | sí |
| 38.126 | tipografía | `assets/fonts/montserrat-latin.woff2` | sí | sí | sí |
| 20.726 | tipografía | `assets/fonts/roboto-symbols.woff2` | sí | sí | sí |
| 3.135 | ícono | `favicon-32.png` | sí | sí | sí |
| | | **Total** | **385.230** | **297.393** | **334.075** |

Los `latin-ext` de las dos familias no se piden: la página no tiene ningún
carácter de ese rango.

## Desglose por recurso — después, logo de 96 px

Cambia solo el logo: `logo-dgp.webp` (428 px, 79.909 bytes) pasa a
`logo-dgp-96.webp` (96 px, 13.306 bytes). El `index.html` tiene 2 bytes más,
por la suma de los cambios posteriores al cierre (placa para compartir, su
`og:image:alt` y los atributos de los logos).

| Bytes | Tipo | Recurso | 1440 | 390 | 390, densidad 3 |
|---|---|---|---|---|---|
| 119.969 | imagen | `assets/hero-bg-1920.avif` | sí | | |
| 68.814 | imagen | `assets/hero-bg-1280.avif` | | | sí |
| 32.132 | imagen | `assets/hero-bg-768.avif` | | sí | |
| 80.061 | documento | `index.html` | sí | sí | sí |
| 43.306 | tipografía | `assets/fonts/roboto-latin.woff2` | sí | sí | sí |
| 38.126 | tipografía | `assets/fonts/montserrat-latin.woff2` | sí | sí | sí |
| 20.726 | tipografía | `assets/fonts/roboto-symbols.woff2` | sí | sí | sí |
| 13.306 | imagen | `assets/logo-dgp-96.webp` | sí | sí | sí |
| 3.135 | ícono | `favicon-32.png` | sí | sí | sí |
| | | **Total** | **318.629** | **230.792** | **267.474** |
