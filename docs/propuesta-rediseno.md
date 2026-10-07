# Propuesta de rediseño visual — borrador para aprobación de Ramiro

Armada el 2026-10-07 a partir de `docs/perfil-empresa.md` y de lo que Ramiro
eligió de las referencias. **No es una spec aprobada**: hasta que Ramiro la
apruebe, no se implementa nada de acá.

Restricciones que no cambian: colores y tipografías actuales (Montserrat y
Roboto), sin dependencias ni frameworks, todo dato desde
`docs/datos-verificados.md`, y solo fotos reales del taller.

---

## 1. Lo que eligió Ramiro (2026-10-07)

| Referencia | Qué se toma | Qué no |
|---|---|---|
| **Rogers-O'Brien** (r-o.com) | Tono general, tipografía contundente, diagonales, el color de marca en planos grandes, orgullo regional, y al final una imagen difuminada de la empresa | — |
| **Aurora** (aurora.tech) | Las animaciones; la estructura para empresas con flotas; la franja móvil de logos (con las marcas que se atienden) | — |
| **Holt** (holtlogistics.com) | Mapa de cobertura con puntos y nombres de las localidades | — |
| **T1 Energy** | Fotos del galpón y del trabajo | — |
| **HB Body** (hbbody.com) | La sección de productos: tarjetas por categoría y deslizante de productos destacados, para vender | Su estética violeta y negra |
| Rivian, Custom Truck | — | Descartados por Ramiro |
| **Reseñas actuales** | Se conserva la estructura; solo se adapta al estilo nuevo | — |

## 2. Dirección visual

- **Tema mixto, base clara.** Fondo blanco y gris cemento, con franjas
  grandes en azul `#124B8F` (el "plano de color" de Rogers-O'Brien), y el
  azul oscuro para el pie y algún bloque de cierre.
- **Botones: azul con texto blanco**, como decidió Ramiro el 2026-09-21
  (`datos-verificados.md` §19). El verde queda de acento: rayitas, tildes,
  detalles. Nunca como fondo de texto blanco.
- **Tipografía contundente:** Montserrat 800–900 en mayúsculas para títulos de
  sección, con espaciado entre letras ajustado; rótulos chicos en mayúsculas
  espaciadas como en un plano técnico. Roboto para el texto.
- **Diagonales:** las fotos y los bloques de color se cortan en diagonal, con
  el mismo ángulo del cartel de la fachada. El sitio ya usa cortes diagonales
  entre secciones; se vuelven el recurso propio de la marca.
- **Fotos reales protagonistas:** el galpón, los elevadores, el trabajo, la
  fachada. Dependen de las fotos pendientes del brief (F-01, F-02, F-04, F-07).
- **Cierre:** antes del pie, la fachada (F-07) a todo el ancho, difuminada y
  con el azul encima, con el llamado a pedir turno.

## 3. Animaciones (de Aurora)

Todas con CSS y JavaScript propios, sin librerías, y desactivadas para quien
pidió menos movimiento en su sistema.

1. **Texto que se va llenando al bajar:** los párrafos destacados empiezan en
   gris claro y pasan al color final palabra por palabra a medida que cruzan
   la mitad de la pantalla.
2. **Franja móvil de marcas:** las marcas que se atienden pasan en una cinta
   continua, que se frena al pasar el mouse.
3. **Cifras que suben** hasta el valor real al aparecer.
4. **Fotos que se descubren** con un barrido en diagonal al entrar en
   pantalla.
5. **Mapa:** los puntos de las localidades aparecen en orden de distancia,
   desde Villa María hacia afuera.

## 4. Estructura del sitio

Decisión de Ramiro (2026-10-07, P-059): flotas y productos van en secciones
propias, no dentro de la home. El menú pasa a tener tres páginas:

| Página | Para quién | Contenido |
|---|---|---|
| **Inicio** | El particular (decisión del 2026-09-21) | Lo que ya tiene, con el estilo nuevo, más un bloque corto que lleva a Flotas y otro que lleva a Repuestos |
| **Flotas** | Empresas del agro y el transporte | Estructura de Aurora: propuesta, condiciones, libreta digital por vehículo, casos anonimizados (`datos-verificados.md` §13), mapa de cobertura |
| **Repuestos** | Quien compra repuestos | Casa de repuestos con tarjetas por categoría y el deslizante de productos de HB Body |

Sigue siendo un sitio estático, sin dependencias ni compilación: una página
HTML por sección, que comparten la misma hoja de estilos. Cada página lleva su
propio `canonical` y se suma a `sitemap.xml`.

## 5. Secciones nuevas o rehechas

- **Franja de marcas móvil:** reemplaza a la franja fija actual. Con los
  nombres en texto, en la tipografía de la casa, salvo que Ramiro decida otra
  cosa (ver preguntas).
- **Mapa de cobertura:** un dibujo propio en SVG, sin Google Maps ni
  librerías: Villa María en el centro, el anillo de 80 km, y un punto con
  nombre por localidad. Necesita la ubicación de cada localidad (ver
  preguntas).
- **Productos (casa de repuestos):** tarjetas por categoría, y un deslizante de
  productos destacados con foto, nombre, descripción corta y un botón de
  consulta por WhatsApp. Necesita el catálogo (ver preguntas).
- **Reseñas:** misma estructura, estilo nuevo.

## 6. Preguntas abiertas que bloquean partes

Ver `docs/preguntas-abiertas.md`: P-060 (coordenadas del mapa), P-061 (catálogo de repuestos), P-062 (marcas en texto o logos).
