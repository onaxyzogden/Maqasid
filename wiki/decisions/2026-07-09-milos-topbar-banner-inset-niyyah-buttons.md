---
title: "MILOS — Verse banner inset past the right chrome + equal-height rounded Niyyah footer buttons"
type: decision
date: 2026-07-09
status: accepted
tags: [ui, layout, css, topbar, niyyah, design-tokens, app-shell]
superseded_by: null
---

# MILOS — Verse banner inset past the right chrome + equal-height rounded Niyyah footer buttons

## Context

Two small app-shell UI-polish fixes requested by the operator against the running preview:

1. **Niyyah footer buttons** — the daily [NiyyahAct](src/components/islamic/NiyyahAct.jsx) overlay's footer holds a primary `.niyyah-confirm` ("Bismillah — Begin") and a secondary `.niyyah-skip` ("Skip"). They rendered at **unequal heights**, and the confirm button had **square corners**. Operator: *"these buttons should be the same height with rounded corners."*
2. **Verse banner overlapping the right rail** — the TopBar ayah banner (`.topbar-verse-banner`, absolutely positioned under the header) extended to the **viewport's right edge** whenever the Islamic panel was collapsed, running over the 28px right-edge column (`.col-edge`) and the 64px Islamic rail (`.il-rail`). Operator (with those three elements selected): *"topbar banner should not be overlapping sidebar."*

## Decision

**Niyyah buttons** — [NiyyahAct.css](src/components/islamic/NiyyahAct.css):
- `.niyyah-footer` `align-items: center` → **`stretch`** so both buttons take the tallest sibling's height (equal height).
- `.niyyah-skip` gains `display:flex; align-items:center; justify-content:center;` to re-center its label now that it stretches vertically.
- Both `.niyyah-confirm` and `.niyyah-skip` `border-radius: var(--radius-md)` → **`var(--radius)`**.

**Load-bearing gotcha:** `--radius-md` is **undefined repo-wide** (grep for `--radius-md:` across `src/` returns **0** definitions). An undefined custom property with no fallback makes the whole `border-radius` declaration *invalid*, so it fell back to the property's initial value **`0`** — that is why the confirm button looked square. `--radius` (10px) is the actual "medium" corner token; the token swap is what delivers the requested "rounded corners." (23 other square-corner uses of `var(--radius-md)` remain across ~11 files — **deferred**: define `--radius-md: 10px` in `src/styles/tokens.css` to fix them in one place, operator-gated.)

**Verse banner** — [TopBar.jsx](src/components/layout/TopBar.jsx):
- The banner's inline `right` changed from `islamicPanelOpen && !mobile ? \`${islamicPanelWidthPx + 28}px\` : 0` to **`mobile ? 0 : \`${28 + (islamicPanelOpen ? islamicPanelWidthPx : 64)}px\``**.
- Why: the banner is a child of the `grid-column: 2 / -1` topbar and is `position:absolute; top:100%; left:var(--edge-w); right:0`. When the panel was **closed**, the old `right:0` let it run to the viewport edge, over the right chrome. The new value **always insets past the right chrome** = 28px right-edge column + (panel open ? panel width : 64px rail), **mirroring the existing `left: var(--edge-w)` inset** so the banner aligns to the main column on both sides. Mobile has no right column, so it keeps `right:0`.

## Amanah

Neutral — presentational shell CSS + one layout inline-style; no capital / sale / CSA / CSRA / salam / yield-share surface.

## Verified

In the implementing session (2026-07-04) both fixes were live-verified — the two Niyyah footer buttons computed to **equal 42px height + 10px border-radius**, and the verse banner's right edge aligned to the main column with **no overlap** of the right edge/rail — each confirmed by computed-style inspection **and** a `preview_screenshot` (the screenshot channel was responsive that session, not the usual [[project-screenshot-hang]]). On the rebuilt branch: `npm run lint` green (grounding-strict + inline-refs ratchets 0), `npm test` **77/77**, `npm run build` green.

## Delivery & reconciliation

This branch originally also carried a PTE-CTA wiring commit + a draft PTE ADR. Both were **superseded** mid-flight: `origin/main` independently landed **functionally-identical** wiring for all 7 sibling modules **plus** Faith via PR #20 — see [[2026-07-03-milos-pte-cta-wiring]]. A `git diff` of my version against `origin/main`'s confirmed the `route:` literals and `onClick={() => navigate(route, { viewTransition: true })}` are identical (only whitespace/formatting differ). So the duplicate commit and its draft ADR were **dropped**, and the branch was rebuilt on current `origin/main` carrying **only** these two net-new UI fixes (commit `d720df9` on `claude/quizzical-volhard-3e42ca`). PR [#25](https://github.com/onaxyzogden/Maqasid/pull/25) updated by force-push.
