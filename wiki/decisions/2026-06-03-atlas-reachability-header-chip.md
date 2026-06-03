---
title: "Atlas: demote ApiReachabilityBanner to a header status chip"
type: decision
date: 2026-06-03
status: accepted
tags: [ui, connectivity, atlas, refactor, web]
superseded_by: null
---

# Atlas: demote ApiReachabilityBanner to a header status chip

## Context

The API-reachability warning in [[olos]] `apps/web` rendered as
`ApiReachabilityBanner` — a `position: fixed; top: 0; left/right: 0;
z-index: 9000` full-width red bar. Sitting far above the 48px AppShell header
(`--z-sticky`), it **occluded** the header (logo, lifecycle spine, sync status,
user menu) and the Protocols / Import / Export toolbar beneath it. The steward's
report was direct: "make this a status type in header rather than a banner
because it is blocking important features."

The banner did real work beyond display: it ran the global self-heal machinery
(a `window 'online'` listener + a 15s visibility-aware reachability poll + a
silent recovery routine) on every route, including login/showcase.

## Decision

Demote the banner to a compact, non-blocking **status chip in the AppShell
header**, styled like the existing `ProofSyncIndicator` pill. Refactor the one
component into three pieces:

- **`lib/apiRecovery.ts`** — shared `attemptApiRecovery()` with a module-level
  `inFlight` guard (replaces the old per-component `inFlightRef`) so the watcher
  and the chip's Retry share one in-flight lock. Logic lifted verbatim: read the
  auth token → `initFromStorage()` if present, else `api.health()` then
  `setApiReachable(true)` (swallow failure).
- **`components/ApiReachabilityWatcher.tsx`** — headless, renders `null`, owns
  the two recovery effects (online listener + visibility-aware 15s poll),
  mounted globally in `main.tsx`.
- **`components/ApiReachabilityStatus.tsx`** (+ `.module.css`) — pure
  presentation chip (`CloudOff` icon + short label "Server unreachable" +
  explicit Retry; full message in `title`), mounted in the AppShell header
  right-cluster after `<ProofSyncIndicator />`, using its error palette
  (`rgba(217,119,87,.18)` / `#d97757` / `rgba(217,119,87,.4)`).

The old `ApiReachabilityBanner.tsx` + `.module.css` + test are deleted; the
14-test suite is split into `ApiReachabilityStatus.test.tsx` (render/priority/
Retry, 7) and `ApiReachabilityWatcher.test.tsx` (online listener + poll, 9) to
preserve coverage.

**Steward-locked decisions (AskUserQuestion):**
1. **Recovery stays global** — split into a headless watcher (keeps the online
   listener + 15s poll globally) + a header chip + shared recovery module, so
   self-heal still runs on every route.
2. **Chip form = icon + short label + Retry** — `CloudOff` + short label +
   explicit Retry button; the full message lives in the `title` attribute.

## Rationale

The header chip mirrors a pattern the app already uses (`ProofSyncIndicator`),
so the warning is visible but never occludes controls. Splitting effects into a
headless watcher preserves the banner's most important behaviour — global
self-heal — independent of where (or whether) the chip renders. The shared
`inFlight` guard prevents double-recovery when both the poll and a manual Retry
fire.

## Alternatives Considered

- **Keep the banner, lower its z-index / make it non-fixed** — rejected: still
  consumes a full-width row above the header and competes with the toolbar; the
  steward asked specifically for a header *status type*.
- **Put recovery effects in the chip** — rejected: the chip is header-only, so
  recovery would stop on headerless routes (`/login`, `/showcase/*`, legacy
  `/project/`). Effects must live in the always-mounted watcher.

## Consequences

- The visible indicator is **header-only**. On routes that render no header
  (legacy `/project/`, `/login`, `/showcase/*`) there is no on-screen warning —
  but global recovery still runs via the watcher, so the chip reappears the
  moment a header route mounts. This is the accepted trade-off of the steward's
  "put it in the header" intent.
- Future connectivity surfaces should consume `attemptApiRecovery()` from
  `apiRecovery.ts` rather than re-implementing recovery.

## Connections

- [[olos]] — the project this lands in (`apps/web`)
- [[2026-05-30-atlas-act-data-layer-rework]] — the conflict/sync surface this
  reachability signal sits alongside (if present)

## Implementation

Committed `4c590fb4` (16 files, +558/−432) on `feat/atlas-permaculture`, staged
by explicit path, **local only / not pushed**. Verified: `apps/web` typecheck
EXIT 0; **16/16** bounded vitest (`pool:'forks'`); dark + light preview
screenshots confirm the unobstructed header + working chip (appears on problem,
Retry → "Reconnecting…", auto-hides on recovery). The cosmetic doc-comment
rename in `apiClient.ts` was **excluded** from the commit — that file is
entangled with foreign "Compost vertical" WIP; the feature is complete without
it. Logged [[log]] (2026-06-03).
