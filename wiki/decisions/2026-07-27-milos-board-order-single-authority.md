---
title: "One Board-Ordering Authority — `orderBoardTasks` Everywhere, and Drag That Tells the Truth"
type: decision
date: 2026-07-27
status: accepted
tags: [milos, ordering, kanban, dnd-kit, refactor, orientation, seed-tasks]
superseded_by: null
---

# One Board-Ordering Authority — `orderBoardTasks` Everywhere, and Drag That Tells the Truth

## Context

[[2026-07-27-milos-seed-order-curation]] closed with a flagged, untouched wart: *"drag-reordering a
seeded task on the kanban writes `order`, but seeded boards sort by `seedOrder`, so the drag has no
lasting effect."* Taking it exposed a second defect the curation ADR had unknowingly claimed to have
fixed.

**1. The phantom drag.** `moveTask()` ([task-store.js:113](src/store/task-store.js:113)) renumbers
`order` across the whole target column and never reads or writes `seedOrder`. Every read-side sort
prefers `seedOrder`. So dragging a seeded card within its column snapped back **on the next render** —
no reload needed. The operator was shown a capability that did not exist.

**2. Seven comparators, two different answers.** The comparator was duplicated in **seven** places,
and the six component copies used `seedOrder ?? order` while `orderBoardTasks` uses
`seedOrder ?? 1e6 + (order ?? index)`. A **user-created** task (no `seedOrder`) therefore sorted with
a key like `3` on the kanban — i.e. **interleaved into, or ahead of, the curated chain** — but with a
key of `1000003` in the orientation chain, i.e. after it. That is precisely the kanban/chain
divergence the curation ADR stated it had closed; it was closed on one surface only.

`task-store.getTasksByColumn` (lines 50–55) turned out to have **zero callers** — `KanbanBoard`
declares a local function of the same name — so it was a seventh copy that could never be reached.

## Decision

### 1. `orderBoardTasks` is the only task comparator in the app.

It already existed and was already tested
([orientation-selector.js:106](src/data/orientation-selector.js:106)). All ad-hoc copies now route
through it:

| Site | Was | Now |
|---|---|---|
| [KanbanBoard.jsx](src/components/work/KanbanBoard.jsx) | `(a.seedOrder ?? a.order) - …` | `orderBoardTasks(tasks.filter(t => t.columnId === columnId))` |
| [ListView.jsx](src/components/work/ListView.jsx) | same copy | same pattern |
| [StageSidebar.jsx](src/components/work/StageSidebar.jsx) | `?? a.order ?? 0` variant | same pattern |
| [PillarLevelDashboard.jsx](src/components/work/PillarLevelDashboard.jsx) | same copy | same pattern |
| [ProjectBoard.jsx](src/components/work/ProjectBoard.jsx) | `(a.seedOrder ?? 999)` | same pattern |
| [BbosTaskPanel.jsx](src/components/bbos/BbosTaskPanel.jsx) | stage key, then `?? 999` | **stage stays the primary key**: group by stage → `orderBoardTasks` each group → flatten, so the *within-stage* comparator is identical to every other surface |
| [task-store.js](src/store/task-store.js) `getTasksByColumn` | dead duplicate, 0 callers | **deleted** |

Net effect: a user-created task lands **after** the curated chain on every surface, matching the
orientation chain instead of contradicting it. BBOS boards are equal-or-better off — their tasks all
carry `seedOrder` via `backfillBbosOrder()`, so the `?? 999` branch was already unreachable there.

### 2. Drag stops lying, without losing a real capability.

In `handleDragEnd`, when the dragged task is seeded (`typeof draggedTask.seedOrder === 'number'`)
**and the drop stays in its current column**, `moveTask` is not called; the refusal is reported
instead. **Cross-column drag (To Do → In Progress → Done) is untouched** — that is a real state
change and still works. User-created tasks keep full drag, and now their `order` actually governs
their position on every surface.

Only one drag surface exists — `KanbanBoard`, behind an off-by-default "Enable drag" toggle. ListView,
StageSidebar and PillarLevelDashboard have no drag.

### 3. The refusal reports through the shared portaled `Toast`, not a local fixed element.

**Found by preview verification, and worth recording as a trap.** The refusal was first implemented as
a bespoke `position: fixed` toast inside `KanbanBoard`. It rendered — and landed at **y ≈ 1258 in an
820 px viewport**, i.e. ~440 px below the fold, invisible. Cause: **`.pb-content__layer` sets a
`transform`, which makes it the containing block for `position: fixed` descendants.** An identity
matrix (`matrix(1,0,0,1,0,0)`) is enough to do this; only `transform: none` is not.

So the refusal now calls `addToast({ type: 'info', duration: 4000, … })` on the existing
[toast-store](src/store/toast-store.js), rendered by `<Toast />` in `AppShell`, which
**`createPortal`s to `document.body`** and therefore escapes the transformed ancestor. This deleted a
hand-rolled `useState` + `useRef` timer + cleanup effect and ~40 lines of CSS. The `.istiqamah-toast`
stack is *not* a counter-example: it is mounted outside `.pb-content__layer`.

Copy: *"This task's place in the sequence is set by the board's guided order. You can still move it
between columns."* — it names what governs and what the operator **can** still do, rather than
mentioning the seed file, which is not a surface they have.

## Consequences

- Curated `seq` is now genuinely the single source of truth for order on seeded boards; there is no
  second write path that appears to compete with it.
- **Seeded cards can no longer be reordered from the UI at all.** Deliberate: re-ordering a curated
  chain is a seed-file edit under the [[2026-07-27-milos-seed-order-curation]] rubric, reviewed as
  content, not an ad-hoc drag. The trade is that an operator who *wants* a different order has no
  in-app route to it — accepted, and flagged as revisitable if it chafes.
- A future author adding a task-sorting surface should import `orderBoardTasks` rather than write
  `a.seedOrder - b.seedOrder`; the CONTEXT.md files for `work/` and `orientation/` now say so.
- **Trap recorded:** `position: fixed` inside `.pb-content__layer` does not do what it says. Portal to
  `document.body` (or use the shared `Toast`).

## Verification

- `npm test` **180/180**; `npm run lint` composite green; `npm run build` ✓ (pre-existing chunk-size
  and dynamic-import warnings only).
- **Preview, on `/app/work/ummah_community_growth` with drag enabled.** Driving dnd-kit from the
  automated browser initially failed at every attempt — the live region read *"Dragging was
  cancelled"* mid-gesture. Diagnosed rather than worked around: **the Browser pane emits spurious
  `visibilitychange` events, which dnd-kit binds to `handleCancel`.** Swallowing that event in the
  capture phase at `window` for the duration of the gesture (test harness only — no app code changed)
  let the real gesture run.
  - **Same-column drag of a seeded card** (card 02 → position 04): toast appears with the exact copy,
    at `(496, 591)` in a 900×700 viewport — **on screen**, portal parent `BODY`; the board still
    renders `01…06` in curated order; `localStorage` byte-identical before and after. Screenshot
    captured.
  - **Cross-column drag** (sulh, To Do → In Progress): **works** — column counts go 6/0/0 → 5/1/0, the
    row's `columnId` becomes `…_in_progress`, and **no** toast is shown. Storage restored from a
    snapshot afterwards so the operator's board was left exactly as found.
- The earlier bespoke-toast bug was caught by this same preview step, which is the argument for the
  step existing.

## Amanah Gate

**Neutral.** Refactoring ordering logic and removing a misleading affordance in already-halal task
content. No fiqh authored, no revelation text touched, no capital surface. Itqan and honesty: the app
no longer shows the operator an action that silently does nothing.
