# Informe de cierre — M2a (datos)

Spec: `docs/spec-m2a-datos.md`. Fuente de verdad: `docs/datos-verificados.md`.
Cerrado el 2026-09-18. Último commit del módulo antes de este informe: `509a497`.
Los números de línea de este informe corresponden a `public/index.html` en ese
commit.

---

## 1. Tareas y commits

Un commit por tarea sobre `public/`. Los cambios de `docs/` van en commits
propios, antes de la tarea que los usa.

| Tarea | Qué se hizo | Commit en `public/` | Commits de `docs/` |
|---|---|---|---|
| 1 | Nombre "Centro Mecánico DGP" en todas las apariciones | `50a83b8` | `e1fcf9b` |
| 2 | Teléfono con el 9; `rel="noopener"` en dos enlaces | `81d3c95` | |
| 3 | Coordenadas de la ficha en el JSON-LD | `d1889eb` | |
| Extra | `priceRange` no verificado, eliminado del JSON-LD | `cb8eb2a` | |
| 4 | Cierre 17:30; "pick-ups y utilitarios" en las descripciones | `113e2dc` | |
| Extra | Redacción de la tarjeta de kits | `a2aaaa6` | |
| 5 | Dominio canónico `https://centromecanicodgp.com.ar`, sin `www` | `05edc6e` | |
| 6 | `sameAs` ×4, `areaServed`, `hasMap`, `paymentAccepted` | `bedb509` | `8f5fa5b` |
| 7 | Copyright con año dinámico y respaldo 2026 | `6889b4c` | |
| 8 | Trayectoria: +20 años del equipo, DGP desde 2022 | `417555c` | `1a7145e` |
| 9 | Contador "+130 Opiniones en Google" en lugar de "17 servicios" | `7501085` | |
| 10a | 4,9 · "Más de 130 opiniones en Google" · botón a la ficha | `3154ce5` | `b008897` |
| Extra | Recuadro de Google sin desborde hasta 480 px (ver P-001) | `0501b5e` | |
| 10b | Extractos de reseñas, nombre + inicial, tarjeta de Nico G. fuera | `cf5a386` | |
| 10c | Etiqueta "Local Guide" eliminada | `8b93918` | `5d857d7`, `c529dbc`, `05c920a` |
| 11 | Tarjeta "Reprogramación Electrónica" (DPF/EGR/Stage) eliminada | `dece79b` | `cfb77fc`, `a18c1ae` |
| 12 | Chevrolet fuera del foco; service por marca sin el agro | `2123134` | `e093c08`, `d910ef5` |
| 13 | Garantía sin "absoluta" | `57ebbdf` | `08a5438` |
| 14 | "Libreta digital del vehículo" en lugar de "Tarjeta Virtual" | `0572511` | `1fc8818`, `7f2c505` |
| 15 | Verificación final, sin commit propio | — | `509a497` (paso 7) |

---

## 2. Verificación final (Tarea 15)

| Paso | Resultado |
|---|---|
| 1. `JSON.parse` del JSON-LD | Un solo bloque, sin errores. Bloque completo en §3. |
| 2. Servidor local | 26 respuestas a 1440 px y 30 a 390 px. Ninguna ≥ 400, ninguna fallida, sin errores de JavaScript ni de consola. |
| 3. Captura de página completa | A 1440 y 390 px, con recorrido previo para el fade-in. Sin desborde horizontal a 390 px (`scrollWidth` 390). Las únicas tarjetas sin mostrar son las de las pestañas de servicios inactivas (tienen alto 0 hasta que se abren). El mapa sale vacío en la captura de página completa, pero carga bien (iframe con 200, visible en captura de ventana): es una limitación de la captura con iframes de otro dominio. |
| 4. `TODO_DATO` en `public/` | Ninguno, incluidas las formas codificadas. |
| 5. Commit | No hubo: ninguna verificación falló. |
| 6. Commits de M2a | 33 desde `50a83b8` hasta `05c920a`, más `509a497`. Cada tarea tiene el suyo (§1). |
| 7. Verificación semántica | `url`, `image`, `logo` y `hasMap` con `https://`, válidas con `new URL()`, con dominio y sin espacios; `telephone` en E.164 (`^\+[1-9]\d{7,14}$`). OK en el archivo y en `HEAD`. |

---

## 3. JSON-LD final

