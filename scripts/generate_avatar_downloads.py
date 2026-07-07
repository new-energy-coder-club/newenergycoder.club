#!/usr/bin/env python3
"""Generate a bash script to download avatars from Feishu."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEAM_TS = ROOT / "src" / "lib" / "i18n" / "constants" / "team.ts"
FEISHU_MD = ROOT / "scripts" / "feishu_records_md.txt"
OUT_SH = ROOT / "scripts" / "download_avatars.sh"

CATEGORY_MAP: dict[str, str] = {
    "崔正阳": "developers",
    "彭柯尹": "developers",
    "文钰婷": "developers",
    "孟洁": "developers",
    "王欣怡": "developers",
    "陈春林": "developers",
    "汪奕希": "developers",
    "李畅畅": "developers",
    "张娈馨": "developers",
    "魏卫": "developers",
    "孙雯艳": "designers",
    "印书瑶": "designers",
}


def parse_team_categories() -> dict[str, str]:
    text = TEAM_TS.read_text(encoding="utf-8")
    categories: dict[str, str] = {}
    for section in ["maintainers", "developers", "designers", "contributors"]:
        m = re.search(rf"export const {section}: .*?= \[(.*?)\];", text, re.S)
        if not m:
            continue
        body = m.group(1)
        depth = 0
        buf = ""
        for char in body:
            if char == "{":
                depth += 1
            elif char == "}":
                depth -= 1
                buf += char
                if depth == 0:
                    nm = re.search(r"name:\s*'([^']+)'", buf)
                    if nm:
                        name = nm.group(1)
                        if name not in categories:
                            categories[name] = section
                    buf = ""
                continue
            if depth > 0 or char == "{":
                buf += char
    return categories


def parse_feishu():
    text = FEISHU_MD.read_text(encoding="utf-8")
    for line in text.splitlines():
        if not line.startswith("| rec"):
            continue
        parts = [p.strip() for p in line.split("|")]
        if len(parts) < 9:
            continue
        record_id = parts[1]
        name = parts[5]
        photos = json.loads(parts[8]) if parts[8] else []
        if not photos:
            continue
        if "彭柯" in name:
            name = "彭柯尹"
        yield name, record_id, photos[0]


def sanitize(name: str) -> str:
    return re.sub(r"[^\w\-_.\u4e00-\u9fa5]", "", name)


def main():
    categories = parse_team_categories()
    lines = ["#!/usr/bin/env bash", "set -euo pipefail", f"cd '{ROOT.as_posix()}'", ""]
    seen = set()
    for name, record_id, photo in parse_feishu():
        if name in seen:
            continue
        seen.add(name)
        cat = CATEGORY_MAP.get(name, categories.get(name, "contributors"))
        ext = Path(photo["name"]).suffix or ".jpg"
        safe = sanitize(name)
        out = f"./src/image/{cat}/{safe}{ext}"
        cmd = (
            f"lark-cli base +record-download-attachment "
            f"--base-token PKQpbKTkzalCP0s9rAtci4fBnwe "
            f"--table-id tbl31R1eCgDy8G1I "
            f"--record-id {record_id} "
            f"--file-token {photo['file_token']} "
            f"--output '{out}' "
            f"--overwrite"
        )
        lines.append(f"echo 'Downloading {name}...'")
        lines.append(cmd)
    lines.append("")
    lines.append("echo 'Done'")
    OUT_SH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Generated {OUT_SH} with {len(seen)} downloads")


if __name__ == "__main__":
    main()
