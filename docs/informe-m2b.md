# Informe de cierre — M2b (rendimiento)

Spec: `docs/spec-m2b-rendimiento.md`. Modo: módulo completo.
Cerrado el 2026-09-18. Último commit del módulo antes de este informe: `29f9e97`.
Mediciones completas en `docs/medicion-m2b.md`.

> **BLOQUEANTE DE M5 (2026-09-18).** La foto actual del hero no se puede
> publicar: muestra la patente "AF 456 JL" legible y la cara del conductor.
> En pantalla quedan bajo la capa oscura, pero cada archivo
> (`hero-bg-*.avif`, `.webp`, `.jpg`) se sirve limpio y cualquiera puede
> abrirlo. **El sitio no se publica hasta que F-01 la reemplace.** F-01 pasó
> de prioridad 1 a requisito en `docs/brief-fotografico.md`. Ver P-007.

Los cambios hechos después del cierre están en la sección 8.

---

## 1. Tareas y commits

| Tarea | Qué se hizo | Commit |
|---|---|---|
| Docs | Spec de M2b, brief fotográfico y regla de imágenes en `CLAUDE.md` §2 | `65258f9` |
| 1 | Medición inicial; herramienta `tools/medir-rendimiento.mjs` | `1997927` |
| 2 | sharp en `devDependencies`; `tools/optimizar-imagenes.mjs`; 7 versiones del hero; original en `assets-src/` | `a3375ad` |
| 3 | `background-image` → `<picture>` con AVIF, WebP y JPEG; `preload` con `imagesrcset`; `.avif` en `tools/serve.mjs` | `ae54842` |
| 4 | `og-image.jpg` 1200×630; `og:image`, `twitter:image` y JSON-LD `image` apuntando a ella; `hero-bg.png` borrado (P-002) | `9d6f636` |
| 5 | Logo PNG sin pérdida + WebP con `<picture>`; `favicon-32.png` y `apple-touch-icon.png` | `35ec7d3` |
| 6 | Montserrat y Roboto desde `assets/fonts/`; sin enlaces a Google Fonts | `fa95e91` |
| 7 | Medición final | `29f9e97` |
| 8 | Verificación de cierre y este informe | este commit |

## 2. Resultado

| Medida | Antes | Después |
|---|---|---|
| Peso de la primera carga, 390 px | 5.860 KB | **297 KB** (−94,9 %) |
| Peso de la primera carga, 390 px con densidad 3 | 5.860 KB | 334 KB (−94,3 %) |
| Peso de la primera carga, 1440 px | 5.860 KB | 385 KB (−93,4 %) |
| Peticiones | 8 | 7 |
| Peticiones a dominios externos | 4 | **0** |
| Imagen del hero descargada con 4G lento, 390 px | ≈ 28 s | 1,1 s |
| Imagen del hero descargada con 4G lento, 1440 px | ≈ 28 s | 2,0 s |

**Objetivo de 500 KB en móvil (`CLAUDE.md` §5): cumplido**, con 297 KB y 334 KB.
El LCP con 4G lento pasó de 28,3 s a 0,65 s, pero cambió el elemento que se
mide: de la foto a un texto. Está explicado en `docs/medicion-m2b.md`.

## 3. Detalle por tarea

### Tarea 2
Archivos generados (`ls -lh`): `hero-bg-768.avif` 32K, `hero-bg-1280.avif` 68K,
`hero-bg-1920.avif` 117K, `hero-bg-768.webp` 56K, `hero-bg-1280.webp` 112K,
`hero-bg-1920.webp` 194K y `hero-bg-1280.jpg` 181K. Total: 774.585 bytes. El
AVIF de 1280 pesa 68,6 KB, por debajo de la referencia de 250 KB. Si el script
se corre dos veces, los archivos salen idénticos (mismo SHA-1). `node_modules/`
sigue ignorado.

### Tarea 3
Capas del hero, sin cambios: `.hero-bg` (fondo `--azul-dark`), la grilla de
`.hero-bg::after`, `.hero-overlay` (radial verde + lineal azul del 93 % al
70 %) y `.hero::after` (degradado a gris en los últimos 110 px). Lo único que
cambió es cómo llega la foto: un `<img>` con `object-fit: cover` y
`object-position: center`, que equivale al `center/cover` de antes.

