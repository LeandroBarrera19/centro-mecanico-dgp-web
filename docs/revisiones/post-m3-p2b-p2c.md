# Revisión ronda post-M3 · Puntos 2b y 2c

- **Qué se revisó:** el punto **2b** (la diagonal en la unión Flotas → Marcas,
  **ya commiteado** en `da37be5`) y el punto **2c** (sacar el rótulo "Nuestros
  servicios", sin commitear), los dos sobre `e38662f`.
- **Fecha:** 2026-09-28.
- **Quién:** subagente `revisor` (`.claude/agents/revisor.md`).
- **Vueltas:** 1. **APROBADO CON OBSERVACIONES**, sin hallazgos bloqueantes.

**Por qué este informe cubre dos puntos y viaja en el commit del 2c.** El 2b se
commiteó **sin su informe de revisión**, contra el paso (5) del ciclo de §7, y
un commit después de que yo escribiera en P-047 que eso no se hace. `da37be5`
va a quedar en la historia sin su informe; lo único que repara el agujero sin
reescribir historia es que el informe viaje acá. Está anotado en P-047.

---

## Veredicto

> No hay hallazgos bloqueantes. El código de los dos puntos es correcto y
> medido: la diagonal nueva es geométricamente idéntica a las demás, el padding
> no corrió nada de adentro de `.fleets`, y el borrado del rótulo no dejó CSS
> huérfano ni hueco de aire. **Lo que falla es el registro:** tres afirmaciones
> de conteo escritas en `docs/preguntas-abiertas.md` y en un comentario de CSS
> son falsas al medirlas.

Las tres, corregidas antes de commitear.

---

## Hallazgos

### 1. [MENOR] "las otras cinco" / "las seis diagonales": son seis y siete

```
$ grep -c "clip-path: polygon(0 100%, 100% 0, 100% 100%)" public/index.html
7
$ grep -c "padding: 88px 0 148px;" public/index.html
7
```

Las siete: `.how-we-work`, `.notebook`, `.parts`, `.fleets` (la nueva),
`.services`, `.testimonials` y `.coverage`. Antes del 2b eran **seis**, no
cinco. → **Corregido** en el comentario del CSS y en P-045.

### 2. [MENOR] El inventario decía "dos uniones donde cambia el color"; medidas hay tres sin remate

Faltaba **navbar → hero**: `#FFFFFF` (con su borde `#E8EDF3`) contra
`rgb(37,81,123)`. Es exactamente el mismo caso que contacto → pie y se excluye
con el mismo argumento, pero **no estaba escrito en ninguna parte**. Lo midió
muestreando los píxeles de la costura a 1440 px:

```
navbar bottom = 73
y=71: 255,255,255   y=72: 232,237,243   y=73: 37,81,123   y=74: 35,80,122
```

Señaló además que la redacción literal era falsa: hay **siete** uniones más que
cambian de color y están resueltas con diagonal. → **Corregido**: el inventario
de P-025 ahora dice que de las nueve uniones que cambian de color, siete tienen
remate y dos no, y nombra las dos. P-050 pasó a cubrir las dos.

### 3. [MENOR] "de los tres eyebrow-label que tenía el sitio queda uno"

Al momento del cambio eran **dos**, no tres. Contado commit por commit:

```
ce0fe5d: 2   afcde6b: 2   0c1c58f: 2   e38662f: 2   da37be5: 2   worktree: 1
c45335e: 3   (y hasta ecda75f el sitio tuvo 5)
```

El "queda uno" sí era correcto. → **Corregido**, con el ancla temporal.

### 4. [MENOR] P-050 se archivó en "Respondidas" sin que Ramiro la respondiera

Es la decisión que **va contra la letra de una regla suya**, y queda en la
sección de cerradas, donde no aparece como pendiente de nada. El revisor aclara
que es la convención del repositorio —P-046, P-047 y P-048 están igual, y la
regla de autonomía lo pide así—, y que lo señala porque *"el riesgo concreto es
que Ramiro nunca la vea"*. Queda además dicho en el resumen que se le entrega.

**Sobre el fondo de P-050, que le pedí que atacara:**

> **No creo que la regla obligue.** La regla dice "cambio de color entre
> **secciones**", y medido, el pie no es una sección: es `<footer>`, fuera de
> `<main>`, y el mismo criterio deja afuera al `<header>`. Los tres motivos que
> registraste son coherentes, el motivo 2 es el más débil porque es un juicio
> de forma que §1 no te corresponde, pero está declarado como tuyo y no
> atribuido a Ramiro, que es lo que §9 exige.

→ El motivo 2 quedó reescrito como lo que es, una apreciación mía y no un
argumento.

### 5. [MENOR, respuesta a mi pregunta] El registro de P-047 no alcanza como control

> Como **registro** alcanza y sobra. Como **control** no alcanza, por dos
> motivos medibles: (a) la primera redacción de P-047 ya decía lo mismo y un
> commit después volvió a pasar, o sea que el enunciado no es el mecanismo; (b)
> el defecto residual no lo arregla el registro — `da37be5` va a quedar en la
> historia sin su informe, y lo único que lo repara sin reescribir historia es
> que el informe del 2b viaje en el commit del 2c.

→ **Hecho:** es este archivo, y está anotado en P-047.

---

## Lo que verificó y salió bien

### La geometría de la diagonal nueva, comparada contra las otras seis

Idéntica salvo el `background`, que es el que corresponde:

| | `.fleets` | las otras seis |
|---|---|---|
| `content` / `position` | `''` / `absolute` | igual |
| `bottom` / `left` / `right` | `-2px` / `0` / `0` | igual |
| `height` | `66px` | igual |
| `clip-path` | `polygon(0 100%, 100% 0, 100% 100%)` | igual |
| `background` | `var(--gris-bg)` | el de su sección de abajo |

Y no se quedó en el estilo computado: la verificó **en píxeles**, buscando en
una captura de página completa la `x` donde el borde del triángulo cruza cada
fila.

```
.fleets   bottom=4872  b-60:x=1326  b-50:x=1107  b-33:x=737  b-16:x=366  b-4:x=104
.notebook bottom=3533  b-60:x=1326  b-50:x=1108  b-33:x=737  b-16:x=366  b-4:x=105
```

Coincide con `.notebook` con 0-1 px de diferencia. Las siete caen en la misma
pendiente.

### La cadena completa: las siete diagonales mueren en la sección de abajo

Medido a 390 y 1440 px, las siete correctas. Uniones sin diagonal, medidas:
hero → Servicios (*"el degradado muere en blanco puro: `y=882: 254,254,254`,
`y=883: 255,255,255` — **no hay cambio de color en la costura**"*),
Marcas → Opiniones (mismo gris de los dos lados), y las dos de P-050.

### El padding de `.fleets` no corrió nada de adentro

Renderizó `e38662f` con `<base>` y comparó **elemento por elemento** a 1440 px:

```
clave                        ANTES        AHORA        Δtop  Δalto
section.services             883,663      883,636        0    -27   <- 2c: el rótulo
section.fleets              4277,561     4251,621      -26    +60   <- 2b: 148-88
div.fleets-panel.fade-in    4365,385     4339,385      -26      0   <- contenido intacto
div.brands-strip            4838,119     4872,119      +34      0
footer                      7265,493     7299,493      +34      0
__doc                          0,7758       0,7792       0    +34
```

Ninguna altura cambió salvo esas dos. **El panel de flotas conserva su alto
exacto (385 px)**, y la holgura del contenido a la diagonal es de 84 px, la
misma que en `.notebook`.

### El borrado del rótulo no dejó CSS huérfano

`.eyebrow-label` sigue en uso (el de Contacto), y **ningún selector estructural**
dependía de que el `<span>` fuera el primer hijo: `grep` de `first-child`,
`:first-of-type`, `section-header >` y `section-header span` no devuelve nada.
El rótulo que queda está **fuera** de un `.section-header`.

### Espacio del `.section-header`

Medido en **seis** anchos y siete encabezados: **52 px en todos**. El único
distinto es el panel de flotas, con 22 px, por una regla propia preexistente.
Ninguna *media query* toca esos paddings.

### El resto

| Qué | Resultado |
|---|---|
| **Barrido de desborde 320→1920 de a 1 px**, 5 pestañas y menú móvil | **9606 mediciones, 0 desbordes** |
| Que el menú móvil realmente abra | a 390 px pasa de alto 0 a **364,3 px**, con `aria-expanded="true"` y `aria-label="Cerrar menú"` |
| **Contraste** | **381 textos, 69 combinaciones, 0 por debajo del mínimo.** "Nuestros servicios" ya no aparece; "Contacto" sigue, a 4,55:1 |
| `<h1>` y jerarquía | 1, **sin saltos**, 34 encabezados |
| JSON-LD | válido, `AutoRepair`, **sin `aggregateRating` ni `Review`** |
| `canonical` · `noopener` · `alt` | único · ninguno sin · ninguna sin |
| Primer elemento enfocable | el enlace "Saltar al contenido" |
| Errores de JavaScript / respuestas ≥ 400 | ninguno / ninguna |
| Afirmaciones prohibidas | **cero** |
| Datos nuevos | ninguno: el 2b es solo CSS y un comentario, el 2c borra una línea |
| `TODO_IMAGEN` / `TODO_DATO` | los 4 de siempre, ninguno rellenado / ninguno nuevo |
| Mensaje de `da37be5`, con `cat -A` | una línea, **sin trailers ni firmas** |
| Atribuciones | **ninguna decisión propia atribuida a Ramiro** |
| Finales de línea | 0 CR en los dos archivos; no se usó `git stash` |

---

## Una divulgación del propio revisor

> A mitad de la revisión escribí por error un archivo de andamiaje dentro del
> repo (`public/_rev_antes.html`) para comparar contra `e38662f`. Lo borré de
> inmediato y rehice la comparación sirviendo el HTML con `setContent` +
> `<base href>`, sin tocar el repo.

Comprobado desde este lado antes de commitear: `ls public/` devuelve los seis
archivos de siempre y `git status --untracked-files=all` solo los dos
modificados. No quedó rastro.

## No verificado

- **Fidelidad contra una spec escrita.** No existe `docs/spec-post-m3*.md`: los
  puntos vienen dictados en el encargo, así que el revisor contrasta contra la
  cita, no contra un archivo versionado. Lo deja anotado: *"si la intención es
  que estas pasadas post-M3 sean auditables después, hoy no lo son"*.
- **Validador de Schema.org y Prueba de Resultados Enriquecidos:** sin internet.
- **El `<iframe>` del mapa:** sale en blanco, por lo mismo.
- **Contraste a anchos distintos de 1440 y 390.**
