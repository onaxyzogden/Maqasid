---
title: "MILOS — Desktop dashboard pillar strip gets grouped icon+label glyphs (Option B)"
type: decision
date: 2026-07-05
status: accepted
tags: [ui, dashboard, level-navigator, pillars, css, icons, ogden-ui-components]
superseded_by: null
---

# MILOS — Desktop dashboard pillar strip gets grouped icon+label glyphs (Option B)

## Context

The dashboard's "Core Higher Objectives" strip is a `LevelNavigator` (external
`@ogden/ui-components`, [[2026-04-30-ogden-ui-components-github-direct]]) restyled app-wide
through the MILOS-owned global override [src/styles/level-navigator-responsive.css](src/styles/level-navigator-responsive.css)
(imported in [main.jsx](src/main.jsx) **after** the package CSS; never a fork).

On mobile (≤767px) the strip was already given canonical pillar glyphs in place of the
`01`–`07` counter badges via a CSS-mask-over-`--seg-color` technique —
[[2026-07-04-milos-dashboard-pillar-icons]]. That ADR's Deferred note read: *"Extend to the
desktop strip in the same change — desktop is labels-only (no badge to swap), so it needs a
real content slot, not a replacement; out of scope. Deferred."* **This change closes that
deferral.**

At ≥768px the package renders each `.fln__segment-col` as a centered flex column — a 14px
`.fln__segment-bar` over the `.fln__segment-nav` label button (a ~10px uppercase pillar name)
— with no glyph. The user asked to bring the pillar glyphs to the desktop strip too, and chose
**Option B**: the glyph *grouped with the label* as one identity block below the bar
(icon-over-name), matching the PillarCard / Sidebar house style — rather than **Option A** (a
glyph floating above the whole segment, above the bar) or **Option C** (glyph inline-left of
the name).

**Amanah gate:** neutral — presentational nav-chrome CSS; no capital / riba / gharar surface,
no CSA / CSRA / salam / yield-share.

## Decision

Add a new `@media (min-width: 768px)` block to the same override stylesheet — **disjoint** from
the mobile block (`max-width:767px`), so the two never overlap — keyed on the **seven dashboard
`data-pillar-id`s** (`faith / health / intellect / family / wealth / environment / ummah`),
which are distinct from every sub-pillar / prayer / BBOS id, so the treatment lands **only** on
the top-level dashboard strip.

Two rules, both anchored on the proven doubled-class `.fln__segments.fln__segments …`
specificity anchor (0,5,0; the `::before` is 0,5,1 — beating the package's 0,1,0
`.fln__segment-nav` base regardless of load order):

1. **Label button → centered block box** so the glyph stacks directly above the name as one
   grouped block:
   ```css
   .fln__segments.fln__segments .fln__segment-col[data-pillar-id="faith"] .fln__segment-nav, …7 ids… {
     display: block; text-align: center;
     white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
   }
   ```
2. **Grouped glyph** on `.fln__segment-nav::before` — a shared rule
   (`content:""; display:block; margin:0 auto 4px;` 18px box; `background:var(--seg-color,var(--accent));`
   mask-repeat/position; `mask-size:100% 100%`) plus **seven per-pillar `mask-image` rules
   reusing the exact data-URIs already shipped in the mobile block** (Compass · HeartPulse ·
   Brain · Users · ChessRook · TreePine · Shapes, lucide-react v1.8.0). The mask clips the
   `--seg-color` fill to the lucide stroke → a level-tinted glyph, identical to mobile.

A source-of-truth comment mirrors the mobile block: geometry tracks `src/data/maqasid.js`
(`icon:`); if a pillar's icon changes there, update **both** the mobile and desktop blocks (the
one-time generator named in the icon ADR was never committed — the URIs live in this file).

## Rationale

- **Glyph on the label button (`.fln__segment-nav::before`), not on `.fln__segment-col`** — the
  glyph must sit *between* the bar and the label. A pseudo-element on `.fln__segment-col` can
  only render first (above the bar → Option A) or last (below the label); it cannot land between
  them. Putting the glyph on the label button and making that button a centered block is what
  achieves the *grouped* icon-over-name placement.
- **`white-space:nowrap; text-overflow:ellipsis` — NOT wrapping — is the load-bearing choice.**
  The desktop `.fln__segments` strip is **content-sized**: its `flex: 2.8 1 0%` grandparent
  `.fln__center` (flex-basis `0`) is pushed only as wide as the labels' *min-content*. Keeping
  every label on one unbreakable line holds that min-content high, so `.fln__center` stays wide
  and the strip renders at its full ~560px, with the three longest names (Intellect,
  Environment, Community) ellipsizing gracefully ("Environ…"). **Any** wrap/break rule here
  (`overflow-wrap:anywhere`, or `align-items:stretch` + `break-word`) does the opposite: it
  lowers the text min-content until `.fln__center` collapses to its narrow flex-grow share
  (~318px) and the whole strip caves to a ~252px sliver with labels shredded
  character-by-character. Found empirically — two failed attempts before landing on
  nowrap+ellipsis.
