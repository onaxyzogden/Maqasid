---
title: "Act decision titles render as outcomes, not actions (render-layer transform + override)"
type: decision
date: 2026-06-14
status: accepted
project: olos
commit: e5db2142
tags: [act-tier-shell, decision-list, copy, display-only, amanah-structural]
---

# Act decision titles: outcome-phrased, system-wide, via render-layer transform + override

## Context

Steward request, verbatim: **"In the selected list of tasks/decisions, I'd like the
title to describe the outcome rather than the action."** Demonstrated on three
`s1-vision` rows in the Act "Your decisions" list — c1 "Articulate the land vision in
one paragraph.", c2 "List the primary land-use goals (max 3).", c3 "Set stewardship
time + budget capacity bands." The wanted forms are the noun-phrase OUTCOMES — "Land
vision in one paragraph", "Primary land-use goals (max 3)", "Stewardship time + budget
capacity bands".

Each Act decision row's title is the checklist item's imperative `label`, rendered
verbatim at `DecisionList.tsx`. The Plan "do-it" checklist renders the SAME
`item.label` at `DecisionChecklist.tsx`. So the title must **diverge** between the two
surfaces — Plan keeps the imperative action, Act shows the outcome — which means the
shared `label` string cannot be edited (that would change both).

Three binding steward decisions (AskUserQuestion this session):
- **Scope** = every catalogue, system-wide (universal spine + all 14 type catalogues).
- **Surface** = Act decisions list only; the Plan checklist keeps the imperative.
- **Method** = auto-transform + override (derive the outcome form from `label`; an
  optional per-item field hand-sets exceptions).

## Decision

A pure render-layer transform plus an optional override field. **No catalogue `label`
string changed; no data migration; display-only, never a gate** (mirrors the
`feedsInto` posture, [[2026-06-13-feedsinto-forward-wiring]]).

**1. `toOutcomeTitle(label)`** — new pure helper in `apps/web/src/v3/copy/act.ts`
(auto-exported via the `copy/index.ts` barrel `export * from "./act.js"`). It strips
ONLY a curated `OUTCOME_SAFE_VERBS` set (articulate/list/set/define/inventory/record/
identify/document/map/describe/outline/specify/capture/draft/establish/confirm/select/
classify/assess/calculate/estimate/catalogue/catalog/compile/note/summarize/summarise/
plan/design/build) + an optional leading article (the/a/an/your), drops a trailing
period or ellipsis, and capitalizes. **Everything it does not positively recognize is
returned verbatim** — unknown leading verb, OR a `PROTECTED_LEAD` decision-framing verb
(decide/choose/determine/evaluate/weigh/consider), OR a `PROTECTED_MARKERS`
`\bwhether\b` / `\bvs\.?\b`. Conservative by construction: when unsure, leave the label
untouched. `state` is **deliberately excluded** from the safe set (an existing fixture
uses "State the primary purpose" and must stay verbatim).

**2. Override field** — optional `outcomeTitle: z.string().min(1).optional()` on
`PlanDecisionChecklistItemSchema` (`planStratumObjective.schema.ts`), plus a passthrough
in the authoring helpers (`ck` opts gain `outcome?`; `ckA`/`ckF` gain a trailing
`outcome?` param; all spread `outcomeTitle` only when set). Optional + no default =
runtime back-compat; every existing item validates unchanged. **Zero catalogue
overrides populated** — infrastructure for future hand-tuning; the transform already
covers every item.

**3. Render** — `DecisionList.tsx` row title becomes
`{item.outcomeTitle ?? toOutcomeTitle(item.label)}`. The Plan `DecisionChecklist`
keeps `item.label`. Mode badges are separate `<span>`s and unaffected. The "Feeds X"
captions resolve from the *target objective's title* (not item labels), so there is no
feed-caption drift.

**Scope trimmed to DecisionList-only.** The plan's optional coherence edit — outcome-
phrasing the Act *working-panel header* too, by threading `outcomeTitle` onto
`buildDecisionTarget`'s `DecisionPanelTarget` in `ActTierZeroWorkbench.tsx` and
rendering it in `DecisionWorkingPanel.tsx` — was **deferred** because
`DecisionWorkingPanel.tsx` is operator out-of-band WIP. The plan explicitly anticipated
this fallback ("if it balloons, ship DecisionList-only and defer the header"). Net
effect: a selected row's panel header still shows the imperative `label`; the small
remaining coherence task picks up once that file is operator-clean.

