# Spec M2a — Corrección de datos

Objetivo: que ningún dato del sitio contradiga `docs/datos-verificados.md`.

**Alcance:** datos, no posicionamiento. No se reescribe el mensaje comercial de
la página (eso es M3). Acá se corrige lo que es **falso, desactualizado o
inconsistente con la ficha de Google Maps**.

**Regla de conflicto:** si una corrección de dato cae dentro de una frase que
M3 va a reescribir igual, **se corrige igual ahora**. Es preferible tocar la
misma línea dos veces a dejar publicado un dato falso.

Leé `CLAUDE.md` y `docs/datos-verificados.md` antes de empezar.

---

## Método para cada tarea

1. Localizar las apariciones con `grep -n` y **mostrarlas antes de editar**.
2. Aplicar el cambio.
3. Verificar con `grep` que no queda ninguna aparición del valor viejo.

Si una cadena que esta spec da por existente no aparece, o aparece en más
lugares de los esperados, **frená y avisá**. No adaptes el texto por tu cuenta.

---

## Tarea 1 — Nombre de la empresa

El nombre canónico es **Centro Mecánico DGP**. En el archivo aparece invertido
("DGP Centro Mecánico") en el `<title>`, en el JSON-LD `"name"`, en los `alt`
de las dos imágenes del logo y posiblemente en otros lugares.

Buscar `DGP Centro Mecánico` y reemplazar por `Centro Mecánico DGP` en todas
las apariciones. La sigla sola ("DGP") no se toca.

**Hecho cuando:** `grep -n "DGP Centro" public/index.html` no devuelve nada.

## Tarea 2 — Teléfono

| Dónde | Queda |
|---|---|
| JSON-LD `"telephone"` | `+5493534593187` |
| Todo enlace `wa.me` | `https://wa.me/5493534593187` |
| Teléfono visible en el texto | `+54 9 353 459-3187` |

**Hecho cuando:** `grep -n "543534593187" public/index.html` no devuelve
ninguna aparición sin el 9.

## Tarea 3 — Coordenadas

En el JSON-LD `geo`: latitud `-32.4037627`, longitud `-63.2310492`.
Las actuales (`-32.4098` / `-63.2387`) están a un kilómetro del taller.

## Tarea 4 — Horario

Cierra a las **17:30**, no a las 17:00. Corregir en el texto visible y en el
JSON-LD.

En el JSON-LD, usar `openingHoursSpecification` con este contenido exacto:

```json
"openingHoursSpecification": [{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
  "opens": "08:00",
  "closes": "17:30"
}]
```

Sábados y domingos cerrado: no se declaran. No declarar feriados.

## Tarea 5 — Dominio

Reemplazar `https://www.dgpcentromecanico.com.ar` por
`https://centromecanicodgp.com.ar` (sin `www`) en las cuatro URL absolutas:
`canonical`, `og:image`, `twitter:image`, y el JSON-LD (`image`, `logo`, `url`
si existe).

Revisar también `og:url` si está presente.

**Hecho cuando:** `grep -n "dgpcentromecanico" public/index.html` no devuelve
nada.

## Tarea 6 — Redes sociales y datos del JSON-LD

Dejar `sameAs` con las tres redes:

```json
"sameAs": [
  "https://www.instagram.com/dgpcentromecanico",
  "https://www.facebook.com/dgpcentromecanico",
  "https://www.linkedin.com/company/centromecanicodgp",
  "https://maps.google.com/?cid=3644390957274807803"
]
```

Agregar además al JSON-LD del negocio:

```json
"areaServed": {
  "@type": "GeoCircle",
  "geoMidpoint": {"@type":"GeoCoordinates","latitude":-32.4037627,"longitude":-63.2310492},
  "geoRadius": "80000"
},
"hasMap": "https://maps.google.com/?cid=3644390957274807803",
"paymentAccepted": "Efectivo, transferencia bancaria, tarjetas de crédito y débito, cuenta corriente para empresas"
```

**No agregar** `AggregateRating` ni `Review` (CLAUDE.md §4).

**Hecho cuando:** el bloque JSON-LD completo pasa `JSON.parse` sin error.
Mostrarlo entero.

## Tarea 7 — Copyright dinámico

El pie dice "© 2025". Reemplazar el año por un `<span>` que se complete con
JavaScript al cargar la página (`new Date().getFullYear()`), con `2026` como
valor de respaldo dentro del HTML por si el JS no corre.

