---
title: "Prayer node popup consolidated — tasks-only Before/After, the prayer guide inlined into During"
type: decision
date: 2026-07-25
status: accepted
tags: [ui, islamic, prayer, prophetic-path, milos]
superseded_by: null
---

# Prayer node popup consolidated — tasks-only Before/After, the prayer guide inlined into During

## Context

The Prophetic Path node popup ([[2026-07-22-milos-prophetic-path-node-popup]]) opens on any spine node with a Before / During / After pill switch. Two layers had accreted on the six prayer nodes:

- **Before/After** rendered `<PrayerSunnahSummary>` — the per-prayer rawātib card (rakʿah counts, tier pills, hadith sources) *above* the phase task list ([[2026-07-23-milos-prayer-node-sunnah-tabs]]).
- **During** rendered a hand-off card whose *"Open prayer phases"* button opened the separate `PrayerSlideUp` FLN carousel ([[2026-04-21-prayer-slide-up-fln]]).

The operator gave two corrections, in two turns:

1. *"In the popup for the prophetic path for prayers, I only want to see the list of tasks and not the list of prayers."* — remove the Sunnah rawātib summary from Before/After; show the task list alone.
2. *"the during tab should contain the content it currently refers/links to."* — stop handing off; render the actual during-the-prayer guide inline.

The linked during-content is `PrayerHeroDuring` — a self-contained component taking a single `pillarKey` prop (`= node.id`), bringing its own CSS + `PRAYER_SEQUENCES` data (`@data/prayer-sequences`), using only relative/absolute positioning (no viewport-fixed layout). Its default **Reference** mode is a vertical scroll; **Pray-Along** is opt-in. Fajr and Isha have full sequences; the other four render `PrayerHeroDuring`'s own "coming soon" card — the *same* destination the hand-off used to reach.

## Decision

On the six prayer nodes (`fajr`, `dhuhr`, `asr`, `maghrib`, `isha`, `tahajjud`) in [NodePhaseSlideUp.jsx](src/components/islamic/NodePhaseSlideUp.jsx):

```jsx
// During — the prayer itself, inline
body = isPrayerNode
  ? <PrayerHeroDuring pillarKey={node.id} />
  : <MirrorCard … />;               // non-prayer unchanged

// Before / After — tasks only
} else if (isPrayerNode) {
  body = taskList;                  // no CeremonySummary, no PrayerSunnahSummary, no .pp-phase-tasks wrapper
} else {
  body = <><CeremonySummary … /><div className="pp-phase-tasks">{taskList}</div></>;  // non-prayer unchanged
}
```

- **Before/After** on prayer nodes is the bare `taskList`. No `.pp-phase-tasks` wrapper — its separator `border-top` would be stranded at the top of the panel (the body has its own padding). The tab label alone supplies before/after context.
- **During** on prayer nodes is `<PrayerHeroDuring>` inline, replacing the hand-off. Non-prayer nodes keep `MirrorCard` on During and `CeremonySummary` + task divider on Before/After — fully untouched.

### Deletion cascade (operator-approved: *"Delete it"*)

Removing the hand-off orphaned a chain. Six files deleted after grepping each for other importers:

- `PrayerSlideUp.jsx` + `PrayerSlideUp.css` — the hand-off destination, now unreferenced.
- `PrayerLevelPage.jsx` (`src/pages/shared/`) — only `PrayerSlideUp` imported it.
- `PrayerLevelNavigator.jsx` — only `PrayerLevelPage` imported it.
- `PrayerSunnahSummary.jsx` + `PrayerSunnahSummary.css` — orphaned by change #1.

**Kept:** `PrayerHeroDuring` (now consumed *only* by the popup), `ProjectBoard`, `LevelNavigator`, and `PillarLevelPage.css` (shared). The `PRAYER_GUIDE` data and its `getPrayerPhaseSunnah` / `SUNNAH_LEAD` selector in [prayer-seed-tasks.js](src/data/seed-tasks/prayer-seed-tasks.js) are **retained** — they still seed the `prayer_{id}_during` anatomy boards — but are now an unrendered export (their only consumer, `PrayerSunnahSummary`, is gone).

## Rationale

- **Tasks-only Before/After** — the operator wants the popup to be a *task* surface, not a second rendering of prayer-anatomy content that already lives in the During guide and on the `/faith-salah` route. Two cards competing for the same tab was the redundancy; the tab label carries the phase meaning that `PrayerSunnahSummary`'s header used to.
- **Inline During over hand-off** — the hand-off was pure indirection to content the popup could hold directly. `PrayerHeroDuring` is self-contained and positions relatively, so it renders inside the popup's `overflow: auto` body without viewport-fixed breakage; Pray-Along's swipeable cards stay within the panel's `max-height: 88vh`. Net Islamic content in the During tab *increased* — the full rakʿah-by-rakʿah guide is richer than a button.
- **Delete, don't keep dormant** — `PrayerSlideUp` and its two-deep cascade had no other entry point once the hand-off was gone. Leaving them would rot (the [[2026-07-09-milos-prayer-banner-non-blocking]] lesson: dead surfaces keep re-teaching a shape that no longer exists).

