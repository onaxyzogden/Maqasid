// Per-candidate Viability (CRD-V1): every niche candidate carries its own name
// and Gates A–D. A verdict is derived from the letters and never stored, so a
// candidate that failed a letter can never read as cleared. Old single-answer
// records (gateARegulatory..gateDProvenDemand) are read as the first candidate
// until the list is first edited; they are never deleted.

import { describe, it, expect } from 'vitest';
import {
  VIABILITY_LETTERS, VIABILITY_FIELD, emptyCandidate, viabilityCandidateRows, candidateResult,
  viabilityOverall, formatViabilityCandidates, viabilityCandidatesDone, candidateFieldText, viabilityCandidateLine,
  nameInText, nameMentioned, legacyCarried, keepRemovedCandidates,
  editorRows, candidateWrite, removeCandidatePrompt, canDeleteCandidate, KEPT_TEXT_FIELD,
} from '../bbos-viability-candidates';

const P = ['pass', 'pass', 'pass', 'pass'];
const row = (name, gates, note = '') => ({ name, gates, note });

describe('VIABILITY_LETTERS', () => {
  it('names Gates A–D in the doc order with their stored field ids', () => {
    expect(VIABILITY_LETTERS.map((l) => [l.letter, l.id])).toEqual([
      ['A', 'gateARegulatory'], ['B', 'gateBMarketFit'], ['C', 'gateCCompetenceProof'], ['D', 'gateDProvenDemand'],
    ]);
    expect(VIABILITY_LETTERS[0].name).toBe('Gate A — Regulatory Clearance');
    expect(VIABILITY_FIELD).toBe('viabilityCandidates');
  });
});

describe('viabilityCandidateRows', () => {
  it('reads the stored candidate list', () => {
    const rows = [row('Halal food co-ops', P), row('Crypto tutoring', ['pass', 'fail', '', ''])];
    expect(viabilityCandidateRows({ viabilityCandidates: rows })).toEqual(rows);
  });

  it('normalises a malformed row and ignores any stored verdict', () => {
    const rows = viabilityCandidateRows({ viabilityCandidates: [{ name: 7, gates: ['pass', 'yes'], verdict: 'cleared' }] });
    expect(rows).toEqual([row('', ['pass', '', '', ''])]);
    expect(rows[0]).not.toHaveProperty('verdict');
  });

  it('reads an old single answer as the first, unnamed candidate', () => {
    const d = { gateARegulatory: 'pass', gateBMarketFit: 'fail', gateCCompetenceProof: 'pass', gateDProvenDemand: 'conditional', gateNotes: 'x' };
    expect(viabilityCandidateRows(d)).toEqual([row('', ['pass', 'fail', 'pass', 'conditional'])]);
  });

  it('has no candidates when neither the list nor the old letters hold anything', () => {
    expect(viabilityCandidateRows({})).toEqual([]);
    expect(viabilityCandidateRows(null)).toEqual([]);
    expect(viabilityCandidateRows({ gateNotes: 'notes only', overallViability: 'viable' })).toEqual([]);
  });

  it('starts a new candidate blank', () => {
    expect(emptyCandidate()).toEqual(row('', ['', '', '', '']));
  });
});

describe('candidateResult', () => {
  it('clears a named candidate that passes all four gates', () => {
    expect(candidateResult(row('Halal food co-ops', P))).toMatchObject({ name: 'Halal food co-ops', named: true, verdict: 'cleared', failed: [], conditional: [], unanswered: [] });
  });

  it('removes a candidate on any failed letter, whatever else is unanswered', () => {
    expect(candidateResult(row('Crypto tutoring', ['', 'fail', '', '']))).toMatchObject({ verdict: 'removed', failed: ['B'] });
    expect(candidateResult(row('', ['fail', 'fail', 'pass', 'pass']))).toMatchObject({ verdict: 'removed', failed: ['A', 'B'] });
  });

  it('is unfinished while a letter is unanswered or the candidate is unnamed', () => {
    expect(candidateResult(row('Niche', ['pass', 'pass', 'pass', '']))).toMatchObject({ verdict: 'unfinished', unanswered: ['D'] });
    expect(candidateResult(row('', P))).toMatchObject({ verdict: 'unfinished', named: false, unanswered: [] });
  });

  it('is conditional when every letter is answered and one is conditional', () => {
    expect(candidateResult(row('Niche', ['pass', 'pass', 'conditional', 'pass']))).toMatchObject({ verdict: 'conditional', conditional: ['C'] });
  });

  it('never reads a verdict from the row', () => {
    expect(candidateResult({ ...row('Niche', ['pass', 'fail', 'pass', 'pass']), verdict: 'cleared' }).verdict).toBe('removed');
  });
});

