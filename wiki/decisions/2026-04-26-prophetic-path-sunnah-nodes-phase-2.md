---
title: "Prophetic Path Sunnah-grounded transition nodes (Phase 2)"
type: decision
date: 2026-04-26
tags: [propheticpath, sunnah, transitions, grounding, phase-2]
status: accepted
---

# Decision — Phase 2: 4 grounded parent tasks for the new transition nodes

## Context

[[2026-04-26-prophetic-path-sunnah-nodes-phase-1]] shipped 4 transition-node skeletons (`duha`, `qaylulah`, `after-asr`, `bedtime`) with `transition:*` routing through `classifyTask` but no grounded subtasks. The Phase-2 commitment was 4 parent tasks distributed by pillar: `duha` & `bedtime` → faith, `qaylulah` → life, `after-asr` → family.

## Decision

Authored 4 parent tasks across 3 seed files, totalling 16 subtasks under the two-axis schema ([[2026-04-18-milos-grounding-two-axis]]).

| Node | Pillar / submodule | Parent task | Subtasks |
|---|---|---|---|
| `duha` | `faith_salah_growth` | "Salat ad-Duha — establish the post-sunrise charity of the joints" | 4 |
| `bedtime` | `faith_salah_growth` | "Sunan al-Nawm — observe the prophetic etiquette of sleep" | 4 |
| `qaylulah` | `life_physical_growth` | "Qaylulah — implement the prophetic midday rest" | 4 |
| `after-asr` | `family_marriage_growth` | "Return to family after Asr — restore the prophetic evening presence" | 4 |

### Citations used

- **Quran (MCP-grounded):** 93:1-5, 93:1, 93:11, 25:47, 30:23, 30:21, 3:190-191, 2:255 — all canonical Arabic + Abdel Haleem translation pulled via `fetch_quran` / `fetch_translation`.
- **Hadith:** Sahih Muslim 720; Jami at-Tirmidhi 475; Sahih al-Bukhari 247, 5010, 6320, 5216, 1; Jami at-Tirmidhi 2891; al-Tabarani al-Mu'jam al-Awsat 5662.
- **`ratNote` flags (4 entries)** carry forward sunnah.com canonical-numbering verification on Bukhari 247, Bukhari 5216 (variant 5268), Bukhari 6320, Tabarani Awsat 5662 — joining the pre-existing 4-entry scholar-polish backlog.

### Files modified

- [src/data/seed-tasks/faith-seed-tasks.js](src/data/seed-tasks/faith-seed-tasks.js) — +2 parent tasks (duha + bedtime) at end of `faith_salah_growth`
- [src/data/seed-tasks/life-seed-tasks.js](src/data/seed-tasks/life-seed-tasks.js) — +1 parent (qaylulah) at end of `life_physical_growth`
- [src/data/seed-tasks/family-seed-tasks.js](src/data/seed-tasks/family-seed-tasks.js) — +1 parent (after-asr) at end of `family_marriage_growth`

### Mid-flight correction

First lint pass surfaced 1 inline-ref violation (Quran 2:255 named in Ayat al-Kursi subtask prose but missing from `sources[]`). Fixed by adding the canonical 2:255 entry. The CLAUDE.md script-table claim of "ratchet 13" is stale — the actual ratchet has been 0 since [[2026-04-25-milos-inline-refs-hadith-backfill]]. **Carry forward:** update the CLAUDE.md grounding-tooling paragraph to reflect ratchet 0.

## Verification

- `npm test` — 40/40 pass ✓
- `npm run lint` — all 3 monotonic ratchets at minimum:
  - per-pillar legacy-string: 0 (8/8 pillars)
  - empty-array: 0
  - inline-refs: 0
- 2,039 subtasks across 8 pillars; 77 total inline refs detected, 0 missing.

## Carries forward

- 4 new `ratNote`-flagged hadith entries pending sunnah.com canonical-number verification (Bukhari 247, 5216, 6320; Tabarani Awsat 5662). Stack with prior 4 from [[2026-04-25-milos-prayer-empty-array-backfill]] = 8 total scholar-polish backlog items.
- CLAUDE.md grounding-tooling paragraph claims `audit:inline-refs` ratchets at 13; actual is 0 — minor doc drift to fix when next CLAUDE.md edit lands.
- Phase 2 of the original Phase-1 plan is now closed. PropheticPath spine has 12 fully-routed grounded nodes.
