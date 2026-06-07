# SP1 Spec - Ecovillage S1 foundation captures + boundaries re-decompose

**Status:** draft (awaiting human review)
**Date:** 2026-06-07
**Project:** OLOS / Atlas (`atlas/`, branch `feat/structured-capture-forms` - confirm at execution start)
**Input spec:** `stages/research-olos-mockup-batch-triage-draft.md` (SP0 triage registry)
**Rollout context:** SP1 of "OLOS Mockup Batch - Multi-tier Objective-Capture Rollout (Ecovillage vertical first)"
**Pattern precedent:** Boundaries / `BoundaryCapture` (shipped), Stakeholders, Stewards, RBAC steward reconciliation (all shipped READY TO MERGE on this branch)

---

## 1. Goal

Build the three Ecovillage S1 foundation bespoke right-panel captures
(`ev-s1-legal-governance`, `ev-s1-provision-balance`, `ev-s1-conflict-framework`)
AND fold in the boundaries redesign (re-decompose the shipped 7-item `s1-boundaries`
surface to the mockup's 5 decisions and rebuild `BoundaryCapture`), all on the proven
non-spatial Tier-0 workbench mechanism.

All four work-streams are NON-spatial: they ship by widening `TIER_ZERO_OBJECTIVE_IDS`
and adding one self-routing `*Capture.tsx` per objective. No SP2 coexistence shell is
required.

## 2. Operator decisions baked into this spec

1. **Boundaries = re-decompose to the mockup's 5** (operator override of the triage's
   "defer boundaries" recommendation, overlap-resolution #1 / open-question line 350).
   Accepts breaking shipped `s1-boundaries-c1..c7` ids, rewriting the shipped catalogue,
   and rewriting the shipped `BoundaryCapture` tests.
2. **LG-1 = fold jurisdiction into c1.** Mockup d2 (country/province/registered-office)
   becomes fields inside `ev-s1-legal-governance` c1's FormValue; no new catalogue item.
3. **LG-2 = unify on the 5-option `evGovernanceModel` set.** Both
   `ev-s1-legal-governance` c4 and `ev-s1-conflict-framework` c1 resolve the SAME 5-option
   set; the legacy 4-option `evDecisionMethod` is retired.
4. **Ratification member rows = shared register, resolved to REUSE `metadata.team`.**
   The provision ratification panel (P6) has NO add-member affordance - members are
   pre-populated. Therefore the shared member SOURCE is the existing project-level
   `metadata.team` (primarySteward + coStewards + queuedInvites), the same register the
   shipped Stewards surface and RBAC reconciliation populate. Per-member ratification
   confirm-status lives in c6's completion-marker FormValue (NOT on `metadata.team`).
5. **Amanah = encode verbatim + scopeNote, proceed.** All financial / exit / dissolution
   / membership-levy / surplus-share strings encoded verbatim with an Amanah `scopeNote`
   flagging Scholar Council review. No CSA/salam/advance-purchase framing exists in any of
   these mockups (triage-confirmed); nothing is rejected, only flagged. Build proceeds.

## 3. Amanah Gate

Structured capture of land/community-stewardship planning intent (legal/tenure,
governance, provision balance, conflict framework). No sale, advance-purchase, financing,
or CSRA/salam framing. The financial-model cards, membership levy/surplus-share, and
exit/dissolution equity-formula language are settlement/contribution mechanics (not
advance-purchase); they are encoded VERBATIM with an Amanah `scopeNote` for Scholar
Council review per [[feedback-csa-in-catalogues]] / [[fiqh-csra-erased-2026-05-04]].
Clean - no riba/gharar surface; nothing blocks the build.

---

## 4. Architecture (Boundaries pattern, verbatim)

Each objective gets ONE self-routing bespoke `*Capture.tsx` with pure exported helpers and
exactly ONE flag + ONE arm in `DecisionWorkingPanel`:

- `*ModeFor(itemId): Mode` - pure, drives both the right-panel body and the center-list
  mode badge.
- `decode*(itemId, value: FormValue): *Model` - coerces unknown -> safe defaults.
- `is*Valid(itemId, model): boolean` - the Record-button gate.
- `summarise*(itemId, model): string` - record-summary mirror.
- default `*Capture({ itemId, value, onChange, resolveOptions, ... })` - controlled over
  FormValue; project tokens (`var(--font-serif)` italic titles, `var(--font-mono)` counts,
  lucide-react icons, CSS-module tokens with hex fallback); disabled "coming soon"
  affordances for any deferred I/O; doc upload via metadata stub (no real storage).

Persistence: all captures except ratification persist through the EXISTING
`actEvidenceStore.visionFormData[itemId]` FormValue path (no store change). Ratification
(provision c6) reads `metadata.team` reactively and writes confirm-status into its own
FormValue marker (see Section 8).

Option sets: `_base`-only entries added to `FIELD_OPTION_SETS` in
`packages/shared/src/constants/plan/fieldOptions.ts`, auto-exported via `index.ts`
`export *`, resolved through the already-threaded `resolveOptions(setId)` prop (no new
resolver function). REVIEW banner on the new block.

Predicate: add `ev-s1-legal-governance`, `ev-s1-provision-balance`,
`ev-s1-conflict-framework` to `TIER_ZERO_OBJECTIVE_IDS` (`s1-boundaries` already present).
Detection: `buildDecisionTarget` sets each `is*` flag by id-prefix. Badges: pass each
objective's `modeFor` to `DecisionList`; extend `MODE_LABELS`. Shell wiring is tsc-only
(BT7/SW precedent: no-prop multi-store integration component).

---

## 5. Boundaries re-decompose (`s1-boundaries`: 7 -> 5)

### 5.1 Catalogue rewrite (`packages/shared/src/constants/plan/catalogues/universal.ts`)

Replace the shipped 7-item `s1-boundaries` (c1..c7) with 5 items in 3 groups. New ids
`s1-boundaries-c1..c5`. (This breaks the shipped ids; the shipped `BoundaryCapture` tests
are rewritten accordingly.)

| group | item | label (verbatim from mockup) | mode |
|---|---|---|---|
| dg1 "Boundaries & rights of way" | c1 | Map all shared boundary conditions and obligations | `boundaryRegister` |
| | c2 | Identify rights of way | `rowRegister` |
| dg2 "Tenancy & title conditions" | c3 | Record existing tenancy/lease/occupation agreements | `tenancyRegister` |
| | c4 | Identify title conditions restricting communal use | `titleRestrictionChecker` |
| dg3 "Land history" | c5 | Record prior community/development history | `landHistoryRegister` |

Group `observeFeeds` and `focusedQuestion` copy: lift from the mockup verbatim (REVIEW).

### 5.2 BoundaryCapture rebuild (5 mode bodies, pixel-faithful)

Source mockup: `~/Downloads/olos_boundary_legal_survey.html` (784 lines). Match
pixel-for-pixel per the HTML-to-React rule; do not reinterpret.

| item | mode | FormValue shape | valid when |
|---|---|---|---|
| c1 | `boundaryRegister` | `{ sections: {direction:'N'\|'E'\|'S'\|'W', type:'shared'\|'road'\|'creek'\|'unfenced', name, obligation, disputeFlag:boolean}[] }` | >=1 section with `type` set |
| c2 | `rowRegister` | `{ rows: {type:'utility'\|'access'\|'public'\|'drain', name, impact:'restricts'\|'enables'\|'neutral', holder, width, detail}[] }` | always (zero ROW valid) |
| c3 | `tenancyRegister` | `{ rows: {type:'agist'\|'lease'\|'license', name, expiry:'near'\|'far'\|'expired', termFlag:'must'\|'monitor'\|'ok', detail}[] }` | always (zero tenancies valid) |
| c4 | `titleRestrictionChecker` | `{ categories: Record<CategoryId,'present'\|'absent'\|'unknown'> }` (6 fixed categories) | NO category remains `unknown` (HARD GATE) |
| c5 | `landHistoryRegister` | `{ rows: {era,type,name,body}[], wasPriorIC:'yes'\|'no'\|null, contamination: string[], notes }` | always |

Notes:
- **c4 HARD GATE:** Record disabled while any category is `unknown` (ports the mockup's
  `updateGate4()` / `.lk` lock). `present` rows render the consequence string + the "Act
  task will be created" note (copy verbatim from mockup, REVIEW). The 6 category labels +
  consequence strings come from the mockup verbatim.
- **c5 contamination chips:** `[Chemical storage/AST, Asbestos, Rubbish dump/landfill,
  Mining, None known]` (verbatim). Includes the mockup's legal-advice banner and the Dja
  Dja Wurrung Indigenous-Country cultural-heritage content (encode verbatim, REVIEW).
- Map preview (c1/c2): decorative inline SVG + disabled "Open map - coming soon" button
  (boundary precedent). No MapboxGL.

### 5.3 No-deletion compliance

Rename the shipped `apps/web/src/v3/act/tier-shell/BoundaryCapture.tsx` (old
doc/map/mapEntry/decision modes for the previous 7 items) -> `BoundaryCaptureLegacy.tsx`,
kept exported but unwired, in case the old legal-mode bodies are reused by another
vertical's legal surface ([[feedback-no-deletion]]). Build the new register-based
`BoundaryCapture.tsx` fresh. Update the `DecisionWorkingPanel` boundary arm to import the
new component.

### 5.4 New `_base` option sets (boundaries)

`boundaryDirection` ["N","E","S","W"]; `boundaryType`
["Shared boundary","Road frontage","Creek / waterway","Unfenced"]; `boundaryImpact`
["Restricts","Enables","Neutral"]; `boundaryRowType`
["Utility easement","Access easement","Public right of way","Drainage easement"];
`tenancyType` ["Agistment","Lease","Licence"]; `tenancyExpiry`
["Near term","Far term","Expired"]; `tenancyTermFlag`
["Must address","Monitor","OK"]; `titleRestrictionState` ["Present","Absent","Unknown"];
`landHistoryContamination`
["Chemical storage / AST","Asbestos","Rubbish dump / landfill","Mining","None known"].
(All content REVIEW; lift exact strings from the mockup at build time.)

---

## 6. EvLegalGovernanceCapture (7 items, all `decision` mode)

Source: `~/Downloads/olos_legal_entity_tenure_financial.html` (8 UI items -> 7 catalogue
items). Catalogue: `ev-s1-legal-governance`, stratum `s1-project-foundation`, groups
dg1[c1,c2]/dg2[c3,c4]/dg3[c5,c6,c7].

| item | FormValue shape | valid when |
|---|---|---|
| c1 Evaluate legal entity options (+LG-1 jurisdiction) | `{entityType?, country?, province?, registeredOfficeOnLand?}` | `entityType` set |
| c2 Select entity & document rationale | `{entityType?, why?, enables?, constrains?}` | `why.length>20 && enables.length>5 && constrains.length>5` |
| c3 Define land tenure model | `{tenureModel?}` | `tenureModel` set |
| c4 Define decision-making framework (LG-2) | `{decisionMethod?, quorum?}` (`decisionMethod` resolved from `evGovernanceModel`) | `decisionMethod` set |
| c5 Define financial governance | `{bankingStructure?, singleSignatoryLimit?, twoSignatoryLimit?, fullVoteThreshold?, financialYearEnd?}` | `bankingStructure` set |
| c6 Membership rights & obligations | `{rights: string[], obligations: string[]}` | always (record draft) |
| c7 Obtain legal advice (HARD GATE) | `{scopeConfirmed: string[], adviceReceived?, adviceDate?}` | all 5 scope items checked |

### 6.1 New `_base` option sets (legal-governance), verbatim from triage A1

- `evEntityType`: ["Community land trust (CLT)","Co-operative (housing or multi-stakeholder)","Charitable trust or non-profit corporation","Company (share or guarantee)","Incorporated society"]
- `evJurisdictionCountry`: ["Canada","Australia","New Zealand","United Kingdom","United States","Other"]
- `evJurisdictionProvince`: ["Ontario","British Columbia","Alberta","Quebec","Nova Scotia","Other Canadian province"]
- `evRegisteredOffice`: ["Yes","No - separate"]
- `evTenureModel`: ["Collective ownership - no private title","Leasehold - community land, household lease","Equity shares - proportional ownership interest","Hybrid - differentiated tenure by zone or household type"]  (AMANAH scopeNote: tenure/equity language)
- `evQuorum`: ["50% of active members","67% of active members","75% of active members","100% - unanimous attendance"]
- `evBankingStructure`: ["Community bank account - joint signatories","Separate accounts by function","Trustee-held funds"]
- `evSingleSignatoryLimit`: ["$250","$500","$1,000","$2,500"]
- `evTwoSignatoryLimit`: ["$2,500","$5,000","$10,000","$25,000"]
- `evFullVoteThreshold`: ["$5,000","$10,000","$25,000"]
- `evFinancialYearEnd`: ["31 March","31 December","30 June"]
- `evMembershipRights`: ["Right to occupy an allocated dwelling or site","Access to all shared land, infrastructure, and commons areas","Vote in community decisions (subject to the decision-making framework)","Priority consideration for expanded occupancy or additional plots","Share of any surplus income produced by community enterprises"]  (AMANAH scopeNote: the surplus-share right is OFF by default; flag for review as yield-as-membership-benefit)
- `evMembershipObligations`: ["Contribute a defined number of hours per month to shared land and infrastructure work","Pay monthly community levy on time as agreed","Participate in scheduled community decision-making meetings","Give the required notice period before initiating exit from the community","Maintain the private dwelling and site in a condition consistent with community standards"]  (AMANAH scopeNote: monthly levy)
- `evAdviceScope`: ["Legal entity type and registration process in the confirmed jurisdiction","Land tenure model - title structure, lease enforceability, resale formula","Financial governance - signing authority, trustee obligations, annual compliance","Membership agreement - rights, obligations, and exit provisions","Any design tensions flagged for this project type combination reviewed"]

The legacy `evDecisionMethod` 4-option set is NOT added (retired by LG-2); c4 uses
`evGovernanceModel` (Section 8.1).

---

## 7. EvProvisionBalanceCapture (6 items, specialized `decision` kinds)

Source: `~/Downloads/olos_communal_private_provision.html` (CANONICAL, file 6). Catalogue:
`ev-s1-provision-balance`, groups dg1[c1,c2,c3]/dg2[c4,c5,c6].

| item | kind | FormValue shape | valid when |
|---|---|---|---|
| c1 Communal infrastructure commitments | `provisionMatrix` | `{ rows: Record<DomainKey,'C'\|'H'\|'P'>, summary }` | all 7 domains classified |
| c2 Food system approach | choice cards | `{ selected:'fs-comm'\|'fs-hybrid'\|'fs-indiv' }` | one card picked |
| c3 Financial sharing model (AMANAH) | choice cards | `{ financialModel: string }` | one card picked |
| c4 Private household entitlements | `entitlementRegister` | `{ metrics: Record<string,{value:number,unit:string}>, privacy: string[], notes }` | always (record draft) |
| c5 Resolve communal/autonomy conflicts | `tensionMap` | `{ resolutions: { t1:string, t2:string, t3:string } }` | all 3 resolutions trimmed length > 10 |
| c6 Confirm provision balance agreed | `ratification` | see Section 8 | all `metadata.team` members confirmed |

c5's three tension prompts (verbatim from mockup, fixed/generated rows):
- t1 "Energy monitoring vs. household privacy"
- t2 "Communal harvest vs. individual plots in shortage"
- t3 "Fixed contributions vs. variable household circumstances"

### 7.1 New `_base` option sets (provision), verbatim from triage A2

- `evProvisionDomains` (7 matrix rows): ["Water supply","Energy","Sanitation & waste","Shared buildings","Roads & access","Communications","Healthcare & emergency"]
- `evProvisionMode`: ["Communal","Hybrid","Household"]
- `evFoodSystemApproach`: ["Fully communal","Hybrid - communal zones + individual plots","Individual plots - each household responsible"]
- `evFinancialSharingModel` (AMANAH scopeNote): ["Full income sharing","Household contributions + shared cost pools","Land equity + site fee model","Sliding scale solidarity fund","Separate finances, equal cost split"]
- `evPrivacyStandards`: ["Visual privacy - no sightlines from shared areas into private dwellings","Acoustic privacy - private dwellings meet minimum noise separation standard","Quiet hours - communal areas quiet after 10pm, before 7am","Visitor autonomy - households may have guests without community notice"]
- `evHouseholdEntitlements` (numeric field defs): "Private floor area" (m2 per adult equivalent), "Private outdoor space" (m2 per household), "Individual kitchen garden" (m2 per household), "Vehicle storage" (bays per household)

AMANAH scopeNote text on `evFinancialSharingModel` (verbatim, do not reword): riba/gharar
screen - the "site fee" + "no advance purchase" framing reads clean; Scholar Council
confirms the contribution/levy + surplus-share treatment. The longer "Used by: ..."
card-body strings are in file 5 (superseded) if needed for copy.

---

## 8. Shared member source + ratification (provision c6)

### 8.1 Decision

The shared member SOURCE is `metadata.team` (NOT a new dedicated store, NOT per-item
identities). Rationale: the ratification panel has no add-member UI; members are
pre-populated; `metadata.team` is the existing project-level shared register that the
shipped Stewards surface + `reconcileStewardInvites` populate.

Row derivation for the ratification body:
- `metadata.team.primarySteward` -> the auto-confirmed "Primary steward" row (the account
  user; always confirmed; no Confirm/Off-platform actions).
- `metadata.team.coStewards[]` + `metadata.team.queuedInvites[]` -> confirmable household
  rows, each with Confirm / Off-platform actions and an off-platform note form (mockup P6).

### 8.2 Confirm-status storage (c6 FormValue marker)

Confirm-status is ratification-specific, so it lives in c6's completion-marker FormValue,
keyed by a stable member identity (email for invites/co-stewards; a primary-steward
sentinel key):

```
{ confirmations: Record<memberKey, { status:'confirmed'\|'awaiting', offPlatformNote?:string, confirmedAt?:string }> }
```

- Capture reads `metadata.team` REACTIVELY via a stable-snapshot selector + `useMemo`
  (Zustand v5 stable-snapshot trap - select the raw object, derive arrays in `useMemo`;
  do NOT return a fresh array from the selector).
- Pure helpers take a member-list SNAPSHOT (array) + the marker, staying unit-testable.
- `isProvisionValid('...-c6', model)`: every derived team member has a `confirmations`
  entry with `status:'confirmed'` (primary steward auto-counts). Empty-team escape: if the
  only member is the primary steward, that single auto-confirm satisfies the gate.
- `summariseProvision('...-c6', model)`: e.g. "All 4 founding members confirmed" /
  "3 of 4 confirmed" (copy REVIEW).
- Panel owns completion (`onRecord` -> `saveVisionFormData` + `setItemComplete`),
  unchanged. Switching items remounts the capture (keyed on itemId) but every mount reads
  the same `metadata.team` -> no member state lost.

### 8.3 Signature roster reuse (conflict-framework c7)

The c7 founding-member signature roster (Section 9) ALSO derives names from `metadata.team`
(consistent with 8.1); signed-state is stored in c7's FormValue `signatures[]`.

---

## 9. EvConflictFrameworkCapture (7 items)

Source: `~/Downloads/olos_governance_decision_dispute.html` (CANONICAL, file 4; file 3
superseded - copy reference only). Catalogue: `ev-s1-conflict-framework`, groups
dg1[c1,c2]/dg2[c3,c4]/dg3[c5,c6,c7]. (Catalogue already carries `scopeNotes`.)

| item | kind | FormValue shape | valid when |
|---|---|---|---|
| c1 Formal decision process + quorum (LG-2 shared) | `decision` | `{governanceModel?, quorum?}` | card selected |
| c2 Dispute resolution pathway | `ladder` | `{tier1EscalateAfter?, tier2Mediator?, tier2EscalateAfter?, tier3Binding?, tier3CostAllocation?}` | always (pre-set) |
| c3 Community agreements | `tristate` | `{agreements: {id,topic,state,note?}[]}` | always (pre-set) |
| c4 Member exit process (AMANAH) | `decision` | `{exitModel?, noticePeriod?, dwellingTransition?}` | card selected |
| c5 Dissolution protocol (AMANAH) | `decision` | `{assetFramework?, dissolutionTrigger?, coolingOff?}` | card selected |
| c6 Regular community review | `decision` | `{reviewFrequency?, reviewFormat?, reviewScope: string[]}` | always |
| c7 Founding member signatures (HARD GATE) | `doc` | `{docType?, documentUploaded:boolean, signingDate?, signatures: {name,role?,signed:boolean}[]}` | `signatures.filter(signed).length>=4 && documentUploaded` |

Notes:
- c2 safety-bypass copy (verbatim, REVIEW): "Safety-related disputes (physical safety,
  children) bypass Tier 1 and proceed directly to Tier 2 or external authority as required
  by law."
