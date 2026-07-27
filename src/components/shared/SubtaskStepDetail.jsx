import { Fragment, lazy, Suspense, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { deriveSubtaskTier, isSubtaskGrounded } from '../../utils/subtask-grounding';
import AmanahTierBadge from './AmanahTierBadge';
import SubtaskEvidence from './SubtaskEvidence';
import './SubtaskStepDetail.css';

// Subtask guidance markdown (react-markdown + remark-gfm, ~80 KB) is only pulled
// once a Why or How section is expanded — same lazy split as TaskDetailPanel.
const LazyMarkdown = lazy(() => import('./LazyMarkdown'));

// A card face may only badge Urgent/High; the detail view shows the real
// priority whatever it is, so any known level earns a pill here.
const KNOWN_PRIORITIES = new Set(['urgent', 'high', 'medium', 'low']);

// Seeded subtasks carry a single markdown `description` shaped
// "**Why?** … **How?** …". Split it at the How marker so Why and How can each
// own a dropdown; the bold headers are dropped because the accordion labels now
// carry them. Tolerant of casing and a missing "?". No How marker → the whole
// description is treated as Why.
function splitWhyHow(description) {
  const howMarker = /\*\*\s*How\??\s*\*\*/i;
  const m = description.match(howMarker);
  const whyRaw = m ? description.slice(0, m.index) : description;
  const howRaw = m ? description.slice(m.index + m[0].length) : '';
  const why = whyRaw.replace(/^\s*\*\*\s*Why\??\s*\*\*\s*/i, '').trim();
  const how = howRaw.trim();
  return { why, how };
}

// Markdown guidance body — same lazy split + styling as before, scoped to one
// half (Why or How) rather than the whole blob.
function GuidanceMarkdown({ text }) {
  return (
    <div className="os-sheet__guide os-sheet__guide--md">
      <Suspense fallback={<p className="os-sheet__guide-text">{text}</p>}>
        <LazyMarkdown>{text}</LazyMarkdown>
      </Suspense>
    </div>
  );
}

// Resolve a subtask's Why / How bodies with the same precedence as before:
// structured why/how fields (plain text), else the split markdown description,
// else nothing. Same source of truth as TaskDetailPanel so a subtask reads
// identically on the work surface and here.
function deriveGuidance(subtask) {
  if (subtask.why || subtask.how) {
    return {
      whyNode: subtask.why ? <p className="os-sheet__guide-text">{subtask.why}</p> : null,
      howNode: subtask.how ? <p className="os-sheet__guide-text">{subtask.how}</p> : null,
    };
  }
  if (subtask.description) {
    const { why, how } = splitWhyHow(subtask.description);
    return {
      whyNode: why ? <GuidanceMarkdown text={why} /> : null,
      howNode: how ? <GuidanceMarkdown text={how} /> : null,
    };
  }
  return { whyNode: null, howNode: null };
}

// Why and How as two separate accordions (spec: each gets its own dropdown).
// When a subtask has no guidance at all, one "Why & how" section carries the
// gentle empty note so the row still reads consistently.
function SubtaskWhyHow({ subtask }) {
  const { whyNode, howNode } = deriveGuidance(subtask);
  if (!whyNode && !howNode) {
    return (
      <DetailSection label="Why & how">
        <p className="os-sheet__guide-text os-sheet__guide--empty">
          No extra guidance for this step yet.
        </p>
      </DetailSection>
    );
  }
  return (
    <>
      {whyNode && <DetailSection label="Why">{whyNode}</DetailSection>}
      {howNode && <DetailSection label="How">{howNode}</DetailSection>}
    </>
  );
}

// Collapsible section, closed on each mount (host popups remount per open, so
// local state is enough). Shares the .orient-evidence__* look with the Evidence
// accordion stacked below it.
function DetailSection({ label, children }) {
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

// One subtask ("step") rendered Orientation-style: crumb → task title/progress →
// tag row → Now box → Why and How accordions → Evidence accordion. Shared by the
// orientation sheet and the Prophetic Path node popup drill-in. Purely
// presentational — renders as a Fragment so the host body's flex gap spaces the
// sections; class names keep the historical os-sheet__ / orient-evidence__
// prefixes (see shared/CONTEXT.md).
//
// `subtask == null` means the task has no eligible step left today (all done,
// snoozed, or set aside) — rendered as a calm complete state, not an error.
export default function SubtaskStepDetail({
  crumbParts = [],
  task,
  subtask,
  taskStats,
  taskStepper = null,
  subtaskStepper = null,
}) {
  if (!subtask) {
    return (
      <div className="os-sheet__clear">
        <Check size={22} className="os-sheet__clear-icon" aria-hidden="true" />
        <p className="os-sheet__clear-title">Nothing left in this task today</p>
        <p className="os-sheet__clear-sub">Every step is done, set aside, or snoozed until tomorrow.</p>
      </div>
    );
  }

  const priority = task?.priority;
  const showPriority = KNOWN_PRIORITIES.has(priority);
  const amanahTier = deriveSubtaskTier(subtask);
  const grounded = isSubtaskGrounded(subtask);
  const crumb = crumbParts.filter(Boolean);

  return (
    <>
      {crumb.length > 0 && (
        <p className="os-sheet__crumb">
          {crumb.map((part, i) => (
            <Fragment key={`${i}-${part}`}>
              {i > 0 && <>{' '}<span className="os-sheet__crumb-sep">&rsaquo;</span>{' '}</>}
              {part}
            </Fragment>
          ))}
        </p>
      )}

      {taskStepper}

      <h3 className="os-sheet__task">
        <span className="os-sheet__task-title">{task.title}</span>
        {taskStats && (
          <span className="os-sheet__task-prog">{taskStats.done}/{taskStats.total}</span>
        )}
      </h3>

      <div className="os-sheet__tags">
        {showPriority && (
          <span className={`os-sheet__pri os-sheet__pri--${priority}`}>{priority}</span>
        )}
        {amanahTier && <AmanahTierBadge tier={amanahTier} size="md" />}
        <span className={`os-sheet__grounded${grounded ? '' : ' os-sheet__grounded--no'}`}>
          {grounded ? 'Grounded' : 'Ungrounded'}
        </span>
      </div>

      {subtaskStepper}

      <div className="os-sheet__now">
        <span className="os-sheet__now-label">Now</span>
        <p className="os-sheet__now-text">{subtask.title}</p>
      </div>

      {/* Keyed by subtask so the Why / How accordions reset to collapsed when
          the step advances within a held task (spec: collapsed each open). */}
      <SubtaskWhyHow key={`wh-${subtask.id}`} subtask={subtask} />

      <SubtaskEvidence key={`ev-${subtask.id}`} subtask={subtask} label="Evidence" />
    </>
  );
}
