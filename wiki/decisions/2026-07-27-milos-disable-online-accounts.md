---
title: "MILOS online accounts disabled behind CLOUD_ACCOUNTS_ENABLED (backend not ready) + backfilled record of the dormant cloud-sync design"
type: decision
date: 2026-07-27
status: accepted
tags: [milos, supabase, auth, sync, feature-flag, deploy, honesty, amanah, dormant]
superseded_by: null
---

# MILOS online accounts disabled behind `CLOUD_ACCOUNTS_ENABLED`

**Status:** Accepted + implemented (2026-07-27). One hardcoded build-time switch turns the entire Supabase online-account and cloud-sync surface off. All ~1,150 lines of it stay on disk, dormant. Restoring the feature is one boolean plus four lines in `App.jsx` plus the CI secrets. Uncommitted on `claude/remove-mios-online-signup-0a709e`; the commit and the deploy are operator-gated.

Operator's words: *"the backend for MIOS online signup (not local) account signup/login is not ready so let's remove it from the live web app for now."*

## Context

Commit `9cf732a` (2026-06-04) shipped a complete Supabase online-account + cloud-sync system into MILOS. **The backend behind it is not ready — but the feature was live in production.** Verified this session against `https://maqasid.ogden.ag`:

- The landing nav rendered `<a class="btn btn-ghost" href="/auth">… Sign In</a>`. That element only renders when `isSupabaseConfigured` is true, which means the `VITE_SUPABASE_*` GitHub secrets **had** been added.
- `https://maqasid.ogden.ag/auth` served a fully working form: *"MIOS / Welcome back / Sign in / Create account / Email address / Password / Sign in with a magic link instead"*.

So any visitor could create a real account against a backend that isn't finished.

> [!warning] The wiki's own record of this was stale
> `wiki/log.md`'s 2026-06-05 entry still listed *"add the two Supabase secrets to GitHub repo settings"* as an **outstanding operator action**. It had in fact been done. The wiki said the feature was dark; the live site said otherwise. Live-site verification is what caught it — reading the wiki alone would have produced the wrong plan.

**Second problem, independent of readiness — an honesty gap.** [Landing.jsx:85](src/pages/Landing.jsx:85) tells visitors in the FAQ: *"All data is stored locally on your device. Nothing is sent to external servers."* That was **false** for any signed-in user, because `sync-service.js` pushes a full filtered `localStorage` snapshot to the Supabase Storage bucket `mios-snapshots`. A second string, [Landing.jsx:307](src/pages/Landing.jsx:307), actively sold the thing that made it false: *"To sync across devices, create a free account."*

Turning the feature off makes the published privacy claim true again. This follows the precedent already set for OLOS in [[2026-06-19-atlas-offline-demo-deploy]] — ship no sign-in link when the real login isn't ready, and never mislead about where a user's data lives.

**Amanah gate:** positive. Removing a signup path that collects an email and a password against an unfinished backend, and restoring the accuracy of a published privacy claim, is a straightforward *amanah* correction — the app now does what it says it does. No capital instrument, no CSA/CSRA/salam/yield-share surface, no fiqh authored or removed. No user data is deleted anywhere: local `bbiz_*` data is untouched, and the Supabase bucket/table are left intact.

## Decision

Operator chose **flag off + redirect**, explicitly not a hard delete, and explicitly not deploy-side-only:

1. **One hardcoded master switch, not an env var.** `CLOUD_ACCOUNTS_ENABLED = false` lives in source. A stray `.env`, a re-added CI secret, or a local dev environment cannot silently re-expose signup — only a code edit can.
2. **Redirect, don't delete, the routes.** `App.jsx` has **no `*` 404 route**, so an unmatched top-level path renders a blank white page. `/auth` → `/get-started` and `/app/account` → `/app/settings` keep old links and bookmarks landing somewhere useful.
3. **Strip the CI secrets injection too.** Flag-off alone would still bake the anon key into the public bundle. `deploy.yml` no longer passes it.
4. **Silently.** Operator confirmed no real cloud users exist yet ("just me testing"), so no migration notice, no user-facing messaging, no in-app explanation.
5. **The local profile is untouchable.** See the constraint below.

### The load-bearing constraint: two different "users"

MILOS has **two independent identity notions**, and conflating them would log everyone out of the app:

| | Local profile | Cloud identity |
|---|---|---|
| State | `user` in `auth-store` | `authStatus` / `supabaseSession` in the same store |
| Storage | `localStorage` key `bbiz_user` | Supabase session |
| Set by | Onboarding, Landing's "Enter MIOS" modal | Supabase sign-in |
| Gates | **`ProtectedRoute` gates all of `/app` on this** | Nothing routable — UI visibility only |
| Read by | ~15 components (`TopBar`, `NotificationsPanel`, `TeamChat`, `Forum`, `Announcements`, `DiscussionPanel`, `BbosTaskPanel`, `WebsitesTab`, `AccountsTab`, `ClockInModal`, `AddContactModal`, `Settings`, `Onboarding`, `Landing`) for greetings, assignee initials, message authorship | 4 components, all cloud-only |

`ProtectedRoute` never consults Supabase. The app is fully usable signed-out; cloud auth was purely additive. So [auth-store.js:18-53](src/store/auth-store.js:18) (`user`, `login`, `updateUser`, `logout`) was declared off-limits and left byte-identical.

### The chokepoint that made this an 8-file change

`initAuth()` is the only place `authStatus` can leave `'loading'`. Guarding it so it settles permanently at `'guest'` disables four more files **with zero edits to any of them**, because each already early-returns when not authenticated:

- `SyncStatusChip.jsx:23` → returns `null`
- `FirstLoginModal.jsx` → never receives a conflict to render
- `useSyncObserver.js:17` → early-returns
- `Settings.jsx` `AccountSyncSection` → authenticated branch never taken (belt-and-braces `cloudAccountsEnabled` guard added anyway)

Finding this chokepoint is why the change is ~95 lines across 8 files instead of a sweep through 12+.

### Flag semantics — three names, deliberately distinct

```js
export const CLOUD_ACCOUNTS_ENABLED = false;              // the master switch
export const isSupabaseConfigured = /* both env vars present */;  // credentials only
export const cloudAccountsEnabled = CLOUD_ACCOUNTS_ENABLED && isSupabaseConfigured;
```

`isSupabaseConfigured` keeps its original meaning ("creds exist") and is now **never** the right thing to branch on — it no longer implies "safe to call". Every consumer was migrated to `cloudAccountsEnabled`. The client itself is gated on the combined flag, so no `SupabaseClient` can be constructed while disabled.

## Changes

Eight files, `+61 / -34`:

| File | Change |
|---|---|
| [src/services/supabase.js](src/services/supabase.js) | Master switch + combined flag; `supabase` is `null` when off |
| [src/store/auth-store.js:64](src/store/auth-store.js:64) | `initAuth` guard → `cloudAccountsEnabled`; `authStatus` freezes at `'guest'`. **Lines 18-53 untouched.** |
| [src/services/sync-service.js:101,151](src/services/sync-service.js:101) | Both guards → `cloudAccountsEnabled`; error text → `'Cloud accounts disabled'` |
| [src/App.jsx](src/App.jsx) | `AuthPage`/`AccountPage` `lazy()` imports removed; `/auth` → `<Navigate to="/get-started" replace>`; `account` → `<Navigate to="/app/settings" replace>` |
| [src/pages/Landing.jsx](src/pages/Landing.jsx) | 2 ternaries → `cloudAccountsEnabled` (nav falls back to "Enter MIOS", modal footer to "Cancel"); **line 307 copy rewritten** (below) |
| [src/pages/Onboarding.jsx](src/pages/Onboarding.jsx) | 5 references → `cloudAccountsEnabled`; `STEPS` collapses to `['Welcome','Profile','Values']` |
| [src/pages/Settings.jsx](src/pages/Settings.jsx) | `AccountSyncSection` early-returns `null`. Local "Sign Out" at line 589 **kept** — it clears the local profile, not a cloud session |
| [.github/workflows/deploy.yml](.github/workflows/deploy.yml) | `VITE_SUPABASE_*` env block deleted so the anon key stops shipping |

**Copy fix, [Landing.jsx:307](src/pages/Landing.jsx:307):**

- Before — *"Your data stays on this device only. To sync across devices, create a free account."*
- After — *"Your data stays on this device only. You can export a full backup any time from Settings."*

Every fallback branch already existed in the JSX; no new UI was built. `website/` was checked and contains no app signup/login links, so the marketing site needed no change.

## Backfilled: the dormant cloud-sync design

Commit `9cf732a` claims *"Requires Supabase project setup per wiki decision"* — **no such decision was ever written.** Recording the design here so it isn't lost while dormant.