Leído directo de `public/index.html`, líneas 39–82, sin reformatear:

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Centro Mecánico DGP",
    "url": "https://centromecanicodgp.com.ar",
    "telephone": "+5493534593187",
    "image": "https://centromecanicodgp.com.ar/assets/hero-bg.png",
    "logo": "https://centromecanicodgp.com.ar/assets/logo-dgp.png",
    "description": "Servicio especializado en pick-ups y utilitarios. Diagnóstico OBD, stock propio de repuestos y un equipo con más de 20 años en el rubro. En Villa María, Córdoba.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Porfirio Seppey 25",
      "addressLocality": "Villa María",
      "addressRegion": "Córdoba",
      "postalCode": "5900",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -32.4037627,
      "longitude": -63.2310492
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "17:30"
    }],
    "sameAs": [
      "https://www.instagram.com/dgpcentromecanico",
      "https://www.facebook.com/dgpcentromecanico",
      "https://www.linkedin.com/company/centromecanicodgp",
      "https://maps.google.com/?cid=3644390957274807803"
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {"@type":"GeoCoordinates","latitude":-32.4037627,"longitude":-63.2310492},
      "geoRadius": "80000"
    },
    "hasMap": "https://maps.google.com/?cid=3644390957274807803",
    "paymentAccepted": "Efectivo, transferencia bancaria, tarjeta de crédito y de débito, cuenta corriente para empresas"
  }
  </script>
```

Sin `AggregateRating` ni `Review` (CLAUDE.md §4).

---

## 4. Validaciones externas

### validator.schema.org

Código pegado como fragmento (el bloque de §3), el 2026-09-18.

- Tipo detectado: **AutoRepair**.
- **0 errores, 0 advertencias.**

### Prueba de Resultados Enriquecidos de Google

Hecha a mano por Ramiro, resultado informado el 2026-09-18.

- **2 elementos válidos detectados: Local businesses y Organization.**
- El elemento local se lee como "Centro Mecánico DGP", tipo AutoRepair.
- Google leyó correctamente nombre, dirección completa (con `addressCountry`
  resuelto como Country/AR), coordenadas, teléfono E.164, horario 08:00–17:30
  de lunes a viernes, los cuatro `sameAs` incluida la ficha, `areaServed` con
  `geoRadius` 80000, `hasMap` y `paymentAccepted`. Sin `AggregateRating` ni
  `Review`.
- **Una sola incidencia, no crítica:** `Missing field "priceRange" (optional)`.

**Decisión sobre `priceRange` (se mantiene):** no se incluye. Es opcional, no
afecta la elegibilidad, el valor no está verificado, y en M8 el sitio va a
publicar precios reales por modelo. Si la advertencia reaparece en una
validación futura, no es un error a corregir.

---

## 5. Repaso campo por campo contra `datos-verificados.md`

| § | Dato verificado | En el sitio (línea) | Resultado |
|---|---|---|---|
| 1 | Nombre **Centro Mecánico DGP** | 6, 23, 24, 30, 34, 43, 1002, 1004, 1127, 1583, 1584, 1600, 1601, 1635 | OK, sin otra forma del nombre |
| 1 | Los 20 años son del equipo | 7, 25, 35, 48, 1041, 1057–1058, 1145 | OK, ninguna mención se los atribuye a DGP |
| 1 | "desde 2022" | 1127 | OK |
| 1 | Razón social / CUIT no se publican | — | OK |
| 2 | Porfirio Seppey 25 | 51–53, 1573 | OK, sin "Ramos Mejía" |
| 2 | CP 5900 | 54, 1580 | OK |
| 2 | Coordenadas -32.4037627 / -63.2310492 | 59–60, 76 | OK |
| 2 | Teléfono visible +54 9 353 459-3187 | 1546, 1629 | OK |
| 2 | E.164 +5493534593187 | 45 | OK |
| 2 | `https://wa.me/5493534593187` | 1014, 1026, 1043, 1513, 1531 | OK, sin otro formato |
| 2 | Correo | — | No aparece en el sitio. Decidido: no va al JSON-LD (el canal es WhatsApp) |
| 2 | Ficha `?cid=3644390957274807803` | 72, 79, 1504 | OK |
| 3 | Lunes a viernes 08:00–17:30 | 65–66, 1069–1070, 1564, 1629 | OK, sin fines de semana ni feriados |
| 4 | `https://centromecanicodgp.com.ar`, sin `www` | 18, 26, 27, 36, 44, 46, 47 | OK (canonical y og:url con `/` final: misma URL raíz) |
| 5 | Instagram, Facebook, LinkedIn | 69–71; @dgpcentromecanico en 1555, 1629 | OK, sin otras redes |
| 6 | 4,9 · "Más de 130 opiniones en Google" | 1427, 1431, 1061 | OK, sin número exacto |
| 6 | Nombre + inicial | 1437/1447, 1453/1463, 1469/1479, 1485/1495 | OK |
| 6 | Fechas verificadas | 1448, 1464, 1480, 1496 | OK |
| 6 | Sin "Local Guide", `AggregateRating` ni `Review` | — | OK |
| 7 | Instalaciones | — | OK, no se publican |
| 8 | Formas de pago | 80 | OK, texto idéntico; sin "financiación", "cuotas" ni "crédito propio" |
| 8 | Factura A (`TODO_DATO` en datos) | — | OK, no aparece |
| 9 | Garantía sin plazo ni kilometraje | 1151, 1152, 1205, 1206 | OK |
| 10 | Foco Toyota, Volkswagen, Ford / Hilux, Amarok, Ranger | 1083–1087, 1333 | OK |
| 10 | Chevrolet fuera del foco | 1091 ("También atendemos") | OK |
| 10 | Pick-ups y utilitarios | 7, 25, 35, 48, 1041, 1403 | OK |
| 11 | Radio 80 km | 77 | OK, sin localidades |
| 12–13 | Cartera y casos | — | OK, van en la página de flotas |
| 14 | "Libreta digital del vehículo" | 1206, 1245–1246 | OK, sin "Tarjeta Virtual" |
| 15–16 | Chequeo de 25 puntos, precios | — | OK, van en M8 |
| 17 | Sin DPF, EGR, Stage, IDR | — | OK, solo "Reprogramación ECU" |
| 18 | Voseo; "vehículo", no "unidad" | — | OK |
| 19 | `logo-dgp.png` y `hero-bg.png` existen | `public/assets/` | OK (el peso del hero va a M2b) |

