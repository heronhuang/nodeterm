#!/usr/bin/env python3
"""Translate docs/en/*.md → docs/*.md (zh-CN via Argos). Preserves fenced code blocks."""
from __future__ import annotations

import re
import sys
from pathlib import Path

import argostranslate.translate

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
EN = DOCS / "en"
FENCE_RE = re.compile(r"(```[\s\S]*?```|`[^`\n]+`)")


def translate_prose(text: str) -> str:
    text = text.strip()
    if not text:
        return text
    # Argos handles ~paragraph size; split long text
    if len(text) > 3500:
        mid = text.rfind("\n\n", 0, 3500)
        if mid < 500:
            mid = 3500
        return translate_prose(text[:mid]) + text[mid : mid + 2] + translate_prose(text[mid + 2 :])
    return argostranslate.translate.translate(text, "en", "zh")


def translate_md(body: str) -> str:
    parts = FENCE_RE.split(body)
    out: list[str] = []
    for i, part in enumerate(parts):
        if i % 2 == 1:  # code segment from split with capturing group
            out.append(part)
        else:
            if not part:
                continue
            paras = re.split(r"(\n\n+)", part)
            for p in paras:
                if re.match(r"^\n+$", p) or not p.strip():
                    out.append(p)
                else:
                    out.append(translate_prose(p))
    return "".join(out)


def publish(rel: str, en_text: str, link: str) -> None:
    lines = en_text.splitlines()
    title = lines[0] if lines else "#"
    body = "\n".join(lines[1:]).lstrip("\n")
    if title.startswith("# "):
        title = "# " + translate_prose(title[2:])
    zh = f"{link}\n\n{title}\n\n{translate_md(body)}\n"
    (DOCS / rel).write_text(zh, encoding="utf-8")
    print(f"OK {rel}", flush=True)


def main() -> None:
    skip = {"DOCUMENTATION-LANGUAGES.md", "README.md"}
    if len(sys.argv) >= 2 and sys.argv[1] == "--contributing":
        raw = (ROOT / "CONTRIBUTING.en.md").read_text(encoding="utf-8")
        link = "> English: [CONTRIBUTING.en.md](./CONTRIBUTING.en.md)"
        lines = raw.splitlines()
        title = lines[0]
        if title.startswith("# "):
            title = "# " + translate_prose(title[2:])
        intro = (
            "感谢参与 nodeterm。本文是快速入门与必须遵守的协作规则；"
            "各子系统的设计理由与不变量见仓库根目录 `CLAUDE.md`（完整英文见 `CLAUDE.en.md`）。"
        )
        body = translate_md("\n".join(lines[1:]).lstrip("\n"))
        (ROOT / "CONTRIBUTING.md").write_text(
            f"{link}\n\n{title}\n\n{intro}\n\n{body}\n", encoding="utf-8"
        )
        print("OK CONTRIBUTING.md", flush=True)
        return

    files = sys.argv[1:] if len(sys.argv) > 1 else sorted(p.name for p in EN.glob("*.md"))
    for rel in files:
        if rel in skip:
            continue
        en_path = EN / rel
        if not en_path.is_file():
            print(f"skip {rel}", flush=True)
            continue
        link = f"> English: [docs/en/{rel}](./en/{rel})"
        publish(rel, en_path.read_text(encoding="utf-8"), link)


if __name__ == "__main__":
    main()
