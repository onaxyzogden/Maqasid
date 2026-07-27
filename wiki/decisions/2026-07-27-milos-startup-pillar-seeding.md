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
- **Guard the startup effect to only call seeders for pillars with no boards** — deferred, not rejected. It would skip the six lazy seed-chunk imports on every boot after the first. Not applied because it was outside the approved scope; see Consequences.
- **Reuse the active-tier `total === 0` as the "unseeded" signal** — rejected; ambiguous for a complete-but-unpopulated-last-tier pillar, as above.
- **Backfill boards via a migration** — rejected as heavier than needed; the idempotent ensure-path already converges existing installs on next boot.

## Consequences

- **Every cross-pillar surface now sees a fully-populated store**, not just Orientation. Verified live on a fresh guest profile: all seven cards render real totals and real *Now* steps — Faith **0/139**, Health **0/96**, Intellect **0/94**, Family **0/97**, Wealth **0/98**, Environment **0/91**, Community **0/200** — each at Necessities, Faith flagged *Weakest — recommended*. No console errors on boot.
- **Startup cost, flagged to the operator:** every boot now eagerly pulls all seven seed chunks (~1.5 MB gzip across `seed-faith` 197 kB … `seed-ummah` 423 kB) in the background rather than lazily per pillar-visit. It is post-paint and async so it does not block first render, but a returning user re-imports chunks only to find nothing missing. **Deferred optimisation:** guard the effect to call `ensure*` only for pillars with no boards yet, so later boots skip the imports entirely. Operator-gated.
- **`seeded` is additive to the card shape** — no existing consumer breaks; `OrientationSheet` is untouched and the Prophetic Path node drill-in is unaffected.
- **`.orient-card__clear--empty`** is the first modifier on the clear-state block; the vestigial `.orient-card--clear` root class still has no CSS rule (pre-existing, left alone).

> [!warning] Contradiction with the 2026-07-27 prayer-boards entry
> The earlier 2026-07-27 record (in [[log]] and [[milos]]) states: *"Every sibling is wired to a mount effect (`ensureFaithProjects`/`ensureHealthProjects` in `AppShell.jsx`, `ensureWeeklyProjects` in `PropheticPath.jsx`)."*
> **That was false when written.** `ensureFaithProjects`/`ensureHealthProjects` were **not** in `AppShell.jsx` — they lived in the per-pillar dashboard pages (`FaithDashboard`/`HealthDashboard` mount effects). Proven by the diff of commit `7a47276`, where both appear as pure `+` additions to `AppShell.jsx`.
> Only `ensureWeeklyProjects` in `PropheticPath.jsx` was accurate. **This commit is what makes the claim true**, retroactively. The prayer fix itself was correct and is unaffected — only its supporting narrative was wrong.

## Connections

- [[milos]] — the affected project
- [[2026-07-26-milos-orientation-sequential-locking]] — the locking model these cards render; `seeded` is additive to the card shape it defined
- [[2026-07-25-milos-orientation-carousel-redesign]] — where the `done`/`total` card wiring originated
- [[2026-07-25-milos-prayer-popup-consolidation]] — same defect class (a correct, idempotent seeder with no adequate call site)
