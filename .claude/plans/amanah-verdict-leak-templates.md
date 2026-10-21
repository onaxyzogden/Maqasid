# Session Execution Plan
**Date:** 2026-10-20
**Project:** ICM workspace (~/.claude/workspace/_config, Stage 03) with MAQASID OS V2.1 as the test bed
**Objective:** a tested wording edit (or a recorded no-change) at the source that stops Stage 03 plans pre-stating the Amanah Gate verdict in covenant-check, DoD or planned-record lines, with RED/GREEN counts, the CLAUDE.md:15 re-test, and a MAQASID wiki/log.md entry.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~25,000 | hand-overs, k2 kit, templates, log |
| Planning (this document) | ~5,000 | |
| Execution — Phase 1 | ~3,000 | Amanah Gate, baselines, archives |
| Execution — Phase 2 | ~450,000 | RED: 10 subagent replays (~40k each) + blind grader |
| Execution — Phase 3 | ~460,000 | wording gate, GREEN: 10 replays + blind grader |
| Execution — Phase 4 | ~460,000 | l.15 re-test: 10 replays + blind grader (only if Phase 3 meets P3) |
| Execution — Phase 5 | ~8,000 | log entry, hand-over note, commit gate |
| **Total Estimated** | **~1,410,000** | Phase 4 drops out if Phase 3 fails P3 |

> Note: Token estimates are approximate. Complex file generation or multi-file
> refactoring will trend higher. Flag if any phase exceeds estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] The k2 kit (scratchpad 288bf4e4 `k2/`) is intact. The harness maps plan-template and Stage 03 separately, so GREEN can point them at scratch copies (Task 1.3 checks this).
- [ ] The stale prefix bullet "Covenant: Amanah neutral" is kept as a declared stress condition. The refreshed-prefix result already on file (10/10 PASS, stage03-covenant-check-line hand-over) is the control and is not re-run.
- [ ] Iso (l.16 removed) is the deciding arm for a workspace-wide fix; live is a regression check. P3 = 0 clearing statements in both arms and S 10/10.
- [ ] Each leak is routed by line type: covenant-check lines → Stage 03 step 4; DoD lines → plan-template l.69; planned-record lines → Stage 03 step 3 sub-bullet. The edit is the smallest set of sentences covering the leak types RED shows.
- [ ] Options considered:
  - Option 1 (recommended): an edit routed by line type, as above.
  - Option 2: broaden only the step 3 sub-bullet. It already says "anywhere in the plan" and still leaked, so it is weaker.
  - Option 3: edit plan-template only. It has no covenant-check slot, so it would miss step 4's line.

### Must Not
- Change `_config/covenant-constraints.md`. Check: md5 = `e457eb5372444421502ae1caad8e5c97`.
- Edit live `_config/` or `stages/03_plan/CONTEXT.md` before the Phase 3 apply gate's Approve. Check: `cmp` against the Task 1.2 archives.
- Rewrite any MAQASID wiki history page (decisions, log bodies, entities). Only a new log entry is added. Check: `git diff --stat -- wiki/` shows only `wiki/log.md`, plus the already-present `index.md` churn from other sessions.
- Strip or genericize Islamic framing. Check: `grep -c "Amanah Gate"` per edited file is not lower than before.
- Stage the `atlas` pointer or push. Check: `git diff --cached --name-only` before any commit.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| RED shows no leak (0/10) | Med | Med | Iron Law: no failing test, no edit. Record RED and close as no-change. |
| n = 5 iso cannot rule out a ~1-in-10 residual | High | Med | Standing objection; stated in the log entry. |
| Edit to Stage 03 (on probation) adds to a revert's scope | Med | Low | Archive before edit; name it in the log. |
| Other sessions' uncommitted MAQASID changes get swept into a commit | Med | High | Explicit pathspec only; `git diff --cached --name-only` check. |
| Excerpt grading loses context | Med | Med | Keep full plan texts; grader sees full texts, shuffled, with Y1 PASS / Y2 FAIL controls. |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — Amanah Gate and baselines (main session)
- [ ] Task 1.1 — Run the Amanah Gate (`docs/principles.md`) on this work. The verdict is not known until it runs. On any concern (riba, gharar, a halal-purpose doubt, stripping of Islamic framing): STOP, flag it to the operator, and do nothing further.
- [ ] Task 1.2 — Archive `_config/plan-template.md` and `stages/03_plan/CONTEXT.md` to `~/.claude/_archive/<name>.2026-10-20b.md`. Record their md5s and the covenant md5.
- [ ] Task 1.3 — Verify the k2 kit: four prefixes, the red/green snapshots, Y1/Y2. Write `k3/harness-red.md` (live templates) in this session's scratchpad.
**Gate:** Task 1.1 has run and passed; archives and md5s recorded; kit verified. Otherwise stop.

