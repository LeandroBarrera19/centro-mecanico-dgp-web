# Medición de rendimiento — M2b

"Antes" se midió el 2026-09-18 sobre el commit `65258f9`, en la Tarea 1.
"Después" se completa en la Tarea 7, con la misma herramienta y las mismas
condiciones.

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

| Medida | Configuración | Antes | Después |
|---|---|---|---|
| Bytes transferidos | 1440 | 5.860.374 (5.860 KB) | |
| Bytes transferidos | 390 | 5.860.374 (5.860 KB) | |
| Bytes transferidos | 390, densidad 3 | 5.860.374 (5.860 KB) | |
| Peticiones | todas | 8 | |
| Peticiones a dominios externos | todas | 4 (`fonts.googleapis.com` 1, `fonts.gstatic.com` 3) | |
| LCP, sin límite (mediana de 3) | 1440 | 896 ms (1756 / 860 / 896) | |
| LCP, sin límite (mediana de 3) | 390 | 768 ms (768 / 640 / 772) | |
| LCP, sin límite (mediana de 3) | 390, densidad 3 | 772 ms (772 / 792 / 744) | |
| LCP, 4G lento | 1440 | 28.344 ms | |
| LCP, 4G lento | 390 | 28.296 ms | |
| LCP, 4G lento | 390, densidad 3 | 28.188 ms | |
| Elemento LCP | todas | `div.hero-bg` (`assets/hero-bg.png`) | |

La primera carga del LCP a 1440 (1756 ms) es la primera de la serie, con el
navegador recién abierto.

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

Se completa en la Tarea 7.
