# OLOS Mockup Batch -- Triage Registry (Ecovillage vertical)

**Phase:** research (SP0 of the "OLOS Mockup Batch Multi-tier Objective-Capture Rollout" umbrella)
**Status:** draft (human review gate before SP1 build)
**Date:** 2026-06-07
**Author:** Claude Code (machine hemisphere) -- read-only over mockups + catalogue; no source edits
**Plan:** `~/.claude/plans/check-every-single-objective-prancy-dahl.md` (umbrella section "OLOS Mockup Batch")
**Inputs:** 13 Ecovillage-vertical mockups in `~/Downloads/olos_*.html`; catalogue `packages/shared/src/constants/plan/catalogues/ecovillage.ts` + `universal.ts`

---

## Purpose

Resolve the mockup -> objective mapping for the WHOLE Ecovillage vertical before any
build, because the mockups are NOT 1:1 with objectives (several mockups touch one
objective; some are two design takes on the same objective). This artifact is what the
per-group specs (SP1, SP3, and later S3+ groups) consume. No code is written here.

Each per-item "mode" uses the established capture vocabulary from the shipped
Boundaries/Stakeholders surfaces: `doc` (upload/metadata), `map` (pure map ack),
`mapEntry` (map + structured list), `decision` (structured form), `contact`
(name/role/contact rows), `cultural` (sensitive + explicit "none acknowledged"),
`annotate` (update fields on shared-register rows). New specialized form bodies are
flagged as `decision` variants (a `FormValue` with a `kind` discriminator), NOT new
top-level modes, unless noted.

---

## TOP-LINE FINDING (changes the rollout dependency graph)

