---
title: "MILOS: all seven pillars seed at app-startup; orientation cards distinguish unseeded from caught-up"
type: decision
date: 2026-07-27
status: accepted
tags: [architecture, data, ui, seeding, orientation, maqasid]
superseded_by: null
---

# MILOS: all seven pillars seed at app-startup; orientation cards distinguish unseeded from caught-up

## Context

The operator selected a live `OrientationCard` on `/app/orientation` (Faith, reading **`0/0`** above *"Nothing left for today"*) and asked why that pillar "and many other domains" showed `0/0`. Live-store inspection isolated it: **only the Health pillar had any boards at all** — 12 boards, 49 tasks, 240 subtasks — while Faith, Intellect, Family, Wealth, Environment and Ummah had **zero projects and zero tasks**.

Two independent defects stacked to produce the symptom:

1. **Board creation was lazy and per-visit.** A pillar's boards + tasks are created only by `ensure<Pillar>Projects()` in [project-store.js](src/store/project-store.js), and every one of those was wired into **that pillar's own dashboard mount effect** (`HealthDashboard.jsx:43`, `FamilyDashboard.jsx:43`, …). A pillar the operator had never opened therefore had no boards. `getPillarActiveTierRatio` walks `TIERS` looking for the first incomplete tier, finds every tier empty, and falls through to the **last** tier's stats — `{done: 0, total: 0}` — which is also non-actionable.
2. **The card face could not tell "unseeded" from "caught up".** Both states arrive at `hasEligible: false` and rendered the identical accent-coloured check + *"Nothing left for today. Come back after Maghrib for a fresh day."* A pillar that had never been populated was actively **lying** about being complete.

This is the same class of defect as the prayer-boards bug fixed earlier the same day ([[2026-07-27]] log entry, `ensurePrayerProjects()` orphaned) — a seeder that exists, is correct, is idempotent, and is simply never called from the surface that needs it. That one was a *missing* call site; this one is a call site that exists but is **scoped too narrowly** (per-pillar page) for a **cross-pillar** consumer.

Not caused by the sequential-locking work ([[2026-07-26-milos-orientation-sequential-locking]]) — the `done`/`total` wiring predates it, from the carousel redesign.

## Decision

**Seed every Maqasid pillar at app-startup, and make the empty state honest.**

1. **[AppShell.jsx](src/components/layout/AppShell.jsx) calls all seven `ensure*Projects()` once on mount** — faith, health, intellect, family, wealth, environment, ummah — in a dedicated `useEffect(…, [])` placed immediately above the existing bulk task-loader. Operator chose app-startup over the alternative of seeding inside the Orientation view ("approved if you seed all pillars at app-startup").
2. **`buildOrientationCarousel` tags each card with `seeded`** ([orientation-selector.js](src/data/orientation-selector.js)) — true when the pillar owns **≥1 subtask across ANY tier**, via `TIERS.some(t => getPillarTierSubtaskStats(...).total > 0)`.
3. **[OrientationCard.jsx](src/components/orientation/OrientationCard.jsx) branches three ways** — actionable step / `seeded` + caught-up (*"Nothing left for today"*) / `!seeded` (*"No steps yet — Open this domain to set up its first steps"*, `CircleDashed` icon muted to `--text3`, and the `0/0` fraction **suppressed entirely**). `aria-label` follows the same three-way split.

## Rationale

- **The seeders were already idempotent, so startup invocation is safe by construction.** Each `ensure*Projects` diffs against existing projects (`missing = BOARDS.filter(b => !existing.some(p => p.id === b.id))`) and its `seedTasks(boardId)` early-returns when `tasks_<boardId>` is non-empty. Every boot after the first is a no-op. No new store action, no migration, no flag.
- **AppShell already owns the cross-cutting bulk loader**, so the seeding effect sits beside its natural consumer. Appending boards grows `projects.length`, which is exactly the dep of the existing `projects.forEach(p => loadTasks(p.id))` effect — the new boards hydrate into `tasksByProject` with **zero extra wiring**.
- **`seeded` cannot be derived from the existing `total`.** The active-tier `total` is *also* `0` for a genuinely complete pillar whose last tier was never populated, so reusing it would swap one lie for another. Scanning all tiers is the only signal that separates the two.
- **The display fix is not redundant with the seeding fix.** It covers the async gap before seeding resolves, any pillar that genuinely ships no seed content, and any future regression of the call-site class above. Defence in depth against a bug that has now appeared **twice in one day** in two different surfaces.
- **Amanah gate: neutral** — UI data wiring over already-halal, already-grounded seed content. No covenant, revelation, or capital surface touched.

## Alternatives Considered

- **Seed inside the Orientation view** (the originally-proposed plan) — rejected by the operator in favour of app-startup. Would have left every *other* cross-pillar surface (the balance strip, dashboard rollups, search) still reading unseeded pillars.
- **Guard the startup effect to only call seeders for pillars with no boards** — **applied** in a follow-up commit as `ensureAllPillarProjects()`, but it does **not** deliver the saving predicted here. See the Boot-cost addendum below.
- **Reuse the active-tier `total === 0` as the "unseeded" signal** — rejected; ambiguous for a complete-but-unpopulated-last-tier pillar, as above.
- **Backfill boards via a migration** — rejected as heavier than needed; the idempotent ensure-path already converges existing installs on next boot.

