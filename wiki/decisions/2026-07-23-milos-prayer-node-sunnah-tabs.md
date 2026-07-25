---
title: "Prayer nodes show their own Sunnah, not the generic Salah threshold"
type: decision
date: 2026-07-23
status: superseded
tags: [ui, islamic, prayer, prophetic-path, grounding, milos]
superseded_by: 2026-07-25-milos-prayer-popup-consolidation
---

# Prayer nodes show their own Sunnah, not the generic Salah threshold

> [!warning] Superseded 2026-07-25 — the rendering this decision introduced was removed
> Two days later the operator asked for the opposite of this decision's *display*: *"In the popup for the prophetic path for prayers, I only want to see the list of tasks and not the list of prayers."* The Before/After tabs now render the **task list alone** — `PrayerSunnahSummary` is deleted and the Sunnah rawātib card no longer appears in the popup. See [[2026-07-25-milos-prayer-popup-consolidation]].
>
> What survives: the **data and selector** this decision surfaced (`PRAYER_GUIDE`, `getPrayerPhaseSunnah`, `SUNNAH_LEAD`, and the same-day Tahajjud amendment) remain in [prayer-seed-tasks.js](src/data/seed-tasks/prayer-seed-tasks.js) — retained, still seeding the anatomy boards, but now an **unrendered export** (their only consumer, `PrayerSunnahSummary`, is gone). The fiqh reasoning below — that surfacing existing graded content authored no new fiqh, and that empty windows must be shown as prohibitions not gaps — stands as record; only the popup surface changed.

## Context

With the node popup shipped ([[2026-07-22-milos-prophetic-path-node-popup]]), the operator opened the six prayer nodes and found the Before and After tabs showing **the same thing on all six** — and the same thing as each other.

The mechanism: `thresholdModuleId = THRESHOLD_MODULE_BY_NODE[node.id] || moduleId || 'work'`, and `THRESHOLD_MODULE_BY_NODE` maps **all six** prayer nodes (`fajr`, `dhuhr`, `asr`, `maghrib`, `isha`, `tahajjud`) to `faith-salah`. So `<CeremonySummary moduleId="faith-salah">` resolved one du'a and one attribute pair, twelve times over — six nodes × two tabs.

The operator's correction was a fiqh correction, not a UI one: *"Each prayer has a unique Sunnah before and after. Identify and present before updating."*

The decisive discovery: **that data already existed in the repo, already hadith-graded.** `PRAYER_GUIDE` (`src/data/seed-tasks/prayer-seed-tasks.js`) carries per-prayer `structure[]` rows — `kind`, `count`, `note`, `tier`, `amanahRationale`, `why`, `how`, structured `sources[]` — plus a `keys[]` array of prohibition/permission strings. It was **private**, used only to seed the `prayer_{id}_during` anatomy boards. Nothing needed to be authored; it needed to be surfaced.

## Decision

On the six prayer nodes, the Before/After tabs render `<PrayerSunnahSummary prayerId={node.id} phase={phase} />` instead of `<CeremonySummary>`. Non-prayer nodes are untouched.

```jsx
{isPrayerNode
  ? <PrayerSunnahSummary prayerId={node.id} phase={phase} />
  : <CeremonySummary moduleId={thresholdModuleId} type={…} onBegin={…} />}
```

### What each prayer now shows (all from `PRAYER_GUIDE`, verbatim in substance)

