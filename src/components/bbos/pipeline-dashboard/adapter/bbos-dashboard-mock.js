// BBOS Pipeline Dashboard - MOCK seed data (mostly superseded by live wiring).
// ---------------------------------------------------------------------------
// This is example content only: an OLOS/Atlas launch cycle. As of the 2026-06-04
// follow-up wiring pass, buildPipelineViewModel() in the adapter reads LIVE
// stores for stages IDY→RET. This seed is now retained ONLY for the concepts
// that have no live equivalent yet and are still rendered inert:
//   * the OPT retrospective execution block (STAGE_EXECUTION.OPT — metrics,
//     Barakah Health Index, Restoration Mandate), reused by the adapter, and
//   * BRIEF_SECTIONS (the Approval Brief section list).
// The rest (the non-OPT STAGE_EXECUTION entries, STAGES, BRIEF_IDENTITY) is
// kept so buildMockPipelineViewModel() still produces a complete VM for tests
// and as a reference, but the live adapter no longer uses those paths.
//
// The three seed objects below (STAGE_EXECUTION, STAGES, BRIEF_SECTIONS) are
// lifted verbatim from the approved mockup. buildMockPipelineViewModel() at the
// bottom re-keys them into the canonical view-model contract documented in the
// adapter. Components read ONLY the view-model field names, never these.
// ---------------------------------------------------------------------------
const STAGE_EXECUTION = {
  IDY:{type:"import_review",
    spiritualOpen:{attr:"Ash-Shahīd · The Witness",note:"Every answer declared here is given before the One who already knows the accurate version. Honesty now is not strategy — it is ibadah."},
    spiritualGate:{attr:"Al-Awwal · The First",note:"The routing made honestly here determines the structural quality of every stage above it. A correct beginning carries a different weight than a corrected one."},
    researchItems:[
      {id:"R1",label:"S1 — Operator Declaration",desc:"Skills, proof links, runway, and work aversions across three domains: regenerative land systems design, software product architecture, and technical methodology writing.",status:"filed"},
      {id:"R2",label:"S2 — Financial Stewardship Horizon",desc:"Documented runway figure — the actual number, not the optimistic one.",status:"filed"},
      {id:"R3",label:"S3 — Regulatory Pre-Check",desc:"SaaS in Ontario. FAO GAEZ v4 data licensing flagged for resolution before commercial paid-tier deployment.",status:"filed"},
    ],
    assetItems:[
      {id:"A1",label:"Normalised Intake Packet",glabel:"G1",status:"filed",desc:"All six intake sections mapped, validated, and gap-checked.",
        content:"Intake complete. Six sections validated. Financial horizon: 16 months. Operator skills declared: regenerative land systems design (8+ yrs), software product architecture (6+ yrs), methodology writing (4+ yrs). Work aversions: extractive growth models, VC-driven scope pressure, commoditised feature development. Geographic scope: Canada primary, US secondary. Proof links verified for all three domains."},
      {id:"A2",label:"Routing Decision Record",glabel:"G1",status:"filed",desc:"Routing basis documented — fields complete, no disqualifiers triggered.",
        content:"Routes to Stage 02 — CREDIBILITY. Intake complete. No automatic disqualifiers triggered. One regulatory note carried forward: FAO GAEZ v4 licensing incompatibility flagged as Stage Gate constraint, not disqualifier. Three work aversion flags logged and carried into CRD constraint mapping."},
      {id:"A3",label:"Field Validation Rules",glabel:"G1",status:"filed",desc:"Required/optional flags, conditional visibility, disqualifier logic applied and tested.",
        content:"All validation rules applied. Conditional field for regulatory pre-check activated. Three work aversion flags logged. Routing logic tested. No conditional field conflicts detected."},
    ],
    gateChecks:[
      {id:"GC1",label:"All six intake sections complete and validly mapped",passed:true},
      {id:"GC2",label:"Financial Stewardship Horizon documented as actual figure",passed:true},
      {id:"GC3",label:"No automatic disqualifiers triggered",passed:true},
      {id:"GC4",label:"Routing decision recorded with specific basis",passed:true},
    ],
  },
  CRD:{type:"import_review",
    spiritualOpen:{attr:"Al-Ḥaqq · The Truth",note:"Apply the disqualification criteria to yourself with the same rigour you would apply to someone else. The FAO GAEZ constraint is a real limit — not naming it does not make it smaller."},
    spiritualGate:{attr:"Al-Khabīr · The All-Aware",note:"Al-Khabīr already knows which niche cleared because it was genuinely viable and which was softened past the gate because the operator wanted it to pass. Name the difference."},
    researchItems:[
      {id:"R1",label:"S1 — Core Competency",desc:"Translating regenerative land systems methodology into structured, guided software workflows.",status:"filed"},
      {id:"R2",label:"S2 — Advantage Register",desc:"OLOS is the only platform that treats ecological time as a first-class structural constraint, not a neutral coordinate.",status:"filed"},
      {id:"R3",label:"S3 — Proof Audit",desc:"OLOS prototype functional through Plan + Act + Observe. 14 documented land steward interviews. Published methodology writing.",status:"filed"},
      {id:"R4",label:"S4 — Energy Profile",desc:"Generative: deep systems design, specification writing, methodology frameworks. Depleting: unstructured sales calls, generic feature requests, administrative compliance.",status:"filed"},
      {id:"R5",label:"S5 — Constraint Map",desc:"16 months runway. 30 hrs/week available (alongside day role). FAO GAEZ v4 licensing must resolve before paid tier enforcement.",status:"filed"},
      {id:"R6",label:"S6 — Regulatory Baseline",desc:"Ontario SaaS. FAO GAEZ v4 data licensing incompatibility with paid SaaS confirmed. Resolution path identified.",status:"filed"},
    ],
    assetItems:[
      {id:"A1",label:"V1 — Integrity Matrix",glabel:"G1",status:"filed",desc:"Pass/fail record of legal and geographic checks per niche candidate.",
        content:"Three candidates evaluated. One removed at V1: conventional farm management SaaS — regulatory complexity with agricultural data integrations (Health Canada, USDA) exceeds runway capacity. Dominant incumbents (Trimble Ag, Climate FieldView) have decade-long distribution advantages. Two proceed to V3."},
      {id:"A2",label:"V2 — Removed Niche Log",glabel:"G1",status:"filed",desc:"Removed candidates with specific rationale.",
        content:"Candidate removed: Conventional Farm Management SaaS. Basis: (1) Health Canada / USDA data integration requirements incompatible with current runway. (2) Incumbent distribution moats (10+ year head start) non-surmountable without institutional capital. (3) No methodology differentiation possible in commoditised space."},
      {id:"A3",label:"V3 — Cleared Candidate Handoff",glabel:"G2",status:"filed",desc:"Final viable niche candidates cleared through the Amanah Gate.",
        content:"Primary cleared: Regenerative land stewards managing multi-system properties of 5–500 acres — proof depth high, methodology gap acute, no credible software solution present. Score: 9.1/10. Secondary cleared: Permaculture design practitioners offering client consultations — addresses professional tooling gap. Score: 7.4/10. Primary niche selected."},
      {id:"A4",label:"Screening Rubric Record",glabel:"G1",status:"filed",desc:"Niche scoring matrix with documented Go rationale.",
        content:"Regenerative land steward niche: 9.1/10. Go decision recorded. Basis: operator proof depth is genuine (prototype built, 14 VoC interviews, methodology expertise verifiable). FAO GAEZ constraint documented as known risk, not disqualifier — resolution path exists. Runway sufficient for primary niche at 2 project types at launch."},
    ],
    gateChecks:[
      {id:"GC1",label:"Amanah Gate — Go decision recorded with honest basis",passed:true},
      {id:"GC2",label:"All proof claims substantiated or G-labelled pending",passed:true},
      {id:"GC3",label:"Constraint Map reflects actual conditions, not aspirational",passed:true},
      {id:"GC4",label:"No disqualifying regulatory barriers in cleared candidates",passed:true},
      {id:"GC5",label:"Energy Profile completed — depletion zones named and honoured",passed:true},
    ],
  },
  STR:{type:"import_review",
    spiritualOpen:{attr:"Al-Baṣīr · The All-Seeing",note:"The land steward who said 'I spent six months planning and then didn't know how to start acting' is showing you the gap your product exists to close. See it. Do not interpret it."},
    spiritualGate:{attr:"Al-Baṣīr · Truth-Gate",note:"The three cleared phrases must earn that designation from the verbatim data, not from the product narrative already written. Phrases the operator wishes the data supported are not Truth-Gate cleared."},
    researchItems:[
      {id:"R1",label:"S1 — Market Definition",desc:"Target buyer and their immediate operational context.",status:"filed"},
      {id:"R2",label:"S2 — VoC Buying Language Bank",desc:"14 interviews. Verbatim extractions only. No paraphrasing.",status:"filed"},
      {id:"R3",label:"S3 — Emotional Triggers",desc:"Top fears and desires per segment, sourced from interview data.",status:"filed"},
      {id:"R4",label:"S4 — Enemy Analysis",desc:"The Methodology-Execution Chasm named as external system.",status:"filed"},
      {id:"R5",label:"S5 — Strategic Constraints",desc:"FAO GAEZ constraint, runway, 2 project types at launch. ASSUMPTION items resolved.",status:"filed"},
    ],
    assetItems:[
      {id:"A1",label:"Asset 1 — The Belief Statement",glabel:"G2",status:"filed",desc:"One sentence: if believed, the operator's offer becomes the only logical solution.",
        content:"When your land's methodology lives in the same system as your daily actions, the gap between vision and season closes — and the land starts showing you what works."},
      {id:"A2",label:"Asset 2 — Enemy Narrative",glabel:"G4",status:"filed",desc:"Three-paragraph Transformation Arc. Truth-Gate reviewed and filed.",
        content:"Before: The land steward who has completed a permaculture design course is not struggling because they lack knowledge. They are trapped by a convergent system — permaculture education that ends at design without providing operational infrastructure, generic productivity tools (Notion, Asana, spreadsheets) built for corporate projects with no ecological intelligence, and the land's own seasonal urgency creating constant reactive mode that makes strategic work impossible. The gap is not a failure of the steward. It is a structural absence in the tools available to them.\n\nTransformation: OLOS closes the Methodology-Execution Chasm by treating permaculture design as operational infrastructure rather than reference material. The Plan stage turns a steward's vision into a structured sequence of objectives, grounded in the land's actual systems and seasonal rhythms. The Act stage translates those objectives into fieldwork with evidence capture. The Observe stage feeds what was witnessed back into the next cycle. The methodology is not consulted — it is lived.\n\nAfter (G4): Stewards who complete a full OLOS cycle report knowing what to do each season without having to reconstruct their thinking from scratch. The land's patterns become visible across cycles. The gap between vision and action stops feeling structural and starts feeling navigable."},
      {id:"A3",label:"Asset 3 — Positioning Statement",glabel:"G2",status:"filed",desc:"One sentence seeded with verbatim VoC language.",
        content:"OLOS is the first land stewardship platform that turns your permaculture design into a working operating system — so what you know about your land becomes what you do on it, season by season."},
      {id:"A4",label:"Asset 4 — Amanah Content Engine",glabel:"G3",status:"filed",desc:"6 content angles from S3 fears and desires. G-labels applied throughout.",
        content:"Angle 1 (Fear: losing vision to overwhelm): 'Most land stewards don't fail because they don't know enough. They fail because there's no system connecting what they know to what they do next Tuesday.' (G3)\nAngle 2 (Fear: irreversible early mistakes): 'The first year on a piece of land is the most consequential. OLOS structures that year so your observations become decisions, not guesses.' (G2)\nAngle 3 (Fear: seasonal drift): 'Generic task managers don't know what month it is. OLOS does — and it knows what your land needs in that month.' (G2)\nAngle 4 (Desire: whole-system visibility): 'Your water, soil, pasture, and food systems don't operate in silos. Neither should your planning.' (G2)\nAngle 5 (Desire: seasonal clarity): 'Know what to do this season before the season starts. That is what a methodology-first operating system makes possible.' (G2)\nAngle 6 (Desire: visible land improvement): 'The Observe stage in OLOS doesn't just record what happened — it feeds forward into what happens next. That is how the land teaches you.' (G3)"},
      {id:"A5",label:"Asset 5 — Truth-Gate Advisory",glabel:"G1",status:"filed",desc:"Three phrases cleared for headline use. Source evidence documented.",
        content:"Cleared phrase 1: 'the gap between vision and season' — sourced verbatim from S2 interview #3 and #11. Appears in 8 of 14 interviews in variant form. Cleared at G1.\nCleared phrase 2: 'season by season' — derived from S2 cluster around seasonal planning language (interviews #2, #5, #9, #14). Cleared at G2.\nCleared phrase 3: 'you always know what to do next' — direct derivation from S2 #1 ('no idea what to do next Tuesday'). Inverse of pain state. Cleared at G2 with active proof plan."},
    ],
    gateChecks:[
      {id:"GC1",label:"All VoC extractions are verbatim — no paraphrasing",passed:true},
      {id:"GC2",label:"Enemy Narrative names a systemic trap, not a character flaw",passed:true},
      {id:"GC3",label:"All result-implying claims carry G-labels",passed:true},
      {id:"GC4",label:"Truth-Gate Advisory — three phrases cleared from data evidence",passed:true},
      {id:"GC5",label:"All ASSUMPTION items resolved or accepted with risk named",passed:true},
    ],
  },
  OFR:{type:"import_review",
    spiritualOpen:{attr:"Al-ʻAdl · The Just",note:"Write the Scope Map exclusions — financial modelling, livestock health, equipment maintenance — with the same specificity you would want if you were a land steward reading them before paying a subscription fee. The discomfort of naming what is not included is Al-ʻAdl at work."},
    spiritualGate:{attr:"Al-Muqsiṭ · The Equitable",note:"The FAO GAEZ constraint affects what can be delivered to paid-tier subscribers. Al-Muqsiṭ requires that this limitation be named in the pricing structure, not buried in the terms of service."},
    researchItems:[
      {id:"R1",label:"S1 — Niche Summary",desc:"Regenerative land stewards, 5–500 acres, permaculture-trained, managing 2+ systems. CRD V3 confirmed.",status:"filed"},
      {id:"R2",label:"S2 — VoC Offer Language",desc:"Drawn from STR verbatim bank. Seasonal clarity and methodology-execution gap as primary buying language.",status:"filed"},
      {id:"R3",label:"S3 — Competitor References",desc:"No direct methodology-first competitor identified. Indirect: AgriWebb (conventional), Farmbrite (general), Notion (generic).",status:"filed"},
      {id:"R4",label:"S4 — Pricing References",desc:"Permaculture consulting: $150–$300/hr. Comparable SaaS tools: $20–$80/month. Methodology premium justified at upper range.",status:"filed"},
      {id:"R5",label:"S5 — Operator Constraints",desc:"FAO GAEZ: blocks geospatial climate data in paid tier until resolved. Capability 4 (Command Centre) partial — constrains DEL execution depth. 2 project types at launch.",status:"filed"},
    ],
    assetItems:[
      {id:"A1",label:"Asset 1 — The Promise",glabel:"G2",status:"filed",desc:"Core deliverable stated without certainty theater.",
        content:"OLOS guides you through a structured Plan → Act → Observe cycle that translates your land design into concrete seasonal actions — so you always know what to do next and can see your land improving over time. (G2 — outcome claims are trend-based and cycle-dependent, not guaranteed in absolute terms.)"},
      {id:"A2",label:"Asset 2 — Ideal Customer Profile",glabel:"G1",status:"filed",desc:"Inclusions and exclusions both explicit.",
        content:"Included: Land stewards managing 5–500 acres, have completed permaculture design certificate or equivalent, actively managing 2+ systems simultaneously (e.g. pasture + orchard, market garden + water), currently using 3+ disconnected tools, open to methodology-first software. Excluded: Conventional farmers seeking yield optimisation, urban gardeners (sub-1-acre), operators seeking financial modelling or livestock health management as primary functions."},
      {id:"A3",label:"Asset 3 — The Mechanism",glabel:"G2",status:"filed",desc:"How the promise is delivered — the Spiral Lifecycle.",
        content:"The OLOS Spiral Lifecycle: Plan (7-stratum objectives catalogue structured by project type, map-first overlay system, protocol sequencing) → Act (task execution with evidence capture, field-based verification, act handoff records) → Observe (seasonal observation feeds, trend dashboards, cycle-to-cycle pattern visibility). Each completed cycle feeds the next. The methodology is not consulted — it operates. (G2 — mechanism description is accurate to current build state.)"},
      {id:"A4",label:"Asset 4 — Scope Map",glabel:"G1",status:"filed",desc:"Included, Excluded, Triggers. IC-OFR passed.",
        content:"INCLUDED: Plan stage (full — all 7 strata, 13 project types architecture, map overlay system). Act stage (task execution, evidence capture, proof logging). Observe stage (dashboards, trend records, observation feeds). Two project types at launch: Regen Farm (full), Silvopasture (secondary layer). Mobile-responsive tablet and desktop viewports.\nEXCLUDED: Financial modelling and farm P&L tracking. Livestock health records and veterinary scheduling. Equipment maintenance and repair logs. Regulatory compliance automation. Geospatial climate intelligence (FAO GAEZ — pending licensing resolution). Multi-user team collaboration (Cycle 2).\nTRIGGERS: Community features unlock at 50 active subscribers. Additional project types unlock as objectives catalogues are completed. FAO GAEZ integration unlocks upon licensing resolution."},
      {id:"A5",label:"Asset 5 — Value Stack",glabel:"G2",status:"filed",desc:"Honest justification of value at each tier.",
        content:"Steward tier ($49/month): Equivalent to one 20-minute permaculture consultation per month — but applied operationally across an entire cycle, not a single session. Land tier ($89/month): Three-project management equivalent to a seasonal methodology retainer. Practitioner tier ($159/month): Unlimited projects + consultancy access — bridges the operator's professional service offering with a shared methodology platform. Annual subscription: 20% discount. Value stack does not inflate figures or use aspirational revenue claims."},
      {id:"A6",label:"Asset 6 — Risk Reversal (Guarantee)",glabel:"G1",status:"filed",desc:"All four guarantee elements present. No ambiguity.",
        content:"Guarantee: If OLOS does not deliver a complete Plan → Act → Observe cycle within 90 days of onboarding, full refund. Conditions: subscriber must complete onboarding (defined as: project created, at least one stratum objective begun, at least one Act session logged). Exclusions: feature requests outside the declared Scope Map, off-scope use cases (conventional farm management, financial modelling). Trigger: subscriber must request refund within the 90-day window with onboarding completion confirmed. The guarantee covers the methodology delivery, not the land outcome."},
      {id:"A7",label:"Asset 7 — Pricing Structure",glabel:"G1",status:"filed",desc:"Transparent, honest valuation. Not what the market might bear.",
        content:"Steward: $49/month (1 project, Regen Farm or Silvopasture). Land: $89/month (up to 3 projects, all available types). Practitioner: $159/month (unlimited projects + OLOS consultancy access for client use). Annual billing: 20% discount across all tiers. Pricing basis: methodology premium over generic SaaS tools ($20–$40 range) justified by specificity to land stewardship use case. Not priced against permaculture consulting rates ($150–300/hr) to avoid aspirational anchoring. FAO GAEZ-dependent features noted as roadmap items, not current deliverables."},
      {id:"A8",label:"Asset 8 — Proof Plan",glabel:"G2",status:"filed",desc:"How integrity will be demonstrated over time.",
        content:"Month 1–3: Three documented subscriber case studies (with permission). Each covers a full Plan → Act → Observe cycle. Month 3–6: Public cycle completion logs (anonymised unless subscriber consents to attribution). Video walkthroughs of complete cycles published for each project type at launch. Month 6+: Longitudinal land health observations contributed by subscribers (opt-in). Proof plan does not rely on revenue or growth metrics — it relies on documented methodology delivery."},
    ],
    gateChecks:[
      {id:"GC1",label:"Scope Map Integrity Check — exclusions are explicit, not buried",passed:true},
      {id:"GC2",label:"Guarantee contains all four required elements",passed:true},
      {id:"GC3",label:"No certainty theater — FAO GAEZ features named as roadmap, not current",passed:true},
      {id:"GC4",label:"Pricing reflects honest valuation, not aspirational anchoring",passed:true},
      {id:"GC5",label:"Proof Plan addresses each G3/G4 claim with a credibility path",passed:true},
    ],
  },
  OUT:{type:"execution_tracking",
    spiritualOpen:{attr:"Ar-Razzāq · The Provider",note:"14 land stewards gave their honest time for VoC interviews. Every outreach message built from their words is an act of returning what was shared — treat it accordingly. Do not manufacture urgency around a product they already told you they need."},
    spiritualGate:{attr:"As-Sittir · The Veiler",note:"Before posting Batch 2: the three hooks from the Belief Statement direction (H1–H3) outperformed expectations in impressions but underperformed in replies. That gap is data. Name it in the IC-OUT review before proceeding."},
    researchItems:[
      {id:"R1",label:"S1 — Channel Landscape",desc:"Permies.com forums, Regenerative Agriculture Facebook groups, Instagram (permaculture hashtag clusters), LinkedIn (regenerative ag professionals).",status:"filed"},
      {id:"R2",label:"S2 — Lead Pool Map",desc:"Est. 8,000 active permaculture practitioners in Canada and US within ICP parameters. Permies.com forum: 2,400 relevant members. Facebook groups: 4 groups with combined 12,000 members.",status:"filed"},
      {id:"R3",label:"S3 — Message Signal Research",desc:"Highest-resonance content in target communities: seasonal decision-making challenges, tool overwhelm, permaculture-to-practice gap. Visual content (land maps, before/after observations) outperforms text.",status:"filed"},
      {id:"R4",label:"S4 — Objection Intelligence",desc:"Primary objections: too complex to learn, costs more than spreadsheets, not sure my land qualifies, worried about losing my existing records.",status:"filed"},
      {id:"R5",label:"S5 — Operator Outreach Constraints",desc:"Maximum 6 hrs/week outreach. No paid advertising in Cycle 1. Community-first, not cold DM-first. Energy limit: no more than 10 DMs per day without burning out.",status:"filed"},
    ],
    assetItems:[
      {id:"A1",label:"Channel Plan & Lead Criteria",glabel:"G1",status:"filed",desc:"Channels, binary criteria for qualifying a lead.",
        content:"Channels: (1) Permies.com — value-first posts + direct responses to methodology questions. (2) Regenerative Ag Facebook groups — educational content, no direct promotion. (3) Instagram — visual content showing map + observation feeds. (4) Direct outreach to PDC graduates via permaculture school alumni networks (with permission). Binary lead criteria: 5+ acres AND permaculture training AND current use of 2+ disconnected tools. All three required."},
      {id:"A2",label:"Hook Library",glabel:"G2",status:"filed",desc:"VoC-derived hooks. Attention, not claims.",
        content:"H1 (operator-derived — flagged): 'The first regenerative land OS is here.' [Underperformed — operator language, not VoC]\nH2 (operator-derived — flagged): 'Stop managing your land like a project.' [Moderate — resonant but not verbatim]\nH3 (operator-derived — flagged): 'Your permaculture design deserves an operating system.' [Moderate]\nH4 (VoC): 'You know what the land should look like in 10 years. The gap is next Tuesday.' [High resonance — 14 DM replies]\nH5 (VoC): 'Notion doesn't know what month it is. Your land does.' [High resonance — 11 DM replies]\nH6 (VoC): 'Every permaculture course teaches you more about what you don't know. OLOS is where that knowledge becomes a working plan.' [High resonance]\nH7 (VoC): 'Your design exists in your head and in a notebook. Here's where it can live and work.' [High resonance — 9 DM replies]"},
      {id:"A3",label:"Message Library",glabel:"G2",status:"filed",desc:"Full outreach sequences. IC-OUT passed before first send.",
        content:"3 sequences filed. Sequence A (Permies/forum): Value-first response to methodology questions → soft profile reveal → direct invitation if conversation develops naturally. Sequence B (DM outreach — PDC graduates): Shared context acknowledgement → specific question about their land situation → OLOS framing only after two exchanges. Sequence C (Instagram DM): Response to story/post engagement → genuine curiosity about their project → link to beta if criteria met. All sequences passed IC-OUT checklist. No urgency language."},
      {id:"A4",label:"Follow-Up Sequence",glabel:"G2",status:"filed",desc:"Warming without pushing. Genuinely new content at each touchpoint.",content:"Two-touch follow-up. Touch 1 (Day 3): A specific seasonal planning resource relevant to their stated land situation. Touch 2 (Day 10): A case study excerpt from the VoC interviews — what other stewards named as their breakthrough moment. No third touch unless they initiate. The sequence ends here — it does not manufacture urgency."},
      {id:"A5",label:"Appointment Setter Script",glabel:"G1",status:"filed",desc:"Moves qualified prospect to a 30-minute demo call.",content:"'Based on what you described — [land size, systems, current tools] — I think a 30-minute walkthrough would either confirm OLOS is exactly what you need or save you from investing in something that isn't. Would that be worth 30 minutes of your time?' Binary: they say yes or no. If no, No-Fit Script. No second attempt at the same contact."},
      {id:"A6",label:"No-Fit Script",glabel:"G1",status:"filed",desc:"Closes door with dignity. Leaves relationship intact.",content:"'Based on what you've shared, I don't think OLOS is the right fit right now — [specific reason tied to criteria]. I'd rather tell you that now than have you onboard something that won't serve your situation. If your context changes, the door is open.' Script ends. No re-engagement within the same cycle."},
      {id:"A7",label:"Objection Prep Matrix",glabel:"G1",status:"filed",desc:"Honest responses to four documented objections.",content:"Obj 1 (too complex): 'OLOS guides you — you don't configure it. The methodology is built in.' Obj 2 (costs more than spreadsheets): 'Spreadsheets cost you the methodology. That's the trade you're currently making.' Obj 3 (my land doesn't qualify): Binary criteria checklist — walk through it together. If they don't qualify, say so. Obj 4 (losing existing records): 'OLOS starts from where you are. It doesn't require you to recreate what you have.'"},
    ],
    executionTasks:[
      {id:"T1",type:"gate_check",label:"IC-OUT Gate — Message Library",desc:"Ihsan Baseline Checklist run on all three sequences before first send.",status:"filed",checks:["Message opens with documented VoC pain point","All claims G-labelled with proof assets named","Single unambiguous CTA per message","No scarcity language","Readable without prior knowledge of OLOS"]},
      {id:"T2",type:"gate_check",label:"IC-OUT Gate — Hook Library",desc:"Hooks H1–H3 flagged as operator-derived. H4–H7 cleared as VoC-derived.",status:"filed",checks:["No outcome claims in hooks","Each hook maps to documented S3 fear or desire","Language is verbatim VoC or clearly derived","No manufactured urgency"]},
      {id:"T3",type:"posting",label:"Permies.com + Facebook — Batch 1",desc:"First content release across community forums.",status:"filed",channel:"Permies.com forums, Regen Ag Facebook (3 groups)"},
      {id:"T4",type:"posting",label:"Permies.com + Facebook — Batch 2",desc:"Second content release with VoC hooks H4–H7.",status:"filed",channel:"Permies.com, Facebook, Instagram"},
      {id:"T5",type:"posting",label:"Instagram + LinkedIn — Batch 1",desc:"Visual content: map overlay screenshot + observation feed demo.",status:"filed",channel:"Instagram, LinkedIn"},
      {id:"T6",type:"gate_check",label:"Scarcity Checkpoint",desc:"All urgency/scarcity claims reviewed before outreach pack finalised. None used — no manufactured urgency present.",status:"filed",checks:["No scarcity language in any asset","No manufactured urgency","Outreach closed at two-touch maximum"]},
    ],
  },
  SLS:{type:"execution_tracking",
    spiritualOpen:{attr:"Al-Laṭīf · The Subtly Kind",note:"Three of the five Fit Calls this cycle resulted in closes. The two No-Fits were held cleanly. Al-Laṭīf was present in the quality of the listening — not in the close rate."},
    spiritualGate:{attr:"Ar-Razzāq · The Provider",note:"The pipeline integrity check is not a formality. The two No-Fit decisions involved stewards who were eager. Name whether the disqualifiers were held or softened."},
    researchItems:[
      {id:"R1",label:"Qualification Form",desc:"Binary criteria: 5+ acres AND permaculture training AND 2+ disconnected tools. All three required. No grey areas.",status:"filed"},
      {id:"R2",label:"Fit Call Script",desc:"Questions structured around the steward's situation, not toward a close. 30-minute format.",status:"filed"},
      {id:"R3",label:"DM Automation Flow",desc:"Pre-call context capture. Three questions. Responses reviewed before call.",status:"filed"},
      {id:"R4",label:"Nurture Sequence",desc:"Post-call sequence for non-closes. Two touches. Each offers something genuinely new.",status:"filed"},
    ],
    assetItems:[
      {id:"A1",label:"Fit Call Script — Final",glabel:"G1",status:"filed",desc:"Questions for honest qualification, not for moving toward close.",
        content:"Opening: 'Tell me about your land — what are you managing and what stage are you at?' Discovery: 'What does your current planning and task system look like?' Qualification: 'When you think about what's not working in your current setup, what's the one thing you'd most want to be different?' If aligned: OLOS walkthrough. If not: No-Fit Script. No persuasion after qualification. The call ends at honest assessment."},
      {id:"A2",label:"No-Fit Script — Final",glabel:"G1",status:"filed",desc:"Closes door with dignity. Used in both Cycle 1 non-closes.",
        content:"'Based on what you've shared about [specific situation], I don't think OLOS is the right fit for where you are right now — [specific criterion not met]. I'd rather be direct with you now than have you invest in something that won't serve your situation well. If your context changes, reach back out.' Both Cycle 1 non-closes received this script. No softening of criteria."},
      {id:"A3",label:"Nurture Sequence — Final",glabel:"G2",status:"filed",desc:"IC-OUT passed. No urgency engineering.",
        content:"Touch 1 (Day 5 post-call): Seasonal planning resource specific to their land situation — no OLOS mention. Touch 2 (Day 14): Genuine check-in: 'How's the season going?' No product pitch. If they re-engage, respond genuinely. If they don't, sequence ends. Sequence tested against IC-OUT checklist: passed."},
    ],
    executionTasks:[
      {id:"T1",type:"call_log",label:"Fit Call — Maria L.",desc:"45-acre regen farm, Caledon, Ontario.",status:"filed",prospect:"Maria L. — 45-acre regen farm, Caledon ON",outcome:"Fit — Converted",basis:"Met all three criteria. Currently using Notion + printed maps + paper journal. Seasonal planning breakdown named as primary pain. Immediate recognition of Plan → Act → Observe structure.",date:"2025-12-03"},
      {id:"T2",type:"call_log",label:"Fit Call — James K.",desc:"8-acre silvopasture homestead, Pemberton, BC.",status:"filed",prospect:"James K. — 8-acre silvopasture + homestead, Pemberton BC",outcome:"Fit — Converted",basis:"Strong methodology background (PDC + advanced agroforestry training). Using Google Sheets + iPhone notes + physical binder. Named the methodology-execution gap explicitly without prompting.",date:"2025-12-08"},
      {id:"T3",type:"call_log",label:"Fit Call — Anish P.",desc:"220-acre agroforestry project, Prince Edward County, Ontario.",status:"filed",prospect:"Anish P. — 220-acre agroforestry, Prince Edward County ON",outcome:"Fit — Converted",basis:"Complex multi-system project (5 systems active). Professional context: developing land stewardship consultancy. Practitioner tier a genuine fit. Immediately asked about multi-project support.",date:"2025-12-12"},
      {id:"T4",type:"call_log",label:"Fit Call — Chen W.",desc:"3-acre market garden, Guelph, Ontario.",status:"filed",prospect:"Chen W. — 3-acre market garden, Guelph ON",outcome:"No-Fit — Sub-5-acre",basis:"Under ICP acreage threshold. Market garden context is primarily yield management, not regenerative systems integration. No-Fit Script delivered. Relationship maintained — referred to market garden-specific tool.",date:"2025-12-14"},
      {id:"T5",type:"call_log",label:"Fit Call — Priya M.",desc:"15-acre property, no permaculture training.",status:"filed",prospect:"Priya M. — 15-acre property, Nova Scotia",outcome:"No-Fit — No methodology foundation",basis:"15 acres qualifies on size. No permaculture training — OLOS methodology assumes a design foundation. Without it, the platform would not serve her at this stage. No-Fit Script delivered. Referred to PDC resources first.",date:"2025-12-18"},
      {id:"T6",type:"gate_check",label:"Pipeline Integrity Check",desc:"Review: were any disqualifiers softened to avoid a no?",status:"filed",checks:["Chen W. — acreage criterion held cleanly, no softening","Priya M. — methodology criterion held despite 15-acre qualification, no softening","No-Fit Script delivered to both non-closes without modification","Close rate of 3/5 reflects honest qualification, not pipeline pressure"]},
    ],
  },
  DEL:{type:"field_execution",
    spiritualOpen:{attr:"Al-Muḥsin · The Good-Doer",note:"Three subscribers are using OLOS to manage real land. Maria is in her first winter planning cycle. James is completing a silvopasture survey. Anish is mapping five active systems. Before opening any task: what would it look like to serve each of them at the standard of excellence, not adequacy?"},
    spiritualGate:{attr:"Al-Walī · The Protective Friend",note:"The Act Stage beta has a known gap: Capability 4 (Command Centre) is partial. The QC Checklist must name this limitation explicitly to all three subscribers before the final handoff — not as a disclaimer, but as a wilāyah act: standing between them and a gap they do not yet know exists."},
    researchItems:[
      {id:"R1",label:"Scope Confirmation",desc:"Client-signed scope agreements covering deliverables, exclusions, and the Capability 4 partial-build status.",status:"filed"},
      {id:"R2",label:"Delivery Timeline",desc:"Three milestones across Plan, Act Beta, and Observe Alpha. Milestone 2 in active QC review.",status:"filed"},
    ],
    assetItems:[
      {id:"A1",label:"Delivery Pack — Filed",glabel:"G1",status:"filed",desc:"Current delivery state: Plan Stage complete, Act Stage Beta, Observe Stage Alpha.",
        content:"OLOS platform delivered to three early access subscribers. Plan Stage: complete — all 7 strata accessible, Regen Farm objectives catalogue live, Silvopasture secondary layer live. Act Stage: beta — task execution functional, map-first surface live, evidence capture operational, Capability 4 (Command Centre) partial (D0–D2 of D0–D5 scope). Observe Stage: alpha — seasonal dashboards live, trend tracking foundational. Scope Map exclusions acknowledged in subscriber agreements: financial modelling, livestock health, equipment maintenance, geospatial climate intelligence (FAO GAEZ pending)."},
      {id:"A2",label:"Handoff Notes",glabel:"G1",status:"in_review",desc:"Per-subscriber handoff notes being finalised. Named Capability 4 gap explicitly.",
        content:"Draft in review. Three subscriber-specific notes covering: current platform state and what is fully operational vs. beta; Capability 4 (Command Centre) timeline and what it will add to their Act experience; how to use the current Act surface within its current scope; next milestone and what changes. Notes written for the steward, not for the operator."},
    ],
    executionTasks:[
      {id:"T1",type:"gate_check",label:"Iḥsān QC Checklist — Pre-Final Handoff",desc:"Run before handoff notes are sent. Al-Muḥsin standard — not adequacy standard.",status:"pending",checks:["Capability 4 partial-build status named explicitly in all three handoff notes","Every Scope Map exclusion confirmed in subscriber-specific language","Act Stage beta limitations documented with specific workarounds where available","Observe Stage alpha status and roadmap described honestly","Subscribers have a named point of contact for questions"]},
      {id:"T2",type:"confirmation",label:"Scope Confirmation — All Three Subscribers Signed",desc:"Scope agreements signed during onboarding. Filed.",status:"filed",evidence:"Three subscriber scope confirmations on file. Signed 2025-12-20 (Maria L.), 2025-12-22 (James K.), 2025-12-28 (Anish P.). All exclusions acknowledged including FAO GAEZ and Capability 4 partial state."},
      {id:"T3",type:"proof_capture",label:"Milestone 1 — Plan Stage Delivery",desc:"Full Plan Stage operational and documented.",status:"filed",evidence:"Plan Stage complete. All 7 strata accessible. Regen Farm objectives catalogue: 48 objectives across 13 project types. Silvopasture secondary layer: 12 patch objectives. Three subscriber onboarding sessions completed. Maria completed Strata 1–2 within 48 hours of onboarding.",notes:"Maria feedback: 'I've been trying to do this in Notion for two years. The structure is exactly what I needed.' James feedback: 'The map-first approach changed how I think about the Act stage.' Anish: 'I need the multi-project view in Land tier — switching now.'"},
      {id:"T4",type:"proof_capture",label:"Milestone 2 — Act Stage Beta",desc:"Act Stage beta deployed. Evidence capture functional. Capability 4 partial.",status:"in_review",evidence:"Act Stage beta deployed 2026-01-15. Map-first execution surface: live. Task creation and sequencing: operational. Evidence capture (photo, notes, proof log): operational. Capability 4 D0 (operating loop spine): live. Capability 4 D1 (task dependency engine): partial — basic dependencies functional, complex chains in development. QC review in progress.",notes:"Known limitation being reviewed: D2 (resourcing layer) not yet live — affects Anish's multi-system coordination use case most significantly. Named in QC checklist for explicit handoff note."},
      {id:"T5",type:"confirmation",label:"Final Handoff — Subscriber Acknowledgement",desc:"Handoff notes sent and acknowledged by all three subscribers.",status:"pending",evidence:"",date:""},
      {id:"T6",type:"filing",label:"Delivery Record — Filed",desc:"Complete log of what was delivered, when, to whom, at what build state.",status:"pending",evidence:""},
    ],
  },
  RET:{type:"execution_tracking",
    spiritualOpen:{attr:"Ash-Shakūr · The Appreciative",note:"Maria spent two years trying to solve this in Notion before finding OLOS. James drove 40 minutes to a PDC just to get closer to the methodology OLOS operationalises. Anish is building a consultancy on this foundation. The gratitude is not manufactured — it is real. Begin from there."},
    spiritualGate:{attr:"Al-Wadūd · The Loving",note:"The proof asset deployment map must document consent context for each subscriber before any case study or testimonial is shared publicly. Al-Wadūd does not use a relationship as marketing material without the relationship's knowledge."},
    researchItems:[
      {id:"R1",label:"Client Relationship Map",desc:"Three active subscribers. Relationship quality, engagement depth, and potential for continued stewardship.",status:"pending"},
      {id:"R2",label:"Upsell Eligibility Assessment",desc:"Anish already upgraded to Practitioner tier. James and Maria assessed on genuine readiness for tier upgrade.",status:"pending"},
    ],
    assetItems:[
      {id:"A1",label:"Cold Lead Re-Engagement",glabel:"G2",status:"pending",desc:"Reaches out from appreciation. Offers something genuinely new.",content:""},
      {id:"A2",label:"Past Client Nurture Sequence",glabel:"G2",status:"pending",desc:"Ongoing relationship with active subscribers. Unhurried. Not contingent on upsell.",content:""},
      {id:"A3",label:"Upsell Path",glabel:"G2",status:"pending",desc:"Offered only where it is genuinely the right next step for that subscriber's land situation.",content:""},
      {id:"A4",label:"Proof Asset Deployment Map",glabel:"G1",status:"pending",desc:"Which case studies, testimonials, and cycle logs can be used publicly. Consent documented.",content:""},
    ],
    executionTasks:[
      {id:"T1",type:"gate_check",label:"Ash-Shakūr Assessment",desc:"Before any retention sequence is deployed.",status:"pending",checks:["Re-engagement initiated from appreciation, not subscription renewal pressure","Every planned communication offers value the subscriber would appreciate independently","Proof asset deployment (case studies, quotes) only where explicit consent is documented","Upsell offered only where the subscriber's actual land situation justifies it","Maria and James assessed separately — do not assume they need what Anish needs"]},
      {id:"T2",type:"call_log",label:"Subscriber Check-In — Maria L.",desc:"Genuine check-in on her winter planning cycle. Not a retention call.",status:"pending",prospect:"Maria L.",outcome:"",basis:"",date:""},
      {id:"T3",type:"call_log",label:"Subscriber Check-In — James K.",desc:"Genuine check-in on silvopasture survey progress.",status:"pending",prospect:"James K.",outcome:"",basis:"",date:""},
      {id:"T4",type:"filing",label:"Referral Record",desc:"Log any unprompted referrals received: source, date, quality of referral.",status:"pending",evidence:""},
    ],
  },
  OPT:{type:"retrospective_dashboard",
    spiritualOpen:{attr:"Al-Ḥasīb · The Reckoner",note:"Hooks H1–H3 underperformed because they were built from the operator's vision of OLOS, not from what 14 land stewards actually said. That gap is the most important finding of Cycle 1. Name it with the same specificity you brought to naming the closes."},
    spiritualGate:{attr:"Al-Quddūs · The Holy",note:"The FAO GAEZ licensing constraint is still unresolved at Stage 07. It has been acknowledged in every Scope Map, every subscriber agreement, and every pricing document. The Restoration Mandate requires a specific resolution timeline — not another acknowledgement."},
    metrics:[
      {id:"M1",label:"Intake → Qualified",value:"1/1",benchmark:"≥100%",status:"pass",trend:"stable",stage:"IDY→CRD"},
      {id:"M2",label:"VoC Sources (interviews)",value:"14",benchmark:"≥10",status:"pass",trend:"up",stage:"STR"},
      {id:"M3",label:"Offer Gate — Assets Filed",value:"8/8",benchmark:"8/8",status:"pass",trend:"stable",stage:"OFR"},
      {id:"M4",label:"Outreach → Demo Request",value:"23/180",benchmark:"≥15%",status:"warn",trend:"down",stage:"OUT"},
      {id:"M5",label:"Demo Call → Close",value:"3/5",benchmark:"≥40%",status:"pass",trend:"up",stage:"SLS"},
      {id:"M6",label:"Delivery — Milestone Completion",value:"2/3",benchmark:"2+",status:"pass",trend:"up",stage:"DEL"},
      {id:"M7",label:"Active Subscriber Churn",value:"0/3",benchmark:"0",status:"pass",trend:"stable",stage:"RET"},
      {id:"M8",label:"Stewardship Score",value:"8.1",benchmark:"≥7.0",status:"pass",trend:"up",stage:"OPT"},
    ],
    bhi:[
      {id:"B1",label:"Covenant Integrity",value:8.6,desc:"Honesty of declarations — FAO GAEZ named in every document it affected"},
      {id:"B2",label:"Proof Grounding",value:8.1,desc:"G1/G2 dominant; G4 used only in Enemy Narrative and Observe outcomes"},
      {id:"B3",label:"Client Dignity",value:9.2,desc:"No-Fit Script held in both non-closes; Scope Map explicit; no overselling"},
      {id:"B4",label:"Operator Wellbeing",value:7.2,desc:"High intensity sustained — Capability 4 build pressure in DEL is the watchpoint"},
      {id:"B5",label:"Systemic Honesty",value:8.4,desc:"Outreach underperformance named accurately; hook failure traced to source"},
    ],
    restorationItems:[
      {id:"RI1",label:"Outreach hook underperformance (13% vs 15% benchmark)",severity:"moderate",status:"in_progress",action:"Hooks H1–H3 built from operator assumption, not VoC. H4–H7 (verbatim VoC) generated 3x more DM replies. Resolution for Cycle 2: retire H1–H3, expand H4–H7 set with new verbatim extractions from subscriber onboarding observations. Hook Library to be re-audited against IC-OUT before Cycle 2 OUT stage."},
      {id:"RI2",label:"FAO GAEZ v4 licensing unresolved at DEL stage",severity:"critical",status:"in_progress",action:"FAO GAEZ incompatibility with paid SaaS first identified in IDY Stage 03. Carried through 7 stages without resolution. Must resolve before Cycle 2 Stage 05 outreach references geospatial climate intelligence. Resolution path: (1) Direct FAO licensing enquiry — initiated 2026-01-20. (2) Evaluate ODbL-compatible GAEZ alternatives (OpenLandMap, Copernicus). (3) ADR required before any paid-tier feature release referencing climate/soil data."},
      {id:"RI3",label:"Capability 4 (Command Centre) partial build affecting DEL delivery depth",severity:"monitor",status:"accepted",action:"Capability 4 D2–D5 (resourcing layer, budget tracking, field execution, operating dashboards) not complete at DEL milestone 2. Accepted as known risk for Cycle 1 — three subscriber scope agreements acknowledge this explicitly. Cycle 2 delivery must include D3 (budget/cost tracking) at minimum before new subscriber onboarding. Risk accepted with documented consequence: Anish's multi-system coordination use case is currently underserved at the Act stage."},
    ],
  },
};

