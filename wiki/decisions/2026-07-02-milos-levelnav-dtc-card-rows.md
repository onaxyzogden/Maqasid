---
title: "MILOS — LevelNavigator mobile rows restyled as DashboardTaskCard-style cards (Variant A)"
type: decision
date: 2026-07-02
status: accepted
tags: [ui, mobile, responsive, css, level-navigator, design-parity]
superseded_by: null
---

# MILOS — LevelNavigator mobile rows restyled as DashboardTaskCard-style cards (Variant A)

## Context

[[2026-07-01-milos-levelnavigator-mobile-stacked-rows]] (the day before) fixed the unusable mobile
pillar strip by stacking it into full-width `[label | bar]` rows. Functional, but visually bare —
plain rows that didn't speak the app's card language. The user asked for the mobile rows to "match
the style and layout and color status" of **DashboardTaskCard** (`.dtc__card*`), and from a
rendered mockup of layout variants chose **Variant A — two-row card**: numbered accent badge +
bold pillar title as a header row, full-width 44 px status bar beneath.

All prior constraints stay binding: `LevelNavigator` is external (`@ogden/ui-components`,
[[2026-04-30-ogden-ui-components-github-direct]]) so the fix must remain CSS-only in the global
[src/styles/level-navigator-responsive.css](src/styles/level-navigator-responsive.css); the
doubled-class anchor `.fln__segments.fln__segments`, the app-wide scope, the 767 px / 479 px
breakpoints, and the 44 px tap targets all carry forward.

## Decision

Replace the two media blocks in the same stylesheet with a Variant A card treatment (~160 lines),
still under the doubled anchor:

- **Card grid** — each `.fln__segment-col` becomes `display: grid` with
  `grid-template-columns: var(--space-6) minmax(0, 1fr)` and areas `'num label' / 'bar bar'`.
  Grid **areas** make the layout DOM-order independent — the package renders the bar *before* the
  label, so flex reordering would have needed `order` hacks.
- **Numbered badge** — `counter-reset: fln-pillar` on `.fln__segments`; each card's `::before`
  renders `counter(fln-pillar, decimal-leading-zero)` → **01–07**, with background
  `color-mix(in srgb, var(--seg-color, var(--accent)) 14%, transparent)` and text
  `var(--seg-color)` — the exact `.dtc__card-num` accent formula.
- **Card chrome** — `var(--surface)` background, `border: 1px solid transparent`,
  `var(--radius-lg)`, `var(--shadow-card)`, 14 px padding, 4-property transition — dtc parity.
- **Label** — `.dtc__card-title` typography: `var(--text-base)`, weight 700, `var(--text)`, no
  text-transform (de-uppercased).
- **Bar** — `grid-area: bar`, 100% width, **44 px** tall, 3 px gap, 8 px radius, `var(--bg3)`
  track; subsegs keep inheriting tappable height.
- **State re-statements at (0,3,0)+** — the card base would otherwise clobber the package's
  modifier rules, so inside the media block: `--current` → 8% seg-color `color-mix` tint +
  seg-color border, label + badge flip to seg-color; `--hover-sync` (the wheel-hover sync
  modifier, `:not(--current)`) → 70% seg-color border mix + `var(--shadow-card-hover)`.
- **≤479 px compaction** — padding `var(--space-3)`, 22 px badge, `var(--text-sm-plus)` label.
- **`prefers-reduced-motion` re-statement** — `transition: none; transform: none` inside the
  mobile block; our (0,3,0) transition would otherwise beat the package's reduced-motion rule.

Inline `taskColorFn` subseg backgrounds and all desktop ≥768 px styles remain untouched.

## Rationale

- **Variant A over badge-less / single-row variants** — chosen by the user from a rendered
  side-by-side mockup; the two-row shape gives the bar the full card width (best tap-target
  geometry) while the numbered badge supplies the dtc "card number" identity.
- **CSS counters over JSX numbering** — the package DOM is not editable in-repo; counters produce
  the 01–07 sequence with zero markup change and stay correct for the 5-stage BBOS strip too.
- **Re-stating modifiers instead of lowering base specificity** — the doubled anchor is
  load-bearing (it must beat the package's 0,1,0 rules), so the card base is necessarily (0,3,0);
  explicit re-statements are the deterministic way to keep `--current` / hover-sync alive.

## Consequences

- Mobile ≤767 px: every LevelNavigator strip app-wide renders as a stack of dtc-style cards —
  badge + bold title over a full-width 44 px bar; the current level shows an accent-tinted,
  accent-bordered card; wheel hover lifts the card shadow.
- Desktop ≥768 px: **byte-identical** — the media queries are inert above 767 px (verified: flex
  row, no `::before` content, 14 px bar at 876 px).
- The coupling to package class names (`.fln__segments`, `.fln__segment-*`) continues — same
  accepted maintenance cost as the stacked-rows decision.
- **Discovery recorded:** the app-level `html.reduce-motion` rule (UA-sniffed preview class from
  [[2026-04-29-milos-preview-and-dashboard-centering]]) zeroes all transitions via `!important`
  and beats everything — verified live (computed transition-duration 1e-06 s). The in-block
  `prefers-reduced-motion` re-statement covers the OS-level preference, which the preview harness
  cannot emulate — disclosed, not assumed.
- **Amanah gate:** neutral — CSS presentation of an existing navigation surface; no capital /
  sale / CSA / CSRA / salam / yield-share surface.

## Verification

- **375×812 `/app`** — column of 7 grid cards (computed areas `"num label" "bar bar"`), badges
  01–07 in the gold accent (`rgb(200,169,110)` on the 14% mix), labels bold/no-transform, bar
  44 px × 8 px radius, **every subseg exactly 44 px tall**, inline `taskColorFn` backgrounds
  untouched. Screenshot taken.
- **Real `--current`** on `/app/faith-salah` ("Salah" card): seg-color border, 8% tint background
  (`color(srgb 0.9827 0.9730 0.9545)`), gold label + badge. Hover-sync verified by applying the
  package's own modifier class: 70% mix border + shadow change, then removed.
- **Dark theme** (`data-theme="dark"`): card `rgb(26,29,36)`, label `rgb(232,227,220)`, track
  `rgb(34,38,46)` — matches the approved mockup; screenshots for both themes.
- **Desktop 876 px** — media block inert (flex row, no `::before`, 14 px bar).
- **360×640** — compaction active: 12 px padding, 22 px badge, 12.8 px label.
- **Reduced motion** — app-level `.reduce-motion` rule verified zeroing the card transition live;
  OS-level restatement present in code (harness cannot emulate the media query — disclosed).
- `npm run lint` and `npm run build` green.

## Delivery

Commit `d3941c3` on `feat/levelnav-mobile-dtc-cards` cut from `origin/main`, PR
[#19](https://github.com/onaxyzogden/Maqasid/pull/19) to `main`. Single file:
`src/styles/level-navigator-responsive.css`.

**Merged to `main` 2026-07-02** via PR #19 (merge commit `cd1997f`, now the tip of `origin/main`); feature branch pruned.

## Connections

- [[2026-07-01-milos-levelnavigator-mobile-stacked-rows]] — the decision this **amends**: row
  geometry goes `[label | bar]` → two-row card; anchor, scope, breakpoints, 44 px targets carried
  forward unchanged
- [[milos]] — the affected product
- [[2026-04-30-ogden-ui-components-github-direct]] — why the component is external and restyled by
  override
- [[2026-04-29-milos-preview-and-dashboard-centering]] — origin of the `html.reduce-motion`
  `!important` rule discovered interacting with the card transition
