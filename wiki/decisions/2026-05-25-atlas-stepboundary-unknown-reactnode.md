---
title: "Atlas — StepBoundary `unknown && <jsx>` TS2322 root-cause fix (clears long-standing baseline)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, typescript, react, bugfix, tech-debt, wizard]
superseded_by: null
---

# Atlas — StepBoundary `unknown && <jsx>` TS2322 root-cause fix

## Context

`apps/web/src/features/project/wizard/StepBoundary.tsx` produced a persistent
`TS2322: Type 'unknown' is not assignable to type 'ReactNode'` under
`tsc --noEmit`. This error was cited in ~10 prior atlas ADRs as one of "4
pre-existing, unrelated `tsc` baselines" (alongside `planImpactFlag.test.ts`,
`HostUnionContextMenu.test.tsx`, `HostUnionDrilldownCard.test.tsx`) and treated
as untouchable background noise carried from slice to slice.

The error was hard to pin down because **TS misattributes it to a sibling child**
in the same children array — across runs it "wandered" between lines (163, 365,
367, 419-424) as the file and the shared working tree changed, which fed several
wrong theories: a non-reproducible phantom, an instantiation-budget/recursion
ceiling, a duplicate `@types/react`, and a component-vs-host-element mismatch.
`--extendedDiagnostics` ruled out the budget theory (1.73M instantiations against
a 5M ceiling; no `TS2589`), and a single hoisted `@types/react@18.3.28` ruled out
duplicate types.

## Decision

The genuine root cause is **`unknown && <jsx>`**. The boundary-confirmation block
was gated by `{data.parcelBoundaryGeojson && (<div .../>)}`, and
`parcelBoundaryGeojson` is typed `unknown | null` on `WizardData`
(`apps/web/src/pages/NewProjectPage.tsx:52`). TS types the result of `&&` as
`(falsy-subset-of-left) | right`; for an `unknown` left operand the whole
expression widens back to `unknown`. As a JSX child, `unknown` is not assignable
to `ReactNode` → TS2322.

Fix — coerce the guard to a boolean so the child becomes `false | Element`:

```tsx
{/* Boundary-set confirmation. `parcelBoundaryGeojson` is typed `unknown |
    null` on WizardData, and `unknown && <jsx>` widens the whole child
    expression to `unknown` (not assignable to ReactNode). Coerce the
    guard to a boolean so the child is `false | Element`. */}
{data.parcelBoundaryGeojson != null && (
  <div role="status" ...>
```

(was `{data.parcelBoundaryGeojson && (`). A 5-insertion / 2-deletion diff in the
single consumer.

### Key choices

- **Fix at the consumer (`!= null`), not by retyping `WizardData`.** The loose
  `unknown | null` field is shared; narrowing it to a `GeoJSON.FeatureCollection`
  could ripple to other consumers (e.g. `showBoundaryOnMap(map, d.parcelBoundaryGeojson as GeoJSON.FeatureCollection)`
  already casts at line 47). A localized guard coercion is the minimal, safe change.
- **Kept the change surgical.** An earlier exploratory `GeocodeWarningBanner`
  component extraction (and explicit-return-type / fragment experiments) was
  reverted and deleted — the inline geocode banner was never the problem.

## Rationale

The operator chose "attempt the real fix" over committing a non-fix or treating
the error as a permanent baseline. Tracing the actual *type* of the gated
expression (and inspecting `WizardData`) — rather than theorizing about
positions and budgets — revealed a one-line root cause. The lesson: when an
error "wanders" between siblings in a JSX children array, suspect a sibling
expression whose type is `unknown`/`any`, and check the type early instead of
chasing position.

## Consequences

- **A long-standing baseline is cleared.** `StepBoundary.tsx` no longer appears
  under `tsc --noEmit`; the carried "4 pre-existing errors" baseline is now **3**
  (`planImpactFlag.test.ts(143,12)`, `HostUnionContextMenu.test.tsx(58,36)`,
  `HostUnionDrilldownCard.test.tsx(25,36)` — all foreign test WIP, untouched).
  Future ADRs should reference the reduced baseline.
- **Verification:** full `tsc --noEmit -p tsconfig.json` (8GB heap) confirms
  `StepBoundary.tsx` absent from the error list; only the 3 foreign test errors
  remain. Clean `git diff` (5 insertions / 2 deletions, single file).
- Committed on `feat/atlas-permaculture` alongside the Act/Plan right-rail
  stacking fix.

## Connections

- [[olos]] — the project this fixes (project-creation wizard, Step 3 boundary)
- [[2026-05-25-atlas-plan-impact-flags]] / [[2026-05-25-atlas-plan-decision-log]] — recent slices whose ADRs cited this error as a pre-existing baseline
