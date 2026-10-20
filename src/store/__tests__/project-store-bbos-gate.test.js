// BBOS gate actions on the project store: recorded advances, halts and cycle
// closes log to bbosGateLog, and a recorded advance is refused while the stage it leaves
// has open conditions. Every advance from a stage with named gates (and every
// cycle close) is also refused while those gates are blocked, incomplete,
// unacknowledged, or carry unresolved conditions. The store persists through localStorage, so the node
// test environment gets a minimal in-memory stub before the store loads.
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';

let useProjectStore;
let safeSet;

beforeAll(async () => {
  const mem = new Map();
  globalThis.localStorage = {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
    clear: () => mem.clear(),
  };
  globalThis.window = globalThis.window || { dispatchEvent: () => true, addEventListener: () => {} };
  ({ useProjectStore } = await import('../project-store'));
  ({ safeSet } = await import('../../services/storage'));
});

const PID = 'proj_gate_test';
const project = () => useProjectStore.getState().projects.find((p) => p.id === PID);
const task = (bbosTaskType, bbosFieldData) => ({ id: bbosTaskType, bbosTaskType, bbosFieldData });
const seedTasks = (tasks) => safeSet(`tasks_${PID}`, tasks);
const CLEAN_RUBRIC = {
  q1ProofVerifiable: 'yes', q2RegulatoryVerifiable: 'yes', q3UnverifiableClaims: 'no',
  q4RunwaySufficient: 'yes', q5RegulatoryMisuse: 'no', q6GoalAlignment: 'yes',
  q7EnergyAversion: 'no', q8FalseInformation: 'no', q9ScopeUnderstanding: 'yes',
  q10CapacityRealistic: 'yes',
};
const crdTasks = (rubric = {}) => [
  task('CRD-FP02', { ...CLEAN_RUBRIC, ...rubric }),
  task('CRD-V1', { gateARegulatory: 'pass', gateBMarketFit: 'pass', gateCCompetenceProof: 'pass', gateDProvenDemand: 'pass', overallViability: 'viable' }),
  task('CRD-V2', {}),
  task('CRD-V3', { clearedCandidates: 'Halal food co-ops, Ontario' }),
];
const atOpt = (g72Check = 'no', a3 = null) => {
  seedTasks([task('OPT-S5', { g72Check }), ...(a3 ? [task('OPT-A3', a3)] : [])]);
  useProjectStore.setState({
    projects: [{ id: PID, bbosEnabled: true, bbosStage: 'OPT', bbosCycle: 1, bbosGateLog: [] }],
  });
};
const atCrd = () => useProjectStore.setState({
  projects: [{ id: PID, bbosEnabled: true, bbosStage: 'CRD', bbosCycle: 1, bbosGateLog: [] }],
});

beforeEach(() => {
  seedTasks([]);
  useProjectStore.setState({
    projects: [{ id: PID, bbosEnabled: true, bbosStage: 'IDY', bbosCycle: 1, bbosGateLog: [] }],
  });
});

describe('advanceBbosStage with a record', () => {
  it('advances and logs a proceed entry with its basis', () => {
    useProjectStore.getState().advanceBbosStage(PID, 'CRD', { basis: 'Identity criteria met.', stageId: 'IDY', by: null });
    expect(project().bbosStage).toBe('CRD');
    expect(project().bbosGateLog).toHaveLength(1);
    expect(project().bbosGateLog[0]).toMatchObject({ decision: 'proceed', stageId: 'IDY', toStageId: 'CRD', basis: 'Identity criteria met.' });
  });

  it('is refused while the stage has open conditions, and allowed once they are resolved', () => {
    const s = useProjectStore.getState();
    s.logBbosGateDecision(PID, { decision: 'conditions', stageId: 'IDY', basis: 'One gap.', conditions: 'File the certificate.' });
    const condId = project().bbosGateLog[0].id;

    useProjectStore.getState().advanceBbosStage(PID, 'CRD', { basis: 'Go.', stageId: 'IDY' });
    expect(project().bbosStage).toBe('IDY');
    expect(project().bbosGateLog).toHaveLength(1);

    useProjectStore.getState().logBbosGateDecision(PID, { decision: 'resolved', resolvesId: condId, basis: 'Certificate filed.' });
    useProjectStore.getState().advanceBbosStage(PID, 'CRD', { basis: 'Go.', stageId: 'IDY' });
    expect(project().bbosStage).toBe('CRD');
    expect(project().bbosGateLog.map((e) => e.decision)).toEqual(['conditions', 'resolved', 'proceed']);
  });
});

describe('rejectBbosPipeline with a record', () => {
  it('rejects and logs a halt entry with its reason and basis', () => {
    useProjectStore.getState().rejectBbosPipeline(PID, 'riba', 'operator', { basis: 'Financing is interest-bearing.', stageId: 'CRD' });
    expect(project().rejectedAt).toBeTruthy();
    expect(project().bbosGateLog[0]).toMatchObject({ decision: 'halt', reasonId: 'riba', stageId: 'CRD', by: 'operator' });
  });
});

