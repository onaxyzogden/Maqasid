# Session Execution Plan
**Date:** 2026-10-19
**Project:** MILOS V2.1 (BBOS pipeline)
**Objective:** a PR that makes the Ihsan Baseline (OUT-IC) and Pre-Ship (DEL-A4) named gates check every asset in their IC lists (repeatable asset name + five checks, legacy single-asset answers kept readable), blocked on any asset with 2+ fails, incomplete on any unanswered asset, with per-asset results in both dashboards' Named gates panel — tests first, test/lint/build green, preview screenshot, wiki decision + log.
**Context Source:** Project Wiki

Branch: `feat/bbos-ic-per-asset`, stacked on `feat/bbos-named-gates` (onaxyzogden/Maqasid#71, still open). The PR targets that branch.

---

## Options

1. **A — Repeatable list field, legacy read-through (recommended).** A new field type `icAssets`: one field per list (`icOutAssets`, `icOfrAssets`, `icDelAssets`). Its value is an array of `{ asset, checks: ['pass'|'fail'|'', ×5] }`. When the array is absent, the old flat fields (`icOutAsset` + `icOut1..5`, and the same for OFR/DEL) are read as row 1. The first edit copies that row into the array. The old keys stay stored and are never deleted. A single pure helper, `icAssetRows`, feeds the evaluator, the task panel, the stage score and the read-only views. *Skills:* `superpowers:test-driven-development` for the evaluator/helper, `ux-engine:form-ux` for the repeatable entry, Agent `ux-engine:ux-reviewer` before the PR. *Why:* truly repeatable, one source of truth, and old answers carry over intact.
2. **B — Numbered string fields.** Keep the flat fields as asset 1 and add `icOutAsset2`, `icOut2_1`, … up to a fixed cap (say 5 assets). No new value type, but it means 30+ selects per list, a hard cap, and empty slots that are hard to tell apart from unanswered ones.
3. **C — JSON string in a text field.** Keeps every value a string, but the read-only views, the AI context and the export would show raw JSON. Rejected.

The plan below is option A.

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~35,000 | Wiki, CONTEXT.md files, PR #71 evaluator and field defs |
| Planning (this document) | ~6,000 | |
| Execution — Phase 1 (tests first) | ~15,000 | helper + evaluator + score + adapter tests |
| Execution — Phase 2 (data + evaluator) | ~15,000 | helper module, field defs, `checklists()`, stage score |
| Execution — Phase 3 (entry UI) | ~25,000 | BbosTaskPanel repeatable entry, Done validation, read-only views |
| Execution — Phase 4 (Named gates panels) | ~15,000 | Brief + GateMoveDialog per-asset table, CSS |
| Execution — Phase 5 (verify, review, wiki, PR) | ~30,000 | preview screenshots, ux-reviewer, wiki, PR |
| **Total Estimated** | **~141,000** | |

> Note: Token estimates are approximate. Complex file generation or multi-file
> refactoring will trend higher. Flag if any phase exceeds estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] The doc's rule ("Any asset failing 2 or more checks is NO-SHIP") applies to each asset on its own list. IC-OFR assets and IC-DEL assets are separate lists, each with its own five checks, and an asset is never judged on its fails across both lists combined.
- [ ] A list with no rows, a row with no asset name, and a row with any unanswered check are all `incomplete`. A blank row the operator added counts as unanswered. Remove takes it out.
- [ ] The gate takes its worst row: any NO-SHIP row makes it `blocked`, even when other rows are incomplete. Every row still gets its own reason line.
- [ ] Removing a row is an ordinary edit (with a confirm). It is no more an override than changing a fail to pass is today. Recorded as a known limit, not built against.
- [ ] Stage score (OUT): signal n scores 5 only when every listed asset passes IC-OUT-n (and at least one asset is listed). Otherwise it scores 0, as today's single-asset rule does.
- [ ] The free-text notes `icOfrChecks` / `icDelChecks` stay as they are.
- [ ] The AI-draft and JSON-import paths may write an `icAssets` array or leave it alone. Neither is built out further here.
- [ ] Other options (B, C) are listed above.

### Must Not
- Delete or rename any stored legacy key. `git diff` must show no change that removes the `icOutAsset|icOut[1-5]|icOfrAsset|icOfr[1-5]|icDelAsset|icDel[1-5]` reads from the legacy read-through.
- Add any override, "ship anyway", or a way to mark an asset NO-SHIP and still advance. Check with `grep -rn "anyway\|override" src/data/bbos src/components/bbos` (no new hits).
- Soften the doc wording: "NO-SHIP" and "Revise and re-check before use" stay. Check with `grep -n "NO-SHIP" src/data/bbos/bbos-named-gates.js`.
- Edit Factory docs or existing `bbosGateLog` entries (`git diff --stat` shows no doc or gate-log changes).
- Show `[object Object]` anywhere. The adapter, the legacy dashboard, the AI context and the task card all format arrays through the helper; a test covers the adapter.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| A project mid-pipeline flips from clear to incomplete after the change | Low | High | Legacy read-through: tests prove a legacy-only answer evaluates exactly as it did in PR #71 |
| Some string-only consumer (`.trim()` on a field value) crashes on an array | Med | Med | Grep every `bbosFieldData` reader (done in Stage 02: 11 files). Each gets array handling or is shown not to touch these keys |
| Task panel debounce saves a stale array (one row's edit overwrites another's) | Med | Med | Rows update immutably from the current local state, through the existing `handleFieldChange` |
| Named gates panel grows long with many assets | Low | Low | Compact per-asset table (asset · verdict · failed codes), reasons kept short |
| PR #71 changes before merge and conflicts | Med | Low | Rebase onto its tip before opening the PR |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — Tests first (`superpowers:test-driven-development`)
- [ ] 1.1 — `__tests__/bbos-ic-assets.test.js`: `icAssetRows` reads the array; falls back to the legacy flat fields as row 1; returns [] when neither is present; prefers the array over legacy keys once it exists; `formatIcAssets` gives readable text.
- [ ] 1.2 — Extend `bbos-named-gates.test.js`: multi-asset clear (each "passed for"); one asset with 2 fails among passing ones is `blocked`, naming that asset; one unanswered row is `incomplete`, naming the row and codes; no rows is `incomplete`; blocked outranks incomplete; Pre-Ship lists are judged separately; each gate result carries `assets[]` (list, index, asset, verdict, fails, unanswered); legacy-only data gives the same status as before.
- [ ] 1.3 — Stage score test (OUT signal across assets) and an adapter test (`buildContent` shows no `[object Object]`, `gate.named` carries `assets`).
- [ ] 1.4 — Run `npm test`: the new tests fail for the right reason.
**Gate:** New tests are red only on the missing behaviour; existing tests are green.

