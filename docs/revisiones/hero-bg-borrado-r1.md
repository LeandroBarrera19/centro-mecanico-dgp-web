# Revisión: respuestas de Ramiro a P-078 y borrado de los hero-bg-*

**Veredicto: APROBADO CON OBSERVACIONES**

Sin bloqueantes.

## Hallazgos
1. [MENOR] En P-007 el campo "Bloquea" seguía diciendo M5 aunque la pregunta
   está respondida. → Corregido: se agregó "Ya no bloquea desde el
   2026-10-12 (ver la respuesta)", sin borrar el texto anterior.
2. [MENOR] Comentario HTML del hero en `public/index.html:141` decía
   "reemplazar por el original", desactualizado por la respuesta 3
   ("dejalas así"). → Corregido: ahora dice que Ramiro decidió publicar la
   copia (P-078).

## Verificaciones corridas por el revisor
- Los 7 `public/assets/hero-bg-*` borrados; ninguna página, CSS ni JS los
  referencia (solo queda la clase `.hero-bg`).
- Puppeteer en index, flotas y repuestos a 375 y 1440 px, con scroll y
  diferidas forzadas: ninguna respuesta ≥ 400, ningún error de JS, 0 pedidos
  a `hero-bg-*`.
- `node --check tools/optimizar-imagenes.mjs`: OK.
- Mapeo de las cinco respuestas con los puntos de P-078: correcto. El punto 5
  (textos alternativos) queda abierto.
- Formato de `docs/preguntas-abiertas.md`: separadores coherentes, P-007 al
  final de Respondidas con su historial completo.
- CLAUDE.md §2, §7 y §9: sin datos nuevos, borrado autorizado, sin
  marcadores borrados.

No corrió desborde ni contraste: la tarea no cambia HTML visible, CSS ni JS.