**Strategy:** full-snapshot, last-write-wins. Not CRDT, not per-record merge.

- **Push** — `buildSyncSnapshot()` takes `exportAll()`, deletes every key in `SYNC_EXCLUDED_KEYS` ([storage.js:188-209](src/services/storage.js:188)), strips base64 attachment payloads from every `tasks_*` key (metadata kept, `_syncExcluded: true` marker added), stamps a `_sync_meta` header (`schema_version`, `exported_at`, `device_id`), then uploads to Storage bucket **`mios-snapshots`** at `${userId}/snapshot.json` and upserts a metadata row in table **`user_snapshots`** (`user_id` PK, `storage_path`, `schema_version`, `device_id`, `snapshot_size_bytes`).
- **Pull** — read the `user_snapshots` row, download the blob, compare timestamps.
- **`SCHEMA_VERSION = '5.0'`.** `applyPull` warns but proceeds when the cloud snapshot is *newer* than the running app; migrations run on reload.
- **A pull always requires a full page reload.** Zustand stores hydrate from `localStorage` at module-load time, so `applyPull()` does `createBackup()` → `clearAll()` → `importAll()` → `window.location.reload()`. `importAll()` alone is *additive* — it writes cloud keys over local ones without removing keys absent from the snapshot; only the `clearAll()` first makes it a true replace.
- **Timings:** push debounce 30 s · periodic pull 5 min (tab-focused only) · pull-after-push guard 60 s (race avoidance) · staleness threshold 2 h · timestamps within 5 s treated as equal.
- **Device identity:** a `nanoid(12)` in `sync_device_id`, generated once, never synced.
- **First-login conflict matrix:** `has_local_and_cloud` (ask) · `has_local_no_cloud` (offer backup, dismissible via `sync_backup_dismissed`) · `no_local_has_cloud` (auto-pull, no prompt).
- **Auth-event dedupe:** supabase-js re-emits `SIGNED_IN` on tab refocus and `TOKEN_REFRESHED` on a timer, so `_authBootUserId` guards conflict detection to once per page load per user.

**Dormant surface, all still on disk, all unreferenced:** `AuthPage.jsx` (220) · `AccountPage.jsx` (201) · `sync-service.js` (287) · `auth-store.js` cloud half (~155 of 216) · `FirstLoginModal.jsx` (92) · `SyncStatusChip.jsx` (63) · `supabase.js` (44) · `useSyncObserver.js` (32).

## Verification

| Check | Result |
|---|---|
| ESLint on the 8 changed files | **0 errors** |
| `npm test` | **94/94 passed** |
| `npm run lint:grounding-strict` | pass |
| `npm run audit:inline-refs` | pass (0 ≤ ratchet 0) |
| `npm run build` | green, 1.46 s |
| `AuthPage` / `AccountPage` chunks in `dist/` | **absent** (Vite stops building them) |
| `createClient`, `gotrue`, `postgrest`, `realtime-js`, `StorageClient`, `GoTrueClient`, `mios-snapshots`, `user_snapshots`, `signInWithPassword`, `supabase.co` in `dist/` | **all absent** |

Browser, against the dev server:

| Check | Result |
|---|---|
| `/` nav | "Enter MIOS" + "Get Started"; `a[href*="auth"]` → `[]` |
| Enter MIOS modal | "Continue locally" · Cancel + Continue; `/create.*account/i` false page-wide |
| `/auth` | → `/get-started` |
| Onboarding | "STEP 1 OF 2" → "STEP 2 OF 2" → **Launch MAQASID**; sync step gone |
| Finish onboarding | lands on `/app` |
| Sidebar | no Account item; `/sync/i` false |
| `/app/account` | → `/app/settings` |
| `/app/settings` | no "Account & Sync", no "Sync now", no "Sign in"; local **Sign Out** intact |
| Network | zero requests to any `*.supabase.co` host |
| Console | no errors |

> [!note] Screenshot proof unavailable — disclosed, not assumed
> `computer({action:"screenshot"})` failed on every attempt with *"the Browser pane is not displayed, so the page is not compositing frames"* — the same recurring environment fault seen in multiple sessions this month ([[project-screenshot-hang]]-class, page still unwritten). Verification was done by reading the live DOM instead, which is in fact **stronger** evidence than a screenshot for the claims being made here, since almost every check is "string X / element Y is *absent*".

### Two pre-existing failures, proven unrelated

Both predate this work and neither is caused by it:

1. **`npm run lint` red** on `Date.now()` purity at [Orientation.jsx:42](src/components/orientation/Orientation.jsx:42). Proven by `git stash push -u` → running ESLint on clean `HEAD` → identical error → `git stash pop`. Same failure already recorded in the 2026-07-23 and 2026-07-25 log entries.
2. **`npm run generate:pillar-glyphs:check` ENOENT** on `node_modules/lucide-react/…/compass.js`. A **git-worktree artifact**: the worktree has no `lucide-react` of its own, Vite resolves it by walking up to the parent repo's `node_modules` (verified present), but [scripts/generate-pillar-glyphs.mjs:37](scripts/generate-pillar-glyphs.mjs:37) hardcodes `resolve(REPO, 'node_modules/lucide-react/...')`. Would pass in CI, where `npm ci` installs at the repo root.

The covering gates (per-file ESLint, `npm test`, `npm run build`) were therefore run separately and shown green, rather than hiding behind the red aggregate.

### Correction to the approved plan

The plan's *Deferred* section predicted `@supabase/supabase-js` (~110 KB) would still ship, on the reasoning that `auth-store.js` statically imports `supabase.js` which statically imports `createClient`. **That was wrong, in the favourable direction.** Because `CLOUD_ACCOUNTS_ENABLED` is a compile-time `const false`, Rolldown constant-folds the ternary and tree-shakes the whole library away:

| | Total JS in `dist/assets` | `index-*.js` | `GoTrueClient` present |
|---|---|---|---|
| Before | 9,648.1 KB | 277.4 KB | yes |
| After | 9,429.7 KB | 273.6 KB | **no** |

**218.4 KB removed.** The only residual `"supabase"` matches in `dist/` are minified field names and dead error strings from the retained auth-store (`supabaseSession:null`, `Error('Supabase not configured')`) — not library code, and not reachable.

## How to restore, when the backend is ready

1. `CLOUD_ACCOUNTS_ENABLED = true` in [src/services/supabase.js](src/services/supabase.js).
2. Re-add the two `lazy()` imports and swap the two `<Navigate>` routes back to `<AuthPage />` / `<AccountPage />` in [src/App.jsx](src/App.jsx).
3. Re-add the `VITE_SUPABASE_*` `env:` block to the build step in [.github/workflows/deploy.yml](.github/workflows/deploy.yml), and re-create the repo secrets.
4. Revert the [Landing.jsx:307](src/pages/Landing.jsx:307) copy — and **fix the FAQ at [Landing.jsx:85](src/pages/Landing.jsx:85) at the same time**, since "Nothing is sent to external servers" becomes false again the moment sync returns. That string is the reason this ADR exists; do not let it drift back.

Nothing else needs restoring — the four self-disabling components come back on their own as soon as `authStatus` can reach `'authenticated'`.

## Operator actions (outside this session)

1. **Delete the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` GitHub repo secrets.** Removing the `deploy.yml` reference stops them being *used*; deleting them stops them existing. **The currently-published anon key should be treated as exposed** — it has been shipping in the public JS bundle.
2. **Verify the `public/CNAME` discrepancy.** The file says `bboss.ogden.ag`; the live app is `maqasid.ogden.ag`. **Deliberately not changed** — editing it risks taking the live site down. Needs operator confirmation of which domain Pages is configured for.
3. **Do not delete `mios-snapshots` or `user_snapshots`.** Pause the Supabase project if you like, but the bucket and table should survive if the feature is coming back.
4. Commit and deploy are operator-gated as usual — this work is uncommitted on `claude/remove-mios-online-signup-0a709e`.

## Consequences

- A visitor to `maqasid.ogden.ag` can no longer create an account against an unfinished backend. `/` → onboarding → `/app` involves no account prompt at any point.
- The FAQ's "Nothing is sent to external servers" is **true again**.
- No Supabase credentials in the deployed bundle; 218 KB smaller.
- Existing local users are unaffected — nothing logged out, nothing cleared.
- Anyone who *did* create a cloud account during the live window keeps their snapshot in `mios-snapshots`; it becomes reachable again on restore. Their local data was never dependent on it.
- The sync design is now recorded (above) rather than living only in code comments, closing the ADR gap left by `9cf732a`.

## Related

- [[milos]] — the product entity
- [[2026-06-19-atlas-offline-demo-deploy]] — the OLOS precedent: no sign-in link when login isn't ready
- [[amanah-gate]] — the honesty screen this change answers to
