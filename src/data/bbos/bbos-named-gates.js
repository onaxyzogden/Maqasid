// The five named BBOS gates, as the accepted Factory docs state them.
// ---------------------------------------------------------------------------
// Each gate reads the stage's own task fields (`bbosFieldData`) and returns
// one of four results:
//   clear      — the doc's rule is met; the move may go ahead
//   conditions — the doc sends this to a decision, not a rejection; the move
//                waits on a 'conditions' entry in bbosGateLog, resolved
//   incomplete — the evidence the rule needs is not recorded yet
//   blocked    — the doc's rule refuses the move
// A stage takes its worst gate's result. Stages no doc gates return 'none'.
//
// There is no way past a blocked gate here. A ★ disqualifier, five or more
// rubric flags, an IC checklist with two or more fails and a TYPE A depletion
// are the doc's refusals, and only a Halt answers them. "Al-Haqq does not
// negotiate" (CRD v2.0, FP-02).
//
// The outcome is recorded in bbosGateLog alone (gate log wins, PR #56):
// conditions entries carry `gateId`, and a proceed carries `acknowledged`.

import { icList, icAssetRows, icRowResult } from './bbos-ic-assets';
import { BBOS_STAGES } from './bbos-pipeline';

const RANK = { none: 0, clear: 1, conditions: 2, incomplete: 3, blocked: 4 };

const text = (v) => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v));
const fieldsOf = (tasks, type) => {
  const t = (tasks || []).find((x) => x.bbosTaskType === type);
  return t ? t.bbosFieldData || {} : null;
};
const result = (id, status, reasons, extra = {}) => ({
  id, name: GATE_RULES[id].name, rule: GATE_RULES[id].rule, cite: GATE_RULES[id].cite, status, reasons, ...extra,
});
// 'q5RegulatoryMisuse' -> 'Q5'
const qOf = (id) => `Q${id.match(/^q(\d+)/)[1]}`;
const missingTask = (id, type) => result(id, 'incomplete', [`Task ${type} is missing from this project.`]);

export const GATE_RULES = {
  amanah: {
    name: 'Amanah Gate',
    stage: 'CRD',
    cite: 'CRD v2.0 · FP-02 Amanah Intake Screening Rubric',
    rule: 'Any ★ disqualifier: reject immediately. 0–2 flags: proceed with founder notification. 3–4 flags: escalate to the founder. 5+ flags: do not proceed.',
    disqualifiers: ['q3UnverifiableClaims', 'q5RegulatoryMisuse', 'q8FalseInformation'],
    // Non-★ questions and the answer that raises each one's flag.
    flags: [
      { id: 'q1ProofVerifiable', q: 'Q1', flagOn: 'no', label: 'Weak proof' },
      { id: 'q2RegulatoryVerifiable', q: 'Q2', flagOn: 'no', label: 'Regulatory' },
      { id: 'q4RunwaySufficient', q: 'Q4', flagOn: 'no', label: 'Viability' },
      { id: 'q6GoalAlignment', q: 'Q6', flagOn: 'no', label: 'Misalignment' },
      { id: 'q7EnergyAversion', q: 'Q7', flagOn: 'yes', label: 'Aversion', escalates: true },
      { id: 'q9ScopeUnderstanding', q: 'Q9', flagOn: 'no', label: 'Expectation misalignment' },
      { id: 'q10CapacityRealistic', q: 'Q10', flagOn: 'no', label: 'Capacity', escalates: true },
    ],
  },
  viability: {
    name: 'Viability Gate',
    stage: 'CRD',
    cite: 'CRD v2.0 · Viability Gates A–D',
    rule: 'Every candidate must clear Gates A–D before any scoring. A candidate that fails is removed to the Removed Niche Log; only cleared candidates are handed off.',
    letters: [
      { id: 'gateARegulatory', name: 'Gate A — Regulatory Clearance' },
      { id: 'gateBMarketFit', name: 'Gate B — Addressable Market Fit' },
      { id: 'gateCCompetenceProof', name: 'Gate C — Certification / Competence Proof' },
      { id: 'gateDProvenDemand', name: 'Gate D — Proven Demand' },
    ],
  },
  baseline: {
    name: 'Ihsan Baseline Gate',
    stage: 'OUT',
    cite: 'OUT v2.0 · IC-OUT (DRIFT-02)',
    rule: 'Any asset failing 2 or more IC-OUT checks is NO-SHIP and must be revised.',
    lists: ['IC-OUT'],
  },
  preship: {
    name: 'Pre-Ship Gate',
    stage: 'DEL',
    cite: 'DEL v3.7 · IC-OFR + IC-DEL (DRIFT-02)',
    rule: 'Any asset failing 2 or more checks requires revision before use.',
    lists: ['IC-OFR', 'IC-DEL'],
  },
  constraint: {
    name: 'Constraint Gate',
    stage: 'OPT',
    cite: 'OPT v2.0 · FP-01 Constrained Proceed Protocol (G7.2)',
    rule: 'Applies when the Stewardship Score is below 7.0. TYPE A: no exception; the Restoration Mandate applies. TYPE B / C: permitted only with every guardrail, the named accountability contact and the signed confirmation complete.',
    required: [
      { id: 'depletionEvidence', label: 'Evidence for Classification' },
      { id: 'commercialAction', label: 'Specific Commercial Action' },
      { id: 'closeWindow', label: 'Close Window / Deadline' },
      { id: 'accountabilityContact', label: 'Named Accountability Contact' },
      { id: 'guardrailsConfirmation', label: 'Guardrails Active?' },
      { id: 'operatorSignOff', label: 'Operator Sign-Off Statement' },
    ],
  },
};

