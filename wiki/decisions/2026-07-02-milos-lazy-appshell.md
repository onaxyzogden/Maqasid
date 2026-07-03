---
title: "MILOS — AppShell made lazy, Suspense relocated into its Outlet"
type: decision
date: 2026-07-02
status: accepted
tags: [architecture, performance, ui, vite, code-splitting, react-router, suspense]
superseded_by: null
---

# MILOS — AppShell made lazy, Suspense relocated into its Outlet

## Context

[[2026-07-02-milos-route-lazy-splitting]] (earlier the same day) converted ~55 route pages to
`React.lazy` but deliberately kept `AppShell` eager, flagging it as the **dominant remaining
cold-load cost**: the shell's whole dependency tree — Sidebar, TopBar, MobileNav, IslamicRail +
IslamicPanel, prayer-posture images, seed-hydrator, stores — still loaded on **every** route,
including the unauthenticated Landing `/`. Five heavy work components also remained eager in
`App.jsx`: `CeremonyGuard`, `CeremonyGuardDynamic`, `ProjectBoard` (the last eager path keeping
`@dnd-kit` in the entry graph), `AssetsTab`, `ProjectJournal`.

The naive fix — just wrapping `AppShell` in `lazy()` — would regress UX: with only the app-level
`<Suspense>` above `<Routes>`, every first visit to a lazy inner route would swap the **entire
tree** (shell chrome included) for the spinner fallback.

## Decision

Three coordinated edits on `perf/route-lazy-splitting`:

1. **[src/components/layout/AppShell.jsx](src/components/layout/AppShell.jsx)** — the shell hosts
   its own inner boundary around routed content: `<Outlet/>` wrapped in
   `<ChunkErrorBoundary label="Could not load this page."><Suspense fallback={<RouteSpinner/>}>`
   **inside** `<main id="main-content">`. Inner-route chunk loads render the fallback/error in the
   main column only; the chrome (Sidebar/TopBar/MobileNav/Islamic rail) never unmounts.
2. **[src/App.jsx](src/App.jsx)** — the eager AppShell import becomes
   `const AppShell = lazy(() => import('@components/layout/AppShell'))`, and the five remaining
   eager work components (`CeremonyGuard`, `CeremonyGuardDynamic`, `ProjectBoard`, `AssetsTab`,
   `ProjectJournal`) become lazy consts. The pre-existing top-level `Suspense`/`ChunkErrorBoundary`
   stays — it now covers the AppShell chunk itself on deep links. `ProtectedRoute` needs no change:
   when `!user` it renders `<Navigate>`, never its children, so the lazy chunk is never requested
   for logged-out visitors.
3. **[src/pages/Landing.jsx](src/pages/Landing.jsx)** — an idle-preload effect warms the
   authenticated-shell chunks: `requestIdleCallback(preload, { timeout: 3000 })` (Safari fallback
   `setTimeout(1500)`; both with cleanup) firing `import()` of AppShell + Dashboard +
   CeremonyGuard. Vite dedupes `import()` against the `lazy()` requests — same chunks — so the
   first `/app` navigation is warm. StrictMode's double-fire is a cached no-op.

**No `vite.config.js` change** — Rolldown auto-chunks AppShell once its only importers are dynamic.

## Rationale — measured effect

Fresh production `vite build`, versus the same-morning route-split baseline:

- Entry JS `1,536.45 → 283.12 kB` (gzip `438.17 → 87.35`) — **−81.6%**
- Entry CSS `268.24 → 67.67 kB` (gzip `42.56 → 13.89`) — **−74.8%**
- New on-demand chunks: `AppShell` 854.21 kB JS + 64.76 kB CSS; `ProjectBoard` 285.64 kB
  (**`@dnd-kit` evicted from the entry graph**); `CeremonyGuard` 0.43 kB; `CeremonyGuardDynamic`
  0.34 kB.
- Cumulative from the pre-split baseline (`1,747.69 kB`): the entry chunk is down **~84% in one
  day** across the two changes.
- Landing `/` now loads Landing + the tiny router entry and nothing of the authenticated app.

## Alternatives Considered

- **Keep the single top-level Suspense** (no inner boundary) — rejected: shell chrome unmounts and
  flashes to a full-screen spinner on every inner route's first load.
- **Skip the idle preload** — rejected: the first `/app` navigation would pay a cold ~854 kB chunk
  fetch; the plan flagged this risk and the preload (deduped, idle-time, cancellable) removes it
  without taxing the Landing first paint.
- **Leave the five work components eager** — rejected: `ProjectBoard` alone kept `@dnd-kit` in the
  entry; all five are route-element/JSX-only usages, safe to peel off.

## Consequences

- `/` paints with **zero shell modules on the wire** (DCL measured 460 ms in dev preview); the
  preload batch fires at ~590 ms, after DCL, so the marketing surface stays instant.
- Deep links to `/app/*` show the top-level spinner while the AppShell chunk loads, then the chrome
  paints and only the inner route suspends in the main column.
- On the pre-split levelnav branch the Vite dev server still recompiles the full eager graph — the
  familiar slow first load there is expected, not a regression of this change.
- Pre-existing and untouched: the `INEFFECTIVE_DYNAMIC_IMPORT` build warning for `auth-store`.
- **Amanah gate:** neutral — build/performance + routing only; no capital / sale / CSA / CSRA /
  salam / yield-share surface.

## Verification

- **Lint** 0 errors (grounding-strict + inline-refs ratchets both 0); **tests** 77/77.
- **Build** reproduces the numbers above; AppShell/ProjectBoard/guard chunks all emitted.
- **Dev preview `/`**: no fetch of AppShell/Sidebar/ProjectBoard/CeremonyGuard modules on load
  (`preview_network`); idle preload batch observed at 590 ms; `ProjectBoard` never fetched at all.
- **Shell persistence proven by DOM identity**: `window.__shell === document.querySelector('.app-shell')`
  stays `true` across client nav `/app` → `/app/work` — the chrome never remounted.
- **Deep-link hard load `/app`**: shell + Dashboard render; no stuck spinner, no error boundary,
  console clean.
- **Chrome interactivity intact**: Cmd+K palette opens (note: `useKeyboard` listens on `window`, so
  synthetic probes must dispatch there); MobileNav 56 px and flush at the bottom of 375×812.
  Screenshots captured for `/` and `/app` — the 30 s screenshot hang did not recur this session.

## Delivery

Commit `b8d27e6` on `perf/route-lazy-splitting` (atop the route split `5001b47`), PR
[#18](https://github.com/onaxyzogden/Maqasid/pull/18) to `main`. Files: `src/App.jsx`,
`src/components/layout/AppShell.jsx`, `src/pages/Landing.jsx`.

**Merged to `main` 2026-07-02** via PR #18 (merge commit `73424af`); feature branch pruned, `origin/main` fast-forwarded to `cd1997f`.

## Connections

- [[2026-07-02-milos-route-lazy-splitting]] — same-day predecessor; this executes its top deferred
  item (and its "still eager" ProjectBoard/AssetsTab/ProjectJournal follow-up)
- [[milos]] — the app whose cold load this reduces
- [[2026-04-25-milos-tier-2-polish]] — origin of the `ChunkErrorBoundary` + `RouteSpinner` reused
  for the inner boundary
- [[2026-04-25-milos-chunk-split]] — the data-level lazy split; entry-graph sibling
