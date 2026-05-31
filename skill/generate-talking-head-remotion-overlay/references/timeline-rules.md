# Timeline Rules

## Principle

Treat SRT timing as semantic animation timing. The overlay must support the spoken argument, not run independently.

## Key Moments

Track:

- opening claim
- misconception correction
- brand name
- plugin name
- number
- comparison
- process summary
- error
- repair
- result
- call to action

Create `moments.json`:

```json
[
  {
    "label": "300 万周活",
    "spoken_at": 168.133,
    "visual_at": 167.8,
    "tolerance": 0.8,
    "scene": "metrics"
  }
]
```

## Timing Guidance

- Lead-in card: up to 0.6 seconds before speech
- Main hero title: 0.0-0.4 seconds before speech
- Key number: near exact spoken time
- Error cue: when the problem is introduced
- Repair cue: when the repair action starts
- Result confirmation: when the outcome is stated

Flag:

- early spoiler beyond tolerance
- late reveal beyond tolerance
- unrelated future conclusion displayed in current scene
- key number displayed for an entire earlier chapter

## Scene Splitting

When a chapter includes setup and conclusion, split it:

- `manualSteps` then `workflowCost`
- `terminalPrompt` then `codexFlow`
- `autoRepair` then `audioFix`
- `packaging` then `motionCode`
- `creatorTeam` then `tenXOutput`

Do not use one large chapter scene if its title reveals a conclusion many seconds early.
