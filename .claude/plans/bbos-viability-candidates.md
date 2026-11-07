# Session Execution Plan
**Date:** 2026-11-07
**Project:** MILOS V2.1 (BBOS named gates)
**Objective:** a PR that closes the second Known limit of wiki/decisions/2026-10-19-bbos-named-gates.md, structured Viability: each candidate has its own row (name, Gates A–D, removed or cleared), a candidate that failed a letter can never appear as cleared, the existing V1/V2/V3 text stays readable and no stored text is deleted; with tests written first, lint and build green, a preview screenshot, a wiki decision and log entry.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~45,000 | Wiki, CONTEXT files, evaluator, IC model, task defs |
| Planning (this document) | ~8,000 | |
| Execution — Phase 1 | ~6,000 | Amanah Gate, repo checks, baseline test run |
| Execution — Phase 2 | ~45,000 | Data layer, test-first: helpers, evaluator, score, AI services |
| Execution — Phase 3 | ~55,000 | Editor, task panel, legacy renderer, both Named gates panels, UX review |
| Execution — Phase 4 | ~30,000 | npm test / lint / build, preview screenshots, CONTEXT.md rows |
| Execution — Phase 5 | ~15,000 | Wiki decision, amendment, entity row, log entry, commit, PR, debrief |
| **Total Estimated** | **~204,000** | |

> Note: Token estimates are approximate. Complex file generation or multi-file
> refactoring will trend higher. Flag if any phase exceeds estimate by >50%.

---

## Solution options (Stage 03 step 2)

- **Option A (recommended): one candidate list on CRD-V1.** A new `viabilityCandidates` field type (modelled on `icAssets`): `[{ name, gates: [A, B, C, D] each 'pass' | 'fail' | 'conditional' | '', note }]`. A candidate's verdict is derived from its letters and never stored: any fail → Removed; any blank → Unfinished; any conditional → Conditional; else Cleared. The evaluator judges the rows; V2 `removedNiches` and V3 `clearedCandidates` stay as free-text notes, shown and never deleted, and no longer required by the gate. The old four letter selects read as candidate 1 until the list is first edited. Skills: `superpowers:test-driven-development` (Phases 2–3), `ux-engine:form-ux` (Phase 3 editor), Agent `ux-engine:ux-reviewer` (Phase 3 end), `superpowers:verification-before-completion` (Phase 4), `superpowers:finishing-a-development-branch` (Phase 5). Why: the doc judges "per candidate"; a derived verdict is the only way a failed candidate cannot appear cleared.
- **Option B: structure V2 and V3 instead.** V2 becomes a list of `{ name, failedLetter, reason }`, V3 a list of `{ name }`, and the evaluator cross-checks names. Same skills. Why not: the letters would live in V1 for one candidate and in V2 for the others, so the record duplicates and can still disagree.
- **Option C: parse the existing V2/V3 text.** Line-by-line matching of names and letters. Why not: fragile, and a parser is a soft rule.

Option A is drafted below.

---

## Risks & Assumptions

### Assumptions
- [ ] The work lands on branch `claude/bbos-named-gates-limits-b1a7c1` in this worktree, clean at start (Task 1.2 checks; halt on mismatch).
- [ ] `npm test` is green before any change, and the count is recorded as the baseline (Task 1.3).
- [ ] The candidate rows live on CRD-V1 (Option A); V2 and V3 keep their textareas.
- [ ] A legacy project whose CRD-V1 has the four letter answers but no list reads as one unnamed candidate; its letters count, but the gate stays `incomplete` until the candidate is named, because the doc judges per candidate. The reason names the fix.
- [ ] The stored `overallViability` select stays. The evaluator derives the overall from the rows; a stored value that disagrees with the rows is `incomplete` with a reason that names both, so the record is corrected, not overridden.
- [ ] The CRD stage score keeps four letter rows; each is scored over the candidates that failed no letter (5 all pass, 3 any conditional, 0 none), falling back to the legacy fields when there is no list.
- [ ] IC-OUT, IC-OFR and IC-DEL fields, `bbos-ic-assets.js` and `BbosIcAssetsField.jsx` are not edited (another session owns them). The new helper module is separate.

