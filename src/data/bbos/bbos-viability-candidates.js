// Per-candidate Viability Gates A–D (CRD-V1).
// ---------------------------------------------------------------------------
// The Factory doc judges each niche candidate on its own: "Every candidate
// must clear Gates A–D before any scoring. A candidate that fails is removed
// to the Removed Niche Log; only cleared candidates are handed off." The list
// is one `viabilityCandidates` field holding an array of
// { name, gates: [4 × 'pass' | 'fail' | 'conditional' | ''], note }.
//
// A candidate's verdict is derived from its letters every time it is read and
// is never stored, so a candidate that failed a letter cannot be written up as
// cleared anywhere.
//
// Projects answered before this held one candidate's letters in flat fields
// (gateARegulatory, gateBMarketFit, gateCCompetenceProof, gateDProvenDemand).
// Until the list is first edited, those are read as the first, unnamed
// candidate. They are never deleted.

export const VIABILITY_FIELD = 'viabilityCandidates';

export const VIABILITY_LETTERS = [
  { letter: 'A', id: 'gateARegulatory', name: 'Gate A — Regulatory Clearance' },
  { letter: 'B', id: 'gateBMarketFit', name: 'Gate B — Addressable Market Fit' },
  { letter: 'C', id: 'gateCCompetenceProof', name: 'Gate C — Certification / Competence Proof' },
  { letter: 'D', id: 'gateDProvenDemand', name: 'Gate D — Proven Demand' },
];

export const GATE_ANSWERS = ['pass', 'fail', 'conditional'];

const text = (v) => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v));
const answer = (v) => (GATE_ANSWERS.includes(v) ? v : '');
const gateList = (letters) => letters.map((l) => `Gate ${l}`).join(', ');

export const emptyCandidate = () => ({ name: '', gates: ['', '', '', ''], note: '' });

const normalise = (r) => ({
  name: typeof r?.name === 'string' ? r.name : '',
  gates: VIABILITY_LETTERS.map((_, i) => answer(r?.gates?.[i])),
  note: typeof r?.note === 'string' ? r.note : '',
});

/**
 * A list stored as text (the fallback textarea) is neither a list of
 * candidates nor the earlier single answer: it is read as neither, and kept.
 */
export function listStoredAsText(fieldData) {
  const v = fieldData?.[VIABILITY_FIELD];
  return v != null && !Array.isArray(v) && !!text(v);
}

/** The candidates on CRD-V1: the stored list, else the old single answer as candidate 1. */
export function viabilityCandidateRows(fieldData) {
  const d = fieldData || {};
  if (Array.isArray(d[VIABILITY_FIELD])) return d[VIABILITY_FIELD].map(normalise);
  const gates = VIABILITY_LETTERS.map((l) => answer(text(d[l.id])));
  if (gates.every((g) => !g)) return [];
  return [normalise({ gates })];
}

/**
 * One candidate judged by the doc's rule: any failed letter removes it
 * (whatever else is unanswered); otherwise a missing name or letter leaves it
 * unfinished; a conditional letter makes it conditional; else it cleared.
 */
export function candidateResult(row) {
  const named = !!text(row?.name);
  const failed = [];
  const conditional = [];
  const unanswered = [];
  VIABILITY_LETTERS.forEach((l, i) => {
    const v = row?.gates?.[i];
    if (v === 'fail') failed.push(l.letter);
    else if (v === 'conditional') conditional.push(l.letter);
    else if (v !== 'pass') unanswered.push(l.letter);
  });
  const verdict = failed.length ? 'removed'
    : (!named || unanswered.length) ? 'unfinished'
      : conditional.length ? 'conditional' : 'cleared';
  return { name: text(row?.name), named, verdict, failed, conditional, unanswered };
}

/** The overall determination the candidates imply; '' while any is unfinished or none is recorded. */
export function viabilityOverall(rows) {
  const results = (rows || []).map(candidateResult);
  if (!results.length || results.some((r) => r.verdict === 'unfinished')) return '';
  if (results.every((r) => r.verdict === 'removed')) return 'removed';
  return results.some((r) => r.verdict === 'conditional') ? 'conditionallyViable' : 'viable';
}

