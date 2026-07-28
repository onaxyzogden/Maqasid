import { Check, CircleDashed } from 'lucide-react';
import { getPillarLabel, getPillarDescription } from '../../data/maqasid';

// One Maqasid domain card. The whole card is a <button> (keyboard-focusable,
// per handoff a11y note). Its accent is the pillar's own colour via the local
// --card-accent var; the recommended card additionally wears the gold "weakest"
// flag + border + progress bar (--accent).
//
// The face answers two questions, in order: *what is this domain* — the static,
// values-layer-aware pillar description, which never changes with board state
// and is therefore the one line every card can always show — and *what is open
// in it right now* — the current TASK title under NOW. The breadcrumb
// (tier > cluster) and the Urgent/High pill were dropped from the face on
// 2026-07-27: both are per-step detail and both still render in the sheet
// (OrientationSheet -> SequentialStepFlow -> SubtaskStepDetail). The card still
// CARRIES `subtask` for the sheet and the container's handlers; it just no
// longer renders it.
//
// Geometry (min-height 272px, clamped description + title, bar) is deliberate
// so the seven carousel cards align — the track is a flex line, so all seven
// equalise to the tallest. Colours are app design tokens, so the card themes
// light/dark with the rest of MILOS.
export default function OrientationCard({ card, valuesLayer, onOpen, ref }) {
  const { pillar, done, total, seeded, task, taskStats, hasEligible, isRecommended } = card;

  const enLabel = getPillarLabel(pillar, valuesLayer);
  const description = getPillarDescription(pillar, valuesLayer);
  // Stable + unique: exactly one card per pillar is mounted.
  const descId = `orient-card-desc-${pillar.id}`;
  const pct = taskStats.total > 0 ? Math.round((taskStats.done / taskStats.total) * 100) : 0;

  // The description reaches screen readers via aria-describedby, not by
  // concatenation: aria-label REPLACES the button's subtree, and prefixing
  // ~140 chars of static prose to all seven cards would bury the actionable
  // part. Name = what it does; description = supplementary, skippable context.
  const ariaLabel = hasEligible
    ? `${enLabel}. Now: ${task.title}. Tap to open the full task.`
    : seeded
      ? `${enLabel}. Nothing left for today. Tap to open.`
      : `${enLabel}. No steps set up yet. Tap to open.`;

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
      aria-describedby={description ? descId : undefined}
    >
      {isRecommended && <span className="orient-card__flag">Weakest &mdash; recommended</span>}

      <span className="orient-card__top">
        <span className="orient-card__name">
          <span className="orient-card__ar" dir="rtl" lang="ar">{pillar.arabicRootAr}</span>
          <span className="orient-card__en">{enLabel}</span>
        </span>
        {seeded && <span className="orient-card__frac">{done}/{total}</span>}
      </span>

      {/* Outside the three-way branch on purpose: the description identifies the
          domain, so it is the one line that must survive "caught up" and
          "no steps yet" too. */}
      {description && (
        <span className="orient-card__desc" id={descId}>{description}</span>
      )}

      {hasEligible ? (
        <>
          <span className="orient-card__now">
            <span className="orient-card__now-label">Now</span>
            <span className="orient-card__now-text">{task.title}</span>
            <span className="orient-card__bar" aria-hidden="true">
              <span className="orient-card__bar-fill" style={{ width: `${pct}%` }} />
            </span>
          </span>
          <span className="orient-card__cue">Tap to open &rarr;</span>
        </>
      ) : seeded ? (
        <span className="orient-card__clear">
          <Check size={20} className="orient-card__clear-icon" aria-hidden="true" />
          <span className="orient-card__clear-title">Nothing left for today</span>
          <span className="orient-card__clear-sub">Come back after Maghrib for a fresh day.</span>
        </span>
      ) : (
        <span className="orient-card__clear orient-card__clear--empty">
          <CircleDashed size={20} className="orient-card__clear-icon" aria-hidden="true" />
          <span className="orient-card__clear-title">No steps yet</span>
          <span className="orient-card__clear-sub">Open this domain to set up its first steps.</span>
        </span>
      )}
    </button>
  );
}
