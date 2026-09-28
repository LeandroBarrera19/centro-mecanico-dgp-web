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
- **Nota (2026-09-28):** sigue abierta. Ramiro la repasó al responder el
  resto de las preguntas de M3 y confirmó que depende de la foto F-01.

---

### P-035 — Una frase de §10 que conservé al aplicar el cambio de Ramiro
- **Estado:** abierta
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

---

### P-036 — Cómo queda la Tarea 11 de la spec, que dictaba el párrafo sin "Desde 2022"
- **Estado:** abierta
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

---

### P-037 — Tres decisiones de CSS que arrastró el borrado de la tarjeta (P-024)
- **Estado:** abierta
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
     reglas) y `.badge-highlight`, que solo usaba esa tarjeta. La limpieza que
     pide la Tarea 13 enumera `.badge-urgente`, `.hero h1 em` y la regla inerte
     de P-030, y estas dos no estaban en esa lista porque cuando se escribió
     todavía se usaban. **No las agrego por mi cuenta:** borrar lo que la spec
     no nombra es un hueco (`CLAUDE.md` §9). Si Ramiro quiere que caigan en la
     limpieza de la Tarea 13, lo dice y se van en ese commit.
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

---

### P-038 — `docs/contraste-m3.md` quedó desalineado y ninguna tarea manda rehacerlo
- **Estado:** abierta
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

---

### P-039 — "Pedir un presupuesto por WhatsApp" tiene respaldo, pero repartido en tres filas
- **Estado:** abierta
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

---

### P-040 — El horario queda escrito dos veces en la misma banda visual de contacto
- **Estado:** abierta
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

---

### P-041 — El botón de WhatsApp de los dos menús no está en la lista de P-032
- **Estado:** abierta
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

---

### P-042 — Dos comportamientos del menú móvil que vienen de antes
- **Estado:** abierta
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

---

### P-043 — El enlace nuevo del pie no se ve como enlace
- **Estado:** abierta
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

---

### P-044 — `core.autocrlf` está en `true` y no hay `.gitattributes`
- **Estado:** abierta
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
  - **Nota de proceso:** para comparar contra `HEAD` usé `git stash`, que dejó
    el archivo en CRLF, como ya había pasado en M2c. Detectado y revertido
    antes de commitear: 2003 líneas, cero CRLF, y el diff sigue siendo solo el
    pie.
