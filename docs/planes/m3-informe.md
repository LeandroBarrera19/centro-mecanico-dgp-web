# Informe de cierre de M3 — La home

- **Módulo:** M3, `docs/spec-m3-home.md`.
- **Fecha:** 2026-09-28.
- **Base del módulo:** `5d49082` (cierre de la Tarea 12).
- **Commit de la Tarea 13:** `ce0fe5d`
- **Estado:** las 13 tareas ejecutadas y las 14 preguntas de cierre aplicadas.
  **M3 queda cerrado salvo la aprobación visual de Ramiro.** La publicación
  sigue bloqueada por **P-007**, que es la foto F-01 del hero.

---

## 1. Qué pasó en esta jornada

Ramiro respondió de una vez las **catorce preguntas abiertas** que habían
quedado de las tareas 5 a 12. Siete de esas respuestas tocaban `public/` y se
aplicaron **de a una, con commit propio y revisión propia**; las otras siete
eran confirmaciones. Después se ejecutó la **Tarea 13**, que era la única del
módulo que faltaba.

| Unidad | Commit | Vueltas de revisión |
|---|---|---|
| Decisiones de cierre (solo `docs/`) | `ce9b2ba` | — |
| **P-021** · "Desde 2022" en zona de cobertura | `9cbf692` | 2 — RECHAZADO y corregido |
| **P-024** · fuera la tarjeta "Casa de Repuestos" | `935df3b` | 2 — RECHAZADO y corregido |
| **P-027** · `<h2>` de contacto → "Pedí tu turno" | `c45335e` | 1 |
| **P-030** · opiniones sin rótulo repetido ni subtítulo | `b05c8a4` | 1 |
| **P-031** · párrafo de contacto definitivo | `1e50f9c` | 1 |
| **P-032** · menú y columna "Navegación" del pie | `dde42b6` | 1 |
| **P-034** · pie sin la localidad repetida | `a7ada76` | 1 |
| **Tarea 13** · orden final y verificación de cierre | `ce0fe5d` | 2 — RECHAZADO y corregido |

Los informes de cada revisión están en `docs/revisiones/m3-p021.md`,
`m3-p024.md`, `m3-p027.md`, `m3-p030.md`, `m3-p031.md`, `m3-p032.md`,
`m3-p034.md` y `m3-t13.md`.

Además hubo **ocho commits de `docs/`** que sincronizan la spec con las
decisiones, porque el revisor marcó dos veces que dejar la spec diciendo lo
contrario de lo publicado es un hueco de `CLAUDE.md` §9: `4beecc7`, `d236c72`,
`27acc44`, `78cd0af`, `1b338a2`, `2a23411`, `204d715` y `2c25ca2`.

---

## 2. Lo que Ramiro pidió ver

### 2.1 El orden final de las secciones

Pedido por la Tarea 13 y verificado sobre el DOM renderizado, por posición
vertical creciente:

| # | Sección | `id` | Arranca en (1440 px) |
|---|---|---|---|
| 1 | Hero | `#inicio` | 73 px |
| 2 | Servicios | `#servicios` | 883 px |
| 3 | Cómo trabajamos | `#como-trabajamos` | 1566 px |
| 4 | Libreta digital del vehículo | `#libreta-digital` | 2811 px |
| 5 | Casa de repuestos | `#casa-de-repuestos` | 3580 px |
| 6 | ¿Tenés una flota de vehículos? | `#flotas` | 4298 px |
| 7 | Marcas | *(franja, sin `id`)* | 4859 px |
| 8 | Opiniones | `#resenas` | 4978 px |
| 9 | Clientes de toda la región | `#zona-de-cobertura` | 5967 px |
| 10 | Contacto | `#contacto` | 6405 px |
| 11 | Pie | — | — |

Para llegar ahí hubo que mover **dos** bloques: Servicios de la posición 7 a la
2, y la franja de Marcas de la 2 a la 7.

### 2.2 La prueba de que el movimiento no perdió nada

