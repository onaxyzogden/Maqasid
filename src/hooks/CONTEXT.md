# Hooks & Services — CONTEXT.md

## Purpose
Custom React hooks (5) and utility services (3) shared across the app.

## Hooks

| File | Description |
|------|-------------|
| useInactivity.js | Monitors user activity (mousemove, keydown, click, scroll, touchstart); triggers `onInactive` after timeout (default 20min); throttles events (30s); handles tab visibility |
| useKeyboard.js | Listens for Cmd+K (search), Cmd+I (Islamic panel), Escape; calls handler(e) |
| useMobile.js | Tracks window width vs 768px breakpoint; returns boolean |
| useModuleProgress.js | Aggregates task completion by moduleId; returns `{ total, completed, pct }` |
| useDashboard.js | Utility module (not a hook): `getGreeting()` returns time-of-day string, `getMotivation()` returns day-indexed phrase, `BCG_RANGES` array defines chart range options |
| usePrayerTimes.js | Fetches from Aladhan API (method 2); reverse geocodes via Nominatim; calculates active prayer window (5min before to 10min after); polls every 30s; caches to localStorage |

## Services

| File | Description |
|------|-------------|
| id.js | 30+ ID generator factories using `nanoid`: `genProjectId()`, `genTaskId()`, `genExpenseId()`, etc. Pattern: `'prefix_' + nanoid(length)` |
| storage.js | localStorage wrapper with `'bbiz_'` prefix: `safeSet`, `safeGet`, `safeGetJSON`, `safeRemove`, `listKeys(prefix)`, `exportAll()`, `importAll()`, `clearAll()`. All ops wrapped in try/catch |
| migration.js | Runs before React mounts (sync). Schema v5.0 — unified contacts model. Migrates old people_employees → ContactRecord + HRRecord. Stamps schema version for rollback safety |
| supabase.js | **Master switch lives here.** `CLOUD_ACCOUNTS_ENABLED` (hardcoded `false`), `isSupabaseConfigured` (creds present only), `cloudAccountsEnabled` (the one to branch on). Exports `supabase` — `null` while disabled, so no client is ever constructed |
| sync-snapshot.js | The one-time bring-in of the old snapshot sync's copy (bucket `mios-snapshots`, table `user_snapshots`), read and never changed. `readSnapshot`, `importSnapshot` (records join by id; the device's own copy is kept; clashes keep both), `leaveSnapshot`; the answer is kept per account as `snapshot:<owner>`. Offered by `components/shared/SnapshotSheet.jsx` |

## Dormant: cloud sync
Online accounts are off (`CLOUD_ACCOUNTS_ENABLED = false`) because the backend isn't ready. `initAuth()` therefore settles permanently at `authStatus: 'guest'`, which is the single chokepoint that silences Settings' Account & Sync panel. The record sync that replaces the snapshot sync (`sync-boot.js`, `sync-first.js`, first-sign-in sheet in `components/shared/FirstSignInSheet.jsx`, the old-copy offer in `sync-snapshot.js`) does nothing for a guest. Guard new cloud code with `cloudAccountsEnabled`, never `isSupabaseConfigured`. Full design + restore path: `wiki/decisions/2026-07-27-milos-disable-online-accounts.md`.

**The old snapshot pull is retired.** It replaced the whole device (`clearAll()` then `importAll()`). The old copy is now brought in once, record by record, by `sync-snapshot.js` `importSnapshot`: nothing on the device is cleared or written over. Stores still hydrate from `localStorage` at module load, so SnapshotSheet reloads the page when it is done.

## Key Dependencies
- **usePrayerTimes**: Aladhan API (external), Nominatim API (external), localStorage cache
- **useModuleProgress**: task-store, project-store
- **useInactivity**: DOM event listeners
- **storage.js**: used by ALL Zustand stores for persistence

## Gotchas
- usePrayerTimes precision timer fires exactly when prayer window opens (not approximate)
- migration.js runs on every app load but is idempotent (checks schema version)
- storage.js `'bbiz_'` prefix means raw `localStorage.getItem()` won't find keys
- useModuleProgress checks both `task.completedAt` and `columnId.endsWith('_done')`