## Tarea 8 — Trayectoria

La empresa existe desde **2022**. Los dueños tienen más de 20 años en el rubro.
Están mal todas las variantes que atribuyen los 20 años a DGP: "20+ años",
"más de dos décadas", "20 años de trayectoria".

Texto de reemplazo, adaptando la extensión al lugar donde aparezca:

- Versión larga: `Equipo con más de 20 años en el rubro. Centro Mecánico DGP, desde 2022.`
- Versión corta (contadores, badges): `+20 años de experiencia del equipo`

**Nunca** escribir que DGP tiene 20 años.

**Hecho cuando:** mostrar todas las apariciones antes y después.

## Tarea 9 — Contador de servicios

Dice "17 servicios especializados" y en la página hay más tarjetas que esa
cifra. Sacar el número: la frase queda `Servicios especializados`.

## Tarea 10 — Reseñas

Tres correcciones:

1. El total: reemplazar `127 opiniones` por `Más de 130 opiniones en Google`.
   No volver a escribir un número exacto de reseñas en ningún lugar del sitio.
2. Los nombres: dejar **nombre + inicial del apellido** (`Daniel C.`), no el
   apellido completo.
3. El texto de cada reseña: recortar a **una o dos frases como máximo**,
   conservando las palabras originales del autor (no reescribirlas), y agregar
   debajo del bloque un enlace a la ficha de Google Maps con el texto
   `Ver todas las opiniones en Google`.
   El enlace es `https://maps.google.com/?cid=3644390957274807803`, con
   `target="_blank"` y `rel="noopener"`.

## Tarea 11 — Servicios que no se publican

En la tarjeta o pestaña "Reprogramación Electrónica", eliminar toda mención a
`DPF Off`, `EGR Off`, `Stage 1` y `Stage 2`.

El texto queda: `Reprogramación y calibración de la unidad de control del motor
(ECU).` Sin más detalle.

**Hecho cuando:** `grep -ni "dpf\|egr\|stage" public/index.html` no devuelve
nada.

## Tarea 12 — Marcas

- **Chevrolet sale del grupo de especialidad.** Las marcas foco son Toyota,
  Ford y Volkswagen, y los modelos foco Hilux, Ranger y Amarok.
- La lista de marcas adicionales se conserva, pero encabezada de forma que no
  las presente como especialidad. Encabezado: `También atendemos`.

## Tarea 13 — Garantía

Eliminar `garantía absoluta` y cualquier variante ("garantía total",
"garantía sobre cada trabajo" sin condiciones).

Texto de reemplazo, exacto:

> Garantía sobre repuestos y trabajos realizados. Ante cualquier inconveniente,
> el cliente trae el vehículo, se revisa, y un profesional determina si
> corresponde a la mano de obra o a un repuesto fallado.

**Hecho cuando:** `grep -ni "absoluta" public/index.html` no devuelve nada.

## Tarea 14 — Libreta digital del vehículo

La tarjeta que hoy se llama **"Tarjeta Virtual"** pasa a llamarse
**`Libreta digital del vehículo`**, con esta descripción debajo:

> Historial de reparaciones de cada vehículo. Se escanea el código QR pegado en
> el vehículo y se abre desde el celular, sin instalar nada.

## Tarea 15 — Verificación final y commit

1. `JSON.parse` del bloque JSON-LD completo, sin errores. Mostrarlo.
2. Levantar el servidor, cargar la página, reportar cualquier request ≥ 400.
3. Captura de página completa, con scroll previo para que se vean todas las
   secciones.
4. Listar **todos** los `TODO_DATO` que queden en `public/index.html`.
5. Un solo commit, con este mensaje exacto:
   `Corrección de datos: nombre, contacto, horario, dominio y trayectoria`
   Verificá los bytes de la tilde como en M1.

---

## Fuera de alcance en M2a

No se toca en esta tanda, va a M3:

- El H1, el badge del hero y la meta description (posicionamiento).
- "Atención completamente personalizada" y demás frases genéricas.
- La separación de públicos entre particulares y flotas.
- Los casos de flota, la zona de cobertura y los datos de cartera.

Si encontrás contradicciones nuevas con `datos-verificados.md`, anotalas y
avisá. No las corrijas si no están en esta spec.