Es el cambio más grande del módulo, así que se verificó de **tres** formas
independientes.

**a) Por multiconjunto de caracteres**, dentro del script que hizo el
movimiento: `sorted(nuevo) == sorted(original)`.

**b) Por multiconjunto de líneas**, comparando `a7ada76` contra el resultado.
Las únicas líneas que aparecen o desaparecen son las del CSS que se borró y los
comentarios que se reescribieron. **Ni una sola línea de contenido de sección**:

```
líneas antes: 2004   ahora: 1997   (−7)

desaparecieron 23:  las 15 de .badge-urgente, la de .hero h1 em,
                    la regla inerte de .testimonials-grid,
                    la línea vieja del degradado del hero
                    y 5 líneas de los dos comentarios reescritos

nuevas 16:          el degradado nuevo y su comentario (5)
                    y los dos comentarios reescritos (11)
```

**c) Bloque por bloque, carácter por carácter**, hecho por el revisor: partió el
`<main>` de las dos versiones por sus comentarios de sección y comparó cada uno.

```
IGUAL HERO 3185/3185      IGUAL BRANDS STRIP 2316/2316   IGUAL CÓMO TRABAJAMOS 1966/1966
IGUAL LIBRETA 1799/1799   IGUAL REPUESTOS 889/889        IGUAL FLOTAS 2144/2144
IGUAL SERVICES 9391/9391  IGUAL TESTIMONIOS 11162/11162  IGUAL COBERTURA 555/555
IGUAL CONTACT 5214/5214
```

Los diez bloques idénticos byte a byte. Y las junturas: cada comentario de
sección pegado a su sección, con **exactamente una línea en blanco** antes de
cada uno y antes de `</main>`, igual que antes.

### 2.3 La cadena de remates diagonales, recalculada

La regla de P-025 es que el color de cada remate es el de la sección de abajo.
Se midió sobre el DOM —fondo de cada bloque, color de su `::after`, fondo del
bloque siguiente— en vez de razonarla, y el revisor la recalculó por su cuenta
y llegó al mismo resultado:

| Sección | Fondo | Color del remate | Fondo de abajo | ¿Coincide? |
|---|---|---|---|---|
| hero | — | degradado a `rgb(255,255,255)` | services `rgb(255,255,255)` | sí |
| services | `rgb(255,255,255)` | `rgb(244,246,249)` | how-we-work | sí |
| how-we-work | `rgb(244,246,249)` | `rgb(255,255,255)` | notebook | sí |
| notebook | `rgb(255,255,255)` | `rgb(244,246,249)` | parts | sí |
| parts | `rgb(244,246,249)` | `rgb(255,255,255)` | fleets | sí |
| fleets | `rgb(255,255,255)` | **sin remate** | brands-strip `rgb(244,246,249)` | **cambia de color sin remate** |
| brands-strip | `rgb(244,246,249)` | sin remate | testimonials `rgb(244,246,249)` | sí, mismo color |
| testimonials | `rgb(244,246,249)` | `rgb(255,255,255)` | coverage | sí |
| coverage | `rgb(255,255,255)` | `rgb(18,75,143)` | contact-cta | sí |

**Las seis diagonales ya cumplían la regla después del movimiento.** El único
remate que hubo que tocar fue el **degradado del hero**, que moría en
`--gris-bg` y ahora tiene Servicios (blanco) debajo: pasó a morir en
`--blanco`. Se ve en `temporary screenshots/m3-final-union-hero-servicios-*.png`.

La fila de `fleets` es el único cambio de color sin remate de toda la página, y
lo introdujo esta tarea. **No se creó una diagonal nueva** y está anotado como
**P-045**: ver §5.

### 2.4 Peso

Medido con `tools/medir-rendimiento.mjs`, con la convención de M2b (1 KB = 1000
bytes, igual que el objetivo de 500 KB de `CLAUDE.md` §5):

| Escenario | Cierre de M2b | Cierre de M3 |
|---|---|---|
| 390 px | 231 KB | **223 KB** |
| 390 px, densidad 3 | 267 KB | **259 KB** |
| 1440 px | 319 KB | **310 KB** |

