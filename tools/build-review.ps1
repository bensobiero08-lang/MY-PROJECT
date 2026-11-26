# Builds dist/ythera-website-review.html: the whole site packed into one file
# (styles, code, photos and videos inside) so a reviewer can open it with no folder.
# Run from anywhere:  powershell -ExecutionPolicy Bypass -File tools\build-review.ps1
param(
  [string]$Site = (Split-Path $PSScriptRoot -Parent),
  [string]$Out  = (Join-Path (Split-Path $PSScriptRoot -Parent) 'dist\ythera-website-review.html')
)
$utf8 = New-Object System.Text.UTF8Encoding($false)
$html = [IO.File]::ReadAllText("$Site\index.html", $utf8)
$css  = [IO.File]::ReadAllText("$Site\css\styles.css", $utf8)
$js   = [IO.File]::ReadAllText("$Site\js\script.js", $utf8)

function Get-DataUri([string]$rel) {
  $p = Join-Path $Site $rel
  $mime = switch ([IO.Path]::GetExtension($p)) { '.jpg' {'image/jpeg'} '.png' {'image/png'} '.mp4' {'video/mp4'} }
  "data:$mime;base64," + [Convert]::ToBase64String([IO.File]::ReadAllBytes($p))
}

# Drop tags that only matter on a hosted site (and would duplicate big images)
$html = $html -replace '<meta property="og:image"[^>]*>\r?\n', ''
$html = $html -replace '<link rel="apple-touch-icon"[^>]*>\r?\n', ''
$html = $html -replace '\s*"image":"assets/img/rate-card.jpg",', ''

# Hero video: load from the shared media map instead of embedding it twice
$html = $html.Replace('<video src="assets/video/makeup.mp4" poster=', '<video id="heroVid" poster=')

# Reels: read videos and covers from the media map
$js = $js.Replace('src="assets/video/${f}.mp4" poster="assets/video/${f}.jpg"', 'src="${MEDIA[''v/''+f+''.mp4'']}" poster="${MEDIA[''v/''+f+''.jpg'']}"')
$js += "`n(function(){var h=document.getElementById('heroVid');if(h){h.src=MEDIA['v/makeup.mp4'];h.play&&h.play().catch(function(){});}})();`n"

# Inline CSS and JS
$html = $html.Replace('<link rel="stylesheet" href="css/styles.css">', "<style>`n$css`n</style>")
$html = $html.Replace('<script src="js/script.js"></script>', "<script>`n$js`n</script>")

# Embed every remaining image reference
$html = [regex]::Replace($html, 'assets/img/[A-Za-z0-9\-]+\.(jpg|png)', { param($m) Get-DataUri $m.Value })

# Media map for videos + covers, placed before the main script
$entries = Get-ChildItem "$Site\assets\video" -File | Sort-Object Name | ForEach-Object { "'v/$($_.Name)':'" + (Get-DataUri "assets/video/$($_.Name)") + "'" }
$media = "<script>const MEDIA={`n" + ($entries -join ",`n") + "`n};</script>`n"
$idx = $html.LastIndexOf("<script>`n")
$html = $html.Insert($idx, $media)

New-Item -ItemType Directory -Force (Split-Path $Out) | Out-Null
[IO.File]::WriteAllText($Out, $html, $utf8)
"{0} : {1:N1} MB" -f $Out, ((Get-Item $Out).Length / 1MB)
$left = [regex]::Matches($html, 'assets/(img|video)/[A-Za-z0-9\-]+\.(jpg|png|mp4)')
"Unembedded refs left: " + $left.Count
