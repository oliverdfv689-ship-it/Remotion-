# QA Checklist

## Still Preview

- Aspect ratio and resolution match the request.
- No visible subtitles from the overlay unless requested.
- No grid, progress bar, or editor/player chrome.
- Big titles are consistent in position and line spacing.
- Underlines are close to title width, not stretched across the whole screen.
- Labels do not overlap titles, subtitles, or each other.
- Labels are grouped by one semantic category.
- Labels are readable at phone size.
- Icons are meaningful; no repeated generic icons for unrelated ideas.
- Real logos are original-color and large enough to recognize.
- Right-side content adds information and does not duplicate left-side text.
- Evidence images are clear enough to read key areas.
- Flow boxes fit text and do not cover important labels.

## Preview MP4

- Visual events match SRT semantics within tolerance.
- No title lasts across unrelated narration.
- No future conclusion appears early.
- Labels enter staggered and stay long enough.
- Evidence windows appear only when the source is discussed.
- Right-side images/logos do not stay past their spoken scope.
- Transitions are not too fast in the first minute.
- SFX varies by meaning and does not overwhelm speech.

## Final MOV

Use `ffprobe` or Remotion bundled `ffprobe.exe` to verify:

- width and height
- duration
- video codec is ProRes or other requested alpha codec
- pixel format contains alpha, such as `yuva444p12le`
- audio stream exists if embedded SFX was requested
- file is written to the expected final output directory

For this local environment, user-facing final deliverables should go to `D:\CodexOverlayOutput` unless the user says otherwise.
