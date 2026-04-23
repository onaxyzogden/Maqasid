---
title: "Prophetic Path — pp-intro becomes a two-line Living Anchor"
type: decision
date: 2026-04-23
tags: [prophetic-path, ui, hierarchy, scholar-consult, semantic-reduction]
---

# Prophetic Path — pp-intro becomes a two-line Living Anchor

## Context

The Prophetic Path page opened with a three-line `.pp-intro` block ABOVE the Compressed Ribbon timeline:

1. H2 `The Prophetic Path` — editorial serif, weight 700, 2.25rem
2. Subheading `A daily rhythm anchored in sacred intention.` — decorative prose
3. Location line `Prayer times for <strong>Testville, US</strong>` — the only functional element, rendered as the smallest caption

This competed for the top ~300px with the sacred center of gravity (the active node card with halo + shimmer chips). A Scholar consult (NotebookLM `Modern UI/UX Design Scholar` notebook `995a59d1-…`, turn 9) called the block **"corporate AI mush"** and prescribed **Semantic Reduction** — transition from "page title" to **Living Anchor**.

## Decision (Scholar spec, then user trim)

Scholar's recommended three-line form was:
1. Eyebrow: `Testville, US`
2. Primary: `2h 14m until Asr` (editorial serif 2.25rem, weight 300, −2% kerning — the countdown)
3. Sub-caption: `Fajr 05:42 · Maghrib 18:14` (uppercase, muted gold)

On visual review the user removed the middle countdown line, leaving the **two-line Living Anchor** that now ships:

1. **Eyebrow** (`.pp-intro__eyebrow`) — `cityName` alone, 0.75rem, desaturated grey, 0.05em letter-spacing
2. **Bookends** (`.pp-intro__bookends`) — `Fajr HH:MM AM · Maghrib HH:MM PM`, 0.875rem, uppercase, muted gold (dark theme) / tertiary (light theme)

Rationale for the trim: the countdown repeated information the Compressed Ribbon already carries (the `next` state + "Next" chip + timestamp on the next node). The bookends add day-arc signal the ribbon does NOT carry (what time the day started / will end), so they earn their real estate; the countdown duplicates the ribbon. Scholar's "let the ribbon be the hero" holds; one fewer line gets us there faster.

## Files

- `src/components/islamic/PropheticPath.jsx`
  - Deleted: `<h2 className="pp-heading">`, `<p className="pp-subheading">`, `<p className="pp-location-line">`.
  - Added: `livingAnchor` `useMemo` deriving `{ fajr, maghrib }` via the existing `formatTime12` + `timings.Fajr` / `timings.Maghrib` (hook already hydrated).
  - Added: `.pp-intro__eyebrow` + `.pp-intro__bookends` paragraphs. Intermediate `.pp-intro__countdown` version existed briefly (with a `setInterval` minute tick for live countdown) — removed; no timer remaining.
  - Preserved: `.pp-niyyah-echo` block and the `!timings` location CTA fallback.
- `src/components/islamic/PropheticPath.css`
  - Deleted: `.pp-heading`, `.pp-subheading`, `.pp-location-line` rules (including the 768px H2 bump).
  - Added: `.pp-intro__eyebrow`, `.pp-intro__bookends`. Intermediate `.pp-intro__countdown` rule removed with the JSX.
  - `.pp-intro { margin-bottom: 3rem → 4rem }` — Scholar's ≥64px gap to `.pp-spine` so the "sacred arc" feels captivating.

## Verification

- `npm run build` clean.
- Light theme confirmed via screenshot — two-line block reads as calm anchor, ribbon below carries the page's weight.

## Out of scope

- A real "time until next" microcopy — if reintroduced, belongs ON the `next` node chip, not as a duplicate line in the header.
- Applying the same reduction to other ceremonial pages (Faith overview, prayer slide-ups).