Seis peticiones, **cero a dominios externos**, todas 200. El objetivo de 500 KB
en móvil se cumple con holgura.

> La primera versión de este dato mezclaba unidades: las cifras nuevas estaban
> en KiB y las de M2b en KB, y por eso la mejora parecía de 14 KB cuando en
> unidades consistentes es de 8. Lo marcó el revisor.

---

## 3. Verificación de cierre, con su resultado

| Qué | Resultado |
|---|---|
| Orden de las 11 secciones | **exacto** según la spec |
| Contenido tras mover los bloques | **idéntico**, verificado de tres formas |
| Menú de escritorio, menú móvil y columna "Navegación" del pie | reflejan el orden, en posición vertical **creciente** |
| Un solo `<h1>` | 1: «Taller mecánico en Villa María» |
| Jerarquía de encabezados | 35 encabezados, **cero saltos** |
| Anclas | 27 `href="#…"`, **cero rotas** |
| `target="_blank"` sin `rel="noopener"` | **cero** |
| `<img>` sin `alt` | **cero** (3 imágenes; la del hero con `alt=""` por decorativa) |
| Rutas de recursos | los 6 `src`/`srcset` existen en `public/assets/` |
| **Afirmaciones prohibidas** | **cero**, con la lista de §18b más "agro", "agropecuari", la raíz `inmediat`, "flota no se detiene", "brevedad", "amplia experiencia", "20 años", "dos décadas" y "punta" |
| Formas codificadas y nombres de archivo | **cero** |
| **`TODO_DATO`** | **cero**. Era uno y lo cerró P-031 |
| **`TODO_IMAGEN`** | **cuatro**: F-02, F-03, F-04, F-07 |
| JSON-LD | 1 bloque, `JSON.parse` OK, `AutoRepair`, **sin `AggregateRating` ni `Review`**, verificado campo por campo contra §1, §2, §3, §4, §5, §8 y §11 |
| `canonical` | `https://centromecanicodgp.com.ar/`, sin `www`, apuntando a sí misma |
| `<title>` y `meta description` | 52 y 158 caracteres |
| **Desborde horizontal 320→1920 px de a 1 px**, 5 pestañas y menú móvil | **9606 mediciones, cero desbordes** |
| **Contraste** | **383 textos, 70 combinaciones, cero por debajo del mínimo** |
| Grilla de opiniones tras borrar la regla inerte | **idéntica** a la anterior en los 9 anchos medidos |
| Errores de JavaScript / respuestas ≥ 400 | cero / cero |
| Capturas `m3-final-` | **31**: 4 de página, 20 de pestañas, 3 de menú móvil y 4 de unión |

Sobre el `grep` de afirmaciones prohibidas hay un detalle que conviene no
perder: **la Tarea 13 manda buscar "inmediato", en masculino**, y así el control
daba limpio aunque lo publicado fuera *"respuesta inmediat**a**"*. Lo levantó el
revisor de P-027 y desde entonces se busca la **raíz** `inmediat`.

La única coincidencia de todo el barrido de prohibidas es la raíz `tecnolog`, en
el texto de una **reseña de Google de un tercero**, verificada en
`datos-verificados.md` §6. No es una afirmación del sitio y no se toca.

### Huecos de imagen abiertos

| Hueco | Dónde | Estado |
|---|---|---|
| **F-01** | foto del hero | **Bloquea la publicación (P-007).** La foto actual muestra patente y cara legibles |
| **F-02** | Cómo trabajamos | hueco reservado |
| **F-03** | Libreta digital | hueco reservado |
| **F-04** | Casa de repuestos | hueco reservado |
| **F-07** | junto al mapa, en Contacto | hueco reservado, 16:9 exacto |

Ninguno relleno, ninguna imagen ajena en el sitio.

---

## 4. La limpieza de CSS

