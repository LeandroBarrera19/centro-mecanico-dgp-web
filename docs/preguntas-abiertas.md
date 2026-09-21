# Preguntas abiertas

Acá se anotan los huecos de información que aparecen durante la ejecución.
El agente escribe; Ramiro responde.

**Regla:** un hueco anotado acá **nunca** se rellena con una suposición. Si
bloquea una tarea, esa tarea queda sin hacer. Si no la bloquea, se hace lo que
se pueda y queda un `TODO_DATO` en el código.

Cómo se anota cada pregunta:

- **ID:** `P-<número>`, correlativo y nunca reutilizado.
- **Estado:** `abierta` · `respondida` · `descartada`.
- **Bloquea:** qué tarea queda parada, o `no bloquea`.
- **Qué falta:** la pregunta concreta, respondible en una línea.
- **Contexto:** archivo y línea, y qué dice hoy.
- **Qué hice mientras tanto:** nada, o el `TODO_DATO` que quedó, o la decisión
  propia que se tomó (dicha como propia).

Cuando Ramiro responde, el agente agrega **Respuesta:** debajo, cambia el
estado y ejecuta. No borra la pregunta: el historial sirve.

---

## Abiertas

### P-007 — BLOQUEANTE DE M5: la foto actual del hero no se puede publicar
- **Estado:** abierta
- **Bloquea:** **M5 (publicación).** El sitio no se publica hasta que F-01
  reemplace la foto actual del hero.
- **Qué falta:** la foto F-01 (`docs/brief-fotografico.md`), que pasó de
  prioridad 1 a requisito.
- **Contexto:** la foto provisoria del hero (`assets-src/hero-bg-original.png`
  y sus versiones `public/assets/hero-bg-*.avif`, `.webp` y `.jpg`) muestra la
  patente "AF 456 JL" legible y la cara del conductor. En pantalla quedan bajo
  la capa oscura, pero cada archivo se sirve limpio y cualquiera puede
  abrirlo. Decisión del usuario del 2026-09-18, al responder P-003.
- **Qué hice mientras tanto:** la imagen para compartir ya no usa esta foto
  (P-003 a, commit `a3e29bd`). El hero la sigue usando hasta que llegue F-01:
  M2b no crea huecos de imagen, y no hay otra foto del taller en
  `public/assets/`. Cuando llegue F-01, se reemplaza el original en
  `assets-src/`, se corre `node tools/optimizar-imagenes.mjs` y se borran las
  versiones de la foto actual.

### P-012 — La pestaña "Repuestos" desborda en pantallas de hasta 480 px
- **Estado:** abierta
- **Bloquea:** no bloquea. No está en la spec de M2c.
- **Qué falta:** decidir en qué módulo se corrige.
- **Contexto:** con la pestaña "Repuestos" de Nuestros Servicios abierta, la
  página mide 602 px de ancho a 320 y a 390 px, y aparece scroll horizontal.
  Las otras cuatro pestañas no desbordan, y a 768 y 1440 px no desborda
  ninguna. Ya pasaba antes de M2c: lo medí sobre `5bbabf4`. La causa es la
  regla `#tab-repuestos.tab-panel.active { grid-template-columns: repeat(4,
  1fr); }` (línea ~684 de `public/index.html`). Por el `id` pesa más que las
  reglas `.tab-panel.active` de los media queries, que pasan a 3, 2 y 1
  columna, así que esa pestaña se queda en 4 columnas a cualquier ancho. Lo
  encontré en la Tarea 9, porque la auditoría de contraste abre cada pestaña.
  Las capturas de verificación de M2c no lo muestran: se sacan con la primera
  pestaña abierta.
- **Qué hice mientras tanto:** nada. La regla repite el valor base (4
  columnas), así que parece que sobra, pero borrarla o cambiarla no está en
  la spec de M2c. La herramienta de contraste recorta la captura al ancho de
  la ventana para poder medir igual.

---

## Respondidas

### P-001 — Qué cambió el commit 0501b5e en el CSS
- **Estado:** respondida
- **Bloquea:** no bloquea. Hay que resolverla antes de M2b, que toca estilos.
- **Qué falta:** el diff completo de ese commit y cuál fue la opción elegida
  para que el recuadro de Google no desbordara en pantallas de hasta 480 px.
