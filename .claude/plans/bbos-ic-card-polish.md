# Session Execution Plan
**Date:** 2026-10-20
**Project:** MILOS V2.1 (BBOS)
**Objective:** apply the four items deferred from PR #72 (asset labels, 16px mobile input, collapse passed cards, late-disqualifier banner)
**Context Source:** Project Wiki

> Scope at Stage 02: the operator split the late-disqualifier banner off into its own proposed session (task_df9e3630). This plan covers the first three items.

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~6,000 | decisions, plan, editor, CSS |
| Planning (this document) | ~3,000 | |
| Execution — Phase 1 | ~6,000 | tests first for the collapse helpers |
| Execution — Phase 2 | ~10,000 | editor + CSS |
| Execution — Phase 3 | ~15,000 | test/lint/build, preview screenshots, fixture restore |
| Execution — Phase 4 | ~5,000 | wiki, commit, push |
| **Total Estimated** | **~45,000** | |

---

## Risks & Assumptions

### Assumptions
- [ ] The work lands on `feat/bbos-ic-per-asset` and so in PR #72, which is still open (option B: a new PR stacked on #72).
- [ ] The label becomes "Asset N name" (the label names the input, so the input's value is not repeated in it); a collapsed card shows the name in its head instead.
- [ ] Only cards whose verdict is Passed fold. They are folded when the panel opens; a card that becomes Passed while the operator edits it stays open. Each folded card has a "Show checks" toggle.
- [ ] 16px applies to the IC name input on phones only (≤767px), not every task-panel input.

### Must Not
- Fold a NO-SHIP or Unfinished card (test: `initialCollapsed` returns only Passed indices).
- Change "NO-SHIP" or "revise it and re-check before use" (`grep -n "revise it and re-check before use" src/components/bbos/BbosIcAssetsField.jsx` still matches).
- Change stored data or the gate's verdicts (the `bbos-ic-assets` and `bbos-named-gates` tests stay unchanged and green).
- Move focus or fold a card while the operator is answering it.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Fold state keyed by index goes wrong after Remove | Med | Low | pure `shiftAfterRemove` helper, tested |
| Folded card hides the "1 fail" note | Low | Med | the verdict chip keeps "· 1 fail" in the head |
| Toggle below 44px or missing aria-expanded | Low | Med | checked in preview via JS |

---

## Staged Execution Checklist

### Phase 1 — Tests first (superpowers:test-driven-development)
- [ ] 1.1 Add tests for `initialCollapsed(rows, code)` (Passed indices only) and `shiftAfterRemove(set, i)` to `bbos-ic-assets.test.js`
- [ ] 1.2 Watch them fail, then add the two helpers to `bbos-ic-assets.js`
**Gate:** the new tests fail first, then pass; the full suite is green.

### Phase 2 — Editor and CSS (ux-engine:form-ux)
- [ ] 2.1 Label: "Asset N name"
- [ ] 2.2 Fold: `useState(initialCollapsed)`; a folded card shows the name and verdict chip in its head with a "Show checks" / "Hide checks" button (`aria-expanded`, `aria-controls`, 44px); Remove updates the fold set with `shiftAfterRemove`
- [ ] 2.3 CSS: folded-card head, the toggle, and `.btp-ic-name { font-size: 16px }` inside the ≤767px media rule
**Gate:** the editor compiles and lint is clean.

### Phase 3 — Verify
- [ ] 3.1 `npm test`, `npm run lint`, `npm run build`
- [ ] 3.2 Preview screenshots: a passed card folded and then opened; a NO-SHIP card never folded; the 16px computed size at mobile width; the toggle's height and aria-expanded via JS
- [ ] 3.3 Restore the fixture (OUT-IC `bbosFieldData` back to `{}`; never touch `bbosGateLog`) and reset the viewport
**Gate:** all green, screenshots taken, fixture restored.

### Phase 4 — Record and ship
- [ ] 4.1 Add a section to `wiki/decisions/2026-10-20-bbos-ic-per-asset.md`; prepend a log entry; mark the three items done in the earlier entry's Deferred line by pointing to the new entry
- [ ] 4.2 Commit (Co-Authored-By line), push, and update the PR #72 body
**Gate:** Session complete when PR #72 carries the commit and the wiki records it.

---

## Definition of Done
- The IC cards read "Asset N name".
- Passed cards open folded, with a 44px "Show checks" toggle; NO-SHIP and Unfinished cards never fold.
- The name input is 16px on phones.
- Tests for the helpers were written first; test, lint and build are green.
- Preview screenshots show each item, and the fixture is restored.
- Wiki and PR #72 are updated.
- Checked against the Objective, as narrowed at Stage 02 (banner split off): "apply the four items deferred from PR #72 (asset labels, 16px mobile input, collapse passed cards, late-disqualifier banner)"

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