| Prayer | Sunnah **before** | Sunnah **after** |
|---|---|---|
| **Fajr** | 2 rakʿah — muʾakkadah (T1) · *Sahih Muslim 725* | **none** — "No voluntary prayer between Fajr and sunrise." |
| **Dhuhr** | 4 rakʿah, two sets of two — muʾakkadah (T1) · *Sahih Muslim 728a* | 2 rakʿah — muʾakkadah (T1) · *Sahih Muslim 728a* |
| **ʿAṣr** | 4 rakʿah — *ghayr* muʾakkadah (T2) · *Jami at-Tirmidhi 430* | **none** — "No voluntary prayer after ʿAṣr until Maghrib." |
| **Maghrib** | **none fixed** — 2 light rakʿah permitted if time allows before the iqāmah | 2 rakʿah — muʾakkadah (T1); al-Kāfirūn + al-Ikhlāṣ · *Sunan Ibn Majah 1166; Sahih Muslim 728a* |
| **Isha** | 4 rakʿah — optional (T3) · *Sahih al-Bukhari 627* | 2 rakʿah muʾakkadah (T1) · *Sahih Muslim 728a* **and** Witr, 1/3/5/7/9 (T1) · *Sahih Muslim 752; Sunan Abi Dawud 1422* |
| **Tahajjud** | Qiyām in pairs of 2, begin with 2 light · *Sahih al-Bukhari 990; Sahih Muslim 767b* — **amended same day, see below** | **none** — Witr seals the night; "no two witrs in one night" |

### The empty slots are surfaced honestly

Four windows have **no** rawātib — and three of those are so because a voluntary prayer there is *prohibited* or merely *permitted*, not because the data is missing. Rather than pad them with a rakʿah count, `PrayerSunnahSummary` renders the matching string from `PRAYER_GUIDE[prayerId].keys` as a quiet, non-actionable line: the Fajr and ʿAṣr prohibitions, the Maghrib permission, and the Tahajjud "no two witrs." **A UI that fills every slot symmetrically would be teaching a prayer that should not be prayed.**

### Selector shape — `getPrayerPhaseSunnah(prayerId, phase)`

`PRAYER_GUIDE` stays private; only the selector is exported. It returns `{ prayerId, phase, prayerLabel, rows[], fallbackNote }` — **extended the same day** to `{ …, leadNotes[], rowsCaption }`, see the amendment below.

`rows` is an **array, not a single object** — a refinement over the plan, forced by Isha, whose "after" legitimately carries *two* distinct prayers (the 2-rakʿah rawātib **and** Witr). Flattening those into one row would have merged two separate prophetic acts into one card.

Mapping: `before` → the `kind: 'Sunnah before'` row, or for Tahajjud the `Qiyām` row; `after` → the `kind: 'Sunnah after'` row, plus the `Witr` row where one exists. When `rows` is empty, a per-slot needle looks up the relevant `keys[]` string.

**Every fallback needle is deliberately all-ASCII** (`'No voluntary prayer between Fajr'`, `'If time allows before'`, `'no two witrs'`), and the Tahajjud lookup uses `startsWith('Qiy')` rather than matching `'Qiyām'`. On a Windows/cp1252 checkout, a needle containing `ā` or `ʿ` is a silent-miss waiting to happen — the card would render "no rawātib authored" for a prayer that has one, with no error anywhere.

### Presentation

Per row: a rakʿah-count badge, a tier pill (`T1` → *Muʾakkadah*, `T2` → *Ghayr muʾakkadah*, `T3` → *Optional*), the `note`, the `why`, then the grounding source — Arabic, translation, and `ref · grade`. `formatCount` passes non-numeric counts straight through, so Tahajjud's "Pairs of 2" and Witr's "1, 3, 5, 7 or 9" read as authored rather than being coerced into a number.

`valuesLayer` is honored: `universal` suppresses the Arabic script and shows translation only, matching `DuaSection` / `AttributeCard`.

`PrayerSunnahSummary.css` is **co-located and unscoped** — no `.prophetic-path` ancestor selector — because the popup portals into `<body>`. It follows `CeremonySummary.css`'s precedent, and the file header says so, so the next reader does not "fix" it by scoping it.

## Amendment — same day: Tahajjud's Before was showing the prayer itself

Filed here because it corrects **this** decision's mapping; the full record is [[2026-07-23-milos-prayer-phase-task-boards]].

