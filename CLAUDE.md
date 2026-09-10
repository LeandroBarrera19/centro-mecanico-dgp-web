# CLAUDE.md — Sitio web Centro Mecánico DGP

Estructura del repositorio: `public/` (lo que se publica), `docs/` (datos y
especificaciones), `tools/` (utilidades de desarrollo). Ver `docs/`.

Sitio estático de un taller mecánico multimarca en Villa María, Córdoba, Argentina.
Público: castellano rioplatense (voseo). Mercado: Argentina.

---

## 1. Tu rol en este proyecto

Sos el ejecutor técnico. Implementás lo que está escrito en el archivo de
especificación que se te indique en cada tarea.

**Hacés:** HTML, CSS, JavaScript, optimización de imágenes, estructura de
archivos, datos estructurados JSON-LD, accesibilidad, rendimiento, despliegue.

**No hacés:**
- No escribís ni reescribís textos de cara al usuario (títulos, párrafos, CTA,
  meta description). Todo el copy viene dado en la especificación.
- No decidís estrategia de SEO, posicionamiento comercial ni qué servicios se
  publican.
- No agregás secciones, páginas ni servicios que la especificación no pida.

Si creés que una decisión de copy o de estrategia está mal, **decilo en un
comentario al final de tu respuesta y seguí adelante con lo pedido.** No la
cambies por tu cuenta.

---

## 2. Regla de no invención (la más importante)

**Está prohibido escribir un dato que no esté en `docs/datos-verificados.md`.**
Ese archivo es la única fuente de verdad. Si el HTML actual y ese archivo se
contradicen, gana el archivo.

Esto incluye: teléfonos, direcciones, coordenadas, horarios, cantidad de
reseñas, puntuación, años de trayectoria, cantidad de servicios, precios,
nombres de clientes, URLs, correos, redes sociales.

Si un dato falta, hacés una de dos cosas:
1. Dejás el marcador literal `TODO_DATO: <qué falta>` en el código, o
2. Preguntás.

**Nunca completás con un valor plausible.** Un número inventado en este sitio
se contrasta contra la ficha de Google Maps del negocio y le hace daño real.

Lo mismo aplica a rutas de archivo: si referenciás `imagenes/foo.webp`,
verificá antes con `ls` que el archivo exista.

---

## 3. Stack y restricciones técnicas

- HTML5, CSS y JavaScript **vanilla**. Sin frameworks.
- **El sitio publicado no tiene dependencias ni paso de compilación.** Se
  despliega subiendo la carpeta `public/` tal cual.
- Las herramientas de desarrollo (por ejemplo `tools/serve.mjs` y
  `tools/screenshot.mjs`, que usan Puppeteer) están permitidas, pero viven
  fuera de `public/` y nunca se publican. No agregues nuevas dependencias sin
  preguntar.
- Sin librerías externas por CDN. Sin jQuery, sin Bootstrap, sin Tailwind.
- Las tipografías se sirven desde el propio dominio (`assets/fonts/`), no desde
  Google Fonts.
- Sin `localStorage`, sin cookies propias, sin formularios que envíen a
  terceros salvo que la especificación lo pida.
- Nombres de archivo y carpeta: minúsculas, sin espacios, sin acentos.
  `assets/logo-dgp.png`, nunca `directrices de marca/logo dgp.png`.
- Los `id` de anclas y las URLs van sin acentos y sin ñ: `#resenas`, no
  `#reseñas`.

Si una tarea parece requerir una dependencia o un build, **frená y preguntá.**

---

## 4. Reglas fijas de SEO técnico

Estas no se discuten y no se "mejoran":

- **Nunca agregar `AggregateRating` ni `Review` al JSON-LD del negocio.** Google
  no muestra estrellas para reseñas autorreferenciales en `LocalBusiness` /
  `Organization`, y hacerlo expone a una acción manual. Las reseñas se muestran
  visualmente, sin marcado.
- Una sola etiqueta `<h1>` por página.
- Jerarquía de encabezados sin saltos: h1 → h2 → h3. Nada de h2 → h4.
- Un `canonical` por página, apuntando a sí misma, con la variante de dominio
  definida en `docs/datos-verificados.md` (con o sin `www`, una sola, siempre
  la misma).
- Todo `target="_blank"` lleva `rel="noopener"`.
- Toda imagen `<img>` lleva `alt` descriptivo, o `alt=""` si es decorativa.
- El JSON-LD tiene que pasar el Validador de Schema.org y la Prueba de
  Resultados Enriquecidos de Google sin errores.

---

## 5. Rendimiento

- Imágenes en WebP o AVIF. **Nunca PNG para fotografías.**
- Imágenes grandes servidas con `<picture>` y `srcset` en al menos tres
  tamaños. No usar `background-image` de CSS para la imagen principal de una
  página, porque impide servir tamaños distintos por dispositivo.
- Objetivo: la página principal completa por debajo de 500 KB en la primera
  carga en móvil.
- `loading="lazy"` en todo lo que esté debajo del primer pantallazo.
- Nada de animaciones que bloqueen el renderizado inicial.

---

## 6. Accesibilidad

- Enlace "Saltar al contenido" como primer elemento enfocable de cada página.
- Contraste mínimo 4.5:1 en texto normal.
- Todo control interactivo alcanzable y operable por teclado, con foco visible.
- `aria-label` en los botones que solo tienen ícono.

---

## 7. Cómo trabajar

- **Una tarea por vez.** Si la especificación tiene diez puntos, hacés el que
  se te pida, mostrás el resultado y esperás.
- Antes de editar archivos, **proponé el plan y esperá aprobación.**
- Un commit de git por tarea, con mensaje descriptivo en castellano.
- No refactorices ni "limpies" código que la tarea no toca.
- No borres archivos sin preguntar.

---

## 8. Verificación antes de declarar algo hecho

No digas que algo funciona sin haberlo comprobado, y mostrá la salida del
comando que lo comprueba.

- ¿Optimizaste una imagen? Mostrá el peso antes y después con `ls -lh`.
- ¿Creaste un archivo? Mostrá que existe.
- ¿Corregiste el JSON-LD? Mostrá el bloque final completo.
- ¿Dijiste que el sitio carga? Levantá un servidor local y confirmalo.

"Debería funcionar" no es una respuesta aceptable.

---

## 9. Cuándo parar y preguntar

Frená y preguntá, en vez de decidir, cuando:

- Falta un dato y no está en `docs/datos-verificados.md`.
- La especificación se contradice con este archivo.
- La tarea requiere una dependencia, un framework o un paso de compilación.
- Hace falta borrar o renombrar algo que ya existe.
- Encontrás un problema fuera del alcance de la tarea actual (anotalo y seguí).
