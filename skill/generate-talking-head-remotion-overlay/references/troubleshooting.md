# Troubleshooting

## Style Feels Worse Than Reference

Do not add random elements. Rewatch or re-extract frames from the reference and compare:

- title size and position
- title hold duration
- side-label grouping
- icon usefulness
- evidence/image timing
- amount of empty space
- speed of transitions

Often the fix is better semantic timing, not more decoration.

## Timing Does Not Match SRT

Do not stretch one scene to cover a long paragraph. Split it into smaller semantic scenes and stagger elements by spoken clauses.

If many elements appear at once, use:

- title first
- label 1 after first clause
- label 2 after second clause
- evidence after the source phrase
- right image only if no evidence is active

## Overlap and Clutter

Common causes:

- flow has too high priority
- label group is too wide
- right-side text duplicates left-side labels
- evidence window starts before previous labels exit
- title line height is too tight

Fix by simplifying the active visual role. One strong idea beats five competing panels.

## Icons Look Meaningless

Replace generic icons with:

- real brand logo if named
- semantic icon if abstract
- real/context image if the concept is concrete
- no icon if it does not help

Warning icons should look like warnings. Service icons should look like service, repair, tools, or customer support. Money icons should look like money or growth.

## Evidence or Images Are Blurry

Prefer original screenshots and high-resolution images. For source screenshots, crop to the relevant area after showing the full image.

Avoid scaling a tiny screenshot to fill a large panel without a key-area zoom.

## Transparent MOV Is Huge

ProRes 4444 alpha files are large. If final alpha is required:

- render directly to the final large drive
- set `TMP` and `TEMP` to that drive
- reduce resolution only if the user accepts it
- keep a low-res MP4 preview for review

If rendering fails with `No space left on device`, delete failed local partial MOVs only after confirming they are not final deliverables.

## ffprobe Not Found

Use Remotion bundled ffprobe:

```powershell
Get-ChildItem -LiteralPath node_modules -Recurse -Filter ffprobe.exe
```

Then run the found executable against the final MOV.
