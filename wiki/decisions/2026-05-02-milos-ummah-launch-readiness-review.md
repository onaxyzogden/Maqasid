---
date: 2026-05-02
project: MILOS
status: accepted
supersedes: []
related:
  - 2026-05-02-milos-faith-launch-readiness-review.md
  - 2026-04-26-milos-faith-grounding-ratnote-sweep.md
---

# Ummah pillar — launch-readiness grounding review

## Context

Following the Faith pillar review (same date) that established a NotebookLM-based re-verification protocol for weak grounding entries, the same protocol was applied to the Ummah pillar — the largest pillar in MILOS at 525 subtasks across 5 submodules.

The targeted scope:
- 2 ratNote-flagged subtasks (legacy uncertainty markers)
- 81 single-source subtasks (each resting on one citation)
- After dedup: 83 unique entries covering 89 ref-instances across 54 unique refs

NotebookLM Muslim Scholar (`be921648-2088-4860-bdd8-283a5e7301f3`) was the sole verification tool. Strategy: prioritise top-frequency refs (n≥2 → 16 refs covering 54 instances), then sample the long-tail (n=1 → 38 refs) to confirm a clean trend rather than verify exhaustively.

## Decision

24 unique refs were verified directly via NotebookLM. Results:

**Canonical ref accuracy: 23/24 confirmed (96%).**

A single defect was found and fixed inline:

| Subtask | Submodule | Original Ref | Issue | Fix |
|---|---|---|---|---|
| "Design the vetting process — application, interview, mutual discernment, and trial period" | settling | Sahih al-Bukhari **2533** | That hadith concerns mudabbar slave-emancipation — entirely unrelated to vetting. The translation field already described Bukhari 3937 content (Muhajir/Ansar fraternity pairing). | Ref corrected to Sahih al-Bukhari **3937**; relevance downgraded `direct → contextual` (since vetting ≠ pairing); rationale updated with verification note. |

**Advisory relevance retags (not applied):** NotebookLM suggested `direct → thematic` for 5 entries (Muslim 2699, Muslim 2900, Quran 14:24-25, Quran 59:18, Tirmidhi 2007). Per the Faith protocol, advisory tightening is preserved as operator judgment unless it materially mis-signals — these citations are accurate; only the relevance grade is debatable. Left as-is.

## Outcome

- **Defect rate:** 1/24 verified refs = ~4% (vs Faith ~10%)
- `npm test` → 56/56 passing
- `npm run lint` → clean; all 3 ratchets at minimum (per-pillar legacy 0, empty-array 1, inline-refs 0)
- Ummah pillar declared launch-ready with one corrected citation

## Consequences

**Positive:**
- Two pillars now NotebookLM-verified (Faith + Ummah). 6 remaining (Life, Intellect, Family, Wealth, Environment, plus Prayer submodule).
- Pattern confirmed: targeted ratNote + single-source review catches real defects at low cost (~1-2 hours of probes per pillar).
- Long-tail sampling (vs exhaustive verification) appears safe given the consistent low defect rate — confirms 30 unverified n=1 refs remain a calculated risk, not a blocker.

**Risks accepted:**
- 30 long-tail single-source refs in Ummah were not directly verified; relying on the sampled trend (8/8 clean).
- 2 NotebookLM probes timed out repeatedly (Sahih Muslim 1015, Sunan Abi Dawud 5152) — neither was a top-frequency ref so impact is minimal, but they warrant a follow-up retry.

**Next session candidate:** Apply the same protocol to **Life** pillar (next-largest weak-entry count) or batch the 5 remaining smaller pillars together.
