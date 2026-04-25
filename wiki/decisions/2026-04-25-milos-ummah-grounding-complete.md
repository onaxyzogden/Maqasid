---
title: "MILOS Ummah pillar two-axis grounding — migration complete"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, grounding, ummah, migration, ratchet]
superseded_by: null
---

# MILOS Ummah pillar two-axis grounding — migration complete

## Context

Second pillar pass after [[2026-04-25-milos-faith-grounding-complete]]. Ummah carried 525 legacy-string `sources` entries — the largest single pillar (covers Collective, Neighbors, Community, Moontrance Land, Moontrance Seasonal, Moontrance Residency boards). Convention inspection confirmed identical markdown shape to Faith: `### ` ref headers, `**Arabic:**` / `**Translation:**` markers, `*(Grade: Sahih|Hasan)*` annotations.

Hadith collection inventory introduced four prefixes the Faith parser had not encountered: `Jami at-Tirmidhi`, `Musnad Ahmad`, `Sunan Ibn Majah`, `Sunan an-Nasai`. All four are already in canonical sunnah.com form — no parser normalization changes needed; they pass through `parseMarkdown()` unchanged.

## Decision

### Parser-first migration (reuse Faith parser)

[scripts/migrate-ummah-grounding.mjs](scripts/migrate-ummah-grounding.mjs) (new) is a verbatim copy of [scripts/migrate-faith-grounding.mjs](scripts/migrate-faith-grounding.mjs) with the FILE constant pointing at `ummah-seed-tasks.js`. No grammar or normalization changes were required — confirming the parser is reusable across pillars sharing the legacy convention.

Result: `Migrated: 525, Skipped: 0`.

### One Quran-MCP patch (Quran 55:7-9)

Schema test caught a single violation at `ummah_moontrance-land_core[1].subtasks[2].sources[2]` — the Quran 55:7-9 entry had no body in the legacy markdown (only a header), so the parser captured `**II. Hadith**` (the next section header) as the translation and emitted no Arabic. Patched with authoritative ar-simple-clean + en-abdel-haleem from the Quran MCP:

- Arabic: `وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ ...`
- Translation: "He has raised up the sky. He has set the balance so that you may not exceed in the balance: weigh with justice and do not fall short in the balance."

This is the same failure mode (and same fix pattern) that hit 7 Faith entries — but for Ummah only one entry was affected.

### Round-trip audit

[scripts/audit-ummah-migration.mjs](scripts/audit-ummah-migration.mjs) (new) — adapted from `audit-faith-migration.mjs`. 10 deterministic random matched entries verified:

- 10/10 ref-count clean
- All Arabic + translation snippets present in legacy source (the two `!` warnings are the manually patched 55:7-9 entry — expected, since its text came from Quran MCP, not legacy)

### Ratchet decremented

[src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js):

```diff
-{ id: 'ummah', data: UMMAH_SEED_TASKS, expectedLegacy: 525, allowEmptyArray: 0 },
+{ id: 'ummah', data: UMMAH_SEED_TASKS, expectedLegacy: 0,   allowEmptyArray: 0 },
```

## Consequences

**Positive:**
- Two pillars (Faith + Ummah) are now fully two-axis-compliant — 737 entries cleared (212 Faith + 525 Ummah). Strict-mode lint count dropped 1692 → 1167.
- Parser confirmed reusable: zero grammar changes between pillars; only the FILE path constant differs. Five remaining pillars (Life 236, Intellect 236, Family 233, Wealth 236, Environment 226 — total 1,167) follow the same one-file-swap pattern.
- Preview verification closed the visual loop on the largest pillar — Surah An-Nisa [4:75] structured card rendering with Bayyinah/Direct chips, full Arabic with word-level transliteration + translation, and quran.com link.
- Build clean — Ummah seed chunk lands at 1,442 KB / 419 KB gz (largest seed chunk, expected given size).

**Trade-offs:**
- Synthesized rationales (legacy markdown without `*(Direct/Contextual/Thematic: ...)*` annotations) are minimal placeholders for most entries. Schema-valid; not yet scholar-curated. Same trade-off as Faith — enrichment is a downstream pass that doesn't affect the ratchet.
- Default `relevance: 'direct'` was assumed wherever no annotation existed. Polish task, not correctness defect.

**Files touched:**
- [scripts/migrate-ummah-grounding.mjs](scripts/migrate-ummah-grounding.mjs) (created)
- [scripts/audit-ummah-migration.mjs](scripts/audit-ummah-migration.mjs) (created)
- [src/data/seed-tasks/ummah-seed-tasks.js](src/data/seed-tasks/ummah-seed-tasks.js) — 525 entries migrated, 1 manually patched (55:7-9)
- [src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) — Ummah ratchet 525 → 0

**Verification:**
- `npm test` → 40/40 green
- `npm run build` → exit 0; ummah seed chunk 1,442 KB / 419 KB gz
- `npm run lint:grounding-strict` → 1167 legacy + 1 prayer empty-array (ratchet 1692 → 1167, delta = 525)
- Round-trip audit: 10/10 ref-count clean
- **Preview verified** — `/app/work/ummah_collective_core/tasks` → opened "Sustain daily du'a" → opened "Memorise Quranic and Prophetic du'as" subtask → `Source` button → Surah An-Nisa [4:75] card renders with Bayyinah + Direct chips, Arabic word-by-word breakdown, "Read on Quran.com" link, hadith cards (Sahih al-Bukhari 2448, Sahih Muslim 1882) with Sahih grade chip.

## Carries forward

- **Pillar pipeline** — Life, Intellect, Family, Wealth, Environment (~1,167 entries). Same script-copy approach; only `FILE` path differs.
- **Rationale enrichment** — synthesized placeholders are common across both migrated pillars. Treat as separate post-migration polish stream.
- After two more pillars hit `expectedLegacy: 0`, revisit promoting `lint:grounding-strict` into the default `npm run lint` chain.
