---
title: "MILOS final four pillars two-axis grounding — batch migration complete"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, grounding, intellect, family, wealth, environment, migration, ratchet]
superseded_by: null
---

# MILOS final four pillars two-axis grounding — batch migration complete

## Context

Final batch pass after [[2026-04-25-milos-faith-grounding-complete]], [[2026-04-25-milos-ummah-grounding-complete]], and [[2026-04-25-milos-life-grounding-complete]]. The three prior pillar passes established that the parser is uniform across the seed corpus (Faith needed 7 patches, Ummah 1, Life 0). User authorized batching the remaining four pillars in a single session: Intellect (236), Family (233), Wealth (236), Environment (226) — total **931 entries**. With this batch, all 8 pillars are fully two-axis-compliant.

## Decision

### Parser-first batch migration

For each pillar, generated migrate + audit scripts via `sed`-substitution of the Life pair, then ran in a single bash loop:

```bash
for p in intellect family wealth environment; do
  P=$(echo $p | sed 's/.*/\u&/')
  PU=$(echo $p | tr a-z A-Z)
  sed "s/'life'/'$p'/g; s/life-seed-tasks/$p-seed-tasks/g; s/Life/$P/g; s/LIFE/$PU/g" \
    scripts/migrate-life-grounding.mjs > scripts/migrate-$p-grounding.mjs
  sed "s/LIFE_SEED_TASKS/${PU}_SEED_TASKS/g; s/life-seed-tasks/$p-seed-tasks/g; s/life-original/$p-original/g; s/Life/$P/g" \
    scripts/audit-life-migration.mjs > scripts/audit-$p-migration.mjs
  git show HEAD:src/data/seed-tasks/$p-seed-tasks.js > tmp/$p-original.js
  node scripts/migrate-$p-grounding.mjs --write
done
```

Result: `Migrated: 236 / 233 / 236 / 226, Skipped: 0` across all four. Zero parser changes.

### Schema violations + Quran-MCP patch

One Quran entry hit the `**II. Hadith**` capture failure mode (same pattern as Faith/Ummah): `environment.environment_ecosystem_core[3].subtasks[0]` entry[2] for Quran 6:165 — empty translation, missing arabic. Patched via `fetch_quran ar-simple-clean` + `fetch_translation en-abdel-haleem`.

### Round-trip audits

10 deterministic random matched entries per pillar — all 4/4 audits report `10 sampled, 0 ref-count mismatches`. Hadith collection canonicalization (`Sahih Bukhari → Sahih al-Bukhari`) preserved across ref counts.

### Ratchets decremented

[src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js): all four pillar `expectedLegacy` set to `0`.

## Consequences

**Positive:**
- **Migration complete across all 8 pillars.** Total entries cleared this session: 931 (Intellect 236 + Family 233 + Wealth 236 + Environment 226). Cumulative across the four-decision arc (Faith→Ummah→Life→Batch): **1,904 entries** now structured (212 + 525 + 236 + 931).
- Strict-mode lint count dropped 931 → 0 legacy strings. Only known empty-array (prayer optional 4-rakʿat sunnah) remains under its `allowEmptyArray: 1` ratchet.
- One patch across 931 entries (0.1% rate) — confirms the parser is mature and the legacy markdown convention is uniform. Future seed-task additions can use the structured array shape directly.
- Build clean (`exit 0`); 40/40 tests pass.

**Trade-offs:**
- Same as prior pillars: synthesized rationales (legacy markdown without `*(Direct/Contextual/Thematic)*` annotations) are minimal placeholders. Schema-valid, scholar-curated polish remains a single downstream stream across all 1,904 entries.

**Files touched:**
- `scripts/migrate-{intellect,family,wealth,environment}-grounding.mjs` (created)
- `scripts/audit-{intellect,family,wealth,environment}-migration.mjs` (created)
- `src/data/seed-tasks/{intellect,family,wealth,environment}-seed-tasks.js` (931 entries migrated)
- [src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) — 4 ratchets decremented to 0

**Verification:**
- `npm test` → 40/40 green (after one Quran-MCP patch)
- `npm run build` → exit 0
- `npm run lint:grounding-strict` → 0 legacy strings (down from 931); 1 known prayer empty-array under its ratchet
- Round-trip audits: Intellect 10/10, Family 10/10, Wealth 10/10, Environment 10/10 — all ref-count clean

## Carries forward

- **Promote `lint:grounding-strict` into the default `npm run lint` chain.** Migration is complete; the strict gate should be permanent.
- **Rationale enrichment** — single post-migration polish stream for ~1,904 synthesized rationales when scholar-curated corpus is ready. No longer per-pillar; one batch.
- **Tafsir + nuance** — the structured shape supports `tafsir` and additional fields. Future enrichment can layer in tafsir refs without schema changes.