describe('viabilityOverall', () => {
  it('is removed when every candidate failed a letter', () => {
    expect(viabilityOverall([row('A', ['fail', 'pass', 'pass', 'pass']), row('B', ['pass', 'fail', 'pass', 'pass'])])).toBe('removed');
  });

  it('is conditionally viable when a surviving candidate is conditional', () => {
    expect(viabilityOverall([row('A', P), row('B', ['pass', 'pass', 'conditional', 'pass'])])).toBe('conditionallyViable');
  });

  it('is viable when a candidate cleared and none is conditional', () => {
    expect(viabilityOverall([row('A', P), row('B', ['fail', 'pass', 'pass', 'pass'])])).toBe('viable');
  });

  it('is undetermined with no candidates or an unfinished one', () => {
    expect(viabilityOverall([])).toBe('');
    expect(viabilityOverall([row('A', ['pass', 'pass', 'pass', ''])])).toBe('');
  });
});

describe('formatViabilityCandidates', () => {
  it('writes one readable line per candidate', () => {
    const lines = formatViabilityCandidates([
      row('Halal food co-ops', P),
      row('Crypto tutoring', ['pass', 'fail', 'pass', 'pass']),
      row('Zakat software', ['pass', 'pass', 'conditional', 'pass']),
      row('', ['pass', 'pass', 'pass', '']),
    ]).split('\n');
    expect(lines).toEqual([
      'Halal food co-ops: cleared Gates A–D',
      'Crypto tutoring: removed (failed Gate B)',
      'Zakat software: conditional (Gate C)',
      'Candidate 4: unfinished (unnamed; unanswered Gate D)',
    ]);
  });
});

describe('viabilityCandidatesDone', () => {
  it('needs at least one candidate, each named with all four gates answered', () => {
    expect(viabilityCandidatesDone([])).toBe(false);
    expect(viabilityCandidatesDone([row('A', P), row('', P)])).toBe(false);
    expect(viabilityCandidatesDone([row('A', ['pass', 'pass', 'pass', ''])])).toBe(false);
    expect(viabilityCandidatesDone([row('A', P), row('B', ['fail', 'pass', 'pass', 'pass'])])).toBe(true);
  });
});

describe('candidateFieldText', () => {
  const field = { id: 'viabilityCandidates', type: 'viabilityCandidates' };

  it('reads a candidate list through its old letters', () => {
    const d = { gateARegulatory: 'pass', gateBMarketFit: 'pass', gateCCompetenceProof: 'pass', gateDProvenDemand: 'pass' };
    expect(candidateFieldText(field, undefined, d)).toBe('Candidate 1: unfinished (unnamed)');
  });

  it('leaves other fields as plain text', () => {
    expect(candidateFieldText({ id: 'gateNotes', type: 'textarea' }, ' notes ', {})).toBe('notes');
    expect(candidateFieldText({ id: 'x', type: 'text' }, { a: 1 }, {})).toBe('');
  });
});

describe('viabilityCandidateLine', () => {
  const line = (c) => viabilityCandidateLine({ index: 2, letters: P, failed: [], conditional: [], unanswered: [], ...c });

  it('labels each verdict for the Named gates panels and names an unnamed candidate by its index', () => {
    expect(line({ name: 'Halal food co-ops', verdict: 'cleared' })).toEqual({ name: 'Halal food co-ops', label: 'Cleared', tone: 'pass', detail: 'A–D pass' });
    expect(line({ name: 'Crypto tutoring', verdict: 'removed', failed: ['B'] })).toEqual({ name: 'Crypto tutoring', label: 'Removed', tone: 'noship', detail: 'Failed Gate B' });
    expect(line({ name: 'Zakat software', verdict: 'conditional', conditional: ['C'] })).toEqual({ name: 'Zakat software', label: 'Conditional', tone: 'conditions', detail: 'Gate C conditional' });
    expect(line({ name: '', verdict: 'unfinished', unanswered: ['D'] })).toEqual({ name: 'Candidate 2 (unnamed)', label: 'Unfinished', tone: 'incomplete', detail: 'Unanswered Gate D' });
  });
});

describe('nameInText', () => {
  it('finds a candidate name at the start of an entry (a line or a semicolon-separated item), whatever the case, spacing or list marker', () => {
    expect(nameInText('Halal food co-ops, Ontario', 'Cleared:\n- halal  food co-ops, ontario (lead)')).toBe(true);
    expect(nameInText('Halal food co-ops, Ontario', '1. Halal food co-ops, Ontario; Zakat software')).toBe(true);
    expect(nameInText('Zakat software', '1. Halal food co-ops, Ontario; Zakat software')).toBe(true);
    expect(nameInText('Co-op', 'Co-operative tutoring')).toBe(false);
    expect(nameInText('Crypto tutoring', '')).toBe(false);
    expect(nameInText('', 'anything')).toBe(false);
    expect(nameInText('Crypto tutoring', null)).toBe(false);
  });

  it('does not take a name found inside a longer entry', () => {
    expect(nameInText('Catering', 'Wedding Catering — failed Gate B')).toBe(false);
    expect(nameInText('Catering', 'Removed: Catering')).toBe(false);
    expect(nameInText('Catering', '- Wedding Catering\n- Catering (failed Gate A)')).toBe(true);
  });
});

