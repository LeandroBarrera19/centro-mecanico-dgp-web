# Informe de cierre — M2c (técnica, accesibilidad e indexación)

Spec: `docs/spec-m2c-tecnica.md` (commit `5bbabf4`). Modo: módulo completo.
Cerrado el 2026-09-21. Último commit antes de este informe: `5a36066`.
Auditoría de contraste: `docs/contraste-m2c.md`.

Después del cierre, el mismo día, se hicieron los arreglos que pidió el
usuario sobre P-008 a P-012. Están en la sección 7, que manda sobre lo que
digan las secciones anteriores.

---

## 1. Tareas y commits

| Tarea | Qué se hizo | Commit |
|---|---|---|
| 1 | Capturas de referencia a 320, 390, 768, 1440 y 1920 px | sin commit (capturas ignoradas por git) |
| 2 | `lang="es-AR"` y enlace "Saltar al contenido" | `af4da47` |
| 3 | `#reseñas` → `#resenas` (1 `id`, 3 `href`) | `5a15e6c` |
| 4 | Jerarquía de encabezados sin saltos; estilos de etiqueta pasados a clases | `8de9294` |
| 5 | Estrellas en SVG (`<symbol>` + `<use>`); fuera `roboto-symbols.woff2` y su `@font-face` | `ded0bd1` |
| 6 | Contadores del hero sin desborde, con cualquier texto | `8939d90` |
| 7 | Mapa insertado desde la ficha (CID) | `caf849a` |
| 8 | `robots.txt` y `sitemap.xml` | `95d25bc` |
| 9 | Auditoría de contraste (solo informe) y `tools/auditar-contraste.mjs` | `5a36066` |
| 10 | Verificación de cierre y este informe | este commit |

Antes del módulo: `5b1bfea` (desfases de la spec de M2b) y `5bbabf4` (spec de
M2c).

Cómo se comparó cada tarea: capturas de página completa a los cinco anchos,
con scroll previo, comparadas píxel a píxel contra las de la Tarea 1. Dos
capturas seguidas de la misma versión dan 0 píxeles distintos a los cinco
anchos, así que cualquier diferencia es real. Una sola vez, en la Tarea 7, la
primera captura de una corrida a 320 px salió con ruido (máximo 10/255). La
repetí dos veces y dio 0 píxeles distintos contra la Tarea 6.

## 2. Detalle por tarea

### Tarea 2 — Idioma y enlace de salto
- `<html lang="es-AR">`.
- `<a class="skip-link" href="#contenido-principal">Saltar al contenido</a>`
  como primer hijo del `<body>`. Queda fuera de pantalla (`transform:
  translateY(-200%)`, `position: fixed`) y aparece con `:focus` arriba a la
  izquierda, en `z-index: 1100`, por encima de la barra (1000). Fondo
  `#124B8F`, texto blanco (8,65:1), en la tipografía y el peso de los botones.
- Verificado con Puppeteer a 1440 y 390 px. El primer Tab deja el foco en el
  enlace, que se ve en 8,8 con 189×48 px, encima de todo
  (`elementFromPoint`), con `:focus-visible` y el contorno verde del sitio.
  Enter lleva el foco a `MAIN#contenido-principal` (hash
  `#contenido-principal`), y el Tab siguiente cae en "Pedir turno por
  WhatsApp", el primer control del `<main>`.
- Capturas contra la Tarea 1: 0 píxeles distintos a los cinco anchos.

### Tarea 3 — Ancla de reseñas
- Cambiados el `id` de la sección y los tres `href` (menú de escritorio, menú
  móvil y pie). No hay JavaScript que use el ancla ni marcado de sección
  activa en el menú. No había formas codificadas (`rese%C3%B1as`). El texto
  visible "Reseñas" no se tocó.
- Verificado: el enlace del menú de escritorio, el del menú móvil (que además
  se cierra) y el del pie llevan a `#resenas`, con la sección en pantalla.
