// OUT's five score signals are the five IC-OUT checks. With several assets
// listed, a check scores only when every asset passes it.
import { describe, it, expect } from 'vitest';
import { scoreStage } from '../bbos-stage-score';

const P = ['pass', 'pass', 'pass', 'pass', 'pass'];
const outScore = (fd) => scoreStage('OUT', { 'OUT-IC': { bbosFieldData: fd } });

describe('OUT score from the IC-OUT assets', () => {
  it('scores every check when every asset passes it', () => {
    expect(outScore({ icOutAssets: [{ asset: 'A', checks: P }, { asset: 'B', checks: P }] }).pct).toBe(100);
  });

  it('a check one asset fails scores nothing', () => {
    const s = outScore({ icOutAssets: [{ asset: 'A', checks: P }, { asset: 'B', checks: ['pass', 'fail', 'pass', 'pass', 'pass'] }] });
    expect(s.signals.map((x) => x.pts)).toEqual([5, 0, 5, 5, 5]);
  });

  it('still scores an old single-asset answer', () => {
    const s = outScore({ icOutAsset: 'A', icOut1: 'pass', icOut2: 'fail', icOut3: 'pass', icOut4: 'pass', icOut5: 'pass' });
    expect(s.signals.map((x) => x.pts)).toEqual([5, 0, 5, 5, 5]);
  });

  it('scores nothing with no assets', () => {
    expect(outScore({}).pct).toBe(0);
  });
});

// CRD's Gate A–D signals are scored over the candidates still standing: a
// removed candidate (any failed letter) drops out of the score altogether.
const G = ['pass', 'pass', 'pass', 'pass'];
const cand = (name, gates = G) => ({ name, gates, note: '' });
const crdLetters = (fd) => scoreStage('CRD', { 'CRD-V1': { bbosFieldData: fd } }).signals.slice(1).map((x) => x.pts);

describe('CRD score from the Viability candidates', () => {
  it('scores every letter when every candidate standing passes it', () => {
    expect(crdLetters({ viabilityCandidates: [cand('A'), cand('B')] })).toEqual([5, 5, 5, 5]);
  });

  it('leaves a removed candidate out, and scores nothing when none is standing', () => {
    expect(crdLetters({ viabilityCandidates: [cand('A'), cand('B', ['pass', 'fail', 'pass', 'pass'])] })).toEqual([5, 5, 5, 5]);
    expect(crdLetters({ viabilityCandidates: [cand('B', ['pass', 'fail', 'pass', 'pass'])] })).toEqual([0, 0, 0, 0]);
  });

  it('scores a letter 3 when a candidate standing is conditional on it, and 0 when one has not answered it', () => {
    expect(crdLetters({ viabilityCandidates: [cand('A'), cand('B', ['pass', 'pass', 'conditional', 'pass'])] })).toEqual([5, 5, 3, 5]);
    expect(crdLetters({ viabilityCandidates: [cand('A'), cand('B', ['pass', 'pass', 'pass', ''])] })).toEqual([5, 5, 5, 0]);
  });

  it('still scores an old single-candidate answer', () => {
    expect(crdLetters({ gateARegulatory: 'pass', gateBMarketFit: 'pass', gateCCompetenceProof: 'conditional', gateDProvenDemand: 'pass' })).toEqual([5, 5, 3, 5]);
  });

  it('scores nothing with no candidates', () => {
    expect(crdLetters({})).toEqual([0, 0, 0, 0]);
  });
});
