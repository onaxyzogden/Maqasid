---
title: "MILOS Faith SALAH — three Cat-3 mismatched-hadith subtasks corrected via Muslim Scholar corpus"
type: decision
date: 2026-05-15
status: accepted
tags: [milos, grounding, faith, salah, amanah, notebooklm, hadith]
superseded_by: null
---

# MILOS Faith SALAH — three Cat-3 mismatched-hadith subtasks corrected

## Context

The 2026-04-25 parser-first Faith migration ([[2026-04-25-milos-faith-grounding-complete]]) was verbatim-faithful to the legacy markdown but could not detect *semantic* mismatch: where the legacy `### ` header block cited a hadith whose body was topic-irrelevant to the subtask, the parser copied it through with a boilerplate `rationale: "Prophetic narration cited as evidence for this subtask."` A quality audit surfaced three Category-3 SALAH subtasks where the cited hadith were **both duplicated and topic-mismatched** — actively counter-productive as evidence:

1. **`faith.faith_salah_growth[2].subtasks[1]`** — "Pray at least 2 rak'at of Tahajjud" — carried Bukhari 1109/1091/1092: Ibn ʿUmar combining Maghrib+ʿIsha *during travel*; 1091≡1092 byte-identical. Nothing about night prayer's virtue.
2. **`faith.faith_salah_growth[3].subtasks[0]`** — "Read Ibn al-Qayyim's description of khushuʿ in prayer" — carried Bukhari 958/959 (byte-identical, ʿId-prayer / no-adhan) plus Bukhari 621 (Bilal's night adhan). Nothing about presence of heart.
3. **`faith.faith_salah_excellence[0].subtasks[1]`** — "Pray Duha at least 3 times this week" — carried Bukhari 1775/1776 (byte-identical) in which Ibn ʿUmar calls the Duha prayer a *bidʿah* with a ʿUmra-count tangent. Evidence that *contradicts* the subtask.

## Decision

### Amanah Gate honored — corpus-only retrieval

Per the covenant protocol, no hadith ref, translation, or grade was asserted from model memory. All replacement evidence was retrieved from the **authorized NotebookLM Muslim Scholar corpus** (`be921648`, "Muslim Scholar (backup)"; Quran/hadith are *not* covered by the Quran MCP). The corpus self-policed: where a candidate attribution fell outside its sources it was excluded rather than guessed. Refs preserve the corpus's USC-MSA Volume/Book/Hadith citation form verbatim (Amanah-faithful — deliberately *not* re-numbered to modern continuous numbering from memory).

### Replacement evidence

| Subtask | Removed (migration artifact) | Added (corpus-grounded) |
|---|---|---|
| Tahajjud | Bukhari 1109 / 1091 / 1092 (travel jam', dup) | **Sahih Muslim, Book 6, Hadith 2611** — night prayer is the most excellent voluntary prayer after the prescribed (Sahih, direct); **Sahih al-Bukhari, Volume 2, Book 21, Hadith 246** — Lord's descent in the last third of the night (Sahih, direct) |
| Khushuʿ | Bukhari 958 / 959 (ʿId, dup) / 621 (night adhan) | **Sahih al-Bukhari, Vol 1, Bk 12, H 718** — looking around = Satan stealing from the prayer (Sahih, direct); **Sahih Muslim, Book 2, Hadith 451** — two rak'ahs "with the heart as well as the face" (Sahih, direct); **Sahih al-Bukhari, Vol 1, Bk 2, H 47** — hadith of Jibril, ihsan = worship as if you see Him (Sahih, **contextual**) |
| Duha | Bukhari 1775 / 1776 (Duha-as-bidʿah, dup) | **Sahih al-Bukhari, Vol 3, Bk 31, H 202** — Prophet's standing advice to Abu Hurayrah: two rak'at Duha (Sahih, direct); **Sahih Muslim, Book 4, Hadith 1557** — Duha suffices for the charity due on every joint each morning (Sahih, direct) |

Quran entries in all three subtasks (48:29, 30:18, 17:78, 93:1-2) were left untouched — in scope was only the mismatched hadith.

### Tier / amanahRationale corrected

- **Tahajjud** — tier kept **T2** (act directly proven by sahih text; the "at least 2 rak'at" floor is the practical inference). amanahRationale rewritten from the fallback placeholder to cite the actual grounding.
- **Khushuʿ** — tier kept **T2** (khushuʿ directly grounded; Ibn al-Qayyim's five-level taxonomy is scholarly synthesis the texts do not enumerate, so the *reading exercise* is the inference).
- **Duha** — tier upgraded **T3 → T2**. The old T3 amanahRationale literally recorded the mismatch ("a companion referring to the Duha prayer as a heresy"); with correct sahih grounding the act is directly proven and the weekly cadence is the practical inference.

Each replacement entry carries a specific, non-boilerplate `rationale` ending "Retrieved from the authorized Muslim Scholar corpus."

## Consequences

**Positive:**
- Three SALAH subtasks now carry topic-correct, deduplicated, sahih-graded evidence; Bayyinah provenanceTier is now textually earned, not inherited from a mismatched copy-through.
- Demonstrates the audit→corpus-retrieval→tier-correction loop (the "WS2 pattern") works against the residual semantic-mismatch class the verbatim migration could not catch.

**Trade-offs / deviations from the original brief:**
- **`scripts/audit-grounding-quality.mjs` does not exist** in the tree. Substituted the real gates: `npm test` (vitest schema/grounding), `node scripts/lint-grounding.mjs`, `node scripts/audit-inline-refs.mjs --strict`.
- **No backlog generator exists**, so "subtasks must drop from the regenerated backlog" could not be mechanically shown. The three defects were instead verified independently in source; the fix stands on its own merit.
- **Referenced ADR `2026-05-15-milos-faith-grounding-audit-and-istiftah-fix.md` does not exist.** This new ADR was created following the established grounding-ADR structure ([[2026-04-25-milos-faith-grounding-complete]]) rather than editing a nonexistent file.
- `python -m notebooklm` was used (the `notebooklm` CLI is not on PATH). One Duha query hit a non-fatal cp1252 `UnicodeEncodeError` on the `ﷺ` (ﷺ) glyph in the error-render path *after* the answer body had printed in full; retrieved data was used.

**Files touched:**
- [src/data/seed-tasks/faith-seed-tasks.js](src/data/seed-tasks/faith-seed-tasks.js) — 3 subtasks (26 insertions, 35 deletions): 7 mismatched hadith entries replaced with 7 corpus-grounded ones; 3 amanahRationale rewrites; Duha tier T3→T2
- [wiki/decisions/2026-05-15-milos-faith-salah-cat3-hadith-fix.md](wiki/decisions/2026-05-15-milos-faith-salah-cat3-hadith-fix.md) (created)

**Verification:**
- `npm test` → 56/56 green
- `node scripts/lint-grounding.mjs` → all pillars structured, 0 schema errors, 0 legacy strings
- `node scripts/audit-inline-refs.mjs --strict` → `[STRICT] OK: 0 ≤ ratchet 0`
- `npx eslint src/data/seed-tasks/faith-seed-tasks.js` → exit 0 (the 2 `no-useless-escape` errors introduced mid-edit by `rak\'at` inside double-quoted strings were fixed → `rak'at`)
- `npm run lint` full chain still reports **3 pre-existing, unrelated** errors (Sidebar.jsx 20:14 react-refresh; Dashboard.jsx 1:37 + 274:9 unused) — proven pre-existing via `git stash` (same 3 errors with this task's changes stashed). Out of scope; not introduced here.

## Carries forward

- The semantic-mismatch class is wider than these three. A systematic pass over the remaining `rationale: "Prophetic narration cited as evidence for this subtask."` boilerplate entries (all pillars) would surface other copy-through mismatches — treat as a scoped scholar-polish backlog stream, corpus-retrieval per entry.
- The 3 pre-existing Sidebar/Dashboard ESLint errors should be filed/fixed independently of grounding work.
