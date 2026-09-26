# Informe · M3, Tarea 9 — Marcas

- **Commit:** `9bebc23`. Solo `docs/`: la spec dice "Sin commit si no hubo
  cambios" y **no hubo ningún cambio en `public/`**.
- **Base:** `4e57a86`.
- **Veredicto del revisor:** vuelta 1 **RECHAZADO**, vuelta 2 **APROBADO CON
  OBSERVACIONES**. Los dos informes completos en `docs/revisiones/m3-t9.md`.

## 1. Qué pide la Tarea 9 y qué se hizo

La Tarea 9 no pide cambios de contenido: "Sin cambios de contenido respecto de
M2a… Solo verificar que quedó bien ubicada en el orden nuevo (ver Tarea 13)".
O sea que su único entregable es una verificación.

**No se tocó nada.** `public/` es bit por bit el de `b83e51f`, probado por
hash de árbol: `git rev-parse b83e51f:public HEAD:public` devuelve
`adff67ff2fd8d3f90641347cdd80ef52679ea6e7` en los dos.

## 2. Resultado de la verificación

**El contenido: bien.** Lo verificó el revisor, no yo: aisló el bloque de
marcado de la tira en `9bc7562` (cierre de M2a) y en el árbol actual,
normalizó el único cambio autorizado —los 14 `aria-hidden="true"` que pide la
Tarea 1— y dio idéntico, con el mismo sha1
`6f60f91f40744d56b68ffe56e639fd8b3adeebe0` en las dos versiones. Del CSS solo
cambiaron cuatro opacidades, todas autorizadas por la Tarea 1. Chevrolet sigue
fuera del foco y ninguna marca de lujo o deportiva quedó listada como
especialidad, que es lo que prohíbe `datos-verificados.md` §10.

**La ubicación: mal, y no es de esta tarea arreglarlo.** Los nueve hijos del
`<main>` en orden son `inicio`, `brands-strip`, `como-trabajamos`,
`libreta-digital`, `casa-de-repuestos`, `flotas`, `servicios`, `resenas`,
`contacto`. Marcas está en la posición 2 de 9 y el orden final de la Tarea 13
la pone en la 7. Servicios también está fuera de lugar, lo que confirma que el
reordenamiento es una sola operación de la Tarea 13.

**Conclusión: la Tarea 9 no está cerrada.** Queda abierta hasta la Tarea 13,
registrado en **P-028**.

## 3. El rechazo de la vuelta 1, y por qué tenía razón

Yo había dado la tarea por hecha dejando el rastro de esa imposibilidad solo
en un comentario de CSS. Es exactamente lo que prohíbe `CLAUDE.md` §9 ("nunca
declares hecha una tarea que tiene un hueco sin resolver"), y era la segunda
tarea seguida con el mismo defecto: en la Tarea 8 ya había pasado y de ahí
salió P-026.

## 4. Un error mío, de otro tipo

Al invocar al revisor le pasé como premisa que "el único commit que tocó la
tira es `e3b8618`, la reestructura de carpetas". **Es falso y no lo había
comprobado con ningún comando.** El revisor lo desmintió y lo verifiqué
después:

```
$ git log --oneline --follow -G 'brands-strip|brand-name|brands-intro|brand-sep' -- public/index.html
bc566b6  Botones en azul corporativo y contraste minimo            (M3, Tarea 1)
2123134  Marcas foco sin Chevrolet y service por marca sin el agro (M2a)
50a83b8  Nombre canonico de la empresa en todas las apariciones    (M2a)
42bf0d5  Estado inicial del sitio antes de la reestructuracion
```

`e3b8618` no aparece: movió el archivo de lugar sin cambiar una línea de la
tira. Es la segunda vez en el proyecto que afirmo un hecho del código sin
correr el comando que lo prueba, y esta vez además contaminé el insumo de
quien me audita. La conclusión de fondo se sostiene, pero por la verificación
del revisor, no por la mía.

## 5. Huecos anotados

- **P-028** — la verificación de ubicación falla hoy y se cierra con la Tarea
  13. Incluye dos cosas que la Tarea 13 se va a encontrar: la tira es un
  `<div>` sin `id` ni encabezado, así que ninguna ancla puede apuntarle, y el
  menú no tiene entrada "Marcas".
- **P-029** — las 13 marcas de "También atendemos", incluida PORSCHE, no están
  enumeradas en `datos-verificados.md`: §10 solo dice "Todas". No viola la
  prohibición de §10, que es no listarlas *como especialidad*, pero el listado
  concreto descansa entero en ese "Todas".

## 6. Capturas

**No se tomaron**, y queda declarado en P-028. El encabezado de la spec las
pide en cada tarea, pero con `public/` idéntico a `b83e51f` serían las mismas
que las de la Tarea 8. **Decisión mía.**

## 7. Verificaciones, con su salida

| Qué | Resultado |
|---|---|
| `public/` sin cambios | hash de árbol `adff67ff…` idéntico a `b83e51f` |
| Contenido de la tira contra el cierre de M2a | idéntico; sha1 `6f60f91f…` en las dos versiones |
| CSS de la tira desde M2a | cuatro opacidades, todas autorizadas por la Tarea 1 |
| Contraste de la tira (1440, 390, 320 px) | fila 1 y "Especialistas en" 7,99:1; fila 2 y "También atendemos" 4,57:1; los 14 separadores exentos con `aria-hidden` |
| Desborde de la tira, 320–1920 px de a 1 px | 1.601 mediciones, **cero desbordes** |
| Errores de JavaScript y respuestas ≥ 400 | ninguno / ninguna |
| Un solo `<h1>` y jerarquía sin saltos | sí |
| JSON-LD | sin tocar; `AutoRepair`, sin `AggregateRating` ni `Review` |
| Chevrolet fuera del foco | sí, solo en "También atendemos" |
| Orden del `<main>` | Marcas en la posición 2 de 9; debería ser la 7 |

El barrido completo de la página y la auditoría de contraste no se repitieron:
`public/` no cambió desde `b83e51f`, donde ya se corrieron (10.055 y 9.309
mediciones, cero desbordes; 373 textos, 0 por debajo del mínimo).
