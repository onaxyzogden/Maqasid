---
phase: implement
slug: task-order-audit-pass-2
status: review
amanah: positive
created: 2026-10-05 00:00
---

# Review Gate: implement — task-order-audit-pass-2

## Summary

Second pass over `stages/research-task-order-audit-draft.md`. The Duha fix (PR #41) handled the
first finding. That left 14 findings outside R4 (node order vs `seq`); 5 were confirmed as
defects and fixed here, and 9 were reviewed and left unchanged (see the table below). R4 stays
open as a separate decision.

| # | Finding | Fix |
|---|---|---|
| 1 | **Taraweeh node (R5):** 0 matches, so it fell back to all 45 Salah + Siyam tasks | Node matchers like `/\btransition:isha-taraweeh\b/` were only ever tested against titles, so they never fired. `rowMatches` now also tests tags, but **only against `transition:` matchers**. |
| 2 | **Istijabah node (R5):** 0 matches, fell back to 43 tasks | Tag "Honor the Friday Sunan" with `transition:istijabah-hour`. Its step 6 is the last-hour-of-Friday du'a. |
| 3 | **Iftar du'a (R3):** Growth "Learn the du'a for breaking the fast" sat above Core "Make the iftar du'a…" | Moved byte-for-byte to step 1 of the Core Ramadan task. |
| 4 | **Sleep sunnah (R3):** Growth "Sunan al-Nawm" repeated Core's Ayat al-Kursi, al-Mulk and right-side steps, and asked for less (al-Mulk on 4 nights) | Its only unique step, "Make wudu before getting into bed", moves to step 1 of Core "Complete the prophetic pre-sleep sunnah". The Growth task is **retired**. |
| 5 | **Soil assessment (R1):** "Research the land history" came after walking and sampling the land | Moved to step 1. The land's history tells you where to test for contaminants. |

### Why `transition:` matchers only

Testing tags against *every* matcher was simulated first and rejected:

- `/\b(?:rest|nap|siesta)\b/` caught the `sleep` tag and put Qaylulah on Bedtime.
- Generic `home` tags put household tasks on Traveler-Arrival.

Restricting tags to `transition:` matchers changes exactly four nodes, each by its intended
tagged task: Taraweeh 0→1, Jumu'ah +1, Maghrib-Iftar +1, Traveler-Arrival +1.

## What changes in stored data

Flag `seed_order_audit_v2` (stored `bbiz_seed_order_audit_v2`), runner `applySeedOrderAuditV2()`,
pure core `seedOrderAuditV2()` in `src/services/migration.js`. It runs after the Duha restructure
and before the app mounts. It is built from three literal tables, each drift-guarded against the
seed:

| Table | Effect |
|---|---|
| `AUDIT_V2_MOVES` | Iftar learn step: `faith_siyam_growth` → `faith_siyam_core`. Wudu step: `faith_salah_growth` → `faith_salah_core`. The stored row moves by reference (same `id`/`done`). If the target already has a row of that title, the two merge, and the result is done if either was. If the target task isn't stored, an untouched row is dropped (the seed delivers it later) and a **done row stays where it is**. |
| `RETIRED_SEED_TASKS_V2` | Sunan al-Nawm, via the existing `pruneRemovedSeedTasks`. It runs **after** the wudu row has moved out. A task with **any** remaining progress is **kept**, as an orphan, and logged. |
| `AUDIT_V2_ORDER` | `alignSubtaskOrder(…, { allowDone: true })` on Core Ramadan, Core pre-sleep on **both** `faith_salah_core` and its generated copy `prayer_isha_after` (which gets a fresh wudu row), and the soil task. Operator-added rows are appended at the end. |

The Istijabah tag needs no migration, because `hydrateTask` already merges seed tags into stored
tasks. `classifyTask` returns `[]` for the Friday task (it has no `prayer-phase:before/after`), so
no prayer-board copy is created.

### Older migration tables

`REORDERED_SUBTASK_ORDER_V3` and `SEED_SUBTASK_RENAMES` still list Sunan al-Nawm. Those one-shots
have already run for most operators, and they are harmless for the rest because the retirement
runs after them. Their drift guards in `prayer-order.test.js` now flip for a retired task: it must
be **absent** from the seed.

### Known behavioural consequences

- A completed Core pre-sleep or Core Ramadan task reopens on its new first step. That's the same
  behaviour as any new seed subtask.
- A retired Sunan al-Nawm task that carried progress stays on the Growth board without seed
  hydration, so it renders bare until deleted by hand.
- Growth Salah tasks after the old seq 7 drop one `seq`. The boot backfill reconciles `seedOrder`,
  and their relative order is unchanged.

**Reversal path:** revert the commit and clear `bbiz_seed_order_audit_v2`. Moved rows stay where
they are until deleted by hand. No completion state is at risk.

## Grounding impact

- Moved subtasks keep their sources, tier, rationale and description byte-for-byte.
- The retired Growth steps' sources were checked against Core. Al-Mulk's Tirmidhi 2891 and
  Quran 2:255 were already on Core. Three were unique and are appended byte-for-byte to the
  matching Core step:
  - Sahih al-Bukhari 5010 → Ayat al-Kursi
  - Sahih al-Bukhari 247 → right side
  - Sahih al-Bukhari 6324 → final words
- `lint:grounding-strict` and `audit:inline-refs` stay green at 0.

## Findings reviewed, no change

| Where | Finding | Why it stays |
|---|---|---|
| `faith_salah_excellence` seq 2 | "Study the du'a of Sujud al-Tilawah" above Tahajjud du'a | Different acts; heuristic token overlap only |
| `faith_salah_growth` seq 1 | "Memorise … three short surahs" above "Recite al-Mulk" | Different surahs and purpose |
| `faith_salah_growth` seq 4 | Duha time window above "Pray each salah within its earliest time window" | Duha is not one of the five fard prayers |
| `faith_shahada_core` seq 0 | Study declaration vs conviction after reciting the Shahada | Reciting the testimony is the act itself; the study deepens it |
| `health_social_core` seq 1 | Learn the full salam reply after initiating salam | Two separate acts; initiating needs no prerequisite |
| `health_physical_growth` seq 3 | Learn form after scheduling | Scheduling is planning, not training; form is learned before the first session |
| `intellect_thinking_core` seq 0 | Learn red flags after adopting the rule | The rule is the commitment; the skill follows it |
| `environment_sourcing_core` seq 3 | Learn clothing repair after the 30-day challenge | The challenge does not depend on repair |
| `ummah_community_core` seq 5 | "Learn and teach" etiquette after establishing a prayer group | Teaching needs the group to exist |

## Files Modified

- `src/data/prophetic-path-submodules.js` — `rowMatches` (exported, replaces `titleMatches`).
- `src/data/seed-tasks/faith-seed-tasks.js` — Istijabah tag; iftar move; wudu move, three source
  carry-overs, Sunan al-Nawm removed, Growth Salah seq renumbered.
- `src/data/seed-tasks/ummah-seed-tasks.js` — soil subtasks re-ordered.
- `src/services/migration.js` — pass-2 tables, `moveSeedSubtask`, `seedOrderAuditV2`,
  `applySeedOrderAuditV2`.
- `src/data/seed-tasks/__tests__/prayer-order.test.js` — v3 and rename guards flip for retired
  tasks.
- `src/services/__tests__/seed-order-audit-v2.test.js` (new) — migration contract plus drift guard.
- `src/data/__tests__/prophetic-path-node-matching.test.js` (new) — Taraweeh, Istijabah,
  no-leak, no-fallback. All 3 regression tests fail against title-only matching.
- `scripts/audit-task-order.mjs` plus `stages/research-task-order-audit-draft.md` — R5 mirrors
  `rowMatches`; report regenerated.

## Amanah Gate

- [x] Halal purpose confirmed — reordering and de-duplicating existing grounded worship
      guidance; no fiqh authored, no revelation text altered.
- [x] No riba/gharar concerns — no capital, sale, or contract surface.
- [x] Itqan standard met — byte-for-byte moves, drift-guarded tables, nothing with progress
      deleted, every dismissed finding recorded with a reason.
- [x] Existing tests still pass — `npm test` 335/335 across 20 files, `npm run lint` green,
      `npm run build` ✓.

## Open Questions

1. **R4 (13 cases, down from 28):** within a level, node pools still sort by priority, not the
   curated `seq`. 15 of the earlier 28 cases sat inside the two fallback pools this pass removed.

## Reviewer Notes

## Decision
- [ ] **Approved** — proceed to next stage
- [ ] **Rejected** — rework needed (see notes above)
