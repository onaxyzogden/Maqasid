import { Check } from 'lucide-react';
import { getPillarLabel } from '../../data/maqasid';
import { TIER_META } from '../../data/orientation-selector';
import OrientationCard from './OrientationCard';

// Mirrors OrientationCard: only Urgent/High earn a visible signal.
const PILL_PRIORITIES = new Set(['urgent', 'high']);

// Desktop (>767px) layout: the focused card large in the stage, all seven
// pillars as a compact rail. Stateless — the selection IS focusPillarId
// (container-owned), falling back to the recommended card, so the container's
// task-complete re-focus works identically to the mobile carousel's
// re-centring. Rail click focuses/swaps into the stage; only the stage card
// (the single <button> from OrientationCard, unmodified) opens the sheet.
export default function OrientationSpread({ cards, valuesLayer, focusPillarId, onSelect, onOpenCard }) {
  const recommendedId = cards.find((c) => c.isRecommended)?.pillar.id ?? null;
  const selectedId = focusPillarId ?? recommendedId ?? cards[0]?.pillar.id;
  const selectedCard = cards.find((c) => c.pillar.id === selectedId) ?? cards[0];

  return (
    <div className="orient-spread">
      <div className="orient-spread__stage">
        <OrientationCard card={selectedCard} valuesLayer={valuesLayer} onOpen={onOpenCard} />
      </div>

      <div className="orient-rail" role="group" aria-label="Maqasid domains">
        {cards.map((card) => {
          const label = getPillarLabel(card.pillar, valuesLayer);
          const current = card.pillar.id === selectedId;
          const priority = card.task?.priority;
          const tierLabel = TIER_META[card.tier]?.label ?? '';
          return (
            <button
              key={card.pillar.id}
              type="button"
              className={
                'orient-rail__item'
                + (current ? ' orient-rail__item--cur' : '')
                + (card.hasEligible ? '' : ' orient-rail__item--clear')
              }
              style={{ '--card-accent': `var(--pillar-${card.pillar.id})` }}
              aria-current={current ? 'true' : undefined}
              aria-label={
                `${label}. ${card.done}/${card.total}${tierLabel ? ` at ${tierLabel}` : ''}.`
                + (card.isRecommended ? ' Weakest — recommended.' : '')
                + (card.hasEligible ? '' : ' Nothing left for today.')
              }
              onClick={() => onSelect(card.pillar.id)}
            >
              <span className="orient-rail__glyph" aria-hidden="true" />
              <span className="orient-rail__name">
                <span className="orient-rail__ar" dir="rtl" lang="ar">{card.pillar.arabicRootAr}</span>
                <span className="orient-rail__en">{label}</span>
              </span>
              <span className="orient-rail__meta">
                {card.hasEligible ? (
                  <>
                    {PILL_PRIORITIES.has(priority) && (
                      <span className={`orient-rail__pri orient-rail__pri--${priority}`} aria-hidden="true" />
                    )}
                    <span className="orient-rail__frac">{card.done}/{card.total}</span>
                  </>
                ) : (
                  <Check size={12} className="orient-rail__check" aria-hidden="true" />
                )}
                {card.isRecommended && <span className="orient-rail__rec" aria-hidden="true" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
