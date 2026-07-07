#!/usr/bin/env python3
"""Sync NEC team members from Feishu base to src/lib/i18n/constants/team.ts

Run:
  export LANG=zh_CN.UTF-8
  python scripts/sync_feishu_team.py
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
FEISHU_JSON = ROOT / "scripts" / "feishu_records_utf8.json"
FEISHU_MD = ROOT / "scripts" / "feishu_records_md.txt"
TEAM_TS = ROOT / "src" / "lib" / "i18n" / "constants" / "team.ts"
IMAGE_DIR = ROOT / "src" / "image"
CDN_BASE = "https://cdn.newenergycoder.club/images/src/image"

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
    "岳添俊": "contributors",
    "顾佳欣": "contributors",
    "徐康": "contributors",
    "吴梦婷": "contributors",
    "白逸鸣": "contributors",
    "严文颖": "contributors",
    "李嘉涵": "contributors",
    "黄宇雯": "contributors",
    "庄皓钧": "contributors",
    "魏鹏程": "contributors",
    "王浩": "contributors",
    "朱靓颖": "contributors",
    "黄奕": "contributors",
}

# Friendly role titles for Feishu-only members (overrides raw self-reported role)
ROLE_MAP: dict[str, str] = {
    "崔正阳": "Developer/Sponsor",
    "彭柯尹": "机械R1机器人开发者",
    "文钰婷": "嵌入式开发工程师",
    "孟洁": "嵌入式开发工程师",
    "王欣怡": "嵌入式开发工程师",
    "陈春林": "视觉算法工程师",
    "汪奕希": "视觉开发工程师",
    "李畅畅": "嵌入式开发工程师",
    "张娈馨": "嵌入式开发工程师",
    "魏卫": "全栈开发工程师",
    "孙雯艳": "工业/产品设计师",
    "印书瑶": "工业/产品设计师",
    "岳添俊": "C/Contributor",
    "顾佳欣": "Contributor",
    "徐康": "3D打印与建模贡献者",
    "吴梦婷": "Contributor",
    "白逸鸣": "机器人竞赛贡献者",
    "严文颖": "Contributor",
    "李嘉涵": "机械设计贡献者",
    "黄宇雯": "三维建模贡献者",
    "庄皓钧": "机械结构设计贡献者",
    "魏鹏程": "研究生贡献者",
    "王浩": "Contributor",
    "朱靓颖": "数据分析贡献者",
    "黄奕": "数据分析贡献者",
}


def sanitize_filename(name: str) -> str:
    return re.sub(r"[^\w\-_.\u4e00-\u9fa5]", "", name)


def parse_feishu() -> dict[str, dict[str, Any]]:
    if FEISHU_MD.exists():
        return parse_feishu_md()
    data = json.loads(FEISHU_JSON.read_text(encoding="utf-8"))
    rows = data["data"]["data"]
    members: dict[str, dict[str, Any]] = {}
    for row in rows:
        name = row[3]
        if "彭柯" in name:
            name = "彭柯尹"
        photos = row[6] or []
        photo = photos[0] if photos else None
        entry = {
            "name": name,
            "raw_role": str(row[4] or "").strip(),
            "bio": str(row[5] or "").strip(),
            "record_id": row[0],
            "file_token": photo["file_token"] if photo else None,
            "file_name": photo["name"] if photo else None,
        }
        if name in members:
            existing = members[name]
            if len(entry["bio"]) > len(existing["bio"]):
                existing["bio"] = entry["bio"]
            if entry["file_token"] and not existing["file_token"]:
                existing["file_token"] = entry["file_token"]
                existing["file_name"] = entry["file_name"]
                existing["record_id"] = entry["record_id"]
        else:
            members[name] = entry
    return members


def parse_feishu_md() -> dict[str, dict[str, Any]]:
    text = FEISHU_MD.read_text(encoding="utf-8")
    members: dict[str, dict[str, Any]] = {}
    for line in text.splitlines():
        if not line.startswith("| rec"):
            continue
        parts = [p.strip() for p in line.split("|")]
        # parts: ['', '_record_id', '编号', '提交时间', '提交人', '姓名', '角色', '简介', '照片', '其他照片', '']
        if len(parts) < 10:
            continue
        record_id = parts[1]
        name = parts[5]
        raw_role = parts[6]
        bio = parts[7]
        photos = json.loads(parts[8]) if parts[8] else []
        photo = photos[0] if photos else None
        if "彭柯" in name:
            name = "彭柯尹"
        entry = {
            "name": name,
            "raw_role": raw_role,
            "bio": bio,
            "record_id": record_id,
            "file_token": photo["file_token"] if photo else None,
            "file_name": photo["name"] if photo else None,
        }
        if name in members:
            existing = members[name]
            if len(entry["bio"]) > len(existing["bio"]):
                existing["bio"] = entry["bio"]
            if entry["file_token"] and not existing["file_token"]:
                existing["file_token"] = entry["file_token"]
                existing["file_name"] = entry["file_name"]
                existing["record_id"] = entry["record_id"]
        else:
            members[name] = entry
    return members


def parse_local_members() -> list[dict[str, Any]]:
    """Parse team.ts into a list of member blocks. Allows same name in different categories."""
    text = TEAM_TS.read_text(encoding="utf-8")
    result: list[dict[str, Any]] = []
    for section in ["maintainers", "developers", "designers", "contributors", "sponsors"]:
        pattern = rf"export const {section}: .*?= \[(.*?)\];"
        m = re.search(pattern, text, re.S)
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
                    block = buf.strip()
                    name_match = re.search(r"name:\s*'([^']+)'", block)
                    if name_match:
                        result.append({
                            "name": name_match.group(1),
                            "category": section,
                            "block": block,
                        })
                    buf = ""
                continue
            if depth > 0 or char == "{":
                buf += char
    return result


def normalize_role(raw: str) -> str:
    role = raw.replace("ccontributer", "C/Contributor")
    role = role.replace("contributer", "Contributor")
    role = re.sub(r"\s+", " ", role).strip()
    if not role or role.lower() in {"contributor", "contributer"}:
        role = "Contributor"
    return role


def update_block(name: str, block: str, feishu: dict[str, Any] | None, is_new: bool = False) -> str:
    block = re.sub(r"name:\s*'[^']*'", f"name: '{name}'", block, count=1)

    # For existing local members, keep local role. For new members, use ROLE_MAP / normalize Feishu role.
    role_match = re.search(r"role:\s*'([^']+)'", block)
    if is_new and feishu:
        role = ROLE_MAP.get(name) or normalize_role(feishu["raw_role"])
    else:
        role = role_match.group(1) if role_match else (normalize_role(feishu["raw_role"]) if feishu else "Contributor")
    block = re.sub(r"role:\s*'[^']*'", f"role: '{role}'", block, count=1)

    # Prefer Feishu bio when available
    if feishu and feishu["bio"]:
        bio = feishu["bio"].replace("<br>", " ").replace("<br/>", " ").replace("\\", "\\\\").replace("'", "\\'")
    else:
        bio_match = re.search(r"bio:\s*'([^']*)'", block)
        bio = bio_match.group(1) if bio_match else f"NEC {role}。"
    block = re.sub(r"bio:\s*'[^']*'", f"bio: '{bio}'", block, count=1)

    if not re.search(r"image:\s*'", block):
        block = re.sub(r"(bio:\s*'[^']*',)", r"\1\n    image: '',", block, count=1)
    else:
        block = re.sub(r"image:\s*'[^']*'", "image: ''", block, count=1)

    return block


def fill_image_url(block: str, url: str) -> str:
    if not re.search(r"image:\s*'", block):
        block = re.sub(r"(bio:\s*'[^']*',)", r"\1\n    image: '',", block, count=1)
    return re.sub(r"image:\s*'[^']*'", f"image: '{url}'", block, count=1)


def download_avatars(feishu: dict, categories: dict[tuple[str, str], str]) -> dict[str, Path]:
    """Download one avatar per Feishu person. Keyed by name (assumes one photo per person)."""
    downloaded: dict[str, Path] = {}
    for name, entry in feishu.items():
        if not entry.get("file_token"):
            continue
        # determine category by looking up any local entry or default
        cat = CATEGORY_MAP.get(name, "contributors")
        out_dir = IMAGE_DIR / cat
        out_dir.mkdir(parents=True, exist_ok=True)
        ext = Path(entry["file_name"]).suffix or ".jpg"
        safe_name = sanitize_filename(name)
        out_path = out_dir / f"{safe_name}{ext}"
        # lark-cli requires a relative path inside cwd
        rel_out = out_path.relative_to(ROOT).as_posix()

        lark_bin = "lark-cli.cmd" if sys.platform == "win32" else "lark-cli"
        cmd = [
            lark_bin, "base", "+record-download-attachment",
            "--base-token", "PKQpbKTkzalCP0s9rAtci4fBnwe",
            "--table-id", "tbl31R1eCgDy8G1I",
            "--record-id", entry["record_id"],
            "--file-token", entry["file_token"],
            "--output", f"./{rel_out}",
            "--overwrite",
        ]
        print(f"[download] {name} -> {out_path}")
        res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", cwd=str(ROOT), timeout=30)
        if res.returncode != 0:
            print(f"  FAILED: {res.stderr}", file=sys.stderr)
            continue
        try:
            result = json.loads(res.stdout)
            if result.get("ok"):
                downloaded[name] = out_path
            else:
                print(f"  FAILED: {result}", file=sys.stderr)
        except Exception as e:
            print(f"  PARSE ERROR: {e}\n  STDOUT: {res.stdout}", file=sys.stderr)
    return downloaded


def upload_r2():
    print("[upload] Running upload-to-r2.py members ...")
    res = subprocess.run([sys.executable, str(ROOT / "scripts" / "upload-to-r2.py"), "members"], capture_output=True, text=True)
    print(res.stdout)
    if res.returncode != 0:
        print(res.stderr, file=sys.stderr)


def generate_team_ts(blocks_by_section: dict[str, list[str]]) -> str:
    def fmt(section: str, blocks: list[str]) -> str:
        typ = "Sponsor[]" if section == "sponsors" else "TeamMember[]"
        body = "\n".join(f"  {block}," for block in blocks)
        return f"export const {section}: {typ} = [\n{body}\n];"

    parts = [
        "import { TeamMember } from '../types/translations';\n",
        "export type SponsorLevel = 'strategic' | 'gold' | 'silver' | 'bronze' | 'partner';\n",
        "export interface SponsorSupport {",
        "  item: string;",
        "  quantity?: string;",
        "}\n",
        "export interface Sponsor extends TeamMember {",
        "  level: SponsorLevel;",
        "  supports: SponsorSupport[];",
        "  website?: string;",
        "}\n",
    ]
    for section in ["maintainers", "developers", "designers", "contributors", "sponsors"]:
        parts.append(fmt(section, blocks_by_section[section]))
        parts.append("")
    parts.append("// NEC Home GIF 资源引用")
    return "\n".join(parts)


def main(skip_avatars: bool = False):
    if not FEISHU_JSON.exists() and not FEISHU_MD.exists():
        print(f"Missing {FEISHU_JSON} or {FEISHU_MD}", file=sys.stderr)
        sys.exit(1)

    feishu = parse_feishu()
    local = parse_local_members()

    # Merge 彭柯颖 -> 彭柯尹 (developer)
    for item in local:
        if item["name"] == "彭柯颖":
            item["name"] = "彭柯尹"
            item["category"] = "developers"
            # rewrite the name inside the block
            item["block"] = re.sub(r"name:\s*'彭柯颖'", "name: '彭柯尹'", item["block"], count=1)

    # Build a lookup for local blocks by (name, category)
    local_keyed: dict[tuple[str, str], dict[str, Any]] = {}
    for item in local:
        local_keyed[(item["name"], item["category"])] = item

    # Determine final category for each name (same name may map to multiple categories locally)
    name_to_categories: dict[str, set[str]] = {}
    for item in local:
        name_to_categories.setdefault(item["name"], set()).add(item["category"])
    for name in feishu:
        cat = CATEGORY_MAP.get(name, "contributors")
        name_to_categories.setdefault(name, set()).add(cat)

    # Download avatars
    downloaded: dict[str, Path] = {}
    if not skip_avatars:
        downloaded = download_avatars(feishu, {})
        # Upload to R2
        upload_r2()

    # Build blocks per section
    blocks_by_section: dict[str, list[str]] = {
        "maintainers": [], "developers": [], "designers": [], "contributors": [], "sponsors": []
    }
    seen_keys: set[tuple[str, str]] = set()

    def name_from_block(block: str) -> str:
        m = re.search(r"name:\s*'([^']+)'", block)
        return m.group(1) if m else ""

    # 1. Preserve all local members, updating with Feishu data and images
    for item in local:
        key = (item["name"], item["category"])
        if key in seen_keys:
            continue
        seen_keys.add(key)
        block = update_block(item["name"], item["block"], feishu.get(item["name"]), is_new=False)
        # image: prefer downloaded, then original local URL
        if item["name"] in downloaded:
            rel = downloaded[item["name"]].relative_to(IMAGE_DIR).as_posix()
            block = fill_image_url(block, f"{CDN_BASE}/{rel}")
        else:
            m = re.search(r"image:\s*'([^']+)'", item["block"])
            if m:
                block = fill_image_url(block, m.group(1))
        blocks_by_section[item["category"]].append(block)

    # 2. Add Feishu-only members (skip names already present locally)
    local_names = {item["name"] for item in local}
    for name in sorted(feishu.keys()):
        if name in local_names:
            continue
        cat = CATEGORY_MAP.get(name, "contributors")
        key = (name, cat)
        if key in seen_keys:
            continue
        seen_keys.add(key)
        block = update_block(name, "{ name: '', role: '', bio: '', image: '' }", feishu[name], is_new=True)
        if name in downloaded:
            rel = downloaded[name].relative_to(IMAGE_DIR).as_posix()
            block = fill_image_url(block, f"{CDN_BASE}/{rel}")
        blocks_by_section[cat].append(block)

    # 3. Sort each section alphabetically by name, except maintainers keep original order
    for section in ["developers", "designers", "contributors", "sponsors"]:
        blocks_by_section[section].sort(key=name_from_block)

    new_content = generate_team_ts(blocks_by_section)
    TEAM_TS.write_text(new_content, encoding="utf-8")
    print(f"[write] {TEAM_TS}")

    print("\n--- Summary ---")
    for section in ["maintainers", "developers", "designers", "contributors", "sponsors"]:
        print(f"{section}: {len(blocks_by_section[section])}")
    print(f"avatars downloaded: {len(downloaded)}")


if __name__ == "__main__":
    skip_avatars = "--skip-avatars" in sys.argv
    main(skip_avatars=skip_avatars)
