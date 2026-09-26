# Informe · M3, Tarea 7 — Casa de repuestos

- **Commit de la tarea:** `308a8f1` (incluye el informe de revisión).
- **Base:** `8d530c6`.
- **Modo:** módulo completo con ciclo de revisor.
- **Veredicto del revisor:** APROBADO CON OBSERVACIONES, vuelta 1 de 2.
  Informe completo en `docs/revisiones/m3-t7.md`.

## 1. Qué se hizo

Sección nueva `#casa-de-repuestos`, a continuación de la libreta digital.

| Elemento | Texto |
|---|---|
| `h2.section-title` | Casa de repuestos |
| `p` 1 | Tenemos casa de repuestos propia, en el mismo lugar que el taller. 3 de cada 4 trabajos del último año se hicieron con repuestos de nuestro stock. |
| `p` 2 | Trabajamos con repuestos originales y alternativos, y te recomendamos opciones. |
| `p` 3 | Abierta al público: también vendemos repuestos para que los lleves. |

Más el hueco `TODO_IMAGEN: F-04`, con el markup del brief y `aspect-ratio:
3/2`, que es la proporción que pide `docs/brief-fotografico.md` para esa foto.

Fondo `--gris-bg` con la misma trama de puntos que "Cómo trabajamos", para
cortar dos secciones blancas seguidas, y foto a la izquierda con texto a la
derecha, alternando con la libreta.

## 2. La cadena de diagonales

La sección nueva se metió entre la libreta (blanca) y Servicios (blanco), así
que la libreta pasó a tener debajo una sección de otro color. Le agregué a
`.notebook` el remate diagonal en `--gris-bg` y le subí el `padding` inferior
a 148 px. Eso es CSS de la Tarea 6, y el revisor lo marcó: quedó anotado como
**P-025**, con el fundamento y con el pendiente para la Tarea 13.

Cadena verificada entera con estilo computado, no a ojo. Cada remate está
pintado del fondo de la sección que tiene abajo:

| Sección | Fondo | Su remate | Sección de abajo |
|---|---|---|---|
| `#como-trabajamos` | `rgb(244,246,249)` | `rgb(255,255,255)` | `#libreta-digital` blanco |
| `#libreta-digital` | `rgb(255,255,255)` | `rgb(244,246,249)` | `#casa-de-repuestos` gris |
| `#casa-de-repuestos` | `rgb(244,246,249)` | `rgb(255,255,255)` | `#servicios` blanco |
| `#servicios` | `rgb(255,255,255)` | `rgb(244,246,249)` | `#resenas` gris |
| `#resenas` | `rgb(244,246,249)` | `rgb(18,75,143)` | `#contacto` azul |

Los cinco remates comparten geometría: 66 px de alto, `bottom: -2px`,
`clip-path: polygon(0 100%, 100% 0, 100% 100%)`.

## 3. Datos

Ninguna cifra nueva. Los tres hechos del bloque están en
`docs/datos-verificados.md`:

- "casa de repuestos propia, en el mismo lugar que el taller" y "abierta al
  público" → §7.
- "3 de cada 4 trabajos del último año" → §18b, que fija el 75 % de las
  órdenes del último año y da esa forma como publicable.
- "originales y alternativos" → §18b.

## 4. Huecos anotados

- **P-024** — la tarjeta "Casa de Repuestos" de la pestaña de Servicios repite
  los tres hechos del bloque nuevo. La spec dice explícitamente que no se
  elimine, así que quedó tal cual. Se repite **una sola tarjeta** de las
  cuatro: las otras tres enumeran piezas y no se pisan con nada.
- **P-025** — repinté la cadena de diagonales tocando CSS de la Tarea 6, y el
  pendiente de repintarla otra vez en la Tarea 13, cuando cambie el orden.

## 5. Verificaciones, con su salida

| Qué | Resultado |
|---|---|
| Textos contra la spec, carácter por carácter | 4 de 4 idénticos |
| Barrido de desborde 320–1920 px, de a 1 px, 5 pestañas + menú móvil | 10.055 mediciones, **cero desbordes** |
| Ídem, corrido aparte por el revisor con el menú abierto en los 1601 anchos | 11.207 mediciones, **cero desbordes** |
| Errores de JavaScript y consola | ninguno |
| Respuestas ≥ 400 | ninguna |
| Contraste (`tools/auditar-contraste.mjs` → `docs/contraste-m3.md`) | 361 textos, 69 combinaciones, **0 no llegan al mínimo** |
| Encabezados, con las 5 pestañas abiertas | 34, **un solo h1**, **ningún salto** |
| JSON-LD | idéntico a HEAD; 1 bloque, `AutoRepair`, sin `AggregateRating` ni `Review` |
| Cadena de diagonales | los 5 remates coinciden con el fondo de la sección de abajo |
| Proporción del hueco F-04 | 1.500 exacto en los 9 anchos medidos |
| Texto recortado en la sección | ninguno |
| Peso a 390 px | 214.908 B (antes de la tarea: 212.414 B). Objetivo: menos de 500 KB |

Aporte al contraste: párrafos 4,92:1 sobre `--gris-bg` (mínimo 4,50), h2
7,99:1 (mínimo 3,00 por ser texto grande), rótulo del hueco 11,09:1.

## 6. Capturas

`temporary screenshots/`, a 360, 390 y 1440 px: `m3-t7-pagina-*.png` (página
completa) y `m3-t7-repuestos-*.png` (la sección recortada de esa captura).

## 7. Observación para cuando lleguen las fotos

A 1440 px el hueco F-04 mide 546x364 px y los tres párrafos ocupan bastante
menos alto, así que hoy queda fondo vacío a la derecha. Es la misma situación
que Ramiro ya resolvió en P-020 para el hueco F-02: con la foto real adentro
eso es foto, no vacío. No abro una pregunta nueva por lo mismo.
