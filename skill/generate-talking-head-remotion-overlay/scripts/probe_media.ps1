param(
  [Parameter(Mandatory = $true)][string]$Ffprobe,
  [Parameter(Mandatory = $true)][string[]]$Inputs
)

$ErrorActionPreference = "Stop"
foreach ($inputPath in $Inputs) {
  Write-Host "`n=== $inputPath ==="
  & $Ffprobe -v error `
    -show_entries format=duration,size `
    -show_entries stream=index,codec_name,codec_type,width,height,r_frame_rate,sample_rate,channels `
    -of default=noprint_wrappers=1 `
    $inputPath
}
