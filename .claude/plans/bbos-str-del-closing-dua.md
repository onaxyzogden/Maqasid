# Session Execution Plan
**Date:** 2026-10-19
**Project:** MILOS / BBOS Factory docs
**Objective:** Give STR (Structure) and DEL (Deliver) a verified Qur'anic or prophetic closing du'a in the app and in their accepted Factory docs, then rebuild the register so all nine stages still match.
**Context Source:** Project Wiki

---

## Candidates (verified; you choose one per stage)

None of these appears anywhere in `bbos-stage-islamic.js` or `islamic-data.js`. The Qur'anic text was checked with Quran MCP (Uthmani Hafs; Abdel Haleem translation). The hadith was checked against the Sunan Abī Dāwūd text and its grades from the open hadith-api edition, because sunnah.com blocked automated reads.

### STR · Al-Baṣīr · Al-Muṣawwir (opening: Ṭā-Hā 20:114)
| | Text | Fit | Kind |
|---|---|---|---|
| **S1 (recommended)** | **Ghāfir 40:44** (excerpt): وَأُفَوِّضُ أَمْرِىٓ إِلَى ٱللَّهِ ۚ إِنَّ ٱللَّهَ بَصِيرٌۢ بِٱلْعِبَادِ, "I commit my case to God: God is well aware of His servants." | Names Al-Baṣīr directly, and handing the plan over after the work is done is exactly STR's readiness row B2 ("at peace that what I cannot see is seen by Him") | Qur'anic declaration of tafwīḍ (the words of the believer of Pharaoh's people), so titled "Closing Reflection", like SLS, RET and OPT |
| S2 | **Al-Kahf 18:10** (excerpt): رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا, "Our Lord, grant us Your mercy, and find us a good way out of our ordeal." | "Arrange for us right guidance in our affair" fits planning and design (Al-Muṣawwir), though it names neither Name | A du'a in form ("Closing Supplication"), from the youths of the Cave |

### DEL · Al-Muḥsin · Al-Walī (opening: Al-Baqarah 2:127; anchor: Muslim 1955)
| | Text | Fit | Kind |
|---|---|---|---|
| **D1 (recommended)** | **Sunan Abī Dāwūd 1522**, from Muʿādh ibn Jabal: اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ, "O Allah, help me to remember You, to thank You, and to worship You well." | *Ḥusn al-ʿibādah* is iḥsān in worship. That fits Al-Muḥsin and the doc's "Delivery as Worship · Iḥsān in Action" frame, and closes the stage with thanks for work done | Prophetic du'a. Graded ṣaḥīḥ by al-Albānī, Shuʿayb al-Arnaʾūṭ and Muḥyī al-Dīn ʿAbd al-Ḥamīd ("Closing Supplication") |
| D2 | **Yūsuf 12:101** (excerpt): أَنتَ وَلِىِّۦ فِى ٱلدُّنْيَا وَٱلْـَٔاخِرَةِ ۖ تَوَفَّنِى مُسْلِمًا وَأَلْحِقْنِى بِٱلصَّـٰلِحِينَ, "You are my protector in this world and in the Hereafter. Let me die in true devotion to You. Join me with the righteous." | Names Al-Walī directly | Prophetic du'a (Yūsuf ﷺ), quoted as an excerpt; the ayah's first half is about his kingship |

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~12,000 | Wiki, app data, candidate verification |
| Planning (this document) | ~4,000 | |
| Execution — Phase 1 App | ~10,000 | Two `closingDua` entries; test, lint, build |
| Execution — Phase 2 Docs | ~12,000 | Insert a closing block in two docs, re-version, archive |
| Execution — Phase 3 Register | ~8,000 | Re-extract, regenerate, republish |
| Execution — Phase 4 Close | ~6,000 | Wiki amendment, entity, log; PR; debrief |
| **Total Estimated** | **~52,000** | |

> Token estimates are approximate. Flag if any phase exceeds its estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] An accepted doc that gains content gets a new version: STR v2.0 → **v2.1**, DEL v3.6 → **v3.7**. Each has a version row approved by Yousef Abdelsalam on 2026-10-19, and the file is renamed to match. The v2.0 and v3.6 files move unchanged to `_archive/`, with nothing deleted. No review highlights are left in.
- [ ] The closing block is a copy of an existing doc's closing table (OFR's), so its layout, fonts and the "⧁ Closing Dua · title" header match. It sits where the other docs put their closing.
- [ ] App and wiki changes ship together in one PR on `fix/bbos-str-del-closing-dua`.
- [ ] Skills: `anthropic-skills:docx` for the doc edits (python-docx); Quran MCP is already used for the text; `artifact-design` is already applied to the register, which republishes to the same URL.
- Other options considered: (b) app only, leaving the docs without a closing, which would make the register flag both stages; (c) keep the fallback 9:129 du'a as the stated closing, which would not be stage-specific. I recommend the plan as written.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| A doc's closing location differs per stage | Med | Low | Check where OFR, RET and others place it and mirror; report if unclear |
| Docs are open in Word (file lock) | Low | Low | Script fails loudly; ask you to close them |
| Test asserts something about closings | Low | Low | Run `npm test` and fix to the schema, not around it |
| The register still can't be screenshotted | High | Low | Verify the generated file's content, as before, and say so |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — App
- [ ] 1.1 — Add `closingDua` to STR and DEL in `bbos-stage-islamic.js`, using the chosen texts. Each gets `sources[]` (kind, ref, Arabic, translation, relevance, provenanceTier, hadithGrade for a hadith, rationale)
- [ ] 1.2 — `npm test`, `npm run lint`, `npm run build`
**Gate:** all green

### Phase 2 — Docs (docx skill)
- [ ] 2.1 — Back up both docs to the scratchpad
- [ ] 2.2 — Insert the closing block (Arabic, transliteration, meaning, source) and add the new version row. Save as v2.1 and v3.7; move v2.0 and v3.6 to `_archive/`
- [ ] 2.3 — Re-open both, and confirm the block reads correctly, the row is set and there are no highlights
**Gate:** the folder holds nine current docs; `_archive/` holds eleven

### Phase 3 — Register
- [ ] 3.1 — Re-run `extract.py` against the regenerated app data. All nine stages must pass, with STR and DEL now reporting a matching closing
- [ ] 3.2 — Regenerate and republish to https://claude.ai/artifact/YZSgSkMXRkwtHrfFRXrbDh (STR v2.1, DEL v3.7)
**Gate:** 0 mismatches, published

### Phase 4 — Close
- [ ] 4.1 — Add a 2026-10-19 amendment to the reconciliation decision, a [[bbos-pipeline]] History row and a log entry at the top
- [ ] 4.2 — Commit the app, wiki and this plan; open the PR
- [ ] 4.3 — Session Debrief
**Gate:** PR open and debrief given

---

## Definition of Done
All nine stages close with a Qur'anic or prophetic du'a in the app and in the accepted Factory docs. The register shows zero doc-vs-app mismatches, with no "none in doc or app" rows. Tests, lint and build pass, and the wiki records the choice in a PR.

---

## Awaiting Approval
Choose **S1 or S2** and **D1 or D2**, then type **"approved"** to begin execution, or give feedback to revise the plan.
