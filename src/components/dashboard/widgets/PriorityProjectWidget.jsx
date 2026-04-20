import { Link } from 'react-router-dom';
import { Target, ChevronRight } from 'lucide-react';
import { useProjectStore } from '../../../store/project-store';
import { useTaskStore } from '../../../store/task-store';

function completionPct(project, tasks) {
  if (!tasks.length) return 0;
  const done = tasks.filter((t) => t.completedAt || t.columnId?.endsWith('_done')).length;
  return Math.round((done / tasks.length) * 100);
}

export default function PriorityProjectWidget() {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const topProject = projects
    .filter((p) => !p.archived && p.bbosEnabled)
    .sort((a, b) => {
      const at = (tasksByProject[a.id] || []).filter((t) => !t.completedAt).length;
      const bt = (tasksByProject[b.id] || []).filter((t) => !t.completedAt).length;
      return bt - at;
    })[0];

  if (!topProject) {
    return (
      <div className="ctx-widget ctx-widget--project">
        <div className="ctx-widget__title"><Target size={14} /> Priority Project</div>
        <div className="ctx-widget__muted">
          <Link to="/app/work">Create a project →</Link>
        </div>
      </div>
    );
  }

  const tasks = tasksByProject[topProject.id] || [];
  const pct = completionPct(topProject, tasks);
  const open = tasks.filter((t) => !t.completedAt).length;

  return (
    <Link to={`/app/work/${topProject.id}`} className="ctx-widget ctx-widget--project ctx-widget--link">
      <div className="ctx-widget__title">
        <Target size={14} /> Priority Project
        <ChevronRight size={12} className="ctx-widget__arrow" />
      </div>
      <div className="ctx-widget__big">{topProject.name}</div>
      <div className="ctx-widget__bar">
        <div
          className="ctx-widget__bar-fill"
          style={{ width: `${pct}%`, background: topProject.color ?? 'var(--accent)' }}
        />
      </div>
      <div className="ctx-widget__meta">{pct}% complete · {open} open</div>
    </Link>
  );
}
