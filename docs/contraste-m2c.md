# Auditoría de contraste — M2c, Tarea 9

Medición del 2026-09-21 sobre `public/` en el commit `95d25bc`.
**Solo informe: no se cambió ningún color.** Cambiar colores es una decisión de
marca y va a M3 (spec de M2c, Tarea 9, punto 4).

## Criterio

`CLAUDE.md` §6 y WCAG 2: contraste mínimo de **4,5:1** en texto normal y
**3:1** en texto grande. Es grande el texto de 24 px o más, o de 18,66 px o más
en negrita (peso 700 o mayor).

## Método

Herramienta: `tools/auditar-contraste.mjs`, con Puppeteer y sharp, que ya eran
dependencias de desarrollo. No se agregó ninguna. Para repetir la medición:
`node tools/auditar-contraste.mjs [salida.md]`. Levanta y apaga el servidor
local sola.

1. Carga la página en cada estado: la vista inicial, cada una de las cuatro
   pestañas de servicios que están ocultas al cargar, el menú móvil abierto y el
   enlace "Saltar al contenido" con foco, a 1440 y 390 px. Las animaciones de
   entrada se dan por terminadas, con todo visible.
2. Por cada elemento con texto propio, toma su color computado (con la
   transparencia del color y la opacidad de sus contenedores), su tamaño, su
   peso y las cajas donde se dibuja el texto.
3. Saca una captura con todo el texto transparente. Lo que queda debajo de cada
   caja es el fondo real, sea un color liso, un degradado, la foto del hero o
   una capa semitransparente.
4. Calcula el contraste WCAG del texto contra cada píxel de ese fondo y guarda
   la mediana y el **percentil 10**, que es el 10 % de fondo más desfavorable.
   Una combinación **no llega** cuando el percentil 10 queda por debajo del
   mínimo. Con fondo liso, las dos cifras coinciden.
5. Agrupa por combinación: color de texto, fondo, tamaño y peso. "Usos" cuenta
   cuántas veces aparece la combinación, sumando los dos anchos (1440 y 390 px)
   y los estados.

Control: dos pares conocidos, calculados a mano con la fórmula WCAG, dan lo
mismo que la herramienta. Blanco sobre `#124B8F` da 8,65:1 y blanco sobre
`#7DB919` da 2,38:1.

No se mide: el contenido del mapa de Google, que es de un tercero dentro de un
`<iframe>`; los íconos SVG y los contornos de foco, que no son texto; y los
estados de `:hover`. Anchos medidos: 1440 y 390 px.

## Notas para M3

- **Posibles textos decorativos.** El separador `·` de la franja de marcas
  (1,09:1) y los números de fondo "01"–"04" de "¿Por qué elegirnos?" (1,45:1)
  son texto, así que la medición los incluye. WCAG no exige contraste para
  texto puramente decorativo. Decidir si lo son, y marcarlos con
  `aria-hidden="true"`, es de M3.
- **Botones verdes con texto blanco** (`.btn-primary`, 2,38:1) y **botón de
  WhatsApp** (`.btn-wa`, blanco sobre `#25D366`, 1,98:1). El botón
  "Pedir turno" de la barra usa texto `#2D2D2D` sobre el mismo verde y llega
  a 5,79:1.
- **"no se detiene."** en verde sobre la foto del hero: la mediana llega
  (3,42–3,48:1), pero el 10 % más claro de la foto queda por debajo de 3:1. El
  resultado depende de la foto, así que hay que volver a medir cuando llegue
  F-01 (P-007).
- **Iniciales de los avatares de las reseñas**: dos de las cuatro no llegan
  (CG sobre naranja `#F57C00` y AR sobre `#E65100`).
- **Relación con P-008:** si el título de "Casa de Repuestos" pasara al rojo
  `#D32027`, sobre el fondo `#FFF8F8` de esa tarjeta daría 5,00:1 y llegaría
  al mínimo.

## Resultado

