---
title: "Atlas Web — Surface API-unreachable state: boot-session retry + global reachability banner"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, web, auth, connectivity, api-client, banner, ui, reachability, boot, retry, network-error]
superseded_by: null
---

# Atlas Web — Surface API-unreachable state: boot-session retry + global reachability banner

## Context

The dead-origin **login** guard already shipped (commit `daa0d62a`): a failed
`login()`/`register()` caused by a network-level `TypeError` now shows
an actionable message instead of raw "Failed to fetch". That fix deliberately scoped out two
remaining blind spots, which this change closes:

1. **Silent boot-session failure.** `initFromStorage()` has a transient `else` branch: when
   `/auth/me` fails for a **non-auth** reason (server down / still starting / dead origin), it kept
   the token but set `user: null` and marked loaded — **silently**. The header then rendered the
   generic "Account" button and the user had no idea their session never verified or how to recover.

2. **No global "API unreachable" surface.** Network-level fetch rejections were reported to telemetry
   only; nothing in the UI told the user the backend was unreachable, and individual stores quietly
   fell back to local data. `connectivityStore.isOnline` tracked `navigator.onLine` only — it was
   **never** set from real API reachability.

The steward chose (AskUserQuestion) **"Both" approaches** (a dedicated boot-session message AND a
global reachability surface) each recoverable by **"Both"** mechanisms (a manual **Retry** button AND
automatic re-attempt when connectivity returns).

## Decision

Add a global `apiReachable` signal plus a boot-specific `sessionUnverified` flag, surfaced by a new
**always-mounted** `ApiReachabilityBanner` (mirroring the proven `SessionExpiredBanner` pattern),
with both manual Retry and auto-retry on the browser `online` event. The apiClient changes stay
**contract-preserving**: the network `TypeError` is still **re-thrown unchanged** (the raw-rethrow
contract relied on by the fallback stores is untouched) — we only *observe* outcomes via injected
module-global hooks. Shipped as one commit on `feat/atlas-permaculture`, **`08db4ed3`** (11 files,
+515/−11), committed immediately on verify per the externally-rebased-branch rule.

### Why a dedicated banner, not OfflineBanner

`OfflineBanner` is mounted only behind `FLAGS.OFFLINE_MODE`, which defaults to `false`
(`FEATURE_OFFLINE === 'true'`). Folding the API-unreachable surface into it would leave the banner
dark in the default build. A dedicated always-mounted banner keeps API-reachability UX independent of
the offline-sync flag and leaves the severity ladder inside OfflineBanner untouched.

### Why the apiClient changes stay minimal (contract-preserving)

The `apiClient.clientError.test.ts` raw-rethrow contract (`rejects.toBe(netErr)`) and the fallback
stores (projectStore, ArchivePage, commentStore, memberStore) depend on the network `TypeError`
flowing through unchanged. So we only **observe**: failure already flows through `reportApiFailure`
(read `code === 'NETWORK_ERROR'` there to set `apiReachable = false`), and we add **one** new optional
success hook on the 2xx path to set `apiReachable = true` — a server restart fires no browser `online`
event, so a success signal is required for the banner to auto-clear on recovery.

### Changes

- **`store/connectivityStore.ts`** — added `apiReachable: boolean` (default `true`, runtime-only, not
  persisted) + `setApiReachable(reachable)` that **no-ops when unchanged**
  (`set((s) => s.apiReachable === reachable ? s : { apiReachable: reachable })`) so the success hook
  (which fires on every successful request) never notifies subscribers needlessly.
- **`lib/apiClient.ts`** — added module-global `apiSuccessHandler` + `setApiSuccessHandler(fn)`
  (mirroring `setApiClientErrorReporter`), called on the 2xx path just before `return json`, skipping
  telemetry POSTs (loop-guard parity with `reportApiFailure`) and wrapped so it can never break the
  request path. **The fetch-catch raw re-throw is unchanged.**
- **`app/bootAuthed.ts`** — in the existing `setApiClientErrorReporter` callback, after
  `recordClientError(...)`, set `apiReachable = false` when `r.code === 'NETWORK_ERROR'`; and
  registered `setApiSuccessHandler(() => …setApiReachable(true))`.
