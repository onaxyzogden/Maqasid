import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { icList, icAssetRows, icRowResult, emptyIcRow, initialCollapsed, shiftAfterRemove } from '@data/bbos/bbos-ic-assets';
import { useConfirm } from '../../store/confirm-store';

// One IC checklist (IC-OUT, IC-OFR or IC-DEL): every asset checked, each with
// its own five pass/fail checks. The doc judges each asset on its own, so each
// card shows its own verdict. An old single-asset answer shows as the first
// card; the first edit writes the list and leaves the old fields stored.

const VERDICT = {
  pass: { label: 'Passed', tone: 'pass' },
  noship: { label: 'NO-SHIP', tone: 'noship' },
  incomplete: { label: 'Unfinished', tone: 'incomplete' },
};

export default function BbosIcAssetsField({ field, fieldData, onChange, readOnly }) {
  const confirm = useConfirm();
  const list = icList(field.code);
  const stored = list ? icAssetRows(fieldData, list) : [];
  const rows = stored.length ? stored : [emptyIcRow()];
  // Passed cards open folded so the ones still needing work stand out. Only
  // the panel's opening state folds: a card that passes while being answered
  // stays open until the operator folds it. The panel fills its fields after
  // its first render, so the opening state is taken when the rows first arrive.
  const [collapsed, setCollapsed] = useState(() => initialCollapsed(stored, field.code));
  const [seeded, setSeeded] = useState(stored.length > 0);
  if (!seeded && stored.length) {
    setSeeded(true);
    setCollapsed(initialCollapsed(stored, field.code));
  }
  const toggle = (i) => setCollapsed((prev) => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  // After Add or Remove, focus moves to a name input (or a folded card's
  // toggle) so keyboard users keep their place.
  const inputs = useRef([]);
  const toggles = useRef([]);
  const focusNext = useRef(null);
  useEffect(() => {
    if (focusNext.current == null) return;
    const k = focusNext.current;
    focusNext.current = null;
    // Next task: after Remove, the confirm dialog closes after this render
    // and would otherwise take focus with it.
    setTimeout(() => {
      const input = inputs.current[k];
      (input && input.offsetParent !== null ? input : toggles.current[k])?.focus();
    }, 0);
  });

  const write = (next) => onChange(next);
  const setAsset = (i, asset) => write(rows.map((r, k) => (k === i ? { ...r, asset } : r)));
  const setCheck = (i, n, value) => write(rows.map((r, k) => (
    k === i ? { ...r, checks: r.checks.map((c, m) => (m === n ? value : c)) } : r
  )));
  const add = () => {
    focusNext.current = rows.length;
    write([...rows, emptyIcRow()]);
  };
  const remove = async (i) => {
    const name = rows[i].asset.trim() || `asset ${i + 1}`;
    const ok = await confirm({
      title: `Remove ${name} from ${field.code}?`,
      body: 'Its five answers are removed from this checklist.',
      confirmLabel: 'Remove asset',
      danger: true,
    });
    if (ok) {
      focusNext.current = Math.max(0, i - 1);
      setCollapsed((prev) => shiftAfterRemove(prev, i));
      write(rows.filter((_, k) => k !== i));
    }
  };

  if (readOnly && !stored.length) return <p className="btp-ic-help">No asset checked yet.</p>;

  return (
    <div className="btp-ic">
      {field.help && <p className="btp-ic-help">{field.help}</p>}
      {rows.map((row, i) => {
        const r = icRowResult(row, field.code);
        const v = VERDICT[r.verdict];
        const nameId = i === 0 ? `btp-field-${field.id}` : `btp-field-${field.id}-${i}`;
        const bodyId = `${nameId}-body`;
        // Only a passed card can be folded: a NO-SHIP or unfinished one always shows.
        const folded = r.verdict === 'pass' && collapsed.has(i);
        const assetWord = field.assetLabel || 'Asset';
        return (
          <section key={i} className={`btp-ic-card btp-ic-card--${v.tone}`} aria-label={`${field.code} asset ${i + 1}`}>
            <div className="btp-ic-card-head">
              {folded ? (
                <span className="btp-ic-name-label">
                  {assetWord} {i + 1}: <span className="btp-ic-folded-name">{row.asset.trim()}</span>
                </span>
              ) : (
                <label className="btp-ic-name-label" htmlFor={nameId}>
                  {assetWord} {i + 1} name
                </label>
              )}
              <span className={`btp-ic-verdict btp-ic-verdict--${v.tone}`} role="status">
                {v.label}{r.verdict === 'pass' && r.fails.length ? ' · 1 fail' : ''}
              </span>
              {r.verdict === 'pass' && (
                <button
                  type="button"
                  className="btp-ic-toggle"
                  onClick={() => toggle(i)}
                  aria-expanded={!folded}
                  aria-controls={bodyId}
                  ref={(el) => { toggles.current[i] = el; }}
                >
                  {folded
                    ? <><ChevronDown size={14} aria-hidden="true" /> Show checks</>
                    : <><ChevronUp size={14} aria-hidden="true" /> Hide checks</>}
                </button>
              )}
              {!readOnly && rows.length > 1 && (
                <button
                  type="button"
                  className="btp-ic-remove"
                  onClick={() => remove(i)}
                  aria-label={`Remove ${row.asset.trim() || `asset ${i + 1}`}`}
                >
                  <Trash2 size={14} aria-hidden="true" /> Remove
                </button>
              )}
            </div>
            <div className="btp-ic-body" id={bodyId} hidden={folded}>
              <input
                id={nameId}
                type="text"
                className="btp-field-input btp-ic-name"
                placeholder={field.placeholder || ''}
                value={row.asset}
                onChange={(e) => setAsset(i, e.target.value)}
                readOnly={readOnly}
                ref={(el) => { inputs.current[i] = el; }}
              />
              {r.verdict === 'incomplete' && (
                <p className="btp-ic-missing">
                  {!r.named && 'Name this asset. '}{r.unanswered.length ? `Answer ${r.unanswered.join(', ')}.` : ''}
                </p>
              )}
              {r.verdict === 'noship' && (
                <p className="btp-ic-note">
                  Failed {r.fails.join(', ')}. Any asset failing 2 or more is NO-SHIP: revise it and re-check before use.
                </p>
              )}
              {(field.checks || []).map((check, n) => (
                <fieldset key={n} className="btp-ic-check">
                  <legend className="btp-ic-check-label">{check.label}</legend>
                  <div className="btp-ic-options">
                    {check.options.map((opt) => (
                      <label key={opt.value} className={`btp-ic-option btp-ic-option--${opt.value}${row.checks[n] === opt.value ? ' is-on' : ''}`}>
                        <input
                          type="radio"
                          name={`${field.id}-${i}-${n}`}
                          value={opt.value}
                          checked={row.checks[n] === opt.value}
                          onChange={() => setCheck(i, n, opt.value)}
                          disabled={readOnly}
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>
        );
      })}
      {!readOnly && (
        <button type="button" className="btp-ic-add" onClick={add}>
          <Plus size={14} aria-hidden="true" /> Add another asset
        </button>
      )}
    </div>
  );
}
