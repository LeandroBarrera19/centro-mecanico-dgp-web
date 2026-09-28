# Revisión ronda post-M3 · Punto 3 (todo salvo P-044)

- **Qué se revisó:** las seis confirmaciones (P-035, P-036, P-037, P-038,
  P-041, P-043) y la aplicación de **P-039**, **P-040** y **P-042**, todo
  **sin commitear**, sobre `35936f5`.
- **Fecha:** 2026-09-28.
- **Quién:** subagente `revisor` (`.claude/agents/revisor.md`).
- **Vueltas:** 1. **APROBADO CON OBSERVACIONES**, sin hallazgos bloqueantes.

**Esta es la primera pasada de la ronda en que el control corrió antes del
`git commit`**, que es la corrección que había quedado escrita en P-047
después de que se me escapara dos veces seguidas.

---

## Hallazgos

### 1. [MENOR] Nueve separadores `---` duplicados

Mi script de mover entradas agregaba un `---` al final de cada una sin quitar
el que ya la seguía, así que quedaban dos `<hr>` seguidos.

```
$ grep -c '^---$' pa-old.md  -> 37
$ grep -c '^---$' pa-new.md  -> 46
```

**Ningún texto se perdió.** → **Corregido**: colapsados los nueve, con una
comprobación de que el contenido sin separadores es idéntico antes y después.
37 separadores, 50 entradas intactas.

### 2. [MENOR] `docs/contraste-m3.md` está desalineado, y no por esta pasada

El acta dice "383 textos, 70 combinaciones" y la página mide **381 / 69**. La
línea 57 lista «Nuestros servicios», un elemento que ya no existe.

**El origen es `35936f5`**, el commit del punto 2c, que borró ese `<span>`: 1
elemento × 2 anchos = −2 textos, y su combinación era única = −1 combinación.
**P-040 no cambia ningún conteo**, porque acortó un `<p>` que sigue existiendo.
El revisor lo dejó anotado *"porque el punto 2 lo aprobó sin verlo y nadie lo
registró"*.

→ **Se regenera en el punto 4**, que es la verificación de cierre, según la
decisión ya confirmada en P-038.

### 3. [MENOR] P-031 conserva un texto dictado que la página ya no tiene

Su bloque "Aplicado" afirmaba que el párrafo publicado era el de Ramiro
carácter por carácter, y desde P-040 eso es falso. → **Corregido**: P-031 lleva
ahora una referencia cruzada a P-040 que dice qué cambió y aclara que el texto
queda como registro fechado, no como descripción de la página.

### 4. [MENOR, proceso] La decisión del `resize` no tenía entrada propia

Estaba declarada correctamente como mía **dentro** de P-042, pero las otras
decisiones propias de la ronda sí tienen entrada visible. → **Corregido**:
**P-051**.

### 5. [MENOR, precisión] "el horario queda en dos lugares del sitio"

Son dos lugares **visibles**. Hay un tercero legible por máquina, el
`openingHoursSpecification` del JSON-LD. → **Corregido**.

---

## La auditoría del manejador de `resize`, que es lo que más pedí

> **No me parece frágil, y el motivo es concreto:** la condición
> `navMobile.classList.contains('open')` está **primero** y corta el `&&`. Con
> el menú cerrado —que es el 100% de los `resize` en escritorio y de los que
> dispara la barra de direcciones al hacer scroll en móvil— `getComputedStyle`
> **no se llama**, así que no hay recálculo de estilo forzado por evento.

Medido: 810 `resize` seguidos con el menú abierto, sin errores ni bloqueo
perceptible.

> **La decisión de no comparar contra 830 px es correcta y verificable:** la
> única regla que muestra el botón es
> `@media (max-width: 830px) { .navbar-toggle { display: flex; } }` sobre el
> `display: none` de base. La condición del JS es el inverso exacto de esa
> regla. El corte vive en un solo lugar.

**El único camino con el `aria-expanded` desincronizado** es el menú forzado
abierto por JavaScript en escritorio, que **no es alcanzable por interacción
real**: el botón está en `display:none`, no recibe clic ni foco de teclado, y
la clase `open` no viene en el HTML. Es un límite inherente a un manejador que
solo corre en `resize`, no un defecto.

---

## Verificaciones corridas

### a) Las seis confirmaciones no pisaron texto

Partió las dos versiones en 51 secciones y las comparó una por una.

- Mismos ids en las dos versiones: **0 nuevos, 0 perdidos, 0 duplicados**.
- En las seis, el diff es **idéntico y mínimo**: el estado y tres líneas al
  final. **Ni una línea del texto anterior modificada ni borrada.** Es el error
  de P-034 y no se repitió.