Archivo que baja el navegador:

| Ancho | Archivo |
|---|---|
| 390 | `hero-bg-768.avif` |
| 390, densidad 3 | `hero-bg-1280.avif` |
| 768 | `hero-bg-768.avif` |
| 1440 | `hero-bg-1920.avif` |
| 1920 | `hero-bg-1920.avif` |

En cada ancho se pide una sola imagen, la misma que precarga el `preload`, y
Chrome no avisa de ningún recurso precargado sin usar. Comparación píxel a
píxel del hero antes y después: diferencia media por debajo de 1/255, máximo
30/255, que es ruido de la recompresión bajo la capa oscura. La altura de la
página no cambió.

Agregué `fetchpriority="high"` al `<img>`, porque el `preload` anterior lo
tenía. No verifiqué el respaldo WebP ni el JPEG en un navegador sin AVIF: el
Chrome de las pruebas soporta AVIF.

### Tarea 4
`og-image.jpg`: 1200×630, 158 KB. El recorte centrado solo quita 20 px arriba y
abajo, y el encuadre está bien, pero la patente y la cara se ven: ver P-003.
Los `og:image:width` y `og:image:height` ya existían, con 2752 y 1536, así que
les cambié el valor en lugar de duplicarlos.

### Tarea 5
Logo: el PNG sin pérdida pasa de 133.459 a 116.408 bytes (−12,8 %), con píxeles
idénticos. El WebP sin pérdida pesa 79.738 bytes: −40,3 % respecto del original
y −31,5 % respecto del PNG optimizado, así que supera el 30 % en cualquiera de
las dos lecturas y va con `<picture>`. En los píxeles visibles es idéntico al
original. `alt` sin cambios, y `width="428" height="428"` (las dimensiones
reales; el tamaño visible lo sigue fijando el CSS). Con `<picture>`, el hijo
directo de la grilla del pie a ≤ 768 px pasa a ser el `<picture>` y no el
`<img>`, así que agregué `.footer-brand picture { grid-row: 1 / 4; }`. Las
páginas completas a 1440 y 390 quedaron idénticas píxel a píxel a las de la
Tarea 3.

Favicon: `favicon-32.png` pesa 3,0 KB, contra 35 KB antes.
`apple-touch-icon.png` pesa 34,8 KB, pero solo lo pide iOS al agregar el sitio a
la pantalla de inicio. Los originales del logo y del favicon quedaron en
`assets-src/`. `favicon.png` quedó sin uso (P-004).

### Tarea 6
Lo que se usa de verdad, según el estilo computado de todos los textos
(pestañas ocultas incluidas):

- Montserrat normal: 400, 500, 600, 700, 800 y 900.
- Roboto normal: 300, 400, 500 y 600. El 600 se resolvía a la cara de 700 de
  Google y se sigue resolviendo igual.
- Roboto itálica: sintetizada, antes y después. Google no la servía y no se
  descargó.

Google sirve un archivo variable por familia y subconjunto. Descargué cinco:
`montserrat-latin` 38K, `montserrat-latin-ext` 70K, `roboto-latin` 43K,
`roboto-latin-ext` 29K y `roboto-symbols` 21K (P-005). Los `latin-ext` no se
piden, porque la página no tiene caracteres de ese rango. Todas las reglas
llevan `font-display: swap`. Hay dos `preload`: `montserrat-latin` (título del
hero) y `roboto-latin` (cuerpo). No quedó ningún weight de la spec sin
equivalente en Google Fonts.

En la primera carga la página no hace ninguna petición externa. Al bajar hasta
el mapa aparecen peticiones a `maps.google.com`, `www.google.com`,
`maps.gstatic.com`, `maps.googleapis.com`, `fonts.googleapis.com` y
`fonts.gstatic.com`: verifiqué que todas salen del iframe del mapa. El render
quedó idéntico píxel a píxel al de la Tarea 5 en el hero (390, 768, 1440 y
1920), en el párrafo de cuerpo y en las páginas completas (1440 y 390).

## 4. Verificación de cierre (Tarea 8)

1. `grep -rn "hero-bg.png\|fonts.googleapis\|fonts.gstatic" public/`: vacío.
   También en formas codificadas.
