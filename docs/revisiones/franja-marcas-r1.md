# Revisión: pedido directo de Ramiro (P-073), franja de marcas — vuelta 1

Cambio sin commitear sobre 8214faf (rama rediseno-visual). Fecha: 2026-10-08.

**Veredicto: RECHAZADO**

Hay dos hallazgos bloqueantes. La parte mecánica funciona bien: el arrastre con mouse y con el dedo, la rueda horizontal, la pausa con el mouse encima, el funcionamiento sin JavaScript, el movimiento reducido y el barrido de desborde. Lo que falla es la accesibilidad por teclado y el centrado.

## Hallazgos

1. **[BLOQUEANTE] La cinta se arrastra con el mouse pero no se puede mover ni frenar con el teclado.**
   Dónde: public/assets/js/sitio.js, bloque de `cintaMarcas` (los manejadores de `focusin` y `focusout` sobre `cinta`), y public/index.html:526-557.
   Regla: CLAUDE.md §6 ("Todo control interactivo alcanzable y operable por teclado").
   Evidencia: dentro de #cintaMarcas hay 0 elementos que puedan recibir foco (no hay a, button, [tabindex] ni input). Recorrí la página con 200 pulsaciones de Tab y el foco nunca entró en #cintaMarcas. Entonces la pausa por foco nunca se activa, y quien usa teclado no tiene ninguna forma de detener la cinta ni de moverla. La cinta muestra cursor `grab`, o sea que se presenta como interactiva. Sacar el botón lo pidió Ramiro, pero el pedido dice "si el usuario quiere mover la barra, que pueda", y quien usa teclado no puede.

2. **[BLOQUEANTE] En escritorio, las marcas principales no quedan centradas en la página, que es lo que pidió Ramiro.** El ejecutor eligió otra interpretación, la aplicó sin consultar y cerró la entrada como "respondida".
   Dónde: public/assets/css/sitio.css:831 (`justify-content: center` en `.brands-foco`), y docs/preguntas-abiertas.md, P-073, "Estado: respondida" con la decisión 3 "a revisar por Ramiro".
   Regla: CLAUDE.md §9 (elegir entre dos opciones que nadie dictó es un hueco, y no se declara hecha una tarea con un hueco abierto). También choca con la respuesta a P-049 que este mismo cambio deja registrada ("las decisiones … se proponen antes de ejecutarlas").
   Evidencia: medí el centro de los tres logos contra el centro de la página.

   | Ancho | Centro de los logos | Centro de la página | Diferencia |
   |---|---|---|---|
   | 1440 | 838,9 | 720 | 119 px |
   | 1920 | 1078,9 | 960 | 119 px |
   | 1024 | 630,9 | 512 | 119 px |
   | 390 | 195 | 195 | coinciden |

   Pedido textual: "las marcas principales quiero que las centres en la pagina".

3. **[MENOR] P-073 dice cosas que no son ciertas.**
   Dónde: docs/preguntas-abiertas.md, P-073, en "Qué se hizo", en la decisión propia 1 y en el aviso de accesibilidad.
   - Dice que la cinta "se frena con el mouse o el foco encima". Lo del foco es imposible: ver el hallazgo 1.
   - Dice "32 px/s (la misma velocidad que tenía)". Antes recorría un grupo de 1113 px en 38 s, o sea 29,3 px/s. La nueva es un 9 % más rápida.
   Regla: el registro tiene que ser fiel (pedido de esta revisión; CLAUDE.md §9).

4. **[MENOR] Quedó un resto de CSS del botón.**
   Dónde: public/assets/css/sitio.css:836-842. `.brands-cinta` sigue con `display:flex; gap:8px`, que servían para separar la ventana del botón. Hoy la cinta tiene un solo hijo, así que no se ve ningún efecto. Del botón no queda nada más: busqué `brands-pausa`, `pausada`, `icono-pausa`, `icono-seguir`, `@keyframes cinta` y `animation: cinta` en public/, docs/ (sin contar revisiones/) y tools/, y no aparece ninguno. En la página, `.brands-pausa` cuenta 0 elementos.

