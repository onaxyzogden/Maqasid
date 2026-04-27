---
title: "MILOS sunnah.com canonical-numbering sweep + CLAUDE.md drift fix"
type: decision
date: 2026-04-26
tags: [milos, grounding, sunnah, hadith, canonical-numbering, ratNote]
status: accepted
---

# Decision — Sunnah.com canonical-number sweep across the 8-entry hadith backlog

## Context

[[2026-04-26-prophetic-path-sunnah-nodes-phase-2]] closed with an 8-entry scholar-polish backlog of hadith citations whose canonical sunnah.com numbering had not been verified — half flagged via the dedicated `ratNote` field, half buried in `rationale` text. CLAUDE.md was also drifting: lines 24 + 27 still claimed `audit:inline-refs` ratchets at 13, but the actual `RATCHET = 0` in [scripts/audit-inline-refs.mjs](scripts/audit-inline-refs.mjs) had been decremented at [[2026-04-25-milos-inline-refs-hadith-backfill]].

## Decision

Verified all 9 file entries (8 unique hadiths) directly against sunnah.com via WebFetch — pivoted from NotebookLM Muslim Scholar after the API returned alternating rate-limit and timeout errors. Direct sunnah.com is, in any case, the authoritative source for canonical numbering questions.

### Outcomes per entry

| # | File:line | Ref | Outcome | Action |
|---|---|---|---|---|
| 1 | [family:1281](src/data/seed-tasks/family-seed-tasks.js:1281) | Bukhari 5267 | **B** — translation mismatch | Replaced translation field with the actual honey-incident narration (Aishah + Hafsa + Zainab); ref 5267 confirmed canonical for honey incident; prior translation text described Bukhari 5191 (Umar attic-room) |
| 2 | [ummah:3771](src/data/seed-tasks/ummah-seed-tasks.js:3771) | Tirmidhi 2007 | **B** — arabic+translation mismatch | Replaced both fields with actual Tirmidhi 2007 ("Do not be a people without will…", hasan); prior fields had been auto-paired with the Bukhari 6018/Muslim 47 'should not hurt his neighbor' narration. Adjusted `provenanceTier` to Qarina + grade Hasan to match canonical |
| 3 | [ummah:10587](src/data/seed-tasks/ummah-seed-tasks.js:10587) | Tirmidhi 2007 | **B** — same as #2 | Same fix |
| 4 | [prayer:290](src/data/seed-tasks/prayer-seed-tasks.js:290) | Bukhari 627 + Muslim 838 | **A** — verified | Cleaned rationale; added clean `ratNote` confirming Muslim 838 = USC-MSA Book 4 Hadith 1822 (older edition numbering) |
| 5 | [faith:5008](src/data/seed-tasks/faith-seed-tasks.js:5008) | Bukhari 247 | **A** — verified | Updated ratNote to verified |
| 6 | [faith:5090](src/data/seed-tasks/faith-seed-tasks.js:5090) | Bukhari 6320 → **6324** | **B** — wrong ref | Changed ref to canonical Bukhari 6324. Bukhari 6320 is Abu Hurayra's `Bismika Rabbi wada'tu janbi` dua; Hudhayfah's `Bismika Allahumma amutu wa ahya` (which this subtask cites) is canonically Bukhari 6324 |
| 7 | [family:1612](src/data/seed-tasks/family-seed-tasks.js:1612) | Bukhari 5216 | **A** — verified | Updated ratNote — 5216 confirmed; the closely-related extended honey-incident narration appears at Bukhari 5268 (a related but distinct hadith, not a variant) |
| 8 | [family:1637](src/data/seed-tasks/family-seed-tasks.js:1637) | Bukhari 5216 | **A** — same as #7 | Same fix (`replace_all`) |
| 9 | [life:1408](src/data/seed-tasks/life-seed-tasks.js:1408) | Tabarani al-Awsat 5662 | **C** — not on sunnah.com | sunnah.com does not host the Awsat collection. The qaylulah hadith content matches; al-Albani's grading in `Sahih al-Jami al-Saghir 4431` remains the standard secondary canonical anchor. Documented in ratNote |

**Net schema impact:**
- 1 ref change (Bukhari 6320 → 6324)
- 3 translation/arabic content corrections (5267, Tirmidhi 2007 ×2)
- 1 provenanceTier downgrade (Tirmidhi 2007: Bayyinah → Qarina, hasan grade)
- 0 inline-description prose changes required (description prose was already correct in all cases — the mismatches were in `sources[]`)

### CLAUDE.md drift fix

Two literal edits applied to [CLAUDE.md](CLAUDE.md):

- Line 24: `(ratchet at 13)` → `(ratchet at 0)`
- Line 27: `ratchets at 13 (Phase 2 hadith backfill pending)` → `ratchets at 0 (closed via [[2026-04-25-milos-inline-refs-hadith-backfill]])`

## Verification

- `npm test` — 40/40 pass ✓
- `npm run lint` — all 3 monotonic ratchets at minimum:
  - per-pillar legacy-string: 0 (8/8 pillars)
  - empty-array: 0
  - inline-refs: 0
- `Grep "verification (pending|recommended)"` across `src/data/seed-tasks/` — 0 matches (full backlog cleared)
- 2,039 subtasks across 8 pillars; 77 total inline refs detected, 0 missing.

## Method note

NotebookLM Muslim Scholar (`1c17b03b-3537-4fde-b5ba-562dbe0c1aab`) returned alternating "rate limited" and "timeout" errors throughout this session — even minimal probe queries failed. Pivoted to direct WebFetch against sunnah.com. For future canonical-numbering questions, sunnah.com WebFetch is the more reliable + authoritative path; reserve NotebookLM for content-discovery queries (e.g., "find me a hadith about X").

## Carries forward

- Tabarani al-Awsat hadiths cannot be canonically verified via sunnah.com; future Awsat citations should anchor to a secondary collection (e.g., al-Albani's *Sahih al-Jami al-Saghir*) where possible, or accept Tier-Qarina grading with explicit ratNote.
- The Bukhari 5267↔5191 confusion (honey vs Umar-attic) is a recurring cluster — both narrations live in the same divorce/marriage chapters, and both speak to the Prophet's marital conduct. Future authoring touching that cluster should explicitly cross-check ref↔content.
- Scholar-polish backlog: closed. Next time a hadith citation needs sunnah.com verification at write time, do the WebFetch immediately rather than carrying it forward.