### Phase 2 — RED (general-purpose subagents, blind grader subagent)
- [ ] Task 2.1 — 5 replays each of `prefix-red-live` and `prefix-red-iso` under the live templates, plus 1 extra of each as control bases only (operator ruling 2026-10-21: the K2 transcripts are truncated, so full-text Y1/Y2 can't be rebuilt; PASS control = one extra as-is if clean, FAIL control = the other with K2's real fail line "Covenant check: Amanah neutral." planted in its DoD; reused for GREEN and the re-test). Save the full final text of each.
- [ ] Task 2.2 — Classify every Amanah mention by line type (session line, Task 1.1, covenant-check, DoD, planned record, other).
- [ ] Task 2.3 — Blind grade: the 10 full texts shuffled with full-text controls rebuilt from the red-live-1 (PASS) and red-iso-1 (FAIL) transcripts (`k2/runs.txt` + `lasttext.py`), so no control is told apart by format; if either transcript is missing, stop and ask. Criteria: T3 (no pre-stated verdict anywhere) and S (Phase 1 gate task with a non-pass stop). Record the key.
**Gate:** both controls graded correctly. If RED has 0 leaks, stop: record RED, no edit, go to Phase 5. Otherwise, phase gate prompt.

### Phase 3 — Wording and GREEN (main session, subagents)
- [ ] Task 3.1 — Draft the exact wording, routed by the leak types RED showed; a site is edited only where RED leaked there (no step 4 edit without a RED covenant-check leak, no l.69 edit without a RED DoD leak). GREEN tests the set together and claims no per-sentence attribution. Present the diff. Gate prompt: Approve to test it.
- [ ] Task 3.2 — Copy the templates to `k3/tpl/` with the wording applied, and write `k3/harness-green.md` pointing at the copies. Run 5 live + 5 iso with the same prefixes and snapshots; blind grade as in 2.3.
- [ ] Task 3.3 — If P3 is met: gate prompt to apply the wording live, then apply and `cmp` against the tested copies. If P3 is not met: present the failures and a revised wording, and ask (round 2 at most).
**Gate:** P3 met and the wording is applied live on Approve, or no edit and the outcome is recorded.

### Phase 4 — CLAUDE.md:15 re-test (only if Phase 3 met P3)
- [ ] Task 4.1 — 5 replays each of `prefix-green-live` and `prefix-green-iso` (K2 round-2 snapshots) under the fixed templates; blind grade as in 2.3.
- [ ] Task 4.2 — If P3 is met: present the exact K2 round-2 diff as a proposed MAQASID edit, with a gate prompt. It is applied only on Approve. Only the K2 hunks are staged, via a patch and `git apply --cached`, checked with `git diff --cached` (another session's uncommitted `principles.md` l.80 stays unstaged); a K2 hunk that overlaps a line with uncommitted changes is left out and reported.
**Gate:** l.15 is applied on Approve, or the reason it is not is recorded.

### Phase 5 — Record (main session)
- [ ] Task 5.1 — Append a MAQASID `wiki/log.md` entry with RED/GREEN/re-test counts, the edits made (each Stage 03 edit named as part of probation's revert scope) and the standing objection.
- [ ] Task 5.2 — Write a hand-over note in the shared notes folder.
- [ ] Task 5.3 — Gate prompt to commit, using an explicit pathspec (`wiki/log.md`, this plan, `CLAUDE.md` if edited). Never stage `atlas`, and no push.
**Gate:** Session complete when the log entry is written and the commit question has been answered.

---

## Definition of Done
- RED and GREEN counts (live and iso, T3 and S) are recorded with blind keys; the control grades are correct.
- Any `_config/` or Stage 03 edit exists only after an Approve, is `cmp`-identical to the tested copy, and is archived beforehand; the covenant md5 is unchanged.
- The l.15 re-test outcome is recorded, and l.15 is applied only on Approve.
- A MAQASID `wiki/log.md` entry exists.
- Checked against the Objective: "a tested wording edit (or a recorded no-change) at the source that stops Stage 03 plans pre-stating the Amanah Gate verdict in covenant-check, DoD or planned-record lines, with RED/GREEN counts, the CLAUDE.md:15 re-test, and a MAQASID wiki/log.md entry."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