5. **[MENOR]** La preferencia de movimiento reducido solo se lee al cargar la página (`menosMovimiento`). Si el usuario la activa con la página abierta, el CSS pasa la cinta a filas pero no se detiene el bucle de JS que va cambiando el `transform`. No lo medí; sale de leer el código.

6. **[MENOR]** docs/preguntas-abiertas.md: antes de P-073 quedó un separador duplicado ("---" en blanco "---").

7. **[MENOR, ajeno al cambio]** Hay archivos sin seguimiento (DESIGN.md, .claude/skills/) que no forman parte de esta tarea. No hay que meterlos en el commit.

8. **[MENOR, ya existía]** La palabra "agro" aparece en public/flotas.html:121 ("sector agropecuario"), :171 ("Agroindustria") y :219 ("Agropecuaria"). Este cambio no la toca. Es un pedido directo sin spec, así que no evalué si hay autorización.

## No verificado

- Dispositivos táctiles reales y trackpad físico. Probé arrastre táctil emulado con Puppeteer, pero no la rueda horizontal: el dato de 120 px es del ejecutor.
- La velocidad exacta en un navegador con ventana. En modo headless medí unos 27 px/s (81,5 px en 3,0 s), probablemente por cómo ese modo reparte los cuadros. El valor configurado en el código es 32.
- Lector de pantalla real.

## Verificaciones corridas

Servidor en http://localhost:3000, respondió 200; scripts temporales en el scratchpad, fuera del repo.

- git diff contra HEAD 8214faf: solo se tocan los 4 archivos declarados. index.html solo pierde el botón; no se agregó ningún texto visible. La revisión del pedido y de la regla 2 dio 0 textos nuevos.
- Restos del botón en HTML, CSS y JS: ninguno (ver hallazgo 4).
- Errores de JS en consola o pageerror (a 1440, 1920, 1024 y 390): 0. Respuestas con código 400 o más: 0.
- `<h1>`: 1. JSON-LD: `JSON.parse` sin errores, sin AggregateRating ni Review.
- Barrido de desborde de 320 a 1920 px, de a 1 px, con cada una de las 5 pestañas de servicios activa: 0 desbordes en las 5.
- Mismo barrido con el menú móvil abierto donde existe el botón: 0 desbordes.
- Arrastre con mouse a 1440: posición inicial 17,09, 300 px a la derecha da −830,09, y 500 px a la izquierda da −217,09. Coincide con el cálculo con envoltura sobre 1113 px.
- Arrastre táctil a 390: 100 px a la izquierda mueven la cinta unos 101 px. Queda quieta 1 s y retoma. La página no se desplazó en vertical (0).
- Mouse encima: 0 px en 1,5 s. Fuera de pantalla: 0 px en 1,5 s, o sea que el IntersectionObserver la frena.
- Sin JavaScript: no se pone la clase `js`, la copia queda con display:none, la pista en filas, cursor auto y sin desborde.
- Con prefers-reduced-motion: transform none, copia oculta, cursor auto, touch-action auto.
- Rendimiento: no hay recursos nuevos. La animación arranca solo cuando la cinta entra en pantalla y no se agregó nada que bloquee el renderizado. sitio.js no cambió de lugar en el HTML.
- Contraste: el cambio no toca ningún texto. Sin acción.
- docs/coordenadas-localidades-propuesta.md: no existe (borrado, como se declaró).
- preguntas-abiertas: P-049 queda "respondida" con la respuesta de Ramiro y movida a Respondidas. P-053 sigue abierta (solo cambió de lugar en el diff). A P-071 se le agregó la respuesta sobre teléfono y horario, que coincide con el pedido. P-073 tiene las imprecisiones de los hallazgos 2 y 3.
- Afirmaciones genéricas prohibidas: busqué en public/ toda la lista de datos-verificados.md, más "agro", "agropecuari", "inmediat" y "flota no se detiene". Solo aparecen las 3 de "agro", que ya existían (hallazgo 8). En las líneas que agrega el diff: 0.
- No hay commit todavía, así que no se evalúa el mensaje.
