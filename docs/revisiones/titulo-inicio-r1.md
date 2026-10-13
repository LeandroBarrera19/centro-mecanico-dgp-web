# Revisión: título del inicio (P-080)

**Veredicto: APROBADO CON OBSERVACIONES**

Sin bloqueantes.

## Hallazgos
1. [MENOR] `docs/spec-m3-home.md` (Tarea 3) seguía diciendo que el h1 es
   "Taller mecánico en Villa María". → Corregido: la tabla dice el h1 nuevo y
   remite a P-080.
2. [MENOR] La cita de Ramiro en P-080 tenía tildes agregadas. → Corregido:
   ahora es textual. Además "de 18 a 28 px" pasó a "de 18,4 a 28 px".

## Verificaciones corridas por el revisor
- Nombre igual a datos-verificados.md:16 ("Centro Mecánico DGP").
- Tamaños: la marca mide 73,6 px a 1440 (igual que el h1 anterior) y 36,8 px
  a 390; la bajada mide 28 px y 18,4 px.
- Un solo h1; jerarquía h1–h6 sin saltos.
- Contraste (`tools/auditar-contraste.mjs`): 499 textos, 0 por debajo del
  mínimo. Bajada 8,80:1 a 9,35:1; marca 10,07:1 a 10,74:1.
- Desborde de 320 a 1920 px de a 1 px, en las 5 pestañas de servicios y con
  el menú móvil abierto: 0.
- 0 errores de JS, 0 respuestas ≥ 400.
- `<title>`, og y JSON-LD sin tocar.

Barrido propio del ejecutor (index, flotas y repuestos; normal, menú abierto
y paneles abiertos; de 320 a 1920 px de a 1 px): 0 desbordes.