describe('nameMentioned', () => {
  it('finds a candidate name anywhere in free text, bounded by non-letters, whatever the case, spacing or list shape', () => {
    expect(nameMentioned('Crypto tutoring', 'Halal food co-ops, Ontario, crypto  tutoring')).toBe(true);
    expect(nameMentioned('Crypto tutoring', 'Cleared: Crypto tutoring')).toBe(true);
    expect(nameMentioned('Crypto tutoring', 'Candidate 2 — Crypto tutoring')).toBe(true);
    expect(nameMentioned('Co-op', 'Co-operative tutoring')).toBe(false);
    expect(nameMentioned('Crypto tutoring', '')).toBe(false);
    expect(nameMentioned('', 'anything')).toBe(false);
    expect(nameMentioned('Crypto tutoring', null)).toBe(false);
  });
});

describe('keepRemovedCandidates', () => {
  const F = ['pass', 'fail', 'pass', 'pass'];

  it('appends each earlier row that failed a letter and is not named in the draft, in its earlier order', () => {
    const existing = { viabilityCandidates: [row('A', P), row('B', F, 'riba'), row('C', ['fail', 'pass', 'pass', 'pass'])] };
    const { rows, kept } = keepRemovedCandidates(existing, [row('A', P, 'new')]);
    expect(rows).toEqual([row('A', P, 'new'), row('B', F, 'riba'), row('C', ['fail', 'pass', 'pass', 'pass'])]);
    expect(kept).toEqual([{ name: 'B', failed: ['B'] }, { name: 'C', failed: ['A'] }]);
  });

  it('drops nothing when the draft names the failed row (case and spacing folded), and keeps nothing that cleared or is unfinished', () => {
    const existing = { viabilityCandidates: [row('Crypto tutoring', F), row('Cleared one', P), row('', F)] };
    const { rows, kept } = keepRemovedCandidates(existing, [row('crypto  Tutoring', ['pass', 'fail', 'fail', 'pass'])]);
    expect(rows).toEqual([row('crypto  Tutoring', ['pass', 'fail', 'fail', 'pass']), row('', F)]);
    expect(kept).toEqual([{ name: '', failed: ['B'] }]);
  });

  it('never lets a draft clear a letter an earlier row of the same name failed, and reports which letters it held', () => {
    const existing = { viabilityCandidates: [row('Crypto tutoring', F), row('Cleared one', P)] };
    const { rows, kept, held } = keepRemovedCandidates(existing, [row('crypto tutoring', P, 'now fine'), row('Cleared one', ['pass', 'fail', 'pass', 'pass'])]);
    expect(rows).toEqual([row('crypto tutoring', F, 'now fine'), row('Cleared one', ['pass', 'fail', 'pass', 'pass'])]);
    expect(kept).toEqual([]);
    expect(held).toEqual([{ name: 'crypto tutoring', failed: ['B'] }]);
    expect(keepRemovedCandidates(existing, [row('Crypto tutoring', ['pass', 'fail', 'fail', 'pass'])]).held).toEqual([]);
  });

  it('keeps the earlier note of a held row, with the draft note after it', () => {
    const existing = { viabilityCandidates: [row('Crypto tutoring', F, 'fails the riba rule')] };
    const { rows } = keepRemovedCandidates(existing, [row('crypto tutoring', P, 'AI note'), row('Crypto tutoring', P)]);
    expect(rows[0].note).toBe('fails the riba rule\nAI note');
    expect(rows[1].note).toBe('fails the riba rule');
    const same = keepRemovedCandidates(existing, [row('Crypto tutoring', P, 'fails the riba rule')]);
    expect(same.rows[0].note).toBe('fails the riba rule');
  });

  it('holds every draft row that shares the failed name, not only the first', () => {
    const existing = { viabilityCandidates: [row('Crypto tutoring', F)] };
    const { rows, held } = keepRemovedCandidates(existing, [row('Crypto tutoring', F), row('crypto tutoring', P, 'again')]);
    expect(rows).toEqual([row('Crypto tutoring', F), row('crypto tutoring', F, 'again')]);
    expect(held).toEqual([{ name: 'crypto tutoring', failed: ['B'] }]);
  });

  it('keeps an old single answer that failed a letter as an unnamed row', () => {
    const legacy = { gateARegulatory: 'pass', gateBMarketFit: 'fail', gateCCompetenceProof: 'pass', gateDProvenDemand: 'pass' };
    expect(keepRemovedCandidates(legacy, [row('A', P)]).rows).toEqual([row('A', P), row('', F)]);
    expect(keepRemovedCandidates({}, [row('A', P)]).rows).toEqual([row('A', P)]);
    expect(keepRemovedCandidates(null, [row('A', P)]).kept).toEqual([]);
  });
});

