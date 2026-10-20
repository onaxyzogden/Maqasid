# Session Execution Plan
**Date:** 2026-10-19
**Project:** MILOS V2.1 (BBOS pipeline)
**Objective:** Build the five gates that the accepted Factory docs name into the app: Amanah, Viability, Baseline, Pre-Ship and Constraint. The reconciliation decision marked them out of scope until now.
**Context Source:** Project Wiki

---

## What the docs say each gate does (the rules the app will follow, word for word)

| Gate | Stage, doc | App data already there | Rule (from the accepted doc) |
|---|---|---|---|
| **Amanah Gate** (FP-02 Screening Rubric) | CRD v2.0 | `CRD-FP02`: Q1–Q8 selects; ★ on Q3, Q5, Q8 | Any ★ YES: **reject**, and complete the Responsible Removal Log. Non-★ NOs: 0–2 **proceed** with founder notification; 3–4 **escalate**, founder decision required; 5+ **do not proceed**. |
| **Viability Gate** (Gates A–D) | CRD v2.0 | `CRD-V1`: gates A–D (pass / fail / conditional) + `overallViability` | Every candidate must pass A–D before any scoring. "Integrity first, opportunity second." |
| **Ihsan Baseline Gate** (IC-OUT) | OUT v2.0 | `icOut1`–`icOut5` (pass / fail) | Any asset failing **2 or more** checks is **NO-SHIP** and must be revised. |
| **Pre-Ship Gate** (IC-OFR + IC-DEL) | DEL v3.7 | `icOfrChecks`, `icDelChecks`: **free text only** | Any asset failing **2 or more** checks must be revised before use. |
| **Constraint Gate** (FP-01 Constrained Proceed) | OPT v2.0 | `OPT` G7.2 check ("FP-01 required") + FP-01 task: `depletionType`, evidence, … | Applies when the Stewardship Score is below 7.0. **TYPE A** (existential depletion): no exception, the Restoration Mandate applies. **TYPE B / C**: permitted only with every guardrail field, the named accountability contact and the signed confirmation complete. |

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~14,000 | Wiki, Factory doc gate passages, task definitions |
| Planning (this document) | ~5,000 | |
| Execution — Phase 1 Rules | ~15,000 | Pure evaluator module and tests, written test-first |
| Execution — Phase 2 Data | ~8,000 | Ten structured IC-OFR / IC-DEL checks |
| Execution — Phase 3 Wiring | ~30,000 | Store guard, gate dialog panel in both dashboards, adapter, preview |
| Execution — Phase 4 Close | ~10,000 | UX review, wiki decision, entity, log, PR, debrief |
| **Total Estimated** | **~82,000** | |

> Note: Token estimates are approximate. Complex file generation or multi-file
> refactoring will trend higher. Flag if any phase exceeds estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] **Recommended option (A): the rubric decides; the gate record holds the decision.** A pure module, `src/data/bbos/bbos-named-gates.js`, reads each stage's task fields and returns one of four results: `clear`, `conditions`, `blocked` or `incomplete`, each with its reasons and the doc rule it cites. When the operator moves a stage on, the move dialog shows that result:
  - `blocked` or `incomplete`: Advance is refused, in the store as well as the UI, so neither dashboard can get around it. Halt stays available.
  - `conditions` (Amanah 3–4 NOs, Viability "conditional"): the gate record's existing "conditions" decision is pre-filled with the doc's wording, and the existing rule blocks Advance until each condition is resolved with a basis.
  - `clear`: Advance as today, and the gate's result is named in the entry's basis.
- [ ] **Round-robin corrections (2026-10-19):**
  - **Viability is judged per candidate.** A failed gate letter removes that candidate to V2 (Removed Niche Log); it does not block the stage. The stage is `blocked` only when V3 (Cleared Candidate Handoff) is empty or `overallViability` is "removed". A failed letter with no V2 removal entry is `incomplete`.
  - **Only the founder can resolve an Amanah escalation.** A 3–4 NO condition can be resolved only by the Owner role (`OW` in `bbos-role-access.js`; the app has no separate founder role). Every other role, "All Roles" included, sees "Awaiting the owner's decision". The role picker is a declared role, not a sign-in, so this records who decided; it does not secure the decision. A proceed on 0–2 NOs requires a "Founder notified" tick in its basis, because the doc asks for notification, not approval.
  - **Each IC checklist names its asset.** IC-OUT, IC-OFR and IC-DEL each gain a required "asset checked" field. The gate reports "passed for <asset>", never "stage passed". Checking every asset in its own list is proposed as a follow-up session, not built here.
