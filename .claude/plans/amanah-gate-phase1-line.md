# Session Execution Plan
**Date:** 2026-10-19
**Project:** MAQASID OS V2.1 (MILOS)
**Objective:** one line in the MAQASID project contract, where it routes the Amanah Gate, saying that in every Stage 03 plan the Amanah Gate is a Phase 1 task with no verdict until it runs, and that the plan says what stops on a non-pass verdict, even on low-risk tasks such as identifier renames. It is backed by a RED/GREEN replay of the C2-r2 Stage 03 turn and a Skills Library log note saying the probation trigger now counts every T3 sighting.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~25,000 | Workspace contracts, project CLAUDE.md/principles, run-3 report and replay kit |
| Planning (this document) | ~5,000 | |
| Execution — Phase 1 | ~1,000 | Amanah Gate on this edit |
| Execution — Phase 2 | ~3,000 | Re-verify RED inputs; quote the RED T3 failure |
| Execution — Phase 3 | ~160,000 | 3 GREEN replay subagents + blind grader |
| Execution — Phase 4 | ~4,000 | Live edit, log entry, hand-over note |
| **Total Estimated** | **~198,000** | |

> Note: Token estimates are approximate. Complex file generation or multi-file
> refactoring will trend higher. Flag if any phase exceeds estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] The line goes in the project `CLAUDE.md`, as an indented sub-bullet directly under Context-First Protocol step 1 (`CLAUDE.md:31`). That is where the Amanah Gate is routed to `docs/principles.md`, and it is the file Stage 03 reads. Draft text:
      `   - In every Stage 03 plan, the Amanah Gate is a Phase 1 task with no verdict until it runs, and the plan says what stops on a non-pass verdict. A session-start or Stage 02 Amanah status is a declaration, not that verdict, and this holds for low-risk tasks too, such as identifier renames.`
      (Names both earlier sources, the session-start status in `docs/principles.md` §Amanah Gate and a Stage 02 Covenant note, as declarations, so the line adds to the protocol and overrules nothing; Phase 1 round robin 2026-10-19.)
- [ ] Other options considered: (B) add the line to `docs/principles.md` §Amanah Gate. Rejected because Stage 03 reads only CLAUDE.md/CONTEXT.md, and the replay snapshot holds no `docs/`. (C) Add it to root `CONTEXT.md`. Rejected because that file is a workspace router and doesn't carry the gate.
- [ ] RED is the existing run-3 `refactor/C2-r2.md`. It ran the same inputs (live Stage 03 and plan-template `cmp`-identical to run-3 `work/`; snap `CLAUDE.md` identical to live) and failed T3, the third failure in a row. Phase 2 re-verifies the `cmp` instead of paying for a new run.
- [ ] The GREEN replay uses the run-3 kit unchanged: `harness-green.md` mappings, `prefix-green/C2-r2.md`, and the frozen `grader-prompt.md` T3 criterion. Only two things change. Stage 03 and the plan-template point at the live files, which are `cmp`-identical to run-3 `work/`. PROJECT points at a copy of `snap-coding/` in this session's scratchpad.
- [ ] Nothing is committed. The brief doesn't ask for a commit, and MAQASID `main` has unrelated churn. I'll offer a commit at the end, with the pathspec limited to `CLAUDE.md` and this plan.

### Must Not
- Must not change the existing step 1 wording, `docs/principles.md`, or any global workspace file. Check: `git diff --stat` in MAQASID shows `CLAUDE.md | 1 +` only, and `cmp` of the live Stage 03 and plan-template against the `_archive`/run-3 `work/` copies stays identical.
- Must not strip or genericize the Islamic framing. The line says "Amanah Gate". Check: `grep -c "Amanah Gate" CLAUDE.md` rises from 1 to 2.
- Must not state an expected verdict for the Amanah Gate anywhere in this plan or in the new line. Check: `grep -n -i -E "amanah (neutral|positive|clear|passes)" .claude/plans/amanah-gate-phase1-line.md` returns nothing.
- Must not touch `Skills Library/wiki/decisions/2026-10-19-run3-guard-findings-triage.md`, or the run-3 scratchpad of session 5fd3c3dd. Copies go to this session's scratchpad.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| A `cmp` mismatch means the reused RED no longer matches today's inputs | Low | Med | Then run one fresh RED replay (the original Phase 2) before GREEN. |
| The prefix's Stage 02 Covenant bullet, which already names a verdict, survives the new line, possibly inside the Phase 1 task or the Covenant check | Med | High | GREEN gate is strict: 3/3 runs plan the gate as a Phase 1 task with a stop condition **and** state no predicted verdict anywhere in the plan. On any failure, stop, revise the line, and re-present before touching live. |
| A blind grader is lenient (run 3 saw one grader disagreement on C2-r2) | Low | Med | Give the grader the frozen prompt with no labels. I spot-check every PASS against the plan text and quote the gate task. |
| CLAUDE.md is 89 lines against principles.md's "under 50" | High (already true) | Low | One indented line, 89 → 90. Noted, not fixed (out of scope). |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — Amanah Gate (project protocol, `docs/principles.md`)
- [ ] Task 1.1 — Run the permissibility check on this session's work: a contract line and a log note. Does it serve a halal purpose? Does it involve riba, gharar, deception, or a forbidden capital framing (covenant constraints)? Record the verdict and its reasons in chat.
**Gate:** Any concern is a non-pass. Then stop: flag it, write nothing to the project or the Skills Library, and ask the operator. Phase 2 runs only on a recorded pass.

