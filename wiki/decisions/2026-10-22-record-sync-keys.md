---
title: "Record Sync Keys: Which Stored Keys Belong to the Account"
type: decision
date: 2026-10-22
status: accepted
tags: [sync, offline, accounts, storage]
superseded_by: null
---

# Record Sync Keys: Which Stored Keys Belong to the Account

## Context

Phase 4 of `.claude/plans/mios-cloud-replatform.md` replaces the snapshot sync with record sync: each persisted key is a collection, and each item with an `id` is a record. Before anything is sent, every key the app stores has to be on one side: it goes to the account, or it stays on this device. Task 4.1 listed every key the source reads or writes and decided each one.

## Decision

- **One module decides.** `src/services/sync-keys.js` exports `classifyKey(key)`, which returns `'synced'`, `'device'` or `null`, plus `isCounterKey(key)` and `recordsOf(value)`. Device rules are checked first, so a key that matches both stays on the device.
- **Synced (goes to the account):** the operator's own records.
  - Money: `expenses`, `invoices`, `categories`, `budgets`, `money_*`.
  - CRM, office, people and tech, contacts and `recruit_postings`.
  - `projects`, every `tasks_*` board, every `*_resources_*` list.
  - The threshold (`thr_*`), `fasting_user_override`, `travel_state`.
  - `global_discussion_messages`, `global_journal_reflection`.
  - Preferences about the person rather than the screen: `values_layer`, `attr_lang`, `show_diacritics`, `tooltips_enabled`, the two threshold-gate switches.
  - `hydrate_today_<day>`.
- **Device-only (never sent):**
  - Everything in `SYNC_EXCLUDED_KEYS`, so the AI key never leaves the device.
  - `user` and `user_prev`: the local profile and guest gate. A pull never replaces them.
  - Screen and place: `theme`, `pillars_exp`, `notif_seen_at`, `*_active_tab`, `dashboard_maqasid_level`, `prayer_*`, `onboarding_*`.
  - One-time upgrade flags: `schema_version`, `seed_*`, `task_completion_reconcile_v1`, `mojibake_titles_repaired`.
  - The snapshot sync's own `sync_*` keys, and legacy double-prefixed `bbiz_*` keys.
  - `inv_counter`.
- **Counters stay local.** `inv_counter` is the only counter. A counter can't be merged record by record, so it stays on the device, and the server gives an invoice its number when it is sent (Task 4.4).
- **How a value splits.** An array whose items all carry a unique id splits into one record per id; an empty array is no records. Anything else (an object, a string, a number, an array without ids, or one with a repeated id) is one `_single` record, so a list is never half-sent.
- **Every synced write goes through `storage.js`.** `HydrateWidget` now uses `safeGet`/`safeSet`, and `migration.js`'s `write()` calls `safeSet` with the value it already stringified, so the stored bytes are unchanged. The direct `localStorage` writes left are device-only: migration's flags and `prayer_during_mode`.

## Deviations from the plan

- The plan said device-only keys would be listed in `SYNC_EXCLUDED_KEYS`. They are listed in `sync-keys.js` instead, which includes `SYNC_EXCLUDED_KEYS`. That list still drives the old snapshot sync until Phase 5 retires it, and widening it would change what that sync sends today.

## Consequences

- `src/services/__tests__/sync-keys.test.js` scans the source for every key it reads or writes, and fails on a key no rule names, on a call site whose key it can't name and that isn't a listed pass-through, and on a direct `localStorage` write to a key that isn't device-only. A new feature that stores a key has to give it a side first.
- An unknown key a real device holds is left alone by the sync: it is neither sent nor overwritten.
