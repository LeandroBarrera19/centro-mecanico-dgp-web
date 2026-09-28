# Informe · M3, Tarea 12 — Contacto y pie

- **Commit de la tarea:** `e03ed84` (incluye el informe de revisión).
- **Base:** `c076267`.
- **Veredicto del revisor:** vuelta 1 **RECHAZADO** (tres bloqueantes), vuelta
  2 **APROBADO CON OBSERVACIONES**. Los dos informes en
  `docs/revisiones/m3-t12.md`.
- **Estado de la tarea: hecha salvo dos puntos parkeados**, P-031 y P-032.
  Los dos esperan texto de Ramiro.

## 1. Lo que se hizo

**Contacto:**

| Punto de la spec | Qué se hizo |
|---|---|
| Botón `Pedir turno por WhatsApp`, en azul | Decía "Escribinos por WhatsApp". Ya era azul `#124B8F` (§19) |
| Teléfono `+54 9 353 459-3187` | Ya estaba exacto, no se tocó |
| Horario `Lunes a viernes de 8:00 a 17:30` | Decía "Lunes a Viernes · 08:00 – 17:30hs" |
| Dirección | Ya estaba exacta, no se tocó |
| Formas de pago | Fila nueva, no existía |
| Redes como enlaces reales | La fila de Instagram era texto plano; ahora son tres enlaces a las URLs de §5, con `target="_blank"` y `rel="noopener"` |
| El mapa, como está | El `<iframe>` no aparece en el diff |
| Hueco F-07 junto al mapa | Puesto, en 16:9 exacto |

**Pie:** lema nuevo; fuera la frase del posicionamiento anterior del pie de
página; el enlace "Casa de Repuestos" de la columna Servicios ahora apunta a
`#casa-de-repuestos`.

`grep -rni "socio estrat\|especialistas en flotas\|agro"` sobre `public/`:
**cero apariciones**, comentarios incluidos.

## 2. Los dos puntos parkeados

**P-031 — el párrafo de contacto.** La spec dice: *donde hoy dice "Respuesta
inmediata", reemplazar por "Respondemos de lunes a viernes de 8:00 a 17:30."*
Esa frase con mayúscula ya no existe, la borró la Tarea 5. Verificado con
`git log --oneline --follow -G 'Respuesta inmediata' -- public/index.html`.

**Pero el punto no quedó sin objeto, y eso lo corrigió el revisor:** aquellas
frases hablaban de stock y de reparación, mientras que el punto de la spec
está escrito dentro de "Contacto" y justificado con "fuera del horario no se
atiende", que describe la afirmación de **respuesta** que sigue viva. Mi
primera redacción de P-031 daba a entender lo contrario.

Lo que queda hoy tiene **dos** afirmaciones sobre cuánto se tarda en
responder, no una, y la spec no dice qué pasa con el resto de la oración. Las
tres formas de aplicarla rompen la gramática o borran texto que la spec no
menciona. **El texto lo escribe Ramiro.** Quedó el marcador `TODO_DATO` en el
código y la captura que exige la Regla de textos.

**P-032 — los enlaces del pie.** "Los enlaces del pie apuntan a las secciones
nuevas" no dice cuáles ni con qué rótulo. De las cuatro secciones nuevas solo
`#casa-de-repuestos` quedó enlazada, que es lo único derivable sin elegir
contenido. Ningún ancla del sitio está rota.

## 3. Lo que el revisor me hizo corregir

La Tarea 12 fue la que más correcciones necesitó del módulo. Vale la pena
dejarlas listadas, porque tres son errores míos de criterio, no de tipeo:

1. **Faltaba el `TODO_DATO`.** §9 no pide solo anotar el hueco en
   `preguntas-abiertas.md`: pide dejar el marcador en el código donde iría el
   dato. `grep TODO_DATO public/` daba cero.
2. **Faltaba la captura** que la Regla de textos de la spec exige
   explícitamente para el caso de una frase que no encaja.
