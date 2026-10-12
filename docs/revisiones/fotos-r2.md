# Revisión P-075 · Fotos F-01, F-02, F-03, F-04 y F-08 — segunda vuelta

**Veredicto: APROBADO CON OBSERVACIONES** (2026-10-12). El bloqueante de la primera vuelta está resuelto: el horario del cartel de F-01 no se lee en ninguno de los 12 archivos publicados.

## Hallazgos
1. [MENOR, se ve en pantalla] La zona `[770, 681, 66, 12]` cortaba la base de "REPUESTOS" en el cartel de F-01 (se leía "RFPUESTOS"), y las zonas dejan bandas grises que se notan. *Corregido después de la revisión: la zona pasó a `[772, 685, 62, 11]` y las dos palabras quedan enteras.*
2. [MENOR] La fila F-01 del brief y el comentario del hero no mencionaban los horarios tapados. *Corregido.*
3. [MENOR] El "No verificado" de la primera vuelta (adónde lleva el QR de F-03 y de dónde sale la foto del parasol) no estaba en P-078. *Agregado como punto 6.*
4. [MENOR, proceso] `docs/datos-verificados.md` modificado por P-076: no commitearlo con esta tarea. P-076 no tiene entrada en preguntas-abiertas.md y no existe P-077 (la numeración salta a P-078). *P-076 y P-077 corresponden a las tareas que siguen (sectores de flotas y repuestos).*
5. [MENOR] Las cifras de peso de P-075 (325 / 371 / 422 KB) no coincidían con las del revisor (317 / 362 / 403 KB). *Actualizadas.*

Menores de la primera vuelta: formato de P-075 y P-078 corregido; P-007 con nota nueva; 7 archivos hero-bg-* (confirmado con `ls`); calidad mínima, alt, "110" y borrado planteados en P-078; `sizes` corregido (a 1440 px baja la de 1280).

## No verificado
- Si una herramienta forense podría reconstruir el horario con los restos de borde. A simple vista y ampliado 4x no se lee nada.
- Adónde lleva el QR de F-03 y de dónde sale la foto del parasol.

## Verificaciones corridas
- Horario de F-01: zona del cartel en los 12 archivos (4 anchos × 3 formatos) contra el original; en los publicados no se lee ningún horario.
- Las 11 zonas de TAPAR siguen tapadas (JPG completo, AVIF 1280, WebP 800).
- Dimensiones de los JPG coinciden con width/height; sin EXIF ni XMP; todas las rutas existen.
- Hero servido: 1440×1, 1920×1, 1000×2 y 390×3 → f-01-1-1280.avif.
- Peso de la home sin caché: 317 KB (390×1), 362 KB (390×3), 333 KB (360×2), 403 KB (1440). Ningún hero-bg-* descargado.
- Desborde 320–1920 px de a 1 px: index 9606 mediciones (5 pestañas y menú abierto), flotas 3202, repuestos 3202; 0 desbordes.
- Sin errores de JS ni respuestas ≥ 400. Un h1 por página, sin saltos; JSON-LD válido sin AggregateRating ni Review; sin img sin alt; sin target=_blank sin noopener.
- Afirmaciones prohibidas: solo "sector agropecuario", "Agroindustria" y "Agropecuaria" en flotas.html, anteriores y autorizadas por §12 y §13.
- Quedan intactos los 9 TODO_IMAGEN R-*; ningún TODO_DATO nuevo.
