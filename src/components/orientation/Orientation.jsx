import { useEffect, useRef, useState } from 'react';
import { PartyPopper } from 'lucide-react';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { useSettingsStore } from '../../store/settings-store';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { currentIslamicDayKey } from '../../store/islamic-day-store';
import { recommendOrientation } from '../../data/orientation-selector';
import OrientationLadder from './OrientationLadder';
import OrientationBalanceStrip from './OrientationBalanceStrip';
import OrientationEvidence from './OrientationEvidence';
import OrientationActions from './OrientationActions';
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

export default function Orientation() {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const updateSubtask = useTaskStore((s) => s.updateSubtask);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const { timings } = usePrayerTimes();

  const todayKey = timings?.Maghrib
    ? currentIslamicDayKey(Date.now(), timeToMs(timings.Maghrib, new Date())) || localDayKey()
    : localDayKey();

  // undefined = not yet computed (avoids an empty-state flash on first paint)
  const [recommendation, setRecommendation] = useState(undefined);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [ack, setAck] = useState(null);

  // Continuity/override are refs, not state: they're read once per recompute
  // and mutated by that same effect, never directly driving a render. Actions
  // either mutate the store (which changes projects/tasksByProject and lets
  // the effect below react) or bump `tick` to force a recompute with no
  // store mutation (the "Something else" pillar pick).
  const heldRef = useRef(null);
  const overrideRef = useRef(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const usedOverride = overrideRef.current;
    const rec = recommendOrientation({
      projects,
      tasksByProject,
      heldTaskKey: heldRef.current,
      overridePillarId: usedOverride,
      todayKey,
    });
    overrideRef.current = null; // override is one-shot: consumed by this computation only
    heldRef.current = rec ? { projectId: rec.project.id, taskId: rec.task.id } : null;
    setRecommendation(rec);
    if (usedOverride && rec?.wasSetAside) {
      setAck({ tone: 'neutral', text: `Set aside — now showing ${rec.pillar.sidebarLabel}.` });
    }
  }, [projects, tasksByProject, todayKey, tick]);

  useEffect(() => {
    if (!ack) return undefined;
    const t = setTimeout(() => setAck(null), 3200);
    return () => clearTimeout(t);
  }, [ack]);

  const handleMarkDone = () => {
    if (!recommendation) return;
    const { project, task, subtask } = recommendation;
    toggleSubtask(project.id, task.id, subtask.id);
    setAck({ tone: 'success', text: 'Marked done.' });
  };

  const handleNotApplicable = () => {
    if (!recommendation) return;
    const { project, task, subtask } = recommendation;
    updateSubtask(project.id, task.id, subtask.id, { notApplicable: true });
    setAck({ tone: 'neutral', text: "Marked doesn't apply." });
  };

  const handleNotToday = () => {
    if (!recommendation) return;
    const { project, task, subtask } = recommendation;
    updateSubtask(project.id, task.id, subtask.id, { snoozedUntilDayKey: todayKey });
    setAck({ tone: 'neutral', text: 'Snoozed until tomorrow.' });
  };

  const handleSelectPillar = (pillarId) => {
    setPickerOpen(false);
    heldRef.current = null;
    overrideRef.current = pillarId;
    setTick((t) => t + 1);
  };

  if (recommendation === undefined) return null;

  if (!recommendation) {
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

      <OrientationLadder recommendation={recommendation} valuesLayer={valuesLayer} />

      <OrientationBalanceStrip
        rankedPillars={recommendation.rankedPillars}
        activePillarId={recommendation.pillar.id}
        valuesLayer={valuesLayer}
        pickerOpen={pickerOpen}
        onSelectPillar={handleSelectPillar}
      />

      <div className="orient-now motif-soft-glass">
        <h1 className="orient-now__title">{recommendation.subtask.title}</h1>
        <OrientationEvidence subtask={recommendation.subtask} />
      </div>

      <OrientationActions
        onMarkDone={handleMarkDone}
        onNotApplicable={handleNotApplicable}
        onSomethingElse={() => setPickerOpen((v) => !v)}
        onNotToday={handleNotToday}
        pickerOpen={pickerOpen}
      />
    </div>
  );
}