- c7 doc upload = metadata stub (no real storage); signature roster names derive from
  `metadata.team` (Section 8.3).

### 9.1 New `_base` option sets (conflict-framework), verbatim from triage A3

- `evGovernanceModel` (5-opt; resolves LG-2; shared with legal-governance c4): ["Consent (sociocracy)","Full consensus","Modified consensus","Elected council / circle","Democratic majority vote"]
- `evDisputeTier1Escalate`: ["1 week","2 weeks","3 weeks","1 month"]
- `evDisputeTier2Mediator`: ["Any non-party member","Elected mediator role","External facilitator"]
- `evDisputeTier2Escalate`: ["3 weeks","4 weeks","6 weeks","2 months"]
- `evDisputeTier3Binding`: ["Non-binding recommendation","Binding if both parties agree","Always binding"]
- `evDisputeTier3CostAllocation`: ["Split equally","Shared by community fund","Borne by each party"]
- `evAgreementState`: ["Agreed","In progress","Not yet"]
- `evAgreementTopics`: ["Quiet hours","Visitor policy","Noise & construction","Shared space booking","Pet policy","Alcohol & substances","Work contribution requirements"]
- `evExitModel` (AMANAH scopeNote): ["Tenancy / lease model","Community land trust - buy-back model","Cooperative share model","Custom / case-by-case negotiation"]
- `evNoticePeriod`: ["30 days","60 days","90 days","6 months","12 months"]
- `evDwellingTransition`: ["30 days after notice","60 days after notice","90 days after notice","Until replacement found"]
- `evAssetFramework` (AMANAH scopeNote): ["Equal distribution by equity share","Charitable return to land trust","Market sale - proceeds split by formula","Successor community preference"]
- `evDissolutionTrigger`: ["Simple majority (50%+1)","Supermajority (75%)","Unanimous agreement"]
- `evCoolingOff`: ["None","3 months","6 months","12 months"]
- `evReviewFrequency`: ["Monthly / High maintenance","Quarterly / Recommended","Annual / Light-touch","As needed / Minimal overhead"]
- `evReviewFormat`: ["Full-day retreat / Deep engagement","Evening meeting / Operational","Written / async / Low friction","External facilitation / For major reviews"]
- `evReviewScope`: ["Any capital expenditure above agreed threshold","Changes to the community agreement framework","New member admissions","Member exit requests and settlements","Governance structure amendments","Dissolution proceedings"]
- `evSignatureDocType`: ["Self-drafted","OLOS-generated summary","Professionally drafted (recommended)"]

