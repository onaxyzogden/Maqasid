---
title: "Orientation Redesign — Carousel of 7 Maqāsid Cards + Bottom Sheet"
type: decision
date: 2026-07-25
status: accepted
tags: [milos, ui, orientation, carousel, bottom-sheet, tier-ranking, priority]
superseded_by: null
---

# Orientation Redesign — Carousel of 7 Maqāsid Cards + Bottom Sheet

## Context

User testing found the shipped `/app/orientation` surface from [[2026-07-23-milos-orientation-screen]] hard to act on: the *ladder + balance-strip* layout put all seven pillars and the full 5-rung breadcrumb on screen at once — everything visible, nothing telling you what to do **next**. The operator shared a prototype (`~/Downloads/maqasid-orientation-sheet.html`) + handoff (`maqasid-orientation-handoff.md`) proposing a **carousel of 7 domain cards** (the weakest centred and flagged, the other six one swipe away) with all depth — full task, grounding evidence, Why/How, actions — moved into a **bottom sheet**.

The pivotal exploration finding: the recommendation **engine** this describes already shipped in the 2026-07-23 ADR (a pure, unit-tested, tier-gated `orientation-selector.js`). So this session is a **UI reskin over a proven engine**, not a green-field build. Several of the prototype's "open questions" were already **locked**: the prototype ranks by flat `done/total`, which the engine deliberately rejected for a hard necessity-tier gate; the "Task 01/02/03" number has no backing field (it is `order`, and `priority` is the real signal); sheet a11y is already solved by the shared `ProjectSlideUp`/`NodePhaseSlideUp` chrome + `useFocusTrap`.

Four decisions confirmed with the operator via AskUserQuestion before scoping (approved plan: `.claude/plans/…glowing-parasol.md`):

1. **Redesign in place, reuse the engine** — reskin the standalone route, do not rebuild the selector.
2. **Defer the streak counter + "welcome back" banner** — they conflict with the locked *no streak/guilt mechanic* decision and need gap-detection logic that does not exist.
3. **Extend the engine for priority-aware task selection** — the weakest *pillar* is still tier-gated, but within it the *most urgent task* should lead.
4. **Mobile-first, centred ~520px column** — defer a genuine wide-viewport desktop layout.

