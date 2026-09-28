# Revisión ronda post-M3 · Puntos 1 y 2a

- **Qué se revisó:** el punto 1 (la regla de autonomía en `CLAUDE.md`, ya
  commiteada en `0c1c58f`) y el punto 2a (tres columnas en las pestañas de
  servicios y borrado de las cuatro reglas huérfanas), sobre `0c1c58f`.
- **Fecha:** 2026-09-28.
- **Quién:** subagente `revisor` (`.claude/agents/revisor.md`).
- **Vueltas:** 2. La primera dio **RECHAZADO** con **dos bloqueantes, los dos
  de registro y atribución**; la segunda, **APROBADO CON OBSERVACIONES**.

**Lo que hay que retener de esta revisión:** los dos bloqueantes fueron por
**no cumplir la regla de autonomía que yo mismo acababa de commitear**. La
regla manda registrar cada decisión propia en `preguntas-abiertas.md` con la
etiqueta "Decisión propia" y estado "respondida", y no había ni una.

---

## Vuelta 1 — RECHAZADO

### Hallazgo 1 [BLOQUEANTE] — El comentario del CSS enumeraba mal y me atribuía a Ramiro un borrado mío

El comentario que dejé decía que caían *"las tres reglas con id que la
implementaban"*, y habían caído **cinco**, de las cuales **dos no
implementaban P-012**: la de `.tab-panel.active:where(#tab-mecanica)` y la de
`.tab-panel.active` del *media query* de 1200 px. Peor: el comentario empezaba
con "(decisión de Ramiro, 2026-09-28)", con lo cual le atribuía a él un borrado
que decidí yo.

```
$ git diff public/index.html | grep -E "^-.*#tab-"
-    #tab-repuestos.tab-panel.active {
-    .tab-panel.active:where(#tab-mecanica) {
-      #tab-repuestos.tab-panel.active { grid-template-columns: repeat(2, 1fr); }
-      #tab-repuestos.tab-panel.active { grid-template-columns: 1fr; }
```

Y agregó algo que yo no había visto: con la regla de `#tab-mecanica` se fue un
comentario de cuatro líneas que era el **único registro** de dos decisiones de
forma —que Mecánica va en 3 + 2, y por qué el `id` iba dentro de `:where()`—.
Es el mismo patrón que P-026 ya había señalado: decisiones que viven solo en
comentarios de CSS.

### Hallazgo 2 [BLOQUEANTE] — Ninguna entrada "Decisión propia", contra la regla recién commiteada

```
$ grep -rn "Decisión propia" docs/
(sin resultados)
```

Decisiones tomadas solo en esta pasada y sin registrar: el subtítulo
"**Autonomía.**" de `CLAUDE.md`, el agrupamiento de las revisiones en cuatro
pasadas, y el borrado de las reglas que Ramiro no enumeró.

### Menores de la vuelta 1

3. **La regla nueva choca con §9 y con dos viñetas de §7.** El bloque dice que
   solo se consulta por "borrado de contenido **visible**"; §9 sigue listando
   "borrar algo que la spec no menciona" como hueco, y §7 conserva "No borres
   archivos sin preguntar". *"No es teórica: es la norma que decide el hallazgo
   1"*, y es la misma con la que la revisión de P-024 emitió su bloqueante.
4. **En P-034 la resolución pisó texto** del registro anterior en vez de
   agregarse debajo, al revés de lo hecho en P-037 y de lo que pide la cabecera
   del archivo.
5. **Sobre el agrupamiento de revisiones:** agrupar vale para lo **no
   commiteado**. `0c1c58f` se commiteó **sin su informe**, contra el paso (5)
   del ciclo de §7. *"Consecuencia concreta y no hipotética: como este informe
   rechaza, la corrección del punto 1 ya no puede entrar en su commit."*
6. **[Para Ramiro] El hueco de Mecánica no desaparece.** Con tres columnas
   sigue quedando una celda vacía: 3 + 2 desde 769 px y 2 + 2 + 1 entre 481 y
   768. Idéntico a antes; el hueco que motivó el pedido era el de las **otras
   cuatro** pestañas.

---

## Qué se corrigió entre las dos vueltas

| Hallazgo | Qué se hizo |
|---|---|
| 1, bloqueante | Comentario reescrito: enumera las cinco reglas, separa las tres que implementaban P-012, remite a P-048 y conserva el motivo del `:where()` |
| 2, bloqueante | **P-046**, **P-047** y **P-048**, con la etiqueta "Decisión propia" y estado "respondida" |
| 3, menor | **P-049**, abierta, con las citas de §7 y §9 y el antecedente de P-024 |
| 4, menor | P-034: repuestas las líneas pisadas, resolución agregada debajo |
| 5, menor | Asumido como regla en P-047: agrupar solo mientras no esté commiteado |
| 6, menor | Queda visible en el comentario del CSS y en P-048 |

---

## Vuelta 2 — APROBADO CON OBSERVACIONES

Los dos bloqueantes, levantados. Verificó que las cinco reglas del comentario
son exactamente las cinco que borra el diff, que la atribución ya no es falsa,
y que las tres entradas nuevas están con su etiqueta y su estado, con los ids
correlativos y sin repetir (49 entradas, `P-001`…`P-049`, `uniq -d` sin
salida).

**Sobre el formato de las "Decisión propia", que le pregunté: sirve.** La regla
pide dos cosas literales —la etiqueta y el estado "respondida"— y las dos
están, de modo que `grep "Decisión propia"` las junta.

### Observaciones de la vuelta 2

