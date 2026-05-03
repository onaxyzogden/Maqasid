---
date: 2026-05-03
project: milos
status: accepted
tags: [moontrance, ummah, grounding, pillar-architecture, two-axis-schema]
---

# 2026-05-03 — Moontrance Pillar Hard Split + Grounding Pass

## Context

After the seven non-Moontrance pillars (Faith, Health, Intellect, Family, Wealth, Environment, Ummah, Prayer) reached two-axis grounding parity (per [[2026-04-26-milos-cross-pillar-grounding-pass]]), Moontrance was the last pillar without launch-readiness verification. Initial discovery showed Moontrance was not a stub at all: **225 subtasks across 9 boards** were already authored — but they lived **inside `ummah-seed-tasks.js`** under the soft-split board-id prefix `ummah_moontrance-<sub>_<level>`, with Pillar resolution happening via a `moduleId`-over-prefix workaround in Dashboard.jsx and PillarProgressStrip.jsx.

This created two latent risks:
1. **Architectural opacity** — Moontrance was structurally indistinguishable from Ummah at the seed-file and store level. New contributors would not know it was a separate pillar without reading several runtime resolution helpers.
2. **Grounding parity gap** — the 225 Moontrance subtasks had never been independently audited against the two-axis schema in their own pillar bucket. The lint and audit scripts treated them as Ummah-pillar entries.

## Decision

**Hard-split Moontrance into a first-class pillar** (option B2 of three considered: A = focused re-verify only, B1 = soft split keeping `ummah_` prefix, B2 = full rename + migration shim). Rationale: the soft split would have left the original opacity in place; the "focused re-verify only" path would have done the grounding work but kept the architectural debt. Hard-split is a one-time cost that yields a clean per-pillar audit surface forever after.

### Scope of changes

**Phase 1 — Extraction.** A one-shot script (`scripts/split-moontrance-from-ummah.mjs`, kept in-tree for replay value but not wired to any npm script) extracted lines 12047–20778 of `ummah-seed-tasks.js` into the new `src/data/seed-tasks/moontrance-seed-tasks.js`, renaming all 9 board keys from `"ummah_moontrance-<sub>_<level>"` → `moontrance_<sub>_<level>`. Result: Ummah shrank 525 → 300 subtasks; Moontrance file holds 225 subtasks across 9 boards / 45 tasks. Total preserved at 2072 once registered.

**Phase 2 — Wiring.** Ten files updated to register Moontrance as a first-class pillar:
- `src/store/project-store.js` — extracted `MOONTRANCE_BOARDS` from `UMMAH_BOARDS`, added `ensureMoontranceProjects` action mirroring `ensureUmmahProjects` shape, sets `_moontranceModule: true` flag.
- `src/services/seed-hydrator.js` — added `moontrance` to `PILLAR_LOADERS`.
- `src/pages/moontrance/MoontraceLevelNavigator-constants.js` — pointed at `ensureMoontranceProjects`.
- `src/pages/modules/Work.jsx` — added `_moontranceModule` to `isSeedBoard`.
- `src/data/prophetic-path-submodules.js` — added `_moontranceModule` to `SEEDED_PILLAR_FLAGS`.
- `src/data/seed-tasks/__tests__/grounding.test.js` + `scripts/lint-grounding.mjs` + `scripts/audit-inline-refs.mjs` + `scripts/audit-source-refs.mjs` + `scripts/extract-subtask-matrix.mjs` — registered moontrance pillar across all auditing tooling. Tests grew 56 → 61 (the 5 new are the moontrance suite of `grounding.test.js`).

**Phase 3 — Migration shim.** `migrateMoontranceBoardIds_v1` in project-store.js, called once at the head of the `migrateLifeToHealth(...)` chain. Idempotent (gated on `bbiz_moontrance_id_migrated_v1` sentinel). For each persisted project whose `id` starts with `ummah_moontrance-`, it: (a) rewrites the project id to `moontrance_<rest>`, (b) moves `tasks_<oldId>` → `tasks_<newId>` only if the write succeeds (then removes the old key), (c) flips `_ummahModule: true` → `_moontranceModule: true`. Pattern modeled on `migrateLifeToHealth`.

