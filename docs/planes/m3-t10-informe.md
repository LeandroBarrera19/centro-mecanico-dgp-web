# Informe · M3, Tarea 10 — Opiniones

- **Commit de la tarea:** `4dbadd1` (incluye el informe de revisión).
- **Base:** `9fb0262`.
- **Veredicto del revisor:** vuelta 1 **RECHAZADO**, vuelta 2 **APROBADO CON
  OBSERVACIONES**. Los dos informes en `docs/revisiones/m3-t10.md`.

## 1. Qué se hizo

| Qué | Antes | Ahora |
|---|---|---|
| `h2.section-title` | Reseñas en Google | **Lo que dicen nuestros clientes** |
| `p.section-sub` | La confianza de nuestros clientes es el motor que nos impulsa a superarnos cada día. | **4,9 en Google, con más de 130 opiniones.** |
| `.testimonials-grid` | `repeat(3, 1fr)` | `repeat(2, 1fr)` |

Los dos textos salen literales de la spec, comparados carácter por carácter y
por punto de código. El párrafo que la spec manda eliminar no deja rastro en
todo el archivo.

**Lo que la spec dice que no se toca, no se tocó.** El revisor lo comprobó
comparando bloques enteros contra el commit anterior, no a ojo:

- Las cuatro reseñas: bloque `<div class="testimonials-grid">` completo,
  `identical: true`, 6740 caracteres. Eso cubre de una vez los cuatro textos,
  los cuatro nombres, las cuatro fechas, las 20 estrellas y los avatares.
- El botón a la ficha y la insignia de Google: `identical: true` los dos.

## 2. El rechazo de la vuelta 1: me pasé borrando

En la primera pasada **borré el `<span class="eyebrow-label">`** que decía
"Lo que dicen nuestros clientes", porque es exactamente el texto que la spec
le da al `<h2>` y quedaba la misma frase dos veces seguidas. Lo declaré como
decisión mía y lo anoté. El revisor lo rechazó como bloqueante y tenía razón:

- `CLAUDE.md` §9 lista textualmente "hace falta **borrar**, renombrar o mover
  algo que la spec no menciona" entre los casos de hueco, y el tratamiento de
  un hueco es anotarlo y seguir, no elegir una de las salidas.
- La Regla de textos de la propia spec de M3 dice lo mismo para el caso
  concreto: "si una frase no entra en el diseño o suena mal en su lugar, **no
  se reescribe**: se anota en `preguntas-abiertas.md` con una captura y se
  sigue".
- Y el argumento que me terminó de convencer: **en la misma P-030 yo tenía dos
  situaciones idénticas y les había dado remedios opuestos.** A la insignia de
  Google le apliqué el criterio correcto ("sacarla o cambiarla no me
  corresponde") y al rótulo el contrario.

El rótulo está repuesto, byte por byte: el `md5` de la línea vieja y el de la
nueva son el mismo, `f7f5fdb9c63e86e477df7ab47f7bc6e1`, y `git diff` la
muestra como línea de contexto, no como línea agregada.

**Consecuencia visible:** la sección hoy imprime la misma frase dos veces, el
rótulo arriba y el `<h2>` abajo. Es el estado correcto según la regla, y está
a la vista en `temporary screenshots/m3-t10-duplicado-{360,390,1440}.png`.

## 3. Huecos anotados

- **P-030**, con tres puntos, ninguno resuelto por mí:
  1. El rótulo superior repite el `<h2>`. Falta decidir si se va o qué dice.
  2. La insignia de Google muestra "4,9" y "Más de 130 opiniones en Google"
     dos renglones debajo del subtítulo nuevo, que dice lo mismo. No se tocó.
  3. Una regla de CSS que quedó inerte, anotada para que nadie se confunda en
     la Tarea 13 (ver abajo).

## 4. Una regla de CSS que quedó inerte y no se borró

Al pasar `.testimonials-grid` a dos columnas, la regla del
`@media (max-width: 900px)` quedó diciendo lo mismo que la de escritorio.
**No la borré:** limpiar lo que la tarea no toca está prohibido por §7 y un
borrado no mandado es un hueco por §9. Medido, es inerte: a 900 px las
columnas son `408px 408px` y a 901 px `408.5px 408.5px`; la diferencia es el
ancho del contenedor, no la regla. Queda anotado en P-030 porque, si no, en la
Tarea 13 alguien va a leerla y va a creer que las dos columnas de 481 a 900 px
salen de ahí.

## 5. Lo que corregí después de la vuelta 2

- **Un nombre propio en HTML que se publica.** El comentario que dejé junto al
  rótulo decía "esperando decisión de Ramiro". Ahora dice "del propietario".
  `grep -rn "Ramiro" public/` no devuelve nada. Era la primera vez que un
  nombre propio viajaba al código servido.
- **Dos citas de línea corridas un renglón** en P-030, verificadas de nuevo
  con `awk` sobre el archivo de ahora.
- **Las capturas de 360 px eran del estado rechazado**, de antes de reponer el
  rótulo. Se recapturaron los nueve archivos, con una comprobación en el DOM
  de que el rótulo está presente en los tres anchos.

## 6. Verificaciones, con su salida

| Qué | Resultado |
|---|---|
| Textos contra la spec | los 2 idénticos, por cadena y por punto de código |
| Párrafo que la spec elimina | 0 apariciones en todo el archivo |
| Las 4 reseñas contra el commit anterior | bloque idéntico, 6740 caracteres |
| Botón a la ficha e insignia | bloques idénticos |
| Grilla, medida por geometría en 16 anchos | 2×2 de 481 px para arriba; 4×1 de 480 para abajo |
| Barrido de desborde 320–1920 px, de a 1 px | 10.055 mediciones, **cero desbordes** |
| Ídem, corrido aparte por el revisor, 7 estados | **cero desbordes** |
| Contraste | 373 textos, 72 combinaciones, **0 por debajo del mínimo** |
| `docs/contraste-m3.md` reproducible | `diff` contra una corrida nueva: idénticos |
| JSON-LD | sin tocar; `AutoRepair`, sin `AggregateRating` ni `Review` |
| Encabezados | un solo `h1`, cero saltos |
| Errores de JavaScript / respuestas ≥ 400 | ninguno / ninguna |
| Nombres propios en `public/` | 0 |

Contraste de lo que toca la tarea: rótulo 7,99:1, `h2` 7,99:1 (mínimo 3 por
texto grande), subtítulo 4,92:1.

## 7. Capturas

`temporary screenshots/`, a 360, 390 y 1440 px, todas del estado final:
`m3-t10-pagina-*.png` (página completa), `m3-t10-opiniones-*.png` (la sección)
y `m3-t10-duplicado-*.png` (el encabezado, que es donde se ve la frase
repetida).
