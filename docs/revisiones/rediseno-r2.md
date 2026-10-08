# Revisión del rediseño visual — vuelta 2

- **Rango:** commit 0b02b4a (contexto d022745..HEAD).
- **Fecha:** 2026-10-08. Revisor: subagente `revisor`.
- **Veredicto: RECHAZADO** (2 bloqueantes nuevos, del mapa).
- Los 3 bloqueantes de la vuelta 1 quedaron **resueltos**.

## Bloqueantes
1. El mapa publicaba textos que no están en `datos-verificados.md` ("RN 9",
   "RN 158", "Río Tercero"), registrados como decisión propia y no
   consultados (CLAUDE.md §2, §7, §9). "Río Tercero" además es el nombre de
   una ciudad que no figura en §11 y puede leerse como localidad atendida.
2. Los carteles nuevos tapaban puntos de localidades (Oliva, Dalmacio Vélez,
   La Playosa, Morrison) y había nombres que se pisaban (Ballesteros con
   Bell Ville, entre otros). Regresión respecto de d022745, no declarada.

## Menores
3. La redacción de la atribución de OpenStreetMap la decidió el ejecutor.
4. La tabla "Estado" del brief no incluía los 9 huecos R-*.
5. Proceso: sin informe de la vuelta 1 en `docs/revisiones/`; d022745
   commiteado antes de revisar; 0b02b4a mezcla un pedido nuevo con las
   correcciones.
6. La foto provisoria F-01 sigue publicada (decide Ramiro).

## Qué se hizo después (sin tercera vuelta: CLAUDE.md §7 permite dos)
Ver P-072. Por la regla de §7, estas correcciones **no se commitean** hasta
que Ramiro lo indique.