2. JSON-LD: `JSON.parse` correcto. Verificación semántica: `url`, `image`,
   `logo` y `hasMap` son `https://` válidas, y `telephone` está en E.164.
   Además, los archivos detrás de `image` y `logo` existen en `public/`.

   Bloque final, cambio único respecto de M2a: la línea `image`.

   ```json
   "image": "https://centromecanicodgp.com.ar/assets/og-image.jpg",
   ```
3. Servidor local a 390 (densidades 1 y 3) y a 1440, recorriendo la página
   hasta el mapa: ninguna respuesta ≥ 400 y ningún error de JavaScript. En la
   consola solo aparecen mensajes del iframe del mapa.
4. Capturas de página completa con scroll previo:
   `temporary screenshots/m2b/completa-1440-cierre.png` y
   `completa-390-cierre.png` (fuera de git).
5. Comparación visual:
   - 1440, contra la captura de cierre de M2a (`t15-completa-1440.png`): solo
     difieren las filas 73–882, que son el hero; el máximo es 20/255 y viene
     de la foto recomprimida. El resto de la página es idéntico.
   - 390: la captura de M2a (`t15-completa-390.png`) mide 9494 px de alto y la
     de ahora 9443, con `public/` sin ningún cambio entre el cierre de M2a y
     el inicio de M2b (`git diff 509a497 65258f9 -- public/` vacío). La
     diferencia viene del método de captura de M2a, no del sitio; no las
     comparé píxel a píxel. Comparé contra la captura "antes" de este módulo,
     sacada con el mismo método y sobre el mismo `public/` que el cierre de
     M2a: solo difieren las filas 73–832, el hero, con máximo 20/255.
   - Ninguna diferencia visual fuera de la foto del hero.
6. `ls -lh public/assets/`: hero-bg-1280.avif 68K · hero-bg-1280.jpg 181K ·
   hero-bg-1280.webp 112K · hero-bg-1920.avif 117K · hero-bg-1920.webp 194K ·
   hero-bg-768.avif 32K · hero-bg-768.webp 56K · logo-dgp.png 114K ·
   logo-dgp.webp 78K · og-image.jpg 155K · `fonts/` (5 archivos, 212K). En
   `public/`: index.html 79K · favicon-32.png 2,9K · apple-touch-icon.png 34K ·
   favicon.png 35K (sin uso, P-004).
7. Preguntas anotadas durante el módulo: P-002 a P-005 (sección 5).

## 5. Preguntas abiertas de M2b

| Id | Tema | Bloquea | Qué hice |
|---|---|---|---|
| P-002 | `hero-bg.png` se borró en la Tarea 4, no en la 3 | no | Decisión mía: en la Tarea 3 quedaban tres referencias que eran de la Tarea 4 |
| P-003 | Patente "AF 456 JL" y cara del conductor legibles en `og-image.jpg` | no; antes de M5 sí | Respondida: placa institucional (`a3e29bd`) y foto del hero bloqueada (P-007) |
| P-004 | ¿Se borra `public/favicon.png`, que quedó sin uso? | no | Nada; sigue en `public/` |
| P-005 | Subconjunto symbols de Roboto (★), fuera de "latin y latin-ext" | no | Decisión mía: incluido, para que las estrellas no cambien |

## 6. Decisiones mías, fuera de lo que dicta la spec

- La medición agrega una tercera configuración (390 px con densidad 3) y un
  perfil de red "4G lento". Las dos van además de lo pedido, no en su lugar.
- `tools/medir-rendimiento.mjs` quedó en el repositorio, para que la Tarea 7
  midiera con la misma herramienta.
- `.avif` agregado a los tipos de `tools/serve.mjs`.
- Originales del logo y del favicon copiados a `assets-src/`, para que el script
  sea reejecutable.
- `fetchpriority="high"` en el `<img>` del hero.
- Montserrat declarada con rango de peso (`400 900`) y Roboto peso por peso,
  para que el 600 siga cayendo en 700.

## 7. Observaciones para módulos siguientes (no se tocó nada)

- **Logo de 428×428 mostrado a 44–52 px.** Es el segundo recurso más pesado en
  móvil (80 KB). Una versión de 96 o 144 px pesaría muy poco. La spec no pedía
  redimensionar, así que no lo hice.
