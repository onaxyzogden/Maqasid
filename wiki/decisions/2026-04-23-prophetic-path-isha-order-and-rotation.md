---
title: "Prophetic Path — Isha reorder + current-node rotation"
type: decision
date: 2026-04-23
updated: 2026-04-23
---

# Prophetic Path — Isha reorder + current-node rotation

## Decision

Two changes to `src/components/islamic/PropheticPath.jsx`:

1. **Canonical node order corrected.** Moved `isha` to sit directly after `maghrib` in the `NODES` array. New cycle:
   `maghrib → isha → tahajjud → fajr → morning → dhuhr → midday-labor → asr`
   (previously `isha` was the last entry, appearing after `asr` — broke the temporal narrative of sunset → night prayer → late-night tahajjud).

2. **Spine rotates to put the currently-active node at the top** while preserving the canonical cycle. Implemented as a `useMemo` over `activeNodeId` (already computed by `computeActiveNodeId`):

   ```jsx
   const orderedNodes = useMemo(() => {
     const idx = NODES.findIndex((n) => n.id === activeNodeId);
     if (idx <= 0) return NODES;
     return [...NODES.slice(idx), ...NODES.slice(0, idx)];
   }, [activeNodeId]);
   ```

   Rendering now uses `orderedNodes.map(...)` instead of `NODES.map(...)`. If `activeNodeId` is null (timings not yet loaded) or already first, fallback is the canonical unrotated order.

## Why

- **Narrative correctness:** Isha belongs between Maghrib and Tahajjud. The spine now reads the day as it is actually lived.
- **Ambient orientation:** Before this change the spine always opened on Maghrib regardless of time of day, forcing the user to scroll to find their current window. With rotation, "now" is always first — a glance-read of the spine immediately answers "where am I in the day?"

## Verification

At time of implementation (local 23:11, Isha window active):
- Spine order: `Isha & Rest → Tahajjud → Fajr → Official Start of Day → Dhuhr → Livelihood & Stewardship → Asr → Maghrib`
- `pp-node[data-prayer-state]`: `active, next, past, past, past, past, past, past`
- 8 unique nodes, no duplicate keys in current render

## Scope

Single-file change. `NODE_TIMING`, `PRAYER_ORDER`, `computeActiveNodeId`, `computeNextNodeId`, `deriveNodeTiming`, `inferNodeFromHour` are all `nodeId`-keyed and order-agnostic — no changes needed. CSS untouched.