- **Contexto:** es la única modificación de CSS de todo M2a. Se hizo durante la
  Tarea 10a. El recuadro pasó de 414 px a 350 px de ancho.
- **Qué hice mientras tanto:** nada. El cambio está commiteado y funciona.
- **Respuesta (2026-09-18):** el commit agrega dos reglas dentro del media
  query `@media (max-width: 480px)` de `public/index.html` y no toca nada más:

  ```diff
  @@ -987,6 +987,8 @@
         .footer-bottom { flex-direction: column; gap: 6px; text-align: center; }
         .contact-inner { gap: 36px; }
         .testimonials-grid { grid-template-columns: 1fr; }
  +      .google-badge { flex-wrap: wrap; justify-content: center; max-width: 100%; row-gap: 4px; }
  +      .google-count-text { flex-basis: 100%; text-align: center; }
       }
  ```

  Opción elegida: en pantallas de hasta 480 px el recuadro puede partirse en
  dos líneas. Arriba quedan el logo de Google, el 4,9 y las estrellas; abajo,
  "Más de 130 opiniones en Google", en una línea propia y centrado. El recuadro
  no puede ser más ancho que su contenedor (`max-width: 100%`). No se cambió el
  texto, ni el tamaño de letra, ni el `white-space: nowrap` del texto, ni nada
  por encima de 480 px. Las otras alternativas que se evaluaron en su momento
  no quedaron registradas.

  Medido el 2026-09-18 (ancho y alto del recuadro, y `scrollWidth` de la
  página):

  | Pantalla | Antes (`0501b5e^`) | Después (`0501b5e`, igual en HEAD) |
  |---|---|---|
  | 390 px | 414 × 47, desborda (402) | 350 × 72, sin desborde (390) |
  | 360 px | 414 × 47, desborda (387) | 320 × 72, sin desborde (360) |
  | 480 px | 414 × 47, entra (480) | 414 × 72, entra (480) |

  Dos efectos que conviene tener en cuenta en M2b:
  1. Entre unos 455 y 480 px el recuadro se parte en dos líneas aunque
     entraría en una: la regla depende del ancho de pantalla, no de si hace
     falta.
  2. A 320 px la página sigue desbordando (347), pero no por el recuadro, que
     mide 280. Desborda la fila de contadores del hero, y eso ya pasaba antes
     de M2a (ver `docs/informe-m2a.md` §7).

### P-002 — Borrado de `hero-bg.png`: Tarea 3 o Tarea 4 de M2b
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** confirmar que está bien haber borrado `public/assets/hero-bg.png`
  en el commit de la Tarea 4 y no en el de la Tarea 3.
- **Contexto:** `docs/spec-m2b-rendimiento.md`, Tarea 3, punto 7: "Recién ahí,
  borrar `public/assets/hero-bg.png` y confirmar con `grep` que no queda
  ninguna referencia". Al terminar la Tarea 3 quedan tres referencias, y las
  tres son de la Tarea 4: `og:image` (línea 27), `twitter:image` (línea 36) y
  el `image` del JSON-LD (línea 46). El `grep` no puede dar vacío en la
  Tarea 3.
- **Qué hice mientras tanto:** decisión mía. En la Tarea 3 no borré el PNG. Lo
  borré al final de la Tarea 4, después de cambiar esas tres referencias, y
  ahí el `grep` dio vacío. Así ningún commit deja una referencia a un archivo
  que no existe. El original sigue en `assets-src/hero-bg-original.png` desde
  la Tarea 2.
- **Respuesta (2026-09-18):** la decisión fue correcta y la spec estaba mal.
  Borrar el PNG en la Tarea 3 habría dejado un commit que referenciaba un
  archivo inexistente. La Tarea 3, punto 7, de
  `docs/spec-m2b-rendimiento.md` quedó corregida: el PNG se borra al final de
  la Tarea 4, y ahí se confirma con `grep` que no queda ninguna referencia.
  No hay nada más que ejecutar: es lo que ya se hizo en `9d6f636`.

### P-003 — Patente y cara legibles en la imagen para compartir
- **Estado:** respondida
- **Bloquea:** no bloquea M2b. Hay que resolverla antes de publicar (M5).
- **Qué falta:** ¿la imagen para compartir se deja como está hasta que lleguen
  F-01 o F-07, o hay que tapar la patente y la cara?
