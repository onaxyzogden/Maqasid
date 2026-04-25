---
title: "MILOS inline-cited Quran refs backfilled into structured sources"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, grounding, sources, backfill, quran]
superseded_by: null
---

# MILOS inline-cited Quran refs backfilled into structured sources

## Context

After the [[2026-04-25-milos-grounding-pillars-batch-complete|final batch migration]] closed all 8 pillars on the two-axis schema, Yousef surfaced a follow-on pattern: subtask `description` prose sometimes cites a specific reference (e.g., `"There is no tiyarah" (Bukhari 5776)`) that does **not** appear in the structured `sources[]` array. The migration was a verbatim conversion of the legacy `sources:` markdown block — it had no signal for inline citations buried in prose.

A new auditor [scripts/audit-inline-refs.mjs](scripts/audit-inline-refs.mjs) scans every subtask `description` for canonical citation patterns (`Quran X:Y`, `Bukhari NNN`, `Muslim NNN`, `Tirmidhi NNN`, etc.) and reports refs that don't appear in `sources[].ref` (with collection-name canonicalization to match the migration's normalization).

**Initial scope:** 22 subtasks affected — 9 Quran refs + 13 hadith refs (after de-dupe of cross-subtask duplicates). Distribution: faith 4, family 2, wealth 3, ummah 13.

## Decision

### Phase 1 (this decision) — Quran backfill via MCP

[scripts/backfill-inline-quran-refs.mjs](scripts/backfill-inline-quran-refs.mjs) — anchored insertion script. For each target, locate the subtask by its `title:` line and insert the new structured entry before the closing `],\\n          description:` of its sources array. Quran data fetched in two batched MCP calls (`fetch_quran ar-simple-clean` + `fetch_translation en-abdel-haleem`) covering all 9 refs at once.

Refs backfilled:
- Faith: 29:61-63, 33:56, 2:201
- Family: 60:8-9
- Wealth: 65:2-3, 65:2, 7:31
- Ummah: 9:60, 99:4

All entries written with `provenanceTier: "Bayyinah"`, `relevance: "direct"`, and a self-describing rationale: *"Verse cited inline in this subtask's description; backfilled into structured sources for SubtaskSources panel rendering."*

### Phase 2 (deferred) — hadith backfill via NotebookLM Muslim Scholar

The 13 remaining hadith refs (Bukhari 5776, 5267, 6011, 6016, 2320×2; Muslim 2625, 8, 2699, 35; Tirmidhi 2007×2, 1944) require sunnah.com canonical text + grade verification. Deferred to a dedicated scholar-grounded pass — same downstream stream as the synthesized-rationale enrichment.

## Consequences

**Positive:**
- The user's reported pattern is structurally resolved for the Quran half — `SubtaskSources.jsx` will now render the cited verse for each affected subtask.
- New permanent auditor: `node scripts/audit-inline-refs.mjs` runs in seconds and surfaces the gap whenever new seed entries are added. Could be wired into CI alongside `lint:grounding-strict`.
- Tests 40/40 green; strict-mode legacy count remains at 0.

**Trade-offs:**
- Same as prior synthesized-rationale entries: rationale is a placeholder ("backfilled because cited inline"). Scholar polish remains a single downstream stream.
- Phase 2 hadith pass requires sunnah.com-grade sourcing — not appropriate to write from training-knowledge given Yousef's care around citation accuracy.

**Files touched:**
- [scripts/audit-inline-refs.mjs](scripts/audit-inline-refs.mjs) (created)
- [scripts/backfill-inline-quran-refs.mjs](scripts/backfill-inline-quran-refs.mjs) (created, retained for reference)
- [src/data/seed-tasks/faith-seed-tasks.js](src/data/seed-tasks/faith-seed-tasks.js) (3 entries added)
- [src/data/seed-tasks/family-seed-tasks.js](src/data/seed-tasks/family-seed-tasks.js) (1 entry added)
- [src/data/seed-tasks/wealth-seed-tasks.js](src/data/seed-tasks/wealth-seed-tasks.js) (3 entries added)
- [src/data/seed-tasks/ummah-seed-tasks.js](src/data/seed-tasks/ummah-seed-tasks.js) (2 entries added)

**Verification:**
- `npm test` → 40/40 green
- `npm run lint:grounding-strict` → 0 legacy strings (only the known prayer empty-array under its `allowEmptyArray: 1` ratchet)
- `node scripts/audit-inline-refs.mjs` → 22 missing → 13 missing (all Quran refs cleared; remaining 13 are hadith)

## Carries forward

- **Phase 2 hadith backfill** — 13 entries (4 Bukhari, 4 Muslim, 3 Tirmidhi, 2 Bukhari 2320 duplicates). Run via NotebookLM Muslim Scholar (`1c17b03b`) with one citation per entry. Same script-pattern as Phase 1 with hadith-shape entries.
- **CI integration option** — wire `node scripts/audit-inline-refs.mjs` into the lint chain so future seed additions can't regress this pattern.