Estados medidos: inicial (1440 y 390 px); pestaña 2 de servicios (1440 y 390 px); pestaña 3 de servicios (1440 y 390 px); pestaña 4 de servicios (1440 y 390 px); pestaña 5 de servicios (1440 y 390 px); menú móvil abierto (390 px); enlace de salto con foco (1440 px).
Textos medidos: 367. Combinaciones distintas: 80. No llegan al mínimo: **18**.

### Combinaciones que no llegan al mínimo, de peor a mejor

| Contraste (p10) | Mediana | Mínimo | Texto | Fondo | Tamaño y peso | Ejemplo — dónde | Anchos | Usos |
|---|---|---|---|---|---|---|---|---|
| 1,09:1 | 1,09:1 | 4,50:1 | `#E8EDF3` | `#F4F6F9` | 16 px, 300 | «·» — `#contenido-principal span.brand-sep` | 1440, 390 | 28 |
| 1,45:1 | 1,45:1 | 3,00:1 | `#124B8F al 22 %` | `#FFFFFF` | 72 px, 900 (grande) | «01» — `#por-que-elegirnos span.why-num-bg` | 1440, 390 | 8 |
| 1,98:1 | 1,98:1 | 4,50:1 | `#FFFFFF` | `#25D366` | 16 px, 700 | «Escribinos por WhatsApp» — `#contacto a.btn-wa` | 1440, 390 | 2 |
| 2,02:1 | 2,02:1 | 4,50:1 | `#124B8F al 40 %` | `#F4F6F9` | 10 px, 600 | «También atendemos» — `#contenido-principal span.brands-intro.brands-intro--secondary` | 1440, 390 | 2 |
| 2,23:1 | 2,23:1 | 4,50:1 | `#124B8F al 45 %` | `#F4F6F9` | 10,88 px, 500 | «CHEVROLET» — `#contenido-principal span.brand-name.brand-name--secondary` | 1440, 390 | 26 |
| 2,38:1 | 2,38:1 | 4,50:1 | `#FFFFFF` | `#7DB919` | 15,2 px, 700 | «Pedir turno por WhatsApp» — `#inicio a.btn-primary` | 1440, 390 | 2 |
| 2,38:1 | 2,38:1 | 4,50:1 | `#FFFFFF` | `#7DB919` | 14,08 px, 700 | «Dejá tu opinión» — `#resenas a.btn-primary` | 1440, 390 | 2 |
| 2,70:1 | 2,70:1 | 4,50:1 | `#FFFFFF` | `#F57C00` | 12,48 px, 700 | «CG» — `#resenas div.t-avatar` | 1440, 390 | 2 |
| 2,76:1 | 2,76:1 | 4,50:1 | `#124B8F al 55 %` | `#F4F6F9` | 10 px, 600 | «Especialistas en» — `#contenido-principal span.brands-intro` | 1440, 390 | 2 |
| 2,86:1 | 3,42:1 | 3,00:1 | `#7DB919` | `variable (mediana #285279)` | 41,6 px, 900 (grande) | «no se detiene.» — `#inicio em` | 390 | 1 |
| 2,90:1 | 3,48:1 | 3,00:1 | `#7DB919` | `variable (mediana #22507B)` | 67,2 px, 900 (grande) | «no se detiene.» — `#inicio em` | 1440 | 1 |
| 2,99:1 | 2,99:1 | 4,50:1 | `#FFFFFF al 38 %` | `#0D3870` | 12,8 px, 400 | «© Centro Mecánico DGP · Todos los derechos res…» — `footer p` | 1440, 390 | 6 |
| 3,22:1 | 3,50:1 | 4,50:1 | `#7DB919` | `variable (mediana #24507A)` | 11,52 px, 700 | «Especialistas en flotas agropecuarias» — `#inicio span.hero-badge` | 1440, 390 | 2 |
| 3,40:1 | 3,40:1 | 4,50:1 | `#FFFFFF al 50 %` | `#124B8F` | 11,52 px, 700 | «WhatsApp» — `#contacto span.contact-item-label` | 1440, 390 | 8 |
| 3,60:1 | 3,60:1 | 4,50:1 | `#FFFFFF al 45 %` | `#0D3870` | 12,8 px, 400 | «Villa María, Córdoba» — `footer div.footer-brand-sub` | 1440, 390 | 2 |
| 3,79:1 | 3,79:1 | 4,50:1 | `#FFFFFF` | `#E65100` | 12,48 px, 700 | «AR» — `#resenas div.t-avatar` | 1440, 390 | 2 |
| 4,20:1 | 4,20:1 | 4,50:1 | `#FFFFFF al 60 %` | `#124B8F` | 11 px, 500 | «Contacto» — `#contacto span.eyebrow-label` | 1440, 390 | 2 |
| 4,36:1 | 4,36:1 | 4,50:1 | `#124B8F al 75 %` | `#F4F6F9` | 12,8 px, 800 | «TOYOTA» — `#contenido-principal span.brand-name` | 1440, 390 | 6 |