const unfinishedDetail = (r) => [!r.named && 'unnamed', r.unanswered.length && `unanswered ${gateList(r.unanswered)}`].filter(Boolean).join('; ');

/** One readable line per candidate, for read-only views and AI context. */
export function formatViabilityCandidates(rows) {
  return (rows || []).map((row, i) => {
    const r = candidateResult(row);
    const name = r.name || `Candidate ${i + 1}`;
    if (r.verdict === 'removed') return `${name}: removed (failed ${gateList(r.failed)})`;
    if (r.verdict === 'unfinished') return `${name}: unfinished (${unfinishedDetail(r)})`;
    if (r.verdict === 'conditional') return `${name}: conditional (${gateList(r.conditional)})`;
    return `${name}: cleared Gates A–D`;
  }).join('\n');
}

/**
 * Whether a candidate's name opens an entry of free text (the Removed Niche
 * Log, the Cleared Candidate Handoff). An entry is a line or a semicolon-
 * separated item, read case-folded, whitespace collapsed and without its list
 * marker; the name must be the entry's start, bounded by a non-letter, so
 * "Co-op" does not match "Co-operative" and "Catering" is not taken from
 * "Wedding Catering".
 */
const fold = (s) => (typeof s === 'string' ? s : '').toLowerCase().replace(/\s+/g, ' ').trim();
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function nameInText(name, body) {
  const n = fold(name);
  if (!n || typeof body !== 'string') return false;
  const opens = new RegExp(`^${escapeRe(n)}($|[^\\p{L}\\p{N}])`, 'u');
  return body.split(/[\n;]/).some((entry) => opens.test(fold(entry.replace(/^[\s\-*•]*(\d+[.)])?\s*/, ''))));
}

/**
 * Whether a candidate's name is mentioned anywhere in free text, bounded by
 * non-letters: the loose match for "must not name", so a removed candidate
 * hidden in a comma list, a label or a longer entry is still caught.
 */
