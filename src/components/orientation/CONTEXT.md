# Orientation Module — CONTEXT.md

## Purpose
"What to do next" screen at `/app/orientation`. Presents the seven Maqasid pillars as a swipeable **carousel of domain cards** — the weakest domain (by the tier-gated engine) is flagged and centred on entry. Each card shows that pillar's single next step (the next eligible subtask of its most urgent task). Tapping a card opens a **bottom sheet** with the full task, grounding evidence, Why/How, and three non-punitive exits (Mark done / Doesn't apply / Not today). Never shows a flat task list; depth lives in the sheet, breadth is one swipe away.

## File Inventory
| File | Description |
|------|-------------|
| Orientation.jsx | Container — owns `model`/`openPillarId`/`focusPillarId`/`ack` state, `pendingRef`/`dayKeyRef`, wires stores, calls `buildOrientationCarousel` |
| OrientationCarousel.jsx | Scroll-snap track of 7 cards + dot row (position indicator + recommended marker); centres on mount and re-centres on `focusPillarId` |
| OrientationCard.jsx | One domain card (whole card is a `<button>`); Arabic + English pillar, crumb, task, Urgent/High pill, "Now" line, progress bar; "caught up" variant when `!hasEligible` |
| OrientationSheet.jsx | Bottom sheet for one card's step — built on the shared `pp-slideup__*` chrome (portal, focus trap, Escape); Why&how + Evidence accordions + actions; "nothing left today" variant |
| OrientationEvidence.jsx | Lazy-loaded sources accordion (`label`/`defaultOpen` props), wraps `work/SubtaskSources.jsx`; serves as the sheet's **Evidence** section |
| OrientationActions.jsx | 3 action buttons (stateless, callback props) |
| OrientationSheet.css | Sheet content styling; extends `work/ProjectSlideUp.css` (imported after it so the panel overrides win by load order) |
| Orientation.css | Page / header / carousel / card / dots / actions / evidence / empty — token-only (no inline hex) |

## Architecture
```
Orientation (container)
├── header            — eyebrow / title / one-line intent (no streak/date/greeting)
├── OrientationCarousel
│   └── OrientationCard × 7   — one <button> each, onOpen(pillarId)
└── OrientationSheet (portal, only when a card is open)
    ├── Why & how accordion   — subtask why/how or markdown description
    ├── OrientationEvidence    — accordion → lazy SubtaskSources
    └── OrientationActions     — 3 buttons, callbacks only
```

## Store Dependencies
- **project-store**: `projects`
- **task-store**: `tasksByProject`, `toggleSubtask`, `updateSubtask`
- **settings-store**: `valuesLayer` (Islamic vs. universal pillar labels)
- **selector** (`src/data/orientation-selector.js`): `buildOrientationCarousel` → `{ cards, recommendedPillarId }` — pure, no store imports itself; the container passes it store snapshots. (`buildOrientationCarousel` uses `recommendOrientation` internally to derive `recommendedPillarId`, so the flagged card is exactly what the engine would surface.)
- **usePrayerTimes** (`src/hooks/usePrayerTimes.js`): `timings.Maghrib` — the Maghrib string that pivots the Islamic-day key
- **islamic-day-store**: `currentIslamicDayKey` (pure helper, not the Zustand store) — governs "Not today" snooze expiry

