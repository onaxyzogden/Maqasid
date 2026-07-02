---
title: "Structured inputs (system-wide) + non-destructive prefill for vision-form tools"
type: decision
date: 2026-06-15
status: accepted
project: olos
commit: 5e7c6692,ce3f2416,a4f0a9c5,de486b83,11485a11,e3a41034,c6e82b13,7c94ecc1,95f302d9,c5b5bd2e,61b2682a,116570a4
tags: [act-tier-shell, plan-tier-shell, vision-forms, option-sets, prefill, amanah-structural, bespoke-capture-interception]
---

# Structured inputs system-wide + non-destructive prefill for the objective tool-tile forms

> [!note] Amended 2026-06-16
> The prefill source `s1-vision-labour` described here now reads from the new
> `s1-steward` objective -- labour + capital were split off `s1-vision` in the Tier-0 /
> Stratum-1 Declaration restructure ([[2026-06-16-atlas-tier0-declaration-restructure]]).
> The prefill mechanism (roster -> recap -> "Use this" clobber-guarded merge) is
> unchanged; only the objective id that owns the labour fields moved.

## Context

Steward request (this session, plan-gate approved unedited): replace the bare free-text
popups behind the Plan/Act **objective tool tiles** ("Household & ages", "Food target",
"Enterprise scope", "Labour available", …) with **(A) structured input controls
system-wide** AND **(B) prefill** drawn from the steward roster + prior objectives — so a
form opens with usable controls and, where a source exists, a non-destructive recap of what
is already known. Three binding AskUserQuestion decisions: do **both** halves; prefill from
**both** sources (roster/profile + prior objectives); structured-field coverage is
**system-wide** (every type catalogue).

Every tile in the "TOOLS FOR THIS OBJECTIVE" dock is a `kind:'form'` ActTool in
[actToolCatalog.ts](apps/web/src/v3/act/tier-shell/actToolCatalog.ts); clicking it opens the
shared `VisionFormsTabsModal`. What renders inside each tab depends on whether the catalog arm
carries an `arm.fields` spec — **with `fields`** → structured controls via `VisionFormFields`
(dropdowns, repeatable rows, text leaves); **without** → a single fallback `<textarea>`. At
the start of this effort only **7** of ~222 form arms (the `s1-vision-*` exemplars) carried
`fields`; everything else fell to the bare textarea. That single fact is the entire reason the
tiles felt like generic text boxes.

**The engine already existed and was left untouched** — `VisionFormFields.tsx` (kinds
`text`/`multiline`, `hybrid` = `optionSetId` select + `__free__` free-text sentinel,
`repeatable`), the `FIELD_OPTION_SETS` registry in
[fieldOptions.ts](packages/shared/src/constants/plan/fieldOptions.ts) resolved via
`resolveFieldOptions`, and the modal's closed→open seeding effect. The work was almost
entirely **authoring** (catalog `fields` + option-set registration), plus one small additive
prefill seam — no field-engine, store, or seeding-effect change.

## Decision

### Workstream A — structured inputs, system-wide

**A0 — shared semantic option-set core.** A small set of reusable vocabularies added to
`FIELD_OPTION_SETS` (`confirmAgreement`, `confirmStatus`, `yesNo`, `foodProductionTarget`,
`enterpriseScope`, `householdAgeBand`, `householdRole`, `accessibilityNeed`, `skillLevel`,
`scaleBand`, `conditionStatus`, `priorityBand`) so ~200 forms compose from a dozen shared
sets instead of inventing hundreds. Each gets a guard in
[fieldOptions.test.ts](packages/shared/src/constants/plan/__tests__/fieldOptions.test.ts);
the two Amanah-sensitive sets (`enterpriseScope`, `foodProductionTarget`) get an **exact-list
assertion** locking their wording.

**A1 → A2+ — author `fields` per catalogue, smallest-first, one commit per type.** Homestead
first as the proof set (exercises every field kind), then each type catalogue in its own
self-contained commit. The directive grammar per arm: multiline `text` for narrative;
`hybrid:setId` only where the vocabulary is a **closed taxonomy that is the form's central,
enumerable, stable decision**; `repeatable` for lists; status hybrids
(`confirmStatus`/`adviceStatus`/`confirmAgreement`) for confirmation/gate arms. Every batch
landed its type-specific option-set registration **in the same commit** as the catalog edit
(an unregistered `optionSetId` resolves to an empty dropdown). End state: **7 → 213
fields-bearing arms**; +3823/−201 across the three catalog/option files (the 201 deletions are
single-line→multiline arm reformats, **prompt strings byte-identical** — see Amanah).

### Workstream B — non-destructive prefill (additive infra)

