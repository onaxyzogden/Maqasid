# Session Execution Plan
**Date:** 2026-10-22
**Project:** MIOS (MILOS / Maqasid OS V2.1)
**Objective:** MIOS ships with the same sign-in and offline capability Capacity Routine has (account sign-in, app shell opens with no signal, last-loaded data stays on the device, changes made offline wait and sync later to the account they belong to).
**Context Source:** Project Wiki (MIOS and Capacity Routine), adopted round-robin corrections (context summary; plan rounds 1–4), operator's pick of Option C (re-platform)

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~45,000 | Both wikis grepped, store map, summary round robin |
| Planning (this document) | ~20,000 | Incl. plan round robin |
| **Session A** — Phase 1 Setup, Amanah Gate, approval doc | ~25,000 | Worktree, baseline, gate, `stages/` doc |
| Session A — Phase 2 Backend schema | ~40,000 | `supabase/` folder, records table, RLS, version trigger, invoice numbering, checks |
| Session A — Phase 3 Sign-in | ~60,000 | Emailed-code sign-in, auth states incl. offline, sign-out rules, build switches |
| Session A — Phase 4 Record sync layer | ~150,000 | Key inventory, in-memory diff, IndexedDB outbox, flush, versions, clashes, pull on start |
| Session A — Phase 5 First sign-in, old snapshot, phone check | ~60,000 | Upload local data, cloud-vs-local choice, retire snapshot sync, local build on the phone |
| **Session B** — Phase 6 Shell offline (service worker) | ~55,000 | Kill-switch `sw.js` first, precache plugin, routes |
| Session B — Phase 7 Screens and copy | ~60,000 | Banner, "Not sent yet", clash sheet, privacy FAQ |
| Session B — Phase 8 Verify, review, phone check, wiki, close | ~75,000 | Suite, preview pass, fresh review, phone check, ADR |
| **Total Estimated** | **~590,000** | Two sessions: A ≈ 335k, B ≈ 190k |

