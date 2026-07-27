---
title: "MILOS — Dashboard mobile pillar strip shows canonical pillar icons instead of 01–07 badges"
type: decision
date: 2026-07-04
status: accepted
tags: [ui, css, icons, dashboard, level-navigator, mobile, ogden-ui-components]
superseded_by: null
---

# MILOS — Dashboard mobile pillar strip shows canonical pillar icons instead of 01–07 badges

## Context

The dashboard's seven-pillar strip (`MaqasidLevelOverview.jsx`, route `/app`) renders through
`LevelNavigator`, which is **external** — MILOS imports it via the local wrapper
[src/components/shared/LevelNavigator.jsx](src/components/shared/LevelNavigator.jsx), which
delegates to `PkgLevelNavigator` from `@ogden/ui-components`
([[2026-04-30-ogden-ui-components-github-direct]]). The package renders each pillar as a
`.fln__segment-col` carrying `data-pillar-id="<id>"` and an inline `--seg-color` (the **level**
tint — gold at core, green at growth, purple at excellence), and it **drops the `Icon` prop** —
there is no MILOS-owned JSX seam to render a glyph into a segment. MILOS therefore restyles the
package **only** through the global override [src/styles/level-navigator-responsive.css](src/styles/level-navigator-responsive.css)
(imported in `main.jsx` after the package CSS), never a fork — the pattern established in
[[2026-07-01-milos-levelnavigator-mobile-stacked-rows]].

The immediately-preceding dtc-card work ([[2026-07-02-milos-levelnav-dtc-card-rows]]) gave each
segment, at ≤767px only, an ordinal **`01`–`07`** badge via a CSS counter
(`content: counter(fln-pillar, decimal-leading-zero)`). But **every other pillar surface in
MILOS identifies a pillar by its own icon** — the sidebar, `PillarCard`s, onboarding, the mobile
nav — so the numbered mobile list was the lone place a pillar was shown by an arbitrary ordinal
rather than its glyph.

The user delegated the call: *"update list of pillars to display icons instead of numbers if you
think that's what's best in terms of UX."* Judged **icons win** — a canonical glyph is
recognizable at a glance and matches the app-wide convention, where `01`–`07` is an arbitrary
index a reader must map back to a pillar — and implemented.

**Amanah gate:** neutral — a presentational icon swap over client-side navigation chrome; no
capital / CSA / CSRA / salam / yield-share surface.

## Decision

CSS-only swap, in the **same single override stylesheet**, inside the existing
`@media (max-width: 767px)` block. For the **seven dashboard pillar ids only**, replace the
CSS-counter badge with the pillar's lucide glyph, painted through a CSS mask:

```css
.fln__segments.fln__segments .fln__segment-col[data-pillar-id="<id>"]::before {
  content: "";
  background: var(--seg-color, var(--accent));
  -webkit-mask-image: url("data:image/svg+xml,<lucide svg>");  mask-image: url("…");
  -webkit-mask-repeat: no-repeat;  mask-repeat: no-repeat;
  -webkit-mask-position: center;   mask-position: center;
  -webkit-mask-size: 76%;          mask-size: 76%;
}
```

The solid `--seg-color` fill is **clipped to the glyph's stroke shape** by the mask (lucide icons
are `fill="none"`, so only the ~2px strokes are opaque in the mask) → a level-color-tinted stroked
glyph with no chip, mirroring the bare-icon sidebar treatment. Keyed on the package's
`data-pillar-id` for the seven top-level ids (`faith` / `health` / `intellect` / `family` /
`wealth` / `environment` / `ummah`), which are **disjoint from every sub-pillar / prayer / BBOS
segment id** — so the override is naturally scoped to the dashboard strip and nothing else needs a
guard.

Glyph geometry is taken from the icons already named in [src/data/maqasid.js](src/data/maqasid.js)
(`icon:` field): **Compass · HeartPulse · Brain · Users · ChessRook · TreePine · Shapes**. The
per-pillar rules are generated from that map by [scratchpad/gen-pillar-icons-css.mjs](scratchpad/gen-pillar-icons-css.mjs)
(idempotent — aborts if the anchor is missing or `data-pillar-id="faith"` is already present); a
source-of-truth comment in the CSS points the next maintainer at the generator so an icon change
in `maqasid.js` can't silently drift from the strip.

## Rationale

- **Consistency** — the glyph is the app-wide pillar identifier everywhere else; the ordinal was
  the sole exception. A recognizable icon beats an arbitrary index the reader must decode.
