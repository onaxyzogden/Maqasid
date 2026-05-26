---
title: "Atlas — Trim the Stage Zero Vision Builder to a Lean 6, defer the rest, add Select-all"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, stage-zero, vision-builder, intake, questionnaire, ux, defer-to-plan, select-all, no-deletion]
superseded_by: null
---

# Atlas — Trim the Stage Zero Vision Builder to a Lean 6, defer the rest, add Select-all

## Context

The Stage Zero Vision Builder (the questionnaire that replaced the old
project-creation wizard and emits a machine-readable Vision Profile) asked
**28–32 questions**, many at the **wrong altitude**. It made the steward
*specify features* at intake — which water systems to build, whether to put up a
barn / animal shelter / compost area, livestock roles & intensity, housing
forms, shared spaces. Those are **Plan-stage decisions**: they should be
*advised* later from what OBSERVE captures and what the guided vision layout
entails — not chosen blind before a boundary is even drawn.

The steward's framing: *"What water systems a user wants built should not be
something they choose in this stage… asking the user if they want a barn or
animal shelter or compost area at this stage is also premature. 30+ questions is
way too many. It should be a maximum of 8."* And: variability within a project
type is mostly in the **layout** of features, not the **type** of features —
so intake should fix the *type/intent*, and Plan should resolve the *layout*.

Two further asks: **skipped questions should be noted** so they can guide the
Plan hand-off (nothing should feel lost), and every multi-select should have a
**"Select all"** button.

This is still **preview-only** territory — the activation strip and Vision
Profile don't yet gate Plan rendering — so the change is contained.

**Decisions locked with the steward (AskUserQuestion):**
1. **Lean 6** — keep exactly six questions; defer the rest.
2. **Remove the caps** — drop every `maxSelections` so multi-selects (and the new
   Select-all) work uniformly.

## Decision

- **KEEP (Lean 6, in catalog order):** `project-type` · `primary-outcomes` ·
  `values` · `budget-range` · `timeline` · `success`.
- **DEFER (flag `deferToPlan: true`, do NOT delete) — the 27 others:**
  `land-identity`, `users`, `public-access`, `systems-food`, `systems-animals`,
  `systems-water`, `systems-built`, `economic-intent`, `income-streams`,
  `economic-style`, `development-style`, `complexity-tolerance`,
  `operating-style`, `will-live-on-land`, `residential-forms`, `shared-spaces`,
  `livestock-roles`, `livestock-intensity`, `livestock-management`,
  `livestock-priorities`, `non-negotiables`, `disqualifiers`, `resources-have`,
  `resource-constraints`, `first-working`, `guidance-style`, `guidance-depth`.
- **Caps removed** from the kept multi questions (`primary-outcomes` was max 3,
  `values` & `success` max 5); their subtitles changed to "Choose all that
  apply…". Deferred questions' caps left untouched (they're hidden anyway, and
  preserved per the no-deletion rule for later reuse).
- **No schema change.** The deferred list is **derived from the static catalog**
  (`deriveDeferredTopics()`), not persisted — it's identical for every project,
  so persisting would be redundant. (`VisionProfile` is `.partial()` but not
  `.passthrough()`, so adding no field also avoids a `@ogden/shared` rebuild.)
- **"Select all / Clear all"** added to every kept multi-select via a new
  `toggleSelectAll(question)` (batched single persist) + `allSelectedFor(question)`
  on `useVisionBuilder`, surfaced as a gold pill in `VisionQuestionCard`.
