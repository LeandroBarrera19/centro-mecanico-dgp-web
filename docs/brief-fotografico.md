# Brief fotográfico — Sitio de Centro Mecánico DGP

Para qué sirve este documento: el diseño del sitio no se limita a las fotos que
hay hoy. Cada lugar donde va una foto tiene su hueco reservado, con las medidas
y el encuadre definidos. Ramiro saca las fotos cuando puede; el hueco espera.

**Regla para el agente:** nunca se rellena un hueco con una foto de stock, de
catálogo, generada, ni tomada de ninguna otra fuente. Todas las fotos de este
sitio son del taller real. Un hueco vacío es correcto; una foto ajena, no.

---

## Cómo funciona un hueco

En el HTML, cada hueco es un contenedor con **la proporción exacta ya
reservada**, para que cuando llegue la foto no se mueva nada. Dentro lleva:

```html
<!-- TODO_IMAGEN: F-03 -->
<div class="img-slot" data-slot="F-03" style="aspect-ratio: 3/2">
  <span>Foto pendiente · F-03</span>
</div>
```

- El marcador `TODO_IMAGEN: <id>` permite encontrarlos todos con un `grep`.
- El hueco se ve como un rectángulo gris con el id. **No se publica con huecos
  visibles**: antes de publicar (M5), cada hueco o tiene su foto, o la sección
  se rediseña sin ella. Eso se decide en su momento, no ahora.
- Cuando llega la foto, el `<div>` se reemplaza por un `<picture>` con AVIF,
  WebP y JPEG de respaldo, igual que el hero.

**Dónde van los archivos:**
- Original sin tocar: `assets-src/fotos/<id>-original.<ext>` (no se publica).
- Versiones optimizadas: `public/assets/fotos/<id>-<ancho>.<formato>`.

---

## Reglas que valen para todas las fotos

**Lo que no puede aparecer nunca:**

- **Patentes legibles.** Ni en el vehículo ni en un reflejo. Encuadrá para que
  no entren, o tapalas después.
- **Logos, calcomanías o nombres de empresas clientes** en los vehículos. Los
  clientes no autorizaron aparecer.
- **Caras de personas sin su permiso.** Para los técnicos, pedí autorización
  antes. Si no querés lidiar con eso, encuadrá manos, torso y herramienta: una
  foto de manos trabajando funciona igual de bien y no tiene ese problema.
- Documentación con datos de clientes: órdenes de trabajo, facturas, la
  pantalla del sistema con nombres.
- Desorden, trapos sucios, basura, cables colgando, bidones abiertos. El
  cliente de flota lee el orden del taller como una señal de cómo va a tratar
  sus vehículos.

**Lo que conviene hacer:**

- **Con el celular alcanza**, si el celular es razonablemente nuevo. Máxima
  calidad, sin filtros, sin "modo retrato" para planos amplios.
- **Luz natural** siempre que se pueda: portón abierto, media mañana o media
  tarde. La luz del mediodía marca sombras duras; la fluorescente del taller
  vuelve todo verdoso.
- **Sin flash.** Genera reflejos en la chapa y en los vidrios.
- **Horizontal** salvo que el hueco pida vertical.
- **Ordená antes de disparar.** Cinco minutos de acomodar valen más que
  cualquier retoque.
- **Sacá varias de cada una**, con distinto encuadre y distancia. Elegimos
  después.
- **No recortes ni edites el original.** Mandalo tal como salió; el recorte y
  la compresión los hace el sitio.

**Calidad mínima:** 2400 px en el lado largo para los huecos grandes, 1600 px
para los chicos. Cualquier celular de los últimos años lo cumple de sobra.

---

## Los huecos

**Requisito** = el sitio no se publica hasta que esta foto exista; no hay
alternativa de rediseño. Prioridad **1** = sin esto no se publica. **2** =
mejora clara. **3** = si se puede.

### F-01 · Hero — el taller desde adentro
- **Prioridad:** requisito (antes 1; elevada el 2026-09-18)
- **Por qué es requisito:** la foto provisoria del hero muestra una patente
  legible y la cara de una persona. En pantalla quedan bajo la capa oscura,
  pero el archivo se sirve limpio y cualquiera puede abrirlo. Esa foto está
  bloqueada para publicar, y el sitio no se publica hasta que F-01 la
  reemplace (bloqueante de M5, ver P-007 en `docs/preguntas-abiertas.md`).