Las tres reglas que dictó Ramiro, borradas con un script que verifica que cada
bloque aparezca **exactamente una vez** antes de quitarlo:

- `.badge-urgente` — 15 líneas. Sin uso: el elemento lo había borrado la Tarea 3.
- `.hero h1 em` — 1 línea. El `<h1>` no tiene ningún `<em>`.
- `.testimonials-grid` del *media query* de 900 px — 1 línea. Inerte: declaraba
  lo mismo que la regla base.

El revisor comprobó además que **ninguna decisión fechada las respalde**, que es
el error por el que rechazó P-024.

**Cuatro reglas huérfanas quedaron sin borrar, a propósito**, porque borrar lo
que la spec no nombra es un hueco de `CLAUDE.md` §9:
`.service-card--highlight` y `.badge-highlight` (P-037), `.footer-brand-sub`
(P-034) y `.services-grid`, esta última encontrada por el revisor y que **nunca
se usó** en la historia del archivo.

---

## 5. Decisiones propias, dichas como propias

Ninguna toca copy ni datos. Todas están anotadas en `docs/preguntas-abiertas.md`
y esperan confirmación.

| # | Decisión | Dónde |
|---|---|---|
| P-035 | Conservar en §10 una oración que el texto nuevo no menciona | `datos-verificados.md` |
| P-036 | Sincronizar la Tarea 11 de la spec en vez de dejarla contradictoria | `spec-m3-home.md` |
| P-037 | Renumerar los retardos del fade-in; no borrar el CSS huérfano | `public/`, `docs/` |
| P-038 | Regenerar el acta de contraste entera | `contraste-m3.md` |
| P-041 | No sacar el botón de WhatsApp de los menús | `public/` |
| P-043 | No darle apariencia de enlace al Instagram del pie | `public/` |
| P-045 | **No crear un remate diagonal en la unión Flotas → Marcas** | `public/` |
| — | No reescribir las 23 referencias de línea corridas | `preguntas-abiertas.md` |

### Un error propio que se repitió tres veces

**Dejar una decisión escrita solo en un comentario del código.** Pasó en P-026,
en P-028 y otra vez en la Tarea 13 con la unión Flotas → Marcas, y las tres
veces lo levantó el revisor. Una decisión que vive en un comentario de CSS no
está registrada. Quedó como **P-045**.

### La auditoría de referencias de línea

`docs/preguntas-abiertas.md` tenía **25** referencias a `public/index.html`:
**2 históricas**, con hash de commit adelante, que son exactas porque apuntan a
una versión congelada, y **23 al archivo del día**, todas corridas.

Las 23 del archivo del día, una por una, con la pregunta que las contiene:

| Pregunta | Referencia | Qué hay hoy en esa línea |
|---|---|---|
| P-024 | `:1535` | `</div>` |
| P-025 | `:997-1007` | `.delay-2 { transition-delay: 0.2s; }` |
| P-026 | `:631-673` | `nadie pidió. */` |
| P-026 | `:1437-1439` | `<div class="service-icon">` |
| P-027 | `:1474` | *(línea en blanco)* |
| P-027 | `:1815` | `</a>` |
| P-028 | `:1266` | `<a href="#flotas" …>Flotas</a>` |
| P-028 | `:631-637` | `nadie pidió. */` |
| P-028 | `:1273` | *(línea en blanco)* |
| P-029 | `:1286-1310` | *(línea en blanco)* |
| P-030 | `:1646` | `<span class="brand-name">FORD</span>` |
| P-030 | `:1647` | `</div>` |
| P-030 | `:1652-1664` | `<span class="brand-name brand-name--secondary">RENAULT</span>` |
| P-030 | `:1035` | `}` |
| P-030 | `:1142` | `flex-wrap: wrap;` |
| P-031 | `:1816` | `</div>` |
| P-031 | `:1807-1815` | `<span class="eyebrow-label">Contacto</span>` |
| P-032 | `:1923-1931` | `<ul>` |
| P-034 | `:1957` | `navToggle.setAttribute('aria-expanded', isOpen);` |
| P-034 | `:891-896` | el comentario del CSS de las redes |
| P-034 | `:896` | `gap: 4px 18px;` |
| P-034 | `:1880` | `</div>` |
| P-034 | `:1945` | `<script>` |