3. **Mi argumento sobre "la frase ya no existe" era correcto en lo formal y
   falso en lo sustantivo**, y así estaba escrito en una pregunta que va a
   sobrevivir a esta conversación.
4. **El comentario que dejé en el código usaba dos veces la palabra
   "rapidez"**, que está en la lista de afirmaciones prohibidas de §18b. El
   `grep` que pide la Tarea 13 lo habría marcado. Es la segunda vez en esta
   tarea que un comentario mío publica lo que la tarea venía a sacar: la
   primera fue transcribir la frase del posicionamiento anterior, que corregí
   yo antes de la revisión.
5. **Ocho referencias de línea desactualizadas** en cinco preguntas, cuatro de
   ellas apuntando a otra cosa. Esta vez las saqué todas con un `awk` sobre el
   archivo en vez de a mano.
6. **Una declaración de CSS sin efecto** (`.contact-redes { font-weight: 700 }`,
   que perdía contra `.contact-item strong`). Borrada; era una regla que había
   agregado yo en esta misma tarea.

## 4. Huecos anotados

- **P-031** y **P-032**, los dos puntos parkeados.
- **P-033** — cómo quedaron las tres redes: una sola fila rotulada "Redes", el
  texto visible de cada enlace y el ícono neutro. Tres decisiones mías.
- **P-034** — cuatro cosas más: la línea suelta del pie, que hace que "Villa
  María, Córdoba" aparezca **cuatro veces** ahí; las cuatro diferencias del
  hueco F-07 respecto de los otros tres; el rótulo "Formas de pago"; y la
  columna Contacto del pie, que quedó con el horario en otro formato y con
  Instagram sin enlazar.
- **P-027** se actualizó con su línea nueva. El revisor la había marcado como
  hueco no anotado y se lo devolví: estaba desde la Tarea 8. Lo aceptó.
- **P-028** se actualizó: hoy el `<main>` tiene diez hijos y no nueve.

## 5. Verificaciones, con su salida

| Qué | Resultado |
|---|---|
| Los 6 literales de la spec presentes | los 6 exactos, comparados por script |
| `Respondemos de lunes a viernes de 8:00 a 17:30.` | 0 apariciones (P-031) |
| Datos contra `datos-verificados.md` | teléfono §2, dirección §2, horario §3, pagos §8, las 3 URLs §5 |
| Afirmaciones prohibidas en `public/` | cero, comentarios y formas codificadas incluidas |
| Barrido de desborde 320–1920 px, de a 1 px | 10.055 mediciones, **cero desbordes** |
| Ídem, corrido aparte por el revisor | 11.207 y 9.606 mediciones, **cero desbordes** |
| Contraste | 387 textos, 74 combinaciones, **0 por debajo del mínimo** |
| `docs/contraste-m3.md` reproducible | `diff` byte por byte contra una corrida nueva: idénticos |
| Encabezados | un solo `h1`, **cero saltos** |
| JSON-LD | sin tocar; `AutoRepair`, sin `AggregateRating` ni `Review` |
| `target="_blank"` sin `rel="noopener"` | ninguno, en los 10 del documento |
| Anclas rotas | ninguna |
| Foco de teclado en los 3 enlaces de redes | alcanzables, contorno visible de 3 px |
| Hueco F-07 | 16:9 exacto en 4 anchos; junto al mapa en escritorio, debajo en móvil |
| `TODO_DATO` en `public/` | uno, el de P-031, con su entrada en `preguntas-abiertas.md` |
| Errores de JavaScript / respuestas ≥ 400 | ninguno / ninguna |

## 6. Capturas

`temporary screenshots/`, a 360, 390 y 1440 px, **todas recapturadas del
estado final**: `m3-t12-pagina-*.png` (página completa),
`m3-t12-contacto-*.png` (la sección), `m3-t12-pie-*.png` (el pie) y
`m3-t12-p031-*.png` (el párrafo parkeado, que es la captura que exige la
Regla de textos).

**Aviso sobre las capturas:** el mapa sale en blanco porque el navegador de
las mediciones no tiene salida a internet. El `<iframe>` está y su caja mide
534x260 a 1440 px.
