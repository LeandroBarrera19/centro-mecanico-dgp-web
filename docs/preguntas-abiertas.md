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

**Sobre las referencias de línea** (las de la forma `public/index.html` más dos
puntos y un número): son **fechadas**.
Señalan dónde estaba el elemento el día en que se escribió la pregunta, no dónde
está hoy. Cada tarea que agrega o borra renglones las corre todas, y las que
apuntan a un elemento ya eliminado no se pueden actualizar a ningún número. Para
encontrar algo hoy se busca el elemento, no la línea. Las que llevan un hash de
commit adelante sí son exactas, porque apuntan a una versión congelada.

**Decisión mía en la Tarea 13 de M3**, después de auditar las **25**
referencias del archivo: 2 históricas, con hash de commit, que son exactas, y
**23 al archivo de ese día, todas corridas**. La alternativa era reescribir esos
23 números, y varios apuntan a elementos que ya no existen, así que habría
habido que inventarlos. **Esto cambia el criterio que aplicó la Tarea 12**, que
sí las actualizó una por una; el motivo del cambio es que cada unidad de trabajo
vuelve a romperlas y que la mitad ya no tiene destino. La auditoría completa,
referencia por referencia, está en `docs/planes/m3-informe.md`.

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
- **Nota (2026-09-28):** sigue abierta. Ramiro la repasó al responder el
  resto de las preguntas de M3 y confirmó que depende de la foto F-01.
- **Nota (2026-10-12):** F-01 llegó y el inicio ya la usa (P-075). Queda
  borrar las versiones de la foto anterior: se le preguntó a Ramiro en P-078.

---

### P-053 — La lista de binarios del `.gitattributes` cubre seis extensiones, no las vecinas
- **Estado:** abierta
- **Bloquea:** no bloquea. Hoy no hay ningún archivo afectado.
- **Qué falta:** decidir si se agregan `*.jpeg` y `*.woff`, que son los vecinos
  directos de dos extensiones que sí están.
- **Contexto:** Ramiro dictó seis extensiones —`png`, `jpg`, `webp`, `avif`,
  `woff2`, `ico`— y se pusieron esas seis y nada más: agregar otras habría sido
  decidir por él. El revisor comprobó con `git check-attr` que quedan **fuera**
  `*.jpeg`, `*.woff`, `*.ttf`, `*.otf`, `*.pdf`, `*.zip`, `*.gif` y `*.mp4`,
  que pasarían por `text=auto`.
- **Por qué el riesgo es acotado, medido en un repositorio de prueba:**
  `text=auto` detecta un binario por su contenido, no por su nombre. Un `.pdf`
  con retornos de carro y bytes nulos **fue detectado como binario y sobrevivió
  intacto**.
  Solo se corrompería un binario **sin ningún byte nulo en sus primeros 8 kB**.
  Hoy en el repositorio no hay ninguno: el censo da 21 binarios, los 21
  cubiertos por la lista.
- **Qué hice mientras tanto:** **nada.** La lista es la que dictó Ramiro.

---

### P-078 — Lo que queda de las fotos de P-075, para Ramiro
- **Estado:** abierta
- **Bloquea:** el punto 1 bloquea la publicación (M5), igual que P-007.
- **Qué falta:**
  1. ¿Se pueden borrar los 7 archivos `public/assets/hero-bg-*` (768, 1280
     y 1920 en AVIF y WebP, y 1280 en JPG)? Son la foto del inicio con
     patente y cara (P-007). Ya no los usa ninguna página, pero si se sube
     `public/` tal cual, se publican.
  2. F-04 muestra el taller con los elevadores, no las estanterías de
     repuestos que pedía el brief, y va en las dos secciones de repuestos.
     ¿Queda así o se busca otra foto?
  3. Las cinco fotos llegaron como copias de unos 1400 px (el brief pide
     2400, 2000 o 1600 según el hueco). ¿Se pueden conseguir los originales
     del celular, como en F-07?
  4. En F-04 se ve el número "110" en la luneta de la camioneta cuyo logo se
     tapó. ¿Puede identificar al cliente? Si sí, se tapa también.
  5. Los cuatro textos alternativos de las fotos (P-075, decisión 4).
  6. F-03: si el QR del parasol se puede escanear, ¿abre una libreta de
     prueba o la de un cliente real? ¿Y la foto del parasol es de un
     vehículo del taller? Con herramientas no se pudo comprobar ninguna de
     las dos cosas.
- **Contexto:** P-075; `docs/revisiones/fotos-r1.md`.
- **Qué hice mientras tanto:** nada en los puntos 1 a 6: se publican así
  hasta que Ramiro responda.

---

## Respondidas

### P-049 — La regla de autonomía nueva choca con §9 y con dos viñetas de §7
- **Estado:** respondida
- **Bloquea:** no bloquea, pero decide casos concretos y ya decidió uno.
- **Qué falta:** decidir cuál manda cuando las dos reglas aplican al mismo
  borrado.
- **Contexto:** el bloque de autonomía que Ramiro agregó a `CLAUDE.md` §7 el
  2026-09-28 dice que solo se lo consulta por *"borrado de contenido
  **visible**"*, de donde se sigue que borrar lo **no visible** —una regla de
  CSS, un comentario— ya no se consulta. Ocho líneas más abajo, §9 sigue
  listando *"Hace falta borrar, renombrar o mover algo que la spec no
  menciona"* como **hueco**, y §7 conserva las viñetas *"No refactorices ni
  'limpies' código que la tarea no toca"* y *"No borres archivos sin
  preguntar"*. No es una colisión teórica: es exactamente la regla con la que
  el revisor de **P-024** emitió su bloqueante por borrar tres reglas de CSS,
  y es la que decide si el borrado de P-048 estaba bien.
- **Qué hice mientras tanto:** **nada en `CLAUDE.md`**, que es texto de Ramiro.
  Apliqué la interpretación que me parece la suya —borrar CSS sin uso o inerte
  es forma, y va con registro en vez de con consulta— y registré cada borrado
  como decisión propia. Lo levantó el revisor de esta pasada.
- **Un segundo roce, del mismo bloque, que conviene resolver junto:** la regla
  manda registrar las decisiones propias con estado **"respondida"**, y hasta
  hoy la cabecera de este archivo decía que "respondida" significa *Ramiro
  contestó*. P-046, P-047 y P-048 están en "respondida" **sin que él haya
  contestado nada**. Las tres dicen con todas las letras que la decisión es
  mía, así que no hay atribución falsa, pero el índice se lee distinto. Si
  conviene, una salida es un estado propio, del estilo `decidida`.
- **Respuesta (Ramiro, 2026-10-08):** la libertad que dio es para
  **proponer**, no para actuar sin consultar. Queda pendiente de él si se
  ajusta el bloque de autonomía de `CLAUDE.md` §7 para que lo diga así (es
  texto suyo y configuración del repositorio: no lo toco sin su visto bueno).
  Mientras tanto, las decisiones que no sean una corrección técnica mínima se
  proponen antes de ejecutarlas.

---

### P-055 — Decisión propia: módulo "interfaz" (arreglos de la revisión web-design-guidelines)
- **Estado:** respondida
- **Decisión propia**, tomada al ejecutar el módulo el 2026-10-05, en la rama
  `mejoras-interfaz`. Spec: `docs/spec-interfaz.md`.
- **Origen:** Leandro pidió aplicar los arreglos de interfaz de la revisión
  hecha con las skills `web-design-guidelines` y `seo-audit`, e ignorar los
  huecos de foto hasta que él agregue las fotos.
- **Corrección de la revisión, medida:** la revisión decía que el menú fijo
  tapaba el título de cada sección al saltar desde el menú. **No lo tapaba.**
  En `main`, a 1440 px, el `h2` de Servicios quedaba en 88 px y el menú
  termina en 73 px. Lo que quedaba tapado era el relleno superior de la
  sección. La T1 se mantiene por esto último y por el foco del teclado.
- **T1 — `scroll-padding-top: 73px`:** el valor es la altura del menú (72 px
  más 1 px de borde inferior), no uno redondeado con aire extra. Así cada
  sección empieza justo debajo del menú. Con 88 px, el `h2` quedaba a
  176 px, con 15 px de más que nadie pidió.
- **Sobre la spec:** `docs/spec-interfaz.md` la escribió el ejecutor a partir
  de la revisión. Leandro aprobó "los arreglos de interfaz" en general, no
  cada punto de la lista. Lo que la spec pide es, por lo tanto, también
  decisión del ejecutor.
- **T1 — `:where(.js)`:** la clase `.js` va dentro de `:where()` para que
  `.fade-in` y `.fade-in.visible` conserven la especificidad que tenían. En
  la primera vuelta, con `.js` a secas, `.fade-in.visible` le ganaba a
  `.t-card:hover`, y las reseñas dejaban de levantarse al pasar el mouse.
  Lo detectó el revisor.
- **T1 — bloque de movimiento reducido al final de la hoja:** sus selectores
  pesan lo mismo que los `:hover` que anulan, y ganan por estar después. En
  la primera vuelta estaba antes que `.btn-google-review:hover`, y ese botón
  se seguía levantando. Lo detectó el revisor.
- **Hallazgos previos a T1, que no se tocan:**
  - **`.service-card:hover` nunca levantó la tarjeta**, ni en `main`:
    `.fade-in.visible` le gana por orden. No es parte de este módulo.
  - **La `transition` de `.navbar-toggle span`** ahora lista `transform` y
    `opacity`, como pide la spec, pero ninguna regla cambia esas propiedades
    en las rayas. Era inerte antes y lo sigue siendo.
- **T2 — direcciones de las pestañas:** `#servicios-mantenimiento`,
  `#servicios-mecanica`, `#servicios-diagnostico`,
  `#servicios-aire-acondicionado` y `#servicios-repuestos`. Van sin acentos
  ni ñ, como pide §3. Las alternativas eran `#servicios-service` o
  `#servicios-ac`, derivadas de los `data-tab`, que no se entienden.
- **T2 — a qué apuntan las direcciones (tercera versión):** a cinco marcas
  vacías, `<span class="ancla-pestana">`, con `aria-hidden`, puestas arriba
  de todo de la fila de pestañas con `position: absolute`. El navegador
  desplaza solo hasta el principio de la fila, y el script únicamente abre
  la pestaña. Los botones pasaron a llamarse `pestana-<pestaña>`.
  - **Primera versión:** el `id` era el del botón. A 375 y 320 px, donde las
    pestañas ocupan varias filas, el navegador desplazaba hasta el botón y
    las filas de arriba quedaban detrás del menú (lo midió el revisor).
  - **Segunda versión:** el script desplazaba hasta la fila. Peleaba con el
    desplazamiento propio del navegador y quedaba corrida al cargar la
    dirección directamente: −56 px a 375 px con Repuestos, según el
    revisor. **La viñeta "Medido" de esa versión decía que quedaba en 73 px
    también en ese caso, y era falsa.** Mi prueba encadenaba dos
    navegaciones en la misma página y no medía una carga real. Además,
    Ctrl+clic en los enlaces del pie había dejado de abrir otra pestaña del
    navegador.
  - **Con la tercera versión todo es comportamiento normal de enlace:**
    Ctrl+clic, "Atrás", "Adelante", Enter, y funciona sin JavaScript.
  - **Medido** (página quieta, el menú termina en 73 px):
    - **Carga directa:** 40 casos (4 anchos × 5 pestañas × 2 modos de
      movimiento), fila en 73 y pestaña correcta en todos.
    - **Enlaces del pie:** 60 casos (10 anchos de 320 a 1920 × 3 enlaces ×
      2 modos), fila en 73 en todos.
    - **Sin JavaScript:** fila en 73, con el primer panel a la vista.
    - **Ctrl+clic:** abre otra pestaña del navegador con la dirección y no
      cambia la actual.
    - **Enter sobre un enlace del pie:** fila en 73, y el Tab siguiente cae
      en la pestaña abierta.
    - **Clic en una pestaña:** 0 px de desplazamiento.
  - **"Adelante":** devuelve la página al lugar donde la dejó el usuario en
    esa entrada del historial, como en cualquier sitio. Si el usuario subió
    al inicio antes de volver, "Adelante" lo deja arriba. No es una falla.
- **T2 — `data-tab` borrado:** el script usa `aria-controls`, y ya nada
  leía `data-tab`. Lo señaló el revisor.
- **T2 — activación automática:** mover el foco con las flechas también
  activa la pestaña. Es la variante recomendada por WAI-ARIA cuando los
  paneles ya están en la página y mostrarlos no cuesta nada.
- **T2 — `history.replaceState` al cambiar de pestaña:** actualiza la
  dirección sin desplazar la página ni sumar una entrada al historial. Así
  "Atrás" no recorre las pestañas una por una.
- **T2 — paneles con `tabindex="0"`:** los paneles no tienen nada enfocable
  adentro, y WAI-ARIA pide entonces que el panel mismo sea enfocable.
- **T3 — botón del menú de 44 × 44 px sin mover las rayas:**
  - **Cómo:** las rayas quedan centradas en el botón, y un `margin-right:
    -6px` las deja donde estaban, a 4 px del borde del contenedor. Medido
    contra `HEAD` a 320, 390, 600 y 830 px: posición idéntica, al píxel.
  - **`flex-shrink: 0`:** sin esto, a 320 px el logo apretaba el botón
    hasta 42,1 px y las rayas se corrían 0,95 px.
  - **Lo que cede, entre 320 y 332 px:** la caja del logo, 6 px. El texto
    sigue entero en todos esos anchos (`scrollWidth` igual a `clientWidth`).
    A 320 px la imagen pasa de 46,6 a 45,4 px de ancho. En `HEAD` ya se
    achicaba en esos anchos: el comentario del menú dice que "el que cede
    es el logo".
  - **Corrección, medida por el revisor:** acá decía que el texto quedaba
    "en las mismas líneas" en todo el tramo, pero yo solo lo había medido a
    320 px. De 320 a 331 px el nombre ocupa las mismas líneas que en `HEAD`.
    **A 332 px pasa de dos líneas a tres:** "Centro Mecánico DGP" se parte
    en dos, como ya pasaba en `HEAD` de 320 a 331. Desde 333 px vuelve a
    ser igual. Es un salto de línea distinto en un solo ancho, sin texto
    recortado. Lo dejo así: correrlo exigiría achicar el botón o el margen,
    y eso es justamente lo que pide la tarea.
  - **Desborde:** 0 de 320 a 830 px.
- **T3 — Escape:** cierra el menú solo si está abierto, y devuelve el foco
  al botón. Con el menú cerrado no hace nada, así no interfiere con Escape
  en otros lugares de la página.
- **T4 — dónde va `aria-hidden`:** en el `div` contenedor de los 17 íconos
  de servicio y de los 5 de contacto, no en cada `svg`. Es el mismo patrón
  que ya usaba `.notebook-icon`. En los tres logos de WhatsApp de botones con
  texto (inicio, reseñas y contacto) va en el `svg`, porque no tienen
  contenedor propio. El logo de WhatsApp del botón de flotas ya lo tenía.
  Medido: ningún `svg` de la página queda sin `aria-hidden` y sin nombre
  accesible (0 de 59). El único `svg` visible para un lector de pantalla
  es el logo de Google del recuadro de puntuación (`role="img"`, "Google").
  Las estrellas son `svg` ocultos, y el nombre lo lleva su contenedor
  (`role="img"`, "Puntuación 4,9 de 5" o "5 de 5"), como en `HEAD`.
  Corregido a partir de lo que midió el revisor: antes decía que las
  estrellas tenían nombre propio.
- **T4 — `translate="no"` solo en las 16 marcas de la franja**, como pide la
  spec. No se agrega al nombre del taller, "Centro Mecánico DGP": la spec no
  lo pide, y que un traductor lo pase a otro idioma no lo vuelve
  irreconocible, como sí puede pasar con "FORD" o "JEEP".
- **T5 — más textos chicos que los que nombra la spec:** la spec nombra
  tres (`.eyebrow-label` 11 px, `.brands-intro` 10 px y
  `.brand-name--secondary` ~10,9 px), pero su regla es "ningún texto
  visible por debajo de 12 px". Medido sobre la página, había otros cinco
  en 0,72rem (11,52 px):
  - el "Villa María, Córdoba" del logo (`.navbar-logo-text span`);
  - `.hero-badge`;
  - `.t-date`;
  - `.contact-item-label`;
  - `.footer-col-title`.
  
  Los ocho pasan a 12 px (`12px` o `0,75rem`, según la unidad que usaba
  cada regla). Medido después: 0 textos visibles por debajo de 12 px.
- **T5 — lo que cambia de tamaño** (comparado con `HEAD` a 320, 332, 360,
  375, 390, 414, 600, 768, 830, 1024 y 1440 px):
  - **Franja de marcas:** más alta en celulares, porque las marcas
    secundarias ocupan más filas. Crece de 6 a 32 px según el ancho (a
    414 px pasa de 182 a 212).
  - **`.hero-badge`:** a 414 px pasa de una línea a dos (de 32 a 52 px de
    alto). En los demás anchos crece 1 px.
  - **Contacto y pie:** crecen unos pocos píxeles. Yo medí entre 2 y 4 px
    en las cajas `.contact-data` y `footer`. El revisor midió en las
    secciones enteras entre 0,8 y 2,3 px.
  - **Sin cambios:** la altura del menú y la cantidad de líneas de los h1
    y h2.
  - **El logo, corregido en la segunda vuelta:** la primera vuelta decía
    "sin cambios" en el logo, y era falso. Yo había medido 830 y 1024 px y
    salteé lo que hay entre medio. El revisor midió que entre 831 y 835 px
    "Villa María, Córdoba" pasaba a dos líneas, y el bloque del logo se
    salía del menú: el renglón de arriba quedaba cortado y "Córdoba" caía
    sobre la foto del inicio, con 1,92:1 de contraste.
