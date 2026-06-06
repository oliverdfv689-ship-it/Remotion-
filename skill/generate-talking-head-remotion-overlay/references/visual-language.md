# Visual Language

## Core Look

Build a high-impact Chinese talking-head overlay:

- transparent background for final alpha delivery
- cinematic dark glass panels
- high-contrast white Chinese type
- semantic colors: blue/cyan for technology, orange for money/opportunity, green for action/service/success, red for risk/cold-water/warning
- restrained glow with strong readable edges
- no persistent grid, progress bar, or subtitle layer
- no decorative lines that do not carry information

## Typography

Use a layered title package:

1. English stage header with wide tracking
2. Chinese subtitle line
3. semantic icon badge
4. large bold Chinese hero title
5. short support line or grouped labels

Hero titles should be consistent across the video:

- similar left-side anchor unless a special center impact is needed
- two-line Chinese layout when needed
- enough line gap so strokes do not touch
- short underline close to title width, not stretched across the frame
- readable hold state after the entrance

Animate hero text with:

- word or phrase stagger
- scan reveal
- short kinetic push
- spring overshoot
- glow pulse
- color switch by meaning

Do not fade hero titles to near-black after entrance.

## Layout

The speaker remains the emotional center. Routine information should support, not fight, the speaker.

- Left side: primary title, grouped labels, key numbers, action advice.
- Right side: logos, evidence screenshots, charts, real context images, semantic image panels.
- Center: only brief impact titles, translucent flows, or large evidence/demo windows.
- Bottom: avoid covering platform subtitles if the user's base video already has them.

If a right-side evidence/image panel is active, reduce duplicate text cards. If no evidence is active, right side may show a logo, chart, or concrete scene image.

## Labels

Side labels must be phone-readable and semantically grouped:

- use one category per group
- avoid splitting one group across both sides
- stagger entry by spoken rhythm
- keep visible long enough to read
- use compact width that fits content; do not make every label full-width
- prevent truncation
- vary icon and label type by meaning

Good labels are not decoration. They should help the viewer understand the current sentence.

## Icons and Logos

Use real original-color logos when available:

- OpenAI
- NVIDIA
- Sora
- Tencent
- Alibaba
- ByteDance / Doubao
- ROS
- Gazebo
- Isaac Sim
- other named brands or platforms

Use semantic icons for abstract ideas:

- alarm/warning for risk
- money/salary for income
- server/electricity for cost
- factory/robot for hardware
- wrench/tool for repair
- checklist for action steps
- comment/input/send for discussion CTA

Do not use the same generic icon for unrelated labels. A small icon that does not communicate meaning should be replaced or removed.

## Right-Side Visuals

Right-side content should add new information:

- official screenshot or evidence first
- real logo second
- real-world image third
- generated/semantic image only when no real source exists or the moment is conceptual

Examples:

- shared bike / new-energy bubble: use real or credible scene image only when the narration mentions it.
- GPU/electricity/cost: use data-center/server/electricity growth chart.
- Doubao call volume: use Doubao/ByteDance logo plus rising traffic chart.
- clinic/small company: use real office/front-desk/service scene.
- robot repair/debugging: use factory or robot-maintenance image.
- AI customer acquisition/customer service: use call-center/operator/customer-service scene.

If evidence screenshots are used, animate as full image -> key area zoom -> highlight lock -> exit. Do not keep an evidence window on screen after the spoken point has moved on.

## Charts and Numbers

Numbers need motion:

- roll or count up
- punch scale at the spoken number
- small bar/arrow/sparkline growth
- color by meaning

Separate the number from the title enough that the viewer can parse both. Keep units clear: `30-50万`, `1万亿`, `$295K-$380K`, `220万`, `5.56亿`.

## Flows

Use flows only when process narration needs them. Give flows lower priority than clear title, labels, evidence, and real images.

Flow boxes should fit their text, not stretch across the screen. Nodes should reveal sequentially with enough spacing. Avoid covering labels or titles.

## SFX

SFX should reinforce semantic motion:

- warning ping for risk
- low hit for major title
- scan/camera lock for evidence
- blip/roll for numbers
- tick for label entry
- confirm chime for completed action

Do not repeat one sound for every event.