Y las 2 históricas, que **sí son exactas** porque apuntan a una versión
congelada, comprobadas con `git show`:

| Pregunta | Referencia | Qué hay en esa línea de esa versión |
|---|---|---|
| P-021 | `ecda75f:public/index.html:1221` | el subtítulo con «funciona desde 2022…» |
| P-031 | `1e3ab33^:public/index.html:1233` | `<h3>Stock propio. Respuesta inmediata.</h3>` |

**No se reescribieron.** Varias apuntan a elementos que ya no existen y habría
habido que inventarles un número. En su lugar quedó una nota en el encabezado
del archivo: las referencias de línea son **fechadas**, y para encontrar algo
hay que buscar el elemento, no la línea. **Esto cambia el criterio de la Tarea
12**, que sí las actualizó una por una.

---

## 6. Lo que NO se hizo, y por qué

- **La foto F-01 del hero.** Es **P-007** y bloquea M5, la publicación. La foto
  actual muestra una patente y una cara legibles, y aunque en pantalla quedan
  bajo la capa oscura, cada archivo se sirve limpio.
- **El Validador de Schema.org y la Prueba de Resultados Enriquecidos de
  Google.** El entorno no tiene salida a internet. El JSON-LD se verificó con
  `JSON.parse` y campo por campo contra `datos-verificados.md`. Los validadores
  en línea los corre Ramiro.
- **La redirección 301 de `www`.** Es de infraestructura, no del repositorio.
- **Las doce preguntas abiertas.** P-007 y P-035 a P-045.

---

## 7. Cómo reproducir cada verificación

```bash
# Orden de las secciones y estructura
node tools/serve.mjs &        # puerto 3000
# y un script con Puppeteer que lea los hijos de <main>

# Contraste (levanta su propio servidor: no con serve.mjs vivo)
node tools/auditar-contraste.mjs docs/contraste-m3.md

# Peso (la ruta de salida tiene que ser de Windows, C:\...)
node tools/medir-rendimiento.mjs C:\ruta\salida.json

# Afirmaciones prohibidas, con la raíz inmediat
grep -rniE "tecnolog[íi]a de punta|[úu]ltima tecnolog|precios competitivos|mejores precios|alta calidad|calidad garantizada|excelencia|rapidez|servicio r[áa]pido|atenci[óo]n inmediata|mejores profesionales|altamente calificad|atenci[óo]n personalizada|constante capacitaci|agro|agropecuari|inmediat|flota no se detiene|brevedad|amplia experiencia" public/

# Huecos
grep -rn "TODO_DATO\|TODO_IMAGEN" public/

# Que el movimiento de bloques no perdió nada
git show a7ada76:public/index.html > antes.html   # nunca git stash: deja CRLF (P-044)
# y comparar el multiconjunto de líneas contra public/index.html
```

El barrido de desborde recorre 320→1920 px de a 1 px y mide **seis estados por
ancho**: las cinco pestañas de servicios y el menú móvil abierto. No hay un
séptimo "estado base": la primera pestaña viene activa al cargar, así que el
estado inicial y la pestaña 1 son el mismo. 1601 anchos × 6 = **9606
mediciones**, unos siete minutos.

Compara `document.documentElement.scrollWidth` contra `clientWidth`.
`CLAUDE.md` §8 dice "contra el ancho de la ventana": `clientWidth` descuenta la
barra de desplazamiento, así que el control es **más** estricto que el que pide
la regla, nunca menos.

---

## 8. Estado del módulo

**M3 queda cerrado a la espera de la aprobación visual de Ramiro.** Las
capturas están en `temporary screenshots/`, con prefijo `m3-final-`.

Lo que sigue: responder las doce preguntas abiertas y, para publicar, la foto
**F-01**.
