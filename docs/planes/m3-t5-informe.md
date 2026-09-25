# Informe — M3, Tarea 5: «Cómo trabajamos»

- **Fecha:** 2026-09-25
- **Commit de la tarea:** `1e3ab33` — `Seccion como trabajamos en lugar de por que elegirnos y proceso`
- **Punto de partida:** `ecda75f`, árbol limpio
- **Archivos tocados:** `public/index.html`, `docs/contraste-m3.md` (regenerado),
  `docs/preguntas-abiertas.md`
- **Modo:** por tarea. Plan aprobado por Ramiro antes de ejecutar.

---

## 1. Lo primero, porque es lo que se pidió mirar

**El barrido de 320 a 1920 px da cero desbordes. Es la primera vez en el proyecto.**

```
Barrido 320–1920 px: 1601 anchos, 8454 mediciones.
Sin desborde en ningún ancho ni estado.
```

De a 1 px, midiendo `document.documentElement.scrollWidth` contra `innerWidth`,
sin capturas, y en cada ancho con los seis estados: las cinco pestañas de
servicios abiertas una por una y el menú móvil desplegado donde el botón se ve.
Eso es lo que da 8454 mediciones sobre 1601 anchos.

El desborde que quedaba era **P-013** (481–487 px, causado por `div.step` de
«Nuestro proceso»). Se fue con la sección. Medido además punto por punto en los
tres anchos que pedía la spec:

| Ancho | `scrollWidth` / `innerWidth` |
|---|---|
| 481 px | 481 / 481 |
| 484 px | 484 / 484 |
| 487 px | 487 / 487 |

---

## 2. Qué se borró

Las dos secciones enteras, HTML y CSS, sin dejar restos:

- **`¿Por qué elegirnos?`** (`#por-que-elegirnos`, 4 tarjetas `.why-card`).
- **`Nuestro proceso de trabajo`** (`.process`, 5 `.step` con sus SVG).

Con ellas salieron los textos que motivaban el reemplazo: las dos «Respuesta
inmediata», «Socios técnicos de empresas agropecuarias… tu operación nunca se
detenga», «Atención completamente personalizada», «experiencia comprobada»,
«un resultado sin sorpresas», «Diagnóstico transparente» y «post venta».

**CSS borrado** (los del plan, verificado uno por uno que ninguna otra sección
los use): `.why-us`, `.why-us::after`, `.why-grid`, `.why-card`,
`.why-card:hover`, `.why-num-bg`, `.why-card h3`, `.why-card p`, `.process`,
`.process::after`, `.process::before`, `.process .container`,
`.process .section-title`, `.process .section-sub`, las dos líneas sueltas de
arriba del archivo (`.process .section-title::after` y `.process .eyebrow-label`),
`.process-steps`, `.process-steps::before`, `.step`, `.step-num`,
`.step-num svg`, `.step-title`, `.step p`, más `.why-grid` y `.process-steps`
dentro de los media queries de 900, 768 y 480 px.

**Un selector más de los que decía el plan:** `.why-icon` y `.why-icon svg`.
No estaban en la lista porque ya eran CSS muerto antes de esta tarea (ninguna
tarjeta usaba el ícono; usaban `.why-num-bg`). Los borré igual, **decisión mía**,
porque el prefijo `.why-` los ata sin ambigüedad a una sección que ya no existe.
Si preferís que hubieran ido a la pasada de limpieza de la Tarea 13, con
`.badge-urgente` y `.hero h1 em`, se revierten en dos líneas.

Comprobación de que no quedó nada:

```
$ grep -rnE "por-que-elegirnos|why-|process|\.step|step-num|step-title" public/index.html
(sin una sola coincidencia)
```

---

## 3. Qué se creó

Sección `id="como-trabajamos"` (id elegido por mí: sin acentos ni ñ, CLAUDE §3),
con el `h2`, el subtítulo y los cinco `h3` + párrafo **literales de la spec**,
sin una palabra agregada. Los `h3` van sin número, como estaba dicho.

**Disposición, la que elegiste:** en escritorio, dos columnas — el hueco F-02 a
la izquierda y los cinco pasos en una sola columna a la derecha. Por debajo de
900 px, foto arriba y pasos abajo. La grilla usa `minmax(0, 1fr)` en las dos
columnas, que es lo que evita que un hijo imponga un ancho mínimo mayor que su
columna (la lección de la Tarea 6 de M2c).

