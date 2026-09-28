# Revisión ronda post-M3 · P-044, finales de línea del repositorio

- **Qué se revisó:** la creación de `.gitattributes` y el `git add
  --renormalize .`, **sin commitear**, sobre `5fb2cf4`.
- **Fecha:** 2026-09-28.
- **Quién:** subagente `revisor` (`.claude/agents/revisor.md`).
- **Vueltas:** 1. **APROBADO CON OBSERVACIONES**, sin hallazgos bloqueantes.

Va en pasada propia porque es el único punto de la ronda que toca la
**configuración del repositorio**, que es de las cosas que `CLAUDE.md` §7
manda consultar y no decidir.

---

## La condición de Ramiro se cumple

> *"verificá que el commit no cambia el contenido de ningún archivo, solo
> finales de línea. Si cambiara algo más, frená."*

El revisor no se conformó con `git diff --cached --name-only`: **armó el árbol
que produciría el commit** y lo comparó contra `HEAD`.

```
$ git write-tree
6ffe8d4a60b8187ad857a2ab6fb3b2f02d36c16a
$ git diff-tree -r --name-status HEAD 6ffe8d4a...
A	.gitattributes
$ git diff-tree -r --numstat HEAD 6ffe8d4a...
17	0	.gitattributes
```

Y después, **blob por blob**:

```
$ git ls-tree -r HEAD | awk '{print $3,$4}' | sort -k2   → 78 líneas
$ git ls-files -s      | awk '{print $2,$4}' | sort -k2   → 79 líneas
$ diff head.txt idx.txt
1a2
> 180c7c313c43abfe774ecdb81070044dd2506bfe .gitattributes
```

> Los 78 blobs de `HEAD` están **byte por byte idénticos** en el índice. […]
> Tu punto 4 queda superado por esta comprobación, que es más fuerte que la de
> sha256 ignorando saltos: acá la comparación es **sin ignorar nada**.

## Que `eol=lf` le gane a `core.autocrlf=true`: probado, no leído

`core.autocrlf` sigue en `true`, y viene del gitconfig del sistema. El revisor
armó **dos repositorios de control desechables**, fuera de este repositorio,
con el mismo archivo y `autocrlf=true` en los dos:

```
sin .gitattributes    → CR tras checkout: 3   (git avisa "LF will be replaced by CRLF")
con este .gitattributes → CR tras checkout: 0   (git avisa "CRLF will be replaced by LF")
```

**Es exactamente la trampa que P-044 venía a cerrar, y queda cerrada.** En el
mismo banco probó que un `imagen.png` con bytes `\r\n` adentro sobrevive al
checkout **byte por byte intacto**, y que un `.pdf` sin regla propia es
detectado como binario por `text=auto` y también sobrevive.

`git check-attr` sobre los 79 archivos versionados:

```
21 binary: set         21 text: unset
58 binary: unspecified 58 text: auto
79 eol: lf
```

El conjunto con `binary: set` coincide **exactamente** con el que git detecta
como binario en el índice: `diff` de las dos listas, vacío. Las extensiones en
mayúscula también quedan cubiertas (`foto.JPG`, `foto.PNG`).

## Los dos riesgos que le pedí mirar

**Binarios fuera de la lista: ninguno hoy.** Censo de extensiones versionadas:
44 `md`, 8 `png`, 5 `mjs`, 4 `woff2`, 4 `webp`, 3 `avif`, 2 `json`, 2 `jpg`, 2
`html`, 1 `xml`, 1 `txt`, 1 `ps1`, más `.gitignore` y `.gitattributes`. Los
binarios reales son **21 y los 21 están cubiertos**. No hay ningún `.pdf`,
`.zip`, `.gif`, `.mp4`, `.ttf` ni `.woff` en el repositorio.

**`tools/recortar_logo.ps1`: no corre riesgo.**

```
$ git ls-files --eol tools/recortar_logo.ps1
i/lf    w/lf    attr/text=auto eol=lf
```

Ya estaba en LF en el índice **y** en el árbol de trabajo desde antes, así que
el `.gitattributes` no le cambia un byte. PowerShell ejecuta con LF sin
problema, y no hay ningún `.bat` ni `.cmd` en el repositorio.

## Sobre mi decisión propia: la cuestionó y queda en pie

```
$ git show HEAD:tools/auditar-contraste.mjs | sha256sum
dcb3f8ee02954bbd851bbfe1590f4f68ae1588573619a19afe2b8382967cf3da
$ sha256sum tools/auditar-contraste.mjs
dcb3f8ee02954bbd851bbfe1590f4f68ae1588573619a19afe2b8382967cf3da
```

