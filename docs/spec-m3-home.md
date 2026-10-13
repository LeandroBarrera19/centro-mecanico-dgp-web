# Spec M3 — Reposicionamiento de la home

Objetivo: que la home le hable primero al particular que busca un taller en
Google, sin dejar afuera a las flotas, y que cada afirmación sea un hecho que
el cliente puede comprobar la primera vez que va.

**Modo: mixto.**

- Tareas 1 a 5: por tarea (`CLAUDE.md` §7), con aprobación visual de
  Ramiro antes de cada commit. Ya ejecutadas.
- Tareas 6 a 12: módulo completo con el ciclo del revisor (`CLAUDE.md` §7).
  Los textos de esta spec ya están aprobados, así que no se espera
  aprobación entre tareas. Un commit por tarea, con su informe de revisión
  en docs/revisiones/.
- Tarea 13: por tarea. Se frena y se espera la aprobación visual de Ramiro
  sobre todo el módulo junto.

Motivo del cambio: a partir de la Tarea 6 los textos están todos escritos y
aprobados en esta spec, y el control que antes hacía la aprobación entre
tareas lo hace el subagente revisor.

**Regla de textos:** todo texto visible nuevo está escrito en esta spec,
palabra por palabra. Si una frase no entra en el diseño o suena mal en su
lugar, **no se reescribe**: se anota en `preguntas-abiertas.md` con una
captura y se sigue con el resto de la sección.

**Tratamiento:** voseo en toda la home, incluido el bloque de flotas. El
"usted" queda para la página propia de flotas (M7).

**Verificación obligatoria en cada tarea:** capturas a 360, 390 y 1440 px,
recorriendo todas las pestañas y estados ocultos (`CLAUDE.md` §8), sin
desborde horizontal, sin respuestas ≥ 400, sin errores de JavaScript, y
contraste mínimo en todo texto que la tarea toque (4,5:1 normal, 3:1 grande).

---

## Tarea 1 — Botones y contraste

Base visual para el resto del módulo.

1. **Todos los botones de acción** pasan a fondo azul `#124B8F` con texto
   blanco, incluidos los de WhatsApp. Conservan el ícono de WhatsApp. Estados
   hover y focus en un azul más oscuro de la misma familia, visibles.
2. **Textos que no llegan al mínimo** según `docs/contraste-m2c.md`: subir
   opacidad o usar un tono más oscuro **del mismo color** hasta llegar al
   mínimo. No se cambia el color de ningún texto por otro color distinto.
3. **Elementos decorativos** (los separadores `·` entre marcas y los números
   grandes de fondo `01`–`04`): llevan `aria-hidden="true"` y quedan exentos
   del requisito de contraste. Verificar que de verdad no transmiten
   información.
4. **Avatares de las reseñas:** los fondos naranjas pasan al azul corporativo.
5. Rehacer la auditoría de contraste sobre toda la página y adjuntarla. Lo que
   quede sobre la foto del hero se vuelve a medir cuando llegue F-01.

Commit: `Botones en azul corporativo y contraste minimo`

---

## Tarea 2 — Metadatos

| Campo | Texto |
|---|---|
| `<title>` | `Taller mecánico en Villa María \| Centro Mecánico DGP` |
| `meta description` | `Service, mecánica y diagnóstico para todas las marcas. Especialistas en pick-ups y utilitarios Toyota, Ford y Volkswagen. 4,9 en Google. Villa María, Córdoba.` |
| `og:title` y `twitter:title` | igual que `<title>` |
| `og:description` y `twitter:description` | igual que `meta description` |
| JSON-LD `description` | igual que `meta description` |

Verificar el largo: el `<title>` por debajo de 60 caracteres y la
descripción por debajo de 160. Si alguno se pasa, anotarlo y no recortarlo.

Commit: `Metadatos de la home para el particular`

---

## Tarea 3 — Hero

