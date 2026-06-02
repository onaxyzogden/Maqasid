---
title: "Atlas — change a project's primary type mid-project (destructive switch + opt-in backup clone)"
type: decision
date: 2026-06-02
status: accepted
tags: [atlas, plan, ui, data, taxonomy, amanah]
superseded_by: null
---

# Atlas — change a project's primary type mid-project

**Date:** 2026-06-02
**Project:** [[olos]] — `apps/web` Plan stratum-spine + `packages/shared` taxonomy
**Branch:** `feat/atlas-permaculture` (rebases out-of-band)
**Commit:** `d1c4ece0` (10 files, +1331/−2) — **local only, NOT pushed**

---

## Context

In the Plan stratum-spine header (`PlanStratumShell.tsx`) the primary project type
was a plain, non-interactive `<p>` once set. Only the **unset** case was
interactive (the `plan-primary-set-trigger` → `PrimarySetModal` path, which calls
the deliberately non-destructive `setPrimaryType` — it refuses outright when a
`projectTypeRecord` already exists). So a steward who chose the wrong primary in
the creation wizard had **no in-app way to change it**; the only path was
re-running the wizard.

The primary type drives which catalogue of S1–S7 objectives resolves for the
project (`resolveProjectObjectives`), so switching it re-derives the whole
objective set: some objectives disappear, new ones appear, incompatible secondary
layers must be pruned, and progress on now-gone objectives is orphaned. One
fiqh-relevant surface: switching into/out of types that carry `scopeNotes` Amanah
cautions (e.g. Market Garden's CSA / *bayʿ mā laysa ʿindak* flag,
[[feedback-csa-in-catalogues]]) must SURFACE those cautions, never strip them.

## Decision

Add an in-app **"Change project type"** flow on the Plan header of an
already-typed project, gated behind an explicit acknowledgement, with an opt-in
backup clone. Steward-confirmed decisions (two clarification rounds):

- **Friction:** show a full consequences list (objectives added, objectives set
  aside + how many carry started work, dropped incompatible secondaries, newly-active
  tensions, Amanah cautions) and require an explicit **"I understand"** checkbox
  before Confirm enables. Record the change in `versionHistory` as a new
  `'primary-changed'` action entry.
- **Old progress:** the destructive default is to **discard** progress on
  objectives unique to the OLD type — made safe by an opt-in clone.
- **Clone direction:** the CURRENT project switches type **in place** (keeps its
  id, name, map, design entities, URL); the opt-in clone is a frozen **backup
  snapshot under the OLD type** carrying its checklist progress. The steward stays
  on their own project.
- **Decline path:** declining the clone still proceeds and discards orphaned
  progress (the clone is a pure opt-in backup).

## Rationale

This was largely **composition of existing primitives** — the delta engine
(`computeObjectivesDelta`), status engine (`computeAllObjectiveStatuses`), the
consequence-preview pattern (`useSecondaryAddPreview`/`useSecondaryRemovePreview`),
`duplicateProject`, and the per-project progress store all already existed. The
disappearing-objective set is a strict inverse delta
(`computeObjectivesDelta(next, current).newObjectiveIds` — ids in CURRENT but not
NEXT), so the shared objective set is never touched and shared-objective progress
survives the switch. Discarding old-type-unique checklist DATA the steward
explicitly chose to discard is distinct from the "no-deletion of legacy source
components" rule ([[feedback-no-deletion]]); the opt-in clone preserves it.

## Alternatives Considered

- **Clone-and-switch-into-the-new-project** (steward lands on a fresh copy):
  rejected — keeping id/name/map/URL stable means the steward stays on their own
  project; the backup is the copy, not the working project.
- **Non-destructive merge** (keep all old + new objectives): rejected — pollutes
  the catalogue with objectives that don't belong to the chosen type and defeats
  the point of re-deriving from the new primary.
- **Reuse the wizard** (route back through project creation): rejected as the
  status-quo non-solution; it doesn't change an existing typed project in place.

## Consequences

- A typed project's Plan header now exposes a `plan-primary-change-trigger` button
  (the dotted-underline type label) opening `PrimaryChangeModal`, pre-selected to
  the current type. The unset `plan-primary-set-trigger` → `PrimarySetModal` path
  is untouched.
- New shared schema action `'primary-changed'` on `ProjectTypeVersionAction`
  (additive; the `action` field stays `.optional()`, so existing records validate).
- New store action `changePrimaryType(projectId, nextPrimaryId, opts?)` on
  `projectStore` prunes incompatible secondaries, computes discarded objectives via
  the inverse delta, appends one `'primary-changed'` version entry (actor defaults
  `yousef@ogden.ag`), keeps the legacy bare `projectType` aligned, retains prior
  tension/reopening acknowledgements, and discards orphaned progress. Returns
  `{ ok, droppedSecondaryIds, discardedObjectiveIds }`.
- New `planStratumStore` helpers `cloneForProject(source, target)` (deep-copies all
  four per-project slices — `byProject`, `celebratedByProject`, `deferredByProject`,
  `valuesByProject`; the existing `duplicateProject` copies design-intent entities
  but NOT stratum progress, a confirmed gap this bridges) and
  `discardObjectivesProgress(project, ids)` (clears the three per-objective slices,
  leaving the `celebratedByProject` stratum-unlock log untouched).
- **Amanah:** the preview hook surfaces `scopeNotes` cautions both for objectives
  being **added** (cautions newly taken on — switching INTO Market Garden surfaces
  the CSA / *bayʿ mā laysa ʿindak* flag verbatim) and being **set aside** (cautions
  left behind), as an explicit callout — never silently omitted
  ([[feedback-csa-in-catalogues]]).

## Verification

- **Typecheck:** `packages/shared` + `apps/web` `tsc --noEmit` EXIT 0.
- **Unit tests (bounded, `pool:'forks'`):** 19/19 green —
  `projectStore.changePrimaryType.test.ts` (8; data-driven `findScenario()`
  discovers a from→to primary pair that both prunes a secondary and discards
  objectives, asserting against the same `computeObjectivesDelta` the store uses),
  `planStratumStore.changePrimary.test.ts` (6; four-slice clone + three-slice
  discard, independence, project isolation), `usePrimaryChangePreview.test.ts` (5;
  homestead→market_garden fixture — added/set-aside counts vs inverse delta,
  started-set-aside count, Amanah 'added' notes).
- **Preview (caveat):** via disclosed DOM probes the flow was confirmed up to and
  including the Confirm-**disabled**-before-acknowledgement state. The
  post-acknowledgement Confirm-**enable** transition and a clean screenshot could
  **not** be live-captured — the preview environment repeatedly force-navigates to
  `/v3/portfolio` mid-interaction (the documented transient condition
  [[project-screenshot-hang]]: dead API + open modal), not a code defect. Disclosed,
  not faked.

## Deferred

- A success toast on the Plan header after switching (the orchestration handler is
  in place; only the toast surface is unbuilt).
- A clean live screenshot + the post-ack Confirm-enable transition, to be captured
  in an owner-seeded preview environment where the route stops force-navigating.

## Connections

Mirrors the derived-preview / parent-orchestrates pattern of the secondary
add/remove flow; consumes the `resolveProjectObjectives` + `computeObjectivesDelta`
engines from [[2026-05-29-atlas-spec-catalogue-driven-content]] and the
secondary-layer model from [[2026-05-29-atlas-spec-secondary-layer-plugin-model]];
honours [[feedback-csa-in-catalogues]] and the standing CSRA-erased fiqh constraint.

See [[olos]] · session log [[log]] (2026-06-02).
