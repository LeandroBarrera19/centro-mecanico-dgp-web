# Spec M1 — Estructura del repositorio y control de versiones

Objetivo: dejar el proyecto ordenado, versionado y listo para publicar solo lo
que corresponde. **En este módulo no se cambia ningún texto ni ningún estilo
del sitio.** Solo estructura, rutas y control de versiones.

Leé `CLAUDE.md` y `docs/datos-verificados.md` antes de empezar.

---

## Tarea 1 — Inicializar Git

1. `git init` en la raíz del proyecto (si ya existe, no hacer nada).
2. Crear `.gitignore` con, como mínimo:
   ```
   node_modules/
   temporary screenshots/
   *.log
   .DS_Store
   Thumbs.db
   ```
3. Hacer un primer commit con **todo el estado actual, sin modificar nada**,
   con el mensaje `Estado inicial del sitio antes de la reestructuración`.

**Hecho cuando:** `git log` muestra un commit y `git status` está limpio.

---

## Tarea 2 — Reestructurar carpetas

Estructura objetivo:

```
proyecto/
├── public/
│   ├── index.html
│   ├── favicon.png
│   └── assets/
│       ├── logo-dgp.png
│       └── hero-bg.png
├── docs/
│   ├── datos-verificados.md
│   └── spec-m1-estructura.md
├── tools/
│   ├── serve.mjs
│   ├── screenshot.mjs
│   └── recortar_logo.ps1
├── directrices de marca/          (se deja donde está; no se publica)
├── CLAUDE.md
├── .gitignore
├── package.json
└── package-lock.json
```

Pasos:

1. Crear `public/`, `public/assets/`, `tools/`.
2. Mover `index.html` y `favicon.png` a `public/`.
3. Mover `directrices de marca/logo-dgp.png` a `public/assets/logo-dgp.png`
   (**copiar**, no mover: el original queda en la carpeta del manual de marca).
4. Mover **una sola** de las dos imágenes del hero a `public/assets/hero-bg.png`.
   Antes, verificar con un hash (`certutil -hashfile` en Windows, o el método
   que corresponda) que `hero-bg.png` y `hero-bg.jpg.png` son idénticas.
   Si son idénticas, mover una y **borrar la otra**. Si no lo son, frenar y
   preguntar cuál conservar.
5. Mover `serve.mjs`, `screenshot.mjs` y `recortar_logo.ps1` a `tools/`.
6. Ajustar en `tools/serve.mjs` y `tools/screenshot.mjs` las rutas para que
   sirvan y capturen desde `public/`. Mostrar el diff.
7. La carpeta `temporary screenshots/` se deja donde está (ya está ignorada por
   Git).

**Hecho cuando:** la estructura coincide con la de arriba y `ls -R public/`
muestra exactamente `index.html`, `favicon.png`, `assets/logo-dgp.png`,
`assets/hero-bg.png`.

---

## Tarea 3 — Actualizar rutas en `index.html`

Solo cambios de ruta. **No tocar texto, estilos, estructura ni metadatos que no
sean rutas de archivo.**

| Buscar | Reemplazar por |
|---|---|
| `directrices de marca/logo-dgp.png` (todas las apariciones, incluida la del JSON-LD `"logo"`) | `assets/logo-dgp.png` |
| `href="hero-bg.png"` (preload) | `href="assets/hero-bg.png"` |
| La referencia a `hero-bg.png` en el CSS de `.hero-bg` | `assets/hero-bg.png` |
| `hero-bg.png` en `og:image`, `twitter:image` y JSON-LD `"image"` | `assets/hero-bg.png` (manteniendo el dominio que ya tienen; el dominio se corrige en M2, no ahora) |

Verificar con `grep` que no queda ninguna referencia a `directrices de marca/`
dentro de `public/`.

**Hecho cuando:** `grep -r "directrices de marca" public/` no devuelve nada, y al
levantar el servidor local desde `tools/serve.mjs` la página carga con logo e
imagen de fondo visibles. Mostrar una captura.

---

## Tarea 4 — Commit

Un commit con el mensaje
`Reestructura: public/, tools/, assets/ y rutas actualizadas`.

---

## Lo que NO se hace en M1

- No optimizar imágenes (es M2).
- No cambiar textos, títulos, metadatos ni JSON-LD salvo las rutas indicadas.
- No agregar `sitemap.xml`, `robots.txt` ni analítica (M4/M5).
- No instalar dependencias nuevas.
- No borrar `node_modules` (está ignorado; borrarlo es opcional y lo decide el
  propietario).

Si algo de la tarea no se puede hacer como está escrito, frená y preguntá.
