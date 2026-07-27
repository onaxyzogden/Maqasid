---
title: "MILOS — every prayer node gets a During how-to guide (shared builder + grounding corpora)"
type: decision
date: 2026-07-25
tags: [milos, prayer, prophetic-path, during-guide, grounding, fiqh, amanah, shared-builder]
---

# Every Prophetic Path prayer node gets a "how to pray" During guide

## Context

Each Prophetic Path prayer node opens `NodePhaseSlideUp` with **Before / During / After** tabs. Since [[2026-07-25-milos-prayer-popup-consolidation]] the During tab renders `<PrayerHeroDuring pillarKey={node.id} />` **inline** — a visual during-the-prayer guide (Reference scroll + opt-in Pray-Along) driven entirely by a lookup: `PRAYER_SEQUENCES[node.id]` in [prayer-sequences.js](src/data/prayer-sequences.js). That map registered **only `isha` and `fajr`**. The other four prayer nodes — **Dhuhr, Asr, Maghrib, Tahajjud** — had no entry, so `PrayerHeroDuring` fell through to a hardcoded `ComingSoonShell`.

Operator: *"Every prayer node in the prophetic path is missing the how-to in the during tab except for Isha. Let's fix that."* The premise was slightly off — Fajr had been added alongside Isha — but the misleading signal was real: the shell's stale copy read *"Isha is available today,"* which is why Fajr's working guide went unnoticed and Dhuhr/Asr/Maghrib/Tahajjud looked like the whole set. The actual gap was **four prayers**, confirmed by reading the registry rather than the shell copy.

The rakʿah structures were confirmed against the repo's own already-graded fiqh source, `PRAYER_GUIDE` in [prayer-seed-tasks.js](src/data/seed-tasks/prayer-seed-tasks.js) — **no structure was invented**:

| Prayer | Rakʿāt | Recitation | Postures/rakʿah |
|---|---|---|---|
| Dhuhr | 4 fard | silent (sirrī) throughout | {1:7, 2:7, 3:6, 4:8} = 28 |
| Asr | 4 fard | silent (sirrī) throughout | {1:7, 2:7, 3:6, 4:8} = 28 |
| Maghrib | 3 fard | aloud r1–2, silent r3 | {1:7, 2:7, 3:8} = 22 |
| Tahajjud | **nafl** (voluntary) | by choice; prayed in 2-rakʿah units | {1:7, 2:8} = 15 |

## Decision

Author During-guide data for the four missing prayers via a **shared builder**, register them, and back each with a matching grounding corpus — leaving the verified Isha/Fajr files untouched (zero regression surface). Chosen with the operator through AskUserQuestion: **scope = all four**; **approach = shared builder**; **grounding = yes, author matching corpora**.