**Scope boundary:** only the standalone `/app/orientation`. `Dashboard.jsx` / the `/app` home index were **not** touched, and orientation was **not** made the home (the handoff's "replaces the home view" premise refers to the Sidebar/pillar-dashboard backlog, not the curated Dashboard; orientation is standalone by the prior ADR's decision #1).

## Decision

**Engine extension** ([orientation-selector.js](src/data/orientation-selector.js)):
- `PRIORITY_RANK = { urgent: 0, high: 1, medium: 2, low: 3 }`. `findFirstEligibleInPillarTier` now walks a pillar+tier's tasks sorted by `(PRIORITY_RANK[priority] ?? 9)` **then** authored `order` (was `order` only) — spec §4's "most urgent task." Project iteration stays id-deterministic (`localeCompare`) so identical state always recommends the same subtask.
- New `buildOrientationCarousel({ projects, tasksByProject, todayKey }) → { cards, recommendedPillarId }`. `cards` is the seven `MAQASID_CORE_PILLARS` in **canonical order** (stable, like the old balance strip), each `{ pillar, tier, ratio, done, total, project, task, subtask, taskStats, hasEligible, isRecommended }` built by reusing the existing `getPillarActiveTierRatio` + `findFirstEligibleInPillarTier`. `recommendedPillarId` is derived from `recommendOrientation({...}).pillar?.id`, so the flagged card is **exactly** what the engine would surface — inheriting its tier fall-through (if the weakest pillar has nothing eligible today, the flag moves to whichever pillar actually gets recommended; `null` flags nothing).

**Components** ([src/components/orientation/](src/components/orientation/)) — `OrientationLadder` and `OrientationBalanceStrip` retired; three new, two reused:
- `OrientationCarousel.jsx` — horizontal scroll-snap track (one card centred, ~11% neighbours peeking) + a dot row that is both position indicator and recommended marker; centres on mount and re-centres on `focusPillarId`.
- `OrientationCard.jsx` — the whole card is one `<button>`: Arabic (`pillar.arabicRootAr`) + English (`getPillarLabel`) name, `done/total`, crumb (`TIER_META` label › `getSubmoduleLabel`), 2-line task title, priority pill, "Now" subtask line, progress bar. Recommended variant (accent border + "Weakest — recommended" flag + accent bar); a calm "caught up" variant when `!hasEligible`.
- `OrientationSheet.jsx` — bottom sheet built on the **shared** `pp-slideup__*` chrome (`createPortal` to `<body>`, backdrop, `role="dialog"` + `aria-modal`) + `useFocusTrap(active, onClose)` for focus trap / Escape / focus restore, exactly as `ProjectSlideUp`/`NodePhaseSlideUp`. Bilingual header, crumb, task + progress, tag row (priority + Amanah tier badge + Grounded/Ungrounded via `deriveSubtaskTier`/`isSubtaskGrounded`), a "Now" box, **Why & how** + **Evidence** accordions (both collapsed each open, keyed by `subtask.id`), and a three-action footer. A "Nothing left in {pillar} today" variant when the held task runs out.
- `OrientationEvidence.jsx` reused unchanged (lazy `work/SubtaskSources.jsx`). `OrientationActions.jsx` trimmed **4 → 3** (Mark done / Doesn't apply / Not today) — **"Something else" dropped: the carousel *is* the pillar picker.**

**Container** ([Orientation.jsx](src/components/orientation/Orientation.jsx)): the effect-driven recompute is preserved (a `useEffect` on `[projects, tasksByProject, maghribRaw]` mutates → rebuilds via `buildOrientationCarousel`, never handler-derived — avoids the documented stale-closure/async-preload race). Held-task continuity is now **sheet-level**: the open sheet is keyed by `openPillarId`; `pendingRef` carries an action's `{pillarId, taskId, ack, doneAck}` across the store-driven recompute, and the effect reconciles it — same task still eligible → sheet advances in place ("Marked done."); task dropped out → close, `focusPillarId = recommendedPillarId` re-centres, completion ack. `dayKeyRef` (Islamic-day key the model was built for) routes the wall-clock read out of render and gives `handleNotToday` a stable snooze target. The prior `tick`/`overrideRef` one-shot is **gone** — swiping replaced "Something else."

## Rationale

Reuse over rebuild kept the change UI-only. The engine stays the single source of ranking truth: **the necessity-tier gate picks the pillar; priority is only a within-tier/within-pillar tiebreak.** Verified live — with all seven pillars seeded, **Health** (0/96 — the weakest active-tier ratio) was flagged "Weakest — recommended," chosen over Faith (1/139) by *ratio*; its leading task happens to be *urgent* and Intellect's *high*, so the pillar was picked by tier-gate weakness while priority only ordered the task **within** Health — exactly as designed (see the screenshot in *Verified* below). Reusing the shared slide-up chrome + `useFocusTrap` inherited solved a11y instead of re-deriving the prototype's bespoke sheet. No seed `sources[]`/`description` were touched, so the grounding ratchets could not move.

## Alternatives Considered

- **Prototype's flat `done/total` ranking** — rejected, same reason as the prior ADR: it blends tiers, so a pillar finished with its obligatory work but open on nice-to-haves would outrank one still missing Necessities. Keep the hard tier gate.
- **Prototype's bespoke bottom sheet** — rejected; reusing `pp-slideup__*` + `useFocusTrap` gives portal/focus-trap/Escape/`aria-modal` for free and keeps one modal implementation.
- **Streak counter + "welcome back" banner** — deferred; conflicts with the locked *no streak/guilt mechanic* decision and needs gap-detection that does not exist.
- **Making orientation the home / touching `Dashboard.jsx`** — rejected as out of scope; orientation is standalone by the prior ADR.
- **Genuine desktop layout** — deferred; mobile-first centred 520px column now, wide-viewport later. **Delivered next session** as a stage + side-rail layout — see [[2026-07-26-milos-centered-popups-node-drill-in]].

## Consequences

- The carousel is the pillar picker, so no override ref/state remains — simpler container.
- `OrientationSheet.css` **must** be imported after `ProjectSlideUp.css`; its `.os-sheet__panel` height/width overrides win over `.pp-slideup__panel` by source order at equal specificity (same trick `NodePhaseSlideUp.css` uses). Recorded in [CONTEXT.md](src/components/orientation/CONTEXT.md).
- `OrientationEvidence.jsx` still imports `../work/TaskDetailPanel.css` for the `tdp-*` classes `SubtaskSources` renders into — the cross-folder wart from the prior ADR persists; future cleanup would relocate `SubtaskSources` to `shared/`.
- `MobileNav.jsx` stays a 3-tile bar — **no 4th tile for orientation** (its code comment + project memory reserve it); discovery stays via `Sidebar.jsx`.
- Streak/"welcome back" gap-detection remains deferred; revisiting it means revisiting the no-streak decision.
- **Surfaced but out of scope:** verifying the seeded Health pillar exposed pre-existing UTF-8/cp1252 **mojibake** — corrupted `→` arrows (`â†'`), apostrophes, dashes — **485 occurrences across 3 data files** (`src/data/seed-tasks/health-seed-tasks.js` 388, `src/data/ayat/health-readiness-ayat.js` 87 ⚠️ Qur'an-verse data, `src/data/niyyah-feelings.js` 10). It renders prominently now only because Health happened to be the recommended pillar; the corruption predates this work and this plan excluded all seed/data edits. Flagged as a separate background task (`task_2e56b6bf`) with a covenant-aware brief (restore from git history, human review on the ayat file). See [[project-seed-mojibake]].

## Verified

`npm run build` green; `npm test` **102/102** (extends `orientation-selector.test.js` with priority-before-order selection and `buildOrientationCarousel` shape/recommendation coverage); `npm run lint` green across all three gates — `lint:eslint` 0 errors, `lint:grounding-strict` pass, `audit:inline-refs` 0 (no seed edits, so ratchets held). This also clears the pre-existing `Date.now()` purity error that the prior orientation ADR left reddening the composite gate — the rewritten container keeps every wall-clock read inside effects/handlers behind `dayKeyRef`.

**The screenshot tool worked this session** — a notable contrast to the recurring [[project-screenshot-hang]] that blocked the prior orientation ADR and several prayer sessions this month (root cause confirmed as pane-visibility-dependent, not code). Captured **three** shots: the carousel in **light** mode (Health centred + flagged "Weakest — recommended", 0/96, URGENT; Faith 1/139 and Intellect HIGH peeking; 7 dots), the open **Health sheet** (green swatch + حفظ النفس / HEALTH, `NECESSITIES › MENTAL WELL-BEING`, task + 0/5, URGENT/Bayyinah/Grounded tags, Now box, collapsed accordions, three-action footer), and the carousel in **dark** mode (every colour flipping cleanly through tokens — dark surfaces, gold flag, green/amber accents, no light-mode bleed). DOM/behavior verification corroborated: 7 cards in canonical order with correct Arabic preservation-phrases, recommended = weakest by tier gate (not priority), dot tracking, sheet focus-trap + Escape close with focus restore, Mark-done recompute + held continuity (progress `0/3 → 1/3`, success ack), evidence lazy-load with real grounding (a Qarina-tier note on Hajj's ability condition), **0 console errors** throughout.

All seven pillars were seeded in the **fresh, isolated preview browser** by navigating each pillar's ungated `-core` route (and `pillar/ummah` after setting its ceremony-open flag) to trigger the per-pillar `ensure*Projects` store actions — 96 projects total. This is preview-only state (the browser started empty but for `bbiz_schema_version`), **not** the operator's real MILOS data.

> [!note] Amended 2026-07-26
> Three items evolved in [[2026-07-26-milos-centered-popups-node-drill-in]]: (1) the deferred **desktop layout** shipped as `OrientationSpread` (stage + 7-row rail, gated by `useMobile()` — the carousel is untouched); (2) the "Weakest — recommended" flag's **clipping** (the track's 4px top padding vs. the −9px overhang under forced `overflow-y`) was fixed by raising the padding to `var(--space-3)`; (3) the sheet is **no longer a bottom sheet** — the shared `pp-slideup__*` chrome became a centered popup at every viewport, and the sheet's step body was extracted to `shared/SubtaskStepDetail` (also consumed by the Prophetic Path node popup). `OrientationEvidence.jsx` moved to `shared/SubtaskEvidence.jsx`. Everything else here — engine, tier gate, continuity, 3 actions — stands.

## Connections

- [[2026-07-26-milos-centered-popups-node-drill-in]] — the follow-on that delivered the deferred desktop layout, fixed the badge clip, centered the sheet, and shared its step internals
- [[2026-07-23-milos-orientation-screen]] — the surface this **partially supersedes**: the ladder+strip UI and "Something else" override are retired; that ADR's engine, system-wide tier gate, real-snooze semantics, and effect-driven recompute all remain in force (and are extended here).
- [[milos]] — parent entity, `/app/orientation` route
- [[maqasid-al-shariah]] — the seven pillars the carousel presents
- [[amanah-gate]] — Amanah assessment **neutral-to-positive**: presentational/navigational, surfaces existing graded evidence, authors no new fiqh, no capital/CSA/CSRA/salam/yield-share surface
- [[project-screenshot-hang]] — the recurring environment limitation that did **not** recur this session
- [[project-seed-mojibake]] — pre-existing data-integrity finding spotted during verification, flagged out-of-scope (`task_2e56b6bf`)