> Note: Token estimates are approximate. Complex file generation or multi-file
> refactoring will trend higher. Flag if any phase exceeds estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] **Chain:** writing-plans (this) → using-git-worktrees → executing-plans with test-driven-development per task → ux-intent-discovery + state-completeness + feedback-and-affordance for the new screens → requesting-code-review (fresh reviewer) + Agent `ux-engine:ux-reviewer` → verification-before-completion → finishing-a-development-branch. Phase 4 may use subagent-driven-development for independent modules (outbox, merge, flush), each subagent given `src/CONTEXT.md` and `src/store/CONTEXT.md`.
- [ ] **Options considered:** **A** port the shell + sign-in and harden the snapshot sync (local-first stays); **B** offline shell only, accounts stay off; **C** re-platform (chosen by the operator). Within C, the schema below is my recommendation; the alternative is one typed table per collection (like Capacity Routine's 25 migrations), which costs ~60 collections' worth of SQL and a rewrite of every store. Typed tables can follow later, one hot collection at a time, behind the same sync layer.
- [ ] **Two sessions:** Session A is Phases 1–5 and ends with a branch ready to merge plus a phone check. Session B is Phases 6–8, on the same branch, opened from Session A's debrief.
- [ ] **Schema (one table, per record):** `mios_records(user_id uuid, collection text, record_id text, data jsonb, version int, deleted boolean, updated_at timestamptz, updated_by_device text)`, primary key `(user_id, collection, record_id)`, RLS `user_id = auth.uid()` for select/insert/update/delete, a trigger that bumps `version` and refuses an update whose sent base version is stale. Each persisted array key (e.g. `expenses`, `tasks_<projectId>`, `office_messages`) is a collection, each item with an `id` is a record; a scalar or object key (e.g. `thr_niyyah_date`) is a one-record collection `_single`. Deletes are soft (`deleted = true`) so another device learns of them. Record ids are already nanoid (`src/services/id.js:13-16`), so two devices don't collide on create.
- [ ] **Counters and sequences (round robin R3):** a `_single` counter can't be merged. `inv_counter` (`money-store.js:12`) becomes device-local, and invoice numbers are given by the server on first send (a per-user sequence in the migration). An invoice made offline shows "Number given when sent" and is never printed or exported with a number until it has one. Task 4.1 lists any other counter and treats it the same way.
- [ ] **Where the server becomes the truth without rewriting 15 stores:** stores keep hydrating synchronously from `localStorage` (`src/CONTEXT.md` l.5, 13), which becomes the device copy, the same role as Capacity Routine's read cache. The sync layer sits under `services/storage.js`. Pulls arrive into `localStorage` before the stores load (`main.jsx`, 4 s timeout); a pull that arrives later while open lists changes and offers a reload, as `sync-service.js` already does.
- [ ] **Diffing (round robin R1):** `safeSet(key, value)` (`storage.js:30`) only receives the new value. The sync layer keeps an in-memory index per synced key (record id → hash), built once at start; writes are batched per key over 500 ms, then diffed against the index into upserts/deletes in an IndexedDB outbox (ported from Capacity Routine `src/lib/offline/outbox.ts`, `store.ts`, `flush.ts`, `keepSending.ts`). No re-reading or re-parsing of stored values on each write.
- [ ] **Writes that skip `safeSet`:** `HydrateWidget.jsx:20`, `PrayerHeroDuring.jsx:27` and `migration.js` write `localStorage` directly. Task 4.1 classifies every such key as synced (then routed through `safeSet`) or device-only (listed in `SYNC_EXCLUDED_KEYS`).
- [ ] **Not synced:** `SYNC_EXCLUDED_KEYS` (`storage.js:188`) stays device-only: AI keys, UI widths and panels, sync bookkeeping, one-shot migration flags. Attachment base64 payloads stay on the device, metadata synced, as today.
- [ ] **Two audiences (adopted correction):** a visitor who never signs in keeps today's local-only app unchanged: no outbox, no network, no IndexedDB writes. The `user` local profile and `ProtectedRoute` stay byte-identical (`auth-store.js:18-53`).
- [ ] **Two build switches (round robin R2, R4; corrected by `tasks/lessons.md` #16):** the hardcoded `CLOUD_ACCOUNTS_ENABLED` in `supabase.js` becomes a Vite `define` constant `__CLOUD_ACCOUNTS__`, set from `VITE_CLOUD_ACCOUNTS=1` in the build environment, and the service worker gets its own `__OFFLINE_SHELL__` from `VITE_OFFLINE_SHELL=1`. A raw `import.meta.env` read is not constant-folded, so supabase-js (~218 KB) would ship to every visitor; `define` constants fold away when off. Phase 3 measures both builds. Both are off when unset. Neither goes into `deploy.yml` this program; `deploy.yml` deploys every push to `main`, so merging with the switches unset ships nothing new to visitors.
- [ ] **Sign-in:** Capacity Routine's emailed code (`src/components/SignIn.tsx`, `codeMessage`), replacing password + magic link in `AuthPage.jsx`. Auth states port from `src/lib/auth.tsx`: `signed-out`, `signed-in`, and `offline` (signed in on this device, renewal failed with no signal; the app stays open). New sign-ups stay off in Supabase settings unless the operator turns them on.
- [ ] **Sign-out (adopted correction):** never clears local data by default. It stops syncing and asks: "Keep this account's data on this device" (default) or "Remove it from this device", the second only when the outbox is empty or the operator confirms the unsent count.
- [ ] **Account-bound outbox:** each entry carries the `user_id` it was made under; the flush renews the session first (`renewedUser`) and sends only entries for that user, as in Capacity Routine commit `43ca8ca`.
- [ ] **Clashes:** a stale base version, or a server row changed since the base, is never overwritten. If the server row equals the entry (a lost reply that landed) it is dropped as sent; otherwise "Changed elsewhere" offers **Keep this device's** or **Keep the saved one**. Equality is a deep-equal of `data` and `deleted` (one rule, since all collections share one table).
- [ ] **First sign-in (approval doc round robin R2, R5):** replaces `FirstLoginModal`'s three cases. Nothing uploads on its own. Cloud data, empty device → pull. Device has data → a one-time sheet with counts per area and three choices: **Add this device's records to my account** (empty cloud: "Sending N items"; both sides have data: merge by item, same-id differences go to the clash sheet), **Start this account empty on this device**, or **Look through first** (read-only lists per area). This sheet is the only route to the first upload. "Start empty" moves, never clears: the synced keys are copied to a local-only IndexedDB shelf, read back and hash-checked, and only then removed from `localStorage`; on a mismatch nothing is removed and the sheet says why. Sign-out then offers "Put this device's earlier records back".
- [ ] **The old snapshot (approval doc round robin R1):** the `mios-snapshots` blob, if present, is offered once as an import, written in as ordinary record writes through the sync layer, with same-id differences going to the clash sheet. It never calls `clearAll`, `importAll` or `applyPull` (`sync-service.js:215-217` clears first). The bucket and `user_snapshots` table are left intact.
- [ ] **A device belongs to one person (approval doc round robin R4):** `Onboarding.jsx:33-48` reuses `user_prev`, keeping its `id`, so the device has only ever had one profile id and records carry no owner. A shared device should take "Start empty". A per-profile split is a Deferred Idea.
- [ ] **Rollback (approval doc round robin R3):** if the switches are removed after go-live, waiting outbox entries are kept; on the next switch-on they meet the version trigger, so a stale base becomes a clash sheet and never overwrites.
- [ ] **Attachments from another device (approval doc round robin R3):** metadata arrives without the file, so the item shows "File is on the device it was added from" and never opens empty.
- [ ] **Shell:** port Capacity Routine `src/sw/` (precache plugin, network-first navigations with 4 s fallback, `/assets/*` cache-first, other origins and non-GET untouched, old caches deleted on activate), registered only when `VITE_OFFLINE_SHELL` is on. Before any registering code, a kill-switch `sw.js` (unregisters itself, deletes its caches) is written and tested, so a bad worker can be withdrawn by one deploy. GitHub Pages has no `_headers`, so freshness relies on the build-hash cache name and `registration.update()` on open; `public/404.html` SPA fallback is kept.
- [ ] **Phone check (round robin R4):** each session ends with `npm run build` with both switches on, served by `vite preview --host` on the home network against the real project. The operator signs in on their phone, goes into airplane mode, edits, reopens the app, reconnects, and sees the change on a second device. This proves the Objective before any deploy.
- [ ] **Where it lands:** a new worktree branch `mios-cloud-replatform` from `main` in `MAQASID OS - V2.1`. The working tree's existing uncommitted Amanah/wiki edits stay where they are, untouched. The `atlas` submodule is not touched.
- [ ] **Supabase project:** the existing MIOS project (the one behind `mios-snapshots`). Applying the migration, setting auth to email-code, and rotating the anon key are operator actions; I write the SQL and the steps.
- [ ] **Covenant check of the tasks:** no task brings back an erased model or a capital framing, so nothing was removed. This is not the Amanah Gate, which runs as Task 1.1.
- [ ] **Capacity Routine source:** ported from the current `offline-session-a` branch, which is not yet merged or reviewed. Anything that changes there after review is noted in the MIOS ADR as a follow-up.

### Must Not
- No local data is deleted or overwritten by sign-in, sign-out, first sync or a pull without the operator's choice. Check: tests for each path; `grep -n "clearAll()" src/services` shows no new caller.
- The "Start empty" shelf is never sent and never read by the sync layer. Check: a test that signs in, picks "Start empty", edits, flushes, and finds no shelved record in any request; the shelf hash-mismatch test removes nothing.
- The service worker never caches or answers a Supabase request. Check: `grep -n "supabase" public/sw.js dist/sw.js` returns nothing.
- No switch turned on and no Supabase keys in any commit. Check: `git grep -nE "VITE_(CLOUD_ACCOUNTS|OFFLINE_SHELL)" .github` returns nothing; `git grep -n "CLOUD_ACCOUNTS_ENABLED = true"` and `git grep -nE "eyJ[A-Za-z0-9_-]{20,}"` return nothing.
- No two invoices share a number. Check: the two-offline-devices test in Phase 4.
- No change to the local profile path. Check: `git diff main -- src/store/auth-store.js` leaves lines for `user`, `login`, `updateUser`, `logout` unchanged; `ProtectedRoute` untouched.
- The privacy FAQ never claims more than is true. Check: `Landing.jsx` FAQ reads "stored on your device; sent to MIOS's server only when you sign in", and no string says "Nothing is sent to external servers" while sync code is reachable.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| A synced key is written outside `safeSet` | Known (3 sites) | High | Task 4.1 classifies each; a test fails on any unclassified `bbiz_` key |
| Diffing large arrays on every write slows the app | Med | Med | In-memory index + 500 ms batching; a timing test on the largest key |
| Items without an `id` in some arrays | Med | Med | Phase 4 scans every synced key's shape; id-less arrays sync as one `_single` record and are listed in the ADR |
| Counters (invoice numbers) duplicated across devices | Known | High | Server-given numbers; offline invoices unnumbered until sent |
| A cache-first shell traps users on an old deploy (no `_headers` on Pages) | Med | High | Shell switch off by default, kill-switch `sw.js` written first, network-first navigations, two-build test |
| Stale pull shown as current | Med | Med | Banner "Offline · showing what was on this device at HH:MM" |
| Sign-in expires while offline for days | Med | Med | Renew before flush; entries kept; banner asks to sign in |
| IndexedDB missing (private mode, iOS eviction) | Low | Med | Signed-in writes still land in `localStorage`; banner says changes can't wait to send on this device; a full upload is offered on next sign-in |
| The exposed anon key from the 2026-07-27 window | Known | Med | RLS is the guard; the key is rotated before the phone check |
| Operator steps (SQL, key) not done by a session's end | Med | Med | That session closes tested by unit tests and the SQL checks only, and says so; the phone check moves to the next session's start |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Session A

### Phase 1 — Setup, Amanah Gate, approval doc (using-git-worktrees, `docs/principles.md`)
- [x] Task 1.1 — Run the Amanah Gate per `docs/principles.md` on this plan: where user data goes, what the published privacy copy promises, account and email collection, financial records (invoice numbering), and any riba/gharar or other ethical surface. Record the verdict in the plan. On any non-pass verdict, stop: no worktree, no code, and the concern goes to the operator.
- [x] Task 1.2 — Write the `stages/` approval doc for the data migration (MIOS `CLAUDE.md`: destructive operations and data migration need one), naming what moves to the server, what never does, and how it can be undone. Halt until the operator approves it.
- [x] Task 1.3 — Create the worktree branch `mios-cloud-replatform` from `main`; confirm the main checkout's uncommitted files are unchanged. Halt on mismatch.
- [x] Task 1.4 — Baseline: `npm test`, `npm run lint`, `npm run build`; record counts. Add `fake-indexeddb` (pinned, dev only).
**Gate:** Amanah Gate passed, approval doc approved, baseline green on the new branch.

**Tasks 1.3–1.4 result (2026-10-22):** worktree `.worktrees/mios-cloud-replatform`, branch `mios-cloud-replatform` from `origin/main` (fc26c22). Local `main` was 2 unpushed docs commits ahead and 2 behind (PR #79), so the branch starts from what the PR will target. Main checkout's status and diff hash unchanged. Baseline: 41 test files, 565 tests passed; lint exit 0 (0 errors, 1 pre-existing warning); build green, main chunk `index-YgdgxF45.js` 340.48 kB (same hash as the live site). `fake-indexeddb@6.0.1` added, dev only, exact.

**Task 1.1 result (2026-10-22): Amanah Gate — pass, held to the conditions already in the plan.**
- *Purpose:* the user's own records follow them to their own devices; nobody's data is gathered, sold or shown to another account (RLS). Halal.
- *Riba:* none. No lending, interest, payment or charge is added; invoices are stored as before.
- *Gharar / deception:* the one surface is the published promise, "All data is stored locally on your device. Nothing is sent to external servers." (`Landing.jsx:85`). That is true today (live site checked: no `/sw.js`, no Supabase client in the main chunk) and must stay true: the copy changes in the same build that makes sync reachable (Must Not 6, Task 7.2), and never before.
- *Trust (amanah) in records:* no silent overwrite, sign-out keeps data, guests untouched, unique invoice numbers. These are the plan's Must Nots; breaking any one of them reopens this gate.
- *Accounts and email:* sign-ups stay off; the only account is the operator's own.

**Task 1.2 result (2026-10-22):** `stages/design-cloud-replatform-data-migration-approved.md`, approved by the operator after a five-round round robin. Its additions are folded into the Assumptions above (first sign-in, the old snapshot, one person per device, rollback, attachments) and the Must Nots (the shelf is never sent).

### Deferred Ideas
- A per-profile split of device data on first sign-in. Not possible from today's data: records carry no profile id (`Onboarding.jsx` reuses `user_prev`).
- Including the "Start empty" shelf in export and backup (standing objection from the approval-doc round robin: export while signed in leaves shelved records out).

### Phase 2 — Backend schema (test-driven-development)
- [ ] Task 2.1 — `supabase/config.toml` and `supabase/migrations/0001_mios_records.sql`: table, keys, RLS for each operation, version trigger with stale-base refusal, `updated_at` index, per-user invoice number sequence given on first send, grants to `authenticated` only.
- [ ] Task 2.2 — `supabase/checks/` SQL that proves RLS (another user's rows invisible and unwritable), the stale-version refusal and unique invoice numbers, in Capacity Routine's checks style.
- [ ] Task 2.3 — `SETUP.md` steps for the operator: apply the migration, email-code auth, sign-ups off, rotate the anon key, local `.env` for the phone check.
**Gate:** SQL reviewed against the schema assumption; checks written; nothing applied to the live project by me.

### Phase 3 — Sign-in (test-driven-development, form-ux)
- [ ] Task 3.1 — Tests, then the `VITE_CLOUD_ACCOUNTS` build switch; port the auth states (incl. `offline`) into the cloud half of `auth-store.js`; `renewedUser`.
- [ ] Task 3.2 — Port the emailed-code sign-in into `AuthPage.jsx` with Capacity Routine's plain-language errors; remove password and magic link.
- [ ] Task 3.3 — Sign-out with the keep/remove choice (feedback-and-affordance).
**Gate:** auth tests green; a test proves sign-out leaves `bbiz_*` keys by default; a test proves the switch is off when unset; local profile lines unchanged.

### Phase 4 — Record sync layer (test-driven-development; subagent-driven-development where modules are independent)
- [ ] Task 4.1 — Inventory every persisted key: synced or excluded, array-with-id or `_single`, counter or not; classify the three direct `localStorage` writers. A test fails on any unclassified `bbiz_` key.
- [ ] Task 4.2 — IndexedDB store + memory store (port), outbox with account binding, coalescing by `(collection, record_id)`, base version kept from the first change.
- [ ] Task 4.3 — In-memory index and 500 ms batched diff → outbox, only when signed in; guests untouched (test asserts no `indexedDB.open`); timing test on the largest key.
- [ ] Task 4.4 — Flush (on `online`, start, visible), shared queue, clash detection and the lost-reply match; pull since last cursor in `main.jsx` before stores load, with timeout; offline invoices numbered on send.
**Gate:** all sync tests green incl. guest-untouched, account-bound, no-silent-overwrite, delete propagation, and two offline devices producing unique invoice numbers.

### Phase 5 — First sign-in, the old snapshot, phone check
- [ ] Task 5.1 — Tests, then the first-sign-in sheet (Add / Start empty / Look through first), merge by item, and the "Start empty" shelf with its read-back hash check and "Put this device's earlier records back" on sign-out; replace `FirstLoginModal`'s logic.
- [ ] Task 5.2 — One-time import offer from the `mios-snapshots` blob as record writes through the sync layer (no `clearAll`/`importAll`/`applyPull`); snapshot push/pull in `sync-service.js` retired (code removed from the call path; bucket and table untouched).
- [ ] Task 5.3 — Phone check (accounts switch on, shell switch off) if the operator steps are done; otherwise record that Session A closes tested by unit tests and SQL checks only.
- [ ] Task 5.4 — Stage 05 close for Session A: commits on the branch, debrief, `wiki/log.md` entry.
**Gate:** each first-sign-in case tested, including both-sides-have-data never overwriting without a choice; phone check passed or its absence stated.

### Session B

### Phase 6 — Shell offline (test-driven-development)
- [ ] Task 6.1 — Kill-switch `sw.js` written and tested first (unregisters itself, deletes its caches).
- [ ] Task 6.2 — Port `src/sw/` routes and precache plugin into `vite.config.js`; register only when `VITE_OFFLINE_SHELL` is on.
- [ ] Task 6.3 — Preview pass: build, stop the server, reload; the shell and a lazy route open. Rebuild with a change; the new build shows. Swap in the kill-switch; the worker is gone. Unregister and clear caches afterwards.
**Gate:** shell opens offline; new build replaces old; kill-switch removes it; Supabase grep clean.

### Phase 7 — Screens and copy (ux-intent-discovery, state-completeness, feedback-and-affordance)
- [ ] Task 7.1 — Offline banner, "Not sent yet" list, "Changed elsewhere" sheet, "Sign in to send N changes", "Number given when sent", "File is on the device it was added from", ported from Capacity Routine `src/features/offline/` into MIOS styles and tokens.
- [ ] Task 7.2 — Privacy FAQ (`Landing.jsx:85`) and the sync line (`Landing.jsx:307`) rewritten to what is true, shown only when the accounts switch is on; Settings Account & Sync panel updated.
- [ ] Task 7.3 — Screenshots of each state in the preview (MIOS `CLAUDE.md`: no UI claim without one).
**Gate:** every state seen in a screenshot; copy matches behaviour.

### Phase 8 — Verify, review, record, close
- [ ] Task 8.1 — `npm test`, `npm run lint`, `npm run build` (switches unset and set); all Must Not greps.
- [ ] Task 8.2 — Fresh code review and `ux-engine:ux-reviewer`; fix or record each finding.
- [ ] Task 8.3 — Phone check with both switches on: sign in, airplane mode, reopen, edit, reconnect, change seen on a second device.
- [ ] Task 8.4 — ADR `wiki/decisions/2026-10-22-milos-cloud-replatform.md` superseding the dormant-sync part of `2026-07-27-milos-disable-online-accounts.md`; `wiki/log.md` entry; `src/CONTEXT.md` and `src/store/CONTEXT.md` updated.
- [ ] Task 8.5 — Stage 05 close; push and PR only on the operator's word; go-live checklist handed over (add both switches to `deploy.yml`, deploy, check the live site on a phone).
**Gate:** Program complete when every gate above has passed and the operator has the branch, the SQL, the phone-check result and the go-live checklist.

---

## Definition of Done
On branch `mios-cloud-replatform`: `supabase/migrations/0001_mios_records.sql` with RLS, server-given invoice numbers and their checks; emailed-code sign-in with the `offline` state; every synced `localStorage` key written through an account-bound IndexedDB outbox that sends later and never overwrites a changed record without the operator's choice; a pull on start; a service worker, with a tested kill-switch, that opens the app with no signal; guests unchanged; privacy copy true; tests, lint and build green; both features behind build switches that are off in `deploy.yml`; the phone check passed on a local build; ADR and log written. MIOS is ready to ship behind both switches, and going live is the operator's checklist. Checked against the Objective: "MIOS ships with the same sign-in and offline capability Capacity Routine has (account sign-in, app shell opens with no signal, last-loaded data stays on the device, changes made offline wait and sync later to the account they belong to)."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