- Capturas: 0 píxeles distintos.

### Tarea 4 — Jerarquía de encabezados
Había tres saltos: h2 → h4 en los pasos del proceso (5), h2 → h4 en las
tarjetas de servicios (19) y h2 → h5 en las columnas del pie (3). Los 27 pasaron
a `<h3>`. Jerarquía final, con un solo `<h1>`:

```
h1 Tu flota no se detiene.
  h2 ¿Por qué elegirnos?
    h3 × 4 (tarjetas 01–04)
  h2 Nuestro proceso de trabajo
    h3 × 5 (pasos 01–05)
  h2 Nuestros Servicios
    h3 × 19 (tarjetas de las cinco pestañas)
  h2 Reseñas en Google
  h2 ¿Necesitás atención para tu flota?
    h3 Navegación · Servicios · Contacto (pie)
```

CSS afectado:

| Antes | Después |
|---|---|
| `.step h4 { … }` | `.step-title { … }` |
| `.service-card h4 { … }` | `.service-card-title { … }` |
| `.service-card--highlight h4 { color: #D32027; }` | `:where(.service-card--highlight) .service-card-title { color: #D32027; }`, con un comentario (P-008) |
| `.footer-col h5 { … }` | `.footer-col-title { … }` |

Las declaraciones de cada regla no cambiaron. Verificado de dos formas:
- Capturas: 0 píxeles distintos a los cinco anchos.
- Estilo computado de los 37 encabezados, con las cinco pestañas abiertas a la
  vez (17 propiedades, además del ancho y el alto), a 390 y 1440 px: 0
  diferencias. Esta segunda medición encontró lo que las capturas no podían
  ver: en la pestaña "Repuestos", oculta al cargar, el título de "Casa de
  Repuestos" pasaba de gris a rojo. Ver P-008.

### Tarea 5 — Estrellas en SVG
- **Paso 1.** Revisé todos los caracteres del DOM, incluidos los ocultos y el
  `content` de `::before` y `::after`, contra los `unicode-range` de los
  `@font-face` de Roboto. El único carácter fuera de latin y latin-ext que
  cae en el rango del subconjunto symbols es ★ (U+2605): 25 apariciones,
  todas en `.g-star` y `.t-star`.
