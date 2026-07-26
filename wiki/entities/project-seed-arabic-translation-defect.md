---
title: "Seed `arabic:` Fields Holding English Translation Prose"
type: entity
created: 2026-07-26
updated: 2026-07-26
tags: [milos, data-integrity, grounding, quran, authoring-defect]
sources: 1
---

# Seed `arabic:` Fields Holding English Translation Prose

A pre-existing **authoring** defect (NOT mojibake — it predates and is independent of [[project-seed-mojibake]]): in the pillar seed-task files, some `kind: "quran"` entries in `sources[]` carry the **English translation** in the `arabic:` field, prefixed with the markdown literal `**Translation:** `. The sibling `translation:` field holds the identical English (minus the prefix), so the Arabic verse text is **entirely absent** from these entries. Flagged in passing during the 2026-07-26 mojibake repair ([[2026-07-26-milos-mojibake-repair-glyphs-loader-fix]]); fully quantified by the background audit session of 2026-07-26.

## Current Status

**Resolved 2026-07-26** on `feat/desktop-pillar-glyphs`. All 110 sites across the 6 files now carry authentic **simple-rasm (with harakat)** Arabic — the edition the seed corpus predominantly uses; the defect scan reports 0 remaining; the grounding test was hardened to require Arabic-block characters in quran `arabic:`; `npm test` (102/102) and `npm run lint` (grounding-strict + inline-refs + glyphs check) are green. See "How It Was Fixed" below.

## Audit Result (2026-07-26, working tree of `feat/desktop-pillar-glyphs` incl. the uncommitted mojibake repair)

Scanned: all 9 `src/data/seed-tasks/*.js` + all 13 `src/data/ayat/*.js` — 2,677 `arabic:` fields total.

**110 defective sites, 87 unique verses, 6 files — all `kind: "quran"`, all matching the same signature**: `arabic` starts with `**Translation:** ` and (after stripping that prefix) equals the sibling `translation` value. 100 sites contain no Arabic script at all; 10 sneak past a chars-only test because the English translation happens to embed the honorifics صلى الله عليه وسلم / رضي الله عنه (marked ★ below).

| File | Defective / total `arabic:` fields |
|---|---|
| environment-seed-tasks.js | 13 / 274 |
| family-seed-tasks.js | 22 / 183 |
| health-seed-tasks.js | 17 / 208 |
| intellect-seed-tasks.js | 27 / 253 |
| ummah-seed-tasks.js | 17 / 716 |
| wealth-seed-tasks.js | 14 / 245 |
| faith-seed-tasks.js, prayer-seed-tasks.js, weekly-seed-tasks.js | 0 |
| **all 13 `src/data/ayat/*.js`** (incl. `health-readiness-ayat.js` post-repair) | **0** |

Note: `work-readiness-ayat.js` stores its 34 Arabic strings as `\uXXXX` escape sequences — stylistically odd but **correct at runtime** (JS decodes them to Arabic); not part of this defect.

### Full site list (line numbers = uncommitted working tree, 2026-07-26)

**environment-seed-tasks.js (13):** 190 Quran 72:16 · 527 Quran 22:32 · 536 Quran 9:17 · 2531 Quran 3:104 · 4227 Quran 5:54 · 4236 Quran 22:41 · 4245 Quran 3:83 · 4512 Quran 59:21 · 4584 Quran 2:132 · 5113 Quran 5:4 ★ · 5122 Quran 23:51 · 6663 Quran 27:92 · 6672 Quran 6:153

**family-seed-tasks.js (22):** 459 Quran 47:20 · 819 Quran 3:146 · 828 Quran 33:53 · 1246 Quran 33:55 · 1255 Quran 33:50 · 2574 Quran 3:48 · 2583 Quran 21:106 ★ · 2592 Quran 15:6 · 3098 Quran 40:55 ★ · 3107 Quran 30:17 · 3236 Quran 5:95 · 3995 Quran 7:153 · 4004 Quran 39:21 · 4911 Quran 2:196 ★ · 5781 Quran 8:72 · 5790 Quran 9:100 · 6320 Quran 2:144 · 6329 Quran 2:145 · 7087 Quran 80:33 · 7302 Quran 2:138 · 7542 Quran 73:4 · 7551 Quran 38:1

**health-seed-tasks.js (17):** 388 Quran 40:55 ★ · 397 Quran 76:25 · 406 Quran 33:42 · 437 Quran 7:204 · 446 Quran 17:78 · 455 Quran 37:3 · 2002 Quran 3:72 · 2264 Quran 24:34 · 2294 Quran 24:1 · 2303 Quran 9:44 · 2312 Quran 24:34 · 5136 Quran 4:176 · 5145 Quran 4:127 · 5185 Quran 8:72 · 5539 Quran 4:86 · 7026 Quran 6:125 · 7035 Quran 42:13 ★

