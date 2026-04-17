# Hadith Enrichment QA Audit — 50-Block Sample Review

**Date:** 2026-04-16
**Sample:** 50 blocks drawn pseudo-randomly (seed 42) from `stages/hadith-enrichment-candidates.reranked.md` (1,826 total blocks)
**Sample file:** `stages/_qa-sample-50.md`
**Status:** review

---

## Headline finding

The reranker caught the worst offenders (hadd punishments, war/military, menstrual fiqh as originally documented) but a **significant residual false-positive rate remains**, driven by single-keyword matches where the ambiguous word carries a different sense in the source text than in the subtask.

Rough block-level breakdown of the 50:

| Quality | Count | Share |
|---|---|---|
| All citations strong | ~15 | 30% |
| Mixed (≥1 strong + ≥1 false-positive) | ~20 | 40% |
| Mostly/all false-positive | ~15 | 30% |

NO_RESULTS blocks (3 of 50) are correctly empty and are not counted.

---

## Confirmed strong matches (keep)

| Subtask | Citation | Why it works |
|---|---|---|
| faith > salah > Growth :: sujud of Tahajjud | 17:79, 73:6 | Direct tahajjud verses |
| life > physical > Excellence :: suhoor meal plan | 2:184, 2:185 | Core fasting ayat |
| wealth > ownership > Core :: signed amended contracts | 2:282 | Ayat al-dayn — the contract/recording verse |
| wealth > ownership > Growth :: purchase documentation | Bukhari 2356/2357/2416 | False-oath-to-take-property hadiths |
| ummah > community > Core :: ghusl of deceased | Bukhari 167, 1256 | Prophet's instructions on washing deceased daughter |
| ummah > moontrance-land > Growth :: plant hedgerows | Bukhari 2320 | "None amongst the Muslims who plants a tree..." |
| ummah > moontrance-residency > Core :: amir/treasurer roles | 12:55 | Yusuf: "Appoint me to supervise the treasures" |
| faith > hajj > Growth :: Ibrahim building Ka'bah | 2:125 | The House/Ka'bah verse |

---

## Surviving false-positive patterns

### 1. Ambiguous-word matches (wrong sense)

The reranker does topic modeling at submodule granularity but cannot disambiguate word senses. Recurring offenders:

| Word | Misapplied ayah | Subtask | Actual sense in ayah |
|---|---|---|---|
| "bank" | 8:42 ("nearer bank and further bank") | faith > zakah > Core :: zakah on bank savings | Riverbank (Battle of Badr) |
| "share" | 4:7, 4:11, 9:92, 16:56, 2:202 | intellect > learning > Excellence :: share resources; community > ghusl | Inheritance portion / share of reward / partners with Allah |
| "practice" | 33:62, 48:23, 35:43 | faith > salah > Excellence :: daily practice | Sunnat Allah (divine law) / plotting evil |
| "monthly" | **65:4** ("monthly courses") | wealth > earning > Growth :: monthly review session | **Women's menstrual period — fiqh-sensitive, should have been vetoed** |
| "circle" | 22:26 ("circle around the House") | intellect > thinking > Growth :: reading circle | Tawaf |
| "align(ed)" | 37:1, 37:165 | wealth > earning > Growth :: secondary income aligned with skills | Angels aligned in ranks |
| "high quality" | 56:34 ("mattresses of high quality") | intellect > thinking > Core :: high-quality sources | Paradise furnishings |
| "dependents" | 55:31 ("man and jinn") | life > mental > Core :: household media policy for dependents | The two sentient species |
| "structure/designed/simple" | 40:64, 9:109, 87:8 | ummah > community > Growth :: mentorship framework | Creation / foundation / Allah's path |
| "check" | 54:4 ("Recitals to check them") | environment > ecosystem > Core :: check certifications | Admonish/restrain |

**65:4 is the concerning one** — the reranker's menstrual-fiqh veto should have caught it. Likely the veto only looked at the hadith text corpus, not ayahs.

### 2. "Fallback" hadiths appearing across unrelated topics

