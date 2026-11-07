import { useEffect, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  VIABILITY_FIELD, VIABILITY_LETTERS, KEPT_TEXT_FIELD, emptyCandidate, editorRows, candidateResult,
  removeCandidatePrompt, canDeleteCandidate, listStoredAsText, legacyLetters,
} from '@data/bbos/bbos-viability-candidates';
import { useConfirm } from '../../store/confirm-store';

// CRD-V1: every niche candidate with its own name and Gates A–D. The verdict
// on each card is read from its letters and never stored, so a candidate that
// failed a letter always shows as removed. An old single answer opens as an
// unnamed candidate 1 for naming; the first edit writes the list and leaves
// the old letters stored. A list stored as text is shown and kept, never parsed.

const VERDICT = {
  cleared: { label: 'Cleared', tone: 'pass' },
  removed: { label: 'Removed', tone: 'noship' },
  conditional: { label: 'Conditional', tone: 'conditional' },
  unfinished: { label: 'Unfinished', tone: 'incomplete' },
};

const gateList = (letters) => letters.map((l) => `Gate ${l}`).join(', ');

export default function BbosViabilityCandidatesField({ field, fieldData, onChange, readOnly, lockedReason }) {
  const confirm = useConfirm();
  const d = fieldData || {};
  const rows = editorRows(d);
  const asText = listStoredAsText(d);
  const locked = readOnly || !!lockedReason;
  const fromLegacy = !Array.isArray(d[VIABILITY_FIELD]) && !asText && !!legacyLetters(d);
  const keptText = [d[KEPT_TEXT_FIELD], asText ? d[VIABILITY_FIELD] : null]
    .filter((t) => typeof t === 'string' && t.trim())
    .join('\n\n');

  // After Add or Remove, focus moves to a name input so keyboard users keep their place.
  const inputs = useRef([]);
  const focusNext = useRef(null);
  useEffect(() => {
    if (focusNext.current == null) return;
    inputs.current[focusNext.current]?.focus();
    focusNext.current = null;
  });

  // One live region for the list: a verdict that changes is announced with its candidate's name.
  const [announce, setAnnounce] = useState('');
  const lastVerdicts = useRef(null);
  const verdictKey = rows.map((r) => candidateResult(r).verdict).join('|');
  useEffect(() => {
    const now = rows.map((r) => candidateResult(r));
    const before = lastVerdicts.current;
    lastVerdicts.current = now.map((r) => r.verdict);
    if (!before) return;
    const i = now.findIndex((r, k) => before[k] !== undefined && before[k] !== r.verdict);
    if (i < 0) return;
    const r = now[i];
    const label = (VERDICT[r.verdict] || VERDICT.unfinished).label;
    const why = r.verdict === 'removed' ? ` Failed ${gateList(r.failed)}.` : '';
    setAnnounce(`Candidate ${i + 1}${r.name ? `, ${r.name}` : ''}: ${label}.${why}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verdictKey]);

  const write = (next) => onChange(next);
  const setRow = (i, patch) => write(rows.map((r, k) => (k === i ? { ...r, ...patch } : r)));
  const setGate = (i, n, value) => setRow(i, { gates: rows[i].gates.map((g, m) => (m === n ? value : g)) });
  // Add and Delete reset the verdict comparison (rows shift places) and announce themselves.
  const add = () => {
    focusNext.current = rows.length;
    lastVerdicts.current = null;
    setAnnounce(`Candidate ${rows.length + 1} added.`);
    write([...rows, emptyCandidate()]);
  };
  const remove = async (i) => {
    if (await confirm(removeCandidatePrompt(rows[i], i))) {
      const shown = candidateResult(rows[i]).name || `candidate ${i + 1}`;
      const left = rows.length - 1;
      focusNext.current = Math.max(0, i - 1);
      lastVerdicts.current = null;
      setAnnounce(`Deleted ${shown}. ${left} ${left === 1 ? 'candidate' : 'candidates'} left.`);
      write(rows.filter((_, k) => k !== i));
    }
  };

  const hasStored = Array.isArray(d[VIABILITY_FIELD]) ? d[VIABILITY_FIELD].length > 0 : fromLegacy;
  if (readOnly && !hasStored && !keptText) return <p className="btp-ic-help">No candidate recorded yet.</p>;

  return (
    <div className="btp-ic">
      {field.help && <p className="btp-ic-help">{field.help}</p>}
      <p className="sr-only" aria-live="polite">{announce}</p>
      <p className={lockedReason && !readOnly ? 'btp-ic-help btp-vc-locked' : 'sr-only'} role="status">
        {!readOnly ? lockedReason : ''}
      </p>
      {keptText && (
        <div className="btp-vc-kept">
          <p className="btp-vc-kept-title">Earlier text, kept as written</p>
          <p className="btp-vc-kept-body">{keptText}</p>
          {asText && !locked && (
            <p className="btp-ic-help">
              This list was stored as text, so it is not read as candidates. Enter each candidate below with its name and Gates A–D; the text stays stored.
            </p>
          )}
        </div>
      )}
      {rows.map((row, i) => {
        const r = candidateResult(row);
        const v = VERDICT[r.verdict] || VERDICT.unfinished;
        const nameId = i === 0 ? `btp-field-${field.id}` : `btp-field-${field.id}-${i}`;
        const noteId = `btp-field-${field.id}-note-${i}`;
        const shown = r.name || `candidate ${i + 1}`;
        return (
          <section key={i} className={`btp-ic-card btp-ic-card--${v.tone}`} aria-label={r.name ? `Candidate ${i + 1}: ${r.name}` : `Candidate ${i + 1}, unnamed`}>
            <div className="btp-ic-card-head">
              <label className="btp-ic-name-label" htmlFor={nameId}>
                {field.candidateLabel || 'Candidate'} {i + 1}
              </label>
              <span className={`btp-ic-verdict btp-ic-verdict--${v.tone}`}>{v.label}</span>
              {!locked && rows.length > 1 && canDeleteCandidate(row) && (
                <button
                  type="button"
                  className="btp-ic-remove"
                  onClick={() => remove(i)}
                  aria-label={`Delete from list: ${shown}`}
                >
                  <Trash2 size={14} aria-hidden="true" /> Delete from list
                </button>
              )}
            </div>
            {fromLegacy && i === 0 && (
              <p className="btp-ic-help">
                These are the earlier single answers. Name the candidate they were run on; the earlier answers stay stored.
              </p>
            )}
            <input
              id={nameId}
              type="text"
              className="btp-field-input"
              placeholder={field.placeholder || ''}
              value={row.name}
              onChange={(e) => setRow(i, { name: e.target.value })}
              readOnly={locked}
              autoComplete="off"
              ref={(el) => { inputs.current[i] = el; }}
            />
            {r.verdict === 'unfinished' && (
              <p className="btp-ic-missing">
                {[!r.named && 'Name this candidate.', r.unanswered.length > 0 && `Answer ${gateList(r.unanswered)}.`]
                  .filter(Boolean).join(' ')}
              </p>
            )}
            {r.verdict === 'removed' && (
              <p className="btp-ic-note">
                Failed {gateList(r.failed)}. A candidate that fails any gate is removed: record it in the Removed Niche Log (CRD-V2), and do not hand it off. It stays on this list as its record, so it cannot be deleted here.
              </p>
            )}
            {r.verdict === 'conditional' && (
              <p className="btp-ic-missing">
                {gateList(r.conditional)} conditional: complete the required action before the candidate is scored.
              </p>
            )}
            {VIABILITY_LETTERS.map((letter, n) => {
              const gate = field.gates?.[n];
              return (
                <fieldset key={letter.letter} className="btp-ic-check">
                  <legend className="btp-ic-check-label">{gate?.label || letter.name}</legend>
                  <div className="btp-ic-options">
                    {(gate?.options || []).map((opt) => {
                      const on = row.gates[n] === opt.value;
                      return (
                        <label key={opt.value} className={`btp-ic-option btp-ic-option--${opt.value}${on ? ' is-on' : ''}`}>
                          <input
                            type="radio"
                            name={`${field.id}-${i}-${n}`}
                            value={opt.value}
                            checked={on}
                            onChange={() => setGate(i, n, opt.value)}
                            disabled={locked}
                          />
                          <span>{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}
            <label className="btp-ic-check-label" htmlFor={noteId}>Note (optional)</label>
            <textarea
              id={noteId}
              className="btp-field-textarea"
              rows={2}
              value={row.note}
              onChange={(e) => setRow(i, { note: e.target.value })}
              readOnly={locked}
            />
          </section>
        );
      })}
      {!locked && (
        <button type="button" className="btp-ic-add" onClick={add}>
          <Plus size={14} aria-hidden="true" /> Add another candidate
        </button>
      )}
    </div>
  );
}
