# ADR — Re-skin the live Plan strata page with the Spine layout + store-backed Protocol mode

**Date:** 2026-05-31
**Project:** [[olos]] (atlas)
**Status:** accepted
**Branch:** `feat/atlas-permaculture`
**Commits:** Phase 0 `61085562`, Phase 1 `4ac7868e`, Phase 2 `632252e6` (all unpushed at session close — push only when asked)

## Context

The production Plan strata page (`apps/web/src/v3/plan/strata/PlanStratumShell.tsx`,
mounted at `/v3/project/$projectId/plan[/stratum/$stratumId[/objective/$objectiveId]]`)
rendered three regions (`StratumSpine | ObjectiveColumn | ObjectiveDetailPanel`) in a
plain CSS-module layout. The gallery prototype at `apps/web/src/v3/plan/spine/`
(gallery-only, `/v3/components`) had a polished dark/gold **3-column spine layout**
(SVG stratum circles, gold selection, a Design⇄Protocol ModeToggle, a Protocol Layer
panel) over a self-contained `tokens.ts` + `spine-theme.css`. The operator wanted the
**live page to adopt the prototype's layout**.

## Decisions

1. **Strategy = RE-SKIN IN PLACE.** Keep every bit of `PlanStratumShell`'s real data
   wiring, route-driven selection, and its **12 production features**; only restructure
   the JSX containers into the prototype's dark 3-column shell and restyle with the spine
   visual language. Nothing lost. (Confirmed `PlanStratumState` ≡ prototype
   `SpineStratumStatus`, so no enum-mapping risk in the circle adapter.)

2. **Protocol mode = INCLUDED, backed by REAL production data** — the live
   `src/store/protocolStore.ts` + `@ogden/shared` `templatesForEnterprises`, **not** the
   prototype's `mockProtocols.ts`/fabricated `APPROVED_TIER_OUTPUTS`.

3. **Enterprise derivation** — new pure `enterprisesForProjectTypes(primaryTypeId,
   secondaryTypeIds): EnterpriseId[]` in `@ogden/shared`. v1: livestock-implying types
   (`silvopasture`, `regenerative_farm`, `homestead`) → `['sheep_beef']`; else `[]`.
   **Poultry deferred** (no project-type signal; would need placed-entity detection), so
   the poultry-only Silvopasture Pest Diversion template is always hidden here today.

4. **Protocol grouping** — by each template's real `tierAuthored` string (today all
   standard templates are authored "Stratum 6 — Integration", so one group). No invented
   per-stratum protocols.

5. **Mode persistence** — route search param `?planMode=protocol`, consistent with the
   existing `$stratumId`/`$objectiveId`/`highlightIncomplete` route-as-state pattern.
   Extended `PlanSearch` + `validatePlanSearch` on all three plan-shell routes.

6. **§10.1 trigger** — no real "approve objective → instantiate protocols" trigger exists
   in production yet, so Protocol mode ships **read-only** v1: it reflects whatever
   `protocolStore` lifecycle state exists (active/triggered/suspended; else "Standard
   template"). Confirmation flow + auto-instantiation **deferred**.

7. **Theme scoping** — the layout is wrapped in `<div className="olos-spine-root">`;
   `spine-theme.css` vars + resets are class-scoped, so the dark/gold theme never leaks to
   sibling surfaces and the `data-theme` light variant resolves.

## Implementation

- **Shared (Phase 0):** `packages/shared/src/constants/protocol/projectEnterprises.ts`
  + 9-test suite; barrel export. `61085562`.
- **Re-skin (Phase 1):** new `strata/StratumSpineCircle.tsx` (SVG copied verbatim from
  `spine/StratumCircle.tsx`, real `PlanStratum`/`PlanStratumState`, click always fires so
  the locked-popover still works); rewired `StratumSpine.tsx`; rewrote `PlanStratumShell`
  render into the `.olos-spine-root` dark 3-column flex shell; re-skinned
  `ObjectiveColumn`/`ObjectiveDetailPanel` **containers/headers only** (all 12-feature
  children copied verbatim; modals kept at shell root). `4ac7868e`.
- **Protocol mode (Phase 2):** extended route `PlanSearch`/`validatePlanSearch` with
  `planMode?: 'protocol'`; imported the prototype's `ModeToggle` into the spine header
  (writes `?planMode` via `navigate({to:'.', search})`, `to:'.'` preserving stratum/objective
  segments); new `strata/ProtocolLayerPanel.tsx` (store-backed read-only right pane:
  `templatesForEnterprises(enterprisesForProjectTypes(...))`, grouped by `tierAuthored`,
  status overlaid from `protocolStore.records`, bracket tokens verbatim via `outputs={{}}`);
  6-test suite. Right pane switches to the panel when `planMode==='protocol'`. `632252e6`.

**Zustand v5 hazard avoided** in the panel: select the stable `records` array and derive
the per-project status map in `useMemo` — never an inline `.filter()`-returning selector
(the infinite-loop class documented in `protocolStore.useTriggeredProtocols`).

## Reuse, not fork

`tokens.ts`, `spine-theme.css`, `ModeToggle.tsx`, `AutoFilledCondition.tsx`,
`protocolTypeStyle.tsx` (`TypeBadge`) are imported directly from `spine/`. The spine
prototype (`PlanSpinePrototype.tsx`, `mockData.ts`, `mockProtocols.ts`,
`DesignDetailPanel.tsx`, `ProtocolConfirmationFlow.tsx`, `ProtocolModePanel.tsx`) was
**not mutated or deleted** — it stays the gallery artifact ("no deletion in revamps").
Legacy `StratumRow.tsx`/`*.module.css` orphaned on disk, not deleted.

## Verification

- Shared + web `tsc --noEmit` exit 0 (web needs `--max-old-space-size=8192`).
- Strata vitest **42/42** (incl. new 6-test ProtocolLayerPanel); shared
  `projectEnterprises` 9 + `standardTemplates` green.
- DOM-exercised the live route on `:5200` (`preview_screenshot` unavailable on this
  Windows setup — capture hang + MapLibre render loop — so DOM exercise per
  `apps/web/CONTEXT.md`): 3-column shell + 7 SVG circles with state colours; stratum→
  objective→detail mount chain; DecisionChecklist toggle wiring; ModeToggle flips
  `?planMode=protocol`; 9 `sheep_beef` templates render with poultry hidden; one real
  `tierAuthored` group; seeded `protocolStore` active/triggered records reflected as
  Active/Triggered while untouched templates read "Standard template"; round-trips back
  to Design (param removed, panel unmounts).

## Deferred (explicit)

- Production §10.1 confirmation flow + objective-approval auto-instantiation
  (`ProtocolConfirmationFlow`, Edit-First §4.1 token form).
- Poultry enterprise derivation (needs placed-entity detection).
- Real approved-tier-output token values (placeholders render verbatim).
- Promoting per-stratum sample protocols into `@ogden/shared`.

See [[olos]] · session log [[log 2026-05-31]].
