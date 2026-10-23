---
phase: design
slug: cloud-replatform-data-migration
status: approved
amanah: pass
created: 2026-10-22 00:00
---

# Review Gate: design — cloud-replatform-data-migration

## Summary
MIOS gets the same sign-in and offline setup as Capacity Routine. For a signed-in account,
the server becomes the source of truth, and this device keeps a copy. Every record saved
on this device is copied, one row per item, into a new Supabase table, `mios_records`. Changes
made with no signal wait on the device and are sent later. Each waiting change is sent only
to the account it was made under. This is a **data migration**. `stages/CONTEXT.md` says one
needs this approval before any code is written.

Plan: `.claude/plans/mios-cloud-replatform.md` (approved 2026-10-22).

## What moves to the server (signed-in accounts only)
- Every persisted `bbiz_*` key that the Phase 4 inventory marks as **synced**: tasks, projects,
  money, people, contacts, office, CRM, tech, threshold, recruitment, onboarding, fasting,
  Islamic-day and travel data. Each item in an array becomes one row. Each scalar or object
  key becomes one row.
- Attachment **metadata** only (name, size, type, timestamps). The same applies today. On
  another device the item shows "File is on the device it was added from" and never opens empty.
- Invoice numbers are given by the server, on first send.
- **Only after the operator chooses.** First sign-in never uploads on its own. A one-time
  sheet shows counts per area and offers three choices: "Add this device's records to my
  account", "Start this account empty on this device", or "Look through first" (read-only
  lists per area). This sheet is the only route to the first upload.
- **Assumption: a device belongs to one person.** `Onboarding.jsx:33-48` reuses `user_prev`
  and keeps its `id`, so the device has only ever had one profile id, and records carry no
  owner. On a shared device, the operator should take "Start empty".

## What never moves
- The data of anyone who has not signed in. For them the app stays exactly as it is
  today: no network calls, no IndexedDB, no outbox.
- `SYNC_EXCLUDED_KEYS` (`src/services/storage.js:188`): AI API keys, UI widths and panels,
  sync bookkeeping, one-time migration flags.
- Attachment file contents (base64 or blobs).
- The local profile (`bbiz_user`) that `ProtectedRoute` relies on.
- `inv_counter`. It becomes device-only, because the server hands out the numbers.

## What is never deleted
- Nothing on the device is cleared by sign-in, first sync, a pull or sign-out unless the
  operator chooses it. Sign-out offers "Keep this account's data on this device" (the
  default) or "Remove it from this device".
- **"Start empty" moves, never clears.** The device's synced keys are copied to a local-only
  IndexedDB shelf. The copy is read back and hash-checked, and only then are those keys
  removed from `localStorage`. If the hashes don't match, nothing is removed and the sheet
  says why. Sign-out offers "Put this device's earlier records back". The shelf is never sent.
- The old snapshot bucket `mios-snapshots` and the `user_snapshots` table are left as they
  are. Their latest snapshot is offered once as an import, written in as ordinary record
  writes, with clashes going to the clash sheet. It never calls `clearAll`, `importAll` or
  `applyPull`: `applyPull` clears first (`sync-service.js:215-217`), and so does
  `restoreBackup` (`storage.js:140`).
- No server row is overwritten when it changed since this device last saw it. The
  operator picks "Keep this device's" or "Keep the saved one".

## How to undo
- **Before go-live:** the work sits on branch `mios-cloud-replatform`, behind two build
  switches (`VITE_CLOUD_ACCOUNTS`, `VITE_OFFLINE_SHELL`). Both are off unless set, and
  neither is in `deploy.yml`. Not merging is a full undo.
- **After go-live:** remove the switches from `deploy.yml` and deploy. Device copies remain,
  because they were never cleared. The kill-switch `sw.js` takes the service worker out.
  Server rows stay until the operator deletes them in Supabase. Only the operator can
  delete them; the app never does. Changes still waiting to send are kept. On the next
  switch-on they meet the version trigger, so a stale base becomes a clash sheet and never
  overwrites.

## Files Modified
None yet. This gate comes before any code.

## Amanah Gate
- [x] Halal purpose confirmed: the user's own records follow them to their own devices.
- [x] No riba/gharar concerns. The privacy promise at `Landing.jsx:85` changes in the same
      build that makes sync reachable, never before and never after.
- [ ] Itqan standard met: checked at each phase gate.
- [ ] Existing tests still pass: Task 1.4 baseline.

## Key Decisions
- **One `mios_records` table, not one table per collection.** About 60 collections share
  one set of row rules and one version trigger. Typed tables can follow, one collection at a
  time, behind the same sync layer.
- **The stores are not rewritten.** They still load from `localStorage`. Sync hooks in under
  `safeSet` and diffs each write against a list of records it keeps in memory.
- **One correction to the plan's wording, from `tasks/lessons.md` #16.** The plan reads the
  switches as `import.meta.env.VITE_CLOUD_ACCOUNTS === '1'`. Lesson 16 measured that an env
  var is not constant-folded, so `@supabase/supabase-js` (about 218 KB) would ship to every
  visitor even with accounts off. The switches will instead be set through Vite `define`
  from the build environment (`__CLOUD_ACCOUNTS__`, `__OFFLINE_SHELL__`). They become true
  constants and fold away when off. Phase 3 measures both builds to prove it.
- **Round robin (5 rounds, 2026-10-22).** It added the import-as-rows rule (R1), the
  first-sign-in sheet (R2, R4), rollback and attachments (R3), and the "Start empty" shelf
  (R5). A per-profile split (R4) and including the shelf in export and backup (the standing
  objection) are listed under the plan's Deferred Ideas.

## Open Questions
1. When should the operator apply `0001_mios_records.sql` and rotate the anon key? The
   Session A phone check needs both. If they aren't done, Session A ends with unit tests
   and the SQL checks only.

## Reviewer Notes
Approved by the operator on 2026-10-22, after a five-round round robin. Standing objection:
the shelf sits outside the `bbiz_*` export and backup paths (Deferred).

## Decision
- [x] **Approved** — proceed to next stage
- [ ] **Rejected** — rework needed (see notes above)