- **`store/authStore.ts`** — added `sessionUnverified: boolean` (default `false`). `initFromStorage()`
  raises it in the transient `else` (token kept, `user: null`) and clears it on the `!stored` early
  return, the success branch, and the auth-failure (401) branch. `login()`/`register()` success and
  `logout()` clear it. Purely additive — the existing `authErrorMessage` guard and tests are
  unaffected.
- **`components/ApiReachabilityBanner.tsx`** (+ `.module.css`) — always-mounted, subscribes
  `apiReachable` + (`sessionUnverified`, `token`). Render priority: `sessionUnverified` ("We couldn't
  verify your saved session — the server may be temporarily unreachable.") > `!apiReachable` ("Can't
  reach the server — some data may be unavailable or out of date.") > `null`. **Retry** with a token
  re-runs `initFromStorage()` (success sets the user + the success hook flips `apiReachable` true);
  with no token it falls back to `window.location.reload()` (avoids inventing a health endpoint). A
  `useEffect` registers a window `'online'` listener that re-runs Retry only while a problem is
  showing. `role="alert"`, `data-testid="api-reachability-banner"`, brief "Retrying…" disabled state.
- **`main.tsx`** — mounted `<ApiReachabilityBanner />` as a sibling of `<SessionExpiredBanner />`
  inside `QueryClientProvider` (free on the showcase path — both signals stay at their defaults there).

### Key choices

- **Observe, don't intercept.** The success/failure hooks are injected module-globals (store-agnostic
  apiClient), so the raw-rethrow contract and every fallback store stay byte-for-byte unchanged.
- **No-op `setApiReachable` when unchanged.** The success hook fires on every 2xx; the no-op guard
  keeps it from spamming subscribers on the steady-state happy path.
- **Two distinct signals, one banner.** `sessionUnverified` (boot-specific, highest priority) and
  `apiReachable` (global) carry different copy and different recovery, but share one always-mounted
  surface.
- **No-token Retry = reload**, not a new unauthenticated health endpoint — the next successful request
  on re-boot flips the flag.

## Rationale

Mirroring `SessionExpiredBanner` (always-mounted RouterProvider sibling) and the existing handler-
injection pattern keeps the surface minimal and consistent, makes API-reachability UX independent of
the off-by-default offline flag, and leaves the apiClient raw-rethrow contract — and the stores that
rely on it — completely intact. The user now gets specific, recoverable feedback for both a silent
boot-session failure and a mid-session backend outage, each clearing automatically when the server
returns.

## Consequences

- A silent boot-session failure now shows a specific, recoverable message; a mid-session backend
  outage shows a global one; both auto-clear on the next success or on `online`.
- **Contract preserved.** No change to the apiClient raw-rethrow or the login/register guard; the
  fallback stores are untouched.
- **Verification:** **31/31 unit tests green** — new `connectivityStore.apiReachable` (3),
  `authStore.sessionUnverified` (4), `apiClient.successHook` (5), `ApiReachabilityBanner` (5), plus the
  **preserved** `apiClient.clientError` raw-rethrow and `authStore.networkError` (4) contracts.
  Typecheck clean on all 11 touched files (the foreign-WIP baseline — `NewProjectPage.tsx` +
  `wizard/types.ts`, shifted out-of-band by a concurrent rebase, since fixed by foreign commit
  `520a9f9b` — is not mine). **Live preview:** all three banner states (verified-hidden,
  session-unverified, API-unreachable) rendered correctly in the real bundle, confirmed via the
  accessibility tree (`role="alert"` text + the "Retry" button); `preview_screenshot` timed out on the
  MapLibre/WebGL canvas, so the visual capture was **disclosed as unavailable, not faked** (per
  [[2026-05-19-atlas-preview-screenshot-verification-standard]]). A live-drive test-harness pitfall was
  found and worked around: Vite dev serves `connectivityStore.ts`, `.js`, and the HMR-versioned
  `?t=<ts>` URL as **different module instances**, so eval-driving the live store requires importing the
  exact `?t=` URL the mounted component imports — an app-correct behaviour, not a bug.
  Committed `08db4ed3` on `feat/atlas-permaculture`, staged by explicit path (no foreign WIP bundled);
  already pushed (branch in sync with origin; foreign `520a9f9b` now sits on top).

## Follow-up — 2026-05-25 (commit `6964bea8`)