**All three Ecovillage S2 land-reading mockups render as pure FORM surfaces -- no map.**
- `olos_carrying_capacity` -> numeric calculators + a hectare-allocation table; no map canvas, no geometry.
- `olos_landscape_context` -> a directional LIST register (text rows like "W . 0.8km"); the d1 "Map" badge is label-only -- no map element renders.
- `olos_social_fabric_survey` -> relationship/skills selects + chips; entirely people-based (d3's `mb-map` badge is a misleading icon reuse).

**Consequence:** the Ecovillage vertical (S1 foundation + S2 land-reading) can ship
END-TO-END on the EXISTING `TIER_ZERO_OBJECTIVE_IDS` predicate-widen mechanism
(workbench-replaces-map), exactly like Boundaries. **SP3 is no longer blocked by SP2.**
The SP2 coexistence shell (workbench + map together) is only required when a genuinely
spatial surface arrives -- the universal `s2-terrain` / `s2-climate` / `s2-ecology`
surveys (mockups NOT yet supplied/examined) or a future map-drawing tier. Recommend:
build Ecovillage S1 (SP1) then Ecovillage S2 (re-scoped, non-spatial) on the current
mechanism; defer SP2 until a real map-coexistence surface is in hand.

**Latent-spatial note:** `ev-s2-landscape-vectors` c1 (direction+distance register) is
the single place a future optional map overlay would attach. Build it now as `mapEntry`
(list-only, disabled "Open map -- coming soon" affordance, per Boundaries precedent);
it upgrades cleanly when SP2 exists.

---

## Registry summary table (one row per mockup file)

| # | mockup file | objective id | stratum | tier badge | spatial? | capture component | overlap / notes |
|---|---|---|---|---|---|---|---|
| 1 | olos_boundary_legal_survey.html | `s1-boundaries` (universal, SHIPPED) | s1-project-foundation | Tier 0 | No (list registers) | n/a -- redesign of shipped surface | 5-item fuller take on the shipped 7-item boundaries; treat as DEFER (redesign sub-project), NOT SP1 |
| 2 | olos_legal_entity_tenure_financial.html | `ev-s1-legal-governance` | s1-project-foundation | Tier 0 | No | NEW `EvLegalGovernanceCapture` | canonical legal/tenure/financial surface (8 mockup items -> 7 catalogue items; jurisdiction folds in) |
| 3 | olos_governance_structure.html | `ev-s1-conflict-framework` | s1-project-foundation | Tier 3 (badge) | No | NEW `EvConflictFrameworkCapture` | SUPERSEDED by file 4 (flat rail, older); use only for copy reference |
| 4 | olos_governance_decision_dispute.html | `ev-s1-conflict-framework` | s1-project-foundation | Tier 0 (badge) | No | NEW `EvConflictFrameworkCapture` | CANONICAL governance/dispute surface (grouped rail, per-objective gates) |
| 5 | olos_communal_provision.html | `ev-s1-provision-balance` | s1-project-foundation | Tier 3 (badge) | No | NEW `EvProvisionBalanceCapture` | SUPERSEDED by file 6 (single-objective prototype, static summary) |
| 6 | olos_communal_private_provision.html | `ev-s1-provision-balance` | s1-project-foundation | Tier 0 (badge) | No | NEW `EvProvisionBalanceCapture` | CANONICAL provision surface (two sub-objectives, live-bound summary) |
| 7 | olos_carrying_capacity.html | `ev-s2-carrying-capacity` | s2-land-reading | Tier 0 | **No** (calculators) | NEW `EvCarryingCapacityCapture` | 7 items 1:1; numeric calc + synthesis + gate-check |
| 8 | olos_landscape_context.html | `ev-s2-landscape-vectors` | s2-land-reading | Tier 0 | **No** (list register) | NEW `EvLandscapeVectorsCapture` | 6 items 1:1; c1 latent-spatial (mapEntry) |
| 9 | olos_social_fabric_survey.html | `ev-s2-social-fabric` | s2-land-reading | Tier 0 | **No** (people survey) | NEW `EvSocialFabricCapture` | 6 items 1:1; two sub-objectives; survey framing (no hard gates) |
| 10 | olos_communal_waste.html | `ev-s3-waste-cycling` | s3-systems-reading | Tier 2 | Partly (2/6 map badges) | LATER (S3 group) | out of SP1/SP3 scope; schedule as S3 group |
| 11 | olos_energy_systems.html | `ev-s3-energy-potential` | s3-systems-reading | Tier 2 | Low (calc/assessment) | LATER (S3 group) | out of SP1/SP3 scope |
| 12 | olos_project_direction.html | `s4-direction` (UNIVERSAL) | s4-foundation-decisions | Tier 3 (badge) | No | LATER (S4 group) | universal, not ecovillage; own sub-group |
| 13 | olos_phased_settlement.html | `ev-s4-settlement-strategy` | s4-foundation-decisions | Tier 6 (badge) | No | LATER (S4 group) | content matches s4 obj despite Tier-6 badge; NOT `ev-s7-settlement-plan` |

**SP1 build set (Group A, S1 foundation):** rows 2, 4, 6 (canonical), with 3, 5 as copy references.
**SP3 build set (Group B, S2 land-reading, RE-SCOPED non-spatial):** rows 7, 8, 9.
**Deferred:** row 1 (boundaries redesign -> with the panel-redesign sub-projects); rows 10-13 (S3/S4 groups, later in the vertical).

---

## SP1 -- Group A: Ecovillage S1 foundation (DETAILED mode maps)

All three are NON-spatial -> widen `TIER_ZERO_OBJECTIVE_IDS` with the three objective ids;
one bespoke `*Capture.tsx` each (self-routing on itemId), one `is*` flag + one arm in
`DecisionWorkingPanel`, `_base` option sets in `fieldOptions.ts`, detection in
`buildDecisionTarget`, mode badges via `DecisionList` `modeFor`. (Boundaries pattern verbatim.)

### A1. `ev-s1-legal-governance` (catalogue: 7 items c1-c7, dg1[c1,c2]/dg2[c3,c4]/dg3[c5,c6,c7])

Source mockup: `olos_legal_entity_tenure_financial.html` (8 UI items -> 7 catalogue items).

| catalogue id | label (catalogue) | mockup item | mode | FormValue shape | valid when |
|---|---|---|---|---|---|
| c1 | Evaluate legal entity options | d1 entity picker (+ d2 jurisdiction folds here) | `decision` | `{ entityType?, country?, province?, registeredOfficeOnLand? }` | entityType set |
| c2 | Select legal entity & document rationale | d3 selection + rationale | `decision` | `{ entityType?, why?, enables?, constrains? }` | why>20 && enables>5 && constrains>5 |
| c3 | Define land tenure model | d4 tenure cards | `decision` | `{ tenureModel? }` | tenureModel set |
| c4 | Define decision-making framework | d5 framework cards + quorum | `decision` | `{ decisionMethod?, quorum? }` | decisionMethod set |
| c5 | Define financial governance | d6 financial cards + thresholds | `decision` | `{ bankingStructure?, singleSignatoryLimit?, twoSignatoryLimit?, fullVoteThreshold?, financialYearEnd? }` | bankingStructure set |
| c6 | Establish membership rights & obligations | d7 dual toggle checklist | `decision` | `{ rights: string[], obligations: string[] }` | always (record draft) |
| c7 | Obtain legal advice on chosen structure | d8 scope checklist (HARD GATE) | `decision` | `{ scopeConfirmed: string[], adviceReceived?, adviceDate? }` | all 5 scope items checked |

**TRIAGE FLAG LG-1 (jurisdiction):** mockup d2 (country/province/registered-office) has NO
dedicated catalogue item. Recommend folding jurisdiction fields into c1 (entity options
incl. jurisdiction). SP1 spec confirms.

**TRIAGE FLAG LG-2 (decision-method overlap):** c4 here ("decision-making framework",
4 options: Consent/Consensus/Modified/Majority) overlaps `ev-s1-conflict-framework` c1
("formal decision-making process", 5 options incl. "Elected council / circle"). They are
related but distinct (framework choice vs formal process detail). Reconcile to ONE option
set at SP1 spec time -- prefer the 5-option conflict-framework set; legal-governance c4
references it. (See A3 c1.)

New `_base` option sets (verbatim from mockup):
- `evEntityType`: ["Community land trust (CLT)","Co-operative (housing or multi-stakeholder)","Charitable trust or non-profit corporation","Company (share or guarantee)","Incorporated society"]
- `evJurisdictionCountry`: ["Canada","Australia","New Zealand","United Kingdom","United States","Other"]
- `evJurisdictionProvince`: ["Ontario","British Columbia","Alberta","Quebec","Nova Scotia","Other Canadian province"]
- `evRegisteredOffice`: ["Yes","No - separate"]
- `evTenureModel`: ["Collective ownership - no private title","Leasehold - community land, household lease","Equity shares - proportional ownership interest","Hybrid - differentiated tenure by zone or household type"]
- `evDecisionMethod` (legacy 4-opt; see LG-2): ["Consent (sociocracy)","Full consensus","Modified consensus with fallback vote","Democratic majority vote"]
- `evQuorum`: ["50% of active members","67% of active members","75% of active members","100% - unanimous attendance"]
- `evBankingStructure`: ["Community bank account - joint signatories","Separate accounts by function","Trustee-held funds"]
- `evSingleSignatoryLimit`: ["$250","$500","$1,000","$2,500"]
- `evTwoSignatoryLimit`: ["$2,500","$5,000","$10,000","$25,000"]
- `evFullVoteThreshold`: ["$5,000","$10,000","$25,000"]
- `evFinancialYearEnd`: ["31 March","31 December","30 June"]
- `evMembershipRights`: ["Right to occupy an allocated dwelling or site","Access to all shared land, infrastructure, and commons areas","Vote in community decisions (subject to the decision-making framework)","Priority consideration for expanded occupancy or additional plots","Share of any surplus income produced by community enterprises"]
- `evMembershipObligations`: ["Contribute a defined number of hours per month to shared land and infrastructure work","Pay monthly community levy on time as agreed","Participate in scheduled community decision-making meetings","Give the required notice period before initiating exit from the community","Maintain the private dwelling and site in a condition consistent with community standards"]
- `evAdviceScope`: ["Legal entity type and registration process in the confirmed jurisdiction","Land tenure model - title structure, lease enforceability, resale formula","Financial governance - signing authority, trustee obligations, annual compliance","Membership agreement - rights, obligations, and exit provisions","Any design tensions flagged for this project type combination reviewed"]

### A2. `ev-s1-provision-balance` (catalogue: 6 items c1-c6, dg1[c1,c2,c3]/dg2[c4,c5,c6])

Source mockup: `olos_communal_private_provision.html` (CANONICAL; `olos_communal_provision`
is the superseded single-objective prototype). 1:1 mapping.

| catalogue id | label | mockup item | mode | FormValue shape | valid when |
|---|---|---|---|---|---|
| c1 | Communal infrastructure commitments | d1 provision matrix | `decision` (`kind:'provisionMatrix'`) | `{ rows: Record<DomainKey,'C'\|'H'\|'P'>, summary }` | all 7 domains classified |
| c2 | Food system approach | d2 choice cards | `decision` | `{ selected: 'fs-comm'\|'fs-hybrid'\|'fs-indiv' }` | one card picked |
| c3 | Financial sharing model | d3 choice cards (AMANAH) | `decision` | `{ financialModel: string }` | one card picked |
| c4 | Private household entitlements | d4 numeric + checkboxes + free text | `decision` (`kind:'entitlementRegister'`) | `{ metrics: Record<string,{value,unit}>, privacy: string[], notes }` | always (record draft) |
| c5 | Resolve communal/autonomy conflicts | d5 tension map (3 generated rows) | `annotate`-like (`kind:'tensionMap'`) | `{ resolutions: { t1,t2,t3 } }` | all 3 resolution textareas > 10 chars |
| c6 | Confirm provision balance agreed | d6 ratification (per-member confirm) | `contact`-like (`kind:'ratification'`) | `{ members: {id,name,status,offPlatformNote?}[] }` | all members confirmed |

New `_base` option sets:
- `evProvisionDomains` (matrix rows): ["Water supply","Energy","Sanitation & waste","Shared buildings","Roads & access","Communications","Healthcare & emergency"]
- `evProvisionMode`: ["Communal","Hybrid","Household"]
- `evFoodSystemApproach`: ["Fully communal","Hybrid - communal zones + individual plots","Individual plots - each household responsible"]
- `evFinancialSharingModel` (AMANAH -- see flags): ["Full income sharing","Household contributions + shared cost pools","Land equity + site fee model","Sliding scale solidarity fund","Separate finances, equal cost split"]
- `evPrivacyStandards`: ["Visual privacy - no sightlines from shared areas into private dwellings","Acoustic privacy - private dwellings meet minimum noise separation standard","Quiet hours - communal areas quiet after 10pm, before 7am","Visitor autonomy - households may have guests without community notice"]
- Entitlement numeric fields (`evHouseholdEntitlements`): "Private floor area" (m2 per adult equivalent), "Private outdoor space" (m2 per household), "Individual kitchen garden" (m2 per household), "Vehicle storage" (bays per household)

### A3. `ev-s1-conflict-framework` (catalogue: 7 items c1-c7, dg1[c1,c2]/dg2[c3,c4]/dg3[c5,c6,c7])

Source mockup: `olos_governance_decision_dispute.html` (CANONICAL, grouped rail;
`olos_governance_structure` is the superseded flat-rail take). 1:1 mapping.

| catalogue id | label | mockup item | mode | FormValue shape | valid when |
|---|---|---|---|---|---|
| c1 | Formal decision-making process + quorum | d1 governance cards + quorum | `decision` | `{ governanceModel?, quorum? }` | card selected |
| c2 | Dispute resolution pathway | d2 3-tier escalation ladder | `decision` (`kind:'ladder'`) | `{ tier1EscalateAfter?, tier2Mediator?, tier2EscalateAfter?, tier3Binding?, tier3CostAllocation? }` | always (pre-set) |
| c3 | Community agreements (behaviour/noise/visitors) | d3 tri-state register | `annotate`/`decision` (`kind:'tristate'`) | `{ agreements: {id,topic,state,note?}[] }` | always (pre-set) |
| c4 | Member exit process | d4 cards + term selects (AMANAH) | `decision` | `{ exitModel?, noticePeriod?, dwellingTransition? }` | card selected |
| c5 | Dissolution protocol | d5 cards + triggers (AMANAH) | `decision` | `{ assetFramework?, dissolutionTrigger?, coolingOff? }` | card selected |
| c6 | Regular community review process | d6 button-grid + checkboxes | `decision` | `{ reviewFrequency?, reviewFormat?, reviewScope: string[] }` | always |
| c7 | Founding member signatures (HARD GATE) | d7 doc upload + signature roster | `doc` | `{ docType?, documentUploaded, signingDate?, signatures: {name,role?,signed}[] }` | >=4 signed && docUploaded |

New `_base` option sets (canonical = file 4):
- `evGovernanceModel` (5-opt; resolves LG-2): ["Consent (sociocracy)","Full consensus","Modified consensus","Elected council / circle","Democratic majority vote"]
- `evDisputeTier1Escalate`: ["1 week","2 weeks","3 weeks","1 month"]
- `evDisputeTier2Mediator`: ["Any non-party member","Elected mediator role","External facilitator"]
- `evDisputeTier2Escalate`: ["3 weeks","4 weeks","6 weeks","2 months"]
- `evDisputeTier3Binding`: ["Non-binding recommendation","Binding if both parties agree","Always binding"]
- `evDisputeTier3CostAllocation` (file 4 wording): ["Split equally","Shared by community fund","Borne by each party"]
- `evAgreementState`: ["Agreed","In progress","Not yet"]
- `evAgreementTopics` (file 4): ["Quiet hours","Visitor policy","Noise & construction","Shared space booking","Pet policy","Alcohol & substances","Work contribution requirements"]
- `evExitModel` (AMANAH): ["Tenancy / lease model","Community land trust - buy-back model","Cooperative share model","Custom / case-by-case negotiation"]
- `evNoticePeriod`: ["30 days","60 days","90 days","6 months","12 months"]
- `evDwellingTransition`: ["30 days after notice","60 days after notice","90 days after notice","Until replacement found"]
- `evAssetFramework` (AMANAH): ["Equal distribution by equity share","Charitable return to land trust","Market sale - proceeds split by formula","Successor community preference"]
- `evDissolutionTrigger`: ["Simple majority (50%+1)","Supermajority (75%)","Unanimous agreement"]
- `evCoolingOff`: ["None","3 months","6 months","12 months"]
- `evReviewFrequency`: ["Monthly / High maintenance","Quarterly / Recommended","Annual / Light-touch","As needed / Minimal overhead"]
- `evReviewFormat`: ["Full-day retreat / Deep engagement","Evening meeting / Operational","Written / async / Low friction","External facilitation / For major reviews"]
- `evReviewScope`: ["Any capital expenditure above agreed threshold","Changes to the community agreement framework","New member admissions","Member exit requests and settlements","Governance structure amendments","Dissolution proceedings"]
- `evSignatureDocType`: ["Self-drafted","OLOS-generated summary","Professionally drafted (recommended)"]

**Safety bypass copy (c2, verbatim, REVIEW):** "Safety-related disputes (physical
safety, children) bypass Tier 1 and proceed directly to Tier 2 or external authority as
required by law."

