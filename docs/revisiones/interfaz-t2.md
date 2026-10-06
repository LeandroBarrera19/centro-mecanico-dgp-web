# Revisión módulo interfaz · Tarea T2

- **Qué se revisó:** T2 de `docs/spec-interfaz.md`, pestañas de servicios
  accesibles y enlazables. Sin commitear, en la rama `mejoras-interfaz`,
  sobre `7361f66`.
- **Fecha:** 2026-10-06.
- **Quién:** subagente `revisor` (`.claude/agents/revisor.md`).
- **Vueltas:** 3, las tres **APROBADO CON OBSERVACIONES**, sin hallazgos
  bloqueantes. Una revisión anterior se cortó por un error de red, sin
  veredicto, y se relanzó. La tercera vuelta se pidió porque la solución
  cambió de fondo, no por un rechazo.

---

## Primera vuelta

1. **[MENOR]** A 375 y 320 px, al abrir una dirección de pestaña, las filas de
   arriba de la fila de pestañas quedaban detrás del menú. El navegador
   desplazaba hasta el botón elegido, no hasta la fila.
2. **[MENOR, previo a T2]** El anillo de foco global (`#7DB919` sobre blanco)
   tiene 2,38:1, debajo del 3:1 de WCAG 1.4.11. T2 lo extiende a los paneles.
   §6 de `CLAUDE.md` se cumple, porque el foco es visible.
3. **[MENOR]** `data-tab` quedó sin uso.

## Segunda vuelta (el script desplazaba hasta la fila)

1. **[MENOR]** Al cargar la dirección directamente en modo normal, la fila
   seguía corrida. Por ejemplo, −56 px a 375 px con Repuestos, en 4 de 4
   cargas. El desplazamiento suave del navegador le ganaba al del script.
   **La viñeta "Medido" de P-055 decía lo contrario y no se reproducía.**
2. **[MENOR]** Ctrl+clic en los enlaces del pie ya no abría otra pestaña del
   navegador, porque el script hacía `preventDefault` sin mirar los
   modificadores.
3. **[MENOR]** "Adelante" a veces no dejaba la fila a la vista, y el foco
   quedaba en la pestaña anterior.

## Tercera vuelta (las direcciones apuntan a marcas vacías al principio de la fila)

- **Hallazgos 1, 2 y 3 de la segunda vuelta:** resueltos por el
  comportamiento nativo de los enlaces.
- **"Adelante":** el revisor no lo considera hallazgo. Es la restauración
  normal del desplazamiento de cada entrada del historial.
- **Queda solo el anillo de foco**, previo a T2 y registrado en P-055.

**Verificaciones del revisor:**

- **Texto visible:** igual a HEAD (6911 caracteres, 34 atributos, `<head>`).
  Las marcas `.ancla-pestana` están vacías.
- **Estructura accesible (árbol de accesibilidad de Chromium):**
  - El tablist se llama "Servicios" y tiene solo 5 hijos tab.
  - Los paneles se anuncian con el nombre de su pestaña.
  - 0 ids duplicados y 0 enlaces internos rotos.
- **Carga directa:** 80 de 80 casos, con la fila en 73 px (donde termina el
  menú) y la pestaña correcta.
- **Enlaces del pie:** 60 de 60 casos con la fila en 73 px. Un caso que falló
  en la primera pasada fue una medición tomada a mitad del desplazamiento:
  repetido, dio bien.
- **Ctrl+clic:** abre otra pestaña del navegador y no cambia la actual.
- **Enter en el pie:** fila en 73 px, y el Tab siguiente cae en la pestaña
  activa.
- **Historial:** "Atrás" y "Adelante" dejan la fila en 73 px en cada entrada
  de pestaña.
- **Teclado:** flechas circulares, Inicio y Fin, con tabindex itinerante.
  No desplaza la página ni suma entradas al historial.
- **Sin JavaScript:** la fila queda en 73 px y se ve el primer panel.
- **Desborde horizontal:** 10.560 mediciones, de 320 a 1920 px de a 1 px,
  en las 5 pestañas y con el menú móvil abierto. 0 desbordes, y las marcas
  miden 0×0.
- **Contraste:** 0 combinaciones debajo del mínimo.
- **Estructura de la página:** un solo h1. JSON-LD válido, sin
  AggregateRating ni Review.
- **Consola:** 0 errores.
- **T1:** intacta.

**No verificado:**

- **Navegadores que no son Chromium.**
- **Lectores de pantalla reales:** no se probaron. Sí se revisó el árbol de
  accesibilidad de Chromium.
- **Validadores externos de Schema.org:** sin red. El diff no toca el JSON-LD.
