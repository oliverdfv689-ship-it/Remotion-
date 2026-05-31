#!/usr/bin/env python3
import argparse
import json
import re
from pathlib import Path

TIME_RE = re.compile(r"(\d{2}):(\d{2}):(\d{2})[,.](\d{3})")


def ms(value: str) -> int:
    match = TIME_RE.fullmatch(value.strip())
    if not match:
        raise ValueError(f"Invalid SRT timestamp: {value}")
    h, m, s, milli = map(int, match.groups())
    return ((h * 60 + m) * 60 + s) * 1000 + milli


def read_text(path: Path) -> str:
    for encoding in ("utf-8-sig", "utf-8", "gb18030", "utf-16"):
        try:
            return path.read_text(encoding=encoding)
        except UnicodeDecodeError:
            continue
    raise ValueError(f"Unable to decode {path}")


def parse_srt(path: Path):
    entries = []
    blocks = re.split(r"\r?\n\r?\n+", read_text(path).strip())
    for block in blocks:
        lines = [line.strip() for line in block.splitlines() if line.strip()]
        if len(lines) < 2:
            continue
        index = int(lines[0]) if lines[0].isdigit() else len(entries) + 1
        timing_index = 1 if "-->" in lines[1] else 0
        if "-->" not in lines[timing_index]:
            continue
        start, end = [part.strip() for part in lines[timing_index].split("-->", 1)]
        text = " ".join(lines[timing_index + 1 :])
        entries.append(
            {
                "index": index,
                "text": text,
                "startMs": ms(start),
                "endMs": ms(end),
                "timestampMs": ms(start),
                "confidence": None,
            }
        )
    return entries


def stamp(value: int) -> str:
    seconds = value / 1000
    return f"{int(seconds // 60):02d}:{seconds % 60:06.3f}"


def main():
    parser = argparse.ArgumentParser(description="Convert SRT captions to Remotion-friendly JSON.")
    parser.add_argument("input")
    parser.add_argument("--out", required=True)
    parser.add_argument("--limit", type=int, default=0, help="Keep only the first N entries. Use 0 for all.")
    args = parser.parse_args()
    captions = parse_srt(Path(args.input))
    if args.limit:
        captions = captions[: args.limit]
    Path(args.out).write_text(json.dumps(captions, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(captions)} captions to {args.out}")
    for item in captions:
        print(f"{item['index']:03d}  {stamp(item['startMs'])}-{stamp(item['endMs'])}  {item['text']}")


if __name__ == "__main__":
    main()
