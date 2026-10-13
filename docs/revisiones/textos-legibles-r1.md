# Revisión: textos de descripción más grandes y más oscuros (P-083), vuelta 1

**Veredicto: RECHAZADO**

## Hallazgos
1. [BLOQUEANTE] `.t-text` tenía `-webkit-line-clamp: 6`: con la letra a
   16 px las reseñas se cortaban con "…" de 481 a 616 px (antes, de 481 a
   563). → Corregido en la vuelta 2: se sacó el límite de líneas.
2. [MENOR] P-083 no listaba todos los tamaños cambiados ("Más de 130
   opiniones", encabezados de flotas y repuestos, contacto, bloque de flotas,
   línea final del pie, color de la lista de localidades). → Agregados.
3. [MENOR] Textos sin cambios no declarados (condiciones de flotas, chips
   de modelo, "Villa María, Córdoba" del logo, atribución del mapa). →
   Agregados a "No se tocaron".

## Verificaciones corridas
- Contraste (`tools/auditar-contraste.mjs`): index 499 y flotas 417 textos
  sin fallas; repuestos 1 (falso positivo conocido de "Próximamente", P-077).
  #1a1a1a: 17,40:1 sobre blanco; pie 7,20–7,97:1.
- Tamaños declarados: coinciden con los medidos.
- Títulos y subtítulos sin cambios (comparación elemento por elemento).
- Desborde en 31 anchos de muestra, 3 páginas, menú y paneles: 0.
- Peso del inicio en celular: 306,5 KB.