### Phase 2 — Data and evaluator
- [ ] 2.1 — New `src/data/bbos/bbos-ic-assets.js`: `IC_LISTS` (code, task, field, legacy keys), `icAssetRows(fieldData, list)`, `rowVerdict(row)`, `formatIcAssets`, `isIcAssetsEmpty`.
- [ ] 2.2 — `bbos-task-definitions.js`: replace the flat IC fields in `fields` with one `icAssets` field per list (code, asset label and placeholder, the five checks with their existing labels and options verbatim). Legacy keys are no longer rendered, but they are read through.
- [ ] 2.3 — `bbos-named-gates.js` `checklists()`: per-row evaluation; reasons per asset; an `assets[]` array on the result. `GATE_RULES.*.lists` names the field.
- [ ] 2.4 — `bbos-stage-score.js`: OUT signals go through `icAssetRows`.
- [ ] 2.5 — Update `src/data/bbos/CONTEXT.md`.
**Gate:** Phase 1 tests are green; `npm test` is green as a whole.

### Phase 3 — Repeatable entry and read-only views (`ux-engine:form-ux`)
- [ ] 3.1 — `BbosTaskPanel.jsx`: an `icAssets` renderer. One card per asset: a name input, five selects and a live verdict chip (Pass / 1 fail / NO-SHIP / Unanswered). "Add another asset" adds a row. Remove (with ConfirmDialog, hidden on the only row). Rows are seeded from legacy on first edit. View-only roles see it read-only. Done-validation treats an empty list or an incomplete row as empty.
- [ ] 3.2 — Read-only views: `BbosFullDashboard` OUT-IC renderer (per check, "passed on n/m assets") plus the `DefaultTaskRenderer` / `countFilledFields` / hasData; the adapter's `buildContent` / `hasData`; `context-gatherer.js`; the `ProjectBoard` non-empty check. Arrays are formatted through the helper.
- [ ] 3.3 — Update `src/components/bbos/CONTEXT.md`.
**Gate:** `npm test` and `npm run lint` are green; the panel renders in preview with 2 assets.

### Phase 4 — Named gates panels
- [ ] 4.1 — `BbosApprovalBrief.jsx` and `BbosGateMoveDialog.jsx`: when a gate has `assets`, show a compact per-asset list under the reasons (list code · asset · verdict pill · failed codes / unanswered codes). Reasons stay. Adapter passes `assets` through.
- [ ] 4.2 — CSS in `BbosPipelineDashboard.css` (scoped `.bpd` palette, mobile block) and `BbosFullDashboard.css`.
**Gate:** Both panels show per-asset rows for clear, blocked and incomplete in preview.

### Phase 5 — Verify, review, record, ship
- [ ] 5.1 — `npm test`, `npm run lint`, `npm run build` all green (`superpowers:verification-before-completion`).
- [ ] 5.2 — Preview: on OUT, enter 2 assets in the task panel (one passing, one with 2 fails). Screenshot both dashboards' Named gates panels showing Blocked and the NO-SHIP asset. Fix it to pass, screenshot clear. A legacy single-asset project still reads its answer as row 1 (screenshot).
- [ ] 5.3 — Agent `ux-engine:ux-reviewer` on the diff. If it reports P0/P1 issues, fix them and re-verify before 5.4. Lower findings are listed in the PR.
- [ ] 5.4 — Wiki: `wiki/decisions/2026-10-19-bbos-ic-per-asset.md`; prepend a `wiki/log.md` entry (newest-first); add an index line; update the follow-up line of the named-gates decision only by appending a pointer (no rewrite of its accepted text).
- [ ] 5.5 — Commit, push, open the PR against `feat/bbos-named-gates`; bind it with ccd_pr.
**Gate:** Session complete when the PR is open with green local checks and screenshots attached.

---

## Definition of Done
`icAssetRows` + per-asset `checklists()` are covered by tests written first. `npm test`, `npm run lint` and `npm run build` pass. In preview, both dashboards' Named gates panels show per-asset results: an asset with 2+ fails makes the gate Blocked and names that asset, an unanswered row makes it Incomplete, and a legacy single-asset answer shows as row 1 with nothing deleted (screenshots). The wiki decision and the log entry exist. A PR stacked on #71 is open.
Checked against: "a PR that makes the Ihsan Baseline (OUT-IC) and Pre-Ship (DEL-A4) named gates check every asset in their IC lists (repeatable asset name + five checks, legacy single-asset answers kept readable), blocked on any asset with 2+ fails, incomplete on any unanswered asset, with per-asset results in both dashboards' Named gates panel — tests first, test/lint/build green, preview screenshot, wiki decision + log."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