**intellect-seed-tasks.js (27):** 685 Quran 24:1 · 694 Quran 6:105 · 1902 Quran 41:41 · 1911 Quran 3:85 · 2761 Quran 80:12 · 3228 Quran 51:10 · 3550 Quran 12:95 · 4475 Quran 3:17 · 4484 Quran 39:22 · 5190 Quran 22:8 · 5199 Quran 39:22 · 5208 Quran 98:7 ★ · 5584 Quran 51:8 · 5865 Quran 17:35 · 6168 Quran 76:25 · 6177 Quran 30:17 · 6186 Quran 33:42 · 6417 Quran 6:105 · 6426 Quran 2:190 · 6934 Quran 27:92 · 7159 Quran 16:80 · 7672 Quran 3:104 · 7762 Quran 26:197 ★ · 7771 Quran 3:85 · 8325 Quran 20:32 · 8395 Quran 79:36 · 9874 Quran 7:159

**ummah-seed-tasks.js (17):** 3214 Quran 33:60 · 3223 Quran 73:20 · 3702 Quran 4:36 · 3711 Quran 49:13 · 4353 Quran 3:104 · 5477 Quran 62:9 · 5931 Quran 30:18 · 5940 Quran 40:55 ★ · 5949 Quran 2:238 · 6567 Quran 17:78 · 7205 Quran 29:46 · 9246 Quran 8:73 · 10562 Quran 52:42 · 10571 Quran 10:12 · 19417 Quran 3:104 · 19426 Quran 46:29 · 19702 Quran 17:78

**wealth-seed-tasks.js (14):** 64 Quran 48:23 · 422 Quran 2:275 · 2867 Quran 2:275 · 2876 Quran 3:104 · 4839 Quran 3:79 · 4848 Quran 5:44 · 5842 Quran 6:136 · 5851 Quran 4:11 · 5938 Quran 4:176 · 6347 Quran 2:235 · 7915 Quran 2:282 · 8267 Quran 26:197 ★ · 8632 Quran 4:11 · 8641 Quran 4:176

87 unique verses (repeat offenders: Quran 3:104 ×5, Quran 40:55 / 17:78 / 4:176 ×3 each; 2:275, 3:85, 4:11, 6:105, 24:1, 24:34, 26:197, 27:92, 30:17, 33:42, 39:22, 76:25, 8:72 ×2 each).

## Root-Cause Shape

The uniform signature (markdown `**Translation:** ` prefix + exact duplication into `translation:`) points at one ingest/authoring pass that, for these verses, had no Arabic available and pasted its formatted translation block into both fields. It is concentrated per-verse, not per-file (the same verse is wrong everywhere it appears, e.g. 3:104 at 5 sites in 4 files), which suggests the upstream per-verse lookup was the gap.

## Impact

- **Primary sources UI (`src/components/work/SubtaskSources.jsx`) does NOT display the bogus text for these entries**: `parseQuranRef(entry.ref)` succeeds for every affected ref ("Quran S:V" form), so `QuranEmbed` renders the verse by key and `entry.arabic` is only shown in the no-key fallback. The defect is latent data corruption, not (currently) a rendering bug — but any future consumer of `source.arabic` inherits it.
- Grounding gates don't catch it: the schema test only requires `arabic` to be a non-empty string for quran entries ([src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) ~line 80). It cannot be nulled/emptied as an interim fix without breaking `npm test`.

## How It Was Fixed (2026-07-26, operator-approved)

No Quran MCP existed in the session, so the covenant constraint ("never invent or approximate verse text") was satisfied by **dual-source retrieval with mechanical cross-verification**: every verse fetched from two independent authoritative sources and written **only** when both agreed on the consonantal letter skeleton (harakat/annotation signs/tatweel/BOM/standalone-hamza stripped, alef variants normalized). The written text is a verbatim source string — zero characters authored by the model. All **87 verses verified 87/87**; nothing was flagged for manual entry.

### Edition review (why the first pass was redone)

