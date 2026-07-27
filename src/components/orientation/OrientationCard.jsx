import { Check } from 'lucide-react';
import { getPillarLabel, getSubmoduleLabel } from '../../data/maqasid';
import { TIER_META } from '../../data/orientation-selector';

// Only Urgent/High earn a visible pill on the card face — medium/low read as
// "no urgency signal" and stay unmarked, matching the prototype which only
// surfaced Urgent/High. Colours come from the shared --pri-* tokens.
const PILL_PRIORITIES = new Set(['urgent', 'high']);

// One Maqasid domain card. The whole card is a <button> (keyboard-focusable,
// per handoff a11y note). Its accent is the pillar's own colour via the local
// --card-accent var; the recommended card additionally wears the gold "weakest"
// flag + border + progress bar (--accent). Geometry (272px height, 2-line
// clamps, bar) mirrors the prototype; colours are app design tokens, so the
// card themes light/dark with the rest of MILOS.
export default function OrientationCard({ card, valuesLayer, onOpen, ref }) {
  const { pillar, tier, done, total, submoduleId, task, subtask, taskStats, hasEligible, isRecommended } = card;

  const enLabel = getPillarLabel(pillar, valuesLayer);
  const tierLabel = TIER_META[tier]?.label ?? '';
  const clusterLabel = getSubmoduleLabel(submoduleId, pillar.id);
  const priority = task?.priority;
  const showPill = hasEligible && PILL_PRIORITIES.has(priority);
  const pct = taskStats.total > 0 ? Math.round((taskStats.done / taskStats.total) * 100) : 0;

  const ariaLabel = hasEligible
    ? `${enLabel}. Now: ${subtask.title}. Tap to open the full task.`
    : `${enLabel}. Nothing left for today. Tap to open.`;

  return (
    <button
      type="button"
      ref={ref}
      data-pillar={pillar.id}
      className={
        'orient-card'
        + (isRecommended ? ' orient-card--rec' : '')
        + (hasEligible ? '' : ' orient-card--clear')
      }
      style={{ '--card-accent': `var(--pillar-${pillar.id})` }}
      onClick={() => onOpen(pillar.id)}
      aria-label={ariaLabel}
    >
      {isRecommended && <span className="orient-card__flag">Weakest &mdash; recommended</span>}

      <span className="orient-card__top">
        <span className="orient-card__name">
          <span className="orient-card__ar" dir="rtl" lang="ar">{pillar.arabicRootAr}</span>
          <span className="orient-card__en">{enLabel}</span>
        </span>
        <span className="orient-card__frac">{done}/{total}</span>
      </span>

      {hasEligible ? (
        <>
          <span className="orient-card__crumb">
            {tierLabel}
            {clusterLabel && <> <b>&rsaquo;</b> {clusterLabel}</>}
          </span>
          <span className="orient-card__task">{task.title}</span>
          {showPill && (
            <span className={`orient-card__pri orient-card__pri--${priority}`}>{priority}</span>
          )}
          <span className="orient-card__now">
            <span className="orient-card__now-label">Now</span>
            <span className="orient-card__now-text">{subtask.title}</span>
            <span className="orient-card__bar" aria-hidden="true">
              <span className="orient-card__bar-fill" style={{ width: `${pct}%` }} />
            </span>
          </span>
          <span className="orient-card__cue">Tap to open &rarr;</span>
        </>
      ) : (
        <span className="orient-card__clear">
          <Check size={20} className="orient-card__clear-icon" aria-hidden="true" />
          <span className="orient-card__clear-title">Nothing left for today</span>
          <span className="orient-card__clear-sub">Come back after Maghrib for a fresh day.</span>
        </span>
      )}
    </button>
  );
}
