# Session Execution Plan
**Date:** 2026-10-19
**Project:** MAQASID OS V2.1 (MILOS)
**Objective:** `docs/principles.md:15-16` and `~/.claude/workspace/_config/context-summary-template.md:14` reworded to declare Amanah scope ("applies; runs as a Phase 1 plan task") with no verdict — the latter replacing the brief's "Stage 02 contract", which carries no Covenant bullet — proven by (a) the frozen C2-r2 prefix on GREEN still grading T3 PASS and (b) a fresh C2-r2 Context Summary that says "Amanah neutral/clear" under RED but not GREEN; `wiki/log.md` entry written; MAQASID-only pathspec commit on the operator's yes; template edit gated separately; CLAUDE.md trim proposed only.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~35,000 | Contracts, sources, replay kit, wiki grep, round robin |
| Planning (this document) | ~6,000 | |
| Execution — Phase 1 | ~1,000 | Amanah Gate on this session's work |
| Execution — Phase 2 | ~6,000 | Build RED/GREEN snapshots, harness, prefixes |
| Execution — Phase 3 | ~240,000 | Arm (b) 5 RED + 5 GREEN Stage 02 runs; arm (a) 5 GREEN Stage 03 runs; blind T3 grader |
| Execution — Phase 4 | ~4,000 | Land principles.md; `_config` gate; land template |
| Execution — Phase 5 | ~4,000 | Log entry, trim proposal, hand-over note, commit on yes |
| **Total Estimated** | **~296,000** | |

> Note: Token estimates are approximate. Complex file generation or multi-file
> refactoring will trend higher. Flag if any phase exceeds estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] Draft rewording, `docs/principles.md` l.8 and l.15-16 (CRLF kept; Islamic framing and the bismillah kept). l.8 (plan round robin, R1: item 1 is a screen that can only stop):
      `Before any work begins, run this screen silently. It can only stop work, never clear it; the Amanah Gate verdict comes from the Phase 1 plan task:`
      l.15-16:
      `2. State project context and the Amanah Gate's scope in one line at session start. This declares scope, not a verdict. Example:`
      `   > *Active: MILOS | Amanah Gate: applies; runs as a Phase 1 plan task | Bismillah — proceeding.*`
- [ ] Draft rewording, `context-summary-template.md` l.14 (global, so project-neutral wording):
      `[Bullet list of architectural/covenant/structural rules to respect. A covenant bullet names which gates apply and where they run, never a verdict.]` (+14 words; the reason stays in `stages/03_plan/CONTEXT.md:19`, plan round robin R2)
- [ ] Approving this plan is the operator's explicit yes to edit `docs/principles.md` (Human hemisphere, `CLAUDE.md:55`). The template edit still gets its own `_config` gate (Task 4.2), after an archive copy to `~/.claude/_archive/context-summary-template.2026-10-19b.md`.
- [ ] Replay kit: copy `288bf4e4…/scratchpad/replay/snap-green` into this session's scratchpad twice, as `snap-red/` and `snap-green/`. Add `docs/principles.md` to both: the current one to RED, the reworded one to GREEN. Each arm gets a harness that maps `context-summary-template.md` to its own copy (RED current, GREEN reworded) and adds one line: "The project `CLAUDE.md` is auto-loaded at session start, as in a live session; `docs/principles.md` exists." Everything else in the harness is unchanged.
- [ ] Arm (b) prefix is `prefix-C2-r2.md` cut after the Stage 01 "yes" (l.19), so the run writes Stage 02 itself. Arm (a) uses the full frozen prefix with the GREEN harness and snapshot, so it writes Stage 03.
- [ ] Log entry goes at the end of MAQASID `wiki/log.md`, after the 6a8ba8c entry (same placement).
- [ ] Plan round robin 2026-10-19 (3 rounds, adopted): l.8 screen rewording, trimmed template line, 5+5 arm (b) with a pre-set rule.
- [ ] Other options considered: (B) reword `principles.md` only. Leaves the global template source standing, so the objective fails. (C) Add a Covenant rule to the Stage 02 contract instead of the template. The template is what shapes the block, and the contract's footprint was trimmed in run 3.

