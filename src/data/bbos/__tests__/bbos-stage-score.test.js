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