- **Contexto:** `public/assets/og-image.jpg` (Tarea 4 de M2b) es el recorte
  centrado de la imagen actual del hero, como pidió la spec. En el hero la foto
  queda bajo una capa azul al 70–93 % y casi no se distingue, pero la imagen
  para compartir va sin capa y se ve entera: la patente **"AF 456 JL"** se lee
  sin esfuerzo, y la cara del conductor se ve a través del parabrisas.
  `docs/brief-fotografico.md` prohíbe en todas las fotos del sitio las
  patentes legibles y las caras sin permiso. El logo TOYOTA de la parrilla es
  la marca del vehículo, no de un cliente, así que la regla de logos de
  clientes no aplica. La foto muestra una pick-up en el campo, no el taller.
  Esta imagen es la que WhatsApp muestra cuando alguien comparte el enlace. El
  sitio todavía no está publicado.
- **Qué hice mientras tanto:** generé la imagen tal como pide la spec (1200×630,
  recorte centrado, 158 KB) y no la retoqué. No tapé nada por mi cuenta. El
  encuadre en sí está bien: el recorte solo quita 20 px arriba y abajo. El
  `og:image:alt` ("Centro Mecánico DGP — Pick-up en campo agropecuario, Villa
  María, Córdoba") describe esta foto; cuando se rehaga la imagen con F-01 o
  F-07 va a necesitar un texto nuevo, que no escribo yo.
- **Respuesta (2026-09-18):** se resuelve en dos partes.
  a) La imagen para compartir pasa a ser una placa institucional sin foto:
  1200×630, fondo `#124B8F` y el logo centrado al 40 % del ancho, sin texto.
  Hecho en `a3e29bd`: `public/assets/og-placa.jpg` (35,9 KB), con
  `og:image`, `twitter:image` y el `image` del JSON-LD apuntando a ella, y
  `og-image.jpg` borrado. El `og:image:alt` quedó como `TODO_DATO` (P-006).
  b) La foto actual del hero queda bloqueada para publicar: el sitio no se
  publica hasta que F-01 la reemplace. Anotado como bloqueante de M5 en
  P-007, en `docs/informe-m2b.md` y en `docs/brief-fotografico.md` (F-01 pasa
  a requisito).

### P-004 — ¿Se borra `public/favicon.png`?
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** confirmar si se borra `public/favicon.png`, que quedó sin uso.
- **Contexto:** en la Tarea 5 de M2b los enlaces del `<head>` pasaron a
  `favicon-32.png` (32×32, 3,0 KB) y `apple-touch-icon.png` (180×180, 34,8 KB).
  Ya nada referencia a `favicon.png` (35 KB): `grep` sobre `public/` y `tools/`
  vuelve vacío. La spec no dice que se borre, y `CLAUDE.md` §7 dice que no se
  borran archivos sin preguntar. Una copia idéntica quedó en
  `assets-src/favicon-original.png`, que es de donde el script genera los
  íconos.
- **Qué hice mientras tanto:** nada. El archivo sigue en `public/`. No afecta la
  carga de la página, porque ningún navegador lo pide.
- **Respuesta (2026-09-18):** se borra, porque nada lo referencia. Hecho en el
  commit "Sin favicon sin uso". El original sigue en
  `assets-src/favicon-original.png`, que es de donde salen los íconos.

### P-005 — Tercer subconjunto de Roboto (symbols) para las estrellas
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** confirmar que se queda `roboto-symbols.woff2` (20,6 KB), aunque
  la spec pide solo latin y latin-ext.
- **Contexto:** `docs/spec-m2b-rendimiento.md`, Tarea 6, punto 2: "subconjunto
  **latin** y **latin-ext**". Las estrellas `★` (U+2605) de `.g-star` y
  `.t-star` (recuadro de Google y tarjetas de reseñas) no están en ninguno de
  los dos: Google las servía desde el subconjunto symbols de Roboto, y era el
  segundo archivo de Roboto que bajaba antes de M2b. Sin ese archivo, las
  estrellas se dibujarían con la fuente del sistema de cada dispositivo. La
  Tarea 8 dice que cualquier diferencia visual es un error.
- **Qué hice mientras tanto:** decisión mía. Descargué el subconjunto symbols y
  lo declaré solo en peso 400, que es el único en que aparecen estrellas. Con
  eso el render quedó idéntico píxel a píxel al de antes, a 1440 y 390 px. Si se
  prefiere no servirlo, alcanza con borrar su `@font-face` y el archivo: se
  ahorran 20,6 KB y las estrellas cambian de forma según el dispositivo.
