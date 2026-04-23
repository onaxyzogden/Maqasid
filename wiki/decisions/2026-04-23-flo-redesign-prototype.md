---
title: "FLO Redesign — LevelOverviewPage prototype at /app/flo-redesign-test"
type: decision
date: 2026-04-23
tags: [faith, level-overview, ui, prototype, scholar-consult, layered-theming]
---

# FLO Redesign — LevelOverviewPage prototype at /app/flo-redesign-test

## Context

`src/pages/shared/LevelOverviewPage.jsx` is shared across all 7 pillar modules (Faith, Life, Intellect, Family, Wealth, Environment, Ummah). Faith screenshots at `/app/faith-core` exposed three issues: a lopsided compact `LevelNavigator`, a floating unframed `MaqasidComparisonWheel` lacking hierarchy/affordance, and a generic-sans bento grid inconsistent with the contemplative language established on the 2026-04-23 Dashboard three-tier redesign and the Prophetic Path Compressed Ribbon (Phases 1+2+3).

User hard constraint: **maintain uniformity across all 7 modules** and **execute on a prototype route, not on the shared production page** — the live `LevelOverviewPage` must remain untouched so the other six pillars don't shift while the design is iterated.

## Scholar consult

NotebookLM `Modern UI/UX Design Scholar` (notebook `995a59d1-…`, conversation `2b89f729-…`). Scholar validated the overall direction but pushed back on three specifics and added a missing dimension:

1. **Calm Peers, not ghost-text on sibling tiers.** On Prophetic Path "past" means time-gated. On LevelOverview "past" just means a tier the user isn't viewing — equally accessible. Use **60% opacity** as a calm-peer signal; preserve accent chevrons.
2. **Container-less Anchor for the wheel, not a `.flo__section` card.** Wrapping in a card fights the sacred-emanation quality. Use an editorial section title on raw page bg + a blurred pillar-tinted radial aura behind the wheel itself.
3. **Active Neutrality, not ghost-text on 0% bento cards.** First-load all cards are 0%; blanket ghost-text reads as five dead cards with no invitation. Keep titles fully legible; ghost the **stroke** (dashed border + muted ring) so a 0% card reads as a starting line, not a dead zone.
4. **Layered Theming (added).** Tier colors (gold/teal/purple) drive functional chrome — halo, ring, hover glow. Pillar identity needs an ambient signal so the user feels *which* module they're in. Add a **2px top rule** in the pillar's `accentColor` above the Navigator; Faith = `#C8A96E`.

## Decision

Create a **scoped prototype** mirroring the convention set by `PropheticPathTestPage` and `DashboardWheelTestPage`. Do not modify the shared page. Promote later in a dedicated session after user sign-off.

### Files created

- `src/pages/prototypes/FloRedesignTestPage.jsx` — self-contained prototype composing real `LevelNavigator`, `MaqasidComparisonWheel`, `PathToExcellenceCards`, and an inline `MasteryRing` copy. `useState` for level (no route navigation) so the page stays on `/flo-redesign-test`. Mock `MOCK_PROGRESS` (Shahada 42%, Salah 0%, Zakah 0%, Siyam 18%, Hajj 0%) to force a mix of 0% and ≥1% cards so the Active-Neutrality treatment is visible. Sets inline CSS vars `--pillar-accent` (`#C8A96E`) and `--level-color` on the root.
- `src/pages/prototypes/FloRedesignTestPage.css` — all rules scoped under `.flo-rx` to avoid leaking into the shared `.flo` class.

### Phased CSS checklist (all inside `.flo-rx`)

- **Phase 1 — LevelNavigator:** `.fln__center-title` → `var(--font-serif)` 2rem weight 400; `.fln__side` opacity 0.6 (calm peer, not ghost); `.fln__center` two-layer level-tinted box-shadow halo (24px tight tint + 80px soft bloom) — same technique as the Prophetic Path fix.
- **Phase 2 — Container-less anchors:** `.flo__wheel` max-width 640px with a `::before` radial pillar-tinted aura (blur 60px). `.flo__excellence` margin-only, no card chrome.
- **Phase 2.5 — Layered Theming:** `.flo-rx::before` 2px top rule in `var(--pillar-accent)` — the quiet pillar-soul signal sitting above the Navigator.
- **Phase 3 — Bento Active Neutrality:** `.flo__card[data-progress='0']` dashed border + muted surface tint + `muted` prop on `MasteryRing` (ring stroke = `--border2`); `.flo__card[data-progress='started']` solid level-tinted border + barely-there shadow; card hover = two-layer level-tinted halo; `.flo__card-name` editorial serif; padding 32×24; icon chip 56px.

### Files modified (single-line additions only)

- `src/App.jsx` — import + `<Route path="flo-redesign-test" element={<FloRedesignTestPage />} />` adjacent to the existing `prophetic-path-test` route.
- `src/components/layout/Sidebar.jsx` — "FLO Redesign" nav link below the "Prophetic Path" prototype entry.

### User-driven trim (late-session)

After first preview the user selected and removed four editorial text anchors from the JSX: the three `.flo-rx__section-title` H2s ("Your pattern at this tier" / "The practices" / "Path to Excellence") and one `.flo-rx__section-eyebrow`. The CSS rules remain defined (unused) in case a future pass wants to reintroduce them. This leaves the prototype purely visual — wheel, bento, path-cards — with uniformity carried by the 2px pillar rule + halo treatment alone.

## Files not touched (by design)

- `src/pages/shared/LevelOverviewPage.{jsx,css}`
- `src/components/shared/LevelNavigator.{jsx,css}`
- `src/components/faith/MaqasidComparisonWheel.{jsx,css}`
- `src/pages/faith/FaithLevelOverview.jsx`

## Verification

- `npm run build` passes on the prototype scaffolding.
- `/app/flo-redesign-test` renders gold 2px rule, editorial serif Navigator, halo, wheel with aura, bento with Active Neutrality (Shahada + Siyam solid/gold-ring; Salah/Zakah/Hajj dashed/grey-ring).
- `/app/faith-core` (shared production page) unchanged — regression-safe.

## Out of scope — deferred to promotion session

- Promoting scoped `.flo-rx` rules onto the shared `LevelOverviewPage`.
- Extending the 2px pillar top rule to the other six pillars (needs `accentColor` threading per pillar).
- Mobile viewport audit.
- Re-introducing section titles if uniformity demands them across all 7 modules.
