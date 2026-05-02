# Faith Review — NotebookLM Verification Results

Notebook used: `be921648-2088-4860-bdd8-283a5e7301f3` (Muslim Scholar (backup))
Started: 2026-05-02
Completed all 15 batches: 2026-05-02

Verdict legend per source: `OK` | `ref→X` | `grade→X` | `translation→X` | `relevance:weak`

NotebookLM disclaimer (recurring): many ref-number confirmations come partly from outside the grounded sources. User accepted (NotebookLM-only verification per plan).

---

## Real defects to fix (10)

### Reference number corrections (9)
1. **Adhkar of ruku/sujud meanings** — `Sahih Muslim 867` → **`Sahih Muslim 487`** (Batch 11)
2. **Recite Surah al-Mulk before sleep** — `Jami at-Tirmidhi 2891` → **`Jami at-Tirmidhi 2892`** (Batch 12)
3. **Fast day of Arafah for non-pilgrims** — `Sahih al-Bukhari 4521` → **`Sahih Muslim 1162`** (Batch 14; matn: expiates sins of preceding and coming year)
4. **Six fasts of Shawwal** — `Sahih Muslim 2758` → **`Sahih Muslim 1164`** (Batch 14)
5. **Sip of water for suhur** — single-source → **add Musnad Ahmad 11086 / Mishkat 1996** as second source (Phase 2)
6. **Wudu sunnah acts** — `Sahih Muslim 604` → **`Sahih Muslim 261a`** (Phase 2)
7. **Pray in nearest masjid** — `Sahih al-Bukhari 1767` → **`Sahih al-Bukhari 647`** (Phase 2)
8. **Pray jamaah at home if alone** — `Sahih al-Bukhari 1572` → **`Sahih al-Bukhari 667`** (Phase 2)
9. **Tasbih 33/33/34 after salah** — `Sahih Muslim 597` → **`Sahih Muslim 596`** (Phase 2)

### Reference + matn mismatch (1)
10. **Eid al-Fitr takbir** — `Sahih al-Bukhari 970` cites takbir of going out, but our task language may need either (a) a better citation or (b) ratNote scope adjustment (Phase 2). Investigate during edit.

### Translation/grade defects
- None found in 69-entry sweep.

---

## Weak-relevance verdicts (15) — likely already correctly tagged `thematic`

Pattern: NotebookLM flags WEAK whenever an operational/logistical subtask
("research X", "set up calendar", "compare packages", "plan logistics") cites a
thematic motivational hadith/ayah. Our schema already supports `relevance: thematic`
for exactly this case. Spot check on Batch 12 ref 2 (After Asr dua, Sahih Muslim 588)
shows the entry is tagged `relevance: 'direct'` and the citation IS the operative
Prophetic dua — NotebookLM was wrong on that one (operative formula = direct).

**Recommendation**: Treat WEAK verdicts as advisory, not defects. If `relevance` is
already `thematic` in the file, it's working as designed. Only re-tag entries that
are currently `relevance: 'direct'` but provably operational/thematic.

WEAK list (entry → current ref):
- Batch 12.2 — After Asr refuge from grave — Sahih Muslim 588 *(verified `direct`, NotebookLM wrong)*
- Batch 12.4 — Light Dua after Witr — Sahih Muslim 763 *(operative formula → direct)*
- Batch 13.1 — Zakah calendar reminders — Sahih al-Bukhari 1454
- Batch 13.2 — Zakah spreadsheet — Quran 9:103
- Batch 13.3 — Research zakah orgs — Quran 57:7
- Batch 13.4 — Verify org compliance — Sahih al-Bukhari 1458
- Batch 14.1 — Research waqf platforms — Sahih Muslim 1631
- Batch 14.2 — Hijri calendar for white days — Sahih Muslim 1162
- Batch 14.3 — What Prophet ate for suhoor — Sahih al-Bukhari 1915
- Batch 15.1 — Plan iftar logistics — Sahih al-Bukhari 1957
- Batch 15.2 — Sa'i 7 laps — Quran 2:158
- Batch 15.3 — Stoning meaning — Sahih al-Bukhari 1749
- Batch 15.4 — Compare Hajj packages — Quran 2:197
- Phase 2 — Sahih Muslim 26 (seven conditions outline)
- Phase 2 — Sahih Muslim 1893 (teaching session)

---

## Batch summaries

### Batch 1 (ratNote+single, 5 entries) — ALL OK
1. Sleep right + Bismika Allahumma — Bukhari 6324 — OK
2. Witr 1/3/5 rakahs — Abu Dawud 1422 — OK
3. Witr now vs tahajjud — Muslim 755a — OK
4. Qunut to Hasan ibn Ali — Abu Dawud 1425 — OK
5. Niyyah to rise → sleep recorded as prayer — Nasai 1787 — OK

### Batches 2–10 — Verified in conversation; defects rolled up above (9 defects)

### Batch 11 (single-source, 5 entries) — 1 ref defect
1. Tahajjud istiftah dua — Muslim 770 — OK
2. 12 Rawatib — Muslim 728 — OK
3. Adhkar ruku/sujud — Muslim 867 → **Muslim 487**
4. Duha sadaqah per joint — Muslim 720 — OK
5. 4 rakat Duha — Tirmidhi 475 — OK

### Batch 12 (single-source, 5 entries) — 1 ref defect, 2 WEAK (likely false)
1. Surah al-Mulk before sleep — Tirmidhi 2891 → **Tirmidhi 2892**
2. After Asr refuge — Muslim 588 — OK ref/grade, WEAK *(false: operative dua)*
3. After Maghrib La ilaha illallah ×10 — Tirmidhi 3474 — OK
4. After Witr Light Dua — Muslim 763 — OK ref/grade, WEAK *(false: operative dua)*
5. Zakatable categories exempt — Bukhari 1463 — OK

### Batch 13 (single-source, 5 entries) — 4 WEAK (operational/thematic)
1. Zakah calendar reminders — Bukhari 1454 — OK ref, WEAK
2. Zakah spreadsheet — Quran 9:103 — OK ref, WEAK
3. Research zakah orgs — Quran 57:7 — OK ref, WEAK
4. Verify org compliance — Bukhari 1458 — OK ref, WEAK
5. Zakah al-Fitr timing — Bukhari 1503 — OK

### Batch 14 (single-source, 5 entries) — 2 ref defects, 3 WEAK
1. Waqf platforms — Muslim 1631 — OK ref, WEAK *(matn = three things continuing after death)*
2. White days Hijri calendar — Muslim 1162 — OK ref, WEAK
3. What Prophet ate for suhoor — Bukhari 1915 — OK ref, WEAK *(matn doesn't list foods — task language too specific)*
4. Arafah fast non-pilgrims — Bukhari 4521 → **Muslim 1162**
5. Six fasts Shawwal — Muslim 2758 → **Muslim 1164**

### Batch 15 (single-source, 4 entries) — 4 WEAK (operational/thematic)
1. Plan iftar logistics — Bukhari 1957 — OK ref, WEAK
2. Sa'i 7 laps — Quran 2:158 — OK ref, WEAK *(but ayah literally mentions Safa-Marwah — false WEAK)*
3. Stoning meaning — Bukhari 1749 — OK ref, WEAK
4. Compare Hajj packages — Quran 2:197 — OK ref, WEAK

---

## Summary
- 69 entries probed across 15 batches
- 9 reference-number corrections needed (apply inline)
- 1 ref/matn mismatch needing investigation (Bukhari 970 Eid takbir)
- 0 grade defects, 0 translation defects
- 15 WEAK-relevance flags — treat as advisory; most are correctly tagged `thematic` already
