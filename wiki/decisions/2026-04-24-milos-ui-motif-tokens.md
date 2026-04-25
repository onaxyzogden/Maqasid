# 2026-04-24 — MILOS UI Motif Tokens + Scholar-Led FLO/PP Refinement

**Status:** Accepted
**Scope:** `src/styles/tokens.css`, `src/components/islamic/PropheticPath.{jsx,css}`, `src/pages/shared/LevelOverviewPage.{jsx,css}`
**Driver:** NotebookLM "Modern UI/UX Design Scholar" (995a59d1) consults on pp timeline, pp-intro header, and FLO shared overview

## Context

Three consult briefs (`pp-consult.txt`, `pp-intro-consult.txt`, `flo-consult.txt`) went to the UI/UX scholar. Answers converged on five motifs that were not yet reusable tokens and were instead inlined ad-hoc across `PropheticPath.css` and `LevelOverviewPage.css`:

1. Editorial serif at 2rem / weight 400 / kerning −0.025em
2. Shimmer stroke on borders (one-off on `.pp-pillar-chip`)
3. Level-tinted box-shadow halo (inlined in `.fln__center` and `.flo__card:hover`)
4. Ghost-text as "receding focus, not locked" — inline `color-mix()`
5. Soft-glass surface (ad-hoc in `.pp-surface-low`)

Cross-module rhythm (Scholar Q5) required a shared vocabulary both pages could compose — hence extracting these before touching FLO or PP.

## Decision

**Lift the five motifs into `src/styles/tokens.css` under the `--motif-*` namespace** and consume them via utility classes (`.motif-halo`, `.motif-ghost-text`, `.motif-soft-glass`, `.motif-shimmer-border`) with light + dark variants. Consumer CSS sets `--motif-tint` per-scope so a single utility can express pillar color on FLO sections and prayer-tier color on the PP active card.

Downstream:

- **Prophetic Path intro:** 3-line editorial header (eyebrow = city, hero = active node title in Noto Serif 2rem, subline = Fajr→Maghrib bookends) replaces the former decorative H2 + tagline. Height capped at 180px so the active node sits above the fold at 900px viewport.
- **Prophetic Path timeline:** Progressive Disclosure pattern chosen over Sacred Arc Bento or Single-column-with-pauses. Past/upcoming collapse to icon+title summary rows; next is semi-expanded; active gets `--motif-soft-glass-bg` + serif 2.5rem @ weight 400 + shimmer border via `::before` at 4s linear. Earlier `font-weight: 600` polish on the active title is explicitly superseded.
- **LevelOverviewPage (all 7 pillars):** Wheel wrapped in `.flo__section--wheel.motif-soft-glass.motif-shimmer-border` soft-glass section. 0% ghosting is now comparative (`.flo__grid--has-progress` gate) — an all-zero first load no longer shows five ghostly cards. Pillar ambient signal = blurred 360×360 radial aura top-left via `.flo::after` + 2px `--pillar-accent` top-rule on `.flo__section`. Tier color (`--level-color`) remains dominant in cards; pillar color whispers in the ambient.

## Rationale

- **Why tokens before application:** Scholar's cross-module rhythm demand (Q5) would have produced copy-paste drift if FLO and PP each owned their own shimmer/halo formulas. Tokens are the substrate.
- **Why Progressive Disclosure (not Bento):** least disruption to the existing sequential-time mental model; matches the "receding focus" ghost metaphor directly; already close to what the ribbon was evolving toward.
- **Why comparative ghosting:** the absolute rule produced "5 ghostly cards, no invitation" on first empty load. Parent-class gate keeps the ghost metaphor intact once progress exists, while an untouched tier looks neutral.
- **Why pillar-tint ambient, not pillar-tint dominant:** keeps tier color (gold/teal/purple) functional for Maqasid-level identity while giving each of 7 pillars an unmistakable ambient fingerprint. Whisper, not shout.

## Implementation notes

- `--motif-tint` fallback chain: `var(--motif-tint, var(--level-color, var(--pillar-accent, var(--primary))))` lets a utility consume whichever consumer-scoped var is set without breaking in orphan contexts.
- All shimmer/halo animations gated under `prefers-reduced-motion: reduce`.
- Active-card shimmer uses `mask-composite: xor` ring pattern — inner padding:1px + outer mask produces a border-only gradient sweep without affecting content.
- Light + dark variants defined for soft-glass background/border/shadow; ghost-text opacity uses a single var consumed via `currentColor` so it adapts automatically.

## Verification

- `npm run build` passes (1.90s).
- `npm run lint`: no new violations in touched files (pre-existing errors unchanged).
- Preview verified at 1400×900 desktop + 390×844 mobile; active PP card reads as editorial Noto Serif 40px @ weight 400 with 4s shimmer animation; FLO Life-core renders framed wheel with green (#6EAD8A) top-rule + comparative ghosting disabled on all-zero load.
- 6 of 7 pillar overviews (faith, life, intellect, family, wealth, environment) smoke-tested — all express pillar tint in ambient while tier color remains dominant. `ummah` gated by unrelated CeremonyGuard threshold, not regressed by this change.

## Consequences

- `MaqasidBalanceRadar.jsx` (separately uncommitted) remains out of scope — styled independently.
- Any new component that wants the editorial/soft-glass/halo vocabulary should compose the tokens, not duplicate the formulas. `wiki/concepts/motif-tokens.md` may be worth writing if a fourth page picks these up.
- Lint debt carries forward as-is; the 625 pre-existing errors are a separate backlog item.

## References

- NotebookLM notebook: `995a59d1-…` ("Modern UI/UX Design Scholar") — consult briefs in repo root (`pp-consult.txt`, `pp-intro-consult.txt`, `flo-consult.txt`)
- Plan: `~/.claude/plans/groovy-stargazing-graham.md`
