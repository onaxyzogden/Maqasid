---
title: "Motif Tokens"
type: concept
created: 2026-04-24
updated: 2026-04-24
tags: [design-system, css, tokens, ui-pattern, milos]
sources: 0
---

# Motif Tokens

A shared vocabulary of five reusable UI "motifs" in [[milos]] — **halo**, **ghost-text**, **soft-glass**, **shimmer-border**, and **editorial serif** — lifted out of per-page CSS into `src/styles/tokens.css` so multiple pages compose the same visual language rather than duplicating its formulas.

## Core Idea

Before this extraction, the Prophetic Path and LevelOverviewPage each inlined their own versions of the same handful of effects: `color-mix()` ghost formulas, two-layer box-shadow halos, 4s shimmer strokes, soft-glass surface treatments. When the UI/UX scholar's answers converged on a demand for **cross-module rhythm** (Q5, FLO consult, 2026-04-24), the diverging copies became a liability — a shimmer on one page would drift from a shimmer on another, and a fourth page picking them up would have to pick which copy to duplicate from.

The solution was not another component library or CSS-in-JS layer. It was a **token pass + utility pass**: lift the five motifs into CSS custom properties under a `--motif-*` namespace, wrap them in single-purpose utility classes, and define a fallback chain so consumer scopes control tint without having to rename variables.

Motif tokens are **not** a replacement for per-page styling. They are the substrate on top of which per-page styling composes. A page can set `--motif-tint` locally to change what color a halo expresses, and the halo utility will consume it — but the halo's geometry, blur radius, and opacity stays centralized.

## The Five Motifs

### 1. Halo — level/pillar-tinted box-shadow aura
Two-layer shadow (24px tight + 80px bloom) expressing importance through tinted atmosphere rather than saturated fills. Used on the LevelNavigator center card, FLO card hover, and (via different consumer) prayer markers.

Utility: `.motif-halo` (16%/8%), `.motif-halo--strong` (22%/12%).

### 2. Ghost-text — "receding focus, not locked"
Opacity-applied-to-color (via `color-mix(currentColor var(--motif-ghost-opacity))`) so faded text retains hierarchy and hue while the signal recedes. Distinct from `opacity: 0.55` on an element, which would dim backgrounds and borders indiscriminately.

Utility: `.motif-ghost-text` (55%), `.motif-ghost-text--soft` (70%).

### 3. Soft-glass — parchment-like card surface
Subtle blend of the surface token with a whisper of text-color or black, plus a 65%-opacity border and an inset highlight. Light and dark variants. Used on the FLO wheel wrapper and the active Prophetic Path prayer card.

Utility: `.motif-soft-glass` (background + border + shadow).

### 4. Shimmer-border — slow gradient sweep around a border
A pseudo-element ring drawn with `mask-composite: xor` that animates a 4s linear gradient around the element's border without affecting its content. The former one-off implementation on `.pp-pillar-chip::before` is now the canonical pattern.

Utility: `.motif-shimmer-border`. Tinted by `--motif-tint`; gated under `prefers-reduced-motion: reduce`.

