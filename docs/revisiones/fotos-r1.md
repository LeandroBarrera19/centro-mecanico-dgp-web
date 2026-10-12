# Revisión P-075 · Fotos F-01, F-02, F-03, F-04 y F-08 — primera vuelta

**Veredicto: RECHAZADO** (2026-10-12).

## Hallazgos
1. **[BLOQUEANTE]** F-01 publica un horario distinto del de `datos-verificados.md` §3, y no está anotado como hueco. En el cartel del frente (archivos `f-01-1-1402.*` y `f-01-1-1280.*`, zona x≈700–930, y≈615–735 del de 1402 px) se lee "RECEPCIÓN · Lunes a Viernes 7:30 a 18:00 hs" y "REPUESTOS · Lunes a Viernes 8:00 a 18:00 hs". En pantalla queda en 4–5 px, pero quien abre el archivo lo lee. Reglas: CLAUDE.md §2 y §9.
2. [MENOR] P-075 no sigue el formato de `preguntas-abiertas.md`: estado "abierta" debajo de "## Respondidas", y mezcla cuatro decisiones propias con dos preguntas.
3. [MENOR] P-007 no se actualizó: sigue diciendo que el hero usa la foto bloqueada.
4. [MENOR] P-075 dice "9 archivos" `hero-bg-*`; son 7.
5. [MENOR] Las 5 fotos están debajo de la calidad mínima del brief (1402, 1448, 1122, 1448 y 1448 px), y no se le pidieron los originales a Ramiro.
6. [MENOR] Cuatro textos alternativos nuevos (texto de cara al usuario): declarados como decisión propia, quedan para Ramiro.
7. [MENOR] F-04 deja a la vista el número "110" en la luneta de la camioneta con el logo de SENASA tapado; que Ramiro decida si es una pista.
8. [MENOR, rendimiento] El hero declara `sizes="100vw"` y desde 901 px ocupa el 60 %: a 1440 px baja la de 1402 px para un hueco de 864 px.
9. [MENOR, proceso] `docs/datos-verificados.md` está modificado por otra tarea (P-076): no commitearlo con esta.

## No verificado
- A dónde lleva el QR de F-03: jsQR no lo decodifica en ninguna variante, lo que no prueba que ningún lector lo lea. Si se puede escanear, que Ramiro confirme que no abre la libreta de un cliente real.
- De dónde sale la foto del parasol de F-03: el SVG trae dos PNG sin metadatos; no se puede comprobar con herramientas.
- Contraste: la tarea no tocó colores de texto; el texto del inicio queda sobre el panel azul sólido.

## Verificaciones corridas
- Los md5 de `Fotos/*` y de `assets-src/fotos/f-0{1,2,3,4,8}-original-1.*` coinciden. El SVG no tiene referencias externas.
- Las 9 zonas de `TAPAR` quedan tapadas en los 3 formatos × 4 anchos. Revisado también fuera de `TAPAR` (motos, laterales, delanteros): nada legible.
- F-03: "CLIENTE DE EJEMPLO", patente "EJEMPLO", leyenda de datos ficticios; dirección, WhatsApp y correo coinciden con §2, y "10.000 km o 12 meses" con §14.
- Sin caras: técnico de espaldas en F-02, persona lejana de espaldas en F-08.
- Las 57 rutas `assets/fotos/f-0*` existen; los 92 descriptores `w` coinciden con el ancho real; width/height coinciden con el JPG de respaldo.
- alt en las 7 imágenes (F-01 `alt=""` con `aria-hidden`). Sin lazy: hero, F-08 en flotas y F-04 en repuestos, arriba del pliegue. Con lazy: el resto, debajo del pliegue.
- Peso de la home sin caché: 317 KB a 390 px, 362 KB a 390 px densidad 3, 333 KB a 360 px densidad 2, 412 KB a 1440 px. Una sola versión del hero (el preload coincide con el `<picture>`).
- Desborde de 320 a 1920 px de a 1 px: index 10187 mediciones (5 pestañas y menú abierto), flotas 2182, repuestos 2182; 0 desbordes.
- Sin errores de JS ni respuestas ≥ 400. Un `<h1>` por página, sin saltos. JSON-LD de la home válido, sin AggregateRating ni Review.
- §5: sin PNG de fotos; todas en `<picture>` con AVIF, WebP y JPG en 3 o más tamaños; sin EXIF ni XMP. F-07 sin cambios en git.
