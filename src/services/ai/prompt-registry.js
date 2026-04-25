// Prompt Registry — maps each BBOS task to its AI generation pattern
// Layer 1: Stage defaults cover ~70% of tasks
// Layer 2: Per-task overrides for deviations
// Layer 3: Auto-detected overlays (GLABEL_PROOF, COMPRESSED_CYCLE) from validationFlags

// ── Stage Defaults ──
const STAGE_DEFAULTS = {
  IDY: { pattern: 'MAPPING_TRANSFORM', contextDepth: 1 },
  CRD: { pattern: 'RESEARCH_DISCOVERY', contextDepth: 'stage' },
  STR: { pattern: 'RESEARCH_DISCOVERY', contextDepth: 'stage' },
  OFR: { pattern: 'RESEARCH_DISCOVERY', contextDepth: 'stage' },
  OUT: { pattern: 'RESEARCH_DISCOVERY', contextDepth: 'stage' },
  SLS: { pattern: 'SCRIPT_GENERATION', contextDepth: 'stage' },
  DEL: { pattern: 'MAPPING_TRANSFORM', contextDepth: 'stage' },
  RET: { pattern: 'SCRIPT_GENERATION', contextDepth: 'stage' },
  OPT: { pattern: 'ASSEMBLY_GATE', contextDepth: 'stage' },
};