---

## SP3 (RE-SCOPED non-spatial) -- Group B: Ecovillage S2 land-reading (DETAILED)

All three are pure form -> ship on the existing predicate-widen mechanism (NOT blocked by SP2).

### B1. `ev-s2-carrying-capacity` (catalogue: 7 items c1-c7; dg1[c1-c4]/dg2[c5,c6,c7])

Source: `olos_carrying_capacity.html`. 1:1.

| id | label | mode | shape | valid when |
|---|---|---|---|---|
| c1 | Water demand estimate (holds population anchor) | `decision` (`kind:'capacityCalc'`) | `{ inputs, ceiling }` + `{ households, peoplePerHousehold }` | inputs present |
| c2 | Food production potential | `decision` (`capacityCalc`) | `{ inputs, ceiling }` | inputs present |
| c3 | Waste & nutrient cycling capacity | `decision` (`capacityCalc`) | `{ inputs, ceiling }` | inputs present |
| c4 | Energy demand & generation | `decision` (`capacityCalc`) | `{ inputs, ceiling }` | inputs present |
| c5 | Available space assessment | `decision` (`spaceAssessment`) | `{ zones: Record<string,number>, ceiling }` | inputs present |
| c6 | Define max sustainable population | `decision` (`synthesis`, read-only computed) | `{ maxPopulation, bindingConstraint }` | derived (no input) |
| c7 | Confirm intended pop within capacity (GATE) | `decision` | `{ pathway: 'pw-confirm'\|'pw-defer'\|'pw-redesign' }` | pathway selected |