> Idéntico al blob ya commiteado. La operación es un no-op para git, no entra
> al commit, y deja el archivo exactamente como lo dejaría el próximo checkout
> con el `.gitattributes` puesto. **Daño: cero, medido.**
>
> Lo que sí observo: Ramiro no nombró ese archivo […] La condición se refería
> al contenido del commit, no al árbol de trabajo, así que no hay
> incumplimiento literal — pero **la lectura conservadora era dejarlo** y que
> lo arreglara solo el checkout siguiente.

→ Registrada como **P-052**.

---

## Hallazgos

1. **[MENOR] Separador `---` duplicado** donde se reinsertó P-044, el único del
   archivo. Es el mismo defecto de mi script de mover entradas que ya había
   aparecido nueve veces en la pasada anterior. → **Corregido**, y esta vez
   **arreglado el script de raíz**, para que no agregue un separador cuando el
   archivo ya termina en uno.
2. **[MENOR] La lista de binarios no cubre las extensiones vecinas** (`*.jpeg`,
   `*.woff`, `*.ttf`, `*.pdf`…). Aclara que **poner solo las seis que dictó
   Ramiro es lo correcto**: agregar más habría sido decidir por él. El riesgo
   es acotado porque `text=auto` detecta binarios por contenido, y solo se
   corrompería uno sin ningún byte nulo en sus primeros 8 kB. → **Anotado como
   P-053**, abierta, para que Ramiro decida sobre `*.jpeg` y `*.woff`.
3. **[MENOR] La decisión propia estaba dentro de P-044** y no como entrada
   numerada, mientras que el resto de la ronda sí las tiene. → **Corregido**:
   **P-052**.
4. **[MENOR, proceso] `docs/preguntas-abiertas.md` estaba modificado y sin
   preparar**, y un `git commit -a` habría roto la condición de Ramiro. →
   **Atendido**: el `.gitattributes` va en su propio commit, y el registro en
   otro.

---

## Verificaciones corridas

| Verificación | Resultado |
|---|---|
| `git write-tree` + `git diff-tree -r HEAD <tree>` | `A .gitattributes`, 17/0. **Un solo archivo en el commit** |
| 78 blobs de `HEAD` contra los del índice | **idénticos**; el `diff` solo agrega `.gitattributes` |
| Árbol de trabajo contra índice, sha256, los 79 archivos | difiere uno: la edición sin preparar de `preguntas-abiertas.md`. **Los 21 binarios, intactos** |
| `git check-attr text eol binary` sobre los 79 | 58 `text=auto`, 21 `text=unset`, 79 `eol=lf`, 21 `binary=set` |
| Conjunto `binary: set` contra el `i/-text` del índice | **coinciden exactamente**, `diff` vacío |
| `eol=lf` contra `core.autocrlf=true`, repos de control | sin el archivo: **3 CR**; con el archivo: **0 CR** |
| PNG con `\r\n` tras borrar y `git checkout` | `od -c` idéntico: la regla `binary` protege |
| `.pdf` sin regla propia | detectado binario por `text=auto`, intacto |
| `check-attr` sobre 15 extensiones hipotéticas | `.ico`, `.JPG` y `.PNG` → `binary=set`; el resto → `text=auto` |
| Censo de extensiones versionadas | 21 binarios reales, **los 21 cubiertos** |
| Barrido de bytes `\r` en los 58 archivos de texto | **cero CR en todo el repositorio** |
| `tools/recortar_logo.ps1` | ya en LF desde antes, sin BOM, sin cambios |
| `tools/auditar-contraste.mjs` | sha256 del disco **=** sha256 del blob de `HEAD` |
| "~2000 líneas de `public/index.html`" del comentario | `wc -l` = **1993** |
| "Pasó dos veces, en M2c y al aplicar P-034" | respaldado por la nota de proceso de P-034 |
| Nombre y ubicación del archivo nuevo | minúsculas, sin espacios ni acentos, en la raíz, **fuera de `public/`** |
| Fin de archivo con salto de línea | `.gitattributes` y `recortar_logo.ps1`, los dos |
| Preguntas abiertas | dos en ese momento: P-007 y P-049 |

## No verificado

- **El estado previo** (56 `i/lf w/lf` y los 198 CR de
  `tools/auditar-contraste.mjs`): no es reproducible, porque el cambio ya está
  aplicado y no se puede usar `git stash`, `checkout` ni `restore`. Lo
  corroboró **indirectamente** y da consistente: 58 + 21 = 79, que es 78
  anteriores más `.gitattributes`.
- **La batería técnica habitual** (barrido de desborde, contraste, errores de
  JavaScript). El revisor la declara **no aplicable con prueba, no aprobada sin
  medir**: demostró que **ni un byte de `public/` cambió**, así que el sitio es
  exactamente el que ya pasó las revisiones anteriores.
