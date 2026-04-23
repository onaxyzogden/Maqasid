---
title: "Prophetic Path — pp-intro removed entirely (niyyah-echo only)"
type: decision
date: 2026-04-23
tags: [prophetic-path, ui, hierarchy, semantic-reduction]
supersedes: [2026-04-23-prophetic-path-living-anchor]
---

# Prophetic Path — pp-intro removed entirely (niyyah-echo only)

## Context

Supersedes [[2026-04-23-prophetic-path-living-anchor]]. Scholar's prescription had been Semantic Reduction to a two-line Living Anchor (city eyebrow + Fajr·Maghrib bookends). After visual review, the remaining two lines still read as inert header chrome sitting between the TopBar and the Compressed Ribbon. The user's instruction was explicit: remove these elements.

Conclusion: the ribbon IS the page. Any header content above it competes with the sacred center of gravity (active node's halo + shimmer chips). Full Semantic Reduction means the header block goes away entirely.

## Decision

Delete the `.pp-intro` wrapper as a header. Preserve **only** the `.pp-niyyah-echo` block (today's carried intention), and render it conditionally — if no niyyah is set on the Dashboard, nothing renders at all; the Compressed Ribbon starts directly under the TopBar.

## Files

- `src/components/islamic/PropheticPath.jsx`
  - Deleted: `livingAnchor` `useMemo` (Fajr/Maghrib only).
  - Deleted: `.pp-intro__eyebrow` (`cityName`) line.
  - Deleted: `.pp-intro__bookends` (Fajr · Maghrib) line.
  - Deleted: `.pp-location-cta` fallback button.
  - Preserved: `.pp-niyyah-echo` block, now gated on `niyyahPillars.length > 0` — the `.pp-intro` wrapper only exists when there is a niyyah to carry.
  - `usePrayerTimes()` destructure trimmed to `{ timings }` only; `cityName`, `prayerLoading`, `requestLocation` no longer consumed.
- `src/components/islamic/PropheticPath.css`
  - Deleted: `.pp-intro__eyebrow`, `.pp-intro__bookends`, and all three `.pp-location-cta*` rules.
  - Preserved: `.pp-intro { margin-bottom: 4rem }` (still governs the gap beneath the niyyah-echo when present) and the full `.pp-niyyah-echo` block.

## Verification

- `npm run build` clean in 1.07s.
- With no niyyah set, the Prophetic Path page opens directly into the timeline — no header, no title, no city line.
- When a niyyah is set on the Dashboard, the `pp-niyyah-echo` chip bar renders alone above the spine.

## Rationale (why supersede, not amend)

The previous decision still captures the Scholar consult + the countdown experiment, which are useful history if the header is ever reintroduced. Superseding (not editing) preserves the record of the Living Anchor as a valid *intermediate* solution that was ultimately reduced further. If future user research calls for a header again, the Living Anchor spec is the default to revive.

## Out of scope

- Promoting niyyah-echo to other pages (Dashboard already owns its setter).
- Relocating city/prayer-time info elsewhere (Settings is the canonical home if users ask for it).