Option sets: `evGrowingIntensity` ["Intensive (Market garden, deep beds)","Intermediate (Mixed veg + perennials)","Extensive (Pasture, food forest)"]; `evBlackwaterApproach` ["Composting toilets","Septic / biodigester","Municipal connection"]; `evGridConnection` ["Yes - grid connected","Off-grid / islanded"]; `evCarryingCapacityPathway` ["Confirm - within sustainable capacity","Defer - return to population planning","Redesign - expand resource capacity"].

### B2. `ev-s2-landscape-vectors` (catalogue: 6 items c1-c6; dg1[c1,c2] observeFeeds ['Ecology & Habitat'] / dg2[c3,c4,c5] / dg3[c6] observeFeeds ['Water & Hydrology'])

Source: `olos_landscape_context.html`. 1:1. NOTE the non-empty observeFeeds on dg1/dg3 --
the `DecisionList` feed annotation must render these (Boundaries had empty feeds).

| id | label | mode | shape | valid when |
|---|---|---|---|---|
| c1 | Map surrounding land uses (2km) | `mapEntry` (list-only; latent-spatial) | `{ entries: {direction,distance,name,riskTag,notes}[] }` | >=1 entry |
| c2 | Neighbouring practices spray/runoff risk | `decision` (`riskSurvey`) | `{ risks: {severity, pathways[], note}[] }` | >=1 risk assessed |
| c3 | Local authority / planning environment | `decision` | `{ planningEnvironment? }` | card selected (default pre-set) |
| c4 | Community groups / networks | `contact` | `{ networks: {relationship,name,notes}[] }` | >=1 (or none escape) |
| c5 | Prior planning disputes / opposition | `doc` | `{ disputes: {year,status,name,notes}[], lessons }` | always (zero is valid) |
| c6 | Catchment contamination risk | `decision` (`riskSurvey`) | `{ vectors: {name,severity}[] }` | vectors assessed |

