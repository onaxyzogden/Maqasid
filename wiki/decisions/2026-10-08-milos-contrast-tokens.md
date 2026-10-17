---
title: "MILOS — contrast-safe tokens: brand teal for decoration, --primary-strong for text and fills"
type: decision
date: 2026-10-08
status: accepted
tags: [milos, design-tokens, accessibility, wcag, contrast, focus]
supersedes: []
superseded_by: []
---

# Contrast-safe colour tokens

Came out of the whole-system UX audit (`/ux-engine:ux-audit whole system`, 2026-10-08), issues #5 and #6.

## Context

Several brand and status colours in `src/styles/tokens.css` failed WCAG 1.4.3 (AA, 4.5:1):

| Token | Use | Ratio on white |
|---|---|---|
| `--primary` #4ab8a8 | primary buttons (white text), links | 2.41:1 |
| `--text3` #8b95a2 | hints, meta text | 3.03:1 (2.56:1 on `--bg4`) |
| `--success` / `--warning` / `--accent` | status text | 2.28 / 2.15 / 2.43 |

Dark mode also had `--text3` lighter than `--text2`, so the text hierarchy was the wrong way round.

Separately, local `outline: none` rules in the BBOS dashboard, money forms and BBOS task panel won the
cascade over the global `:focus-visible` ring. That left keyboard users with no visible focus (WCAG 2.4.7).

## Decision

- **Two tiers for the brand teal.** `--primary` #4ab8a8 stays for decoration: borders, tints, icons, dots.
  The new `--primary-strong` #227a6e (5.2:1 with white) is for anything that carries text: button fills,
  primary-coloured text and the focus ring.
- **`--text3` darkened to #6b7480** (4.7:1). In dark mode it is #8a837d, now dimmer than `--text2` and
  still 4.5:1 on `--surface`.
- **Text variants for status colours:** `--success-text` #15803d, `--warning-text` #b45309 and
  `--accent-text` #8a6a2c in light mode; lighter equivalents in dark mode. The base status colours stay for
  fills and dots.
- **Focus is never removed, only restyled.** The `outline: none` overrides were deleted or scoped to
  `:focus:not(:focus-visible)`. The global ring uses `--primary-strong`.

## Consequences

- The primary CTA teal is visibly deeper. That is a deliberate brand shift, not a regression.
- New code: text on or in brand colours uses `--primary-strong` or the `-text` variants, never the
  decorative token.
- Some files still declare tokens that don't exist (`--radius-pill`, `--surface-2`, `--text-muted`,
  `--error`, `--accent-muted`). These are left as P3 cleanup.
