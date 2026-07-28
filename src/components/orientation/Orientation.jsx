import { useEffect, useRef, useState } from 'react';
import { PartyPopper } from 'lucide-react';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { useSettingsStore } from '../../store/settings-store';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { computeTodayKey } from '../../utils/islamic-day-key';
import { getPillarById, getPillarLabel } from '../../data/maqasid';
import { buildOrientationCarousel } from '../../data/orientation-selector';
import OrientationCarousel from './OrientationCarousel';
import OrientationSheet from './OrientationSheet';
import './Orientation.css';

function lowerFirst(text) {
  return text ? text.charAt(0).toLowerCase() + text.slice(1) : text;
}

export default function Orientation() {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const updateSubtask = useTaskStore((s) => s.updateSubtask);
  const updateTask = useTaskStore((s) => s.updateTask);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const { timings } = usePrayerTimes();
  const maghribRaw = timings?.Maghrib ?? null;

  // undefined = not yet computed (avoids an empty-state flash on first paint).
  const [model, setModel] = useState(undefined);
  const [openPillarId, setOpenPillarId] = useState(null);
  const [focusPillarId, setFocusPillarId] = useState(null);
  const [ack, setAck] = useState(null);

  // Carries an action's intent across the store-driven recompute below. Set
  // synchronously in a handler (before the store mutation re-renders us), read
  // once in the effect, then cleared — never drives a render directly.
  const pendingRef = useRef(null);

  // The Islamic-day key the current model was built for. Handlers reuse it so a
  // snooze targets the day the user is looking at — not a freshly-recomputed key
  // if Maghrib happened to roll over between this render and the tap.
  const dayKeyRef = useRef(null);

  // Effect-driven recompute (not handler-driven): actions mutate the store,
  // which changes projects/tasksByProject and lets this effect rebuild the
  // carousel. Keeps the wall-clock read (computeTodayKey) out of render.
  useEffect(() => {
    dayKeyRef.current = computeTodayKey(maghribRaw);
    const next = buildOrientationCarousel({
      projects,
      tasksByProject,
      todayKey: dayKeyRef.current,
    });
    setModel(next);

    const pending = pendingRef.current;
    if (pending) {
      pendingRef.current = null;
      const card = next.cards.find((c) => c.pillar.id === pending.pillarId);
      if (card?.hasEligible) {
        // The pillar still has an actionable step, so the sheet stays open and
        // advances in place. Either the same task rolled to its next subtask
        // (ackSame), or that task cleared / was set aside and the board rolled to
        // a different task — same board or a sibling board in the pillar (ackAdvance).
        const sameTask = card.task?.id === pending.taskId;
        setAck(sameTask ? pending.ackSame : pending.ackAdvance);
      } else {
        // Nothing actionable left in this pillar today (board complete, or the
        // task was snoozed and no sibling board has its prerequisites met) — close
        // the sheet and nudge toward whatever is now weakest (recommendedPillarId
        // itself falls through cross-pillar).
        setOpenPillarId(null);
        setFocusPillarId(next.recommendedPillarId);
        setAck(pending.ackClose);
      }
    }
  }, [projects, tasksByProject, maghribRaw]);

  useEffect(() => {
    if (!ack) return undefined;
    const t = setTimeout(() => setAck(null), 3200);
    return () => clearTimeout(t);
  }, [ack]);

  const openCard = model && openPillarId
    ? model.cards.find((c) => c.pillar.id === openPillarId) ?? null
    : null;

  // Acting on a pillar other than the recommended (weakest) one is fine — the
  // carousel is a free picker — but the ack names what was set aside, so the
  // nudge toward the weakest domain stays visible.
  const buildAck = (tone, text) => {
    const rec = model?.recommendedPillarId;
    if (rec && openPillarId && openPillarId !== rec) {
      const recLabel = getPillarLabel(getPillarById(rec), valuesLayer);
      return { tone, text: `Set aside ${recLabel} — ${lowerFirst(text)}` };
    }
    return { tone, text };
  };

  // All three handlers act on the TRUE current step read off the card
  // (openCard.task / openCard.subtask), never the previewed step — the sheet
  // disables them while browsing ahead/back, and reading the current step here is
  // the real guard behind that UI one.
  const handleMarkDone = () => {
    if (!openCard?.subtask) return;
    const { project, task, subtask } = openCard;
    toggleSubtask(project.id, task.id, subtask.id);
    pendingRef.current = {
      pillarId: openPillarId,
      taskId: task.id,
      ackSame: buildAck('success', 'Marked done.'),
      ackAdvance: buildAck('success', 'Task complete.'),
      ackClose: buildAck('success', 'Task complete.'),
    };
  };

  const handleNotApplicable = () => {
    if (!openCard?.subtask) return;
    const { project, task, subtask } = openCard;
    updateSubtask(project.id, task.id, subtask.id, { notApplicable: true });
    const a = buildAck('neutral', "Marked doesn't apply.");
    pendingRef.current = { pillarId: openPillarId, taskId: task.id, ackSame: a, ackAdvance: a, ackClose: a };
  };

  // "Not today" sets the whole TASK aside for the day (task-level snooze), not a
  // single subtask — the entire chain re-locks and the surface falls through to a
  // sibling board or, failing that, another pillar (see recommendOrientation).
  const handleNotToday = () => {
    if (!openCard?.task) return;
    const { project, task } = openCard;
    updateTask(project.id, task.id, { snoozedUntilDayKey: dayKeyRef.current });
    const a = buildAck('neutral', 'Snoozed until tomorrow.');
    pendingRef.current = { pillarId: openPillarId, taskId: task.id, ackSame: a, ackAdvance: a, ackClose: a };
  };

  // Revert is the one action that DOES act on the previewed step — the sheet
  // passes the browsed-back task/subtask (both belong to the open card's board).
  // Un-doing a done step routes through toggleSubtask so a Done-column task also
  // travels back to its previous column; a "doesn't apply" step just clears the
  // flag. The recompute + preview resync snap current back to the reopened step.
  const handleRevert = (task, subtask) => {
    if (!openCard?.project || !task || !subtask) return;
    const projectId = openCard.project.id;
    if (subtask.done) {
      toggleSubtask(projectId, task.id, subtask.id);
    } else if (subtask.notApplicable) {
      updateSubtask(projectId, task.id, subtask.id, { notApplicable: false });
    } else {
      return;
    }
    const a = buildAck('neutral', 'Step reopened.');
    pendingRef.current = { pillarId: openPillarId, taskId: task.id, ackSame: a, ackAdvance: a, ackClose: a };
  };

  if (model === undefined) return null;

  const anyEligible = model.cards.some((c) => c.hasEligible);

  if (!anyEligible) {
    return (
      <div className="orient-page orient-page--empty">
        <div className="orient-empty motif-soft-glass">
          <PartyPopper size={28} className="orient-empty__icon" aria-hidden="true" />
          <h2 className="orient-empty__title">You&apos;re all caught up</h2>
          <p className="orient-empty__text">
            Nothing eligible right now across any pillar. Come back after Maghrib for a fresh day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="orient-page">
      {ack && (
        <div className={`orient-ack orient-ack--${ack.tone}`} role="status">
          {ack.text}
        </div>
      )}

      <header className="orient-head">
        <p className="orient-head__eyebrow">Orientation</p>
        <h1 className="orient-head__title">What&apos;s next</h1>
        <p className="orient-head__sub">
          Your weakest domain leads. Move through the seven &mdash; tap a card to open its next step.
        </p>
      </header>

      <OrientationCarousel
        cards={model.cards}
        valuesLayer={valuesLayer}
        focusPillarId={focusPillarId}
        onOpenCard={setOpenPillarId}
      />

      {openCard && (
        <OrientationSheet
          card={openCard}
          valuesLayer={valuesLayer}
          onMarkDone={handleMarkDone}
          onNotApplicable={handleNotApplicable}
          onNotToday={handleNotToday}
          onRevert={handleRevert}
          onClose={() => setOpenPillarId(null)}
        />
      )}
    </div>
  );
}