- **New shared builder** [prayer-during-builder.js](src/data/prayer-during-builder.js) holds the recitation objects (`takbir`, `thana`, `taawwudh`, `fatihahFull`, `tasbihRuku`, `samia`, `rabbana`, `tasbihSujud`, `rabbiGhfir`, `attahiyatuFull`, `salawat`, `salam`, plus parameterized `fatihahRepeat`/`fatihahOnly`/`surah`) **copied verbatim from the verified [isha-during.js](src/data/isha-during.js)** — so **no new Arabic is written and no fiqh is authored**. `buildPrayerSequence({ rakahCount, audibleRakahs, closingNote })` returns `{ steps, posturesPerRakah, totalSteps }`, encoding the standard sequence: first tashahhud iff `rakahCount ≥ 3`; final tashahhud + ṣalawāt + salām on the last rakʿah; `audibleRakahs` flips each surah/fatihah/qiyām note between "recited aloud" and "recited silently"; `posturesPerRakah` is **computed, not hand-typed** (removes the comment-math drift risk of the older hand-authored files). Step ids reuse the existing scheme (`r1-takbir`, `rN-salam`, …) — per-sequence React keys, so identical ids across prayers are safe.
- **Four thin `-during.js` files** ([dhuhr-during.js](src/data/dhuhr-during.js), [asr-during.js](src/data/asr-during.js), [maghrib-during.js](src/data/maghrib-during.js), [tahajjud-during.js](src/data/tahajjud-during.js)), ~6 lines each: `dhuhr`/`asr` → `rakahCount: 4, audibleRakahs: []`; `maghrib` → `rakahCount: 3, audibleRakahs: [1, 2]`; `tahajjud` → `rakahCount: 2, audibleRakahs: [1, 2]` plus a `closingNote` carrying the night-prayer fiqh verbatim from `PRAYER_GUIDE` (prayed in pairs of two with one salām each; the Prophet ﷺ did not exceed eleven rakʿāt in the night incl. Witr; seal the night with an odd Witr if not already prayed after Isha).
- **Registry** [prayer-sequences.js](src/data/prayer-sequences.js): four imports + four entries. Tahajjud carries `fardRakahSummary: "2 rakʿāt per unit"` and, crucially, an optional **`headline` override** — because the Reference header hardcodes *"How to pray {label} **Fard**."* **Rendering "Fard" for a nafl prayer is a fiqh error;** Tahajjud sets `headline: "How to pray Tahajjud — 2 rakʿāt at a time"`. The four fard prayers omit `headline` → unchanged wording.
- **Component** [PrayerHeroDuring.jsx](src/components/islamic/PrayerHeroDuring.jsx): the Reference header renders `{headline ?? \`How to pray ${label} Fard (${fardRakahSummary})\`}`; the `ComingSoonShell` body copy was genericized (the stale "Isha is available today" line dropped — the shell is now unreachable by any prayer node but kept as a defensive fallback).
- **Four grounding corpora** at repo root — `nb_salah_{dhuhr,asr,maghrib,tahajjud}.json` — matching the existing `{ notebook, topic, description, entries[], structural_notes[], warnings[] }` schema. The 12 recitation entries are reused **byte-identical** from `nb_salah_isha.json` (same recitations); only the prayer-specific `topic`/`description`/`structural_notes` differ, and every structural citation is drawn from sources already in-repo (Tahajjud's notes cite Bukhari 990 / Muslim 749 for "night prayer is two by two", Bukhari 1147 / Muslim 738 for the eleven-rakʿah ceiling, Muslim 752 for sealing with Witr — all present in `PRAYER_GUIDE`). These corpora are **provenance-only** (not imported, not rendered, not test-gated), matching how `nb_salah_isha.json`/`nb_salah_fajr.json` already behave — they exist so the `-during.js` header comments' "Grounded in nb_salah_<key>.json" pointers are not false.

Also updated the stale "only Isha/Fajr have a During guide" note in [islamic/CONTEXT.md](src/components/islamic/CONTEXT.md).

## Amanah gate

**Positive.** The change completes devotional guidance for all six prayer nodes and removes a false on-screen signal ("Isha is available today"). It is grounded to already-verified in-repo sources only: every recitation is copied verbatim from the verified `isha-during.js`; every citation is reused from `nb_salah_isha.json` or `PRAYER_GUIDE.sources[]`. **No hadith number and no Arabic was invented.** The one genuinely new fiqh-adjacent surface — Tahajjud's non-"Fard" framing and its pairs-of-two/Witr closing note — is drawn verbatim from `PRAYER_GUIDE`, and refusing to label a voluntary prayer "Fard" is itself the covenant-correct call. No capital instrument, no CSA/CSRA/salam/yield-share surface.

## Verification

- **`npm test` — 94/94.** **`npm run build` — ✓ 1.33s**, all four new imports resolve, no dangling references.
- **Lint — the three CLAUDE.md-documented grounding gates are green:** `lint:eslint` **0 errors** (1 pre-existing warning on `IslamicPanel.jsx:32`, not mine); `lint:grounding-strict` **[STRICT] Pass** — prayer pillar **87 subtasks, 0 legacy, 0 errors, all grounded** (my change touches no seed `sources[]`, so the ratchet holds); `audit:inline-refs` **[STRICT] OK 0 ≤ ratchet 0** — prayer **0**.
- **The composite `npm run lint` exits red on its 4th step only** — `generate:pillar-glyphs:check`, a branch-local WIP tool (not among the three gates CLAUDE.md documents for `lint`), which times out SSR-loading [HealthLevelNavigator-constants.js](src/pages/health/HealthLevelNavigator-constants.js): *"transport invoke timed out after 60000ms."* This is **structurally impossible to be caused by this change** — the failure is in `getSubPillars` loading a **health-pillar** navigator file; none of my files (prayer data, corpora, `PrayerHeroDuring`) is in that import path. It is the same environmental Vite-module-runner transport timeout recorded across this month's sessions ([[project-screenshot-hang]]-adjacent); last session it failed on the *Family* navigator constants, now the *Health* one — **the failing file changing between runs confirms a nondeterministic transport timeout, not a code defect** — and was proven not-mine last session via `git stash`. Surfaced, not hidden behind the red aggregate.
- **The screenshot tool was unavailable this session** — the recurring [[project-screenshot-hang]]: the Browser pane is not displayed, so the page is not compositing frames and synthetic clicks are not delivered. Per the project rule (*"If the screenshot tool is unresponsive, say so rather than assuming success"*), verification was **DOM-level**: nodes opened by `.click()` on `button.pp-card` via `javascript_tool`, guides read back from the live DOM. All four render correctly with the During tab as the active default and **zero mojibake**:

  | Prayer | Header | Rakʿah sections | Arabic (chunks / sample) | RTL els |
  |---|---|---|---|---|
  | Maghrib | "How to pray Maghrib Fard (3 rakʿāt)" | 1, 2, 3 | 211 / مغرب, تكبيرة, الإحرام | 30 |
  | Asr | "How to pray Asr Fard (4 rakʿāt)" | 1, 2, 3, 4 | 239 / عصر | 37 |
  | Dhuhr | "How to pray Dhuhr Fard (4 rakʿāt)" | 1, 2, 3, 4 | 239 / ظهر | 37 |
  | **Tahajjud** | **"How to pray Tahajjud — 2 rakʿāt at a time"** (**no "Fard"**) | 1, 2 | 166 / تهجّد | 22 |

  The **critical fiqh check passed**: Tahajjud's header carries no "Fard" (`headerSaysFard: false`). Its closing note renders intact (pairs of two with one salām; the eleven-rakʿāt night ceiling; seal with an odd Witr). Tahajjud **Pray-Along** mode renders the first step (تكبيرة الإحرام / اللَّهُ أَكْبَر) with working nav and no error boundary; step navigation advances into qiyām (Thanāʾ سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ).

Uncommitted on `feat/desktop-pillar-glyphs`; commit operator-gated.

## Connections

- [[milos]] — the app whose prayer surface this governs
- [[2026-07-25-milos-prayer-popup-consolidation]] — the immediate predecessor: it inlined `PrayerHeroDuring` into the During tab but left four prayers showing the coming-soon shell; **this completes that During tab**
- [[2026-07-25-milos-nonprayer-tasks-to-during]] — the non-prayer complement filed the same day (a sibling, not a dependency)
- [[2026-07-23-milos-prayer-node-sunnah-tabs]] — established that per-prayer fiqh already lives graded in `PRAYER_GUIDE`; the same source underwrites these guides' structures
- [[2026-04-21-prayer-slide-up-fln]] — origin of `PrayerHeroDuring` (its During-hero), now consumed only by the popup
- [[covenant-architecture]] — keeps the prayer itself at the center of its node, now for every prayer
- [[amanah-gate]] — no invented fiqh; grounded to verified in-repo sources only
- [[project-screenshot-hang]] — the recurring pane-not-displayed failure that forced DOM-level verification again
