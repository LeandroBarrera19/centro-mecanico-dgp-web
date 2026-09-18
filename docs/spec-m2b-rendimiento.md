# Spec M2b — Rendimiento

Objetivo: que la página cargue rápido en un celular con conexión pobre, que es
como va a llegar casi todo el tráfico. Hoy la imagen principal pesa 5,5 MB.

**Modo: módulo completo** (`CLAUDE.md` §7). Ejecutás todas las tareas de
corrido, un commit por tarea, sin pedir aprobación entre una y otra. Las dudas
van a `docs/preguntas-abiertas.md` desde P-002, y seguís con lo que sí podés
hacer. Solo frenás del todo si algo bloquea el resto del módulo o es
irreversible y no está acá.

**Alcance:** peso, formato y entrega de recursos. No se toca ningún texto, ni
el JSON-LD salvo la URL de `image`, ni la estructura de secciones.

---

## Autorizaciones para este módulo

- **`sharp` como dependencia de desarrollo** está autorizado: `npm i -D sharp`.
  Va en `devDependencies`, se usa solo desde `tools/`, y **nunca** se
  referencia desde `public/`. Es la excepción a `CLAUDE.md` §3 para este
  módulo, y no habilita ninguna otra dependencia.
- **Descargar los archivos de tipografía** desde Google Fonts está autorizado
  (Tarea 6).
- Ninguna otra instalación ni descarga. Si creés que hace falta otra, anotala
  en `preguntas-abiertas.md` y seguí.

---

## Tarea 1 — Medición inicial

Antes de tocar nada, medir para poder comparar.

Con `tools/serve.mjs` y Puppeteer, sin caché, medir a **1440 px** y a **390 px**:

- Bytes transferidos totales y el desglose por recurso, ordenado de mayor a
  menor.
- **LCP** (Largest Contentful Paint: cuánto tarda en pintarse el elemento más
  grande visible), con `PerformanceObserver`.
- Cantidad de peticiones y cuántas van a dominios externos.

Guardar el resultado en `docs/medicion-m2b.md`, en una tabla con la columna
"antes". La columna "después" se completa en la Tarea 7.

**Sin `npm install` todavía.** Esta tarea solo mide.

Commit: `Medicion inicial de rendimiento`

---

## Tarea 2 — Convertir la imagen del hero

`public/assets/hero-bg.png` pesa 5,5 MB y mide 2752×1536. Es una fotografía en
PNG, que es el peor formato posible para eso.

1. Instalar sharp: `npm i -D sharp`. Confirmar que quedó en `devDependencies`
   y que `node_modules/` sigue ignorado por git.
2. Crear `tools/optimizar-imagenes.mjs`, que hace la conversión. Tiene que ser
   reejecutable: si se corre dos veces, produce el mismo resultado.
3. Mover el original a `assets-src/hero-bg-original.png` (fuera de `public/`,
   no se publica, se conserva como fuente).
4. Generar, en `public/assets/`:

   | Archivo | Ancho | Formato | Calidad |
   |---|---|---|---|
   | `hero-bg-768.avif` | 768 | AVIF | 50 |
   | `hero-bg-1280.avif` | 1280 | AVIF | 50 |
   | `hero-bg-1920.avif` | 1920 | AVIF | 50 |
   | `hero-bg-768.webp` | 768 | WebP | 75 |
   | `hero-bg-1280.webp` | 1280 | WebP | 75 |
   | `hero-bg-1920.webp` | 1920 | WebP | 75 |
   | `hero-bg-1280.jpg` | 1280 | JPEG | 80 | 

   Todos conservan la proporción original. El JPEG es el respaldo para
   navegadores que no soportan ninguno de los otros dos.
5. Borrar `public/assets/hero-bg.png` **solo después** de que la Tarea 3 esté
   hecha y verificada. En esta tarea se queda.

Mostrar el peso de cada archivo generado con `ls -lh`, y el total.

**Referencia:** si el AVIF de 1280 supera los 250 KB, anotalo en
`preguntas-abiertas.md` con el peso real y seguí. No bajes la calidad por tu
cuenta.

Commit: `Versiones optimizadas de la imagen del hero`

