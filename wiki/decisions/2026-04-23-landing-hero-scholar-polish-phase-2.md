---
title: "Landing hero — scholar-led polish phase 2"
type: decision
date: 2026-04-23
tags: [landing, hero, bento, maqasid-pulse, break-the-box, progressive-disclosure, scholar-consult]
supersedes: []
superseded_by: []
---

# Landing hero — scholar-led polish phase 2

Second pass of the UI/UX Design Scholar NotebookLM (`995a59d1-...`) blueprint. Phase 1 ([[2026-04-23-landing-hero-scholar-polish]]) delivered Sacred Serif typography, soul-language copy, Qalb-intent CTA press, and the Ummah-signal marquee. This phase executes items 4 ("Breaking the Box") and 5 (Bento pillar grid with Mastery Rings + progressive disclosure).

## Plan adjustment vs. original scholar brief

The scholar recommended a two-column hero with the Faith ring overlapping the edge. I collapsed that to single-column centered + an **absolute-positioned** ring in the upper-right corner of `.hero-section`. Reason: the editorial serif H1 works better at full width (max-width 860px, centered); a hard two-column split would crowd the headline. The ring still "breaks the box" by clipping past the section's right padding — scholar's intent preserved, visual balance kept.

## Changes

### 1. Break-the-box Faith ring
- Added `.hero-ring` absolutely positioned at `top: calc(var(--nav-h) + var(--space-8)); right: -120px; width: 360px; height: 360px;` — the `right: -120px` is the "box break."
- Inline SVG with two concentric circles (r=160):
  - `.hr-track` — low-opacity gold base stroke (`rgba(200,169,110,0.18)`, 2px).
  - `.hr-shimmer` — 3px stroke painted with a `<linearGradient id="hrShimmerGrad">` (transparent → gold → transparent, 3 stops) and a `drop-shadow` filter for ambient glow.
- Inner content (`.hero-ring-label`): large thin Compass Lucide icon (size 40, strokeWidth 1.25), "Faith" in Cormorant Garamond, Arabic root `حفظ الدين` below.
- Guardrails:
  - `.hero-section { overflow: hidden; position: relative; }` prevents the ring from creating a horizontal scrollbar.
  - `@media (max-width: 1024px) { .hero-ring { display: none; } }` hides it on tablet/mobile — the serif H1 already carries the hero there.
  - All hero children explicitly `position: relative; z-index: 1;` so they stack above the ring (which sits at `z-index: 0`).

### 2. Maqasid Pulse (4s shimmer along circular stroke)
- `@keyframes maqasidPulse { 0% { stroke-dashoffset: 1005; } 100% { stroke-dashoffset: 0; } }` — 4s linear infinite.
- The shimmer circle has `strokeDasharray="250 1005"` — a 250-unit gold dash followed by a 1005-unit gap, so the gradient-painted dash traverses the full circumference as the offset animates through one full 1005-unit period.
- `transform: rotate(-90 180 180)` on the circle anchors the dash start to 12 o'clock.
- Respects `prefers-reduced-motion`.

### 3. Bento pillar grid replacing flat chip row
- `.hero-modules` + `.hero-module-chip` classes replaced with `.hero-bento` + `.hero-bento-card`.
- Grid: `repeat(4, 1fr)` at ≥768px, `repeat(2, 1fr)` below. All 8 `MAQASID_PILLARS` render (Faith, Life, Intellect, Family, Wealth, Environment, Ummah, Moontrance).
- Per-card structure:
  - `.hero-bento-head` — icon tile (background `color-mix(... accent 12%)`) + name (0.95rem, 600) + Arabic root italic below + **Mastery Ring** on the far right.
  - `.hero-bento-desc` — description from `PILLAR_FEATURES[pillar.id].description`.
- CSS custom property `--card-accent` set inline per card from `pillar.accentColor` so hover border / box-shadow / ring fill can all reference it.