Option sets: `evPlanningEnvironment` ["Favourable","Permissive","Uncertain","Challenging"]; `evRiskSeverity` ["High","Moderate","Low"]; `evRiskPathway` ["Airborne","Water","Soil"]; `evNetworkRelationship` ["Ally","Potential ally","Key contact","Monitor"]; `evDisputeStatus` ["Resolved","Dormant","Ongoing"]; `evContaminationSeverity` ["High","Mod","Low","Nil"].

### B3. `ev-s2-social-fabric` (catalogue: 6 items c1-c6; dg1[c1,c2,c3]/dg2[c4,c5,c6])

Source: `olos_social_fabric_survey.html`. 1:1. Survey framing -> NO hard gates ("no
decisions required"); all items record-ready. Two-objective rail structure (like provision file 6).

| id | label | mode | shape | valid when |
|---|---|---|---|---|
| c1 | Map founding-member relationships | `decision` (`relationshipMap`) | `{ rows: {memberId,knownSince,depth,priorCohab,note}[] }` | always |
| c2 | Prior community/coop experience | `decision` (`experienceRegister`) | `{ rows: {memberId,types[],note}[] }` | always |
| c3 | Prior attempts at IC on this land/group | `doc` (`priorAttempts`) | `{ attempts: {by,onThisLand,duration,ending,note}[], none? }` | always (none-ack valid) |
| c4 | Founding group cohesion | `decision` (`cohesionMap`) | `{ domains: Record<string,'High'\|'Medium'\|'Low'\|'Tension'>, notes }` | always |
| c5 | Skills gaps (facilitation/building/farming/legal/financial) | `decision` (`skillsMatrix`) | `{ domains: Record<string,string[]> }` (auto Covered/Gap/Critical) | always |
| c6 | External support relationships | `contact` (`externalNetworks`) | `{ networks: {name,enabled,note}[] }` | always |

Option sets (large chip sets -- see agent extraction for full verbatim): `evKnownSince`,
`evRelationshipDepth`, `evPriorCohabitation`, `evPriorExperienceTypes`, `evAttemptBy`,
`evAttemptDuration`, `evAttemptEnding`, `evCohesionLevel`, `evCohesionDomains`,
`evSkillsDomains` (6 domains x multi-chip), `evExternalNetworks`.

---

## AMANAH register (verbatim, do NOT reword; per [[feedback-csa-in-catalogues]] / [[fiqh-csra-erased-2026-05-04]])

No CSA / salam / advance-purchase framing found in ANY Ecovillage mockup. Items requiring
Scholar-Council-style review under the global covenant note (yield-as-membership-benefit;
permitted capital channels = donation, restricted donation, qard hasan, in-kind,
sponsorship):

**ev-s1-legal-governance (file 2):**
- c6 obligation: "Pay monthly community levy on time as agreed" (membership fee).
- c6 right: "Share of any surplus income produced by community enterprises" -- the ONLY
  yield/surplus-share item; OFF by default; framed as a membership benefit (aligns with
  permitted "yield as membership benefit" framing, but FLAG for review).
- Pervasive equity / resale-formula / market-value / capital-contribution language in c3
  (tenure) and c5 (financial governance: signatory dollar thresholds). Quoted in full in
  the agent extraction; encode verbatim if surfaced.

**ev-s1-provision-balance (files 5/6) c3 financial model cards (verbatim):**
- "Full income sharing" -- common pool; "Used by: Twin Oaks, Acorn Community..."
- "Household contributions + shared cost pools" -- "defined monthly amount to a communal fund..."
- "Land equity + site fee model" -- "Households pay an ongoing site fee. No individual equity stake in the land - only in their improvements." (CLT/co-op)
- "Sliding scale solidarity fund" -- "Contributions are a percentage of household income..."
- "Separate finances, equal cost split"
- Tension t3: household unable to meet contribution -> "grace period, solidarity mechanism, or site access at risk".
- ACTION: encode these five model strings verbatim + an Amanah `scopeNote` on the option
  set (riba/gharar screen; the "site fee" + "no advance purchase" framing reads clean, but
  Scholar Council confirms the contribution/levy + surplus-share treatment).

**ev-s1-conflict-framework (files 3/4) c4 exit + c5 dissolution (verbatim):**
- Exit: "equity in improvements ... buys back at the agreed formula price"; "resale formula - usually CPI + improvements"; "shares are sold back to the co-op at formula price".
- Dissolution: "distributed to members according to their equity share"; "Land sold at market value. Proceeds allocated according to an agreed equity formula after debts are settled."
- These are exit/wind-down settlement mechanics (not advance-purchase); FLAG for review,
  encode verbatim.

**ev-s2-social-fabric (file 9):** skills chip "Capital formation / fundraising" -- watch
if it ever wires to a capital channel; keep aligned to permitted channels. Faith-domain
note (Muslim founding group; halal food / Ramadan observance) -- covenant-aligned, no money.

**ev-s2-landscape-vectors / carrying-capacity:** only organic-certification + permit-cost
references; no riba/gharar. Clean.

---

## Mockup overlap resolution (decisions for the SP1/SP3 specs)

1. **Boundaries (file 1)** maps to the SHIPPED universal `s1-boundaries`, NOT an
   ecovillage objective. It is a fuller 5-item redesign of the shipped 7-item surface ->
   triage as a DEFER (redesign sub-project, grouped with the panel redesigns), NOT SP1.
2. **Governance: files 3 vs 4** -> file 4 (`olos_governance_decision_dispute`, grouped
   rail + per-objective gates) is CANONICAL for `ev-s1-conflict-framework`; file 3 is
   superseded (use only for copy). Tier badge conflict (file 3 Tier 3, file 4 Tier 0):
   follow the catalogue stratum `s1-project-foundation` (Tier 0).
3. **Provision: files 5 vs 6** -> file 6 (`olos_communal_private_provision`, two
   sub-objectives + live-bound summary) is CANONICAL for `ev-s1-provision-balance`; file 5
   superseded (longer financial-card "Used by" strings are the only reason to consult it).
4. **Decision-method overlap (LG-2):** unify `ev-s1-legal-governance` c4 and
   `ev-s1-conflict-framework` c1 onto the 5-option `evGovernanceModel` set.
5. **Jurisdiction (LG-1):** fold mockup d2 into `ev-s1-legal-governance` c1.
6. **phased_settlement (file 13)** content = `ev-s4-settlement-strategy` (s4), NOT
   `ev-s7-settlement-plan` (s7), despite the Tier-6 badge. Confirm at S4-group spec time.
7. **project_direction (file 12)** = universal `s4-direction`, not ecovillage; schedule in
   a universal S4 sub-group.

---

## New capture components (SP1 + SP3)

SP1: `EvLegalGovernanceCapture.tsx`, `EvProvisionBalanceCapture.tsx`,
`EvConflictFrameworkCapture.tsx` (+ `.module.css` + `__tests__` each).
SP3: `EvCarryingCapacityCapture.tsx`, `EvLandscapeVectorsCapture.tsx`,
`EvSocialFabricCapture.tsx`.

All follow the `BoundaryCapture` contract: self-routing on `itemId`; pure exported helpers
`*ModeFor` / `decode*` / `is*Valid` / `summarise*`; controlled-over-FormValue; disabled
"coming soon" affordances for any deferred I/O. The provision `ratification` (c6) and the
social-fabric per-member rows resemble the Stakeholders register pattern but fit per-item
FormValue (no cross-item shared register needed) -- confirm at spec time whether ratification
member rows should reuse `metadata.team` / a register or stay per-item FormValue.

---

## Recommended rollout update (supersedes the umbrella's SP2-blocks-SP3 ordering)

```
SP0  Triage registry (THIS DOC)                               -- DONE (pending human review)
SP1  Group A: ev-s1 legal-governance / provision / conflict   -- non-spatial; existing mechanism
SP3' Group B: ev-s2 carrying-capacity / landscape / social    -- ALSO non-spatial; existing mechanism (NOT blocked by SP2)
S3-group  ev-s3 waste / energy                                -- later in vertical
S4-group  ev-s4 settlement (+ universal s4-direction)         -- later in vertical
SP2  Coexistence shell + metadata predicate                   -- DEFER until a genuinely spatial mockup (terrain/climate/ecology) arrives
(deferred) boundaries redesign + primary-purpose + assumptions panel redesigns
```

Net change: the entire Ecovillage vertical S1+S2 ships on the proven Boundaries mechanism;
SP2 (the largest architectural piece) is decoupled and deferred until a real
workbench+map surface exists. This removes the critical-path dependency and lets value
ship continuously.

---

## Open questions for human review (before SP1 build)

- [ ] LG-1: confirm jurisdiction folds into `ev-s1-legal-governance` c1 (vs adding a catalogue item).
- [ ] LG-2: confirm unifying decision-method onto the 5-option `evGovernanceModel` set.
- [ ] Provision c6 ratification + social-fabric member rows: per-item FormValue vs a shared register?
- [ ] Amanah: Scholar Council sign-off on the financial-model card set, membership levy/surplus-share, and exit/dissolution equity-formula language (encode verbatim regardless).
- [ ] Confirm boundaries redesign (file 1) is deferred (not SP1).
- [ ] Confirm SP3 re-scope to non-spatial (no SP2 dependency) for the Ecovillage vertical.
