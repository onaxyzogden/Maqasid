---
title: "MILOS — Full ceremony embedded in the node popup + shared sequential stepper + revert"
type: decision
date: 2026-07-27
status: accepted
tags: [milos, prophetic-path, ceremony, threshold, orientation, stepper, ui]
supersedes:
  - CeremonySummary "doorway, not the door" pattern (component deleted)
  - part of 2026-07-25-milos-prayer-popup-consolidation (Before/After content)
---

# MILOS — Full ceremony embedded in the node popup + shared sequential stepper + revert

## Context

A five-item operator batch on the Prophetic Path node popup and Orientation surfaces,
scoped via AskUserQuestion in-session:

1. "Not today" → **"Not now"** (label only).
2. **Revert**: browsing back to a completed step shows the primary still reading
   **"Completed"** but *enabled*; clicking it un-completes the step (operator: *"first
   option but leave it saying 'completed'"*).
3. **Full interactive ceremony inline** in the node popup's Before/After tabs
   (operator chose over a summary or a modal hand-off), with user-facing
   "threshold" → "ceremony" rename.
4. Remove the **top-level frame lines** from all modules' ceremonies.
5. **All node-popup task lists** become Orientation-style one-at-a-time steppers.

## Decision

### CeremonyFlow extraction (item 3)

The entire 5-step ceremony machine moved verbatim out of `ThresholdModal.jsx` into
**`src/components/islamic/CeremonyFlow.jsx`** (~430 lines): step state, clickable step
tabs, Dua/Attributes/Readiness-Reflection/Closing-Dua/Pause renderers, footer,
citations, `buildReadinessKey` (6-bit), `synthesizeReflectionRows`,
`lookupReadinessAyahByKey`, BBOS `bbos:` handling, pillar fallback
(`rawData ?? pillarData`).

**Contract: stateless toward stores.** Props are `{ moduleId, type, onComplete }`; the
host resets a finished flow by **remounting (key bump)** — the flow never resets its own
step state. Two hosts:

- **`ThresholdModal`** is now a ~90-line wrapper: threshold-store wiring, overlay +
  200ms leaving animation, focus trap, header. All prior entry points (IslamicRail,
  IslamicPanel, CeremonyGate) work unchanged.
- **`NodePhaseSlideUp`** non-prayer Before/After tabs render the flow inline inside a
  `.pp-ceremony-embed` wrapper; `onComplete` → `completeOpening`/`completeClosing` +
  `ceremonyRun` key bump (popup stays open, flow returns to step 0). The old
  `CeremonySummary` preview + "Begin opening" modal hand-off is gone;
  **`CeremonySummary.jsx`/.css deleted** (grep-confirmed single consumer).

The embed styling works because `.thr-*` rules are **flat** (not scoped to
`.thr-modal`) — one stylesheet dresses both hosts; the wrapper only strips horizontal
padding and the inner scroll.

**Rename is presentation-level only.** Titles/copy say "Opening/Closing Ceremony"
(ThresholdModal title, CeremonyGate copy, Settings gate labels). Identifiers stay:
`threshold-store`, `ThresholdModal` filename, `THRESHOLD_MODULE_BY_NODE`,
`disableL1ThresholdGate` — zero migration risk. `resolveCeremonyData`
(islamic-data.js) is now unused by code; kept as a public helper.

### SequentialStepFlow + revert (items 1, 2, 5)

The Orientation sheet's browse-ahead body (preview state, **render-time `syncedTo`
reset** — deliberately not an effect, clamping, viewingCurrent/ahead/behind) extracted
to **`src/components/shared/SequentialStepFlow.jsx`**; `OrientationSheet` delegates to
it, and `NodePhaseSlideUp` uses it for every task list:

- **Prayer Before/After**: `buildPrayerPhaseTasks` stops filtering `completedAt` (the
  stepper shows done pills); sequence via `deriveBoardSequence`. Footer pinned to the
  panel edge (`.pp-phase-detail__footer`).
- **Non-prayer During**: the merged pool renders through MirrorCard's new optional
  `taskContent` prop; each handler reads its row's own `projectId`. The 2026-07-26
  tap-to-drill-in machinery (`detailKey`, back button) is removed — the stepper *is*
  the detail.
- **Revert**: browsing behind shows primary `Completed` **enabled** → `onRevert`
  un-toggles `done` (or clears `notApplicable`); secondaries disabled unless viewing
  current (`OrientationActions` splits `disabled` into
  `primaryDisabled`/`secondaryDisabled`). Orientation acks "Step reopened."; the
  recompute + `syncedTo` reset snaps current back automatically.
- **Semantics change**: the popup's "Not now" is now a **task-level** snooze
  (`updateTask {snoozedUntilDayKey}`), matching Orientation — the old drill-in
  snoozed the subtask.
- Label "Not today" → **"Not now"** (prop names like `onNotToday` stay internal).

### Frame lines (item 4)

`ReadinessCheck` no longer renders the top-level `frame` ("Al-X asks… / Al-X
witnessed…") in either mode (`RCSection`, `RCInteractive`); per-attribute `attrFrame`
questions stay. The `frame:` fields across `islamic-data.js` / `bbos-stage-islamic.js`
are **inert data left in place** (render-level removal is the ratchet) — do not
re-render them without revisiting this decision.

## Consequences

- The ceremony is one implementation with two hosts; fixing a step fixes both.
- Deleted: `CeremonySummary.jsx` + CSS. New build chunk `CeremonyFlow-*.js` (~750 kB,
  the old ThresholdModal chunk's content; pre-existing size warnings unchanged).
- Embedding *reduces* stacked dialogs (the popup no longer opens the modal), shrinking
  the pre-existing deferred Escape-order issue's surface.
- The popup's task-level snooze is a deliberate semantic change, matching Orientation.

## Verification (2026-07-27)

`npm test` **143/143**; `npm run build` ✓; composite `npm run lint` fully green.
Preview walk-through: inline opening ceremony end-to-end incl. pause path
(`bbiz_thr_open` written, flow remounts), inline closing w/ Closing Dua
(`bbiz_thr_close` written), modal entry point still titled "Opening Ceremony", During
stepper, prayer Before stepper (Maghrib) with mark-done advance + revert round-trip,
Orientation revert round-trip, "Not now" label, no top frame line anywhere.
**Screenshot tool failed** ([[project-screenshot-hang]] — "Browser pane is not
compositing frames") — all verification is **live-DOM assertion**, disclosed per
project rule. **Amanah gate:** neutral–positive — UI restructuring of existing halal
ceremony content; no fiqh authored or removed, no capital surface.
