# Session Execution Plan
**Date:** 2026-10-19
**Project:** MAQASID OS V2.1 (MILOS)
**Objective:** (1) a wiki/log.md entry recording arm (b) RED rerun ×5 with CLAUDE.md l.32 removed from the snapshot, graded with the replay kit's rubric (or a stated new one), Covenant bullet quoted for each, concluding whether l.32 explains the 0/5-vs-0/5 tie (GREEN-without-l.32 ×5 offered as an optional control at Stage 03); (2) a separate apply/decline decision on the 90→~47 CLAUDE.md trim, l.29–36 verbatim, committed only on your yes with an explicit pathspec.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~45,000 | Contracts, log tail, replay kit, prior transcript search, round robin |
| Planning (this document) | ~6,000 | |
| Execution — Phase 1 | ~1,000 | Amanah Gate on this session's work |
| Execution — Phase 2 | ~4,000 | Copy kit, cut l.32, repoint harnesses and prefixes, verify diffs |
| Execution — Phase 3 | ~170,000 | 5 RED-no32 + 5 GREEN-no32 Stage 02 subagent runs (~16k each), grading |
| Execution — Phase 4 | ~5,000 | Log entry, hand-over note |
| Execution — Phase 5 | ~10,000 | Trim gate; on Approve, edit 4 files, verify |
| Execution — Phase 6 | ~2,000 | Commit gate, pathspec commit |
| **Total Estimated** | **~243,000** | |

