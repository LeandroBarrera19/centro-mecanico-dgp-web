# Revisión del rediseño visual — vuelta 1

- **Rango:** f59a765..d022745 (rama `rediseno-visual`, 8 commits).
- **Fecha:** 2026-10-07. Revisor: subagente `revisor`.
- **Veredicto: RECHAZADO** (3 bloqueantes).

## Bloqueantes
1. Hueco F-08 con proporción 3/2; el brief pide 16:9 (`public/flotas.html:103`).
2. `aria-label` "Productos anteriores" / "Productos siguientes" sin registrar
   (`public/repuestos.html:152,155`).
3. Archivos de F-07 con mayúscula en el nombre (CLAUDE.md §3); el choque con
   el brief no estaba anotado.

## Menores
4. La foto F-07-2 muestra en el cartel "Lun a Vie 08:00-17:00" y otro
   teléfono (§2 y §3 dicen 17:30 y +54 9 353 459-3187). Ilegible al tamaño
   publicado.
5. F-07-1 y F-07-3 publicadas sin uso.
6. Numeraciones visuales nuevas sin registrar.
7. Flotas y Repuestos repiten el bloque de contacto completo (declarado en
   P-070).
8. Los bloques de flotas y repuestos de la home no enlazan a sus páginas.
9. El título animaba desde opacidad 0 (CLAUDE.md §5).
10. Documentación desactualizada (textos propuestos, brief sin huecos R-*,
    `coordenadas-localidades-propuesta.md` sin seguimiento).
11. Foto provisoria F-01 publicada sin marcador.

## Verificado sin fallas
Datos contra `datos-verificados.md` (casos §13, cifras §12, contacto §2/§3/§5/§8),
textos aprobados carácter por carácter, "usted" en Flotas, afirmaciones
prohibidas, 42 localidades del mapa, SEO §4, accesibilidad §6, movimiento
reducido, fotos, desborde (0), contraste (0), errores (0), peso (< 500 KB).

Correcciones: commit `0b02b4a` (P-071).