- **Reuse the mobile data-URIs** — one set of glyph URIs lives in this one file; the desktop
  block references the same icons, so mobile and desktop can never drift on which glyph a pillar
  shows.
- **Disjoint media queries** — mobile is `max-width:767px` (glyph replaces the badge on
  `.fln__segment-col::before`, `mask-size:76%`); desktop is `min-width:768px` (glyph on
  `.fln__segment-nav::before`, `mask-size:100% 100%`). Mathematically disjoint — no
  cross-contamination, verified at both widths.
- **18px glyph + 4px gap** — matches PillarCard `size={18}`; the package's ~5px column gap
  separates the grouped [glyph + name] block from the bar above.

## Alternatives Considered

- **Option A — glyph above the whole segment** (`.fln__segment-col::before`, above the bar).
  Simpler, but the glyph floats apart from its label with the bar wedged between them; not the
  grouped identity block the user wanted. Rejected.
- **Option C — glyph inline-left of the name** (icon + name on one row). Cramped in a ~90px
  desktop column once the longer names are present; would force earlier ellipsis. Rejected — the
  user chose B.
- **True multi-line label wrapping** (let long names wrap to two lines instead of ellipsizing).
  Would need a *fixed* strip width so `.fln__center` can't collapse — i.e. package-layout
  surgery on the content-sized flex chain, not an override-stylesheet change. Deferred, not done
  here.

## Consequences

- **The desktop dashboard strip now shows a level-tinted pillar glyph directly above each pillar
  name** — one grouped identity block per column, matching the mobile treatment and the
  PillarCard / Sidebar house style. The "desktop is labels-only" gap from
  [[2026-07-04-milos-dashboard-pillar-icons]] is closed.
- **Short names render in full; the three longest (Intellect, Environment, Community) ellipsize**
  at the end — the same `text-overflow:ellipsis` the package itself uses — rather than collapsing
  the strip. Strip stays stable at ~560px.
- **Zero mobile regression** — the new block is `min-width:768px`, disjoint from the
  `max-width:767px` mobile block; verified the mobile glyph still renders at 375px with the
  desktop rule inert.
- **Two-block maintenance cost** — a pillar icon change in `maqasid.js` now needs updating in
  *both* the mobile and desktop blocks. Documented inline in both. Consolidating them behind a
  committed generator is deferred (below).
- **Verification (this session):** `npm run build` green (1.30s; only the pre-existing
  `auth-store INEFFECTIVE_DYNAMIC_IMPORT` warning), `npm run lint` 0 (grounding-strict +
  inline-refs ratchets 0), `npm test` 77/77. At 1280×900: strip width **560px stable** across a
  settle-poll; all 7 `.fln__segment-nav` compute `display:block` + `white-space:nowrap`; all 7
  `::before` compute `content:""`, `display:block`, `margin:0 auto 4px`, `mask-image` present,
  fill = `--seg-color` (`rgb(200,169,110)` = #C8A96E on the current level); only
  Intellect/Environment/Community ellipsize (scrollWidth > clientWidth); nav `clientHeight ===
  scrollHeight` (36 = 36 — glyph + label fit). Canvas-rasterizing each applied mask URI: **7
  distinct, non-blank glyphs**. A `preview_screenshot` **succeeded** this session (the heavy
  dashboard usually hits the 30s [[project-screenshot-hang]]). Mobile-width (375px) re-check:
  desktop rule off, mobile glyph on.
- **Delivery:** CSS + this ADR + `milos.md` / `index.md` / `log.md` rows shipped on
  `feat/levelnav-desktop-glyphs` off `main` (which carries the mobile icon CSS `1c00324`), PR into
  `main`. Best merged **after** PR #22 — the wiki-only docs branch that adds
  [[2026-07-04-milos-dashboard-pillar-icons]] — so this ADR's cross-link resolves.

## Connections

- [[milos]] — the affected product
- [[2026-07-04-milos-dashboard-pillar-icons]] — the mobile-strip glyph swap; this change closes
  its "extend to the desktop strip — Deferred" note (soft link: that ADR lands via PR #22, not
  yet merged when this branch was cut)
- [[2026-07-01-milos-levelnavigator-mobile-stacked-rows]] — established the MILOS-owned global
  override stylesheet + the doubled `.fln__segments.fln__segments` anchor this block reuses
- [[2026-04-30-ogden-ui-components-github-direct]] — why `LevelNavigator` is external and
  restyled via override, never forked
- [[project-screenshot-hang]] — the recurring 30s `preview_screenshot` timeout on the heavy
  dashboard