---

## 6. Lo diferido, con su línea

### M2b — velocidad

1. Tipografías de Google Fonts (85–88): servirlas desde `assets/fonts/`.
2. `hero-bg.png`, 5,5 MB, PNG fotográfico. Lo usan el preload (15), el CSS
   (267), `og:image` (27), `twitter:image` (36) y el JSON-LD `image` (46).
   Además, el hero se sirve con `background-image` de CSS (267), prohibido por
   CLAUDE.md §5 para la imagen principal porque impide servir tamaños distintos.

### M2c — técnico

3. Ancla `#reseñas` con ñ: 1012, 1024 (menú), 1411 (`id`), 1612 (pie).
4. Saltos de encabezado: h2 → h4 en los pasos del proceso (1173, 1181, 1189,
   1197, 1205) y en las 19 tarjetas de servicios (1237–1402); h5 en el pie
   (1607, 1618, 1628).
5. `<iframe>` del mapa que busca por dirección y no por el CID (1580).

### M3 — posicionamiento y textos

6. Grilla de reseñas 3 + 1 en escritorio y retrasos del fade-in 0-1-0-1 (1438,
   1454, 1470, 1486).
7. H1 (1040) y menciones del agro: badge del hero (1039), tarjeta 03 (1146),
   lema del pie (1603), línea final del pie (1636), `og:image:alt` (30).
8. "Atención completamente personalizada" (1152).
9. "garantizan un resultado sin sorpresas", subtítulo del proceso (1165).
10. El título de la tarjeta 03 (1145) repite el subtítulo de la sección (1127).
11. Contador `08–17:30hs` que se parte en dos líneas a 390 px (1069).
12. Afirmaciones sobre el stock que nadie declaró: "inmediato" (1065, 1139,
    1198, 1379, 1530) y "Repuestos originales y alternativos" (1379).
13. Declarar la casa de repuestos en el `@type` (42, hoy `AutoRepair`).
14. Ícono de tarjeta de crédito en la Libreta digital (1243).
15. Descripción completa de la garantía (§9 de datos): M3 o página de flotas.
16. Marcas de lujo en la fila secundaria: Mercedes-Benz (1099), Audi (1101),
    BMW (1109), Porsche (1115).
17. Instagram como texto sin enlace (1555, 1629).

### M8

18. Precios reales.

### Fuera de `public/` (preguntar antes de tocar)

19. `tools/recortar_logo.ps1`: el propietario lo quiere borrar. Tiene una ruta
    absoluta a otro proyecto y pisa el logo original.
20. `directrices de marca/directrices-de-marca-dgp.html`: imágenes del logo
    rotas y caracteres mal codificados en los `alt`. No se publica.

### Se queda como está (decidido)

- "Diagnóstico OBD" (OBD es un estándar, no un equipo del taller).
- `@type` `AutoRepair`.
- El correo no va al JSON-LD: el canal es WhatsApp.
- Sin `priceRange` (§4).

---

## 7. Hallazgo posterior al cierre, sin módulo asignado

Encontrado al responder P-001, el 2026-09-18. No se tocó.

- **La fila de contadores del hero desborda en pantallas de menos de unos
  350 px.** A 320 px, `scrollWidth` 347; a 340 px, 347. Desbordan los
  contadores "+130" y "08–17:30hs" (1061, 1069). A 360 px ya no desborda. Ya
  pasaba antes de M2a (344 px a 320 en `50a83b8^`, con "17" y "08–17hs"), así
  que no lo introdujo este módulo. Falta decidir en qué módulo va.