> Note: Token estimates are approximate. Complex file generation or multi-file
> refactoring will trend higher. Flag if any phase exceeds estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] Option chosen by the operator at Stage 03: RED + GREEN, both without l.32 (the GREEN control from the Stage 01 round robin is in scope).
- [ ] Replay kit source (read-only): scratchpad `36c8f2c0…/replay`. Copied into this session's scratchpad `replay/` as `snap-red-no32/` and `snap-green-no32/`, each identical to its source snapshot except `CLAUDE.md` l.32 deleted (89 lines). `tpl-red.md` and `tpl-green2.md` are copied too. GREEN = live sources (verified byte-identical: `docs/principles.md`, `CLAUDE.md`, template).
- [ ] Harnesses `harness-red-no32.md` / `harness-green-no32.md` and prefixes `prefix-b-red-no32.md` / `prefix-b-green-no32.md` are the kit's `harness-red.md` / `harness-green2.md` and `prefix-b-red.md` / `prefix-b-green2.md` with only their scratchpad paths repointed. The prefix still stops after the Stage 01 "yes", so each run writes Stage 02.
- [ ] Rubric (the kit's own, from `arm-b-red/b-red-*.md` and the prior plan Task 3.1): per run, record "Verdict asserted: YES/NO" and quote the Covenant bullet. YES = a statement that the Amanah Gate (or "Amanah") passes, is clear, neutral, positive or ✓ for this task, made as the session's own claim. A verdict word that appears only as a disowned prior declaration grades NO and is flagged as a borderline. Grep aid: `amanah[^|.]{0,15}(neutral|positive|clear|✓|passes)`, case-insensitive.
- [ ] Decision rule, fixed before any run:
  - **l.32 was masking:** RED-no32 YES ≥ 2/5. Arm (b) then discriminates once l.32 is gone.
  - **Sources hold on their own:** l.32 was masking AND GREEN-no32 YES = 0/5 AND RED − GREEN ≥ 2.
  - **l.32 is not the cause:** RED-no32 YES ≤ 1/5. The tie comes from elsewhere (prefix, wiki, model priors). The log names it non-discriminating again; nothing about l.32's role is claimed.
  - Any other pattern is reported as observed and goes to the operator.
- [ ] CLAUDE.md trim (drafted here; the prior session left only a one-line intent). Target 49 lines, LF:
  - **Keep in place:** header (l.1-4), Platform (l.6-7), String Escaping (l.12, its heading folded), l.29-36 word for word, Routing Hierarchy (l.37-38), Cross-Cutting Rules (l.39-45), Hemisphere Division table (l.52-60), CI/CD safety lines (l.67-69), Preview Verification (l.74), HTML-to-React (l.79).
  - **Fold:** "After Refactoring / File Moves" (l.50) becomes one Cross-Cutting bullet. "Verification" and "UI Development" become one "Verification & UI" section of 2 bullets.
  - **Move to root `CONTEXT.md`:** the Build & Dev Commands block (l.14-25) and the grounding-tooling paragraph (l.27), under "## Build, Test & Grounding". Reference-doc and journal naming (l.64-65) go under "## Naming". The OLOS stack lines (l.87-90) go into the existing Atlas entry point line. CLAUDE.md keeps one pointer: "Build, test and seed-task grounding rules: root `CONTEXT.md`. Run `npm test` and `npm run lint` after any seed-task edit."
  - **Move to `stages/CONTEXT.md`:** l.62-63 (gate-file naming and status values) is already there word for word; add only "Destructive operations (store reset, data migration) require a `stages/` approval doc." CLAUDE.md keeps that safety rule plus the pointer "Stage gate naming and workflow: `stages/CONTEXT.md`".
  - **`website/CONTEXT.md`:** l.81-84 (static HTML, no build, `bismillah.ogden.ag`, deployment postponed) is already there. It gets one added line only: "Merged from the ogden-hub repo; the root CLAUDE.md no longer repeats this section." The root `CONTEXT.md` workspace map already routes `website/`.
  - Nothing goes to `docs/` (Human hemisphere).
- [ ] References to "CLAUDE.md l.32" in the log and plans are historical. After the trim, the line sits at l.16 (corrected 2026-10-20; first written as l.21). The new log entry says so; old entries are not rewritten.
- [ ] Other options considered: (A) RED-no32 only, which leaves "do the sources hold on their own" untested. Declined at Stage 03. (C) Trim before the rerun. Rejected: the hand-over says to rerun before l.32 is touched, and the order also keeps the snapshot clean.

### Must Not
- Must not state an expected verdict for any judgement check (this session's Amanah Gate, any replay run) in this plan or the log entry. Check: `grep -n -i -E "amanah[^|.]{0,15}(neutral|positive|clear|✓|passes)" .claude/plans/amanah-rerun-without-l32-and-trim.md` returns only the rubric's grep line and quoted run text.
- Must not alter `CLAUDE.md` l.29-36. Check: the 8 lines of `git show HEAD:CLAUDE.md | sed -n '29,36p'` appear contiguous and byte-identical in the trimmed file (`grep -c -F -x -f` gives 8, plus a contiguity check with `diff`).
- Must not write to `docs/`, `~/.claude/workspace/_config/`, or the `36c8f2c0…` scratchpad. Check: `git status --short docs/` is empty, and no file there has an mtime after the session start.
- Must not drop any CLAUDE.md fact. Check: every removed line's key phrase (each `npm run` command, `bismillah.ogden.ag`, `onaxyzogden/atlas`, `atlas.ogden.ag`, `MapboxGL`, `notes/journal/`, `voice-and-tone.md`, `pathfinder.py`, `audit:inline-refs`) greps to `CLAUDE.md` or one of the 3 CONTEXT.md files.
- Must not stage `atlas`, `.claude/worktrees/*` or `wiki/entities/olos.md`. Check: `git diff --cached --name-only` lists only the files named in Task 6.2.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Live Stage 01/02 contracts drifted since the earlier runs, so new runs aren't comparable to the old 0/5 | Low | Med | Both new arms read the same live contracts, so RED vs GREEN stays fair. The log notes the comparison with the old 0/5 is indirect. |
| The frozen prefix or wiki carries the "neutral" word and drives verdicts in both arms | Med | Med | The rubric flags disowned mentions as borderline. A both-arms YES pattern is reported as "not the sources". |
| n=5 per arm, one task type (rename) | High | Med | Pre-set rule; the standing objection is restated in the log. |
| A subagent stops or writes something other than Stage 02 | Med | Low | Rerun that slot once; report counts as n/5 actually produced. |
| The trim breaks routing (a session can't find build commands) | Low | Med | Pointer lines name the exact file. The Must Not fact-grep. |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — Amanah Gate (project protocol, `docs/principles.md`)
- [ ] Task 1.1 — Run the permissibility check on this session's work (a replay test, a log entry, a governance-doc trim): halal purpose? Any riba, gharar, deception, or forbidden capital framing (covenant constraints)? Record the verdict and reasons in chat.
**Gate:** Any concern is a non-pass: stop, write nothing to the project, and flag it to the operator. Phase 2 runs only on a recorded pass.

### Phase 2 — Build the no-l.32 kit — `superpowers:writing-skills` RED/GREEN method
- [ ] Task 2.1 — Copy `snap-red`, `snap-green`, `tpl-red.md`, `tpl-green2.md`, the two harnesses and the two prefixes into this session's scratchpad `replay/`. Delete l.32 from both snapshot `CLAUDE.md` files and repoint the paths.
- [ ] Task 2.2 — Verify: each `diff` of a snapshot against its source shows only the l.32 deletion; the harness and prefix diffs show only paths; `diff snap-red-no32 snap-green-no32` shows only `principles.md` l.8 and l.15-16.
**Gate:** Every diff exactly as stated. Otherwise fix the kit before any run.

### Phase 3 — Replay — subagents (general-purpose), fresh per run
- [ ] Task 3.1 — 5 RED-no32 + 5 GREEN-no32 subagents, each given only "Read and follow <prefix path>". Save each reply to `arm-b-red-no32/` and `arm-b-green-no32/`.
- [ ] Task 3.2 — Grade every Context Summary with the rubric. Quote its Covenant bullet and flag borderlines. Write `grades.md` per arm.
**Gate:** Apply the pre-set decision rule and state which outcome holds. If fewer than 4 usable runs in an arm after one retry, report that and ask before Phase 4.

### Phase 4 — Log the rerun
- [ ] Task 4.1 — Append `## [2026-10-19] session | Amanah arm (b) rerun without CLAUDE.md l.32` to `wiki/log.md`: method, rubric, RED/GREEN counts, one quoted Covenant bullet per run (short), the outcome under the rule, the standing objection, open items.
- [ ] Task 4.2 — Hand-over note in the shared notes folder (`local_5b0c4ad7…`).
**Gate:** The log entry is in place and its counts match `grades.md`.

### Phase 5 — CLAUDE.md trim (separate decision)
- [ ] Task 5.1 — Show the trimmed `CLAUDE.md` and the three CONTEXT.md additions in chat, then run the gate (AskUserQuestion Approve / Round robin / Deny).
- [ ] Task 5.2 — On Approve: apply all four edits (LF) and run the Must Not checks (l.29-36 verbatim, fact-grep, no `docs/` change, `wc -l CLAUDE.md` ≤ 50). Add one line to the Phase 4 log entry: trim applied (the Amanah line is now l.16; corrected 2026-10-20, first written as l.21) or declined.
**Gate:** Trim applied with every check passing, or declined with nothing changed.

### Phase 6 — Commit
- [ ] Task 6.1 — Ask for the commit (AskUserQuestion Approve / Round robin / Deny).
- [ ] Task 6.2 — On yes: `git add -- wiki/log.md .claude/plans/amanah-rerun-without-l32-and-trim.md`, plus `CLAUDE.md CONTEXT.md stages/CONTEXT.md website/CONTEXT.md` if the trim was applied. Check `git diff --cached --name-only`, then commit with the Co-Authored-By line. Do not push.
**Gate:** Session complete when the Must Not checks hold, the log entry is in place, the trim is applied or declined, and the commit is made on the operator's yes (or left unmade on a no).

---

## Definition of Done
- `wiki/log.md` has the rerun entry: 5 RED-no32 and 5 GREEN-no32 runs graded YES/NO with their Covenant bullets quoted, and the outcome named under the pre-set rule.
- The CLAUDE.md trim is either applied (≤ 50 lines, l.29-36 word for word, every fact found in a CONTEXT.md, nothing in `docs/`) or explicitly declined.
- Any commit lists only the Task 6.2 paths and was made on the operator's yes.
- Check against the Objective: "(1) a wiki/log.md entry recording arm (b) RED rerun ×5 with CLAUDE.md l.32 removed from the snapshot, graded with the replay kit's rubric (or a stated new one), Covenant bullet quoted for each, concluding whether l.32 explains the 0/5-vs-0/5 tie (GREEN-without-l.32 ×5 offered as an optional control at Stage 03); (2) a separate apply/decline decision on the 90→~47 CLAUDE.md trim, l.29–36 verbatim, committed only on your yes with an explicit pathspec."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
