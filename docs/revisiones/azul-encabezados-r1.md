# Revisión: mismo azul en el encabezado de las tres páginas (P-082)

**Veredicto: APROBADO CON OBSERVACIONES**

Sin bloqueantes.

## Hallazgos
1. [MENOR] Con el panel opaco, en el inicio hasta 900 px la foto F-01 no se
   ve pero se bajaba igual (12 685 B a densidad 1, 58 945 B a densidad 3).
   → Corregido: `<source media="(max-width: 900px)">` con un píxel vacío y
   precarga con `media="(min-width: 901px)"`. Medido después: a 390 (dpr 1
   y 3) y 900 px no hay pedidos de F-01; a 901 y 1440 px sí, como antes.
2. [MENOR] `pagina-hero--oscuro` queda en flotas.html sin regla CSS.
   Declarado en P-082.

## Verificaciones corridas por el revisor
- Color calculado #123e6b, opacidad 1, en el panel del inicio y en el
  encabezado de flotas y repuestos, a 1440 y 390 px. Muestreo de píxeles:
  100 % #123e6b dentro del panel en las tres páginas y los dos anchos.
- Contraste: inicio 499 textos y flotas 417 sin fallas; repuestos 173 con 1
  (el falso positivo de "Próximamente", P-077). Textos de los encabezados
  entre 8,82:1 y 10,90:1.
- Desborde de 320 a 1920 px de a 1 px: inicio (5 pestañas y menú abierto),
  flotas y repuestos (menú cerrado y abierto): 0.
- Franja verde y corte diagonal del inicio sin cambios de forma.
- Un solo h1 por página; 0 errores de JS; 0 respuestas ≥ 400.