- **T5 — espaciado entre letras de "Villa María, Córdoba":** se bajó de
  0,05em a 0,025em. A 12 px la línea mide unos 124,6 px, apenas menos que
  los ~125,4 px que medía a 0,72rem con 0,05em. Así entra exactamente
  donde entraba antes. La alternativa, `white-space: nowrap`, habría hecho
  que el texto se saliera de su caja hacia el menú.
  - **Medido de 320 a 1920 px de a 1 px contra `HEAD`:** las líneas del
    nombre y del lugar son iguales en los 1601 anchos, y no hay desborde
    horizontal.
  - **Hallazgo previo, que no se toca:** entre 831 y 834 px el bloque del
    logo ya sobresalía del menú en `HEAD` (de −1,1 a 73,1 px, con el menú
    terminando en 73), porque el nombre ocupa tres líneas. En la rama
    sobresale de −1,4 a 73,4 px, porque la línea de 12 px es 0,6 px más
    alta. La diferencia con `HEAD` es de 0,3 px por lado. No es el
    derrame que encontró el revisor (de −8,6 a 80,2).
- **T5 — comentario reescrito:** el comentario de `touch-action` decía
  "Toque inmediato", y "inmediato" está en la lista de palabras prohibidas.
  Aunque no se ve en la página, se publica dentro del HTML. Se reescribió
  sin esa palabra.
- **T5 — `text-wrap: balance`** en `h1, h2, h3`, en una sola regla al lado
  del reset. No cambia la cantidad de líneas de ningún h1 ni h2 en los
  anchos medidos; solo reparte las palabras entre esas líneas.
- **T5 — color del resaltado al tocar:** `rgba(18, 75, 143, 0.15)`, el azul
  de la casa (`--azul`) al 15 %, en vez del gris al 18 % de Chrome. Va
  junto con `touch-action: manipulation`, en `a` y `button`.
- **T5 — verificado:**
  - **Desborde:** de 320 a 1920 px de a 1 px, en las 5 pestañas y con el
    menú móvil abierto: 0 desbordes en 8516 mediciones.
  - **Contraste** (`tools/auditar-contraste.mjs`): 381 textos, 69
    combinaciones, 0 por debajo del mínimo.
- **Hallazgo previo a T2, que no se toca:** el anillo de foco global
  (`:focus-visible`, verde `#7DB919`) tiene 2,38:1 contra blanco, debajo del
  3:1 que WCAG 1.4.11 pide para indicadores no textuales. §6 solo pide foco
  visible, y lo es. T2 lo extiende a los paneles. Cambiar el color del foco es
  una decisión de marca, fuera de este módulo.

---

### P-054 — Decisión propia: transcribir la tanda post-M3 a `docs/spec-post-m3.md`
- **Estado:** respondida
- **Decisión propia**, tomada el 2026-09-28 al guardar el estado de la ronda.
- **Qué decidí:** transcribir a un archivo del repositorio las instrucciones
  que Ramiro dictó el 2026-09-28, con el estado de cada punto y los commits que
  lo cumplen.
- **Por qué:** **dos revisiones seguidas observaron lo mismo**, y es un
  problema real de auditabilidad: *"no existe `docs/spec-post-m3*.md`; los
  puntos vienen dictados en el encargo, así que el revisor contrasta contra la
  cita, no contra un archivo versionado. Si la intención es que estas pasadas
  sean auditables después, hoy no lo son."* Sin el archivo, lo único que
  registra qué pidió Ramiro es lo que yo escribí en `preguntas-abiertas.md`, y
  eso hace que el control dependa de mi propia transcripción.
- **Qué NO hice:** no inventé nada. El archivo es transcripción literal de su
  texto, más una tabla de estado y dos avisos para el punto 4 que salieron de
  las revisiones y están atribuidos a ellas.
- **Si está mal:** se borra el archivo y no se pierde nada; todo lo que dice
  está también en `preguntas-abiertas.md` y en los informes de revisión.

---

### P-052 — Decisión propia: normalizar el árbol de trabajo de un archivo que Ramiro no nombró
- **Estado:** respondida
- **Decisión propia**, tomada al ejecutar P-044 el 2026-09-28.
- **Qué decidí:** además de agregar el `.gitattributes`, convertí a LF **el
  árbol de trabajo** de `tools/auditar-contraste.mjs`, que tenía 198 retornos
  de carro. Su índice ya estaba en LF, así que el `git add --renormalize .` no
  lo tocaba.
- **Daño: cero, medido.** El `sha256` del archivo en disco es **idéntico** al
  del blob ya commiteado en `HEAD`
  (`dcb3f8ee02954bbd851bbfe1590f4f68ae1588573619a19afe2b8382967cf3da`), así que
  para git la operación es un no-op y **no entra al commit**. Deja el archivo
  exactamente como lo dejaría el próximo `checkout` con el `.gitattributes`
  puesto.
- **Lo que observó el revisor, y que es justo:** Ramiro no nombró ese archivo,
  y su instrucción venía con un "si cambiara algo más, frená". Esa condición se
  refería al **contenido del commit**, no al árbol de trabajo, así que no hay
  incumplimiento literal; pero *"la lectura conservadora era dejarlo y que lo
  arreglara solo el checkout siguiente"*. Queda para que lo mire Ramiro.

---

### P-051 — Decisión propia: la condición del manejador de `resize`
- **Estado:** respondida
- **Decisión propia**, tomada al ejecutar P-042 el 2026-09-28.
- **Qué decidí:** el manejador que cierra el menú móvil al pasar a escritorio
  pregunta por `getComputedStyle(navToggle).display === 'none'` y **no** compara
  el ancho contra 830 px.
- **Por qué:** el ancho de corte lo fija una sola regla de CSS,
  `@media (max-width: 830px) { .navbar-toggle { display: flex } }`. Si el
  JavaScript repitiera el número, habría **dos fuentes de verdad** que se
  pueden desincronizar la próxima vez que alguien mueva el corte —y ya se movió
  una vez, de 768 a 830, al resolver P-032—. Preguntando por el estado
  computado del botón, la condición es el inverso exacto de esa regla y sigue
  al CSS sin que nadie tenga que acordarse.
- **Sobre el costo, que el revisor auditó:** `navMobile.classList.contains('open')`
  va **primero** y corta el `&&`, así que con el menú cerrado —el 100% de los
  `resize` en escritorio y de los que dispara la barra de direcciones al
  scrollear en móvil— `getComputedStyle` **no se llama** y no hay recálculo de
  estilo forzado. Medido: 810 `resize` seguidos con el menú abierto, sin
  errores ni bloqueo perceptible.
- **Un límite que conviene conocer:** si el menú llegara a estar abierto en
  escritorio, el `aria-expanded` quedaría desincronizado hasta el primer
  `resize`. El revisor comprobó que **ese estado no es alcanzable por
  interacción real**: el botón está en `display:none`, no recibe clic ni foco,
  y la clase `open` no viene en el HTML. Es inherente a un manejador que solo
  corre en `resize`.
- **Por qué tiene entrada propia:** estaba declarada como mía dentro de P-042,
  pero las otras decisiones propias de la ronda sí tienen entrada, y ahí se
  veía menos. Me lo marcó el revisor.

---

### P-050 — Decisión propia: las dos uniones con los bordes del documento no llevan remate
- **Estado:** respondida
- **Decisión propia**, tomada al ejecutar el punto 2b el 2026-09-28.
- **Qué apareció:** al aplicar la regla ampliada de P-025 —*todo cambio de
  color entre secciones lleva remate diagonal*— y medir la cadena entera sobre
  el DOM, aparecieron **dos** uniones que la incumplen y que nadie había
  mirado. Las dos son contra un borde del documento, no entre secciones:
  - **contacto → pie**, `rgb(18, 75, 143)` contra `rgb(13, 56, 112)`;
  - **navbar → hero**, `#FFFFFF` (con su borde `#E8EDF3`) contra
    `rgb(37, 81, 123)`. Esta se me había escapado y la midió el revisor,
    muestreando los píxeles de la costura a 1440 px: `y=71: 255,255,255`,
    `y=72: 232,237,243`, `y=73: 37,81,123`.
- **Qué decidí: no les agregué diagonal, a ninguna de las dos.** Tres motivos:
  1. **Ni el pie ni la barra de navegación son secciones.** La cadena de
     remates vive dentro de `<main>`; el `<footer>` y el `<header>` son otros
     puntos de referencia del documento. La regla habla de "cambio de color
     entre **secciones**", y el mismo criterio deja afuera a las dos.
  2. **En el pie, los dos azules son el mismo color de marca en dos tonos**,
     `--azul` y `--azul-dark`: el escalón lee como "acá empieza el pie".
     Verificado en captura a 390 y 1440 px:
     `temporary screenshots/post-union-contacto-pie-*.png`. **Este motivo es el
     más débil de los tres** y así me lo marcó el revisor: es un juicio de
     forma, y `CLAUDE.md` §1 no me los asigna. Lo dejo escrito como lo que es,
     una apreciación mía, no un argumento.
  3. **La instrucción de Ramiro nombraba una sola unión**, la de Flotas →
     Marcas, y el commit se llama así. Agregar diagonales en el pie o en la
     barra de navegación es tocar partes de la página que no pidió.
- **Contra qué va esta decisión:** contra la letra de "crearlo no es una
  decisión", que en su lectura más amplia me obligaría a crearla. Por eso la
  registro en vez de resolverla en silencio.
- **Si Ramiro las quiere:** para el pie, agregarle a `.contact-cta` un
  `::after` idéntico al de `.fleets` con `background: var(--azul-dark)`,
  subirle el padding inferior de 88 a 148 px y darle `position: relative`. La
  de la barra de navegación es más delicada, porque la barra es fija y se
  superpone al hero: conviene que la pida y se mida antes.

### P-046 — Decisión propia: el subtítulo "Autonomía." en `CLAUDE.md` §7
- **Estado:** respondida
- **Decisión propia**, tomada al ejecutar el punto 1 el 2026-09-28.
- **Qué decidí:** el bloque que dictó Ramiro no traía título. Le puse
  `**Autonomía.**` delante, para que se lo pueda citar y para que no se lea
  como continuación de la lista de viñetas de "En los dos modos".
- **Por qué es mía y no consultable:** es forma de un documento de trabajo, no
  del sitio; no cambia ni una palabra de lo que él escribió. El texto dictado
  está literal: el revisor lo comparó carácter por carácter, los dos párrafos
  idénticos.
- **Si está mal:** se borra la línea del subtítulo y nada más.

---

### P-047 — Decisión propia: agrupar las revisiones en cuatro pasadas
- **Estado:** respondida
- **Decisión propia**, tomada al empezar la tanda del 2026-09-28.
- **Qué decidí:** Ramiro pidió "el ciclo del revisor en cada paso y un commit
  por punto". Los commits van uno por punto, pero agrupé las **revisiones** en
  cuatro pasadas, porque varios puntos son de una o dos líneas y cada barrido
  de desborde tarda siete minutos.
- **Por qué es mía:** la regla nueva pone "orden de commits" y "scripts de
  verificación" entre las decisiones de proceso que se toman solas.
- **Corrección que me hizo el revisor, y que acepto:** agrupar vale para lo que
  **todavía no está commiteado**. El punto 1 se commiteó (`0c1c58f`) **sin su
  informe de revisión**, y eso sí incumple el paso (5) del ciclo de §7. La
  consecuencia fue concreta: como la revisión rechazó, la corrección del punto
  1 ya no entra en su commit y necesita uno segundo, que es justo lo que "un
  commit por tarea" evita. **De acá en adelante: se agrupan pasadas de revisión
  solo mientras el trabajo siga sin commitear.**
- **Y lo volví a hacer, dos commits después.** El punto 2b (`da37be5`, la
  diagonal de flotas) también se commiteó **sin su informe de revisión**, un
  commit después de que yo escribiera acá arriba que eso no se hace. No lo
  arreglo revirtiendo: lo reviso junto con el 2c, antes de commitear el 2c, y
  si aparece algo bloqueante se corrige en un commit propio. Queda escrito
  porque haber escrito la regla no alcanzó para cumplirla: **el control tiene
  que correr antes del `git commit`, no después**, y el momento de invocarlo es
  cuando el trabajo está listo, no cuando ya está guardado.
- **Lo que sí repara el agujero, y se hizo.** El revisor me señaló que la nota
  sirve como registro pero **no como control**, con dos razones medibles: que
  la primera redacción ya decía lo mismo y un commit después volvió a pasar, y
  que `da37be5` va a quedar en la historia sin su informe. Lo único que lo
  repara sin reescribir historia es que **el informe del punto 2b viaje en el
  commit del 2c**, y así se hizo: `docs/revisiones/post-m3-p2b-p2c.md` cubre
  los dos puntos y dice a cuál commit corresponde cada uno.

---

### P-048 — Decisión propia: cinco reglas de CSS que Ramiro no enumeró
- **Estado:** respondida
- **Decisión propia**, tomada al ejecutar el punto 2a el 2026-09-28.
- **Qué decidí:** además de las cuatro huérfanas que Ramiro enumeró, borré
  **cinco** reglas más, que quedaron sin objeto por su propia decisión de pasar
  las cinco pestañas a tres columnas:
  1. `#tab-repuestos.tab-panel.active { repeat(4, 1fr) }`, la base;
  2. y 3. sus dos repeticiones en los *media queries* de 768 y 480 px;
  4. `.tab-panel.active:where(#tab-mecanica) { repeat(3, 1fr) }`;
  5. `.tab-panel.active { repeat(3, 1fr) }` del *media query* de 1200 px.
- **Por qué:** las tres primeras **tenían que caer sí o sí**, porque eran la
  implementación de P-012 y con ellas puestas "Repuestos" seguía en cuatro
  columnas y la instrucción no se cumplía. Las dos últimas pasaron a decir
  exactamente lo mismo que la base nueva: son inertes.
- **Lo que se perdió con la número 4, y dónde queda:** esa regla llevaba un
  comentario de cuatro líneas que era el **único registro** de dos cosas: que
  Mecánica va en **3 + 2** y no en 4 + 1, y por qué el `id` iba dentro de
  `:where()` (para que la regla pesara lo mismo que `.tab-panel.active` y los
  *media queries* la siguieran ganando por orden). Las dos quedan escritas acá
  y en el comentario nuevo del CSS. **Medido:** Mecánica daba 3 + 2 antes y da
  3 + 2 después, en todos los anchos.
- **Lo que me marcó el revisor:** mi primer comentario en el CSS decía que
  caían "las tres reglas con id que la implementaban". Eran **cinco** reglas,
  no tres, y dos de ellas no implementaban P-012. Peor: el comentario empezaba
  con "(decisión de Ramiro, 2026-09-28)", así que le atribuía a él un borrado
  que decidí yo. Corregido en el comentario y registrado acá.
- **Antecedente que conviene tener presente:** en **P-024** borré las tres
  reglas de `#tab-repuestos` por mi cuenta y el revisor me rechazó con razón,
  porque entonces la decisión de P-012 estaba vigente. Ahora Ramiro la
  reemplaza explícitamente. La diferencia es esa, y el revisor la verificó.

---

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
- **Reemplazada (2026-09-28).** Ramiro decidió que **las cinco pestañas van en
  tres columnas en escritorio**. Motivo: cuatro de las cinco tienen tres
  tarjetas y en una grilla de cuatro dejaban un hueco a la derecha. Aquella
  decisión del 2026-09-22 se había tomado cuando "Repuestos" tenía **cuatro**
  tarjetas; P-024 le sacó una y con tres ya no había excepción que sostener.
  Cayeron entonces las tres reglas `#tab-repuestos.tab-panel.active` que la
  implementaban —las mismas que yo había borrado por mi cuenta en P-024 y que
  el revisor me hizo restaurar, con razón, porque en ese momento la decisión
  seguía vigente—. La base pasó de cuatro a tres columnas, y con ella quedaron
  inertes dos reglas más, que también se borraron: la del *media query* de
  1200 px, que pasó a decir lo mismo que la base, y
  `.tab-panel.active:where(#tab-mecanica)`, que conseguía las tres columnas de
  Mecánica y que ahora salen de la base.
  **Las cinco las borré yo: Ramiro no enumeró ninguna.** El detalle de por qué
  cayó cada una, qué conocimiento se perdía con la de `#tab-mecanica` y dónde
  quedó, está en **P-048**, registrado como decisión propia.
  **Medido en 13 anchos de 320 a 1920 px: las cinco pestañas dan
  `grid-template-columns` idéntico en todos.** Barrido de desborde: 9606
  mediciones, cero desbordes.

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

---

### P-021 — La Tarea 5 se llevó el único "desde 2022" de la página
- **Estado:** respondida
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
- **Respuesta (2026-09-28):** "Desde 2022" va al principio del párrafo de
  "Clientes de toda la región". El párrafo queda: "Desde 2022 atendemos
  vehículos de Villa María y de más de 40 localidades en un radio de 80 km.
  Entre ellas: ..." (el resto igual). Además, `datos-verificados.md` §1,
  punto 3, pasa a decir que "Desde 2022" tiene que aparecer al menos una vez
  en la home, en un lugar visible, y que hoy está en la sección de zona de
  cobertura. Decisión de Ramiro.

---

### P-022 — El "dibujo de tarjeta de crédito" que la Tarea 6 manda reemplazar ya no existe
- **Estado:** respondida
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
- **Respuesta (2026-09-28):** confirmado el ícono de código QR. La pregunta se
  cierra y con ella la Tarea 6.

---

### P-023 — La descripción literal de la libreta en §14 y la de la spec no coinciden
- **Estado:** respondida
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
- **Respuesta (2026-09-28):** la decisión fue correcta. La frase de §14 es de
  referencia, no literal. `datos-verificados.md` §14 lo dice ahora de forma
  explícita: "La descripción de arriba fija los hechos, no la redacción. En el
  sitio se reformula en voseo, sin cambiar ni agregar hechos."
  Eso vale también para M7.

---

### P-024 — La tarjeta "Casa de Repuestos" de Servicios repite el bloque nuevo
- **Estado:** respondida
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
- **Respuesta (2026-09-28):** se elimina la tarjeta "Casa de Repuestos" de la
  pestaña "Repuestos", con su etiqueta "Diferencial clave". La pestaña queda
  con tres tarjetas. Decisión de Ramiro.

---

### P-025 — Repinté la cadena de diagonales en la Tarea 7, tocando CSS de la Tarea 6
- **Estado:** respondida
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

