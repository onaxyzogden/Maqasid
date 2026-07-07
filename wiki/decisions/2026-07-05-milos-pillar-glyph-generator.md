---
title: "MILOS: LevelNavigator pillar glyphs become generated from maqasid.js + segment constants (source-of-truth generator), extended to sub-pillars + prayers"
type: decision
date: 2026-07-05
status: accepted
tags: [ui, css, build, codegen, level-navigator, glyphs, drift-ratchet]
superseded_by: null
---

# MILOS: pillar-glyph CSS becomes generated (B→A), extended to sub-pillars + prayers

## Context

The dashboard's 7 top-level pillar segments already showed a lucide glyph injected purely by CSS — a `.fln__segment-col[data-pillar-id="…"]::before` (mobile) / `.fln__segment-nav::before` (desktop) with `mask-image: url("data:image/svg+xml,…")`, the mask clipping a `var(--seg-color)` fill to a level-tinted glyph — in the MILOS-owned global override [src/styles/level-navigator-responsive.css](src/styles/level-navigator-responsive.css) (never a fork of the external `@ogden/ui-components` `LevelNavigator`; see [[2026-04-30-ogden-ui-components-github-direct]]). The mobile block ([[2026-07-04-milos-dashboard-pillar-icons]]) and the disjoint desktop block ([[2026-07-05-milos-desktop-pillar-glyphs]]) each carried **seven hand-written data-URIs** — 14 in all — and a stale comment cited a **never-committed** `scratchpad/gen-pillar-icons-css.mjs` as their "source of truth."

The user's standing request across sessions: *extend the grouped-glyph treatment to the sub-pillar / prayer strips (the deferred `data-pillar-id` sets), **or** take on the source-of-truth generator so `maqasid.js` icon changes propagate to both blocks automatically.* Fork chosen (AskUserQuestion): **B→A sequenced** — build the generator first and make today's 7-pillar CSS generated + drift-proof (byte-identical), then extend the same generator to the sub-pillar + prayer strips. Hand-maintaining 28 sub-pillar + 6 prayer glyphs across two blocks (68 more data-URIs) is exactly the drift the generator removes.

**Amanah gate:** neutral — build tooling + presentational nav-chrome CSS codegen over an existing UI treatment. No capital / sale / CSA / CSRA / salam / yield-share surface.

## Decision

Added `scripts/generate-pillar-glyphs.mjs` (ESM, `node`) as the single source of truth for the glyph regions, wrapped in `/* BEGIN GENERATED … */ … /* END GENERATED */` markers in **both** media blocks. Everything else in the stylesheet (card scaffolding, the numbered-badge fallback, label typography, `--current` / hover-sync modifiers, `≤479px` + reduced-motion blocks, the doubled-specificity `.fln__segments.fln__segments` anchor) stays **outside** the markers, authoritative and untouched.

- **Phase B (byte-identical 7):** the generator reproduces the seven pillar data-URIs exactly — `git diff` on the pillar regions was driven to **empty**; run-twice idempotent; `--check` exits 0.
- **Phase A (extend):** the same generator now emits the full strip taxonomy — **41 `data-pillar-id`s** = 7 pillars + 28 sub-pillars + 6 prayers — as 34 new per-id `::before` rules **per media block** (68 new rules). The 7 pillar data-URIs are **byte-unchanged**; the only non-additive edits are three `ummah` selector-delimiter flips (ummah is no longer last in each base selector list) and the stale-comment rewrite.
- **Drift ratchet:** `package.json` gained `generate:pillar-glyphs` and `generate:pillar-glyphs:check`; the `:check` is appended to the `lint` chain, so a `maqasid.js` / `*LevelNavigator-constants.js` / `prayer-pillars.js` icon edit that was not regenerated **fails lint** — the same fail-on-drift pattern as `lint:grounding-strict` and `audit:inline-refs`.

### How the generator reads the data (the Phase-B promise)

- **7 pillars:** SSR-load `src/data/maqasid.js`, read `MAQASID_CORE_PILLARS[].icon` (a **string**). Reading these strings is what makes a `maqasid.js` icon edit auto-propagate.
- **28 sub-pillars:** SSR-load each `src/pages/<pillar>/<Pillar>LevelNavigator-constants.js`, find its `{ id, Icon }[]` segment array, read each icon name off **`Icon.displayName`** (a lucide component binding, not a string).
- **6 prayers:** SSR-load `src/data/prayer-pillars.js` (`PRAYER_PILLARS`) the same way.
- **Icon geometry:** `displayName → kebab → import { __iconNode } from 'lucide-react/dist/esm/icons/<kebab>.js'`, filter out the `key` prop, encode to a data-URI (percent-encode **only** `<` `>` `#`; camelCase attr names → kebab; single-quoted values; no width/height). No React render / DOM / SVG parse.
- **SSR loader:** Vite `createServer({ appType:'custom', server:{ middlewareMode:true, hmr:false, watch:null }, optimizeDeps:{ noDiscovery:true } })` + `ssrLoadModule`, so the app's extensionless / aliased imports resolve exactly as at runtime — a bare `node --import` cannot load these modules.
- **Alias trap (handled):** `CheckCircle2`'s module `check-circle-2.js` is alias-only (`export {default} from './circle-check.js'`) with **no `__iconNode`**; its `displayName` is `CircleCheck` → `circle-check.js`, which does export it. Keying the node-lookup on `displayName` sidesteps it (defensive alias-follow fallback also present).
- **Guardrails:** the generator asserts the emitted counts (28 sub-pillars, 6 prayers) from the actual constants — not a hand-count — and checks `data-pillar-id` disjointness across the pillar / sub-pillar / prayer namespaces, so a taxonomy change fails loudly rather than drifting silently.