**F-02 es el primer hueco de foto del sitio**, así que hubo que crear `.img-slot`
siguiendo `docs/brief-fotografico.md`: rectángulo con la proporción ya reservada
por `aspect-ratio: 3/2`, `data-slot="F-02"`, el comentario `TODO_IMAGEN: F-02`
para que el grep los encuentre a todos, y el rótulo «Foto pendiente · F-02».

Medido, el hueco mantiene la proporción exacta en todo el rango:

| Ancho | Grilla | Hueco F-02 | Proporción |
|---|---|---|---|
| 360 px | 1 columna | 320 × 213 | 1,500 |
| 390 px | 1 columna | 350 × 233 | 1,500 |
| 481 px | 1 columna | 417 × 278 | 1,500 |
| 487 px | 1 columna | 423 × 282 | 1,500 |
| 768 px | 1 columna | 704 × 469 | 1,500 |
| 900 px | 1 columna | 836 × 557 | 1,500 |
| 1440 px | 2 columnas | 546 × 364 | 1,500 |

**Capturas** en `temporary screenshots/`, con el fade-in desactivado para que no
queden zonas en blanco: `m3-t5-como-360.png`, `-390`, `-481`, `-484`, `-487`,
`-768`, `-900` y `-1440`.

---

## 4. Los enlaces: eran tres, no dos

En el plan te dije que eran dos y que «el mismo markup sirve a escritorio y
móvil». **Estaba equivocado:** el menú de escritorio (`.navbar-links`) y el
móvil (`#navMobile`) son dos bloques de markup distintos. Con el del pie, son
tres. Los tres pasaron a `#como-trabajamos` y **los tres conservan el texto
«¿Por qué elegirnos?»**, que es lo que decidiste.

Probado con clic real, no leyendo el HTML:

| Enlace | Ancho | Texto | Destino | Tras el clic |
|---|---|---|---|---|
| Menú de escritorio | 1440 px | «¿Por qué elegirnos?» | `#como-trabajamos` | hash correcto, sección arriba de todo |
| Menú móvil (desplegado) | 390 px | «¿Por qué elegirnos?» | `#como-trabajamos` | hash correcto, sección arriba de todo |
| Pie, columna «Navegación» | 1440 px | «¿Por qué elegirnos?» | `#como-trabajamos` | hash correcto, sección arriba de todo |

---

## 5. El resto de las verificaciones

**Encabezados.** Un solo `h1` en la página. 31 encabezados en total con las cinco
pestañas abiertas, **sin un solo salto de nivel**. La sección nueva aporta
`h2 Cómo trabajamos` y cinco `h3` colgando de él.

**Contraste.** `docs/contraste-m3.md` regenerado con `tools/auditar-contraste.mjs`:
331 textos, 67 combinaciones distintas, **0 que no llegan al mínimo** — seguía en
0 desde la Tarea 3 y sigue en 0. Lo que aporta la sección nueva:

| Elemento | Contraste | Mínimo exigido |
|---|---|---|
| `h2` «Cómo trabajamos» | 7,99:1 | 3,00:1 (texto grande) |
| `h3` de los cinco pasos | 8,65:1 | 4,50:1 |
| Párrafos de los pasos | 5,33:1 | 4,50:1 |
| Subtítulo de la sección | 4,92:1 | 4,50:1 |
| Rótulo «Foto pendiente · F-02» | 11,09:1 | 4,50:1 |

**Consola y red.** Sin errores ni advertencias de JS, sin respuestas ≥ 400.

**Peso.** 208.151 B a 390 px (antes de la tarea, 212.238 B), 244.833 B con DPR 3,
295.988 B a 1440 px. Seis peticiones, ninguna externa. El objetivo de CLAUDE §5
es 500 KB en móvil. `public/index.html` pasó de 83.004 a 77.961 bytes.

**Textos que tenían que desaparecer,** por grep sobre `public/index.html`:

| Frase | Quedan | Dónde |
|---|---|---|
| «personalizada» | 0 | — |
| «sin sorpresas» | 0 | — |
| «experiencia comprobada» | 0 | — |
| «no se detiene» / «nunca se detiene» | 0 | — |
| «post venta» | 0 | — |
| «respuesta inmediata» | 1 | Párrafo de contacto → **Tarea 12**, con el texto de reemplazo ya escrito en la spec |
| «agropecuari» | 2 | Lema y línea final del pie → **Tarea 12**, que los saca por nombre |