AMANAH scopeNote text (verbatim, do not reword): exit/dissolution settlement mechanics -
"equity in improvements ... buys back at the agreed formula price"; "resale formula -
usually CPI + improvements"; "distributed to members according to their equity share";
"Land sold at market value. Proceeds allocated according to an agreed equity formula after
debts are settled." Flag for Scholar Council review; encode verbatim regardless.

---

## 10. File inventory

### Shared (`packages/shared/`)
- MODIFY `src/constants/plan/catalogues/universal.ts` - rewrite `s1-boundaries` (7 -> 5
  items, 3 groups).
- MODIFY `src/constants/plan/fieldOptions.ts` - add all new `_base` option sets
  (boundaries + ev-legal + ev-provision + ev-conflict) with REVIEW banner + Amanah
  scopeNotes (auto-exported via `export *`).
- (Verify `ev-s1-*` catalogue ids/items/groups exist as expected in
  `src/constants/plan/catalogues/ecovillage.ts`; no change anticipated.)

### Web (`apps/web/src/v3/act/tier-shell/`)
- RENAME `BoundaryCapture.tsx` -> `BoundaryCaptureLegacy.tsx` (keep exported, unwired).
- CREATE `BoundaryCapture.tsx` (new register-based, 5 modes) + `.module.css` + `__tests__/`.
- CREATE `EvLegalGovernanceCapture.tsx` + `.module.css` + `__tests__/`.
- CREATE `EvProvisionBalanceCapture.tsx` + `.module.css` + `__tests__/`.
- CREATE `EvConflictFrameworkCapture.tsx` + `.module.css` + `__tests__/`.
- MODIFY `DecisionWorkingPanel.tsx` - rebuilt boundary arm import + 3 new arms
  (`isEvLegal`/`isEvProvision`/`isEvConflict`), each before the generic `hasFields`
  fallback; derive-once model, validity arm, gate-note arm, summary arm per capture;
  ratification reactive `metadata.team` rows (stable-snapshot + useMemo); thread the
  primary-steward identity for ratification/signatures.