1. **[MENOR] P-012 enumeraba cuatro de las cinco reglas y no remitía a P-048.**
   Ramiro pidió "registralo en P-012", y quien leyera solo P-012 no se enteraba
   de la de `#tab-mecanica`. → **Corregido**: P-012 enumera las cinco, dice que
   **Ramiro no enumeró ninguna** y remite a P-048.
2. **[MENOR] El comentario del CSS y P-048 no decían lo mismo.** El comentario
   daba a entender que las tres de `#tab-repuestos` sí las había enumerado
   Ramiro. → **Corregido**: el comentario dice que no enumeró ninguna de las
   cinco, que las tres primeras tenían que caer para cumplir la instrucción y
   que las dos últimas quedaron inertes.
3. **[MENOR] Mi afirmación era inexacta en la mitad:** dije que el comentario
   conservaba el motivo del `:where()`, y solo mencionaba que la regla existía.
   → **Corregido**: el motivo está ahora en el comentario, además de en P-048.
4. **[MENOR] Las tres entradas nuevas no llevan los campos que la cabecera
   prescribe** (`Bloquea`, `Qué falta`, `Contexto`). No es incumplimiento —la
   cabecera describe cómo se anota una **pregunta**, y estas no lo son— pero el
   archivo pasa a tener dos formatos.
5. **[MENOR, para Ramiro] El estado "respondida" cambia de significado.** Hasta
   hoy quería decir *Ramiro contestó*; ahora P-046, P-047 y P-048 lo llevan sin
   que él haya contestado nada. → **Agregado a P-049**, con una salida posible:
   un estado propio del estilo `decidida`.
6. **[Proceso]** La corrección del punto 1 viaja en el commit del punto 2a, así
   que "un commit por punto" deja de ser exacto para el punto 1. Es la
   consecuencia que P-047 ya deja escrita.

---

## Verificaciones corridas

### Punto 1

| Qué | Resultado |
|---|---|
| Texto del bloque, comparado programáticamente | **2 párrafos, los 2 idénticos carácter por carácter** al dictado |
| Alcance del commit | solo `CLAUDE.md`, 13 líneas agregadas, 0 borradas |
| Mensaje, con `cat -A` | una línea de asunto, **sin trailers ni firmas** |
| Ubicación | final de §7, antes del `---` de §8 |
| Contradicciones contra §1 | **ninguna** |
| Contradicciones contra §9 y dos viñetas de §7 | **sí** → P-049 |

### Punto 2a

| Qué | Resultado |
|---|---|
| Las cuatro huérfanas enumeradas | borradas, **sin ninguna referencia** en `public/` ni `tools/` |
| `.services-grid` | **nunca se usó**: barrido de **todas** las versiones del historial, cero en todas |
| Matiz sobre `.services-grid` | el nombre sí se usa en `directrices de marca/directrices-de-marca-dgp.html`, que **no** está en `public/`, define sus propias reglas y es autónomo |
| Integridad del CSS | 237 `{` / 237 `}`; `/*` y `*/` balanceados |
| El *media query* de 1200 px | no quedó vacío |
| **Grilla en 19 anchos** (con los bordes 479/480/481, 767/768/769, 1199/1200/1201) | **las cinco pestañas dan `grid-template-columns` idéntico en los 19** |
| Comparación contra `afcde6b` | confirmado que cuatro pestañas tenían tres tarjetas en grilla de cuatro, y que **Mecánica era 3 + 2 antes y sigue siendo 3 + 2** |
| Anchos reales de tarjeta | iguales dentro de cada fila en todos los anchos |
| Desborde **dentro** de cada tarjeta | 12 anchos × 5 pestañas, cada descendiente contra su tarjeta: **cero problemas** |
| **Barrido de desborde 320→1920 de a 1 px**, 5 pestañas y menú móvil | **9606 mediciones, 0 desbordes** |
| Errores de página, de consola y respuestas ≥ 400 | 0 / 0 / 0 |
| `<h1>` y jerarquía | 1, **sin saltos** |
| JSON-LD | válido, `AutoRepair`, sin `aggregateRating` ni `review` |
| `canonical`, `noopener`, `alt` | único · 11 de 11 · 3 de 3 |
| `TODO_DATO` / `TODO_IMAGEN` | 0 / 4 |
| Afirmaciones prohibidas | **una sola coincidencia**, "Desde 2022", que no es prohibida sino **obligatoria** por §1 punto 3 |
| Datos nuevos en el diff | ninguno: solo declaraciones CSS y un comentario |
| Specs que fijen columnas | **ninguna**, así que no hay spec que sincronizar |
| Fin de línea | 0 CR en los dos archivos |

### En la vuelta 2, para no repetir lo caro

| Qué | Resultado |
|---|---|
| "El CSS no cambió salvo el comentario" | **Cierto**, medido quitando todos los comentarios: 26 líneas de CSS solo en `HEAD` y **cero líneas de CSS solo en el árbol de trabajo** |
| Re-medición de la grilla | 19 anchos × 5 pestañas = **95 celdas, 0 diferencias** contra la vuelta 1 |
| Integridad del CSS con el comentario nuevo | llaves y comentarios balanceados |
| Carga y errores en 5 anchos, con las 5 pestañas y el menú móvil | 0 / 0 / 0 |

## No verificado

- **La autenticidad del dictado de Ramiro.** No hay archivo de spec para esta
  tanda: el revisor compara contra la cita del encargo, no contra un original.
- **Auditoría de contraste.** No se corrió. En su lugar verificó que el diff
  **no agrega ninguna declaración** de color, fondo, fuente, borde ni
  espaciado, así que ningún par de colores pudo moverse.
- **Renderizado visual.** Geometría y estilo computado, sin capturas.