describe('startNewBbosCycle with a record', () => {
  it('logs a cycle entry in the closing cycle, then starts the next from Identity', () => {
    atOpt();
    useProjectStore.getState().startNewBbosCycle(PID, { basis: 'Reckoning complete.', stageId: 'OPT', by: 'operator' });
    expect(project()).toMatchObject({ bbosStage: 'IDY', bbosCycle: 2 });
    expect(project().bbosGateLog).toHaveLength(1);
    expect(project().bbosGateLog[0]).toMatchObject({ decision: 'cycle', stageId: 'OPT', cycle: 1, toStageId: 'IDY', by: 'operator' });
  });

  it('is refused while the final stage has open conditions', () => {
    atOpt();
    useProjectStore.getState().logBbosGateDecision(PID, { decision: 'conditions', stageId: 'OPT', basis: 'Gap.', conditions: 'Settle the accounts.' });
    useProjectStore.getState().startNewBbosCycle(PID, { basis: 'Close.', stageId: 'OPT' });
    expect(project()).toMatchObject({ bbosStage: 'OPT', bbosCycle: 1 });
    expect(project().bbosGateLog.map((e) => e.decision)).toEqual(['conditions']);
  });

  it('without a record only resets, and logs nothing', () => {
    atOpt();
    useProjectStore.getState().startNewBbosCycle(PID);
    expect(project()).toMatchObject({ bbosStage: 'IDY', bbosCycle: 2 });
    expect(project().bbosGateLog).toHaveLength(0);
  });
});

describe('named gates on the store', () => {
  it('refuse an advance from CRD on a ★ disqualifier, with no way past it', () => {
    atCrd();
    seedTasks(crdTasks({ q5RegulatoryMisuse: 'yes' }));
    useProjectStore.getState().advanceBbosStage(PID, 'STR', { basis: 'Go.', stageId: 'CRD', acknowledged: ['founderNotified'] });
    expect(project().bbosStage).toBe('CRD');
    expect(project().bbosGateLog).toHaveLength(0);
  });

  it('refuse a clear CRD advance until the founder-notified acknowledgement is recorded', () => {
    atCrd();
    seedTasks(crdTasks());
    useProjectStore.getState().advanceBbosStage(PID, 'STR', { basis: 'Go.', stageId: 'CRD' });
    expect(project().bbosStage).toBe('CRD');
    useProjectStore.getState().advanceBbosStage(PID, 'STR', { basis: 'Go.', stageId: 'CRD', acknowledged: ['founderNotified'] });
    expect(project().bbosStage).toBe('STR');
    expect(project().bbosGateLog[0]).toMatchObject({ decision: 'proceed', acknowledged: ['founderNotified'] });
  });

  it('refuse an advance from a gated stage when no record is passed', () => {
    atCrd();
    seedTasks(crdTasks());
    useProjectStore.getState().advanceBbosStage(PID, 'STR');
    expect(project().bbosStage).toBe('CRD');
  });

  it('hold an Amanah escalation until the Owner resolves it', () => {
    atCrd();
    seedTasks(crdTasks({ q1ProofVerifiable: 'no', q2RegulatoryVerifiable: 'no', q4RunwaySufficient: 'no' }));
    useProjectStore.getState().logBbosGateDecision(PID, {
      decision: 'conditions', stageId: 'CRD', basis: '3 flags.', conditions: 'Founder decision required.', gateId: 'amanah', resolverRole: 'OW',
    });
    const condId = project().bbosGateLog[0].id;
    useProjectStore.getState().advanceBbosStage(PID, 'STR', { basis: 'Go.', stageId: 'CRD' });
    expect(project().bbosStage).toBe('CRD');
    useProjectStore.getState().logBbosGateDecision(PID, { decision: 'resolved', resolvesId: condId, basis: 'Strategist accepts.', by: 'ST' });
    expect(project().bbosGateLog).toHaveLength(1);
    useProjectStore.getState().logBbosGateDecision(PID, { decision: 'resolved', resolvesId: condId, basis: 'Owner accepts the flags in writing.', by: 'OW' });
    useProjectStore.getState().advanceBbosStage(PID, 'STR', { basis: 'Go.', stageId: 'CRD' });
    expect(project().bbosStage).toBe('STR');
  });

  it('refuse a cycle close on a TYPE A Constraint Gate, with or without a record', () => {
    atOpt('yes', { depletionType: 'typeA' });
    useProjectStore.getState().startNewBbosCycle(PID, { basis: 'Close.', stageId: 'OPT' });
    expect(project()).toMatchObject({ bbosStage: 'OPT', bbosCycle: 1 });
    useProjectStore.getState().startNewBbosCycle(PID);
    expect(project()).toMatchObject({ bbosStage: 'OPT', bbosCycle: 1 });
  });
});
