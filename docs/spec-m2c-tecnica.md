# Spec M2c — Técnica, accesibilidad e indexación

Objetivo: dejar la estructura del sitio correcta para buscadores, lectores de
pantalla y pantallas chicas. Es el último módulo antes de tocar contenido (M3).

**Modo: módulo completo** (`CLAUDE.md` §7). Todas las tareas de corrido, un
commit por tarea, sin aprobación entre una y otra. Las dudas van a
`docs/preguntas-abiertas.md` desde P-008. Solo frenás del todo si algo bloquea
el resto del módulo o es irreversible y no está acá.

**Criterio general, que vale para todas las tareas:** M2c no cambia el aspecto
del sitio. Salvo donde una tarea lo diga explícitamente (Tareas 5 y 6), la
página tiene que verse **idéntica** antes y después. Una diferencia visual no
pedida es un error.

**Alcance:** estructura HTML, atributos, CSS de maquetación, archivos de
indexación. No se toca ningún texto visible, salvo el enlace de salto de la
Tarea 2.

---

## Tarea 1 — Capturas de referencia

Antes de tocar nada, sacar capturas de página completa, con scroll previo para
que se vean todas las secciones, a **320, 390, 768, 1440 y 1920 px**. Guardarlas
en `temporary screenshots/m2c-antes-<ancho>.png`.

Son la referencia contra la que se compara cada tarea.

Sin commit (las capturas están ignoradas por git).

---

## Tarea 2 — Idioma y enlace de salto

1. `<html lang="es">` pasa a `<html lang="es-AR">`. Es el castellano rioplatense
   del sitio, con voseo.
2. Agregar como **primer elemento enfocable del `<body>`** un enlace
   `<a class="skip-link" href="#contenido-principal">Saltar al contenido</a>`.
   El `<main id="contenido-principal">` ya existe.
3. El enlace **no se ve** hasta que recibe foco con el teclado. Cuando recibe
   foco, aparece arriba a la izquierda, legible, por encima de la barra de
   navegación. Usar los colores del sitio (azul `#124B8F` de fondo, texto
   blanco).
4. Verificar con Puppeteer: al presionar Tab una vez desde el inicio de la
   página, el foco cae en ese enlace y es visible. Al presionar Enter, el foco
   pasa al `<main>`.

Commit: `Idioma es-AR y enlace para saltar al contenido`

---

## Tarea 3 — Ancla de reseñas sin ñ

El `id="reseñas"` y los enlaces `href="#reseñas"` usan ñ (`CLAUDE.md` §3 lo
prohíbe). Pasan a `resenas`.

1. Buscar todas las apariciones de `reseñas` usadas como `id`, en `href`, y en
   el JavaScript (selectores, `getElementById`, `querySelector`, marcado de
   sección activa en el menú). Buscar también las formas codificadas:
   `rese%C3%B1as`.
2. Cambiar **solo** el identificador. El texto visible "Reseñas" del menú no se
   toca.
3. Verificar que al tocar el enlace del menú, la página baja a la sección
   correcta, en escritorio y en el menú móvil.

Commit: `Ancla de resenas sin enie`

---

## Tarea 4 — Jerarquía de encabezados

Hoy hay saltos: `<h2>` directo a `<h4>` en las secciones de servicios y del
proceso, y `<h5>` en las columnas del pie. Un lector de pantalla y un buscador
leen esos saltos como una estructura rota.

1. Listar primero **todos** los encabezados del documento en orden, con su
   nivel y su texto, y marcar dónde hay saltos.
2. Corregir para que no haya saltos: cada nivel desciende de a uno. Los
   `<h4>` que cuelgan directo de un `<h2>` pasan a `<h3>`; los `<h5>` del pie
   pasan al nivel que corresponda según lo que tengan encima.
3. **El aspecto no cambia.** Si el CSS da estilo por nombre de etiqueta
   (`h4 { ... }`), mover ese estilo a una clase y aplicarla, para que el
   encabezado se vea igual después de cambiar de nivel. Mostrar el CSS
   afectado antes y después.
4. Sigue habiendo **un solo `<h1>`**.
5. Listar la jerarquía final completa, y comparar capturas contra la Tarea 1 en
   los cinco anchos.

Commit: `Jerarquia de encabezados sin saltos de nivel`

---

## Tarea 5 — Estrellas en SVG

Las estrellas ★ de las reseñas necesitan hoy un subconjunto extra de Roboto
("symbols", 20,6 KB) solo para dibujar ese carácter.

1. **Antes de sacar el subconjunto, detectar qué caracteres del sitio dependen
   de él.** No solo ★: listá todo carácter fuera del rango latin y latin-ext que
   se renderice con Roboto. Si aparece alguno además de ★, anotalo en
   `preguntas-abiertas.md` y **no** saques el subconjunto.
2. Si solo es ★: reemplazar cada estrella por un SVG en línea, de una sola
   definición reutilizada (`<symbol>` + `<use>`), con el mismo color y el
   mismo tamaño visual que tienen hoy.
3. El conjunto de estrellas lleva `role="img"` y un `aria-label` que diga la
   puntuación: `Puntuación 4,9 de 5`, o `5 de 5` en cada reseña individual,
   según corresponda. Las estrellas sueltas llevan `aria-hidden="true"`.
4. Eliminar el `@font-face` del subconjunto symbols y su archivo `.woff2`.
5. **Esta tarea sí puede cambiar el aspecto**, pero solo en las estrellas, y
   tienen que quedar igual o más nítidas. Capturas de cerca del recuadro de
   Google y de una tarjeta de reseña, antes y después, a 390 y 1440 px.

Commit: `Estrellas en SVG y sin subconjunto de simbolos`

---