- **Actualización, Tarea 11 (2026-09-26):** volvió a pasar, por tercera vez en
  el módulo. La zona de cobertura entró entre Opiniones y Contacto, así que
  `.testimonials::after` (`public/index.html:997-1007`) pasó de `--azul` a
  `--blanco`, y la sección nueva estrenó el suyo en `--azul`. Mismo criterio y
  mismo fundamento: bajo el patrón que Ramiro ratificó en P-019 no había dos
  opciones, y dejarlo en `--azul` habría metido una cuña azul de 66 px entre
  una sección gris y una blanca. La cadena completa hoy, medida con estilo
  computado, es: `como-trabajamos` gris → blanco → `libreta-digital` blanco →
  gris → `casa-de-repuestos` gris → blanco → `flotas` blanco (sin remate,
  blanco sobre blanco) → `servicios` blanco → gris → `resenas` gris → blanco
  → `zona-de-cobertura` blanco → azul → `contacto` azul.
  **El inventario de pendientes para la Tarea 13 cambió:** en el orden final,
  Servicios sube al segundo lugar, Marcas entra en el séptimo y Flotas queda
  debajo de la casa de repuestos, así que la cadena hay que recalcularla
  entera, no solo dos remates.
  Lo levantó el revisor de la Tarea 11, con el mismo argumento con el que
  había levantado P-026: una decisión que vive solo en un comentario de CSS no
  está registrada.
- **Respuesta (2026-09-28):** confirmado el repintado de la Tarea 7, y **como
  regla general:** el color de cada remate diagonal es el de la sección de
  abajo, y no es una decisión. Cuando cambie el orden, se recalcula sin
  preguntar. En la Tarea 13 se recalcula la cadena entera.
- **Ampliada (2026-09-28), al resolver P-045:** *todo cambio de color entre
  secciones lleva remate diagonal, y crearlo no es una decisión.* Antes la
  regla fijaba el **color** de los remates que existían; ahora también obliga a
  **crearlos**. Decisión de Ramiro.
- **Alcance, medido al aplicarla.** Las uniones de la página que **cambian de
  color** son nueve: **siete** están resueltas con remate diagonal, y **dos**
  quedan sin remate, las dos por el mismo motivo, que es que no son uniones
  entre secciones de `<main>`:
  - **navbar → hero**, `#FFFFFF` contra `rgb(37,81,123)`;
  - **contacto → pie**, `rgb(18,75,143)` contra `rgb(13,56,112)`.
  Las dos están tratadas en **P-050**, decisión propia. (La primera versión de
  este inventario decía "dos uniones donde cambia el color" y se olvidaba de
  navbar → hero; lo midió el revisor, muestreando los píxeles de la costura.)
  Aparte, hay dos uniones **sin** cambio de color y por eso sin remate: hero →
  Servicios, donde el degradado muere en blanco puro, y Marcas → Opiniones,
  que son del mismo gris.

---

### P-026 — Dos decisiones de forma en el bloque de flotas, que solo estaban en comentarios de CSS
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** confirmar las dos, o pedir que se deshagan.
- **Contexto:** la Tarea 8 pide "bloque corto y secundario: no más alto que la
  sección de 'Cómo trabajamos'", y da el texto del botón, pero no dice cómo se
  ve ninguna de las dos cosas.
- **Qué hice mientras tanto:** dos **decisiones mías**:
  1. **El panel acotado.** En vez de una sección a todo ancho como las demás,
     un panel de `max-width: 860px` centrado, con fondo `--gris-bg` y borde
     izquierdo azul, dentro de una sección blanca
     (`public/index.html:631-673`). Es la única parte del `<main>` que no
     ocupa el ancho completo, y así busqué que se lea como secundaria. Medido:
     la sección va de 561 px de alto a 1440 px hasta 911 px a 320 px, contra
     1245 a 1810 px de "Cómo trabajamos", así que la condición de la spec se
     cumple en todos los anchos.
  2. **El ícono de WhatsApp en el botón** (`public/index.html:1437-1439`). La
     spec de la Tarea 8 da el rótulo pero no menciona ícono. Lo puse porque es
     el patrón del sitio: la Tarea 1 dice que los botones de WhatsApp
     "conservan el ícono de WhatsApp" y `datos-verificados.md` §19 los trata
     como un grupo. **Tiene un costo medido:** a 360 px el ícono hace que el
     rótulo pase de dos líneas a tres (alto del botón 77 px → 101 px). A
     320 px son tres líneas con ícono o sin él, y a 390 px son dos con ícono.
     Ninguna palabra se corta y no hay desborde en ningún ancho. Si Ramiro
     prefiere dos líneas a 360 px, se borra el `<svg>` y nada más.
- **Respuesta (2026-09-28):** confirmadas las dos decisiones, el panel acotado y
  el ícono de WhatsApp, aunque a 360 px el botón ocupe tres líneas.

---

### P-027 — La Tarea 8 deja dos llamados a flotas en la home
- **Estado:** respondida
- **Bloquea:** no bloquea la ejecución, pero conviene resolverlo dentro de M3.
- **Qué falta:** decidir qué pasa con el `<h2>` de la sección de contacto.
- **Contexto:** con el bloque nuevo, la home queda con dos secciones que
  llaman a las flotas: `¿Tenés una flota de vehículos?`
  (`public/index.html:1474`, la que crea esta tarea) y
  `¿Necesitás atención para tu flota?` (`public/index.html:1815`, la de
  contacto, que ya estaba). La Tarea 12 reescribe el contenido de contacto
  —botón, teléfono, horario, dirección, formas de pago, redes, mapa, hueco
  F-07 y la frase de "respuesta inmediata"— pero **no da texto de reemplazo
  para ese `<h2>`**. O sea que, tal como está escrita la spec, la duplicación
  sobrevive a M3, y va en contra del objetivo del módulo, que es que la home
  le hable primero al particular. Lo levantó el revisor de la Tarea 8
  (`docs/revisiones/m3-t8.md`, hallazgo 2).
- **Qué hice mientras tanto:** nada. La Tarea 8 no manda tocar contacto y no
  lo toqué. El texto nuevo de ese `<h2>`, si va, lo tiene que escribir Ramiro:
  yo no escribo textos de cara al usuario (`CLAUDE.md` §1). Si me lo pasa, lo
  aplico en la Tarea 12.
- **Respuesta (2026-09-28):** el `<h2>` de la sección de contacto pasa a "Pedí tu
  turno". Decisión de Ramiro.

---

### P-028 — La única verificación que pide la Tarea 9 hoy da negativo, y queda diferida a la Tarea 13
- **Estado:** respondida
- **Bloquea:** no bloquea la ejecución, pero **la Tarea 9 no está cerrada**:
  su verificación no se puede hacer hasta que la Tarea 13 reordene.
- **Qué falta:** nada de Ramiro. Es un registro: que quede escrito que la
  Tarea 9 se cierra recién con la Tarea 13.
- **Contexto:** la Tarea 9 (`docs/spec-m3-home.md:264-267`) no pide cambios de
  contenido, solo "verificar que [la tira de marcas] quedó bien ubicada en el
  orden nuevo (ver Tarea 13)". Hoy esa verificación **falla**. El `<main>` va
  de `public/index.html:1266` a `:1905` y sus nueve hijos, en orden, son
  `inicio` (:1223), `brands-strip` (:1273), `como-trabajamos` (:1317),
  `libreta-digital` (:1364), `casa-de-repuestos` (:1401), `flotas` (:1424),
  `servicios` (:1447), `resenas` (:1636) y `contacto` (:1749): Marcas está en
  la posición 2 de 9 y el orden final de la Tarea 13
  (`docs/spec-m3-home.md:330-341`) la pone en la 7. Servicios también está
  fuera de lugar (7 en vez de 2), lo que confirma que el reordenamiento es una
  sola operación de la Tarea 13 y que la Tarea 9 no tenía que mover nada
  (`CLAUDE.md` §7). Lo levantó el revisor
  (`docs/revisiones/m3-t9.md`, hallazgo 1 de la vuelta 1): yo había dado la
  tarea por hecha dejando el rastro solo en un comentario de CSS
  (`public/index.html:631-637`), que es exactamente el defecto que ya había
  aparecido en P-026, una tarea antes.
- **Qué hice mientras tanto:** no toqué la tira, que es lo correcto. **El
  contenido lo verificó el revisor, no yo** (vuelta 1, verificaciones 1 y 2, y
  vuelta 2, verificación 8): aisló el bloque de marcado en `9bc7562` (cierre
  de M2a) y en el árbol actual, normalizó el único cambio autorizado —los 14
  `aria-hidden="true"` que pide la Tarea 1— y dio idéntico. Recalculado en la
  vuelta 2 normalizando además los espacios, el sha1 del bloque es
  `6f60f91f40744d56b68ffe56e639fd8b3adeebe0` en las dos versiones; el hash
  depende de cómo se normalice, así que sin ese criterio no se puede
  recalcular. Del CSS solo cambiaron cuatro opacidades, que autoriza la
  Tarea 1.
  **Yo, en cambio, le pasé al revisor una premisa falsa:** le dije que el
  único commit que había tocado la tira era `e3b8618`, sin haberlo comprobado.
  `git log --oneline --follow -G 'brands-strip|brand-name|brands-intro|brand-sep' -- public/index.html`
  devuelve `bc566b6`, `2123134`, `50a83b8` y `42bf0d5`, y `e3b8618` no está.
- **Capturas:** el encabezado de la spec (`docs/spec-m3-home.md:30-33`) pide
  capturas a 360, 390 y 1440 px en cada tarea. Para la Tarea 9 **no se
  tomaron**, ni por mí ni por el revisor. **Decisión mía:** con `public/`
  idéntico a `b83e51f` —probado por hash de árbol, el mismo
  `adff67ff2fd8d3f90641347cdd80ef52679ea6e7`— serían idénticas a las de la
  Tarea 8, así que no las saqué. Queda declarado acá en vez de omitido.
- **Actualización, Tarea 12 (2026-09-27):** las líneas de arriba son las que
  había al medir, y desde entonces la Tarea 11 y la Tarea 12 corrieron el
  archivo. Hoy el `<main>` tiene **diez** hijos, no nueve, porque se sumó la
  zona de cobertura: `inicio` (:1269), `brands-strip` (:1319),
  `como-trabajamos` (:1363), `libreta-digital` (:1410), `casa-de-repuestos`
  (:1447), `flotas` (:1470), `servicios` (:1493), `resenas` (:1682),
  `zona-de-cobertura` (:1799) y `contacto` (:1809). **Lo que no cambió es el
  problema:** Marcas sigue en la posición 2 y el orden final la pone en la 7,
  así que la Tarea 9 sigue sin poder cerrarse.
- **Dos cosas que la Tarea 13 se va a encontrar**, y que dejo escritas acá
  para que no se pierdan:
  1. La tira es un `<div class="brands-strip">` **sin `id` y sin encabezado**
     (`public/index.html:1273`), así que hoy ninguna ancla puede apuntarle. La
     Tarea 13 pide que "el menú de navegación refleja este orden y cada enlace
     lleva a su sección", y Marcas es el punto 7 de ese orden.
  2. El menú no tiene entrada "Marcas": los cinco enlaces son Inicio,
     Servicios, ¿Por qué elegirnos?, Reseñas y Contacto.
- **Respuesta (2026-09-28):** entendido; la Tarea 9 se cierra en la Tarea 13.
  **Marcas no lleva entrada en el menú:** es una franja, no un destino, y no
  hace falta agregarle `id`. Decisión de Ramiro.
- **Cerrada en la Tarea 13 (2026-09-28).** Donde arriba dice "la Tarea 9 **no
  está cerrada**", léase cerrada. La verificación que quedaba diferida **da
  positivo**, comprobada por el revisor de la Tarea 13: la franja quedó en la
  **posición 7** del orden final, que es la que le asigna la spec; sigue siendo
  un `<div class="brands-strip">` **sin `id`**, como decidió Ramiro; y no
  aparece en ninguno de los tres bloques de navegación. Con eso la Tarea 9
  queda cerrada.

---

### P-029 — Las 13 marcas de "También atendemos" no están enumeradas en los datos verificados
- **Estado:** respondida
- **Bloquea:** no bloquea. Es anterior a M3 y la Tarea 9 prohíbe cambiar el
  contenido de la tira.
- **Qué falta:** decidir si el listado concreto se sostiene, en particular
  PORSCHE.
- **Contexto:** la tira publica, en la fila "También atendemos": CHEVROLET,
  RENAULT, FIAT, PEUGEOT, MERCEDES-BENZ, AUDI, NISSAN, HONDA, CITROËN, BMW,
  JEEP, DODGE y PORSCHE (`public/index.html:1286-1310`).
  `datos-verificados.md` §10 no las enumera: dice "Marcas que también se
  atienden: **Todas**. Hay fotos y publicaciones de Instagram que lo
  respaldan." O sea que las 13 descansan enteras en ese "Todas".
  **No viola la prohibición de §10**, que es "no listar marcas de lujo ni
  deportivas *como especialidad*": las cuatro de gama alta están en la fila
  secundaria, no en "Especialistas en", donde solo están Toyota, Volkswagen y
  Ford. Lo levantó el revisor de la Tarea 9 (hallazgo 5).
- **Qué hice mientras tanto:** nada. No toqué la tira. Si Ramiro quiere sacar
  alguna marca, o prefiere que §10 las enumere una por una, se hace donde
  corresponda: sacar una marca es borrar contenido y eso no lo decido yo.
- **Respuesta (2026-09-28):** las trece marcas se quedan. Quedan enumeradas en
  `datos-verificados.md` §10, con la confirmación de Ramiro de que hay
  trabajos realizados y material que lo respalda para cada una.

---

### P-030 — Dos textos que la Tarea 10 deja repetidos en la sección de opiniones
- **Estado:** respondida
- **Bloquea:** no bloquea el resto del módulo, pero **la duplicación se ve hoy
  en la página**: el rótulo superior y el `<h2>` dicen la misma frase, una
  debajo de la otra. Se ve en `temporary screenshots/m3-t10-duplicado-*.png`.
- **Qué falta:** decidir qué dice, o si va, el rótulo superior; y decidir si la
  insignia de Google se queda al lado del subtítulo nuevo.
- **Contexto:** la Tarea 10 (`docs/spec-m3-home.md:274-287`) da un `<h2>` y un
  subtítulo nuevos, y manda eliminar un párrafo. No dice nada de otros dos
  elementos que ya estaban en esa sección y que con los textos nuevos quedan
  repetidos:
  1. El rótulo superior, `<span class="eyebrow-label">`
     (`public/index.html:1646`), dice **"Lo que dicen nuestros clientes"**,
     que es **exactamente** el texto que la spec le da al `<h2>`
     (`public/index.html:1647`). O sea que la misma frase se imprime dos veces
     seguidas.
  2. La insignia de Google (`public/index.html:1652-1664`) muestra "4,9"
     (`:1659`), las cinco estrellas y "Más de 130 opiniones en Google"
     (`:1663`). El subtítulo nuevo (`:1648`) dice "4,9 en Google, con más de
     130 opiniones.": el mismo dato, dos renglones más arriba.
- **Qué hice mientras tanto:** **nada: los dos quedaron como estaban.** Dejé un
  comentario junto al rótulo para que nadie lo saque por su cuenta. Las dos
  cosas son borrado o reescritura de texto de cara al usuario, y eso no lo
  decido yo (`CLAUDE.md` §1 y §9, y la Regla de textos de la propia spec de
  M3: si una frase no encaja, "no se reescribe: se anota en
  `preguntas-abiertas.md` con una captura y se sigue").
- **Un error mío, y su corrección:** en la primera pasada de la Tarea 10 **sí
  borré el rótulo**, declarándolo como decisión mía. El revisor lo rechazó
  como bloqueante y tenía razón: §9 lista "hace falta borrar algo que la spec
  no menciona" como un caso de hueco, y el tratamiento de un hueco es anotarlo
  y seguir, no elegir una de las salidas. Me lo señaló además con mi propia
  contradicción: en esta misma pregunta le había aplicado a la insignia el
  criterio correcto ("no me corresponde") y al rótulo el contrario. El rótulo
  está repuesto, idéntico a como estaba.
- **Si Ramiro quiere sacarlo**, es borrar la línea 1646 y su comentario. Si
  quiere otro texto, lo escribe él.
- **Una regla de CSS que quedó inerte, para que nadie se confunda en la Tarea
  13:** al pasar `.testimonials-grid` a dos columnas
  (`public/index.html:1035`), la regla del `@media (max-width: 900px)`
  (`public/index.html:1142`) quedó diciendo exactamente lo mismo que la de
  escritorio. **No la borré**, porque limpiar lo que la tarea no toca está
  prohibido por `CLAUDE.md` §7 y un borrado no mandado es un hueco por §9.
  Medido: a 900 px las columnas son `408px 408px` y a 901 px `408.5px
  408.5px`, o sea que cruzar el corte no cambia nada; la diferencia es el
  ancho del contenedor, no la regla. Las dos columnas de 481 a 900 px salen
  hoy de la regla base, no de esa. Lo levantó el revisor de esta tarea.
- **Respuesta (2026-09-28):** se elimina el rótulo superior "Lo que dicen
  nuestros clientes" (queda solo el `<h2>`) y se elimina el subtítulo "4,9 en
  Google, con más de 130 opiniones." (queda la insignia de Google, que dice lo
  mismo con más respaldo). La regla CSS inerte del *media query* de 900 px se
  borra en la limpieza de la Tarea 13. Decisión de Ramiro.
- **Su criterio se aplicó otra vez el 2026-09-28**, por decisión de Ramiro: se
  sacó el rótulo `Nuestros servicios` que estaba arriba del `<h2>` "Servicios",
  por el mismo motivo por el que se había sacado el de Opiniones. Quedaban
  **dos** `eyebrow-label` en el sitio y queda **uno**, el de Contacto, que no
  repite su `<h2>` ("Contacto" contra "Pedí tu turno"). La clase sigue en uso,
  así que su CSS no queda huérfano. (Primero escribí "de los tres que tenía el
  sitio": eran tres en `c45335e`, antes de que P-030 sacara el de Opiniones, y
  cinco hasta `ecda75f`. Al momento de este cambio eran dos. Lo contó el
  revisor commit por commit.)
