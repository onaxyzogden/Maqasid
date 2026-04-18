#!/usr/bin/env python3
"""Phase 4 bulk rename: Maqasid OS -> MILOS, Moontrance -> MTC, Atlas -> OLOS.

Scope: src/, docs/, wiki/, CLAUDE.md, package.json.
Excludes: atlas/ submodule, website/ (already done), node_modules, .git.
Preserves: Islamic concept 'Maqasid' (only 'Maqasid OS' with OS suffix is changed),
           the literal submodule path 'atlas/', repo slug 'onaxyzogden/atlas'.
"""
import re
from pathlib import Path

ROOT = Path(r"C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1")

TARGETS = [
    ROOT / "src",
    ROOT / "docs",
    ROOT / "wiki",
    ROOT / "CLAUDE.md",
    ROOT / "package.json",
]

EXTS = {".js", ".jsx", ".ts", ".tsx", ".md", ".json", ".css", ".html"}

# Order matters. Wiki links first (before 'atlas' word boundary catches them).
PATTERNS = [
    (re.compile(r"\[\[maqasid-os\b"), "[[milos"),
    (re.compile(r"\[\[atlas\b"), "[[olos"),
    (re.compile(r"\bMaqasid OS\b"), "MILOS"),
    (re.compile(r"\bMoontrance\b"), "MTC"),
    # 'Atlas' as product noun -> OLOS. Safe because 'atlas/' (lower) and 'onaxyzogden/atlas' are lowercase.
    (re.compile(r"\bAtlas\b"), "OLOS"),
]

def should_process(p: Path) -> bool:
    parts = set(p.parts)
    if "node_modules" in parts or ".git" in parts or "dist" in parts:
        return False
    # Skip the atlas submodule itself.
    try:
        rel = p.relative_to(ROOT)
        if rel.parts and rel.parts[0] == "atlas":
            return False
        if rel.parts and rel.parts[0] == "website":
            return False
    except ValueError:
        pass
    return p.suffix in EXTS

changed = []
for target in TARGETS:
    if target.is_file():
        files = [target]
    else:
        files = [f for f in target.rglob("*") if f.is_file() and should_process(f)]
    for f in files:
        try:
            text = f.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        new = text
        for pat, repl in PATTERNS:
            new = pat.sub(repl, new)
        if new != text:
            f.write_text(new, encoding="utf-8")
            changed.append(str(f.relative_to(ROOT)))

print(f"Changed {len(changed)} files:")
for c in changed:
    print(f"  {c}")
