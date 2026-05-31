param(
  [Parameter(Mandatory = $true)][string]$InputMov,
  [Parameter(Mandatory = $true)][string]$Ffprobe,
  [int]$ExpectedWidth = 1440,
  [int]$ExpectedHeight = 1080,
  [int]$ExpectedFps = 30
)

$ErrorActionPreference = "Stop"
$json = & $Ffprobe -v error -show_streams -show_format -of json $InputMov | ConvertFrom-Json
$video = $json.streams | Where-Object codec_type -eq "video" | Select-Object -First 1
$audio = $json.streams | Where-Object codec_type -eq "audio" | Select-Object -First 1
$errors = @()

if (-not $video) { $errors += "Missing video stream" }
if ($video.width -ne $ExpectedWidth -or $video.height -ne $ExpectedHeight) { $errors += "Expected ${ExpectedWidth}x${ExpectedHeight}, got $($video.width)x$($video.height)" }
if ($video.codec_name -ne "prores") { $errors += "Expected ProRes video, got $($video.codec_name)" }
if ($video.pix_fmt -notmatch "^yuva") { $errors += "Expected Alpha pixel format beginning with yuva, got $($video.pix_fmt)" }
if ($video.r_frame_rate -ne "${ExpectedFps}/1") { $errors += "Expected ${ExpectedFps}fps, got $($video.r_frame_rate)" }
if (-not $audio) { $errors += "Missing audio stream" }
if ($audio -and $audio.sample_rate -ne "48000") { $errors += "Expected 48kHz audio, got $($audio.sample_rate)" }
if ($audio -and $audio.channels -ne 2) { $errors += "Expected stereo audio, got $($audio.channels) channels" }

[pscustomobject]@{
  Path = (Resolve-Path $InputMov).Path
  Codec = $video.codec_name
  PixelFormat = $video.pix_fmt
  Dimensions = "$($video.width)x$($video.height)"
  Fps = $video.r_frame_rate
  Audio = if ($audio) { "$($audio.codec_name), $($audio.sample_rate) Hz, $($audio.channels) channels" } else { "missing" }
  Duration = $json.format.duration
  SizeGB = [math]::Round([double]$json.format.size / 1GB, 2)
}

if ($errors.Count) {
  Write-Error ($errors -join "; ")
  exit 1
}
Write-Host "Delivery validation passed."
