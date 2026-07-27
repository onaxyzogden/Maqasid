---
title: "Centered popups everywhere + node-popup drill-in adopts Orientation's step UX"
type: decision
date: 2026-07-26
status: accepted
tags: [milos, ui, orientation, prophetic-path, popup, modal, drill-in, shared-components]
superseded_by: null
---

# Centered popups everywhere + node-popup drill-in adopts Orientation's step UX

## Context

Four operator requests followed the shipped orientation carousel ([[2026-07-25-milos-orientation-carousel-redesign]]), all confirmed via AskUserQuestion before planning:

1. **The "Weakest — recommended" badge was clipped.** `.orient-card__flag` sits at `top:-9px` above the card, but `.orient-carousel`'s `overflow-x:auto` forces computed `overflow-y:auto` (CSS spec), so anything above the scrollport is cut — and the track's top padding was only 4px.
2. **Orientation had no desktop layout** — hard-capped at a centred 520px column at all widths (the prior ADR's explicit deferral). Operator picked **carousel + side rail** for >767px: the focused card large in a stage, all seven pillars as a compact vertical rail. **Mobile untouched.**
3. **The Prophetic Path node popup handed task taps off to the full `TaskDetailPanel`** — a heavyweight editing side-panel, jarring from inside a covenant popup. Operator picked **inline detail + 3 actions**: drill into an Orientation-style step view inside the popup (crumb, Now box, Why & how, Evidence, Mark done / Doesn't apply / Not today, Back).
4. **All four `pp-slideup__*` surfaces should be centered modals at every viewport** (ProjectSlideUp, SubmoduleSlideUp, NodePhaseSlideUp, OrientationSheet) — not bottom slide-ups.

**Naming decision:** keep the `pp-slideup__*` class/file names even though the surfaces are now popups — 9 files + docs use the token; a mechanical `pp-slideup → pp-popup` rename is deferred as a separate follow-up commit.

## Decision

**1. Badge fix** ([Orientation.css](src/components/orientation/Orientation.css)): track top padding `var(--space-1)` → `var(--space-3)`, with a comment recording *why* (the flag's −9px overhang + forced `overflow-y` clipping). Shrinking it below ~10px re-clips the badge — recorded as a CONTEXT.md gotcha.

**2. Desktop stage + rail** (new [OrientationSpread.jsx](src/components/orientation/OrientationSpread.jsx), ~70 lines, stateless, no hooks): `Orientation.jsx` gates on `useMobile()` — mobile renders `OrientationCarousel` (zero edits), desktop renders `OrientationSpread`. Selection **is** `focusPillarId` (fallback: recommended → first): rail click → `setFocusPillarId` (swaps the stage, does NOT open the sheet); only the stage card — the unmodified `OrientationCard` — opens the sheet. The container's task-complete re-focus (`setFocusPillarId(recommendedPillarId)`) therefore works identically in both modes with no new logic. Rail renders all 7 pillars in canonical order (stable DOM keeps the clicked button mounted; `aria-current` marks selection). At 768–1023px the rail wraps as chips under the stage via `repeat(auto-fill, minmax(180px,1fr))`; at ≥1024 it is a 236px right column.

**3. Centered popup chrome** ([ProjectSlideUp.css](src/components/work/ProjectSlideUp.css) — the single shared chrome file): root becomes centered flex; panel `width:min(92vw,620px)`, `height:auto; max-height:85vh`, radius 20 all corners, symmetric shadow, entrance `pp-slideup-rise` → `pp-slideup-pop` (fade + 12px rise + 0.98 scale, 240ms). New `.pp-slideup__panel--wide` (`min(94vw,1100px)` × 88vh) for ProjectSlideUp/SubmoduleSlideUp. Consumers slimmed to deltas only: `OrientationSheet.css`'s `.os-sheet__panel` reduces to `max-width:520px`; `NodePhaseSlideUp.css` drops its own height rules. `ProjectSlideUp.jsx`/`SubmoduleSlideUp.jsx` swapped hand-rolled Escape effects for `useFocusTrap`. The load-bearing `.pp-phase-slideup.prophetic-path { display:contents }` portal rule ([[2026-07-22-milos-prophetic-path-node-popup]]) is untouched and survives centering because it is layout-transparent.

**4. Shared step extraction + node-popup drill-in:**
- New [shared/SubtaskStepDetail.jsx](src/components/shared/SubtaskStepDetail.jsx) + `.css` — the Orientation sheet's step body (crumb → task title/progress → tag row → Now box → Why & how → Evidence; `subtask == null` renders the complete state) lifted out **verbatim, class names kept** (`os-sheet__`/`orient-evidence__` prefixes are now historical). Renders a Fragment — the host supplies flex-column + gap. `orientation/OrientationEvidence.jsx` → [shared/SubtaskEvidence.jsx](src/components/shared/SubtaskEvidence.jsx) (git mv; the `../work/TaskDetailPanel.css` wart survives at the same depth, still accepted). `.orient-actions*` CSS moved to its own `OrientationActions.css`. `computeTodayKey` extracted to [src/utils/islamic-day-key.js](src/utils/islamic-day-key.js) (only export; `timeToMs`/`localDayKey` stay module-private).
- [NodePhaseSlideUp.jsx](src/components/islamic/NodePhaseSlideUp.jsx): task tap sets `detailKey = {projectId, taskId}` — a **key, not a snapshot**. Each render re-finds `detailRow` in the fresh `phaseTasks`; `nowSubtask = findNextEligibleSubtask(detailRow, todayKey)`; `taskStats` counts via `isSubtaskSatisfied` (done OR notApplicable). `todayKey` comes from `computeTodayKey(maghribRaw)` in an effect (the sanctioned wall-clock-out-of-render pattern; `PropheticPath.jsx` passes `maghribRaw`). Actions call `useTaskStore` directly: Mark done → `toggleSubtask`; Doesn't apply → `updateSubtask({notApplicable:true})`; Not today → `updateSubtask({snoozedUntilDayKey: todayKey})`. Continuity is free: same key, Now advances on re-render; consuming the last subtask stays in detail showing the complete state (footer hidden, no auto-nav — `toggleSubtask` never sets task `completedAt`, so the row never vanishes mid-view). Tab/module-group switches clear `detailKey`; a row leaving the pool falls back to the list. Crumb: `LEVEL_FULL_LABEL[_level] › _submoduleName` for non-prayer rows; prayer rows carry `_level: null` so the crumb degrades to just the submodule ("SALAH").
- [PropheticPath.jsx](src/components/islamic/PropheticPath.jsx): `selectedTask`/`openTask`/`TaskDetailPanel` plumbing **removed** — it was consumed only by the node popup. `onSelectProject`/`onSelectSubmodule` stay wired.

## Rationale

One step UX, one implementation: the node popup now renders **the same component** the orientation sheet does, so the "what is this subtask, why, and what's the evidence" presentation cannot drift between the two covenant surfaces. The key-not-snapshot drill-in keeps the popup honest against store mutations without any list-level effects — the decorated row is rebuilt each render from `tasksByProject`, so the three actions need no reconciliation plumbing (contrast the orientation container's `pendingRef`, which exists because *its* sheet is pillar-keyed, not task-keyed). Centering the chrome once in the shared file moved all four surfaces in a single edit — the consumers only ever carried deltas.

## Alternatives Considered

- **Hand off to `TaskDetailPanel` as before** — rejected by the operator; a full editing panel is the wrong register inside a covenant popup, and it dropped you out of the Before/During/After context.
- **Snapshot the tapped row into state** — rejected; a snapshot goes stale the moment an action mutates the store, forcing manual reconciliation. The key + re-find derivation gets continuity for free.
- **Per-surface centering overrides** — rejected; the chrome is shared precisely so geometry changes once.
- **`pp-slideup → pp-popup` rename now** — deferred; mechanical, 9-file blast radius, separate commit keeps this diff reviewable.
- **CSS-only desktop layout (media queries over the carousel)** — rejected; the carousel's scroll-snap JS (`centerEl`/`nearestIndex`) must never run against a non-scrolling layout, so desktop conditionally renders a different component via `useMobile()`.

## Consequences

- [ProjectSlideUp.css](src/components/work/ProjectSlideUp.css) is now **the app-wide centered-popup chrome** — geometry changes there move ALL four popups. Recorded in `work/CONTEXT.md` with the override-by-import-order contract.
- `ProjectSlideUp.jsx` currently has **no live UI trigger** (the node popup's projects view was dropped in [[2026-07-25-milos-nonprayer-tasks-to-during]]) but stays wired via `onSelectProject`.
- **Known display mismatch, deferred:** `PPTaskCard`'s list-row done-count counts only `done`, while the drill-in's `taskStats` counts `isSubtaskSatisfied` (done OR notApplicable) — so detail progress can read higher than the list fraction.
- **Stacked-dialog Escape order** (node popup open + drill-in): Escape closes the whole popup, not the drill-in first — deferred, recorded as an `islamic/CONTEXT.md` gotcha.
- Ack toasts in the node popup deferred (the in-place Now advance is the feedback).
- Four CONTEXT.md files updated (`islamic/`, `orientation/`, `work/`, `shared/`).

## Verified

`npm test` **102/102**; `lint:eslint` **0 errors** (1 pre-existing unused-disable warning, IslamicPanel.jsx); `lint:grounding-strict` pass; `audit:inline-refs` 0 (no seed edits). The composite `npm run lint` stays red **only** on the pre-existing environmental `generate:pillar-glyphs:check` Vite SSR RunnerError (`scripts/generate-pillar-glyphs.mjs:273`) — retried at Phase 5 per the operator's "proceed; recheck at Phase 5" decision, still failing, structurally unrelated (no glyph/pillar-data files touched).

**Screenshot-verified** (the tool worked this session), light + dark, mobile + desktop:
- **Mobile 375×812:** badge unclipped; carousel otherwise pixel-unchanged; all four popups centered. Full drill-in flows: **Fajr** (prayer, crumb "SALAH") — Mark done 0/4→1/4 advancing Now in place, Doesn't apply →2/4, Not today snoozing without counting, final Mark done → complete state with footer hidden and **no auto-nav**, Back → list showing the updated fraction; **midday-labor** (non-prayer, crumb "DARURIYYAT › SKILL PROFICIENCY") — Why & how accordion, tab-switch clears the drill-in, accordions reset on step advance. PrayerHeroDuring / MirrorCard / CeremonySummary unchanged.
- **Desktop 1280×800:** orientation stage + rail, rail click swaps the stage (Faith→Health), sheet opens centered from the stage card; Maghrib popup centered with the During guide intact; drill-in complete with footer.
- **Dark:** node-popup drill-in + orientation desktop both flip cleanly through tokens (the app themes off `data-theme`, verified by flipping the attribute on both the root and the portal root, which carries its own copy).
- **~900px band:** rail wraps as chips (3-column auto-fill) under the stage.

Test mutations were preview-localStorage only (Fajr's before-board task consumed; one Wealth subtask done). Uncommitted on `feat/desktop-pillar-glyphs`; commit operator-gated.

**Amanah:** neutral. Presentational/navigational — no seed `sources[]`, fiqh, or capital surface touched; no CSA/CSRA/salam/yield-share. The drill-in *surfaces* existing graded evidence (the Evidence accordion) inside the covenant popup and keeps the three non-punitive exits.

## Connections

- [[2026-07-25-milos-orientation-carousel-redesign]] — delivers that ADR's deferred desktop layout and fixes its badge clip; its sheet is now built on the shared `SubtaskStepDetail`
- [[2026-07-22-milos-prophetic-path-node-popup]] — the popup this drill-in extends; its `display:contents` portal rule preserved
- [[2026-07-25-milos-prayer-popup-consolidation]] / [[2026-07-25-milos-nonprayer-tasks-to-during]] — the tab layouts whose task lists the drill-in now sits behind
- [[milos]] — parent entity
- [[amanah-gate]] — neutral assessment above
