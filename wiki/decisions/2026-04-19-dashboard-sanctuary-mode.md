---
title: "Dashboard Sanctuary Mode"
type: decision
date: 2026-04-19
status: accepted
tags: [dashboard, niyyah, ux, focus, cognitive-anchoring]
---

# Dashboard Sanctuary Mode — Niyyah-Driven Focus

## Context

After the Ad-lib Niyyah authoring flow shipped (feeling → pillar → submodule persisted in `threshold-store` and surfaced via [ManifestoBanner.jsx](src/components/dashboard/ManifestoBanner.jsx)), the dashboard itself still treated all eight pillars uniformly. The authored intention had no downstream effect on layout, task visibility, or context. The "Sanctuary" design doc reframed the dashboard as **cognitive anchoring**: chosen submodule as the Sun, other pillars demoted to Stars, tasks filtered to "Today's Deep Work," and a submodule-aware context widget.

## Decision

Extend, don't rebuild. Six-phase revamp layered on top of existing components:

1. **Task schema + backfill** — added `pillarId` / `submoduleId` to task records; one-shot idempotent `backfillPillarFields()` migration via `bbiz_task_pillar_migrated_v1` sentinel; `getFocusTasks(submoduleId)` selector returning `{ deepWork, maintenance }`.
2. **Sun & Stars** — CSS-variable shift: `--dashboard-accent: {primaryPillar.accentColor}` on `.insight` root when niyyah is complete. Primary pillar card gets Sun treatment (tint + glow + 1.2× type); secondary pillars get Stars demotion (reduced opacity on PillarProgressStrip bars).
3. **Guided Task List** — new `FocusTaskList.jsx` with Today's Deep Work (primary) and collapsible "Keep the Lights On" (maintenance with count badge).
4. **Ripple Ring + toast** — `RippleRing.jsx` SVG on Sun card bound to focus-submodule completion %; 2-second-debounced toast *"One step closer to your {pillar.sidebarLabel}"* on Deep Work completion.
5. **Context Widget Slot** — `ContextWidgetSlot.jsx` registry mapping `submoduleId → Widget`. Initial map: `faith-salah → PrayerCountdownWidget` (extracted `useNextPrayer` hook from PrayerOverlay), `intellect-learning → PomodoroWidget`, `life-physical → HydrateWidget`, `wealth-earning → PriorityProjectWidget`; fallback "Focus Tip" card for other submodules.
6. **Evening Reflection** — `niyyahReflection` slice on `threshold-store`; `saveReflection({ feeling, note })` action; `EveningReflectButton` appears when Deep Work completion ≥ 50% OR hour ≥ 18; `EveningReflectModal.jsx` offers the 12-pill ḥāl al-qalb grid for evening feeling. Reflection archived into the same `niyyahHistory` ring-buffer entry as the morning niyyah.

**Day-rollover self-healing (same day — 2026-04-19):** Added `rolloverIfStale` action to `threshold-store` and wired it to Dashboard mount via a dedicated useEffect. If the store's `niyyahDate` is older than today, `archiveStaleNiyyah(get, today)` pushes the entry (with any evening reflection nested) into the history ring buffer, then clears current-day slots in both memory and localStorage. Previously, archival only happened inside `completeNiyyah`, so a user who opened the app without re-authoring niyyah would lose yesterday's reflection — now mount-time rollover is idempotent and safe to call on every Dashboard mount.

**Yesterday's Echo** — morning Niyyah modal step 2 renders a `.niyyah-echo` block when `niyyahHistory` has an entry with yesterday's date. Shows *"Yesterday, you tended to {submodule} with a heart of {morning feeling}."* and, if reflection present, *"You closed the day feeling {evening feeling}."* plus a "Continue the journey" button that prefills the Ad-lib with yesterday's values.

**Level-gating (same day — 2026-04-19):** Two-part earned-unlock system layered onto Sanctuary Mode.

- **Dashboard:** `getFocusTasks(submoduleId, level)` now accepts an optional level argument. `FocusTaskList` resolves an *effective level* — `niyyahLevel` if the user advanced during niyyah, otherwise `getSubmoduleActiveLevel(submoduleId)` (lowest incomplete level). Deep Work is filtered to tasks on `_{core|growth|excellence}` projects matching that level. A pill-shaped `ftl__level` eyebrow chip ("Level 1 · Foundation" / "Level 2 · Growth" / "Level 3 · Excellence") appears in the FocusTaskList header.
- **Niyyah intention setter:** Each submodule chip in the picker displays an inline `niyyah-level-badge` ("L1 · Foundation" etc.) computed from `getSubmoduleActiveLevel`. An "↑ Advance to {NextLevel}" affordance (`niyyah-advance-chip`) appears only when `getPillarLevelProgress(pillarId)[currentLevel]` is true — i.e. every leveled submodule across the entire pillar has 100% complete tasks at that level. Tapping stores the override in local `advanceMap`; selection closes and the next level is used for that submodule this session. `completeNiyyah` now accepts a `level` field; `threshold-store` persists it at `thr_niyyah_level`, clears on rollover/skip, and archives it in `niyyahHistory` entries.

New selectors added to `task-store.js`: `getProjectLevel(projectId)` (exported), `getLevelStatus(submoduleId, level)`, `getSubmoduleActiveLevel(submoduleId)`, `getPillarLevelProgress(pillarId)`.

## Rationale

- **Extend over rebuild** keeps ManifestoBanner, TodayFocusSection, and PillarProgressStrip stable — their roles shift, their APIs don't.
- **CSS-variable accent shift** (not a full theme swap) avoids clashing with hardcoded `--accent` usages elsewhere; scoped to `.insight` root.
- **Task schema backfill via projectId → moduleId → pillarId** is back-compatible: tasks without a resolvable `moduleId` (e.g. `faith_core` cross-cutting) stay unlabeled and fall under "Keep the Lights On" rather than erroring.
- **Idempotent rollover on mount** is the right home for the archival side-effect — it runs once per mount regardless of entry path (fresh page load, navigation back to `/app`, etc.) and is cheap when state is already fresh (early-return on `niyyahDate === today`).

## Consequences

- Niyyah becomes genuinely load-bearing: the sentence the user authors in the morning reshapes task visibility, pillar prominence, and the right-column widget for the rest of the day.
- Morning Niyyah modal now always has continuity signal — if yesterday's entry + reflection exists, it surfaces as an echo with one-tap "Continue the journey" prefill.
- Widget surface area grows — future submodules will need either dedicated widgets or the generic Focus Tip fallback.
- Pomodoro widget state is intentionally non-persistent for v1; documented as known limitation.
- Level progression is earned, not selected — users cannot jump to L2 until the entire pillar completes L1 together. The `sources` submodule (Faith-only, no leveled projects) defaults to L1 badge harmlessly since it has no core tasks.
- `continueYesterday` echo prefill does not restore yesterday's advanced level — user lands on today's computed active level, advance chip is still visible and tappable. Deferred improvement.

## Verification

Phases 1–6 verified via preview_eval + preview_snapshot; rollover verified end-to-end (stale date in localStorage + in-memory store → `rolloverIfStale()` returned true → history gained entry with nested reflection → current-day keys cleared in both memory and localStorage). Echo flow verified at `/app` with seeded 2026-04-18 history entry: morning Niyyah modal step 2 rendered *"Yesterday, you tended to Learning & Literacy with a heart of Yearning. You closed the day feeling Settled tranquility."*

## Connections

- [[milos]] — host project
- [[amanah-gate-protocol]] — niyyah authoring sits upstream of this pipeline
