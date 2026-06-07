---
title: "MILOS — Faith-pillar grounding audit hardening + opening-du'a istiftah correction"
type: decision
date: 2026-05-15
status: accepted
---

# MILOS — Faith-pillar grounding audit hardening + opening-du'a istiftah correction

## Context

A user screenshot showed the SALAH → CORE subtask **"Memorise the
opening du'a (Subhanaka Allahumma or equivalent)"** rendering what
looked like the same hadith twice with different Bukhari numbers.
Investigation found **three** Bukhari refs — 4293, 794, **817** — all
the same Aishah narration about tasbih *in rukuʿ and sujud*, repeated
across Bukhari's chapters under different numbers with slightly
different translator wording. Three layered defects, all artifacts of
the 2026-04-25 automated grounding migration (tell-tale: stamped
boilerplate rationale *"Prophetic narration cited as evidence for this
subtask."*):

1. **Duplicate citation** — one hadith cited as three refs.
2. **Topic mismatch** — all three are rukuʿ/sujud adhkar, not the
   opening du'a al-istiftah the subtask teaches.
3. **Description vs. sources mismatch** — the description teaches the
   longer istiftah none of the cited Bukhari texts contain.

Systemic root cause: `scripts/audit-grounding-quality.mjs` **never
scanned the faith/prayer pillar** (only intellect/family/wealth/
environment), its duplicate check only caught byte-identical strings,
and it ran on a **stale schema** (provenanceTier {Bayyinah, Ijma',
Qiyas} / relevance {direct, supportive, derivative}) vs. the live
two-axis schema (provenanceTier {Bayyinah, Qarina, Niyyah} / relevance
{direct, contextual, thematic}). This class of defect across all of
SALAH was invisible.

## Decision

User chose **(a)** harden + extend the audit across the faith pillar
(not just patch the one subtask) and **(b)** replace the subtask's
sources with the *correct* du'a al-istiftah evidence (not just
dedupe-and-flag).

### WS1 — Audit hardening (`scripts/audit-grounding-quality.mjs`, only file)

- **Faith included.** `['faith', 'FAITH_SEED_TASKS']` added to
  `PILLARS`; `subtaskTotals.faith = 285`; "four pillars" → "five".
- **Near-duplicate hadith heuristic.** New `normalizeHadithText()`
  (strips `Narrated X:` prefix, ﷺ ligatures, parenthetical/bracket
  translator glosses, NFKD diacritic fold, transliteration folds,
  apostrophes), `tokenStats()` (Jaccard + overlap coefficient
  inter/min + min-token guard), and union-find `nearDuplicateHadith()`
  for transitive clustering. Thresholds `NEAR_DUP_JACCARD = 0.72`,
  `NEAR_DUP_OVERLAP = 0.8`, `NEAR_DUP_MIN_TOKENS = 6`. Emits
  `near-duplicate-hadith-of-idx-N` for non-representative members.
- **Schema reconciliation.** Imports live `AMANAH_TIERS` /
  `RELEVANCE_CHIPS`; deleted stale `ACCEPTED_TIERS`; `provenanceMismatch`
  now flags only out-of-vocabulary `relevance`/`provenanceTier`. Effect:
  `low-provenance = 0` across all five pillars (the stale-schema
  false-positives that inflated the 2026-05-11 backlog are gone — a
  correctness fix, not a regression).
- Regenerated backlog: `tasks/grounding-content-backlog-2026-05-16.md`
  (machine clock stamped 2026-05-16; the 2026-05-11 file is untouched).

### WS2 — Subtask correction (`src/data/seed-tasks/faith-seed-tasks.js`)

`faith.faith_salah_core[2].subtasks[0]`: the three rukuʿ/sujud Bukhari
entries (4293/794/817) replaced with a single topic-correct,
deduplicated source — **Sahih Muslim 788** (ʿAbda: ʿUmar ibn al-Khattab
reciting *"Subhanak Allahumma wa bi hamdika wa tabarakasmuka wa taʿala
jadduka wa la ilaha ghairuka"* aloud at the opening of prayer to teach
the congregation). `relevance: "direct"`, `provenanceTier: "Bayyinah"`,
`hadithGrade: "Sahih"`, specific (non-boilerplate) rationale. Subtask
`tier` raised T3 → T1; `amanahRationale` rewritten from the old
mismatch-admission to a positive grounded statement. The subtask
`description` (the longer istiftah) was unchanged and now matches the
source. Evidence retrieved from the authorized Muslim Scholar NotebookLM
corpus (be921648); Sunan attributions excluded because the corpus
flagged them as outside its provided sources (Amanah Gate — no
asserting refs from memory).

## Consequences

- The faith/SALAH pillar is now in the audit's blast radius; the
  near-duplicate heuristic catches translator-variant repeats the
  byte-identical check missed (faith now reports
  `duplicate-hadith=4 near-dup-hadith=8`).
- Regenerated 4-pillar `low-provenance` counts differ from the
  2026-05-11 backlog (schema-reconciliation fix) — expected.
- The opening-du'a subtask is no longer flagged for duplicate, topic,
  or boilerplate.

## Verification