export const STAGE_GATES = { CRD: ['amanah', 'viability'], OUT: ['baseline'], DEL: ['preship'], OPT: ['constraint'] };

function amanah(tasks) {
  const R = GATE_RULES.amanah;
  const d = fieldsOf(tasks, 'CRD-FP02');
  if (!d) return missingTask('amanah', 'CRD-FP02');
  const hit = R.disqualifiers.filter((id) => d[id] === 'yes');
  if (hit.length) {
    return result('amanah', 'blocked', [
      `★ ${hit.map(qOf).join(', ')} answered YES: automatic disqualifier. Reject immediately. Complete the Responsible Removal Log (Stage 02.1).`,
    ]);
  }
  const unanswered = [...R.disqualifiers, ...R.flags.map((f) => f.id)].filter((id) => !text(d[id]));
  if (unanswered.length) {
    return result('amanah', 'incomplete', [`Unanswered: ${unanswered.map(qOf).join(', ')}. Score every question YES or NO.`]);
  }
  const flagged = R.flags.filter((f) => d[f.id] === f.flagOn);
  const list = flagged.map((f) => `${f.q} (${f.label})`).join(', ');
  if (flagged.length >= 5) {
    return result('amanah', 'blocked', [
      `${flagged.length} flags: ${list}. Do not proceed. Route to Stage 02.1 Rejection: insufficient alignment across multiple integrity dimensions.`,
    ]);
  }
  const escalating = flagged.filter((f) => f.escalates);
  if (flagged.length >= 3 || escalating.length) {
    const why = flagged.length >= 3
      ? `${flagged.length} flags: ${list}.`
      : `${escalating.map((f) => f.q).join(', ')} flagged, and the rubric escalates that flag: ${list}.`;
    return result('amanah', 'conditions', [`${why} ESCALATE to founder.`], {
      condition: {
        text: `Amanah Gate (FP-02): ${why} Founder decision required before Stage 02 proceeds.`,
        resolverRole: 'OW',
      },
    });
  }
  return result('amanah', 'clear', [`${flagged.length} flag${flagged.length === 1 ? '' : 's'}${flagged.length ? `: ${list}` : ''}. Proceed with founder notification (not approval).`], {
    acknowledgements: [{ id: 'founderNotified', label: 'The founder has been notified with a brief written summary' }],
  });
}