const STAGES = [
  {id:"IDY",n:"01",name:"IDENTITY",code:"IDY",tagline:"The honest beginning",attributes:["Al-Awwal · The First","Ash-Shahīd · The Witness"],status:"complete",gate:"Amanah Gate",gateStatus:"passed",dua:"رَبِّ أَرِنِي الْحَقَّ حَقًّا",duaTrans:"My Lord, show me truth as truth",progress:100},
  {id:"CRD",n:"02",name:"CREDIBILITY",code:"CRD",tagline:"The honest foundation",attributes:["Al-Ḥaqq · The Truth","Al-Khabīr · The All-Aware"],status:"complete",gate:"Amanah Gate",gateStatus:"passed",dua:"رَبِّ اشْرَحْ لِي صَدْرِي",duaTrans:"My Lord, expand my chest",progress:100},
  {id:"STR",n:"03",name:"STRUCTURE",code:"STR",tagline:"Genuine seeing",attributes:["Al-Baṣīr · The All-Seeing"],status:"complete",gate:"Truth-Gate Advisory",gateStatus:"passed",dua:"رَبِّ زِدْنِي عِلْمًا",duaTrans:"My Lord, increase me in knowledge",progress:100},
  {id:"OFR",n:"04",name:"OFFERING",code:"OFR",tagline:"The covenant offer",attributes:["Al-ʻAdl · The Just","Al-Muqsiṭ · The Equitable"],status:"complete",gate:"Scope Map Review",gateStatus:"passed",dua:"اللَّهُمَّ إِنِّي أَسْأَلُكَ قِسْطًا",duaTrans:"O Allah, I ask You for equity",progress:100},
  {id:"OUT",n:"05",name:"REACH",code:"OUT",tagline:"Outreach from tawakkul",attributes:["Ar-Razzāq · The Provider","As-Sittir · The Veiler"],status:"complete",gate:"Scarcity Checkpoint",gateStatus:"passed",dua:"حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",duaTrans:"Allah is sufficient for us",progress:100},
  {id:"SLS",n:"06",name:"CONVERT",code:"SLS",tagline:"Discernment over closing",attributes:["Al-Laṭīf · The Subtly Kind","Ar-Razzāq · The Provider"],status:"complete",gate:"Fit Call Gate",gateStatus:"passed",dua:"اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا",duaTrans:"Nothing is easy except what You make easy",progress:100},
  {id:"DEL",n:"07",name:"DELIVER",code:"DEL",tagline:"Delivery as worship",attributes:["Al-Muḥsin · The Good-Doer","Al-Walī · The Protective Friend"],status:"active",gate:"Iḥsān Checklist",gateStatus:"in_review",dua:"اللَّهُمَّ أَعِنِّي عَلَىٰ إِتْمَامِ مَا تَوَلَّيْتُهُ بِإِحْسَانٍ",duaTrans:"Help me complete this with excellence",progress:68},
  {id:"RET",n:"08",name:"RETAIN",code:"RET",tagline:"Gratitude as ground",attributes:["Ash-Shakūr · The Appreciative","Al-Wadūd · The Loving"],status:"available",gate:"Ash-Shakūr Assessment",gateStatus:"pending",dua:"رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",duaTrans:"Inspire me to be grateful for Your favour",progress:0},
  {id:"OPT",n:"09",name:"RECKON",code:"OPT",tagline:"Honest reckoning",attributes:["Al-Ḥasīb · The Reckoner","Al-Quddūs · The Holy"],status:"available",gate:"Restoration Mandate",gateStatus:"pending",dua:"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ",duaTrans:"Glory be to You, O Allah, and praise",progress:0},
];


