# Troubleshooting

## Transparent MOV Is Too Large

Use 1440x1080 for 4:3 delivery instead of 3840x2880. Keep ProRes 4444 Alpha for Jianying stability. Expect several GB for a multi-minute overlay.

## MP4 Transparency Does Not Work

H.264 MP4 is a preview format, not the primary transparent delivery format. Use ProRes 4444 Alpha MOV.

## Chroma Key Is Unstable

Avoid green-screen MP4 as the primary method, especially when the talking-head background is gray or contains green-like tones.

## Demo Clips Are Unreadable

Increase the demo window, crop to the target region, and use 2-3 zoom states with callouts.

## Overlay Looks Busy

Remove grids, progress bars, decorative lines, repeated scans, and microtext. Group related labels and keep fewer, larger elements.

## Labels Cover Titles

Move the title upward, move grouped labels closer without crossing the subtitle, remove decorative lines, and render a still before a full preview.

## Timing Feels Wrong

Build a key-moment JSON file and run `timeline_audit.py`. Split setup and conclusion scenes.

## Recording Audio Leaks Into Final MOV

Render the visual composition and mux with FFmpeg using explicit mapping:

```powershell
-map 0:v:0 -map 1:a:0 -c:v copy -c:a pcm_s16le
```

This excludes accidental audio streams from recording clips.

## Browser or Studio Preview Fails

Use Remotion CLI still renders and lightweight MP4 previews. Do not block the project on Studio UI availability.