## Consequences

- **Every cross-pillar surface now sees a fully-populated store**, not just Orientation. Verified live on a fresh guest profile: all seven cards render real totals and real *Now* steps — Faith **0/139**, Health **0/96**, Intellect **0/94**, Family **0/97**, Wealth **0/98**, Environment **0/91**, Community **0/200** — each at Necessities, Faith flagged *Weakest — recommended*. No console errors on boot.
- **Startup cost, flagged to the operator:** every boot now eagerly pulls all seven seed chunks (~1.5 MB gzip across `seed-faith` 197 kB … `seed-ummah` 423 kB) in the background rather than lazily per pillar-visit. It is post-paint and async so it does not block first render. See the addendum below for why this is **structural, not a regression this decision introduced**.
- **`seeded` is additive to the card shape** — no existing consumer breaks; `OrientationSheet` is untouched and the Prophetic Path node drill-in is unaffected.
- **`.orient-card__clear--empty`** is the first modifier on the clear-state block; the vestigial `.orient-card--clear` root class still has no CSS rule (pre-existing, left alone).

## Addendum — the boot-cost guard, and why it saves less than predicted

The guard was applied as **`ensureAllPillarProjects()`** in [project-store.js](src/store/project-store.js): it diffs each pillar's `*_BOARDS` against `projects` and calls that pillar's `ensure*Projects()` only when a board is missing. [AppShell.jsx](src/components/layout/AppShell.jsx) now calls that one action instead of all seven seeders. A pillar missing even one board still runs in full, which is also how boards added by a **future seed release** get created — a naive "pillar has ≥1 board → skip" test would have silently stranded them.

**The predicted saving does not materialise, and the prediction above was wrong.** Measured on the dev server across two boots of one guest profile:

| Boot | `projects` | Pillar seed modules fetched |
|---|---|---|
| 1st (fresh profile) | 0 → 96 | all 7 |
| 2nd (reload) | 96 | **still all 7** |

The seed chunks are **not** pulled only by `ensure*Projects`. Two other paths require them on every boot:

1. **[task-store.js](src/store/task-store.js) `loadTasks` awaits `preloadBoardSeeds(projectId)`** — and AppShell's pre-existing bulk loader runs `loadTasks` over *every* project. This alone guarantees all seven chunks.
2. **`backfillAndStripSeeds` preloads every pillar with stored boards** ([project-store.js](src/store/project-store.js)), before its own one-shot `seed_strip_v2` flag is consulted.

Both exist because `stripSeedFields` deliberately **removes `description`/`sources` from localStorage** and re-hydrates them from the bundle at read time. The chunks are therefore a **read-time dependency of displaying any seeded task at all**, not merely a seeding-time cost — a deliberate storage-size-over-download trade that predates this decision. Guarding the seeders cannot remove a cost the read path independently requires.

**What the guard does still buy:** it skips seven redundant `ensure*Projects` passes — each diffing 96 projects and calling `seedTasks()` on every board, i.e. ~96 `localStorage` reads plus a `JSON.parse` of each board's task array, on the main thread. Real CPU work, but not the ~1.5 MB of transfer the prediction claimed.

**Genuinely deferred, and where the download saving actually lives:** narrow the AppShell bulk loader so it does not `loadTasks` all 96 boards at startup (it exists to make cross-project search work), or give the hydrator a storage-backed cache so read-time hydration stops needing the bundle. Both are larger than this session's scope and unproven — do not treat either as agreed.

> [!warning] Contradiction with the 2026-07-27 prayer-boards entry
> The earlier 2026-07-27 record (in [[log]] and [[milos]]) states: *"Every sibling is wired to a mount effect (`ensureFaithProjects`/`ensureHealthProjects` in `AppShell.jsx`, `ensureWeeklyProjects` in `PropheticPath.jsx`)."*
> **That was false when written.** `ensureFaithProjects`/`ensureHealthProjects` were **not** in `AppShell.jsx` — they lived in the per-pillar dashboard pages (`FaithDashboard`/`HealthDashboard` mount effects). Proven by the diff of commit `7a47276`, where both appear as pure `+` additions to `AppShell.jsx`.
> Only `ensureWeeklyProjects` in `PropheticPath.jsx` was accurate. **This commit is what makes the claim true**, retroactively. The prayer fix itself was correct and is unaffected — only its supporting narrative was wrong.

## Connections

- [[milos]] — the affected project
- [[2026-07-26-milos-orientation-sequential-locking]] — the locking model these cards render; `seeded` is additive to the card shape it defined
- [[2026-07-25-milos-orientation-carousel-redesign]] — where the `done`/`total` card wiring originated
- [[2026-07-25-milos-prayer-popup-consolidation]] — same defect class (a correct, idempotent seeder with no adequate call site)
