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

---

### P-021 — La Tarea 5 se llevó el único "desde 2022" de la página
- **Estado:** abierta
- **Bloquea:** las Tareas 6 a 12 no, se pueden hacer igual. **Mi lectura:**
  bloquea el cierre del módulo en la Tarea 13 y la publicación, porque mientras
  falte, la página incumple `datos-verificados.md` §1. Si Ramiro lo ve de otra
  manera, lo dice y sigo.
- **Qué falta:** en qué sección va a aparecer "desde 2022" y con qué palabras.
  Las dos cosas son texto de cara al usuario y no las escribo yo
  (`CLAUDE.md` §1).
- **Contexto:** `datos-verificados.md` §1, "Cómo escribir la trayectoria
  (obligatorio)", punto 3: `"desde 2022"` tiene que aparecer al menos una vez
  en la página, en la sección que habla de la trayectoria. La única aparición
  estaba en el subtítulo de "¿Por qué elegirnos?"
  (`ecda75f:public/index.html:1221`: "Centro Mecánico DGP funciona desde 2022,
  con un equipo que lleva más de 20 años en el rubro."), que es una de las dos
  secciones que la Tarea 5 borra completas. La spec de M3 no la repone en
  ninguna tarea: `grep -c "2022" docs/spec-m3-home.md` da 0. Hoy
  `grep -rn "2022" public/` no da ninguna coincidencia, y el JSON-LD tampoco
  tiene `foundingDate` ni nada que lo supla. Lo encontró el subagente revisor
  al auditar la Tarea 5 (`docs/revisiones/m3-t5.md`, hallazgo 1); ni el plan ni
  el informe de la tarea lo habían visto. La contradicción entre la spec de M3
  y `datos-verificados.md` es exactamente el caso de `CLAUDE.md` §9.
- **Qué hice mientras tanto:** nada en el código, y **no dejé `TODO_DATO`**.
  **Decisión mía:** un `TODO_DATO` marca el lugar donde va el dato, y acá el
  lugar es justamente lo que falta decidir: la sección que lo contenía ya no
  existe, y ponerlo en cualquier otra sería elegir yo. El registro queda acá.
  El contador del hero ("+20", "años de experiencia del equipo") sigue
  cumpliendo el punto 2 de esa misma sección, así que no hay ninguna mención
  que atribuya los 20 años a DGP: lo que falta es solo el "desde 2022".

---

### P-022 — El "dibujo de tarjeta de crédito" que la Tarea 6 manda reemplazar ya no existe
- **Estado:** abierta
- **Bloquea:** no bloquea el resto del módulo. La Tarea 6 quedó ejecutada, pero
  **no la doy por cerrada** hasta que Ramiro confirme este punto
  (`CLAUDE.md` §9, punto 4).
- **Qué falta:** confirmar que el ícono de código QR del bloque nuevo es lo que
  pedía ese punto de la spec.
- **Contexto:** la Tarea 6 dice: "**Ícono:** reemplazar el dibujo de tarjeta de
  crédito por un ícono simple de código QR o de documento". Ese dibujo era
  `<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>`, el
  ícono de la tarjeta "Libreta digital del vehículo" que estaba dentro de
  Servicios. La **Tarea 4** ya lo borró al rearmar las pestañas: lo quitó el
  commit `71f1d4f`, y hoy `grep` de ese `rect` sobre `public/` no da ninguna
  coincidencia. Así que el punto no se puede cumplir tal como está escrito: no
  hay nada que reemplazar. Es el caso de `CLAUDE.md` §9, "una instrucción no se
  puede cumplir tal como está escrita".
- **Qué hice mientras tanto:** **decisión mía:** cumplí el fondo del pedido en
  lugar de la letra. El bloque nuevo lleva el ícono de código QR que la spec
  nombra, en SVG en línea y con el mismo trazo que los demás íconos del sitio
  (`viewBox="0 0 24 24"`, sin relleno, trazo de 2 px en `--azul`, en una caja
  de 44x44 con fondo `--gris-bg`, igual que `.service-icon`). Elegí el QR y no
  el de documento porque el párrafo del bloque habla justamente del QR pegado
  en el vehículo. Queda un comentario en el HTML con el commit que borró el
  dibujo viejo. Si Ramiro quería otra cosa, se cambia el `<svg>` y nada más.

---

### P-023 — La descripción literal de la libreta en §14 y la de la spec no coinciden
- **Estado:** abierta
- **Bloquea:** no bloquea. La Tarea 6 usa el texto de la spec.
- **Qué falta:** decidir si la frase de `datos-verificados.md` §14 es literal o
  de referencia.
- **Contexto:** §14 dice: *Nombre a usar en el sitio: **Libreta digital del
  vehículo**, con esta descripción debajo: "Historial de reparaciones de cada
  vehículo. Se escanea el código QR pegado en el vehículo y se abre desde el
  celular, sin instalar nada."* La spec de M3, Tarea 6, pone en ese lugar otras
  palabras: la bajada `El historial de reparaciones de tu vehículo, siempre en
  tu celular.` y el párrafo `Cada vehículo que atendemos lleva un código QR
  pegado. Lo escaneás con el celular y se abre la libreta, sin instalar nada.
  La tienen todos nuestros clientes, particulares y empresas.` El nombre sí es
  exactamente el prescrito. **No hay ningún dato distinto:** cada hecho de la
  frase de §14 está en el bloque, y los cinco ítems de "Qué guarda" son cinco
  de los campos que §14 enumera. La diferencia es de redacción, y tiene un
  motivo: la frase de §14 está en tercera persona y el §18 exige voseo en toda
  la web, así que la spec la pasa a voseo y la reparte en dos. O sea que la
  spec resuelve una tensión interna de `datos-verificados.md`. Aun así, §9 dice
  que una contradicción entre la spec y este archivo se anota, y no estaba
  anotada. Lo levantó el revisor de la Tarea 6
  (`docs/revisiones/m3-t6.md`, hallazgo 2).
- **Qué hice mientras tanto:** **decisión mía:** usé el texto de la spec, que
  es el que Ramiro aprobó para M3 y el que respeta el voseo. Si Ramiro quiere
  que §14 valga al pie de la letra, el cambio es reemplazar esos dos textos.
  Lo que conviene decidir de fondo es si §14 fija la frase o solo los hechos:
  de eso depende también M7, la página de flotas.

---

### P-024 — La tarjeta "Casa de Repuestos" de Servicios repite el bloque nuevo
- **Estado:** abierta
- **Bloquea:** no bloquea. La Tarea 7 quedó ejecutada y la tarjeta sigue donde
  estaba.
- **Qué falta:** decidir si la tarjeta "Casa de Repuestos" de la pestaña
  "Repuestos" se queda, se acorta o se va.
- **Contexto:** la Tarea 7 dice: "Si la pestaña 'Repuestos' de Servicios
  (Tarea 4) queda redundante con este bloque, **no la elimines**: anotalo en
  `preguntas-abiertas.md`". Queda redundante, pero **solo una tarjeta de las
  cuatro**, no la pestaña entera. La tarjeta destacada dice: "Stock propio, en
  el mismo lugar que el taller. Repuestos originales y alternativos, abierta al
  público" (`public/index.html:1535`, con la etiqueta "Diferencial clave" en la
  línea 1534). Son los mismos tres hechos que
  los tres párrafos de la sección nueva: local propio, originales y
  alternativos, abierta al público. Las otras tres tarjetas de la pestaña
  ("Filtros & Lubricantes", "Frenos & Suspensión", "Distribución") no se
  repiten: enumeran qué piezas hay, que la sección nueva no dice.
  Además, en el orden que fija la Tarea 13, Servicios va **antes** que la casa
  de repuestos, así que el lector se cruza primero con la versión corta y
  después con la larga.
