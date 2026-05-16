---
title: "Atlas livestock land-fit tooltip — portal out of clipping container + keyboard a11y"
type: decision
date: 2026-05-16
status: accepted
tags: [atlas, olos, ui, tooltip, portal, accessibility, overflow, bug]
---

# Atlas livestock land-fit tooltip — portal out of clipping container + keyboard a11y

## Context

In [[olos]] the **Livestock land-fit matrix**
(`apps/web/src/features/livestock/LivestockLandFitCard.tsx`) shows a per-zone ×
per-species grazing-suitability grid. Hovering a cell is meant to reveal a
rationale popover (e.g. *zone category "spiritual" is incompatible with
livestock* + a reasons list). A user-supplied screenshot confirmed the popover
was **cut off at its top edge** for cells in the upper rows.

## Root cause (code-verified, not assumed)

Investigated under `superpowers:systematic-debugging`. `.rationale` was a pure
CSS `:hover` element: `position: absolute; bottom: calc(100% + 4px)`, revealed
by `.fitCell:hover .rationale { display: block }`, anchored to the `.fitCell`
`<td>`. Its nearest scrolling ancestor `.tableWrap` has `overflow-x: auto`
(legitimately — the matrix sets `min-width: 520px` for horizontal scroll). Per
the CSS overflow spec, when one axis is non-`visible` the other computes to
`auto`, so `.tableWrap` also clips **vertically**. A popover that pops *above* a
top-row cell escapes the table's top edge and is chopped — then clipped again
further out by the `ModuleSlideUp` `.body { overflow-y: auto }` and
`.sheet { overflow: hidden }` that wrap the whole module. No CSS-only tweak can
escape these nested clippers while `.tableWrap` keeps the `overflow-x` it needs.

## Decision

Render the tooltip through a **React portal to `document.body`** so it escapes
every clipping ancestor, and position it manually:

- `createPortal(node, document.body)` with an SSR guard
  (`typeof document !== 'undefined'`); single active-tip state (one tooltip is
  ever visible across the whole `zones × 5` matrix — no per-cell state).
- `position: fixed`; coordinates computed from the trigger `<td>`'s
  `getBoundingClientRect()` in a `useLayoutEffect` (measure-then-position;
  `visibility: hidden` until measured to avoid a flash), with **flip
  above/below** by available space and an **8 px viewport clamp** on both axes
  (`TIP_W = 200` mirrors the CSS width; `GAP = 6`).
- A capture-phase `scroll` listener hides the tip (a `fixed` node won't follow
  ancestor scroll); `resize` re-measures from the live anchor. Listeners attach
  only while a tip is active.
- `z-index: var(--z-tooltip, 600)` (design token; the `ModuleSlideUp` scrim is
  z-index 100, and a body-level portal is its own stacking context).

Also made the trigger **keyboard-accessible** (user-approved Option A — closes a
pre-existing a11y gap): `<td tabIndex={0}>` with `onFocus`/`onBlur` mirroring
`onMouseEnter`/`onMouseLeave`, `role="tooltip"` on the portal node, and
`aria-describedby` wiring the focused cell to it. The `<td>` stays a table cell
— deliberately **no** `role="button"` (nothing is activatable; it would mislead
assistive tech). `cursor: help` retained.

Scope held to exactly two files: `LivestockLandFitCard.tsx` (+137/−24) and
`LivestockLandFitCard.module.css` (13 lines).

## Rationale

The portal is the only mechanism that escapes *nested* overflow clippers
without weakening `.tableWrap`'s required horizontal scroll. Manual fixed
positioning with flip + clamp guarantees the popover is fully visible from any
cell (top row, edge columns, scrolled table). A single active-tip descriptor
keeps state O(1) regardless of matrix size. `.rationale`/`.fitCell` have **zero
external dependents** (grep-confirmed — referenced only in these two files), so
replacing the reveal mechanism wholesale carries no blast radius.

## Alternatives Considered

- **CSS-only tweak (e.g. `overflow: visible`, larger offsets)** — rejected:
  cannot escape the nested clippers (`.tableWrap` `overflow-x:auto` forces
  `overflow-y:auto`; the outer `ModuleSlideUp` `.body`/`.sheet` clip again), and
  `.tableWrap` legitimately needs `overflow-x:auto` for the 520 px matrix.
- **Reuse the shared `apps/web/src/components/ui/Tooltip.tsx`** — rejected: it
  is *also* non-portaled, has `white-space: nowrap` (unsuitable for the
  multi-line label × zone + reasons list), no collision/flip logic, and many
  other consumers → wide regression surface, out of this fix's scope.

## Consequences

- The land-fit rationale renders fully visible from any cell, keyboard or
  pointer; one tooltip node in `document.body` at a time.
- The shared `Tooltip.tsx` still carries the **same latent bug class**
  (non-portaled, no collision) for any consumer inside an overflow container.
  Deliberately **not** fixed here (regression surface, content shape mismatch);
  flagged separately for a possible class-wide portal+collision fix later.

## Verification

Live full-stack verification was environmentally blocked (no Docker; API :3001
down; would need Redis + API + auth + a project + the Tier-1/Tier-3 pipeline).
Substituted a temporary **auth-free isolation harness route** that reproduced
the exact worst-case clipping container (`position:fixed; top:0;
overflow:hidden; max-height:360`) with the **real `useZoneStore`** seeded (5
zones incl. a `spiritual` "Prayer Grove" → 0-star "incompatible with
livestock"). Objective proof: the tooltip rendered as a direct `document.body`
child, `position:fixed`, `z-index:600`, fully inside the viewport, escaping the
`overflow:hidden` clipper; successful `preview_screenshot`; keyboard Tab path
shows the same positioned/clamped tooltip; left/right column clamp checks pass;
console clean. **The harness was fully removed afterward** — the shipped diff is
exactly the two livestock files; no harness/route/store-seed code shipped.

## Connections

- [[olos]] — affected product (Plan-stage Livestock land-fit module)
- [[chart-tooltips]] — sibling "portal-rendered tooltip" pattern (MILOS); the
  same portal+collision discipline applied per-product, not yet shared
- [[2026-05-16-atlas-pasture-regeneration]] — same session's livestock work area
