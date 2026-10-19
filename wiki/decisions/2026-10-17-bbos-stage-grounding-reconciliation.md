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
| 01 IDY | Al-Awwal · Ash-Shahīd | Ṭā-Hā 20:25–26 | Closing: Ṣaḥīḥ Muslim 770 (amended 2026-10-18; "arinā l-ḥaqqa ḥaqqan…" was first kept, labelled non-prophetic) | Merge |
| 02 CRD | Al-Ḥaqq · Al-Khabīr | Al-Anfāl 8:29 (furqān) | Avoids repeating 20:25 from IDY | Merge |
| 03 STR | Al-Baṣīr · Al-Muṣawwir | Ṭā-Hā 20:114 "Rabbi zidnī 'ilmā" alone | Appended phrase dropped or marked non-Qur'anic; Al-Mudabbir dropped (verb-derived, not a listed Name) | Merge |
| 04 OFR | Al-'Adl · Al-Muqsiṭ | Ar-Raḥmān 55:9 | Closing: the authentic al-Nasāʾī du'a (ʿAmmār ibn Yāsir, "kalimata l-ḥaqqi fī r-riḍā wa l-ghaḍab"), restored to its exact wording | Merge |
| 05 OUT | Ar-Razzāq · As-Sittīr | Āl ʿImrān 3:173 + Al-Anfāl 8:40 | Cite Abu Dawud for As-Sittīr | Docs |
| 06 SLS | As-Samīʿ · Al-Laṭīf | "Allāhumma lā sahla…" (Ibn Ḥibbān, needs hadith number) | Closing: Al-Aḥzāb 33:70–71 | Merge |
| 07 DEL | Al-Muḥsin · Al-Walī | Al-Baqarah 2:127 "Rabbanā taqabbal minnā…" | Anchor: Muslim 1955 (iḥsān in all things); the unsourced "adapted" du'a is dropped | Merge |
| 08 RET | Ash-Shakūr · Al-Wadūd | An-Naml 27:19 (cited as 27:19 only) | Closing: Al-Anfāl 8:63, replacing the disputed al-Ḥākim du'a | Docs + fix |
| 09 OPT | Al-Ḥasīb · As-Subbūḥ · Al-Quddūs | Al-Ḥashr 59:18 "wal-tanẓur nafsun mā qaddamat li-ghad" (amended 2026-10-18; was Aḥmad 24215 "Allāhumma ḥāsibnī…") | Muslim 487 for the two Names; closing: Al-Anʿām 6:104, replacing the unsourced one | Docs + fix |

No Name repeats across the nine stages, and no opening text is used twice.

## Rules applied

- Revelation is never vetoed: every authentic text that is dropped is moved elsewhere or left in the docs, never blacklisted. Only unsourced or misattributed text is removed or relabelled.
- Each new reference goes into `sources[]` with a provenance tier. Hadith numbers are verified when the change is made, not taken from memory.

## Consequences

- **App:** implemented on 2026-10-18 (branch `feat/bbos-stage-grounding`). `bbos-stage-islamic.js` is re-grounded to this table. Every Qur'an or hadith du'a carries `sources[]` with a provenance tier, and the hadith numbers were checked when the change was made: Abu Dawud 4012, Muslim 487, Muslim 1955, al-Nasāʾī 1305, Ibn Ḥibbān 974 and Aḥmad 24215. The last two were first checked through secondary takhrij, then against the printed editions (see the amendment below). The registry gained As-Sittīr and As-Subbūḥ. The secondary IDY du'a became a non-prophetic `closingDua`.
- **Docs:** the operator owns the docs. They need a version bump to match, and the internal fixes from the review: the stale 00–08 arc table in IDY, the "STRUCTURE (STR)UCTURE" and "RETAIN (RET)AIN" headings, mismatched subheader versions, and the third-party quote block in STR (paraphrase anonymously, or remove). **Done 2026-10-18 as drafts:** nine drafts sit beside the originals: `BBOS_0N_<STAGE>_Annotated_v2_0.docx`, except DEL, which was already at v3.5 and is drafted as `BBOS_07_DELIVER_Annotated_v3_6.docx` (renamed from v2.0 the same day), which are untouched. All four internal fixes are in; the STR quotes are anonymised and the three lines from named authors paraphrased. SLS and DEL are rewritten to the app's Names. Al-Musawwir is added to STR. Every rewritten passage is highlighted yellow, and each version row reads "Pending review" until the operator approves. **Accepted 2026-10-19** (see the amendment below). Old stage codes are replaced: QAL → CRD (including the Assemble Contract command, now `VIABILITY CRD-CHECK`), and SAL/FUL → SLS/DEL in the OPT metric table. History rows read "CRD (was QAL)" and "DEL (was FUL)" so the record stays true.
- **Gates:** the gates the docs name (Amanah, Viability, Baseline, Pre-Ship, Constraint) are not modelled in the app. That is out of scope here.

## Amendment (2026-10-18): printed-edition checks

