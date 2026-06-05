// BBOS stage weighted-signal scoring — single source of truth.
//
// Extracted from BbosFullDashboard.jsx (2026-06-04) so that BOTH the legacy
// dashboard's StageScoreCard and the redesigned pipeline-dashboard adapter
// score stages identically (no drift). Each stage has 5 weighted signals;
// every signal scores 0–5 from a referenced task's bbosFieldData. The stage
// verdict is derived from the percentage of max points.
//
// Thresholds: >=75 QUALIFIED, >=50 DEVELOPING, >=25 REVIEW NEEDED, else BLOCKED.

import { getBbosTaskDef } from './bbos-task-definitions';

const MAX_PER_SIGNAL = 5;

// Local self-contained copy (BbosFullDashboard keeps its own for its renderers).
function splitLines(text) {
  if (!text) return [];
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

export function countNonEmpty(...keys) {
  return (fd) => {
    const n = keys.filter((k) => !!fd?.[k]?.trim?.()).length;
    const t = keys.length;
    return n === t ? 5 : n >= t * 0.75 ? 4 : n >= t * 0.5 ? 3 : n >= 1 ? 1 : 0;
  };
}

export const STAGE_SCORE_SIGNALS = {
  IDY: [
    { label: 'Capital & Skills Declared',  taskId: 'IDY-S1',
      fieldIds: ['capitalDeclaration', 'skillsDeclaration'],
      score: countNonEmpty('capitalDeclaration', 'skillsDeclaration') },
    { label: 'Proof & Constraints',        taskId: 'IDY-S1',
      fieldIds: ['proofLinks', 'constraintsDeclaration', 'geographyDeclaration', 'regulatoryDeclaration'],
      score: countNonEmpty('proofLinks', 'constraintsDeclaration', 'geographyDeclaration', 'regulatoryDeclaration') },
    { label: 'Normalisation Complete',     taskId: 'IDY-S2',
      fieldIds: ['capitalMapping', 'skillsMapping', 'proofMapping', 'constraintsMapping'],
      score: countNonEmpty('capitalMapping', 'skillsMapping', 'proofMapping', 'constraintsMapping') },
    { label: 'Gap Severity Assessed',      taskId: 'IDY-S3',
      fieldIds: ['gapSeverity', 'resolutionActions'],
      score: (fd) => fd?.gapSeverity?.trim() ? (fd?.resolutionActions?.trim() ? 5 : 3) : 0 },
    { label: 'Routing Decision Made',      taskId: 'IDY-S4',
      fieldIds: ['routingDecision', 'routingBasis'],
      score: (fd) => fd?.routingDecision?.trim() ? (fd?.routingBasis?.trim() ? 5 : 3) : 0 },
  ],
  CRD: [
    { label: 'Overall Proof Strength',    taskId: 'CRD-S3',
      fieldIds: ['overallProofStrength'],
      score: (fd) => ({ strong: 5, moderate: 3, weak: 1, insufficient: 0 }[fd?.overallProofStrength] ?? 0) },
    { label: 'Gate A — Regulatory',       taskId: 'CRD-V1',
      fieldIds: ['gateARegulatory'],
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateARegulatory] ?? 0) },
    { label: 'Gate B — Market Fit',       taskId: 'CRD-V1',
      fieldIds: ['gateBMarketFit'],
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateBMarketFit] ?? 0) },
    { label: 'Gate C — Competence Proof', taskId: 'CRD-V1',
      fieldIds: ['gateCCompetenceProof'],
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateCCompetenceProof] ?? 0) },
    { label: 'Gate D — Proven Demand',    taskId: 'CRD-V1',
      fieldIds: ['gateDProvenDemand'],
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateDProvenDemand] ?? 0) },
  ],
  STR: [
    { label: 'Integrity Verdict',     taskId: 'STR-V1',
      fieldIds: ['integrityVerdict'],
      score: (fd) => ({ pass: 5, conditionalPass: 3, fail: 0 }[fd?.integrityVerdict] ?? 0) },
    { label: 'VoC Depth',             taskId: 'STR-S2',
      fieldIds: ['verbatimPhrases'],
      score: (fd) => { const n = splitLines(fd?.verbatimPhrases).length; return n >= 15 ? 5 : n >= 8 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Content Angles',        taskId: 'STR-AF4',
      fieldIds: ['contentAngle1', 'contentAngle2', 'contentAngle3', 'contentAngle4', 'contentAngle5', 'contentAngle6'],
      score: (fd) => { const n = [1,2,3,4,5,6].filter((i) => !!fd?.[`contentAngle${i}`]?.trim()).length; return n === 6 ? 5 : n >= 4 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Core Belief Defined',   taskId: 'STR-AF1',
      fieldIds: ['beliefStatement'],
      score: (fd) => fd?.beliefStatement?.trim() ? 5 : 0 },
    { label: 'Transformation Arc',    taskId: 'STR-AF2',
      fieldIds: ['beforeState', 'transformation', 'afterState'],
      score: (fd) => { const n = ['beforeState','transformation','afterState'].filter((k) => !!fd?.[k]?.trim()).length; return n === 3 ? 5 : n === 2 ? 3 : n === 1 ? 1 : 0; } },
  ],
  OFR: [
    { label: 'Promise G-Label',       taskId: 'OFR-A1',
      fieldIds: ['promiseGLabel'],
      score: (fd) => ({ G1: 5, G2: 3 }[fd?.promiseGLabel] ?? 0) },
    { label: 'ICP Completeness',      taskId: 'OFR-A2',
      fieldIds: ['demographicProfile', 'psychographicProfile', 'qualificationCriteria', 'disqualificationCriteria'],
      score: (fd) => { const n = ['demographicProfile','psychographicProfile','qualificationCriteria','disqualificationCriteria'].filter((k) => !!fd?.[k]?.trim()).length; return n === 4 ? 5 : n === 3 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Guarantee Rigor',       taskId: 'OFR-A6',
      fieldIds: ['triggerCondition', 'guaranteeScope', 'remedy', 'operatorBoundaries'],
      score: (fd) => { const n = ['triggerCondition','guaranteeScope','remedy','operatorBoundaries'].filter((k) => !!fd?.[k]?.trim()).length; return n === 4 ? 5 : n === 3 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Scope Map',             taskId: 'OFR-A4',
      fieldIds: ['scopeIncluded', 'scopeExcluded'],
      score: (fd) => (!!fd?.scopeIncluded?.trim() && !!fd?.scopeExcluded?.trim()) ? 5 : (!!fd?.scopeIncluded?.trim() || !!fd?.scopeExcluded?.trim()) ? 3 : 0 },
    { label: 'Promise Proof',         taskId: 'OFR-A1',
      fieldIds: ['proofStatus'],
      score: (fd) => ({ verified: 5, pending: 1 }[fd?.proofStatus] ?? 0) },
  ],
  OUT: [
    { label: 'Audience Concern Mapping', taskId: 'OUT-IC',
      fieldIds: ['icOut1'],
      score: (fd) => fd?.icOut1 === 'pass' ? 5 : 0 },
    { label: 'G-Label Compliance',       taskId: 'OUT-IC',
      fieldIds: ['icOut2'],
      score: (fd) => fd?.icOut2 === 'pass' ? 5 : 0 },
    { label: 'Singular CTA',             taskId: 'OUT-IC',
      fieldIds: ['icOut3'],
      score: (fd) => fd?.icOut3 === 'pass' ? 5 : 0 },
    { label: 'Scarcity Verified',        taskId: 'OUT-IC',
      fieldIds: ['icOut4'],
      score: (fd) => fd?.icOut4 === 'pass' ? 5 : 0 },
    { label: 'Readability Check',        taskId: 'OUT-IC',
      fieldIds: ['icOut5'],
      score: (fd) => fd?.icOut5 === 'pass' ? 5 : 0 },
  ],
  SLS: [
    { label: 'Qualification Depth',       taskId: 'SLS-S1',
      fieldIds: ['qualificationQuestions', 'autoDisqualifiers', 'scoringRoutingNotes'],
      score: countNonEmpty('qualificationQuestions', 'autoDisqualifiers', 'scoringRoutingNotes') },
    { label: 'Routing Completeness',      taskId: 'SLS-S2',
      fieldIds: ['routingTable', 'decisionTreeSteps', 'noFitExitPath'],
      score: countNonEmpty('routingTable', 'decisionTreeSteps', 'noFitExitPath') },
    { label: 'Call Script Ready',         taskId: 'SLS-S3',
      fieldIds: ['callStructure', 'verbatimScript', 'branchPrompts'],
      score: countNonEmpty('callStructure', 'verbatimScript', 'branchPrompts') },
    { label: 'Objection Coverage',        taskId: 'SLS-S4',
      fieldIds: ['objectionList'],
      score: (fd) => { const n = splitLines(fd?.objectionList).length; return n >= 10 ? 5 : n >= 5 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Asset Assembly',            taskId: 'SLS-A0',
      fieldIds: ['assemblyStatus'],
      score: (fd) => ({ complete: 5, partial: 3, pending: 1 }[fd?.assemblyStatus] ?? 0) },
  ],
  DEL: [
    { label: 'Delivery Phases Mapped',    taskId: 'DEL-S1',
      fieldIds: ['deliveryPhases', 'checkpoints', 'ownerAssignments'],
      score: countNonEmpty('deliveryPhases', 'checkpoints', 'ownerAssignments') },
    { label: 'Quality & Risk Coverage',   taskId: 'DEL-S2',
      fieldIds: ['failureModes', 'qcChecks', 'guaranteeTriggers', 'mitigationSteps'],
      score: countNonEmpty('failureModes', 'qcChecks', 'guaranteeTriggers', 'mitigationSteps') },
    { label: 'Success Milestones',        taskId: 'DEL-S3',
      fieldIds: ['milestoneList', 'successDefinition'],
      score: countNonEmpty('milestoneList', 'successDefinition') },
    { label: 'Proof Capture Plan',        taskId: 'DEL-S4',
      fieldIds: ['proofTypes', 'captureTimeline', 'captureMethod', 'consentLanguage'],
      score: countNonEmpty('proofTypes', 'captureTimeline', 'captureMethod', 'consentLanguage') },
    { label: 'Retention Handoff',         taskId: 'DEL-S5',
      fieldIds: ['handoffNotes', 'retentionSeedMessage', 'nextSteps'],
      score: countNonEmpty('handoffNotes', 'retentionSeedMessage', 'nextSteps') },
  ],
  RET: [
    { label: 'Segment Definitions',       taskId: 'RET-S1',
      fieldIds: ['coldLeadDef', 'pastClientDef', 'reActivationDef', 'warmNonConvertDef'],
      score: countNonEmpty('coldLeadDef', 'pastClientDef', 'reActivationDef', 'warmNonConvertDef') },
    { label: 'Proof Inventory',           taskId: 'RET-S2',
      fieldIds: ['proofAssets', 'segmentRelevance', 'claimStrength'],
      score: countNonEmpty('proofAssets', 'segmentRelevance', 'claimStrength') },
    { label: 'Continuation Map',          taskId: 'RET-S3',
      fieldIds: ['upsellPath', 'ascensionLevels', 'eligibilityRules', 'triggerTiming'],
      score: countNonEmpty('upsellPath', 'ascensionLevels', 'eligibilityRules', 'triggerTiming') },
    { label: 'Message Spine & Tone',      taskId: 'RET-S4',
      fieldIds: ['warmingPosture', 'toneConstraints', 'ctaStandards', 'messageSpines'],
      score: countNonEmpty('warmingPosture', 'toneConstraints', 'ctaStandards', 'messageSpines') },
    { label: 'Deployment Logic',          taskId: 'RET-S5',
      fieldIds: ['proofToSequenceMap', 'channelAssumptions'],
      score: countNonEmpty('proofToSequenceMap', 'channelAssumptions') },
  ],
  OPT: [
    { label: 'Metrics Tracked',           taskId: 'OPT-S1',
      fieldIds: ['cm1OutreachConversion', 'cm2FitToClose', 'cm3MilestoneCompletion', 'cm4UnpromptedReferral'],
      score: countNonEmpty('cm1OutreachConversion', 'cm2FitToClose', 'cm3MilestoneCompletion', 'cm4UnpromptedReferral') },
    { label: 'Weakest Link Identified',   taskId: 'OPT-S2',
      fieldIds: ['weakestLinkStage', 'evidenceSummary', 'suspectedFailureModes'],
      score: countNonEmpty('weakestLinkStage', 'evidenceSummary', 'suspectedFailureModes') },
    { label: 'Root Cause Hypotheses',     taskId: 'OPT-S3',
      fieldIds: ['hypotheses', 'risksAndSideEffects'],
      score: (fd) => fd?.hypotheses?.trim() ? (fd?.risksAndSideEffects?.trim() ? 5 : 3) : 0 },
    { label: 'Optimization Actions',      taskId: 'OPT-S4',
      fieldIds: ['action1', 'action2', 'action3'],
      score: countNonEmpty('action1', 'action2', 'action3') },
    { label: 'Stewardship Score',         taskId: 'OPT-A1',
      fieldIds: ['overallStewardshipScore'],
      score: (fd) => { const s = Number(fd?.overallStewardshipScore); return s >= 80 ? 5 : s >= 60 ? 4 : s >= 40 ? 3 : s >= 20 ? 1 : 0; } },
  ],
};

// Dev-time validation: cross-checks signal fieldIds against task definition fields.
// Logs warnings for any field ID that doesn't exist in the referenced task definition.
if (import.meta.env.DEV) {
  for (const [stage, signals] of Object.entries(STAGE_SCORE_SIGNALS)) {
    for (const sig of signals) {
      const def = getBbosTaskDef(sig.taskId);
      if (!def) {
        console.warn(`[ScoreSignals] Task "${sig.taskId}" referenced by "${sig.label}" (${stage}) does not exist`);
        continue;
      }
      const defFieldIds = new Set(def.fields.map((f) => f.id));
      for (const fid of (sig.fieldIds || [])) {
        if (!defFieldIds.has(fid)) {
          console.warn(`[ScoreSignals] Field "${fid}" referenced by "${sig.label}" (${stage}) not found in ${sig.taskId} fields`);
        }
      }
    }
  }
}

/**
 * Score a single BBOS stage from a task map keyed by task definition id.
 * @param {string} stageId - one of IDY…OPT
 * @param {Record<string, {bbosFieldData?: object}>} taskMap - taskId → task
 * @returns {{totalPts:number, maxPts:number, pct:number, verdict:string,
 *            signals:Array<{label:string, pts:number}>}|null}
 */
export function scoreStage(stageId, taskMap) {
  const signals = STAGE_SCORE_SIGNALS[stageId];
  if (!signals) return null;
  const safeMap = taskMap || {};
  const scored = signals.map((sig) => {
    const fd = safeMap[sig.taskId]?.bbosFieldData || {};
    return { label: sig.label, pts: sig.score(fd) };
  });
  const totalPts = scored.reduce((s, r) => s + r.pts, 0);
  const maxPts = signals.length * MAX_PER_SIGNAL;
  const pct = maxPts ? Math.round((totalPts / maxPts) * 100) : 0;
  const verdict =
    pct >= 75 ? 'QUALIFIED' :
    pct >= 50 ? 'DEVELOPING' :
    pct >= 25 ? 'REVIEW NEEDED' : 'BLOCKED';
  return { totalPts, maxPts, pct, verdict, signals: scored };
}