- [ ] **Where each gate sits:**
  - Amanah and Viability gate the move out of CRD;
  - Ihsan Baseline gates the move out of OUT;
  - Pre-Ship gates the move out of DEL;
  - Constraint gates Close Cycle on OPT, and applies only when G7.2 says "FP-01 required".
- [ ] **Pre-Ship gets structured data.** Ten pass/fail checks (IC-OFR-1…5, IC-DEL-1…5) are added, with the doc's pass conditions as their labels. The existing `icOfrChecks` and `icDelChecks` text stays as notes, so no stored text is lost. Projects that have only the old text show `incomplete` until the checks are answered.
- [ ] **Only one record.** Gate outcomes are written as ordinary `bbosGateLog` entries (proceed, conditions or halt). Past entries are never edited.
- [ ] Work is on a new branch, `feat/bbos-named-gates`, cut from `origin/main`. PR #70 doesn't touch these files.
- [ ] **Skills:**
  - `superpowers:test-driven-development` for Phases 1 and 3;
  - `ux-engine:feedback-and-affordance` and `ux-engine:state-completeness` for the dialog's gate panel;
  - Agent `ux-engine:ux-reviewer` before the PR.
- **Other options considered:**
  - **(B) Advisory only:** show each gate's result in the dialog and never block. This is cheaper, but it lets a ★ disqualifier pass with a click, which the CRD doc forbids: "Al-Haqq does not negotiate."
  - **(C) Hard block on everything:** this treats Amanah 3–4 NOs and Viability "conditional" as a block. The doc sends those to a founder decision, not a rejection, so C is stricter than the doc.

  I recommend A.

### Must Not
- **No override for a ★ disqualifier, a Viability fail or a TYPE A depletion.** There is no "advance anyway" path. Check: `grep -rn -i "override\|bypass\|force" src/data/bbos/bbos-named-gates.js` returns nothing.
- **No second decision record.** Check: `grep -rn "bbosDecisions\|gateResults:" src/store` returns nothing new.
- **No softened wording at a disqualifier.** Gate messages quote or follow the doc ("Reject immediately", "NO-SHIP", "Restoration Mandate"), never "maybe" or "consider".
- No change to the Factory docs, and no edit to an existing gate-log entry.
- No stored task text is deleted or rewritten. `icOfrChecks` and `icDelChecks` survive as notes.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Projects mid-pipeline suddenly can't Advance (e.g. an empty IC-DEL) | High | Med | `incomplete` says exactly which checks are unanswered and links to the task. Halt and conditions are still available. Phase 3 reports how the demo/seed project behaves. |
| The CRD rubric's ★ set in the app differs from the doc | Low | High | A test compares the app's ★ questions (Q3, Q5, Q8) to the doc rubric's rows before any rule is written. If they differ, stop and report. |
| The legacy and redesigned dashboards take different Advance paths | Med | Med | Guard in the store action (`advanceBbosStage`, `startNewBbosCycle`), not only in the dialogs. Test both paths. |
| The Constraint Gate's Stewardship Score source is unclear (G7.2 select vs a computed score) | Med | Low | Use the G7.2 select ("FP-01 required") as the doc's own trigger. If no G7.2 answer exists, return `incomplete`, never a guessed score. |
| The preview can't be screenshotted | Low | Low | The CLAUDE.md rule applies: say so, and don't claim the UI works. |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — Gate rules (test-driven-development)
- [ ] Task 1.1 — Branch `feat/bbos-named-gates` from `origin/main`. Read `src/components/bbos/CONTEXT.md` and `src/data/bbos/` CONTEXT before any code.
- [ ] Task 1.2 — Write the tests first, one block per gate. Cover each doc threshold at its edge:
  - Amanah: ★ YES; 2, 3, 4 and 5 NOs; an unanswered question;
  - Viability: one letter failed with a V2 removal (clear) and without one (incomplete); an empty V3 (blocked); conditional; `overallViability` = removed;
  - Amanah escalation: resolve as Strategist or All Roles (refused) and as Owner (allowed); a proceed without the "Founder notified" tick (refused);
  - IC: a checklist with no asset named (incomplete);
  - IC-OUT and IC-OFR/IC-DEL: 1 vs 2 fails;
  - FP-01: not required; TYPE A; TYPE B with a missing guardrail; TYPE C complete.
