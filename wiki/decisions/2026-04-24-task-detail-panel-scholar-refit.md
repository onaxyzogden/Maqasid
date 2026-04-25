---
title: "TaskDetailPanel — UI/UX Scholar Refit"
type: decision
created: 2026-04-24
updated: 2026-04-24
tags: [ui-pattern, milos, task-modal, motif-tokens, ux-consult]
status: accepted
sources: 1
---

# Decision: TaskDetailPanel scholar refit (5 Q's)

## Context

The Shahada — Core task-detail modal (`src/components/work/TaskDetailPanel.{jsx,css}`) had structurally sound bones but five competing-attention problems:

1. Bold sans title competing with the priority pill for top focus
2. "URGENT PRIORITY" pill seated above the title, dominating the first 300px
3. "QARINA" tier label repeated on every subtask row when all rows shared the same tier
4. "Done" button rendered fully greyed/disabled until 100% — read as broken, not as gating
5. Description paragraph used the same text color as the title, fighting subtasks for attention

These were sent to the **NotebookLM "Modern UI/UX Design Scholar"** (notebook `995a59d1`) as a 5-question consult (`shahada-consult.txt` → `shahada-answer.txt`).

## Decision

Apply all five scholar recommendations:

| Q | Recommendation | Implementation |
|---|---|---|
| Q1 | Editorial serif weight 400, kerning −2…−4%, line-height ~110% | `.tdp-title` → Noto Serif 2rem / 400 / −0.025em / 1.15 |
| Q2 | Demote priority below title as eyebrow | `.tdp-header-block` flex column reorders to title → priority → description; pill desaturated via `color-mix(... 12%, transparent)` |
| Q3 | Lift homogeneous tier to section header | `tierSet` rollup in JSX; `.tdp-section-label__tier` slot hosts a single `AmanahTierBadge`; per-row badges gated by `!sharedTier` |
| Q4 | Ghost button until ready, fill+shimmer at 100% | `.tdp-done-btn` ghost default (1.5px hairline, transparent bg); `[data-state='ready']` adds accent fill, sets `--motif-tint`, composes `.motif-shimmer-border` |
| Q5 | Description recedes via low-contrast text, no container | `color-mix(in srgb, var(--text) calc(var(--motif-ghost-variant-opacity, 0.7) * 100%), transparent)` — naked text between title and progress |

## Implementation Notes

- **`isLocked` / `isReady` computed from subtask counts** — avoids the `disabled` attribute pattern; click handler guards instead. Button never *looks* broken, even when not actionable.
- **Tier rollup is opt-in to mixed sets** — `tierSet.size === 1` collapses to header; mixed-tier task lists still show per-row badges (no information loss).
- **Description ghost formula** must use `calc(... * 100%)` to coerce the unitless `--motif-ghost-variant-opacity` (`0.7`) into a valid `<percentage>` for `color-mix`. Bare `var(...)` resolves to invalid syntax and falls back to fully opaque — caught in preview verification.

## Consequences

- TaskDetailPanel now composes the same editorial-serif + ghost-text + shimmer-border vocabulary as Prophetic Path active cards and FLO sections — extending the Q5 cross-module rhythm goal from `motif-tokens.md` to a third surface.
- Any future task-modal variant (e.g., `InlineTaskDetail`) should adopt the same header-block / tier-rollup / ghost-button pattern. Currently un-refactored — flagged as follow-on.
- The `isLocked`/`isReady` state model is reusable; if other "blocking gate" buttons appear elsewhere (project-close, ceremony-confirm), they should follow this pattern rather than `disabled`.

## References

- Consult input: `shahada-consult.txt`
- Scholar answers: `shahada-answer.txt`
- NotebookLM source: `995a59d1` ("Modern UI/UX Design Scholar")
- Related: `wiki/decisions/2026-04-24-milos-ui-motif-tokens.md`
- Related concept: `wiki/concepts/motif-tokens.md`
