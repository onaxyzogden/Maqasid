# MILOS Faith Pillar — Launch-Readiness Grounding Review

**Date:** 2026-05-02
**Status:** Accepted
**Project:** MILOS V2.1
**Pillar:** Faith (shahada / salah / siyam / zakah / hajj — 285 subtasks)

---

## Context

The grounding migration arc (2026-04-18 → 2026-04-26) brought all 8 pillars to two-axis schema compliance with three monotonic ratchets at zero. Faith was structurally clean — every subtask had `sources[]`, every Quran entry had `arabic`, every hadith had `hadithGrade`, and 99.5% of provenance signals were Bayyinah — but two pockets of residual risk remained before claiming the pillar launch-ready:

1. **43 `ratNote`-flagged salah entries** batch-verified against sunnah.com on 2026-04-26 but never independently cross-checked against NotebookLM Muslim Scholar (the canonical citation corpus per [[notebooklm-grounding-corpora]]).
2. **61 single-source subtasks** — schema-conformant but each resting on one citation. If that citation is mis-numbered, mis-graded, mis-translated, or weakly relevant, the subtask has no fallback evidence.

This session re-verified those targeted weak entries (~104 items pre-dedup, 69 post-dedup) against NotebookLM Muslim Scholar and applied inline fixes to every defect found.

## Tooling

- **NotebookLM Muslim Scholar** (backup notebook `be921648-2088-4860-bdd8-283a5e7301f3` — canonical `1c17b03b-...` was unreachable this session).
- PowerShell + `notebooklm ask --json | Out-File -Encoding utf8` to avoid cp1252 console crashes on Arabic text.
- Per-batch verification cadence: `npm test` + `npm run lint` after each batch of edits.

## Outcomes

### Reference defects fixed (9)
| Old ref | New ref | Subtask topic |
|---|---|---|
| Sahih Muslim 867 | Sahih Muslim 487 | Subbuhun Quddusun (ruku/sujud) |
| Sahih al-Bukhari 4521 | Sahih Muslim 1162 | Day of Arafah fast (non-pilgrim) |
| Sahih Muslim 2758 (×2) | Sahih Muslim 1164 | Six Fasts of Shawwal |
| Sahih Muslim 604 | Sahih Muslim 261a | Ten Acts of Fitrah |
| Sahih al-Bukhari 1767 | Sahih al-Bukhari 647 | 25× congregational reward |
| Sahih al-Bukhari 1572 | Sahih al-Bukhari 667 | Itban bin Malik (jamaah at home) |
| Sahih Muslim 597 | Sahih Muslim 597a | Abu Hurayra 33/33/33 + sea-foam matn |

### Source promotion (single → multi-source)
- Suhur "sip of water" entry: added Mishkat al-Masabih 1996 as second source alongside Bukhari 1923.

### Provenance downgrade (Bukhari 970 / ʻId takbir)
- The "raise the takbir from Maghrib of the eve" subtask cited *Sahih al-Bukhari 970* for an Ibn ʻUmar narration about audible takbir to the musalla.
- NotebookLM confirmed Bukhari **970** is unrelated — it concerns women attending the ʻId prayer.
- The Ibn ʻUmar audible-takbir report exists in Bukhari only as a **muʻallaq (suspended)** chapter heading preceding hadith 971, not as a numbered hadith.
- Fix applied: `ref` rewritten to `"Sahih al-Bukhari (mu'allaq, Kitab al-ʻIdayn, chapter heading preceding hadith 971)"`, `relevance` direct → contextual, `provenanceTier` Bayyinah → Qarina, `hadithGrade` Sahih → Hasan, with full `ratNote` explanation and updated `rationale`.

### WEAK relevance flags (15) — advisory
NotebookLM flagged 15 entries where the cited matn supports the practice contextually but does not name it operatively. Per the schema definitions in [[2026-04-18-milos-grounding-two-axis]] (`direct` = text names practice/operative ruling; `contextual` = same topic by inference), most of these were already correctly tagged `direct` because the matn names the practice; the WEAK flags reflect NotebookLM's stricter "operative ruling" reading. One entry (Bukhari 1915, foods of suhur) was retagged `direct` → `contextual` with a `ratNote` explaining the matn lists no specific foods. The remaining 14 are documented in `tasks/faith-review-results.md` as advisory, not schema-violating.

### Verification
- `npm test`: **56/56 passed**
- `npm run lint`: per-pillar legacy 0, empty-array 1, inline-refs 0 — all three ratchets at minimum.

## Decision

The Faith pillar is **launch-ready**. All previously-flagged ratNote entries and all single-source subtasks within the worklist scope have an independent NotebookLM verdict (verified, fixed, strengthened with a second source, or honestly downgraded with a ratNote).

## Pattern established for remaining 7 pillars

This protocol — extract ratNote + single-source entries, batch-probe NotebookLM Muslim Scholar one-ref-per-call (parallel background), apply inline fixes per defect class, retest after every ~10 edits, document WEAK as advisory — is the template for the next pillar reviews. Recommended next: **Ummah** (largest entry count at 525), then Wealth, Family, Intellect, Life, Environment, Prayer.

## Files Changed

- `src/data/seed-tasks/faith-seed-tasks.js` — 10 inline edits (8 ref corrections, 1 source addition, 1 entry retag with ratNote).

## References

- Worklist + verdicts: `tasks/faith-review-results.md`
- Per-ref matn fetches: `tasks/m487.json`, `tasks/m-1162.json`, `tasks/m-1164.json`, `tasks/m-261a.json`, `tasks/b-647.json`, `tasks/b-667.json`, `tasks/m-596.json`, `tasks/mishkat-1996.json`, `tasks/b970-check.json`, `tasks/eid-takbir-ref2.json`
- Schema: [[2026-04-18-milos-grounding-two-axis]]
- Inline-refs ratchet: [[2026-04-25-milos-inline-refs-hadith-backfill]]
- Prior Faith milestone: [[2026-04-25-milos-faith-grounding-complete]]
