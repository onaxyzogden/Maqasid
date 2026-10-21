# Session Execution Plan
**Date:** 2026-10-20
**Project:** MILOS V2.1
**Objective:** A PR that stops the redesigned dashboard showing "✓ Amanah Gate" / "✓ Passed" for a completed CRD while a ★ disqualifier is on file. When `lateDisqualifier` holds, the CRD gate reads "✕ Disqualifier on file" on both the rail node and the Stage Overview strip, matching the banner. Tests are written first, and screenshots are taken.
**Context Source:** Project Wiki (`wiki/decisions/2026-10-20-bbos-late-disqualifier.md` follow-up) + `src/components/bbos/CONTEXT.md`

---

## Risks & Assumptions

### Assumptions (adopted after round robin, 4 rounds, 2026-10-20)
- [ ] Cause: `gateStatusFor` in `pipeline-dashboard/adapter/bbos-dashboard-adapter.js` returns `"passed"` for any `complete` stage. CRD is complete once the pipeline has moved past it, so a ★ answered YES later still shows ✓.
- [ ] New gate status `"amanah_hold"`, only on CRD. It applies when CRD is complete and `lateDisqualifier(bbosStage, tasks)` is non-null. It is checked from the rubric, **not** from `rejectedAt`, so it still shows after a Halt. It is named apart from the evaluator's `blocked`, which the adapter already maps to `"pending"`. It states the evidence and never a recorded verdict ("Disqualified" was rejected: outcomes live only in `bbosGateLog`).
- [ ] Display:

| Surface | Shows |
|---|---|
| Rail node | ✕ beside the unchanged label "Amanah Gate", with `title` / `aria-label` "Amanah Gate: disqualifier on file" |
| Overview strip status | "✕ Disqualifier on file" |
| Line under the strip name (`gate.note`) | "★ <evaluator question names> answered YES. Reject immediately." Once `rejectedAt` is set: "… Pipeline halted." |

  - Rail and strip use the `--bpd-red` / `--bpd-red-dim` tokens.
  - "Reject immediately" is the rubric's own phrase.
- [ ] Only CRD's gate changes. Other stages and the legacy dashboard are untouched.

### Must Not
- No softened disqualifier wording, and no override.
- No edits to `bbosGateLog` entries or the Factory docs. This is display only.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Other consumers of `gate.status` treat an unknown value as pending | Low | Low | Grep showed only the rail, the strip and palette; all are updated |
| Adapter test fixture conventions | Low | Low | Follow the existing `withFp02` / CRD tests |

---

## Staged Execution Checklist

### Phase 1 — Amanah Gate, tests first (`superpowers:test-driven-development`)
- [ ] 1.1 Run the Amanah Gate on this plan (`docs/principles.md`). Pass → continue. Flag or fail → stop and report; nothing is written.
- [ ] 1.2 Write failing adapter tests:
  - Past CRD with Q5 = yes → `"amanah_hold"` and a "Reject immediately" note.
  - Clean rubric → `"passed"`, with no note.
  - Rejected → still `"amanah_hold"`, with a "Pipeline halted" note.
  - At CRD → unchanged.
  - Palette helpers return ✕ / "✕ Disqualifier on file".
- [ ] 1.3 Implement it in the adapter, then palette and CSS. Run `npm test`.

### Phase 2 — Verify
- [ ] 2.1 `npm test`, `npm run lint`, `npm run build` pass.
- [ ] 2.2 Preview on the redesign dashboard with a fixture past CRD and Q5 = yes. Screenshot the rail node and the CRD Overview strip. Clear Q5 and confirm ✓ returns. Restore the fixture. Do not halt.

### Phase 3 — Wiki + PR
- [ ] 3.1 Mark the follow-up closed in `wiki/decisions/2026-10-20-bbos-late-disqualifier.md`. Update `src/components/bbos/CONTEXT.md` / the pipeline-dashboard CONTEXT if they describe gate statuses. Prepend a `wiki/log.md` entry.
- [ ] 3.2 Commit, push, open the PR to main, and bind it with ccd_pr.

## Definition of Done
With a ★ YES on file after CRD, the CRD rail node and strip read "✕ Disqualifier on file", not passed. With a clean rubric, ✓ is unchanged. Tests, lint and build pass, screenshots are taken, the wiki follow-up is closed, and the PR is open.

## Approved
Round robin (4 rounds), then the operator's word "adopt", 2026-10-20.
