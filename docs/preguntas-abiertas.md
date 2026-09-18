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

### P-001 — Qué cambió el commit 0501b5e en el CSS
- **Estado:** abierta
- **Bloquea:** no bloquea. Hay que resolverla antes de M2b, que toca estilos.
- **Qué falta:** el diff completo de ese commit y cuál fue la opción elegida
  para que el recuadro de Google no desbordara en pantallas de hasta 480 px.
- **Contexto:** es la única modificación de CSS de todo M2a. Se hizo durante la
  Tarea 10a. El recuadro pasó de 414 px a 350 px de ancho.
- **Qué hice mientras tanto:** nada. El cambio está commiteado y funciona.

---

## Respondidas

(vacío)
