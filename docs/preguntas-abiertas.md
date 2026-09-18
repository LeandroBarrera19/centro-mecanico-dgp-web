# Preguntas abiertas

Acá se anotan los huecos de información que aparecen durante la ejecución.
El agente escribe; Ramiro responde.

**Regla:** un hueco anotado acá **nunca** se rellena con una suposición. Si
bloquea una tarea, esa tarea queda sin hacer. Si no la bloquea, se hace lo que
se pueda y queda un `TODO_DATO` en el código.

Cómo se anota cada pregunta:

- **ID:** `P-<número>`, correlativo y nunca reutilizado.
- **Estado:** `abierta` · `respondida` · `descartada`.
- **Bloquea:** qué tarea queda parada, o `no bloquea`.
- **Qué falta:** la pregunta concreta, respondible en una línea.
- **Contexto:** archivo y línea, y qué dice hoy.
- **Qué hice mientras tanto:** nada, o el `TODO_DATO` que quedó, o la decisión
  propia que se tomó (dicha como propia).

Cuando Ramiro responde, el agente agrega **Respuesta:** debajo, cambia el
estado y ejecuta. No borra la pregunta: el historial sirve.

---

## Abiertas

(vacío)

---

## Respondidas

### P-001 — Qué cambió el commit 0501b5e en el CSS
- **Estado:** respondida
- **Bloquea:** no bloquea. Hay que resolverla antes de M2b, que toca estilos.
- **Qué falta:** el diff completo de ese commit y cuál fue la opción elegida
  para que el recuadro de Google no desbordara en pantallas de hasta 480 px.
- **Contexto:** es la única modificación de CSS de todo M2a. Se hizo durante la
  Tarea 10a. El recuadro pasó de 414 px a 350 px de ancho.
- **Qué hice mientras tanto:** nada. El cambio está commiteado y funciona.
- **Respuesta (2026-09-18):** el commit agrega dos reglas dentro del media
  query `@media (max-width: 480px)` de `public/index.html` y no toca nada más:

  ```diff
  @@ -987,6 +987,8 @@
         .footer-bottom { flex-direction: column; gap: 6px; text-align: center; }
         .contact-inner { gap: 36px; }
         .testimonials-grid { grid-template-columns: 1fr; }
  +      .google-badge { flex-wrap: wrap; justify-content: center; max-width: 100%; row-gap: 4px; }
  +      .google-count-text { flex-basis: 100%; text-align: center; }
       }
  ```

  Opción elegida: en pantallas de hasta 480 px el recuadro puede partirse en
  dos líneas. Arriba quedan el logo de Google, el 4,9 y las estrellas; abajo,
  "Más de 130 opiniones en Google", en una línea propia y centrado. El recuadro
  no puede ser más ancho que su contenedor (`max-width: 100%`). No se cambió el
  texto, ni el tamaño de letra, ni el `white-space: nowrap` del texto, ni nada
  por encima de 480 px. Las otras alternativas que se evaluaron en su momento
  no quedaron registradas.

  Medido el 2026-09-18 (ancho y alto del recuadro, y `scrollWidth` de la
  página):

  | Pantalla | Antes (`0501b5e^`) | Después (`0501b5e`, igual en HEAD) |
  |---|---|---|
  | 390 px | 414 × 47, desborda (402) | 350 × 72, sin desborde (390) |
  | 360 px | 414 × 47, desborda (387) | 320 × 72, sin desborde (360) |
  | 480 px | 414 × 47, entra (480) | 414 × 72, entra (480) |

  Dos efectos que conviene tener en cuenta en M2b:
  1. Entre unos 455 y 480 px el recuadro se parte en dos líneas aunque
     entraría en una: la regla depende del ancho de pantalla, no de si hace
     falta.
  2. A 320 px la página sigue desbordando (347), pero no por el recuadro, que
     mide 280. Desborda la fila de contadores del hero, y eso ya pasaba antes
     de M2a (ver `docs/informe-m2a.md` §7).
