# Scholar Reviewer Brief — Maqasid OS Citation Corpus

**Date drafted:** 2026-04-16
**Status:** review — to be sent to a qualified madhhab-trained reviewer
**Prepared by:** Yousef Abdelsalam (Maqasid OS)

---

## What this is

Maqasid OS is an Islamic life operating system that organizes work, wealth,
family, and community activity across the Seven Maqasid (Faith, Life,
Intellect, Family, Wealth, Environment, Ummah). Each pillar decomposes into
modules → tasks → subtasks. For ~1,500 subtasks we have attached
Qur'anic ayat and Sahih hadith (Bukhari and Muslim only) as
*suggestive references* — starting points for reflection and study.

We are seeking a qualified scholar to spot-review **289 subtask-citation
blocks** and mark which may carry a **"scholar-reviewed"** badge in the UI
vs. remain under the default **"suggestive reference — pending scholar
review"** disclaimer.

---

## How the corpus was built

1. **Source texts**: canonical Qur'an (Arabic + Saheeh International English)
   and Sahih Bukhari + Sahih Muslim only. No other collections included at
   this stage.
2. **Matching**: each subtask title was embedded using a multilingual
   sentence-transformer (`paraphrase-multilingual-MiniLM-L12-v2`) and matched
   by cosine similarity against the embedded verse/hadith corpus.
3. **Filtering**:
   - **Fiqh-sensitive ayahs** (30 verses covering menstruation, iddah, dhihar,
     divorce, hadd, li'an) are gated by topical keyword — only surface on
     subtasks whose title contains the matching fiqh keyword.
   - **Domain-clash filter** vetoes cross-domain mismatches (e.g., war
     verses on civilian subtasks).
   - **Contextual pairing gates** (~50 ayah, ~24 hadith entries) require the
     subtask title to match a topical keyword before surfacing that specific
     citation. We do **not** blacklist any authentic ayah or hadith — every
     verse is revelation and every Sahih narration is authentic. The gates
     filter *pairing* only.
4. **Output**: top 3 ayat + 1–2 hadith per subtask, above a cosine threshold.

---

## What you would be attesting to

For each block you approve, you are affirming:

- The citation's topical subject actually maps to what the subtask is about.
- There is no fiqh-sensitive or theologically awkward implication in the
  pairing (e.g., no verse whose tafsir is specific to a context the subtask
  doesn't engage).
- A lay Muslim user reading this pairing as "starting point for study" will
  not be led into error.

You are **not** attesting to:

- Any *ijazah*-level claim over the corpus as a whole.
- Fatwa rulings.
- Translation accuracy of Saheeh International (treated as given).

---

## Estimated engagement

| Item | Estimate |
|---|---|
| Blocks to review | 289 |
| Pace | ~30 blocks / hour (includes re-reading verse in mushaf + tafsir check) |
| Total | ~10 hours |
| Deliverable | Annotated CSV / markdown: for each block, verdict ∈ {approve, reject, revise, defer}, with optional note |
| Compensation | [to be negotiated] |

Suggested split across **two passes**:

- **Pass 1 (6 hrs)**: rapid verdict on all 289 blocks.
- **Pass 2 (4 hrs)**: deeper review of the ~50 flagged as "revise/defer",
  and a sample audit of the approvals.

---

## What we will do with your verdicts

- `approve` → subtask's `sourcesTrust` field set to `scholar-reviewed` in
  source data. UI shows a green affirmation banner.
- `reject` → citation removed from the subtask. We will not try to replace
  it automatically; the subtask reverts to having fewer or no citations
  until a better pairing is found.
- `revise` → we re-run the reranker against your note (e.g., "better verse
  would be 37:102") and re-submit for your confirmation.
- `defer` → citation stays under the default "suggestive" banner; not
  removed but not promoted.

---

## Pre-review materials we will provide

- The 289-block corpus as a readable markdown file grouped by pillar.
- The current reranker script (`scripts/rerank-hadith-embeddings.mjs`) and
  the contextual-gate structures (`AYAH_CONTEXTUAL_GATES`,
  `HADITH_CONTEXTUAL_GATES`) so you understand the pairing method.
- The prior scholar review I conducted internally
  (`stages/hadith-scholar-review-review.md`) identifying 22 known-wrong
  pairings already corrected, and listing gold-standard exemplars for
  calibration.
- A worked example showing one `approve`, one `reject`, and one `revise`
  so the verdict format is unambiguous.

---

## Known limitations to disclose upfront

- **Embeddings, not tafsir**: the matcher works on *conceptual similarity*,
  not classical exegesis. It can surface verses whose literal meaning fits
  but whose tafsir context is a different matter (e.g., Makki vs Madani
  distinctions, asbab al-nuzul). These are the cases we need your judgment
  on.
- **Sunan collections not included**: Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah
  are out of scope for V1. We deliberately narrowed to Bukhari/Muslim to
  keep authenticity uncontested.
- **Single-madhhab sensitivity**: please note your madhhab on the review —
  if a verdict is madhhab-dependent (especially for fiqh-sensitive
  pairings), mark it as such so we can flag to users.

---

## Contact

Yousef Abdelsalam
yousef@ogden.ag

---

*"And say: My Lord, increase me in knowledge." (20:114)*
