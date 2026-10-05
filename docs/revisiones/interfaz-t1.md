# Revisión módulo interfaz · Tarea T1

- **Qué se revisó:** T1 de `docs/spec-interfaz.md`: desplazamiento con menú fijo,
  movimiento reducido, sin JavaScript y `transition` sin propiedad. Todo sin
  commitear, en la rama `mejoras-interfaz`, contra `main`.
- **Fecha:** 2026-10-05.
- **Quién:** subagente `revisor` (`.claude/agents/revisor.md`).
- **Vueltas:** 2. Primera: **RECHAZADO**. Segunda: **APROBADO CON
  OBSERVACIONES**, sin hallazgos bloqueantes.

---

## Primera vuelta — RECHAZADO

1. **[BLOQUEANTE]** Con movimiento reducido, "Ver todas las opiniones en Google"
   se seguía levantando al pasar el mouse. El selector del media query pesaba lo
   mismo, (0,2,0), que `.btn-google-review:hover`, y esa regla estaba después.
2. **[BLOQUEANTE]** En modo normal, las tarjetas `.t-card` dejaron de
   levantarse al pasar el mouse. `.js .fade-in.visible` pesaba (0,3,0) y le
   ganaba a `.t-card:hover`, que pesa (0,2,0). En `main` se levantaban 4 px.
   Era un cambio no pedido ni declarado.
3. **[MENOR]** `.service-card:hover` tampoco levanta la tarjeta en `main`:
   `.fade-in.visible` le gana por orden. El problema es anterior a T1.
4. **[MENOR]** La `transition` de `.navbar-toggle span` ahora lista
   propiedades, pero ninguna regla cambia `transform` ni `opacity` en esas rayas.
5. **[MENOR]** P-055 estaba al final de `preguntas-abiertas.md` y no al
   principio de "Respondidas". Además presentaba como decisión propia algo que
   la spec pide.

## Correcciones del ejecutor

- La clase `.js` pasó a `:where(.js)`, para que `.fade-in` y `.fade-in.visible`
  conserven la especificidad que tenían en `main`.
- El bloque `prefers-reduced-motion` se movió al final de la hoja: ahora gana
  por orden a todos los `:hover` que anula.
- P-055 se movió al principio de "Respondidas" y se reescribió. Los hallazgos 3
  y 4 quedan registrados en P-055 como problemas previos que no se tocan.

## Segunda vuelta — APROBADO CON OBSERVACIONES

- **Hallazgos 1, 2 y 5:** corregidos.
- **Hallazgos 3 y 4:** siguen igual, sin efecto en la conducta y registrados en
  P-055.
- **Hallazgos nuevos:** ninguno.

**Verificaciones del revisor:**

- **Estilos computados de `main` contra la rama:** 560 elementos, a 1440 y
  390 px. La única diferencia al cargar es la `transition` de las tres rayas,
  que es lo que pide la spec.
- **Levantamiento al pasar el mouse (px, eje y):**
  - En modo normal la rama coincide con `main`: btn-cta −1, btn-primary −2,
    btn-wa −2, btn-google-review −1, service-card 0, t-card −4.
  - Con movimiento reducido: todo en `none`.
- **Sin JavaScript:** 29 `.fade-in`, 0 con opacidad distinta de 1, 0 con
  transform.
- **Anclas:** 10 anclas en 7 anchos. Cada sección empieza entre 72,5 y 73,5 px,
  con el menú terminando en 73 px. El h2 de Servicios queda a 161 px; en `main`
  quedaba a 88.
- **Desborde horizontal:** de 320 a 1920 px de a 1 px, en las 5 pestañas y con
  el menú móvil abierto, en modo normal y con movimiento reducido. 8516
  mediciones por modo, 0 desbordes.
- **Texto visible:** idéntico a `main` (7494 caracteres).
- **Contraste:** 0 combinaciones debajo del mínimo.
- **Estructura:** un solo h1. El JSON-LD es válido y no tiene AggregateRating
  ni Review.
- **Consola y red:** 0 errores en consola, 0 pedidos fallidos.

**No verificado:**

- **Foco dentro del iframe del mapa:** el mapa es de otro origen, así que no
  se puede medir dónde quedan sus elementos internos al recibir el foco. No
  depende de T1.
