---
title: "Prayer nodes read their phase board directly; Tahajjud's Before leads with its approach"
type: decision
date: 2026-07-23
status: accepted
tags: [ui, islamic, prayer, prophetic-path, tasks, grounding, milos]
supersedes_in_part: 2026-07-23-milos-prayer-node-sunnah-tabs
superseded_by: null
---

# Prayer nodes read their phase board directly; Tahajjud's Before leads with its approach

## Context

Hours after [[2026-07-23-milos-prayer-node-sunnah-tabs]] shipped, the operator opened Tahajjud in the node popup and reported: *"there's so much more to the before of Tahajjud that's missing from here."* The Before tab showed one card — `Qiyām · Pairs of 2` — above the line **"No tasks queued for this window."**

Both halves of that screen were wrong, for two entirely unrelated reasons. The report reads as one complaint; it is two defects that happened to land on the same tab.

## Defect 1 — the tasks were unreachable, not missing

A seeded task **"Rise for Tahajjud with the prophetic waking protocol"** — four subtasks: wipe sleep from the face with Āl-ʿImrān 3:190–200, the waking duʿāʾ of tawḥīd/ḥamd/istighfār, siwāk, istiftāḥ — sits on the `prayer_tahajjud_before` board. It was in the store the whole time. The popup could not see it.

**Root cause.** `PRAYER_BOARDS` ([prayer-pillars.js](src/data/prayer-pillars.js)) generates all 18 boards (6 prayers × 3 windows) with **`moduleId: null`**:

```js
export const PRAYER_BOARDS = PRAYER_PILLARS.flatMap((pillar) =>
  PRAYER_LEVELS.map((level) => ({
    id: `prayer_${pillar.id}_${level.key}`,
    …
    moduleId: null,
  })));
```

`buildTasksForNode` ([prophetic-path-submodules.js](src/data/prophetic-path-submodules.js)) filters projects by resolving `moduleId` through `MODULE_ID_TO_SUBMODULE_ID` and keeping only those whose canonical submodule is in the node's target set:

```js
const canonical = MODULE_ID_TO_SUBMODULE_ID[p.moduleId];
return canonical && targetSet.has(canonical);
```

`null` in, `undefined` out, guard fails, board dropped. Confirmed against the live store: **18/18 prayer boards carry `moduleId: null`, and 49 seeded tasks sit across them** — every one invisible to this popup, on every prayer, in every tab, since the popup shipped the day before. Tahajjud's Before was the window where the absence was loud enough to notice.

### Decision

Prayer nodes bypass the inference pipeline entirely. For a prayer node **the board *is* the phase** — `prayer_{prayerId}_{before|during|after}` is seeded per prayer per window — so `buildPrayerPhaseTasks` reads it by id:

```js
const projectId = `${PRAYER_BOARD_PREFIX}_${prayerId}_${phase}`;
```

Note it keys on `phase`, **not** `slot`. `SLOT_BY_PHASE` translates `during → main` for `buildTasksForNode`'s legacy vocabulary; the prayer boards are keyed by the phase words themselves, and passing `slot` here would silently miss every During board.

### Alternatives Considered

- **Set `moduleId: 'faith-salah'` on `PRAYER_BOARDS` at source.** Rejected on two counts. (a) The nulls are **already persisted** in user storage under the `bbiz_` prefix ([storage.js](src/services/storage.js)), so the fix would need a migration to reach anyone who has run the app. (b) It would make all 18 prayer boards visible to *every* faith-salah surface, not just this popup — the boards would bleed into project pickers and pillar dashboards that have never shown them.
- **Resolve prayer boards by id pattern inside `buildTasksForNode`.** Rejected — the pipeline's per-node content matchers are keyword regexes, and Tahajjud's include `/\b(?:witr|light\s+du|prophetic\s+supplications?|siwak|rawatib)\b/i`. Opening the faith-salah pool to it would pull **other prayers'** tasks into Tahajjud's windows. Inference both misses and bleeds here; the board is ground truth.

### The level chip had to go with it

`levelFromProjectId` returns 1/2/3 from a `_core`/`_growth`/`_excellence` suffix and **defaults to 3** for anything else. Prayer boards match none of the three, so every surfaced prayer task would have been chipped **"L3 · Tahsiniyyat"** — labelling Fajr's *muʾakkadah* rawātib an **embellishment**. That is a covenant defect wearing a cosmetic disguise, and it would have shipped inside the fix.

`buildPrayerPhaseTasks` therefore sets `_level: null`, and `PPTaskCard` ([PropheticPathMirror.jsx](src/components/islamic/PropheticPathMirror.jsx)) makes the chip conditional rather than defaulting. **A prayer board is keyed by window, not by Maqasid level — so the honest rendering is no chip, not a guessed one.** Non-prayer nodes still show theirs; that was the regression check.

## Defect 2 — Tahajjud's Before was showing the prayer itself as its own "before"

`PRAYER_GUIDE.tahajjud.structure` has **no `Sunnah before` row** — only `Qiyām` and `Recommended`. The 07-23 selector, mapping `before` → *"or for Tahajjud the `Qiyām` row"*, therefore rendered **the night prayer** as what precedes the night prayer. Correct data, wrong slot: it answers *what you pray*, and the tab asks *what comes first*.

The genuine before-content was sitting unused in the same object, in `PRAYER_GUIDE.tahajjud.keys` — the last-third-of-the-night descent hadith (Bukhārī) and *"Begin with 2 light rakʿahs, then lengthen."* Muslim 767b was already attached to the `Qiyām` row as a contextual source.