- MODIFY `ActTierZeroWorkbench.tsx` - `buildDecisionTarget` sets the 4 flags by id-prefix;
  pass each objective's `modeFor` to `DecisionList`.
- MODIFY `DecisionList.tsx` - extend `MODE_LABELS` with new mode labels.
- MODIFY `ActTierShell.tsx` - add the 3 `ev-s1-*` ids to `TIER_ZERO_OBJECTIVE_IDS`
  (tsc-only).

### Docs (`wiki/`)
- `wiki/log/2026-06-07-atlas-ev-s1-foundation-captures.md`, ADR
  `wiki/decisions/2026-06-07-atlas-ev-s1-foundation-captures.md`, `wiki/index.md`.
  (Leave `wiki/log.md` untouched if foreign-staged - verify at execution.)

---

## 11. Decomposition into plans

This spec is large (4 captures + a catalogue rewrite that breaks shipped ids + ~45 option
sets). The writing-plans phase will produce FOUR task-groups, each its own
spec->build->review slice, sharing this spec + the one `fieldOptions.ts` file:

1. **Boundaries** (catalogue rewrite + `BoundaryCapture` rebuild + legacy rename + tests).
2. **Legal-governance** (`EvLegalGovernanceCapture` + LG-1/LG-2 + option sets).
3. **Provision + ratification** (`EvProvisionBalanceCapture` + `metadata.team` reuse +
   confirm-status marker).