A pure resolver `resolveFormPrefill.ts` (beside `resolveAnswerSpec.ts`; no React/store
imports — caller passes snapshots) returns **suggestions only**: a steward branch
(`s1-vision-labour` ← `rosterCapacityHours` + union of `skills`) and a prior-objective branch
(reverse-traverse `feedsInto` ∪ `prerequisiteObjectiveIds`, surfacing a saved capture only for
unambiguous single-leaf forms). A presentational `PrefillRecap.tsx` renders **above** the
fields with a per-row **"Use this"** button that merges one field into the *local draft* only
when that slot is empty (clobber guard); it never calls `onSave`. `VisionFormsTabsModal` gains
an additive optional `prefillByFormId?` prop (existing call sites compile unchanged). **Recap,
not silent pre-population** — silent seeding would write a value the steward never typed; if
they then Save, the store records an un-authored value, which is the fabrication risk the
Amanah brief forbids (acute for labour/budget figures).

### Scope refinements — bespoke-capture interception (the load-bearing exclusions)

Many tier-zero objectives are worked **not** through tool-tile modals but through **bespoke
captures** in the tier-zero workbench (`ActTierZeroWorkbench.tsx` → `DecisionWorkingPanel.tsx`,
~30 capture components keyed by `itemId`). A bespoke capture writes to the **same**
`actEvidenceStore[projectId][formId]` key a generic modal would. So adding a generic `fields`
spec to a bespoke-routed formId is **dead config** (never rendered) or, worse, a
**divergent-shape data hazard** (two writers, different shapes, one store key). The
authoritative bespoke prefix list lives in `ActTierZeroWorkbench.tsx` as `item.id.startsWith(…)`
guards (28 prefixes). Two exclusions follow and are deliberate:

- **ecovillage (`ev-`) is SKIPPED ENTIRELY** — its objectives are worked through bespoke
  workbench captures (legal-governance, provision-balance, settlement-plan, financial-plan,
  exit-succession, conflict-framework, …), so it gets **no** generic `fields`. (Its bespoke
  financial captures are governed separately — see
  [[2026-06-13-atlas-ecovillage-capital-plan-capture]].)
- **silvopasture's 5 `silv-sec-s1-livestock-intent-*` arms are SKIPPED** — bespoke
  `LivestockIntentCapture`. The rest of silvopasture (`silv-s1-*`) is generic-modal and was
  authored normally.

The close-out audit (below) verified **zero** fields-bearing formId collides with any of the
28 bespoke prefixes — the exclusions held exactly.

## Amanah

Structural, not prose — the fiqh boundary is enforced by **where vocabulary is allowed to be
enumerated**, and it is test-pinned:

- **No option set prices, sells, creates, or advance-sells an instrument.** Every
  sale/revenue/capital/pricing-adjacent prompt keeps a **free-text path** — market channel,
  harvest value, customer base, pricing & margin, commercial proposition + price point,
  capital/operating budget are all single multiline `text` leaves; channel/intent names appear
  only in placeholder prose, never as a selectable dropdown.
- **Only three production-scope/intent sets are enumerated on financial-adjacent arms** —
  `enterpriseScope` (own-use → some-for-sale band), `foodProductionTarget`
  (subsistence/supplementary/commercial band), `livestockProductIntent` (what is produced:
  meat/milk/eggs/fibre/breeding stock/land improvement). Each names an **intent band or
  output kind**, not a price, channel, or instrument; the two Amanah-sensitive ones are
  **locked by exact-list assertions**. Status hybrids (`confirmStatus`/`adviceStatus`) capture
  a yes/scheduled/obtained **status**, explicitly acceptable.
- **No CSRA / salam / season-pass / advance-purchase / membership-yield-as-return framing**
  is introduced anywhere. (CSRA erased 2026-05-04, *bayʿ mā laysa ʿindak*.)
- **Prefill never marks a decision complete, never writes on open, never fabricates**, and
  **never pre-fills sale/capital figures** (no source — forbidden by design).
- **Guardrail `prompt` and tile `label` strings are byte-unchanged** — single-line arms were
  reformatted to multiline, but the prompt value is identical.

## Verification

Bounded `--pool=forks` vitest only (Windows zombie risk), per batch:

- **`@ogden/shared` `fieldOptions.test.ts` 167/167** at the final (well) batch — three
  `it.each` guards auto-cover every registered set; exact-list locks on `enterpriseScope`,
  `foodProductionTarget`, and each batch's Amanah-sensitive sets.
- **Web `actToolCoverage.test.ts` + `VisionFormsTabsModal.test.tsx` + `VisionFormFields.test.ts`**
  green at each batch (coverage guard iterates EVERY form arm's hybrid fields and asserts each
  `optionSetId` is registered — the primary safety net against empty dropdowns).