- **Proporción:** 16:9 horizontal · mínimo 2400 px de ancho
- **Qué muestra:** una vista amplia del taller en funcionamiento. Varios boxes
  a la vez, con vehículos en los elevadores. Tiene que dar la sensación de
  tamaño: 500 m² y 6 boxes es más de lo que tiene cualquier taller de la zona,
  y eso se transmite mejor con una foto que con el número.
- **Encuadre:** desde una esquina o desde el fondo, para que se vea la
  profundidad. A la altura del pecho, no desde arriba.
- **Cuidado:** sobre esta foto va texto encima con una capa oscura. Evitá que
  el centro tenga detalles importantes: van a quedar tapados. Dejá el interés
  visual en los tercios laterales.
- **Reemplaza a:** la imagen actual del hero, que no se puede publicar.

### F-02 · Pick-up en el elevador
- **Prioridad:** 1
- **Proporción:** 3:2 horizontal · mínimo 2400 px
- **Qué muestra:** una Hilux, Ranger o Amarok levantada en el elevador, con un
  técnico trabajando abajo. Es la foto que prueba la especialidad.
- **Encuadre:** lateral, el vehículo entero o casi entero. Patente fuera de
  cuadro.
- **Dónde va:** sección de servicios o del proceso, según cómo quede M3.

### F-03 · La libreta digital en uso
- **Prioridad:** 1
- **Proporción:** 3:2 horizontal · mínimo 1600 px
- **Qué muestra:** una mano sosteniendo un celular que muestra la libreta
  abierta, con el QR pegado en el vehículo visible en el mismo cuadro.
- **Por qué importa:** es el diferencial más fuerte del sitio y hoy se explica
  solo con texto. Una foto lo vuelve evidente en dos segundos.
- **Cuidado:** que la pantalla no muestre el nombre de un cliente real. Usá un
  vehículo propio o una libreta de prueba.

### F-04 · La casa de repuestos
- **Prioridad:** 2
- **Proporción:** 3:2 horizontal · mínimo 2000 px
- **Qué muestra:** las estanterías con stock, llenas y ordenadas. La idea a
  transmitir es "el repuesto está acá, no hay que esperarlo".
- **Encuadre:** un pasillo en perspectiva funciona mejor que una estantería de
  frente.

### F-05 · Diagnóstico electrónico
- **Prioridad:** 2
- **Proporción:** 3:2 horizontal · mínimo 1600 px
- **Qué muestra:** el escáner conectado al vehículo, con la pantalla encendida.
- **Cuidado:** que no se lea la marca ni el modelo del equipo en primer plano,
  por la decisión de no especificar equipamiento. Que se vea que hay
  tecnología, no cuál.

### F-06 · Manos trabajando — detalle
- **Prioridad:** 2
- **Proporción:** 3:2 horizontal · mínimo 1600 px
- **Qué muestra:** un plano cerrado de manos con una herramienta sobre una
  pieza: un filtro, unas pastillas, una correa de distribución.
- **Para qué:** es la foto que da textura al sitio y no tiene ningún problema
  de permisos. Sacá tres o cuatro variantes distintas.

### F-07 · Frente del taller
- **Prioridad:** 2
- **Proporción:** 16:9 horizontal · mínimo 2000 px
- **Qué muestra:** la fachada desde la vereda, con el cartel visible.
- **Para qué:** el cliente que llega por primera vez reconoce el lugar. Va
  cerca del mapa y la dirección.
- **Cuidado:** de día, con el portón abierto si se puede.

### F-08 · Varios vehículos de una misma flota
- **Prioridad:** 2 (pasa a 1 cuando se haga la página de flotas, M7)
- **Proporción:** 16:9 horizontal · mínimo 2400 px
- **Qué muestra:** tres o más pick-ups juntas, en el taller o en la playa.
- **Por qué importa:** es la prueba visual de que trabajás con flotas, sin
  nombrar a nadie.
- **Cuidado:** este es el hueco más delicado. Patentes fuera de cuadro o
  tapadas, y ningún logo de empresa visible. Si las camionetas están
  rotuladas, buscá un ángulo donde no se lea, o dejá el hueco vacío. **Ante la
  duda, no se usa.**

### F-09 · El equipo
- **Prioridad:** 3
- **Proporción:** 16:9 horizontal · mínimo 2400 px
- **Qué muestra:** los técnicos en el taller. No una foto de escuela en fila:
  en el lugar de trabajo, con la ropa de trabajo.
