---
title: "Orientation Screen — Single-Recommendation 'What's Next'"
type: decision
date: 2026-07-23
status: accepted
tags: [milos, ui, orientation, tier-ranking, faith-salah]
superseded_by: null
---

# Orientation Screen — Single-Recommendation "What's Next"

> [!note] Partially superseded 2026-07-25 by [[2026-07-25-milos-orientation-carousel-redesign]]
> The **UI** described below — the `OrientationLadder` 5-rung breadcrumb, the `OrientationBalanceStrip`, and the "Something else" pillar override — was replaced by a carousel of 7 domain cards + a bottom sheet after user testing found this layout hard to act on. **Everything else in this ADR remains in force and was extended, not reversed:** the pure `orientation-selector.js`, the system-wide necessity-tier gate, the real-snooze (`snoozedUntilDayKey`) semantics, the `notApplicable` field, effect-driven recompute, and reuse of `SubtaskSources`. The redesign *added* priority-aware task selection within a pillar's active tier. The pre-existing `Date.now()` purity lint error noted under "Verified" was also resolved by the rewritten container.

## Context

The operator shared a static HTML/JS concept mockup (`maqasid-orientation-v2.html`) reimagining how MILOS surfaces "what to do next." The existing model is a backlog of ~1,900 seeded subtasks across 8 pillars with no ranked entry point; the mockup instead recommends exactly **one** subtask at a time, shows a 5-rung breadcrumb trail (Pillar → Tier → Submodule → Task → Now) down to it, puts grounding evidence (Qur'an/hadith) on the same screen, and offers non-punitive exits instead of a guilt-driving streak mechanic.

Three decisions were made with the operator before scoping (see the approved plan at `.claude/plans/…sleepy-wind.md`):

1. **Standalone route** `/app/orientation`, not folded into the existing `NiyyahAct → FocusTaskList` daily-ritual flow and not a Dashboard widget — pattern-matched on the existing ungated `/app/prophetic-path` route.
2. **Ranking respects necessity tier system-wide** (Daruriyyat/Hajiyat/Tahsiniyat) — recommend from a pillar's `_core` projects until those are complete, then fall through to `_growth`, then `_excellence`. This deliberately diverges from the mockup's flat done/total ratio: a pillar 90%-done in Necessities must never rank behind one that's merely incomplete on nice-to-haves.
3. **"Not today" is a real snooze**, not a cosmetic acknowledgment — it sets `snoozedUntilDayKey` and the subtask is excluded from eligibility until the next Islamic day (Maghrib rollover via `currentIslamicDayKey`), unlike the mockup's purely informational version.

## Decision

Built across four phases, all now complete:

- **Data layer** ([orientation-selector.js](src/data/orientation-selector.js)): pure functions — `getPillarTierSubtaskStats`, `getPillarActiveTierRatio`, eligibility predicates (`isSubtaskSatisfied`/`isSubtaskEligible`/`isSubtaskSnoozedToday`), `findFirstEligibleInPillarTier`, `findNextEligibleSubtask`, and `recommendOrientation({projects, tasksByProject, heldTaskKey, overridePillarId, todayKey})`. Reuses `MAQASID_CORE_PILLARS`, `resolveSubmoduleFromProject`, `getProjectLevel` — no new taxonomy invented.
- **Components** ([src/components/orientation/](src/components/orientation/)): `Orientation.jsx` owns state, `OrientationLadder.jsx` (5-rung breadcrumb), `OrientationBalanceStrip.jsx` (7-bar pillar strip + expandable picker, doubles as the "Something else" target), `OrientationEvidence.jsx` (wraps the existing `<SubtaskSources>` — evidence rendering was not rebuilt), `OrientationActions.jsx` (Mark done / Doesn't apply / Not today / Something else).
- **Routing**: `OrientationPage.jsx` thin wrapper, lazy-loaded route registered in `App.jsx` immediately before the `:moduleId` catch-all, no `CeremonyGuard` (cross-pillar surface, same reasoning as `prophetic-path`). Discovery links added to `TodayFocusSection.jsx`'s handoff row and `Sidebar.jsx`'s main nav (a `Compass` icon entry) — deliberately **not** added to `MobileNav.jsx`, whose own code comment reserves its 3-tile bar for stable nav only.
- **State design, two judgment calls made during build:**
  - *Effect-driven recompute*, not imperative updates: a `useEffect` keyed on `[projects, tasksByProject, todayKey, tick]` recomputes `recommendOrientation(...)` on every relevant store change, rather than each action handler manually deriving the next recommendation. This is what makes held-task continuity and the async task-preload race (below) resolve themselves without extra plumbing.
  - *One-shot pillar override via ref, not state*: "Something else" sets `overrideRef.current = pillarId` and bumps a `tick` counter to force a recompute with no store mutation; the effect consumes and clears the ref on every run. If the selector finds nothing eligible in the overridden pillar, it silently falls through to the normal system-wide top pick and `wasSetAside` stays `false` — no misleading "Set aside" acknowledgment is shown. Confirmed correct this session by deliberately overriding into an unseeded pillar (Wealth, in this guest account) and observing the graceful fallback.

## Rationale

Reusing `SubtaskSources`, the pillar/tier data model, and `updateSubtask`'s generic patch mechanism (rather than inventing parallel state) kept the feature to two genuinely new runtime-only subtask fields (`notApplicable`, `snoozedUntilDayKey`) and one new selector module. Both new fields were confirmed pre-build not to intersect the grounding lint/test ratchets, which read only static seed `sources[]`/`description`, never runtime store state — and confirmed post-build by running the full gate with zero ratchet movement.

## Alternatives Considered

- **Dashboard widget or folding into `NiyyahAct`** — rejected; the operator wants a standalone destination independent of the once-daily ritual flow, reachable any time.
- **Flat done/total ratio (mockup's original)** — rejected; blends tiers, so a pillar that has finished all its obligatory work but has open nice-to-haves would rank behind one still missing obligatory work. Necessity tier must gate ranking, never blend into it.
- **Cosmetic "Not today"** — rejected by the operator in favor of real snooze semantics; the app should not resurface a deliberately-deferred item the same day.

## Consequences

- Two new subtask fields (`notApplicable`, `snoozedUntilDayKey`) now exist on any subtask touched via Orientation's actions; `PillarProgressStrip`/`MaqasidBalanceRadar`/kanban done-counts are unaffected since they key off `done`/`completedAt`, not these fields — confirmed by reading those consumers, not just assumed.
- `SubtaskSources.jsx` now has a second import site outside `work/` (`orientation/OrientationEvidence.jsx`), a minor cross-folder wart accepted as-is; a future cleanup candidate would relocate it to `shared/`.
- Because this guest account's seed data only populates the Faith pillar (no `bbiz_tasks_{health,intellect,family,wealth,environment,community}_*` keys exist), the other 6 pillars' `OrientationBalanceStrip` tier badges all trivially read "Excellence" (0/0 vacuously satisfied at every tier) — this is a seed-data gap in this account, not a selector bug, and will self-resolve as those pillars get real seed content.

## Verified

`npm test` 94/94 green (adds the new `orientation-selector.test.js` suite covering tier fallthrough, N/A-counts-as-satisfied, snooze-excludes-without-inflating-ratio, held-task continuity, and pillar-override/set-aside). `npm run lint:eslint` 0 errors (full composite `npm run lint` skipped — pre-existing unrelated `generate:pillar-glyphs:check` Vite SSR timeout on the Family pillar, not caused by this work). `npm run build` green. Manual verification was DOM/text-level, not pixel-level: `computer({action:"screenshot"})` failed twice with the identical recurring error *"the Browser pane is not displayed, so the page is not compositing frames"* — the same [[project-screenshot-hang]]-class failure logged against multiple prior MILOS sessions this month. Substituted `get_page_text`/`read_page`(filter=all)/`computer` clicks, which do work without compositing, and confirmed: the recommendation renders correctly against real store data (Faith → Necessities → Hajj → real subtask with real Qur'an/hadith evidence); all four actions behave correctly (Mark done → held continuity within the same task; Doesn't apply → advances without resurfacing; Not today → "Snoozed until tomorrow," skips forward without marking done; Something else → picker opens with correct `list`→`listbox`/`listitem`→`option` ARIA role switch, and gracefully falls back to the top system-wide pick with no misleading ack when the chosen pillar has nothing eligible).

One transient discrepancy was investigated and resolved, not fixed as a bug: an early navigation to `/app/orientation` showed "You're all caught up" while the Faith pillar's own pages showed real 0%-complete projects. Root cause: `tasksByProject` (`task-store.js`) starts `{}` and is populated only by the async `loadTasks(projectId)` action; `AppShell.jsx` (which wraps every `/app/*` route) mounts an eager `useEffect` that calls `loadTasks` for every project on first load, and the initial read happened inside the brief window before that preload resolved. Orientation's effect-driven recompute (above) means it naturally re-renders correctly once the preload finishes — no code change was needed.

## Connections

- [[milos]] — parent entity, new `/app/orientation` route
- [[project-screenshot-hang]] — recurring environment limitation hit again this session, disclosed rather than papered over
- [[amanah-gate]] — feature is presentational/navigational only; no capital, CSA/CSRA, salam, or yield-share surface; Amanah assessment: neutral-to-positive (surfaces existing graded evidence, adds no new fiqh claims)
