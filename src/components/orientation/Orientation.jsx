import { useEffect, useRef, useState } from 'react';
import { PartyPopper } from 'lucide-react';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { useSettingsStore } from '../../store/settings-store';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { currentIslamicDayKey } from '../../store/islamic-day-store';
import { getPillarById, getPillarLabel } from '../../data/maqasid';
import { buildOrientationCarousel } from '../../data/orientation-selector';
import OrientationCarousel from './OrientationCarousel';
import OrientationSheet from './OrientationSheet';
import './Orientation.css';

// Local copy of the "HH:MM (TZ)" → epoch-ms parser duplicated across the
// codebase (usePrayerTimes.js, PropheticPath.jsx) rather than centralized —
// following existing precedent, see orientation/CONTEXT.md Gotchas.
function timeToMs(raw, dayStart) {
  if (!raw) return null;
  const clean = raw.replace(/\s*\(.*\)/, '');
  const match = /^(\d{1,2}):(\d{2})/.exec(clean);
  if (!match) return null;
  const d = new Date(dayStart);
  d.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return d.getTime();
}

function localDayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Reads the wall clock (Date.now / new Date), so it must only be called from
// effects and event handlers — never the render body (react-hooks/purity).
// Maghrib-pivoted: before Maghrib the Islamic day key is still yesterday's.
function computeTodayKey(maghribRaw) {
  if (!maghribRaw) return localDayKey();
  return currentIslamicDayKey(Date.now(), timeToMs(maghribRaw, new Date())) || localDayKey();
}

function lowerFirst(text) {
  return text ? text.charAt(0).toLowerCase() + text.slice(1) : text;
}

export default function Orientation() {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const updateSubtask = useTaskStore((s) => s.updateSubtask);
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
      // Held-task continuity: while the acted-on task still surfaces an eligible
      // subtask it stays the pillar's pick (same priority/order), so the sheet
      // advances in place. Once it drops out, the task is done for today.
      const sameTaskContinues = card?.hasEligible && card.task?.id === pending.taskId;
      if (sameTaskContinues) {
        setAck(pending.ack);
      } else {
        setOpenPillarId(null);
        setFocusPillarId(next.recommendedPillarId);
        setAck(pending.doneAck);
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

  const handleMarkDone = () => {
    if (!openCard?.subtask) return;
    const { project, task, subtask } = openCard;
    toggleSubtask(project.id, task.id, subtask.id);
    pendingRef.current = {
      pillarId: openPillarId,
      taskId: task.id,
      ack: buildAck('success', 'Marked done.'),
      doneAck: buildAck('success', 'Task complete.'),
    };
  };

  const handleNotApplicable = () => {
    if (!openCard?.subtask) return;
    const { project, task, subtask } = openCard;
    updateSubtask(project.id, task.id, subtask.id, { notApplicable: true });
    const a = buildAck('neutral', "Marked doesn't apply.");
    pendingRef.current = { pillarId: openPillarId, taskId: task.id, ack: a, doneAck: a };
  };

  const handleNotToday = () => {
    if (!openCard?.subtask) return;
    const { project, task, subtask } = openCard;
    updateSubtask(project.id, task.id, subtask.id, { snoozedUntilDayKey: dayKeyRef.current });
    const a = buildAck('neutral', 'Snoozed until tomorrow.');
    pendingRef.current = { pillarId: openPillarId, taskId: task.id, ack: a, doneAck: a };
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
          Your weakest domain leads. Swipe through the seven &mdash; tap a card to open its next step.
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
          onClose={() => setOpenPillarId(null)}
        />
      )}
    </div>
  );
}
