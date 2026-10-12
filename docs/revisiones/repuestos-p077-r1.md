# Revisión P-077 · repuestos: "Próximamente" y Frenos / Suspensión separados

**Veredicto: APROBADO CON OBSERVACIONES** (2026-10-12). Sin hallazgos bloqueantes.

## Hallazgos
1. [MENOR] Se agregaron 3 productos visibles (Suspensión · Toyota Hilux / VW Amarok / Ford Ranger) que Ramiro no pidió explícitamente. Declarado como decisión propia en P-077 con la salida de quitarlos; los nombres salen de piezas aprobadas (rubro · modelo). Ramiro tiene que confirmarlo.
2. [MENOR] `auditar-contraste.mjs` marca "Próximamente" en 1,18:1 sobre repuestos.html: falso positivo (mide el rectángulo del texto rotado, con las rayas del hueco). Medido por píxel en los productos 1, 6 y 12, a 390 y 1440 px: los 1283 píxeles de letra caen sobre rgb(18,75,143); contraste real 8,65:1.
3. [MENOR] docs/textos-propuestos-paginas.md:25, :27 y docs/spec-m3-home.md:122, :163 siguen diciendo "Frenos & Suspensión", 3 categorías o 9 productos.
4. [MENOR] "Próximamente" implica publicar con huecos visibles, contra la regla general del brief (líneas 24-26). Decisión de Ramiro.

## No verificado
- Operar la pista de productos con las flechas del teclado.
- Aspecto en navegadores distintos de Chromium sin ventana.

## Verificaciones corridas
- Textos nuevos contra `git show HEAD`: solo "Frenos", "Suspensión", las dos descripciones (h1+' '+h2 === la anterior), "04", "Próximamente", "Frenos ·", "Suspensión ·" y 01/12…12/12. Sin atributos, cifras, URL ni teléfonos nuevos.
- 12 productos, 12 `span.proximamente`, 12 TODO_IMAGEN, 12 TODO_DATO, 12 data-slot (incluidos los R-*-suspension). Brief actualizado. Sin "Frenos & Suspensión" en public/.
- Afirmaciones prohibidas: solo las 3 de flotas.html, anteriores y autorizadas.
- Encabezados: repuestos 1 h1, 23 encabezados sin saltos; index 1 h1, 36 sin saltos.
- Desborde 320–1920 px de a 1 px: repuestos (inicial y menú abierto) e index (pestaña Repuestos activa, con y sin menú): ninguno.
- Contraste: index 0 fallas; repuestos 1, el falso positivo del hallazgo 2.
- Deslizante con 12 ítems a 390, 1000, 1440 y 1920 px: flechas se activan y desactivan bien, llega al final y vuelve a 0.
- Faja: las 4 esquinas del texto dentro del hueco a 320, 390, 1000 y 1440 px; Montserrat 800, 15,2 px, "PRÓXIMAMENTE".
- Categorías: 4 columnas a 1440, 2 a 1000, 1 a 390. Pestaña de la home: 3 + 1 a 1440, 1 columna a 390.
- 0 errores de JS, 0 respuestas ≥ 400.
