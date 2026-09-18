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

### P-004 — ¿Se borra `public/favicon.png`?
- **Estado:** abierta
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

### P-005 — Tercer subconjunto de Roboto (symbols) para las estrellas
- **Estado:** abierta
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

### P-006 — Texto alternativo de la placa para compartir
- **Estado:** abierta
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