---

## Tarea 3 — Reemplazar el `background-image` por `<picture>`

Hoy la imagen se sirve con `background-image` en el CSS de `.hero-bg`
(línea ~267). Eso impide servir tamaños distintos por dispositivo: un celular
se descarga la imagen completa.

1. **Antes de cambiar nada, mostrá** el CSS completo de `.hero-bg` y sus
   relacionados (`.hero`, overlays, degradados, `::before`, `::after`), y la
   estructura HTML del hero. Hay un degradado o capa de oscurecimiento sobre la
   foto: **tiene que quedar exactamente igual**.
2. Reemplazar por un `<picture>` real dentro del hero, posicionado detrás del
   contenido:
   - `<source type="image/avif" srcset="...">` con los tres AVIF y sus `w`.
   - `<source type="image/webp" srcset="...">` con los tres WebP.
   - `<img src="assets/hero-bg-1280.jpg" alt="" aria-hidden="true">` como
     respaldo.
   - `sizes="100vw"`.
   - El `<img>` lleva `width` y `height` con las dimensiones reales, para que
     el navegador reserve el espacio y la página no salte al cargar.
   - **No** lleva `loading="lazy"`: está en el primer pantallazo.
3. `alt=""` y `aria-hidden="true"` porque es decorativa: el texto del hero ya
   dice lo que hay que decir. No inventes una descripción de la foto.
4. Actualizar el `<link rel="preload">` de la línea ~15: hoy precarga el PNG.
   Tiene que precargar la misma imagen que va a elegir el navegador, usando
   `imagesrcset` e `imagesizes` con los AVIF, o eliminarse si no se puede
   hacer correctamente. **Un preload que apunta a un archivo que el navegador
   no usa es peor que no tener preload.**
5. Verificar visualmente a 390, 768, 1440 y 1920 px que el hero se ve **igual
   que antes**: mismo encuadre, mismo oscurecimiento, mismo texto legible.
   Capturas antes y después.
6. Confirmar en la pestaña de red qué archivo descarga el navegador en cada
   ancho. A 390 px tiene que bajar el de 768, no el de 1920.
7. El PNG original NO se borra en esta tarea: `og:image`, `twitter:image` y el
   `"image"` del JSON-LD todavía lo referencian y se cambian en la Tarea 4. Se
   borra al final de la Tarea 4, y ahí se confirma con `grep` que no queda
   ninguna referencia.

Commit: `Hero con picture responsivo en lugar de background-image`

---

## Tarea 4 — Imagen para compartir

Hoy `og:image`, `twitter:image` y el `image` del JSON-LD apuntan al PNG de
5,5 MB, de 2752×1536. Eso es lo que WhatsApp descarga cuando alguien comparte
el enlace.

1. Generar `public/assets/og-image.jpg`: **1200×630**, recorte centrado de la
   imagen original, JPEG calidad 80. Objetivo: menos de 300 KB.
2. Apuntar a esa imagen, con URL absoluta sobre `https://centromecanicodgp.com.ar`:
   - `og:image`
   - `twitter:image`
   - JSON-LD `"image"`
3. Agregar `og:image:width` con `1200` y `og:image:height` con `630`.
4. Verificar que el JSON-LD sigue pasando `JSON.parse` y la verificación
   semántica del paso 7 de la Tarea 15 de M2a.

**Nota:** el recorte centrado puede cortar mal la foto. Mostrame la imagen
generada; si queda mal encuadrada, anotalo en `preguntas-abiertas.md` y seguí.

Commit: `Imagen dedicada para compartir en redes`

---

## Tarea 5 — Logo y favicon

1. `public/assets/logo-dgp.png` pesa 133 KB. Generar `logo-dgp.webp` y servirlo
   con `<picture>`, dejando el PNG como respaldo. Si la versión WebP no baja al
   menos un 30% del peso, no vale la pena: dejá solo el PNG optimizado y
   anotalo.
2. El PNG del logo se optimiza sin perder calidad (sharp, sin recomprimir con
   pérdida).
3. `public/favicon.png` pesa 35 KB, que es mucho para un favicon. Generar una
   versión de 32×32 y otra de 180×180 para iOS (`apple-touch-icon`), y
   enlazarlas.