Las tres supervivientes son exactamente las que la spec asigna a la Tarea 12.
Ninguna es un resto de esta tarea.

---

## 6. Lo que quedó anotado en `docs/preguntas-abiertas.md`

- **P-013 cerrada**, con la medición del barrido copiada adentro.
- **P-018 asentada como respondida:** los enlaces conservan el rótulo viejo, y
  queda escrito que fue decisión tuya, tomada sabiendo que rótulo y destino no
  coinciden. Anoté también que eran tres y no dos.
- **P-019 abierta** — el remate diagonal (ver §7).
- **P-020 abierta** — el aire debajo del hueco F-02 (ver §7).

---

## 7. Dos cosas que decidí yo y conviene que mires

**7.1 — Dejé el remate diagonal, contra lo que yo mismo había escrito en el plan.**
En el plan dije que se perdía el remate de `.why-us::after` porque «se queda sin
a qué empalmar». Al ir a borrarlo vi que la premisa era falsa: todas las
secciones de la página encadenan diagonales pintadas del color de la sección
siguiente, y debajo de «Cómo trabajamos» está Servicios, que es blanco —
exactamente lo que empalmaba `.process::after`. Sin diagonal, esta sería la
única transición recta de la página. Puse `.how-we-work::after` con la geometría
que ya tenía `.why-us::after` y el color `--blanco`. Se ve al pie de las
capturas. **Si lo querés recto, se borra la regla y no toca nada más.**

**7.2 — El hueco F-02 deja bastante aire, y con el rectángulo gris se nota más.**
A 1440 px el hueco mide 364 px de alto y la columna de pasos 860, así que quedan
unos 500 px de fondo vacío debajo de la foto. Entre 481 y 900 px, donde ya hay
una sola columna, el hueco va a ancho completo y llega a 469 px de alto a 768 px:
se come casi una pantalla antes del primer paso. **Lo dejé como está**, porque es
lo que dicta la disposición que aprobaste y porque el rectángulo gris exagera el
efecto — con la foto de F-02 adentro, esos 364 y 469 px son foto, no vacío. Si
igual molesta, las tres salidas son de una línea: `align-items: center` en
`.how-grid`, un `max-width` en `.img-slot` por debajo de 900 px, o `position:
sticky` en la foto. No elegí ninguna por mi cuenta.

---

## 8. Nada de esto se hizo y conviene tenerlo presente

- **`docs/brief-fotografico.md` no se tocó.** La ficha de F-02 sigue diciendo
  «Dónde va: sección de servicios o del proceso, según cómo quede M3», que ya
  quedó definido, y la tabla de estado sigue marcando F-02 como pendiente, que
  es correcto. No edité el brief porque la tarea no lo pedía. Si querés que la
  ficha diga «sección Cómo trabajamos», es un commit de `docs/` aparte.
- **El sitio sigue con un hueco visible**, que es lo correcto hasta M5 pero no se
  publica así. F-02 es prioridad 1 en el brief.
- **P-007 sigue bloqueando M5** (la foto del hero con patente y cara legibles).
  No la toca esta tarea.
- La **Libreta digital del vehículo** sigue fuera de la página desde la Tarea 4.
  Vuelve en la Tarea 6.
- Las anclas siguen sin `scroll-margin-top` bajo la barra sticky. Se nota poco
  porque la sección queda arriba de todo, pero está pendiente desde M2c.

---

## 9. Cómo reproducir las verificaciones

Scripts en el scratchpad de la sesión `1c47b668`:

| Script | Qué hace |
|---|---|
| `barrido.mjs 320 1920` | El barrido de a 1 px, cinco pestañas y menú móvil (~50 s) |
| `zona-como.mjs` | Capturas de la sección y geometría del hueco en ocho anchos |
| `enlaces.mjs` | Clic real en los tres enlaces |
| `encabezados.mjs` | Jerarquía de encabezados, consola y respuestas ≥ 400 |
| `con-servidor.sh <cmd>` | Levanta `tools/serve.mjs` en :3000, corre el comando y apaga |

Contraste: `node tools/auditar-contraste.mjs docs/contraste-m3.md`.
Peso: `node tools/medir-rendimiento.mjs`.
