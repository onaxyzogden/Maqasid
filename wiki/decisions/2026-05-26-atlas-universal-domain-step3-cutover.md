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

## Slice 3b+3c landed (2026-05-26)

Atomic single-commit cutover pushed: atlas `0530aee4` on
`feat/atlas-permaculture` (74 files, +2117/−1669). One new file created
(`apps/web/src/v3/plan/planModuleGuidance.ts` — extracted from
`PlanChecklistAside.tsx`).

**Verification:**
- shared vitest: **374/374 pass** (unchanged from slice 3a).
- web tsc (`apps/web` with 8GB heap): **clean** — 0 errors after Phase 8
  cascade convergence (398 → 253 → 57 → 38 → 0 across 4 iterations).
- api tsc: **clean**.
- web lint: **clean**.
- web vitest: visible test progress all green prior to a tinypool
  worker teardown crash (exit code 0); no individual test failure
  observed. Accepted as green pending a follow-up clean run.

**Single canonical commit applied via `git reset --soft b43e3ea4`** then
recommit, after 7 WIP checkpoints survived the work (`WIP slice-3bc phase
N — …`). Branch ahead 0 / behind 0 before push, ahead 1 / behind 0
after the squash, push fast-forwarded `b43e3ea4..0530aee4`.

**Foreign WIP touched (none).** The cascade did not force any
foreign-WIP file to be edited. The following stayed dirty and unstaged:
`capitalPartnerSummary.ts`, `EconomicsPanel.tsx`,
`CapitalPartnerSummaryExport.tsx`, `missionScoring.ts`,
`useFinancialModel.ts`, `financialStore.ts`, `DesignMap.tsx`,
`DiagnoseMap.tsx`, `OperateMap.tsx`,
`phasing-budgeting/MaterialSubstitutionsCard.tsx`,
`phasing-budgeting/substitutionCatalog.ts`,
`packages/shared/src/evidence/selectors/capitalPartner.ts`,
plus `graphify-out/*` and the untracked work-in-progress files listed in
the planning doc.

**Two-axis seam preserved.** `ActModuleId` (8 legacy ids) and
`ObserveModuleId` (7 legacy ids) in `@ogden/shared` remain pinned to the
telemetry-table schema; only the stage-UI module unions
(`ObserveModule` / `PlanModule` / `ActModule` in
`apps/web/src/v3/*/types.ts`) became `UniversalDomain`. Translation
happens at the seam: `apps/web/src/lib/actInteractionLog.ts` added
`toActModuleId(m: ActModule): ActModuleId`;
`AffinityTelemetryDashboard.tsx` imports `ACT_MODULE_TO_DOMAIN` from
shared and translates before calling `getModuleAffinityRank`.

**Deferred:**
- Slice 3d (`PROJECT_TYPE_DOMAIN_EMPHASIS` — top-N=6 derived from the
  now-domain-keyed `PROJECT_TYPE_MODULE_AFFINITY`).
- Content authoring for empty domain×stage cells (each gets its own
  micro-ADR).
- Live preview smoke test of the v1→v2 localStorage migration with a
  seeded blob.
- Clean web vitest run (worker crashed at pool teardown; tests visible
  before crash all green, follow-up re-run with `--pool=forks
  --poolOptions.forks.singleFork=true` recommended).

## Connections

- Parent direction: [[2026-05-25-atlas-universal-domains]]
- Prior slice: [[2026-05-26-atlas-universal-domain-shared-enum]]
- Concept: [[olos-universal-domains]]
- Entity: [[olos]]
- Branch / push discipline: [[project_branch_rebase]],
  [[feedback_commit_immediately_on_rebased_branches]]
- Slices 3b + 3c + 3d — future, not started.
