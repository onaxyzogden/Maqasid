import { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useArabic } from '../../hooks/useArabic';
import './ReadinessCheck.css';

// ── Display-only paired rows ──
function RCSection({ label, data, color }) {
  if (!data) return null;
  const gov = data.governing || [];
  const nyt = data.notYet || [];
  const rowCount = Math.max(gov.length, nyt.length);
  if (rowCount === 0) return null;

  return (
    <div className="rc-section">
      {data.frame && <p className="rc-frame">{data.frame}</p>}
      <div className="rc-paired">
        {/* Column headers */}
        <div className="rc-paired__headers">
          <div className="rc-col-title rc-at-peace">{data.yesLabel || 'At Peace When'}</div>
          <div className="rc-col-title rc-not-rested">{data.notYetLabel || 'Not Yet Rested In'}</div>
        </div>
        {/* Paired rows */}
        {Array.from({ length: rowCount }).map((_, i) => (
          <div key={i} className="rc-paired__row">
            <div className={`rc-item rc-at-peace${!gov[i] ? ' rc-item--empty' : ''}`}>
              {gov[i] || ''}
            </div>
            <div className={`rc-item rc-not-rested${!nyt[i] ? ' rc-item--empty' : ''}`}>
              {nyt[i] || ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Card pair — two side-by-side cards for one individual row ──
function RCCardPair({ row, yesLabel, nytLabel, selections, onSelect }) {
  const val = selections[row.id];
  const isYes = val === true;
  const isNyt = val === false;

  return (
    <div className="rc-card-row">
      <button
        type="button"
        className={`rc-card rc-card--yes${isYes ? ' rc-card--selected' : ''}${isNyt ? ' rc-card--dimmed' : ''}`}
        onClick={() => onSelect(row.id, isYes ? null : true)}
        aria-pressed={isYes}
      >
        {isYes && (
          <span className="rc-card__check"><Check size={14} /></span>
        )}
        <span className="rc-card__label">{yesLabel}</span>
        <p className="rc-card__text">{row.governing}</p>
      </button>

      <button
        type="button"
        className={`rc-card rc-card--nyt${isNyt ? ' rc-card--selected' : ''}${isYes ? ' rc-card--dimmed' : ''}`}
        onClick={() => onSelect(row.id, isNyt ? null : false)}
        aria-pressed={isNyt}
      >
        {isNyt && (
          <span className="rc-card__check"><Check size={14} /></span>
        )}
        <span className="rc-card__label">{nytLabel}</span>
        <p className="rc-card__text">{row.notYet}</p>
      </button>
    </div>
  );
}

// ── Interactive readiness — card wizard (one row per page) ──
function RCInteractive({ rows, selections, onSelect, frame }) {
  const fmt = useArabic();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dir, setDir] = useState('next'); // 'next' | 'prev' | 'fade' — drives animation direction
  const [exiting, setExiting] = useState(false);
  const advanceTimerRef = useRef(null);

  // Clear any pending auto-advance on unmount so we don't flip state after teardown.
  useEffect(() => () => clearTimeout(advanceTimerRef.current), []);

  // Build label lookup — each row inherits labels from the most recent row that defined them
  const labelledRows = [];
  let activeYesLabel = 'At peace when';
  let activeNytLabel = 'Not yet rested in';
  let activeAttr = null;

  for (const row of rows) {
    if (row.yesLabel) activeYesLabel = row.yesLabel;
    if (row.notYetLabel) activeNytLabel = row.notYetLabel;
    if (row.attr_ar || row.attrTitle) activeAttr = { name: row.attr, ar: row.attr_ar, title: row.attrTitle, frame: row.attrFrame };
    labelledRows.push({
      ...row,
      _yesLabel: activeYesLabel,
      _nytLabel: activeNytLabel,
      _attr: activeAttr,
    });
  }

  const total = labelledRows.length;
  const current = labelledRows[currentIdx];

  const handlePrev = () => {
    if (currentIdx > 0) {
      setDir('prev');
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Wrap onSelect so that picking a card briefly flashes the checkmark, then
  // crossfades to the next row. Deselecting (same card tapped twice) or
  // selecting on the final row does not auto-advance.
  const handleSelect = (rowId, value) => {
    onSelect(rowId, value);
    clearTimeout(advanceTimerRef.current);
    if (value == null) return; // deselect — stay put
    if (currentIdx >= total - 1) return; // final row — let parent render submit
    setExiting(true);
    advanceTimerRef.current = setTimeout(() => {
      setDir('fade');
      setExiting(false);
      setCurrentIdx((idx) => Math.min(idx + 1, total - 1));
    }, 320);
  };

  return (
    <div className="rc-card-wizard">
      <p className="rc-card-wizard__instructions">
        Select the card that reflects where you are right now.
      </p>
      {frame && <p className="rc-card-wizard__frame">{frame}</p>}

      {/* Animated wrapper — key forces remount on row change; dir class drives slide direction */}
      <div key={currentIdx} className={`rc-card-content rc-card-content--${dir}${exiting ? ' rc-card-content--exiting' : ''}`}>
        {/* Attribute header — show when this row starts or continues a named attribute */}
        {current._attr && (
          <>
            <div className="rc-card-group-header">
              <span className="rc-card-attr">{current._attr.name}</span>
              {current._attr.ar && <span className="rc-card-attr-ar">{fmt(current._attr.ar)}</span>}
              {current._attr.title && <span className="rc-card-attr-title">{current._attr.title}</span>}
            </div>
            {current._attr.frame && <p className="rc-card-frame">{current._attr.frame}</p>}
          </>
        )}

        <RCCardPair
          row={current}
          yesLabel={current._yesLabel}
          nytLabel={current._nytLabel}
          selections={selections}
          onSelect={handleSelect}
        />
      </div>

      <p className="rc-card-progress">
        {currentIdx + 1} / {total}
      </p>

      {/* Auto-advance on selection handles forward motion — only Previous is
          surfaced here. The modal's step footer carries the submit action. */}
      {currentIdx > 0 && (
        <div className="rc-card-nav">
          <button
            type="button"
            className="rc-card-nav__btn rc-card-nav__btn--prev"
            onClick={handlePrev}
          >
            Back
          </button>
          <div className="rc-card-nav__spacer" />
        </div>
      )}
    </div>
  );
}

export default function ReadinessCheck({ readiness, reflection, color, interactive, selections, onSelect }) {
  // Interactive mode — used when rows structure exists and interactive is requested
  if (interactive && readiness?.rows && selections && onSelect) {
    return (
      <RCInteractive
        rows={readiness.rows}
        selections={selections}
        onSelect={onSelect}
        frame={readiness.frame}
      />
    );
  }

  // Display-only mode (original behavior)
  if (!readiness && !reflection) return null;

  return (
    <div className="rc-wrap">
      {readiness && <RCSection label="Readiness" data={readiness} color={color} />}
      {reflection && (
        <>
          {readiness && <div style={{ height: 'var(--space-3)' }} />}
          <RCSection label="Reflection" data={reflection} color={color} />
        </>
      )}
    </div>
  );
}
