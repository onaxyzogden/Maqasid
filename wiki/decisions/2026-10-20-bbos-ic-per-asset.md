---
title: "BBOS IC Checklists: Every Asset Checked on Its Own"
type: decision
date: 2026-10-20
status: accepted
tags: [bbos, gate, ihsan, ic-out, ic-ofr, ic-del]
superseded_by: null
---

# BBOS IC Checklists: Every Asset Checked on Its Own

## Context

[[2026-10-19-bbos-named-gates]] built the Ihsan Baseline (IC-OUT, task OUT-IC) and Pre-Ship (IC-OFR + IC-DEL, task DEL-A4) gates on one named asset per list. The Factory docs judge assets one by one: any asset failing 2 or more checks is NO-SHIP. A stage with five outreach assets was being cleared on the strength of one. That decision listed per-asset rows as a follow-up; the operator approved `.claude/plans/bbos-ic-per-asset.md`, stacked on PR #71.

## Decision

- **One list per checklist.** A new field type `icAssets` holds `[{ asset, checks: [5 × 'pass' | 'fail' | ''] }]` in `icOutAssets`, `icOfrAssets` and `icDelAssets`. `src/data/bbos/bbos-ic-assets.js` holds the rules; `BbosIcAssetsField.jsx` is the editor: one card per asset, a verdict chip, a radio group per check, "Add another asset", and Remove (with a confirm) when there is more than one.
- **Each asset judged by the doc's rule.** 2+ fails is NO-SHIP, whatever else is unanswered. Otherwise a missing name or an unanswered check is unfinished. The gate takes the worst asset: any NO-SHIP is `blocked`, any unfinished asset is `incomplete`. The gate result carries `assets: [{ list, index, asset, verdict, fails, unanswered }]`.
- **Old answers stay readable.** A project answered before this keeps `icOutAsset` + `icOut1..5` (and the same for OFR/DEL). Until the list is first edited, those are read as its first asset. The first edit writes the list; the flat fields are never deleted.
- **Both Named gates panels list the assets.** The Brief and the legacy `BbosGateMoveDialog` show one line per asset (list code, name, Passed / NO-SHIP / Unfinished, the failed or unanswered checks) above the gate's reasons, which keep the doc's wording.
- **OUT score.** OUT's five signals are the five IC-OUT checks; with several assets, a check scores only when every asset passes it.
- **Read-only views and AI.** The Full Dashboard renderers, the adapter's Exec View content, and the AI context use one line per asset (`formatIcAssets`). The AI prompt asks for the list shape, and the response parser accepts it.
- **No override, no softened wording.** "NO-SHIP" and "revise it and re-check before use" are kept. Gate outcomes are still recorded only in `bbosGateLog`.

## Known limits

- **Removing an asset is an ordinary edit.** An operator can remove a NO-SHIP asset from the list, behind a confirm. That is no more an override than changing a fail to pass was before; it is recorded, not built against.
- **The Download template does not carry legacy answers.** `src/services/bbos-template.js:99` exports `bbosFieldData[field.id]`, so a project still on the flat fields exports `icOutAssets` as empty. Upload merges only non-empty values, so nothing is lost on the way back in.
- **Exec View line breaks.** `.bpd-row__content` now has `white-space: pre-wrap`; before, any multi-line field ran together on one line in the Exec View. This touches every field shown there, not only IC lists.

## Consequences

- A stage with several assets now holds until every listed asset is answered, and is blocked by any one that fails 2+ checks.
- Verified: tests written first and green, lint and build green. In preview: the task panel cards (NO-SHIP note, then "Passed · 1 fail" after an edit), the Brief blocked and cleared, a legacy flat answer read as asset 1 and blocking, and the legacy Advance dialog with Confirm locked. The preview fixture was restored afterwards.

## Card polish (2026-10-20)

Three of the four UX items deferred from PR #72, approved in `.claude/plans/bbos-ic-card-polish.md`:

- **Label.** Each card reads "Asset N name". The label names the input, so it doesn't repeat the input's value.
- **Passed cards fold.** When the panel opens, Passed cards are folded: the head shows the name and the verdict chip (with "· 1 fail" kept), and a 44px "Show checks" / "Hide checks" toggle opens it. NO-SHIP and unfinished cards never fold. Only the opening state folds, so a card that passes while it is being answered stays open. The fold state is held by card index; `shiftAfterRemove` keeps it right after a Remove.
- **16px on phones.** `.btp-ic-name` is 16px at 767px and below, so iOS doesn't zoom in on focus. Other task-panel inputs are unchanged.
- **Not done here.** The banner for a disqualifier raised after the gate was passed was split off into its own session.

See [[bbos-pipeline]].
