// The five gates the accepted BBOS Factory docs name, evaluated from the
// stage's own task fields: Amanah (FP-02 rubric) and Viability (Gates A–D) at
// CRD, Ihsan Baseline (IC-OUT) at OUT, Pre-Ship (IC-OFR + IC-DEL) at DEL, and
// Constraint (FP-01) at OPT. Thresholds are tested at their edges.
import { describe, it, expect } from 'vitest';
import { evaluateStageGates, gateMoveRefusal, lateDisqualifier, GATE_RULES } from '../bbos-named-gates';
import { BBOS_REJECTION_REASONS } from '../bbos-pipeline';
import { BBOS_TASK_DEFINITIONS } from '../bbos-task-definitions';

const task = (bbosTaskType, bbosFieldData) => ({ id: bbosTaskType, bbosTaskType, bbosFieldData });
const gate = (res, id) => res.gates.find((g) => g.id === id);

// FP-02: Q3, Q5, Q8 are the ★ disqualifiers (YES = disqualify). Q7's flag is
// a YES; every other question's flag is a NO.
const CLEAN_RUBRIC = {
  q1ProofVerifiable: 'yes', q2RegulatoryVerifiable: 'yes', q3UnverifiableClaims: 'no',
  q4RunwaySufficient: 'yes', q5RegulatoryMisuse: 'no', q6GoalAlignment: 'yes',
  q7EnergyAversion: 'no', q8FalseInformation: 'no', q9ScopeUnderstanding: 'yes',
  q10CapacityRealistic: 'yes',
};
const VIABLE = {
  'CRD-V1': { gateARegulatory: 'pass', gateBMarketFit: 'pass', gateCCompetenceProof: 'pass', gateDProvenDemand: 'pass', overallViability: 'viable' },
  'CRD-V2': {},
  'CRD-V3': { clearedCandidates: 'Halal food co-ops, Ontario' },
};
const crd = ({ rubric = {}, v1 = {}, v2, v3 } = {}) => [
  task('CRD-FP02', { ...CLEAN_RUBRIC, ...rubric }),
  task('CRD-V1', { ...VIABLE['CRD-V1'], ...v1 }),
  task('CRD-V2', v2 ?? VIABLE['CRD-V2']),
  task('CRD-V3', v3 ?? VIABLE['CRD-V3']),
];

describe('the ★ set matches the CRD v2.0 FP-02 rubric', () => {
  it('marks exactly Q3, Q5 and Q8 as automatic disqualifiers in the task definition', () => {
    const fp02 = BBOS_TASK_DEFINITIONS.find((d) => d.id === 'CRD-FP02');
    const starred = fp02.fields.filter((f) => f.label.includes('★')).map((f) => f.id);
    expect(starred).toEqual(['q3UnverifiableClaims', 'q5RegulatoryMisuse', 'q8FalseInformation']);
    expect(GATE_RULES.amanah.disqualifiers).toEqual(starred);
  });
});