The operator opened Tahajjud and reported *"there's so much more to the before of Tahajjud that's missing from here."* The mapping above — `before` → *"or for Tahajjud the `Qiyām` row"* — was a workaround for a real gap in the data (`PRAYER_GUIDE.tahajjud.structure` has **no `Sunnah before` row**, only `Qiyām` and `Recommended`), and it produced a screen that offered **the night prayer as what precedes the night prayer**. Correct data, wrong slot: the row answers *what you pray*; the tab asks *what comes first*.

The genuine before-content was unused in the same object — `PRAYER_GUIDE.tahajjud.keys` holds the last-third-of-the-night descent hadith (Bukhārī) and *"Begin with 2 light rakʿahs, then lengthen."* Offered three options, the operator chose **"keep it, reframed."** A `SUNNAH_LEAD` table keyed `'{prayerId}:{phase}'` now returns those two keys as `leadNotes[]`, plus a `rowsCaption` of **"What you rise toward"**; `PrayerSunnahSummary` renders the notes as a quiet lead **above** the `Qiyām` row. Nothing is removed — the ordering does the teaching.

The lead needles are all-ASCII (`'Best in the last third'`, `'Begin with 2 light'`) for the identical cp1252 reason given for `SUNNAH_FALLBACK_MATCH` above. The no-fiqh constraint holds: both notes are existing graded strings reused verbatim, and the caption is a UI label, not a claim about the Sunnah.

`SUNNAH_LEAD` is a **per-window escape hatch**, not a general mechanism — adding entries for prayers that already have a `Sunnah before` row would duplicate content rather than order it.

## Rationale

The generic threshold was not merely repetitive — it was **inaccurate**. Fajr's two rakʿah before and ʿAṣr's prohibition after are not the same act rendered twice; presenting them identically flattens a real distinction in the Sunnah. Six nodes with one du'a between them teaches that the prayers are interchangeable at their edges, which is the opposite of what the rawātib are.

Sourcing everything from `PRAYER_GUIDE` was the load-bearing constraint. **This change authored no fiqh.** Every count, tier, note, and citation was already in the repo, already graded, already under the grounding ratchets — so surfacing it carried no new theological claim requiring a grounding pass, and both ratchets stayed at 0. A component that composed its own Sunnah text would have been a covenant liability regardless of how correct it looked.

## Alternatives Considered