### Must Not
- Edit any Factory doc or any existing `bbosGateLog` entry: `git diff --name-only` shows no file under `references/` or `docs/`, and no edit to the gate-log module.
- Add an override or soften a refusal: `grep -n -i "override\|anyway\|bypass" src/data/bbos/bbos-named-gates.js` returns only the existing "no override" comments.
- Delete or rename a stored field key: `gateARegulatory`, `gateBMarketFit`, `gateCCompetenceProof`, `gateDProvenDemand`, `gateNotes`, `overallViability`, `removedNiches`, `removalPatterns`, `clearedCandidates`, `handoffNotes` all still appear in `bbos-task-definitions.js` (`grep -c`), and no write path removes them from `bbosFieldData`.
- Touch the IC files: `git diff --name-only` shows neither `bbos-ic-assets.js` nor `BbosIcAssetsField.jsx`, and no IC key changes.
- Store a verdict: `grep -n "cleared\|removed" src/data/bbos/bbos-viability-candidates.js` shows them only as derived values, never a row property that is read back.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Existing projects' CRD Viability turns `incomplete` (unnamed legacy candidate) | High | Low | Stated assumption; the reason names the fix (name the candidate); same precedent as the 2026-10-19 consequence |
| Stage score or adapter tests break on the evaluator change | Med | Med | Tests first; run the full suite after Phase 2 before any UI work |
| AI draft returns the list in the wrong shape | Med | Low | Parser normalises through the helper, as `icAssets` does; a non-list is skipped with a warning |
| Two Named gates panels drift in wording | Med | Low | One `viabilityCandidateLine()` helper feeds both, as `icAssetLine` does |
| Preview fixture left dirty | Low | Med | Phase 4 ends by restoring the fixture project and confirming no gate-log entry was added |

> If any assumption is wrong, halt and re-plan before continuing.

### Falsifiability Checklist
1. Does every check have a pass condition that can fail? Yes: Task 1.1 (Amanah Gate: pass / flag / stop), 1.2 (branch and clean tree or halt), 1.3 (baseline count or halt), every Phase 2–3 test is red before green (2.1, 2.3, 2.6), 4.1–4.3 (exit code 0), 4.4 (screenshot shows the rows with a failed candidate marked Removed and a cleared one Cleared, else fail).
2. Is every environment or source assumption checked by a Phase 1 task? Yes: branch (1.2), baseline (1.3), IC files untouched (1.4 records the list; 4.5 re-checks the diff).
3. What does any shared output claim or get named, and is it true? The gate line says "Handed off: <names>" and "Removed: <names>", both derived from the rows, never from V3 text; the panel rows say Cleared / Removed / Conditional / Unfinished, each derived (2.2, 3.4). The PR says Limit 2 is closed and Limits 1 and 3 are not touched (5.5).
4. Are the Stage 03 contract lines present? Covenant line per phase: yes (each phase below). Token re-total with overrun flagged: Task 5.6. State saved against compaction: this plan file (1.5) and the Stage 05 debrief (5.6).
5. What happens after each step that can't be undone? The commit and the PR open (5.4, 5.5): the branch is this worktree's own; nothing merges to main and no deploy runs. The preview fixture edits are undone in 4.6. Nothing else is irreversible.

---

## Staged Execution Checklist

### Phase 1 — Gates and baseline
- [ ] Task 1.1 — Amanah Gate: does the deliverable serve a halal purpose with no riba, gharar or deception concern? Record the verdict in chat. A non-pass verdict stops the session here.
- [ ] Task 1.2 — Confirm `git status` clean on `claude/bbos-named-gates-limits-b1a7c1`; halt on mismatch.
- [ ] Task 1.3 — Run `npm test`; record the passing count as the baseline; halt if red.
- [ ] Task 1.4 — Record the IC file list that must not change (`bbos-ic-assets.js`, `BbosIcAssetsField.jsx`, IC keys in task defs).
- [ ] Task 1.5 — This plan file is saved; note the session branch in chat.
Covenant: nothing in this phase touches capital or framing; the Amanah Gate is the task, its verdict is not presumed.
**Gate:** Amanah Gate passed, tree clean, baseline green.

