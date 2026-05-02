---
title: "Prophetic Path live-demo preview on landing page (replaces 3D demo carousel)"
type: decision
date: 2026-05-02
---

# Prophetic Path live-demo preview on landing page

## Context
The MILOS marketing landing (`src/pages/Landing.jsx`) had no representation of the Prophetic Path — the app's signature time-anchored vertical spine of 12-19 prayer/Sunnah nodes. The page instead showed a generic 3D `DemoCarousel` (Dashboard / Pillar Deep Dive / Task Detail) that didn't telegraph what makes MILOS different.

The real `PropheticPath` at `src/components/islamic/PropheticPath.jsx` (~1300 lines) reads from 6 Zustand stores plus `usePrayerTimes`. Mounting it on the marketing page would bloat the bundle, trigger ceremony/threshold side effects on logged-out visitors, and require geolocation/Aladhan for a feature whose preview should look identical to every visitor.

A consult with the Smooth Scroll/Motion notebook (fallback Scholar — UI/UX Scholar 995a59d1 was unreachable) returned five prescriptions: (1) "time-travel sweep" entrance, (2) phone-frame mock, (3) sticky-pinned scroll over ~1.5–2× viewport, (4) breathing pulse on active node, (5) avoid showing all satellite content + literal-time spacing.

## Decision
Build a **dedicated, standalone `PropheticPathPreview`** for the landing page only — not a reuse of the real component. Frozen mock data (12 nodes Fajr→Tahajjud), CSS-only phone shell, scroll-progress hook driving the default active marker. Replace the 3D `DemoCarousel` section entirely; delete the now-orphaned slide content components and DEMO_SLIDES constant.

Selection model is **click-sticky**: clicking a node selects it and it stays selected until another node is clicked. Scroll-driven active marker remains the default until the visitor commits to a selection (`selectedIdx ?? scrollIdx`). Hover does **not** change the active node — it would conflict with sticky selection and create flicker on touch devices.

## Files Changed
- **New**: [src/components/landing/PropheticPathPreview.jsx](src/components/landing/PropheticPathPreview.jsx), [src/components/landing/PropheticPathPreview.css](src/components/landing/PropheticPathPreview.css).
- **Edited**: [src/pages/Landing.jsx](src/pages/Landing.jsx) — removed `DemoCarousel` section + 3 slide content components + `TASK_CHECKS` + `DEMO_SLIDES` + `DASHBOARD_CHIPS` (all now-orphaned). Dropped `useEffect` from imports. Inserted new sticky `<section className="prophetic-preview-section" id="prophetic-path">`.
- **Edited**: [src/styles/landing.css](src/styles/landing.css) — added section + sticky grid styles, mobile single-column fallback under 768px.

## Verification
`npm run lint` (ESLint + grounding-strict + audit:inline-refs) clean, `npm test` 56/56, browser preview confirmed: 12 nodes render in phone frame, click-sticky selection works (clicked Asr → stays Asr through hover events; clicked Witr → switches), satellite card cross-fades, no console errors. Reduced-motion media query disables breathing pulse and entrance sweep.

The 3D carousel section (`carousel-section #demo`) is gone; the only remaining usage of `PillarMockup` is at line 582 (active pillar features), which retains `PILLAR_MOCK_TASKS` and `MOCK_COLS`.
