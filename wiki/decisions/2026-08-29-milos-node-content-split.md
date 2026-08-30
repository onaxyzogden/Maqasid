---
title: "MILOS — every prayer node owns its Before/After, and a node may author its own ceremony"
type: decision
date: 2026-08-29
status: accepted
tags: [milos, prophetic-path, seed-tasks, ceremony, grounding, migration]
---

# Every prayer node owns its Before/After, and a node may author its own ceremony

## Context

Two complaints from the Prophetic Path node popup, raised together by the
operator:

> *"I'd like for each of the prayer nodes to have their own unique before/after
> set of tasks/subtasks. I'd also like for the "Hour of Acceptance" node to
> display it's own content rather than reusing Salah's content"*

Both were confirmed by **running the real seed modules and dumping the generated
boards**, not by reading code. Three defects surfaced, with three separate
causes that happened to produce the same symptom — one node showing another
node's practice.

**1. The prayer nodes shared their Before/After tasks.** The last line of
`classifyTask()` in `src/data/seed-tasks/prayer-seed-tasks.js` was a
fallthrough:

```js
return FIVE_DAILY.map((p) => `prayer_${p}_${phase}`);
```

Any Faith task carrying a phase tag but no `prayer:{id}` targeting was copied
onto **all five daily prayers**. Three titles hit it — the pre-prayer sunnah,
the post-prayer adhkar, and the prophetic supplications. Because the boards are
only 1–3 tasks deep, those three dominated: **Asr Before was *only* the shared
task**, so the operator opening Asr saw content authored for no prayer in
particular.

**2. `buildTasksForNode()` substituted a whole submodule pool when its matchers
missed.** Its content-matcher stage ended:

```js
rows = matched.length > 0 ? matched : scopePool;
```

Measured: `istijabah-hour` matched **0 of 43** rows and therefore rendered
**twenty generic Salah tasks**; `isha-taraweeh` matched **0 of 45** and did the
same. The fallback was silent — a node with nothing of its own looked fully
populated with somebody else's practice.

**3. Hour of Acceptance ran the Salah ceremony literally.**
`THRESHOLD_MODULE_BY_NODE['istijabah-hour']` was `'faith-salah'`, so Before
opened on *"Before Standing in Salah"* (Al-Baqarah 2:186) and asked the operator
what they were bringing into a prayer they were not about to pray.

Underneath all three: **there was no seed task anywhere tagged
`transition:istijabah-hour`** (0 occurrences). The practice existed as a single
subtask — *Make duʿāʾ in the last hour before Maghrib on Friday* (Bukhārī 935) —
buried inside `Honor the Friday Sunan` on `faith_salah_growth`.

## Decision

Four choices were put to the operator by selection and all four were taken at
the more expensive option:

| Question | Chosen |
|---|---|
| Fate of the three shared prayer tasks | **Specialize per prayer** (not: keep one, not: delete) |
| Source of the new per-prayer content | **Derive, then author additions** |
| How Hour of Acceptance gets content | **Own seed tasks + kill the fallback** |
| Its Before/After ceremony tabs | **Own ceremony content** |

### The fan-out is retired; each prayer's content is derived first, authored second

`classifyTask()`'s fallthrough returns `[]`. A phase-tagged Faith task with no
prayer targeting now stays on its own `faith_salah_*` board instead of being
copied five times.

The replacement content is **derived by reviving code that already existed**.
`getPrayerPhaseSunnah(prayerId, phase)` was exported, grounded, and had **zero
consumers** — its own comment says it was written *"so the six prayer nodes no
longer share one generic faith-salah threshold."* A new `buildRawatibTasks()`
consumes it, so each prayer's rawatib come from rows already seeding the During
anatomy, with their `sources` arrays passed through **verbatim**. No new fiqh
was manufactured to fix a duplication bug.

Hand-authored per-prayer additions then rewrite the three retired practices once
per prayer: Fajr's adhan answer carries *aṣ-ṣalātu khayrun min an-nawm* →
*ṣadaqta wa bararta*; Asr is framed as *al-ṣalāt al-wusṭā* (Al-Baqarah 2:238)
with **no nafl after**; Maghrib notes the short window and the awwābīn; Isha
seals with Witr.

**`faith-seed-tasks.js` keeps the three generic tasks on the Faith Salah
boards** — only their *copies* onto prayer boards go away, so the Faith pillar's
`seq` chains and grounding counts are untouched.

### The whole-pool fallback is removed outright

`rows = matched`. A node whose matchers hit nothing now shows nothing. **Showing
another practice's content is worse than showing none**, and the empty states
already exist (`MirrorCard`, `NodePhaseSlideUp`) — no new UI was needed.

This also emptied `isha-taraweeh`, whose only taraweeh text is a **subtask** and
so is invisible to the title-only matcher stage. One matcher
(`/\bobserve\s+ramadan\b/i`) points it at its parent task instead.

### A Prophetic Path node may author its own ceremony

`MODULE_ATTRS['istijabah-hour']` is new — the **first node id, rather than a
registered pillar submodule, to own a ceremony entry**. `getModuleData()`
resolves the key directly, so no registry change was needed.

