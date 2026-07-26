import { lazy, Suspense, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ChevronDown } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { getPillarLabel, getSubmoduleLabel } from '../../data/maqasid';
import { TIER_META } from '../../data/orientation-selector';
import { deriveSubtaskTier, isSubtaskGrounded } from '../../utils/subtask-grounding';
import AmanahTierBadge from '../shared/AmanahTierBadge';
import OrientationEvidence from './OrientationEvidence';
import OrientationActions from './OrientationActions';
// Base slide-up chrome (.pp-slideup__*). OrientationSheet.css layers the
// orientation-specific content on top and must load after it — its panel
// overrides win on equal specificity by source order.
import '../work/ProjectSlideUp.css';
import './OrientationSheet.css';

// Subtask guidance markdown (react-markdown + remark-gfm, ~80 KB) is only pulled
// once the "Why & how" section is expanded — same lazy split as TaskDetailPanel.
const LazyMarkdown = lazy(() => import('../shared/LazyMarkdown'));

// The card face only badges Urgent/High; the detail sheet shows the real
// priority whatever it is, so any known level earns a pill here.
const KNOWN_PRIORITIES = new Set(['urgent', 'high', 'medium', 'low']);

// A subtask's Why?/How? prose, else its markdown description, else a gentle
// empty note — same precedence as TaskDetailPanel so a subtask reads identically
// on the work surface and here.
function SubtaskGuidance({ subtask }) {
  if (subtask.why || subtask.how) {
    return (
      <div className="os-sheet__guide">
        {subtask.why && (
          <section className="os-sheet__guide-sec">
            <h4 className="os-sheet__guide-label">Why?</h4>
            <p className="os-sheet__guide-text">{subtask.why}</p>
          </section>
        )}
        {subtask.how && (
          <section className="os-sheet__guide-sec">
            <h4 className="os-sheet__guide-label">How?</h4>
            <p className="os-sheet__guide-text">{subtask.how}</p>
          </section>
        )}
      </div>
    );
  }
  if (subtask.description) {
    return (
      <div className="os-sheet__guide os-sheet__guide--md">
        <Suspense fallback={<p className="os-sheet__guide-text">{subtask.description}</p>}>
          <LazyMarkdown>{subtask.description}</LazyMarkdown>
        </Suspense>
      </div>
    );
  }
  return (
    <p className="os-sheet__guide-text os-sheet__guide--empty">
      No extra guidance for this step yet.
    </p>
  );
}

// Collapsible section, closed on each open (the sheet remounts per open, so
// local state is enough). Shares the .orient-evidence__* look with the Evidence
// accordion stacked below it.
function SheetSection({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="orient-evidence">
      <button
        type="button"
        className="orient-evidence__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`orient-evidence__chevron${open ? ' orient-evidence__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && <div className="orient-evidence__body">{children}</div>}
    </div>
  );
}

// Bottom sheet for one Maqasid domain's current step. Built on the shared
// slide-up chrome (ProjectSlideUp.css): portal to <body>, backdrop, focus trap +
// Escape via useFocusTrap, role=dialog / aria-modal. Purely presentational — the
// container decides which card is shown and what each action does; `card` is the
// engine's card shape (see buildOrientationCarousel).
export default function OrientationSheet({ card, valuesLayer, onMarkDone, onNotApplicable, onNotToday, onClose }) {
  // Hook runs unconditionally (before the null guard); active only when a card
  // is present so it never traps focus on an empty portal.
  const panelRef = useFocusTrap(!!card, onClose);

  if (!card) return null;
  const { pillar, tier, submoduleId, task, subtask, taskStats, hasEligible } = card;

  const enLabel = getPillarLabel(pillar, valuesLayer);
  const tierLabel = TIER_META[tier]?.label ?? '';
  const clusterLabel = getSubmoduleLabel(submoduleId, pillar.id);
  const priority = task?.priority;
  const showPriority = KNOWN_PRIORITIES.has(priority);
  const amanahTier = subtask ? deriveSubtaskTier(subtask) : null;
  const grounded = subtask ? isSubtaskGrounded(subtask) : null;
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
          <>
            <div className="pp-slideup__body os-sheet__body">
              <p className="os-sheet__crumb">
                {tierLabel}
                {clusterLabel && <> <span className="os-sheet__crumb-sep">&rsaquo;</span> {clusterLabel}</>}
              </p>

              <h3 className="os-sheet__task">
                <span className="os-sheet__task-title">{task.title}</span>
                <span className="os-sheet__task-prog">{taskStats.done}/{taskStats.total}</span>
              </h3>

              <div className="os-sheet__tags">
                {showPriority && (
                  <span className={`os-sheet__pri os-sheet__pri--${priority}`}>{priority}</span>
                )}
                {amanahTier && <AmanahTierBadge tier={amanahTier} size="md" />}
                {grounded !== null && (
                  <span className={`os-sheet__grounded${grounded ? '' : ' os-sheet__grounded--no'}`}>
                    {grounded ? 'Grounded' : 'Ungrounded'}
                  </span>
                )}
              </div>

              <div className="os-sheet__now">
                <span className="os-sheet__now-label">Now</span>
                <p className="os-sheet__now-text">{subtask.title}</p>
              </div>

              {/* Keyed by subtask so both accordions reset to collapsed when the
                  step advances within a held task (spec: collapsed each open). */}
              <SheetSection key={`why-${subtask.id}`} label="Why & how">
                <SubtaskGuidance subtask={subtask} />
              </SheetSection>

              <OrientationEvidence key={`ev-${subtask.id}`} subtask={subtask} label="Evidence" />
            </div>

            <div className="os-sheet__footer">
              <OrientationActions
                onMarkDone={onMarkDone}
                onNotApplicable={onNotApplicable}
                onNotToday={onNotToday}
              />
            </div>
          </>
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
