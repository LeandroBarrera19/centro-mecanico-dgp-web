# Revisión módulo interfaz · Tarea T5

- **Qué se revisó:** T5 de `docs/spec-interfaz.md`. Ningún texto visible por
  debajo de 12 px, `text-wrap: balance` en los títulos, `touch-action` y
  resaltado al tocar, y sin desborde horizontal. Sin commitear, sobre
  `884dde6`.
- **Fecha:** 2026-10-06.
- **Quién:** subagente `revisor` (`.claude/agents/revisor.md`).
- **Vueltas:** 2. Primera: **RECHAZADO**. Segunda: **APROBADO CON
  OBSERVACIONES**, sin hallazgos bloqueantes.

---

## Primera vuelta — RECHAZADO

1. **[BLOQUEANTE]** Entre 831 y 834 px, "Villa María, Córdoba" pasaba a dos
   líneas a 12 px y el bloque del logo se salía del menú. Iba de −8,6 a
   80,2 px, con el menú terminando en 73. El renglón de arriba quedaba cortado
   y "Córdoba" caía sobre la foto del inicio con 1,92:1 de contraste.
   P-055 decía "Sin cambios: el logo". El ejecutor había medido 830 y 1024 px
   y no lo que hay entre medio.
2. **[MENOR]** Un comentario CSS nuevo decía "inmediato", que está en la lista
   de afirmaciones prohibidas. No se ve en la página, pero se publica dentro
   del HTML.
3. **[MENOR]** La tarea sube cinco clases que la spec no nombra. El revisor lo
   juzga fiel a la regla del título y está declarado en P-055. Efectos
   visibles:
   - `.hero-badge` pasa a dos líneas entre 401 y 414 px.
   - La franja de marcas crece hasta 32 px en celulares.

## Correcciones del ejecutor

- **Logo:** `letter-spacing` de "Villa María, Córdoba" bajó de 0,05em a
  0,025em. A 12 px la línea mide lo mismo que medía a 0,72rem.
- **Comentario:** reescrito sin "inmediato".
- **P-055:** corregida la viñeta falsa sobre el logo.

## Segunda vuelta — APROBADO CON OBSERVACIONES

- **Hallazgos 1 y 2:** resueltos.
- **Logo:**
  - Las líneas del nombre y del lugar son iguales a HEAD en los 1601 anchos.
  - Con capturas, entre 831 y 836 px: 0 píxeles de texto cortados arriba y
    0 sobre la foto del inicio, en HEAD y en la rama.
  - El bloque sobresale 1 a 1,4 px entre 831 y 834 px, igual que en HEAD.
- **Observaciones que quedan, declaradas como decisiones propias en P-055:**
  - el cambio de `letter-spacing`;
  - las cinco clases fuera de la lista de la spec.
- **Cifra corregida en P-055:** el crecimiento del pie, que el revisor midió
  con otra caja.

**Verificaciones del revisor:**

- **Desborde:** 0 desbordes horizontales en 8516 mediciones por versión, de
  320 a 1920 px de a 1 px, en las 5 pestañas y con el menú abierto.
- **Cajas desbordadas:** 0 nuevas contra HEAD de 320 a 1920 px. Desapareció
  el desborde del menú de la primera vuelta.
- **Recortes, superposiciones y palabras partidas:** 0.
- **Textos por debajo de 12 px:** 0, contra 27 distintos en HEAD.
- **Texto visible:** igual a HEAD, en 102 estados comparados.
- **Contraste:** 381 textos, 0 por debajo del mínimo.
- **JSON-LD:** idéntico a HEAD.
- **Estructura:** un solo h1.
- **Errores:** 0.
- **T1 a T4:** intactas.

**No verificado:**

- **Contraste de `.t-date` medido por píxeles:** la herramienta no mide esa
  sección. Calculado con los colores, da 5,33:1.
- **Pantalla táctil real:** no se probó en un dispositivo.
