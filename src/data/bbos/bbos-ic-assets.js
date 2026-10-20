// Per-asset Ihsan Baseline checklists (IC-OUT, IC-OFR, IC-DEL).
// ---------------------------------------------------------------------------
// The Factory docs judge each asset on its own: "Any asset failing 2 or more
// checks is NO-SHIP". Each list is one `icAssets` field holding an array of
// { asset, checks: [5 × 'pass' | 'fail' | ''] }.
//
// Projects answered before this held one asset per list in flat fields
// (icOutAsset + icOut1..5, and the same for OFR/DEL). Until the list is first
// edited, those are read as its first asset. They are never deleted.

export const IC_LISTS = [
  { code: 'IC-OUT', task: 'OUT-IC', field: 'icOutAssets', legacyAsset: 'icOutAsset', prefix: 'icOut' },
  { code: 'IC-OFR', task: 'DEL-A4', field: 'icOfrAssets', legacyAsset: 'icOfrAsset', prefix: 'icOfr' },
  { code: 'IC-DEL', task: 'DEL-A4', field: 'icDelAssets', legacyAsset: 'icDelAsset', prefix: 'icDel' },
];

const N = [1, 2, 3, 4, 5];
const text = (v) => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v));

export const icList = (code) => IC_LISTS.find((l) => l.code === code);

export const emptyIcRow = () => ({ asset: '', checks: ['', '', '', '', ''] });

const normalise = (r) => ({
  asset: typeof r?.asset === 'string' ? r.asset : '',
  checks: N.map((n) => (r?.checks?.[n - 1] === 'pass' || r?.checks?.[n - 1] === 'fail' ? r.checks[n - 1] : '')),
});

/** The assets on one list: the stored list, else the old single-asset answer. */
export function icAssetRows(fieldData, list) {
  const d = fieldData || {};
  if (Array.isArray(d[list.field])) return d[list.field].map(normalise);
  const legacy = { asset: text(d[list.legacyAsset]), checks: N.map((n) => text(d[`${list.prefix}${n}`])) };
  if (!legacy.asset && legacy.checks.every((c) => !c)) return [];
  return [normalise(legacy)];
}

/**
 * One asset judged by the doc's rule: 2+ fails is NO-SHIP (whatever else is
 * unanswered); otherwise a missing name or check leaves it incomplete.
 */
export function icRowResult(row, code) {
  const named = !!text(row?.asset);
  const fails = [];
  const unanswered = [];
  N.forEach((n) => {
    const v = row?.checks?.[n - 1];
    if (v === 'fail') fails.push(`${code}-${n}`);
    else if (v !== 'pass') unanswered.push(`${code}-${n}`);
  });
  const verdict = fails.length >= 2 ? 'noship' : (!named || unanswered.length) ? 'incomplete' : 'pass';
  return { asset: text(row?.asset), named, verdict, fails, unanswered };
}

/** One readable line per asset, for read-only views and AI context. */
export function formatIcAssets(rows, code) {
  return (rows || []).map((row, i) => {
    const r = icRowResult(row, code);
    const name = r.asset || `Asset ${i + 1}`;
    if (r.verdict === 'noship') return `${name}: NO-SHIP (failed ${r.fails.join(', ')})`;
    if (r.verdict === 'incomplete') return `${name}: unfinished${r.unanswered.length ? ` (unanswered ${r.unanswered.join(', ')})` : ''}`;
    return `${name}: passed${r.fails.length ? ` (1 fail: ${r.fails[0]})` : ''}`;
  }).join('\n');
}

/** The task panel's Done check: at least one asset, each named with all five checks answered. */
export function icAssetsDone(rows, code) {
  return (rows || []).length > 0 && rows.every((row) => {
    const r = icRowResult(row, code);
    return r.named && !r.unanswered.length;
  });
}

/** Any task field's value as plain text; an asset list reads through its old fields. */
export function fieldValueText(field, value, fieldData) {
  if (field?.type === 'icAssets') {
    const list = icList(field.code);
    return list ? formatIcAssets(icAssetRows(fieldData, list), field.code) : '';
  }
  return value != null && typeof value !== 'object' ? text(value) : '';
}

/** One row per asset for a read-only checks card, and the list's verdict. */
export function icAssetSummary(rows, code) {
  const results = (rows || []).map((row) => icRowResult(row, code));
  const out = results.map((r, i) => {
    const name = r.asset || `Asset ${i + 1}`;
    if (r.verdict === 'noship') return { label: `${name} (failed ${r.fails.join(', ')})`, value: 'fail' };
    if (r.verdict === 'incomplete') return { label: name, value: '' };
    return { label: r.fails.length ? `${name} (1 fail: ${r.fails[0]})` : name, value: 'pass' };
  });
  const overall = !results.length ? 'PENDING'
    : results.some((r) => r.verdict === 'noship') ? 'NO-SHIP'
      : results.some((r) => r.verdict === 'incomplete') ? 'UNFINISHED' : 'CLEARED';
  return { overall, rows: out };
}

const LINE_LABEL = { pass: 'Passed', noship: 'NO-SHIP', incomplete: 'Unfinished' };

/** One asset from a named gate's result, as a line for the Named gates panels. */
export function icAssetLine(a) {
  const detail = a.verdict === 'noship' ? `Failed ${a.fails.join(', ')}`
    : a.verdict === 'incomplete' ? (a.unanswered.length ? `Unanswered ${a.unanswered.join(', ')}` : '')
      : a.fails.length ? `1 fail: ${a.fails[0]}` : '';
  return {
    list: a.list,
    name: a.asset || `Asset ${a.index} (unnamed)`,
    label: LINE_LABEL[a.verdict],
    tone: a.verdict,
    detail,
  };
}