- **Requisito:** autorización de cada persona que aparezca. Si no la tenés,
  este hueco queda vacío y no pasa nada.

### F-10 · Imagen para compartir
- **Prioridad:** resuelta
- **Proporción:** 1200×630 exactos
- **Qué es:** `assets/og-placa.jpg`, una placa institucional: fondo azul
  corporativo con el logo centrado. Es la imagen que aparece cuando alguien
  comparte el enlace por WhatsApp.
- **Por qué una placa y no una foto:** la imagen se descarga entera, sin las
  capas de CSS que oscurecen el hero. Cualquier foto usada acá muestra sin
  filtro lo que tenga: patentes, caras, logos de clientes. Una placa nunca
  tiene ese problema y nunca queda desactualizada.
- **Cuándo se revisa:** en M3, si para entonces existe una foto que cumpla
  todas las reglas del brief. La placa es la opción por defecto, no un
  provisorio.

---

### R-<modelo>-<categoría> · Productos de la casa de repuestos (9 huecos)
- **Prioridad:** 2
- **Dónde:** `public/repuestos.html`, deslizante de productos (P-061).
- **Huecos:** `R-hilux-filtros`, `R-hilux-frenos`, `R-hilux-distribucion`,
  `R-amarok-filtros`, `R-amarok-frenos`, `R-amarok-distribucion`,
  `R-ranger-filtros`, `R-ranger-frenos`, `R-ranger-distribucion`.
- **Proporción:** 4:3 horizontal · mínimo 1600 px de ancho.
- **Qué muestra:** el repuesto real del stock, de la categoría y el modelo
  del hueco. Fondo liso y ordenado.
- **Cuidado:** fotos propias, nunca fotos de catálogo del fabricante
  (CLAUDE.md §2). Sin etiquetas de precio ni datos de proveedores.

---

## Orden sugerido para sacarlas

Una mañana de portón abierto alcanza para las de prioridad 1 y buena parte de
las 2: **F-01, F-02, F-06, F-04, F-05, F-07**. La F-03 se saca en cinco minutos
con cualquier vehículo. La F-08 depende de que coincidan varias camionetas de
un mismo cliente, así que es cuestión de estar atento el día que pase.

---

## Estado

| Id | Prioridad | Estado |
|---|---|---|
| F-01 | requisito | entregada 2026-10-12 (P-075): el frente del taller (no el interior que pedía el brief), 1402 px, con 2 patentes y los 2 horarios del cartel desenfocados (el del cartel no coincide con el verificado). Ya no está en uso la foto bloqueada; sus archivos `assets/hero-bg-*` siguen en `public/` hasta que Ramiro autorice borrarlos |
| F-02 | 1 | entregada 2026-10-12 (P-075): Hilux con el capó abierto y un técnico de espaldas, sin elevador; 1448 px |
| F-03 | 1 | entregada 2026-10-12 (P-075): composición vertical (QR en el parasol y libreta de ejemplo con datos ficticios), 1122 px; se publica en 4:5 |
| F-04 | 2 | entregada 2026-10-12 (P-075): vehículos en los elevadores (no las estanterías de repuestos que pedía el brief), 1448 px, con 4 patentes y un logo de empresa desenfocados |
| F-05 | 2 | pendiente |
| F-06 | 2 | pendiente |
| F-07 | 2 | entregada 2026-10-07: 4 fotos, copias de WhatsApp de 1280 px (debajo del mínimo; se usan por indicación de Ramiro, P-063). Pedir los originales |
| F-08 | 2 | entregada 2026-10-12 (P-075): el taller visto desde arriba con muchos vehículos, 1448 px, con 2 patentes desenfocadas |
| F-09 | 3 | pendiente |
| F-10 | resuelta | resuelta: placa institucional (`og-placa.jpg`) |
| R-hilux-filtros | 2 | pendiente |
| R-hilux-frenos | 2 | pendiente |
| R-hilux-distribucion | 2 | pendiente |
| R-amarok-filtros | 2 | pendiente |
| R-amarok-frenos | 2 | pendiente |
| R-amarok-distribucion | 2 | pendiente |
| R-ranger-filtros | 2 | pendiente |
| R-ranger-frenos | 2 | pendiente |
| R-ranger-distribucion | 2 | pendiente |

El agente actualiza esta tabla cuando un hueco se llena.