- `node scripts/audit-grounding-quality.mjs` → 5 pillars,
  `low-provenance=0` everywhere, subtask absent from the regenerated
  backlog.
- `npm test` 62/62. `lint:grounding-strict` pass (0 under ratchet 0);
  `audit:inline-refs` faith=0 (ratchet 0). ESLint clean on both
  modified files.
- **Caveat:** the combined `npm run lint` fails with 297 ESLint errors —
  *all* in stray `.claude/worktrees/*/dist/` minified build artifacts
  from parallel agent sessions plus pre-existing untouched
  `Sidebar.jsx`/`Dashboard.jsx`. Zero in the two files this task
  changed. Pre-existing eslint-ignore gap (untracked worktree `dist/`
  output is being scanned), not a regression here — flagged for a
  separate cleanup.

## Follow-up — ESLint gate + faith near-duplicate triage (2026-05-15, same session)

### ESLint gate restored

`eslint.config.js` `globalIgnores` extended with `**/dist/**` and
`.claude/**` (parallel-agent worktree `dist/` artifacts were being
linted: 297→0). Three pre-existing source nits cleared so the gate is
genuinely green: `Dashboard.jsx` (removed unused `useCallback` import,
unused `user` + orphaned `useAuthStore` import); `Sidebar.jsx`'s
non-component `MODULE_ROUTES` export extracted to new
`src/components/layout/Sidebar.constants.js` (only external importer
`AppShell.jsx` repointed; the 5 pillar dashboards have their own local
`SUBMODULE_ROUTES` and were untouched). `npm run lint` exits 0;
`npm test` 62/62; production build clean.

### Triage of the 12 faith duplicate/near-duplicate findings

Three dispositions:

- **Cat. 1 — safe dedup, topic correct (fixed this session, 3
  redundant sources removed):**
  - `faith_salah_growth[0].subtasks[3]` "2 after Isha" — dropped idx2
    `Sahih Muslim 1579` (truncated restatement of the twelve-rawatib
    hadith; idx0 `Muslim 728` is the correct canonical matn; the 1579
    number is also suspect — Muslim 1579 is in the transactions book).
  - `faith_hajj_core[2].subtasks[0]` "Ihram from the miqat" — dropped
    idx2 `Bukhari 1526` (near-identical Ibn ʿAbbas miqat narration of
    idx1 `Bukhari 1524`; idx0 `1522` is a distinct same-topic narration
    kept).
  - `faith_hajj_core[2].subtasks[2]` "Two rak'at behind Maqam Ibrahim"
    — dropped idx2 `Bukhari 1624` (byte-identical to idx1 `1623`; idx0
    `Bukhari 1627` is the clean on-topic anchor).
  - Effect: source entries 2257→2254; faith `duplicate-hadith` 4→3,
    `near-dup-hadith` 8→5.

- **Cat. 2 — acceptable false positive (KEEP, no action):**
  - `faith_salah_core[13].subtasks[2]` "du'a/istighfar last third" —
    idx0 `Bukhari 1145` + idx1 `Muslim 758` are the *same* descent
    hadith but a **deliberate scholarly pairing** (curated non-boilerplate
    rationales; `amanahRationale` names both — Bukhari's threefold-du'a
    wording + Muslim's "until break of dawn" boundary). The near-dup
    heuristic correctly sees textual overlap; the pairing is intentional
    and well-grounded. Distinguishing signal: curated rationale +
    amanahRationale naming both = intentional; boilerplate = migration
    noise.

- **Cat. 3 — duplicate AND topic-mismatch (NOT hand-fixed; needs
  authorized-corpus re-sourcing, same rigor as the istiftah WS2 — do
  not assert refs from memory, Amanah Gate):**
  - `faith_salah_growth[2].subtasks[1]` "Pray at least 2 rak'at of
    Tahajjud" — idx1/2/3 (`Bukhari 1109/1091/1092`) are all the same
    Ibn ʿUmar narration about **combining Maghrib+Isha during travel**
    (1091≡1092 byte-identical), not about Tahajjud.
  - `faith_salah_growth[3].subtasks[0]` "Read Ibn al-Qayyim's
    description of khushuʿ" — idx3/4 (`Bukhari 958/959`, byte-identical)
    both about **ʿId prayer / no adhan for ʿId**, unrelated to khushuʿ.
  - `faith_salah_excellence[0].subtasks[1]` "Pray Duha at least 3 times"
    — idx1/2 (`Bukhari 1775/1776`, byte-identical) is an Ibn ʿUmar
    narration calling Duha a *bidʿah* plus a ʿUmra-count tangent —
    duplicate and counter-productive as evidence.

  Each Cat. 3 subtask is the exact defect class of the original
  istiftah bug and requires NotebookLM Muslim Scholar (be921648)
  retrieval + grade gating per subtask — surfaced as a separate
  task, not bundled here.

## Files

- `scripts/audit-grounding-quality.mjs` — extended (new file, WS1)
- `src/data/seed-tasks/faith-seed-tasks.js` — subtask corrected (WS2)
- `tasks/grounding-content-backlog-2026-05-16.md` — regenerated output
- `src/data/config/amanah-tiers.js`, `src/data/config/relevance-chips.js`
  — live schema source (read only)