### Phase 2 — Data layer, test-first (`superpowers:test-driven-development`)
- [x] Task 2.1 — `src/data/bbos/__tests__/bbos-viability-candidates.test.js` (red): rows from a stored list; legacy letters read as candidate 1 (unnamed); verdict derivation (fail → removed, blank → unfinished, conditional → conditional, all pass → cleared); `formatViabilityCandidates`; `viabilityCandidatesDone`; a stored verdict on a row is ignored.
- [x] Task 2.2 — `src/data/bbos/bbos-viability-candidates.js` (green): `VIABILITY_LETTERS`, `emptyCandidate`, `viabilityCandidateRows(fieldData)`, `candidateResult(row)`, `formatViabilityCandidates`, `viabilityCandidatesDone`, `viabilityCandidateLine`, `candidateFieldText` for the read-only paths.
- [x] Task 2.3 — Evaluator tests in `bbos-named-gates.test.js` (red): a failed candidate is listed Removed and the gate still clears when another is Cleared; no cleared candidate → `blocked`; an unfinished or unnamed candidate → `incomplete`; conditional → `conditions`; stored `overallViability` disagreeing with the rows → `incomplete` naming both; legacy letters-only project → `incomplete` (unnamed); the gate result carries `candidates: [{ index, name, verdict, letters }]`; V2/V3 text is not required.
- [x] Task 2.4 — Rewrite `viability()` in `bbos-named-gates.js` (green). Keep the reason wording from the doc; no refusal is softened.
- [x] Task 2.5 — Task definition: add the `viabilityCandidates` field to CRD-V1 (keep every existing field); definition tests updated if they enumerate field types.
- [x] Task 2.6 — Stage score: CRD letter rows score over non-removed candidates, legacy fallback; tests in `bbos-stage-score.test.js` first.
- [x] Task 2.7 — AI services: `prompt-builder` (format + field description), `response-parser` (normalise list, skip a non-list with a warning), `context-gatherer` (one line per candidate) for the new type; tests where those files have them.
- [x] Task 2.8 — Full `npm test` green; count ≥ baseline + new tests. Store test in `project-store-bbos-gate.test.js` confirms `gateMoveRefusal` holds a CRD with no cleared candidate.
- [x] Task 2.9 — Round robin (operator's word: adopt, 2026-11-07; ledger beside this plan): V3 must list every cleared name and none that failed; V2 must record every removed name; an unnamed removed row holds the gate; legacy letters must be carried into a stored list; the parser skips an AI `[]`. Tests first; Task 2.3's "V2/V3 text is not required" is superseded. Closing sweep 1 found R4 (legacy exact-match deadlock) and R5 (a name taken from a longer entry); rounds 7–8 fixed them: carried unless a stored `[]` hides answered letters, and V2/V3 names must open an entry (one per line). Closing sweep 2 found R6 (handoff could mention a removed name in a comma list or label) and R7 (a pending AI draft hid the old letters); rounds 9–10 fixed them: `nameMentioned` for "must not name", and the gate holds while a CRD-V1 draft is `pending` (new rule for this gate, named at the Phase 2 gate). Closing sweep 3 found R8 (pending drafts of V2/V3 read as evidence), R9 (a draft dropping a failed row) and R11 (non-string V2/V3 read as empty); rounds 11–13 fixed them: the hold reads all three tasks, `keepRemovedCandidates` in the parser (the panel passes the stored data), `text()` on both reads. R10 (reject wipes the list; hand deletion) stays open for Phase 3 Tasks 3.1/3.2. Closing sweep 4 found R12 (a same-name draft row cleared a failed letter), R13 (the log unread for cleared rows) and R14 (the panel passed a stale snapshot); rounds 14–16 fixed them. Closing sweep 5 found R15 (a second same-named draft row escaped the hold); round 17 holds every row of the name. Rounds 18–20 (address standing objections): a list stored as text holds the gate and is never written over; reject restores the values held before the draft. Rounds 21–23 (address standing objections): the candidate editor (Task 3.1 pulled forward), its UX fixes, and no Delete on a failed candidate. Closing sweep 11 verified rounds 7–13 and found R20 (a draft note replaced a failed candidate's note); round 24 keeps the earlier note. Tests first; 832 green; closing sweep 12 found nothing above the floor.
Covenant: no capital or MTC framing is introduced; the doc's rule text is kept as written.
**Gate:** all Phase 2 tests green; store refusal confirmed.

### Phase 3 — UI on both dashboards (`ux-engine:form-ux` for the editor; Agent `ux-engine:ux-reviewer` at the end)
- [x] Task 3.1 — `BbosViabilityCandidatesField.jsx` + CSS: one card per candidate (name input, four letter selects, note), derived verdict pill, Add / Remove (confirm), focus handling and 44px targets as in the IC editor; legacy single answer shows as card 1.
- [x] Task 3.2 — `BbosTaskPanel.jsx`: render the new type; Done check uses `viabilityCandidatesDone`; validation hint.
- [x] Task 3.3 — Legacy `BbosFullDashboard.jsx` CRD-V1 renderer: one row per candidate with its letters and verdict, then the stored overall label; read-only text path uses `candidateFieldText`.
- [x] Task 3.4 — Both Named gates panels (`BbosGateMoveDialog.jsx`, `pipeline-dashboard/BbosApprovalBrief.jsx`): when the gate result has `candidates`, list each through `viabilityCandidateLine` (name, A–D letters, Cleared / Removed / Conditional / Unfinished) above the reasons, reusing the asset-row classes.
- [x] Task 3.5 — Adapter: confirm `namedGatesFor` passes `candidates` through unchanged; adapter test if a shape assertion exists.
- [x] Task 3.6 — UX review by Agent `ux-engine:ux-reviewer` on the diff; apply P0/P1 fixes, list P2/P3 as follow-ups.
Covenant: Islamic naming and the Factory-doc wording stay as written in every label.
**Gate:** `npm test` green; the editor, renderer and both panels compile; no IC file in the diff.

### Phase 4 — Verification (`superpowers:verification-before-completion`)
- [x] Task 4.1 — `npm test` exit 0, count recorded.
- [x] Task 4.2 — `npm run lint` exit 0.
- [x] Task 4.3 — `npm run build` exit 0.
- [x] Task 4.4 — Preview (`preview_start`): on a BBOS project at CRD, enter two candidates, one with Gate B fail; screenshot the CRD-V1 editor, the legacy Named gates panel and the redesigned Brief showing the failed candidate as Removed and the other Cleared with Proceed clear; then a project with no cleared candidate showing Blocked with Proceed locked.
- [x] Task 4.5 — Must Not greps run and recorded.
- [x] Task 4.6 — Restore the preview fixture; confirm no `bbosGateLog` entry was added.
- [x] Task 4.7 — CONTEXT.md rows: `src/data/bbos/CONTEXT.md` (new module, evaluator line), `src/components/bbos/CONTEXT.md` (editor, renderer, panels).
Covenant: nothing in this phase changes framing.
**Gate:** three commands exit 0 and the four screenshots exist.

### Phase 5 — Close (`superpowers:finishing-a-development-branch`)
- [x] Task 5.1 — `wiki/decisions/2026-11-07-bbos-viability-candidates.md` (context, decision, deviations, consequences, verification counts).
- [x] Task 5.2 — Amend `2026-10-19-bbos-named-gates.md`: Limit 2 closed by the new decision (add a line; edit nothing else).
- [x] Task 5.3 — `wiki/entities/bbos-pipeline.md` History row; `wiki/index.md` decision row; `wiki/log.md` entry prepended after frontmatter (newest-first).
- [x] Task 5.4 — Commit with the attribution line.
- [ ] Task 5.5 — Push and open the PR to `main`; bind it with the PR tools.
- [ ] Task 5.6 — Token re-total against the table, overrun flagged; Stage 05 debrief in chat.
Covenant: the decision record keeps the Islamic framing and the doc's wording.
**Gate:** Session complete when the PR is open, the wiki carries the decision and log entry, and the debrief is posted.

---

## Definition of Done
`npm test`, `npm run lint` and `npm run build` exit 0 with new tests that were red first. CRD-V1 holds one row per candidate (name, Gates A–D, derived Cleared / Removed / Conditional / Unfinished); no row stores a verdict, so a failed candidate cannot be shown as cleared anywhere. The evaluator blocks when no candidate clears, is incomplete when a candidate is unnamed or unanswered or the stored overall disagrees with the rows, and clears only on a cleared candidate; `gateMoveRefusal` holds the store and both dashboards with no override. Every pre-existing V1/V2/V3 field key is still defined, still rendered, and never deleted from stored data. Four preview screenshots exist. The wiki decision, amendment, entity row, index row and log entry are written; a PR is open. IC files are unchanged. Checked against the Objective: "a PR that closes the second Known limit of wiki/decisions/2026-10-19-bbos-named-gates.md, structured Viability: each candidate has its own row (name, Gates A–D, removed or cleared), a candidate that failed a letter can never appear as cleared, the existing V1/V2/V3 text stays readable and no stored text is deleted; with tests written first, lint and build green, a preview screenshot, a wiki decision and log entry."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
