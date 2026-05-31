---
name: generate-talking-head-remotion-overlay
description: Generate polished transparent Remotion motion-graphics overlays for talking-head short videos from SRT captions, screen recordings, reference videos or style links, and user feedback. Use when Codex must analyze references, map recordings to spoken segments by content, build large kinetic Chinese titles, grouped side labels, real brand icons, flow diagrams, charts, demo windows, synchronized SFX, preview MP4s, and CapCut/Jianying-compatible ProRes 4444 Alpha MOV deliverables.
---

# Generate Talking-Head Remotion Overlay

Build a transparent motion-graphics layer for compositing above a talking-head video. Optimize for mobile viewing, semantic timing, and direct import into Jianying Pro / CapCut desktop.

## Mandatory Workflow

1. Inventory the provided SRT, recordings, talking-head video, screenshots, and reference videos or links.
2. Read `references/workflow.md` and `references/visual-language.md`.
3. Analyze references before coding. Extract title animation, side-label placement, icon use, chart style, demo-window motion, density, and color rules.
4. Parse the SRT with `scripts/srt_to_json.py`. Build a scene plan and key-moment audit.
5. Inspect recordings by content. Never map demo clips by filename order alone.
6. Run `scripts/scaffold_project.ps1` to copy `assets/remotion-template` into a new project folder. Adapt the template to the current script and assets.
7. Render 5-8 representative stills first. Show them to the user before rendering a full preview.
8. Render a lightweight MP4 preview only after stills pass.
9. Run `scripts/timeline_audit.py`. Fix early spoilers, late reveals, semantic mixing, overlaps, and unreadable labels.
10. Render the final transparent MOV only after the user confirms the preview.
11. Mux the dedicated SFX stem and validate the final delivery with `scripts/verify_delivery.ps1`.

Do not skip the still-preview and MP4-preview gates unless the user explicitly asks to skip them.

## Output Contract

Default final output:

- 4:3 aspect ratio
- 1440x1080
- 30 fps
- transparent ProRes 4444 MOV
- Alpha pixel format such as `yuva444p12le`
- synchronized PCM stereo SFX
- separate SFX WAV stem
- low-resolution H.264 MP4 preview

Use transparent MOV for Jianying Pro. Do not recommend chroma-key MP4 as the primary delivery path.

## Semantic Rules

- Treat the SRT as the animation trigger timeline, not as visible subtitles.
- Do not display talking-head subtitles unless explicitly requested.
- Trigger key numbers, brands, and conclusions when spoken. A lead-in of 0.2-0.6 seconds is acceptable; multi-second spoilers are not.
- Group semantically related labels together. Do not mechanically split a category across left and right sides.
- Use real brand icons when they exist. Use simulated icons only for abstract concepts.
- Use flow diagrams for processes, charts for numeric claims, and demo windows for recordings.
- Keep routine information near the left or right middle area. Allow large titles or translucent flows to cross the center only briefly.
- Remove grids, progress bars, decorative line clutter, and persistent overlays unless the user explicitly requests them.

## Template

Use `assets/remotion-template` as the visual starting point. It contains the proven component family:

- kinetic stage header
- large two-line title
- numbered badge
- grouped side rails
- real brand badge rail
- flow overlay
- chart layer
- animated demo window
- transparent composition defaults

The template contains example copy and scene structure. Replace example scenes, text, timings, recordings, and SFX events for each new project. Do not reuse example narration as final content.

## Scripts

- `scripts/srt_to_json.py`: Parse SRT captions into structured JSON and print a readable timeline.
- `scripts/scaffold_project.ps1`: Copy the reusable Remotion style template into a clean working directory.
- `scripts/probe_media.ps1`: Inspect durations, resolution, frame rate, and audio streams for source clips.
- `scripts/timeline_audit.py`: Compare spoken moments with visual triggers and flag timing drift or premature reveals.
- `scripts/gen_sfx.cjs`: Generate a restrained stereo SFX stem from an events JSON file.
- `scripts/render_delivery.ps1`: Render preview or transparent ProRes output and mux the SFX stem.
- `scripts/verify_delivery.ps1`: Verify dimensions, Alpha pixel format, frame rate, duration, and audio.

## Review Gates

Before showing stills, check:

- title and label overlap
- center talking-head safe area
- phone-size readability
- grouped labels
- demo recording legibility
- icon prominence
- chart semantics

Before final delivery, read `references/qa-checklist.md` and run:

```powershell
.\scripts\verify_delivery.ps1 -InputMov <final.mov> -Ffprobe <ffprobe.exe>
```

## Detailed References

- `references/workflow.md`: end-to-end production procedure
- `references/visual-language.md`: visual rules derived from the reference-video iteration
- `references/timeline-rules.md`: SRT alignment and anti-spoiler rules
- `references/qa-checklist.md`: still, preview, Alpha, and Jianying delivery checks
- `references/troubleshooting.md`: browser, file size, transparency, audio, and encoding fixes
- `references/user-prompt-template.md`: reusable intake prompt for beginners
