---
title: "FLO Redesign — promotion to shared LevelOverviewPage (all 7 pillars)"
type: decision
date: 2026-04-23
tags: [faith, level-overview, ui, promotion, layered-theming, cross-module]
supersedes: [2026-04-23-flo-redesign-prototype]
---

# FLO Redesign — promotion to shared LevelOverviewPage (all 7 pillars)

## Context

Prototype `/app/flo-redesign-test` (decision [[2026-04-23-flo-redesign-prototype]]) was approved for promotion after visual review. The prototype's `.flo-rx`-scoped rules now land on the shared `.flo` class in `src/pages/shared/LevelOverviewPage.{jsx,css}`, which means every pillar module (Faith, Life, Intellect, Family, Wealth, Environment, Ummah — plus Moontrance when activated) inherits the redesign uniformly.

## Decision

### JSX — `src/pages/shared/LevelOverviewPage.jsx`

1. Import `MAQASID_PILLARS` from `@data/maqasid`.
2. Resolve `pillarAccent = MAQASID_PILLARS.find(p => p.id === boardPrefix)?.accentColor ?? 'transparent'`. This uses the existing `boardPrefix` prop — zero caller changes across the 7+1 pillar entry pages.
3. Set inline CSS vars on the `.flo` root: `--pillar-accent` (from `MAQASID_PILLARS`), `--level-color` (from existing `levelColor` prop).
4. Bento cards gain `data-progress={pct > 0 ? 'started' : '0'}` — powers Active-Neutrality styling.
5. `MasteryRing` extended with `muted` prop; when `muted`, its gradient resolves against `var(--border2)` instead of the tier color. Passed `muted={pct === 0}` from each card.

### CSS — `src/pages/shared/LevelOverviewPage.css`

Existing rules preserved. Added two blocks:

- **Top of file:** `.flo` gains `position: relative` and padding-top bump (`var(--space-8)` replaces `var(--space-6)`) to seat the 2px rule. `.flo::before` renders the 2px pillar-accent top rule.
- **End of file** (before the view-transition block): full Scholar-led phase set promoted from the prototype, rewritten from `.flo-rx *` → `.flo *`:
  - `.flo .fln__center-title` — editorial serif, 2rem, weight 400
  - `.flo .fln__side` — 60% calm-peer opacity
  - `.flo .fln__side-title` — editorial serif so peer + active share type family
  - `.flo .fln__center` — two-layer level-tinted box-shadow halo
  - `.flo .flo__wheel` — max-width 640px, container-less, `::before` radial pillar-tinted aura (blur 60px)
  - `.flo .flo__card[data-progress='0']` — dashed border + muted surface tint
  - `.flo .flo__card[data-progress='started']` — solid level-tinted border + barely-there ring
  - `.flo .flo__card:hover` — two-layer level-tinted halo replaces `--shadow-lg`
  - `.flo .flo__card-name` — editorial serif, `--text-xl`, weight 500
  - `.flo .flo__card-icon` — 56×56, radius 14
  - `.flo .flo__card` padding 28×20 → 32×24
  - `prefers-reduced-motion` opt-out for card transitions and hover lift

### Pillar accent source

`MAQASID_PILLARS[].accentColor` is the canonical source (note: `MODULE_PALETTE[x].theme` was NOT used because Faith's theme is `#FFFFFF` — unsuitable for a top rule. MAQASID_PILLARS carries a proper tinted `accentColor` per pillar).

| Pillar | accentColor |
|---|---|
| faith | `#C8A96E` (gold) |
| life | `#6EAD8A` (green) |
| intellect | `#6E8EAD` (blue) |
| family | `#AD6E9E` (mauve) |
| wealth | `#8EAD6E` (olive) |
| environment | `#6EADAD` (teal) |
| ummah | `#AD8E6E` (bronze) |
| moontrance | `#6E8E5B` (deep green) |

## Retirement

Per the `2026-04-21-faith-dashboard-wheel-promotion` pattern, the prototype is deleted rather than left as dead weight:

- `src/pages/prototypes/FloRedesignTestPage.jsx` — deleted
- `src/pages/prototypes/FloRedesignTestPage.css` — deleted
- `src/App.jsx` — import + `<Route path="flo-redesign-test" …>` removed
- `src/components/layout/Sidebar.jsx` — "FLO Redesign" nav link removed

## Verification

- `npm run build` clean (1.37s).
- `boardPrefix`-based accentColor resolution means zero code changes in the 7+1 per-pillar `LevelOverviewPage` callers.
- Module-placeholder pillars that don't yet use `LevelOverviewPage` are unaffected.

## Out of scope

- Mobile viewport audit of the promoted design across all pillars.
- Reintroducing the section titles (H2 + eyebrow) that the user trimmed during prototype review — they stay off, confirming uniformity by halo + 2px rule alone.
- `section-title` / `section-eyebrow` CSS rules from the prototype are NOT ported, since the shared JSX never rendered them.
