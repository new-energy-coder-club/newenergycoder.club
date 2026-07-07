#!/usr/bin/env python3
"""Update image URLs in team.ts based on local downloaded files."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEAM_TS = ROOT / "src" / "lib" / "i18n" / "constants" / "team.ts"
IMAGE_DIR = ROOT / "src" / "image"
CDN_BASE = "https://cdn.newenergycoder.club/images/src/image"


def find_avatar_file(name: str, category: str) -> Path | None:
    """Find an avatar file for a member in the given category directory."""
    dir_path = IMAGE_DIR / category
    if not dir_path.exists():
        return None
    # Try exact name match with common image extensions
    for ext in [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".webp"]:
        candidate = dir_path / f"{name}{ext}"
        if candidate.exists():
            return candidate
    return None


def main():
    text = TEAM_TS.read_text(encoding="utf-8")

    # Determine category for each member block
    sections = {}
    for sec in ["maintainers", "developers", "designers", "contributors", "sponsors"]:
        m = re.search(rf"export const {sec}: .*?= \[(.*?)\];", text, re.S)
        if m:
            sections[sec] = m.group(1)

    for sec, body in sections.items():
        if sec == "sponsors":
            continue
        # For each member block in this section, find and update image URL
        # We process block by block
        pattern = r"(\{\s*name:\s*'([^']+)'[\s\S]*?)(image:\s*'[^']*')"
        def repl(match):
            block_prefix = match.group(1)
            name = match.group(2)
            file_path = find_avatar_file(name, sec)
            if file_path:
                rel = file_path.relative_to(IMAGE_DIR).as_posix()
                return f"{block_prefix}image: '{CDN_BASE}/{rel}'"
            return match.group(0)
        new_body = re.sub(pattern, repl, body)
        text = text.replace(body, new_body)

    TEAM_TS.write_text(text, encoding="utf-8")
    print(f"[write] {TEAM_TS}")


if __name__ == "__main__":
    main()
