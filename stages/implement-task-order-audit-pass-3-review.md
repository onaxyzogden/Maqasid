---
phase: implement
slug: task-order-audit-pass-3
status: review
amanah: positive
created: 2026-10-06 00:00
---

# Review Gate: implement — task-order-audit-pass-3

## Summary

This is a second review of the 9 learn-after-practice findings that pass 2
(`stages/implement-task-order-audit-pass-2-review.md`) left unchanged. Each step's How? text was
read against the seed-order rubric: dependency → obligation before recommendation → interior
before exterior → low friction → authored order. Three now change. All three are reorders within
a single task, and no text, titles or sources change:

| Task | Before | After | Rubric reason |
|---|---|---|---|
| `health_social_core` "Master the Islamic greeting…" | initiate → reply → greet strangers → teach | **reply** → initiate → greet strangers → teach | Obligation before recommendation: returning salam is obligatory (Quran 4:86), initiating it is sunnah. |
| `faith_shahada_core` "Testify there is no God but Allah" | recite → reflect → study → journal | recite → **study** → reflect → journal | Dependency: the study (verbal declaration, heart conviction, action) is the framework the reflection applies. |
| `environment_sourcing_core` "Stop buying fast fashion…" | audit → 30-day challenge → need/want → repair | audit → **repair** → 30-day challenge → need/want | Dependency: the audit already sorts a "repair" pile, and mending is what carries the no-new-clothing challenge. |

The other 6 still stand, along with the Shahada "study after recite" row. They are now recorded
in the audit script as **reviewed waivers**, each with its reason. A waiver matches on rule +
board + both step titles, so editing or moving either step reopens it.

## What changes in stored data

- Flag `seed_order_audit_v3` (stored `bbiz_seed_order_audit_v3`). `applySeedOrderAuditV3()` runs
  `alignSubtaskOrder(…, { allowDone: true })` over the literal `AUDIT_V3_ORDER` table, after pass
  2 and before mount.
- Rows are reused by reference, so ids, ticks and snoozes travel with them. Operator-added rows
  are appended at the end. Nothing is deleted.
- None of the three tasks is copied onto a prayer board: none has a `prayer-phase:before/after`
  tag, which was confirmed.
- **Reversal:** revert the commit and clear the flag.

## Files Modified

- `src/data/seed-tasks/health-seed-tasks.js`, `faith-seed-tasks.js`, `environment-seed-tasks.js`:
  subtask order only. A sorted line-multiset diff is empty for all three.
- `src/services/migration.js`: `AUDIT_V3_ORDER`, `seedOrderAuditV3`, `applySeedOrderAuditV3`.
- `src/services/__tests__/seed-order-audit-v3.test.js` (new): migration contract and drift guard.
- `scripts/audit-task-order.mjs` and `stages/research-task-order-audit-draft.md`: `REVIEWED`
  waivers, a "Reviewed, no change" section, and a warning for stale waivers.

## Amanah Gate

- [x] Halal purpose confirmed: reordering existing grounded guidance; no fiqh authored.
- [x] No riba/gharar concerns.
- [x] Itqan standard met: rubric-justified, byte-for-byte reorders; drift-guarded table; every
      kept finding recorded with a reason.
- [x] Existing tests still pass: `npm test` 347/347 across 22 files, `npm run lint` green,
      `npm run build` ✓. Live run: an old-order stored board was reordered, and the ticks stayed
      on their own steps.

## Reviewer Notes

## Decision
- [ ] **Approved** — proceed to next stage
- [ ] **Rejected** — rework needed (see notes above)
