# Production Workflow

## 1. Collect Inputs

Required:

- talking-head video or at least a representative frame
- SRT transcript
- source screenshots, recordings, or evidence images
- output aspect ratio, resolution, and editor

Recommended:

- reference videos or screenshots
- target platform and audience
- known final output directory
- whether SFX should be embedded and/or separated

If aspect ratio is unclear, inspect the source video before planning. Never assume the previous project's ratio.

## 2. Analyze References First

Do not code immediately after receiving a style link or reference video. Extract:

- large-title positions and hold times
- title entrance and exit rhythm
- side-label grouping and reading duration
- icon size, meaning, and brand treatment
- right-side image/evidence behavior
- chart and number animation treatment
- when center coverage is acceptable
- what visual clutter is absent

Summarize the gap between the current project and references before editing. The goal is not "more elements"; it is better semantic motion.

## 3. Parse and Plan the Timeline

Run:

```powershell
python scripts/srt_to_json.py input.srt --out captions.json
```

Create or update:

- `scenes.json`: fine-grained semantic scenes
- `moments.json`: spoken key moments and visual reveal times
- `assets-map.json`: which real logo/image/evidence belongs to each scene
- `sfx-events.json`: impact, scan, warning, tick, confirm events

Split long narration into small ideas. Example: `OpenAI hiring` -> `job exists` -> `salary range` -> `original post` should not be one static 30-second title.

## 4. Choose the Visual Layer for Each Spoken Idea

For each scene, choose one main communication role:

- Big title: conclusion, risk, warning, opportunity, action advice.
- Labels: supporting points that should stay readable for several seconds.
- Evidence window: proof screenshot or source material.
- Right-side image: real-world context, concrete scene, or brand logo when no evidence screenshot is active.
- Chart/number: salary, cost, loss, growth, demand, call volume.
- Flow/checklist: process, path, steps, action plan.

Avoid showing several full-strength roles at once. If evidence is active, reduce or hide right-side decorative content.

## 5. Match Recordings and Images by Meaning

Probe media with `probe_media.ps1`. Inspect frames or play clips.

Match by visible content and spoken meaning:

- prompt input
- project generation
- missing-audio repair
- preview playback
- official evidence screenshot
- company logo or product scene
- factory/repair/service scene

Do not rely on filenames or numeric order.

## 6. Build from the Template

Copy `assets/remotion-template` into a working directory or reuse the current Remotion project. Replace:

- scene data
- text
- SRT JSON
- image and video assets
- logo assets
- composition duration
- aspect ratio and dimensions
- SFX events

Keep the component system modular: stage header, big title, semantic icon, grouped labels, evidence window, right context image, chart, flow, demo window.

## 7. Render Stills

Render 8-15 representative stills when the video is long:

- opening
- first brand/evidence moment
- first numeric moment
- reference-like title moment
- each major section
- risk/cold-water moment
- opportunity/action moment
- final CTA

Inspect every still at reduced size. If phone viewers cannot read it quickly, simplify or enlarge.

## 8. Render Preview

Render a lightweight MP4 preview. For long videos, render segment previews around problem areas first.

Review:

- Does the visual appear when the line is spoken?
- Does anything reveal a future conclusion early?
- Do labels stay long enough?
- Are transitions too fast?
- Does a right-side image duplicate left-side text?
- Are there quiet gaps with no useful prompt?
- Are there overlaps or truncated labels?

## 9. Audit and Fix

Run:

```powershell
python scripts/timeline_audit.py moments.json
```

Then manually inspect the actual preview. Fix:

- early spoilers
- late evidence
- overlong brand logos
- all-at-once card bursts
- fast jumps
- title/label overlap
- image clarity
- meaningless icons
- right-side content covering the speaker without need

## 10. Deliver Alpha MOV

Render ProRes 4444 Alpha only after preview approval. Validate with `verify_delivery.ps1` or `ffprobe`.

If the MOV is huge:

- keep ProRes 4444 for native alpha when the editor supports it
- render directly to the final output drive
- set `TMP` and `TEMP` to that drive
- reduce resolution only if the user accepts it
- keep a low-res MP4 preview for review

Retain the final MOV, preview MP4, SFX WAV, scene plan, and audit report. Archive or delete intermediate failed renders.