- **Respuesta (2026-09-18):** el subconjunto symbols se queda por ahora.
  **Para M2c:** las estrellas `★` de las reseñas (`.g-star` y `.t-star`) pasan
  a SVG en línea, y ahí se eliminan `roboto-symbols.woff2` y su `@font-face`.
  Bajar 20,6 KB para un solo carácter no conviene.

### P-006 — Texto alternativo de la placa para compartir
- **Estado:** respondida
- **Bloquea:** no bloquea. Hay que resolverla antes de publicar (M5).
- **Qué falta:** el texto del `og:image:alt` para la placa institucional (el
  logo sobre el azul corporativo).
- **Contexto:** `public/index.html`, línea 30. La imagen para compartir pasó a
  ser `assets/og-placa.jpg` (resolución de P-003). El `og:image:alt` anterior
  ("Centro Mecánico DGP — Pick-up en campo agropecuario, Villa María,
  Córdoba") describía la foto del hero y ya no corresponde. Es texto de cara
  al usuario, así que no lo escribo yo.
- **Qué hice mientras tanto:** dejé
  `content="TODO_DATO: texto alternativo de la placa institucional (logo sobre azul)"`.
- **Respuesta (2026-09-21):** el `og:image:alt` queda "Logotipo de Centro
  Mecánico DGP", que es exactamente lo que muestra la placa. Reemplaza el
  `TODO_DATO`.

### P-010 — La puntuación de cada reseña publicada no está en los datos verificados
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** confirmar en `docs/datos-verificados.md` que las cuatro reseñas
  publicadas son de 5 estrellas.
- **Contexto:** la Tarea 5 de M2c pide `aria-label="5 de 5"` en las estrellas de
  cada reseña. El sitio muestra cinco estrellas en las cuatro tarjetas desde
  antes de M2a, y `datos-verificados.md` §6 dice que las reseñas se verificaron
  una por una contra la ficha, pero no registra cuántas estrellas tiene cada
  una. Solo registra el 4,9 general y las dos negativas (3 y 1 estrellas), que
  no son de las publicadas.
- **Qué hice mientras tanto:** puse `aria-label="5 de 5"`, como dicta la spec.
  Repite lo que ya se ve en pantalla y no agrega ningún dato. Si alguna de las
  cuatro no es de 5 estrellas, hay que corregir tanto las estrellas visibles
  como la etiqueta.
- **Respuesta (2026-09-21):** Ramiro verificó contra la ficha que las cuatro
  reseñas publicadas tienen 5 estrellas. `aria-label="5 de 5"` en cada una es
  correcto. Quedó registrado en `docs/datos-verificados.md` §6 (commit
  `5dc7a66`). No hubo que cambiar nada en `public/`.

### P-008 — El título de "Casa de Repuestos" nunca se vio en rojo
- **Estado:** respondida
- **Bloquea:** no bloquea. Es una decisión de color, que va a M3.
- **Qué falta:** decidir si el título de la tarjeta destacada "Casa de
  Repuestos" (pestaña "Repuestos" de Nuestros Servicios) tiene que verse en
  rojo `#D32027`, como pretendía el CSS, o en el gris de las demás tarjetas,
  como se vio siempre.
- **Contexto:** antes de M2c, la regla `.service-card--highlight h4 { color:
  #D32027; }` tenía la misma especificidad que `.service-card h4`, que está
  más abajo en el CSS y la pisaba. El título salía gris (`#2D2D2D`). Al pasar
  los estilos de etiqueta a clases (Tarea 4), la regla roja empezó a ganar y
  el título se puso rojo. Lo detecté al comparar el estilo computado de los
  37 encabezados con todas las pestañas visibles; en las capturas no aparecía,
  porque esa pestaña está oculta.
- **Qué hice mientras tanto:** decisión mía. Dejé el aspecto de antes: la regla
  pasó a `:where(.service-card--highlight) .service-card-title`, con la misma
  especificidad que `.service-card-title`, así que sigue sin aplicarse, con un
  comentario que remite a esta pregunta. Si en M3 se quiere el rojo, alcanza
  con sacar el `:where( )`. El recuadro rojo y la etiqueta roja de la tarjeta
  no cambian en ningún caso.
- **Respuesta (2026-09-21):** se queda en gris. El manual de marca reserva el
  rojo para alertas. La regla pasó a
  `.service-card--highlight .service-card-title { color: var(--gris); }`, con
  el gris explícito y más especificidad que `.service-card-title`, así que el
  rojo no puede volver a aparecer por un cambio en el orden del CSS. El
  recuadro y la etiqueta rojos de la tarjeta no se tocaron.

### P-009 — Nivel de los títulos de columna del pie
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** confirmar el nivel de "Navegación", "Servicios" y "Contacto"
  en el pie. Antes eran `<h5>`.
- **Contexto:** la Tarea 4 dice que pasan "al nivel que corresponda según lo
  que tengan encima". Encima está el `<h2>` "¿Necesitás atención para tu
  flota?", de la sección de contacto. Sin saltos caben dos opciones: `<h3>`
  (colgando de ese h2, que es lo que dice la letra de la spec) o `<h2>` (el
  pie es una región propia, fuera del `<main>`, y sus columnas no son partes
  de la sección de contacto).
- **Qué hice mientras tanto:** decisión mía. Los puse en `<h3>`, siguiendo la
  letra de la spec, con la clase `footer-col-title`, que tiene el mismo estilo
  de antes. Si se prefiere `<h2>`, es cambiar las tres etiquetas: el aspecto
  no depende del nivel.
- **Respuesta (2026-09-21):** van en `<h2>`. La spec estaba mal redactada: el
  pie es una región propia, fuera del `<main>`, y con `<h3>` un lector de
  pantalla lee sus títulos como subsecciones de "Contacto". Se cambiaron las
  tres etiquetas y se mantuvo la clase `footer-col-title`. El aspecto no
  cambió.

### P-011 — Contadores del hero partidos a mitad de palabra por debajo de 390 px
- **Estado:** respondida
- **Bloquea:** no bloquea. Es de M3, junto con el contador `08–17:30hs`.
- **Qué falta:** decidir si se acepta cómo se ven los contadores entre 320 y
  389 px, o qué se cambia en M3.
- **Contexto:** la Tarea 6 de M2c arregló el desborde como pide la spec:
  columnas `minmax(0, 1fr)`, `min-width: 0` y `overflow-wrap: anywhere`, sin
  achicar el texto. La página ya no desborda a ningún ancho, ni con 30
  caracteres en un contador. La contracara es que, cuando una palabra no entra
  en la celda, se parte donde se termina el lugar. Con 1,9 rem y 24 px de
  relleno a cada lado:
  - a 320 y 340 px: "STOC / K" y "17:30 / hs" (320) o "17:30h / s" (340);
  - a 360 px: "17:30h / s". Antes del arreglo, a 360 entraba entero porque las
    columnas eran desiguales (160 y 167 px); ahora las dos miden 160.
  - a 390 px y más: igual que antes.
  Capturas: `temporary screenshots/m2c-t6-contadores-*.png`.
- **Qué hice mientras tanto:** nada más que lo que pide la spec. No achiqué el
  texto (la spec lo prohíbe) ni cambié la cantidad de columnas o el relleno:
  eso es diseño y no está dictado. Opciones para M3: menos relleno lateral por
  debajo de 390 px, una sola columna en pantallas angostas, un tamaño de letra
  que dependa del ancho de la pantalla (no del texto), o contadores más cortos.
- **Respuesta (2026-09-21):** era una regresión. Por debajo de 390 px, el
  número de cada contador achica su tipografía de forma progresiva:
  `@media (max-width: 389.98px) { .stat-num { font-size: clamp(1.4rem,
  11.43vw - 0.886rem, 1.9rem); } }`, que da 22,4 px a 320 y 30,4 px a 390.
  El cálculo sale de la palabra más ancha, "17:30hs", que ocupa 3,92 veces el
  tamaño de letra, y del lugar de la celda, que es la mitad del ancho de la
  pantalla menos 68 px. `overflow-wrap: anywhere` se queda como red de
  seguridad. Verificado a 320, 340, 360, 375 y 390 px: ninguna palabra
  partida y ningún desborde. "08–17:30hs" va en dos renglones, cortado
  después del guion, igual que a 390 px antes de M2c. La prueba de 30
  caracteres no desborda. A 390 px y más, idéntico a antes.
