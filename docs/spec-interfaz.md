# Spec del módulo "interfaz" — arreglos de la revisión web-design-guidelines

Origen: revisión de `public/index.html` con las skills `web-design-guidelines`
y `seo-audit` (2026-10-05), en la carpeta de prueba "Prueba nueva interfaz
pagina web". Leandro aprobó aplicar **solo los arreglos de interfaz**. Se
trabaja en la rama `mejoras-interfaz`; `main` queda como la versión anterior
para comparar.

Modo: módulo completo (§7 de `CLAUDE.md`). Un commit por tarea, cada una con su
informe del revisor en `docs/revisiones/interfaz-t<n>.md`.

## Fuera de alcance

- **Textos visibles:** no se agrega, cambia ni borra ningún texto visible.
- **Datos del negocio:** no se toca ningún dato.
- **Huecos de foto:** F-02, F-03, F-04 y F-07 quedan como están hasta que
  Leandro agregue las fotos.
- **Sugerencias de la revisión SEO:** páginas por servicio, JSON-LD, sitemap,
  enlace `tel:` y política de privacidad.
- **Comentarios de copy de la revisión:** "¿Por qué elegirnos?", mayúsculas
  de los títulos de tarjeta y "&".
- **`theme-color`:** queda azul. Es una elección de marca, no un error.

## Tareas

### T1 — Desplazamiento, movimiento reducido y JavaScript desactivado
- **Anclas y foco no tapados por el menú:** `scroll-padding-top` en `html`,
  igual a la altura del menú fijo, para que al saltar a una sección o al
  recorrer con el teclado nada quede detrás del menú.
- **Movimiento reducido** (`prefers-reduced-motion: reduce`): sin aparición
  al desplazarse (`.fade-in`), sin desplazamiento suave y sin el levantamiento
  de botones y tarjetas al pasar el mouse.
- **Sin JavaScript, el contenido `.fade-in` se ve:** la ocultación inicial
  depende de una clase `.js` que pone un script en el `<head>`.
- **`transition: 0.3s` sin propiedad** en `.navbar-toggle span`, que equivale
  a `all`: listar las propiedades.

### T2 — Pestañas de servicios accesibles y enlazables
- **Roles ARIA:** patrón de pestañas WAI-ARIA (`tablist`, `tab`, `tabpanel`,
  `aria-selected`, `aria-controls`, `aria-labelledby`, tabindex itinerante).
  El nombre de la lista sale del `h2` "Servicios" existente, sin texto nuevo.
- **Teclado:** flechas izquierda y derecha (circulares), Inicio y Fin.
- **URL:** la pestaña activa queda en la dirección (`#servicios-<pestaña>`),
  y abrir esa dirección abre la pestaña.
- **Enlaces del pie** "Diagnóstico OBD", "Reprogramación ECU" y "Sistema A/C":
  abren la pestaña que nombran, en vez de caer en la primera.

### T3 — Menú móvil
- **Botón de 44 × 44 px** (mínimo táctil), sin mover las tres rayas de lugar.
- **Escape cierra el menú** abierto y devuelve el foco al botón.

### T4 — Íconos decorativos y nombres de marca
- **`aria-hidden="true"`** en los íconos decorativos que no lo tenían:
  tarjetas de servicio, datos de contacto y los tres logos de WhatsApp de
  botones con texto.
- **`translate="no"`** en los nombres de marca de la franja, para que el
  traductor automático no los altere.

### T5 — Tamaños mínimos de texto y detalles táctiles
- **Ningún texto visible por debajo de 12 px:** `.eyebrow-label` (11 px),
  `.brands-intro` (10 px) y `.brand-name--secondary` (~10,9 px).
- **`text-wrap: balance`** en `h1`, `h2` y `h3`.
- **`touch-action: manipulation`** y un `-webkit-tap-highlight-color`
  intencional en enlaces y botones.
- **Sin desborde horizontal:** barrido de 320 a 1920 px de a 1 px en todas las
  pestañas y con el menú móvil abierto.