### 5. Editorial serif — Noto Serif at weight 400 with −0.025em kerning
Not a token (it's a composition of existing font variables), but part of the same vocabulary because it establishes hierarchy through **size and air**, never through weight or saturation. Consistently applied to: `.fln__center-title`, `.flo__section-title`, `.flo__card-name`, `.pp-intro__hero`, and the active `.pp-card[data-prayer-state='active'] .pp-title`.

## The `--motif-tint` Fallback Chain

A single utility (e.g. `.motif-halo`) needs to express different colors in different scopes: level color on FLO cards, pillar color on section borders, prayer color on active markers. Rather than define five halo utilities, the utility references a fallback chain:

```css
color-mix(
  in srgb,
  var(--motif-tint, var(--level-color, var(--pillar-accent, var(--primary))))
  16%,
  transparent
)
```

**Consumer contract:**
- If the scope sets `--motif-tint`, that wins. Use this when the tint is semantic to the scope (e.g., PP active card pointing at prayer-tier color).
- Else if `--level-color` is set (the FLO pane sets it on `.flo`), halos express tier color.
- Else if `--pillar-accent` is set (FLO and shared sections set it), halos express pillar color.
- Else `--primary` as a final fallback so the utility never renders transparent in orphan contexts.

This lets the same utility compose correctly whether it's inside a pillar overview, a prayer card, or a component rendered in isolation in a test harness.

## Application

- **LevelOverviewPage** ([[milos]] shared across all 7 pillars): wheel section = `.motif-soft-glass.motif-shimmer-border`; `.flo::after` pillar ambient aura; `.flo__grid--has-progress` comparative-ghosting gate consuming `--motif-ghost-opacity`.
- **Prophetic Path timeline**: active prayer card = `.motif-soft-glass` surface + `.pp-card[data-prayer-state='active']::before` shimmer ring (custom keyframe `pp-active-shimmer` because the card needs its own scope separate from the utility).
- **Prophetic Path intro header**: editorial serif composition (`.pp-intro__hero`) paired with an eyebrow + subline to form the three-line "ambient header" pattern.
- **LevelNavigator**: active-center card consumes `.motif-halo` indirectly (the halo formula is duplicated there; consolidation is a follow-on task — see Consequences).

## Composition Rules

1. **Set `--motif-tint` at the smallest scope that owns the tint semantic.** Not on `:root`, not on `body` — on the component or section that semantically "is" the tinted thing. This keeps halos and shimmers from bleeding across unrelated elements.
2. **Don't compose two shimmer-borders on nested elements.** The animation stutters visually and the mask-composite math gets nondeterministic. Pick one ring per card.
3. **Prefer utilities over bespoke `color-mix()`**. If a page is reaching for a ghost-text formula, check whether `.motif-ghost-text` or `.motif-ghost-text--soft` covers the case first.
4. **Gate all motion under `prefers-reduced-motion: reduce`.** The motif tokens already do this for shimmer; any consumer adding additional animation on top must carry the same gate.
5. **Light and dark must both be correct.** Soft-glass tokens have explicit light + dark variants — consumers generally don't need to do anything, but if a page defines its own tint override it must define the dark equivalent too.

## When NOT to Use Motif Tokens

- **Brand moments with deliberate one-off treatment** (e.g., the Tahajjud "divine" card uses its own `--pp-tertiary` radial glow). Forcing every sacred treatment through the motif tokens flattens intentional distinctions.
- **Short-lived test pages / prototypes** — the tokens are stable API now, but a prototype that might be thrown away doesn't need to be plumbed in. Inline styling is fine until the pattern proves worth keeping.
- **Non-UI concerns** — these are visual vocabulary, not state or behavior. Don't use `--motif-*` to signal things like "this component is loading" or "this user has permission" — use data attributes or component state instead.

## Relationship to Other Concepts

- Underpins the [[ceremony-gate-pattern]] visual language — the opening-threshold modal uses soft-glass framing consistent with the rest of MILOS.
- Sits at the design-system layer, separate from the [[maqasid-al-shariah]] pillar vocabulary (which is semantic/content, not visual).
- Not governed by the [[amanah-gate]] — motif tokens are shape and atmosphere, not ethics. The amanah gate governs **what** is built; motif tokens govern **how** it looks once built.

## References

- Decision: `wiki/decisions/2026-04-24-milos-ui-motif-tokens.md`
- Source: `src/styles/tokens.css` lines ~402–518
- First consumers: `src/pages/shared/LevelOverviewPage.css`, `src/components/islamic/PropheticPath.css`
- Origin consults (NotebookLM 995a59d1): `pp-consult.txt`, `pp-intro-consult.txt`, `flo-consult.txt` in repo root

## Consequences

- `.fln__center` still inlines its halo formula (predates the tokens). Refactoring it to consume `.motif-halo` is a small follow-on — not breaking, but would complete the Q5 cross-module rhythm goal.
- If a 4th page picks up any of these motifs without going through the utilities (e.g., copy-paste from PP or FLO), the drift problem returns. Any reviewer noticing inline `color-mix()` or two-layer box-shadow on a new page should ask whether a motif utility applies.
- The token namespace is now stable API. Renaming `--motif-*` or removing a utility breaks downstream consumers. Deprecate with care.
