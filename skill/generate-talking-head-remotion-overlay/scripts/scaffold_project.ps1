param(
  [Parameter(Mandatory = $true)][string]$SkillDir,
  [Parameter(Mandatory = $true)][string]$Destination
)

$ErrorActionPreference = "Stop"
$template = Join-Path $SkillDir "assets\remotion-template"
if (-not (Test-Path -LiteralPath $template)) {
  throw "Template not found: $template"
}
if (Test-Path -LiteralPath $Destination) {
  throw "Destination already exists: $Destination"
}

New-Item -ItemType Directory -Path $Destination | Out-Null
Copy-Item -Path (Join-Path $template "*") -Destination $Destination -Recurse -Force
Write-Host "Copied Remotion template to $Destination"
Write-Host "Next: run npm install inside the project, replace placeholder recordings, convert the SRT, and adapt scene timings."