const BRIEF_SECTIONS = [
  {id:"project",label:"Project Identification",icon:"◈"},
  {id:"covenant",label:"Covenant Statement",icon:"⧁"},
  {id:"findings",label:"Key Findings",icon:"◉"},
  {id:"constraints",label:"Constraints & Dependencies",icon:"◐"},
  {id:"assets",label:"Assets Produced",icon:"◫"},
  {id:"gate",label:"Stage Decision",icon:"◆"},
  {id:"closing",label:"Stewardship Closing",icon:"◬"},
];

// Layer assignment mirrors BBOS_LAYERS in src/data/bbos/bbos-pipeline.js.
const LAYER_BY_STAGE = {
  IDY: "think", CRD: "think", STR: "think", OFR: "think",
  OUT: "execute", SLS: "execute", DEL: "execute", RET: "execute",
  OPT: "reckon",
};

// Identity defaults shown in the Approval Brief header. The live pass will
// source these from the project/operator records; the runtime date is filled
// by the component (kept out of the data so the VM stays serialisable).
const BRIEF_IDENTITY = {
  project: "Barakah Consulting - Phase 1",
  operator: "Yousef A.",
  client: "TBD",
};

/**
 * Re-key the throwaway mockup seed into the canonical PipelineVM shape.
 * @returns {import("./bbos-dashboard-adapter").PipelineVM}
 */
export function buildMockPipelineViewModel() {
  const stages = STAGES.map((s, i) => ({
    id: s.id,
    order: i,
    code: s.code,
    n: s.n,
    name: s.name,
    tagline: s.tagline,
    layer: LAYER_BY_STAGE[s.id] || "think",
    status: s.status,
    progress: s.progress,
    attributes: s.attributes,
    dua: { arabic: s.dua, translit: null, meaning: s.duaTrans },
    gate: { label: s.gate, status: s.gateStatus },
    execution: STAGE_EXECUTION[s.id] || null,
    brief: { identity: BRIEF_IDENTITY },
  }));

  const doneCount = stages.filter((s) => s.status === "complete").length;
  const active = stages.find((s) => s.status === "active");

  return {
    meta: {
      cycle: 1,
      doneCount,
      totalStages: stages.length,
      activeStageId: active ? active.id : null,
      briefSections: BRIEF_SECTIONS,
    },
    stages,
  };
}