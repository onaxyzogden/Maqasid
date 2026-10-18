---
title: "BBOS stage attributes and du'as reconciled between the Factory docs and the app"
type: decision
date: 2026-10-17
status: implemented
project: milos
tags: [bbos, grounding, attributes, dua, sources]
---

# BBOS stage attributes and du'as reconciled between the Factory docs and the app

## Context

The operator shared the nine *BBOS Factory* annotated docs (`BBOS_0N_<STAGE>_Annotated_vX_Y.docx`, last version entries 2026-03-19). Their governing attributes and opening du'as differed from `src/data/bbos/bbos-stage-islamic.js` at almost every stage. Only Al-Awwal, Al-Muḥsin, Al-Wadūd and Al-Ḥasīb were shared. No earlier decision said which side was canonical. Several doc citations also fail the MILOS grounding rules ([[2026-04-18-milos-grounding-two-axis]]):
- an IDY du'a credited to the Prophet ﷺ without basis
- "classical supplication" and "adapted from…" sources
- Ta-Ha 20:114 quoted with a non-Qur'anic phrase appended
- a disputed al-Ḥākim du'a

The operator settled it stage by stage, one stage at a time. Each pick is listed below.

## Decision

| Stage | Governing attributes | Opening | Other text | Pick |
|---|---|---|---|---|
| 01 IDY | Al-Awwal · Ash-Shahīd | Ṭā-Hā 20:25–26 | "Allāhumma arinā l-ḥaqqa ḥaqqan…" kept as a secondary du'a, labelled non-prophetic | Merge |
| 02 CRD | Al-Ḥaqq · Al-Khabīr | Al-Anfāl 8:29 (furqān) | Avoids repeating 20:25 from IDY | Merge |
| 03 STR | Al-Baṣīr · Al-Muṣawwir | Ṭā-Hā 20:114 "Rabbi zidnī 'ilmā" alone | Appended phrase dropped or marked non-Qur'anic; Al-Mudabbir dropped (verb-derived, not a listed Name) | Merge |
| 04 OFR | Al-'Adl · Al-Muqsiṭ | Ar-Raḥmān 55:9 | Closing: the authentic al-Nasāʾī du'a (ʿAmmār ibn Yāsir, "kalimata l-ḥaqqi fī r-riḍā wa l-ghaḍab"), restored to its exact wording | Merge |
| 05 OUT | Ar-Razzāq · As-Sittīr | Āl ʿImrān 3:173 + Al-Anfāl 8:40 | Cite Abu Dawud for As-Sittīr | Docs |
| 06 SLS | As-Samīʿ · Al-Laṭīf | "Allāhumma lā sahla…" (Ibn Ḥibbān, needs hadith number) | Closing: Al-Aḥzāb 33:70–71 | Merge |
| 07 DEL | Al-Muḥsin · Al-Walī | Al-Baqarah 2:127 "Rabbanā taqabbal minnā…" | Anchor: Muslim 1955 (iḥsān in all things); the unsourced "adapted" du'a is dropped | Merge |
| 08 RET | Ash-Shakūr · Al-Wadūd | An-Naml 27:19 (cited as 27:19 only) | Closing: Al-Anfāl 8:63, replacing the disputed al-Ḥākim du'a | Docs + fix |
| 09 OPT | Al-Ḥasīb · As-Subbūḥ · Al-Quddūs | "Allāhumma ḥāsibnī ḥisāban yasīrā" (Musnad Aḥmad, ʿĀʾishah, needs number) | Muslim 487 for the two Names; closing: Al-Anʿām 6:104, replacing the unsourced one | Docs + fix |

No Name repeats across the nine stages, and no opening text is used twice.

## Rules applied

- Revelation is never vetoed: every authentic text that is dropped is moved elsewhere or left in the docs, never blacklisted. Only unsourced or misattributed text is removed or relabelled.
- Each new reference goes into `sources[]` with a provenance tier. Hadith numbers are verified when the change is made, not taken from memory.

## Consequences

- **App:** implemented on 2026-10-18 (branch `feat/bbos-stage-grounding`). `bbos-stage-islamic.js` is re-grounded to this table. Every Qur'an or hadith du'a carries `sources[]` with a provenance tier, and the hadith numbers were checked when the change was made: Abu Dawud 4012, Muslim 487, Muslim 1955, al-Nasāʾī 1305, Ibn Ḥibbān 974 and Aḥmad 24215. The last two were checked through secondary takhrij, not the printed edition. The registry gained As-Sittīr and As-Subbūḥ. The secondary IDY du'a became a non-prophetic `closingDua`.
- **Docs:** the operator owns the docs. They need a version bump to match, and the internal fixes from the review: the stale 00–08 arc table in IDY, the "STRUCTURE (STR)UCTURE" and "RETAIN (RET)AIN" headings, mismatched subheader versions, and the third-party quote block in STR (paraphrase anonymously, or remove).
- **Gates:** the gates the docs name (Amanah, Viability, Baseline, Pre-Ship, Constraint) are not modelled in the app. That is out of scope here.

Related: [[bbos-pipeline]].