- **Aplicado (2026-09-28).** Todo lo que dice "Qué hice mientras tanto" y "Si
  Ramiro quiere sacarlo" acá arriba describe el estado **anterior**, y queda
  como está porque es el planteo fechado. Lo que hay hoy en el archivo:
  - Se fueron el `<span class="eyebrow-label">` y el `<p class="section-sub">`.
    Queda solo el `<h2>`. El diff quita seis líneas y no agrega ninguna.
  - **Y se fue también el comentario de cuatro líneas** que yo había dejado
    junto al rótulo. **Decisión mía**, porque la respuesta de Ramiro nombra el
    rótulo y el subtítulo pero no el comentario. La tomé así: el comentario era
    mío (commit `4dbadd1`, verificado con `git log -S`), no de otro, y él mismo
    fijaba la condición de su vencimiento ("esperando decisión del
    propietario"), que se cumplió; dejarlo habría publicado en el código una
    afirmación hoy falsa, "La spec no manda borrarlo, así que no se borra". El
    revisor la aceptó como consecuencia forzosa y me marcó, con razón, que
    estaba solo en el chat y tenía que estar escrita acá.
  - **No se tocó** la regla inerte del *media query* de 900 px
    (`.testimonials-grid`): va en la limpieza de la Tarea 13, como pide Ramiro.
  - Medido: el espacio entre el `<h2>` y la insignia pasó de 90,9 px a **52,0
    px**, que es el `margin-bottom` de `.section-header` y el mismo valor que
    ya tienen "Casa de repuestos" y "Clientes de toda la región", los otros dos
    encabezados de un solo `<h2>`. No quedó hueco ni salto de aire.
  - **Criterio sobre las referencias de línea**, que el revisor pidió explicitar
    porque en P-024 las corregí y acá no: **dejan de corregirse unidad por
    unidad.** Cada borrado corre el archivo y las vuelve a romper, y las de
    P-031 además desaparecen con su propia unidad. Se arreglan todas juntas en
    el barrido de la Tarea 13 que reserva P-037.

---

### P-031 — La frase que la Tarea 12 manda reemplazar ya no existe, y la que quedó no se puede tocar sin reescribir
- **Estado:** respondida
- **Bloquea:** **sí, en parte.** Es el único punto de la Tarea 12 que quedó sin
  hacer, y mientras tanto **sigue publicada una afirmación que
  `datos-verificados.md` prohíbe**. No bloquea la Tarea 13, pero sí el cierre
  del módulo, junto con P-021.
- **Qué falta:** el texto exacto del párrafo de contacto, escrito por Ramiro.
- **Contexto:** la Tarea 12 dice: *Donde hoy dice "Respuesta inmediata",
  reemplazar por: `Respondemos de lunes a viernes de 8:00 a 17:30.` No es
  cierto que la respuesta sea inmediata: fuera del horario no se atiende.*
  La frase **con mayúscula** ya no existe. Verificado con
  `git log --oneline --follow -G 'Respuesta inmediata' -- public/index.html`,
  que devuelve `1e3ab33` y `42bf0d5`: estaba en dos lugares que **la Tarea 5
  borró**, el `<h3>Stock propio. Respuesta inmediata.</h3>` de "¿Por qué
  elegirnos?" y un párrafo del proceso de cinco pasos
  (`1e3ab33^:public/index.html:1233` y `:1292`).
  **Pero el punto de la spec no quedó sin objeto**, y conviene decirlo claro
  porque la primera redacción de esta pregunta daba a entender lo contrario:
  aquellas dos frases hablaban de *stock* y de *reparación*, y el punto de la
  spec está escrito **dentro de "Contacto"**, con la justificación "fuera del
  horario no se atiende", que describe exactamente la afirmación de
  **respuesta** que sigue viva. O sea que hay algo que sacar, y hay que
  sacarlo. Lo corrigió el revisor de la Tarea 12.
  Lo que queda hoy es, en minúscula y dentro de una oración que
  la spec no cita, en `public/index.html:1816`:
  *"Diagnóstico transparente, stock propio y respuesta inmediata. Coordiná tu
  turno directamente por WhatsApp y un técnico especializado te responde a la
  brevedad."* Ahí hay dos afirmaciones de rapidez, no una: "respuesta
  inmediata" y "te responde a la brevedad".
  Reemplazar literalmente las dos palabras da una oración rota
  ("…stock propio y Respondemos de lunes a viernes de 8:00 a 17:30.."), y
  cualquiera de las otras lecturas —cambiar la primera oración entera, o el
  párrafo entero— borra texto que la spec no menciona ("Diagnóstico
  transparente", "stock propio", la invitación a coordinar por WhatsApp).
- **Captura:** `temporary screenshots/m3-t12-p031-390.png` y `-1440.png`, que
  es lo que exige la Regla de textos de la spec para este caso.
- **Qué hice mientras tanto:** **el párrafo quedó intacto**, y quedó un
  marcador `TODO_DATO` en el código, justo arriba
  (`public/index.html:1807-1815`), que explica qué falta y remite acá. Las
  tres salidas posibles exigen escribir o recortar texto de cara al usuario, y
  eso no lo hago yo (`CLAUDE.md` §1 y §9). Es el mismo criterio por el que el
  revisor me rechazó la Tarea 10 cuando borré un rótulo que la spec no
  nombraba. Todo el resto de la Tarea 12 se hizo.
  En la primera pasada **no** había dejado el `TODO_DATO` ni la captura: las
  dos cosas las exige el procedimiento y las dos me las marcó el revisor.
- **Qué necesito:** el párrafo completo, tal como tiene que quedar. Si la
  intención es solo sacar las dos afirmaciones de rapidez y dejar el resto,
  igual hace falta que el texto lo escriba Ramiro.
- **Riesgo mientras tanto:** la página sigue afirmando que la respuesta es
  inmediata. **Con precisión, porque en la primera redacción lo dije de más:**
  esa frase exacta **no** figura en la lista de "Afirmaciones prohibidas por
  genéricas" de `datos-verificados.md` §18b —ahí están "rapidez", "servicio
  rápido" y "atención inmediata"—, pero va contra el criterio de esa misma
  sección, que dice que la demora es variable y que **no se publican plazos**,
  y contra la justificación que la propia spec da al pedir el cambio. No llega
  a publicarse igual, porque M5 ya está bloqueada por P-007. Lo precisó el
  revisor de la Tarea 12.
- **Respuesta (2026-09-28):** el párrafo completo de contacto pasa a:
  "Escribinos por WhatsApp para coordinar el turno o pedir un presupuesto.
  Respondemos de lunes a viernes de 8:00 a 17:30." Se saca el `TODO_DATO`.
  Texto de Ramiro.
- **Aplicado (2026-09-28).** Todo lo que dice "Bloquea", "Qué hice mientras
  tanto" y "Riesgo mientras tanto" acá arriba describe el estado **anterior** y
  **hoy es falso**: queda como está porque es el planteo fechado. Lo que hay
  hoy en el archivo:
  - El párrafo publicado es el de Ramiro, **carácter por carácter**, verificado
    por comparación programática contra las dos copias que hay en `docs/`.
    **Reemplazado el 2026-09-28 por P-040:** el párrafo perdió su segunda
    oración y hoy termina en "…o pedir un presupuesto.". El texto que Ramiro
    dictó acá arriba es el que estuvo publicado entre el 2026-09-28 y ese
    mismo día; queda como registro fechado, no como descripción de la página.
  - **`TODO_DATO` en `public/`: cero.** Era el único del sitio.
  - **Afirmaciones prohibidas en `public/`: cero.** Es la primera vez en todo
    M3. El revisor lo confirmó con tres barridos propios: uno sobre el archivo
    crudo, uno que decodifica entidades HTML y porcentajes y quita diacríticos
    antes de buscar —y que también mira los nombres de archivo—, y uno de
    promesas de plazo que mi lista no cubría (`al toque`, `en el acto`,
    `sin espera`, `en el día`, `24 h`, `urgencia`, `sin turno`, `garantizamos`).
    Los comentarios de HTML y de CSS entran, porque busca sobre el archivo, no
    sobre el DOM.
  - El hueco **no se tapó: se cerró porque llegó el dato**. Lo que faltaba era
    "el texto exacto del párrafo, escrito por Ramiro", y lo escribió él. El
    párrafo publicado no tiene una sola palabra que no esté en su respuesta.
  - Contraste del texto nuevo: **6,17:1** sobre el azul, contra un mínimo de
    4,50:1. El dato importa por cómo se mide: el texto es blanco al 80 %, y
    medir el color **sin componer el alfa** da 8,65:1, que es un falso positivo
    cómodo. El valor real, componiendo, es 6,17:1, y también pasa.
  - Geometría: la sección **no cambia de alto de 480 px para arriba** (lo fijan
    la columna de datos y el mapa); en móvil se acorta 28 px, una línea de
    texto. Sin desbalance nuevo entre columnas.

---

### P-032 — "Los enlaces del pie apuntan a las secciones nuevas": cuáles y con qué rótulos
- **Estado:** respondida
- **Bloquea:** no bloquea. Ningún enlace del pie está roto.
- **Qué falta:** decidir qué secciones nuevas entran en la columna
  "Navegación" del pie, y con qué texto.
- **Contexto:** la Tarea 12 dice "Los enlaces del pie apuntan a las secciones
  nuevas", sin decir cuáles ni cómo se llaman. El módulo creó cuatro secciones
  nuevas: `#libreta-digital`, `#casa-de-repuestos`, `#flotas` y
  `#zona-de-cobertura`. La columna "Navegación" (`public/index.html:1923-1931`, con los cinco enlaces en `:1925-1929`)
  tiene hoy cinco enlaces: Inicio, "¿Por qué elegirnos?" → `#como-trabajamos`,
  Servicios, Reseñas y Contacto. Ninguno está roto: los cinco destinos
  existen. El rótulo "¿Por qué elegirnos?" apuntando a "Cómo trabajamos" es
  decisión de Ramiro, ya cerrada en P-018.
- **Qué hice mientras tanto:** **una sola cosa, la que no exige escribir
  texto:** la columna "Servicios" del pie tenía un enlace que decía "Casa de
  Repuestos" y apuntaba a `#servicios`; ahora apunta a `#casa-de-repuestos`,
  que es su sección propia. El rótulo no cambió.
  **No agregué entradas nuevas** a la columna "Navegación": elegir cuáles de
  las cuatro secciones van y con qué rótulo es decisión de contenido.
  Ojo que la Tarea 13 pide algo parecido para el menú de navegación, así que
  conviene decidir las dos cosas juntas.
- **Respuesta (2026-09-28):** decidido por Ramiro, junto con el menú de la
  Tarea 13.

  **Menú (escritorio y móvil), en este orden:** Inicio · Servicios · ¿Por qué
  elegirnos? (a `#como-trabajamos`) · Flotas (a `#flotas`) · Reseñas ·
  Contacto.

  **Columna "Navegación" del pie:** Inicio · Servicios · ¿Por qué elegirnos? ·
  Libreta digital (a `#libreta-digital`) · Flotas · Reseñas · Zona de cobertura
  (a `#zona-de-cobertura`) · Contacto. Casa de repuestos no se repite: ya está
  en la columna "Servicios".
- **Aplicado (2026-09-28).** Los tres bloques quedaron con los rótulos y el
  orden dictados, verificados sobre el DOM renderizado. El único que cambió de
  contenido respecto de lo que ya había es el pie: se le agregaron "Libreta
  digital" y "Zona de cobertura", y "Servicios" pasó delante de "¿Por qué
  elegirnos?". El botón de WhatsApp de los dos menús **no se tocó**: la
  respuesta enumera entradas de navegación y él es un botón de acción, y
  sacarlo habría sido un borrado que nadie pidió.
- **El ítem nuevo no entraba, y hubo que decidir.** Agregar "Flotas" al menú de
  escritorio metió un **desborde horizontal real** que no existía antes:
  **174 mediciones desbordadas, en la franja de 769 a 797 px**, con el botón
  "Pedir turno" como elemento culpable. Al medir por qué, apareció que el
  problema era más ancho que el desborde: el bloque del menú mide **668,5 px
  fijos** y no se achica —el que cede es el logo, que se planta en 97,6 px—,
  así que el borde del botón cae siempre en **798,1 px**; por eso entre 798 y
  830 px la página no desbordaba pero el botón quedaba **pegado al borde, sin
  los 32 px de aire** del contenedor. En total, 62 anchos con el menú al filo.
- **Decisión de Ramiro, consultada en el momento (2026-09-28).** Le llevé tres
  salidas, las tres medidas de 320 a 1300 px de a 1 px y las tres con cero
  desbordes, y eligió **aplicar las dos a la vez**: el corte del menú móvil
  sube de 768 a **830 px**, y el espaciado entre ítems baja de 32 a **20 px por
  debajo de 1000 px**. Las otras dos eran cada una por separado. **La elección
  es suya, no mía**; lo que puse yo son las mediciones.
- **Verificado después de aplicarlo**, barriendo 320 a 1920 px de a 1 px:
  - Barrido de desborde con las 5 pestañas y el menú móvil: **9606 mediciones,
    cero desbordes.**
  - Primer ancho con menú de escritorio: **831 px**. Espaciado: 20 px en 170
    anchos, 32 px en 920.
  - **Ningún ancho** con los dos menús visibles a la vez, ninguno sin ninguno,
    y ninguno con el menú sin sus 32 px de aire.

---

### P-033 — Cómo quedaron las tres redes en la sección de contacto
- **Estado:** respondida
- **Bloquea:** no bloquea. Los tres enlaces funcionan y apuntan a las URLs
  verificadas.
- **Qué falta:** confirmar la forma, o pedir otra.
- **Contexto:** la Tarea 12 dice "Redes: Instagram, Facebook y LinkedIn, **como
  enlaces reales** a las URLs de `datos-verificados.md` §5, con
  `target="_blank"` y `rel="noopener"`". Da las tres redes y la exigencia
  técnica, pero no dice **cómo se muestran**. Lo que había antes era una fila
  sola, rotulada "Instagram", con el texto `@dgpcentromecanico` que **no era
  un enlace** (`git show c076267:public/index.html`, líneas 1818-1826).
- **Qué hice mientras tanto:** tres **decisiones mías**, todas de forma y las
  tres reversibles:
  1. **Una sola fila para las tres**, rotulada `Redes` —la palabra es de la
     spec—, en vez de tres filas separadas. Así no hubo que inventar un
     rótulo ni un identificador para cada red.
  2. **El texto visible de cada enlace:** `@dgpcentromecanico` para Instagram,
     que es el que ya estaba y así no se pierde ningún texto, y `Facebook` y
     `LinkedIn` para las otras dos, que son los nombres que usa la propia
     spec. Queda una fila despareja, un usuario y dos nombres de red:
     `datos-verificados.md` §5 solo da las URLs, no da usuarios de Facebook ni
     de LinkedIn, y no los voy a deducir de la URL.
  3. **El ícono.** La fila tenía el de Instagram y ahora contiene tres redes,
     así que lo cambié por uno neutro de tres nodos conectados, en el mismo
     trazo que los demás íconos de contacto.
  Los tres enlaces se probaron con foco de teclado: alcanzables, con contorno
  visible, `target="_blank"` y `rel="noopener"` en los tres.
- **Respuesta (2026-09-28):** confirmadas las tres decisiones de las redes.

---

### P-034 — Cuatro cosas del contacto y el pie que decidí yo o que quedaron desparejas
- **Estado:** respondida
- **Bloquea:** no bloquea nada.
- **Qué falta:** confirmar las tres primeras y decidir la cuarta.
- **Contexto y qué hice:** las cuatro salieron de la revisión de la Tarea 12.
  1. **La línea suelta del pie de página** (`public/index.html:1957`). Saqué
     de ahí la frase del posicionamiento anterior y su separador, y dejé
     "Villa María, Córdoba" porque la spec no manda sacarlo. **Decisión mía.**
     Consecuencia: el pie dice ahora "Villa María, Córdoba" **cuatro veces**:
     debajo del nombre (`:1918`), al final del lema nuevo (`:1919`), en la
     columna Contacto (`:1945`) y en esa línea (`:1957`). Sacar alguna es
     borrar contenido y no lo decido yo.
  2. **El aspecto del hueco F-07** (`.contact-slot`, `public/index.html:891-896`).
     Los otros tres huecos son el rectángulo gris rayado que describe
     `docs/brief-fotografico.md`. Sobre el fondo azul de contacto ese gris se
     ve como un parche, así que a este le puse fondo blanco al 6 % y borde
     blanco al 35 %, y el rótulo en blanco (`.contact-slot span`,
     `public/index.html:896`). **Y una cuarta diferencia que no había
     declarado:** el `<div>` de F-07 (`:1899`) **no lleva la clase `fade-in`**
     que sí llevan F-02, F-03 y F-04, porque la sección de contacto no anima
     sus bloques. Las cuatro son **decisiones mías**, de forma: el marcador,
     el `data-slot`, la proporción y el texto del rótulo son los del brief, y
     la proporción 16:9 está medida exacta en cuatro anchos.
  3. **El rótulo `Formas de pago`** (`public/index.html:1880`). La spec lo
     escribe como nombre de campo, no entre acentos graves como los textos
     que sí dicta. Lo usé tal cual de rótulo visible. **Decisión mía**, igual
     que "Redes" en P-033, que sí había declarado.
  4. **La columna "Contacto" del pie** (`public/index.html:1945`) quedó con el
     formato viejo del horario, "Lun–Vie 08:00 – 17:30hs", mientras la sección
     de contacto ahora dice "Lunes a viernes de 8:00 a 17:30"; y muestra
     `@dgpcentromecanico` como texto plano, sin enlazar, cuando arriba las tres
     redes ya son enlaces reales. **No lo toqué:** la Tarea 12 solo manda
     cambiar el lema, sacar las frases y apuntar los enlaces del pie. El dato
     en sí es correcto (`datos-verificados.md` §3). Queda a la vista porque la
     misma página muestra el mismo horario en dos formatos.
- **Respuesta (2026-09-28):** decidido por Ramiro, punto por punto.

  1. En el pie se saca "Villa María, Córdoba" de debajo del nombre y de la
     línea suelta final. Quedan el lema y la dirección de la columna Contacto.
  2. Confirmado el aspecto del hueco F-07.
  3. Confirmado el rótulo "Formas de pago".
  4. En la columna Contacto del pie, el horario pasa a "Lunes a viernes de
     8:00 a 17:30" y "@dgpcentromecanico" pasa a enlace a Instagram, con
     `target="_blank"` y `rel="noopener"`.
- **Aplicado (2026-09-28).** Los puntos 2 y 3 eran confirmaciones: no se tocó
  nada. Los puntos 1 y 4 se ejecutaron así:
  - Se fueron el `<div class="footer-brand-sub">` de debajo del nombre y el
    `<p>` suelto del final. **"Villa María, Córdoba" en el pie bajó de cuatro
    apariciones a dos**, que son las que Ramiro deja: el lema y la dirección de
    la columna Contacto.
  - **Se fue también el comentario de cinco líneas** que estaba junto a la
    línea suelta y que decía que "Villa María, Córdoba" no se tocaba porque la
    Tarea 12 no lo mencionaba. **Decisión mía**, del mismo tipo que la del
    comentario de P-030: era mío, su condición se cumplió, y dejarlo habría
    publicado en el código una afirmación hoy falsa.
  - El horario del pie y el de la sección de contacto ahora dicen lo mismo con
    el mismo formato. Las únicas apariciones de `08:00` que quedan en el sitio
    están en el `openingHoursSpecification` del JSON-LD, donde schema.org exige
    `HH:MM`.
  - **Medido, porque el logo del pie abarca tres filas de la grilla y ahora hay
    dos hijos en vez de tres.** Barrido de 320 a 1000 px de a 1 px, contra
    `HEAD`: el bloque `.footer-brand` pasó de 108,7 a **72,2** px entre 320 y
    425 px, y de 86,9 a **58,0** px entre **426** y 768 px; de 769 px para
    arriba no usa grilla y no cambia (311,2 px en las dos versiones). La
    diferencia es exactamente el renglón que se sacó: −36,5 px y −28,9 px.
    **Primero escribí que el segundo tramo empezaba en 480 px: era mi cifra, no
    una medición, y el revisor la corrigió a 426.**
  - **Sobre la tercera fila de la grilla, que también corregí.** No es cierto
    que quedara en cero: entre 426 y 768 px mide **7,59 px**. El motivo es que
    el logo lleva `grid-row: 1 / 4` y ahora, con 58 px, es **más alto que las
    dos filas de texto que quedan** (28,59 + 21,81 = 50,4 px), así que la
    grilla estira la tercera para alojarlo. Antes el texto era más alto y eso no
    pasaba. **No es un hueco:** el alto del bloque es igual al alto del logo, o
    sea que no sobra espacio por debajo del elemento más alto, y `align-items:
    start` mantiene el logo alineado arriba con el nombre en todos los anchos
    (mismo `top`, verificado por geometría y por captura a 360, 390, 480, 768 y
    1440 px). El único efecto visible es que en ese tramo el logo sobresale
    7,6 px por debajo del lema.
  - **Quedó CSS sin uso y no lo borré:** `.footer-brand-sub`, que solo usaba el
    `<div>` eliminado. Mismo criterio que en P-037 punto 3: borrar lo que la
    spec no nombra es un hueco (`CLAUDE.md` §9). Si Ramiro quiere que caiga en
    la limpieza de la Tarea 13, lo dice.
  - **Resuelto el 2026-09-28:** Ramiro mandó borrar `.footer-brand-sub`, y se
    fue junto con las otras tres huérfanas en el commit de las tres columnas.
    (La primera versión de esta resolución **pisó** las dos líneas de arriba en
    vez de agregarse debajo, al revés de lo que pide la cabecera de este
    archivo y de lo que se había hecho en P-037. Repuestas; me lo marcó el
    revisor.)
  - **Nota de proceso:** para comparar contra `HEAD` usé `git stash`, que dejó
    el archivo en CRLF, como ya había pasado en M2c. Detectado y revertido
    antes de commitear: 2003 líneas, cero CRLF, y el diff sigue siendo solo el
    pie.

---

### P-045 — La unión Flotas → Marcas cambia de color sin remate diagonal
- **Estado:** respondida
- **Bloquea:** no bloquea. La página no tiene ningún defecto medible ahí.
- **Qué falta:** decidir si esa unión lleva un remate diagonal o se queda como
  está.
- **Contexto:** el orden final de la Tarea 13 puso la franja de marcas
  (`--gris-bg`) debajo de la sección de flotas (blanca). **Es el único cambio
  de color de la página sin remate diagonal**, y lo introdujo esta tarea: antes
  del movimiento, debajo de flotas estaba Servicios, que también es blanco, así
  que no había cambio de color. Medido sobre el DOM a 1440 px: `section.fleets`
  con fondo `rgb(255,255,255)` y `::after` en `none`, seguida de
  `div.brands-strip` con fondo `rgb(244,246,249)`. Además `.brands-strip` tiene
  `border-bottom` pero **no** `border-top`, o sea que la franja está delimitada
  abajo y no arriba, que es justamente el borde nuevo.
- **Qué hice mientras tanto:** **decisión mía: no creé el remate.** La regla de
  P-025 fija el **color** de los remates que existen; no manda crear uno nuevo,
  y crearlo es una decisión de forma que nadie pidió. Saqué capturas a 390 y
  1440 px (`temporary screenshots/m3-final-union-flotas-marcas-*.png`) y la
  unión lee como una banda deliberada, no como un error de pintura; el revisor
  coincidió en eso y aclaró que no le corresponde opinar sobre la forma.
- **Por qué esta pregunta existe:** porque el revisor me marcó, con razón, que
  la decisión estaba escrita **solo en un comentario de CSS**. Es la tercera
  vez que me pasa lo mismo en este módulo: ya había ocurrido en **P-026** y en
  **P-028**, las dos veces levantado por el revisor. Una decisión que vive en un
  comentario del código no está registrada.
- **Respuesta (2026-09-28):** se agrega la diagonal, con la geometría de las
  demás y el color de la sección de abajo. Y P-025 se amplía: todo cambio de
  color entre secciones lleva remate diagonal, y crearlo no es una decisión.
  Decisión de Ramiro.
- **Aplicado (2026-09-28).** `.fleets` recibió `position: relative`, el padding
  inferior pasó de 88 a 148 px —como las otras **seis** secciones con remate— y un
  `::after` con **la misma geometría exacta** que los demás: 66 px de alto,
  `bottom: -2px`, `clip-path: polygon(0 100%, 100% 0, 100% 100%)` y
  `background: var(--gris-bg)`, que es el fondo de la franja de marcas.
  **Medida la cadena entera sobre el DOM:** las **siete** diagonales del sitio
  coinciden con la sección de abajo. Captura en
  `temporary screenshots/post-union-flotas-marcas-*.png`.
  (Primero escribí "cinco" y "seis": eran seis antes de esta y son siete
  después. Lo contó el revisor con `grep -c` del `clip-path`, que da 7, y del
  `padding: 88px 0 148px`, que también da 7.)

---

### P-035 — Una frase de §10 que conservé al aplicar el cambio de Ramiro
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** confirmar que la frase conservada tiene que seguir ahí.
- **Contexto:** al responder P-029, Ramiro dictó el reemplazo de la fila
  "Marcas que también se atienden" de `datos-verificados.md` §10. La fila decía
  tres cosas: "Todas.", "Hay fotos y publicaciones de Instagram que lo
  respaldan." y "No listar marcas de lujo ni deportivas como especialidad." El
  texto nuevo repone la primera, reemplaza la segunda por la enumeración de las
  trece marcas y **no menciona la tercera**.
- **Qué hice mientras tanto:** **decisión mía:** conservé la tercera frase. No
  se contradice con lo nuevo: Audi, BMW, Mercedes-Benz y Porsche entran en la
  fila "También atendemos", que no es la de especialidad; la fila "Marcas foco"
  sigue siendo Toyota, Ford y Volkswagen. Si Ramiro la quería fuera, es borrar
  esa oración y nada más.
- **Corrección del fundamento** (me la marcó el revisor de P-021, y tiene
  razón): primero escribí que la conservación la obligaba `CLAUDE.md` §2. **No
  es así.** §2 está redactada para "cuando Ramiro entregue una versión nueva de
  `docs/datos-verificados.md`", y acá no hubo versión nueva del archivo sino un
  reemplazo de una fila dictado en prosa. Lo que aplica es **§9**: hay que
  elegir entre dos opciones y ninguna está dictada, así que se elige la que no
  borra, se declara como decisión propia y se anota. Eso es lo que hice; lo que
  estaba mal era el artículo que citaba.
- **El criterio, ahora explícito, porque en el mismo commit lo apliqué de dos
  maneras distintas** (segundo hallazgo del mismo revisor): en `ce9b2ba`
  también reemplacé el punto 3 de §1, y ahí **sí** dejé caer una oración,
  "No hace falta repetirlo en cada mención: alcanza con que ninguna mención
  atribuya los 20 años a DGP." La diferencia que veo entre los dos casos, y que
  no había escrito: en §1 el texto nuevo de Ramiro **vuelve a legislar el mismo
  asunto** (cuántas veces y dónde tiene que aparecer "Desde 2022"), así que
  reemplaza la oración vieja; en §10 el texto nuevo **no dice nada** sobre
  marcas de lujo y deportivas, que es otro asunto, así que no la reemplaza.
  **Decisión mía.** La sustancia de lo que se cayó en §1 sobrevive en el punto
  1 de la misma sección ("**Nunca** atribuir los 20 años a DGP"). Si Ramiro
  quiere esa oración de vuelta, se repone.
- **Respuesta (2026-09-28):** confirmada **tal como la tomé**. Decisión de Ramiro.

---

### P-036 — Cómo queda la Tarea 11 de la spec, que dictaba el párrafo sin "Desde 2022"
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** confirmar que la Tarea 11 de la spec tenía que quedar
  actualizada, y no como registro de lo que se pidió en su momento.
- **Contexto:** la Tarea 11 de `docs/spec-m3-home.md` dicta el párrafo de la
  zona de cobertura empezando por "Atendemos vehículos de…". La respuesta a
  P-021 le antepone "Desde 2022". Las dos instrucciones quedaron en el mismo
  archivo, a unas cien líneas de distancia, diciendo cosas distintas sobre el
  mismo párrafo. Lo levantó el revisor de P-021 como bloqueante: quien lea la
  Tarea 11 aislada revierte el cambio.
- **Qué hice mientras tanto:** **decisión mía**, entre las tres salidas que el
  revisor enumeró (reemplazar la línea, remitirla a la decisión, o dejarla como
  registro histórico fechado): **reemplacé el párrafo de la Tarea 11 por el
  texto vigente** —que es el que dictó Ramiro, no uno escrito por mí— y debajo
  dejé una nota fechada que dice qué decía antes y por qué cambió. Elegí esta
  porque deja el archivo sin contradicción y conserva el historial, y porque la
  regla de mantener la spec sincronizada pide justamente eso. No toca `public/`.
- **Respuesta (2026-09-28):** confirmada **tal como la tomé**. Decisión de Ramiro.

---

### P-037 — Tres decisiones de CSS que arrastró el borrado de la tarjeta (P-024)
- **Estado:** respondida
- **Bloquea:** no bloquea. P-024 quedó ejecutada.
- **Qué falta:** confirmar las dos primeras y decidir la tercera.
- **Contexto:** la tarjeta "Casa de Repuestos" era la **cuarta** de la pestaña
  "Repuestos" y la única destacada de todo el sitio. Al sacarla quedaron tres
  cosas sin dueño, y ninguna está nombrada en la respuesta de Ramiro, que dice
  solo "la pestaña queda con tres tarjetas".
- **Qué hice mientras tanto:** **las tres son decisiones mías.**
  1. **Renumeré los retardos del fade-in.** Las otras cuatro pestañas empiezan
     con una tarjeta sin retardo y siguen con `delay-1`, `delay-2`… Al caer la
     primera, Repuestos quedaba empezando en `delay-1`. Pasé las tres
     restantes a (sin retardo), `delay-1` y `delay-2`, que es la convención del
     archivo.
  2. **Borré las tres reglas `#tab-repuestos.tab-panel.active`** (la de base,
     que fijaba cuatro columnas, y sus dos repeticiones en los *media queries*
     de 768 y 480 px), y **después las restauré**. Ver abajo: fue un error mío
     y está revertido. El CSS quedó exactamente como estaba.
  3. **No borré el CSS que quedó sin uso:** `.service-card--highlight` (tres
     reglas) y `.badge-highlight`, que solo usaba esa tarjeta. (En la Tarea 13
     el revisor encontró una **cuarta** regla huérfana que yo no había visto,
     `.services-grid`, con su declaración base y tres *media queries*: no la usa
     ningún elemento y **nunca** la usó, `git log -S 'class="services-grid'` no
     devuelve ningún commit. Tampoco la borré, por el mismo motivo.) La limpieza que
     pide la Tarea 13 enumera `.badge-urgente`, `.hero h1 em` y la regla inerte
     de P-030, y estas dos no estaban en esa lista porque cuando se escribió
     todavía se usaban. **No las agrego por mi cuenta:** borrar lo que la spec
     no nombra es un hueco (`CLAUDE.md` §9). Si Ramiro quiere que caigan en la
     limpieza de la Tarea 13, lo dice y se van en ese commit.
     **Resuelto el 2026-09-28:** Ramiro mandó borrar las cuatro huérfanas
     —`.service-card--highlight` con sus tres reglas, `.badge-highlight`,
     `.footer-brand-sub` y `.services-grid`— y se fueron en el commit de las
     tres columnas.
  4. **Sincronicé la Tarea 4 de la spec**, que seguía ordenando la tarjeta
     borrada: la fila de la pestaña `Repuestos` de la tabla y el total, que
     pasó de 18 a 17 tarjetas (contadas: 3 + 5 + 3 + 3 + 3). Debajo dejé una
     nota fechada que dice qué decía antes y por qué cambió, y que la fila
     `Casa de Repuestos` de "Textos definitivos" y su viñeta de "Motivo de cada
     cambio" se conservan como registro. **Decisión mía**, con el mismo
     criterio que P-036. No toca `public/`. La primera redacción de esa nota
     decía que Ramiro había mandado eliminar la tarjeta *"porque repetía la
     sección `#casa-de-repuestos`"*: **él no dio motivo**, la redundancia es el
     argumento con el que yo planteé la pregunta. Corregido; me lo marcó el
     revisor.
- **Pendiente para la Tarea 13:** este borrado corrió nueve renglones y dejó
  desactualizadas las referencias de línea de **P-034** (`:1880`, `:1899`,
  `:1918`, `:1919`, `:1945`, `:1957`), algunas ya corridas de antes. Las de
  P-031 sí se corrigieron. El barrido de referencias de la Tarea 13 tiene que
  pasar por todo `preguntas-abiertas.md`, no solo por lo que toque cada unidad.
- **Resuelto en la Tarea 13.** El barrido se hizo y auditó las **25**
  referencias del archivo: 2 históricas, con hash de commit adelante, que son
  exactas, y **23 al archivo de ese día, todas corridas**. No se reescribieron:
  varias señalan elementos que ya no existen y habría habido que inventarles un
  número. En su lugar quedó escrito arriba, en el encabezado del archivo, que
  las referencias de línea son fechadas y que para encontrar algo hay que
  buscar el elemento. **Decisión mía**, con la auditoría completa en
  `docs/planes/m3-informe.md`.
- **El error del punto 2, y por qué era un error.** Lo levantó el revisor de
  P-024 como bloqueante y tenía razón por un motivo que yo no había mirado:
  esas reglas **no eran CSS huérfano**, eran la implementación de **P-012**, y
  lo que yo hice es exactamente la alternativa que Ramiro evaluó y descartó.
  `preguntas-abiertas.md`, P-012, texto del 2026-09-21: *"Alternativa, si se
  prefiere: borrar la regla con `id`. Así 'Repuestos' se comportaría como las
  demás pestañas a cualquier ancho…"*, y debajo: *"**Confirmación
  (2026-09-22):** Ramiro confirma la decisión; se queda así."* Mi argumento era
  que no se trataba de limpieza sino de consecuencia forzosa; no lo era:
  dejarlas no incumple ninguna regla escrita, solo deja cuatro columnas para
  tres tarjetas entre 769 y 1200 px, que es un juicio de apariencia y no me
  corresponde. El revisor además me señaló que en el mismo diff yo usaba el
  criterio contrario en el punto 3. **Restaurado:** las tres reglas y su
  comentario volvieron idénticos, en sus líneas originales.
- **Lo que queda por decidir, entonces:** si con tres tarjetas esas reglas
  siguen teniendo sentido. Hoy dan cuatro columnas para tres tarjetas entre 769
  y 1200 px, distinto de las otras tres pestañas de tres tarjetas. **No lo
  toco:** es de Ramiro, que ya se pronunció una vez sobre estas mismas reglas.
- **Respuesta (2026-09-28):** confirmada **tal como la tomé**. Decisión de Ramiro.

---

### P-038 — `docs/contraste-m3.md` quedó desalineado y ninguna tarea manda rehacerlo
- **Estado:** respondida
- **Bloquea:** no bloquea. El contraste **real** está medido y en cero
  incumplimientos; lo desalineado es el acta, no la página.
- **Qué falta:** decidir si la Tarea 13 rehace la auditoría de contraste o si
  el acta se queda como está, fechada en el día en que se midió.
- **Contexto:** `docs/contraste-m3.md` es el acta de la auditoría de contraste
  de M3. Las unidades de cierre le movieron cuatro filas y el total: la línea 2
  dice "Textos medidos: 387" y hoy son 381; las líneas 26, 29 y 79 son de la
  tarjeta que borró P-024; la 36 es el párrafo que cambió P-021; y la 67 es el
  `<h2>` que cambió P-027. **La lista de verificación de la Tarea 13
  (`docs/spec-m3-home.md`) no incluye rehacer la auditoría de contraste:** pide
  menú, `<h1>`, `grep`, JSON-LD, peso, capturas, huecos `TODO_IMAGEN` e
  informe. O sea que, tal como está escrita, M3 cerraría con el acta
  divergente y nadie decidió si eso está bien. Lo levantó el revisor de P-027.
- **Qué hice mientras tanto:** **nada todavía, y una decisión mía para la
  Tarea 13 si Ramiro no dice otra cosa:** no toqué el archivo en ninguna de las
  unidades —el precedente de P-021 y P-024 es que las actas fechadas no se
  editan, y parchear solo una fila dejaría un documento híbrido que no refleja
  ningún momento real, que es peor que uno viejo y coherente—; y en la Tarea
  13, con la página ya final, **pienso regenerarlo entero** con
  `node tools/auditar-contraste.mjs`, con su fecha nueva, de modo que el acta
  vuelva a describir un estado que existió de verdad. La versión anterior no se
  pierde: queda en el historial de git. Si Ramiro prefiere que el acta de M3
  quede congelada como está, lo dice y no se regenera.
- **Resuelto en la Tarea 13.** Se regeneró entera, con la página ya final:
  **383 textos, 70 combinaciones distintas, 0 por debajo del mínimo**, 1 exenta
  por decorativa. El revisor la corrió por su cuenta y comparó su salida con el
  archivo: **idénticos**, o sea que el acta es reproducible línea por línea.
- **Una salvedad, porque acá arriba escribí "con su fecha nueva":**
  `tools/auditar-contraste.mjs` **no emite fecha**, así que el acta nueva no
  lleva ninguna y es indistinguible de la anterior salvo por su contenido. Me
  lo marcó el revisor. **No le agregué una línea de fecha a mano**, porque eso
  rompería justamente lo que la hace confiable: que se pueda regenerar y dar
  byte por byte lo mismo. La fecha del acta es la del commit que la trae. Si
  conviene que el archivo la lleve adentro, hay que agregársela a la
  herramienta, y eso no lo hago por mi cuenta.
- **Respuesta (2026-09-28):** confirmada **tal como la tomé**. Decisión de Ramiro.

---

### P-041 — El botón de WhatsApp de los dos menús no está en la lista de P-032
- **Estado:** respondida
- **Bloquea:** no bloquea. P-032 quedó ejecutada.
- **Qué falta:** confirmar que el botón se queda donde está.
- **Contexto:** la respuesta de P-032 enumera **seis** entradas de menú: Inicio,
  Servicios, ¿Por qué elegirnos?, Flotas, Reseñas y Contacto. En el marcado hay
  **siete** enlaces en cada bloque: los seis, más el botón azul "Pedir turno" /
  "Pedir turno por WhatsApp", que estaba desde la Tarea 1.
- **Qué hice mientras tanto:** **decisión mía: no lo toqué.** La respuesta
  enumera destinos internos, con rótulo y orden; el botón no es un destino sino
  una acción, y su color y su lugar vienen de `datos-verificados.md` §19,
  decisión de Ramiro del 2026-09-21. Borrarlo habría sido exactamente el error
  de P-024: llevarme por delante la implementación de una decisión ya tomada.
  El revisor coincidió en el fondo —"no borrarlo es lo correcto"— y me marcó
  que la decisión estaba anotada dentro de una pregunta ya `respondida`, donde
  nadie la va a ver. Por eso está acá, abierta.
- **Respuesta (2026-09-28):** confirmada **tal como la tomé**. Decisión de Ramiro.

---

### P-043 — El enlace nuevo del pie no se ve como enlace
- **Estado:** respondida
- **Bloquea:** no bloquea. Funciona, llega al contraste mínimo y tiene foco
  visible.
- **Qué falta:** decidir si `@dgpcentromecanico` en el pie tiene que
  distinguirse del texto que lo rodea, y cómo.
- **Contexto:** P-034 convirtió ese texto en enlace a Instagram. Es el **primer
  enlace en línea dentro de un párrafo del pie**: los demás enlaces del pie
  viven en listas y se leen como navegación por su posición. Medido: el
  teléfono de la línea de arriba y el enlace tienen **exactamente** el mismo
  color computado (`rgba(255,255,255,0.62)`), el mismo tamaño (13,92 px) y
  `text-decoration-line: none`, porque el sitio tiene `a { text-decoration:
  none; color: inherit }`. O sea que nada indica que uno sea enlace salvo el
  cursor y el foco. Lo levantó el revisor de P-034.
- **Qué hice mientras tanto:** **nada.** `CLAUDE.md` §6 se cumple: contraste
  5,44:1 contra un mínimo de 4,50:1, foco visible con contorno de 3 px que da
  4,86:1 sobre el fondo, y alcanzable por teclado. Que un enlace *parezca*
  enlace es una decisión de forma que no me corresponde. En la sección de
  contacto los tres enlaces de redes sí llevan subrayado (`.contact-redes a`),
  así que la salida más obvia sería hacer lo mismo acá; no la aplico por mi
  cuenta.
- **Respuesta (2026-09-28):** confirmada **tal como la tomé**. Decisión de Ramiro.

---

### P-039 — "Pedir un presupuesto por WhatsApp" tiene respaldo, pero repartido en tres filas
- **Estado:** respondida
- **Bloquea:** no bloquea. El texto es de Ramiro y se publica tal cual.
- **Qué falta:** decidir si `datos-verificados.md` §18b lleva una fila propia
  que registre **el canal** por el que se piden presupuestos.
- **Contexto:** el párrafo de contacto que Ramiro escribió para P-031 dice
  "Escribinos por WhatsApp para coordinar el turno o pedir un presupuesto". El
  revisor descompuso la oración en sus tres hechos y buscó cada uno en la
  fuente de verdad:
  - *Escribinos por WhatsApp* → §2, "Contacto para flotas y particulares |
    Recepción general, por WhatsApp". Respaldado.
  - *coordinar el turno* → §18b, "Service y revisión: se presupuesta; si el
    cliente aprueba, se da turno en el momento". Respaldado.
  - *pedir un presupuesto* → §18b lo dice tres veces ("se presupuesta", "se
    pasa un presupuesto sin desarme previo", "coordinar un turno para revisar y
    presupuestar"). El **hecho** está verificado; lo que no está escrito en
    ninguna fila es el par "presupuesto **por WhatsApp**".
  `grep -n "presupuest" docs/datos-verificados.md` da cuatro líneas y **ninguna
  nombra el canal**.
- **Qué hice mientras tanto:** **nada, y no toco el texto.** Es de Ramiro, él
  es el origen de los datos de §18b, la oración no promete que el presupuesto
  se *entregue* por WhatsApp —solo que se puede pedir por ahí— y §2 dice que
  WhatsApp es la recepción general. Además el sitio ya publica el mismo hecho
  desde antes, en la sección "Cómo trabajamos" ("te pasamos el presupuesto…"),
  sin que ninguna revisión lo objetara. Queda anotado para que la afirmación
  publicada tenga respaldo en una sola línea y no por composición.
- **Respuesta (2026-09-28):** se agrega a `datos-verificados.md` §18b, en
  "Cómo funciona el turno": *- **Canal:** los presupuestos y los turnos se
  piden por WhatsApp, a la recepción general (§2).* Decisión de Ramiro.
- **Aplicado (2026-09-28).** Con la regla de diff: el `git diff` de
  `datos-verificados.md` da **`2 0`**, dos líneas agregadas y **cero
  borradas**. Con eso, la afirmación publicada "Escribinos por WhatsApp para
  coordinar el turno o pedir un presupuesto" ya tiene respaldo en **una sola
  fila**, que era lo que faltaba: antes había que componerlo de tres.

---

### P-040 — El horario queda escrito dos veces en la misma banda visual de contacto
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** decidir si la repetición se deja o si uno de los dos textos
  cambia. Los dos son de Ramiro, así que ninguno lo toco.
- **Contexto:** desde P-031, el párrafo de `#contacto` termina en "Respondemos
  de lunes a viernes de 8:00 a 17:30.", y la ficha de datos de la misma sección
  dice "Horario de atención / Lunes a viernes de 8:00 a 17:30", que viene de la
  Tarea 12 y que P-034 confirma. **Medido a 1440 px:** el párrafo está en
  `(x 152, y 6574)` y la ficha en `(x 752, y 6617)`; la separación vertical es
  de **−13 px**, o sea que se solapan en altura, a 64 px de distancia
  horizontal: los dos textos se leen de un vistazo. A 390 px quedan a 276 px y
  no se ven juntos, así que es un efecto de escritorio.
- **Qué hice mientras tanto:** **nada.** Es el mismo patrón que Ramiro resolvió
  en P-030 —un texto que repite lo que ya dice otro elemento al lado—, por eso
  lo levantó el revisor; pero acá los dos textos los escribió él, y elegir cuál
  se va o cómo se reescribe es copy (`CLAUDE.md` §1). Lo anoto y sigo.
- **Respuesta (2026-09-28):** el párrafo de contacto queda solo con la primera
  oración, "Escribinos por WhatsApp para coordinar el turno o pedir un
  presupuesto." El horario queda en la ficha de datos de al lado. Decisión de
  Ramiro.
- **Aplicado (2026-09-28).** El párrafo perdió la segunda oración. El horario
  queda ahora en **dos** lugares **visibles**, y ninguno de los dos se solapa
  con el otro: la ficha de datos de la sección de contacto y la columna
  Contacto del pie. Hay un tercero, legible solo por máquina: el
  `openingHoursSpecification` del JSON-LD, donde schema.org exige el formato
  `HH:MM` y por eso dice `08:00`. La repetición que medía −13 px de separación a 1440 px desapareció,
  porque uno de los dos textos ya no existe.

---

### P-042 — Dos comportamientos del menú móvil que vienen de antes
- **Estado:** respondida
- **Bloquea:** no bloquea. Ninguno de los dos lo introdujo P-032; los dos
  existen desde antes y se verificaron idénticos en `HEAD` y en el trabajo.
- **Qué falta:** decidir si se arreglan o si se dejan.
- **Contexto:** los levantó el revisor de P-032 al medir el corte nuevo.
  1. **Al ensanchar la ventana con el menú móvil abierto, quedan los dos menús
     visibles a la vez.** No hay manejador de `resize`: `closeMobileMenu()`
     solo se dispara al tocar un enlace o el botón. Medido antes y después del
     cambio de corte: el comportamiento es el mismo, lo único que se movió es
     la franja donde puede pasar (antes cruzando 768 px, ahora 830 px). La
     afirmación "ningún ancho con los dos menús visibles" que verifiqué vale al
     **cargar** la página en cada ancho, no al redimensionar con el menú
     abierto.
  2. **En el menú móvil, el enlace de WhatsApp es el único sin
     `closeMobileMenu()`.** Los seis de navegación lo tienen, incluido "Flotas".
     Como abre otra pestaña, el menú queda abierto detrás.
- **Qué hice mientras tanto:** **nada.** Los dos son anteriores a esta ronda y
  arreglarlos es tocar JavaScript que ninguna respuesta de Ramiro menciona
  (`CLAUDE.md` §7 y §9). El primero se arregla con un `resize` que cierre el
  menú al pasar a escritorio; el segundo, agregando el `onclick` que ya tienen
  los otros seis. Los dos son de una línea, pero no los hago por mi cuenta.
- **Respuesta (2026-09-28):** se arreglan los dos. Decisión de Ramiro.
- **Aplicado (2026-09-28), y probado con interacción real, no leyendo el
  código:**
  1. **El manejador de `resize`.** Cierra el menú móvil cuando el botón deja de
     mostrarse. **Decisión propia de forma:** la condición es
     `getComputedStyle(navToggle).display === 'none'` y no una comparación
     contra 830 px, para que el ancho de corte siga viviendo **solo** en el
     CSS y no haya dos fuentes de verdad que se puedan desincronizar.
  2. **El `onclick="closeMobileMenu()"`** del enlace de WhatsApp, que era el
     único de los siete que no lo tenía.
  **Las tres pruebas:** abrir a 390 px y ensanchar a 1200 → el menú se cierra
  solo, `aria-expanded` vuelve a `false` y el rótulo a "Abrir menú", y **en
  ningún momento quedan los dos menús visibles**; abrir a 390 px y achicar a
  360 → **sigue abierto**, que es lo correcto, porque no se cruzó el corte; y
  clic en el enlace de WhatsApp → cierra, con `aria-expanded` y rótulo
  correctos.

---

### P-044 — `core.autocrlf` está en `true` y no hay `.gitattributes`
- **Estado:** respondida
- **Bloquea:** no bloquea, pero es una trampa que ya se disparó dos veces.
- **Qué falta:** decidir si se agrega un `.gitattributes` que fije los finales
  de línea del repositorio.
- **Contexto:** `public/index.html` está en LF en el índice y en el árbol de
  trabajo, pero `git config core.autocrlf` está en `true` y el repositorio no
  tiene `.gitattributes`. Cada vez que git reescribe el archivo —un `git
  stash`, un `git checkout`— lo devuelve en **CRLF**, y un commit hecho así
  ensucia las 2003 líneas mientras el contador de cambios sigue diciendo que se
  tocaron ocho. Pasó en M2c y volvió a pasar en esta unidad, al comparar la
  grilla del pie contra `HEAD` con `git stash`. Las dos veces se detectó y se
  revirtió antes de commitear, pero depende de acordarse.
- **Qué hice mientras tanto:** **nada en la configuración.** Tocar `git config`
  o agregar un archivo que cambia cómo se guardan todos los archivos del
  repositorio no es algo que haga por mi cuenta. Mientras tanto, la forma
  segura de comparar contra una versión anterior es `git show
  HEAD:public/index.html > archivo.html` y abrirlo con `file:///`, que no toca
  el árbol de trabajo. Quedó escrito en el informe de esta unidad.
- **Respuesta (2026-09-28):** se agrega un `.gitattributes` con
  `* text=auto eol=lf`, y los binarios (`*.png`, `*.jpg`, `*.webp`, `*.avif`,
  `*.woff2`, `*.ico`) marcados como `binary`. Después `git add --renormalize .`
  y verificar que el commit no cambie el contenido de ningún archivo, solo
  finales de línea; si cambiara algo más, frenar. Decisión de Ramiro.
- **Aplicado (2026-09-28), con la verificación que él pidió.**
  - **El `--renormalize` no cambió nada.** Lo único que entró al índice fue el
    propio `.gitattributes`: `git diff --cached --name-only` devuelve **ese
    archivo y nada más**. No hubo que frenar.
  - **Comprobado además por huella de contenido**, no solo por el índice: saqué
    el `sha256` de los **78** archivos versionados **ignorando los finales de
    línea**, antes y después, y los comparé. La única diferencia es la línea
    nueva de `.gitattributes`. Ningún contenido cambió.
  - **Estado de los finales de línea antes:** 56 archivos `i/lf w/lf`, 21
    binarios y **uno con CRLF en el árbol de trabajo**,
    `tools/auditar-contraste.mjs`, que tenía 198 retornos de carro. Su índice
    ya estaba en LF, así que el `--renormalize` no lo tocó.
  - **Decisión propia:** normalicé también **el árbol de trabajo** de ese
    archivo, para que coincida con su índice. Ver **P-052**.
  - **Estado después:** **58 archivos `i/lf w/lf` y 21 binarios. Cero CRLF en
    todo el repositorio.**
  - **Lo que esto cierra:** `core.autocrlf` sigue en `true`, pero ya no manda:
    `.gitattributes` gana. Se acabó el riesgo de que un `git stash` devuelva
    `public/index.html` en CRLF y un commit ensucie sus ~2000 líneas mientras
    el contador dice que se tocaron ocho. Pasó dos veces, en M2c y al aplicar
    P-034, y las dos se detectó a mano antes de commitear.

---

### P-056 — Rediseño visual según DESIGN.md: decisiones de Ramiro y alcance de la muestra
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Qué falta:** nada. Se anota para dejar registro.
- **Respuesta (2026-10-07), de Ramiro en la conversación:**
  - Rediseño estético tomando `DESIGN.md` como guía, **respetando los colores
    (azul #124B8F, verde #7DB919) y las tipografías actuales (Montserrat y
    Roboto)**.
  - Tema **oscuro con el azul de la casa**: el fondo pasa a ser un azul casi
    negro sacado de `--azul-dark`. Tarjetas en tonos de azul, el verde para
    los botones y las cifras.
  - Animación **llamativa**: además de las apariciones suaves, un fondo
    animado en el inicio (esfera de puntos en canvas).
  - Entrega: **primero una muestra** (menú, inicio y Servicios), y el resto
    recién con su visto bueno.
- **Qué hice:** la muestra, en la rama `rediseno-visual`, sin tocar ningún
  texto. Los colores nuevos son todos derivados del azul y el verde (variables
  `--noche`, `--superficie`, `--verde-luz`, etc.).

---

### P-057 — Excepción a la regla de imágenes: generadas por IA solo para fondos abstractos
- **Estado:** abierta
- **Bloquea:** no bloquea la muestra (no usa ninguna imagen generada).
- **Qué falta:** la clave de API de OpenAI (`OPENAI_API_KEY`) en esta
  máquina, si se quiere usar. Hoy no está configurada.
- **Contexto:** CLAUDE.md §2 y `docs/brief-fotografico.md` prohíben imágenes
  generadas. Ramiro habilitó (2026-10-07) una excepción acotada: **solo
  texturas o fondos abstractos que no muestren autos, personas ni el taller**.
  Las fotos del taller siguen siendo solo reales, y los huecos `TODO_IMAGEN`
  siguen esperando sus fotos.
- **Qué hice mientras tanto:** nada generado. Los adornos de la muestra (brillos,
  degradados, grilla, esfera) son CSS y canvas. Falta además reflejar la
  excepción en CLAUDE.md y en el brief, si Ramiro la confirma como permanente.

---

### P-058 — Decisiones propias de forma en la muestra del rediseño
- **Estado:** respondida
- **Decisión propia**, 2026-10-07.
- **Menú:** los cortes que fijó Ramiro (menú móvil hasta 830 px, modo compacto
  por debajo de 1000 px) quedan iguales. Como los enlaces pasaron a mayúsculas
  con espaciado entre letras, que los ensancha, achiqué el hueco entre enlaces
  (22 px hasta 1200 px, 14 px hasta 1000 px) y el espaciado entre letras en el
  modo compacto. Medido de 831 a 1920 px: el botón nunca se sale del aire del
  contenedor.
- **Problema que viene de antes y sigue:** entre 831 y ~1084 px el texto
  "Centro Mecánico DGP" del logo se parte en 3 líneas. En `HEAD` ya pasaba, de
  831 a 1056 px y con hasta 4 líneas. No lo arreglé porque no es parte del
  pedido; queda para decidir.
- **Cifras del inicio:** suben desde cero hasta el valor escrito en el HTML,
  que es el que queda al final. Sin JavaScript o con movimiento reducido se ve
  el valor directamente.
- **Contraste de las cifras:** `tools/auditar-contraste.mjs` las marca en
  1,04:1 (p10), pero es un artefacto de la medición: el número se pinta con un
  degradado recortado al texto, y la captura "sin texto" conserva ese
  degradado. La mediana que da la misma herramienta es 7,4–7,8:1, y el verde
  más oscuro del degradado (#7DB919) contra #06152B da ≈7,4:1. Mínimo para
  texto grande: 3:1.
- **Hueco en el móvil que venía de antes:** debajo de 480 px, `.container`
  pisaba el padding de arriba del inicio y el texto quedaba pegado al menú. Lo
  repuse con `.hero .hero-content`.

---

### P-059 — Rediseño: dirección elegida y estructura en varias páginas
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Respuesta (2026-10-07), de Ramiro en la conversación:**
  - Se descarta la muestra oscura de P-056; `public/index.html` volvió al
    último commit (`f59a765`). Hecho y verificado: `git diff HEAD` sin
    cambios en ese archivo.
  - Referencias elegidas: Rogers-O'Brien (tono, tipografía contundente,
    diagonales, color de marca en planos, orgullo regional, imagen de la
    empresa difuminada al final), Aurora (animaciones, estructura para
    flotas, franja móvil con las marcas que se atienden), Holt (mapa de
    cobertura con puntos y nombres), T1 Energy (fotos del galpón y del
    trabajo), HB Body (sección de productos con deslizantes). Descartadas:
    Rivian y Custom Truck. Las reseñas conservan su estructura y solo se
    adaptan al estilo nuevo. Detalle en `docs/propuesta-rediseno.md`.
  - **Flotas y productos van en secciones propias del sitio**, no dentro de la
    home. Lectura del agente, a confirmar: el menú pasa a tener páginas
    propias (Inicio · Flotas · Repuestos), cada una con su dirección. La home
    sigue priorizando al particular, como decidió Ramiro el 2026-09-21.
- **Decisión propia que respeta una decisión registrada:** los botones vuelven
  a ser azul con texto blanco (`datos-verificados.md` §19). La muestra oscura
  los había puesto en verde, y eso contradecía esa decisión.

---

### P-060 — Coordenadas de las localidades para el mapa de cobertura
- **Estado:** respondida
- **Bloquea:** el mapa de cobertura.
- **Qué falta:** que Ramiro apruebe la tabla de
  `docs/coordenadas-localidades-propuesta.md` para pasarla a
  `datos-verificados.md`, y que responda dos dudas de la lista de §11:
  1. **"Palestina" y "La Palestina"** figuran como dos localidades, las dos a
     27,2 km. En el registro oficial solo existe La Palestina. ¿Son la misma
     y una sobra?
  2. **Nombres oficiales distintos:** "Dalmacio Vélez Sarsfield" figura como
     "Dalmacio Vélez", y "San Marcos Sud" como "San Marcos". ¿En el mapa se
     escriben como en §11 (el nombre de uso) o como el oficial?
- **Contexto:** Ramiro eligió (2026-10-07) sacar las coordenadas de una fuente
  pública. §11 solo tiene distancias, no ubicación.
- **Qué hice mientras tanto:** la tabla, con las 42 localidades validadas
  contra la distancia registrada (todas dentro de ±2 km).

- **Respuesta (2026-10-07):** "usá el nombre oficial". Con eso la tabla queda aprobada y pasó a `datos-verificados.md` §11 ("Coordenadas para el mapa de cobertura"). "Palestina" no existe con nombre oficial: queda una sola, La Palestina. Dalmacio Vélez y San Marcos van con su nombre oficial.
---

### P-061 — Catálogo de la casa de repuestos (sección de productos)
- **Estado:** respondida
- **Bloquea:** la página de productos.
- **Qué falta:** el contenido del catálogo. No hay nada de esto en
  `datos-verificados.md`:
  1. Qué **categorías** se muestran (hoy la pestaña "Repuestos" de Servicios
     nombra tres: filtros y lubricantes, frenos y suspensión, distribución).
  2. Qué **productos** concretos van en el deslizante de destacados, con su
     nombre y una descripción corta.
  3. Si se muestran **precios** o solo "Consultar por WhatsApp".
  4. **Fotos de los productos:** tienen que ser fotos propias del stock real.
     Las fotos de catálogo de los fabricantes están prohibidas (CLAUDE.md §2).
- **Qué hice mientras tanto:** nada.

- **Respuesta (2026-10-07):** categorías, exactamente las tres de hoy (filtros y lubricantes, frenos y suspensión, distribución); productos para **Toyota Hilux, VW Amarok y Ford Ranger**; **sin precios**, con "Consultar por WhatsApp"; las fotos quedan en blanco por ahora (huecos `TODO_IMAGEN`) y se agregan después.
- **Lo que todavía falta:** el texto de cada producto (nombre comercial y descripción corta). No lo escribo yo (CLAUDE.md §1): queda `TODO_DATO` en cada tarjeta.
---

### P-062 — Franja móvil de marcas: nombres en texto o logos
- **Estado:** respondida
- **Bloquea:** no bloquea (hay una opción por defecto).
- **Qué falta:** si la franja muestra los **nombres** de las marcas en la
  tipografía del sitio, como hoy, o los **logos** de las marcas.
- **Contexto:** los logos son marcas registradas de terceros, y no hay
  archivos en el repositorio. Conseguirlos implica descargarlos de algún lado
  (CLAUDE.md §2 lo restringe) y decidir si DGP puede usarlos. Los de Toyota,
  Volkswagen y Ford ya aparecen en el cartel de la fachada.
- **Qué hice mientras tanto:** la propuesta usa los nombres en texto.

- **Respuesta (2026-10-07):** logos, "sacalos de Google".
- **Decisión propia sobre la fuente:** en vez de imágenes sueltas de resultados de Google (tamaño, calidad y licencia inciertos), usé **Simple Icons** (colección abierta de logos en SVG, licencia CC0, versión 16.34.0) para 15 marcas, y **Wikimedia Commons** (`File:Dodge logo.svg`, dominio público) para Dodge, que Simple Icons no tiene. Son vectoriales, de un solo color y pesan poco. Originales en `assets-src/marcas/`. Si Ramiro prefiere otras versiones, se cambian.
- **Lo que sigue valiendo:** son marcas registradas de terceros. Se usan para decir qué marcas se atienden, como en el cartel de la fachada.
---

### P-063 — Decisiones propias al cargar coordenadas, logos y fotos
- **Estado:** respondida
- **Decisión propia**, 2026-10-07.
- **Acentos en el mapa:** Georef escribe "Idiazabal" y "Ordoñez". En el mapa
  van como en `datos-verificados.md` §11, "Idiazábal" y "Ordóñez": es la
  misma localidad y es la grafía correcta. Ramiro pidió "el nombre oficial"
  pensando en Dalmacio Vélez y San Marcos; si también quiere la grafía de
  Georef para estas dos, se cambia.
- **Fotos de la fachada:** Ramiro respondió "usá esas" (las copias de
  WhatsApp, de 1280 px). Las saqué de `public/`, donde se habrían publicado
  con espacios en el nombre, y las moví a `assets-src/fotos/` con nombres
  según el brief (`F-07-original-1.jpg` a `-4`). Quedan por debajo del
  mínimo de 2000 px que pide el brief: se usan igual por indicación de Ramiro.

---

### P-064 — Decisiones propias en la muestra del rediseño (inicio, marcas y cierre)
- **Estado:** respondida
- **Decisión propia**, 2026-10-07. Ramiro aprobó hacer la muestra; estas son
  decisiones de forma tomadas al hacerla. Ningún texto visible cambió.
- **Textos de accesibilidad nuevos** (no se ven en pantalla): el `alt` de la
  foto F-07, "Frente de Centro Mecánico DGP, con el cartel y el portón de
  entrada", y las etiquetas del botón de la cinta de marcas, "Pausar la
  franja de marcas" / "Reanudar la franja de marcas". CLAUDE.md §6 pide
  `aria-label` en los botones que solo tienen ícono. Si Ramiro quiere otra
  redacción, se cambia.
- **Botón de pausa de la cinta:** lo exige WCAG 2.2.2 para todo lo que se
  mueve más de 5 segundos. La cinta también se frena con el mouse y con el
  foco del teclado.
- **Texto que se llena al bajar:** va en el párrafo de "Clientes de toda la
  región", que deja de usar la aparición `.fade-in`. Arranca en `#767676`
  (4,54:1), no en el gris claro de Aurora (1,65:1), porque CLAUDE.md §6 pide
  4,5:1 siempre.
- **Capa azul del cierre:** 84 % arriba y 88 % abajo sobre la fachada
  difuminada. Es la más transparente con la que todos los textos de contacto
  pasan 4,5:1 (el más justo, 4,55:1); con más transparencia el cielo de la
  foto bajaba el contraste.
- **Dodge a 18 px de alto en la cinta:** es un logotipo apaisado y a 30 px
  ocupaba el ancho de tres marcas.
- **Logos sin transparencia:** al 80 % los logos de trazo fino (Peugeot) se
  perdían.
- **Hueco que venía de antes:** el bloque de texto del inicio se achicaba a
  su contenido y quedaba centrado (en el diseño anterior empezaba en x = 380
  px a 1440 de ancho). Ahora ocupa el ancho del contenedor. Y debajo de 480
  px, `.container` pisaba el espacio de arriba del inicio; se repuso.
- **Lo que no cambia:** la foto del inicio sigue siendo la provisoria que no
  se puede publicar (F-01, bloqueante de M5).

---

### P-065 — Decisiones propias al llevar el rediseño al resto de la home
- **Estado:** respondida
- **Decisión propia**, 2026-10-07. Ramiro aprobó la muestra y pidió seguir
  "con la misma idea". Ningún texto visible cambió.
- **Títulos de sección** en mayúsculas, alineados a la izquierda, con una
  línea hasta el borde (verde en su primer tramo). Los encabezados que antes
  iban centrados también pasan a la izquierda, igual que el párrafo de
  cobertura, la calificación de Google y los botones de reseñas.
- **Planos de color:** la libreta digital pasa a fondo azul y flotas a azul
  oscuro. Los remates diagonales se recalcularon con la regla de P-025 (el
  color del remate es el de la sección de abajo): "Cómo trabajamos" remata en
  `--azul` y "Casa de repuestos" en `--azul-dark`. Los demás no cambian.
- **Tildes de las listas sobre azul** en verde claro (`#c5ec7f`): el verde de
  la casa no contrasta con el azul.
- **Pasos de "Cómo trabajamos" numerados 01 a 05** con un contador de CSS. Es
  numeración visual del orden en que ya están; no agrega texto al HTML.
- **Tarjetas** (servicios, pasos, reseñas, flotas y huecos de foto): esquinas
  rectas con una esquina cortada en diagonal, como el cartel de la fachada.
- **Pie:** las letras "DGP" gigantes y casi transparentes al final, ocultas a
  lectores de pantalla (`aria-hidden`), al estilo de Holt.
- **Contorno de foco del botón de flotas:** pasa a blanco. El azul oscuro de
  antes no se veía sobre el fondo nuevo.

---

### P-066 — Decisiones propias en el mapa de cobertura
- **Estado:** respondida
- **Decisión propia**, 2026-10-07. El mapa lo pidió Ramiro (P-059, al estilo
  de Holt); estas son decisiones de forma.
- **Lo genera un script** (`tools/generar-mapa-cobertura.mjs`) a partir de
  `datos-verificados.md` §11 y §2. Si cambia una coordenada, se regenera; no
  se edita a mano.
- **Dónde va:** en la home, junto al párrafo de "Clientes de toda la región",
  que no cambió. Las 10 localidades con más clientes van en verde y con el
  nombre destacado.
- **Los nombres son HTML de tamaño fijo** (12-13 px) sobre un SVG que escala.
  Si fueran parte del SVG, en celular quedaban en unos 6 px, por debajo del
  mínimo de 12 px de la tarea T5.
- **Por debajo de 1200 px de ancho** el mapa muestra solo las 10 principales,
  y debajo aparece la lista de las 42 localidades, de la más cercana a la más
  lejana. En escritorio la lista queda solo para lectores de pantalla.
- **Quedan 4 de 42 nombres** con algún roce menor en escritorio (sobre todo
  contra el borde punteado del anillo de 80 km), y 1 de 10 en celular. Se
  leen todos; está medido y visto en captura.
- **Sin textos nuevos:** el mapa no lleva título ni leyenda. Solo usa los
  nombres de las localidades, "N" y las distancias de los anillos (20, 40, 60
  y 80 km).
- **Herramienta de contraste:** `tools/auditar-contraste.mjs` medía el texto
  de la lista oculta para lectores de pantalla como si se viera (25 falsas
  fallas). Ahora saltea los contenedores recortados a 1 px.

---

### P-067 — Decisión propia: estilos y scripts en archivos compartidos
- **Estado:** respondida
- **Decisión propia**, 2026-10-07. Al sumar las páginas de flotas y repuestos
  (P-059), el CSS y el JavaScript salieron de `index.html` a
  `public/assets/css/sitio.css` y `public/assets/js/sitio.js`, para que las
  tres páginas los compartan en vez de copiarlos.
- **Verificado que la home no cambió:** capturas de página completa antes y
  después, a 1440 y 390 px: **0 píxeles distintos**. Menú móvil, Escape,
  pestañas con su dirección, pausa de la cinta y año del pie: funcionan, sin
  errores en la consola.
- **Costo medido** (`tools/medir-rendimiento.mjs`, 390 px en 4G lenta): de
  246 a 256 KB y de 1,28 a 1,77 s de LCP, por la hoja de estilos que ahora se
  pide aparte. Sigue debajo de 2,5 s (el umbral "bueno" de Google) y de los
  500 KB. Si Ramiro prefiere el LCP anterior, la alternativa es dejar en
  línea el CSS del primer pantallazo, a costa de mantener dos copias.

---

### P-068 — Textos de las páginas de Repuestos y Flotas
- **Estado:** respondida (salvo los sectores de 3 casos)
- **Bloquea:** solo la línea de sector de los casos 2, 3 y 4 de flotas.
- **Nota (2026-10-12):** los sectores que faltaban llegaron y se publicaron
  (P-076). Ya no bloquea nada.
- **Respuesta (2026-10-07):**
  - El borrador de `docs/textos-propuestos-paginas.md` queda **aprobado tal
    cual**.
  - La página de flotas va **de usted**, como decía la spec de M3. Los textos
    reusados de la home se adaptan a "usted" sin cambiar los hechos.
  - Sobre los 3 casos sin sector, Ramiro pidió que le pasen sus datos para
    identificarlos. Se los pasé (vehículos, marca dominante, cliente desde,
    órdenes de trabajo).
- **Qué hice mientras tanto:** la página muestra los 5 casos; en los 3 sin
  sector esa línea no aparece, y queda `TODO_DATO: sector` en el código.

---

### P-069 — Menú con "Repuestos": el menú móvil pasa a llegar hasta 900 px
- **Estado:** respondida
- **Respuesta (2026-10-07), de Ramiro:** el menú móvil llega hasta **900 px**
  (antes 830, decisión del 2026-09-28). Con 8 ítems, entre 831 y ~860 px el
  nombre del logo se partía en 5 líneas y se salía del menú.
- **Lo que se hizo además (decisión propia de forma):** entre 901 y 1200 px el
  hueco entre enlaces baja de 32 a 22 px, y en el modo compacto de Ramiro
  (< 1000 px) a 14 px, con la letra en 0,8rem y el botón más angosto. Medido
  de 901 a 1920 px de a 1 px: el botón nunca se sale del contenedor y el
  nombre del logo ocupa como máximo 3 líneas, dentro del menú.

---

### P-070 — Decisiones propias en las páginas de Repuestos y Flotas
- **Estado:** respondida
- **Decisión propia**, 2026-10-07. Textos: los aprobados en P-068. Todo lo
  demás es forma.
- **Direcciones:** `repuestos.html` y `flotas.html`, en la raíz, con su
  `canonical` propio y sumadas a `sitemap.xml`. Sin JSON-LD propio: el del
  negocio sigue solo en la home.
- **Menú y pie compartidos:** salen de la home tal cual. "Flotas" abre su
  página (antes bajaba al bloque de la home) y se suma "Repuestos"; en el pie,
  "Casa de Repuestos" abre la página nueva. La página actual queda marcada con
  `aria-current="page"`.
- **Huecos de foto nuevos:** F-04 en el encabezado de Repuestos, F-08 en el de
  Flotas (los dos ya estaban en el brief), F-03 en la libreta de Flotas, y uno
  por producto, `R-<modelo>-<categoría>` (9). Los de producto no figuran
  todavía en `docs/brief-fotografico.md`.
- **Cierre de Flotas:** el contacto de la home va de vos ("Pedí tu turno",
  "Escribinos…"). En Flotas, de usted, se sacó ese encabezado y queda el botón
  aprobado ("Consultar condiciones para empresas") con los datos de contacto.
- **Rótulos de Contacto al 80 %** en vez de 64 %: sobre la fachada
  difuminada, en Repuestos 5 rótulos quedaban debajo de 4,5:1.
- **Herramientas:** `tools/auditar-contraste.mjs` acepta la página a medir
  como segundo argumento.
- **Verificado en las tres páginas:** 0 desbordes (320 a 1920 px de a 1 px,
  con el menú abierto y cerrado), 0 fallas de contraste, un solo h1 y sin
  saltos de títulos, 0 enlaces internos rotos, todas las imágenes con alt,
  todos los `target="_blank"` con `noopener`. Primera carga en celular: 304,
  202 y 203 KB.

---

### P-071 — Mapa con base geográfica y correcciones de la revisión final
- **Estado:** respondida (salvo lo marcado como "Para Ramiro")
- **Pedido de Ramiro (2026-10-07):** "que el mapa sea visualmente un mapa, no
  un radar".
- **Qué se hizo (decisión propia de forma):**
  - La base del mapa sale de **OpenStreetMap** (ODbL): rutas troncales y
    principales, ríos con nombre, vías del tren y límites de departamentos y
    de provincia. `tools/descargar-base-mapa.mjs` la bajó una vez y la guardó
    simplificada en `assets-src/mapa/base.json`. El sitio no consulta nada de
    afuera: el dibujo queda dentro del HTML (~69 KB de SVG por página).
  - Se sacaron los anillos de 20, 40 y 60 km. Queda solo el radio de 80 km
    (dato de §11) como línea punteada.
  - **Textos nuevos que salen de esa fuente, no de datos-verificados:**
    carteles "RN 9" y "RN 158" (las dos rutas que cruzan la zona y pasan por
    Villa María) y "Río Tercero" (nombre en OpenStreetMap). Además, la
    atribución que exige la licencia: "© colaboradores de OpenStreetMap".
  - **Para Ramiro:** si prefiere sin carteles de rutas o sin el nombre del
    río (o "Ctalamochita" en vez de "Tercero"), se cambia en el generador.
- **Correcciones de la revisión (veredicto RECHAZADO, 3 bloqueantes):**
  1. F-08 pasa a 16:9, como dice el brief.
  2. **Textos de accesibilidad de las flechas** del deslizante:
     "Productos anteriores" y "Productos siguientes". Los exige CLAUDE.md §6
     (`aria-label` en botones que solo tienen ícono). Decisión propia,
     redacción a revisar por Ramiro.
  3. **Nombres de las fotos en minúsculas** (`f-07-…`). El brief arma el
     nombre con el id ("F-07"), y CLAUDE.md §3 pide minúsculas: gana
     CLAUDE.md. Los ids siguen en mayúscula en el brief y en los marcadores.
- **Otras correcciones:** se dejan de publicar F-07-1 y F-07-3 (nadie las
  usaba); el título de cada página ya no aparece desde opacidad 0 (demoraba
  el primer dibujo, CLAUDE.md §5); la foto provisoria del inicio lleva su
  marcador `TODO_IMAGEN: F-01`; los 9 huecos de producto entraron al brief;
  `docs/textos-propuestos-paginas.md` figura como aprobado y de usted.
- **Numeraciones visuales sin registrar hasta ahora** (decisión propia,
  `aria-hidden`): "01" a "05" en los casos de flotas, "01" a "03" en las
  categorías y "01 / 09" a "09 / 09" en los productos.
- **Para Ramiro:**
  - La foto F-07-2 (frente, junto al mapa de contacto) muestra el cartel de
    entrada con "Lun a Vie 08:00-17:00" y un teléfono distinto del
    verificado (17:30 y +54 9 353 459-3187). Al tamaño en que se ve no se
    lee, pero conviene saberlo, y quizás corregir el cartel.
    **Respuesta (Ramiro, 2026-10-08):** valen los datos verificados
    (17:30 y +54 9 353 459-3187). Ver P-073.
  - La propuesta decía que el inicio tenga un bloque que lleve a Flotas y
    otro a Repuestos. Hoy esas páginas se alcanzan desde el menú y el pie.
    Para un botón en los bloques de la home hace falta su texto.

---

### P-072 — Revisión del rediseño: segunda vuelta RECHAZADA, correcciones sin commitear
- **Estado:** respondida
- **Bloquea:** el commit de las correcciones del mapa (CLAUDE.md §7: después
  de dos vueltas rechazadas no se commitea la tarea).
- **Qué falta (para Ramiro):**
  1. ¿Se commitean las correcciones de abajo, ya verificadas, sin una tercera
     vuelta de revisión?
  2. ¿El mapa lleva rótulos de rutas ("RN 9", "RN 158") y del río? Si sí,
     ¿"Río Tercero" o "Río Ctalamochita"? Hoy no lleva ninguno.
  3. La atribución que exige la licencia de OpenStreetMap: "© colaboradores
     de OpenStreetMap". ¿Esa redacción va? (Sin atribución, la base no se
     puede usar.)
- **Qué se hizo, sin commitear:**
  - Se sacaron los carteles de rutas y el nombre del río. La base sigue
    dibujando rutas, ríos, tren y límites, sin rótulos.
  - El acomodo de nombres prueba 8 lados y 3 distancias por nombre, repasa
    varias veces y arranca desde 41 combinaciones; en celular optimiza para
    cuatro tamaños de mapa a la vez. El desplazamiento de cada nombre va en
    variables CSS (`--td`, `--tm`).
  - **Bug encontrado y corregido:** con "reducir movimiento" activado, los
    nombres perdían su desplazamiento (`transform: none`) y quedaban
    encimados.
  - **Medido en el navegador, de 320 a 1920 px de a 4:** ningún par de
    nombres visibles se superpone, con y sin movimiento reducido. Desde 1200
    px ningún nombre tapa el punto de otra localidad. Debajo de 1200 px
    quedan 3 casos de un nombre principal sobre un punto chico: "Arroyo
    Cabral" sobre Hernando (320-1048 px), "Ballesteros" sobre Luca (320-336)
    e "Idiazábal" sobre Justiniano Posse (416-432). En esos anchos los
    nombres de esas localidades no se muestran en el mapa y figuran en la
    lista de abajo.
  - Desborde: 0 en las tres páginas. Contraste: 0 fallas en las tres.
  - Informes de las dos vueltas en `docs/revisiones/rediseno-r1.md` y
    `rediseno-r2.md`. Tabla de estado del brief con los 9 huecos R-*.

- **Respuesta (2026-10-08), de Ramiro:** "guardalo sin carteles y dejá la leyenda". Se commitean las correcciones sin tercera vuelta de revisión; el mapa va sin rótulos de rutas ni del río, con la atribución "© colaboradores de OpenStreetMap".
---

### P-073 — Franja de marcas sin botón de pausa, arrastrable, y marcas principales centradas
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Pedido de Ramiro (2026-10-08):** sacar el botón de pausar/reanudar; que
  las marcas se muevan solas pero que el usuario pueda mover la franja para
  los dos lados; centrar las marcas principales, que estaban alineadas a la
  izquierda. Además confirmó que **valen los datos verificados** de teléfono
  y horario (no los del cartel de la fachada que se ve en F-07-2; ver P-071)
  y autorizó borrar `docs/coordenadas-localidades-propuesta.md` (borrado; no
  tenía seguimiento en git).
- **Qué se hizo:** se quitó el botón y sus aria-labels; la cinta pasó de
  animación CSS a `sitio.js`, que la avanza a la misma velocidad que tenía
  (un grupo de logos cada 38 s, unos 29 px/s a 1440 px de ancho) y la deja
  arrastrar con el mouse, deslizar con el dedo, correr con el trackpad o con
  las flechas del teclado, en los dos sentidos y sin que se vea el empalme.
  Con movimiento reducido sigue quieta, en filas, como antes, también si la
  preferencia se activa con la página abierta. Las tres marcas principales
  quedan en el centro de la página en todos los anchos (medido de 320 a
  1920 px: diferencia 0 px).
- **Revisión:** la primera vuelta salió RECHAZADA
  (`docs/revisiones/franja-marcas-r1.md`): la cinta no se podía usar con
  teclado, y en escritorio las marcas estaban centradas en su columna
  (119 px corridas del centro de la página) en vez de en la página, que es
  lo que pidió Ramiro. Las dos cosas se corrigieron.
- **Decisiones propias (forma), a revisar por Ramiro:**
  1. Se sigue frenando con el mouse encima (era así antes del pedido):
     permite agarrarla sin que se escape.
  2. Después de deslizarla con el dedo o el trackpad queda quieta 1,5 s y
     retoma sola.
  3. Para que se pueda usar con teclado, la cinta recibe el foco con Tab
     (solo mientras se mueve), se frena mientras lo tiene y las flechas la
     corren 80 px. Los lectores de pantalla la anuncian con el rótulo que ya
     se ve al lado, "También atendemos": no se agregó ningún texto nuevo.
- **Aviso de accesibilidad:** la pauta WCAG 2.2.2 pide que lo que se mueve
  solo más de 5 s se pueda pausar. Sin el botón, la cinta se frena con el
  mouse encima, con el foco del teclado y con la preferencia de movimiento
  reducido del sistema, pero no hay forma de detenerla de manera
  permanente: ni en el celular ni en la computadora, donde el mouse y el
  foco solo la frenan mientras están encima. Se hizo lo pedido; queda
  anotado.
- **Revisión, segunda vuelta:** APROBADO CON OBSERVACIONES
  (`docs/revisiones/franja-marcas-r2.md`). Las tres decisiones propias de
  arriba quedan para que Ramiro las vea.
---

### P-074 — El menú de flotas y repuestos no volvía a la home
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Pedido de Ramiro (2026-10-12):** "de ninguna de ellas [flotas y
  repuestos] se puede volver al inicio ni a ningún otro lado usando los
  botones superiores".
- **Causa:** los enlaces a la home eran `./#inicio`, `./#servicios`, etc.
  Con servidor, `./` abre `index.html`; abriendo el archivo con doble clic
  (`file://`), `./` abre la carpeta y no la página.
- **Decisión propia (corrección técnica):** en `flotas.html` y
  `repuestos.html` los 21 enlaces `./#…` de cada página (menú, menú móvil,
  logo y pie) pasan a `index.html#…`. Funciona igual con servidor y abriendo
  el archivo. El `canonical` de la home sigue siendo la raíz del dominio,
  así que `index.html` no compite como URL distinta.
- **Verificado:** con Puppeteer, clic en Inicio, Servicios, Reseñas,
  Contacto, Flotas y Repuestos desde las dos páginas: 12 de 12 llegan a
  destino, tanto con `file://` como con `http://localhost:3000`.

---

### P-075 — Fotos F-01, F-02, F-03, F-04 y F-08
- **Estado:** respondida (lo que queda para Ramiro está en P-078)
- **Bloquea:** no bloquea.
- **Pedido de Ramiro (2026-10-12):** "Ya están las fotos necesarias con sus
  nombres en una nueva carpeta llamada 'fotos'". Carpeta `Fotos/` en la raíz
  del proyecto: F-01.jpeg, F-02.jpeg, F-03.svg, F-04.jfif, F-08.jfif. Se
  copiaron a `assets-src/fotos/f-0N-original-1.*`; la carpeta `Fotos/` no se
  tocó ni se commitea.
- **Qué se hizo:** `tools/optimizar-imagenes.mjs` genera AVIF, WebP y JPG en
  480, 800, 1280 px y el ancho del original (sin agrandar). Cada foto va en
  su hueco: F-01 en el fondo del inicio; F-02 en "Cómo trabajamos"; F-03 en
  la libreta (home y flotas); F-04 en la casa de repuestos (home) y arriba de
  repuestos.html; F-08 arriba de flotas.html.
- **Decisiones propias:**
  1. **Patentes y logo tapados.** El brief pide patentes fuera de cuadro o
     tapadas, y §12 de los datos verificados prohíbe logos que identifiquen
     clientes. Se desenfocaron 8 patentes legibles (F-01: 2; F-04: 4; F-08:
     2) y el logo de SENASA de la camioneta de F-04, en el archivo publicado
     (no solo en pantalla). Las zonas están en `TAPAR`, en el script.
     También se desenfocaron los dos horarios del cartel del frente en F-01
     ("Lunes a Viernes 7:30 a 18:00 hs" y "8:00 a 18:00 hs"), que no
     coinciden con el horario verificado (§3: 08:00 – 17:30); las palabras
     "Repuestos" y "Recepción" siguen legibles. Lo marcó la primera revisión
     (`docs/revisiones/fotos-r1.md`).
  2. **F-03 en vertical.** Es una composición de 1122 × 1402 (4:5), no una
     foto 3:2: se publica entera en 4:5 en vez de recortarla, porque
     recortada se pierde la hoja de la libreta o el QR.
  3. **Inicio en escritorio:** F-01 es el frente con el cartel en el centro;
     con el encuadre anterior el panel azul tapaba el cartel. Desde 901 px la
     foto ocupa el 60 % derecho del inicio. En celular no cambia nada (la foto
     ya no se veía detrás del panel). El `sizes` del inicio pasa a
     `(min-width: 901px) 60vw, 100vw`, para no bajar una foto más grande que
     el hueco.
  4. **Textos alternativos** (descriptivos, para lectores de pantalla):
     F-02 "Técnico revisando el motor de una Toyota Hilux en el taller";
     F-03 "Código QR de la libreta digital pegado en el parasol de un
     vehículo, y una libreta de ejemplo con el historial de servicios";
     F-04 "Vehículos en los elevadores del taller"; F-08 "Camionetas y autos
     en el taller, vistos desde arriba". F-01 sigue decorativa (`alt=""`).
     Son texto nuevo: quedan para que Ramiro los vea.
- **Verificado:** 0 desbordes de 320 a 1920 px de a 1 px en las tres
  páginas, con menú cerrado y abierto. Peso de la home después del cambio
  de `sizes` (medido por el revisor): 317 KB en celular, 362 KB en celular
  de densidad 3 y 403 KB a 1440 px. Las salidas de F-07 no
  cambiaron (mismo hash md5 antes y después de regenerar).
- **Revisión:** primera vuelta RECHAZADA (`docs/revisiones/fotos-r1.md`) por
  el horario legible en el cartel de F-01; corregido como se dice arriba.
  Segunda vuelta APROBADO CON OBSERVACIONES (`docs/revisiones/fotos-r2.md`):
  la zona del horario de "Repuestos" cortaba la base de la palabra; se
  corrió hacia abajo ([772, 685, 62, 11]) y las dos palabras quedan enteras.

---

### P-076 — Sectores de los casos 2, 3 y 4 de flotas
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Respuesta (2026-10-12), de Ramiro:** "el caso de las Renault, es una
  empresa alimenticia y la más grande de las otras dos, empresa aceitera, y
  la última empresa manicera". Caso 2 (35 vehículos, Renault) → alimenticia;
  caso 3 (77 vehículos, el más grande de los dos restantes) → aceitera;
  caso 4 (16 vehículos) → manicera.
- **Qué se hizo:** se cargaron en `docs/datos-verificados.md` §13, con la cita
  de Ramiro (diff mostrado antes de commitear), y en `flotas.html` los tres
  `TODO_DATO` de P-068 pasaron a la etiqueta de sector de cada caso.
- **Decisión propia (forma):** las etiquetas van como adjetivo, "Alimenticia",
  "Aceitera" y "Manicera", igual que la del caso 5 ("Agropecuaria"), sin la
  palabra "empresa".
- **Aviso:** §13 pide sector **genérico**. "Manicera" y "Aceitera" son
  rubros con pocas empresas en la zona: junto con la cantidad de vehículos
  (16; 77 sobre 13 marcas) y "cliente desde 2022", podrían alcanzar para
  reconocer al cliente. Se publicó lo que dijo Ramiro; queda anotado por si
  prefiere algo más amplio (por ejemplo, "Agroindustria").
- **Revisión:** APROBADO CON OBSERVACIONES (`docs/revisiones/flotas-sectores-r1.md`).

---

### P-077 — Repuestos: "Próximamente" en las fotos de productos, y frenos y suspensión como rubros separados
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Pedido de Ramiro (2026-10-12):** "haz que donde van las imágenes de los
  repuestos en el apartado de 'PRODUCTOS DESTACADOS' diga 'PROXIMAMENTE' en
  diagonal y frenos y suspensión son rubros por separado".
- **Qué se hizo:**
  1. En los huecos de foto de los productos, el rótulo "Foto pendiente ·
     R-…" pasó a "Próximamente" (con tilde, en mayúsculas por CSS), en una
     faja azul cruzada en diagonal. Los `TODO_IMAGEN` y `TODO_DATO` de cada
     producto siguen en el código.
  2. "Frenos & Suspensión" se separó en dos rubros, "Frenos" y "Suspensión",
     en las categorías de `repuestos.html` (ahora 01 a 04) y en la pestaña
     Repuestos de los servicios de la home. Las descripciones son las dos
     mitades de la que ya estaba aprobada: "Pastillas, discos, campanas y
     cintas de freno." y "Amortiguadores y piezas de recambio de tren
     delantero y trasero." No se escribió texto nuevo.
  3. En "Productos destacados", cada modelo (Hilux, Amarok, Ranger) pasó de
     3 a 4 productos: el de "Frenos & Suspensión" se dividió en "Frenos ·
     <modelo>" y "Suspensión · <modelo>". Son 12 productos (01 / 12 a
     12 / 12), con 3 huecos de foto nuevos, `R-<modelo>-suspension`,
     agregados al brief fotográfico.