- **Hallazgo:** `roboto-symbols.woff2` **no tiene el glifo ★**. Sus 78
  glifos no lo incluyen (verificado con fontTools). Chrome descargaba el
  archivo porque el `unicode-range` incluye U+2605, pero la estrella la
  dibujaba la fuente del sistema: `CSS.getPlatformFontsForNode` devuelve
  "Segoe UI Symbol" para `.g-star` y `.t-star`. En M2b dije lo contrario
  (informe de M2b §3, Tarea 6, y P-005: "Sin ese archivo, las estrellas se
  dibujarían con la fuente del sistema"). Estaba mal: ya se dibujaban así, y
  el archivo se bajaba sin usarse.
- **SVG.** Una sola definición, `<symbol id="estrella" viewBox="0 0 100 120">`,
  dentro de un `<svg class="svg-defs">` oculto y de tamaño cero al principio
  de la sección de reseñas, y un `<use href="#estrella">` por estrella. Es
  una estrella regular de cinco puntas, dibujada a partir de la tinta de la
  ★ que se veía: 0,72 em de ancho y 0,685 em de alto, en la misma posición.
  No copié el contorno de Segoe UI Symbol, que es una fuente de Microsoft.
  El color sigue siendo `#FBBC04` (`fill: currentColor`). Cada `<svg>` mide
  exactamente lo que medía el carácter: 14,671875 × 17,59375 px en el
  recuadro de Google y 13,328125 × 16 px en las reseñas. Con `0,8333em`
  el recuadro quedaba 0,08 px más angosto, así que fijé los anchos exactos.
- **Accesibilidad.** `.google-stars-row` lleva `role="img"` y
  `aria-label="Puntuación 4,9 de 5"`. Cada `.t-stars`, `role="img"` y
  `aria-label="5 de 5"` (P-010). Cada `<svg>` de estrella, y el de la
  definición, llevan `aria-hidden="true"`.
- **Eliminado:** el `@font-face` del subconjunto symbols, su comentario y
  `public/assets/fonts/roboto-symbols.woff2` (20.556 bytes).
- **Cambio visual, permitido en esta tarea.** Las cajas de la fila, el
  recuadro, la tarjeta y la página miden lo mismo que antes, al 1/64 de px.
  En las capturas solo cambian cinco bandas de 12 px de alto por unos 76 de
  ancho: una fila de estrellas cada una. Primeros planos antes y después:
  `temporary screenshots/m2c-t5-{google,resena}-{390,1440}-{antes,despues}.png`.
  La forma, el tamaño y el color son los mismos, y ya no dependen de la
  fuente de cada sistema.

### Tarea 6 — Contadores del hero
CSS antes:

```css
.hero-stats-inner { display: grid; grid-template-columns: repeat(4, 1fr); }
.stat-item { padding: 28px 24px; border-right: 1px solid rgba(255,255,255,0.12); }
.stat-num { …; font-size: 1.9rem; line-height: 1; margin-bottom: 6px; }
.stat-label { font-size: 0.82rem; color: rgba(255,255,255,0.88); }
/* ≤900 y ≤480 px */ .hero-stats-inner { grid-template-columns: repeat(2, 1fr); }
```

Causa: `1fr` equivale a `minmax(auto, 1fr)`, y ninguna columna podía ser más
angosta que su palabra más larga más 48 px de relleno. A 320 px las columnas
pedían 160 + 167 = 327 px, y el contenedor tiene 280.

Cambio: `repeat(4, minmax(0, 1fr))` y `repeat(2, minmax(0, 1fr))` en los dos
media queries, `min-width: 0` en `.stat-item` y `overflow-wrap: anywhere` en
`.stat-num` y `.stat-label`. No se tocó el tamaño del texto.

| Ancho | `scrollWidth` antes | `scrollWidth` después |
|---|---|---|
| 320 | 347 | **320** |
| 340 | 347 | **340** |
| 360 | 360 | 360 |
| 390 | 390 | 390 |

**Prueba de la condición**, reemplazando en memoria desde Puppeteer el texto
del primer contador:
- "Texto de prueba de 30 letras..": `scrollWidth` 320, y las celdas crecen
  hacia abajo (338 px de alto).
- "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234", sin espacios: `scrollWidth` 320, y la
  celda crece a 399 px de alto.

**Aspecto:**
- A 390, 768, 1440 y 1920 px: 0 píxeles distintos contra la Tarea 5.
- Por debajo de 390 px cambia solo la fila. La comparé por geometría, porque
  la captura "antes" a 320 px medía 347 de ancho. Todos los elementos de la
  página ocupan la misma caja que antes, salvo los de la fila, que crece
  30,4 px a 320 y 340, y 9,4 px a 360. Lo de abajo baja esa misma cantidad, y
  el `<main>` y la capa `.hero-overlay` crecen lo mismo. Como la foto del
  hero lo cubre entero con `object-fit: cover`, se reescala un poco.
- El texto que no entra se parte a mitad de palabra: "STOC / K" y
  "17:30 / hs" a 320 px, y "17:30h / s" a 340 y 360. Capturas:
  `temporary screenshots/m2c-t6-contadores-*.png`. Ver P-011.

### Tarea 7 — Mapa desde la ficha
Probé una sola URL, la de la spec, dentro de un `<iframe>`:
`https://maps.google.com/maps?cid=3644390957274807803&output=embed`.
La primera corrida del script falló por la forma de esperar (Google Maps
nunca deja de hacer peticiones), no por el mapa. La repetí con la misma URL.

Resultado: 301 a `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!3m2!1m1!4s3644390957274807803`,
y ese destino responde 200. El mapa carga con el marcador rotulado "Centro
Mecánico DGP" y la tarjeta de la ficha: "Porfirio Seppey 25, X5900 Villa
María, Córdoba, Argentina", con la puntuación. Captura:
`temporary screenshots/m2c-t7-mapa-cid.png`. **Funcionó, así que reemplacé el
`src`.** El iframe conserva `loading="lazy"` (no pide nada hasta que se baja
hasta el mapa), su `title`, su `aria-label` y su `referrerpolicy`. Se dejó de
usar el `&hl=es` de la URL anterior porque la spec da la URL exacta: el mapa
sale igual en castellano. Captura dentro del sitio:
`temporary screenshots/m2c-t7-mapa-sitio.png`.

### Tarea 8 — `robots.txt` y `sitemap.xml`
- `public/robots.txt` y `public/sitemap.xml`, con el texto exacto de la spec.
- `<loc>https://centromecanicodgp.com.ar/</loc>`, idéntico al `canonical`
  (verificado por script).
- `<lastmod>2026-09-21</lastmod>`, sacado de
  `git log -1 --format=%cs -- public/index.html` (commit `caf849a`).
  Ninguna de las tareas siguientes tocó `public/index.html`, así que la fecha
  sigue siendo esa.
- El XML se parsea sin errores (`xml.etree`). El servidor local sirve los dos
  archivos con 200 (`text/plain` y `application/xml`). Para eso agregué `.txt`
  y `.xml` a la tabla de tipos de `tools/serve.mjs`, que antes los servía como
  `application/octet-stream`, también con 200.
- **Mantenimiento:** cuando se agreguen páginas (M7, M8), hay que agregarlas al
  sitemap, y el `lastmod` de cada una tiene que ser la fecha de su último
  commit.

### Tarea 9 — Contraste
Resultado completo y método en `docs/contraste-m2c.md`: 367 textos, 80
combinaciones, **18 no llegan al mínimo**. No se cambió ningún color. La
herramienta queda en el repositorio (`node tools/auditar-contraste.mjs`) para
volver a medir en M3.

## 3. Verificación de cierre (Tarea 10)

1. **Diferencias visuales** contra las capturas de la Tarea 1
   (`m2c-antes-*` contra `m2c-cierre-*`):

   | Ancho | Diferencias | Tarea |
   |---|---|---|
   | 320 | Fila de contadores del hero, y todo lo de abajo corrido 30 px; la foto del hero reescalada. Estrellas. | 6 y 5 |
   | 390 | 5 bandas de 12 px, una por fila de estrellas (recuadro de Google y cuatro reseñas) | 5 |
   | 768 | 3 bandas; en dos de ellas van dos tarjetas en la misma fila | 5 |
   | 1440 | 3 bandas (recuadro y dos filas de tarjetas) | 5 |
   | 1920 | 3 bandas (recuadro y dos filas de tarjetas) | 5 |

   A 320 px la comparación de página completa no sirve: la captura de
   referencia mide 347×10495, porque la página desbordaba y la captura se
   ensanchó hasta el desborde. La de cierre mide 320×10525. Esas diferencias
   se revisaron por geometría en la Tarea 6, y a 320 px las Tareas 2 a 5
   dieron 0 diferencias fuera de las estrellas. **No hay diferencias
   visuales fuera de las Tareas 5 y 6.**
2. **JSON-LD:** un bloque. `JSON.parse` OK. `url`, `image`, `logo` y `hasMap`
   son URL `https://` válidas, `telephone` está en E.164, y existen los
   archivos detrás de `image` (`og-placa.jpg`) y de `logo` (`logo-dgp.png`).
   M2c no tocó el JSON-LD.
3. **Servidor local**, a 390 (densidades 1 y 3) y 1440 px, recorriendo hasta
   el mapa: ninguna respuesta ≥ 400 y ningún error de JavaScript. En la
   consola solo aparece `debug: Search endpoint requested!`, que viene del
   iframe del mapa.
4. **Sin desborde horizontal**, con la pestaña de servicios que se ve al
   cargar: `scrollWidth` = ancho a 320, 390, 768, 1440 y 1920 px. Aparte, la
   pestaña "Repuestos" desborda a 480 px o menos, y eso ya pasaba antes de
   M2c (P-012).
5. **`grep -rn "reseñas\|rese%C3%B1as" public/`:** vacío. Sin distinguir
   mayúsculas solo aparece texto visible: "Reseñas" en los tres enlaces y
   "Reseñas en Google" en el `<h2>`.
6. **Peso** (`tools/medir-rendimiento.mjs`, mismas condiciones que M2b; 1 KB =
   1000 bytes):

   | Configuración | M2b (vigente) | M2c | Diferencia |
   |---|---|---|---|
   | 390 px | 230.792 | **211.526** (212 KB) | −19.266 |
   | 390 px, densidad 3 | 267.474 | 248.208 (248 KB) | −19.266 |
   | 1440 px | 318.629 | 299.363 (299 KB) | −19.266 |

   Hay 6 peticiones, contra 7 en M2b, y ninguna externa en la primera carga.
   Sale `roboto-symbols.woff2` (20.556 bytes) y el `index.html` crece 1.290
   bytes: el enlace de salto, las clases de los encabezados y los SVG de las
   estrellas. M2c no empeoró el peso.
7. **Preguntas anotadas durante el módulo:** P-008 a P-012 (sección 4).

## 4. Preguntas abiertas de M2c (al cierre; ver §7 para su estado final)

| Id | Tema | Bloquea | Qué hice |
|---|---|---|---|
| P-008 | El título de "Casa de Repuestos" nunca se vio en rojo | no (color, M3) | Decisión mía: mantuve el gris de siempre con `:where()` |
| P-009 | Nivel de los títulos del pie: h3 o h2 | no | Decisión mía: h3, siguiendo la letra de la spec |
| P-010 | La puntuación de cada reseña no está en los datos verificados | no | Puse `aria-label="5 de 5"`, como dicta la spec |
| P-011 | Contadores partidos a mitad de palabra por debajo de 390 px | no (M3) | Nada más que lo pedido; hay opciones anotadas |
| P-012 | La pestaña "Repuestos" desborda a 480 px o menos (ya pasaba antes) | no | Nada; no está en la spec |

Sigue abierta P-007, de antes: bloquea M5 hasta que llegue F-01.

## 5. Decisiones mías, fuera de lo que dicta la spec

- `tabindex="-1"` en el `<main>`, para que Enter en el enlace de salto le
  pase el foco (sin eso, el foco se queda en el enlace), y
  `#contenido-principal:focus { outline: none; }`, para que no aparezca un
  contorno alrededor de todo el contenido.
- Nombres de clase nuevos: `skip-link` (dado por la spec), `step-title`,
  `service-card-title`, `footer-col-title` y `svg-defs`.
- Anchos de las estrellas fijados en px (14,671875 y 13,328125), medidos del
  carácter que reemplazan.
- En el `src` del mapa, `&` sin escapar, como en el iframe anterior.
- `.txt` y `.xml` agregados a `tools/serve.mjs` (solo desarrollo).
- En la auditoría: el percentil 10 como criterio sobre fondos variables, y los
  estados medidos (las cinco pestañas, el menú móvil y el enlace de salto).

## 6. Observaciones para módulos siguientes (no se tocó nada)

- **Anclas bajo la barra fija.** Al tocar un enlace del menú, la sección queda
  con su borde superior en y = 0, debajo de la barra de navegación (73 px de
  alto, `position: sticky`). No hay `scroll-margin-top`. Lo medí en
  `#resenas` (Tarea 3). No revisé si la barra tapa algo visible en cada
  sección.
- **P-005 partía de un dato equivocado mío** (ver Tarea 5). La decisión del
  usuario no cambia: el subconjunto ya no está.
- **Contraste sobre la foto del hero.** "no se detiene." y la etiqueta del hero
  dependen de la foto. Hay que volver a medir cuando F-01 reemplace la actual
  (P-007).
- El iframe del mapa sigue cargando dominios de Google (incluidos
  `fonts.googleapis.com` y `fonts.gstatic.com` a 1440 px) cuando se baja
  hasta él. Reemplazarlo por una vista que cargue al tocarla es de M3.

## 7. Arreglos después del cierre (2026-09-21)

Respuestas del usuario a P-008 a P-012, en modo módulo completo.

| Qué | Commit |
|---|---|
| `docs/datos-verificados.md` §6: la puntuación de las cuatro reseñas, verificada por Ramiro (5 estrellas) | `5dc7a66` |
| P-010 respondida: `aria-label="5 de 5"` es correcto; no cambia nada en `public/` | `ae07652` |
| P-008: título de "Casa de Repuestos" en gris explícito | `9e931a0` |
| P-009: títulos del pie como `<h2>` | `daaca43` |
| P-011: contadores sin cortar palabras en pantallas angostas | `1bda9c1` |
| P-012: pestaña "Repuestos" sin desborde en celulares | `a293992` |
| `CLAUDE.md` §8: las verificaciones recorren pestañas, menús y estados ocultos | `c809841` |

**P-008.** `.service-card--highlight .service-card-title { color: var(--gris); }`
reemplaza a la regla del `:where()`. El gris es explícito y la regla tiene
más especificidad que `.service-card-title`, así que el rojo no puede volver
por el orden del CSS. El estilo computado de los 37 encabezados, con todas las
pestañas abiertas, queda igual que antes de M2c; "Casa de Repuestos" en
`rgb(45, 45, 45)`. Capturas: 0 píxeles distintos. Una captura a 1920 px dio
una banda de diferencias; dos repeticiones dieron 0: era ruido de la
animación de entrada.

**P-009.** Los tres títulos del pie pasaron de `<h3>` a `<h2>`, con la misma
clase `footer-col-title`. Ninguna regla de CSS apunta a `h2` dentro del pie.
Estilos de los 37 encabezados y capturas: 0 diferencias. Jerarquía final:
`h1` · `h2` × 5 del `<main>`, cada uno con sus `h3` · `h2` × 3 del pie.

**P-011.** Por debajo de 390 px:
`@media (max-width: 389.98px) { .stat-num { font-size: clamp(1.4rem, 11.43vw - 0.886rem, 1.9rem); } }`.
El cálculo sale de la palabra más ancha, "17:30hs", que ocupa 3,92 veces el
tamaño de letra, y del lugar de la celda, que es la mitad del ancho de la
pantalla menos 68 px. Queda 22,4 px a 320 y 30,4 px a 390. Las dos medidas
crecen en línea recta, así que si la palabra entra en los extremos, entra en
todo el tramo. `overflow-wrap: anywhere` sigue en `.stat-num` como red de
seguridad.

| Ancho | Tamaño del número | "17:30hs" | Lugar en la celda | Palabras partidas | `scrollWidth` |
|---|---|---|---|---|---|
| 320 | 22,4 px | 87,8 px | 92 px | ninguna | 320 |
| 340 | 24,7 px | 96,8 px | 102 px | ninguna | 340 |
| 360 | 27,0 px | 105,7 px | 112 px | ninguna | 360 |
| 375 | 28,7 px | 112,5 px | 119,5 px | ninguna | 375 |
| 390 | 30,4 px | 119,2 px | 127 px | ninguna | 390 |

- El verificador mira en qué renglón cae cada letra. Contra la versión
  anterior detecta "STOCK" y "17:30hs" partidas a 320 y 340, y "17:30hs" a
  360, así que la medición sirve.
- "08–17:30hs" va en dos renglones, cortado después del guion, igual que a
  390 px antes de M2c.
- Prueba de 30 caracteres a 320 px: "Texto de prueba de 30 letras.." ocupa 5
  renglones, sin palabras partidas y sin desborde. "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234"
  no tiene espacios, así que la parte la red de seguridad, sin desborde.
- A 390 px y más: 0 píxeles distintos. Por debajo cambia solo la fila (por
  geometría: 54,4 px más baja a 320, 47,6 a 340, 19,7 a 360 y 5,2 a 375),
  junto con los contenedores que la incluyen.

**P-012.** La regla con `id` que pisaba los media queries:

```css
#tab-repuestos.tab-panel.active {
  grid-template-columns: repeat(4, 1fr);
}
```

`#tab-repuestos.tab-panel.active` tiene especificidad (1,2,0), y
`.tab-panel.active`, la de los media queries de 1200, 768 y 480 px, tiene
(0,2,0). Gana la del `id` a cualquier ancho, y la pestaña se queda en 4
columnas. **Corrección de un dato mío:** en P-012 dije que desbordaba a 480 px
o menos. Medido ancho por ancho, desbordaba **de 320 a 613 px**: cuatro
columnas de al menos 130 px, más los espacios, necesitan 614 px.
**Decisión mía:** repetir la regla con `id` dentro de los media queries de
768 px (`repeat(2, 1fr)`) y 480 px (`1fr`), igual que las demás pestañas, con
un comentario. Por encima de 768 px no cambia nada. La alternativa, borrar
la regla, pasaría la pestaña de 4 a 3 columnas entre 769 y 1200 px.

| Ancho | Columnas de "Repuestos" antes → después | Desborde de la pestaña antes → después |
|---|---|---|
| 320–480 | 4 → 1 | 602 px → ninguno |
| 481–613 | 4 → 2 | hasta 614 px → ninguno propio (ver P-013) |
| 614–768 | 4 → 2 | ninguno → ninguno |
| 769 en adelante | 4 → 4 | ninguno → ninguno |

**Hallazgo nuevo (P-013):** entre 481 y 487 px desborda toda la página (488
px), con cualquier pestaña. La causa es la grilla de "Nuestro proceso", no
las pestañas, y ya pasaba antes de M2c. No se corrigió, porque no estaba
pedido.

**Verificación final, siguiendo la regla nueva de `CLAUDE.md` §8:**
- Las cinco pestañas y el menú móvil abierto, a 320, 360 y 390 px: sin
  desborde en ningún estado. Capturas en `temporary screenshots/m2c-estados/`:
  `servicios-<pestaña>-<ancho>.png` (la sección de servicios),
  `completa-<pestaña>-<ancho>.png` (la página entera, recortada al ancho de
  la ventana) y `menu-movil-<ancho>.png`.
- Contra el cierre anterior, con la vista que se ve al cargar: 0 píxeles
  distintos a 390, 768, 1440 y 1920 px. A 320 px cambia solo la fila de
  contadores (P-011).
- JSON-LD OK. Sin errores de JavaScript ni respuestas ≥ 400.
- Peso: 212.238 bytes a 390 px (antes 211.526; +712 por las reglas nuevas),
  248.920 con densidad 3 y 300.075 a 1440 px. Siguen siendo 6 peticiones.

**Estado de las preguntas:** P-008, P-009, P-010, P-011 y P-012 respondidas.
Abiertas: P-013 (desborde de 481 a 487 px), P-014 (texto de la spec para
P-009 y P-011) y P-007 (bloquea M5).

**Pendiente de confirmar:** el cambio del usuario a `docs/datos-verificados.md`
también borraba la fila "Reseña de Nico G. (no publicada)", que explica por
qué esa reseña no se publica. Como el mensaje no lo mencionaba, commiteé solo
la línea de la puntuación. El borrado sigue sin commitear en el árbol de
trabajo, hasta que el usuario confirme.
