# Informe · M3, Tarea 8 — Flotas

- **Commit de la tarea:** `b83e51f` (incluye el informe de revisión).
- **Base:** `7b6442f`.
- **Veredicto del revisor:** APROBADO CON OBSERVACIONES, vuelta 1 de 2.
  Informe completo en `docs/revisiones/m3-t8.md`.

## 1. Qué se hizo

Sección `#flotas`, después de la casa de repuestos, con los seis textos de la
spec y el botón a WhatsApp.

| Elemento | Texto |
|---|---|
| `h2.section-title` | ¿Tenés una flota de vehículos? |
| `p.fleets-lead` | Trabajamos con empresas de la región que necesitan sus vehículos en condiciones. En los últimos dos años atendimos a más de 90 clientes con cuatro o más vehículos. |
| `li` 1 | Cuenta corriente con pago a 30 días. |
| `li` 2 | Libreta digital de cada vehículo de la flota. |
| `li` 3 | Condiciones y beneficios acordados con cada empresa. |
| `a.btn-primary` | Consultar condiciones para empresas → `https://wa.me/5493534593187` |

## 2. Cómo se resolvió "bloque corto y secundario"

En vez de una sección a todo ancho, un panel de `max-width: 860px` centrado,
con fondo `--gris-bg` y borde izquierdo azul, dentro de una sección blanca. Es
la única parte del `<main>` que no ocupa el ancho completo.

La spec pone una condición medible —"no más alto que la sección de 'Cómo
trabajamos'"— y se cumple en todos los anchos:

| Ancho | `#flotas` | `#como-trabajamos` |
|---|---|---|
| 320 px | 911 px | 1810 px |
| 390 px | 749 px | 1655 px |
| 768 px | 561 px | 1639 px |
| 1440 px | 561 px | 1245 px |

El revisor lo volvió a medir por su cuenta de a 10 px entre 320 y 1920 (161
mediciones) y da más bajo en todos. Peor caso a 1160 px: 560,8 contra 1244,9.

## 3. Datos

- "más de 90 clientes con cuatro o más vehículos / últimos dos años" → §12,
  fórmula publicable literal.
- "Cuenta corriente con pago a 30 días" → §8.
- `https://wa.me/5493534593187` → §2, el único enlace de WhatsApp autorizado.
- Botón azul `#124B8F` con texto blanco → §19, que incluye expresamente a los
  botones de WhatsApp.

## 4. Un error mío que encontré al verificar

El contorno de foco del botón salía **blanco**, porque la regla general pinta
de blanco el foco de `.btn-primary` (pensada para los botones sobre la foto
del hero). Sobre el panel `#F4F6F9` eso es un foco invisible, contra
`CLAUDE.md` §6. En el CSS ya existían la regla y el comentario para ese caso
—"Botones azules sobre fondo claro: el contorno blanco no se vería"— así que
sumé `.fleets .btn-primary:focus-visible` a esa lista. El foco pasó a
`#0D3870`, medido en **10,68:1** contra el fondo del panel. El revisor
verificó además que no rompí el foco de ningún otro botón: los cinco controles
de tipo botón conservan el color que tenían.

## 5. Huecos anotados

- **P-026** — las dos decisiones de forma que tomé (el panel acotado y el
  ícono de WhatsApp en el botón) estaban solo en un comentario de CSS. Ahora
  están escritas, con el costo medido del ícono: a 360 px hace que el rótulo
  pase de dos líneas a tres.
- **P-027** — con este bloque la home queda con **dos** llamados a flotas: el
  nuevo y el `<h2>` de contacto, "¿Necesitás atención para tu flota?". La
  Tarea 12 reescribe contacto pero no da reemplazo para ese `<h2>`, así que la
  duplicación sobreviviría a M3. Lo levantó el revisor. El texto, si va, lo
  escribe Ramiro.

## 6. Verificaciones, con su salida

| Qué | Resultado |
|---|---|
| Textos contra la spec, carácter por carácter | 7 de 7 idénticos, incluida la URL |
| Barrido de desborde 320–1920 px, de a 1 px, 5 pestañas + menú móvil | 10.055 mediciones, **cero desbordes** |
| Ídem, corrido aparte por el revisor | 9.309 mediciones, **cero desbordes** |
| Errores de JavaScript y consola | ninguno |
| Respuestas ≥ 400 | ninguna |
| Contraste (`docs/contraste-m3.md` regenerado) | 373 textos, 72 combinaciones, **0 no llegan al mínimo** |
| Foco del botón, contra el fondo del panel | 10,68:1 (mínimo 3:1 para un objeto gráfico) |
| Encabezados, con las 5 pestañas abiertas | 35, **un solo h1**, **ningún salto** |
| JSON-LD | sin tocar; 1 bloque, `AutoRepair`, sin `AggregateRating` ni `Review` |
| Cadena de diagonales | cerrada de punta a punta, verificada con estilo computado |
| `target="_blank"` con `rel="noopener"` | sí |
| Peso a 390 px | 248,5 KB. Objetivo: menos de 500 KB |

Aporte al contraste: h2 7,99:1 (mínimo 3,00 por texto grande), párrafo 4,92:1,
ítems 4,92:1, botón 8,65:1.

## 7. Una tensión que el revisor marcó y que no abrí como pregunta

`datos-verificados.md` §8 dice "No publicar umbral mínimo de vehículos", y en
el panel la frase "más de 90 clientes con cuatro o más vehículos" queda a dos
renglones de la lista de condiciones comerciales, así que podría leerse como
un requisito de entrada. **No es un hueco:** esa frase es la fórmula publicable
literal de §12 y está dictada palabra por palabra por la spec, ya aprobada, y
describe a quiénes se atendió, no a quiénes se atiende. Queda asentado acá
para que Ramiro lo vea, sin reabrirle una decisión que ya tomó.

## 8. Capturas

`temporary screenshots/`, a 360, 390 y 1440 px: `m3-t8-pagina-*.png` (página
completa) y `m3-t8-flotas-*.png` (la sección recortada).
