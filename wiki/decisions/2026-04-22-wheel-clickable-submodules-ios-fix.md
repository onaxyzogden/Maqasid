---
title: "Wheel segments become buttons; Mithaq paused; iOS Safari icon fix"
type: decision
date: 2026-04-22
status: accepted
tags: [maqasid-comparison-wheel, faith, navigation, accessibility, ios-safari, foreignObject, crossfade]
---

# Round 5.5 — Wheel as navigation surface + Safari reliability

## Context

Round 5 (earlier today) shipped Mithaq Activation + Nur Aura. Live testing surfaced four issues that needed addressing before continuing to Round 6:

1. **Press-and-hold ritual felt premature.** Disabling Mithaq per-product-decision until the ritual UX is re-validated; infrastructure kept in place.
2. **Hover bloom killed icon legibility.** The near-white icon against the near-white `brightAura` bloom had almost no contrast, and a stacked `drop-shadow()` filter on the `<foreignObject>` raster-boxed the icon (visible square artifact on Chrome).
3. **Wheel was passive.** Hovering the outer icon band did nothing; clicking anywhere on the wheel did nothing. Users expected each pillar sector to be a link to its submodule page.
4. **iOS Safari scattered the icons.** `<foreignObject>` inside a `<g>` carrying CSS custom properties with fractional x/y from `polar()` mispositioned on iPhone — icons appeared outside the band, some cut off.

## Decision

Ship the four fixes as one cohesive pass. Each composes with Rounds 2–5 without touching their architecture.

### 1. Mithaq paused on Faith overview

- Removed `mithaqDomain: 'faith'` from `FaithLevelOverview.jsx`'s `wheelExtraProps`.
- All Mithaq infrastructure (`useMithaqStore`, `useMithaqHold`, dormant state, ignition choreography, shimmer ring) retained. Flipping the prop back on any page re-enables the ritual instantly.
- `milos-mithaq` localStorage entries from prior activations untouched.

### 2. Hover contrast inversion

- Reduced hover aura opacity 0.75 → 0.5, scale 1.6 → 1.55 so the bloom is present but not saturating.
- **On hover, icon flips to dark** (`color: #0c1a20`) instead of carrying a bright drop-shadow glow — dark-on-bright-gold has high perceptual contrast. `filter: none` removes the stacked drop-shadow that was producing the Chrome `foreignObject` bounding-box square.
- Steady-state lit (100% complete) still uses the bright-gold drop-shadow; that pairs with a far weaker background glow so the icon stays legible.
- Lucide icons inherit `color` via `currentColor`, so the tone swap works uniformly.

### 3. Outer band + sector as buttons

- Outer band `<path>` (`.mcw-band`) lost `pointerEvents="none"` and gained `onMouseEnter/Leave/Move/Click/KeyDown` handlers identical to the inner sector. Both surfaces feed the same `hovered` state, so needle, dimming, wisdom-tooltip, next-action card, and LevelNavigator sync already work without any additional wiring.
- `LevelOverviewPage` now passes `p.route` through to `segments` so the wheel can navigate. Pillars without a route (other Maqasid) silently no-op.
- `useNavigate()` from `react-router-dom`; click or Enter/Space on any sector/band → navigate to `seg.route` (e.g. `/app/faith-shahada`).
- ARIA: `role="button"`, `tabIndex={0}`, aria-label augmented with "open submodule" when a route is present. Cursor switches between `pointer` and `default` based on route presence.

### 4. Cursor-handoff crossfade

- Added a 90ms `setTimeout`-based leave-debounce (`leaveTimerRef`). `handleLeave` schedules the hover clear; `handleEnter` cancels any pending clear. Moving cursor sector-to-sector no longer briefly blanks `hovered` to null, which used to collapse and re-inflate the needle/card.
- **Fixed the "no fade" bug.** The focused-dimming rule declared its `transition` *inside* the `:has()` block. CSS transitions only fire while a transition-rule matches, so leaving the match-set snapped opacity back to default. Moved `transition: opacity 360ms, filter 360ms` onto the base selectors (`.mcw-seg-bg`, `.mcw-seg-empty`, `.mcw-seg-pattern`, `.mcw-seg-complete`, `.mcw-band`) so tween fires in **both** directions.
- Extended the focused-dimming match to include `.mcw-band.is-hovered` as a trigger alongside `.mcw-sector.is-hovered` so either surface dims peer sectors symmetrically.

### 5. iOS Safari icon-position fix

- Root cause: iOS WebKit mispositions `<foreignObject>` when its parent `<g>` carries CSS custom properties AND the x/y attributes are non-integer floats (our case — `ix, iy` come from `polar(163, midDeg)`).
- **Replaced `<foreignObject>` + `<div class="mcw-icon-wrap">` with nested SVG.** Each Lucide icon now renders as:
  ```jsx
  <g transform={`translate(${ix - 9} ${iy - 9})`}>
    <g className="mcw-icon-wrap">
      <Icon size={18} strokeWidth={1.8} />
    </g>
  </g>
  ```
  No HTML inside SVG means no WebKit foreignObject quirks.
- `.mcw-icon-wrap` CSS adapted for SVG geometry: dropped `display: flex`, width/height; added `transform-origin: 9px 9px; transform-box: fill-box` so hover scale and ignition keyframes still scale from the icon's center.

## Consequences

### Enables
- Every pillar on the wheel is now a first-class navigation target — keyboard-accessible, screen-reader-friendly, mouse+touch.
- Hovering outer band = hovering inner sector = hovering LevelNavigator chip. Three surfaces, one unified state.
- Sector-to-sector handoff is continuous: spotlight sweeps, doesn't flicker.
- iOS Safari parity with desktop — icons render at correct polar positions.
- No more `foreignObject` dependency means future style tweaks (animations, filters) behave uniformly across browsers.

### Constrains
- Wheel becomes a nav surface, which means ceremony-of-observation is slightly diminished on Faith (a click-through is now one tap away). Acceptable trade-off; the LevelNavigator already had the same affordance, so the wheel was arguably behind parity.
- Transition duration bumped to 360ms for the focused-dim — slightly slower overall feel. Deliberate: the prior 240ms was too clipped once the debounce started holding state between sectors.

### Deferred
- Re-enable Mithaq once the press-and-hold UX is re-validated against real usage patterns (Round 6 candidate).
- Touch-device hover states — currently mouse-only. Tap-to-preview + second-tap-to-navigate pattern possible but not implemented.
- Round 6 backlog unchanged: Muraqabah Commitment Pips, Sacred Pattern Masking, icon morphing, Fajr integration, streak ring, activation sound.

## Files Changed

**Modified:**
- `src/components/faith/MaqasidComparisonWheel.jsx` — nested-SVG icons, click/keydown handlers on sector+band, useNavigate, leave-debounce timer
- `src/components/faith/MaqasidComparisonWheel.css` — base-selector transitions, hover contrast inversion, band as interactive peer, SVG-geometry adjustments for `.mcw-icon-wrap`
- `src/pages/faith/FaithLevelOverview.jsx` — removed `mithaqDomain: 'faith'`
- `src/pages/shared/LevelOverviewPage.jsx` — pass `p.route` through to `segments`

## Links
- [[milos]]
- [[2026-04-22-mithaq-activation-nur-aura]] — Round 5 ADR (paused by this decision)
- [[2026-04-21-faith-dashboard-wheel-promotion]]
