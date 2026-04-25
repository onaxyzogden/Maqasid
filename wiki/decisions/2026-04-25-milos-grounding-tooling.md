---
title: "MILOS two-axis grounding tooling — schema test + strict lint"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, grounding, testing, vitest, ratchet]
superseded_by: null
---

# MILOS two-axis grounding tooling — schema test + strict lint

## Context

Carryover from [[2026-04-25-milos-pre-test-audit]] Phase D — the two-axis migration was blocked on "no test framework; no schema-conformance check exists; lint-grounding is informational only." Without these guardrails, migrating 1,693 legacy-string entries (across 7 pillars) to the two-axis schema (`provenanceTier` × `relevance`, per [[2026-04-18-milos-grounding-two-axis]]) would have no monotonicity guarantee — a partial migration could silently regress.

This decision installs the missing infrastructure so subsequent migrations (Faith first, then Life/Intellect/Family/Wealth/Environment/Ummah) can proceed safely batch-by-batch.

## Decision

### Vitest installed

`npm install -D vitest@4.1.5`. Minimal [vitest.config.js](vitest.config.js) mirroring the Vite alias map — no plugin overhead, `environment: 'node'` since the tests are pure-data. `npm test` script added.

### Schema-conformance test with per-pillar ratchet

[src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) loads all 8 pillar seed exports and runs 5 assertions per pillar:

1. No subtask is missing the `sources` field
2. No subtask has invalid (non-string, non-array) `sources`
3. Legacy-string count ≤ pillar's ratchet (decrements as entries migrate)
4. Empty-array count ≤ pillar's allowance
5. Every structured array entry passes the full schema (`kind` ∈ {quran,hadith}, required fields present, `provenanceTier` ∈ {Bayyinah,Qarina,Niyyah}, `relevance` ∈ {direct,contextual,thematic}, kind-specific fields like `arabic`/`hadithGrade`)

Per-pillar ratchets (initial values match `lint-grounding.mjs` baseline):

| Pillar       | Legacy ratchet | Empty-array ratchet |
|--------------|---------------:|--------------------:|
| faith        | 212            | 0                   |
| life         | 236            | 0                   |
| intellect    | 236            | 0                   |
| family       | 233            | 0                   |
| wealth       | 236            | 0                   |
| environment  | 226            | 0                   |
| ummah        | 525            | 0                   |
| prayer       | 0              | 1                   |

**Prayer's empty-array allowance of 1** captures the optional 4-rakʿat-before-Isha sunnah (T3 / Niyyah, `prayer_isha_during[0].subtasks[0]`). The entry is structurally complete except for `sources: []` — it's a meritorious but non-muʾakkadah practice. Pending NotebookLM Muslim Scholar citation (e.g., the "between every adhan and iqamah there is a prayer" hadith) — to be filled in a future Prayer-pillar pass; for now allow-listed with a TODO comment in the test.

40 tests total (8 pillars × 5 assertions), all green at session close.

### `--strict` mode for `lint-grounding.mjs`

[scripts/lint-grounding.mjs](scripts/lint-grounding.mjs) gains a `--strict` flag. Default mode stays informational (existing call sites unaffected). With `--strict`, the script exits non-zero on any legacy-string entry or any structured-entry schema error, with a pointer to the migration ADR.

Current strict-mode result: `1904 legacy-string entries, 1 subtasks with schema errors` — this is the load-bearing failure that future migration batches will drive to zero.

### npm scripts

```
"test":                    "vitest run",
"lint:grounding":          "node scripts/lint-grounding.mjs",
"lint:grounding-strict":   "node scripts/lint-grounding.mjs --strict"
```

[CLAUDE.md](CLAUDE.md) Build & Dev Commands block updated; the "no test framework is configured" line removed.

## Consequences

**Positive:**
- Migration progress is now monotonic: each batch must `npm test` green and decrement the pillar's ratchet. Regression (legacy count going up, or a malformed structured entry) fails the test.
- Two-axis schema is now executable, not just documented in the ADR — every required field is enforced at test time.
- The Prayer pillar's known empty-array gap is captured by allow-list with a TODO, not silently passed.
- `lint:grounding-strict` provides a CI-ready failure signal (currently 1,904 legacy + 1 schema error). Adopting in CI is a one-liner change after the first pillar batch reaches zero.

**Trade-offs:**
- Vitest adds ~30 MB devDeps. Acceptable — needed eventually for component testing and was the blocker for multiple deferred items (this, the dual-contact-stores unification, etc.).
- The ratchet pattern requires manual decrementing as migration progresses. Acceptable: it's exactly two lines of edit per batch and forces the engineer to acknowledge the new state.
- `--strict` is opt-in (not invoked from `npm run lint`). Default `npm run lint` continues to ignore grounding. Promoting to default is left to a future decision once at least one pillar finishes.

**Files touched:**
- [vitest.config.js](vitest.config.js) (created)
- [src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) (created)
- [scripts/lint-grounding.mjs](scripts/lint-grounding.mjs) — `--strict` flag + footer
- [package.json](package.json) — `test`, `lint:grounding`, `lint:grounding-strict` scripts; vitest devDep
- [CLAUDE.md](CLAUDE.md) — commands block updated

**Verification:**
- `npm test` exits 0, 40/40 tests pass
- `npm run lint:grounding-strict` exits 1 with `[STRICT] Failed: 1904 legacy-string entries, 1 subtasks with schema errors` — the expected failure signal that ratchets unblock
- `npm run build` exits 0 (no production-side changes)

## Carries forward

- **C.2 deferred** — Faith pillar 212-entry NotebookLM Muslim Scholar pass. Per the [[concurrent-nibbling-rabbit]] plan's stated "safe pause point if Faith pass is too long," that work is filed for a dedicated session where the full context budget can be spent on scholar-grounded citation crafting batch-by-batch (Tawhid → Salah → Sawm → Zakat → Hajj → Iman → Akhlaq).
- Same applies to Life/Intellect/Family/Wealth/Environment/Ummah — each pillar gets its own session against the now-installed test ratchet.
- Once any pillar reaches `expectedLegacy: 0`, consider promoting `lint:grounding-strict` to a `npm run lint` step.
