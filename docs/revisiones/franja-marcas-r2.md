# Revisión: pedido directo de Ramiro (P-073), franja de marcas — vuelta 2

Fecha: 2026-10-08.

**Veredicto: APROBADO CON OBSERVACIONES**

Los dos bloqueantes de la vuelta 1 están corregidos y los volví a medir: la cinta ya se puede usar con teclado y las marcas principales quedan en el centro de la página. Las cuatro menores de la vuelta 1 (hallazgos 3 a 6) también están resueltas. Quedan solo observaciones menores, para que las vea Ramiro.

## Hallazgos (todos MENOR)

1. El contorno de foco de la cinta contrasta 2,20:1 contra el fondo de la franja: verde #7DB919 sobre #f4f6f9. La pauta WCAG 1.4.11 pide 3:1 para indicadores que no son texto.
   Dónde: public/assets/css/sitio.css:36-40 (`:focus-visible` global, que ya existía), aplicado ahora a #cintaMarcas.
   Regla: CLAUDE.md §6 solo pide "foco visible", y lo es: en las capturas a 1440 y 390 se ve el contorno entero, sin recortes. No viola ninguna regla escrita. Es el estilo global de todo el sitio, no algo que introdujo este cambio.

2. El comentario del CSS sigue diciendo que la cinta "se corre la mitad de su ancho". Eso describía la animación CSS anterior; ahora el JS la mueve tomando la posición módulo el ancho de un grupo.
   Dónde: public/assets/css/sitio.css:791. Es solo un comentario: el sitio no cambia.

3. P-073 está como "Estado: respondida", pero tiene tres decisiones propias "a revisar por Ramiro". Eso se ajusta a la convención de §7, pero la respuesta a P-049 que deja este mismo cambio dice que se propone antes de actuar. Las decisiones 1 y 2 son de forma. La 3 surgió de la vuelta 1 de revisión. Conviene que Ramiro las vea.
   Además, el aviso de WCAG 2.2.2 dice "en el celular no hay forma de detenerla de manera permanente". En escritorio tampoco la hay: el mouse y el foco solo la frenan mientras están encima. El registro está bien en lo demás: velocidad, foco, revisión y centrado coinciden con lo que medí.

4. Para el commit: entra docs/revisiones/franja-marcas-r1.md, que hoy está sin seguimiento. DESIGN.md y .claude/skills/ quedan afuera, como dijo el coordinador.

## No verificado

- Rueda o trackpad horizontal físico: Puppeteer no emula bien deltaX. El código es el mismo que en la vuelta 1, más la guarda de movimiento reducido.
- Lector de pantalla real: no comprobé cómo se anuncia role="group" con aria-labelledby.

## Verificaciones corridas

Servidor http://localhost:3000; scripts en el scratchpad, fuera del repo; la franja se lleva a la vista con desplazamiento instantáneo y se espera antes de medir.

- Diff: index.html solo agrega id="tambienAtendemos", role="group" y aria-labelledby, y quita el botón. No hay texto visible nuevo. El rótulo asociado es "También atendemos", el texto que ya estaba.
- Restos del botón en CSS, JS y HTML: ninguno. El gap: 8px de .brands-cinta está quitado.
- Centrado: barrido de 320 a 1920 px de a 1 px, midiendo el centro de los logos contra el centro de la página. Hay 0 anchos con una diferencia de más de 0,5 px.
- Rótulo y logos: en el mismo barrido, 0 anchos donde los logos queden a menos de 8 px del rótulo "Especialistas en".
- Desborde de 320 a 1920 px de a 1 px, con cada una de las 5 pestañas activa y con el menú móvil abierto: 0 desbordes.
- Teclado, a 1440 y a 390:
  - El foco llega a la cinta con Tab (pulsación 16), con tabindex="0".
  - Con :focus-visible queda quieta: 0 px en 1,5 s.
  - Al sacarle el foco retoma: 44,4 px en 1,5 s.
  - ArrowRight la corre 80 px. Dos ArrowLeft dan 953, que es −160 con envoltura sobre 1113 px.
  - Las flechas no desplazan la página en horizontal (scrollX 0).
- Clic y arrastre con mouse: posición inicial 1060,79. +200 px da 860,79. −400 px da 147,79 (1260,79 módulo 1113). Después del clic la cinta tiene foco pero no :focus-visible, y sigue avanzando: 44,4 px en 1,5 s.
- Táctil a 390: 120 px a la derecha da el valor esperado con envoltura (−1016,9). Queda quieta 1 s y retoma. La página no se desplaza en vertical (0).
- Velocidad: 29,2 px/s medida durante 4 s. Lo esperado era 1113/38 = 29,3.
- Movimiento reducido con la página abierta: al activarlo se quita el tabindex, el transform queda en none y la cinta queda quieta (0 px en 1 s). Al desactivarlo vuelve a moverse (46,3 px en 1,5 s).
- Movimiento reducido desde la carga: sin tabindex, transform none, copia oculta.
- Sin JavaScript: sin tabindex, copia con display:none.
- Errores de consola o pageerror: 0. Respuestas con código 400 o más: 0. h1: 1.
- preguntas-abiertas: el separador duplicado está quitado. P-073 está reescrita y coincide con lo medido, salvo lo del hallazgo 3. P-049 y P-071 siguen como en la vuelta 1.
- docs/revisiones/franja-marcas-r1.md existe y tiene el veredicto RECHAZADO de la vuelta 1.

## Después de esta vuelta (ejecutor)

Se corrigieron las observaciones 2 (comentario del CSS) y 3 (aviso de WCAG 2.2.2 en P-073, que ahora dice que tampoco se puede detener de forma permanente en la computadora). La 1 es el estilo de foco global del sitio y no se tocó.
