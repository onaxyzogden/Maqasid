---
phase: research
slug: niyyah-feelings-citation-review
status: draft
amanah: pending
created: 2026-04-19 10:15
---

# Review Gate: research — niyyah-feelings-citation-review

## Summary

Verify the Qur'anic / classical groundings cited in the 12-item
`NIYYAH_FEELINGS` vocabulary at `src/data/niyyah-feelings.js` before
the Ad-lib ships to production users. Per global CLAUDE.md, all
citations in Islamic grounding must be verifiable via the
**Muslim Scholar NotebookLM** (`1c17b03b-3537-4fde-b5ba-562dbe0c1aab`).
This document stages the queries; actual NotebookLM calls are
pending approval.

## Current Groundings (to verify)

| id | Term | Claimed source | Verification needed |
|---|---|---|---|
| `sakinah` | Sakīnah | Q 48:4 | Confirm meaning of *sakīnah* matches "settled tranquility sent down onto hearts" |
| `inshirah` | Inshirāḥ aṣ-ṣadr | Q 94:1 | Confirm *sharḥ al-ṣadr* as "expansion of the chest" / spiritual ease |
| `tumaninah` | Ṭumaʾnīnah | Q 13:28 | Confirm "hearts find rest in dhikr" interpretation |
| `shukr` | Shukr | Q 14:7 | Confirm the "if you are grateful, I will increase you" pairing |
| `khushu` | Khushūʿ | Q 23:2 | Confirm "those who humble themselves in prayer" |
| `raja` | Rajāʾ | Q 39:53 | Confirm "do not despair of Allah's mercy" as basis for hope |
| `shawq` | Shawq | *(no citation)* | Check whether Quran directly uses *shawq*, or whether it's a classical Sufi/ṣufiyyah term requiring Ghazali / Ibn al-Qayyim source instead |
| `qabd` | Qabḍ | *(no citation)* | Classical *qabḍ / basṭ* pairing — source from Ibn al-Qayyim's *Madārij al-Sālikīn* or similar |
| `dayq` | Ḍayq aṣ-ṣadr | Q 15:97 | Confirm verse frames *ḍayq* as emotional tightness |
| `ghaflah` | Ghaflah | Q 7:205 | Confirm "do not be among the heedless" |
| `huzn` | Ḥuzn | *(no citation)* | Q 9:40 (*lā taḥzan*) and Q 20:40 are candidate groundings — pick best |
| `hayrah` | Ḥayrah | *(no citation)* | Classical term; check if Quran uses *ḥayrah* (likely not directly) — source from kalām / tazkiyah literature |

## NotebookLM Query Plan

Each query uses the Muslim Scholar notebook. Batch into 3 rounds to
keep context clean.

### Round 1 — Verify cited ayahs

For each feeling with a claimed Quranic reference, ask:
> "In [ayah reference], does the word/concept [Arabic term] appear, and
> what is its contextual meaning according to the tafsirs in this
> notebook? Is it used as a state of the heart (ḥāl al-qalb)?"

**Pass criterion:** at least one tafsir in the notebook confirms the
term is used in that ayah with the claimed emotional/spiritual meaning.

### Round 2 — Find sources for uncited terms

For `shawq`, `qabd`, `huzn`, `hayrah`:
> "Within the Muslim Scholar corpus, identify the strongest primary
> source (Quran, Sahih hadith, or major classical work by Ibn al-Qayyim,
> al-Ghazali, or equivalent) that establishes [term] as a recognized
> state of the heart in Islamic spiritual psychology."

**Pass criterion:** at least one source returned with citation.

### Round 3 — Check for any mislabeled valence

> "Is [term] generally classified as a praiseworthy or blameworthy
> state of the heart in classical tazkiyah literature? Cite the
> reasoning."

**Pass criterion:** the `valence` field in `niyyah-feelings.js` matches
the classical classification.

## Amanah Gate
- [ ] Halal purpose confirmed — verifying citations, no doctrinal claims
- [ ] No riba/gharar concerns — n/a
- [ ] Itqan standard met — each term traced to a verifiable source
- [ ] Existing tests still pass — no code changed

## Deliverables (after running queries)

1. Add `grounding` + optional `groundingKind` (`quran` | `hadith` |
   `classical`) fields to each entry in `niyyah-feelings.js` that
   currently lacks a citation.
2. Flag any entry where the notebook could not substantiate the term
   — candidates for removal or rewording.
3. Append any correction to `tasks/lessons.md` per project CLAUDE.md.

## Open Questions
1. Approve running the three rounds via `/notebooklm use 1c17b03b-...`
   in a follow-up session? Or handle manually?
2. If a term lacks a strong classical source (likely `hayrah`), prefer
   **rewording the English label** or **removing the entry**?
3. Should Arabic display on the picker strictly use ḥarakāt (tashkīl)
   for clarity, or follow the unvocalised convention elsewhere in the
   codebase?

## Reviewer Notes

_Pending._

## Decision
- [ ] **Approved** — run the three rounds against Muslim Scholar notebook
- [ ] **Rejected** — rework (see notes)
