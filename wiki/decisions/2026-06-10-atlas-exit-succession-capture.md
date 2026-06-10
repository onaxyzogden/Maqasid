---
title: "Atlas — ExitSuccessionCapture: build + wire the ev-s7-exit-succession Act capture"
type: decision
date: 2026-06-10
status: accepted
tags: [atlas, olos, act, tier-shell, structured-capture, ecovillage, stratum-7]
superseded_by: null
---

# Atlas — ExitSuccessionCapture: build + wire the ev-s7-exit-succession Act capture

## Context

The steward dropped a dark-themed OLOS Act-stage workbench mockup
(`olos_exit_succession_act.html`, "Member Exit & Land Succession Protocol",
Ecovillage Stratum 7, 5 decisions / 3 sections). Triage answer: it maps **verbatim**
to an already-authored objective — `ev-s7-exit-succession` (ref **EV-S7.8**,
[ecovillage.ts:1381](packages/shared/src/constants/plan/catalogues/ecovillage.ts:1381)),
same title, focused question, scope note, 5 checklist items (c1–c5), same 3 decision
groups, same completion gate. The **objective layer needed no change**. What was
missing was the UI: there was no capture component, and the S7 objective was not in
`TIER_ZERO_OBJECTIVE_IDS`, so it never reached the inline workbench. This is a **new
(50th) mockup** — it arrived in Downloads, not the existing MOCKUP_REGISTRY set.

Steward choices (AskUserQuestion): **scope = full build + wire** (capture component,
all wiring, tests, registry row); **Amanah = already cleared** (finance copy
pre-cleared for verbatim transcription — cost-sharing / asset-transfer among co-owners,
same domain as `ev-s1-provision-balance`; no salam / CSRA / advance-sale present).

## Decision

Built `ExitSuccessionCapture` following the canonical `ProvisionBalanceCapture`
precedent — **pure / controlled / no store / no projectId**: `decode(value)` each
render (TOTAL/defensive, never fabricates seed data), emit `onChange(encode(next))`,
ASCII-only, panel chrome owned by `DecisionWorkingPanel`, capture renders only the
mode body. Mode mapping c1→exitProcess, c2→dwellingTransfer, c3→landReversion,
c4→dissolution, c5→legalReview; choices serialized to one `FormValue` key (`esChoices`)
as `rowKey::value` entries. Wired across the 8 planned files: new
`ExitSuccessionCapture.tsx` + `.module.css` + test; `workbenchAffordances.ts`
(`ev-s7-exit-succession` entry, `modeFor` → `es-${m}`); `DecisionWorkingPanel.tsx`
(`isExitSuccession?` on `DecisionPanelTarget` + decode/validity/body-router arms);
`ActTierZeroWorkbench.tsx` (`isExitSuccession` detection + return field);
`ActTierShell.tsx` (`'ev-s7-exit-succession'` added to `TIER_ZERO_OBJECTIVE_IDS`);
`MOCKUP_REGISTRY.md` (50th-mockup S7 row). No change to `objectiveActTools.ts`
(`'ev-s7-exit-succession': []` is correct — form-only panel, no map-draw tools).

## Rationale

The mockup matched the authored objective exactly, so re-authoring would have been
wasteful and risked drift. `ProvisionBalanceCapture` is the proven recent multi-mode
advisory capture in the same financial-co-ownership domain — reusing its pure/controlled
shape keeps persistence flowing through the panel's `onRecord` and avoids new
store/schema surface. The verbatim-transcription Amanah clearance means the finance copy
is carried unreworded with scope-note flags where it appears.

## Alternatives Considered

- **Fold into `ConflictFrameworkCapture`** (which already has embedded
  `exitProcess`/`dissolution` modes, S1) — rejected: distinct objective (S7, fuller
  treatment); no dedup, no shared code; conflating them would muddy two separate
  catalogue objectives.
- **Re-author the objective from the mockup** — rejected: it already exists verbatim.

## Verification

- **tsc (app-source `tsconfig.json`): 0 errors** — `ExitSuccessionCapture.tsx` and the
  additive `ComponentsDebugPage.tsx` showcase clean.
- **vitest (bounded `--pool=forks`):** `ExitSuccessionCapture.test.tsx` all pass;
  `ActTierZeroWorkbench.test.tsx` 59/60. The lone failure
  (`queryByTestId(/^mode-badge-/).toBeNull()` at working-tree line 499) is a
  **pre-existing committed assertion** (HEAD line 474) shifted by an added describe
  block; it fails on the committed `s1-vision-labour` affordance (commit `335f7b5e`,
  external labour-categories feature), not on this work — confirmed three ways
  (my affordances diff touches neither `s1-vision` nor `labour`; HEAD already ships the
  labour affordance; my test diff adds zero mode-badge assertions). Left for the
  labour-feature owner per the standing "external work untouched" rule.
- **vite build:** green. Full `tsc -b` build is blocked only by the **external**
  `AdaptiveManagementCapture.test.ts` type errors (test tsconfig leg), not app source.
- **Preview screenshot: blocked / unverified.** The live Act tier-shell route mounts the
  full cesium/maplibre map substrate even for tier-zero objectives, hanging the headless
  preview renderer; the cold 90-panel `/v3/components` showcase also hangs Vite's cold
  transform. No screenshot obtained — the in-browser render of the capture is **not**
  asserted ([[project-screenshot-hang]]).

## Incident — RESOLVED (false premise, no loss)

An earlier session note worried that a `git checkout -- ComponentsDebugPage.tsx` during
verification had **wiped the external author's `ev-s7-adaptive-management` showcase
sections** and that they had been **reconstructed best-effort** (c1–c3 prompts + Section
titles uncertain), pending a steward diff. On re-examination this premise is **false**:
the Adaptive showcase was **already committed at `40bd6e01`** (`feat(act): add
AdaptiveManagementCapture …`) *before* the checkout, so `git checkout -- …` restored the
**real committed prose**, not an empty state. Confirmed three ways: HEAD and the working
tree both carry the full Adaptive showcase; this session's committed `ComponentsDebugPage.tsx`
diff is **purely additive** (exit-succession `Section`s only, **0** adaptive-management
changes); and the working-tree Adaptive block is byte-identical to HEAD. **No
reconstruction persists in the committed tree and nothing was lost** — the steward diff
of c1–c3 is unnecessary. The exit-succession showcase block stands as the only new
`ComponentsDebugPage.tsx` content from this work.

## Consequences

- The S7 Ecovillage exit/succession objective now routes into the inline non-map
  workbench; all 5 decisions reach the dedicated capture (subject to in-browser
  verification, still pending).
- Establishes the `es-` badge namespace in `workbenchAffordances`.
- **Committed as `e297bd1d`** on `main` (10 files, +1716, all additive) via explicit-path
  + hunk-level (`git apply --cached --recount`) staging — the interleaved external
  ecology/terrain survey WIP in `ActTierShell.tsx` / `DecisionWorkingPanel.tsx` was left
  unstaged and intact. **NOT pushed** — `main` is canonical, push awaits the steward.
- Deferred: in-browser screenshot verification once a non-hanging preview env exists;
  a decision on whether tier-zero routes should skip the map mount for headless preview.

## Connections

- [[olos]] — the entity this capture extends
- [[project_act_tier_shell]] — the map-centric Act tier-shell pattern (project memory)
- [[2026-06-05-atlas-permaculture-merge-admin-bypass]] — the merge that put structured
  captures on `main`
- [[project-screenshot-hang]] — the documented preview/screenshot limitation
- [[feedback_csa_in_catalogues]] — the verbatim-Amanah-flag rule governing finance copy