Two consequences had to be handled explicitly:

- `getPillarForModule('istijabah-hour')` returns `null`, which would have
  **silently dropped the readiness pause-ayah**. `CeremonyFlow` now reads
  `data?.readinessAyatKey ?? pillar?.readinessAyatKey` — one additive line that
  lets any module declare its own registry instead of inheriting one.
- `DAILY_CEREMONY_MODULES` gains `'istijabah-hour'`, or the completion would
  never clear at Maghrib rollover. The existing
  `prophetic-path-constants.test.js` guard requires this.

The Names chosen are **Al-Mujīb** (the Name this hour actually turns on) and
**As-Samīʿ**, added because its registry gloss — *no prayer is ever mislaid* —
answers the specific failure mode of a short, silent hour. The opening duʿāʾ is
**Ghafir 40:60** (`ادْعُونِي أَسْتَجِبْ لَكُمْ` — the same *j-w-b* root as
*istijābah*) and the closing is **Al-Baqarah 2:152**, deliberately avoiding
2:186 because reusing it was the reported defect.

### The readiness matrix was left honestly inert rather than mis-wired

The plan said to set `readinessAyatKey: 'faith'`. On reading
`faith-readiness-ayat.js` it emerged that the **6-bit matrix is authored against
Al-Mutakabbir M1–M4 / Al-Wakīl W1–W2 row semantics**. Authoring six istijabah
rows would have produced matching keys that surfaced ayah framings **written for
entirely different questions**.

So the entry carries **four rows**, mirroring `faith-salah` — whose 4-bit key
already never matches the 6-bit matrix, making its pause ayah inert today too.
`readinessAyatKey: 'faith'` is kept so the module *declares* its registry rather
than depending on a parent it does not have, and the inertness is documented in
the entry's own comment rather than papered over.

## Consequences

**A node can now be honestly empty.** Five non-prayer nodes whose matchers hit
thinly (`jumuah` 1/30, `eid-prayer` 1/42, `qaylulah` 1/25,
`traveler-departure` 1/42) will show short boards instead of borrowed ones.
That is the correct behaviour and is **explicitly out of scope** to fix by
authoring — it is its own pass.

**Storage needs a prune, and a worked-on row is never deleted.** New tasks
self-deliver via `backfillAndStripSeeds()`'s title diff, but the retired titles
do not self-remove — each would sit forever as a bare orphan holding a slot in
the curated chain. `pruneSplitSeedRows()` (flag `seed_node_content_split_v1`)
runs both halves: 10 boards × 3 retired titles, plus 1 board × 1 relocated
subtask. Per the primitive's documented contract, **a task or subtask the
operator has worked on is kept**, so someone who completed the generic adhkar on
Fajr sees it beside the new Fajr-specific one and deletes it by hand. Losing
their completion silently is the worse failure. Gated by
`stages/implement-node-content-split-review.md` per the repo's CI/CD safety rule.

**`titleMatches()` still reads the title only.** The `transition:*` regexes
sitting in the matcher lists can never fire. They are left alone; widening
`titleMatches` to read tags would change matching for **all twenty nodes at
once** and is refused here.

**Verified.** `npm test` **300/300 across 17 files**; `npm run lint` green
end-to-end (`[STRICT] OK: 0 ≤ ratchet 0`, inline-refs `0 ≤ 0` across 2052
subtasks, `divine-names: OK — 106 names, 116 module attributes, all attested`);
`npm run build` ✓. Cross-board uniqueness confirmed against **real seeded
storage**, not only by test: `crossPrayerDuplicates: []`, with board depths
Fajr 4/4, Dhuhr 3/2, Asr 3/3, Maghrib 3/3, Isha 3/5, Tahajjud 4/3.

## Alternatives rejected

- **Keep one shared task per phase and accept the repetition.** Rejected by the
  operator's selection; it would have left Asr Before with a single task
  authored for no prayer.
- **Author all per-prayer content from scratch.** Rejected in favour of
  deriving from `getPrayerPhaseSunnah` first — a duplication bug is not a
  licence to manufacture new fiqh, and the derived rows carry attested
  `sources` already.
- **Keep the whole-pool fallback but exclude specific nodes.** Rejected: the
  fallback is silent by nature, and a per-node exclusion list would need
  updating every time a node is added.
- **Register `istijabah-hour` as a Faith submodule in `maqasid.js`.** Rejected —
  pinned by the orientation-selector drift guard, and the node is a threshold,
  not a module of practice.
- **Author six istijabah readiness rows to light up the faith ayat matrix.**
  Rejected as the worst available option: it would have produced *matching*
  keys carrying framings written for unrelated questions, which is harder to
  detect than an ayah that simply does not appear.

## Links

- [[milos]]
- [[2026-07-25-milos-prayer-popup-consolidation]] — the decision that made prayer
  Before/After tasks-only, which this change fills with per-prayer content
- [[2026-04-18-milos-grounding-two-axis]] — the `sources[]` schema every derived
  and authored row satisfies