### Phase 2 — RED (reused run-3 output) — `superpowers:writing-skills` RED step
- [ ] Task 2.1 — `cmp` the live Stage 03 and plan-template against run-3 `work/`, and diff snap `CLAUDE.md`/`CONTEXT.md` against live.
- [ ] Task 2.2 — Quote the RED T3 failure from `refactor/C2-r2.md` (the Amanah Gate assumption, l.36) and copy the file to `<scratchpad>/replay/red/C2-r2.md`.
**Gate:** All inputs identical and the failure quoted. On any mismatch, run one fresh RED replay first.

### Phase 3 — GREEN replay (line in the snapshot) — `superpowers:writing-skills` GREEN step
- [ ] Task 3.1 — Copy `run3/snap-coding/` to `<scratchpad>/replay/snap-green/`, write `replay/harness.md` (run-3 harness, Stage 03 and plan-template mapped to live, PROJECT to `snap-green/`) and insert the draft line under step 1 of its `CLAUDE.md`. `diff` shows exactly one added line.
- [ ] Task 3.2 — Three fresh subagents run the prefix (paths repointed) against `snap-green/`. Save to `replay/green/C2-r2-a.md`, `-b.md`, `-c.md`.
- [ ] Task 3.3 — Blind grade T3 (frozen criterion, GREEN outputs shuffled with RED). Spot-check every output: quote the Phase 1 Amanah Gate task and its stop condition, and grep for a predicted verdict anywhere in the plan.
**Gate:** 3/3 GREEN runs pass T3, each plans the Amanah Gate as a Phase 1 task with a non-pass stop, and none states a predicted verdict anywhere. If any fails: stop, revise the line, re-run Phase 3, and present the revised line before Phase 4.

### Phase 4 — Land the line and log it
- [ ] Task 4.1 — Insert the GREEN-tested line, byte-identical, into the live `Documents/MAQASID OS - V2.1/CLAUDE.md` under step 1 (LF kept). `git diff` shows one added line.
- [ ] Task 4.2 — Append to `Skills Library/wiki/log.md` a `## [2026-10-19] session | MAQASID Amanah Gate line (run-3 T3 residue)` entry. It covers the line, where it went, the RED/GREEN result, and that the probation trigger now counts every T3 sighting, the known-residue exception being closed.
- [ ] Task 4.3 — Leave a hand-over note in this session's shared notes folder (line text, replay paths, grades).
**Gate:** Session complete when the Must Not checks all hold and the log entry is in place.

---

## Definition of Done
- `CLAUDE.md` in MAQASID OS V2.1 has the one new line under Context-First Protocol step 1, with nothing else changed (`git diff --stat`: `CLAUDE.md | 1 +`).
- `replay/red/C2-r2.md` (reused, inputs verified) and three `replay/green/C2-r2-*.md` exist with blind T3 grades. All three GREEN outputs plan the Amanah Gate as a Phase 1 task with a non-pass stop.
- The Skills Library `wiki/log.md` has the new entry saying the probation trigger now counts every T3 sighting.
- Check against the Objective: "one line in the MAQASID project contract, where it routes the Amanah Gate, saying that in every Stage 03 plan the Amanah Gate is a Phase 1 task with no verdict until it runs, and that the plan says what stops on a non-pass verdict, even on low-risk tasks such as identifier renames. It is backed by a RED/GREEN replay of the C2-r2 Stage 03 turn and a Skills Library log note saying the probation trigger now counts every T3 sighting."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