4. **Conflict-framework** (`EvConflictFrameworkCapture` + signature hard-gate).

Predicate-widen + `MODE_LABELS` + final whole-implementation review + live smoke fold into
the last group (or a short closeout task).

---

## 12. Verification

- **Bounded vitest (Windows, MANDATORY forks):** `--pool=forks --testTimeout=20000`.
  Shared: `fieldOptions` (all new sets present, non-empty `_base`,
  `resolveFieldOptions(id, undefined)` deep-equals `_base`, unknown id -> `[]`); catalogue
  shape (s1-boundaries 5 items / 3 groups). Web: each `*Capture` (ModeFor all ids +
  decode/valid/summarise incl. the c4 Unknown hard-gate, c7 signature hard-gate, c6
  ratification reactive validity) + `DecisionWorkingPanel` (4 arms, precedence before
  `hasFields`, validity) + `buildDecisionTarget`/`DecisionList` (detection + badges).
- **Typecheck:** shared `tsc --noEmit`; web
  `$env:NODE_OPTIONS='--max-old-space-size=8192'; pnpm --filter @ogden/web exec tsc --noEmit`
  - no new errors outside pre-existing foreign `src/compost/*` WIP.
- **Live smoke (no screenshot = no "working" claim; [[project-screenshot-hang]]):** an
  Ecovillage-typed project - each ev-s1 objective swaps to the non-map workbench, items
  route to the right capture body, Record gate behaves (incl. hard gates), Record ticks +
  rehydrates; provision c6 shows the `metadata.team`-derived member rows and gates on full
  confirmation; `s1-boundaries` renders the new 5-decision surface with the c4 Unknown lock
  visible; `s1-vision`/`s1-stakeholders` + a spatial objective unaffected.

