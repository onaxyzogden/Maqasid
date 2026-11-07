// AI drafts and upstream context with per-candidate Viability gates: the list
// is an array, so it must be parsed as one (a stored verdict dropped) and
// written as readable text, never "[object Object]" or a JSON string.
import { describe, it, expect } from 'vitest';
import { parseAiResponse, draftBefore, rejectedValues } from '../response-parser';
import { gatherUpstreamContext } from '../context-gatherer';
import { buildPrompt } from '../prompt-builder';
import { getBbosTaskDef } from '../../../data/bbos/bbos-task-definitions';
import { useTaskStore } from '../../../store/task-store';

const P = ['pass', 'pass', 'pass', 'pass'];

describe('parseAiResponse with a Viability candidate list', () => {
  const def = getBbosTaskDef('CRD-V1');

  it('keeps a candidate array as an array and drops any verdict the AI wrote', () => {
    const { fieldData } = parseAiResponse(JSON.stringify({ viabilityCandidates: [{ name: 'Halal food co-ops', gates: P, note: 'x', verdict: 'cleared' }] }), def);
    expect(fieldData.viabilityCandidates).toEqual([{ name: 'Halal food co-ops', gates: P, note: 'x' }]);
  });

  it('keeps every earlier candidate that failed a letter when the AI list leaves it out, and says so', () => {
    const existing = { viabilityCandidates: [{ name: 'Halal food co-ops', gates: P, note: '' }, { name: 'Crypto tutoring', gates: ['pass', 'fail', 'pass', 'pass'], note: 'riba' }] };
    const { fieldData, warnings } = parseAiResponse(JSON.stringify({ viabilityCandidates: [{ name: 'Halal food co-ops', gates: P, note: 'x' }] }), def, existing);
    expect(fieldData.viabilityCandidates).toEqual([{ name: 'Halal food co-ops', gates: P, note: 'x' }, { name: 'Crypto tutoring', gates: ['pass', 'fail', 'pass', 'pass'], note: 'riba' }]);
    expect(warnings.join(' ')).toMatch(/Crypto tutoring \(failed Gate B\) kept from the earlier list/);
  });

  it('lets the AI restate a failed candidate by name, and keeps an old single failed answer as an unnamed row', () => {
    const existing = { viabilityCandidates: [{ name: 'Crypto tutoring', gates: ['pass', 'fail', 'pass', 'pass'], note: '' }] };
    const { fieldData, warnings } = parseAiResponse(JSON.stringify({ viabilityCandidates: [{ name: 'crypto tutoring', gates: ['pass', 'fail', 'fail', 'pass'], note: '' }] }), def, existing);
    expect(fieldData.viabilityCandidates).toHaveLength(1);
    expect(warnings.join(' ')).not.toMatch(/kept from the earlier list/);
    const legacy = { gateARegulatory: 'pass', gateBMarketFit: 'fail', gateCCompetenceProof: 'pass', gateDProvenDemand: 'pass' };
    const { fieldData: fd2, warnings: w2 } = parseAiResponse(JSON.stringify({ viabilityCandidates: [{ name: 'Halal food co-ops', gates: P, note: '' }] }), def, legacy);
    expect(fd2.viabilityCandidates).toEqual([{ name: 'Halal food co-ops', gates: P, note: '' }, { name: '', gates: ['pass', 'fail', 'pass', 'pass'], note: '' }]);
    expect(w2.join(' ')).toMatch(/Candidate 2 \(unnamed\) \(failed Gate B\) kept from the earlier list/);
  });

  it('never lets a draft clear a letter an earlier candidate failed, and says so', () => {
    const existing = { viabilityCandidates: [{ name: 'Crypto tutoring', gates: ['pass', 'fail', 'pass', 'pass'], note: '' }] };
    const { fieldData, warnings } = parseAiResponse(JSON.stringify({ viabilityCandidates: [{ name: 'Crypto tutoring', gates: P, note: 'reassessed' }] }), def, existing);
    expect(fieldData.viabilityCandidates).toEqual([{ name: 'Crypto tutoring', gates: ['pass', 'fail', 'pass', 'pass'], note: 'reassessed' }]);
    expect(warnings.join(' ')).toMatch(/Crypto tutoring: Gate B stays failed — a draft cannot clear a failed letter/);
  });

  it('never writes a draft list over a list stored as text, and says so', () => {
    const draft = JSON.stringify({ viabilityCandidates: [{ name: 'Halal food co-ops', gates: P, note: '' }] });
    const { fieldData, warnings } = parseAiResponse(draft, def, { viabilityCandidates: 'Crypto tutoring: failed Gate B' });
    expect(fieldData).not.toHaveProperty('viabilityCandidates');
    expect(warnings.join(' ')).toMatch(/stored as text, so the AI list is not written over it/);
    expect(parseAiResponse(draft, def, { viabilityCandidates: '' }).fieldData.viabilityCandidates).toEqual([{ name: 'Halal food co-ops', gates: P, note: '' }]);
  });

  it('skips a value that is not a list, with a warning', () => {
    const { fieldData, warnings } = parseAiResponse(JSON.stringify({ viabilityCandidates: 'all pass' }), def);
    expect(fieldData.viabilityCandidates).toBeUndefined();
    expect(warnings.join(' ')).toMatch(/Candidates \(Gates A–D\)/);
  });

  it('skips an empty list, keeping whatever is stored, with a warning', () => {
    const { fieldData, warnings } = parseAiResponse(JSON.stringify({ viabilityCandidates: [] }), def);
    expect(fieldData.viabilityCandidates).toBeUndefined();
    expect(warnings.join(' ')).toMatch(/AI returned no candidates — the existing list is kept/);
  });
});