function viability(tasks) {
  const R = GATE_RULES.viability;
  const v1 = fieldsOf(tasks, 'CRD-V1');
  if (!v1) return missingTask('viability', 'CRD-V1');
  const removed = text(fieldsOf(tasks, 'CRD-V2')?.removedNiches);
  const cleared = text(fieldsOf(tasks, 'CRD-V3')?.clearedCandidates);
  if (v1.overallViability === 'removed') {
    return result('viability', 'blocked', ['Overall determination is Removed: no candidate clears the Viability Gates. Halt, and record the removal.']);
  }
  const unanswered = R.letters.filter((l) => !text(v1[l.id]));
  if (unanswered.length || !text(v1.overallViability)) {
    const names = [...unanswered.map((l) => l.name), ...(text(v1.overallViability) ? [] : ['Overall Viability Determination'])];
    return result('viability', 'incomplete', [`Unanswered: ${names.join('; ')}.`]);
  }
  const failed = R.letters.filter((l) => v1[l.id] === 'fail');
  const reasons = [];
  if (failed.length && !removed) {
    reasons.push(`${failed.map((l) => l.name).join('; ')} failed. Record the removed candidate in the Removed Niche Log (V2).`);
  }
  if (!cleared) reasons.push('The Cleared Candidate Handoff (V3) is empty. Name the candidate(s) that cleared all four gates, or Halt if none did.');
  if (reasons.length) return result('viability', 'incomplete', reasons);

  const conditional = R.letters.filter((l) => v1[l.id] === 'conditional');
  if (conditional.length || v1.overallViability === 'conditionallyViable') {
    const names = conditional.map((l) => l.name).join('; ') || 'Overall determination';
    return result('viability', 'conditions', [`${names}: conditional, achievable with action.`], {
      condition: { text: `Viability Gate: ${names} conditional. Complete the required action before the candidate is scored.`, resolverRole: null },
    });
  }
  return result('viability', 'clear', [`Gates A–D cleared. Handed off: ${cleared}.`]);
}

// Each list holds every asset checked; each asset is judged on its own five
// checks (bbos-ic-assets.js). The gate takes the worst asset: one NO-SHIP
// blocks it, one unfinished asset leaves it incomplete.
function checklists(id, tasks) {
  const R = GATE_RULES[id];
  const reasons = [];
  const assets = [];
  let status = 'clear';
  const worse = (s) => { if (RANK[s] > RANK[status]) status = s; };
  for (const L of R.lists.map(icList)) {
    const d = fieldsOf(tasks, L.task);
    if (!d) { worse('incomplete'); reasons.push(`Task ${L.task} is missing from this project.`); continue; }
    const rows = icAssetRows(d, L);
    if (!rows.length) { worse('incomplete'); reasons.push(`${L.code}: add each asset checked and answer its five checks.`); continue; }
    rows.forEach((row, i) => {
      const r = icRowResult(row, L.code);
      assets.push({ list: L.code, index: i + 1, asset: r.asset, verdict: r.verdict, fails: r.fails, unanswered: r.unanswered });
      if (r.verdict === 'noship') {
        worse('blocked');
        reasons.push(`${L.code} NO-SHIP for: ${r.asset || `asset ${i + 1}`}. Failed ${r.fails.join(', ')}. Revise and re-check before use.`);
      } else if (r.verdict === 'incomplete') {
        worse('incomplete');
        const todo = [!r.named && 'name the asset checked', r.unanswered.length && `answer ${r.unanswered.join(', ')}`].filter(Boolean).join('; ');
        reasons.push(`${L.code} asset ${i + 1}${r.named ? ` (${r.asset})` : ''}: ${todo}.`);
      } else {
        reasons.push(`${L.code} passed for: ${r.asset}${r.fails.length ? ` (1 fail: ${r.fails[0]}; the rule is 2 or more)` : ''}.`);
      }
    });
  }
  return result(id, status, reasons, { assets });
}

