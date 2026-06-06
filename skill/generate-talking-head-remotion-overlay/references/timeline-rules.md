# Timeline Rules

## Principle

The SRT is the semantic animation clock. The overlay should feel like it is reacting to the speaker, not playing a separate slide deck.

## Key Moments to Track

Track visual trigger times for:

- opening hook
- misconception correction
- named brand/company/platform
- number or range
- evidence/source screenshot
- risk/cold-water point
- cost/loss/growth
- process step
- service/action advice
- final CTA

Create a `moments.json` or equivalent scene plan:

```json
[
  {
    "label": "OpenAI robotics hiring",
    "spoken_at": 55.2,
    "visual_at": 54.9,
    "tolerance": 0.6,
    "type": "brand_evidence",
    "scene": "openai_jobs"
  }
]
```

## Timing Guidance

- Stage header: 0.2-0.8 seconds before a section starts.
- Main title: 0.0-0.4 seconds before the spoken phrase.
- Key number: exact or within 0.4 seconds.
- Brand logo: near the brand mention; do not keep it into unrelated scenes.
- Evidence window: after the speaker introduces the specific source or proof.
- Right-side context image: when the concrete scene is being discussed, not before.
- Label: staggered by spoken clauses; keep 3-6 seconds if the idea continues.
- SFX: tied to the visual event, not randomly looped.

## Anti-Spoiler Rules

Flag and fix:

- conclusion visible before the setup is spoken
- company logos displayed after that company is no longer discussed
- right-side image unrelated to the current sentence
- key number shown for a whole earlier chapter
- labels all appearing at scene start before the speaker says them
- evidence screenshot held after the speaker changes topic

## Scene Splitting

Split any chapter longer than about 8-10 seconds unless the idea truly remains unchanged.

Examples:

- `openai_intro` -> `openai_job` -> `openai_salary` -> `sam_post`
- `nvidia_intro` -> `ai_factory` -> `physical_ai`
- `domestic_hardware` -> `big_companies` -> `infrastructure_spend`
- `sora_warning` -> `free_users` -> `compute_cost`
- `opportunity_intro` -> `service_path` -> `repair_debug` -> `customer_training`
- `small_business` -> `developer` -> `worker` -> `comment_cta`

Do not stretch one title across multiple semantic turns.

## Staggering Rules

Within one scene:

1. stage header first
2. title impact
3. first label or number
4. evidence/image/chart if the speaker introduces it
5. remaining labels one by one
6. clean exit before the next unrelated idea

Avoid a burst where title, labels, right image, and flow all enter in the same half-second.

## Manual Audit

After preview render, inspect at least:

- every section transition
- every evidence window start/end
- every brand/logo hold duration
- every number animation
- any place where the user reports overlap
- first 60 seconds, because early pacing decides retention