// ── Per-Task Overrides ──
// Only tasks that deviate from their stage default need entries here.
// taskInstructions provide task-specific guidance layered on top of the pattern.
const TASK_OVERRIDES = {
  // ─── IDY ───
  'IDY-S1': {
    pattern: 'RESEARCH_DISCOVERY',
    contextDepth: 0,
    taskInstructions: 'This is the FIRST task — raw intake capture. Help the operator articulate their declarations honestly across the 6 intake fields (Capital, Skills, Proof, Constraints, Geography, Regulatory). Do not embellish or improve their language. Ask probing questions as placeholder text. If the operator has not provided intake data yet, generate structured prompts for each field that guide honest self-disclosure.',
  },
  'IDY-S2': {
    taskInstructions: 'Map IDY-S1 raw intake fields to their corresponding normalized BBOS fields. Each field maps 1:1 from the raw intake. Flag any ambiguities with [AMBIGUOUS] tags. The mappingFlags field should list every issue found across all fields.',
  },
  'IDY-S3': {
    taskInstructions: 'Review the normalized intake packet (IDY-S2) for gaps. Each gap must specify: what is missing, why it is required, and what information would resolve it. The gapSeverity select must reflect the worst gap found.',
  },
  'IDY-S4': {
    taskInstructions: 'Based on IDY-S2 (normalized packet) and IDY-S3 (gap check): route to CRD if intake is sufficiently complete, NO-SHIP if gaps prevent valid routing, or Reject if disqualifying conditions exist. The routingBasis must cite specific field states.',
  },
  // ─── CRD ───
  'CRD-V1': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Evaluate against the 4-gate integrity matrix: (1) Regulatory clearance, (2) Market fit evidence, (3) Competence proof, (4) Proven demand indicators. Each gate: PASS or FAIL with specific evidence. Overall: PROCEED only if all 4 gates pass.',
  },
  'CRD-V2': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Log any niche candidates removed during the CRD stage with reason for removal and the specific gate that failed.',
  },
  'CRD-V3': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Compile cleared niche candidates from CRD-V1 that passed all gates. Handoff packet must include: niche name, evidence summary, and gate pass status for each.',
  },
  'CRD-AF1': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Match operator competencies to offer categories. Score each match on alignment with declared skills, proof evidence, and market demand.',
  },
  'CRD-AF2': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Score each niche candidate across the BBOS scoring dimensions. Use only verified data from CRD-S1 through CRD-S6.',
  },
  'CRD-AF3': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Produce the niche scoring comparison matrix. Side-by-side scoring across all dimensions for all remaining candidates.',
  },
  'CRD-AF4': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Analyze scoring patterns across niche candidates. Identify which dimensions consistently score high/low and what that reveals about the operator\'s positioning.',
  },
  'CRD-AF5': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Definitive proof audit. For every G1/G2 claim in CRD outputs, verify the proof asset exists and is linked. Flag any claim lacking proof as PROOF_PENDING.',
  },
  'CRD-FP02': {
    pattern: 'COMPRESSED_CYCLE',
    taskInstructions: 'Amanah Intake Screening Rubric. Evaluate the 3 auto-disqualifiers for compressed cycle entry.',
  },

  // ─── STR ───
  'STR-S2': {
    taskInstructions: 'Voice of Customer / Buying Language Bank. Extract VERBATIM customer language — never paraphrase. Organize by: pain statements, desire statements, objections, and trigger phrases. Source attribution required for each entry.',
  },
  'STR-AF1': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate The Belief — the operator\'s core strategic contribution statement. Must be grounded in CRD competency proof and STR market research. One clear belief statement with supporting evidence chain.',
  },
  'STR-AF2': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate the Enemy Narrative — the external threat or broken status quo the operator positions against. Frame as stewardship opportunity, not attack. Use VoC language from STR-S2.',
  },
  'STR-AF3': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate the Positioning Statement. Format: For [ICP] who [pain], [operator] provides [mechanism] that [outcome], unlike [enemy/alternative] which [failure mode].',
  },
  'STR-AF4': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate the Amanah Content Engine — 6+ content angles derived from The Belief, Enemy Narrative, and VoC language bank. Each angle: hook + thesis + proof reference.',
  },
  'STR-AF5': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Truth-Gate Advisory — safe headlines and messaging guardrails. What CAN be said (G1/G2 backed), what CANNOT be said (unverified), and borderline claims needing G3 conditional language.',
  },
  'STR-V1': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Strategy Integrity Matrix. Verify all STR S-outputs are internally consistent and grounded in upstream CRD data.',
  },
  'STR-V2': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Responsible Removal Log for strategy stage. Document any strategy candidates removed and why.',
  },
  'STR-V3': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Cleansed Candidate Handoff. Compile remaining strategy elements that passed integrity checks for OFR stage.',
  },

  // ─── OFR ───
  'OFR-A1': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate The Promise (G1/G2 grade only). The core transformation promise must be backed by verified proof. No G3/G4 claims in the promise statement itself.',
  },
  'OFR-A2': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate the Ideal Customer Profile. Demographics, psychographics, situation triggers, disqualifiers. Use VoC language from STR-S2.',
  },
  'OFR-A3': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate The Mechanism — how the promise is delivered. Step-by-step process, timeline, and what the client experiences at each stage.',
  },
  'OFR-A4': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate the Scope Map. Hard boundaries on what IS and IS NOT included. This becomes the frozen reference for all downstream stages. Be precise — anything not listed here cannot be referenced in Outreach, Sales, or Delivery.',
  },
  'OFR-A5': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate the Value Stack. Layer the offer components from core to premium. Each layer: what it includes, the value it creates, and the proof backing it.',
  },
  'OFR-A6': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate the Risk Reversal / Guarantee. Must be deliverable by the operator and grounded in their actual capacity. No guarantees the operator cannot fulfill.',
  },
  'OFR-A7': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate the Pricing Structure. Tiers, payment terms, and the rationale for each price point anchored to value stack and market references from OFR-S4.',
  },
  'OFR-A8': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate the Proof Plan. For each promise claim: what proof asset is needed, how it will be captured, timeline for collection, and current evidence grade.',
  },
  'OFR-V1': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Offer Integrity Matrix — Feasibility & Amanah Gate. Verify: (1) operator can deliver the promise, (2) pricing is justified, (3) guarantee is fulfillable, (4) scope is achievable within constraints.',
  },
  'OFR-V2': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Sustainable Impact Scoring. Score the offer on long-term viability and community benefit dimensions.',
  },
  'OFR-FP03': {
    pattern: 'COMPRESSED_CYCLE',
    taskInstructions: 'Compressed Cycle Sign-Off for OFR stage.',
  },

  // ─── OUT ───
  'OUT-A1': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Channel Plan & Lead Criteria. Which channels, priority order, lead qualification criteria per channel, and expected volume. Must align with operator constraints from OUT-S5.',
  },
  'OUT-A2': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Hook Library. 10-15 hooks derived from VoC language (STR-S2) and emotional triggers (STR-S3). Each hook: text, source VoC phrase, target emotion, channel fit.',
  },
  'OUT-A3': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Message Library. Complete DM/email messages using hooks from OUT-A2. Each message: hook → bridge → CTA. Multiple variants per channel.',
  },
  'OUT-A4': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Follow-Up Sequence. 5-7 touchpoints with timing, channel, message content, and escalation/exit logic.',
  },
  'OUT-A5': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Appointment Setter & No-Fit Scripts. Verbatim scripts for: (1) qualifying and booking, (2) graceful no-fit exit. Include branching logic.',
  },
  'OUT-A6': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Objection Preparation & Handling Matrix. Top 10 objections with: acknowledge → reframe → redirect response. Use VoC language.',
  },
  'OUT-A7': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Content-to-DM Pipeline Map. How content pieces connect to DM outreach: content topic → engagement trigger → DM opener → qualification.',
  },
  'OUT-IC': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Ihsan Baseline Checklist (DRIFT-02). Evaluate 5 mandatory compliance checks for all outreach materials. Each check: PASS or FAIL with evidence.',
  },

  // ─── SLS ───
  'SLS-S0': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Sales Stage Inputs Extractor. Extract and organize all upstream data needed for the SLS stage: offer scope, ICP, pricing, hooks, messages, objections. This is a synthesis/extraction task, not script generation.',
  },
  'SLS-A0': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Sales Asset Pack Full Assembly. Check all SLS S-outputs and A-outputs are complete. If any required input is missing, output NO-SHIP with specific missing items. If complete, compile the master pack.',
  },
  'SLS-FP03': {
    pattern: 'COMPRESSED_CYCLE',
    taskInstructions: 'Compressed Cycle Sign-Off for SLS stage.',
  },

  // ─── DEL ───
  'DEL-S0': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Fulfillment S-Outputs Generator. Master prompt that checks OFR inputs and generates DEL-S1 through DEL-S5 framework. NO-SHIP if required OFR data is missing.',
  },
  'DEL-A1': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Onboarding Checklist. Step-by-step onboarding sequence aligned with OFR scope and mechanism.',
  },
  'DEL-A2': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Client Intake Form. Fields needed to begin delivery, mapped from OFR-A2 (ICP) and OFR-A3 (Mechanism).',
  },
  'DEL-A3': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Execution SOP. Standard operating procedure for delivering the offer. Step-by-step with quality checkpoints.',
  },
  'DEL-A4': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Quality Control Checklist. Verification points at each delivery milestone. Must map to OFR promise claims.',
  },
  'DEL-A5': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Client Success Milestones asset. Observable, measurable milestones the client will hit during delivery.',
  },
  'DEL-A6': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Proof Capture Protocol. How and when to capture proof assets (testimonials, case studies, metrics) at each milestone.',
  },
  'DEL-A7': {
    pattern: 'SCRIPT_GENERATION',
    taskInstructions: 'Generate Offboarding Sequence. Graceful exit sequence with: final deliverable handoff, feedback capture, retention handoff to RET stage.',
  },

  // ─── RET ───
  'RET-S1': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Segment Map. Classify clients into 4 segments: Cold Lead, Past Client, Re-Activation (60+ days), Warm Non-Convert. Use delivery and sales data from upstream.',
  },
  'RET-S2': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Proof Inventory. Catalog all collected proof assets from DEL stage: testimonials, case studies, metrics, before/after data.',
  },
  'RET-S3': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Offer Continuation Map. Which existing offer components can be extended, upsold, or cross-sold to each segment.',
  },
  'RET-S4': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Message Spine + Tone Rules. Define messaging framework and tone guidelines for retention communications across all segments.',
  },
  'RET-S5': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Deployment Logic. When and how each sequence triggers: segment assignment → sequence entry → escalation → exit.',
  },

  // ─── OPT ───
  'OPT-S1': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Metric Dashboard. Report the 4 Canonical Metrics plus Barakah Health Index and Team Vitality Score reviews. Pull data from all upstream stages.',
  },
  'OPT-S2': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Weakest Link Identification. Identify the single constraint most limiting system throughput. Theory of Constraints approach.',
  },
  'OPT-S3': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Root Cause Hypotheses. 3-5 hypotheses for why the weakest link exists. Each with: evidence, test method, expected outcome.',
  },
  'OPT-S4': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Top 3 Optimization Actions. Prioritized by impact and feasibility. Each action: what, why, who, when, success metric.',
  },
  'OPT-S5': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Hold List & Guardrails. What NOT to change this cycle. Stewardship Score check — triggers FP-01 if below 7.0.',
  },
  'OPT-S6': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Next Cycle Test Plan. What will be tested in the next 30-day cycle. Hypothesis, metric, target, timeline.',
  },
  'OPT-S7': {
    pattern: 'RESEARCH_DISCOVERY',
    taskInstructions: 'Team Vitality Check-In. Energy, capacity, and alignment assessment for the operator and any team members.',
  },
  'OPT-A1': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Stewardship Score (MG-01). Calculate the composite stewardship score from all stage metrics.',
  },
  'OPT-A2': {
    pattern: 'ASSEMBLY_GATE',
    taskInstructions: 'Barakah Health Index (MG-03). Composite health metric across all pipeline stages.',
  },
  'OPT-A3': {
    pattern: 'COMPRESSED_CYCLE',
    taskInstructions: 'Constrained Proceed Protocol (FP-01). Evaluate whether the system can proceed under current constraints.',
  },
};

/**
 * Get the registry entry for a task, merging stage default with any task override.
 * @param {string} taskId - e.g. 'IDY-S1'
 * @param {string} stage - e.g. 'IDY'
 * @returns {{ pattern: string, contextDepth: number|string, taskInstructions: string|null }}
 */
export function getRegistryEntry(taskId, stage) {
  const stageDefault = STAGE_DEFAULTS[stage] || STAGE_DEFAULTS.IDY;
  const override = TASK_OVERRIDES[taskId];

  return {
    pattern: override?.pattern || stageDefault.pattern,
    contextDepth: override?.contextDepth ?? stageDefault.contextDepth,
    taskInstructions: override?.taskInstructions || null,
  };
}
