# QA Checklist

## Still Review

- Render 5-8 key stills before any full preview.
- Confirm title readability at phone scale.
- Confirm label groups are not scattered.
- Confirm no title or subtitle is covered by labels.
- Confirm demo windows show readable content.
- Confirm brand icons are real when available.
- Confirm routine elements preserve a center talking-head area.

## Preview Review

- Watch the full MP4 preview.
- Compare important visuals against SRT.
- Confirm no grids, progress bars, or visible talking-head subtitles.
- Confirm SFX vary by meaning and do not fire constantly.
- Confirm no future conclusion appears in an earlier scene.
- Confirm labels are large enough for mobile viewing.

## Delivery Review

- Render 1440x1080 at 30 fps unless the user requests another 4:3 size.
- Use ProRes 4444 Alpha MOV.
- Mux only the transparent video stream and the dedicated SFX stem.
- Verify Alpha pixel format with FFprobe.
- Verify PCM stereo audio at 48 kHz.
- Verify duration matches the SRT-driven composition.
- Retain a low-resolution preview MP4.

## Jianying Pro

- Import talking-head video.
- Place it on the lower track.
- Place Alpha MOV on the upper track from 00:00.
- Do not enable chroma key.
- Review edge quality, visibility, and SFX level.