- **Decisiones propias (forma):**
  1. Sumar los 3 productos de suspensión, para que la lista siga siendo
     "cada rubro × cada modelo" como la armó P-068. Si Ramiro prefiere solo
     renombrar los de frenos, se sacan.
  2. Ícono nuevo para Suspensión (un resorte), dibujado en el mismo estilo de
     línea que los demás.
  3. Las categorías van en 4 columnas en escritorio, de a 2 entre 901 y
     1200 px y en 1 columna en celular. En la pestaña de la home quedan 3 + 1,
     como la pestaña Mecánica, que ya tiene 5.
- **Revisión:** APROBADO CON OBSERVACIONES (`docs/revisiones/repuestos-p077-r1.md`).
  Notas que deja:
  - `tools/auditar-contraste.mjs` marca "Próximamente" en 1,18:1: es un falso
    positivo, porque mide el rectángulo que envuelve al texto girado y ahí
    entran las rayas grises. Medido por píxel, las letras caen todas sobre
    el azul #124B8F: 8,65:1.
  - El brief dice "no se publica con huecos visibles". "Próximamente" lo
    pidió Ramiro, así que se entiende que acepta publicar esos huecos así;
    si no, hay que decidir antes de M5.
  - `docs/textos-propuestos-paginas.md` y `docs/spec-m3-home.md` siguen
    hablando de 3 rubros / 9 productos / "Frenos & Suspensión": son
    documentos de etapas anteriores y no se reescriben.

