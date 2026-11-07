---
title: "BBOS Viability: Every Candidate Judged on Its Own Row"
type: decision
date: 2026-11-07
status: accepted
tags: [bbos, gate, viability, crd]
superseded_by: null
---

# BBOS Viability: Every Candidate Judged on Its Own Row

## Context

[[2026-10-19-bbos-named-gates]] listed a second Known limit: "Viability does not match candidates." CRD-V1 held one set of Gates A–D, and V2 (Removed Niche Log) and V3 (Cleared Candidate Handoff) were free text. The evaluator could not tell whether a candidate named in V3 had failed a letter. The operator approved option A of `.claude/plans/bbos-viability-candidates.md` (one candidate list on CRD-V1), and adopted the Phase 2 round robin (ledger beside the plan).

## Decision

- **One row per candidate.** CRD-V1 holds `viabilityCandidates`: `[{ name, gates: [A, B, C, D], note }]`, each letter `pass`, `fail`, `conditional` or unanswered. Rules are in `src/data/bbos/bbos-viability-candidates.js`.
- **The verdict is read, never stored.** `candidateResult(row)` derives it on every read: any failed letter = Removed; else a missing name or letter = Unfinished; else any conditional = Conditional; else Cleared. No row stores a verdict, so a candidate that failed a letter can never show as cleared.
- **Nothing stored is deleted.** The old flat letters (`gateARegulatory`, `gateBMarketFit`, `gateCCompetenceProof`, `gateDProvenDemand`) read as unnamed candidate 1 and stay stored. The first edit writes the list and keeps any earlier V1 text under `_viabilityCandidatesText`, shown as "Earlier text, kept as written". A list stored as text holds the gate and is never written over.
- **The gate, per candidate.** In `bbos-named-gates.js`:
  - Every candidate removed is `blocked`, whatever overall is stored ("Every candidate failed a gate… Halt, and record the removal"). There is no override.
  - Each removed candidate must open its own line in V2 `removedNiches`, and each cleared one in V3 `clearedCandidates`; V3 must not name a removed one. Otherwise `incomplete`.
  - A stored `overallViability` that differs from the one the rows give is `incomplete`.
  - Conditional candidates give `conditions`. Otherwise `clear`: "Gates A–D cleared. Handed off: … Removed: …", with the names taken from the rows, never from V3 text.
  - The gate holds while an AI draft of CRD-V1, V2 or V3 is pending.
- **AI drafts cannot drop a removed candidate.** `keepRemovedCandidates` keeps every failed row and its earlier note when a draft is parsed; rejecting a draft restores the values held before it.
- **UI.**
  - **Editor:** `BbosViabilityCandidatesField.jsx` shows one card per candidate with its own verdict. A removed candidate has no Delete and carries the note to record it in V2.
  - **Legacy dashboard:** the CRD-V1 card shows "X/N cleared", A–D badges per candidate, the stored Overall, and a note when the candidates give a different overall.
  - **Named gates panels:** both list each candidate checked.

## Deviations from the plan

- **V2 and V3 are required again.** Task 2.3 said V2/V3 text was no longer required; the round robin superseded it. Names must open a line, one per line, so a name taken from a longer entry does not count.
- **A pending draft holds the gate.** This is a new rule for this gate, named at the Phase 2 gate, so an unreviewed draft cannot clear or hide a failed letter.
- **The editor was pulled into Phase 2** (rounds 21–23) to close the hand-deletion objection before the UI phase.

## Consequences

- Projects with only the old flat letters show them as candidate 1. They need a name, and V2/V3 lines, before Viability clears.
- The four letter selects are gone from the CRD-V1 form; their answers show inside candidate 1.
- Out of scope: the third Known limit (the Owner role is declared, not signed in) stays open. The Stage Decision header can read "Amanah gate blocked" while the Amanah card is clear, because it shows the stage-gate name; this was there before this change.
- Verified: 834 tests, lint and build green. In preview: the editor showed a Gate B fail as Removed with no Delete, and the legacy card showed "1/2 cleared". The Approval Brief cleared with "Handed off: Halal meal prep, Ontario. Removed: Crypto tutoring." With both candidates failing and "viable" still stored, it showed Blocked with Proceed locked. The legacy gate-move dialog listed each candidate. No gate-log entry was written.

See [[bbos-pipeline]].
