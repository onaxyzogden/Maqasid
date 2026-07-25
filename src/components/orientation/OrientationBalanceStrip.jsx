import { MAQASID_CORE_PILLARS, getPillarLabel } from '../../data/maqasid';
import { TIER_META } from '../../data/orientation-selector';

// 7-bar strip over every Maqasid pillar, in canonical pillar order (stable —
// does not re-sort by rank each render, which would jump around as the
// recommendation changes). When pickerOpen, each bar becomes the click
// target for "Something else" — this component doubles as that picker
// rather than a separate modal.
export default function OrientationBalanceStrip({ rankedPillars, activePillarId, valuesLayer, pickerOpen, onSelectPillar }) {
  const byId = Object.fromEntries(rankedPillars.map((r) => [r.pillar.id, r]));

  return (
    <div
      className={`orient-strip${pickerOpen ? ' orient-strip--picking' : ''}`}
      role={pickerOpen ? 'listbox' : 'list'}
      aria-label="Maqasid balance"
    >
      {MAQASID_CORE_PILLARS.map((pillar) => {
        const entry = byId[pillar.id];
        const pct = entry ? Math.round(entry.ratio * 100) : 0;
        const isActive = pillar.id === activePillarId;
        const label = getPillarLabel(pillar, valuesLayer);
        const className = `orient-strip__item${isActive ? ' orient-strip__item--active' : ''}`;
        const style = { '--strip-color': `var(--pillar-${pillar.id})` };

        const content = (
          <>
            <span className="orient-strip__label">{label}</span>
            <span className="orient-strip__bar-track">
              <span className="orient-strip__bar-fill" style={{ width: `${pct}%` }} />
            </span>
            <span className="orient-strip__tier">{entry ? TIER_META[entry.tier]?.label : ''}</span>
          </>
        );

        if (!pickerOpen) {
          return (
            <div key={pillar.id} role="listitem" className={className} style={style}>
              {content}
            </div>
          );
        }

        return (
          <button
            key={pillar.id}
            type="button"
            role="option"
            aria-selected={isActive}
            className={`${className} orient-strip__item--pickable`}
            style={style}
            onClick={() => onSelectPillar(pillar.id)}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
