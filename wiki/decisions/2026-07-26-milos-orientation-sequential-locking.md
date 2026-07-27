---
title: "Orientation — Sequential Task/Subtask Locking with Browse-Ahead Preview"
type: decision
date: 2026-07-26
status: accepted
tags: [milos, ui, orientation, sequential-locking, stepper, snooze, tier-ranking]
superseded_by: null
---

# Orientation — Sequential Task/Subtask Locking with Browse-Ahead Preview

## Context

The `/app/orientation` surface — a carousel of 7 Maqāsid domain cards over a proven tier-gated engine ([[2026-07-25-milos-orientation-carousel-redesign]]), later given a desktop stage+rail and a centered popup ([[2026-07-26-milos-centered-popups-node-drill-in]]) — surfaced exactly **one** step per domain and discarded its siblings. `findFirstEligibleInPillarTier` sorted a pillar+tier's tasks by priority-then-`order` and returned a single subtask, so the operator saw a step with **no sense of the ordered chain it sits in**, could not browse ahead, and "Not today" snoozed a single **subtask** rather than setting the task aside.

An operator prototype (`maqasid-orientation-single.html`) + delta spec (`maqasid-locking-update-brief.md`) specified a **sequential locking** model: a domain holds an ordered list of tasks; each task an ordered list of subtasks; **everything is visible, only the true next-incomplete step is actionable.** Browsing ahead is allowed; acting out of order is not. Critically, `task.n` is a **display label only** — sequence is entirely **array order** of `tasksByProject[boardId]`, never sorted or branched on `n`.

Four decisions confirmed with the operator via AskUserQuestion before scoping (approved plan: `.claude/plans/…glowing-parasol.md`):

1. **Task stepper shows a preview of all steps** (browse-ahead), not just the current one.
2. **Lock strictness → task-level snooze**; if no other task in the pillar has its prerequisites met, **switch to a different pillar** (⇒ cross-board-then-cross-pillar fall-through).
3. **Extra chrome (streak counter, welcome-back banner) → out of scope** (still conflicts with the locked no-streak/guilt decision).
4. **Task scope = current-board task chain; prerequisites = sequential by array order.**

**Scope boundary:** the recommendation **engine, tier gate, and card faces** (OrientationCard / Carousel / Spread) stay untouched — the card shape is extended **additively**, and the Prophetic Path node popup must render **byte-identical** (it shares `SubtaskStepDetail`). This is a locking/stepper layer over the existing engine, not a re-rank.

## Decision

**The model & invariants** the engine now guarantees:
- **Board** = a project (`{pillar}_{module}_{level}`); a pillar+tier owns 1+ boards.
- **Task chain** = the board's `tasksByProject[boardId]` array, walked in **array order**; `task.n` is never read for sequencing.
- **Task complete** ⇔ every subtask `isSubtaskSatisfied` (done ‖ notApplicable). **Current task** = first non-complete task (`findIndex`); −1 ⇒ board complete. **Current subtask** = first non-satisfied subtask of the current task.
- **Locked** = any task/subtask after the current one (previewable, not actionable).
- **Task snoozed today** ⇔ `task.snoozedUntilDayKey === todayKey` ⇒ board **not actionable** today. **Board actionable** ⇔ a current task exists **and** it is not snoozed today.
- **Selection** walks a pillar+tier's boards (id-deterministic `localeCompare`) and returns the **first actionable board**; if none are actionable but some are snoozed, the pillar yields nothing → the pillar-ranking loop **falls through to the next pillar**. The necessity-tier triage is preserved (a pillar still at Daruriyyat outranks another's Hajiyat even when the first is fully snoozed).