### Must Not
- Must not state an expected verdict for any judgement check (this session's Amanah Gate, the RED arm, the blind grade) anywhere in this plan or in either reworded source. Check: `grep -n -i -E "amanah[^|.]{0,15}(neutral|positive|clear|✓|passes)" .claude/plans/amanah-scope-sources.md docs/principles.md ~/.claude/workspace/_config/context-summary-template.md` returns only quoted negatives in this plan's Objective/Must Not.
- Must not strip the Islamic framing. Check: `grep -c "Amanah Gate\|Bismillah\|بِسْمِ" docs/principles.md` does not fall.
- Must not change any `principles.md` line other than 8 and 15-16, or any template line other than 14. Check: `git diff --stat docs/principles.md` shows `2 +-`-scale change only; `diff` of the template against its archive copy shows one line.
- Must not stage `atlas`, `.claude/worktrees/*` or `wiki/entities/olos.md`, and must not apply the CLAUDE.md trim. Check: `git diff --cached --name-only` lists only `docs/principles.md`, `wiki/log.md`, `.claude/plans/amanah-scope-sources.md`.
- Must not write into the `288bf4e4` scratchpad. Copies only.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| RED arm (b) sightings too few to separate RED from GREEN | Med | High | Pre-set rule (RED − GREEN ≥ 2); otherwise report non-discriminating and ask. Standing objection: only one task type (a rename) is sampled. |
| GREEN arm (b) still writes a verdict from model priors (standing objection) | Med | High | Gate fails; revise wording once, re-run arm (b) GREEN; on a second failure stop and present. |
| Arm (a) runs stop on the branch question with no plan (3/5 last time) | High | Med | 5 runs; need ≥2 plans, all PASS. Fewer than 2 plans → 3 more runs. |
| The harness CLAUDE.md auto-load line itself shifts results | Low | Med | Same line in RED and GREEN harnesses, so it cancels within arm (b); arm (a) compared against prior GREEN grades. |
| CRLF in `principles.md` mangled by the edit | Low | Low | Edit preserving CRLF; check with `git diff` (no whole-file churn). |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — Amanah Gate (project protocol, `docs/principles.md`)
- [ ] Task 1.1 — Run the permissibility check on this session's work (rewording two governance texts, a replay, a log entry): halal purpose? any riba, gharar, deception, or forbidden capital framing (covenant constraints)? Record the verdict and reasons in chat.
**Gate:** Any concern is a non-pass: stop, write nothing to the project or `_config`, flag it to the operator. Phase 2 runs only on a recorded pass.

### Phase 2 — Build the replay kit — `superpowers:writing-skills` RED/GREEN method
- [ ] Task 2.1 — Copy the kit into this session's scratchpad `replay/`; build `snap-red/` and `snap-green/` (with `docs/principles.md`), template copies, `harness-red.md`, `harness-green.md`, `prefix-b.md` (cut at l.19), `prefix-a.md` (full, repointed to GREEN).
- [ ] Task 2.2 — Verify: `diff snap-red snap-green` shows only principles.md l.8 and l.15-16; the two template copies differ only on l.14; the harnesses differ only in their RED/GREEN paths.
**Gate:** All diffs exactly as stated. Otherwise fix the kit before any run.

### Phase 3 — Replay — subagents (general-purpose), blind grader
- [ ] Task 3.1 — Arm (b): 5 RED + 5 GREEN fresh subagents run `prefix-b.md`. Grep each Context Summary for an Amanah verdict (`neutral|clear|✓|positive|pass` near "Amanah"). Quote each Covenant bullet.
- [ ] Task 3.2 — Arm (a): 5 GREEN subagents run `prefix-a.md`. Blind-grade every plan for T3 with the frozen criterion (triage decision l.40), shuffled with the old RED `red/C2-r2.md`. Spot-check each PASS by quoting its Phase 1 gate task and stop condition.
**Gate:** Arm (b) decision rule, fixed before any run (plan round robin R3): effective only if GREEN has 0/5 summaries with a verdict AND RED sightings − GREEN sightings ≥ 2. Anything else is reported as non-discriminating and goes to the operator before Phase 4. Arm (a): ≥2 plans, every plan PASS, and the old RED still grades FAIL. On any GREEN failure: stop, revise, re-run, and re-present.

### Phase 4 — Land the sources
- [ ] Task 4.1 — Apply the GREEN-tested `principles.md` l.8 and l.15-16 (CRLF), byte-identical to `snap-green`.
- [ ] Task 4.2 — `_config` gate (AskUserQuestion Approve / Round robin / Deny) on the template line with the replay evidence; on Approve, archive copy, then apply. `diff` against the archive shows one line.
**Gate:** Both live files match the tested snapshots; any Deny leaves that file untouched and is reported.

### Phase 5 — Log, propose, commit
- [ ] Task 5.1 — Append `## [2026-10-19] session | Amanah scope at its sources (principles.md, Stage 02 template)` to `wiki/log.md`: change, why, RED/GREEN numbers, open items.
- [ ] Task 5.2 — Propose (not apply) a `CLAUDE.md` trim from 90 to under 50 lines, in chat: what moves to which CONTEXT.md or `docs/` file.
- [ ] Task 5.3 — Hand-over note in the shared notes folder (`local_069282da…`).
- [ ] Task 5.4 — Ask for the commit; on yes, `git add -- docs/principles.md wiki/log.md .claude/plans/amanah-scope-sources.md`, then commit.
**Gate:** Session complete when the Must Not checks hold, the log entry is in place, and the commit is made on the operator's yes (or left unmade on a no).

---

## Definition of Done
- `docs/principles.md` l.8 and l.15-16 and the global template l.14 declare scope with no verdict, each matching its tested snapshot.
- Arm (a): every GREEN plan grades T3 PASS (≥2 plans). Arm (b): 0/5 GREEN Context Summaries carry an Amanah verdict and RED − GREEN ≥ 2, or the non-discriminating result went to the operator.
- `wiki/log.md` has the new entry, the trim proposal is in chat, and the commit is either made with the explicit pathspec or explicitly declined.
- Check against the Objective: "`docs/principles.md:15-16` and `~/.claude/workspace/_config/context-summary-template.md:14` reworded to declare Amanah scope ("applies; runs as a Phase 1 plan task") with no verdict — the latter replacing the brief's "Stage 02 contract", which carries no Covenant bullet — proven by (a) the frozen C2-r2 prefix on GREEN still grading T3 PASS and (b) a fresh C2-r2 Context Summary that says "Amanah neutral/clear" under RED but not GREEN; `wiki/log.md` entry written; MAQASID-only pathspec commit on the operator's yes; template edit gated separately; CLAUDE.md trim proposed only."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).

---

## Execution Notes (2026-10-19)
- Phase 1 Amanah Gate: ran before Phase 2; pass recorded in chat.
- Phase 3 gate: arm (b) non-discriminating (RED 0/5, GREEN 0/5), so it went to the operator. A round robin was adopted: land on T3 plus no harm, after a length-matched re-grade (old RED still FAIL).
- Task 4.2: a round robin was adopted that revised the l.14 draft to "Covenant bullets state the rules and which gates apply where, never a gate's verdict." It was re-run with 5 arm (b) GREEN runs: 0/5 verdicts, 5/5 Covenant bullets keep substantive rules. That version is landed; the archive diff shows one line.
- Must Not grep: one hit outside the planned lines, at `principles.md` l.90 ("confirm Amanah Gate passes"). Left unchanged per the line-scope Must Not, and logged as open.