describe('Amanah Gate (FP-02 rubric)', () => {
  it('blocks on any ★ YES, naming the question, even with other answers missing', () => {
    const res = evaluateStageGates('CRD', [task('CRD-FP02', { q5RegulatoryMisuse: 'yes' }), ...crd().slice(1)]);
    const g = gate(res, 'amanah');
    expect(g.status).toBe('blocked');
    expect(g.reasons.join(' ')).toMatch(/Q5/);
    expect(g.reasons.join(' ')).toMatch(/Reject immediately/);
  });

  it('is incomplete while any question is unanswered', () => {
    const res = evaluateStageGates('CRD', crd({ rubric: { q4RunwaySufficient: '' } }));
    expect(gate(res, 'amanah').status).toBe('incomplete');
    expect(gate(res, 'amanah').reasons.join(' ')).toMatch(/Q4/);
  });

  it('clears on 2 flags, and asks for the founder to be notified', () => {
    const g = gate(evaluateStageGates('CRD', crd({ rubric: { q1ProofVerifiable: 'no', q6GoalAlignment: 'no' } })), 'amanah');
    expect(g.status).toBe('clear');
    expect(g.acknowledgements.map((a) => a.id)).toEqual(['founderNotified']);
  });

  it('raises an owner-only condition on 3 flags (Q7 counts as a flag on YES)', () => {
    const g = gate(evaluateStageGates('CRD', crd({ rubric: { q1ProofVerifiable: 'no', q6GoalAlignment: 'no', q7EnergyAversion: 'yes' } })), 'amanah');
    expect(g.status).toBe('conditions');
    expect(g.condition.resolverRole).toBe('OW');
    expect(g.condition.text).toMatch(/Founder decision required/);
  });

  it('raises the same condition on 4 flags', () => {
    const g = gate(evaluateStageGates('CRD', crd({ rubric: { q1ProofVerifiable: 'no', q2RegulatoryVerifiable: 'no', q4RunwaySufficient: 'no', q9ScopeUnderstanding: 'no' } })), 'amanah');
    expect(g.status).toBe('conditions');
  });

  it('escalates a single Q10 capacity flag, as its row in the rubric says', () => {
    const g = gate(evaluateStageGates('CRD', crd({ rubric: { q10CapacityRealistic: 'no' } })), 'amanah');
    expect(g.status).toBe('conditions');
    expect(g.reasons.join(' ')).toMatch(/Q10/);
  });

  it('blocks on 5 flags: do not proceed', () => {
    const g = gate(evaluateStageGates('CRD', crd({ rubric: { q1ProofVerifiable: 'no', q2RegulatoryVerifiable: 'no', q4RunwaySufficient: 'no', q6GoalAlignment: 'no', q9ScopeUnderstanding: 'no' } })), 'amanah');
    expect(g.status).toBe('blocked');
    expect(g.reasons.join(' ')).toMatch(/Do not proceed/);
  });
});

describe('Viability Gate (Gates A–D)', () => {
  it('clears when all four gates pass and a candidate is handed off', () => {
    expect(gate(evaluateStageGates('CRD', crd()), 'viability').status).toBe('clear');
  });

  it('clears when a failed candidate is recorded in the Removed Niche Log', () => {
    const g = gate(evaluateStageGates('CRD', crd({ v1: { gateBMarketFit: 'fail' }, v2: { removedNiches: 'Crypto tutoring: Gate B fail' } })), 'viability');
    expect(g.status).toBe('clear');
  });

  it('is incomplete when a gate failed but no removal is recorded', () => {
    const g = gate(evaluateStageGates('CRD', crd({ v1: { gateBMarketFit: 'fail' } })), 'viability');
    expect(g.status).toBe('incomplete');
    expect(g.reasons.join(' ')).toMatch(/Removed Niche Log/);
  });

  it('is incomplete when no cleared candidate is handed off', () => {
    const g = gate(evaluateStageGates('CRD', crd({ v3: {} })), 'viability');
    expect(g.status).toBe('incomplete');
    expect(g.reasons.join(' ')).toMatch(/Cleared Candidate Handoff/);
  });

  it('blocks when the overall determination is Removed', () => {
    expect(gate(evaluateStageGates('CRD', crd({ v1: { overallViability: 'removed' } })), 'viability').status).toBe('blocked');
  });

  it('raises a condition on a conditional gate', () => {
    const g = gate(evaluateStageGates('CRD', crd({ v1: { gateCCompetenceProof: 'conditional', overallViability: 'conditionallyViable' } })), 'viability');
    expect(g.status).toBe('conditions');
    expect(g.condition.resolverRole).toBeNull();
    expect(g.condition.text).toMatch(/Gate C/);
  });
});