function constraint(tasks) {
  const R = GATE_RULES.constraint;
  const s5 = fieldsOf(tasks, 'OPT-S5');
  if (!s5) return missingTask('constraint', 'OPT-S5');
  if (!text(s5.g72Check)) return result('constraint', 'incomplete', ['G7.2 is unanswered: is the Stewardship Score below 7.0?']);
  if (s5.g72Check === 'no') return result('constraint', 'clear', ['Stewardship Score is 7.0 or above. FP-01 does not apply.']);
  const a3 = fieldsOf(tasks, 'OPT-A3');
  if (!a3) return missingTask('constraint', 'OPT-A3');
  if (a3.depletionType === 'typeA') {
    return result('constraint', 'blocked', ['TYPE A — Existential Depletion: no exception. The G7.2 Restoration Mandate applies; no commercial action this cycle.']);
  }
  if (!text(a3.depletionType)) return result('constraint', 'incomplete', ['FP-01 is required: classify the Depletion Type.']);
  if (a3.guardrailsConfirmation === 'no') {
    return result('constraint', 'blocked', ['The guardrails cannot be confirmed. FP-01 permits a constrained proceed only with every guardrail active.']);
  }
  const missing = R.required.filter((f) => !text(a3[f.id]));
  if (missing.length) return result('constraint', 'incomplete', [`FP-01 incomplete: ${missing.map((f) => f.label).join('; ')}.`]);
  const type = a3.depletionType === 'typeB' ? 'TYPE B — Situational Fatigue' : 'TYPE C — Strategic Pressure';
  return result('constraint', 'clear', [`${type}: constrained proceed with every guardrail, accountability contact ${text(a3.accountabilityContact)}, close window ${text(a3.closeWindow)}.`]);
}

const EVALUATORS = {
  amanah, viability, constraint,
  baseline: (t) => checklists('baseline', t),
  preship: (t) => checklists('preship', t),
};

const stageIndex = (id) => BBOS_STAGES.findIndex((s) => s.id === id);

/**
 * A ★ disqualifier on file once the project has left CRD. The Amanah Gate is
 * judged when CRD is left, but its answers stay editable; a ★ answered YES
 * later is still "Reject immediately". Every stage after CRD then carries
 * this blocked gate, so gateMoveRefusal holds Advance and Close Cycle, and
 * only a Halt answers it. Null before or at CRD (where the Amanah gate itself
 * blocks), or with no ★ YES.
 */
export function lateDisqualifier(stageId, tasks) {
  const at = stageIndex(stageId);
  if (at < 0 || at <= stageIndex('CRD')) return null;
  const d = fieldsOf(tasks, 'CRD-FP02');
  if (!d) return null;
  const questions = GATE_RULES.amanah.disqualifiers
    .filter((id) => d[id] === 'yes')
    .map(qOf);
  if (!questions.length) return null;
  return {
    id: 'amanahLate',
    name: 'Amanah Gate (on file from CRD)',
    rule: GATE_RULES.amanah.rule,
    cite: GATE_RULES.amanah.cite,
    status: 'blocked',
    questions,
    reasons: [
      `★ ${questions.join(', ')} answered YES on the CRD Amanah rubric: automatic disqualifier. Reject immediately. Halt and route to Rejection, and complete the Responsible Removal Log (Stage 02.1).`,
    ],
  };
}

/** Evaluate every named gate on a stage from its tasks. */
export function evaluateStageGates(stageId, tasks) {
  const late = lateDisqualifier(stageId, tasks || []);
  const gates = [
    ...(late ? [late] : []),
    ...(STAGE_GATES[stageId] || []).map((id) => EVALUATORS[id](tasks || [])),
  ];
  const status = gates.reduce((s, g) => (RANK[g.status] > RANK[s] ? g.status : s), 'none');
  return { stageId, status, gates };
}

/**
 * Why the store must refuse moving the project off its current stage, or
 * null when the move may go ahead. A conditions gate needs a 'conditions'
 * entry with its gateId logged this cycle and every such entry resolved;
 * an acknowledgement (the founder notice) must be in record.acknowledged.
 */
export function gateMoveRefusal(project, tasks, record) {
  const stageId = project?.bbosStage;
  const evaluation = evaluateStageGates(stageId, tasks);
  if (evaluation.status === 'blocked' || evaluation.status === 'incomplete') return evaluation;
  const cycle = project?.bbosCycle || 1;
  const log = project?.bbosGateLog || [];
  for (const g of evaluation.gates) {
    if (g.status === 'conditions') {
      const mine = log.filter((e) => e.decision === 'conditions' && e.stageId === stageId && e.cycle === cycle && e.gateId === g.id);
      const resolved = (c) => log.some((e) => e.decision === 'resolved' && e.resolvesId === c.id);
      if (!mine.length || !mine.every(resolved)) return evaluation;
    }
    const acked = record?.acknowledged || [];
    if ((g.acknowledgements || []).some((a) => !acked.includes(a.id))) return evaluation;
  }
  return null;
}
