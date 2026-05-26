---
title: "Atlas — UniversalDomain step 3 cutover (slice 3a: mergeFn foundation)"
type: decision
date: 2026-05-26
status: accepted
tags: [atlas, olos, shared-schema, packages-shared, universal-domains, zustand-persist, migration, architecture, step-3]
superseded_by: null
---

# Atlas — UniversalDomain step 3 cutover (slice 3a: mergeFn foundation)

## Context

Slice 1 ([[2026-05-26-atlas-universal-domain-shared-enum]], atlas
`e65ce7ea`) landed the shared `UniversalDomain` enum + primary-only
`moduleId → domain` map + naive `migrateByProjectModuleKeys<T>()` helper
with last-wins+warn on collision. Slice-1 testing surfaced that Plan
(15→11) and Act (8→6) collisions are real data-loss surfaces; the naive
helper is safe only for Observe.

Step 3 is the **cutover**: rebase the stage-local `ObserveModule` /
`PlanModule` / `ActModule` unions onto `UniversalDomain` everywhere they
flow, migrate in-flight `byProject` localStorage without losing evidence
or how-check state, rework the affinity / derived-activation / compass /
Command Centre consumers, and wire a project-type → primary-domains
emphasis map.

**Locked design decisions** (session of 2026-05-26):

- **Per-stage subset = all 16 universal domains.** Each stage exposes
  every domain post-cutover. Empty domain×stage cells ship with
  `CARDS = []` and accumulate as a content-authoring backlog.
- **Collision merge = concat-with-offset.** When N legacy modules
  collapse to one domain the domain's new objective/how-step list is
  the concatenation of the colliding modules' lists in **canonical
  insertion order** (the order locked by slice-1 vitest); each legacy
  index is shifted by the cumulative length of prior modules in the
  group. Preserves all evidence indices + how-check indices losslessly.

Step 3 is sliced as 3a (this ADR — shared `mergeFn` foundation),
3b+3c (atomic stores+types.ts+consumers cutover), 3d (project-type
emphasis map).

## Decision (slice 3a)

Extend `migrateByProjectModuleKeys` in `@ogden/shared` with an optional
`mergeFn` parameter. **Shared-package-only and purely additive** — no
edits in `apps/web` or `apps/api`, no `persist.version` bumps, no
consumer of the new behaviour wired yet.

```ts
export type MergeFn<T> = (
  domain: UniversalDomain,
  parts: ReadonlyArray<{ moduleId: string; value: T }>,
) => T;

export function migrateByProjectModuleKeys<T>(
  persisted: unknown,
  stage: LegacyStage,
  mergeFn?: MergeFn<T>,        // default = last-wins + warn (slice-1 behaviour)
): { byProject: Record<string, Partial<Record<UniversalDomain, T>>> } | null;
```

When two legacy module ids collide on the same domain inside a project,
all colliding values are collected, **sorted by canonical insertion
order** of the relevant `*_MODULE_TO_DOMAIN` map (deterministic
irrespective of the persisted blob's iteration order), and passed to
`mergeFn`. Single-part inputs bypass `mergeFn`. Absent `mergeFn` falls
back to the slice-1 last-wins+warn path.

## Why a separate slice for the mergeFn

The original step-3 plan bundled the mergeFn extension with the
stores+types.ts rebase as a single atomic commit. On closer inspection
the optimism about the "`ObserveModule = UniversalDomain` alias keeps
importers compiling" doesn't hold: TypeScript narrows literal-string
assignments, so every site that writes `const m: ObserveModule = 'human-context'`
(SEED maps, label tables, palette tables, ~89 importers) breaks the
moment the union shape changes. Slice 3b and 3c must therefore land as
one coordinated commit — and the mergeFn foundation is cleanly
separable, additive, and worth committing on its own so it can be
reviewed in isolation.

## Verification

- `npx vitest run` in `packages/shared`: **374/374 tests pass** (the new
  4 mergeFn cases + the 23 slice-1 cases + 347 pre-existing).
- `npx tsc --noEmit` in `packages/shared`: clean.
- Atlas commit `b43e3ea4` on `feat/atlas-permaculture`, 2 files
  (+199/−32), staged by explicit path. Foreign WIP in the working tree
  (capital-partner PDF, financial store/UI, ZoneSomSidebar, slice3
  auto-needs patch, `.superpowers/`, `_sweep_out.txt`, `tsc_chk.txt`,
  `tsc_phase4.txt`, two phasing-budgeting tests, etc.) **not staged**.
- Pushed `e65ce7ea..b43e3ea4` after `git fetch` (ahead-1 / behind-0
  before push, ahead-0 / behind-0 after).

## Consequences / future work

- **Slice 3b + 3c (next, atomic):** wire the per-store mergeFns, bump
  `persist.version` `1 → 2` on the 6 module-keyed stores, rebase
  `apps/web/src/v3/{observe,plan,act}/types.ts` onto `UniversalDomain`,
  expand the LABEL/FULL_LABEL/CARDS/ICONS maps to 16 entries each, and
  rework all ~89 importers (affinity tables, deriveActivatedModules,
  compass configs, palettes, vision questions, Command Centre tabs).
  Single coordinated commit because the union-shape change cascades
  through all literal-string usages at once.
- **Slice 3d:** `PROJECT_TYPE_DOMAIN_EMPHASIS` derived from the
  domain-keyed `PROJECT_TYPE_MODULE_AFFINITY` (post-3c), top-N=6 by
  weight, consumed by Stage-Zero project-creation UI.
- **Canonical collision ordering** (locked by slice-1 invariants; the
  mergeFn callbacks in 3b must respect this order):
  - Plan / `access-circulation` ← [`dynamic-layering`, `zone-circulation`]
  - Plan / `built-infrastructure` ← [`structures-subsystems`, `machinery`]
  - Plan / `ecology` ← [`regeneration-monitor`, `habitat-allocation`, `biodiversity-monitor`]
  - Act / `built-infrastructure` ← [`build`, `maintain`]
  - Act / `monitoring-records` ← [`tracker`, `review`]

## Connections

- Parent direction: [[2026-05-25-atlas-universal-domains]]
- Prior slice: [[2026-05-26-atlas-universal-domain-shared-enum]]
- Concept: [[olos-universal-domains]]
- Entity: [[olos]]
- Branch / push discipline: [[project_branch_rebase]],
  [[feedback_commit_immediately_on_rebased_branches]]
- Slices 3b + 3c + 3d — future, not started.
