const fs = require("fs");
const path = require("path");

const configPath = process.argv[2];
const outputPath = process.argv[3];
if (!configPath || !outputPath) {
  console.error("Usage: node gen_sfx.cjs events.json output.wav");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const sampleRate = config.sampleRate || 48000;
const duration = config.duration;
const channels = 2;
const totalSamples = Math.ceil(sampleRate * duration);
const left = new Float32Array(totalSamples);
const right = new Float32Array(totalSamples);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

const side = (pan) => [
  Math.cos((pan + 1) * Math.PI / 4),
  Math.sin((pan + 1) * Math.PI / 4),
];

const addTone = ({time, dur, freq, freq2 = freq, amp = 0.25, pan = 0, noise = 0}) => {
  const start = Math.max(0, Math.floor(time * sampleRate));
  const end = Math.min(totalSamples, start + Math.floor(dur * sampleRate));
  const [lg, rg] = side(pan);
  for (let i = start; i < end; i++) {
    const t = (i - start) / sampleRate;
    const u = t / dur;
    const env = Math.sin(Math.PI * clamp01(u)) * Math.exp(-2.2 * u);
    const f = freq + (freq2 - freq) * u;
    const sample = Math.sin(2 * Math.PI * f * t) * amp * env + (Math.random() * 2 - 1) * noise * env;
    left[i] += sample * lg;
    right[i] += sample * rg;
  }
};

const addEvent = ({time, type, gain = 1}) => {
  if (type === "impact") {
    addTone({time, dur: 0.18, freq: 78, freq2: 42, amp: 0.32 * gain, pan: -0.12, noise: 0.035 * gain});
    addTone({time: time + 0.035, dur: 0.22, freq: 680, freq2: 260, amp: 0.12 * gain, pan: 0.18});
  } else if (type === "clicks") {
    [0, 0.11, 0.22].forEach((d, i) => addTone({time: time + d, dur: 0.055, freq: 1400 + i * 190, freq2: 900, amp: 0.16 * gain, pan: i % 2 ? 0.45 : -0.45, noise: 0.018 * gain}));
  } else if (type === "scan" || type === "sweep") {
    addTone({time, dur: type === "sweep" ? 0.62 : 0.42, freq: 240, freq2: 1180, amp: 0.14 * gain, pan: -0.42, noise: 0.012 * gain});
  } else if (type === "warning") {
    addTone({time, dur: 0.16, freq: 520, freq2: 500, amp: 0.14 * gain, pan: -0.18});
    addTone({time: time + 0.22, dur: 0.14, freq: 420, freq2: 410, amp: 0.11 * gain, pan: 0.18});
  } else if (type === "confirm" || type === "chime") {
    addTone({time, dur: 0.22, freq: 660, freq2: 880, amp: 0.12 * gain, pan: -0.12});
    addTone({time: time + 0.08, dur: 0.28, freq: 990, freq2: 1320, amp: 0.1 * gain, pan: 0.22});
  } else if (type === "count") {
    [0, 0.075, 0.15, 0.225, 0.3].forEach((d, i) => addTone({time: time + d, dur: 0.052, freq: 860 + i * 130, freq2: 1220 + i * 90, amp: 0.12 * gain, pan: -0.45 + i * 0.22}));
    addTone({time: time + 0.42, dur: 0.24, freq: 88, freq2: 54, amp: 0.22 * gain});
  } else {
    throw new Error(`Unknown SFX type: ${type}`);
  }
};

config.events.forEach(addEvent);
let peak = 0;
for (let i = 0; i < totalSamples; i++) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
const norm = peak > 0 ? Math.min(0.38 / peak, 1) : 1;
const bytes = 44 + totalSamples * channels * 2;
const buffer = Buffer.alloc(bytes);
buffer.write("RIFF", 0);
buffer.writeUInt32LE(bytes - 8, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(channels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * channels * 2, 28);
buffer.writeUInt16LE(channels * 2, 32);
buffer.writeUInt16LE(16, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(totalSamples * channels * 2, 40);
let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  buffer.writeInt16LE(Math.round(Math.max(-1, Math.min(1, left[i] * norm)) * 32767), offset);
  buffer.writeInt16LE(Math.round(Math.max(-1, Math.min(1, right[i] * norm)) * 32767), offset + 2);
  offset += 4;
}
fs.mkdirSync(path.dirname(path.resolve(outputPath)), {recursive: true});
fs.writeFileSync(outputPath, buffer);
console.log(`Wrote ${outputPath}`);