- **Qué hice mientras tanto:** nada: la spec dice explícitamente que no la
  elimine, así que la dejé tal cual, con su texto y su etiqueta. Si Ramiro
  quiere sacarla, es borrar el bloque de la tarjeta y nada más; la pestaña
  queda con tres tarjetas, que es lo que ya tienen otras pestañas.

---

### P-025 — Repinté la cadena de diagonales en la Tarea 7, tocando CSS de la Tarea 6
- **Estado:** abierta
- **Bloquea:** no bloquea.
- **Qué falta:** confirmar que estuvo bien hacerlo ahora y no esperar a la
  Tarea 13.
- **Contexto:** la Tarea 6 dejó la libreta con fondo blanco y **sin** remate
  diagonal, porque debajo tenía Servicios, también blanco. El revisor de esa
  tarea verificó esa ausencia y la dio por correcta
  (`docs/revisiones/m3-t6.md`: "no agregar `::after` es coherente, no un
  olvido"). La Tarea 7 mete la casa de repuestos entre medio, con fondo
  `--gris-bg`, y entonces la libreta pasa a tener debajo una sección de otro
  color. Para no dejar el único corte recto de la página, le agregué a
  `.notebook` un `::after` en `--gris-bg` y le subí el `padding` inferior a
  148 px, que es el que ya usan `.how-we-work`, `.services` y `.testimonials`.
  Eso es tocar CSS que la Tarea 7 no nombra (`CLAUDE.md` §7).
- **Qué hice mientras tanto:** **decisión mía:** lo hice igual, porque el
  patrón "cada sección remata con una diagonal del color de la de abajo" es el
  que Ramiro ratificó al responder P-019, y bajo ese patrón el color queda
  determinado solo en cuanto aparece una sección nueva debajo: no había dos
  opciones entre las cuales elegir. La geometría es la misma que aprobó P-019
  (66 px, `clip-path: polygon(0 100%, 100% 0, 100% 100%)`). Verificado con
  estilo computado que la cadena entera cierra, de punta a punta:
  `how-we-work` → blanco → `libreta` → gris → `casa-de-repuestos` → blanco →
  `servicios` → gris → `resenas` → azul → `contacto`.
  **Pendiente para la Tarea 13:** la cadena está pintada para el orden de hoy,
  no para el orden final. Cuando la T13 mueva Servicios al segundo lugar y
  meta Flotas debajo de la casa de repuestos, hay que repintar al menos dos
  remates. Queda escrito acá para que no se pierda.

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

### P-012 — La pestaña "Repuestos" desborda en pantallas de hasta 480 px (en realidad, hasta 613)
- **Estado:** respondida
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
- **Respuesta (2026-09-21):** corregir el desborde. Al medir ancho por ancho
  (de 470 a 700 px) apareció un error en el dato de esta pregunta: la pestaña
  no desbordaba solo a 480 px o menos, sino **de 320 a 613 px**. Sus cuatro
  columnas no bajan de 130 px cada una y, con los espacios, necesitan 614 px.
  Arreglarlo solo a 480 px o menos dejaba el desborde entre 481 y 613.
  **Decisión mía:** la regla con `id` se repite dentro de los media queries
  existentes, con las columnas de las demás pestañas:
  `#tab-repuestos.tab-panel.active { grid-template-columns: repeat(2, 1fr); }`
  en el de 768 px y `… { grid-template-columns: 1fr; }` en el de 480 px. Por
  encima de 768 px no cambia nada: 4 columnas, como antes. Alternativa, si se
  prefiere: borrar la regla con `id`. Así "Repuestos" se comportaría como las
  demás pestañas a cualquier ancho, pero entre 769 y 1200 px pasaría de 4 a 3
  columnas. Verificado: la pestaña ya no desborda por sí misma a ningún ancho
  entre 320 y 1440 px. Solo queda el desborde de 481 a 487 px, que es de toda
  la página (P-013).
- **Confirmación (2026-09-22):** Ramiro confirma la decisión; se queda así.

### P-014 — Texto de la spec de M2c para P-009 y P-011
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** el texto nuevo de dos puntos de `docs/spec-m2c-tecnica.md`,
  que quedaron desfasados con las respuestas del 2026-09-21:
  1. Tarea 4, punto 2: "los `<h5>` del pie pasan al nivel que corresponda
     según lo que tengan encima". Por P-009 van en `<h2>`, porque el pie es
     una región propia.
  2. Tarea 6, punto 2: "Corregir con maquetación, no achicando el texto a
     medida…". Por P-011, por debajo de 390 px el número achica su
     tipografía de forma progresiva con `clamp()`, y `overflow-wrap:
     anywhere` queda como red de seguridad. El punto 3 ("solo por debajo de
     390 px") y el 4 (anchos verificados, ahora con 375) también cambian.
- **Contexto:** la spec tiene que decir lo que se hizo. El texto de la spec no
  lo escribo yo.
- **Qué hice mientras tanto:** nada en la spec. El código ya sigue las
  respuestas.
- **Respuesta (2026-09-22):** Ramiro pasó el texto de los dos puntos, y ya
  están reemplazados en `docs/spec-m2c-tecnica.md`. Tarea 4, punto 2: los
  `<h5>` del pie pasan a `<h2>` porque el pie es una región propia (P-009).
  Tarea 6, punto 2: `clamp()` por debajo de 390 px y `overflow-wrap: anywhere`
  solo como red de seguridad (P-011). Lo único que cambié yo fue el formato: le
  puse comillas invertidas a las etiquetas y al CSS, como en el resto de la
  spec. Los puntos 3 y 4 de la Tarea 6 no se tocaron. El 4 sigue sin nombrar
  375 px.
- **Actualización (2026-09-22):** Ramiro pasó el texto del punto 4 de la
  Tarea 6, con los 375 px, y ya está reemplazado en la spec.

### P-013 — La página desborda entre 481 y 487 px
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** decidir en qué módulo se corrige.
- **Contexto:** entre 481 y 487 px de ancho la página mide 488 px y aparece
  scroll horizontal, con cualquier pestaña de servicios. Lo que sobresale es
  la grilla de "Nuestro proceso de trabajo": en el media query de 900 px pasa
  a `repeat(3, 1fr)` con `gap: 40px`, cada paso (`div.step`) no baja de
  130 px, y recién el media query de 480 px la pasa a una columna. Ya pasaba
  antes de M2c (medido sobre `5bbabf4`). Las verificaciones de M2a a M2c no lo
  vieron, porque solo miden a 320, 390, 768, 1440 y 1920 px. Lo encontré al
  medir la pestaña "Repuestos" ancho por ancho (P-012).
- **Qué hice mientras tanto:** nada, porque no estaba pedido. Sería del mismo
  tipo que la Tarea 6 de M2c: columnas `minmax(0, 1fr)`, o un punto de corte
  intermedio para la grilla del proceso.
- **Respuesta (2026-09-22):** no se corrige. La grilla de "Nuestro proceso"
  desaparece en M3: la reemplaza la sección "Cómo trabajamos" (Tarea 5 de
  `docs/spec-m3-home.md`). En esa tarea quedó anotado que hay que verificar
  que la sección nueva no desborde entre 481 y 487 px. Hasta la Tarea 5, el
  barrido de anchos de cada tarea va a seguir mostrando este desborde, y no
  cuenta como regresión.
- **Cierre (2026-09-25):** hecho y medido. La Tarea 5 borró la sección
  "Nuestro proceso" entera, HTML y CSS, incluidos `.process-steps` y `.step`.
  El barrido de 320 a 1920 px de a 1 px, con las cinco pestañas de servicios y
  el menú móvil abierto —1601 anchos, 8454 mediciones—, da **cero desbordes**,
  el primero del proyecto que sale limpio. El tramo 481–487 px que pedía
  verificar la Tarea 5 mide `scrollWidth` igual a `innerWidth` en los tres
  anchos capturados (481, 484 y 487 px).

### P-015 — La etiqueta del hero sigue verde sobre la foto y no llega al mínimo
- **Estado:** respondida
- **Bloquea:** no bloquea. Afecta la Tarea 3 de M3.
- **Qué falta:** decidir cómo se ve la etiqueta de arriba del título del hero,
  que en la Tarea 3 pasa a decir "Especialistas en pick-ups y utilitarios".
- **Contexto:** `.hero-badge` en `public/index.html`: texto verde `#7DB919` con
  borde verde, sin fondo propio, directo sobre la foto. Mide 3,22:1 en el 10 %
  más desfavorable de la foto y 3,50:1 en la mediana. Como es texto chico, el
  mínimo es 4,5:1 (`docs/contraste-m3.md`). La Tarea 1 no la corrigió. Oscurecer
  el verde o bajarle la opacidad, que es lo único que permite la spec, empeora
  el contraste sobre fondo oscuro. Además, el punto 5 deja lo que está sobre la
  foto para cuando llegue F-01. Con el texto nuevo de la Tarea 3, el problema
  sigue igual.
- **Qué hice mientras tanto:** nada. Una opción para la Tarea 3 sería darle a
  la etiqueta un fondo propio. Ahí sí se puede medir contra un color fijo,
  aunque cambie la foto. La otra es esperar a F-01 y volver a medir.
- **Respuesta (2026-09-22):** se resuelve dentro de la Tarea 1 de M3. La
  etiqueta pasa de texto verde suelto a una píldora de fondo sólido, porque
  texto suelto sobre una foto tiene un fondo inestable por definición. Un fondo
  sólido fija el contraste, sin depender de la imagen que haya detrás. Fondo y
  borde: `#588212`, que es el verde corporativo `#7DB919` con el mismo tono y la
  misma saturación (HSL 82,5°, 76,2 %) y la luminosidad bajada de 41,2 % a
  29,0 %. Es el mínimo que llega a 4,5:1 con texto blanco: da 4,55:1, y un
  paso antes (`#588312`) queda en 4,497:1. Texto blanco. La forma de píldora
  (`border-radius: 100px`) ya estaba y no cambió. Medición en
  `docs/contraste-m3.md`.
---

### P-016 — Texto de la tarjeta "Casa de Repuestos": "inmediato" y "originales y alternativos"
- **Estado:** respondida
- **Bloquea:** no bloquea. Afecta la Tarea 4 de M3.
- **Qué falta:** el texto nuevo del párrafo de la tarjeta "Casa de Repuestos".
- **Contexto:** `public/index.html`, pestaña "Repuestos". El párrafo decía
  «Stock propio e inmediato. Repuestos originales y alternativos para las
  principales marcas de pick-ups.» La Tarea 4 de `docs/spec-m3-home.md` manda
  marcar toda tarjeta que contenga "inmediato" u "originales y alternativos" y
  no tocarla hasta tener el texto. Es un hallazgo diferido desde M2a (informe
  de M2a, §7).
- **Qué hice mientras tanto:** la tarjeta se movió de pestaña con su texto
  intacto, en el commit de la reorganización.
- **Respuesta (2026-09-23):** el párrafo pasa a «Stock propio, en el mismo
  lugar que el taller. Repuestos originales y alternativos, abierta al
  público.» Sale solo "inmediato": `datos-verificados.md` §18b dice que "stock
  inmediato" no se puede afirmar, porque una de cada cuatro veces hay que
  pedir el repuesto afuera. **"Originales y alternativos" se queda**, porque
  la misma §18b lo da por verificado ("se trabaja con los dos"). El texto
  quedó escrito en `docs/spec-m3-home.md`, Tarea 4, "Textos definitivos".

---

### P-017 — Cinco tarjetas de servicios con lenguaje no verificable o del posicionamiento anterior
- **Estado:** respondida
- **Bloquea:** no bloquea. Afecta la Tarea 4 de M3.
- **Qué falta:** decidir si se reescriben cinco tarjetas que **no** disparan el
  criterio literal de la Tarea 4.
- **Contexto:** al inventariar las 19 tarjetas para la Tarea 4 aparecieron
  cinco párrafos que no contienen ninguna afirmación de la lista "prohibidas
  por genéricas" de `datos-verificados.md` ni las palabras "inmediato" u
  "originales y alternativos", pero que dicen lo mismo con otras palabras:
  «Identificación precisa de fallas» (Diagnóstico OBD), «Ajuste preciso de
  parámetros del motor» (Reprogramación ECU) y «para rendimiento óptimo»
  (Sistemas de Inyección) son calidad no verificable; «operaciones diurnas y
  nocturnas» (Iluminación) y «terrenos rurales exigentes» (Kit Altura &
  Ensanche) son el idioma del posicionamiento que M3 deja atrás. Como el
  criterio literal no las alcanza, no las marqué por mi cuenta.
- **Qué hice mientras tanto:** las cinco se movieron de pestaña con su texto
  intacto, en el commit de la reorganización.
- **Respuesta (2026-09-23):** se reescriben las cinco. Ramiro sumó además una
  sexta que no estaba en el inventario marcado, «Frenos & Suspensión»: decía
  "todas las piezas de recambio", que contradice el 75% de stock propio
  publicado en el hero. Los siete textos (estos seis más el de P-016) están en
  `docs/spec-m3-home.md`, Tarea 4, "Textos definitivos", y se aplican en un
  commit separado del de la reorganización.

---

### P-018 — Los enlaces siguen diciendo "¿Por qué elegirnos?" y llevan a "Cómo trabajamos"
- **Estado:** respondida
- **Bloquea:** no bloquea. Afecta la Tarea 5 de M3.
- **Qué falta:** decidir el texto visible de los enlaces que apuntaban a la
  sección "¿Por qué elegirnos?", que la Tarea 5 borra.
- **Contexto:** la Tarea 5 de `docs/spec-m3-home.md` manda que "los enlaces del
  menú y del pie que apuntaban a las secciones eliminadas pasan a apuntar a
  esta", pero no dice qué tienen que decir. Son tres, no dos como yo había
  listado en el plan (el menú de escritorio y el móvil son dos bloques de
  markup distintos, no uno solo): `.navbar-links`, `#navMobile` y la columna
  "Navegación" del pie.
- **Qué hice mientras tanto:** nada por mi cuenta; esperé la decisión.
- **Respuesta (2026-09-25):** los tres enlaces pasan a `#como-trabajamos` y
  **conservan el texto "¿Por qué elegirnos?"**. Decisión de Ramiro, tomada
  sabiendo que el rótulo y el destino no coinciden. Hecho y verificado con
  clic real en los tres: los tres llevan a la sección nueva.

---

### P-019 — El remate diagonal de la sección nueva: lo dejé, contra lo que dije en el plan
- **Estado:** respondida
- **Bloquea:** no bloquea. Afecta la Tarea 5 de M3, ya ejecutada.
- **Qué falta:** confirmar si la sección "Cómo trabajamos" conserva el remate
  diagonal al pie, o si se va.
- **Contexto:** en el plan de la Tarea 5 escribí que se perdía el remate
  diagonal de `.why-us::after`, "que empalmaba con el fondo oscuro del proceso
  y se queda sin a qué empalmar". **Eso era un error mío:** al ir a borrarlo vi
  que todas las secciones de la página encadenan diagonales, cada una pintada
  del color de la sección siguiente (`.why-us::after` en `--azul-dark` por el
  proceso, `.process::after` en `--blanco` por servicios, `.services::after` en
  `--gris-bg` por reseñas). Sin diagonal, la sección nueva (fondo `--gris-bg`)
  chocaría contra Servicios (fondo blanco) con un corte recto, y sería la única
  transición recta de la página.
- **Qué hice mientras tanto:** **decisión mía, contra mi propio plan:** puse
  `.how-we-work::after` con la misma geometría que tenía `.why-us::after`
  (66 px de alto, `clip-path: polygon(0 100%, 100% 0, 100% 100%)`) y el color
  `--blanco`, que es el que le corresponde por tener Servicios abajo. Se ve en
  las capturas `m3-t5-como-*.png`. Si Ramiro prefiere el corte recto, se borra
  la regla entera y no toca nada más.
- **Respuesta (2026-09-25):** la diagonal se queda. Decisión de Ramiro,
  tomada sobre la geometría y el color que dejé puestos: `.how-we-work::after`
  con 66 px de alto, `clip-path: polygon(0 100%, 100% 0, 100% 100%)` y color
  `--blanco`. No se toca nada más.

---

### P-020 — Aire bajo el hueco F-02 en escritorio y alto del hueco entre 481 y 900 px
- **Estado:** respondida
- **Bloquea:** no bloquea. Afecta la Tarea 5 de M3, ya ejecutada.
- **Qué falta:** decidir si el hueco F-02 se queda como está o se ajusta.
- **Contexto:** la disposición es la que eligió Ramiro (escritorio: foto a la
  izquierda y los cinco pasos en una sola columna a la derecha; celular: foto
  arriba y pasos abajo). Medido con el hueco vacío: a 1440 px el hueco mide
  546x364 px y la columna de pasos 860 px, así que quedan unos 500 px de fondo
  vacío debajo de la foto. Entre 481 y 900 px, donde la grilla ya es de una
  columna, el hueco ocupa el ancho completo y llega a 469 px de alto a 768 px:
  se come casi una pantalla antes del primer paso.
- **Qué hice mientras tanto:** **decisión mía:** lo dejé como está, con
  `align-items: start` y el hueco al ancho de su columna, porque es lo que
  dicta la disposición aprobada y porque el rectángulo gris exagera el efecto:
  con la foto real de F-02 adentro, esos 364 y 469 px de alto son foto y no
  vacío. Las tres salidas, si molesta, son de una línea cada una:
  `align-items: center` en `.how-grid` para centrar la foto en escritorio, un
  `max-width` en `.img-slot` por debajo de 900 px, o `position: sticky` en la
  foto. No elijo ninguna por mi cuenta.
- **Respuesta (2026-09-25):** el hueco queda como está hasta que llegue la
  foto F-02. Decisión de Ramiro. Ninguna de las tres salidas se aplica por
  ahora; si con la foto real adentro sigue molestando, se reabre.
