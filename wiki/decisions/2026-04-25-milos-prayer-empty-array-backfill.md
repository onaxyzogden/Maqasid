---
title: "MILOS prayer empty-array — optional 4-rakʿat before-Isha sunnah backfilled (ratchet → 0)"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, grounding, prayer, sunnah, notebooklm, muslim-scholar, sealing]
superseded_by: null
---

# MILOS prayer empty-array — optional 4-rakʿat before-Isha sunnah backfilled (ratchet → 0)

## Context

The final ratchet still off zero after the Phase 2 hadith closure ([[2026-04-25-milos-inline-refs-hadith-backfill]]) was the empty-array ratchet at 1 — a single entry in [src/data/seed-tasks/prayer-seed-tasks.js](src/data/seed-tasks/prayer-seed-tasks.js): `prayer_isha_during[0].subtasks[0]` ("Optional — two sets of two if time permits"), the 4 rakʿat before Isha categorized as T3/Niyyah (meritorious but not muʾakkadah).

Per the grounding-gate decision ([[2026-04-25-milos-grounding-gate-default]]) this entry was held under `allowEmptyArray: 1` in [grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) and mirrored as `ALLOW_EMPTY = 1` in [scripts/lint-grounding.mjs](scripts/lint-grounding.mjs), pending NotebookLM Muslim Scholar citation for the canonical anchor.

## Decision

### Citation: Sahih al-Bukhari 627 / Sahih Muslim 838

The canonical prophetic anchor for any optional pre-fard nafl is the "between every two adhans is a prayer" hadith. Retrieved from NotebookLM Muslim Scholar (1c17b03b):

- **Arabic:** بَيْنَ كُلِّ أَذَانَيْنِ صَلاَةٌ، بَيْنَ كُلِّ أَذَانَيْنِ صَلاَةٌ، ثُمَّ قَالَ فِي الثَّالِثَةِ: لِمَنْ شَاءَ
- **Translation:** "There is a prayer between the two Adhans (Adhan and Iqama). [Said thrice; on the third he added:] For the one who wants to pray."
- **Grade:** Sahih (agreed upon — Bukhari and Muslim)
- **Tier/relevance:** Bayyinah / direct

The Muslim Scholar PDF used an older edition listing the same narration under Bukhari 597/600 and Muslim 1822; modern sunnah.com numbering is Bukhari 627 / Muslim 838. The rationale field carries a `ratNote` flagging sunnah.com cross-reference verification recommended in scholar polish.

### Both ratchets decremented to 0

[src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js):

```diff
-{ id: 'prayer', data: PRAYER_SEED_TASKS, expectedLegacy: 0, allowEmptyArray: 1 },
+{ id: 'prayer', data: PRAYER_SEED_TASKS, expectedLegacy: 0, allowEmptyArray: 0 },
```

[scripts/lint-grounding.mjs](scripts/lint-grounding.mjs):

```diff
-const ALLOW_EMPTY = 1;
+const ALLOW_EMPTY = 0;
```

## Consequences

**Positive:**
- All three monotonic grounding ratchets now at minimum: per-pillar legacy 0, empty-array 0, inline-refs 0.
- The grounding gate ([[2026-04-25-milos-grounding-gate-default]]) is fully sealed — `npm run lint` now allows zero deviations from the two-axis schema.
- Every seeded subtask across all 8 pillars has at least one structured `sources[]` entry (where citation is applicable).

**Trade-offs:**
- The Bukhari 627 rationale carries a `ratNote` for sunnah.com verification. Adds the entry to the 4-item scholar-polish backlog (alongside Bukhari 5267 and Tirmidhi 2007 ×2 from Phase 2 hadith).

**Files touched:**
- [src/data/seed-tasks/prayer-seed-tasks.js](src/data/seed-tasks/prayer-seed-tasks.js) — sources `[]` → 1 structured entry
- [src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) — `allowEmptyArray: 1 → 0`
- [scripts/lint-grounding.mjs](scripts/lint-grounding.mjs) — `ALLOW_EMPTY = 1 → 0`

**Verification:**
- `npm test` → 40/40 green
- `npm run lint` → exit 0 (eslint clean; grounding-strict 0 empty-array under ratchet 0; inline-refs 0 ≤ 0)
- Dev-server module load: `prayer_isha_during[0].subtasks[0].sources` length 1, ref `Sahih al-Bukhari 627`, grade `Sahih (agreed upon — Bukhari and Muslim)`

## Carries forward

- **Scholar polish backlog** — 4 entries with `ratNote` flags (Bukhari 5267, Tirmidhi 2007 ×2, Bukhari 627) need sunnah.com canonical-numbering verification.
- **Rationale enrichment** — synthesized placeholder rationales across ~1,904 entries — long-tail downstream stream, separate from grounding gate.