**Engine** ([orientation-selector.js](src/data/orientation-selector.js)) — new pure helpers `isTaskComplete`, `isTaskSnoozedToday`, `findCurrentTaskIndex`, `findCurrentSubtaskIndex`, `taskPillState(i, cur, task, todayKey)` (done / current | snoozed / locked), `subtaskChipState(i, cur)` (done / current / locked), plus two derivations: `deriveBoardSequence(project, tasks, todayKey) → { projectId, submoduleId, currentTaskIndex, actionable, tasks:[{task,state,letter}] }` and `deriveSubtaskSteps(task) → { currentSubtaskIndex, steps:[{subtask,state}] }`. `findFirstEligibleInPillarTier` was **removed** (grep-confirmed no external consumer) and **replaced** by `findActiveBoardInPillarTier`: walk boards by `id.localeCompare`, skip complete (`currentTaskIndex < 0`), return the first `seq.actionable`, else remember the first snoozed board as a display fallback, else null. `recommendOrientation` keeps its signature + return keys but now requires `found.seq.actionable`, so fully-snoozed pillars fall through. The `buildOrientationCarousel` card is **additive** — every pre-existing key survives (`pillar, tier, ratio, done, total, submoduleId, project, task, subtask, taskStats, hasEligible, isRecommended`) plus `board (=seq)`, `currentTaskIndex`, `currentSubtaskIndex`, `steps`; `hasEligible = !!(board && board.actionable)`.

**Steppers** ([OrientationSteppers.jsx](src/components/orientation/OrientationSteppers.jsx) + [.css](src/components/orientation/OrientationSteppers.css), both new) — `TaskStepper` (lettered pills A, B, C…) and `SubtaskStepper` (numbered chip rail), each with state classes `--done` / `--current` / `--locked` (+ `--snoozed` on the task rail) and a `--previewing` ring, `aria-current="step"` on the previewed item, click → `onPreview(i)`. CSS is **tokens-only** (`--success*`, `--primary-bg2`, `--warning*`, `--border`, `--radius-full`) — no inline hex — so it is light+dark safe.

**Shared guard props** — [SubtaskStepDetail.jsx](src/components/shared/SubtaskStepDetail.jsx) gained two optional render slots `taskStepper = null` (after the crumb) and `subtaskStepper = null` (before the Now box); a host that omits them (the node popup) renders unchanged. [OrientationActions.jsx](src/components/orientation/OrientationActions.jsx) gained `primaryLabel = 'Mark done'` and `disabled = false`, applied to all three buttons.

**Host-owned browse-ahead preview** ([OrientationSheet.jsx](src/components/orientation/OrientationSheet.jsx)) — the sheet owns a `preview {taskIndex, subtaskIndex}` that snaps to the true current step whenever the card advances or a different domain opens. This uses React's **"adjust state during render" reset pattern** (a guarded `setState` in the render body keyed on `` `${projectId} ${currentTaskIndex} ${currentSubtaskIndex}` ``), **not** a `useEffect` — it resyncs synchronously before paint (no mid-chain flash) and avoids the `react-hooks/set-state-in-effect` lint. It derives the previewed task/subtask (clamped into range so a stale index from a longer prior task cannot overrun a shorter one), `viewingCurrent` / `viewingAhead`, the relabeled primary (`Mark done` current / `Complete prior steps` ahead / `Completed` behind), and `disabled = !viewingCurrent`. The two steppers render **only** when the board has >1 task / the task has >1 subtask.

**Container** ([Orientation.jsx](src/components/orientation/Orientation.jsx)) — subscribes `updateTask`; `handleNotToday` now snoozes the whole **task** (`updateTask(project.id, task.id, { snoozedUntilDayKey: dayKeyRef.current })`), while `handleMarkDone` (`toggleSubtask`) and `handleNotApplicable` (`updateSubtask(…,{ notApplicable:true })`) still write to the **true current step** read off `openCard` — the disabled button is a UI guard, the real guard is reading the current step here. The `pendingRef` reconciliation was rewritten for the new card shape: still-eligible + same task ⇒ ack-same; still-eligible + advanced task ⇒ ack-advance; not eligible ⇒ close the sheet, focus `recommendedPillarId` (which itself falls through cross-pillar), ack-close. **No new store action** — the existing `resetDailyCadenceTasks` spreads `...t` (keeps the task snooze) and clears subtask `done` (re-locks the chain correctly on the next Islamic day).