**Phase 4 — Grounding pass.** A worklist scan (`scripts/moontrance-worklist.mjs`) found:
- 0 ratNote-flagged subtasks (the `ratNote` field had only ever been used in Faith/salah).
- 72 single-source subtasks.
- After cross-pillar dedup against the seven verified pillars: only **13 truly novel single-source subtasks** with refs not appearing in any other pillar (the other 59 inherited verdicts from prior pillar verification).

NotebookLM Muslim Scholar (`be921648-2088-4860-bdd8-283a5e7301f3`) probed the 13 novel-ref entries (5 unique hadith refs + 5 unique Quran ref ranges, with dupes). Verdict:
- All 5 Quran refs verified as canonical (Arabic + translation correct).
- 2 of 5 hadith refs verified (Sahih Muslim 1552, Sahih Muslim 1709 — both are correct sunnah.com numbering).
- **3 of 5 hadith refs corrected:**
  - `Sahih Muslim 2900` → `Musnad Ahmad 12902` (sapling hadith — Sahih Muslim 2900 is in Kitab al-Fitan, not the canonical sapling chain). Affected 3 occurrences.
  - `Sahih al-Bukhari 2587` → `Sahih al-Bukhari 69` (yassiru wa la tu'assiru — canonical is Bukhari 69, not 2587 which is in Kitab al-Hibah).
  - `Sahih al-Bukhari 2321` → `Shu'ab al-Iman al-Bayhaqi 5313` (itqan hadith — not in Bukhari at all; canonical is Bayhaqi's Shu'ab). Grade simplified to `Hasan` (was previously a multi-source caveat, which the corrected ref makes unambiguous).

## Status

- Tests: 61/61 pass (5 new moontrance grounding-suite tests added).
- Lint: `[STRICT] OK` — 2072 subtasks across 9 pillars, all three ratchets at minimum (per-pillar legacy 0, empty-array 0, inline-refs 0).
- Build: pre-existing `@ogden/ui-components/style.css` workspace-resolution error in worktree environment (logged in [[2026-05-01-milos-ui-components-package-dev-mode-fix]]); not caused by this change.
- Production gates (test + lint) green.

## Why these refs were wrong in the first place

The original Moontrance seed authoring (pre-grounding migration) used "best-guess" hadith numbers that sounded plausible but had not been canonically verified. The 2026-04-25 cross-pillar Quran backfill caught Quran-ref defects but did not check hadith refs against an external corpus — that was deferred to the per-pillar NotebookLM passes. The Moontrance pass surfaced 3 such defects out of 5 unique novel hadith refs (60% defect rate among novel-ref hadiths), while Quran refs were 100% clean — consistent with the broader pattern that hadith ref-numbering is the highest-defect surface in the seed corpus.

## Consequences

- Moontrance is now structurally and groundedly indistinguishable from any of the other seven launch-ready pillars.
- The `migrateMoontranceBoardIds_v1` shim must remain in place indefinitely (or until we are confident no production user has un-migrated localStorage). It is cheap (one read of a sentinel key on each app boot) and idempotent.
- The cross-pillar dedup approach proved dramatically efficient: 72 → 13 worklist after dedup. Future per-pillar grounding passes should run dedup first.
- The pattern of "trust Quran-MCP for Quran refs, NotebookLM for hadith refs" is now confirmed across all 8 pillars and should be the default for any future seed-task authoring.

## References

- `src/data/seed-tasks/moontrance-seed-tasks.js` (new, 225 subtasks)
- `src/store/project-store.js` (MOONTRANCE_BOARDS, ensureMoontranceProjects, migrateMoontranceBoardIds_v1)
- `src/data/seed-tasks/__tests__/grounding.test.js` (moontrance ratchet entry)
- [[2026-04-18-milos-grounding-two-axis]] — schema spec
- [[2026-04-25-milos-faith-grounding-complete]] — per-batch verification cadence pattern
- [[2026-04-26-milos-cross-pillar-grounding-pass]] — sets the launch-readiness bar this session matched
- [[notebooklm-grounding-corpora]] — Muslim Scholar notebook reference

## Wiki backlinks

- [[milos]] — pillar inventory should now list Moontrance as launch-ready