### 4. Mastery Ring (0% default)
- 28×28 SVG with two circles (r=12).
- `.hero-bento-ring-track` — `var(--border)` stroke.
- `.hero-bento-ring-fill` — `var(--card-accent)` stroke, `strokeDasharray={circ}` / `strokeDashoffset={circ}` where `circ = 2 * π * 12`. Dashoffset equal to circumference renders 0% progress.
- Rotated via `transform: rotate(-90deg)` at the SVG level so fill, when populated, starts at 12 o'clock.
- `stroke-dashoffset` transitions over 600ms — forward-compatible with wiring the landing page to real user data later.

### 5. Progressive disclosure
- `.hero-bento-desc` default state: `max-height: 0; opacity: 0; overflow: hidden; margin-top: 0;`.
- On `.hero-bento-card:hover` **OR `:focus-within`**: `max-height: 140px; opacity: 1; margin-top: var(--space-2)`. Transitions 300ms (max-height, margin-top) and 200ms (opacity).
- `tabIndex={0}` on each card ensures keyboard users hit `:focus-within` and get the same disclosure — scholar's rule adapted for accessibility.
- `color-mix(in srgb, var(--card-accent) 40%, transparent)` hover border + ambient drop-shadow uses the pillar's own accent, so each card glows in its canonical tone.

## Verification

- `preview_eval` confirmed: ring present (`overflowsRight: true`, `docWidth ≤ vw` so no horizontal scroll), shimmer animation `maqasidPulse` / 4s, 8 bento cards, 8 Mastery Rings, 0 legacy chips.
- Focus test: `.hero-bento-card` → `.focus()` → after 400ms, `max-height: 140px`, `opacity: 1` — progressive disclosure confirmed on keyboard path.
- Mobile resize (375×812): ring `display: none`, bento collapses to 2 cols, no horizontal scroll.
- Screenshots confirm: gold ring visibly breaking the right edge with Compass icon + label; 8-card bento with per-pillar icon tints and 0% Mastery Rings; focused Faith card expands with gold outline, drop-shadow, and readable description.
- No console errors.

## Deferred

- **Real Mastery Ring progress** — currently hardcoded to 0% (this is a marketing surface, not an app view). When wired, set `strokeDashoffset` to `circ * (1 - progress)`.
- **Cormorant Garamond webfont load** — still relying on system fallback. Adding `@import` in `landing.css` or a `<link>` in `index.html` is next-session territory.
- **Warm dark background** (`#1a1611`) — theme-level, not hero-scoped.
- **Touch-device description** — `:hover` doesn't fire on touch; `:focus-within` catches tap-focus on most mobile browsers but on pure touch without keyboard there's no disclosure path. Acceptable for phase 2; revisit with a `tap-to-expand` toggle if user flags it.
- **Scholar items below the hero** — features section, carousel, FAQ haven't been audited yet.

## Files touched

- `src/pages/Landing.jsx` — added `.hero-ring` SVG block with Compass icon + Arabic label; replaced `.hero-modules` chip map with `.hero-bento` card map (icon + name + Arabic root + Mastery Ring SVG + description).
- `src/styles/landing.css` — ring positioning, shimmer gradient + `maqasidPulse` keyframes, reduced-motion guard, stacking order, bento grid layout, card hover/focus-within states, Mastery Ring circles, progressive-disclosure transitions, mobile column collapse.

## Why

Phase 1 lifted the hero's tone (typography + copy + CTA + trust ribbon) but the area below the CTA was still a flat, undifferentiated chip row — the "value-prop grid" that the scholar flagged as the make-or-break 5-second pillar-comprehension test. A bento grid with per-pillar colors, Mastery Rings, and reveal-on-intent descriptions gives a user a clear visual taxonomy of the product's seven maqasid surface + a visible primitive ("this ring fills as you grow") that promises progression without spelling it out. The break-the-box ring adds one piece of bespoke craft that separates the hero from a template-rendered MVP — small SVG cost, zero new dependencies.