describe('legacyCarried', () => {
  const legacy = { gateARegulatory: 'pass', gateBMarketFit: 'fail', gateCCompetenceProof: 'pass', gateDProvenDemand: 'pass' };

  it('is true when no list is stored, no old answer exists, or the stored list has a row, even an edited one', () => {
    expect(legacyCarried(legacy)).toBe(true);
    expect(legacyCarried({ viabilityCandidates: [] })).toBe(true);
    expect(legacyCarried({ ...legacy, viabilityCandidates: [row('A', P), row('B', ['pass', 'fail', 'pass', 'pass'])] })).toBe(true);
    expect(legacyCarried({ ...legacy, viabilityCandidates: [row('A', P)] })).toBe(true);
  });

  it('is false only when a stored empty list hides an answered old answer', () => {
    expect(legacyCarried({ ...legacy, viabilityCandidates: [] })).toBe(false);
  });
});

describe('the candidate editor', () => {
  const F = ['pass', 'fail', 'pass', 'pass'];
  const legacy = { gateARegulatory: 'pass', gateBMarketFit: 'fail', gateCCompetenceProof: '', gateDProvenDemand: '' };

  it('opens on the stored list, the old single answer as an unnamed candidate 1, or one empty candidate', () => {
    expect(editorRows({ viabilityCandidates: [row('Halal food co-ops', P)] })).toEqual([row('Halal food co-ops', P)]);
    expect(editorRows(legacy)).toEqual([row('', ['pass', 'fail', '', ''])]);
    expect(editorRows({})).toEqual([emptyCandidate()]);
  });

  it('opens on one empty candidate when the list is stored as text, not on the old single answer', () => {
    expect(editorRows({ ...legacy, viabilityCandidates: 'Crypto tutoring: failed Gate B' })).toEqual([emptyCandidate()]);
  });

  it('writes the list, and keeps a list stored as text under its own key instead of deleting it', () => {
    const rows = [row('Crypto tutoring', F)];
    expect(KEPT_TEXT_FIELD).toBe('_viabilityCandidatesText');
    expect(candidateWrite({ viabilityCandidates: [] }, rows)).toEqual({ viabilityCandidates: rows });
    expect(candidateWrite({ viabilityCandidates: 'Crypto tutoring: failed Gate B' }, rows))
      .toEqual({ viabilityCandidates: rows, _viabilityCandidatesText: 'Crypto tutoring: failed Gate B' });
  });

  it('never writes over text already kept, and adds the new text after it', () => {
    const rows = [row('Crypto tutoring', F)];
    expect(candidateWrite({ viabilityCandidates: 'second', _viabilityCandidatesText: 'first' }, rows))
      .toEqual({ viabilityCandidates: rows, _viabilityCandidatesText: 'first\n\nsecond' });
    // Discard puts the text back; the next edit must not keep it twice.
    expect(candidateWrite({ viabilityCandidates: 'first', _viabilityCandidatesText: 'first' }, rows)).toEqual({ viabilityCandidates: rows });
  });

  it('says plainly that removing a candidate that failed a letter deletes its removal record', () => {
    const prompt = removeCandidatePrompt(row('Crypto tutoring', F), 1);
    expect(prompt.title).toBe('Delete Crypto tutoring from this list?');
    expect(prompt.body).toBe('Crypto tutoring failed Gate B. Record it in the Removed Niche Log (CRD-V2) before you delete it here; after that, only the log names it.');
    expect(prompt.confirmLabel).toBe('Delete candidate');
    expect(prompt.danger).toBe(true);
  });

  it('never offers Delete on a candidate that failed a letter, so its record and the V3 check stay', () => {
    expect(canDeleteCandidate(row('Crypto tutoring', ['pass', 'fail', '', '']))).toBe(false);
    expect(canDeleteCandidate(row('Halal meal prep', ['pass', 'pass', 'conditional', 'pass']))).toBe(true);
    expect(canDeleteCandidate(row('', ['', '', '', '']))).toBe(true);
  });

  it('names an unnamed candidate by its place, and says what goes for one that failed nothing', () => {
    const prompt = removeCandidatePrompt(row('', ['pass', '', '', '']), 2);
    expect(prompt.title).toBe('Delete candidate 3 from this list?');
    expect(prompt.body).toBe('Its name, Gates A–D and note are deleted from this list.');
  });
});
