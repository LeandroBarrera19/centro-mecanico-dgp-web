# Ronda posterior al cierre de M3

**Dictada por Ramiro el 2026-09-28**, al aprobar M3. Se transcribe acá porque
las dos primeras revisiones de la ronda observaron lo mismo: *"no existe
`docs/spec-post-m3*.md`; los puntos vienen dictados en el encargo, así que el
revisor contrasta contra la cita, no contra un archivo versionado. Si la
intención es que estas pasadas sean auditables después, hoy no lo son."*

**Modo:** módulo completo, con el ciclo del revisor en cada paso y un commit
por punto. Sin consultar nada que esté cubierto acá.

> Si en el camino aparece algo que cae en lo que la regla del punto 1 manda
> consultar, anotalo en `preguntas-abiertas.md` y seguí con el resto. No frenes
> el módulo por una pregunta.

---

## Estado

| Punto | Estado | Commits |
|---|---|---|
| 1 · Regla de autonomía | **hecho** | `0c1c58f` |
| 2 · Tres ajustes visuales | **hecho** | `e38662f`, `da37be5`, `35936f5` |
| 3 · Preguntas abiertas | **hecho** | `23f11cb`, `7532c0a`, `4c53112`, `5fb2cf4`, `438b9fa`, `aaa968d`, `ca0a87d` |
| 4 · Cierre | **PENDIENTE** | — |

Informes de revisión: `docs/revisiones/post-m3-p1-p2a.md`,
`post-m3-p2b-p2c.md`, `post-m3-p3.md`, `post-m3-p044.md`.

---

## 1. Regla nueva de autonomía — `CLAUDE.md` §7

Agregar, al final de la sección, este bloque:

> Decisiones que tomás solo, sin esperar confirmación: forma (maquetación,
> espaciado, íconos, orden de reglas CSS, clases), proceso (orden de commits,
> scripts de verificación, nombres de archivos de trabajo) y correcciones
> técnicas de una a pocas líneas que no cambien lo que el sitio dice. Las
> registrás en docs/preguntas-abiertas.md como "Decisión propia" con estado
> "respondida", y el revisor las audita. Si el revisor la rechaza, se corrige.
>
> Solo se consulta a Ramiro por: texto de cara al usuario, datos del negocio,
> borrado de contenido visible, configuración del repositorio o del hosting,
> y todo lo que contradiga una decisión suya registrada.

**Commit:** `Regla de autonomia para decisiones de forma y proceso.`

## 2. Tres ajustes visuales

- **Todas las pestañas de servicios en tres columnas en escritorio.** Hoy
  cuatro de las cinco tienen tres tarjetas en una grilla de cuatro y dejan un
  hueco a la derecha. Esto reemplaza la decisión de P-012 de dejar "Repuestos"
  en cuatro columnas, tomada cuando tenía cuatro tarjetas; registrarlo en
  P-012. En el mismo commit, borrar las cuatro reglas CSS huérfanas:
  `.service-card--highlight`, `.badge-highlight`, `.footer-brand-sub` y
  `.services-grid`. **Commit:** `Pestanas de servicios en tres columnas.`
- **P-045:** agregar la diagonal en la unión Flotas → Marcas, con la geometría
  de las demás y el color de la sección de abajo. **P-025 se amplía:** todo
  cambio de color entre secciones lleva remate diagonal, y crearlo no es una
  decisión. **Commit:** `Diagonal en la union de flotas con marcas.`
- **Sacar el rótulo "Nuestros servicios"** arriba del `<h2>` "Servicios", por
  el criterio de P-030. **Commit:** `Servicios sin rotulo duplicado.`

## 3. Preguntas abiertas

- **P-035, P-036, P-037, P-038, P-041, P-043:** confirmadas tal como las tomó
  el ejecutor.
- **P-039:** agregar a `datos-verificados.md` §18b, en "Cómo funciona el
  turno": `- **Canal:** los presupuestos y los turnos se piden por WhatsApp, a
  la recepción general (§2).` Regla de diff.
- **P-040:** el párrafo de contacto queda solo con la primera oración:
  `Escribinos por WhatsApp para coordinar el turno o pedir un presupuesto.` El
  horario queda en la ficha de datos de al lado.
- **P-042:** arreglar los dos. Un manejador de `resize` que cierre el menú
  móvil al pasar a escritorio, y el `closeMobileMenu()` que le falta al enlace
  de WhatsApp del menú móvil.
- **P-044:** agregar un `.gitattributes` con `* text=auto eol=lf`, y los
  binarios (`*.png`, `*.jpg`, `*.webp`, `*.avif`, `*.woff2`, `*.ico`) marcados
  como `binary`. Después `git add --renormalize .` y verificar que el commit no
  cambia el contenido de ningún archivo, solo finales de línea. **Si cambiara
  algo más, frenar.** **Commit:** `Finales de linea fijos en el repositorio.`
- **P-007:** sigue abierta. Depende de la foto F-01.

## 4. Cierre — PENDIENTE

> Verificación completa como la de la Tarea 13: barrido 320–1920, contraste,
> JSON-LD, prohibidas, `TODO_DATO` y `TODO_IMAGEN`. Actualizá
> `docs/planes/m3-informe.md` con todo esto y cerrá todas las preguntas salvo
> P-007. Ahí frenás: el siguiente módulo lo escribe Ramiro.

**Dos cosas a tener en cuenta al ejecutarlo, las dos detectadas por el
revisor:**

1. **`docs/contraste-m3.md` está desalineado y hay que regenerarlo.** Dice
   "383 textos, 70 combinaciones" y la página mide **381 / 69** desde
   `35936f5`, el commit que borró el rótulo "Nuestros servicios": un elemento
   por dos anchos son −2 textos, y su combinación era única, −1. Regenerarlo
   entero es la decisión ya confirmada en **P-038**.
2. **"Cerrá todas las preguntas salvo P-007" no se puede cumplir tal cual.**
   Quedan abiertas **P-049** y **P-053**, y las dos nacieron **durante** esta
   ronda, después de que se escribiera esa instrucción. Ninguna de las dos se
   puede cerrar sin una decisión de Ramiro. Hay que decírselo, no cerrarlas por
   cuenta propia.
