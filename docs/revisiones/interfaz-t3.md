# Revisión módulo interfaz · Tarea T3

- **Qué se revisó:** T3 de `docs/spec-interfaz.md`, el menú móvil: botón de
  44 × 44 px sin mover las rayas, y Escape cierra el menú. Sin commitear, sobre
  `02165d8`.
- **Fecha:** 2026-10-06.
- **Quién:** subagente `revisor` (`.claude/agents/revisor.md`).
- **Vueltas:** 1. **APROBADO CON OBSERVACIONES**, sin hallazgos bloqueantes.

---

## Hallazgo

1. **[MENOR]** P-055 decía que el texto del logo seguía "en las mismas líneas"
   entre 320 y 332 px. **A 332 px es falso:** el nombre pasa de dos líneas a
   tres. A 333 px las dos versiones vuelven a coincidir, y el texto no se
   recorta en ningún ancho.
   - **Corrección del ejecutor:** P-055 corregida con la medición del revisor
     antes del commit. El comportamiento se deja como está.

## Verificaciones del revisor

- **Botón:** 44,00 × 44,00 px en cada ancho de 320 a 830, de a 1 px.
- **Rayas:** posición y tamaño idénticos a HEAD de 320 a 900 px, de a 1 px.
  Desviación máxima de 0 px.
- **Botón y logo:** no se superponen ni se salen de la ventana.
- **Texto visible y atributos accesibles** (aria-label, alt, title): iguales a
  HEAD en 4 anchos.
- **Desborde horizontal:** 10.560 mediciones, de 320 a 1920 px, en las 5
  pestañas. Con el menú abierto fueron 2.555 de esas mediciones, y en las
  2.555 el menú abrió. 0 desbordes.
- **Escape:**
  - Con el foco en el botón, en el menú o en la página, cierra el menú,
    actualiza `aria-expanded` y `aria-label`, y devuelve el foco al botón.
  - Con el menú cerrado no hace nada.
- **T1 y T2:** intactas.
- **Estructura:** un solo h1, sin saltos de nivel.
- **JSON-LD:** válido, sin AggregateRating ni Review.
- **Errores:** 0 errores de página y de consola, y 0 respuestas con error.
- **Contenido:** 0 afirmaciones prohibidas, ningún dato nuevo y ninguna imagen
  nueva.

## No verificado

- **Contraste:** no se corrió, porque el diff no toca colores ni texto.
- **Validadores externos del JSON-LD:** no se corrieron; T3 no toca el
  JSON-LD.
