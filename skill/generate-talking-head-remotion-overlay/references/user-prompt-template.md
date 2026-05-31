# Beginner Intake Prompt

```text
Please use the generate-talking-head-remotion-overlay skill to make a transparent Remotion motion-graphics overlay for my talking-head video.

Inputs:
- SRT transcript: <path>
- talking-head video or representative screenshot: <path>
- screen recording folder: <path>
- reference videos, screenshots, or style links: <paths or links>
- output folder: <path>

Requirements:
- 4:3 aspect ratio
- final output: 1440x1080, 30fps, ProRes 4444 Alpha MOV
- intended editor: Jianying Pro / CapCut desktop
- no talking-head subtitles
- no grid
- no progress bar
- keep routine labels near the left or right middle zones
- allow large titles to cover the center only briefly
- use real icons for Codex, Remotion, Cursor, Claude, and other existing brands
- use flows for process narration and charts for numeric claims
- map recordings to the SRT by visible content, not filename order
- add varied restrained SFX without full BGM

Workflow:
1. Analyze references first.
2. Produce a source-clip mapping table and a key SRT timing table.
3. Render 5-8 still previews first.
4. After still confirmation, render a lightweight MP4 preview.
5. Audit key moments against SRT and fix spoilers or late reveals.
6. After preview confirmation, render the Alpha MOV and separate SFX WAV.
7. Validate the final delivery with FFprobe.
```