The first pass wrote **Uthmani rasm** (quran.com `text_uthmani`, cross-checked against alquran.cloud `quran-uthmani`), on the assumption — recorded in the original audit — that Uthmani matched the corpus's clean entries. **The covenant review of the uncommitted change disproved that.** A census of the pre-existing (untouched) quran `arabic:` fields showed the seed corpus is overwhelmingly **simple rasm with harakat** (e.g. `ٱلرِّبَوٰا۟` Uthmani vs `الرِّبَا` simple); only ~26 fields across the 6 files carry the Uthmani wasla `ٱ` (U+0671). The [[milos]] ayat files even document "ar-simple-clean" as their source. Writing Uthmani would have put the same verse (e.g. 3:104) in two different scripts. The operator chose **simple rasm** to match the corpus convention.

### Final backfill (simple rasm)

- Files restored to their pre-backfill state (session scratchpad `backup\`), then re-patched from a clean single pass.
- **Primary (text written):** alquran.cloud `quran-simple` — verified character-for-character against the pre-existing simple entries (e.g. 2:275 opening identical). **Cross-check:** quran.com v4 `text_imlaei` (the other simple-rasm edition). Both simple rasm, so skeleton agreement is the authenticity guarantee; Uthmani is deliberately *not* used here because its rasm legitimately differs. Basmala-prefix on ayah 1 (38:1, 24:1) normalized before comparison; leading structural glyphs (۞ ۩ BOM) trimmed from written text.
- Patch mechanics: byte-offset replacement of each defective quoted `arabic:` value (end-to-start per file), safety-rejecting any candidate with quotes/backslashes/newlines/Latin/no-Arabic. Script: scratchpad `backfill-simple.mjs`.
- **Completeness confirmed:** each backfilled entry's preserved `translation:` is the full-verse English, and the written Arabic is the full verse — they match. (Partial-verse fragments seen elsewhere are all in untouched pre-existing entries, a separate older inconsistency.)
- **Gates:** defect rescan 0; all 110 sites carry Arabic script, no prose, no Latin, no wasla; `npm test` 102/102; full `npm run lint` green. The `**Translation:** ` prefixes are gone with the English; `translation:` fields untouched.

### Hardening (regression guard)

[src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) now requires every `kind:"quran"` `arabic:` field to contain at least one Arabic-block character (U+0600–U+06FF), not merely be a non-empty string. This fails fast on exactly the defect signature (English prose in `arabic`) and would have caught 100/110 of the original sites (the other 10 embedded honorific Arabic).

## Fix Constraints (covenant)

- The only correct fix is the authentic Arabic for each of the 87 verses in `arabic:` — **never invented, approximated, or transcribed from memory**; per operator instruction it must come from the Quran MCP (not available in the audit session) or be entered under operator review. `translation:` fields are already correct as-is; the `**Translation:** ` prefix inside `arabic:` is deleted along with the English.
- One cosmetic nuance at environment-seed-tasks.js:6672 (Quran 6:153): the arabic/translation duplication differs by a stray leading `\"` — same defect class, no special handling needed once the Arabic replaces it.
- Optional hardening once fixed: extend the grounding schema test to require Arabic-block characters (U+0600–U+06FF) in `arabic:` for quran entries — that would have caught 100/110 of these and prevents regression.

## Connections

- [[project-seed-mojibake]] — sibling data-integrity defect in the same files; this one is authoring, that one was encoding
- [[2026-07-26-milos-mojibake-repair-glyphs-loader-fix]] — the session that first flagged this in passing
- [[milos]] — parent entity
- [[amanah-gate]] — Qur'anic text integrity; fix gated on authoritative retrieval + operator review

## History

- 2026-07-26: Flagged in passing during the mojibake repair (restored as-authored; explicitly NOT mojibake). Background audit session swept all 22 seed/ayat files: 110 sites / 87 verses / 6 files quantified; ayat files clean; impact + fix constraints recorded. No source edits made (no Quran MCP available; verse text operator-gated).
- 2026-07-26 (later, operator "proceed"): First backfill pass wrote authentic **Uthmani** Arabic via dual-source verified retrieval (quran.com `text_uthmani` ⇄ alquran.cloud `quran-uthmani`, skeleton match, 87/87).
- 2026-07-26 (covenant review before commit): Review of the uncommitted change found the corpus is predominantly **simple rasm with harakat** (only ~26 pre-existing Uthmani-wasla fields; ayat files documented "ar-simple-clean"), so Uthmani would have split the same verse across two scripts. Surfaced to operator, who chose **redo in simple rasm**. Files restored from backup and re-patched from alquran.cloud `quran-simple` (written) cross-checked against quran.com `text_imlaei` — 87/87 verified, all simple rasm, 0 wasla. Grounding test hardened to require Arabic-block characters in quran `arabic:`. Rescan 0; tests 102/102; full lint green.
