# Production Workflow

## 1. Collect Inputs

Require:

- SRT transcript
- recording clips
- reference video, screenshots, or style link
- output directory

Prefer:

- talking-head video or a representative frame
- expected aspect ratio
- editor name, usually Jianying Pro / CapCut desktop

## 2. Analyze References First

Do not code immediately after receiving a style link. Inspect real reference frames or videos and summarize:

- where large titles appear
- how titles animate
- where side labels sit
- when center coverage is acceptable
- which icons are real brands
- how recordings are enlarged and annotated
- how charts and flows appear
- which visual clutter should be avoided

Generate a short visual-language proposal and 5-8 stills before a full render.

## 3. Parse and Plan the Timeline

Run:

```powershell
python scripts/srt_to_json.py input.srt --out captions.json --limit 140
```

Create:

- `scenes.json`: semantic segments with start and end times
- `moments.json`: important spoken moments and intended visual reveal times
- `sfx-events.json`: restrained audio cues

Split long chapters into lead-in and conclusion scenes. Do not reveal the conclusion at the start of a long chapter.

## 4. Match Recordings by Content

Probe each recording with `probe_media.ps1`. Inspect frames or play clips. Match by visible content:

- prompt input
- project generation
- missing-audio repair
- preview playback
- webpage or product state

Trim misleading portions. Do not rely on filenames or numeric order.

## 5. Build from the Template

Copy `assets/remotion-template` into a working directory. Replace:

- scene data
- copy
- SRT captions JSON
- demo assets
- composition duration
- SFX events

Keep routine overlays near the sides. Use the center only for brief hero-title impact, translucent flows, or large demo windows.

## 6. Render Stills

Render representative frames:

- opening
- first capability section
- manual workflow
- demo clip
- error repair
- chart
- tool comparison
- finale

Inspect readability at reduced size. A label that is only readable when zoomed in is too small.

## 7. Render Preview

Render a lightweight review MP4:

```powershell
npx remotion render src/index.ts CodexOverlay4x3 renders/preview.mp4 --codec=h264 --crf=22 --scale=0.25
```

Ask the user to review timing, overlap, density, and recording legibility.

## 8. Audit and Fix

Run:

```powershell
python scripts/timeline_audit.py moments.json
```

Fix all key moments beyond tolerance. Check for unrelated cards that spoil later conclusions.

## 9. Deliver Alpha MOV

Use `render_delivery.ps1` to render ProRes 4444 Alpha and mux the SFX WAV. Validate with `verify_delivery.ps1`.

Delete or archive intermediate MOV files after final confirmation. Retain the final MOV, preview MP4, SFX WAV, scene plan, and audit report.
