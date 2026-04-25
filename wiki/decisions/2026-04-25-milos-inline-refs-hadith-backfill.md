---
title: "MILOS inline-refs — Phase 2 hadith backfill via NotebookLM Muslim Scholar"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, grounding, hadith, inline-refs, notebooklm, muslim-scholar]
superseded_by: null
---

# MILOS inline-refs — Phase 2 hadith backfill via NotebookLM Muslim Scholar

## Context

Phase 1 ([[2026-04-25-milos-inline-refs-quran-backfill]]) closed the 9 Quran inline-cite gaps via Quran MCP and seeded an `audit:inline-refs --strict` ratchet at 13 — the count of remaining hadith inline-cites missing from `sources[]`. That ratchet was the explicit Phase 2 work item.

The 13 hadith refs spanned faith(1) / family(1) / ummah(11), with 11 unique refs (Tirmidhi 2007 and Bukhari 2320 each appeared twice). NotebookLM Muslim Scholar (1c17b03b) was the canonical-text source.

## Decision

### Two-pass NotebookLM Muslim Scholar retrieval

First pass: query by ref number (`Sahih al-Bukhari 5776`, `Sahih Muslim 2625`, etc.) — confirmed 5/11 exact matches.

Second pass: query by content cue for the unconfirmed 6 (e.g., "the hadith where the Prophet said 'increase the broth'", "believers are like one body in their compassion"). Got canonical Arabic + translation for all 11.

Three refs flagged for scholar polish (sunnah.com cross-reference recommended):
- **Bukhari 5267** — Muslim Scholar identified the topical content under canonical sunnah.com numbering Bukhari 5191; the seed-cited number may reflect a different print edition.
- **Tirmidhi 2007** (×2) — Muslim Scholar matched the topical content (the "do not hurt your neighbor" principle) but flagged ref→text alignment as uncertain.

Each of these three entries carries a `ratNote` in its `rationale` field flagging the verification recommendation.

### Anchor-based insertion script

[scripts/backfill-inline-hadith-refs.mjs](scripts/backfill-inline-hadith-refs.mjs) — same pattern as the Quran backfill: locate the subtask by `title:` line (preserving the file's actual quote style — single-quoted with escaped apostrophes vs double-quoted), find the next `]\n          description:` closing marker, insert the structured entry before it.

13 entries applied across 3 pillars:
- faith — 1 (Bukhari 5776, "no tiyarah")
- family — 1 (Bukhari 5267, Prophet's withdrawal — flagged)
- ummah — 11 (Muslim 2625, Tirmidhi 2007 ×2 — flagged, Tirmidhi 1944, Muslim 8, Bukhari 6011, Bukhari 6016, Muslim 2699, Muslim 35, Bukhari 2320 ×2)

### Ratchet decrement

[scripts/audit-inline-refs.mjs](scripts/audit-inline-refs.mjs) — `RATCHET` decremented from 13 to 0. The grounding gate ([[2026-04-25-milos-grounding-gate-default]]) now enforces zero inline-cited refs missing from structured `sources[]`.

## Consequences

**Positive:**
- All 22 inline-cited refs detected by [scripts/audit-inline-refs.mjs](scripts/audit-inline-refs.mjs) (Phase 1: 9 Quran; Phase 2: 13 hadith) now have structured `sources[]` backing — every one renders as a proper SubtaskSources card with Arabic + translation + grade + rationale.
- `npm run lint` chain (eslint + grounding-strict + audit:inline-refs) now passes with three monotonic ratchets at: per-pillar legacy 0, empty-array 1, inline-refs 0.
- The Bukhari 5776 case the user originally flagged via screenshot now renders correctly.

**Trade-offs:**
- Three entries (Bukhari 5267, Tirmidhi 2007 ×2) carry `ratNote` flags — they are structurally complete and pass schema, but the scholar polish pass should cross-reference against sunnah.com canonical numbering before final sealing.

**Files touched:**
- [scripts/backfill-inline-hadith-refs.mjs](scripts/backfill-inline-hadith-refs.mjs) — new (13 targets)
- [scripts/audit-inline-refs.mjs](scripts/audit-inline-refs.mjs) — `RATCHET = 0`
- [src/data/seed-tasks/faith-seed-tasks.js](src/data/seed-tasks/faith-seed-tasks.js) — +1 hadith entry
- [src/data/seed-tasks/family-seed-tasks.js](src/data/seed-tasks/family-seed-tasks.js) — +1 hadith entry
- [src/data/seed-tasks/ummah-seed-tasks.js](src/data/seed-tasks/ummah-seed-tasks.js) — +11 hadith entries

**Verification:**
- `npm test` → 40/40 green
- `npm run lint` → exit 0 (eslint clean; grounding-strict pass; inline-refs 0 ≤ ratchet 0)
- `npm run build` → exit 0

## Carries forward

- **Scholar polish** — pass 3 ratNote'd entries through sunnah.com canonical numbering verification. Update refs where mismatch is confirmed; remove ratNote when verified.
- **Rationale enrichment** — synthesized placeholder rationales across ~1,904 entries — remains the long-tail downstream stream.
- **Empty-array ratchet** — decrement from 1 to 0 when the optional 4-rakʿat sunnah at `prayer_isha_during[0].subtasks[0]` gets its NotebookLM Muslim Scholar citation.
