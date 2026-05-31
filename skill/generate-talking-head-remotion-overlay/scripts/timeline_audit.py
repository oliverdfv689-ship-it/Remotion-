#!/usr/bin/env python3
import argparse
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description="Audit spoken and visual reveal timing.")
    parser.add_argument("moments", help="JSON list with label, spoken_at, visual_at, tolerance, and optional scene.")
    parser.add_argument("--out", help="Optional JSON report path.")
    args = parser.parse_args()
    moments = json.loads(Path(args.moments).read_text(encoding="utf-8"))
    report = []
    failed = 0
    print("STATUS  DELTA    SPOKEN   VISUAL   LABEL")
    for moment in moments:
        spoken = float(moment["spoken_at"])
        visual = float(moment["visual_at"])
        tolerance = float(moment.get("tolerance", 0.8))
        delta = visual - spoken
        status = "PASS" if abs(delta) <= tolerance else ("EARLY" if delta < 0 else "LATE")
        if status != "PASS":
            failed += 1
        row = {**moment, "delta": round(delta, 3), "status": status}
        report.append(row)
        print(f"{status:6} {delta:+7.3f}s {spoken:7.3f}s {visual:7.3f}s {moment['label']}")
    print(f"\nAudited {len(report)} moments: {len(report) - failed} passed, {failed} need review.")
    if args.out:
        Path(args.out).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Wrote {args.out}")
    raise SystemExit(1 if failed else 0)


if __name__ == "__main__":
    main()
