# Revisión módulo interfaz · Tarea T4

- **Qué se revisó:** T4 de `docs/spec-interfaz.md`, que agrega
  `aria-hidden="true"` a los íconos decorativos y `translate="no"` a los
  nombres de marca de la franja. Sin commitear, sobre `a90557c`.
- **Fecha:** 2026-10-06.
- **Quién:** subagente `revisor` (`.claude/agents/revisor.md`).
- **Vueltas:** 1. **APROBADO CON OBSERVACIONES**, sin hallazgos bloqueantes.

---

## Hallazgo

1. **[MENOR]** P-055 decía que las estrellas tenían nombre accesible propio.
   No es así: los `svg` de las estrellas están ocultos, y el nombre lo lleva
   el contenedor (`role="img"`). La medición principal, 0 de 59 `svg`
   expuestos sin nombre, sí era correcta.
   **Corrección del ejecutor:** P-055 corregida antes del commit.

## Verificaciones del revisor

- **Solo se agregaron atributos.** Con los atributos nuevos quitados, el HTML
  es idéntico a HEAD. Se agregaron:
  - 25 `aria-hidden`: 17 en íconos de servicio, 5 en íconos de contacto y 3
    en logos de WhatsApp.
  - 16 `translate="no"`.
- **Texto visible:** igual a HEAD.
- **Encabezados:** iguales a HEAD.
- **Enlaces, botones y pestañas:** nombres iguales en el árbol de
  accesibilidad de Chromium.
- **Árbol de accesibilidad:** el único cambio es que desaparecen 11 "imagen sin
  nombre", que eran los íconos decorativos visibles.
- **Nada informativo quedó oculto:** los elementos ocultos no tienen texto,
  imágenes con texto alternativo ni elementos enfocables. Cada ícono de
  contacto tiene su etiqueta de texto al lado.
- **Estilos:** idénticos en los 42 elementos tocados. Ninguna regla CSS ni
  ningún script usa esos atributos.
- **T1, T2 y T3:** intactas.
- **Errores:** 0 de JavaScript y 0 respuestas con error.
- **Estructura:** un solo h1. El JSON-LD es válido.
- **Contenido:** ningún dato nuevo y 0 afirmaciones prohibidas.

## No verificado

- **Barrido de desborde y auditoría de contraste:** no se corrieron porque no
  hay cambios de CSS. Se reemplazaron por la comparación de estilos
  calculados contra HEAD, que dio idéntica.
