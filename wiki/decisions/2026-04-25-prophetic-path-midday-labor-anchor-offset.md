---
title: "Prophetic Path — anchor offset for labor/transition nodes"
type: decision
date: 2026-04-25
tags: [prophetic-path, timeline, prayer-times, bug-fix]
---

# Prophetic Path — anchor offset for labor/transition nodes

## Context

User reported at 14:00 local (Dhuhr 13:17, Asr 17:08): the right-rail Islamic panel correctly showed **Midday Labor · LINGERING**, but the Prophetic Path timeline still highlighted **Dhuhr Prayers** as `CURRENT` instead of advancing to **Midday Labor / Livelihood & Stewardship**.

Two surfaces had drifted apart on "what's the current node?":

- **Right rail** uses [`inferPhaseForNode()`](../../src/data/prophetic-path-submodules.js) + [`inferNodeFromHour()`](../../src/data/prophetic-path-submodules.js), respecting a 15-minute `PHASE_DURING_MIN` window around each prayer anchor — past that, control passes to the labor node.
- **Timeline** uses [`computeActiveNodeId()`](../../src/components/islamic/PropheticPath.jsx) — picks the node whose anchor is the most-recent past, with no "during" cap.

### Root cause

In `NODE_TIMING` ([PropheticPath.jsx](../../src/components/islamic/PropheticPath.jsx)), both `dhuhr` and `midday-labor` anchored on the same Aladhan key (`Dhuhr`). They produced **identical `diff` values** in `computeActiveNodeId`, and the strict `<` comparison kept the first match — `dhuhr` (iterated before `midday-labor`). So Dhuhr stayed "active" indefinitely until Asr fired at 17:08.

`morning` (Sunrise) and `tahajjud` (Lastthird) anchor on distinct keys, so only `midday-labor` exhibited this collision. The shape, however, would recur for any future labor/transition node placed on the same anchor as a prayer it shadows.

## Decision

Add an optional `offsetMin` field to `NODE_TIMING` entries. Effective anchor = `prayer + offsetMin`, applied only to **comparison math** (active/next/past/upcoming) — not to the displayed time, which remains the prayer's own timestamp via `formatTime12(raw)`.

Set `midday-labor.offsetMin = 15`, mirroring the right rail's `PHASE_DURING_MIN`. After 13:32, midday-labor's effective anchor becomes the most-recent past, so the timeline advances. Before 13:32 (during the 15-min "during" window), Dhuhr still wins.

### Rejected alternatives

- **Tie-break preferring labor nodes** — masks the symptom but leaves equal windows; would also mean Dhuhr never registers as "active" if iteration order shifted.
- **Plug `inferPhaseForNode` into the timeline directly** — bigger refactor; conflates two concerns (which node owns this slot vs. how far into its window we are). Offset is the minimum change that aligns both surfaces.

## Files

- [src/components/islamic/PropheticPath.jsx](../../src/components/islamic/PropheticPath.jsx)
  - `NODE_TIMING['midday-labor']`: added `offsetMin: 15`, with field doc'd above the table.
  - Added `effectiveAnchorMs(spec, timings, today)` helper.
  - `computeActiveNodeId` and `computeNextNodeId` now consume `effectiveAnchorMs(spec, …)` instead of `timeToMs(timings[spec.key], …)`.
  - `deriveNodeTiming` consumes `effectiveAnchorMs` for the `next-soon` / `past` / `upcoming` math; `formatTime12(raw)` left untouched so the displayed Dhuhr time on the midday-labor card is unchanged.

## Verification

- `npm run lint` — clean (legacy ratchet 0, empty-array ratchet 1, inline-refs ratchet 13 — all unchanged).
- `npm test` — 40/40 grounding tests pass.
- Live preview snapshot at 14:00 confirms **MIDDAY LABOR · CURRENT** at the top, **Asr · NEXT**, **Dhuhr Prayers** as a plain past node — matching the right-rail "LINGERING" state.
- `preview_screenshot` unresponsive (continuing pattern); accessibility-tree snapshot accepted as the verifying signal per the in-repo convention.

## Out of scope

- Reconciling the right rail's richer "before / during / after" model with the timeline's flat `active / past / upcoming`. The "LINGERING" state is more nuanced than `CURRENT`; merging the two phase models is a larger change.
- `inferNodeFromHour`'s hard-coded hour buckets (a fallback used only when timings haven't loaded yet).