- [ ] Task 1.3 — Implement `bbos-named-gates.js`: a pure `evaluateStageGates(stageId, tasks)`, and a `GATE_RULES` table that cites the doc and version for each rule.
**Gate:** the new tests and the full `npm test` are green. If the ★ check (risk 2) fails, stop and report.

### Phase 2 — Pre-Ship data
- [ ] Task 2.0 — Add the required "asset checked" field to the IC-OUT task and to both IC sets on DEL.
- [ ] Task 2.1 — Add `icOfr1`–`icOfr5` and `icDel1`–`icDel5` pass/fail selects to the DEL task definition, labelled with the doc's checks. Keep the two textareas, relabelled as notes.
- [ ] Task 2.2 — Show them in the legacy dashboard's DEL step panel next to the existing IC lines.
**Gate:** test, lint and build green. Old `icOfrChecks` text still renders.

### Phase 3 — Wiring (test-driven-development; ux-engine feedback-and-affordance, state-completeness)
- [ ] Task 3.1 — Add a store guard. `advanceBbosStage` refuses when the stage's gates are `blocked` or `incomplete`. `startNewBbosCycle` refuses on a blocking Constraint Gate. Both return the reasons, as the open-conditions guard already does. Tests for both.
- [ ] Task 3.2 — Add a gate panel in `BbosGateMoveDialog`, used by both dashboards. It shows each gate's name, its result, the doc rule and the failing items, with every state covered (clear, conditions, blocked, incomplete, and not applicable). On `conditions`, pre-fill the conditions decision with the doc's wording.
- [ ] Task 3.2b — Make conditions resolution check roles: an Amanah escalation condition carries `resolverRole: 'OW'`, and `resolved` entries from other roles are refused, with tests.
- [ ] Task 3.3 — Adapter: expose `brief.gate.named` so the redesigned dashboard's Advance uses the same result.
- [ ] Task 3.4 — Preview: on the legacy dashboard, Advance out of CRD with a ★ YES (refused), then with 3 NOs (conditions), then clear (moves). On the redesigned dashboard, repeat one case. Take a screenshot of each.
**Gate:** test, lint and build green; screenshots show refused / conditions / clear. If any path still lets a blocked stage Advance, stop.

### Phase 4 — Close
- [ ] Task 4.1 — Run Agent `ux-engine:ux-reviewer` on the diff and fix its P0/P1 findings.
- [ ] Task 4.2 — Wiki:
  - a new decision, `wiki/decisions/2026-10-19-bbos-named-gates.md`;
  - an amendment to the reconciliation decision's "Gates" line;
  - a `bbos-pipeline` History row;
  - an `index.md` row;
  - a log entry at the top.
- [ ] Task 4.3 — Commit, push, open the PR, then `get_status` / `bind_pr`.
- [ ] Task 4.4 — Propose a follow-up session: per-asset IC checklists.
- [ ] Task 4.5 — Session Debrief.
**Gate:** Session complete when the PR is open and the debrief is given.

---

## Definition of Done
- Each of the five named gates is evaluated from the stage's own task fields, by the rule its accepted Factory doc states.
- A ★ disqualifier, a Viability fail, an IC checklist with 2 or more fails, and a TYPE A depletion each refuse Advance (or Close Cycle) in the store and in both dashboards, with the doc's reason shown.
- An empty V3 handoff blocks the stage, and a single failed candidate does not. Amanah escalation and Viability "conditional" raise conditions in `bbosGateLog`. Only the Owner role can resolve an Amanah escalation. Each IC result names the asset it certifies. No second record is created.
- Tests, lint and build pass; the preview screenshots show refused, conditions and clear; the wiki records the decision in a PR.
- This meets the Objective: "Build the five gates that the accepted Factory docs name into the app: Amanah, Viability, Baseline, Pre-Ship and Constraint. The reconciliation decision marked them out of scope until now."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