describe('rejecting an AI draft', () => {
  const def = getBbosTaskDef('CRD-V1');
  const list = [{ name: 'Crypto tutoring', gates: ['pass', 'fail', 'pass', 'pass'], note: 'riba' }];
  const blank = Object.fromEntries(def.fields.map((f) => [f.id, '']));

  it('keeps the value of each task field the draft will replace, and nothing else', () => {
    expect(draftBefore(def, { viabilityCandidates: list, overallViability: 'removed', _aiDraftStatus: 'generating', gateBMarketFit: 'fail' }))
      .toEqual({ viabilityCandidates: list, overallViability: 'removed' });
    expect(draftBefore(def, null)).toEqual({});
  });

  it('restores each field to its value before the draft, and empties only fields that had none', () => {
    const values = rejectedValues(def, { _aiDraftBefore: { viabilityCandidates: list, overallViability: 'removed' }, viabilityCandidates: [{ name: 'X', gates: P, note: '' }], overallViability: 'viable' });
    expect(values).toEqual({ ...blank, viabilityCandidates: list, overallViability: 'removed' });
  });

  it('empties every task field for a draft made before the earlier values were kept', () => {
    expect(rejectedValues(def, { viabilityCandidates: list })).toEqual(blank);
  });
});

describe('gatherUpstreamContext with a Viability candidate list', () => {
  it('writes each candidate as a readable line', () => {
    useTaskStore.setState({ tasksByProject: { p1: [
      { id: 't1', bbosTaskType: 'CRD-V1', bbosFieldData: { viabilityCandidates: [{ name: 'Halal food co-ops', gates: P, note: '' }, { name: 'Crypto tutoring', gates: ['pass', 'fail', 'pass', 'pass'], note: '' }] } },
    ] } });
    const ctx = gatherUpstreamContext('p1', getBbosTaskDef('CRD-V3'), 'stage');
    const all = JSON.stringify(ctx);
    expect(all).toContain('Halal food co-ops: cleared Gates A–D');
    expect(all).toContain('Crypto tutoring: removed (failed Gate B)');
    expect(all).not.toContain('[object Object]');
  });
});

describe('buildPrompt output format', () => {
  it('asks for the candidate list as an array of { name, gates, note }, naming the four gates', () => {
    useTaskStore.setState({ tasksByProject: { p1: [] } });
    const { system, messages } = buildPrompt(getBbosTaskDef('CRD-V1'), 'p1');
    expect(system).toContain('"viabilityCandidates": [{ "name": string, "gates": [4 × "pass" | "fail" | "conditional"], "note": string }]');
    expect(messages[0].content).toContain('Gate A — Regulatory Clearance');
    expect(messages[0].content).toContain('Gate D — Proven Demand');
  });
});
