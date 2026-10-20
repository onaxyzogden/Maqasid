---
title: "BBOS Named Gates: the Factory Docs' Five Gates Hold the Stage Move"
type: decision
date: 2026-10-19
status: accepted
tags: [bbos, gate, store, amanah, viability, ihsan]
superseded_by: null
---

# BBOS Named Gates: the Factory Docs' Five Gates Hold the Stage Move

## Context

The accepted Factory docs name five gates: Amanah (CRD FP-02 rubric), Viability (CRD gates A–D), Ihsan Baseline (OUT IC-OUT), Pre-Ship (DEL IC-OFR + IC-DEL) and Constraint (OPT FP-01). [[2026-10-17-bbos-stage-grounding-reconciliation]] left them out of scope: the app kept their answers as task fields but nothing read them, so a ★ disqualifier could be answered "yes" and the stage still advanced. The operator approved option A of `.claude/plans/bbos-named-gates.md`, with the round-robin corrections.

## Decision

- **A pure evaluator decides.** `src/data/bbos/bbos-named-gates.js` reads each stage's task `bbosFieldData` and returns, per gate, `clear`, `conditions`, `incomplete` or `blocked`, with its reasons and the doc rule it cites. The stage status is the worst gate (none < clear < conditions < incomplete < blocked). `STAGE_GATES`: CRD → Amanah + Viability, OUT → Baseline, DEL → Pre-Ship, OPT → Constraint (on Close Cycle).
- **The rules, from the docs.**
  - **Amanah:** any ★ YES (Q3, Q5, Q8) is `blocked`, "Reject immediately". Non-★ NOs: 0–2 `clear` with a "Founder notified" acknowledgement; 3–4 `conditions`, a founder decision; 5+ `blocked`.
  - **Viability:** judged per candidate. A failed letter removes that candidate to V2; it does not block the stage. `blocked` only when `overallViability` is "removed". An empty V3, or a failed letter with no V2 entry, is `incomplete`; "conditional" is `conditions`.
  - **Baseline / Pre-Ship:** each checklist names its asset (`icOutAsset`, `icOfrAsset`, `icDelAsset`). 2+ fails is NO-SHIP, `blocked`. The gate says "passed for <asset>", never "stage passed". Ten structured pass/fail checks (IC-OFR-1…5, IC-DEL-1…5) were added; the old free-text `icOfrChecks` / `icDelChecks` stay as notes.
  - **Constraint:** applies when G7.2 says "FP-01 required". TYPE A is `blocked` (Restoration Mandate, no exception); TYPE B / C need every guardrail field, the accountability contact and the signed confirmation.
- **One guard, two places.** `gateMoveRefusal(project, tasks, record)` is shared by the store (`advanceBbosStage`, `startNewBbosCycle`) and both dashboards (the Brief and the legacy `BbosGateMoveDialog`). Blocked or incomplete always refuse. Conditions refuse until a `'conditions'` entry with that `gateId` exists this cycle and every one is resolved. A clear gate's acknowledgements must be in `record.acknowledged`. Halt stays available.
- **No override.** There is no "advance anyway" path for a ★ disqualifier, 5+ NOs, a Viability fail, 2+ IC fails or TYPE A.
- **One record.** Gate outcomes are ordinary `bbosGateLog` entries. A conditions entry may carry `gateId` and `resolverRole`; proceed and cycle entries carry `acknowledged`. Past entries are never edited.
- **An Amanah escalation is resolved by the Owner role.** Its condition is bound to `resolverRole: 'OW'`; a `'resolved'` entry from any other role is refused. Other roles see "Awaiting the owner's decision", and the footer reads "Advance is held until the owner resolves N condition(s)." The role picker is a declared role, not a sign-in: this records who decided, it does not secure the decision.
- **UI.** Both dashboards show a Named gates panel (status pill, cite, reasons). A gate in conditions offers "Record these conditions", which pre-fills the doc's wording and scrolls to the field. Acknowledgements are checkboxes. Proceed explains what it waits on.

## Deviations from the plan

- **An empty V3 is `incomplete`, not `blocked`.** The plan blocked on an empty V3; an empty handoff is unfinished work, and the reason says "or Halt if none did". Only an overall "removed" blocks.
- **A single Q7 or Q10 flag escalates.** The rubric marks those two questions "escalate", so one flag on either gives `conditions` even below 3 NOs.
- **The stage strip and verdict row defer to the named gates.** `gateStatusFor` in the adapter maps blocked/incomplete → `pending` and conditions → `in_review`, so the strip never says passed while a named gate holds the stage.

## Known limits (round robin, 2026-10-19)

- **Checked at the boundary only.** The gates are evaluated when the stage moves. A ★ disqualifier answered YES after the project has left CRD is not acted on: no banner, no hold. The doc says "Reject immediately".
- **Viability does not match candidates.** V2 (Removed Niche Log) and V3 (Cleared Candidate Handoff) are free text, so the evaluator cannot tell whether the candidate named in V3 is one that failed a letter. "Judged per candidate" holds only as far as the operator's entries do.
- **The Owner role is declared, not signed in.** An escalation's `'resolved'` entry is refused unless `record.by` is `OW`, but anyone can pick OW in the role picker. The rule records who claimed to decide; it does not secure the decision.

All three go to one follow-up: a late-disqualifier banner (a ★ YES on file after CRD shows on every later stage and holds Advance through `gateMoveRefusal`, offering Halt), and structured per-candidate and per-asset rows for Viability and the IC checklists.

## Consequences

- Projects mid-pipeline with unanswered gate fields now show `incomplete` and cannot Advance until they are answered. The reasons name the missing fields.
- Checking every asset in its own IC list (rather than one named asset per list) is a follow-up, not built here. Built 2026-10-20: [[2026-10-20-bbos-ic-per-asset]].
- Verified: 501 tests, lint and build green. In preview, both dashboards were screenshot-checked: a clear CRD needs the founder-notified tick; Q5 = yes shows Amanah Blocked with Confirm disabled; a Q7 escalation records an owner-bound condition and holds Advance with "held until the owner resolves 1 condition".

See [[bbos-pipeline]].
