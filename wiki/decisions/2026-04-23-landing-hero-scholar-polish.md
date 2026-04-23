---
title: "Landing hero — scholar-led polish phase 1"
type: decision
date: 2026-04-23
tags: [landing, hero, typography, cta, motion, scholar-consult]
supersedes: []
superseded_by: []
---

# Landing hero — scholar-led polish phase 1

Consulted UI/UX Design Scholar NotebookLM (`995a59d1-...`, "Modern UI/UX Design Scholar") on best practices for a values-driven hero. Applied items 1–3 of the scholar's six-part blueprint to `src/pages/Landing.jsx` + `src/styles/landing.css`. Items 4 (Breaking-the-box pillar + Maqasid Pulse) and 5 (Bento pillar grid with mastery rings + progressive disclosure) are queued as phase 2.

## Changes

### 1. Sacred Serif typography
- `.hero-title` font stack swapped from inherited sans to `'Cormorant Garamond', 'EB Garamond', Georgia, 'Times New Roman', serif`.
- Weight 700 → 300; letter-spacing tightened to `-0.02em`; line-height 1.1 → 1.15; size bumped to `clamp(2.75rem, 6.5vw, 4.25rem)`.
- Rationale: large thin editorial serif reads as contemplative / authoritative without the loudness of bold sans; echoes FLO redesign's editorial-serif direction already deployed across all 7 pillar pages.

### 2. Copy rewrite (soul language)
- H1: *"Organize your life around what truly matters"* → *"Align your daily rhythm with what truly matters"*. Kept the `.highlight` span on the tail fragment so the teal→sand gradient still lands. Scholar suggested *"with the Divine"*; softened to *"with what truly matters"* to preserve the universal-ethics onboarding path.
- Primary CTA label: *"Get Started Free"* → *"Begin Your Path"*.

### 3. Qalb-intent CTA press state
- Scoped `.hero-cta .btn:active { transform: scale(0.97); transition: transform 80ms var(--ease); }` — local to hero to avoid touching the global `.btn-primary` rule used app-wide.

### 4. Ummah-signal marquee
- New `.hero-marquee` element inserted between `.hero-cta` and `.hero-modules`.
- 12-item horizontal ribbon (6 items × 2 duplicates) — *"Grounded in the Maqasid al-Shari'ah · Local-first · Zero tracking · Seven pillars · Free forever · Built with tawakkul"*.
- 40s linear `hero-marquee` keyframe `translateX(0 → -50%)` for seamless wrap.
- `-webkit-mask-image` + `mask-image` linear gradient fades both edges (transparent 0–12%, opaque 12–88%, transparent 88–100%) — Scholar's "progressive blur" technique.
- `aria-hidden="true"` (decorative — literal trust-signal copy duplicated for motion).
- `@media (prefers-reduced-motion: reduce) { .hero-marquee-track { animation: none; } }`.

## Verification

- `preview_eval` confirms computed H1 font-family resolves to Cormorant Garamond stack, weight 300, letter-spacing `-0.88px` (which is `-0.02em` × 44px).
- Marquee animation name `hero-marquee`, duration 40s, 12 item count confirmed.
- Screenshot shows serif headline, press-capable CTA, marquee fading at both edges mid-scroll.
- No console errors.

## Deferred

- **Cormorant Garamond webfont load** — currently relies on system fallback to Georgia where Cormorant isn't installed. No `@import` added to keep this phase risk-free.
- **Item 4: "Breaking the box"** — 3D Faith ring overlapping hero edge + Maqasid Pulse 4s shimmer on circular stroke.
- **Item 5: Bento pillar grid** — replace `.hero-modules` chip row with 7-card bento, each with a 0% Mastery Ring and hover-only full description.
- **Item 6: Warm dark background (#1a1611)** — would require a theme token update and affects more than hero; not scoped.

## Why

The hero was technically clean but read generic — standard sans headline, standard chip row, no trust-signal layer. Scholar's diagnosis was "corporate AI mush" aesthetic; prescribed editorial serif + soul-language copy + ambient Ummah signal to re-center the contemplative tone the product requires. Phase 1 targets the highest-leverage perceived-quality lifts with zero new dependencies.
