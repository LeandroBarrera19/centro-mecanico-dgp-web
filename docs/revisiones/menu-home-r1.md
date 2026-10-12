# Revisión P-074 · enlaces a la home desde flotas y repuestos

**Veredicto: APROBADO CON OBSERVACIONES** (2026-10-12). Sin hallazgos bloqueantes.

## Hallazgos
1. [MENOR] Los enlaces internos llevan a la home como `index.html`, y el canonical de la home es la raíz del dominio. No viola ninguna regla (CLAUDE.md §4 se cumple: `index.html` declara `https://centromecanicodgp.com.ar/`). Google ve dos URL para la misma página y las reconcilia con el canonical. Queda para que Ramiro lo vea: el cambio se hizo para que los enlaces funcionen abriendo el archivo con doble clic (`file://`).

## No verificado
- Barrido de desborde y contraste: no se corrieron. El cambio toca solo el valor de `href`; se comprobó que no cambió ningún otro carácter.
- JSON-LD y encabezados: el diff no los toca.

## Verificaciones corridas
1. `git diff --stat`: solo cambian docs/preguntas-abiertas.md, public/flotas.html (21 líneas) y public/repuestos.html (21 líneas).
2. HEAD con `./#` → `index.html#`, comparado con la copia de trabajo: idéntico en las dos páginas.
3. `grep` de `href="./` y `./#` en public/: sin resultados.
4. 21 enlaces `index.html#` por página, igual que lo anotado en P-074.
5. Las 9 anclas de destino existen una sola vez como `id` en index.html.
6. Las pestañas de servicios leen solo `location.hash` (sitio.js:79-85): el prefijo no las afecta.
7. curl a localhost:3000: `/`, index.html, flotas.html y repuestos.html → 200.
8. Puppeteer, cada enlace distinto `index.html#…` por `file://` y por http: 36 de 36 llegan a destino; sin errores de JS ni respuestas 4xx/5xx.
9. P-074 registrada como decisión propia (corrección técnica), dentro de lo que permite CLAUDE.md §7.
10. Sin datos, textos, URL, imágenes ni marcadores nuevos; los `target="_blank"` siguen con `rel="noopener"`.
