---
title: "MILOS — the five non-prayer nodes get their own tasks and their own ceremonies"
type: decision
date: 2026-08-29
status: accepted
tags: [milos, prophetic-path, seed-tasks, ceremony, grounding, migration]
---

# The five non-prayer nodes get their own tasks and their own ceremonies

## Context

[[2026-08-29-milos-node-content-split]] removed `buildTasksForNode()`'s silent
whole-pool fallback the same day — the line that showed a node its **entire**
pillar when its own matchers found nothing. That decision named the cost and
explicitly deferred it: five non-prayer nodes (`jumuah`, `eid-prayer`,
`qaylulah`, `traveler-departure`) would now render honestly short boards
instead of borrowed ones, "out of scope to fill." This pass is that fill,
widened by the operator at every choice point to its most expensive form: all
four thin nodes get their own authored content (not two, not none), a fifth
node (`traveler-arrival`) is added rather than left as departure's mirror, and
Eid's content is split across Salah and Community rather than dumped on one
board.

Measured the same way as the first pass — running the real seed modules
through the real `buildTasksForNode()` over all 93 seeded boards, not by
reading:

| node | rendered before | verdict |
|---|---|---|
| `jumuah` | 3 tasks | **none of them the Friday cluster** |
| `eid-prayer` | 1 task | and it was **jumuah's** |
| `qaylulah` | 1 | thin |
| `traveler-departure` | 1 | thin |
| `traveler-arrival` | 9 | **all nine wrong** (`family_home` rows) |

Four separate defects sat under those five symptoms, all in
`src/data/prophetic-path-submodules.js`:

1. **`jumuah`'s matcher was ASCII-only.** It allowed only `a`/`'`, but the
   seed title carries **U+02BB** (`Jumuʻah`) — zero matches, ever.
2. **`eid-prayer`'s matcher was a bare `/\beid\b/i`.** It claimed the Friday
   task purely because the title contains the substring "the eid of the
   week" — fixing (1) alone would have left both nodes pointed at the same
   row.
3. **`traveler-arrival` matched bare `home`/`return`/`arrival`** — every title
   on `family_home_growth` answers to at least one of those words.
4. **Three node entries scoped `'ummah-community'`**, which is not a
   submodule id (`'community'` is) — those nodes could never see the Ummah
   boards at all, regardless of their regex.

## Decision

### Content is derived first, authored only into the actual gap

Four of the five nodes already had their practice as subtasks inside one
dense hub task on a real board (`time-based-content.js` carries grounded
before/during/after prose with attested refs for all five, lines 161–400) —
the gap was **visibility**, not content, for four of the five. `eid-prayer`
was the one genuine void: nothing on any board answered to it. Matcher/scope
fixes (Part 1) closed the visibility gap for free; new tasks (Part 2) were
authored only where a real board had no genuine sibling, split per the
operator's choice — prayer sunan (ghusl, odd/even eating order, takbīr,
khuṭbah-after, different-route return) on `faith_salah_growth`, the communal
half (Zakat al-Fitr **before** the prayer, udhiyah, bringing the household) on
`ummah_community_growth`.

**Only one row physically moved.** The duʿāʾ of return was a subtask of the
travel hub task on `faith_salah_growth`. The return is now its own threshold
with its own node and its own ceremony, so that subtask became the first
subtask of the new `traveler-arrival` task instead of staying buried in
departure's hub — it has to leave, or the boot backfill's title-diff would
have appended the new arrival task carrying the same subtask **beside** the
old one, showing it twice on one board. Everything else Part 2 added is a new
title the backfill delivers on its own; nothing else was renamed, so no other
row needed a storage prune.

### Each of the five authors its own ceremony, keyed by node id, not module id

Same pattern [[2026-08-29-milos-node-content-split]] set with
`istijabah-hour` — a Prophetic Path node id, not a registered pillar
submodule, owning a `MODULE_ATTRS` entry directly. `THRESHOLD_MODULE_BY_NODE`
repoints `jumuah` and `eid-prayer` off `'faith-salah'` and `qaylulah` off
`'health-physical'` to their own ids, and gives the two travel nodes a key at
all — they had **none**, and were falling through
`THRESHOLD_MODULE_BY_NODE[id] || moduleId || 'work'`
(`NodePhaseSlideUp.jsx:174`) to the **Work** ceremony on the road. All five
join `DAILY_CEREMONY_MODULES` or their completion never clears at Maghrib
rollover — the same guard the first pass's ADR pinned by test.

Names and duʿāʾ were chosen for the threshold, never inherited: Al-Jāmiʿ +
An-Nūr for `jumuah` (gathering what was scattered; al-Kahf's light lasting the
week); Ash-Shakūr + Al-Karīm for `eid-prayer`; As-Salām + Al-Muqīt for
`qaylulah`; Al-Wakīl + Al-Ḥafīẓ for `traveler-departure`; Al-Barr + At-Tawwāb
for `traveler-arrival` (*ʿāʾibūna tāʾibūn* — literally turning back to Him).
None opens on Al-Baqarah 2:186 — reusing Salah's duʿāʾ was the original
defect this whole line of work exists to fix.

Readiness rows follow the same honesty rule the first pass set: 4–5 rows per
node, `readinessAyatKey` declared so each module owns its own registry rather
than inheriting a parent's, and the entry's own comment says so rather than
padding to six rows against a matrix authored for unrelated row semantics.

### The storage prune is the narrowest one this repo has shipped

One board, one task, one subtask: `faith_salah_growth` /
`Travel with the Prophet's ﷺ structure` / `Recite the duʻaʻ of return on
coming home`. Flag `seed_node_content_split_v2` (`_v1` is already consumed).
Reuses `pruneRemovedSeedSubtasks()` unmodified — same `subtaskHasState()`
guard, so a subtask the operator has already worked is **kept beside its
replacement**, named in a console line, rather than silently deleted. Gated
by `stages/implement-five-node-content-review.md` per the repo's CI/CD safety
rule.

## A corrected premise, found mid-implementation

The plan's own defect table (above) implied fixing `jumuah`'s matcher would
leave it showing **one** task — the Friday sunan. Running the real 102-board
production set after the fix showed **three**:

```
Establish regular congregational prayer in your locality        (ummah_community_core)
Attend congregational prayers consistently — … Jumu'ah           (ummah_community_core)
Honor the Friday Sunan — Jumuʻah is the eid of the week          (faith_salah_growth)
```

The two Ummah rows were never part of the defect — `jumuah`'s matcher has
always also carried a `congregational\s+prayer` alternative, and both rows
genuinely answer to it (the second literally names Jumu'ah, ASCII
apostrophe). They are correctly kept, not a regression. Rendered order is
tier-first, so the two *daruriyyat* community-infrastructure rows sit ahead
of the *hajiyyat* Friday sunan — the node currently leads with "find a masjid
in your area," not with ghusl. The first fixture written for
`five-node-content.test.js` was built from a 5-board slice and asserted the
wrong (1-task) count; it passed, and would have shipped a false pin. Widened
to 6 boards (`ummah_community_core` included) once the full-production dump
disagreed with it — the near-miss is recorded in the test file's own header
comment as the reason the fixture compares full title sets, not just the new
row.

## Consequences

**Two of the five nodes' apparent "thinness" was never a content gap.** The
plan going in treated `jumuah` and `eid-prayer`-adjacent matching as
symmetric with the other three thin nodes; `jumuah` got **no new tasks at
all** — it was blind, not thin, and became visible once the matcher and
registry bugs were fixed. `eid-prayer`'s Salah-side content was **surfaced
from `faith_siyam_core`**, which already carried two dense, fully-grounded
ʿĪd tasks the node had never been able to see (defect 2 above); only the
communal half on `ummah_community_growth` is genuinely new authorship.

**Live-verified for all five nodes via their real production trigger**, not
via source hacks: `qaylulah` by direct click; the travel pair via the actual
Settings page "Begin Travel"/"End Travel" buttons (`bbiz_travel_state`);
`eid-prayer` via a fake `bbiz_prayer_hijri` (month 10 day 1) from the console,
no source hack; `jumuah` via a temporary `isFriday()` override in
`PropheticPath.jsx`, with the revert **explicitly double-checked** afterward
— empty `git diff`, no `TEMP VERIFY` string anywhere in `src/`.

**Verified.** `npm test` **309/309 across 18 files** — including the new
`src/data/__tests__/five-node-content.test.js` (each node renders exactly its
own title set; no title shared between any two of the five; `eid-prayer`
never claims the Friday task; `traveler-arrival` never claims the family home
board) and a new case in `prophetic-path-constants.test.js` (each of the five
resolves to its own ceremony, none opens on "Before Standing in Salah," none
falls through to Work, and all five duʿāʾ openings are distinct). `npm run
lint` green — grounding strict `0 ≤ 0` on all eight pillars, `audit:inline-
refs` at its 0 ratchet, `divine-names: OK — 106 names, 126 module attributes,
all attested` (module attributes 116 → 126, +10 for five ceremonies × 2 Names
each) — apart from one **pre-existing, unrelated** warning in
`IslamicPanel.jsx:32` that predates and is untouched by this pass. `npm run
build` ✓.

**Not yet shipped.** `stages/implement-five-node-content-review.md` is
written and awaits Yousef's sign-off before `seed_node_content_split_v2` is
cleared to run against real operator storage, per the repo's CI/CD safety
rule. Nothing in this pass has been committed ahead of that review beyond the
working tree itself.

## Alternatives rejected

- **Give only the genuinely-empty node (`eid-prayer`) new content and leave
  the other four as short-but-honest boards.** Rejected by the operator's
  selection ("all four get their own") — the plan's own defect table shows
  three of the other four were blind due to bugs, not actually short in the
  underlying data, so leaving them short would have shipped the bug as if it
  were a design choice.
- **Treat `traveler-arrival` as departure's mirror with no separate node.**
  Rejected — the operator chose to include it as a fifth node with its own
  ceremony, matching the asymmetry already present in the underlying content
  (the return duʿāʾ is a distinct rite, not departure reversed).
- **Put all of Eid's content on one board.** Rejected in favour of the split
  the operator chose — prayer sunan belongs with Salah's other prayer-shaped
  content, the zakat/udhiyah/household half belongs with Community's other
  communal obligations, and conflating them would have made `eid-prayer`'s
  matcher scope span two unrelated submodules for one node.
- **Ship the storage prune without a fixture correction once the 1-vs-3
  discrepancy surfaced.** Rejected — a passing test asserting the wrong count
  is worse than a failing one; the fixture was widened to the real board set
  rather than left matching the plan's original (incorrect) prediction.

## Links

- [[milos]]
- [[2026-08-29-milos-node-content-split]] — the same-day decision that removed
  the whole-pool fallback and exposed the gap this pass fills, and set the
  node-id-owns-a-ceremony pattern this pass reuses five more times
- [[2026-04-18-milos-grounding-two-axis]] — the `sources[]` schema every
  authored row satisfies
