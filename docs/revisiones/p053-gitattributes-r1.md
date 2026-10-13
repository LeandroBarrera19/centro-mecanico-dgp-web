# Revisión: P-053 (`.gitattributes`) y respuesta de los aria-label (P-071)

**Veredicto: APROBADO CON OBSERVACIONES**

Sin bloqueantes.

## Hallazgos
1. [MENOR] La nota decía "ningún archivo del repositorio" tiene esas
   extensiones; es cierto para los versionados, pero `Fotos/` (sin versionar)
   tiene `.jpeg` y `.jfif`. → Corregido: dice "versionado" y explica que
   `*.jpeg` y `*.jfif` cubren esos originales.
2. [MENOR, informativo] Con extensiones en mayúscula (`.JPEG`) el patrón
   solo coincide porque Windows ignora mayúsculas. CLAUDE.md §3 exige
   minúsculas: sin efecto práctico.

## Verificaciones corridas por el revisor
- Renormalización sobre una copia del índice: idéntica en los 216 archivos.
- `git ls-files --eol`: ningún CRLF; todos los binarios versionados con el
  atributo binario.
- `git check-attr`: las 15 extensiones binarias dan binary set; html, svg y
  md siguen en text=auto, eol=lf.
- `preguntas-abiertas.md`: 79 entradas antes y después; P-053 al final de
  Respondidas con su historial intacto; respuesta de P-071 bien anotada.
- CLAUDE.md §7 y §9: decisión propia declarada como tal.