### Combinaciones que llegan al mínimo

| Contraste (p10) | Mediana | Mínimo | Texto | Fondo | Tamaño y peso | Ejemplo — dónde | Anchos | Usos |
|---|---|---|---|---|---|---|---|---|
| 4,61:1 | 5,69:1 | 3,00:1 | `#7DB919` | `variable (mediana #162E54)` | 30,4 px, 900 (grande) | «08–17:30hs» — `#inicio div.stat-num` | 390 | 1 |
| 4,62:1 | 4,62:1 | 4,50:1 | `#FFFFFF al 55 %` | `#0D3870` | 14,08 px, 400 | «"Socio estratégico para flotas agropecuarias"» — `footer p.footer-tagline` | 1440, 390 | 2 |
| 4,63:1 | 5,58:1 | 4,50:1 | `#FFFFFF al 85 %` | `variable (mediana #2F5B8D)` | 16,8 px, 400 | «Servicio especializado en pick-ups y utilitari…» — `#inicio p` | 1440, 390 | 2 |
| 4,86:1 | 4,86:1 | 4,50:1 | `#7DB919` | `#0D3870` | 11,52 px, 700 | «Navegación» — `footer h3.footer-col-title` | 1440, 390 | 6 |
| 4,92:1 | 4,92:1 | 4,50:1 | `#6B6B6B` | `#F4F6F9` | 16,8 px, 400 | «Centro Mecánico DGP funciona desde 2022, con u…» — `#por-que-elegirnos p.section-sub` | 1440, 390 | 4 |
| 4,92:1 | 4,92:1 | 4,50:1 | `#6B6B6B` | `#F4F6F9` | 12,48 px, 600 | «Mecánica & Seguridad» — `#serviceTabs button.tab-btn` | 1440, 390 | 8 |
| 5,08:1 | 5,08:1 | 4,50:1 | `#6B6B6B` | `#FFF8F8` | 12,8 px, 400 | «Stock propio e inmediato. Repuestos originales…» — `#tab-repuestos p` | 1440, 390 | 2 |
| 5,15:1 | 5,44:1 | 3,00:1 | `#7DB919` | `#15315B` | 30,4 px, 900 (grande) | «+20» — `#inicio div.stat-num` | 1440 | 1 |
| 5,19:1 | 5,19:1 | 4,50:1 | `#FFFFFF al 60 %` | `#0D3870` | 11 px, 500 | «Nuestro proceso» — `#contenido-principal span.eyebrow-label` | 1440, 390 | 2 |
| 5,24:1 | 5,24:1 | 4,50:1 | `#FFFFFF` | `#D32027` | 9,28 px, 700 | «INMEDIATO» — `#inicio span.badge-urgente` | 1440, 390 | 4 |
| 5,33:1 | 5,33:1 | 4,50:1 | `#6B6B6B` | `#FFFFFF` | 11,52 px, 400 | «Villa María, Córdoba» — `nav span` | 1440, 390 | 10 |
| 5,33:1 | 5,33:1 | 4,50:1 | `#6B6B6B` | `#FFFFFF` | 14,88 px, 400 | «Diagnóstico OBD. Sabés exactamente qué tiene t…» — `#por-que-elegirnos p` | 1440, 390 | 8 |
| 5,33:1 | 5,33:1 | 4,50:1 | `#6B6B6B` | `#FFFFFF` | 16,8 px, 400 | «Soluciones técnicas integrales para pick-ups y…» — `#servicios p.section-sub` | 1440, 390 | 2 |
| 5,33:1 | 5,33:1 | 4,50:1 | `#6B6B6B` | `#FFFFFF` | 12,8 px, 400 | «Lectura de códigos. Identificación precisa de …» — `#tab-diagnostico p` | 1440, 390 | 37 |
| 5,33:1 | 5,33:1 | 4,50:1 | `#6B6B6B` | `#FFFFFF` | 14,08 px, 400 | «Hicieron un diagnóstico minucioso y me explica…» — `#resenas p.t-text` | 1440, 390 | 8 |
| 5,44:1 | 5,44:1 | 4,50:1 | `#FFFFFF al 62 %` | `#0D3870` | 13,28 px, 400 | «Recibimos tu vehículo y realizamos una inspecc…» — `#contenido-principal p` | 1440, 390 | 10 |
| 5,44:1 | 5,44:1 | 4,50:1 | `#FFFFFF al 62 %` | `#0D3870` | 13,92 px, 400 | «Inicio» — `footer a` | 1440, 390 | 20 |
| 5,45:1 | 5,62:1 | 3,00:1 | `#7DB919` | `#112F58` | 30,4 px, 900 (grande) | «+20» — `#inicio div.stat-num` | 390 | 1 |
| 5,46:1 | 5,69:1 | 3,00:1 | `#7DB919` | `#152E54` | 30,4 px, 900 (grande) | «08–17:30hs» — `#inicio div.stat-num` | 1440 | 1 |
| 5,49:1 | 5,61:1 | 3,00:1 | `#7DB919` | `#132F57` | 30,4 px, 900 (grande) | «STOCK» — `#inicio div.stat-num` | 390 | 1 |
| 5,55:1 | 5,61:1 | 3,00:1 | `#7DB919` | `#122F58` | 30,4 px, 900 (grande) | «+130» — `#inicio div.stat-num` | 1440 | 1 |
| 5,60:1 | 5,75:1 | 3,00:1 | `#7DB919` | `#112D56` | 30,4 px, 900 (grande) | «STOCK» — `#inicio div.stat-num` | 1440 | 1 |
| 5,71:1 | 5,79:1 | 3,00:1 | `#7DB919` | `#102D54` | 30,4 px, 900 (grande) | «+130» — `#inicio div.stat-num` | 390 | 1 |
| 5,79:1 | 5,79:1 | 4,50:1 | `#2D2D2D` | `#7DB919` | 13,6 px, 600 | «Pedir turno» — `nav a.btn-cta` | 1440 | 1 |
| 5,82:1 | 5,82:1 | 4,50:1 | `#FFFFFF al 65 %` | `#0D3870` | 16,8 px, 400 | «Cinco pasos que garantizan un diagnóstico clar…» — `#contenido-principal p.section-sub` | 1440, 390 | 2 |
| 6,17:1 | 6,17:1 | 4,50:1 | `#FFFFFF al 80 %` | `#124B8F` | 16 px, 400 | «Diagnóstico transparente, stock propio y respu…» — `#contacto p` | 1440, 390 | 2 |
| 6,39:1 | 6,88:1 | 4,50:1 | `#FFFFFF` | `variable (mediana #305C8E)` | 15,2 px, 700 | «Ver servicios» — `#inicio a.btn-outline` | 1440 | 1 |
| 6,52:1 | 7,00:1 | 4,50:1 | `#FFFFFF al 88 %` | `variable (mediana #394E6D)` | 13,12 px, 400 | «Propio de repuestos» — `#inicio div.stat-label` | 390 | 1 |
| 6,69:1 | 8,88:1 | 3,00:1 | `#FFFFFF` | `variable (mediana #214C76)` | 67,2 px, 900 (grande) | «Tu flota» — `#inicio h1` | 1440 | 1 |
| 6,78:1 | 7,19:1 | 4,50:1 | `#FFFFFF al 88 %` | `#384C69` | 13,12 px, 400 | «Lunes a Viernes» — `#inicio div.stat-label` | 390 | 1 |
| 7,22:1 | 8,24:1 | 3,00:1 | `#FFFFFF` | `variable (mediana #29507D)` | 41,6 px, 900 (grande) | «Tu flota» — `#inicio h1` | 390 | 1 |
| 7,26:1 | 7,48:1 | 4,50:1 | `#FFFFFF` | `#2B568B` | 15,2 px, 700 | «Ver servicios» — `#inicio a.btn-outline` | 390 | 1 |
| 7,73:1 | 7,73:1 | 4,50:1 | `#FFFFFF` | `#3949AB` | 12,48 px, 700 | «FG» — `#resenas div.t-avatar` | 1440, 390 | 2 |
| 7,99:1 | 7,99:1 | 4,50:1 | `#124B8F` | `#F4F6F9` | 11 px, 500 | «Por qué elegirnos» — `#por-que-elegirnos span.eyebrow-label` | 1440, 390 | 4 |
| 7,99:1 | 7,99:1 | 3,00:1 | `#124B8F` | `#F4F6F9` | 32 px, 800 (grande) | «¿Por qué elegirnos?» — `#por-que-elegirnos h2.section-title` | 1440 | 2 |
| 7,99:1 | 7,99:1 | 3,00:1 | `#124B8F` | `#F4F6F9` | 26,4 px, 800 (grande) | «¿Por qué elegirnos?» — `#por-que-elegirnos h2.section-title` | 390 | 2 |
| 8,65:1 | 8,65:1 | 4,50:1 | `#124B8F` | `#FFFFFF` | 16,8 px, 800 | «Centro Mecánico DGP» — `nav div.navbar-logo-text` | 1440, 390 | 2 |
| 8,65:1 | 8,65:1 | 4,50:1 | `#124B8F` | `#FFFFFF` | 16,8 px, 700 | «Diagnóstico transparente» — `#por-que-elegirnos h3` | 1440, 390 | 8 |
| 8,65:1 | 8,65:1 | 4,50:1 | `#124B8F` | `#FFFFFF` | 11 px, 500 | «Nuestros servicios» — `#servicios span.eyebrow-label` | 1440, 390 | 2 |
| 8,65:1 | 8,65:1 | 3,00:1 | `#124B8F` | `#FFFFFF` | 32 px, 800 (grande) | «Nuestros Servicios» — `#servicios h2.section-title` | 1440 | 1 |
| 8,65:1 | 8,65:1 | 4,50:1 | `#FFFFFF` | `#124B8F` | 12,48 px, 600 | «Diagnóstico & Electrónica» — `#serviceTabs button.tab-btn.active` | 1440, 390 | 2 |
| 8,65:1 | 8,65:1 | 4,50:1 | `#FFFFFF` | `#124B8F` | 12,48 px, 700 | «DC» — `#resenas div.t-avatar` | 1440, 390 | 2 |
| 8,65:1 | 8,65:1 | 4,50:1 | `#124B8F` | `#FFFFFF` | 12,8 px, 700 | «Daniel C.» — `#resenas div.t-name` | 1440, 390 | 8 |
| 8,65:1 | 8,65:1 | 3,00:1 | `#FFFFFF` | `#124B8F` | 32 px, 800 (grande) | «¿Necesitás atención para tu flota?» — `#contacto h2` | 1440, 390 | 2 |
| 8,65:1 | 8,65:1 | 4,50:1 | `#FFFFFF` | `#124B8F` | 15,2 px, 500 | «+54 9 353 459-3187» — `#contacto strong` | 1440, 390 | 8 |
| 8,65:1 | 8,65:1 | 3,00:1 | `#124B8F` | `#FFFFFF` | 26,4 px, 800 (grande) | «Nuestros Servicios» — `#servicios h2.section-title` | 390 | 1 |
| 8,65:1 | 8,65:1 | 4,50:1 | `#FFFFFF` | `#124B8F` | 15,2 px, 700 | «Saltar al contenido» — `a.skip-link` | 1440 | 1 |
| 10,19:1 | 11,06:1 | 4,50:1 | `#FFFFFF al 88 %` | `#112C54` | 13,12 px, 400 | «Opiniones en Google» — `#inicio div.stat-label` | 390 | 1 |
| 10,42:1 | 10,68:1 | 4,50:1 | `#FFFFFF al 88 %` | `#122F57` | 13,12 px, 400 | «Años de experiencia del equipo» — `#inicio div.stat-label` | 1440 | 2 |
| 10,64:1 | 10,66:1 | 4,50:1 | `#FFFFFF al 88 %` | `#132F57` | 13,12 px, 400 | «Propio de repuestos» — `#inicio div.stat-label` | 1440 | 1 |
| 10,81:1 | 11,06:1 | 4,50:1 | `#FFFFFF al 88 %` | `#132C53` | 13,12 px, 400 | «Lunes a Viernes» — `#inicio div.stat-label` | 1440 | 1 |
| 10,90:1 | 11,05:1 | 4,50:1 | `#FFFFFF al 88 %` | `#0E2C56` | 13,12 px, 400 | «Años de experiencia del equipo» — `#inicio div.stat-label` | 390 | 1 |
| 11,56:1 | 11,56:1 | 3,00:1 | `#FFFFFF` | `#0D3870` | 32 px, 800 (grande) | «Nuestro proceso de trabajo» — `#contenido-principal h2.section-title` | 1440 | 1 |
| 11,56:1 | 11,56:1 | 4,50:1 | `#FFFFFF` | `#0D3870` | 14,88 px, 700 | «01. Recepción e inspección» — `#contenido-principal h3.step-title` | 1440, 390 | 10 |
| 11,56:1 | 11,56:1 | 4,50:1 | `#FFFFFF` | `#0D3870` | 16 px, 800 | «Centro Mecánico DGP» — `footer div.footer-brand-name` | 1440, 390 | 2 |
| 11,56:1 | 11,56:1 | 3,00:1 | `#FFFFFF` | `#0D3870` | 26,4 px, 800 (grande) | «Nuestro proceso de trabajo» — `#contenido-principal h2.section-title` | 390 | 1 |
| 13,14:1 | 13,14:1 | 4,50:1 | `#2D2D2D` | `#FFF8F8` | 14 px, 700 | «Casa de Repuestos» — `#tab-repuestos h3.service-card-title` | 1440, 390 | 2 |
| 13,77:1 | 13,77:1 | 4,50:1 | `#2D2D2D` | `#FFFFFF` | 13,6 px, 600 | «Inicio» — `nav a` | 1440 | 5 |
| 13,77:1 | 13,77:1 | 4,50:1 | `#2D2D2D` | `#FFFFFF` | 14 px, 700 | «Diagnóstico OBD» — `#tab-diagnostico h3.service-card-title` | 1440, 390 | 35 |
| 13,77:1 | 13,77:1 | 3,00:1 | `#2D2D2D` | `#FFFFFF` | 27,2 px, 900 (grande) | «4,9» — `#resenas span.google-score-num` | 1440, 390 | 2 |
| 13,77:1 | 13,77:1 | 4,50:1 | `#2D2D2D` | `#FFFFFF` | 14,08 px, 700 | «Ver todas las opiniones en Google» — `#resenas a.btn-google-review` | 1440, 390 | 2 |
| 13,77:1 | 13,77:1 | 4,50:1 | `#2D2D2D` | `#FFFFFF` | 14,4 px, 600 | «Inicio» — `#navMobile a` | 390 | 6 |
