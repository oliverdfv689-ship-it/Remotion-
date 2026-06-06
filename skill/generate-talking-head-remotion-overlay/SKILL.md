---
name: generate-talking-head-remotion-overlay
description: Generate polished transparent Remotion motion-graphics overlays for Chinese talking-head short videos from SRT captions, source videos, screenshots, reference videos, and user feedback. Use when Codex must analyze spoken-script semantics, design kinetic large Chinese titles, grouped phone-readable labels, real brand logos, evidence windows, image-first right-side context panels, charts, flow diagrams, synchronized SFX, preview MP4s, and Jianying Pro / CapCut-compatible ProRes 4444 Alpha MOV deliverables.
---

# Generate Talking-Head Remotion Overlay

Build a transparent Remotion overlay for compositing above a talking-head video. The overlay must behave like an information director: every title, label, icon, evidence screenshot, chart, flow, image, and sound cue should support the spoken idea at the moment it is spoken.

## Mandatory Workflow

1. Inventory the SRT, talking-head video, recordings, screenshots, reference videos, style links, and output requirements.
2. Determine the final aspect ratio from the source video and user request. Do not assume 4:3 or 9:16.
3. Read `references/workflow.md`, `references/visual-language.md`, `references/timeline-rules.md`, and `references/qa-checklist.md`.
4. Analyze reference videos before coding. Extract large-title placement, animation rhythm, side-label grouping, icon treatment, evidence/image timing, and density.
5. Parse the SRT with `scripts/srt_to_json.py`. Build a fine-grained semantic scene plan, not a coarse chapter plan.
6. Match recordings by visible content. Never map clips by filename order alone.
7. Collect real brand logos and real evidence/context images when spoken concepts need them. If a real asset is missing, generate or design a semantic icon, but do not label it as real evidence.
8. Scaffold or reuse a Remotion project with `scripts/scaffold_project.ps1`; adapt the template to the current script, assets, aspect ratio, and editor requirements.
9. Render representative stills first. Inspect overlap, timing, right-side content, title consistency, and phone readability before a full preview.
10. Render lightweight preview MP4s, often in segments, for user review.
11. Run a timeline audit and manually inspect problem periods. Fix semantic drift, fast jumps, premature reveals, missing labels, overlong logos, overlapping cards, and unreadable assets.
12. Render the final transparent MOV only after preview approval.
13. Validate final output with `scripts/verify_delivery.ps1` or bundled `ffprobe`: dimensions, duration, alpha pixel format, audio, and file size.

Do not skip the still-preview and MP4-preview gates unless the user explicitly asks to skip them.

## Output Contract

Default final output for Jianying Pro / CapCut desktop:

- Transparent ProRes 4444 MOV
- Alpha pixel format such as `yuva444p12le`
- 30 fps unless the source/project requires otherwise
- synchronized PCM stereo SFX when requested
- separate SFX WAV stem when useful for later mixing
- lightweight H.264 MP4 preview

Use the requested aspect ratio and resolution. Known successful targets:

- 4:3: `1440x1080`
- 16:9: `1920x1080`

Place final user-facing deliverables in the user's chosen output directory. In this local environment, prefer `D:\CodexOverlayOutput` for final deliverables when no other directory is specified.

## Core Production Rules

- Treat the SRT as the semantic animation timeline, not as visible subtitles.
- Do not display talking-head subtitles unless explicitly requested.
- Split the script into small spoken ideas. Avoid one title lasting 20-30 seconds unless the narration truly stays on one idea.
- Trigger key numbers, brands, risks, evidence, and conclusions when spoken. A 0.2-0.6 second lead-in is acceptable; multi-second spoilers are not.
- Group related labels together. Do not split one category across left and right sides.
- Labels should enter staggered and stay long enough to read. Avoid all elements popping in at once and disappearing quickly.
- Keep routine labels on the left first when possible. Use the right side primarily for logos, evidence screenshots, charts, real context images, and semantic visual panels.
- If the right side has evidence or a strong image, hide redundant right-side text cards.
- Use real brand icons/logos when they exist. Use semantic icons for abstract ideas.
- Use charts for numbers, evidence windows for proof, real/context images for concrete scenes, flow diagrams only when process narration needs them.
- Evidence screenshots should animate as: full image -> key area zoom -> highlight/lock -> clean exit.
- Avoid decorative clutter: no persistent grids, progress bars, long stray lines, meaningless circles, or icons that do not add understanding.
- Allow large titles, evidence, or diagrams to briefly cover the speaker only when the moment needs impact or clarity.

## Semantic Motion Mapping

Use dedicated motion language by meaning:

- Risk / warning: red or orange warning icon, alarm pulse, short pressure hit, darker wash.
- Money / opportunity: orange or green numbers, rolling counter, impact scale, arrow growth.
- Evidence: scan-in window, camera lock, key-area zoom, verified source border.
- Brand / platform: real logo lock-on, badge scale, scan highlight, short hold.
- Process: checklist or step nodes, one-by-one reveal, short confirm cue.
- Repair / service: wrench/tool/check icons, practical scene image, green confirm motion.
- Comment / CTA: input cursor, typed text, send button or discussion bubble.

## Template

Use `assets/remotion-template` as the starting point when useful. It contains a proven component family:

- kinetic stage header
- large two-line title
- semantic icon badge
- grouped side labels
- real brand badge rail
- evidence/image window
- flow overlay
- chart layer
- demo window
- transparent composition defaults

Replace all example text, timings, recordings, assets, SFX, and output parameters for each new project.

## Scripts

- `scripts/srt_to_json.py`: parse SRT captions into JSON and readable timelines.
- `scripts/scaffold_project.ps1`: copy the reusable Remotion style template into a clean working directory.
- `scripts/probe_media.ps1`: inspect source clips.
- `scripts/timeline_audit.py`: flag visual trigger drift and early spoilers.
- `scripts/gen_sfx.cjs`: generate restrained stereo SFX stems.
- `scripts/render_delivery.ps1`: render preview or transparent ProRes output.
- `scripts/verify_delivery.ps1`: verify dimensions, alpha, frame rate, duration, and audio.

## Review Gates

Before showing stills, check:

- title and label overlap
- line spacing inside multi-line Chinese titles
- center speaker safe area
- phone-size readability
- grouped labels and enough reading time
- evidence/context image clarity
- icon meaning and prominence
- right-side content not duplicating left-side text
- chart and number semantics

Before final delivery:

```powershell
.\scripts\verify_delivery.ps1 -InputMov <final.mov> -Ffprobe <ffprobe.exe>
```

If the full ProRes render fails for disk space, remove failed local partial renders and render directly to a large output drive with `TMP` and `TEMP` also pointed there.

## Detailed References

- `references/workflow.md`: end-to-end production procedure.
- `references/visual-language.md`: visual rules derived from user-reviewed reference-video iterations.
- `references/timeline-rules.md`: SRT alignment, anti-spoiler, and staggered element rules.
- `references/qa-checklist.md`: still, preview, alpha, and Jianying delivery checks.
- `references/troubleshooting.md`: browser, file size, transparency, audio, and encoding fixes.
- `references/user-prompt-template.md`: reusable intake prompt for beginners.