The "**No-token Retry = reload**" key choice above is now superseded. A health
endpoint landed, so the showcase/no-token Retry path no longer does a full page
reload:

- **`apps/api/src/app.ts`** — added a lightweight, unauthenticated
  `GET /api/v1/health` (standard `{ data, error }` envelope, no DB/Redis) under
  the proxied `/api/v1` prefix. (The root `/health` stays as a bare infra
  liveness probe and is **not** reachable through the web app's `/api`-only dev
  proxy — hence the separate `/api/v1` route.)
- **`apps/web/src/lib/apiClient.ts`** — exposed `api.health()` hitting
  `/api/v1/health`. A 2xx still fires the success hook on the authed path.
- **`apps/web/src/components/ApiReachabilityBanner.tsx`** — the no-token Retry
  now `await api.health()` and, on success, flips `apiReachable` **directly**
  (the success hook is wired authed-only, so the banner can't rely on it here),
  clearing the banner with **no page reload**; on failure the banner persists.

**Verification:** web vitest 30/30 (banner now 7 incl. 2 new no-token cases:
health-ping-success-clears and health-ping-failure-persists; `apiClient.successHook`
now 6 incl. the new `api.health()` route+hook case; raw-rethrow contract preserved);
API smoke 9/9 (incl. the new `GET /api/v1/health` no-auth/no-DB test); web + API
typecheck exit 0. Committed `6964bea8` on `feat/atlas-permaculture`, staged by
explicit path (no foreign WIP bundled), pushed clean (`c865837a..6964bea8`).

## Follow-up — 2026-05-25 (commit `60aea010`)

The last named limitation in **Consequences** — recovery still needed a successful
request, the browser `online` event, or a manual Retry — is now closed. The banner
**self-heals** via a background reachability poll:

- **`apps/web/src/components/ApiReachabilityBanner.tsx`** — the token / no-token
  recovery body is extracted into a silent `attemptRecovery()` shared by manual
  Retry, the `online` listener, and a new poll (overlap-guarded by a `useRef`,
  reads the token fresh via `useAuthStore.getState()` so interval closures can't go
  stale). A `useEffect` keyed on `visible` runs `setInterval(…, 15_000)` only while
  the banner shows — so it self-terminates when recovery flips `visible` false — and
  also registers a `visibilitychange` listener that re-checks **immediately** on tab
  refocus. `pingIfActive` skips when the tab is hidden or the device is offline
  (mirrors `syncService.startHeartbeat()` guards; the `online` event covers the
  offline→online edge). The manual `online` listener was repointed at the silent
  `attemptRecovery()` so auto-recovery no longer flashes "Retrying…".
- **Decision: poll only.** DRYing the two `/health` handlers was deferred — still no
  third caller, and root `/health` (bare infra probe, unproxied) vs `/api/v1/health`
  (enveloped, proxied) serve deliberately different contracts. No API/server change
  in this slice.

**Verification:** web vitest 20/20 for the touched suites — `ApiReachabilityBanner`
now 14 (7 new poll tests: interval-ping-and-clear, stop-after-recovery,
no-poll-while-healthy, immediate-on-refocus, skip-while-hidden, skip-while-offline,
clear-on-unmount) + `apiClient.successHook` 6; web typecheck exit 0. A test
stack-overflow was root-caused to mock pollution: `vi.spyOn(document,
'visibilityState', 'get')` corrupts into a self-recursive getter when
`vi.restoreAllMocks()` restores a prototype getter-spy, blowing the stack in the
next test that reads `visibilityState` — fixed by using `Object.defineProperty` with
plain values for the DOM overrides and resetting them in the nested `afterEach`.
Committed `60aea010` on `feat/atlas-permaculture`, staged by explicit path (two
files; large foreign WIP and three concurrent "Command Centre" refactor commits left
untouched). **Push held** at the steward's direction — the branch owner was actively
committing into the repo, so publishing their in-progress commits via fast-forward
was declined; the slice is protected as a local commit.

## Connections

- The prior login-unreachable guard (commit `daa0d62a`) this extends — same raw-rethrow-preserving philosophy (no ADR was filed for that contained fix)
- [[2026-05-19-atlas-preview-screenshot-verification-standard]] — the preview/verification standard governing the screenshot-timeout disclosure
- [[olos]] — the project this extends (web auth/connectivity surface)