- **Typecheck** clean except the **6 documented pre-existing baseline errors**
  (`syncServiceWorkItemsFallback.test.ts`, `WorkConflictSection.test.tsx` ×3,
  `useDimensionDrawTool.commit.test.tsx` ×2) — none from this effort.

**Close-out adversarial audit (workflow, 5 lenses → adversarial verify → synthesize):**
`cleanOverall: true`, **0 confirmed violations**, 0 findings flagged for verification.
(1) **Vocabulary** — 47 sets examined, none prices/sells/advance-sells; the only dollar-amount
enumerations are `legalAuth*` signing-authority spend ceilings (governance control, not product
prices) and `legalMembershipRights`'s "share of surplus income" is the permitted
membership-BENEFIT framing. (2) **Prompt routing** — 18 financial-adjacent fields-bearing arms,
every sale/pricing/channel/capital prompt keeps a free-text path. (3) **Dead config** — 0
fields-bearing formIds collide with the 28 bespoke prefixes. (4) **Registration** — all 28
referenced optionSetIds registered (74-key superset). (5) **Covenant immutability** — 189
prompts removed → 189 re-added byte-identical across 11 catalog commits, 0 changed, 0 dropped;
the riskiest reformats (double-quoted agritourism c4, orchard "50+ years") preserved exactly.
Live preview NOT driven — the v3 Act/Plan routes hang the headless renderer deterministically
([[project-screenshot-hang]]); rendered controls/recap/clobber-guard are DOM-asserted by unit
tests.

## Files

**Workstream A:** `packages/shared/src/constants/plan/fieldOptions.ts` (shared core + per-type
sets), `.../plan/__tests__/fieldOptions.test.ts` (guards + exact-list locks),
`apps/web/src/v3/act/tier-shell/actToolCatalog.ts` (`fields` on 213 arms).
**Workstream B:** `apps/web/src/v3/strata/resolveFormPrefill.ts` + `__tests__/`,
`apps/web/src/v3/act/tier-shell/PrefillRecap.tsx` (+`.module.css`),
`apps/web/src/v3/act/tier-shell/VisionFormsTabsModal.tsx` (additive `prefillByFormId` prop +
recap slot; seeding effect untouched) + `__tests__/`.
**Untouched by design:** the field engine, store, modal seeding effect, Plan `DecisionChecklist`
(keeps imperative `label`), and every catalogue label/prompt string.

## Status

**12 commits on `main`, explicit pathspec each, NOT pushed** (`main` is 19 ahead of
origin/main; push awaits steward):
`5e7c6692` (A0 option-set core + homestead) · `ce3f2416` (prefill recap + resolver + modal
prop) · `a4f0a9c5` regenerative-farm · `de486b83` off-grid · `11485a11` conservation ·
`e3a41034` education · `c6e82b13` market-garden · `7c94ecc1` agritourism · `95f302d9`
orchard/food-forest · `c5b5bd2e` silvopasture · `61b2682a` livestock · `116570a4` wellness
(the last catalogue). Interleaved foreign commits (`1b9daa4a` survey layers, `7821494c`
not-ready-unrecord) are operator/other work, not part of this effort.

**Workstream B3 (host wiring) SHIPPED `397c656b` (2026-06-16).** The two host mounts —
[PlanTierShell.tsx](apps/web/src/v3/plan/tier-shell/PlanTierShell.tsx) and
[ActTierShell.tsx](apps/web/src/v3/act/tier-shell/ActTierShell.tsx) — each got the 3 localized
additions (one `useStewardRoster(id)` read, one memoised `buildPrefillMap(openFormGroup.tools, ctx)`
with an `EMPTY_PREFILL` sentinel, one `prefillByFormId` prop at the modal mount). The recap is now
LIVE on both mounts. Originally HELD because both files carried operator out-of-band WIP; the
steward later authorized committing them WHOLE (commit-both-whole decision), so the commit also
carries that in-flight host WIP. PlanTierShell hard-imports the previously-untracked
`PlanTierSearchRail.tsx` (+`.module.css`), so both were added to the same commit to keep imports
resolving (its `.test.tsx` left untracked). 4 files, +284/−4; verified pre-commit = 66/66 bounded
vitest + tsc clean-at-baseline (only the 6 documented errors) + adversarial audit 0 confirmed/14
refuted. Push still awaits the steward.

## Deferred

- ~~**B3 host wiring**~~ — SHIPPED `397c656b` (2026-06-16); see above.
- **ecovillage structured inputs** — only if/when its objectives move off bespoke captures (not
  planned; the bespoke captures are the right surface for those).
- **Prefill source breadth** — today only `s1-vision-labour` has a confident steward mapping;
  household composition/ages/accessibility have no canonical store and stay blank unless freshly
  captured (honest by design, not a gap to paper over).
- **Push** of all unpushed `main` commits awaits the steward.
