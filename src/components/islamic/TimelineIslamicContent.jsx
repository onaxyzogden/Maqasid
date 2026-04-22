import { useEffect, useState } from 'react';
import { Clock, ListChecks, Sparkles } from 'lucide-react';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { useArabic } from '../../hooks/useArabic';
import {
  buildTasksForNode,
  inferNodeFromHour,
  inferPhaseForNode,
} from '../../data/prophetic-path-submodules';
import { getTimeContent } from '../../data/islamic/time-based-content';
import DuaSection from './DuaSection';
import './TimelineIslamicContent.css';

// Display metadata per timeline node — mirrors PropheticPath NODES but compact.
const NODE_META = {
  isha:           { label: 'Isha & Rest',           ar: 'العشاء',    accent: '#8b5cf6' },
  tahajjud:       { label: 'Tahajjud',              ar: 'تهجد',      accent: '#a78bfa' },
  fajr:           { label: 'Fajr',                  ar: 'الفجر',     accent: '#C8A96E' },
  morning:        { label: 'Morning',               ar: 'الضحى',     accent: '#3b82f6' },
  dhuhr:          { label: 'Dhuhr',                 ar: 'الظهر',     accent: '#C8A96E' },
  'midday-labor': { label: 'Midday Labor',          ar: 'السعي',     accent: '#22c55e' },
  asr:            { label: 'Asr',                   ar: 'العصر',     accent: '#C8A96E' },
  maghrib:        { label: 'Maghrib',               ar: 'المغرب',    accent: '#f472b6' },
};

const PHASE_LABEL = {
  before: 'Before · Preparation',
  during: 'During · Presence',
  after:  'After · Lingering',
};

function refreshKey() {
  // Re-derive node/phase whenever the minute ticks.
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes()}`;
}

export default function TimelineIslamicContent() {
  const fmt = useArabic();
  const { timings, nextPrayer } = usePrayerTimes();
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  // Tick once a minute so the current node/phase updates without reload.
  const [, setTick] = useState(refreshKey());
  useEffect(() => {
    const id = setInterval(() => setTick(refreshKey()), 60_000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  const nodeId = inferNodeFromHour(now);
  const phase = inferPhaseForNode(nodeId, now, timings);
  const meta = NODE_META[nodeId] || { label: nodeId, ar: '', accent: 'var(--accent)' };
  const content = getTimeContent(nodeId, phase);

  const tasks = buildTasksForNode(nodeId, projects, tasksByProject, { limit: 5, phase });

  const accent = meta.accent;

  return (
    <div className="til">
      {/* Window header */}
      <div className="til-window" style={{ borderLeftColor: accent }}>
        <div className="til-window-row">
          <Sparkles size={14} style={{ color: accent }} />
          <span className="til-window-node" style={{ color: accent }}>{meta.label}</span>
          {meta.ar && (
            <span className="til-window-ar arabic" style={{ color: accent }}>
              {fmt(meta.ar)}
            </span>
          )}
        </div>
        <div className="til-window-phase">{PHASE_LABEL[phase] || phase}</div>
        {nextPrayer && (
          <div className="til-window-next">
            <Clock size={12} />
            <span>Next: <strong>{nextPrayer.name}</strong> {nextPrayer.time}</span>
            {nextPrayer.remaining && (
              <span className="til-window-remaining">
                {nextPrayer.remaining === 'tomorrow' ? 'tomorrow' : `in ${nextPrayer.remaining}`}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Ayah / hadith for current time */}
      {content?.ayah && (
        <div className="til-section">
          <div className="til-section-label">Ayah for This Window</div>
          <DuaSection dua={content.ayah} color={accent} />
        </div>
      )}
      {content?.hadith && (
        <div className="til-section">
          <div className="til-section-label">Hadith for This Window</div>
          <DuaSection dua={content.hadith} color={accent} />
        </div>
      )}

      {/* Phase dhikr / dua */}
      {content?.dhikr && (
        <div className="til-section">
          <div className="til-section-label">Dhikr · {PHASE_LABEL[phase]?.split(' · ')[1] || phase}</div>
          <DuaSection dua={content.dhikr} color={accent} />
        </div>
      )}

      {/* Phase intent fallback when no Arabic content for this slot */}
      {content?.intent && (
        <div className="til-section">
          <div className="til-section-label">Intent</div>
          <div className="til-intent" style={{ borderLeftColor: accent }}>
            <div className="til-intent-title" style={{ color: accent }}>
              {content.intent.title}
            </div>
            <p className="til-intent-meaning">{content.intent.meaning}</p>
          </div>
        </div>
      )}

      {/* Phase-matched tasks summary */}
      <div className="til-section">
        <div className="til-section-label til-section-label--row">
          <ListChecks size={12} />
          <span>Tasks for This Window</span>
          <span className="til-task-count">{tasks.length}</span>
        </div>
        {tasks.length === 0 ? (
          <p className="til-empty">No tasks queued.</p>
        ) : (
          <ul className="til-task-list">
            {tasks.map((t) => (
              <li key={t.id} className="til-task-row">
                <a
                  href={`/app/prophetic-path-test#node-${nodeId}`}
                  className="til-task-link"
                  title={t.title}
                >
                  <span className="til-task-dot" style={{ background: accent }} />
                  <span className="til-task-title">{t.title}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
