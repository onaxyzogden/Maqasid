# Session Execution Plan
**Date:** 2026-10-20
**Project:** MILOS V2.1
**Objective:** A PR (based on feat/bbos-ic-per-asset, or main if #71/#72 merged) adding the late-disqualifier banner: a ★ Amanah Gate disqualifier (CRD-FP02 Q3/Q5/Q8) answered YES after CRD shows a banner on every later stage in both dashboards, holds Advance through gateMoveRefusal, and offers Halt — no override; with tests, a wiki decision and a log entry.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~25,000 | Wiki + gate code, store, both dashboards |
| Planning (this document) | ~5,000 | |
| Execution — Phase 0 (land #72) | ~3,000 | One PR, no code |
| Execution — Phase 1 (evaluator, tests first) | ~15,000 | Pure function + tests |
| Execution — Phase 2 (both dashboards) | ~30,000 | Banner + Halt, two UIs, UX skill |
| Execution — Phase 3 (verify) | ~25,000 | test/lint/build, preview screenshots |
| Execution — Phase 4 (wiki, PR) | ~8,000 | |
| **Total Estimated** | **~111,000** | |

---

## Risks & Assumptions

### Assumptions
- [ ] "After CRD" means the project's `bbosStage` is later than CRD in `BBOS_STAGES` order (STR…OPT). At CRD the existing Amanah gate already blocks; before CRD (IDY, including a new cycle's IDY) nothing is shown.
- [ ] The late check lives in `evaluateStageGates`: for any stage after CRD it adds an Amanah (late) gate result, `blocked`, when CRD-FP02 holds a ★ YES. Every caller then holds without new wiring: the store (`gateMoveRefusal`, so Advance and Close Cycle refuse), the Brief's named-gates panel and Proceed lock, the legacy `BbosGateMoveDialog`, and the stage strip (`gateStatusFor` → pending).
- [ ] The banner is a project-level notice: it shows at the top of both dashboards on every stage view while the project sits after CRD with a ★ YES on file and is not rejected. A rejected project shows the existing rejection banner instead.
- [ ] Halt: a new rejection reason `amanah_disqualifier` ("Amanah ★ disqualifier") is added to `BBOS_REJECTION_REASONS` (operator's choice), and the banner's Halt pre-selects it. Brief: Halt opens the Brief on the current stage with Halt and that reason chosen. Legacy: Halt opens the existing Reject modal (today only reachable on the CRD filter) with that reason. Both record a `'halt'` entry through `rejectBbosPipeline`, the existing path.
- [ ] Base: PR A lands feat/bbos-named-gates (holding #72) on main; this branch (`feat/bbos-late-disqualifier`, already main + feat/bbos-named-gates merged, clean) is PR B to main, stacked on A.
- Other options considered: (1) a separate `lateDisqualifier()` that only `gateMoveRefusal` calls. Rejected because each dashboard would then need its own wiring and the stage strip could still say passed. (2) A banner with no gate. Rejected because it would not hold the store.

### Must Not
- No override or "advance anyway" path for the late disqualifier (`grep -rn -i "anyway\|override" src/components/bbos` shows only the existing "no override" copy).
- No softened wording: the reason keeps "automatic disqualifier" and "Reject immediately" (grep for both in bbos-named-gates.js).
- No edits to existing bbosGateLog entries. The banner writes nothing; only Halt appends, via `rejectBbosPipeline`.
- No edits to the Factory docs or to `wiki/decisions/2026-10-19-bbos-named-gates.md` beyond an appended amendment line that points to the new decision.
- No other change to the Viability or Owner-role limits (out of scope).

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Existing tests assume `evaluateStageGates('STR', …)` returns no gates (status `none`) | Med | Low | The late gate appears only with a ★ YES; run the full suite after Phase 1 |
| A test pins the count of BBOS_REJECTION_REASONS | Low | Low | Grep before editing; update deliberately |
| Legacy reject modal copy says "rejected at the Amanah Proof Audit" | Low | Low | Correct, since the ★ is from that audit; keep it |
| PR B's diff includes #72's commits until PR A merges | High | Low | Say so in the PR body; set base to main after A merges |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 0 — Land #72 on main (`gh`)
- [ ] 0.1 Open PR A: `feat/bbos-named-gates` → `main`, titled "Land #72 (per-asset IC checklists) on main". The body explains that #72 merged into its base after #71 had merged.
**Gate:** PR A is open and mergeable.

### Phase 1 — Evaluator, tests first (`superpowers:test-driven-development`)
- [ ] 1.1 Write failing tests in `src/data/bbos/__tests__/bbos-named-gates.test.js`:
  - STR/OUT/OPT with Q5=yes give a `blocked` late Amanah gate whose reasons quote the Q numbers, "automatic disqualifier" and "Reject immediately".
  - `gateMoveRefusal` refuses at STR, and at OPT for a cycle close, even with acknowledgements and resolved conditions present.
  - No ★ YES, or a stage of IDY/CRD, leaves results unchanged (CRD keeps its single Amanah gate, with no duplicate).
  - An exported `lateDisqualifier(stageId, tasks)` returns null or the result.
- [ ] 1.2 Implement it in `bbos-named-gates.js` (stage order from `BBOS_STAGES`), add `amanah_disqualifier` to `BBOS_REJECTION_REASONS`, and run `npm test`.
**Gate:** The new tests pass, and every pre-existing test passes or was changed deliberately with the reason stated.

### Phase 2 — Banner + Halt in both dashboards (`ux-engine:feedback-and-affordance`, then `ux-engine:ux-reviewer` agent)
- [ ] 2.1 Shared copy: the banner reads the late gate result (name, reasons, cite) and does not re-word it.
- [ ] 2.2 Pipeline dashboard (`BbosPipelineDashboard.jsx` + CSS): a `role="alert"` banner above the stage views with a Halt button that opens the Brief on the current stage, Halt pre-chosen with reason `amanah_disqualifier`. `BbosApprovalBrief` takes an optional initial decision/reason.
- [ ] 2.3 Legacy (`BbosFullDashboard.jsx` + CSS): the same banner beside the rejection banner. Its Halt opens the existing Reject modal with `amanah_disqualifier` selected, reachable on any stage filter while the banner shows.
- [ ] 2.4 Update the CONTEXT.md files (`src/data/bbos/`, `src/components/bbos/`).
**Gate:** Both dashboards render the banner only when the condition holds. The ux-reviewer findings are applied or listed.

### Phase 3 — Verify (`superpowers:verification-before-completion`)
- [ ] 3.1 `npm test`, `npm run lint` and `npm run build` are green.
- [ ] 3.2 Preview: set a fixture project to STR with Q5=yes, then screenshot the banner in both dashboards, the Brief's Proceed locked, the legacy Confirm disabled, and Halt pre-selecting the reason (open the modal and cancel; do not halt). Restore the fixture afterwards.
**Gate:** All green, and screenshots confirm each case. If the screenshot tool fails, say so.

### Phase 4 — Wiki + PR
- [ ] 4.1 Write `wiki/decisions/2026-10-20-bbos-late-disqualifier.md`, an amendment line on the named-gates decision ("Known limits": the first limit is closed by the new decision), a `wiki/entities/bbos-pipeline.md` History row, a `wiki/index.md` entry, and a `wiki/log.md` entry prepended after the frontmatter.
- [ ] 4.2 Commit, push, and open PR B to main, noting that it is stacked on PR A. Bind it with ccd_pr.
**Gate:** Session complete when PR B is open with green local checks.

---

## Definition of Done
With a ★ YES on CRD-FP02 and the project at any stage after CRD:
- both dashboards show the banner;
- the Brief's Proceed and the legacy Confirm are locked;
- `advanceBbosStage` and `startNewBbosCycle` refuse, proven by tests;
- Halt is offered with the Amanah reason pre-selected;
- there is no override, and nothing in the gate log is edited.

Tests, lint and build are green, the screenshots are taken, the wiki decision and log entry are written, and PR B is open (with PR A landing #72).

Checked against the Objective: "A PR (based on feat/bbos-ic-per-asset, or main if #71/#72 merged) adding the late-disqualifier banner: a ★ Amanah Gate disqualifier (CRD-FP02 Q3/Q5/Q8) answered YES after CRD shows a banner on every later stage in both dashboards, holds Advance through gateMoveRefusal, and offers Halt — no override; with tests, a wiki decision and a log entry."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