| Elemento | Texto |
|---|---|
| Etiqueta (arriba del título) | `Especialistas en pick-ups y utilitarios` |
| `<h1>` | `Centro Mecánico DGP` y debajo, más chico, `Taller mecánico en Villa María` (cambio pedido por Ramiro el 2026-10-12, P-080; antes era solo `Taller mecánico en Villa María`) |
| Bajada | `Service, mecánica y diagnóstico para todas las marcas. Especialistas en Toyota, Ford y Volkswagen.` |
| Botón principal | `Pedir turno por WhatsApp` → `https://wa.me/5493534593187` |
| Botón secundario | `Ver servicios` → `#servicios` |

**Contadores**, en este orden:

| Número | Etiqueta |
|---|---|
| `4,9` | `+130 opiniones en Google` |
| `75%` | `de los trabajos del último año, con repuestos en stock` |
| `6` | `elevadores y 10 puestos de trabajo` |
| `+20` | `años de experiencia del equipo` |

Sale el contador de horario (pasa a contacto) y sale "STOCK INMEDIATO".

Verificar que los contadores no desborden ni corten palabras a 320, 360, 375
y 390 px. Si una etiqueta no entra, anotarlo con captura: no se acorta.

La foto del hero **no se cambia** en esta tarea: sigue la provisoria,
bloqueada para publicar hasta F-01 (P-007).

Commit: `Hero para el particular`

---

## Tarea 4 — Servicios

**Encabezado:**
- `<h2>`: `Servicios`
- Subtítulo: `Para todas las marcas, con especialización en pick-ups y utilitarios.`

**Pestañas nuevas**, en este orden, con las tarjetas que ya existen
redistribuidas así:

| Pestaña | Tarjetas |
|---|---|
| `Service y mantenimiento` | Service por Marca · Mantenimiento Preventivo · Alineado y Balanceado |
| `Mecánica` | Motor y Periféricos · Frenos y Seguridad · Tren Delantero y Trasero · Transmisión y Trenes de Fuerza · Kit Altura & Ensanche |
| `Diagnóstico y electrónica` | Diagnóstico OBD · Reprogramación ECU · Sistemas de Inyección |
| `Aire acondicionado y confort` | Sistema A/C Completo · Iluminación · Velocidad Crucero |
| `Repuestos` | Filtros & Lubricantes · Frenos & Suspensión · Distribución |

- La pestaña "Preparación de Flota" desaparece.
- La tarjeta "Libreta digital del vehículo" sale de las pestañas: pasa a su
  bloque propio (Tarea 6).
- Total: 17 tarjetas.

> **Actualizado el 2026-09-28 por la decisión de cierre de P-024.** Cuando se
> ejecutó esta tarea, la pestaña `Repuestos` llevaba cuatro tarjetas y el total
> era 18: la primera era `Casa de Repuestos`, con la etiqueta "Diferencial
> clave". Al responder P-024, Ramiro mandó eliminarla, sin dar motivo, y la
> pestaña quedó con tres. (La redundancia con la sección `#casa-de-repuestos`
> es el argumento con el que se planteó la pregunta, no el motivo que dio él.)
> Por eso quedan sin objeto,
> y se conservan solo como registro de lo que se decidió en su momento, la fila
> `Casa de Repuestos` de "Textos definitivos" y su viñeta en "Motivo de cada
> cambio", las dos más abajo en esta misma tarea. Ver "Decisiones de cierre
> (P-021 a P-034)" al final de este archivo.

**Textos de las tarjetas:** se conservan los actuales, **salvo** que contengan
una afirmación de la lista "prohibidas por genéricas" de
`datos-verificados.md` o la palabra "inmediato". ("Originales y alternativos"
se verificó después de escribir esta spec: ver datos-verificados.md §18b.)
Antes de ejecutar, **listá cada tarjeta con su texto actual** y
marcá las que tienen alguno de esos problemas. Esas las reescribo yo; no las
toques hasta tener el texto.

