---
title: "MILOS pre-test Tier-2 polish (Phase B of pre-test audit)"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, audit, pillar-wisdom, prophetic-path, suspense, storage]
superseded_by: null
---

# MILOS pre-test Tier-2 polish (Phase B of pre-test audit)

## Context

Continuation of [[2026-04-25-milos-pre-test-tier-1-fixes]]. After Phase A unblocked the live test, Phase B addressed Tier-2 user-visible polish: empty pillar wisdom/next-actions cards, Ummah citation gaps, the prophetic-path-test prototype shipping with a "test" label, lazy-load failures hanging the Suspense fallback forever, prayer-time degradation rendering empty Before/After lists silently, and write paths that only surfaced quota errors after data loss. See [[2026-04-25-milos-pre-test-audit]] for the full triage.

## Decision

Five Tier-2 work items shipped. One audit finding (B.2) was verified incorrect during execution and is documented as a correction. One sub-item (B.5b LevelNavigator chunk-size target) is partially shipped and the remaining work is filed for a dedicated session.

### B.1 — Populate pillar wisdom + next-actions

[src/data/pillar-wisdom.js](src/data/pillar-wisdom.js) and [src/data/pillar-next-actions.js](src/data/pillar-next-actions.js) had 23 sub-modules returning `stub('Title')` — empty body, empty source — across 6 pillars (Life × 4, Intellect × 4, Family × 4, Wealth × 4, Environment × 4, Ummah × 3). Pillar wisdom shows on 1-second sustained hover; next-actions show as pop-out cards. Both rendered title-only, looking unfinished.

Replaced all 23 stubs with curated entries grounded in Quranic ayahs fetched live via the quran.ai MCP server (`fetch_quran` ar-simple-clean + `fetch_translation` en-sahih-international). Verses anchored: 2:195, 13:28, 106:4, 49:13, 96:1, 39:9, 17:36, 67:2, 30:21, 31:13, 4:1, 16:80, 2:172, 25:67, 4:29, 59:7, 7:31, 17:27, 6:38, 2:168, 3:103, 4:36, 49:10. Each next-action expanded into the `{ core, growth, excellence }` triplet matched to the same anchor. Moontrance and Ogden stubs preserved (8th-pillar authoring is its own thread; Ogden is intentionally aspirational).

Amanah Gate: every Arabic and English line was fetched, never composed. Grounding nonce `gnd-d8dbda585ec0cb98`.

### B.2 — Ummah seed-task citations (audit finding **incorrect**)

**Audit claimed:** Ummah seed-task subtasks lacked `sources` (Quran/hadith) for several modules; cited the 2026-04-17 deferral.

**Actual state:** All 525 subtasks across [src/data/seed-tasks/ummah-seed-tasks.js](src/data/seed-tasks/ummah-seed-tasks.js) are already grounded in legacy-string Markdown format (Arabic ayah + English translation + reference, hadith with grade and collection). `scripts/lint-grounding.mjs` reports 0 missing, 0 errors for the Ummah pillar. Sample reads confirmed extensive structured citation blocks throughout.

The 2026-04-17 deferral was the *two-axis migration* (legacy strings → `{ provenanceTier, relevance }` structured grounding) — not citation authoring. The grounding linter accepts the legacy string format, so the pillar ships fine. Two-axis migration remains a separate refactor for a future session.

No code changes. Documented for transparency.

### B.3 — Prophetic Path route graduation

The Prophetic Path landing page was registered at `/app/prophetic-path-test` and surfaced through Sidebar + MobileNav with a "(prototype)" tooltip. Live testers saw "test" in the URL and would conclude the feature was unfinished.

Renamed:
- [src/pages/prototypes/PropheticPathTestPage.jsx](src/pages/prototypes/PropheticPathTestPage.jsx) → [src/pages/PropheticPathPage.jsx](src/pages/PropheticPathPage.jsx) (one-line passthrough rendering `<PropheticPath />`)
- Empty `src/pages/prototypes/` directory removed
- [src/App.jsx](src/App.jsx) registers `/app/prophetic-path` as production; `/app/prophetic-path-test` `<Navigate replace>` redirects to the new URL so any bookmarked link still works
- [src/components/layout/Sidebar.jsx](src/components/layout/Sidebar.jsx) drops the "(prototype)" tooltip and routes to `/app/prophetic-path`
- [src/components/layout/MobileNav.jsx](src/components/layout/MobileNav.jsx) routes to `/app/prophetic-path`
- [src/pages/TodayFocusSection.jsx](src/pages/TodayFocusSection.jsx) "Begin the day's rhythm" link routes to `/app/prophetic-path`
- [src/components/islamic/TimelineIslamicContent.jsx](src/components/islamic/TimelineIslamicContent.jsx) anchor link `#node-${nodeId}` routes to `/app/prophetic-path`
- [src/components/islamic/IslamicPanel.jsx](src/components/islamic/IslamicPanel.jsx) "active" detection updated to the new path

### B.4 — Suspense + prayer-time UX fallbacks

Two related UX gaps. Both fixed:

**Suspense lazy-load failures.** When a `React.lazy()` chunk fails to load (network blip, stale cache after a deploy), the bare `<Suspense fallback={<Spinner />}>` spins indefinitely with no recovery path. Created [src/components/shared/ChunkErrorBoundary.jsx](src/components/shared/ChunkErrorBoundary.jsx) — class component using `getDerivedStateFromError`, renders a small alert with a Retry button that triggers `window.location.reload()` (re-fetches the chunk manifest with any new build's hashes). Wrapped:
- [src/App.jsx](src/App.jsx) global `<Suspense fallback={<RouteSpinner />}>` (covers the lazy Work, Project, SourcesPage, and Moontrance routes)
- [src/components/work/TaskDetailPanel.jsx](src/components/work/TaskDetailPanel.jsx) `<Suspense fallback={<SourcesSkeleton />}>` around the `SubtaskSources` lazy import (1.8 MB chunk via hadith.js + quran-wbw.js)

The boundary accepts an optional `label` prop so the Sources tab gets contextual copy ("Could not load Sources.").

**Prayer-times degraded state.** [src/hooks/usePrayerTimes.js](src/hooks/usePrayerTimes.js) already exposed `error` and `loading`, but [src/components/islamic/PropheticPath.jsx](src/components/islamic/PropheticPath.jsx) only consumed `{ timings, cityName }` — when geolocation failed or the IP fallback errored, `timings` was null and all phase-filtered task lists silently rendered empty.

PropheticPath now destructures `{ loading, error, requestLocation }` as well and renders a small dismissible alert above the timeline when `!timings && !loading` ("Prayer times unavailable — set city in Settings to ground today's rhythm" with a Retry button that calls `requestLocation()`).

### B.5 — Storage quota pre-check + Moontrance lazy split

**Quota pre-probe.** [src/services/storage.js](src/services/storage.js) `safeSet` now fires a fire-and-forget `navigator.storage.estimate()` probe whenever the serialized value exceeds 200 KB (throttled to once every 30s). If usage is >90% of quota, dispatches the existing `bbiz:storage-error` event preemptively — same banner the user would see on a hard quota error, but ahead of the write that would actually fail. `safeSet` stays sync; the probe is best-effort.

**Moontrance lazy split.** [src/App.jsx](src/App.jsx) converted `MoontraceLandPage`, `MoontranceSeasonalPage`, `MoontranceResidencyPage` from static imports to `lazy(() => import(...))`. Index chunk shrank from ~2,015 KB → ~1,694 KB (~322 KB saved on first paint).

**Caveat — LevelNavigator chunk still 4.7 MB raw.** The plan target was each route chunk under 1 MB. The Moontrance pages turned out not to be the source of LevelNavigator's weight — those page files are 0.17 KB each. The 4.7 MB lives in the shared `LevelNavigator-*.js` chunk that backs every `<LevelNavigator>` instance across all 8 pillars. Investigating which data files (`@data/seed-tasks/*`, `@data/submodule-registry`, etc.) get hoisted into that shared chunk requires either Vite manual-chunks configuration or a dedicated dynamic-import refactor. Filed as **deferred** — its own focused session, not part of pre-test scope.

## Consequences

**Positive:**
- Live test now shows non-empty wisdom + next-action cards on every pillar (except 8th + Ogden, which are intentionally pending)
- Lazy-load failures recover gracefully on Retry instead of spinning forever
- Prayer-time degradation surfaces visibly with a clear next step instead of empty task lists
- Large writes get an early-warning probe before the disk fills
- The Prophetic Path looks like a finished feature, not a prototype
- `/app/prophetic-path-test` bookmarks still work via redirect

**Trade-offs:**
- Ummah's grounding is in the legacy string format, not the two-axis structured form. The linter accepts both; UI consumes both. Two-axis migration remains a separate refactor.
- The LevelNavigator 4.7 MB chunk is unchanged. On slow networks, opening any `*-core` page still causes an 8-15s stall on first navigation. Deferred but documented.

**Files touched (Phase B):**
- [src/data/pillar-wisdom.js](src/data/pillar-wisdom.js)
- [src/data/pillar-next-actions.js](src/data/pillar-next-actions.js)
- [src/pages/PropheticPathPage.jsx](src/pages/PropheticPathPage.jsx) (created)
- [src/App.jsx](src/App.jsx)
- [src/components/layout/Sidebar.jsx](src/components/layout/Sidebar.jsx)
- [src/components/layout/MobileNav.jsx](src/components/layout/MobileNav.jsx)
- [src/pages/TodayFocusSection.jsx](src/pages/TodayFocusSection.jsx)
- [src/components/islamic/TimelineIslamicContent.jsx](src/components/islamic/TimelineIslamicContent.jsx)
- [src/components/islamic/IslamicPanel.jsx](src/components/islamic/IslamicPanel.jsx)
- [src/components/shared/ChunkErrorBoundary.jsx](src/components/shared/ChunkErrorBoundary.jsx) (created)
- [src/components/work/TaskDetailPanel.jsx](src/components/work/TaskDetailPanel.jsx)
- [src/components/islamic/PropheticPath.jsx](src/components/islamic/PropheticPath.jsx)
- [src/services/storage.js](src/services/storage.js)

**Verification:** `npm run build` exits 0, 2,765 modules transformed, only the pre-existing chunk-size warning. Index chunk reduced ~16% post Moontrance lazy split.

## Deferred

- 8th-pillar (`moontrance:`) top-level `MODULE_ATTRS` entry — needs NotebookLM Muslim Scholar grounding pass
- Two-axis grounding migration for legacy-string seed tasks — separate refactor, scope-blocked on test framework
- LevelNavigator 4.7 MB chunk shrink — needs Vite manual-chunks investigation, separate session
- Phase C (Tier-3 inconsistency cleanup) — pending Checkpoint 2 approval