## Rationale

Array order is the spec's explicit reading of "sequence by index, never `n`," and layering locking over the engine (rather than re-ranking) kept the necessity-tier gate as the single source of pillar-selection truth: the gate still picks the pillar, the chain only orders the steps **within** the board it picked. Task-level snooze with cross-board→cross-pillar fall-through means setting a whole task aside never strands the operator — the surface always rolls to the next genuinely-actionable work, and the tier triage is preserved because a fully-snoozed pillar simply yields nothing and the ranking loop moves on. The "adjust state during render" reset (over an effect) is the pattern already proven in this codebase for preview sync; it removes the stale-frame flash a keyed effect would leave. Additive card shape + defaulted guard props kept every existing consumer — the card faces and the node popup — untouched, so no seed `sources[]`/`description` were touched and the grounding ratchets could not move.

## Alternatives Considered

- **Sequence by `task.n`** — rejected; `n` is a sparse display label with gaps and duplicates across seed data, and the spec is explicit that array index is the sequence. Reading `n` would branch on a field never authored as an ordering key.
- **A skip-within-board mode** (snooze one task, surface the next task in the *same* board) — rejected; it would weaken the lock invariant (a later task is reachable while an earlier one is set aside). Cross-board fall-through keeps "one actionable step per board" honest; the `--snoozed` pill state therefore ships **latent** (a snoozed board is skipped, never surfaced) but is kept for model honesty and cheap to style.
- **Subtask-level snooze (the prior behavior)** — rejected per operator decision; "Not today" is about the task, not one step of it.
- **Effect-driven preview reset** — rejected; it repaints a stale frame before the effect fires and trips `react-hooks/set-state-in-effect`. The render-time guarded reset resyncs before paint.
- **Enforcing the lock only in the UI** (disabled button) — insufficient alone; every handler independently reads the true current step off `openCard`, so the lock holds even if a disabled control were bypassed.

## Consequences

- **Selection changed from priority-order to array-order.** A different "next" task can surface than before for a given board. This is intended by the spec and is the one behavior-visible change for existing seeded data.
- **Seed array order is now load-bearing** but was authored as an unordered set, not a dependency chain. Mitigated by full previewability + task-level snooze + fall-through; **seed-order curation is a named follow-up**, not done here.
- The `--snoozed` task-pill state is **unreachable in normal flow** (documented above) — kept deliberately, not dead code to be pruned.
- `SubtaskStepDetail` now has two optional slots; the **node popup passes neither and is byte-identical** (recorded in [shared/CONTEXT.md](src/components/shared/CONTEXT.md)). The step UX cannot drift between the orientation sheet and the popup because both consume the one component.
- `findFirstEligibleInPillarTier` is gone; `findActiveBoardInPillarTier` is its replacement (both engine-internal).

## Verified

`npm test` **142/142** (5 files) — `orientation-selector.test.js` drops the old priority-order + `findFirstEligibleInPillarTier` cases and covers every new helper, `findActiveBoardInPillarTier` (actionable-first / skip-complete / skip-snoozed / snoozed-fallback / null-when-exhausted), array-order selection, fully-snoozed-pillar **cross-pillar fall-through**, and the new card fields. Composite `npm run lint` **green across all four gates** — `lint:eslint` 0 errors, `lint:grounding-strict` pass (prayer 87/87, all 8 pillars conform, 0 empty-array under ratchet 0), `audit:inline-refs` 0 ≤ 0, and `generate:pillar-glyphs:check` up-to-date (41 glyphs) — the last now hermetic since [[2026-07-26-milos-mojibake-repair-glyphs-loader-fix]], so this is a fully-green composite. `npm run build` ✓ **1.28s** (only the pre-existing `auth-store` INEFFECTIVE_DYNAMIC_IMPORT + >500 kB chunk-size warnings, both unrelated).