export function nameMentioned(name, body) {
  const n = fold(name);
  const t = fold(body);
  if (!n || !t) return false;
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRe(n)}($|[^\\p{L}\\p{N}])`, 'u').test(t);
}

/** The old single answer's four letters, or null when none was answered. */
export function legacyLetters(fieldData) {
  const d = fieldData || {};
  const gates = VIABILITY_LETTERS.map((l) => answer(text(d[l.id])));
  return gates.some(Boolean) ? gates : null;
}

/**
 * A draft list never drops a candidate that failed a letter, and never clears
 * one: every earlier row that failed and is not named in the draft is appended
 * in its earlier order (`kept`), and a draft row of the same name keeps each
 * letter the earlier row failed (`held`) and the earlier row's note, with a
 * different draft note after it. Only the operator's own edit can change a
 * failed letter.
 */
export function keepRemovedCandidates(existing, draftRows) {
  const rows = (Array.isArray(draftRows) ? draftRows : []).map(normalise);
  const kept = [];
  const held = [];
  viabilityCandidateRows(existing).forEach((r) => {
    const { name, failed } = candidateResult(r);
    if (!failed.length) return;
    const sameName = name ? rows.filter((d) => fold(d.name) === fold(name)) : [];
    if (!sameName.length) {
      rows.push(r);
      kept.push({ name, failed });
      return;
    }
    // Every draft row of that name is held, so a duplicate can never be stored as cleared.
    // The earlier note is the operator's own text: it stays, with a different draft note after it.
    const earlierNote = text(r.note);
    sameName.forEach((same) => {
      const draftNote = text(same.note);
      if (earlierNote && draftNote !== earlierNote) same.note = draftNote ? earlierNote + '\n' + draftNote : earlierNote;
      const letters = VIABILITY_LETTERS.filter((l, i) => failed.includes(l.letter) && same.gates[i] !== 'fail').map((l) => l.letter);
      if (!letters.length) return;
      same.gates = VIABILITY_LETTERS.map((l, i) => (letters.includes(l.letter) ? 'fail' : same.gates[i]));
      held.push({ name: same.name, failed: letters });
    });
  });
  return { rows, kept, held };
}

/**
 * Whether the old single answer still shows: false only when a stored empty
 * list hides answered letters. A stored row, even one edited away from those
 * letters, is the operator's own answer and carries it.
 */
export function legacyCarried(fieldData) {
  const d = fieldData || {};
  const list = d[VIABILITY_FIELD];
  return !(legacyLetters(d) && Array.isArray(list) && list.length === 0);
}

/** Where a list stored as text is kept once the editor writes a list in its place. */
export const KEPT_TEXT_FIELD = '_viabilityCandidatesText';

/** The cards the editor opens on: the candidates as read, or one empty candidate. A list stored as text opens empty. */
export function editorRows(fieldData) {
  const rows = listStoredAsText(fieldData) ? [] : viabilityCandidateRows(fieldData);
  return rows.length ? rows : [emptyCandidate()];
}

/**
 * The field writes for an edited list. A list stored as text is moved to
 * KEPT_TEXT_FIELD, after any text kept before and never twice, so no stored
 * text is deleted.
 */
export function candidateWrite(fieldData, rows) {
  const write = { [VIABILITY_FIELD]: rows };
  if (!listStoredAsText(fieldData)) return write;
  const t = text(fieldData[VIABILITY_FIELD]);
  const kept = text(fieldData[KEPT_TEXT_FIELD]);
  if (kept.split('\n\n').includes(t)) return write;
  return { ...write, [KEPT_TEXT_FIELD]: kept ? `${kept}\n\n${t}` : t };
}

/**
 * Whether the editor offers Delete on a candidate. A candidate that failed a letter
 * stays as its own record: deleting it would also drop the gate's check that the
 * handoff (CRD-V3) does not name it.
 */
export function canDeleteCandidate(row) {
  return candidateResult(row).failed.length === 0;
}

/** What the editor asks before a candidate is deleted from the list; a failed letter is named, because its record goes with it. */
export function removeCandidatePrompt(row, index) {
  const r = candidateResult(row);
  const name = r.name || `candidate ${index + 1}`;
  return {
    title: `Delete ${name} from this list?`,
    body: r.failed.length
      ? `${name} failed ${gateList(r.failed)}. Record it in the Removed Niche Log (CRD-V2) before you delete it here; after that, only the log names it.`
      : 'Its name, Gates A–D and note are deleted from this list.',
    confirmLabel: 'Delete candidate',
    danger: true,
  };
}

/** The task panel's Done check: at least one candidate, each named with all four gates answered. */
export function viabilityCandidatesDone(rows) {
  return (rows || []).length > 0 && rows.every((row) => {
    const r = candidateResult(row);
    return r.named && !r.unanswered.length;
  });
}

/** Any task field's value as plain text; the candidate list reads through its old letters. */
export function candidateFieldText(field, value, fieldData) {
  if (field?.type === VIABILITY_FIELD) return formatViabilityCandidates(viabilityCandidateRows(fieldData));
  return value != null && typeof value !== 'object' ? text(value) : '';
}

const LINE = {
  cleared: { label: 'Cleared', tone: 'pass' },
  removed: { label: 'Removed', tone: 'noship' },
  conditional: { label: 'Conditional', tone: 'conditions' },
  unfinished: { label: 'Unfinished', tone: 'incomplete' },
};

/** One candidate from the Viability gate's result, as a line for the Named gates panels. */
export function viabilityCandidateLine(c) {
  const detail = c.verdict === 'removed' ? `Failed ${gateList(c.failed)}`
    : c.verdict === 'conditional' ? `${gateList(c.conditional)} conditional`
      : c.verdict === 'unfinished' ? (c.unanswered.length ? `Unanswered ${gateList(c.unanswered)}` : 'Unnamed')
        : 'A–D pass';
  return { name: c.name || `Candidate ${c.index} (unnamed)`, ...LINE[c.verdict], detail };
}
