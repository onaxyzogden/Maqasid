// Per-asset IC checklists: every asset on a list carries its own five checks.
// Old single-asset answers (icOutAsset + icOut1..5, and the same for OFR/DEL)
// are read as the first asset until the list is first edited; they are never
// deleted.

import { describe, it, expect } from 'vitest';
import { IC_LISTS, icList, icAssetRows, icRowResult, formatIcAssets, emptyIcRow, icAssetsDone, fieldValueText, icAssetSummary, icAssetLine, initialCollapsed, shiftAfterRemove } from '../bbos-ic-assets';

const OUT = () => icList('IC-OUT');
const row = (asset, checks) => ({ asset, checks });

describe('IC_LISTS', () => {
  it('names the three Factory-doc lists, their task and their field', () => {
    expect(IC_LISTS.map((l) => [l.code, l.task, l.field])).toEqual([
      ['IC-OUT', 'OUT-IC', 'icOutAssets'],
      ['IC-OFR', 'DEL-A4', 'icOfrAssets'],
      ['IC-DEL', 'DEL-A4', 'icDelAssets'],
    ]);
  });
});

describe('icAssetRows', () => {
  it('reads the per-asset list', () => {
    const rows = [row('Cold email v2', ['pass', 'pass', 'pass', 'pass', 'pass']), row('LinkedIn DM', ['fail', '', '', '', ''])];
    expect(icAssetRows({ icOutAssets: rows }, OUT())).toEqual(rows);
  });

  it('reads an old single-asset answer as the first asset', () => {
    const d = { icOutAsset: 'Cold email v2', icOut1: 'pass', icOut2: 'fail', icOut3: 'pass', icOut4: 'pass', icOut5: 'pass' };
    expect(icAssetRows(d, OUT())).toEqual([row('Cold email v2', ['pass', 'fail', 'pass', 'pass', 'pass'])]);
  });

  it('reads a partly answered old checklist as one unfinished asset', () => {
    expect(icAssetRows({ icOut3: 'fail' }, OUT())).toEqual([row('', ['', '', 'fail', '', ''])]);
  });

  it('has no assets when neither the list nor the old fields hold anything', () => {
    expect(icAssetRows({}, OUT())).toEqual([]);
    expect(icAssetRows(null, OUT())).toEqual([]);
    expect(icAssetRows({ icOfrChecks: 'All five pass.' }, icList('IC-OFR'))).toEqual([]);
  });

  it('once the list exists, it wins over the old fields (which stay stored)', () => {
    const d = { icOutAsset: 'Old email', icOut1: 'pass', icOutAssets: [row('New email', ['pass', 'pass', 'pass', 'pass', 'pass'])] };
    expect(icAssetRows(d, OUT()).map((r) => r.asset)).toEqual(['New email']);
  });

  it('pads a short or malformed row to five checks', () => {
    expect(icAssetRows({ icOutAssets: [{ asset: 'X', checks: ['pass'] }, null] }, OUT())).toEqual([
      row('X', ['pass', '', '', '', '']),
      row('', ['', '', '', '', '']),
    ]);
  });
});

describe('icRowResult', () => {
  it('passes with no fails, and with one fail', () => {
    expect(icRowResult(row('A', ['pass', 'pass', 'pass', 'pass', 'pass']), 'IC-OUT')).toMatchObject({ verdict: 'pass', fails: [], unanswered: [] });
    expect(icRowResult(row('A', ['pass', 'fail', 'pass', 'pass', 'pass']), 'IC-OUT')).toMatchObject({ verdict: 'pass', fails: ['IC-OUT-2'] });
  });

  it('is NO-SHIP on two or more fails, even with checks unanswered', () => {
    expect(icRowResult(row('A', ['fail', 'fail', '', '', '']), 'IC-OUT')).toMatchObject({
      verdict: 'noship', fails: ['IC-OUT-1', 'IC-OUT-2'], unanswered: ['IC-OUT-3', 'IC-OUT-4', 'IC-OUT-5'],
    });
  });

  it('is incomplete with an unanswered check or no asset name', () => {
    expect(icRowResult(row('A', ['pass', '', 'pass', 'pass', 'pass']), 'IC-OUT')).toMatchObject({ verdict: 'incomplete', unanswered: ['IC-OUT-2'] });
    expect(icRowResult(row('  ', ['pass', 'pass', 'pass', 'pass', 'pass']), 'IC-OUT')).toMatchObject({ verdict: 'incomplete', named: false });
  });
});

describe('formatIcAssets', () => {
  it('writes one readable line per asset', () => {
    const text = formatIcAssets([row('Cold email v2', ['pass', 'pass', 'pass', 'pass', 'pass']), row('DM', ['fail', 'fail', 'pass', 'pass', 'pass'])], 'IC-OUT');
    expect(text).toBe('Cold email v2: passed\nDM: NO-SHIP (failed IC-OUT-1, IC-OUT-2)');
  });

  it('is empty for no assets', () => {
    expect(formatIcAssets([], 'IC-OUT')).toBe('');
  });
});

describe('emptyIcRow', () => {
  it('is a fresh unnamed asset with five unanswered checks', () => {
    expect(emptyIcRow()).toEqual(row('', ['', '', '', '', '']));
    expect(emptyIcRow().checks).not.toBe(emptyIcRow().checks);
  });
});