- **`npm audit`** marca vulnerabilidades altas en `basic-ftp`, `extract-zip` e
  `ip-address`. Vienen del árbol de dependencias de Puppeteer, no de sharp.
  Son herramientas de desarrollo y nada de eso se publica. No lo toqué:
  arreglarlo cambia dependencias.
- **Licencia de las tipografías.** Montserrat y Roboto son libres y se pueden
  servir desde el propio dominio. No agregué el texto de la licencia junto a
  los archivos: la spec no lo pide, y descargarlo no estaba autorizado.
- **F-10 en el brief:** sigue "pendiente (se deriva de F-01 o F-07)". La imagen
  actual es provisoria y se rehace con `node tools/optimizar-imagenes.mjs`
  cuando llegue la foto: alcanza con cambiar la fuente del recorte.
- El desborde de la fila de contadores del hero por debajo de ~350 px sigue
  como estaba. Es de M2c, y tiene que quedar resuelto para cualquier texto de
  los contadores, porque M3 puede cambiarlos.

## 8. Después del cierre (2026-09-18)

Respuestas del usuario a las preguntas del módulo, y lo que se hizo con cada una.

| Qué | Commit |
|---|---|
| Spec corregida: Tarea 3, punto 7 (el PNG se borra en la Tarea 4). P-002 respondida | `71af91c` |
| P-003 a: la imagen para compartir pasa a ser una placa institucional sin foto | `a3e29bd` |
| P-003 b: foto actual del hero bloqueada para publicar; F-01 a requisito | `645d5ac` |
| P-004: `public/favicon.png` borrado (nada lo referenciaba) | `b9056a4` |
| P-005: el subconjunto symbols se queda; en M2c las estrellas pasan a SVG en línea y se elimina | `9ac6a9f` |
| Tarea agregada: logo al tamaño en que se muestra, y medición de la Tarea 7 repetida | este commit |

**Logo de 96 px.** `logo-dgp-96.webp` (13,1 KB) y `logo-dgp-96.png` (16,3 KB,
respaldo), sin pérdida a partir del original, con `width="96" height="96"`,
en la barra y en el pie. Son 96 px: el doble de los 48 px de la barra. En el
pie de escritorio el logo se muestra a 52 px, que a densidad 2 piden 104: se
amplía un 8 %, y con zoom apenas se nota. `logo-dgp.webp` de 428 px se borró,
porque ya no lo usaba nada. `logo-dgp.png` de 428 px se queda: lo usa el
`"logo"` del JSON-LD, y Google pide que ese logo mida al menos 112×112. En
las capturas de página completa a 1440 y 390 px solo cambian los píxeles de
las dos cajas del logo; el alto de la página es el mismo.

Medición vigente, repitiendo la de la Tarea 7 (`docs/medicion-m2b.md`):

| Configuración | Antes de M2b | Cierre de M2b | Con logo de 96 px |
|---|---|---|---|
| 390 px | 5.860 KB | 297 KB | **231 KB (−96,1 %)** |
| 390 px, densidad 3 | 5.860 KB | 334 KB | 267 KB (−95,4 %) |
| 1440 px | 5.860 KB | 385 KB | 319 KB (−94,6 %) |

**Pendiente para M2c (P-005).** Las estrellas `★` de `.g-star` y `.t-star` pasan
a SVG en línea, y se eliminan `public/assets/fonts/roboto-symbols.woff2` y su
`@font-face`. Ahorro esperado: 20,6 KB en cada carga.

**Placa para compartir.** `public/assets/og-placa.jpg`: 1200×630, fondo
`#124B8F` y el logo centrado a 480 px (40 % del ancho), sin texto. JPEG 80,
35,9 KB. El logo original mide 428 px, así que para llegar al 40 % se amplía
un 12 %; con zoom no se ve pérdida. `og:image`, `twitter:image` y el `image`
del JSON-LD apuntan a la placa. `og-image.jpg`, el recorte con la patente, se
borró de `public/`. El JSON-LD pasa `JSON.parse` y la verificación semántica.
El `og:image:alt` describía la foto y quedó como `TODO_DATO` (P-006).

