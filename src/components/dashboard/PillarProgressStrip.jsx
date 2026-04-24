import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { MAQASID_PILLARS } from '../../data/maqasid';

/**
 * Resolve which pillar a project belongs to.
 * Primary:  project.moduleId → matching pillar.subModuleIds
 * Fallback: project.id prefix `{pillarId}_`
 */
function getPillarId(project) {
  if (project.moduleId) {
    const match = MAQASID_PILLARS.find((p) => p.subModuleIds.includes(project.moduleId));
    if (match) return match.id;
  }
  for (const pillar of MAQASID_PILLARS) {
    if (project.id.startsWith(pillar.id + '_')) return pillar.id;
  }
  return null;
}

function isTaskDone(task) {
  return !!(task.completedAt || task.columnId?.endsWith('_done'));
}
function isTaskInProgress(task) {
  return !task.completedAt
    && !task.columnId?.endsWith('_done')
    && !task.columnId?.endsWith('_to_do')
    && !task.columnId?.endsWith('_todo');
}

/** Build last-7-day completion buckets keyed by yyyy-mm-dd (local time). */
function buildDayKeys() {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      date: d,
    });
  }
  return days;
}

/** Render a tiny sparkline SVG for an array of daily counts. */
function Sparkline({ data, color, width = 72, height = 28 }) {
  const max = Math.max(...data, 1);
  const pad = 2;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const step = data.length > 1 ? innerW / (data.length - 1) : 0;
  const points = data.map((v, i) => {
    const x = pad + i * step;
    const y = pad + innerH - (v / max) * innerH;
    return { x, y };
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${(pad + innerW).toFixed(1)},${(pad + innerH).toFixed(1)} L${pad.toFixed(1)},${(pad + innerH).toFixed(1)} Z`;
  const hasData = data.some((v) => v > 0);

  if (!hasData) {
    // Empty state: flat dashed midline at muted color
    const midY = pad + innerH / 2;
    return (
      <svg
        className="mbento__spark mbento__spark--empty"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        aria-hidden="true"
      >
        <line
          x1={pad}
          y1={midY}
          x2={pad + innerW}
          y2={midY}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray="3 3"
          opacity={0.3}
        />
      </svg>
    );
  }

  return (
    <svg
      className="mbento__spark"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <path d={areaPath} fill={color} fillOpacity={0.12} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.5} fill={color} opacity={data[i] > 0 ? 1 : 0} />
      ))}
    </svg>
  );
}

/**
 * Maqasid Bento — one card per pillar with sparkline + completion %.
 * Replaces the old thin-bar strip. Grid reflows for mobile.
 */
export default function PillarProgressStrip({ valuesLayer, focusPillarIds = null }) {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const isIslamic = valuesLayer === 'islamic';
  const hasFocus = Array.isArray(focusPillarIds)
    && focusPillarIds.some((id) => id && id !== '_skipped');

  const pillarStats = useMemo(() => {
    const days = buildDayKeys();
    const dayIndex = Object.fromEntries(days.map((d, i) => [d.key, i]));
    const stats = {};
    for (const pillar of MAQASID_PILLARS) {
      stats[pillar.id] = {
        completed: 0,
        inProgress: 0,
        todo: 0,
        daily: new Array(days.length).fill(0),
      };
    }
    for (const project of projects) {
      if (project.archived) continue;
      const pillarId = getPillarId(project);
      if (!pillarId) continue;
      const tasks = tasksByProject[project.id] || [];
      for (const task of tasks) {
        if (isTaskDone(task)) {
          stats[pillarId].completed++;
          if (task.completedAt) {
            const d = new Date(task.completedAt);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const idx = dayIndex[key];
            if (idx !== undefined) stats[pillarId].daily[idx]++;
          }
        } else if (isTaskInProgress(task)) {
          stats[pillarId].inProgress++;
        } else {
          stats[pillarId].todo++;
        }
      }
    }
    return stats;
  }, [projects, tasksByProject]);

  return (
    <div className="mbento" role="list">
      {MAQASID_PILLARS.map((pillar) => {
        const { completed, inProgress, todo, daily } = pillarStats[pillar.id];
        const total = completed + inProgress + todo;
        const pct = total > 0 ? Math.round((completed / total) * 100) : null;
        const label = isIslamic ? pillar.sidebarLabel : pillar.universalLabel;
        const isFocus = hasFocus && focusPillarIds.includes(pillar.id);
        const isMuted = hasFocus && !isFocus;

        return (
          <Link
            key={pillar.id}
            to={`/app/pillar/${pillar.id}`}
            role="listitem"
            className={`mbento__card${isMuted ? ' mbento__card--muted' : ''}${isFocus ? ' mbento__card--focus' : ''}`}
            style={{ '--mbento-color': pillar.accentColor }}
            title={label}
          >
            <div className="mbento__stripe" aria-hidden="true" />
            <div className="mbento__head">
              <span className="mbento__label">{label}</span>
              {isIslamic && <span className="mbento__ar">{pillar.arabicRootAr}</span>}
            </div>
            <div className="mbento__stats">
              <span className="mbento__pct">
                {pct === null ? '—' : `${pct}%`}
              </span>
              <Sparkline
                data={daily}
                color={pillar.accentColor}
              />
            </div>
            <div className="mbento__meta">
              {total === 0 ? (
                <span className="mbento__meta-empty">No tasks yet</span>
              ) : (
                <>
                  <span className="mbento__meta-chip mbento__meta-chip--done">{completed} done</span>
                  {inProgress > 0 && (
                    <span className="mbento__meta-chip mbento__meta-chip--progress">{inProgress} in progress</span>
                  )}
                </>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
