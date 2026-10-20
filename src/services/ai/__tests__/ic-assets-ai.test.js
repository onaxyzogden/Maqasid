// AI drafts and upstream context with per-asset IC checklists: the list is an
// array, so it must be parsed as one and written as readable text, never
// "[object Object]" or a JSON string the panel cannot read.
import { describe, it, expect } from 'vitest';
import { parseAiResponse } from '../response-parser';
import { gatherUpstreamContext } from '../context-gatherer';
import { buildPrompt } from '../prompt-builder';
import { getBbosTaskDef } from '../../../data/bbos/bbos-task-definitions';
import { useTaskStore } from '../../../store/task-store';

const P = ['pass', 'pass', 'pass', 'pass', 'pass'];

describe('parseAiResponse with an IC asset list', () => {
  const def = getBbosTaskDef('OUT-IC');

  it('keeps an asset array as an array', () => {
    const { fieldData } = parseAiResponse(JSON.stringify({ icOutAssets: [{ asset: 'Cold email v2', checks: P }] }), def);
    expect(fieldData.icOutAssets).toEqual([{ asset: 'Cold email v2', checks: P }]);
  });

  it('skips a value that is not a list, with a warning', () => {
    const { fieldData, warnings } = parseAiResponse(JSON.stringify({ icOutAssets: 'all pass' }), def);
    expect(fieldData.icOutAssets).toBeUndefined();
    expect(warnings.join(' ')).toMatch(/Assets Checked \(IC-OUT\)/);
  });
});

describe('gatherUpstreamContext with an IC asset list', () => {
  it('writes each asset as a readable line', () => {
    useTaskStore.setState({ tasksByProject: { p1: [
      { id: 't1', bbosTaskType: 'OUT-IC', bbosFieldData: { icOutAssets: [{ asset: 'Cold email v2', checks: P }] } },
    ] } });
    const ctx = gatherUpstreamContext('p1', getBbosTaskDef('SLS-S1') || { id: 'x', stage: 'SLS', fields: [] }, 'stage');
    const all = JSON.stringify(ctx);
    expect(all).toContain('Cold email v2: passed');
    expect(all).not.toContain('[object Object]');
  });
});

describe('buildPrompt output format', () => {
  it('asks for the asset list as an array of { asset, checks }, naming the five checks', () => {
    useTaskStore.setState({ tasksByProject: { p1: [] } });
    const { system, messages } = buildPrompt(getBbosTaskDef('OUT-IC'), 'p1');
    expect(system).toContain('"icOutAssets": [{ "asset": string, "checks": [5 × "pass" | "fail"] }]');
    expect(messages[0].content).toContain('IC-OUT-1: First sentence addresses documented audience concern');
  });
});
