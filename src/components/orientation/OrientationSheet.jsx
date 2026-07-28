import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { getPillarLabel, getSubmoduleLabel } from '../../data/maqasid';
import { TIER_META } from '../../data/orientation-selector';
import SequentialStepFlow from '../shared/SequentialStepFlow';
// Base slide-up chrome (.pp-slideup__*). OrientationSheet.css layers the
// orientation-specific content on top and must load after it — its panel
// overrides win on equal specificity by source order.
import '../work/ProjectSlideUp.css';
import './OrientationSheet.css';

// Bottom sheet for one Maqasid domain's current step. Built on the shared
// popup chrome (ProjectSlideUp.css): portal to <body>, backdrop, focus trap +
// Escape via useFocusTrap, role=dialog / aria-modal. Purely presentational — the
// container decides which card is shown and what each action does; `card` is the
// engine's card shape (see buildOrientationCarousel).
//
// Sequential locking + browse-ahead preview now live in the shared
// <SequentialStepFlow> (also the Prophetic Path node popup's engine): task
// stepper, subtask chips, step detail, and the 3-action footer — including the
// revert control (an already-satisfied step keeps the "Completed" label but
// stays enabled; clicking calls onRevert). This sheet only supplies the
// portal/chrome, the pillar header, and the empty state.
export default function OrientationSheet({
  card,
  valuesLayer,
  onMarkDone,
  onNotApplicable,
  onNotToday,
  onRevert,
  onClose,
}) {
  // Hook runs unconditionally (before the null guard); active only when a card
  // is present so it never traps focus on an empty portal.
  const panelRef = useFocusTrap(!!card, onClose);

  if (!card) return null;
  const { pillar, tier, submoduleId, subtask, hasEligible, board } = card;

  const enLabel = getPillarLabel(pillar, valuesLayer);
  const tierLabel = TIER_META[tier]?.label ?? '';
  const clusterLabel = getSubmoduleLabel(submoduleId, pillar.id);
  const hasStep = hasEligible && !!subtask;

  return createPortal(
    <div className="pp-slideup__root os-sheet">
      <button type="button" className="pp-slideup__backdrop" aria-label="Close" onClick={onClose} />
      <div
        ref={panelRef}
        className="pp-slideup__panel os-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${enLabel} — current step`}
      >
        <div className="pp-slideup__header">
          <span
            className="pp-slideup__swatch os-sheet__swatch"
            style={{ background: `var(--pillar-${pillar.id})` }}
            aria-hidden="true"
          />
          <div className="pp-slideup__title-wrap">
            <span className="os-sheet__ar" dir="rtl" lang="ar">{pillar.arabicRootAr}</span>
            <h2 className="pp-slideup__title os-sheet__en">{enLabel}</h2>
          </div>
          <button type="button" className="pp-slideup__close" onClick={onClose} aria-label="Close">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {hasStep ? (
          <SequentialStepFlow
            items={board?.tasks ?? []}
            currentTaskIndex={card.currentTaskIndex ?? -1}
            currentSubtaskIndex={card.currentSubtaskIndex ?? -1}
            resetKey={card.project?.id ?? ''}
            getCrumbParts={() => [tierLabel, clusterLabel]}
            onMarkDone={onMarkDone}
            onNotApplicable={onNotApplicable}
            onNotToday={onNotToday}
            onRevert={onRevert}
          />
        ) : (
          <>
            <div className="pp-slideup__body os-sheet__body">
              <div className="os-sheet__clear">
                <Check size={22} className="os-sheet__clear-icon" aria-hidden="true" />
                <p className="os-sheet__clear-title">Nothing left in {enLabel} today</p>
                <p className="os-sheet__clear-sub">Come back after Maghrib for a fresh day.</p>
              </div>
            </div>
            <div className="os-sheet__footer os-sheet__footer--single">
              <button type="button" className="orient-actions__btn" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