4. Los dos `<img>` del logo (navbar y pie) conservan su `alt` actual sin
   cambios, y llevan `width` y `height` explícitos.

Commit: `Logo y favicon optimizados`

---

## Tarea 6 — Tipografías propias

Hoy Montserrat y Roboto se cargan desde `fonts.googleapis.com` (líneas ~85-88).
Eso bloquea el pintado inicial, agrega dos conexiones a otro dominio y comparte
la dirección IP de cada visitante con Google.

1. **Detectar qué pesos y estilos se usan realmente** en el CSS del archivo.
   No descargues la familia completa: solo lo que se usa. Listá lo que
   encontraste antes de descargar.
2. Descargar los `.woff2` correspondientes, subconjunto **latin** y
   **latin-ext** (hace falta para las tildes y la ñ), a
   `public/assets/fonts/`.
3. Escribir las reglas `@font-face` en el CSS del archivo, con
   `font-display: swap` en todas.
4. Eliminar los `<link>` a `fonts.googleapis.com` y a `fonts.gstatic.com`,
   incluidos los `preconnect` y cualquier `preload` asociado.
5. Agregar `<link rel="preload" as="font" type="font/woff2" crossorigin>` para
   **los dos archivos** que se usan arriba de todo (el peso del título del hero
   y el del cuerpo). No más de dos.
6. Verificar que no queda ninguna petición a un dominio externo al cargar la
   página, salvo el iframe del mapa.
7. Verificar visualmente que la tipografía se ve igual que antes: capturas
   antes y después a 1440 y 390 px, comparando el hero y un párrafo de cuerpo.

**Si un peso que usa el CSS no existe en Google Fonts para esa familia** (por
ejemplo Montserrat 900 en un subconjunto que no lo tenga), anotalo en
`preguntas-abiertas.md` con el peso exacto y seguí con los demás. No lo
sustituyas por otro peso.

Commit: `Tipografias servidas desde el propio dominio`

---

## Tarea 7 — Medición final y comparación

Repetir exactamente la medición de la Tarea 1, en las mismas condiciones, y
completar la columna "después" de `docs/medicion-m2b.md`.

Reportar:
- Bytes totales antes y después, a 1440 y a 390 px, con el porcentaje de
  reducción.
- LCP antes y después.
- Peticiones a dominios externos antes y después.
- Si la página quedó **por debajo de 500 KB** en la primera carga en móvil
  (`CLAUDE.md` §5). Si no, decir cuánto falta y qué recurso pesa más.

Commit: `Medicion final de rendimiento`

---

## Tarea 8 — Verificación de cierre

1. `grep -rn "hero-bg.png\|fonts.googleapis\|fonts.gstatic" public/` vuelve
   vacío.
2. El JSON-LD pasa `JSON.parse` y la verificación semántica.
3. Servidor local: ninguna respuesta ≥ 400, ningún error de JavaScript.
4. Capturas de página completa a 1440 y 390 px, con scroll previo.
5. Comparación visual contra las capturas de cierre de M2a: **la página tiene
   que verse igual**. M2b no cambia el aspecto, solo el peso. Cualquier
   diferencia visual es un error, no una mejora.
6. `ls -lh public/assets/` con el contenido final.
7. Listar todo lo anotado en `preguntas-abiertas.md` durante el módulo.
8. Informe de cierre en `docs/informe-m2b.md`.

Sin commit propio salvo el informe: `Informe de cierre de M2b`

---

## Fuera de alcance

No se toca en M2b. Va a M2c:

- El desborde horizontal de la fila de contadores del hero por debajo de
  ~350 px de ancho.
- El ancla `#reseñas` con ñ.
- Los saltos de jerarquía de encabezados (`h2` → `h4`, los `h5` del pie).
- El `<iframe>` del mapa, que busca por dirección en vez de por el CID.

Y a M3: todo lo que sea texto, posicionamiento o contenido.

El arreglo del recuadro de Google en pantallas de hasta 480 px (commit
`0501b5e`, ver P-001) **no se toca**: funciona y no depende de nada de este
módulo.