- **Add a per-prayer `MODULE_ATTRS` entry (`faith-salah-fajr`, …).** Rejected — it would author twelve new ceremony datasets to solve a display problem, and it would put the rawātib inside the *ceremony* vocabulary (du'a + attributes + readiness) rather than the prayer-anatomy vocabulary they actually belong to.
- **Keep `CeremonySummary` and append the Sunnah below it.** Rejected — the identical du'a would still head all six nodes' Before and After, so the reported problem would survive the fix.
- **Show a symmetric card for every prayer with "—" where no rawātib exists.** Rejected on fiqh grounds: the ʿAṣr and Fajr "after" windows are prohibitions, not gaps, and the UI must say so.
- **Return a single flat object from the selector.** Rejected once Isha's after-window proved to hold two distinct prayers.
- **Author fresh per-prayer text from a NotebookLM grounding pass.** Rejected — `PRAYER_GUIDE` already held graded content; a parallel authored copy would be a second source of truth about the same Sunnah, free to drift.

## Consequences

- **Prayer nodes no longer surface the generic `faith-salah` opening/closing ceremony in the popup.** This is intended and was confirmed with the operator. The niyyah/readiness ceremony stays reachable via the route-level `CeremonyGuard` on the Salah pages.
- `getPrayerPhaseSunnah` is now the sanctioned read path into `PRAYER_GUIDE`. The guide itself stays private — new surfaces should extend the selector rather than export the data.
- The `PRAYER_GUIDE` `kind` strings (`'Sunnah before'`, `'Sunnah after'`, `'Witr'`, `'Qiyām'`, `'Farḍ'`, `'Recommended'`) and the `keys[]` prose are now **UI contract**, not just seed input. Editing a `kind` value or rewording a prohibition key can silently blank a card — the selector matches on both.
- `--text1` does **not exist** in `src/styles/tokens.css` despite being referenced in five CSS files. `PrayerSunnahSummary.css` uses `--text` (the real primary-text token). The five stale references are pre-existing and untouched; worth a sweep.
- `CeremonySummary` is now a **non-prayer-node** component. `src/components/islamic/CONTEXT.md` says so explicitly, because the Context-First Protocol makes a stale CONTEXT.md a live defect (the lesson from [[2026-07-09-milos-prayer-banner-non-blocking]]).

## Verification

- `npm test` — **77/77**. `npm run lint` — ESLint, `lint:grounding-strict`, and `audit:inline-refs` all green; both grounding ratchets held at 0. `npm run build` — `✓ built in 1.47s`.
- **`generate:pillar-glyphs:check` failed** with `Error: transport invoke timed out after 60000ms` on `src/pages/family/FamilyLevelNavigator-constants.js` — a Vite SSR cold-start timeout in this environment, pre-existing, on the Family pillar, unrelated to this change. It was predicted by name in the approved plan and is reported rather than papered over.
- **Preview-verified with screenshots**, per the operator's standing rule: Fajr Before (2 rakʿah + Muslim 725) and After (the sunrise prohibition); Maghrib Before (the permission note) and After (2 rakʿah, al-Kāfirūn + al-Ikhlāṣ); Isha After showing **both** the rawātib row and the Witr row; a non-prayer node (`midday-labor`) still showing the generic threshold — the regression check that proves the branch is scoped; `valuesLayer: universal` with the Arabic suppressed; and mobile at 375px. Zero console errors. The preview was left clean — Islamic layer restored, desktop viewport, popup closed.
- Contrast with [[2026-07-09-milos-prayer-banner-non-blocking]]: the screenshot tool timed out 6× that session and **worked throughout this one**, so the hang is intermittent rather than a standing limitation of this project.
  > [!warning] This conclusion was too strong — corrected the next day
  > The very next session ([[2026-07-23-milos-prayer-phase-task-boards]]) hit it again, with a different message: *"the Browser pane is not displayed, so the page is not compositing frames."* The hang is intermittent **and pane-visibility-dependent** — "it worked this session" is not evidence the tool is reliable, only that the pane happened to be composited.

**Amanah:** neutral as a code change, positive as a covenant one. No capital instrument, no CSA/CSRA/salam/yield-share surface. The change presents existing hadith-graded content and **authors no new fiqh** — the deliberate constraint that kept it inside the grounding ratchets. It strengthens the covenant posture on two counts: it stops the app teaching six distinct prayers as one, and it refuses to display a voluntary prayer in windows where the Sunnah prohibits one.

Uncommitted at time of filing; **committed the same day as `c8e4d60`** on `feat/desktop-pillar-glyphs`, sharing that commit with [[2026-07-22-milos-prophetic-path-node-popup]] (5 modified + 8 new files, +156/−457 in the tracked set). Not pushed.

## Connections

- [[milos]] — the app whose prayer surface this governs
- [[2026-07-23-milos-prayer-phase-task-boards]] — amends this decision's Tahajjud mapping and selector shape; also fixes the hidden prayer-task boards
- [[2026-07-22-milos-prophetic-path-node-popup]] — the popup this fills; created the defect this fixes
- [[2026-07-09-milos-prayer-banner-non-blocking]] — the sibling prayer-surface correction; source of the stale-CONTEXT.md lesson applied here
- [[2026-04-18-milos-grounding-two-axis]] — the structured `sources[]` regime this change reads from and did not have to extend
- [[covenant-architecture]] — the rawātib are the covenant's edges; flattening them flattens the day