These hadiths recur across many blocks where no better candidate existed. They share superficial keywords with many subtasks:

| Hadith | Typical false application | Actual content |
|---|---|---|
| Bukhari 3 | "first revelation" landing on suhoor plan, book reading | Start of wahy to the Prophet |
| Bukhari 22 | "people of Paradise" landing on zakah study, revise-and-publish | Hereafter scene |
| Bukhari 40 | "moved to Medina" landing on monthly reviews, tahajjud du'a | Direction of qiblah change |
| Bukhari 1166 | Istikhara on "Ilm (Knowledge)" | Du'a for decisions |
| Bukhari 4141 | Drawing lots for wives on "Ilm", "professional judgement" | Prophet's travel arrangements |
| Bukhari 160 | Uthman's ablution on replication consultation | Wudu |
| Bukhari 368 | Forbidden sale types on mentorship framework | Bay' al-limais/nibadh |

These look like the reranker accepted them when submodule-level topic similarity was weakest — essentially filling empty slots with the least-bad match rather than leaving the block empty.

### 3. Structural issues

- Some subtasks received **3 ayahs + 3 hadiths** where only one citation was strong. The other slots became noise.
- A few blocks (e.g., [intellect > thinking > Growth] :: reading circle) have one perfect citation (2:121 / Bukhari 7365) mixed with one bad citation (22:26) — clean-up would keep the good, drop the bad.

---

## Estimated blast radius

- **Sample FP-containing blocks:** ~35 / 50 (70% have at least one weak citation).
- Extrapolated to the full corpus: roughly **1,270 of 1,758 sourced subtasks** contain at least one questionable citation, though most also have at least one strong one.
- **Severe / fiqh-sensitive misapplications** (like 65:4): rare in the sample (~1) but each is high-visibility, so even 2% of 1,758 = ~35 blocks worth scanning for with a targeted second-pass veto.

---

## Recommendations

### Option 1 — ship as-is with reader disclaimer
Cheapest. The false positives are "bland" in most cases (they don't say something wrong, they just don't say something *relevant*). A short UI disclaimer on the sources panel ("Citations are suggestive, not exhaustive — consult your local scholar for ruling-level authority") absorbs most of the risk.

### Option 2 — second reranker pass with tightened filters (recommended)
Keep the existing reranker output, run a **targeted second pass** that:
1. Adds an ayah-side menstrual veto (65:4 and surrounding verses against any non-fiqh-of-purification subtask).
2. Adds a "fallback hadith" blacklist: any hadith whose topic-model score falls below threshold X gets dropped instead of kept. Candidates: Bukhari 3, 22, 40, 1166, 4141, 160, 368.
3. Penalises single-keyword-match-only ayahs (no semantic neighbours).

Expected reduction: another 20-30% of surviving candidates dropped, bringing total coverage from 1,758 → ~1,300 blocks but with much higher per-citation quality.

Would need the **strip-sources helper** you mentioned — the apply script currently guards on the `sources:` field, so a re-run is a no-op. Helper would:
- Accept a list of `{pillar, submodule, level, subtaskTitle}` tuples
- Strip the `sources:` line from matching subtasks in the seed files
- Then apply-hadith-sources.mjs can re-run cleanly

### Option 3 — full manual review
Highest quality, ~8-12 hours of focused work across 1,826 blocks. Not recommended unless Option 2's second pass is insufficient.

---

## Proposed next step

Go with **Option 2**. I can build:
1. `scripts/strip-hadith-sources.mjs` — takes a JSON blocklist, removes `sources:` from matching subtasks.
2. Extensions to `scripts/rerank-hadith-candidates.mjs` — add the ayah menstrual veto, fallback-hadith blacklist, and single-keyword penalty.
3. Re-run reranker → strip-sources for affected blocks → re-run apply script.

Estimated time: 2-3 hours of build + verification.

---

## Awaiting your call

- Approve Option 2 as outlined?
- Amend the scope (e.g., only the menstrual veto, skip the fallback-hadith pass)?
- Defer — ship as-is?
