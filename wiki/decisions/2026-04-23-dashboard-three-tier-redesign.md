---
title: "Dashboard Three-Tier Redesign — Qalb / Amal / Barakah"
type: decision
date: 2026-04-23
tags: [dashboard, ui, ia, islamic, consolidation]
---

# Dashboard Three-Tier Redesign — Qalb / Amal / Barakah

## Context

The main dashboard (`/app/dashboard`) had accreted into a wall of panels after Sanctuary Mode ([[2026-04-19-dashboard-sanctuary-mode]]): Manifesto banner, Evening Reflect button, Open Tasks list, Maqasid Focus, Activity Feed, Workflow Pressure, BCG, stat cards — with no narrative backbone distinguishing intention from execution from impact. A two-round UI/UX Scholar consult (NotebookLM conversation `2b89f729-…`) delivered a kill / merge / relocate / reframe verdict.

## Decision

Reorganize the dashboard into **three semantically named Islamic tiers** and consolidate / eliminate redundant widgets against that backbone.

### Tiers

| Tier | Arabic | English | Purpose | Contents |
|---|---|---|---|---|
| **Qalb** | نية | Intent | Why today matters | Daily Mithaq (covenant widget) |
| **Amal** | عمل | Action | What to do now | Daily Snapshot (3-metric), Focus Task List, Context Widget, Sakinah Meter, Pillar Progress Strip |
| **Barakah** | بركة | Impact | What has compounded | BCG Chart (30-day istiqamah), Maqasid Balance Radar (7-axis) |

Tier wrappers are structural-only: `.dash-tier--{qalb|amal|barakah}` with a tinted `::before` gradient via `color-mix` against `--accent` / `--bg3` / `--success`, plus a bilingual eyebrow (Arabic label shown conditionally on `valuesLayer === 'islamic'`).

### Kill / Merge / Relocate / Reframe

- **Killed:** Open Tasks panel, standalone Maqasid Focus, Activity Feed, Workflow Pressure widget
- **Merged:** Manifesto Banner + Evening Reflect button → single **Daily Mithaq** widget with three morphing states (Niyyah → Muhasaba → Fulfilled) gated by Maghrib prayer time or `deepWorkPct ≥ 50%`
- **Merged:** Today + four stat cards → single **Daily Snapshot** 3-metric grid (Today hero / In Progress / Overdue)
- **Relocated:** BCG Chart from Amal column to Barakah tier
- **Reframed:** Workflow Pressure (red semantics) → **Sakinah Meter** with inverted legend (fewer bars = less tranquil, never uses `--danger`)
- **New:** **Maqasid Balance Radar** — 7-axis SVG polygon of 30-day completion distribution; ghost heptagon in empty state; no numeric scores, shape invites reflection on balance, not leaderboard

## Files

**New components:**
- `src/components/dashboard/DailyMithaq.{jsx,css}` — morphing covenant widget; uses `usePrayerTimes()` for Maghrib pivot, falls back to 6pm local
- `src/components/dashboard/MaqasidBalanceRadar.{jsx,css}` — 7-axis SVG radar, R=100/VB=280, polygon normalized against max pillar, legend chips link to `/app/pillar/{id}`

**Major edits:**
- `src/pages/Dashboard.jsx` — three `<section className="dash-tier dash-tier--{tier}">` wrappers; removed `projectFilter`, `activityTab`, `openTasksAll`, `activityItems`, `pillarSummary`, `priorityColor`, `priorityOrder`, `relativeTime`, `pressureLevel`; flattened `.insight-grid` + L/R columns into single `.insight-side`; `STAT_CARDS` → `SNAPSHOT_METRICS` (hero / danger / hint flags); replaced `WorkflowPressure` function with inline `SakinahMeter`
- `src/pages/Dashboard.css` — added `.dash-tier*`, `.daily-snapshot*`, `.sakinah*`; removed `.insight-eph*`, `.insight-stat-card*`, `.wf-pressure*`, `.insight-grid`, `.insight-left`, `.insight-right`, `.barakah-radar-stub*`

**Already satisfied (no edit):**
- `OnboardingChecklist.jsx` — self-dismiss `useEffect` already triggers 4-second celebration then `dismissChecklist()` on `allDone`

## Rationale

- **Islamic semantic layering beats feature-grouping.** Qalb→Amal→Barakah names *why* each tier exists (intention → execution → compounded reward), so every widget earns its tier by purpose, not by visual similarity.
- **Maghrib as the day-pivot** honors the prophetic reckoning of the day; `usePrayerTimes()` is already cached, so no new data fetch. 6pm fallback is a defensible non-Muslim default.
- **Sakinah reframe** avoids the anxiety-producing red of "pressure." A productivity tool inside a covenant OS should not shout at the user; the Ritual of Retreat link is gentle.
- **No scoring on the Radar** — `MaqasidBalanceRadar` deliberately normalizes against *max pillar* (not task count, not target) so the polygon's *shape* is the signal. This prevents the widget degrading into a leaderboard, which would violate the no-riya framing.

## Consequences

- `Dashboard.jsx` LOC dropped substantially and three stateful subsystems (`projectFilter`, `activityTab`, `openTasksAll`) were deleted entirely; stale-state bugs in those regions are now impossible.
- `ManifestoBanner.jsx` and `EveningReflectButton.jsx` are orphaned — delete candidates (not removed yet in case of imports elsewhere).
- `WorkflowPressure` function removed from `Dashboard.jsx`; nothing else imported it.
- The `.barakah-radar-stub*` CSS placeholder shipped during Phase 6 is now removed.
- Future pillar-specific dashboards may want to adopt the same tier pattern — `.dash-tier*` CSS is generic enough to reuse.

## Out of scope

- Deleting `ManifestoBanner.jsx` / `EveningReflectButton.jsx` source files — defer until a grep-pass confirms no remaining imports.
- Wiring the Radar to per-pillar drill-downs beyond the existing `/app/pillar/{id}` link.
- A Moontrance (8th pillar) axis on the Radar — `MAQASID_PILLARS` drives N=7 and adding a pillar would reshape the polygon; revisit when Moontrance ships.

## Related

- [[2026-04-19-dashboard-sanctuary-mode]] — the layout this redesign refactored
- [[2026-04-22-mithaq-activation-nur-aura]] — Qalb-hub Mithaq gesture; this dashboard widget is the *daily* covenant counterpart to that *Faith wheel* one
- [[milos]] — updated with dashboard redesign state