- **Deferred topics surfaced read-only** in `VisionProfileSidebar` under an
  "Explored later in the Plan stage" section (dashed chips, one per deferred
  topic's eyebrow, `title` = the topic title) — so the steward sees nothing was
  lost and these are handed to Plan.

## Implementation

- `data/visionBuilderQuestions.ts` — added `deferToPlan?: boolean` to the
  `VisionQuestion` interface; set `deferToPlan: true` on the 27 deferred
  questions; deleted `maxSelections` from `primary-outcomes`/`values`/`success`
  and updated their subtitles; added `DeferredTopic` interface +
  `deriveDeferredTopics()` (filters the catalog by `deferToPlan`, returns
  `{id, eyebrow, title}`). Left `toProjectType`, `hasLivestockInScope`,
  `NON_ANIMAL_IDS`, `willLiveOnLand` intact (still valid for the preserved
  deferred questions).
- `useVisionBuilder.ts` — `visibleQuestions` now also drops deferred
  (`!q.deferToPlan && (!q.visibleWhen || q.visibleWhen(profile))`), so
  "Question N of **6**" and the progress ratio fall out automatically; added
  `toggleSelectAll` + `allSelectedFor`.
- `components/VisionQuestionCard.tsx` (+ `.module.css`) — "Select all / Clear
  all" pill after the multi-row indicator; capless multi hint copy.
- `StageZeroVisionPage.tsx` — threaded `onSelectAll`/`allSelected` (multi only);
  passed `deriveDeferredTopics()` into the sidebar.
- `components/VisionProfileSidebar.tsx` (+ `.module.css`) — read-only "Explored
  later in the Plan stage" section.
- `lib/deriveActivatedModules.ts` — `if (question.deferToPlan) continue;` in the
  walk (deferred questions are unanswered today, so behaviour is unchanged, but
  the projection is now explicitly vision-only). Baseline seeding on
  `primaryType` unchanged.
- `__tests__/visionBuilder.test.ts` — asserts the active set equals the 6 kept
  ids in catalog order, kept multis carry **no** `maxSelections`, and
  `deriveDeferredTopics()` returns exactly the 27 non-kept ids (none of the 6
  leaking); 4 `deriveActivatedModules` tests rewired off now-deferred profile
  paths onto kept ones, and the two livestock tests replaced with assertions
  that deferred answers contribute **no** modules to the strip.

## Rationale

- **Right altitude at intake.** Intake fixes the *type/intent*; Plan resolves the
  *layout* of features from OBSERVE + the guided vision. Asking for specific
  water systems / barns / compost areas / livestock intensity before a boundary
  exists is premature and produces guesses, not decisions.
- **Flag, don't delete.** Honours the no-deletion rule ([[feedback_no_deletion]])
  — the 27 deferred questions, their options, and the `toProjectType` /
  `hasLivestockInScope` predicates stay intact for Plan-stage reuse. Reversible
  by flipping one boolean per question.
- **Catalog-derived deferred list over a schema field.** The deferred set is the
  same for every project, so it's a pure projection of the static catalog — no
  persistence, no `@ogden/shared` rebuild, no migration.
- **Nothing feels lost.** The sidebar's "Explored later in the Plan stage"
  section is the steward-visible promise that skipped topics are noted and handed
  forward.

## Alternatives considered

- **Delete the 27 questions outright** — rejected (violates no-deletion; loses
  predicates and option catalogs needed in Plan).
- **Persist the deferred list on the Vision Profile** — rejected (redundant; it's
  identical per project and would force a shared-package rebuild).
- **Keep the caps and special-case Select-all** — rejected; removing caps makes
  Select-all uniform and matches the "choose all that apply" intent.

## Consequences

- Stage Zero now reads "Question N of **6**"; progress and the upcoming-questions
  preview recompute automatically from `visibleQuestions`.
- The activation strip projection is now explicitly vision-only (deferred answers
  add nothing), so it can't be skewed by stale deferred paths.
- When Plan-stage advising is built, `deriveDeferredTopics()` is the ready hand-off
  surface; the deferred questions can be re-surfaced there (or selectively
  un-deferred) without reconstruction.
- Preview-only: no Plan rendering gates on this yet, so risk stays contained.

## Verification

- `npm run typecheck` (8 GB-heap node script; plain `tsc` OOMs) → exit 0.
- `npm test` (vitest) → `visionBuilder.test.ts` **19/19** green.
- Browser (dev server :5200): confirmed via `preview_eval` DOM reads —
  "Question 2 of 6"; Select-all checked all 16 Primary-Outcomes options (no cap)
  with the button flipping to "Clear all"; Clear-all reset to 0; sidebar
  "Explored later in the Plan stage" rendered 27 deferred-topic chips.
  `preview_screenshot` times out on this WebGL-heavy app — verified via DOM
  reads, tool limitation disclosed (not faked), per the project's preview rule.

Committed `e61c7489` ("feat(stage-zero): trim Vision Builder to lean 6, defer the
rest, add Select-all", 9 files, +314/−23) on `feat/atlas-permaculture`, staged by
explicit path (no foreign WIP bundled).

## Connections

- Entity: [[olos]]
- Sits in the Stage Zero / Vision Builder surface (intake → Vision Profile);
  hands deferred topics forward to the Plan stage Command Centre
  ([[2026-05-25-atlas-plan-command-centre]]) and its Plan Operation layer
  ([[2026-05-25-atlas-plan-impact-flags]], [[2026-05-25-atlas-plan-decision-log]]).
- Honours [[feedback_no_deletion]] (flag-don't-delete) and the rebased-branch
  discipline [[project_branch_rebase]] (commit immediately, stage by name).
