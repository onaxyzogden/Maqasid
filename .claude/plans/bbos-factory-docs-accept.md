# Session Execution Plan
**Date:** 2026-10-18
**Project:** MILOS / BBOS Factory docs
**Objective:** Review and accept the ten redrafted Factory docs, archive the older originals, and rebuild the BBOS Stage Grounding Register from the accepted docs so the two match.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~9,000 | Wiki reads |
| Planning (this document) | ~3,000 | |
| Execution — Phase 1 Review | ~25,000 | Dump each draft's highlighted passages, check against `bbos-stage-islamic.js` |
| Execution — Phase 2 Accept + archive | ~6,000 | One python-docx script; backup first |
| Execution — Phase 3 Register rebuild | ~15,000 | Extract from docs, compare to app, regenerate, republish |
| Execution — Phase 4 Close | ~6,000 | Wiki decision amendment, entity, log; small PR |
| **Total Estimated** | **~64,000** | |

> Token estimates are approximate. Flag if any phase exceeds its estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] "Accept" means: remove the yellow review highlights, and set each draft's newest version row from "Pending review" to approved by Yousef Abdelsalam, dated 2026-10-18. No other wording changes unless the review finds a defect, which I report first.
- [ ] The archive is a subfolder, `BBOS Factory Docs/_archive/`. The nine v1.x originals and DELIVER v3.5 move there unchanged; nothing is deleted.
- [ ] "Rebuild the register from the docs" means the register reads each stage's Names, opening, closing and citations from the accepted docs, then checks them against the app. Any mismatch shows as a flagged row rather than being silently resolved.
- [ ] The app's `bbos-stage-islamic.js` is canonical. A doc that disagrees is a defect to report, not a reason to edit the app.
- [ ] Skills: `anthropic-skills:docx` (python-docx editing); `artifact-design` is already applied to the register page, and the republish reuses the same file path.
- Other options considered: (b) review and report only, leaving acceptance with you; (c) accept without the register reading the docs, keeping the register app-sourced. I recommend the plan as written.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Review finds a doc that disagrees with the app | Med | Med | Halt before accepting that doc; report the difference and ask |
| Removing highlights also clears highlights the operator had in the originals | Low | Med | Clear only yellow on runs that differ from the original; compare first and report the count |
| Docs are open in Word (file lock) | Low | Low | Script fails loudly; ask you to close them |
| Doc layouts differ per stage, so extraction misses a field | Med | Low | Per-stage asserts; any missed field shows as "not found" in the register, not invented |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — Review (docx skill)
- [ ] 1.1 — For each of the ten drafts, extract every highlighted passage and the newest version row
- [ ] 1.2 — Check the governing Names, opening and closing du'as and their citations against `bbos-stage-islamic.js`, word for word
- [ ] 1.3 — Check that no old stage code (FND/TRU/QAL/SAL/DLR/FUL) remains outside history rows, and that the prompt ids are 1-based
- [ ] 1.4 — Report a short review table per stage (pass, or the defects found)
**Gate:** every doc passes, or you have decided on each defect

### Phase 2 — Accept and archive
- [ ] 2.1 — Back up all twenty files to the scratchpad
- [ ] 2.2 — Remove the review highlights and set the version row's Approved By to "Yousef Abdelsalam", dated 2026-10-18
- [ ] 2.3 — Move the ten older originals to `BBOS Factory Docs/_archive/`
- [ ] 2.4 — Re-open each saved doc and confirm it has no yellow highlights and the row is set
**Gate:** the folder holds exactly the ten accepted docs plus `_archive/` with ten originals

### Phase 3 — Rebuild the register
- [ ] 3.1 — Extract per-stage Names, opening, closing and citations from the accepted docs into `docs.json`
- [ ] 3.2 — Update gen.py so the register's source is the docs, with a doc-vs-app check row per stage, and the footer says the docs are accepted (v2.0; DELIVER v3.6)
- [ ] 3.3 — Regenerate, check the page in the preview with a screenshot, and republish to the same artifact URL
**Gate:** the register shows zero doc-vs-app mismatches (or the mismatches you accepted), and it is published

### Phase 4 — Close
- [ ] 4.1 — Amend the reconciliation decision (docs accepted; originals archived), update [[bbos-pipeline]], prepend a log entry
- [ ] 4.2 — Commit the wiki and this plan on a new branch, open a PR
- [ ] 4.3 — Session Debrief
**Gate:** session complete when the PR is open and the debrief is given

---

## Definition of Done
The Factory folder holds the ten accepted docs: no yellow highlights, and each newest version row approved by Yousef Abdelsalam on 2026-10-18. `_archive/` holds the ten unchanged originals. The register at https://claude.ai/artifact/YZSgSkMXRkwtHrfFRXrbDh is rebuilt from the accepted docs and shows each stage as matching the app. The wiki records the acceptance, in a PR.

---

## Awaiting Approval
Type **"approved"** to begin execution, or provide feedback to revise the plan.
