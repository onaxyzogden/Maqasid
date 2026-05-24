---
title: "Atlas Observe Command Centre — center-unlock mechanic"
type: decision
date: 2026-05-24
tags: [atlas, observe, stage-compass, command-centre, dashboard, gating, routing, ui]
status: accepted
superseded_by: null
---

# Atlas Observe Command Centre — center-unlock mechanic

## Context

The Observe **Stage Compass** (built across prior sessions — Goals 1–4: a
full-screen mission-select wheel of the 7 Observe objectives, each with a
gated node skill-tree, swapped onto the shared `@ogden/ui-components`
`MaqasidComparisonWheel`) was a *flat* mission-select: every objective equal,
the wheel center a static "OBSERVE" label, and "Open on Map" (in the right
panel) the only doorway into a working surface — each module's map its own
island.

The [OLOS Stage Compass Mechanic] doc reframes the whole screen around one
rule: **"Gather at the edge, govern from the center" — the outer ring readies
the stage; the center runs it.** The steward completes/verifies the outer-ring
objectives, and only once the foundation exists does the *center* light up and
become the doorway into an aggregate operational view. There was no readiness
gate, no center affordance, and no aggregate "run the stage" surface. **Goal 5**
builds that missing center mechanic + the surface it opens into, for **Observe
only**.

## Decision

Implement the doc's three-mode model and the aggregate surface it unlocks:

- **Three modes** — **Setup** (center dim/locked) → **Ready** (all objectives
  100% verified → hub glows, center reads "Open Command Centre") → **Command**
  (center clicked → the full Observe Command Centre opens).
- **Unlock rule** = `data.views.length > 0 && data.views.every(v => v.progress.pct === 100)`
  (all 7 objectives 100% verified), computed from the existing `useCompassData`.
- **Center target = a net-new aggregate Observe Command Centre**, not the
  existing per-module map.
- **Keep the shared `MaqasidComparisonWheel`.** Its hub is not natively
  clickable and accepts no center slot, so the center affordance is an
  **overlay** (an absolutely-centered `<button>` over the hub inside a
  `position: relative` host). The Ready glow reuses the wheel's built-in
  **`forceConverged`** prop rather than hand-rolling glow.
- **Observe only.** Plan/Act remain top-spine links to their existing pages.

### Shipped in three commit-immediately slices (`feat/atlas-permaculture`)

- **Slice A `d7355da8`** — route + page scaffold + locked guard. Registered
  `v3ObserveCommandCentreRoute` (path `observe/command-centre`, static — resolves
  before `observe/$module` in TanStack) on `v3ProjectLayoutRoute`; extended the
  `V3ProjectLayout` full-bleed branch to match `command-centre` as well as
  `compass`; created `ObserveCommandCentrePage` with the not-ready "Command Centre
  locked" guard (quiet state + Back-to-Compass, no hard redirect).
- **Slice B `9b77f3cf`** — center-unlock mechanic. `ObserveCompassWheel` gained
  `ready` + `onEnterCommandCentre` props, passes `forceConverged={ready}`, and
  renders the center hotspot overlay (Setup = `aria-disabled`, dim, "Locked";
  Ready = accent activation ring + "Open Command Centre", `onClick`).
  `StageCompassPage` computes `ready` and wires `goCommandCentre()`.
- **Slice C `bb5a30a0`** — fleshed-out Command Centre panels: `SiteMapPanel`
  (embeds `DiagnoseMap` read-only), inline Observe-summary (7 objectives +
  verified node counts), `EvidenceLibraryPanel` + `GapsPanel` (both off a new
  `useEvidenceCounts` hook), `ModuleDashboardsPanel` (the 7 module dashboards
  embedded, each deep-linking to `/observe/$module`), and a Plan-readiness card
  → `/plan`.

## Rationale

- **Overlay, not a forked wheel** — the shared `MaqasidComparisonWheel` is the
  design-system source of truth (adopted in Goal 4); forking it to add a
  clickable center would re-introduce the maintenance divergence Goal 4 removed.
  An overlay + the wheel's own `forceConverged` keeps us on the shared component.