> **Follow-up 2026-06-15 — coherence edit COMPLETE (`dc14afb8`).** Once
> `DecisionWorkingPanel.tsx` settled to clean, the deferred header edit landed
> exactly as planned: `buildDecisionTarget` threads `item.outcomeTitle` onto the
> `DecisionPanelTarget`, and the header renders
> `decision.outcomeTitle ?? toOutcomeTitle(decision.label)`. The textarea fallback
> keeps `aria-label={label}` (the accessible name = the *action* to perform in the
> field), so `getByLabelText(checklist[0].label)` assertions stay green. The five
> generic-workbench `it.each` render assertions in `ActTierZeroWorkbench.test.tsx`
> were wrapped `getAllByText(toOutcomeTitle(checklist[0].label))` — required because
> the header no longer renders the raw label for safe-verb first items (a no-op wrap
> for non-safe-verb labels). +3 header tests + 2 `buildDecisionTarget` passthrough
> tests. A selected row's list title and panel header now agree.

## Amanah

Structural, not prose. The verbatim-fallback makes fiqh safety automatic — guardrail
labels render UNCHANGED with no per-item flagging: `ag-s4-revenue-model-c11` "Route any
membership / season-pass instrument to Scholar Council review before adoption" (first
word "Route" = not a safe verb → verbatim), and any "Decide whether to offer a season
pass (default: none)" (decision-framing `decide` + `whether` marker → verbatim). No
catalogue label text changed; no instrument created, priced, or sold; no capital-channel
or CSA/CSRA surface touched. Amanah-neutral, structurally fiqh-safe.

## Verification

Bounded `--pool=forks` vitest. Web **215/215** — copy.test 16 (incl. 5 new
`toOutcomeTitle` cases: safe-verb strip, define/inventory derivation, fiqh
`whether`-verbatim, unknown-verb-verbatim incl. the "Route…" guardrail, verb-only
"Confirm"→"Confirm"); DecisionList 27 (incl. 3 new render tests: safe-verb fixture
renders transformed, explicit `outcomeTitle` override renders verbatim, "Decide
whether…" renders verbatim); ActTierZeroWorkbench 172 unchanged. Shared **125/125**
(catalogues + spineTraceability.conformance). Typecheck: `shared` + `api` clean; `web`
clean in all 6 slice files — the 3 web `tsc` failures are operator-WIP only
(`syncServiceWorkItemsFallback.test.ts`, `WorkConflictSection.test.tsx`, and
`DecisionWorkingPanel.tsx:1627` `stewardOptions`-not-on-`SettlementPlanCaptureProps`
from the operator's in-flight StewardPicker wiring). Live preview NOT driven — the v3
Act route hangs the headless renderer deterministically ([[project-screenshot-hang]]);
in-browser render is asserted by the DecisionList DOM tests on exact strings
("3-5 measurable success criteria", "Success scorecard", verbatim fiqh label).

## Files

`apps/web/src/v3/copy/act.ts` (+`toOutcomeTitle`), `.../copy/__tests__/copy.test.ts`
(+cases), `apps/web/src/v3/act/tier-shell/DecisionList.tsx` (render + import),
`.../tier-shell/__tests__/DecisionList.test.tsx` (+render tests),
`packages/shared/src/schemas/plan/planStratumObjective.schema.ts` (+`outcomeTitle`),
`packages/shared/src/constants/plan/catalogues/authoring.ts` (`ck`/`ckA`/`ckF`
`outcome` passthrough).

## Status

Committed `e5db2142` on `main` (6 files, +180/−4, explicit pathspec), **NOT pushed** —
`main` is canonical, push awaits steward. Heavy operator out-of-band WIP
(`DecisionWorkingPanel.tsx`, Labour/Provision/Settlement captures + tests,
StewardPicker, `PlanTierShell.tsx`, wiki + docs) left intact, unstaged.

**Coherence follow-up `dc14afb8`** (2026-06-15, 4 files, +84/−12, explicit pathspec),
also **NOT pushed** (`main` now 3 ahead of origin). Verify: web bounded `--pool=forks`
**279/280** — the lone failure (`routes to SettlementPlanCapture`,
`getByLabelText('Founding cohort composition')`) is **pre-existing**, proven by stashing
the slice and reproducing identically on clean HEAD; it tracks the operator's
SettlementPlanCapture c1 cohort restructure, not this edit. Typecheck: `shared` + `api`
clean; `web` carries only the 4 documented pre-existing baseline errors
(`syncServiceWorkItemsFallback.test.ts`, `WorkConflictSection.test.tsx`) — none in the
slice files. Live preview not driven (v3 Act route deterministic hang,
[[project-screenshot-hang]]); render proven by exact-string DOM tests.

## Deferred

Per-catalogue `outcomeTitle` hand-tuning (transform covers every item already);
expanding `OUTCOME_SAFE_VERBS` as the catalogue is reviewed (never add a decision-framing
verb; never add `state`). ~~Act working-panel-header coherence edit~~ — **DONE**
`dc14afb8` (see Follow-up above).