## Key Patterns
- **Recompute is effect-driven, not handler-driven.** Actions (Mark done / Doesn't apply / Not today) do NOT call the selector directly — they mutate the store and let the `useEffect` (on `[projects, tasksByProject, maghribRaw]`) rebuild the carousel. This avoids a stale-closure race where a handler-computed model would use a `tasksByProject` snapshot taken before React re-renders. There is no `tick`/override ref anymore — the **carousel itself is the pillar picker**, so a "switch domains" action isn't needed (it's a swipe).
- **Held-task continuity is sheet-level.** The open sheet is keyed by `openPillarId`, not by a task ref. After an action, `pendingRef` carries the acted `{pillarId, taskId, ack, doneAck}` across the store-driven recompute; the effect reconciles it: if that pillar's card still surfaces an eligible subtask of the **same task**, the sheet stays open and simply advances to the next step (ack = "Marked done."); if the task dropped out of eligibility (completed / all snoozed), the effect closes the sheet, sets `focusPillarId = recommendedPillarId` to re-centre the carousel, and shows the completion ack. The pick is stable across recompute because `findFirstEligibleInPillarTier` re-selects the same most-urgent task while it still has eligible work.
- **`dayKeyRef` = the Islamic-day key the current model was built for.** The effect writes it (`computeTodayKey(maghribRaw)`) and feeds it to `buildOrientationCarousel`; `handleNotToday` reads it so a snooze targets the day the user is looking at, not a freshly-recomputed key if Maghrib rolled over between render and tap. Routing the wall-clock value through this ref also keeps the effect's `setModel` clear of `react-hooks/set-state-in-effect` (the value depends on an opaque ref read, not purely on reactive deps — the same shape the rest of the codebase uses).
- **`computeTodayKey` reads the wall clock**, so it is only ever called inside effects/handlers, never the render body (`react-hooks/purity`).
- **Sheet chrome is reused, not rebuilt.** `OrientationSheet` uses the shared `pp-slideup__*` classes (`createPortal` to body, backdrop button, `role="dialog"` + `aria-modal`) and `useFocusTrap(active, onClose)` for focus trap + Escape + focus restore — the same pattern as `ProjectSlideUp.jsx` / `NodePhaseSlideUp.jsx`.
- **Evidence rendering is reused, not rebuilt.** `OrientationEvidence` lazy-imports `work/SubtaskSources.jsx` exactly like `TaskDetailPanel.jsx` (`ChunkErrorBoundary` + `Suspense` + skeleton). The sheet's "Why & how" section reuses the same markdown precedence as `TaskDetailPanel` (why/how → description → empty note).
- **Grounding helpers** (`isSubtaskGrounded`/`deriveSubtaskTier`) live in `src/utils/subtask-grounding.js`, shared with `TaskDetailPanel.jsx` — do not reimplement locally.

## Common Tasks
- Change ranking / priority logic → edit `src/data/orientation-selector.js`, not this folder (pure, unit-tested separately in `src/data/__tests__/orientation-selector.test.js`)
- Add a new sheet action → extend `OrientationActions.jsx` props + wire a handler in `Orientation.jsx` that mutates the store and lets the effect recompute (set `pendingRef` for the ack/continuity)
- Change card face (what a domain card shows at a glance) → `OrientationCard.jsx` + `.orient-card*` in `Orientation.css`
- Change sheet content/layout → `OrientationSheet.jsx` + `.os-sheet*` in `OrientationSheet.css`
- Change pillar label wording → `getPillarLabel`/`getSubmoduleLabel` in `src/data/maqasid.js`, respects `valuesLayer`

## Gotchas
- **No `position: fixed` in this module's own CSS.** The sheet's fixed overlay comes from the SHARED `.pp-slideup__root` chrome (every app slide-up reuses it — it is modal overlay chrome, not page/nav layout). `OrientationSheet.css` adds no new `position:fixed`. The "no position:fixed" rule targets page and `MobileNav` chrome (see project memory), not modal overlays.
- `OrientationSheet.css` is imported AFTER `ProjectSlideUp.css`; the `.os-sheet__panel` height/width overrides win over `.pp-slideup__panel` by source order at equal specificity (same trick `NodePhaseSlideUp.css` relies on). Keep that import order.
- `OrientationEvidence.jsx` imports `../work/TaskDetailPanel.css` for the `tdp-*` classes `SubtaskSources` renders into — a known cross-folder wart, accepted as-is; a future cleanup could relocate `SubtaskSources` + its CSS to `shared/`.
- `timeToMs` (HH:MM string → epoch ms) is duplicated locally in `Orientation.jsx` rather than imported — mirrors existing duplication in `usePrayerTimes.js` and `PropheticPath.jsx`, not a new inconsistency.
- Do NOT add a 4th tile to `MobileNav.jsx` for discovery — its 3-tile bar is intentionally reserved. Discovery is via `Sidebar.jsx` (and the app-home handoff), not a nav tile.
- Streak counter + "welcome back" banner are deliberately deferred (conflict with the locked "no streak/guilt mechanic" decision) — do not add them without revisiting that decision.
