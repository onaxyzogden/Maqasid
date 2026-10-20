# Session Execution Plan
**Date:** 2026-10-20
**Project:** MILOS V2.1
**Objective:** A PR that gives both BBOS dashboards and the store one Halt role rule (Owner of CRD-V1, or the "all" view; the store refuses any other declared role), and moves the legacy Reject modal onto the shared `Modal.jsx` (Escape, focus trap, focus return, discard-confirm for a written basis); with tests, screenshots and a wiki amendment.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~15,000 | Wiki, both dashboards, store, Modal.jsx |
| Planning (this document) | ~4,000 | |
| Execution — Phase 1 (Amanah Gate, branch, rule + store, tests first) | ~12,000 | Pure helper + store guard |
| Execution — Phase 2 (both dashboards) | ~18,000 | Brief Halt lock, banner canHalt, Reject → Modal |
| Execution — Phase 3 (verify) | ~20,000 | test/lint/build, screenshots, ux-reviewer |
| Execution — Phase 4 (wiki, PR) | ~6,000 | |
| **Total Estimated** | **~75,000** | |

---

## Risks & Assumptions

### Assumptions
- [ ] The rule (operator's choice, "Owner + store check"): a role may halt when it is the "all" view (no role) or `getTaskAccessLevel(role, 'CRD-V1') === 'O'` (today OW and ST). One exported helper `canHaltBbosPipeline(role)` in `bbos-role-access.js`, used by both dashboards and the store.
- [ ] Store: `rejectBbosPipeline(projectId, reasonId, reviewer, record)` is a no-op when `reviewer` (or `record.by`) is a role that may not halt. `reviewer` null means the "all" view and is allowed, as today. The role is declared, not signed in: this records and enforces the declared role; it does not secure it.
- [ ] Redesign: the banner gets `canHalt`; the Brief's Halt option is disabled for a role that may not halt, with the note "Only the Owner of the Amanah Proof Audit can halt the pipeline." Proceed, conditions and Close Cycle are unchanged.
- [ ] Legacy Reject modal: rendered as `<Modal>` inside the existing `createPortal(…, document.body)` (Modal does not portal itself), keeping its `bfd__modal-overlay` / `bfd__modal` classes and content. `dirty` is a non-empty basis, so Escape or a backdrop click with a written basis asks "Discard unsaved changes?". Cancel closes directly.
- [ ] Unresume (`unrejectBbosPipeline`) is out of scope; its role rule is unchanged.
- [ ] Branch: `feat/bbos-halt-role-reject-modal`, cut from `feat/bbos-late-disqualifier` (PR #74) and stacked on it. Phase 1 checks the worktree is clean and on #74's tip; halt on mismatch.
- Other options considered: (1) Owner-only in the UI with no store check. (2) Any role everywhere. The operator chose the store check.

### Must Not
- No override for the late ★ disqualifier; no softened disqualifier wording.
- No edits to existing `bbosGateLog` entries or the Factory docs.
- No change to the Reject modal's copy or classes beyond what the Modal migration needs.
- No change to `BbosGateMoveDialog` (listed as a follow-up).

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| A store test halts with reviewer `'operator'` (not a role id), which the new guard refuses | High | Low | Change it to `'OW'` deliberately, and add a refusal test for a non-owner role |
| Modal's `useFocusTrap` focuses the dialog before the textarea's `autoFocus` | Med | Low | Check `document.activeElement` in preview; keep the textarea focused on the banner path |
| Modal's default classes or styles fight `bfd__modal` | Low | Low | Pass `overlayClassName` / `className`; screenshot |
| Brief Halt lock hides the Halt pre-selection from a non-owner opening from the banner | Low | Low | The banner already shows the no-halt note for them; there is no Halt button to open it |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — Amanah Gate, branch, rule + store guard (`superpowers:test-driven-development`)
- [ ] 1.1 Run the Amanah Gate on this plan (`docs/principles.md`). Pass → continue. Flag or fail → stop and report; nothing is written.
- [ ] 1.2 Confirm the worktree is clean and on #74's tip; create `feat/bbos-halt-role-reject-modal`. Mismatch → halt.
- [ ] 1.3 Failing tests first: `canHaltBbosPipeline` (null / 'all' / OW / ST allowed; CW, MB, SE, CL, FU and unknown refused); store `rejectBbosPipeline` refuses a non-owner (project unchanged, no gate entry) and accepts OW and null. Update the `'operator'` test to `'OW'`.
- [ ] 1.4 Implement the helper and the store guard; `npm test`.
**Gate:** new tests pass; every pre-existing test passes or was changed deliberately with the reason stated.

### Phase 2 — Both dashboards (`ux-engine:feedback-and-affordance`)
- [ ] 2.1 Legacy: `canReject` uses the helper; the Reject modal moves onto `Modal` (portalled, own classes, `labelledBy` the heading, `dirty` = basis written).
- [ ] 2.2 Redesign: pass `canHalt` to the banner; the Brief disables Halt for a role that may not halt, with the note.
- [ ] 2.3 Update `src/components/bbos/CONTEXT.md` (and fix the banner's stale `role="alert"`) and `src/data/bbos/CONTEXT.md`.
**Gate:** both dashboards apply the same rule; the Reject modal closes on Escape and returns focus.

### Phase 3 — Verify (`superpowers:verification-before-completion`, then `ux-engine:ux-reviewer` agent)
- [ ] 3.1 `npm test`, `npm run lint`, `npm run build` green.
- [ ] 3.2 Preview, fixture at STR with Q5 = yes, then restored: screenshot the redesign banner and Brief as a non-owner (no Halt, note shown) and as OW (Halt offered); the legacy Reject modal opened, Escape with a basis written (discard prompt), Escape when empty (closes, focus back on the opener). Do not confirm a halt.
- [ ] 3.3 Run the ux-reviewer agent on the diff; apply or list its findings.
**Gate:** all green, screenshots confirm each case (say so if the tool fails), review findings applied or listed.

### Phase 4 — Wiki + PR
- [ ] 4.1 Amend `wiki/decisions/2026-10-20-bbos-late-disqualifier.md` (two follow-ups closed), a `wiki/entities/bbos-pipeline.md` History row, and a `wiki/log.md` entry prepended after the frontmatter.
- [ ] 4.2 Commit, push, open the PR to main stacked on #74; bind with ccd_pr.
**Gate:** PR open with green local checks.

---

## Definition of Done
- One Halt rule (Owner of CRD-V1, or the "all" view) on both dashboards, and the store refuses a halt from any other declared role, proven by tests.
- The legacy Reject modal is a `Modal`: Escape, focus trap, focus return, discard-confirm for a written basis.
- No override, no edited gate-log entries; tests, lint and build green; screenshots taken; wiki amended; PR open.

Checked against the Objective: "A PR that gives both BBOS dashboards and the store one Halt role rule (Owner of CRD-V1, or the "all" view; the store refuses any other declared role), and moves the legacy Reject modal onto the shared `Modal.jsx` (Escape, focus trap, focus return, discard-confirm for a written basis); with tests, screenshots and a wiki amendment."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