---

### P-079 — Localidades del mapa: solo las de 80 km
- **Estado:** respondida
- **Bloquea:** no bloquea.
- **Pregunta (2026-10-08):** si se exportaban de Anubis todas las
  localidades con clientes y órdenes, para sumar las de fuera del radio y
  dimensionar los puntos del mapa por cantidad de clientes.
- **Respuesta (2026-10-12), de Ramiro:** pidió hacer la consulta con
  /anubis-connect y después: "para lo de las ubicaciones, solo dejá los que
  estén a 80 km a la redonda de Villa María".
- **Qué se hizo:** consulta de solo lectura a Anubis (OT no canceladas,
  agrupadas por la localidad del cliente): 138 localidades, 2941 clientes,
  12220 órdenes. Con la respuesta de Ramiro, el mapa queda como está: las 42
  localidades de §11, todas dentro de los 80 km. No se agregó ninguna
  localidad ni se cambió el sitio. El export quedó fuera del repositorio.
- **Aviso:** en Anubis, varias localidades tienen la provincia mal cargada
  (por ejemplo, Chilibroste figura en Catamarca y Villa Nueva sin
  provincia), y 66 clientes con órdenes no tienen localidad. Los conteos por
  localidad de esta consulta no coinciden con la tabla de §11 (del
  2026-09-21, con otro criterio): §11 no se tocó.