### Textos definitivos (decididos por Ramiro el 2026-09-23)

Sobre el inventario de las 19 tarjetas. Reemplazo **completo** del párrafo de
cada una; los títulos no cambian. Las tarjetas que no están en esta tabla
conservan su texto actual.

| Tarjeta | Párrafo |
|---|---|
| Diagnóstico OBD | `Lectura de códigos de falla, para identificar el problema antes de intervenir.` |
| Reprogramación ECU | `Actualización y calibración de la centralita electrónica del motor.` |
| Iluminación | `Diagnóstico, mantenimiento y mejora del sistema de iluminación del vehículo.` |
| Sistemas de Inyección | `Diagnóstico, limpieza y reemplazo de inyectores. Calibración y reprogramación del sistema de combustible.` |
| Kit Altura & Ensanche | `Elevación de suspensión y ensanche de vía para pick-ups.` |
| Casa de Repuestos | `Stock propio, en el mismo lugar que el taller. Repuestos originales y alternativos, abierta al público.` |
| Frenos & Suspensión | `Pastillas, discos, campanas y cintas de freno. Amortiguadores y piezas de recambio de tren delantero y trasero.` |

Motivo de cada cambio:

- **Diagnóstico OBD**, **Reprogramación ECU** y **Sistemas de Inyección**:
  salen "precisa", "preciso" y "rendimiento óptimo", calidad no verificable.
