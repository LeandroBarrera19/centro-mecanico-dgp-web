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

**Las imágenes siguen la misma regla.** Nunca insertes una foto que no esté en
`public/assets/`. No busques, no descargues y no generes imágenes de stock, de
catálogo ni de ninguna otra fuente: todas las fotos de este sitio son del
taller real. Si un lugar del diseño necesita una foto que todavía no existe,
dejás el hueco reservado según `docs/brief-fotografico.md`, con su marcador
`TODO_IMAGEN: <id del hueco>`, y seguís. Un hueco visible es correcto; una foto
ajena que finge ser del taller, no.

- Cuando Ramiro entregue una versión nueva de docs/datos-verificados.md, no se
  reemplaza el archivo: se compara con la versión del repositorio y se aplican
  solo sus agregados y cambios. Lo que exista en el repositorio y no en la
  versión nueva se conserva. El diff se muestra antes de commitear.

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

Hay dos modos. La instrucción de cada módulo dice cuál se usa; si no lo dice,
es el modo por tarea.

**Modo por tarea** (para lo que necesita criterio humano: textos, decisiones
comerciales, borrado de contenido):
- Una tarea por vez. Proponé el plan, esperá aprobación, ejecutá, mostrá.

**Modo módulo completo** (para lo verificable con herramientas: rutas, formato,
rendimiento, estructura):
- Ejecutás todas las tareas de la spec de corrido, sin pedir aprobación entre
  una y otra.
- No frenás por una duda: la anotás en `docs/preguntas-abiertas.md` (ver §9) y
  seguís con lo que sí podés hacer.
- Solo frenás del todo si la duda bloquea el resto del módulo, o si algo es
  irreversible y no está cubierto por la spec.
- Al terminar, informe completo: qué se hizo, qué se verificó, qué quedó
  anotado.
- Ciclo con revisor: para cada tarea, (1) ejecutar; (2) invocar al subagente
  `revisor` con el módulo y el número de tarea; (3) guardar su informe en
  docs/revisiones/<modulo>-t<n>.md; (4) si el veredicto es RECHAZADO,
  corregir los hallazgos bloqueantes y volver a invocarlo; (5) commitear la
  tarea junto con su informe. Máximo dos vueltas de revisión: si sigue
  RECHAZADO, anotarlo en preguntas-abiertas.md, no commitear esa tarea y
  seguir con la siguiente. El revisor no se saltea aunque la tarea sea chica.

En los dos modos:
- Un commit de git por tarea, con mensaje descriptivo en castellano.
- Los mensajes de commit son solo la línea de asunto. Sin líneas de
  atribución, firmas ni identificadores de sesión.
- No refactorices ni "limpies" código que la tarea no toca.
- No borres archivos sin preguntar.

**Autonomía.**

Decisiones que tomás solo, sin esperar confirmación: forma (maquetación,
espaciado, íconos, orden de reglas CSS, clases), proceso (orden de commits,
scripts de verificación, nombres de archivos de trabajo) y correcciones
técnicas de una a pocas líneas que no cambien lo que el sitio dice. Las
registrás en docs/preguntas-abiertas.md como "Decisión propia" con estado
"respondida", y el revisor las audita. Si el revisor la rechaza, se corrige.

Solo se consulta a Ramiro por: texto de cara al usuario, datos del negocio,
borrado de contenido visible, configuración del repositorio o del hosting,
y todo lo que contradiga una decisión suya registrada.

---

## 8. Verificación antes de declarar algo hecho

No digas que algo funciona sin haberlo comprobado, y mostrá la salida del
comando que lo comprueba.

- ¿Optimizaste una imagen? Mostrá el peso antes y después con `ls -lh`.
- ¿Creaste un archivo? Mostrá que existe.
- ¿Corregiste el JSON-LD? Mostrá el bloque final completo.
- ¿Dijiste que el sitio carga? Levantá un servidor local y confirmalo.
- Las verificaciones visuales y de desborde recorren todas las pestañas,
  menús desplegables y estados ocultos, no solo lo que se ve al cargar la
  página. Un error dentro de una pestaña cerrada es un error igual.
- La verificación de desborde horizontal barre todos los anchos de 320 a 1920
  px, de a 1 px, midiendo document.documentElement.scrollWidth contra el
  ancho de la ventana, sin capturas. Un desborde entre dos anchos medidos es un
  desborde igual.

"Debería funcionar" no es una respuesta aceptable.

---

## 9. Huecos de información: nunca se tapan

**Un hueco de información no se rellena nunca.** Ni con una suposición, ni con
una generalidad, ni con un texto de relleno que "suene bien", ni con lo que
suele ponerse en sitios parecidos. Si el dato no está, no se escribe.

Es un hueco cuando:
- Falta un dato y no está en `docs/datos-verificados.md`.
- La spec da un texto que no encaja donde hay que ponerlo.
- La spec y este archivo se contradicen.
- Hay que elegir entre dos opciones y ninguna está dictada.
- Hace falta borrar, renombrar o mover algo que la spec no menciona.
- Una instrucción es ambigua o no se puede cumplir tal como está escrita.

**Qué hacer con un hueco:**

1. Anotalo en `docs/preguntas-abiertas.md`, con el formato de ese archivo.
2. Si el resto de la tarea se puede hacer sin ese dato, hacelo, y dejá en el
   código el marcador `TODO_DATO: <qué falta>` donde iría.
3. Si no se puede, dejá esa tarea sin hacer y seguí con la siguiente.
4. Nunca declares hecha una tarea que tiene un hueco sin resolver.

**Está prohibido:**
- Inventar un texto, una cifra, un nombre o una URL que no esté en
  `docs/datos-verificados.md`.
- Sustituir un dato faltante por una frase genérica ("calidad garantizada",
  "amplia experiencia", "los mejores profesionales").
- Escribir un valor "de ejemplo" o "provisorio" que se vea como definitivo.
- Decidir por tu cuenta y presentarlo como decisión del usuario. Si tuviste que
  decidir, escribilo como decisión tuya y anotala.
- Borrar un marcador o un comentario de advertencia que dejó otro, sin
  confirmarlo.

Un módulo que termina con diez preguntas anotadas y ocho tareas hechas está
mejor ejecutado que uno que termina con dieciocho tareas hechas y tres datos
inventados.
