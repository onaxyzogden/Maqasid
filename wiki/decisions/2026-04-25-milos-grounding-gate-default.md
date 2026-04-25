---
title: "MILOS grounding gate — promoted into default `npm run lint`"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, grounding, lint, ci, gate, sealing]
superseded_by: null
---

# MILOS grounding gate — promoted into default `npm run lint`

## Context

Sealing action after the migration arc closed. With all 8 pillars two-axis-compliant ([[2026-04-25-milos-grounding-pillars-batch-complete]]) and the inline-refs Quran half backfilled ([[2026-04-25-milos-inline-refs-quran-backfill]]), the migration's strict gate was still opt-in (`npm run lint:grounding-strict` and `node scripts/audit-inline-refs.mjs --strict`). New seed-task contributions could regress without breaking CI.

## Decision

### Promote both gates into the default `npm run lint` chain

[package.json](package.json):

```diff
-"lint": "eslint .",
+"lint": "npm run lint:eslint && npm run lint:grounding-strict && npm run audit:inline-refs",
+"lint:eslint": "eslint .",
+"audit:inline-refs": "node scripts/audit-inline-refs.mjs --strict",
```

`npm run lint` is now the **grounding gate** — it fails CI on:
1. Any ESLint error (existing behavior, preserved)
2. Any legacy-string `sources` entry (new — caught regressions to pre-migration shape)
3. Any structured-entry schema error beyond the 1 known empty-array (prayer optional 4-rakʿat sunnah — `allowEmptyArray: 1` in test, mirrored in `lint-grounding.mjs --strict`)
4. Any inline-cited ref missing from `sources[]` beyond the ratchet of 13 (Phase 2 hadith backfill pending)

`npm run lint:eslint` is preserved for ESLint-only runs during dev.

### Empty-array exception in `lint:grounding-strict`

[scripts/lint-grounding.mjs](scripts/lint-grounding.mjs) updated to allow exactly 1 empty-array entry (the optional 4-rakʿat sunnah at `prayer_isha_during[0].subtasks[0]` — pending NotebookLM Muslim Scholar citation). Mirrors the existing `allowEmptyArray: 1` ratchet in [grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js).

### Inline-refs ratchet at 13

[scripts/audit-inline-refs.mjs](scripts/audit-inline-refs.mjs) gained `--strict` mode with `RATCHET = 13`. Decrement as Phase 2 hadith backfills land.

## Consequences

**Positive:**
- Grounding cannot silently regress. A future contributor adding a legacy-string `sources` value or an inline citation without `sources[]` backing will fail `npm run lint`.
- Three ratchets now monotonic: per-pillar legacy (all 0), empty-array (1), inline-refs (13). All only ratchet down.
- One command (`npm run lint`) is now the canonical pre-commit / pre-push check.
- [CLAUDE.md](CLAUDE.md) updated to document the new chain and the ratchet states.

**Trade-offs:**
- `npm run lint` is now slower (~3s vs ~1s). Acceptable for a pre-commit gate; `lint:eslint` covers fast iteration.

**Files touched:**
- [package.json](package.json) — chained `lint`, added `lint:eslint`, `audit:inline-refs`
- [scripts/lint-grounding.mjs](scripts/lint-grounding.mjs) — empty-array ratchet
- [scripts/audit-inline-refs.mjs](scripts/audit-inline-refs.mjs) — `--strict` mode + RATCHET = 13
- [CLAUDE.md](CLAUDE.md) — script table updated

**Verification:**
- `npm run lint` → exit 0 (eslint clean; grounding-strict pass; inline-refs 13 ≤ ratchet 13)
- `npm test` → 40/40 green

## Carries forward

- **Phase 2 hadith backfill** decrements the inline-refs ratchet from 13 toward 0 as each scholar-cited hadith lands.
- **Empty-array ratchet** decrements from 1 to 0 when the optional 4-rakʿat sunnah gets its NotebookLM Muslim Scholar citation.
- **Rationale enrichment** — synthesized placeholder rationales across ~1,904 entries — remains the long-tail downstream stream.