describe('Ihsan Baseline Gate (IC-OUT)', () => {
  const out = (d) => [task('OUT-IC', { icOutAsset: 'Cold email v2', icOut1: 'pass', icOut2: 'pass', icOut3: 'pass', icOut4: 'pass', icOut5: 'pass', ...d })];

  it('clears and names the asset it certifies', () => {
    const g = gate(evaluateStageGates('OUT', out()), 'baseline');
    expect(g.status).toBe('clear');
    expect(g.reasons.join(' ')).toMatch(/passed for: Cold email v2/);
  });

  it('still clears on one fail', () => {
    expect(gate(evaluateStageGates('OUT', out({ icOut3: 'fail' })), 'baseline').status).toBe('clear');
  });

  it('is NO-SHIP on two fails', () => {
    const g = gate(evaluateStageGates('OUT', out({ icOut3: 'fail', icOut4: 'fail' })), 'baseline');
    expect(g.status).toBe('blocked');
    expect(g.reasons.join(' ')).toMatch(/NO-SHIP/);
  });

  it('is incomplete without a named asset', () => {
    expect(gate(evaluateStageGates('OUT', out({ icOutAsset: ' ' })), 'baseline').status).toBe('incomplete');
  });
});

describe('Pre-Ship Gate (IC-OFR + IC-DEL)', () => {
  const PASS = Object.fromEntries([1, 2, 3, 4, 5].flatMap((n) => [[`icOfr${n}`, 'pass'], [`icDel${n}`, 'pass']]));
  const del = (d) => [task('DEL-A4', { icOfrAsset: 'Offer doc v3', icDelAsset: 'Welcome pack', ...PASS, ...d })];

  it('clears with both assets named', () => {
    const g = gate(evaluateStageGates('DEL', del()), 'preship');
    expect(g.status).toBe('clear');
    expect(g.reasons.join(' ')).toMatch(/Offer doc v3/);
    expect(g.reasons.join(' ')).toMatch(/Welcome pack/);
  });

  it('clears on one IC-DEL fail and blocks on two', () => {
    expect(gate(evaluateStageGates('DEL', del({ icDel2: 'fail' })), 'preship').status).toBe('clear');
    expect(gate(evaluateStageGates('DEL', del({ icDel2: 'fail', icDel5: 'fail' })), 'preship').status).toBe('blocked');
  });

  it('is incomplete when only the old free-text notes exist', () => {
    const g = gate(evaluateStageGates('DEL', [task('DEL-A4', { icOfrChecks: 'All five pass.', icDelChecks: 'All pass.' })]), 'preship');
    expect(g.status).toBe('incomplete');
  });
});

