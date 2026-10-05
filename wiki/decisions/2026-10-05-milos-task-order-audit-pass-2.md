---
title: "MILOS — task-order audit pass 2: transition tags route nodes; iftar, wudu and soil steps move; Sunan al-Nawm retires"
type: decision
date: 2026-10-05
status: accepted
tags: [milos, prophetic-path, seed-tasks, ordering, migration, routing]
supersedes: []
superseded_by: []
---

# Task-order audit, pass 2

Follows [[2026-10-05-milos-duha-level-restructure]]. The operator asked for the audit's other
findings to be fixed, excluding R4 (node order vs `seq`).

## Context

There were 14 findings outside R4. Review confirmed 5 as defects. The other 9 read correctly in
context and are recorded with reasons in `stages/implement-task-order-audit-pass-2-review.md`.

## Decision

1. **`transition:` matchers read tags.** `titleMatches` became `rowMatches`. The title is tested
   against every matcher, and the tags only against matchers whose source contains
   `transition:`. These patterns had always been dead, so Taraweeh (0 matches) and Istijabah fell
   back to their whole 45- and 43-task scopes. Simulation showed that testing tags against *all*
   matchers leaked Qaylulah onto Bedtime and household tasks onto Traveler-Arrival. The narrow
   rule changes exactly four nodes, each by its intended tagged task.
2. **Istijabah:** "Honor the Friday Sunan" is tagged `transition:istijabah-hour`. Its step 6 is
   the last-hour du'a, and hydration merges in the tag, so no migration was needed.
3. **Iftar du'a:** "Learn the du'a for breaking the fast" moves from Growth Siyam to step 1 of the
   Core Ramadan task, ahead of "Make the iftar du'a…".
4. **Sleep sunnah:** Growth "Sunan al-Nawm" repeated three Core pre-sleep steps and asked for less
   (al-Mulk on 4 nights). Its wudu step moves to Core step 1 and the task retires. Its three
   unique sources (Bukhari 5010, 247, 6324) are carried byte-for-byte onto the matching Core
   steps.
5. **Soil assessment:** desk study first. "Research the land history" moves to step 1, because
   the history says where to test for contaminants.

Migration `seed_order_audit_v2` uses declarative tables: moves, retired tasks and order. Each is
drift-guarded against the seed, and nothing with progress is deleted.

## Consequences

- Audit after the fix: R1 holds only the 9 reviewed findings; R2, R3 and R5 are 0. **R4 fell from
  28 to 13** because 15 of its cases lived inside the two fallback pools.
- The older v3 order and rename tables still name Sunan al-Nawm. Their drift guards now require a
  retired task to be absent from the seed.
- Still open: R4 — within a level, node pools sort by priority, not `seq`.

## Verification

- `npm test` 335/335 across 20 files. All three node regression tests fail against title-only
  matching.
- `npm run lint` and `npm run build` are green.
- Live check in Chromium with the clock faked to Friday 19 Feb 2027 and a cached Ramadan Hijri
  date: Taraweeh opens on "Learn the du'a for breaking the fast", and Istijabah shows the Friday
  Sunan task.
- Migration run on old-layout stored boards: ticked rows moved with their ids, Sunan al-Nawm was
  retired, `prayer_isha_after` got a fresh wudu row, and the soil task starts with research.