## Rationale

- **CSS is not linted** (no stylelint in this repo), so `git diff` is the only correctness gate for the glyph regions. Making the diff empty at the B1 gate proves the generator is a faithful replacement before any new rows are added; making the A diff purely additive proves the pillars were untouched by the extension.
- One pipeline now owns **82 data-URIs** (41 ids × 2 blocks). A future icon change either propagates through the generator or trips the `--check` ratchet in CI — the drift that the stale phantom-script comment invited is now structurally impossible.
- Sub-pillar + prayer glyphs fill with the **level color** (`--seg-color`), matching the pillars — parity, in scope. A pillar-accent tint is a separate deferred enhancement.

## Alternatives Considered

- **Keep hand-writing the data-URIs** — rejected: this is exactly the drift surface the user asked to remove; extending it to 41 ids × 2 blocks would be 82 hand-maintained strings.
- **Plain `node --import` introspection (no Vite SSR)** — rejected: the source modules use extensionless / aliased imports that don't resolve under bare node; SSR via Vite resolves them as at runtime.
- **Render each lucide React component to SVG markup** — rejected: heavier (needs a DOM/React renderer) and unnecessary — `__iconNode` already holds the exact geometry, and encoding it directly is what reproduces the existing URIs byte-for-byte.
- **Option A first (extend by hand), generator later** — rejected in favour of B→A: without the byte-identity baseline there is no gate proving the generator faithfully reproduces today's output.

## Consequences

- **New contributor obligation:** after any `maqasid.js` / `*LevelNavigator-constants.js` / `prayer-pillars.js` icon edit, run `npm run generate:pillar-glyphs`; `npm run lint` will otherwise fail on drift. Documented in the rewritten in-file comment (which now names the generator, not the phantom scratchpad file).
- Sub-pillar and prayer strips now carry glyphs on parity with the dashboard pillars, in both media blocks.
- **Deferred:** pillar-accent tint for sub-pillar/prayer glyphs (thread a `--pillar-accent` through `::before`); BBOS board glyphs (`IDY/CRD/STR/…`) via the same generator.

## Verification

- `npm run build` green; `npm run lint` green — eslint, `grounding-strict` `[STRICT] Pass`, inline-refs `0 ≤ ratchet 0`, and `generate-pillar-glyphs --check: up to date (41 glyphs)`; `npm test` **77/77** (3 files). Generator idempotent (41 glyphs), `--check` exit 0.
- **B1 gate met:** `git diff` on the 7-pillar regions empty; **A gate met:** diff purely additive apart from the intended comment rewrite + 3 `ummah` delimiter flips (zero mask-image lines removed → 7 pillar URIs byte-identical).
- **DOM getComputedStyle proof** (dashboard 7 pillars + health-core 4 sub-pillars) at **both** breakpoints: rendered `.fln__segment-col` → non-blank `mask-image` data-URI, `--seg-color` resolved (`#C8A96E`), tinted `background rgb(200,169,110)`; desktop on `.fln__segment-nav::before` (`mask-size:100% 100%`, 18px), mobile on the col `::before` (`mask-size:76%`).
- **All 41 ids × 2 blocks confirmed present in the *served* CSS** (scanning both `document.styleSheets` and the raw injected `<style>` text — 503 KB): every id has exactly 2 per-id `::before` mask rules with `svg+xml` data-URIs, `missing: []`.
- **Honestly bounded (environmental, not code):** the live prayer strip could not be rendered — clicking a prayer node (`.pp-card`, confirmed an `isPrayerNode`) mounted no `PrayerSlideUp` while the session was in **"Prayer times unavailable"** (guest, no city set), so `PrayerLevelNavigator` degrades to nothing; and the `preview_screenshot` channel was environmentally unresponsive this session (the recurring [[project-screenshot-hang]], here total — retries + overlay-dismiss + animation-freeze + server restart all failed; the a11y snapshot works). Prayer correctness therefore rests on (1) all 6 prayer ids' rules confirmed present in both served blocks and (2) the identical LevelNavigator + CSS-mask mechanism DOM-proven on the sibling health sub-pillar strip. Per CLAUDE.md, screenshots were not claimed.

## Delivery

Four commits on `feat/pillar-glyph-generator`, branched off `origin/main` in an isolated worktree (Windows MAX_PATH-safe short path), **4 commits ahead**, working tree clean:
`088b198` mark regions for codegen (B1 baseline) → `d98d724` add generator (Option B) → `2db7f7a` extend to sub-pillars + prayers (Option A) → `a2dddd2` wire npm scripts + lint ratchet.
**Push + PR are operator-gated — NOT pushed.** The main tree and the concurrent OLOS session's uncommitted work were left untouched; a temporary `.claude/launch.json` preview config added for worktree verification was reverted at session close.

## Connections
- [[2026-07-05-milos-desktop-pillar-glyphs]] — the desktop block whose 7 hand-written data-URIs this generator now emits (output byte-identical; ADR remains accurate, not superseded).
- [[2026-07-04-milos-dashboard-pillar-icons]] — the mobile glyph swap this generalizes; its "extend to sub-pillar / prayer strips" deferral is now **done**.
- [[milos]] — the project; the generator + `--check` ratchet are part of its build surface.
- [[project-screenshot-hang]] — the recurring preview-capture failure that bounded this session's visual verification.