- **Ibn Ḥibbān 974 (SLS) — confirmed.** 974 is the al-Iḥsān number (ed. al-Arnaʾūṭ, al-Risālah). Al-Albānī's *al-Taʿlīqāt al-Ḥisān* gives it as 970 "= 974" and grades it ṣaḥīḥ (*al-Ṣaḥīḥah* 2643); the Dār Ibn Ḥazm *al-Taqāsīm wa-l-Anwāʿ* gives 6737 "= 974". The app's Arabic had followed Ibn al-Sunnī's word order ("idhā shiʾta sahlā"). It now follows Ibn Ḥibbān's: "wa anta tajʿalu l-ḥazna sahlan idhā shiʾt".
- **Musnad Aḥmad 24215 (OPT) — replaced.** The number and text are confirmed in al-Risālah (vol. 40, p. 260). But the editors grade the hadith ṣaḥīḥ *except* the phrase "Allāhumma ḥāsibnī ḥisāban yasīrā", which they treat as Muḥammad ibn Isḥāq's solitary addition, and they cite al-Dhahabī on the nakārah in what he narrates alone. Al-Ḥākim (1/57, 255) graded it ṣaḥīḥ on Muslim's condition, and al-Dhahabī agreed in the *Talkhīṣ*. Since the opening du'a is exactly the disputed phrase, the operator chose Al-Ḥashr 59:18, the self-audit ayah, as OPT's opening. The du'a is not vetoed: it stays authentic per al-Ḥākim and may be used elsewhere with its grading noted.

## Amendment (2026-10-18): only Qur'anic or prophetic du'as

- **IDY closing — replaced.** The operator asked that no stage carry a du'a that is neither Qur'anic nor prophetic. IDY's closing is now **Ṣaḥīḥ Muslim 770**, narrated by ʿĀʾishah (via Abū Salamah): the Prophet's ﷺ opening du'a for the night prayer, "Allāhumma rabba Jabrāʾīla… ihdinī limā ukhtulifa fīhi mina l-ḥaqqi bi-idhnik…". It is checked against the ʿAbd al-Bāqī edition (Kitāb Ṣalāt al-Musāfirīn, bāb al-duʿāʾ fī ṣalāt al-layl, vol. 1 p. 534), and it is also in Abū Dāwūd 767, al-Tirmidhī 3420, al-Nasāʾī 1625 and Ibn Mājah 1357. It fits the stage: it calls on Allah as *ʿālim al-ghayb wa-l-shahādah*, Ash-Shahīd's domain, and asks for guidance to the truth, which is what the old du'a asked for. "Arinā l-ḥaqqa ḥaqqan" is dropped because it is unsourced as prophetic, not vetoed. The stage test now fails on any non-prophetic du'a.
- **Stage numbering is 1-based.** Patch sub-stages are renamed to match the stage they follow: `00A` → `01A` (after IDY, Stage 01) and `01B` → `03B` (after STR, Stage 03). In the v2.0 Factory docs, the stage-prefixed prompt ids are DEL `07.S0`/`07.A0` (were `06.*`) and OPT `09.R1`–`09.R7`/`09.A1`–`09.A2` (were `08.*`). History rows keep the old id with "(now …)". CRD's `PROMPT 00.5/01/02` and OPT's protocol "Stage 1/2/3" count steps within a stage, not stages, so they are unchanged.

## Amendment (2026-10-19): Factory docs accepted

- **Review.** The nine drafts were checked against `bbos-stage-islamic.js`: every governing Name, every opening and closing du'a (Arabic compared without diacritics) and every source reference is present. No old stage code remains outside history rows. Three defects were found and fixed before acceptance:
  - the DEL v3.6 row still said "Version renumbered to v2.0"; it now says "Version continues from v3.5 to v3.6";
  - every row said "Rewritten passages are highlighted for review"; it now says "Reviewed and approved 2026-10-19";
  - the docs close CRD with Āl ʿImrān 3:8 and OUT with Jāmiʿ al-Tirmidhī 3563 (ed. Shākir 5/560; al-Albānī ḥasan), but the app had no `closingDua` for either and fell back to the ongoing du'a. The operator chose to add both to the app rather than drop them from the docs: PR #68, with `sources[]` (3:8 checked against the Uthmani text).
- **Accepted.** Every review highlight is cleared (IDY 29, CRD 11, STR 44, OFR 10, OUT 2, SLS 46, DEL 33, RET 11, OPT 27; the originals had none), and each newest version row is approved by Yousef Abdelsalam. The nine docs are the current Factory set: `BBOS_0N_<STAGE>_Annotated_v2_0.docx`, with DEL at `_v3_6`.
- **Archived.** The nine older originals (IDENTITY v1.2, CREDIBILITY v1.4, STRUCTURE v1.3, OFFERING v1.3, REACH v1.3, CONVERT v1.3, DELIVER v3.5, RETAIN v1.2, RECKON v1.4) moved unchanged to `BBOS Factory Docs/_archive/`. Nothing was deleted.
- **Register.** The BBOS Stage Grounding Register (artifact, version 4) now reads each stage's du'a text from the accepted docs and checks it against the app: zero mismatches once PR #68 is in. STR and DEL have no closing du'a in either.

Related: [[bbos-pipeline]].
