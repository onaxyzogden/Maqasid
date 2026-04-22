---
title: "Time-Based Islamic Layer Sidebar on Timeline Route"
type: decision
date: 2026-04-22
status: accepted
tags: [ui, islamic-layer, prophetic-path, route-aware, amanah-gate]
superseded_by: null
---

# Time-Based Islamic Layer Sidebar on Timeline Route

## Context

The Islamic Layer sidebar (`IslamicPanel`) was module-aware — driven by the `activeModule` Zustand slice — but not route-aware. On the [[milos]] timeline route (`/app/prophetic-path-test`), where the page is anchored to eight prayer-phase nodes from `PropheticPath`, the sidebar continued to surface whichever module the user last visited. The connection between what the page was about (current prayer window) and what the sidebar surfaced (last-touched module's Opening Dua) was missing.

## Decision

On `/app/prophetic-path-test` with the Islamic values layer active, replace the module-centric body of `IslamicPanel` with a new `TimelineIslamicContent` block that renders four sections tied to the *current* prayer-phase node and sub-phase:

1. **Window header** — node label + Arabic name + phase (`before` / `during` / `after`) + countdown to next prayer
2. **Ayah / hadith for the window** — vetted entry from `AYAH_BANNER_DATA` (e.g., Quran 29:45 for prayer windows)
3. **Phase dhikr / dua** — `ONGOING_DUA` (Quran 9:129, Tawakkul) or phase-specific intent text
4. **Phase-matched tasks summary** — `buildTasksForNode(nodeId, projects, tasksByProject, { phase })`, top 5 with deep links into the timeline

All other routes keep the existing module/stage-centric content unchanged. The `ceremonyKey` switches to `'timeline'` on the timeline route so Begin/Close ceremony state doesn't bleed across contexts.

## Rationale

- **Reuse over invention** — `usePrayerTimes`, `inferNodeFromHour`, and `buildTasksForNode` already exist and are battle-tested. Only one new helper was needed: `inferPhaseForNode(nodeId, now, timings)` in [src/data/prophetic-path-submodules.js](src/data/prophetic-path-submodules.js), which compares `now` to the node's anchor time using a 25-min `before` window and 15-min `during` window.
- **Amanah Gate compliance** — every Arabic snippet in the seed `time-based-content.js` is reused from already-vetted entries (`AYAH_BANNER_DATA`, `ONGOING_DUA`); phases lacking a vetted source render English-only intent text instead of fabricated Arabic.
- **Minimal blast radius** — branched at the `.il-content` level via `useLocation().pathname.startsWith('/app/prophetic-path-test')`. Three small `!isTimelineRoute` guards hide the now-redundant Pillar Context badge and Module Badge; everything else (header toggles, PrayerTime, Threshold buttons, citations footer) is preserved.

## Alternatives Considered

- **New `/app/timeline` route wrapping PropheticPath** — rejected; user confirmed `/app/prophetic-path-test` is the canonical timeline route. No need for a second URL.
- **Build a separate sidebar component for the timeline** — rejected; would duplicate header/PrayerTime/Threshold logic. Branching the body inside `IslamicPanel` keeps one source of truth for the chrome.
- **Compose new ayat/hadith for each of 24 node × phase slots** — rejected per [[amanah-gate]]; only repo-vetted text is acceptable. Empty slots fall back to plain English intent prompts.

## Consequences

- The Islamic Layer is now route-aware via `useLocation`. Pattern can be extended to other route-anchored experiences (e.g., a future Wealth Dashboard could surface zakah-window content) without further refactoring.
- Phase-only intent text creates an editorial backlog: future sessions can fill in vetted ayah/hadith for `before`/`after` slots and node-specific entries (currently only `during` for prayer nodes pulls a real ayah).
- The minute-tick `setInterval` inside `TimelineIslamicContent` re-derives node/phase every 60 s without a full reload, so transitioning across an anchor (e.g., Dhuhr enters at 13:17) updates the sidebar live.

## Connections

- [[milos]] — `IslamicPanel` lives at [src/components/islamic/IslamicPanel.jsx](src/components/islamic/IslamicPanel.jsx); new component at [src/components/islamic/TimelineIslamicContent.jsx](src/components/islamic/TimelineIslamicContent.jsx); seed data at [src/data/islamic/time-based-content.js](src/data/islamic/time-based-content.js); helper added in [src/data/prophetic-path-submodules.js](src/data/prophetic-path-submodules.js).
- [[2026-04-21-prophetic-prayer-phase-tasks]] — supplied the `prayer-phase:*` tag schema and `phaseMatchers` that `buildTasksForNode` consumes for the tasks block.
- [[amanah-gate]] — the seed-content discipline (no fabricated Arabic) is a direct application of the gate.