describe('icAssetsDone', () => {
  const P = ['pass', 'pass', 'pass', 'pass', 'pass'];
  it('needs at least one asset, every one named with all five checks answered', () => {
    expect(icAssetsDone([], 'IC-OUT')).toBe(false);
    expect(icAssetsDone([row('A', P)], 'IC-OUT')).toBe(true);
    expect(icAssetsDone([row('A', P), row('', P)], 'IC-OUT')).toBe(false);
    expect(icAssetsDone([row('A', P), row('B', ['pass', '', 'pass', 'pass', 'pass'])], 'IC-OUT')).toBe(false);
  });

  it('counts a fully answered NO-SHIP asset as filled in (the gate refuses it, not the form)', () => {
    expect(icAssetsDone([row('A', ['fail', 'fail', 'pass', 'pass', 'pass'])], 'IC-OUT')).toBe(true);
  });
});

describe('fieldValueText', () => {
  const icField = { id: 'icOutAssets', type: 'icAssets', code: 'IC-OUT' };
  it('writes an asset list as one line per asset, never [object Object]', () => {
    const d = { icOutAssets: [row('Cold email v2', ['pass', 'pass', 'pass', 'pass', 'pass'])] };
    expect(fieldValueText(icField, d.icOutAssets, d)).toBe('Cold email v2: passed');
  });

  it('reads an old single-asset answer through', () => {
    const d = { icOutAsset: 'DM', icOut1: 'fail', icOut2: 'fail' };
    expect(fieldValueText(icField, undefined, d)).toBe('DM: NO-SHIP (failed IC-OUT-1, IC-OUT-2)');
  });

  it('trims plain values and is empty for nothing', () => {
    expect(fieldValueText({ id: 'x', type: 'textarea' }, '  hi ', {})).toBe('hi');
    expect(fieldValueText({ id: 'x', type: 'number' }, 4, {})).toBe('4');
    expect(fieldValueText({ id: 'x', type: 'textarea' }, null, {})).toBe('');
    expect(fieldValueText(icField, undefined, {})).toBe('');
  });
});

describe('icAssetSummary', () => {
  const P = ['pass', 'pass', 'pass', 'pass', 'pass'];
  it('gives one row per asset and the list verdict', () => {
    expect(icAssetSummary([row('A', P), row('B', ['fail', 'fail', 'pass', 'pass', 'pass'])], 'IC-OUT')).toEqual({
      overall: 'NO-SHIP',
      rows: [{ label: 'A', value: 'pass' }, { label: 'B (failed IC-OUT-1, IC-OUT-2)', value: 'fail' }],
    });
  });

  it('is UNFINISHED with an asset unanswered, CLEARED when all pass, PENDING when empty', () => {
    expect(icAssetSummary([row('A', P), row('', P)], 'IC-OUT')).toMatchObject({ overall: 'UNFINISHED', rows: [{ value: 'pass' }, { label: 'Asset 2', value: '' }] });
    expect(icAssetSummary([row('A', ['pass', 'fail', 'pass', 'pass', 'pass'])], 'IC-OUT')).toEqual({ overall: 'CLEARED', rows: [{ label: 'A (1 fail: IC-OUT-2)', value: 'pass' }] });
    expect(icAssetSummary([], 'IC-OUT')).toEqual({ overall: 'PENDING', rows: [] });
  });
});

describe('icAssetLine', () => {
  it('names a NO-SHIP asset with the checks it failed', () => {
    expect(icAssetLine({ list: 'IC-OUT', index: 2, asset: 'Cold email', verdict: 'noship', fails: ['IC-OUT-3', 'IC-OUT-4'], unanswered: [] }))
      .toEqual({ list: 'IC-OUT', name: 'Cold email', label: 'NO-SHIP', tone: 'noship', detail: 'Failed IC-OUT-3, IC-OUT-4' });
  });

  it('names an unfinished asset by number when it has no name', () => {
    expect(icAssetLine({ list: 'IC-DEL', index: 1, asset: '', verdict: 'incomplete', fails: [], unanswered: ['IC-DEL-5'] }))
      .toEqual({ list: 'IC-DEL', name: 'Asset 1 (unnamed)', label: 'Unfinished', tone: 'incomplete', detail: 'Unanswered IC-DEL-5' });
  });

  it('shows a passed asset with its one fail', () => {
    expect(icAssetLine({ list: 'IC-OFR', index: 1, asset: 'Offer doc', verdict: 'pass', fails: ['IC-OFR-2'], unanswered: [] }))
      .toEqual({ list: 'IC-OFR', name: 'Offer doc', label: 'Passed', tone: 'pass', detail: '1 fail: IC-OFR-2' });
    expect(icAssetLine({ list: 'IC-OFR', index: 1, asset: 'Offer doc', verdict: 'pass', fails: [], unanswered: [] }).detail).toBe('');
  });
});

describe('initialCollapsed (which cards open folded)', () => {
  const P = ['pass', 'pass', 'pass', 'pass', 'pass'];
  it('folds only assets that passed', () => {
    const rows = [
      row('Landing page', P),
      row('Email 1', ['fail', 'fail', 'pass', 'pass', 'pass']),
      row('Email 2', ['pass', 'pass', '', 'pass', 'pass']),
      row('', P),
      row('Post', ['pass', 'fail', 'pass', 'pass', 'pass']),
    ];
    expect([...initialCollapsed(rows, 'IC-OUT')]).toEqual([0, 4]);
  });
  it('folds nothing on an empty list', () => {
    expect(initialCollapsed([], 'IC-OUT').size).toBe(0);
  });
});

describe('shiftAfterRemove (fold state after Remove)', () => {
  it('drops the removed card and moves later cards up one', () => {
    expect([...shiftAfterRemove(new Set([0, 2, 3]), 2)].sort()).toEqual([0, 2]);
  });
  it('leaves earlier cards where they are', () => {
    expect([...shiftAfterRemove(new Set([0, 1]), 3)].sort()).toEqual([0, 1]);
  });
});