## 13. Branch hygiene (per shipped sub-projects)

Branch `feat/structured-capture-forms` (confirm first; this branch is force-pushed/rebased
externally - `git fetch` + divergence check before each commit). Explicit pathspec, never
`git add -A`; new untracked files `git add -- <path>` first; partial-commit
`git commit -F <msgfile> -- <paths>` (foreign WIP is staged in the index); no `--amend`;
commit each task on green ([[feedback-commit-immediately-on-rebased-branches]]); do NOT
push; ASCII-only (no em-dashes; apostrophes via double-quoted JS strings); no-BOM commit
message files (verify first 3 bytes are NOT 239 187 191); end messages
`Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`; verify
`git diff --cached --name-only` after each commit; NEVER stage/touch foreign WIP. SDD:
fresh implementer + two-stage (spec then quality) review per task; final
whole-implementation review.

## 14. REVIEW flags (mockup-blocked / operator-confirm content)

- R1: exact boundary mockup strings (group labels, focusedQuestion, c4 category labels +
  consequence strings + "Act task will be created" note, c5 legal-advice banner + Dja Dja
  Wurrung cultural-heritage content, contamination chips).
- R2: all `_base` option-set CONTENTS (lifted verbatim from triage; confirm against
  mockups at build).
- R3: gate-note + summary COPY for every capture.
- R4: ratification summary copy + the empty-team escape behaviour.
- R5: Amanah scopeNote exact wording (verbatim from mockup card bodies).
- R6: mode-badge LABELS for the new modes.

## 15. Out of scope

- SP2 coexistence shell + metadata-driven predicate (deferred until a genuinely spatial
  mockup arrives).
- SP3 Ecovillage S2 captures (carrying-capacity / landscape-vectors / social-fabric).
- Real spatial I/O (map pin/draw) + real file upload/storage (deferred rich-I/O track;
  captures keep disabled "coming soon" affordances + metadata stubs).
- The two panel redesigns (primary-purpose, assumptions).
- A dedicated `memberRegisterStore` + add-member UI (superseded by the `metadata.team`
  reuse decision; revisit only if a future surface needs founding members distinct from
  the team).