- **Static `observe/command-centre` route** — TanStack resolves static segments
  before `$param`, so it cannot collide with the existing `observe/$module`; no
  redirect-landing change needed (Command Centre reached only via the unlocked
  center or direct URL).
- **Embed the 7 dashboards rather than rebuild** — each module Dashboard is
  independently importable (only zustand hooks + `useV3Project`/`useParams`, no
  MapProvider/DrawHost), so the aggregate page is composition, not duplication.
- **The Ready glow is the one sanctioned exception** to the biophilic
  "no glow/blur" register — documented as the single intentional emphasis,
  delivered via the design-system wheel's own aura.

## Alternatives Considered

- **Fork `MaqasidComparisonWheel` to add a real clickable center slot** —
  rejected: re-creates the divergence Goal 4 eliminated; the overlay achieves
  the same UX without owning a wheel fork.
- **Make the center open the existing per-module map** — rejected by the
  operator: the doc's "govern from the center" needs an *aggregate* surface, not
  a single module's island.
- **Hard-redirect away from `/observe/command-centre` when not ready** —
  rejected: a quiet "locked" state with a path back to the compass is gentler
  and preserves a deep-linkable URL.

## Consequences

- The compass now has a genuine *progression* spine: outer-ring verification is
  the gate that lights the center; the aggregate Command Centre is the reward.
- New `apps/web/src/v3/command/` folder houses the page, its panels, the
  `useEvidenceCounts` hook, and `ObserveCommandCentrePage.module.css` (tokens
  only) — kept distinct from `apps/web/src/v3/compass/`.
- **Discovery / plan correction:** the plan assumed the 7 Observe annotation
  stores are `byProject[projectId]`. They are in fact **flat single-project**
  zustand stores whose records each carry a `projectId` field; `useEvidenceCounts`
  filters by `record.projectId === projectId`, matching the module dashboards'
  own pattern.
- Deferred (unchanged from the plan): Plan/Act compasses + their gating data; a
  real evidence-verification backend; on-wheel node-path/background-image styling
  (would mean dropping the shared wheel); a permanent in-UI "mark all verified"
  cheat (Ready state was driven for verification via the persisted
  `ogden-atlas-observe-compass` store, restored to SEED afterward).

## Verification

- `corepack pnpm --filter @ogden/web run typecheck` — clean apart from the **3
  pre-existing unrelated errors** (`StepBoundary.tsx(365,7)`,
  `HostUnionContextMenu.test.tsx(58,36)`, `HostUnionDrilldownCard.test.tsx(25,36)`).
- Preview-verified (screenshots) all three modes: **Setup** (center dim/locked,
  segments still select/hover/deselect — Goal 4 intact); **Ready** (hub
  `forceConverged` glow + accent ring + "Open Command Centre", reached by writing
  all-verified state into `ogden-atlas-observe-compass` then reloading);
  **Command** (full-bleed Command Centre — site map, 7-objective summary,
  evidence-library tally, gaps panel, the 7 embedded module dashboards each
  deep-linking to `/observe/$module`, Plan-readiness CTA). SEED defaults restored
  after the drive.

## Connections

- [[olos]] — the Atlas/OLOS app this ships in (Observe stage)
- [[2026-05-24-atlas-objective-driven-workspace]] — same-day follow-on that fills
  the Command Centre shell with location-bound `FieldObjective`s and **partially
  supersedes the 100%-complete gate**: the page guard (Slice A) was removed, but
  this ADR's center-unlock wheel mechanic (Slice B) was left in place — see that
  ADR's flagged contradiction
- [[2026-05-24-atlas-multi-steward-human-context]] — same-day sibling Observe work
  (Human Context Module 1 → multi-steward roster)
- [[2026-04-30-ogden-ui-components-github-direct]] — the shared
  `@ogden/ui-components` package whose `MaqasidComparisonWheel` the compass uses
- [[maqasid-al-shariah]] — land stewardship under the Environment maqsid
