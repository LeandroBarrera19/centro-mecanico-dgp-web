# Informe · M3, Tarea 6 — Libreta digital del vehículo

- **Commit de la tarea:** `5535491` (incluye el informe de revisión).
- **Base:** `18d06a4`.
- **Modo:** módulo completo con ciclo de revisor (`CLAUDE.md` §7,
  `docs/spec-m3-home.md`, encabezado).
- **Veredicto del revisor:** APROBADO CON OBSERVACIONES, vuelta 1 de 2.
  Informe completo en `docs/revisiones/m3-t6.md`.

## 1. Qué se hizo

Sección nueva `#libreta-digital`, insertada a continuación de "Cómo
trabajamos", que es donde la manda la spec. En el DOM,
`previousElementSibling` de la sección es `#como-trabajamos`.

Contenido, todo textual de la spec:

| Elemento | Texto |
|---|---|
| `h2.section-title` | Libreta digital del vehículo |
| `p.section-sub` | El historial de reparaciones de tu vehículo, siempre en tu celular. |
| `p.notebook-lead` | Cada vehículo que atendemos lleva un código QR pegado. Lo escaneás con el celular y se abre la libreta, sin instalar nada. La tienen todos nuestros clientes, particulares y empresas. |
| `h3.notebook-list-title` | Qué guarda |
| `ul.notebook-list` | La fecha de cada visita · El kilometraje · Los trabajos realizados · Las observaciones del técnico · El recordatorio del próximo service |

Más el hueco `TODO_IMAGEN: F-03`, con el markup exacto del brief, y el ícono
de código QR.

El HTML creció 107 líneas y no borró ninguna: `git diff --numstat` da
`107 0 public/index.html`.

## 2. Decisiones mías

Ninguna de estas la decidió Ramiro. Las tomé yo y quedan anotadas.

1. **El ícono de QR, ante una instrucción que no se podía cumplir (P-022).**
   La spec pide "reemplazar el dibujo de tarjeta de crédito". Ese dibujo
   (`<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>`)
   era el ícono de la tarjeta "Libreta digital del vehículo" de Servicios, y la
   Tarea 4 ya lo había borrado en el commit `71f1d4f`. Cumplí el fondo del
   pedido: puse el ícono de QR que la spec nombra, con el trazo de
   `.service-icon`. Elegí QR y no documento porque el párrafo habla del QR
   pegado en el vehículo.
2. **Disposición espejada.** Texto a la izquierda y foto a la derecha, al revés
   que "Cómo trabajamos", para que dos secciones seguidas no repitan la misma
   composición.
3. **Fondo blanco y sin remate diagonal propio.** Así la diagonal de "Cómo
   trabajamos", que Ramiro dejó en `--blanco` al responder P-019, sigue
   empalmando con la sección de abajo. Una diagonal blanca de la libreta sobre
   Servicios, que también es blanco, no se vería. La cadena entera se revisa en
   la Tarea 13, que fija el orden final.
4. **La tilde de la lista, dibujada con bordes CSS y no con un glifo.** Los
   subconjuntos de fuente que servimos no cubren U+2713 (es lo mismo que pasó
   con las estrellas en P-005). Color `--verde-dark`, 3,97:1 contra blanco.
5. **Sin enlaces de menú a la sección nueva.** La Tarea 6 no los pide; el menú
   lo rehace la Tarea 13. El `id` ya está puesto para entonces.

## 3. Huecos anotados

- **P-022** — el dibujo de tarjeta de crédito que la spec manda reemplazar ya
  no existe. Espera confirmación de que el ícono de QR es lo que se pedía.
- **P-023** — `datos-verificados.md` §14 prescribe al pie de la letra la
  descripción de la libreta y la spec usa otras palabras. No hay ningún dato
  distinto, solo redacción, y la de la spec respeta el voseo que §18 exige,
  cosa que la de §14 no hace. Falta decidir si §14 fija la frase o los hechos.
  Lo levantó el revisor; a mí se me había pasado.

Ninguno de los dos bloquea el resto del módulo, y ninguno dejó `TODO_DATO` en
el código porque en ninguno falta un dato: falta una confirmación.

## 4. Qué se corrigió después de la revisión

- **El ícono estaba mal dibujado.** El revisor detectó que el subpath
  `M19 19h2v2h-2` quedaba abierto y que a 44 px el cuadrante inferior derecho
  se leía como un borrón. Rehíce el trazado a `M14 15h3M18 19h3M14 21h3`: tres
  trazos rectos, ningún cuadrado abierto. Lo rendericé a 44 y a 150 px con el
  CSS exacto de `.notebook-icon svg` para confirmarlo.
- **La redacción de P-022** decía "la Tarea 6 quedó hecha" mientras el hueco
  seguía abierto, contra §9 punto 4. Reescrita.
- **P-023** no existía. La abrí a partir del hallazgo 2 del revisor.

## 5. Verificaciones, con su salida

Todas después de la corrección del ícono.

| Qué | Resultado |
|---|---|
| Textos contra la spec, carácter por carácter | 9 de 9 idénticos, comparados por código y con volcado de diferencias |
| Barrido de desborde 320–1920 px, de a 1 px, 5 pestañas + menú móvil | 1601 anchos, 10.055 mediciones, **cero desbordes** |
| Barrido repetido tras cambiar el ícono | 9.606 mediciones, **cero desbordes** |
| Errores de JavaScript y consola | ninguno |
| Respuestas ≥ 400 | ninguna |
| Contraste (`tools/auditar-contraste.mjs` → `docs/contraste-m3.md`) | 351 textos, 68 combinaciones, **0 no llegan al mínimo** |
| Encabezados, con las 5 pestañas abiertas | 33, **un solo h1**, **ningún salto de nivel** |
| JSON-LD | 1 bloque, `JSON.parse` OK, `AutoRepair`, sin `AggregateRating` ni `Review` |
| Proporción del hueco F-03 | 1.500 exacto en los 10 anchos medidos (320 a 1920) |
| Texto recortado (`scrollWidth > clientWidth`) en la sección | ninguno, en los 10 anchos |
| Caja del ícono | 44x44 con SVG de 22x22 y `aria-hidden="true"` |
| Peso a 390 px | 212.414 B (antes de la tarea: 208.151 B). Objetivo: menos de 500 KB |

Aportes de la sección al contraste: h2 8,65:1 (mínimo 3,00), "Qué guarda"
8,65:1, bajada 5,33:1, párrafo 5,33:1, ítems de la lista 5,33:1, rótulo del
hueco 11,09:1 (los demás, mínimo 4,50).

## 6. Capturas

`temporary screenshots/`, a 360, 390 y 1440 px: `m3-t6-pagina-*.png` (página
completa) y `m3-t6-libreta-*.png` (la sección recortada de esa misma captura).

**Una advertencia sobre el método.** En una primera tanda, hecha con captura
por elemento, aparecía el enlace "Saltar al contenido" encima del título a
360 px. No era real: medido en el DOM, el enlace está en `top: -89px` y sin
foco a 360, 390 y 1440 px. Era un artefacto de capturar un elemento que exige
desplazamiento habiendo elementos `position: fixed`. Las capturas se rehicieron
desde la página completa. Queda como recordatorio de que una captura no alcanza
para declarar un defecto ni para descartarlo.
