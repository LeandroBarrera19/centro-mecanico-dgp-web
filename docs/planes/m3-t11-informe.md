# Informe · M3, Tarea 11 — Zona de cobertura

- **Commit de la tarea:** `e1b8fd5` (incluye el informe de revisión).
- **Base:** `0f1c937`.
- **Veredicto del revisor:** APROBADO CON OBSERVACIONES, vuelta 1 de 2.
  Informe completo en `docs/revisiones/m3-t11.md`.

## 1. Qué se hizo

Sección nueva `#zona-de-cobertura`, entre Opiniones y Contacto, con lo único
que la spec pide: un `<h2>` y un párrafo.

| Elemento | Texto |
|---|---|
| `h2.section-title` | Clientes de toda la región |
| `p.coverage-text` | Atendemos vehículos de Villa María y de más de 40 localidades en un radio de 80 km. Entre ellas: Arroyo Cabral, Bell Ville, Ticino, Idiazábal, James Craik, Pozo del Molle, Tío Pujio, Etruria, Ballesteros y Cintra. |

Los dos idénticos a la spec, comparados por punto de código: 26 y 26
caracteres el título, 213 y 213 el párrafo. El diff de `public/index.html` es
**puro agregado**: 37 líneas insertadas, cero borradas.

## 2. Los datos, que en esta tarea eran lo delicado

La spec cierra con dos prohibiciones: "Ninguna otra localidad" y "'Córdoba' no
se nombra". Las dos verificadas, y el revisor las volvió a verificar por su
cuenta:

- Las **10 localidades** del párrafo son exactamente las 10 de la tabla de
  `datos-verificados.md` §11, **en el mismo orden**, que es lo que esa sección
  exige textualmente ("Son las que se nombran en el sitio, en este orden").
  Ninguna de más, ninguna de menos, ninguna fuera de orden.
- **"Córdoba" no aparece en la sección nueva.** Aparece 10 veces en la página,
  todas anteriores a esta tarea y fuera de `#zona-de-cobertura`. §11 dice que
  Córdoba figura en el sistema con 12 clientes pero está fuera del radio de
  80 km y no se nombra.
- **"radio de 80 km"** → §11, primera línea.
- **"más de 40 localidades"** → la lista de §11 tiene 43 entradas; 42 sin
  contar Villa María, que el párrafo nombra aparte. El revisor señaló además
  que "Palestina" y "La Palestina" figuran con la misma distancia (27,2 km):
  si fueran la misma, serían 41. **En las tres formas de contar, "más de 40"
  se sostiene**, y la más lejana, Las Varillas, está a 78,3 km. El margen es
  fino y queda asentado por si alguna vez se depura ese duplicado.

## 3. Decisiones mías

1. **El `id="zona-de-cobertura"`.** La spec no lo dicta y de él van a depender
   los enlaces del pie (Tarea 12) y el menú (Tarea 13). Lo elegí yo, con el
   mismo criterio que `id="como-trabajamos"` en la Tarea 5: minúsculas, sin
   acentos y sin ñ, como manda `CLAUDE.md` §3.
2. **El párrafo centrado con `max-width: 760px`.** Forma, no contenido.

## 4. La cadena de diagonales, por tercera vez

La sección entró entre Opiniones y Contacto, así que `.testimonials::after`
pasó de `--azul` a `--blanco` y la sección nueva estrenó el suyo en `--azul`.
Es CSS de otra tarea, como en la Tarea 7. El revisor lo marcó y tiene razón en
que faltaba el registro: quedó como **actualización fechada de P-025**, no
como pregunta nueva.

Ahí también corregí un inventario que había dejado mal: P-025 decía que en la
Tarea 13 "hay que repintar al menos dos remates". **No son dos: hay que
recalcular la cadena entera**, porque en el orden final Servicios sube al
segundo lugar y Marcas entra en el séptimo.

Cadena completa hoy, medida con estilo computado:

`como-trabajamos` gris → blanco → `libreta-digital` blanco → gris →
`casa-de-repuestos` gris → blanco → `flotas` blanco (sin remate, blanco sobre
blanco) → `servicios` blanco → gris → `resenas` gris → blanco →
`zona-de-cobertura` blanco → azul → `contacto` azul.

## 5. Huecos

**Esta tarea no abrió ninguno.** La spec da los dos textos completos y todos
los datos están en §11. Lo único que se agregó a `preguntas-abiertas.md` es la
actualización de P-025.

## 6. Verificaciones, con su salida

| Qué | Resultado |
|---|---|
| Textos contra la spec | los 2 idénticos, por punto de código, los dos en NFC |
| Las 10 localidades contra §11 | mismas 10, mismo orden |
| "Córdoba" en la sección nueva | 0 apariciones |
| Barrido de desborde 320–1920 px, de a 1 px | 10.055 mediciones, **cero desbordes** |
| Ídem, corrido aparte por el revisor | 9.606 mediciones, **cero desbordes** |
| Texto recortado en la sección, en 9 anchos | ninguno |
| Contraste | 377 textos, 73 combinaciones, **0 por debajo del mínimo** |
| `docs/contraste-m3.md` reproducible | `diff` contra una corrida nueva: idénticos |
| Encabezados | 36, un solo `h1`, **ningún salto** |
| JSON-LD | sin tocar; `AutoRepair`, sin `AggregateRating` ni `Review` |
| Cadena de diagonales | cierra de punta a punta |
| Errores de JavaScript / respuestas ≥ 400 | ninguno / ninguna |
| Ubicación | único punto de inserción compatible con el orden de la Tarea 13 |

Contraste de lo que aporta la sección: `h2` 8,65:1 (mínimo 3 por texto
grande), párrafo 5,33:1 (mínimo 4,5).

## 7. Capturas

`temporary screenshots/`, a 360, 390 y 1440 px: `m3-t11-pagina-*.png` (página
completa) y `m3-t11-cobertura-*.png` (la sección recortada).
