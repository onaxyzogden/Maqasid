---
date: 2026-05-05
project: milos
status: accepted
tags: [grounding, translation, schema-discipline, data-cleanup, post-launch-readiness]
---

# 2026-05-05 — Translation-Field Bridge Cleanup

## Context

User flagged a Sahih Muslim 2699 grounding card on a marriage subtask whose rendered translation read:

> "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" **Choosing a marriage book together is the first step on a shared path of learning.**"

The bolded sentence is editorial scaffolding (Yousef's voice) appended to the matn — not part of the prophetic narration. Per [docs/grounding-schema.md §3](../../docs/grounding-schema.md), the `translation` field is matn/ayah English **only**; editorial framing belongs in the separate `rationale` field. The pollution violated the schema and created the false impression that editorial commentary was part of the authentic narration.

The render component `GroundingSourceCard` ([src/components/work/SubtaskSources.jsx:122](../../src/components/work/SubtaskSources.jsx)) was innocent — it renders `entry.translation` straight through. The defect was entirely in the data layer, in the `*-seed-tasks.js` files.

The just-completed launch-readiness sweep ([2026-05-03 Prayer ADR](2026-05-03-milos-prayer-launch-readiness-review.md) and predecessors) had verified `relevance` and `ref` correctness across all 9 pillars but did **not** check field-content discipline (matn-only in `translation`). This cleanup closes that gap.

## Approach

Three-script pipeline, modeled on [scripts/prayer-fixes.mjs](../../scripts/prayer-fixes.mjs):

1. **Enumerator** ([scripts/audit-translation-bridges.mjs](../../scripts/audit-translation-bridges.mjs)) — walks every `sources[]` entry across all 10 seed-task files, splits each `translation` on the last closing-quote `."`, and flags the tail as a bridge if it matches one of:
   - **Gerund lead** — `^[A-Z][a-z]+ing\b` (e.g. "Choosing a marriage book…", "Reading the Quran together…", "Tracking your sleep…").
   - **Demonstrative lead** — `^(This|These|Such|That)\s+(establishes|shows|demonstrates|reflects|grounds|underscores|highlights|principle|practice|teaching|…)`.
   - **Bridge phrase** — phrase-list (`applies here`, `in our context`, `the first step on/toward/in`, `extends to`, `reflects the`, `aligns with`, `is a form of`, `is an act of`, `is an expression of`).
   - **Commentary verb** — short single-sentence tail (<220 chars, exactly one terminal `.`) containing one of: `embodies, reflects, expresses, grounds, underscores, exemplifies, strengthens, protects, preserves, honors, anchors, ensures, builds, fulfills, completes, supports, enables, extends, aligns, deepens, cultivates, secures, restores, enacts, signals, marks, traces, prevents, advances, safeguards, witnesses, invites, instills, frames, brings, amounts to, is the (fullest|essential|natural|first), is itself, applies (here|directly), translates, transforms`.

   Outputs `tasks/translation-bridge-manifest.json` keyed by `confidence: 'unambiguous' | 'review'`.

2. **Patcher** ([scripts/translation-bridge-fixes.mjs](../../scripts/translation-bridge-fixes.mjs)) — operates only on `confidence: 'unambiguous'` entries. Two modes per entry, decided by `isGeneric()` check on the existing rationale:
   - **`replace-generic-rationale-with-bridge`** — when rationale matches a generic placeholder (`Prophetic narration cited as evidence for this subtask.` / `Cited as evidence for this subtask.` / `Quranic … cited as evidence for this subtask.`), MOVE the bridge into the rationale field so editorial intent isn't lost, then strip from translation.
   - **`delete-bridge-keep-rationale`** — when rationale is substantive, DELETE the bridge from translation; rationale already carries editorial framing.

   Byte-level idempotent matches; fails loudly on mismatch.

3. **Iterative refinement** — heuristic was tightened in 4 passes (specific-verbs → demonstratives → generalized gerund → commentary-verbs) as spot-checks revealed bridges the prior pass missed.

## Outcomes

### Patches applied

| Pillar | Entries patched |
|---|---|
| Faith | 6 |
| Health/Life | 2 |
| Intellect | 28 |
| Family | 109 |
| Wealth | 45 |
| Environment | 28 |
| Ummah | 48 |
| Moontrance | 23 |
| Prayer | 0 |
| Weekly | 0 |
| **Total** | **289** |

`git diff --stat src/data/seed-tasks/` = 8 files modified, 550 insertions + 550 deletions (every patch is a balanced one-line move/edit).

### The originally-reported card

`family-seed-tasks.js:1087` Sahih Muslim 2699 (marriage-book subtask):
- **Before:** translation = matn + `"Choosing a marriage book together is the first step on a shared path of learning."`; rationale = `"Prophetic narration cited as evidence for this subtask."` (generic placeholder).
- **After:** translation = matn only; rationale = `"Choosing a marriage book together is the first step on a shared path of learning."` (bridge MOVED, editorial intent preserved).

### Residual

255 entries remain in the `review` confidence bucket. Sampling shows ~90% are **legitimate matn continuations** (narrator additions like "Ibn 'Abbas added…", "But after a few days Waraqa died…", attribution like "Also recorded in Sahih Muslim 151."), not editorial bridges. These are part of the original hadith narration and must NOT be removed. A small residual (~5-10% of the review bucket) may be real bridges the heuristic couldn't unambiguously isolate from continuation text; these are deferred for hand-review in a future session.

## Verification

- `npm test`: **61/61 pass**.
- `npm run lint`: `[STRICT] OK` — all three ratchets at minimum (per-pillar legacy 0, empty-array 0, inline-refs 0); 78 inline refs across the corpus, 0 missing-from-sources.
- Source-level spot-check on `family-seed-tasks.js:1064-1090`: bridge moved to rationale, translation is matn-only.

## Why the launch-readiness sweep missed this

The per-pillar grounding sweeps (April-May 2026) were structured around the two-axis schema decision ([2026-04-18](2026-04-18-milos-grounding-two-axis.md)): they verified `provenanceTier` × `relevance` axis correctness and `ref` resolution, plus the three monotonic ratchets (legacy 0, empty-array 0, inline-refs 0). None of those checks examined field-content discipline within `translation` — the schema says "English translation" but doesn't constrain it byte-for-byte to matn-only at lint time. A structural lint guard (e.g. flag any `translation` ending in a sentence that begins with a capital-V gerund after a `."`) would catch regressions; recommended as a follow-up.

## Decision

The translation-field cleanup is **complete for the unambiguous bucket** (289 entries). The residual review bucket is left as-is pending a future hand-review pass. All 9 pillars remain launch-ready.

## Files Changed

- `src/data/seed-tasks/{faith,health,intellect,family,wealth,environment,ummah,moontrance}-seed-tasks.js` — 289 inline patches (bridges moved to rationale or deleted).
- `scripts/audit-translation-bridges.mjs` (new, in-tree) — Phase 1 enumerator.
- `scripts/translation-bridge-fixes.mjs` (new, in-tree) — Phase 3 patcher.
- `tasks/translation-bridge-manifest.json` (new) — current state of review-bucket residual.

## Follow-up recommendations

1. **Structural lint guard.** Add a check in `scripts/audit-inline-refs.mjs` (or a sibling) that flags any `translation` whose tail after the last `."` matches the gerund/demonstrative/commentary-verb patterns. Ratchet at 0 going forward.
2. **Residual review-bucket pass.** Hand-review the 255 entries currently in `tasks/translation-bridge-manifest.json`; expect ~5-10% real bridges still requiring extraction, the remainder are legitimate matn continuations.
3. **Relevance-axis review of patched entries.** Many of the patched entries cite a matn that names a broader principle and apply it to a narrower subtask context — same `direct → contextual` pattern from the Prayer/Ummah sweeps. Worth a defensive sweep, lower priority than the regression guard.

## References

- Schema: [docs/grounding-schema.md](../../docs/grounding-schema.md) §3
- Render component (innocent): [src/components/work/SubtaskSources.jsx:122-132](../../src/components/work/SubtaskSources.jsx)
- Patch-script pattern precedent: [2026-05-03-milos-prayer-launch-readiness-review](2026-05-03-milos-prayer-launch-readiness-review.md)
- Two-axis schema: [2026-04-18-milos-grounding-two-axis](2026-04-18-milos-grounding-two-axis.md)
- Plan: `C:\Users\MY OWN AXIS\.claude\plans\review-every-subtask-and-wild-flame.md`