- **Global override, no fork** — the package exposes no seam to inject an icon (it drops `Icon`),
  so a CSS mask on `::before` is the only non-fork route. Consistent with the two prior
  LevelNavigator restyles ([[2026-07-01-milos-levelnavigator-mobile-stacked-rows]],
  [[2026-07-02-milos-levelnav-dtc-card-rows]]).
- **`--seg-color` mask, not `accentColor`** — reuses the level tint already on the segment, so the
  icon carries the same gold/green/purple the badge did (uniform per level), with no new color
  coupling.
- **`data-pillar-id` scoping is free** — the seven dashboard ids don't collide with any other
  strip's ids, so the override lands only on the dashboard without an explicit container selector.
- **Specificity holds** — doubled `.fln__segments.fln__segments` + `.fln__segment-col` +
  `[data-pillar-id]` + `::before` = **(0,4,1)**, which beats both the base badge rule **(0,3,1)**
  and the ≤479px compaction rule **(0,3,1)**, so the glyph reliably overrides the counter.
- **Generator as source of truth** — icons are emitted from `maqasid.js`, not hand-copied, and the
  CSS comment records how to regenerate.

## Alternatives Considered

- **Fork `@ogden/ui-components` to honor the `Icon` prop** — introduces a fork to maintain and
  breaks the established no-fork override discipline for a purely presentational tweak. Rejected.
- **Render the icon from a MILOS wrapper around `LevelNavigator`** — no seam; the package owns the
  segment DOM and MILOS only wraps the whole strip. Rejected.
- **Keep the `01`–`07` numbers** — rejected on the UX merits above (icons are the convention).
- **Fill the glyph with the pillar `accentColor`** — would break the per-level color uniformity the
  badge had; the level tint is the right visual register for a level strip. Rejected in favor of
  `--seg-color`.
- **Extend to the desktop strip in the same change** — desktop is labels-only (no badge to swap),
  so it needs a real content slot, not a replacement; out of scope. Deferred.

## Consequences

- **The dashboard mobile strip now shows seven tinted glyphs**; the numbered-list inconsistency is
  closed and the strip matches every other pillar surface.
- **Numbers are retained everywhere else** — the sub-pillar, prayer, and BBOS strips carry other
  `data-pillar-id`s and keep the `01`–`07` badge; they were never in scope. The same override could
  be extended to them deliberately if that's ever wanted.
- **Extendable** — the mask technique can add glyphs to the desktop strip (needs a content slot,
  since there's no badge there) or to sub-pillar strips. Deferred, not blocked.
- **Generator coupling** — if a pillar's `icon:` in `maqasid.js` changes, re-run
  `scratchpad/gen-pillar-icons-css.mjs` to regenerate the block; the CSS comment documents this.
- **Verification (this session):** `npm run build` green (only the pre-existing `auth-store`
  `INEFFECTIVE_DYNAMIC_IMPORT` + chunk-size warnings). Live preview at mobile width — computed
  `::before` for all 7 = `content: ""` (numbers gone), mask present at `76%`, fill
  `rgb(200,169,110)` (gold core tint). Canvas rasterization of each applied mask URI paints
  distinct, complexity-appropriate glyphs — coverage 24 %–40 % (Brain densest, TreePine sparsest);
  none blank, none overfilled. **`preview_screenshot` hit the known 30s dashboard renderer hang**
  (the `MaqasidComparisonWheel` rAF loop, [[project-screenshot-hang]]) — disclosed; no live pixel
  capture, so verification rests on the two programmatic proofs, not a screenshot.
- **Delivery:** committed **`1c00324`** on `feat/dashboard-pillar-icons` (branched off `main`, not
  off the PTE branch — 1 file, 56 insertions), pushed, opened as PR
  [#21](https://github.com/onaxyzogden/Maqasid/pull/21). Unlike the sibling
  [[2026-07-03-milos-pte-cta-wiring]] (uncommitted at filing), this change shipped as a committed PR
  before the wiki note was filed.

## Connections

- [[milos]] — the affected product
- [[2026-07-02-milos-levelnav-dtc-card-rows]] — introduced the `01`–`07` badge this change swaps out
- [[2026-07-01-milos-levelnavigator-mobile-stacked-rows]] — established the global-override
  stylesheet + doubled `.fln__segments.fln__segments` anchor this rides on
- [[2026-04-30-ogden-ui-components-github-direct]] — the `@ogden/ui-components` dependency this
  restyles without forking
- [[project-screenshot-hang]] — the recurring 30s `preview_screenshot` timeout disclosed during
  verification
