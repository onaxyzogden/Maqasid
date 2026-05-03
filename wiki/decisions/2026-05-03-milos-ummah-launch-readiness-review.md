---
date: 2026-05-03
project: milos
status: accepted
tags: [ummah, grounding, launch-readiness, two-axis-schema]
---

# 2026-05-03 — Ummah Pillar Launch-Readiness Grounding Review

## Context

After the Moontrance hard-split ([[2026-05-03-milos-moontrance-pillar-hard-split-and-grounding-pass]]) reduced Ummah from 525 → 300 subtasks, Ummah was the next pillar in the queue for the per-pillar grounding pass that has already cleared Faith, Batch-4 (Intellect/Family/Wealth/Environment), Health/Life, and Moontrance.

This session ran the same dedup-first NotebookLM Muslim Scholar protocol established by Moontrance (worklist → cross-pillar dedup → probe novel refs → fix inline → per-batch verify).

## Tooling

- New script `scripts/ummah-worklist.mjs` (kept in tree for replay value, not wired to npm) — sed-derived from `scripts/moontrance-worklist.mjs` with all `moontrance` identifiers replaced with `ummah`.
- NotebookLM Muslim Scholar (`be921648-2088-4860-bdd8-283a5e7301f3`).
- `WebFetch` to sunnah.com for ground-truthing when NotebookLM contradicted itself.

## Worklist

`tasks/ummah-worklist.md` (300 subtasks scanned):

- **0** ratNote-flagged subtasks (consistent with the broader pattern that `ratNote` was only used in Faith/salah).
- **9** single-source subtasks.
- After cross-pillar dedup against the eight other pillars: **3 truly novel single-source entries**, 6 inheriting verdicts from prior pillar verification.

## Outcomes

### NotebookLM probes (3 novel hadith refs)

| Ref | Subtask | NotebookLM verdict | Action |
|---|---|---|---|
| Sahih al-Bukhari 6014 | Learn every immediate neighbor's name (`ummah_neighbors_core`) | Numbering correct, Sahih, matn directly commands good treatment of neighbor | **Verified** — no change |
| Sahih al-Bukhari 6017 | Share food with neighbors (`ummah_neighbors_growth`) | Numbering correct, Sahih, matn directly addresses food-sharing with neighbors (sheep's-trotter hadith) | **Verified** — no change |
| Sunan al-Tirmidhi 1944 | Continue checking on a neighbor after they recover (`ummah_neighbors_growth`) | Initially probed as the "best of neighbors in the sight of Allah" hadith — but NotebookLM returned **two contradictory matn descriptions** across two probe turns (one about a heavenly caller / sick-visiting; the other about the best-neighbor matn). Ground-truthed on sunnah.com: 1944 is the best-neighbor hadith (Sahih per Darussalam, Hasan Gharib in Tirmidhi's own grading). | **Relevance downgraded `direct → contextual`** with `ratNote` |

### Defect fixed (1)

`ummah-seed-tasks.js:3252` — "Continue checking on a neighbor after they recover" subtask:
- The cited hadith (Tirmidhi 1944) names the *operative ruling* (excellence in neighborliness) but does not name *this specific application* (continued check-ins after recovery). The application follows by inference from the general principle.
- Per the schema definitions in [[2026-04-18-milos-grounding-two-axis]] (`direct` = matn names practice/operative ruling; `contextual` = same topic by inference), the correct tag is `contextual`, not `direct`.
- Fix: `relevance: "direct"` → `relevance: "contextual"`; translation prose updated to surface the inference; full `ratNote` documenting the change.
- `hadithGrade: "Hasan Sahih"` left unchanged (Tirmidhi himself called it Hasan Gharib; Darussalam grades it Sahih; the existing "Hasan Sahih" composite is defensible).

## NotebookLM contradiction

Two probes on Tirmidhi 1944 in the same conversation returned mutually exclusive matn descriptions — one a sick-visiting hadith, the other a best-neighbor hadith. Both responses explicitly noted that the citation was *not in the corpus*, meaning NotebookLM was synthesizing answers from training rather than retrieving from the indexed Muslim Scholar sources. This is a known failure mode when the corpus lacks coverage for a specific Tirmidhi hadith number.

**Mitigation pattern** for future passes: when NotebookLM disclaims "not in source corpus," always cross-check with `WebFetch https://sunnah.com/<collection>:<number>` before acting on the verdict. Sunnah.com is the canonical source for Darussalam-graded numbering.

## Verification

- `npm test`: **61/61 pass**.
- `npm run lint`: `[STRICT] OK` — all three ratchets at minimum (per-pillar legacy 0, empty-array 0, inline-refs 0); 78 inline refs across the corpus, 0 missing-from-sources.

## Decision

The Ummah pillar (300 subtasks across 9 social-pillar boards) is **launch-ready**. The 9 single-source entries either (a) cite refs already verified by another pillar's prior grounding pass, or (b) have an independent NotebookLM verdict from this session.

## Pillar grounding-readiness status (after this session)

| Pillar | Status | ADR |
|---|---|---|
| Faith | Launch-ready | [[2026-05-02-milos-faith-launch-readiness-review]] |
| Health/Life | Launch-ready | (per [[2026-05-02-milos-faith-launch-readiness-review]]) |
| Intellect | Launch-ready | (Batch-4) |
| Family | Launch-ready | (Batch-4) |
| Wealth | Launch-ready | (Batch-4) |
| Environment | Launch-ready | (Batch-4) |
| Ummah | **Launch-ready (this ADR)** | this |
| Moontrance | Launch-ready | [[2026-05-03-milos-moontrance-pillar-hard-split-and-grounding-pass]] |
| Prayer | Pending | — |

Prayer is the last remaining pillar.

## Files Changed

- `src/data/seed-tasks/ummah-seed-tasks.js` — 1 inline edit (relevance downgrade + ratNote on the Tirmidhi 1944 subtask).
- `scripts/ummah-worklist.mjs` (new, in-tree) — adapted from `scripts/moontrance-worklist.mjs`.

## References

- Worklist: `tasks/ummah-worklist.md`
- Schema: [[2026-04-18-milos-grounding-two-axis]]
- Protocol precedent: [[2026-05-03-milos-moontrance-pillar-hard-split-and-grounding-pass]], [[2026-05-02-milos-faith-launch-readiness-review]]
- NotebookLM corpora: [[notebooklm-grounding-corpora]]