describe('IC checklists judge every asset on its own', () => {
  const P = ['pass', 'pass', 'pass', 'pass', 'pass'];
  const r = (asset, checks = P) => ({ asset, checks });
  const out = (rows) => [task('OUT-IC', { icOutAssets: rows })];
  const baseline = (rows) => gate(evaluateStageGates('OUT', out(rows)), 'baseline');

  it('clears when every asset passes, naming each one', () => {
    const g = baseline([r('Cold email v2'), r('LinkedIn DM', ['pass', 'fail', 'pass', 'pass', 'pass'])]);
    expect(g.status).toBe('clear');
    expect(g.reasons.join(' ')).toMatch(/passed for: Cold email v2/);
    expect(g.reasons.join(' ')).toMatch(/passed for: LinkedIn DM \(1 fail: IC-OUT-2/);
  });

  it('is NO-SHIP when any one asset fails two checks, naming that asset', () => {
    const g = baseline([r('Cold email v2'), r('Launch post', ['fail', 'pass', 'fail', 'pass', 'pass']), r('LinkedIn DM')]);
    expect(g.status).toBe('blocked');
    expect(g.reasons.join(' ')).toMatch(/IC-OUT NO-SHIP for: Launch post\. Failed IC-OUT-1, IC-OUT-3\. Revise and re-check before use\./);
    expect(g.reasons.join(' ')).toMatch(/passed for: Cold email v2/);
  });

  it('is incomplete when any asset is unanswered, naming the asset and the checks', () => {
    const g = baseline([r('Cold email v2'), r('LinkedIn DM', ['pass', '', 'pass', '', 'pass'])]);
    expect(g.status).toBe('incomplete');
    expect(g.reasons.join(' ')).toMatch(/IC-OUT asset 2 \(LinkedIn DM\): answer IC-OUT-2, IC-OUT-4\./);
  });

  it('is incomplete for an unnamed asset, and for an empty list', () => {
    expect(baseline([r('Cold email v2'), r(' ')]).reasons.join(' ')).toMatch(/IC-OUT asset 2: name the asset checked\./);
    const empty = baseline([]);
    expect(empty.status).toBe('incomplete');
    expect(empty.reasons).toEqual(['IC-OUT: add each asset checked and answer its five checks.']);
  });

  it('a NO-SHIP asset outranks an unanswered one', () => {
    expect(baseline([r('A', ['fail', 'fail', 'pass', 'pass', 'pass']), r('B', ['', '', '', '', ''])]).status).toBe('blocked');
  });

  it('carries a per-asset result for the panels', () => {
    const g = baseline([r('Cold email v2'), r('Launch post', ['fail', 'fail', 'pass', 'pass', 'pass']), r('DM', ['pass', '', 'pass', 'pass', 'pass'])]);
    expect(g.assets).toEqual([
      { list: 'IC-OUT', index: 1, asset: 'Cold email v2', verdict: 'pass', fails: [], unanswered: [] },
      { list: 'IC-OUT', index: 2, asset: 'Launch post', verdict: 'noship', fails: ['IC-OUT-1', 'IC-OUT-2'], unanswered: [] },
      { list: 'IC-OUT', index: 3, asset: 'DM', verdict: 'incomplete', fails: [], unanswered: ['IC-OUT-2'] },
    ]);
  });

  it('an old single-asset answer reads as the first asset, with the same result as before', () => {
    const legacy = [task('OUT-IC', { icOutAsset: 'Cold email v2', icOut1: 'pass', icOut2: 'pass', icOut3: 'fail', icOut4: 'fail', icOut5: 'pass' })];
    const g = gate(evaluateStageGates('OUT', legacy), 'baseline');
    expect(g.status).toBe('blocked');
    expect(g.assets).toEqual([{ list: 'IC-OUT', index: 1, asset: 'Cold email v2', verdict: 'noship', fails: ['IC-OUT-3', 'IC-OUT-4'], unanswered: [] }]);
  });

  it('Pre-Ship judges the IC-OFR and IC-DEL lists separately, every asset on each', () => {
    const del = (ofr, dl) => gate(evaluateStageGates('DEL', [task('DEL-A4', { icOfrAssets: ofr, icDelAssets: dl })]), 'preship');
    // One fail on the offer doc and one on the welcome pack: neither asset fails two.
    const oneEach = del([r('Offer doc v3', ['fail', 'pass', 'pass', 'pass', 'pass'])], [r('Welcome pack', ['fail', 'pass', 'pass', 'pass', 'pass']), r('Kickoff email')]);
    expect(oneEach.status).toBe('clear');
    expect(oneEach.assets.map((a) => `${a.list}:${a.asset}`)).toEqual(['IC-OFR:Offer doc v3', 'IC-DEL:Welcome pack', 'IC-DEL:Kickoff email']);
    const second = del([r('Offer doc v3')], [r('Welcome pack'), r('Kickoff email', ['pass', 'fail', 'pass', 'pass', 'fail'])]);
    expect(second.status).toBe('blocked');
    expect(second.reasons.join(' ')).toMatch(/IC-DEL NO-SHIP for: Kickoff email/);
  });
});

describe('Constraint Gate (FP-01)', () => {
  const opt = (s5, a3) => [task('OPT-S5', s5), task('OPT-A3', a3 || {})];
  const FULL = {
    depletionType: 'typeB', depletionEvidence: 'Two weeks of illness.', commercialAction: 'Send the renewal offer',
    closeWindow: '2026-11-01', accountabilityContact: 'Ahmed', guardrailsConfirmation: 'yes', operatorSignOff: 'Signed, 2026-10-19.',
  };

  it('does not apply when the Stewardship Score is 7.0 or above', () => {
    expect(gate(evaluateStageGates('OPT', opt({ g72Check: 'no' })), 'constraint').status).toBe('clear');
  });

  it('is incomplete until G7.2 is answered', () => {
    expect(gate(evaluateStageGates('OPT', opt({})), 'constraint').status).toBe('incomplete');
  });

  it('blocks TYPE A with the Restoration Mandate, whatever else is filled', () => {
    const g = gate(evaluateStageGates('OPT', opt({ g72Check: 'yes' }, { ...FULL, depletionType: 'typeA' })), 'constraint');
    expect(g.status).toBe('blocked');
    expect(g.reasons.join(' ')).toMatch(/Restoration Mandate/);
  });

  it('is incomplete for TYPE B with a missing guardrail field', () => {
    const g = gate(evaluateStageGates('OPT', opt({ g72Check: 'yes' }, { ...FULL, accountabilityContact: '' })), 'constraint');
    expect(g.status).toBe('incomplete');
    expect(g.reasons.join(' ')).toMatch(/Named Accountability Contact/);
  });

  it('blocks when the guardrails cannot be confirmed', () => {
    expect(gate(evaluateStageGates('OPT', opt({ g72Check: 'yes' }, { ...FULL, guardrailsConfirmation: 'no' })), 'constraint').status).toBe('blocked');
  });

  it('clears a complete TYPE C', () => {
    expect(gate(evaluateStageGates('OPT', opt({ g72Check: 'yes' }, { ...FULL, depletionType: 'typeC' })), 'constraint').status).toBe('clear');
  });
});

describe('evaluateStageGates', () => {
  it('reports no gates for a stage the docs do not gate', () => {
    expect(evaluateStageGates('STR', [])).toEqual({ stageId: 'STR', status: 'none', gates: [] });
  });

  it('takes the worst gate as the stage status', () => {
    expect(evaluateStageGates('CRD', crd({ rubric: { q3UnverifiableClaims: 'yes' }, v1: { gateCCompetenceProof: 'conditional' } })).status).toBe('blocked');
  });

  it('is incomplete when a gate task is missing from the project', () => {
    expect(evaluateStageGates('OUT', []).status).toBe('incomplete');
  });
});

describe('gateMoveRefusal (the store guard)', () => {
  const proj = (bbosStage, bbosGateLog = []) => ({ id: 'p', bbosStage, bbosCycle: 1, bbosGateLog });
  const ack = { basis: 'Go.', acknowledged: ['founderNotified'] };

  it('allows a clear stage when the founder notice is acknowledged', () => {
    expect(gateMoveRefusal(proj('CRD'), crd(), ack)).toBeNull();
  });

  it('refuses a clear Amanah gate without the founder-notified acknowledgement', () => {
    expect(gateMoveRefusal(proj('CRD'), crd(), { basis: 'Go.' })).toMatchObject({ status: 'clear' });
  });

  it('refuses a blocked stage', () => {
    expect(gateMoveRefusal(proj('CRD'), crd({ rubric: { q8FalseInformation: 'yes' } }), ack)?.status).toBe('blocked');
  });

  it('refuses a conditions gate until a conditions entry for that gate is logged and resolved', () => {
    const tasks = crd({ v1: { gateDProvenDemand: 'conditional' } });
    expect(gateMoveRefusal(proj('CRD'), tasks, ack)?.status).toBe('conditions');
    const logged = [
      { id: 'c1', decision: 'conditions', stageId: 'CRD', cycle: 1, gateId: 'viability' },
      { id: 'r1', decision: 'resolved', stageId: 'CRD', cycle: 1, resolvesId: 'c1' },
    ];
    expect(gateMoveRefusal(proj('CRD', logged), tasks, ack)).toBeNull();
  });

  it('does not count a conditions entry from an earlier cycle', () => {
    const tasks = crd({ v1: { gateDProvenDemand: 'conditional' } });
    const old = [
      { id: 'c1', decision: 'conditions', stageId: 'CRD', cycle: 0, gateId: 'viability' },
      { id: 'r1', decision: 'resolved', stageId: 'CRD', cycle: 0, resolvesId: 'c1' },
    ];
    expect(gateMoveRefusal(proj('CRD', old), tasks, ack)).not.toBeNull();
  });

  it('lets an ungated stage move', () => {
    expect(gateMoveRefusal(proj('STR'), [], { basis: 'Go.' })).toBeNull();
  });
});

// A ★ disqualifier answered YES once the project has left CRD: the doc says
// "Reject immediately", so every later stage carries a blocked Amanah gate
// read from CRD-FP02, and only a Halt answers it.
describe('late ★ disqualifier (after CRD)', () => {
  const ack = { basis: 'Go.', acknowledged: ['founderNotified'] };
  const proj = (bbosStage, bbosGateLog = []) => ({ id: 'p', bbosStage, bbosCycle: 1, bbosGateLog });
  const late = (rubric) => crd({ rubric });

  it('adds a blocked Amanah gate to every stage after CRD, keeping the doc wording', () => {
    for (const stageId of ['STR', 'OFR', 'OUT', 'SLS', 'DEL', 'RET', 'OPT']) {
      const res = evaluateStageGates(stageId, late({ q5RegulatoryMisuse: 'yes' }));
      const g = gate(res, 'amanahLate');
      expect(g?.status, stageId).toBe('blocked');
      expect(res.status, stageId).toBe('blocked');
      expect(g.reasons.join(' ')).toMatch(/Q5/);
      expect(g.reasons.join(' ')).toMatch(/automatic disqualifier/);
      expect(g.reasons.join(' ')).toMatch(/Reject immediately/);
      expect(g.cite).toBe(GATE_RULES.amanah.cite);
    }
  });

  it('names every ★ answered YES', () => {
    const g = lateDisqualifier('STR', late({ q3UnverifiableClaims: 'yes', q8FalseInformation: 'yes' }));
    expect(g.questions).toEqual(['Q3', 'Q8']);
    expect(g.reasons.join(' ')).toMatch(/Q3, Q8/);
  });

  it('is absent with no ★ YES, before CRD, and at CRD (where the Amanah gate already blocks)', () => {
    expect(lateDisqualifier('STR', late({}))).toBeNull();
    expect(lateDisqualifier('STR', [])).toBeNull();
    expect(lateDisqualifier('IDY', late({ q5RegulatoryMisuse: 'yes' }))).toBeNull();
    expect(lateDisqualifier('CRD', late({ q5RegulatoryMisuse: 'yes' }))).toBeNull();
    const crdRes = evaluateStageGates('CRD', late({ q5RegulatoryMisuse: 'yes' }));
    expect(crdRes.gates.map((g) => g.id)).toEqual(['amanah', 'viability']);
    expect(evaluateStageGates('STR', late({}))).toEqual({ stageId: 'STR', status: 'none', gates: [] });
  });

  it('is not raised by a NO or an unanswered ★', () => {
    expect(lateDisqualifier('OUT', late({ q5RegulatoryMisuse: 'no', q8FalseInformation: '' }))).toBeNull();
  });

  it('holds the move through gateMoveRefusal, with no way past it', () => {
    const tasks = late({ q8FalseInformation: 'yes' });
    expect(gateMoveRefusal(proj('STR'), tasks, ack)?.status).toBe('blocked');
    const logged = [
      { id: 'c1', decision: 'conditions', stageId: 'STR', cycle: 1, gateId: 'amanahLate' },
      { id: 'r1', decision: 'resolved', stageId: 'STR', cycle: 1, resolvesId: 'c1' },
    ];
    expect(gateMoveRefusal(proj('STR', logged), tasks, { ...ack, acknowledged: ['founderNotified', 'amanahLate'] })?.status).toBe('blocked');
  });

  it('holds a cycle close at OPT even when the Constraint Gate is clear', () => {
    const tasks = [...late({ q3UnverifiableClaims: 'yes' }), task('OPT-S5', { g72Check: 'no' })];
    const res = gateMoveRefusal(proj('OPT'), tasks, ack);
    expect(res?.status).toBe('blocked');
    expect(gate(res, 'constraint').status).toBe('clear');
  });
});

describe('the Amanah rejection reason', () => {
  it('exists for a Halt on a ★ disqualifier, beside the existing reasons', () => {
    const r = BBOS_REJECTION_REASONS.find((x) => x.id === 'amanah_disqualifier');
    expect(r?.label).toMatch(/★/);
    expect(BBOS_REJECTION_REASONS.map((x) => x.id)).toEqual(['riba', 'gharar', 'capability_gap', 'regulatory', 'withdrawal', 'amanah_disqualifier']);
  });
});
