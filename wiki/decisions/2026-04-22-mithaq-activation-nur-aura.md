---
title: "Mithaq Activation + Nur Aura — Round 5 Wheel Upgrade"
type: decision
date: 2026-04-22
status: accepted
tags: [maqasid-comparison-wheel, faith, mithaq, niyyah, svg, oklch, accessibility, zustand]
---

# Round 5 — Wheel becomes an active covenant instrument

## Context

Rounds 1–4 upgraded the Maqasid Comparison Wheel along the axis of *information clarity* (OKLCH palette, compass needle, wisdom tooltip, pathfinding next-action card, inked-stroke milestones, cross-component hover sync with LevelNavigator, courageous label pruning, icon parity). A fifth consultation with the Modern UI/UX Design Scholar (notebook `995a59d1`) diagnosed two remaining gaps:

1. **"Floating Icon Syndrome"** — after Round 4 pruned the curved textPath pillar labels, the outer band (r=142→184) read as empty color with a lonely 18px icon. The band was not earning its screen real estate.
2. **Passive display problem** — the wheel was always "on," diluting the ceremony of engagement. A dashboard should not demand ritual to open, but a *covenant instrument* should — the concept of **mithāq** (covenant, Qur'an 5:7) only carries weight if renewal is an act, not an ambient glance.

Round 5 addresses both, and their treatments compose: Mithaq Activation is the ritual; Nur Aura is the climax.

## Decision

Two paired upgrades, shipped together. Faith pages opt in via `mithaqDomain="faith"`; all other pillars inherit aura-on-hover with no dormancy.

### Nur Aura + Icon Bloom

- `wheelColor.js` gains a fifth derived field: `brightAura` at OKLCH L=0.78 (hue + chroma preserved from `levelColor`). Gold, teal, and purple glow at equal perceived lightness.
- Each pillar icon is wrapped in a `.mcw-pillar-vessel` `<g>` containing a radial-gradient `<circle>` + the foreignObject icon. The aura uses `fill="url(#mcw-aura-grad)"` — a single radial gradient whose stops use the computed `brightAura` hex.
- **Hover bloom:** aura opacity 0 → 0.75, `transform: scale(1.6)`. Icon scales 1.22× with drop-shadow glow in `brightAura`.
- **Steady-state lit (100% complete):** aura opacity 0.55, scale 1.15, persistent icon drop-shadow — replaces the Round 2 halo-pulse as the completion signal.
- **Focused-dimming parity:** `:has(.mcw-pillar-vessel.is-hovered) .mcw-pillar-vessel:not(.is-hovered) .mcw-icon-wrap { opacity: 0.3; }` extends the Round 3 focused-dimming to the new aura layer.

### Mithaq Activation Ritual

- **New `useMithaqStore` (`src/store/mithaqStore.js`)** — Zustand slice with `zustand/middleware` `persist`. Shape: `{ activations: { [domain]: { activatedAt: ISOString } } }`. `isActivated(domain)` returns true only if the stored timestamp is before the next 5am local strictly after activation (Fajr proxy). Persisted under localStorage key `milos-mithaq`.
- **New `useMithaqHold` hook (`src/hooks/useMithaqHold.js`)** — RAF-driven press-and-hold state machine:
  - `idle → holding (progress 0→1 over 1500ms) → activated` (fires `onActivate`, resets progress to 0)
  - `holding → release early → draining (progress → 0, ease-in over 280ms) → idle`
  - `holding → resume from current progress` if re-pressed mid-drain
  - Handlers bind to mouse, touch, and Space/Enter keyboard; Escape aborts; blur aborts. Ref-based tick functions avoid react-hooks self-referencing-useCallback warnings.
- **Wheel integration** — new prop `mithaqDomain`. When set **and** not activated, the wheel enters **dormant state**:
  - Sectors desaturated (`opacity: 0.4; filter: saturate(0.5)`), empty-dashes dimmed
  - Needle, next-action card, and wisdom tooltip are **suppressed** (`!isDormant` gate)
  - Hub group becomes the press target (`role="button"`, `tabIndex={0}`, aria-label)
  - Dormant hub shows the word "FAITH" in muted grey + `Press & hold to renew` hint line (Amiri italic, 9px, opacity-pulsing)
  - **Shimmer ring:** a `<circle>` at `r = HUB_R + 4` with `pathLength="1"`, `strokeDashoffset={1 - mithaqProgress}`, `transform={rotate(-90)}` — draws clockwise as the user presses. No CSS transition on the offset; the hook's RAF tween is the single source of truth, so drain and hold don't race.
  - Pressed-state tactile feedback: `.mcw-hub-group.is-holding { transform: scale(0.975); }`
- **Ignition choreography** — triggered by the `onActivate` event handler (not by `useEffect` watching `isLit`), which avoids setState-in-effect and also means reloading the page while already activated does **not** replay the animation.
  - 80ms silence after the ring completes
  - `.mcw-svg--igniting` triggers keyframes on each `.mcw-pillar-vessel` with `animation-delay: calc(80ms + var(--index) * 50ms)`
  - Aura: opacity 0 → 0.9 → 0.55, scale 0.6 → 1.35 → 1.15 (spring ease)
  - Icon: scale 0.85 → 1.3 → 1 with drop-shadow bloom
  - `<div role="status" aria-live="polite">` announces "FAITH covenant renewed." for screen readers
- **Accessibility:** keyboard press-and-hold via Space/Enter, `:focus-visible` ring on hub, `prefers-reduced-motion` disables every aura, bloom, ignite, and hint-pulse animation.

## Consequences

### Enables
- The wheel now **demands** niyyah to reveal the day's insights — not as friction, but as ceremony. Observing the pillars becomes an act.
- Daily engagement is measurable via `milos-mithaq` localStorage; future streak rings, Fajr-based reset, and cross-Maqasid covenant tracking have a clean foundation.
- The outer band is no longer empty real estate — each sector is visibly a *vessel* (dormant = empty; lit = filled with light).
- All seven Maqasid will eventually get Mithaq via per-domain keys (`'faith'`, `'life'`, `'intellect'`, ...). Each Maqasid activates independently; *tajdīd al-ʿahd* is holistic per-hemisphere, not per-level.
- OKLCH `brightAura` is the fifth palette field — future aura-based signifiers (e.g., momentum ghost arc, commitment pips) inherit perceptual coherence for free.

### Constrains
- Faith pages now require a daily 1.5s press-and-hold before the wheel shows anything beyond a hint. Acceptable cost; scholar explicitly endorsed the "while-pressing intent" pattern over ambient always-on display.
- Animation budget grew: ignition adds ~620ms of choreography. Gated behind `prefers-reduced-motion`; not a performance concern (pure CSS transforms + opacity).
- localStorage schema now includes `milos-mithaq`; if the user clears storage, they re-renew. Acceptable; the covenant is a daily act, not a long-term asset.

### Deferred
- **Muraqabah Commitment Pips** — small radial dots on the inner band edge indicating daily sub-units (e.g., 5 pips for Salah's 5 prayers). Scholar ranked #2; held for Round 6.
- **Sacred Pattern Masking** — Girih / 8-point-star SVG pattern that fades in on hover. Held for Round 6.
- **Status-based icon morphing** — Moon crescent → full for Siyam; dual-crescent for Hajj. Per-pillar craft cost high; ship piecemeal.
- **Fajr prayer-time integration** — use the user's actual local Fajr time instead of the 5am proxy. Needs location signal from elsewhere in MILOS.
- **Covenant streak ring** — small ring around hub tracking consecutive daily activations. Blocked on historical persistence (same block as ghost-arc from Round 2).
- **Sound on activation** — subtle glass-tap or ney-flute note. Belongs in a separate audio-design sprint.

## Files Changed

**Created:**
- `src/store/mithaqStore.js`
- `src/hooks/useMithaqHold.js`

**Modified:**
- `src/components/faith/MaqasidComparisonWheel.jsx` — vessel groups, aura gradient, Mithaq integration, ignition state, hub press target, shimmer ring, dormant hint, aria-live announcer
- `src/components/faith/MaqasidComparisonWheel.css` — aura + bloom + lit styles, dormant desaturation, shimmer ring, ignition keyframes, hub-group press states, `:focus-visible` ring, aria-live sr-only, extended reduced-motion fallback
- `src/components/faith/wheelColor.js` — `brightAura` field at OKLCH L=0.78
- `src/pages/faith/FaithLevelOverview.jsx` — pass `mithaqDomain: 'faith'` through `wheelExtraProps`

Build: 2703 → **2706 modules** (+store + hook + persist middleware), lint clean, no new warnings beyond the pre-existing bundle-size one.

## Links
- [[milos]]
- [[2026-04-21-faith-dashboard-wheel-promotion]] — promotion of the wheel onto Faith overview
- [[2026-04-20-dashboard-wheel-test-prototype]] — the original prototype
- [[maqasid-al-shariah]]
- [[covenant-architecture]]