- **Iluminación** y **Kit Altura & Ensanche**: sale el lenguaje del
  posicionamiento anterior ("operaciones diurnas y nocturnas", "terrenos
  rurales exigentes").
- **Casa de Repuestos**: sale "inmediato". `datos-verificados.md` §18b dice
  que "stock inmediato" no se puede afirmar, porque una de cada cuatro veces
  hay que pedir el repuesto afuera. **"Originales y alternativos" se queda**:
  la misma §18b lo da por verificado ("se trabaja con los dos").
- **Frenos & Suspensión**: sale "todas las piezas de recambio", que
  contradice el 75% de stock propio publicado en el hero.

Estos siete textos se aplican en un commit propio, **después** del de la
reorganización, para que las dos cosas queden separables.

Commit: `Servicios reorganizados en pestanas para el particular`
Commit de los textos: `Textos de tarjetas de servicios sin afirmaciones genericas`

---

## Tarea 5 — Cómo trabajamos

Reemplaza **completas** las secciones "¿Por qué elegirnos?" y la del proceso de
cinco pasos. Una sola sección nueva.

- `<h2>`: `Cómo trabajamos`
- Subtítulo: `Lo que hacemos en cada trabajo, para que sepas qué esperar.`

Cinco bloques, cada uno con `<h3>` y párrafo:

**1. `Turno para service, revisión general o reparación específica`** (cambio pedido por Ramiro el 2026-10-12, P-081; antes era `Turno para service`)
Para un service, te pasamos el presupuesto y, si lo aprobás, te damos turno en el momento.

**2. `Presupuesto antes de desarmar`**
Cuando se puede, te pasamos un presupuesto sin desarmar el vehículo, y te aclaramos que puede cambiar. Si el problema necesita una revisión, coordinamos un turno y presupuestamos sobre lo revisado.

**3. `Opciones de repuesto`**
Para un mismo trabajo te damos opciones de repuesto, originales y alternativos, con distintos precios. Te recomendamos la que conviene y elegís vos.

**4. `Entrega y seguimiento`**
Te avisamos cuando el vehículo está listo. La pieza que cambiamos queda en el vehículo, para que la veas. Después de una reparación, te consultamos cómo anda.

**5. `Garantía de repuestos y trabajos`**
Si aparece un inconveniente, traés el vehículo y lo revisamos. Un profesional determina si corresponde a la mano de obra o a un repuesto fallado, y en ese caso se reconoce la garantía.

- Hueco de imagen **F-02** en esta sección (ver `docs/brief-fotografico.md`).
- Los enlaces del menú y del pie que apuntaban a las secciones eliminadas
  pasan a apuntar a esta. Listalos antes de cambiarlos.
- Verificar que la sección nueva no desborde entre 481 y 487 px: la grilla de
  "Nuestro proceso" que reemplaza desbordaba en ese rango (P-013).

Commit: `Seccion como trabajamos en lugar de por que elegirnos y proceso`

---

## Tarea 6 — Libreta digital del vehículo

Bloque propio, a continuación de "Cómo trabajamos".

- `<h2>`: `Libreta digital del vehículo`
- Bajada: `El historial de reparaciones de tu vehículo, siempre en tu celular.`
- Párrafo: `Cada vehículo que atendemos lleva un código QR pegado. Lo escaneás con el celular y se abre la libreta, sin instalar nada. La tienen todos nuestros clientes, particulares y empresas.`
- Lista, con título `Qué guarda`:
  - `La fecha de cada visita`
  - `El kilometraje`
  - `Los trabajos realizados`
  - `Las observaciones del técnico`
  - `El recordatorio del próximo service`
- Hueco de imagen **F-03**.
- **Ícono:** reemplazar el dibujo de tarjeta de crédito por un ícono simple de
  código QR o de documento, en SVG en línea, del mismo estilo que los demás
  íconos del sitio.

Commit: `Bloque de la libreta digital del vehiculo`

---

## Tarea 7 — Casa de repuestos

- `<h2>`: `Casa de repuestos`
- Párrafo 1: `Tenemos casa de repuestos propia, en el mismo lugar que el taller. 3 de cada 4 trabajos del último año se hicieron con repuestos de nuestro stock.`
- Párrafo 2: `Trabajamos con repuestos originales y alternativos, y te recomendamos opciones.`
- Párrafo 3: `Abierta al público: también vendemos repuestos para que los lleves.`
- Hueco de imagen **F-04**.

Si la pestaña "Repuestos" de Servicios (Tarea 4) queda redundante con este
bloque, **no la elimines**: anotalo en `preguntas-abiertas.md`.

Commit: `Bloque de la casa de repuestos`

---

## Tarea 8 — Flotas

- `<h2>`: `¿Tenés una flota de vehículos?`
- Párrafo: `Trabajamos con empresas de la región que necesitan sus vehículos en condiciones. En los últimos dos años atendimos a más de 90 clientes con cuatro o más vehículos.`
- Lista:
  - `Cuenta corriente con pago a 30 días.`
  - `Libreta digital de cada vehículo de la flota.`
  - `Condiciones y beneficios acordados con cada empresa.`
- Botón: `Consultar condiciones para empresas` → `https://wa.me/5493534593187`

Bloque corto y secundario: no más alto que la sección de "Cómo trabajamos".

Commit: `Bloque de flotas en la home`

---

## Tarea 9 — Marcas

Sin cambios de contenido respecto de M2a: "Especialistas en" Toyota,
Volkswagen, Ford; "También atendemos" con el resto. Solo verificar que quedó
bien ubicada en el orden nuevo (ver Tarea 13).

Sin commit si no hubo cambios.

---

## Tarea 10 — Opiniones

- `<h2>`: `Lo que dicen nuestros clientes`
- Sin subtítulo.
- Se elimina el párrafo "La confianza de nuestros clientes es el motor que nos
  impulsa a superarnos cada día".
- Las cuatro reseñas **no cambian**: textos, nombres, fechas y estrellas ya
  están verificados.
- Grilla de **2 × 2** en escritorio (se acaba la tarjeta suelta abajo), una
  columna en celular.
- Botón a la ficha, como está.

> **Actualizado el 2026-09-28 por la decisión de cierre de P-030.** Cuando se
> ejecutó esta tarea, el segundo punto decía: *Subtítulo: `4,9 en Google, con
> más de 130 opiniones.`* Al responder P-030, Ramiro mandó eliminarlo, porque
> la insignia de Google que está debajo dice lo mismo con más respaldo (ese
> motivo es de él, citado de su respuesta). En la misma respuesta mandó
> eliminar el rótulo superior, esta vez **sin dar motivo**. (Que el rótulo
> repetía el `<h2>` palabra por palabra, y que esta tarea nunca lo había
> dictado, son dos hechos verificados, y son el argumento con el que se planteó
> P-030, no el motivo que dio él.) Ver "Decisiones de cierre (P-021 a P-034)"
> al final de este archivo.

Commit: `Opiniones en grilla de dos por dos`

---

## Tarea 11 — Zona de cobertura

Sección nueva.

- `<h2>`: `Clientes de toda la región`
- Párrafo: `Desde 2022 atendemos vehículos de Villa María y de más de 40 localidades en un radio de 80 km. Entre ellas: Arroyo Cabral, Bell Ville, Ticino, Idiazábal, James Craik, Pozo del Molle, Tío Pujio, Etruria, Ballesteros y Cintra.`

Ninguna otra localidad. "Córdoba" no se nombra.

> **Actualizado el 2026-09-28 por la decisión de cierre de P-021.** Cuando se
> ejecutó esta tarea, el párrafo empezaba con `Atendemos vehículos de…`. Al
> responder P-021, Ramiro le antepuso `Desde 2022`. El texto de arriba es el
> vigente; ver "Decisiones de cierre (P-021 a P-034)" al final de este archivo.

Commit: `Seccion de zona de cobertura`

---

## Tarea 12 — Contacto y pie

**Contacto:**
- Botón `Pedir turno por WhatsApp`, en azul.
- Teléfono visible: `+54 9 353 459-3187`
- Horario: `Lunes a viernes de 8:00 a 17:30`
- Dirección: `Porfirio Seppey 25, Villa María, Córdoba`
- Formas de pago: `Efectivo, transferencia bancaria, tarjeta de crédito y de débito, y cuenta corriente para empresas.`
- Redes: Instagram, Facebook y LinkedIn, **como enlaces reales** a las URLs de
  `datos-verificados.md` §5, con `target="_blank"` y `rel="noopener"`.
- El mapa, como está.
- Hueco de imagen **F-07** junto al mapa.
- El párrafo completo pasa a: `Escribinos por WhatsApp para coordinar el turno
  o pedir un presupuesto. Respondemos de lunes a viernes de 8:00 a 17:30.` No
  es cierto que la respuesta sea inmediata: fuera del horario no se atiende.

**Pie:**
- El lema pasa a `Taller mecánico multimarca en Villa María, Córdoba.`
- Sale "Especialistas en flotas agropecuarias" y "Socio estratégico para
  flotas agropecuarias", donde aparezcan.
- Los enlaces del pie apuntan a las secciones nuevas.

> **Actualizado el 2026-09-28 por las decisiones de cierre P-031 y P-032.**
> Cuando se ejecutó esta tarea, el último punto de "Contacto" decía: *Donde hoy
> dice "Respuesta inmediata", reemplazar por: `Respondemos de lunes a viernes
> de 8:00 a 17:30.`* Esa forma no se pudo aplicar —la frase con mayúscula ya no
> existía, y el párrafo tenía **dos** afirmaciones sobre cuánto se tarda en
> responder, no una—, así que la tarea quedó con un `TODO_DATO` y el hueco
> anotado en P-031. Al responderla, Ramiro escribió el **párrafo completo**, que
> es el que figura arriba. El punto del pie, "Los enlaces del pie apuntan a las
> secciones nuevas", quedó sin ejecutar por no decir cuáles ni con qué rótulos
> (P-032); la respuesta de cierre enumera los del menú y los de la columna
> "Navegación" uno por uno. Ver "Decisiones de cierre (P-021 a P-034)" al final
> de este archivo.

Commit: `Contacto con redes enlazadas y pie sin flotas agropecuarias`

---

## Tarea 13 — Orden de las secciones y verificación de cierre

**Orden final:**
1. Hero
2. Servicios
3. Cómo trabajamos
4. Libreta digital del vehículo
5. Casa de repuestos
6. ¿Tenés una flota de vehículos?
7. Marcas
8. Opiniones
9. Clientes de toda la región
10. Contacto
11. Pie

Verificar:
1. El menú de navegación refleja este orden y cada enlace lleva a su sección,
   en escritorio y en el menú móvil.
2. Un solo `<h1>`; jerarquía sin saltos.
3. `grep` de todas las afirmaciones prohibidas de `datos-verificados.md`, y de
   "agro", "agropecuari", "inmediato", "flota no se detiene": solo pueden
   quedar donde esta spec las escribió.
4. JSON-LD: `JSON.parse` y verificación semántica.
5. Peso: medición como la de M2b, para confirmar que no empeoró de forma
   importante.
6. Capturas de página completa a 360, 390, 768 y 1440 px, con todas las
   pestañas.
7. Lista de huecos `TODO_IMAGEN` abiertos.
8. Informe en `docs/informe-m3.md`.

Commit: `Informe de cierre de M3`

---

## Fuera de alcance

- Cambiar la foto del hero (espera F-01).
- La página de flotas (M7) y las páginas por modelo y de precios (M8).
- Mensajes precargados distintos en cada botón de WhatsApp (M4).
- Reemplazar el iframe del mapa por una vista que cargue al tocarla.

---

## Decisiones de cierre (P-021 a P-034)

Respuestas de Ramiro del 2026-09-28 a las catorce preguntas abiertas de
`docs/preguntas-abiertas.md`. Cada una se aplica con el ciclo del revisor y un
commit por pregunta que toque `public/`. Después va la Tarea 13.

### Cambios en `docs/datos-verificados.md`

- **§1, punto 3 de la regla de trayectoria**, reemplazado por: *"Desde 2022"
  tiene que aparecer al menos una vez en la home, en un lugar visible. Hoy está
  en la sección de zona de cobertura.*
- **§10**, la fila "Marcas que también se atienden": *Todas. Se publican en la
  fila "También atendemos": Chevrolet, Renault, Fiat, Peugeot, Mercedes-Benz,
  Audi, Nissan, Honda, Citroën, BMW, Jeep, Dodge y Porsche. Ramiro confirmó que
  hay trabajos realizados y material que lo respalda para cada una.*
- **§14**, agregado: *La descripción de arriba fija los hechos, no la
  redacción. En el sitio se reformula en voseo, sin cambiar ni agregar hechos.*

### P-021 — "Desde 2022"

En el párrafo de "Clientes de toda la región", agregar `Desde 2022` al
principio. El párrafo queda: `Desde 2022 atendemos vehículos de Villa María y
de más de 40 localidades en un radio de 80 km. Entre ellas: …` (el resto
igual).

### P-022 — Ícono de la libreta

Confirmado el ícono de código QR. La pregunta se cierra y con ella la Tarea 6.

### P-023 — La descripción de §14

La decisión tomada fue correcta: la frase de §14 es de referencia, no literal.
Queda escrito en §14 (ver arriba).

### P-024 — Tarjeta "Casa de Repuestos" en la pestaña "Repuestos"

Eliminar la tarjeta, con su etiqueta "Diferencial clave". La pestaña queda con
tres tarjetas.

### P-025 — Remates diagonales

Confirmado el repintado de la Tarea 7, y **como regla general:** el color de
cada remate diagonal es el de la sección de abajo, y no es una decisión. Cuando
cambie el orden, se recalcula sin preguntar. En la Tarea 13 se recalcula la
cadena entera.

### P-026 — Bloque de flotas

Confirmadas las dos decisiones: el panel acotado y el ícono de WhatsApp, aunque
a 360 px el botón ocupe tres líneas.

### P-027 — El `<h2>` de contacto

Pasa a `Pedí tu turno`.

### P-028 — Cierre de la Tarea 9

La Tarea 9 se cierra en la Tarea 13. **Marcas no lleva entrada en el menú:** es
una franja, no un destino, y no hace falta agregarle `id`.

### P-029 — Las trece marcas

Se quedan. Quedan enumeradas en §10 de `datos-verificados.md`.

### P-030 — Opiniones

- Eliminar el rótulo superior "Lo que dicen nuestros clientes": queda solo el
  `<h2>`.
- Eliminar el subtítulo "4,9 en Google, con más de 130 opiniones.": queda la
  insignia de Google, que dice lo mismo con más respaldo.
- La regla CSS inerte del *media query* de 900 px se borra en la limpieza de la
  Tarea 13.

### P-031 — El párrafo de contacto

El párrafo completo pasa a: `Escribinos por WhatsApp para coordinar el turno o
pedir un presupuesto. Respondemos de lunes a viernes de 8:00 a 17:30.` Se saca
el `TODO_DATO`.

### P-032 y menú de la Tarea 13

**Menú (escritorio y móvil), en este orden:** Inicio · Servicios · ¿Por qué
elegirnos? → `#como-trabajamos` · Flotas → `#flotas` · Reseñas · Contacto.

**Columna "Navegación" del pie:** Inicio · Servicios · ¿Por qué elegirnos? ·
Libreta digital → `#libreta-digital` · Flotas · Reseñas · Zona de cobertura →
`#zona-de-cobertura` · Contacto. Casa de repuestos no se repite: ya está en la
columna "Servicios".

**Cómo entra el menú a anchos intermedios (decidido el 2026-09-28, al
ejecutar).** Agregar "Flotas" hizo que el menú de escritorio dejara de entrar:
desbordaba entre 769 y 797 px, y entre 798 y 830 px el botón quedaba pegado al
borde, sin el aire del contenedor. El bloque del menú mide 668,5 px fijos y no
se achica; el que cede es el logo, que se planta en 97,6 px. Se le llevaron a
Ramiro tres salidas medidas y eligió **aplicar dos a la vez**:

- el corte del menú móvil sube de 768 a **830 px**;
- el espaciado entre ítems baja de 32 a **20 px por debajo de 1000 px**.

Queda entonces: menú móvil de 320 a 830 px, menú de escritorio desde 831 px con
espaciado de 20 px hasta 1000 px y de 32 px desde 1001 px. Las dos
declaraciones salen del bloque de 768 px, que ya no las necesita. Medido de 320
a 1920 px de a 1 px: cero desbordes, ningún ancho con los dos menús a la vez ni
con ninguno, y ninguno con el menú sin su aire.

### P-033 — Las redes en contacto

Confirmadas las tres decisiones.

### P-034 — Contacto y pie

- En el pie, sacar "Villa María, Córdoba" debajo del nombre y en la línea suelta
  final. Quedan el lema y la dirección de la columna Contacto.
- Confirmado el aspecto del hueco F-07.
- Confirmado el rótulo "Formas de pago".
- En la columna Contacto del pie, el horario pasa a `Lunes a viernes de 8:00 a
  17:30` y `@dgpcentromecanico` pasa a enlace a Instagram, con
  `target="_blank"` y `rel="noopener"`.

### P-007

Sigue abierta: depende de la foto F-01.

### Ajustes a la Tarea 13

- Incluye la **limpieza de CSS sin uso**: `.badge-urgente`, `.hero h1 em` y la
  regla inerte de P-030.
- Incluye **recalcular la cadena entera de remates diagonales** según la regla
  de P-025.
- El informe va a **`docs/planes/m3-informe.md`**, no a `docs/informe-m3.md`.
- Las capturas llevan el prefijo **`m3-final-`**.
- Al terminar, se frena para la aprobación visual de Ramiro.
