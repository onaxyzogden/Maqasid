---
title: "Prophetic Path node popup — one Before/During/After entry point per node"
type: decision
date: 2026-07-22
status: accepted
tags: [ui, islamic, prophetic-path, ceremony, milos]
superseded_by: null
---

# Prophetic Path node popup — one Before/During/After entry point per node

## Context

The Prophetic Path spine (`/app/prophetic-path`) carried two competing surfaces per node:

1. **`.pp-satellite` Before / After buttons** attached to each node card, which were the only route to that node's opening and closing thresholds — and which `PropheticPath.css` **hid on every node that was not currently active**. On a timeline whose whole point is the shape of the day, the thresholds were therefore unreachable on almost every node: everything already past, everything still upcoming. The one node you could open a ceremony from was the one you were already standing in.
2. **An inline mirror** rendered directly on the spine under the active node — the day's task/project content expanded in place, which pushed the rest of the timeline down and made the spine read as a feed rather than a day.

`PropheticPath.jsx` had also grown to hold the spine, the mirror, the task cards, the education list, the project rows, and the satellite wiring in one file.

## Decision

**One entry point per node.** Clicking any node card — past, present, or upcoming — opens `NodePhaseSlideUp`, a slide-up panel with a three-tab pill switch: **Before / During / After**, defaulting to **During**.

- **Before** → the opening threshold preview + that phase's tasks
- **During** → the node's own content (`MirrorCard`), or on the six prayer nodes a hand-off card whose "Open prayer phases" button opens `PrayerSlideUp`
- **After** → the closing threshold preview + that phase's tasks

**The spine stays a clean timeline** (operator-chosen from a side-by-side, "Option A"). The inline mirror is gone; the current node is marked only as *now*. All content moved into the popup.

**The ceremony is not rendered locally.** `CeremonySummary` shows a condensed preview (du'a + up to two attributes); its "Begin opening/closing" button sets `openingModuleId` / `closingModuleId` on threshold-store and **closes the popup**, so the globally-mounted `ThresholdModal` in `AppShell.jsx` takes over the screen. Module precedence is `THRESHOLD_MODULE_BY_NODE[node.id] || moduleId || 'work'` — the per-node canonical module wins over the user-selected module group, so the ceremony matches the node's covenant while the module groups still steer the task list.

### Supporting extractions

- **`PropheticPathMirror.jsx`** — `MirrorCard` / `PPTaskCard` / `EducationList` / `ProjectRow` lifted out of `PropheticPath.jsx` so the popup can reuse them without a circular import.
- **`prophetic-path-constants.js`** — `LEVEL_COLOR`, `PRAYER_NODE_IDS`, `THRESHOLD_MODULE_BY_NODE`, `isThresholdTriggerNode`. Imports nothing from either consumer, which is what keeps the cycle broken.
- **`resolveCeremonyData(moduleId, valuesLayer)`** exported from `src/data/islamic/islamic-data.js`. `MODULE_ATTRS` is keyed at **pillar** level, so a sub-module id like `faith-salah` resolves to `null` and must fall back to its parent pillar. The preview and the ceremony must not disagree about what the user is about to see, so the fallback is now one exported function rather than logic re-derived at each call site. Non-BBOS ids only — `bbos:` keys stay `ThresholdModal`'s own concern.

`PropheticPath.jsx` lost 437 lines net; `PropheticPath.css` lost 51.

### The portal is load-bearing, and so is the CSS trick that survives it

`NodePhaseSlideUp` portals into `document.body`. Every rule in `PropheticPath.css` is scoped under `.prophetic-path` — outside that subtree, all of it evaporates. The portal root therefore carries `className="prophetic-path pp-phase-slideup"` plus `data-theme`, and:

```css
.pp-phase-slideup.prophetic-path { display: contents }
```

strips the root's own `100vh` flex box while the custom properties still inherit through it. **Drop either half and the mirror and pill-switch styling silently disappears** — no error, just unstyled content. This is recorded in `src/components/islamic/CONTEXT.md` as a gotcha because the failure mode is invisible.

The corollary: component CSS for popup *content* must be **unscoped** (no `.prophetic-path` ancestor selector) to resolve through the body portal. `CeremonySummary.css` set that precedent.

## Rationale

The satellite buttons failed the feature they existed for. A threshold you can only open from the node you are already inside is not a threshold — the covenant gesture is precisely to mark entering and leaving, including reviewing a window you missed or preparing one that has not arrived. Making the node card itself the entry point restores that for the entire day.

Collapsing to one popup also resolves the mirror's placement question rather than tuning it. The inline mirror and the popup were two answers to "where does node content live"; keeping both would have meant maintaining two layouts of the same data and a spine that changed height on click.

Not rendering the ceremony inside the popup is the same discipline: `ThresholdModal` is mounted once, globally, and owns the screen when a ceremony runs. A second, popup-local ceremony would be a second implementation of the covenant flow.

## Alternatives Considered

- **Keep the satellites and just un-hide them on non-active nodes.** Rejected — it fixes reachability while leaving three surfaces per node (satellites, inline mirror, prayer slide-up) and no single place a user learns to click.
- **Keep the inline mirror alongside the popup** (shown side-by-side to the operator). Rejected by the operator in favour of the clean timeline — duplicate content, and the spine stopped reading as a day.
- **Render `ThresholdModal` inside the popup.** Rejected — the ceremony would be nested inside a dialog inside a portal, and the modal's step/pause state would be scoped to a panel that can be dismissed mid-ceremony.
- **Leave the mirror components in `PropheticPath.jsx` and import from the popup.** Rejected — circular import (`PropheticPath` renders the popup, the popup imports from `PropheticPath`).

## Consequences

- Opening and closing thresholds are reachable from **every** node on the timeline, past and upcoming included.
- Any future component rendered inside the popup must ship **unscoped** CSS, or be nested under `.pp-phase-slideup`. The two-class portal root and `display: contents` must survive refactors of the panel shell.
- `resolveCeremonyData` is now the sanctioned way to resolve module ceremony data with the pillar fallback. Re-deriving the fallback inline is a drift risk — the preview would show one thing and the ceremony another.
- `PropheticPath.jsx` is now a spine renderer plus slide-up orchestration; content lives in `PropheticPathMirror.jsx`. New node content belongs there, not back in the spine.
- The six prayer nodes' Before/After tabs initially rendered an **identical** generic threshold — corrected the same session, see [[2026-07-23-milos-prayer-node-sunnah-tabs]].

## Verification

- Preview-verified in-browser: every node card opens the popup; the three tabs switch; During renders the mirror on non-prayer nodes and the `PrayerSlideUp` hand-off on prayer nodes; Before/After render the threshold preview plus that phase's tasks. Screenshots taken (desktop 1280px and mobile 375px).
- `npm run build` green. Console clean.

**Amanah:** neutral. Navigation and layout of an existing covenant surface — no capital instrument, no CSA/CSRA/salam/yield-share surface. The change *strengthens* the covenant posture by making the opening/closing threshold reachable for windows the user has missed or not yet entered, rather than only the one they are standing in.

Uncommitted on `feat/desktop-pillar-glyphs` at time of filing (see [[2026-07-23-milos-prayer-node-sunnah-tabs]] — the two changes share a working tree).

## Connections

- [[milos]] — the app whose Prophetic Path this governs
- [[2026-07-23-milos-prayer-node-sunnah-tabs]] — the follow-on that replaced the generic threshold on the six prayer nodes
- [[ceremony-gate-pattern]] — the pattern this popup previews and hands off to
- [[covenant-architecture]] — marking entry and exit is the point; the satellites were preventing it
