// BBOS gate actions on the project store: recorded advances, halts and cycle
// closes log to bbosGateLog, and a recorded advance is refused while the stage it leaves
// has open conditions. The store persists through localStorage, so the node
// test environment gets a minimal in-memory stub before the store loads.
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';

let useProjectStore;

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
});

const PID = 'proj_gate_test';
const project = () => useProjectStore.getState().projects.find((p) => p.id === PID);

beforeEach(() => {
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
  const atOpt = () => useProjectStore.setState({
    projects: [{ id: PID, bbosEnabled: true, bbosStage: 'OPT', bbosCycle: 1, bbosGateLog: [] }],
  });

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
