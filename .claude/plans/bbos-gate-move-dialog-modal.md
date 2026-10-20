# Session Execution Plan
**Date:** 2026-10-20
**Project:** MILOS V2.1
**Objective:** A PR that moves `BbosGateMoveDialog` (legacy Advance / Complete Cycle, and ProjectBoard's New Cycle) from its hand-rolled overlay onto the shared `Modal.jsx`, giving it Escape, a focus trap, focus return and a discard prompt for unsaved text. Its copy, classes, gate rules and gate-log writes stay the same.
**Context Source:** Project Wiki + `src/components/bbos/CONTEXT.md`

---

## Risks & Assumptions

### Assumptions
- [ ] The dialog keeps its own `createPortal(…, document.body)` and wraps its content in `<Modal overlayClassName="bfd__modal-overlay" className="bfd__modal bfd__modal--advance" label={title}>`, the same pattern as the Reject modal (#75). The inner `stopPropagation` and the overlay `onClick` go; Modal handles a backdrop click.
- [ ] **`dirty`** is true when any of the four text fields holds text (basis, conditions, conditions basis, resolution basis) or any acknowledgement is ticked. Conditions and resolutions are written to the gate log straight away, so they are not "unsaved" and don't count. Escape or a backdrop click with unsaved work asks "Discard unsaved changes?". Cancel still closes directly.
- [ ] **Initial focus:** no change of intent. The trap focuses the first control, which is at the top of the dialog (a gate's button or checkbox), so the named gates are read before the basis. The inline forms' `autoFocus` textareas keep working, because the trap leaves alone focus that is already inside.
- [ ] The phone fix from #77 (`.bfd__modal .slidein-discard` sticky, `90dvh`) applies automatically.

### Must Not
- No change to gate rules, `gateMoveRefusal`, copy or classes. No override path.
- No edits to existing `bbosGateLog` entries or the Factory docs.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Escape inside an inline Record conditions / Mark resolved form now closes (or asks to close) the whole dialog | Med | Low | Typed text makes the dialog dirty, so a discard prompt appears first; this matches Modal's behaviour elsewhere |
| ProjectBoard New Cycle path regresses | Low | Med | Preview check of both call sites |

---

## Staged Execution Checklist

### Phase 1 — Amanah Gate
- [ ] 1.1 Run the Amanah Gate on this plan (`docs/principles.md`). Pass → continue. Flag or fail → stop and report; nothing is written.

### Phase 2 — Migrate (`ux-engine:feedback-and-affordance`)
- [ ] 2.1 `BbosGateMoveDialog.jsx` onto `Modal` (portal kept, `label`, `dirty`).
- [ ] 2.2 Update `src/components/bbos/CONTEXT.md` (the dialog row; remove the "hand-rolled" follow-up wherever it is listed).

### Phase 3 — Verify (`superpowers:verification-before-completion`)
- [ ] 3.1 `npm test`, `npm run lint`, `npm run build` all pass.
- [ ] 3.2 In the preview, on the legacy dashboard at STR, then restored:
  - Advance opens with focus inside the dialog.
  - Escape with nothing typed closes it, and focus returns to Advance.
  - Escape with a basis typed shows the discard prompt; Keep editing puts focus back in the textarea.
  - Take screenshots.
  - Do not confirm an advance.
  - Restore the fixture afterwards.

### Phase 4 — Wiki + PR
- [ ] 4.1 Prepend a `wiki/log.md` entry after the frontmatter.
- [ ] 4.2 Commit, push, open the PR to main, and bind it with ccd_pr.

---

## Definition of Done
`BbosGateMoveDialog` is a `Modal` (Escape, focus trap, focus return, discard prompt for unsaved work) at both call sites. Behaviour and copy are otherwise unchanged. Tests, lint and build pass, screenshots are taken, and the PR is open.

## Awaiting Approval