## Alternatives Considered

- **Keep `PrayerSunnahSummary`, collapse it below the tasks.** Rejected — the operator asked to *not see the list of prayers*, not to reorder it.
- **Inline the FLN carousel (`PrayerSlideUp`) into During instead of `PrayerHeroDuring`.** Rejected — the carousel's Before/During/After *duplicates* the popup's own tabs; its only non-redundant panel was the During hero, which *is* `PrayerHeroDuring`. Inlining the hero directly drops the whole cloned `PrayerLevelPage`/`PrayerLevelNavigator` stack.
- **Delete `PRAYER_GUIDE`'s Sunnah data too.** Rejected — it still seeds the anatomy boards, it is hadith-graded, and re-surfacing it later (a dedicated Sunnah view) should not require re-authoring. Retained as data, not rendered.

## Consequences

- **`PrayerHeroDuring` is now consumed only by `NodePhaseSlideUp`.** Its previous second consumer (`PrayerLevelPage`'s during branch) is deleted. Recorded in [CONTEXT.md](src/components/islamic/CONTEXT.md).
- **`getPrayerPhaseSunnah` / `SUNNAH_LEAD` are now a retained-but-unrendered export** — dead in the render path, alive as the read model over `PRAYER_GUIDE`. Debt: if no Sunnah surface returns, this selector can be pruned; kept for now because the graded data is valuable and still seeds boards.
- **The `prayer_{id}_during` boards remain empty by design** and are never rendered as a task board — the During tab renders the guide. Documented in [prayer-pillars.js](src/data/prayer-pillars.js) `PRAYER_BOARDS`.
- **The Before/After task-read path is unchanged** — prayer nodes still read `prayer_{id}_{phase}` directly via `buildPrayerPhaseTasks` ([[2026-07-23-milos-prayer-phase-task-boards]]); only the wrapper around `taskList` changed.
- **Both superseded decisions are updated in place** — the sunnah-tabs decision is marked `superseded`; the FLN decision carries a partial-supersede amendment (its cloned components die, its 18 boards / seed model survive).

## Verification

- `npm test` — **94/94**. `npm run build` — **✓ built in 1.82s**, no dangling imports from the six deletions. ESLint on the four changed source files — **0 problems**.
- **`npm run lint` (full composite) fails** on a *pre-existing, unrelated* error: `Date.now()` purity in [Orientation.jsx:42](src/components/orientation/Orientation.jsx) — the in-progress orientation screen ([[2026-07-23-milos-orientation-screen]]), staged on this branch before this work and not touched here. The gates that cover *this* change (ESLint on the edited files, `npm test`, `npm run build`) are green; reported rather than hidden behind the red aggregate.
- **The screenshot tool worked this session** (contrast the [[project-screenshot-hang]] run of 2026-07-23). Preview-verified on a fresh guest profile at `/app/prophetic-path`:
  - **Fajr Before** → task list only ("No tasks queued for this window." in this empty guest store), **no rawātib/Sunnah card**.
  - **Fajr During** → the inline `PrayerHeroDuring` guide ("How to pray Fajr Fard (2 rakʿāt)", Rakʿah 1, opening takbīr with Arabic); **Begin Pray-Along** renders the swipeable posture cards *inside* the panel without viewport overflow, with working Switch-to-Reference / Exit / Prev-Next controls.
  - **Fajr After** → task list only.
  - **Dhuhr During** → `PrayerHeroDuring`'s coming-soon card ("A guided illustration for praying Dhuhr is coming soon. Isha is available today.").
  - **Midday Labor (non-prayer)** → During still `MirrorCard`; Before still `CeremonySummary` (du'a + Surah Al-Ahzab 33:3). Non-regression confirmed.
  - Closing the popup mid-Pray-Along was clean — no Escape double-fire between PrayAlong's exit and the popup's focus-trap `onClose`.

**Amanah:** neutral-to-positive. No capital instrument, no CSA/CSRA/salam/yield-share surface, and **no fiqh authored or removed** — the graded `PRAYER_GUIDE` data stays in the repo, still seeds the anatomy boards, and remains reachable on the `/faith-salah` route. The popup does not genericize the covenant framing: it *deepens* the During tab (full prayer guide inline) and declutters Before/After to the actionable task list the operator asked for.

Uncommitted at time of filing on `feat/desktop-pillar-glyphs`; commit operator-gated.

## Connections

- [[milos]] — the app whose prayer surface this governs
- [[2026-07-22-milos-prophetic-path-node-popup]] — the popup this consolidates
- [[2026-07-23-milos-prayer-node-sunnah-tabs]] — superseded: its `PrayerSunnahSummary` on Before/After is removed
- [[2026-04-21-prayer-slide-up-fln]] — partially superseded: its cloned `PrayerSlideUp`/`PrayerLevelPage`/`PrayerLevelNavigator` are deleted; its 18 boards + seed model survive
- [[2026-07-23-milos-prayer-phase-task-boards]] — the direct-board read the tasks-only tabs still rely on
- [[covenant-architecture]] — the During guide, inlined, keeps the prayer itself at the center of its node
