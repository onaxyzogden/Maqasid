---
title: "Prophetic Path Sunnah-grounded transition nodes (Phase 1)"
type: decision
date: 2026-04-26
tags: [propheticpath, sunnah, transitions, schema, phase-1]
status: accepted
---

# Decision — Four new Sunnah-grounded transition nodes between prayer times

## Context

User compared the Prophetic Path timeline to the Productive Muslim "Daily Routine of Prophet Muhammad ﷺ" infographic and observed that **distinctively Sunnah waypoints between the obligatory prayers were missing**. Prior decisions [[2026-04-21-prophetic-prayer-phase-tasks]] and [[2026-04-21-prophetic-transition-phase-tasks]] established `phaseMatchers` and `transition:*` tag plumbing for 5 transition tasks, but only 8 nodes existed (5 prayers + tahajjud + morning + midday-labor).

## Decision

Add **4 transition nodes** to the timeline, all anchored to existing prayer keys via `offsetMin` (mirroring the `midday-labor` precedent):

| Node | Anchor | Offset | Title | Sunnah weight |
|---|---|---|---|---|
| `duha` | Sunrise | +20 min | Salat ad-Duha | High — Muslim 720 (Abu Hurayrah) |
| `qaylulah` | Dhuhr | −45 min | Midday Rest | High — at-Tabarani al-Awsat (hasan) |
| `after-asr` | Asr | +30 min | Return to Family | High — Bukhari 5216 |
| `bedtime` | Isha | +60 min | Sunan al-Nawm | High — Bukhari 247, 6320 |

Spine cycle order: `… maghrib → isha → bedtime → tahajjud → fajr → duha → morning → qaylulah → dhuhr → midday-labor → asr → after-asr →` (12 nodes total).

**Phase 1 scope** (this decision): node skeletons + routing only. `transition:*` tags wired through `classifyTask` to `prayer_*_before` / `prayer_*_after` boards. Intent-only `TIME_CONTENT` entries (no fabricated Arabic — explicitly permitted by file header).

**Phase 2 (deferred)**: 4 grounded parent tasks + 3–5 grounded subtasks each, distributed by pillar (`duha`/`bedtime` → faith; `qaylulah` → life; `after-asr` → family). Sources to draw from Bukhari/Muslim/Quran via the two-axis `sources[]` schema ([[2026-04-18-milos-grounding-two-axis]]).

### Files modified (Phase 1)

- [src/components/islamic/PropheticPath.jsx](src/components/islamic/PropheticPath.jsx) — `NODE_TIMING` (4 entries) + `NODES` array (4 cards) + `Bed`/`BedDouble`/`Home` lucide imports
- [src/data/prophetic-path-submodules.js](src/data/prophetic-path-submodules.js) — 4 `TOD_SUBMODULES` entries (submodules + matchers + phaseMatchers); `NODE_TIMING_KEY` extended; `inferNodeFromHour` ranges
- [src/components/islamic/TimelineIslamicContent.jsx](src/components/islamic/TimelineIslamicContent.jsx) — 4 `NODE_META` entries (English + Arabic labels); morning Arabic shifted from الضحى → الصباح to free up "Duha" for the new node
- [src/data/islamic/time-based-content.js](src/data/islamic/time-based-content.js) — 4 intent-only `TIME_CONTENT` entries (before/during/after × 4 nodes)
- [src/data/seed-tasks/prayer-seed-tasks.js](src/data/seed-tasks/prayer-seed-tasks.js) — `classifyTask` mappings: `transition:duha → prayer_fajr_after`, `transition:qaylulah → prayer_dhuhr_before`, `transition:after-asr → prayer_asr_after`, `transition:bedtime → prayer_isha_after`

### Tie-break design

Existing `effectiveAnchorMs(spec, …) = anchorMs + offsetMin*60_000` already handles offsets. New offsets chosen to avoid ties with existing nodes:
- `duha` (+20) and `morning` (now +60) split the post-Sunrise window
- `qaylulah` (−45), `dhuhr` (0), `midday-labor` (+15) all distinct
- `asr` (0) and `after-asr` (+30) distinct
- `isha` (0) and `bedtime` (+60) distinct
- `bedtime` (Isha+60 ≈ 21:30) wraps cleanly to `tahajjud` (Lastthird ≈ 03:00) with no overlap

### Skipped from infographic

- **Meal nodes** (Breakfast/Lunch/Dinner) — adab, not sunnah waypoints; covered by tasks under surrounding nodes.
- **Midnight, Before-noon market** — covered by tahajjud and morning respectively.

## Verification

- `npm run lint` — all 3 monotonic ratchets at 0 ✓
- `npm test` — 40/40 pass ✓
- Preview at 06:20 local (Morning current): 12 nodes render in chronological cycle, current=Morning, next=Qaylulah, no console errors. All 4 new node titles visible in spine: "Salat ad-Duha", "Midday Rest", "Return to Family", "Sunan al-Nawm".

## Carries forward

Phase 2 = full grounded subtask scaffolding across `faith-seed-tasks.js` / `life-seed-tasks.js` / `family-seed-tasks.js`. May require NotebookLM Muslim Scholar (1c17b03b) consultation for sunnah.com-grade canonical numbering on Bukhari 247 / 5216 / 6320 / Tabarani Awsat. Per-pillar legacy-string ratchets must remain at 0; inline-refs ratchet must remain ≤ 13.