Three options were put to the operator; they chose **"keep it, reframed"** — Before leads with when to rise and how to enter, then shows the `Qiyām` row as what one rises toward. Nothing is lost; **the ordering does the teaching.**

```js
const SUNNAH_LEAD = {
  'tahajjud:before': {
    needles: ['Best in the last third', 'Begin with 2 light'],
    rowsCaption: 'What you rise toward',
  },
};
```

`getPrayerPhaseSunnah` now also returns `leadNotes[]` and `rowsCaption`; `PrayerSunnahSummary` renders the notes as a quiet bulleted lead above the rows, with the caption between them. The needles are **all-ASCII** for exactly the reason [[2026-07-23-milos-prayer-node-sunnah-tabs]] gives for `SUNNAH_FALLBACK_MATCH`: on a Windows/cp1252 checkout a needle containing `ā` or `ʿ` is a silent miss.

**This still authors no fiqh.** Both lead notes are existing hadith-graded `PRAYER_GUIDE` strings reused verbatim. The only new prose in the change is the caption **"What you rise toward"** — a UI label describing the layout, not a claim about the Sunnah.

## Consequences

- **All 49 seeded prayer-phase tasks are now reachable** from the node popup, per prayer per window. Tahajjud's Before shows its 4-subtask waking protocol beneath the lead notes and the `Qiyām` row.
- **`PRAYER_BOARDS` still ships `moduleId: null` at source.** The popup routes around it; **any other surface that goes through `buildTasksForNode` still cannot see prayer boards.** This is live debt, deliberately not fixed here — see the alternatives above for why the source fix needs a storage migration and a scoping decision first.
- The `prayer_{id}_{phase}` id format is now **contract** in a second place. `PRAYER_BOARD_PREFIX` is imported rather than hard-coded, but a change to `PRAYER_LEVELS`' `key` values would silently empty these tabs.
- `SUNNAH_LEAD` is a **per-window escape hatch, not a general mechanism.** It exists because Tahajjud's window has an approach that precedes its rakʿat and no `Sunnah before` row to hang it on. Adding entries for prayers that *do* have a rawātib row would duplicate content rather than order it.
- `src/components/islamic/CONTEXT.md` was updated **in the same commit** — the direct-board read, the `_level: null` rule, and the Tahajjud lead-in each got a paragraph. Under the Context-First Protocol a stale CONTEXT.md is a live defect, not a documentation nit ([[2026-07-09-milos-prayer-banner-non-blocking]]).

## Verification

- `npm test` — **77/77**. ESLint — **0 errors** (1 pre-existing `IslamicPanel.jsx` warning). `lint:grounding-strict` and `audit:inline-refs` — both ratchets held at **0**. `npm run build` — `✓ built in 1.49s`.
- `generate:pillar-glyphs:check` still exits 1 with `Error: transport invoke timed out after 60000ms` on `src/pages/family/FamilyLevelNavigator-constants.js` — the same pre-existing Vite SSR cold-start timeout in the *Family* pillar, unrelated. `lint:eslint` and `audit:inline-refs` were run separately so the gates that actually cover this change could be shown green.
- Verified in the running preview by **live DOM reads**: Tahajjud's Before renders lead notes → `WHAT YOU RISE TOWARD` → the `Qiyām` row → the waking-protocol task; each of the other five prayers surfaces its own window's seeded tasks; a non-prayer node still renders both the generic threshold and the level chip.
- **The screenshot tool did not work this session** — *"Screenshot timed out after 5s: the Browser pane is not displayed, so the page is not compositing frames"*, twice. Stated plainly here and in the commit message rather than worked around silently, per the operator's standing rule. **This contradicts the note filed one day earlier** in [[2026-07-23-milos-prayer-node-sunnah-tabs]] concluding the hang was resolved: it is intermittent **and pane-visibility-dependent**, which the 07-09 and 07-10 reports did not distinguish. That is the sharper reading for [[project-screenshot-hang]] whenever that page is finally written.
- A false negative was caught **during** verification and corrected rather than reported: `/Dhuhr/i` matched node 11, *"Qaylulah — Midday Rest — A short pre-**Dhuhr** nap"*, a non-prayer node, producing an apparent "empty Dhuhr". Enumerating all 16 node labels and opening index 12 (*"Dhuhr Prayers"*) directly gave the correct result. **A regex over rendered node text is not a node selector.**

**Amanah:** neutral as a code change, positive as a covenant one. No capital instrument, no CSA/CSRA/salam/yield-share surface. It restores hadith-graded practice the app had seeded and then hidden from its user, and it removes a chip that would have called a *muʾakkadah* Sunnah an embellishment.

Committed as `4ec016e` on `feat/desktop-pillar-glyphs` (6 files, +154/−12), on top of `c8e4d60` which committed the prior session's popup and per-prayer Sunnah work. Not pushed.

## Connections

- [[2026-07-23-milos-prayer-node-sunnah-tabs]] — the same-day decision this amends; its `before → Qiyām row` mapping is what Defect 2 corrects
- [[2026-07-22-milos-prophetic-path-node-popup]] — the popup both defects surfaced in
- [[2026-07-09-milos-prayer-banner-non-blocking]] — source of the stale-CONTEXT.md lesson applied here
- [[2026-04-18-milos-grounding-two-axis]] — the structured `sources[]` regime the lead notes read from unchanged
- [[milos]] — the app whose prayer surface this governs
- [[covenant-architecture]] — a level chip is a covenant claim; defaulting one is authoring one
