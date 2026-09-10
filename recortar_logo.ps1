Add-Type -AssemblyName System.Drawing

$srcPath = 'c:\Users\LEANDRO\Desktop\Centro Mecanico DGP\Prueba Claude\directrices de marca\logo-dgp.png'
$dstPath = $srcPath

$src = [System.Drawing.Bitmap]::new($srcPath)
$w = $src.Width
$h = $src.Height

Write-Host "Imagen original: $w x $h"

# ── Detectar borde del círculo escaneando desde cada lado ──
$threshold = 220  # umbral para "blanco de fondo"

function Is-Background($r, $g, $b) {
    return ($r -gt $threshold -and $g -gt $threshold -and $b -gt $threshold)
}

$minX = $w; $maxX = 0; $minY = $h; $maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $src.GetPixel($x, $y)
        if (-not (Is-Background $p.R $p.G $p.B)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Bounding box logo: ($minX,$minY) → ($maxX,$maxY)"

# ── Hacer el crop cuadrado centrado en el círculo ──
$cx = [int](($minX + $maxX) / 2)
$cy = [int](($minY + $maxY) / 2)
$radius = [int]([Math]::Max($maxX - $minX, $maxY - $minY) / 2) + 2

$cropX = [Math]::Max(0, $cx - $radius)
$cropY = [Math]::Max(0, $cy - $radius)
$cropW = [Math]::Min($w - $cropX, $radius * 2)
$cropH = [Math]::Min($h - $cropY, $radius * 2)

Write-Host "Crop area: ($cropX,$cropY) size: $cropW x $cropH | centro: ($cx,$cy) radio: $radius"

# ── Crear imagen de salida con canal alfa ──
$out = [System.Drawing.Bitmap]::new($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $srcX = $cropX + $x
        $srcY = $cropY + $y
        $p = $src.GetPixel($srcX, $srcY)

        # Calcular distancia al centro del círculo
        $dx = $srcX - $cx
        $dy = $srcY - $cy
        $dist = [Math]::Sqrt($dx*$dx + $dy*$dy)

        if ($dist -gt $radius) {
            # Fuera del círculo → transparente
            $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } elseif (Is-Background $p.R $p.G $p.B) {
            # Pixel blanco de fondo dentro del círculo → verificar si está en la esquina
            # Si está muy cerca del borde exterior → transparente (anti-aliasing del fondo)
            if ($dist -gt ($radius - 3)) {
                $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $p.R, $p.G, $p.B))
            } else {
                # Blanco interior (fondo del logo) → mantener
                $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
            }
        } else {
            # Pixel del logo → copiar tal cual con alpha completo
            $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
        }
    }
}

$src.Dispose()
$out.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$out.Dispose()

Write-Host "Guardado: $dstPath"
Write-Host "Tamaño final: $((Get-Item $dstPath).Length) bytes"
