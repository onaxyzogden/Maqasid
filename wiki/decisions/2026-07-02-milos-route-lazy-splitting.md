---
title: "MILOS — App.jsx route pages converted to React.lazy code-splitting"
type: decision
date: 2026-07-02
status: accepted
tags: [architecture, performance, ui, vite, code-splitting, react-router]
superseded_by: null
---

# MILOS — App.jsx route pages converted to React.lazy code-splitting

## Context

The session opened on a plain "load mobile preview" request that surfaced a **blank / very slow cold-load** of the dev server (375×812 mobile viewport). Root cause: `src/App.jsx` eagerly `import`ed ~60 route page modules at the top of the entry graph. Vite 8 dev serves modules **unbundled, on demand**, so every eagerly-imported page (and its transitive deps) had to compile on the *first* paint — 100+ modules before Landing could render, which on Windows + this heavy app reads as a blank screen for many seconds. In production the same eager graph inflated the single entry chunk.

This is the **page-level counterpart** to the data-level split already shipped in [[2026-04-25-milos-chunk-split]] (the `seed-hydrator.js` lazy `PILLAR_LOADERS` map). The `<Suspense fallback={<RouteSpinner/>}>` + `<ChunkErrorBoundary>` scaffolding this decision relies on was already in place from [[2026-04-25-milos-tier-2-polish]] (which also set the precedent by making the 3 Moontrance pages lazy).

## Decision

Convert **~55 eagerly-imported route page modules in `src/App.jsx` to `React.lazy(() => import(...))`.** Only four things stay eager:

- `Landing` (the `/` first paint — must not flash a spinner)
- `AppShell` (the authenticated shell wrapping every `/app/*` route)
- `RouteSpinner` and `ChunkErrorBoundary` (the fallback + recovery for everything else)

All lazy routes render under the **single pre-existing** top-level `<ChunkErrorBoundary><Suspense fallback={<RouteSpinner/>}><Routes>…`. Also in this change:

- **Removed 5 dead dashboard imports** — `FaithDashboard`, `HealthDashboard`, `IntellectDashboard`, `FamilyDashboard`, `EnvironmentDashboard` were imported but never rendered (grep-confirmed no JSX usage; ESLint missed them because the flat config's `no-unused-vars` `varsIgnorePattern: '^[A-Z_]'` exempts PascalCase). Deleted rather than converted to dead lazy consts.
- **`vite.config.js` preview plumbing** (carried from the prior preview session, committed together): `server.port: process.env.PORT ? Number(process.env.PORT) : 5173` so preview harnesses / multi-instance dev can bind an assigned port, with `import process from 'node:process'` to satisfy the flat ESLint config (which loads `globals.browser` only — no node globals). `.claude/launch.json` "MAQASID OS - Dev" gained `autoPort: true`.

## Rationale

- **`import()` is the only thing that creates a separate route chunk.** The seed `manualChunks` map already existed but does nothing for cold-load, because a static `import` still pulls the page into the entry graph regardless of chunk assignment. Lazy dynamic import is what peels each page onto its own on-demand chunk.
- **Measured entry-chunk reduction (fresh production `vite build`):**
  - Entry JS `1,747.69 kB → 1,536.45 kB` (gzip `471.56 → 438.17`) — **−211 kB / −12.1%**
  - Entry CSS `400.10 kB → 268.24 kB` (gzip `57.52 → 42.56`) — **−132 kB / −33.0%**
  - ~55 per-route JS + CSS chunks now emitted, loaded only when their route is visited.
- **Keeping Landing eager** preserves an instant, spinner-free `/` — the marketing/entry surface must never flash a fallback.
- **Keeping AppShell eager** was a deliberate scope boundary (see Alternatives) — making it lazy needs the `<Suspense>` relocated into the shell's `<Outlet>` to avoid a shell-chrome flash, which is a separate change.

## Alternatives Considered

- **Also make `AppShell` lazy now** — rejected for this session (out of the approved plan's scope). AppShell's whole dependency tree (Sidebar, TopBar, MobileNav, IslamicRail/Panel, prayer-posture images, seed-hydrator, stores) still loads on **every** route including Landing `/`; this is now the **dominant remaining cold-load cost**. Deferred as the recommended next step: lazy `AppShell` **and** move `<Suspense>` inside its `<Outlet>` so the shell paints immediately and only the inner route suspends.
- **`manualChunks`-only tuning** — insufficient; it re-labels chunks but cannot remove a statically-imported page from the entry graph.
- **Do nothing / accept slow dev cold-load** — rejected; the blank-preview papercut recurs every session and also ships an oversized entry chunk to users.

## Consequences

- First paint of `/` and `/app` now loads a much smaller initial set; each route page arrives as an on-demand chunk with a `RouteSpinner` fallback and `ChunkErrorBoundary` recovery (Retry → `window.location.reload()`).
- **Still eager and worth a follow-up:** `ProjectBoard` (~387 kB), `AssetsTab`, `ProjectJournal` remain statically imported in `App.jsx` though only nested `work/*` routes use them → convert to lazy.
- **Pre-existing, not introduced here:** the `IslamicPanel.jsx` unused-`eslint-disable` warning; the `INEFFECTIVE_DYNAMIC_IMPORT` build warning for `auth-store` (statically imported widely + dynamically in `sync-service`).
- **Amanah gate:** neutral — build/performance + client-side routing only; no capital / sale / CSA / CSRA / salam / yield-share surface touched.

## Verification

- **Lint** `npm run lint` — 0 errors; grounding-strict + inline-refs ratchets both at 0.
- **Tests** `npm test` — 77/77 across 3 files.
- **Build** — fresh `vite build` reproduces the after-numbers exactly (JS 1,536.45 kB / CSS 268.24 kB) and emits per-route chunks.
- **Mobile preview (375×812)** — `/` (Landing, eager) renders identically; lazy Dashboard (`/app`) and a lazy pillar page (`/app/pillar/faith` → `FaithCorePage`) both resolve to real content (Niyyah objectives / "SHAHADA SALAH ZAKAH SIYAM HAJJ … Path to Excellence") with **no ChunkLoadError, no error boundary, no console errors**. Verified via `preview_eval` DOM/accessibility polling — `preview_screenshot` timed out at 30 s on this heavy page (a known recurrence, [[project-screenshot-hang]] class), disclosed rather than assumed.

## Delivery

Committed 2026-07-02 per the standing branch strategy (code off `main`, wiki on current branch): code (`src/App.jsx`, `vite.config.js`, `.claude/launch.json`) on `perf/route-lazy-splitting` cut from `origin/main`, PR to `main`; this wiki entry on `docs/preserve-olos-ecovillage-stage-drafts`. The lazy-AppShell follow-up (see Alternatives) ships on the same perf branch.

## Connections

- [[milos]] — the app whose entry cold-load this reduces
- [[2026-04-25-milos-chunk-split]] — the data-level seed-hydrator lazy split; this is its page-level sibling
- [[2026-04-25-milos-tier-2-polish]] — introduced the `ChunkErrorBoundary` + Suspense scaffolding and the first lazy routes (Moontrance) this decision generalizes