> [!warning] Screenshots could not be captured this session
> The [[project-screenshot-hang]] recurred ("Browser pane is not displayed, so the page is not compositing frames") — verification was **live DOM (accessibility tree) + `localStorage` inspection via `javascript_tool`**, and this is stated plainly per the operator's screenshot-honesty rule. To reach both steppers, all seven pillars were seeded in the **fresh, isolated preview browser** by navigating the ungated `-core` routes (12 Health boards, each 5 tasks); this is throwaway preview state, not the operator's real MILOS data. Orientation picked `health_mental_core` (first by `localeCompare`) as the Health card's board.

Live walkthrough (all load-bearing behaviors proven):
- **Both steppers render** — Task pills A–E (A = current+previewing, `aria-current="step"`; B–E locked), Subtask chips 1–5 (1 = current+previewing; 2–5 locked); crumb `Necessities › Mental Well-being`; task title *"Establish a morning routine: Fajr → Quran (minimum 1 page) → morning adhkar → journal"* (arrows render clean — no mojibake); progress 0/5; three **enabled** actions.
- **Locked subtask preview** (chip 3) → locked+previewing, primary relabeled **"Complete prior steps"**, all three disabled; the Now box shows step 3's content.
- **Locked task-pill preview** (pill B) → jumped to task B, chips reset (chip 1 current+previewing), all disabled.
- **Return to current** (pill A) → re-enabled, primary back to **"Mark done"**.
- **Mark done** → **advance-in-place**: chip 1 → done (Check glyph), chip 2 → current+previewing, Now advanced, progress **1/5**, sheet **stayed open**.
- **Not today** → `localStorage` proof: `tasks_health_mental_core[0].snoozedUntilDayKey === "2026-07-26"` on the **task**; all `subtasks[].snoozedUntilDayKey` null (snooze is task-level, not subtask). **Cross-board fall-through**: the sheet rolled to `health_physical_core` (crumb `Necessities › Physical Health`, 0/5).
- **Doesn't apply** → `tasks_health_physical_core[0].subtasks[0]` = `{ notApplicable:true, done:false }`; chip 1 → done, progress 1/5; ack toast captured via MutationObserver: *"Marked doesn't apply."*, tone `orient-ack--neutral`.
- **Board-completion close+refocus** (ack-close) and **cross-pillar** fall-through are **unit-covered** in the selector suite (expensive to drive live); noted honestly as tested by unit, not by live walkthrough.

**Amanah assessment — neutral.** UI sequencing over existing halal task data: no capital / sale / riba / gharar / CSRA / salam / yield-share surface, and the Maqasid tier triage (Daruriyyat → Hajiyat → Tahsiniyat) + pillar framing are preserved unchanged. The one substantive concern — imposing a possibly-arbitrary order on seed tasks not authored as a dependency chain — is mitigated by full previewability, task-level snooze, and fall-through; deliberate seed-order curation is a flagged follow-up. Uncommitted on `feat/desktop-pillar-glyphs`; commit operator-gated.

## Connections

- [[2026-07-25-milos-orientation-carousel-redesign]] — the carousel + engine this locking layer sits on; its tier gate and effect-driven recompute are extended, not replaced
- [[2026-07-26-milos-centered-popups-node-drill-in]] — introduced the shared `SubtaskStepDetail` this feature added guard-prop slots to, and the desktop stage+rail the steppers now render inside
- [[2026-07-23-milos-orientation-screen]] — the original surface; its system-wide tier gate and real-snooze semantics remain in force (snooze is now task-level)
- [[2026-07-26-milos-mojibake-repair-glyphs-loader-fix]] — made `generate:pillar-glyphs:check` hermetic, so this session's composite `npm run lint` is fully green
- [[milos]] — parent entity, `/app/orientation` route
- [[maqasid-al-shariah]] — the seven pillars whose task chains are now sequentially locked
- [[amanah-gate]] — Amanah assessment **neutral**: presentational sequencing, authors no fiqh, no capital/sale/riba/gharar surface
- [[project-screenshot-hang]] — the recurring environment limitation that **recurred** this session; verified by DOM + localStorage instead
