param(
  [Parameter(Mandatory = $true)][ValidateSet("preview", "alpha")][string]$Mode,
  [Parameter(Mandatory = $true)][string]$ProjectDir,
  [Parameter(Mandatory = $true)][string]$Output,
  [string]$Ffmpeg,
  [string]$SfxStem,
  [string]$Composition = "CodexOverlay4x3Silent"
)

$ErrorActionPreference = "Stop"
Push-Location $ProjectDir
try {
  if ($Mode -eq "preview") {
    npx remotion render src/index.ts CodexOverlay4x3 $Output --codec=h264 --crf=22 --scale=0.25
    exit $LASTEXITCODE
  }

  if (-not $Ffmpeg) { throw "Alpha mode requires -Ffmpeg" }
  if (-not $SfxStem) { throw "Alpha mode requires -SfxStem" }
  $intermediate = [System.IO.Path]::ChangeExtension($Output, ".video.mov")
  npx remotion render src/index.ts $Composition $intermediate --image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444 --scale=0.375
  if ($LASTEXITCODE -ne 0) { throw "Remotion render failed" }
  & $Ffmpeg -y -i $intermediate -i $SfxStem -map 0:v:0 -map 1:a:0 -c:v copy -c:a pcm_s16le -shortest $Output
  if ($LASTEXITCODE -ne 0) { throw "FFmpeg mux failed" }
  Write-Host "Wrote $Output"
  Write-Host "Intermediate video retained at $intermediate. Delete it after validating the final MOV."
}
finally {
  Pop-Location
}