## Tarea 6 — Desborde de los contadores del hero

Por debajo de ~350 px de ancho, la fila de contadores del hero desborda: a 320
px la página mide 347 de ancho y aparece scroll horizontal.

**Condición:** la solución tiene que funcionar **con cualquier texto** en los
contadores. M3 puede cambiar lo que dicen; si se arregla a medida del texto
actual, vuelve a romperse.

1. Mostrar el CSS de la fila de contadores y de cada celda.
2. Corregir con maquetación, no achicando el texto a medida: que las celdas
   puedan encogerse (`min-width: 0` en los hijos de la grilla, columnas con
   `minmax(0, 1fr)`), y que el texto largo pueda partirse en vez de empujar el
   ancho.
3. **Esta tarea sí puede cambiar el aspecto**, pero solo por debajo de 390 px.
   A 390 px y más, la fila se tiene que ver exactamente igual que antes.
4. Verificar a **320, 340, 360 y 390 px** que `document.documentElement.scrollWidth`
   es igual al ancho de la ventana.
5. **Prueba de la condición:** reemplazar temporalmente, solo en memoria desde
   Puppeteer (sin tocar el archivo), el texto de un contador por uno de 30
   caracteres, y verificar que a 320 px tampoco desborda. Mostrar el resultado.

Commit: `Contadores del hero sin desborde en pantallas angostas`

---

## Tarea 7 — El mapa apuntando a la ficha

El `<iframe>` del mapa busca por dirección
(`maps.google.com/maps?q=Porfirio+Seppey+25...`), no por la ficha verificada.

1. Probar con Puppeteer si esta URL de inserción muestra el marcador de la
   ficha de Centro Mecánico DGP:

   `https://maps.google.com/maps?cid=3644390957274807803&output=embed`

2. **Si funciona** (el mapa carga y el marcador corresponde a la ficha, con el
   nombre del negocio), reemplazar el `src` del iframe por esa URL.
3. **Si no funciona** (mapa en blanco, error, o marcador sin el nombre del
   negocio), dejar el iframe como está, anotar el resultado en
   `preguntas-abiertas.md` con una captura, y seguir. **No pruebes otras
   variantes de URL inventadas.**
4. En cualquiera de los dos casos, el iframe conserva `loading="lazy"`, su
   `title` y su `aria-label`.

Commit (solo si hubo cambio): `Mapa insertado desde la ficha de Google Maps`

---

## Tarea 8 — `robots.txt` y `sitemap.xml`

Van en `public/`, para que se publiquen en la raíz del dominio.

1. `public/robots.txt`:

   ```
   User-agent: *
   Allow: /

   Sitemap: https://centromecanicodgp.com.ar/sitemap.xml
   ```

2. `public/sitemap.xml`, con una sola URL por ahora, **exactamente igual al
   `canonical`** de la página, incluida la barra final si la tiene:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://centromecanicodgp.com.ar/</loc>
       <lastmod>AAAA-MM-DD</lastmod>
     </url>
   </urlset>
   ```

   El `lastmod` es la **fecha del último commit que modificó
   `public/index.html`**, obtenida con `git log -1 --format=%cs -- public/index.html`.
   No inventes una fecha ni uses la de hoy.

3. Verificar que el XML es válido (que un parser lo lea sin errores) y que el
   servidor local sirve los dos archivos con respuesta 200.
4. Anotar en el informe: cuando se agreguen páginas nuevas (M7, M8), el sitemap
   tiene que actualizarse.

Commit: `Robots y sitemap`

---

## Tarea 9 — Auditoría de contraste (solo informe)

`CLAUDE.md` §6 pide contraste mínimo de 4.5:1 en texto normal y 3:1 en texto
grande (18,66 px en negrita o 24 px en adelante).

1. Con un script propio en `tools/` (sin dependencias nuevas), listar **cada
   combinación de color de texto sobre color de fondo** que aparezca en la
   página renderizada, con el tamaño y peso del texto y un ejemplo de dónde se
   usa.
2. Calcular la relación de contraste de cada una, con la fórmula de WCAG.
3. Informar las que no llegan al mínimo, ordenadas de peor a mejor.
4. **No corregir ningún color.** Cambiar colores es una decisión de marca y va
   a M3. Esta tarea solo mide e informa.

Guardar el resultado en `docs/contraste-m2c.md`.

Commit: `Auditoria de contraste`

---

## Tarea 10 — Verificación de cierre

1. Capturas de página completa a los cinco anchos de la Tarea 1, y comparación
   contra las de referencia. Listar **cada** diferencia visual y a qué tarea
   corresponde. Solo se aceptan las de las Tareas 5 y 6.
2. JSON-LD: `JSON.parse` y verificación semántica.
3. Servidor local: ninguna respuesta ≥ 400, ningún error de JavaScript.
4. Sin desborde horizontal a 320, 390, 768, 1440 y 1920 px.
5. `grep -rn "reseñas\|rese%C3%B1as" public/` solo devuelve texto visible, no
   identificadores.
6. Medición de peso como la de M2b, para confirmar que M2c no la empeoró.
7. Lista de todo lo anotado en `preguntas-abiertas.md` durante el módulo.
8. Informe en `docs/informe-m2c.md`.

Commit: `Informe de cierre de M2c`

---

## Fuera de alcance

Va a M3:
- Cualquier cambio de texto visible, salvo el enlace de salto.
- Cambios de color, aunque la Tarea 9 detecte contraste insuficiente.
- El contador `08–17:30hs` que se parte en dos líneas a 390 px (es contenido).
- La grilla de reseñas de 3 + 1 en escritorio.
- Reemplazar el iframe del mapa por una vista que cargue al tocarla.
- Abrir huecos de imagen del brief fotográfico.
