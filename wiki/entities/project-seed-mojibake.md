---
title: "Seed/Data Mojibake (UTF-8 ↔ cp1252 corruption)"
type: entity
created: 2026-07-25
updated: 2026-07-25
tags: [milos, data-integrity, encoding, bug, grounding, quran]
sources: 1
---

# Seed/Data Mojibake (UTF-8 ↔ cp1252 corruption)

A pre-existing data-integrity defect in MILOS seed/data files: non-ASCII characters (arrows `→`, curly apostrophes/quotes, em/en dashes, accented Latin letters) are stored as **mojibake** — the classic double-encoding where UTF-8 bytes were written, then read back and re-saved as cp1252 (Windows-1252). The intended `→` shows up as `â†'`; `'` as `â€™`; `—` as `â€"`; `é` as `Ã©`. The project [[milos]] `CLAUDE.md` explicitly warns about this hazard ("Watch for cp1252/UTF-8 encoding issues when reading/writing files").

## Key Facts

- **Discovered** 2026-07-25 while verifying the [[2026-07-25-milos-orientation-carousel-redesign]] carousel: the Health pillar's recommended task title rendered "Fajr **â†'** Quran (minimum 1 page) **â†'** morning adhkar **â†'** journal" (intended: `→` arrows). Health was the recommended (weakest) pillar, so the corruption sat at the top of the redesigned UI.
- **Scope (grep `â€|â†|Ã©|Ã¨|â€™|â€œ|Â·|Â `):** 485 occurrences across **3 files** —
  - `src/data/seed-tasks/health-seed-tasks.js` — **388** (nearly every non-ASCII char; confirmed at line 1920).
  - `src/data/ayat/health-readiness-ayat.js` — **87**. ⚠️ **Qur'an-verse data — covenant-sensitive.**
  - `src/data/niyyah-feelings.js` — **10**.
- Other `src/` files scanned clean; the corruption is concentrated, suggesting these specific files went through one bad encoding round-trip (not a systemic write-path bug).
- Claude's `Write`/`Edit` tools produce correct UTF-8 here (the wiki files carry ʿ, ā, ḥ, Arabic, em dashes intact) — this corruption was introduced upstream of this session, not by it.

## Current Status

**Open.** Flagged as background task `task_2e56b6bf` on 2026-07-25 with a covenant-aware fix brief; **not** fixed in the orientation session (its approved plan excluded all seed/data edits). Recommended as the next session's objective — it is visible in production UI and touches grounding-sensitive Qur'anic data.

## Fix Guidance (for whoever picks up task_2e56b6bf)

- Prefer **restoring from git history** (`git log -p` for a pre-corruption revision) over hand-reconstructing characters — especially for the ayat file, where guessing at Arabic/translation/citation text is not acceptable.
- The ayat file's changes should get **human review** before commit (Amanah: never invent or approximate revelation text).
- Re-save as **UTF-8 without BOM**; on Windows/PowerShell watch the write encoding (`Out-File`/`Set-Content` default to cp1252 — pass `-Encoding utf8`). Re-grep to zero.
- These files feed the grounding gate: `npm test` (Vitest) and `npm run lint` (`lint:grounding-strict` + `audit:inline-refs`) **must stay green**; reconcile any `sources[]`/`description` ref changes against [[2026-04-18-milos-grounding-two-axis]] if that decision page exists.

## Connections

- [[milos]] — the affected project; its `CLAUDE.md` warns about this exact class of bug
- [[2026-07-25-milos-orientation-carousel-redesign]] — the session that surfaced it
- [[amanah-gate]] — the ayat-file corruption makes this a covenant concern, not just a cosmetic one

## History

- 2026-07-25: Discovered during orientation-redesign verification; quantified (485 occ / 3 files); flagged as `task_2e56b6bf`; page created. See [[2026-07-25-milos-orientation-carousel-redesign]].
