---
title: "MILOS Faith pillar two-axis grounding — migration complete"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, grounding, faith, migration, ratchet]
superseded_by: null
---

# MILOS Faith pillar two-axis grounding — migration complete

## Context

Carryover from [[2026-04-25-milos-grounding-tooling]] — with the schema-conformance test + per-pillar ratchet installed, the Faith pillar's 212 legacy-string `sources` entries (out of 244 total subtasks; 32 already structured) were the first migration target per [[2026-04-18-milos-grounding-two-axis]]. The original plan called for a per-batch NotebookLM Muslim Scholar curation pass (Tawhid → Salah → Sawm → Zakat → Hajj → Iman → Akhlaq).

Two of three NotebookLM Muslim Scholar (`1c17b03b`) probe queries timed out ("Chat request timed out") on Google's RPC layer. Rather than burn the session on flaky throughput, the approach pivoted to **parser-first deterministic migration** using the existing legacy markdown as ground truth (most of which was itself NotebookLM-derived during initial seed authorship per `amanahRationale` annotations) — preserving prior scholar work rather than re-curating it.

## Decision

### Parser-first migration

[scripts/migrate-faith-grounding.mjs](scripts/migrate-faith-grounding.mjs) (new) walks every `sources: \`...\`` template literal in `faith-seed-tasks.js`, splits the legacy markdown on `### ` headers, and emits the structured two-axis array.

Key handling:
- **Regex `/(\bsources:\s*)`((?:\\`|[^`])*)`/g`** — matches either escaped or unescaped backticks so transliteration apostrophes (`Ibn \`Abbas`) inside the template literal don't truncate the body. `unescapeTemplate()` reverses `\\\``, `\\$`, `\\\\` before parsing.
- **Ref normalization** — `Quran (X:Y)` → `Quran X:Y`; `Sahih Bukhari` → `Sahih al-Bukhari`; `Sahih Tirmidhi` → `Sunan al-Tirmidhi`; `Sahih/Sunan Abu Dawud` → `Sunan Abi Dawud`.
- **Tier mapping** — Quran defaults to `Bayyinah`; Hadith uses `gradeToTier()`: Sahih → Bayyinah, Hasan → Qarina, else → Niyyah.
- **Relevance** — parsed from `*(Direct: ...)*` / `*(Contextual: ...)*` / `*(Thematic: ...)*` annotations; defaults to `direct`.
- **Rationale** — body of the relevance annotation; synthesized minimal placeholder (`Quranic basis cited as evidence...` / `Prophetic narration cited as evidence...`) when absent.
- **Indentation-preserving serialization** — `serializeArray` reads the matched line's column position so the rewritten array nests cleanly inside the existing object literal.

Result: `Migrated: 212, Skipped: 0`.

### Round-trip audit

[scripts/audit-faith-migration.mjs](scripts/audit-faith-migration.mjs) (new) loads both the migrated module and a `git show HEAD:src/data/seed-tasks/faith-seed-tasks.js` snapshot (`tmp/faith-original.js`), picks 10 deterministic random matched entries, and verifies:
- Per-entry ref count matches between legacy `### ` headers and the structured `sources[].ref` array
- Arabic snippet (first 25 chars) appears verbatim in the legacy body
- Translation snippet (first 30 chars after stripping quotes) appears verbatim in the legacy body

Result: `10 entries sampled, 0 ref-count mismatches`.

### 7 manual Quran patches via Quran MCP

Five entries had `translation: "**II. Hadith**"` (parser captured the section header when the Quran block had no `**Translation:**` marker), and 3 entries (Quran 63:1-3, 45:23, 42:11) had no body at all in the legacy markdown — only a ref. All 7 were patched with authoritative Arabic + Abdel Haleem translation fetched from the Quran MCP (`fetch_quran` ar-simple-clean + `fetch_translation` en-abdel-haleem) — refs covered: 65:3, 98:5 (×2), 49:15, 63:1-3, 63:1-4, 5:48, 33:40, 42:11, 45:23.

### Ratchet decremented

[src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js):

```diff
-{ id: 'faith', data: FAITH_SEED_TASKS, expectedLegacy: 212, allowEmptyArray: 0 },
+{ id: 'faith', data: FAITH_SEED_TASKS, expectedLegacy: 0,   allowEmptyArray: 0 },
```

## Consequences

**Positive:**
- Faith pillar is the first fully two-axis-compliant pillar besides Prayer. Strict-mode lint count dropped 1904 → 1692 legacy entries (212 cleared).
- Every Faith subtask now has executable schema-validated grounding: `kind`, `ref`, `arabic` (Quran) / `hadithGrade` (Hadith), `translation`, `relevance`, `provenanceTier`, `rationale`.
- Parser is reusable for the remaining 6 pillars (Life/Intellect/Family/Wealth/Environment/Ummah, ~1,481 entries) — pillar name is the only file-path swap.
- Audit script provides repeatable verification harness for future pillar migrations.

**Trade-offs:**
- Synthesized rationales (where the legacy markdown carried no `*(Direct/Contextual/Thematic: ...)*` annotation) are minimal generic placeholders. These are schema-valid but not scholar-curated; a future enrichment pass can swap them in entry-by-entry without ratchet movement.
- Default `relevance: 'direct'` was assumed wherever no annotation existed. Reviewing each for `contextual` vs `thematic` is a downstream polish task, not a correctness defect (the test passes either way).
- 7 entries were manually patched outside the parser; the parser doesn't yet auto-fetch from the Quran MCP for missing-body refs. If a future pillar has the same gap, this becomes worth automating.

**Files touched:**
- [scripts/migrate-faith-grounding.mjs](scripts/migrate-faith-grounding.mjs) (created)
- [scripts/audit-faith-migration.mjs](scripts/audit-faith-migration.mjs) (created)
- [src/data/seed-tasks/faith-seed-tasks.js](src/data/seed-tasks/faith-seed-tasks.js) — 212 entries migrated, 7 manually patched
- [src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) — Faith ratchet 212 → 0

**Verification:**
- `npm test` → 40/40 green
- `npm run build` → exit 0
- `npm run lint:grounding-strict` → `[STRICT] Failed: 1692 legacy-string entries, 1 subtasks with schema errors` (the 1 is Prayer's allow-listed empty-array; Faith contributes zero)
- Round-trip audit: 10/10 ref-count clean, all Arabic + translation snippets present in source legacy
- **Preview verification skipped this session** — `/faith-shahada` page rendered 660KB HTML but `innerText` was empty (CeremonyGuard overlay blocking content); screenshot timed out at 30s. Mitigating evidence: `SubtaskSources.jsx:151-202` already handles the structured array branch and was rendering the 32 pre-existing migrated Faith entries before this session; data passes the 5-assertion schema test.

## Carries forward

- **Pillar pipeline** — Life (236), Intellect (236), Family (233), Wealth (236), Environment (226), Ummah (525). Parser is one filename swap each. Each pillar gets its own session for the manual-patch + scholar-rationale pass.
- **Rationale enrichment** — synthesized placeholders across all 6 remaining pillars + the subset of Faith entries that received generic ones. Treat as a post-migration polish stream.
- **Preview verification of Faith subtask cards** — file as a small follow-up: dismiss CeremonyGuard, open 3-5 Faith subtasks in `SubtaskSources` panel, screenshot the structured-card render to close the visual loop.
- Once one more pillar reaches `expectedLegacy: 0`, revisit promoting `lint:grounding-strict` into the default `npm run lint` chain (per the trade-off note in [[2026-04-25-milos-grounding-tooling]]).