- Estados consistentes: `## Abiertas` con P-007, P-044 y P-049, los tres
  `abierta`; `## Respondidas` con 47 entradas y **ninguna con estado distinto**;
  **ninguna `respondida` fuera de su sección**.

### b) P-039, con la regla de diff

| Qué | Resultado |
|---|---|
| `git diff --numstat` | **`2 0`** — dos agregadas, **cero borradas** |
| Ubicación | §18b, "Cómo funciona el turno", última viñeta antes de `### Repuestos` |
| Texto literal | comparado programáticamente tras desenvolver el salto de línea: **`IGUAL: True`** |
| La referencia "(§2)" resuelve | §2 dice "Recepción general, por WhatsApp" |

### c) P-040: el párrafo, y que el horario no perdiera su único lugar

El párrafo publicado es **exactamente** la oración dictada, sin residuos, y el
diff borra solo la segunda oración. El horario sigue en **cuatro** apariciones,
ninguna de ellas la borrada: la ficha de contacto, la columna Contacto del pie,
y el `opens`/`closes` del JSON-LD. Los tres coinciden con §3.

### d) P-042: interacción real, mis tres casos más seis suyos

| Caso | Resultado |
|---|---|
| 1 · abrir a 390 y ensanchar a 1200 **de a 1 px** (810 pasos) | **ningún ancho con los dos menús visibles**; estado final correcto |
| 2 · abrir a 390 y achicar a 360 | **sigue abierto** ✓ |
| 3 · clic en el enlace de WhatsApp | cierra, con `aria` y rótulo correctos ✓ |
| 3b · los otros seis enlaces | los seis cierran; **los siete** tienen el `onclick` |
| 4 · cruzar el corte tres veces seguidas | los tres ciclos idénticos, **sin estado pegado** |
| 5 · `resize` en escritorio con el menú cerrado | nada cambia, sin errores |
| 6 · menú forzado abierto por JS a 1200 px | camino no alcanzable (ver arriba) |
| 7 · justo en el corte | abierto a 830 sigue abierto; a 831 **cierra** ✓ |
| 8 · `resize` que cambia **solo el alto** | **sigue abierto** ✓ — no se dispara cuando no debe |
| 0 · carga inicial a 390 | correcto, sin errores |

### e) Los conteos de los registros

> **Esta vez no encontré ningún número mal.**

Verificó los cuatro: el `2 0` de P-039, "una sola fila" contra "tres",
"dos lugares" (con el matiz del hallazgo 5) y "el único de los siete", que
corroboró por otro camino con el acta de contraste, donde `#navMobile a`
aparece con **7 usos**.

### f) Datos y técnica

| Qué | Resultado |
|---|---|
| Todo dato del diff existe en `datos-verificados.md` | sí: §2, §3 y el §18b nuevo |
| Afirmaciones prohibidas, también en formas codificadas | **0** |
| Imágenes | ninguna nueva; todas bajo `assets/` |
| `TODO_IMAGEN` / `TODO_DATO` | los 4 de siempre / **cero** |
| ¿P-040 desincroniza la spec? | **no**: el párrafo no está dictado en `spec-m3-home.md` |
| **Barrido de desborde 320→1920 de a 1 px**, 5 pestañas y menú móvil **reabierto en cada ancho** | **9606 mediciones, 0 desbordes** |
| **Contraste**, 7 estados | **381 textos, 69 combinaciones, 0 por debajo del mínimo**. El párrafo nuevo: **6,17:1** |
| JSON-LD | válido, `AutoRepair`, **sin `AggregateRating` ni `Review`** |
| `<h1>` y jerarquía | 1 h1 / 11 h2 / 23 h3, **sin saltos** |
| `canonical` · "Saltar al contenido" · `noopener` · `alt` | único · primer `<a>` del body · 0 sin · 0 sin |
| Los `onclick` inline resuelven `closeMobileMenu` | comprobado **por interacción**, no por lectura |
| Archivos escritos dentro del repo por el revisor | **ninguno** |

## No verificado

- **`docs/contraste-m3.md` contra la versión `35936f5`:** la atribución del
  desalineo a ese commit la dedujo del `git show` y del cuadre exacto de −2
  textos y −1 combinación, sin servir esa versión aparte.
- **Validador de Schema.org y Prueba de Resultados Enriquecidos:** sin internet.
- **El `<iframe>` del mapa:** sale en blanco, por lo mismo.
- **Navegadores distintos de Chromium.**
