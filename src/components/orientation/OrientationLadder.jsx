import { ChevronRight } from 'lucide-react';
import { getPillarLabel, getSubmoduleLabel } from '../../data/maqasid';
import { TIER_META } from '../../data/orientation-selector';

// 5-rung breadcrumb: Pillar → Tier → Submodule → Task → Now.
// The 5th rung is a terminal pulse marker, not a repeat of the subtask
// title — that's shown prominently in Orientation's "now" card below it.
export default function OrientationLadder({ recommendation, valuesLayer }) {
  const { pillar, tier, submoduleId, task } = recommendation;

  const rungs = [
    getPillarLabel(pillar, valuesLayer),
    TIER_META[tier]?.label || tier,
    getSubmoduleLabel(submoduleId, pillar.id),
    task.title,
  ];

  return (
    <nav
      className="orient-ladder"
      aria-label="Orientation breadcrumb"
      style={{ '--ladder-color': `var(--pillar-${pillar.id})` }}
    >
      {rungs.map((label, i) => (
        <span className="orient-ladder__rung" key={`${i}-${label}`}>
          {i > 0 && <ChevronRight size={14} className="orient-ladder__chevron" aria-hidden="true" />}
          <span className="orient-ladder__text">{label}</span>
        </span>
      ))}
      <span className="orient-ladder__rung orient-ladder__rung--now">
        <ChevronRight size={14} className="orient-ladder__chevron" aria-hidden="true" />
        <span className="orient-ladder__now-badge">
          <span className="orient-ladder__now-dot" aria-hidden="true" />
          Now
        </span>
      </span>
    </nav>
  );
}
