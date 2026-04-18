---
title: "Quran + Hadith citation cards in subtask Sources view"
type: decision
date: 2026-04-17
status: accepted
tags: [islamic, sources, quran, hadith, ui, offline]
---

# Quran + Hadith citation cards in subtask Sources view

## Context

Subtasks in the Faith/Life/etc. seed data cite Quranic ayat and hadith, originally rendered as plain markdown (`### Quran 2:255` followed by inline `**Arabic:** …` / `**Translation:** …`). This was visually flat, inconsistent between Quran and Hadith, and had no canonical reference to authoritative text. Users asked for inline rich renderings of both — Quran embedded from quran.com, hadith rendered in a matching card style.

## Decision

Render Quran and Hadith references as first-class UI cards, substituted by a markdown h3 renderer in `TaskDetailPanel`:

- **Quran** — `<QuranEmbed verseKey="S:V" />` renders an iframe against `quran.com/embed/v1` (translations=20 Saheeh, reciter=13, wbw + transliteration, tafsir/reflections/lessons/answers disabled). A 5-second load timeout and `navigator.onLine` listener fall back to the offline `QuranVerseCard` (local Quran bundle) so citations render without network.
- **Hadith** — `<HadithCard hadithKey="<collection>:<num>" />` renders from a bundled offline dataset of 509 hadith (`src/data/hadith.js`) fetched from the fawazahmed0/hadith-api via jsdelivr. Cards show Amiri Arabic, italic English translation, collection/number, and grade chip.
- Both share visual language: centered Arabic (Amiri), italic English, reference header with optional grade.
- Markdown preprocessing strips inline `**Arabic:** … \n **Translation:** …` narration so it is not duplicated below the embed/card.

Seed-task copy standardized in parallel: "Why does this matter?" → "Why?", "How do I accomplish this?" → "How?", "Sources from the Quran/Hadith" → "Quran/Hadith", HR divider between sections removed.

## Rationale

- Offline-first: hadith bundled at build time (~509 records, Bukhari/Muslim/Abi Dawud/Ibn Majah/Nasa'i/Tirmidhi) so Sources renders cleanly without network — aligned with the app's offline-capable ethos.
- Authoritative text: quran.com iframe inherits canonical rendering, reciter choice, and word-by-word — better UX than hand-curated translation in seed data.
- Graceful degradation: iframe timeout + online/offline listeners fall back to local card, so the iframe isn't a hard dependency.
- Consistency: Hadith and Quran look alike, both embedded inline instead of prose narration.

## Consequences

### Positive
- Richer, more authoritative source rendering in every subtask.
- Offline citations work from cold start.
- Seed data simpler — no need to hand-embed Arabic/translation inline.

### Negative / Known gaps
- **Muslim numbering mismatch** — fawazahmed0 has a 92-hadith intro gap that desyncs with sunnah.com canonical numbering. 9 early-Muslim refs (muslim:5, 8, 26, 33, 35, 46, 49, 54, 60) return empty records; `HadithCard` renders a graceful "View on sunnah.com" link for these.
- **Musnad Ahmad unavailable** — no fawazahmed0 edition; refs rendered as Text unavailable.
- Depends on quran.com iframe availability when online (fallback mitigates).
- JS regex does not support `\Z`; inline-narration strip uses a sentinel-append workaround (`\n\n### __END__ 0` + lookahead + trailing strip).

## Related

- [[milos]]
- `src/components/islamic/QuranEmbed.jsx`, `src/components/islamic/HadithCard.jsx`
- `scripts/fetch-hadith.py`, `scripts/fetch-quran-wbw.py`
- Commit `1ae2793`
