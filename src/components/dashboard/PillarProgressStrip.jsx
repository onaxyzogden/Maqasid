import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { MAQASID_PILLARS } from '../../data/maqasid';

/**
 * Resolve which pillar a project belongs to.
 *
 * Primary:  if project.moduleId is set, match against pillar.subModuleIds —
 *           this takes precedence so modules like moontrance-land resolve to
 *           their own pillar even when the project ID starts with a different prefix.
 * Fallback: project ID follows the pattern `{pillarId}_{submodule}_{level}`
 *           e.g. faith_shahada_core → faith, life_physical_growth → life
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

// Mirror LevelNavigator's taskColor logic exactly
function isTaskDone(task) {
  return !!(task.completedAt || task.columnId?.endsWith('_done'));
}
function isTaskInProgress(task) {
  return !task.completedAt
    && !task.columnId?.endsWith('_done')
    && !task.columnId?.endsWith('_to_do')
    && !task.columnId?.endsWith('_todo');
}

/**
 * Dashboard pillar progress strip.
 * One column per Maqasid pillar, one proportional bar per pillar showing
 * real task status — matching LevelNavigator's taskColor rule:
 *   --col-done    (green)  = tasks completed
 *   --col-review  (amber)  = tasks in progress
 *   --bg3         (gray)   = tasks not started / no tasks yet
 */
export default function PillarProgressStrip({ valuesLayer }) {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const isIslamic = valuesLayer === 'islamic';

  const pillarStats = useMemo(() => {
    const stats = {};
    for (const pillar of MAQASID_PILLARS) {
      stats[pillar.id] = { completed: 0, inProgress: 0, todo: 0 };
    }
    for (const project of projects) {
      if (project.archived) continue;
      const pillarId = getPillarId(project);
      if (!pillarId) continue;
      const tasks = tasksByProject[project.id] || [];
      for (const task of tasks) {
        if (isTaskDone(task))         stats[pillarId].completed++;
        else if (isTaskInProgress(task)) stats[pillarId].inProgress++;
        else                             stats[pillarId].todo++;
      }
    }
    return stats;
  }, [projects, tasksByProject]);

  return (
    <div className="pps">
      {MAQASID_PILLARS.map((pillar) => {
        const { completed, inProgress, todo } = pillarStats[pillar.id];
        const total = completed + inProgress + todo;
        const label = isIslamic ? pillar.sidebarLabel : pillar.universalLabel;

        return (
          <Link
            key={pillar.id}
            to={`/app/pillar/${pillar.id}`}
            className="pps__col"
            style={{ '--pps-color': pillar.accentColor }}
            title={label}
          >
            <div className="pps__bar">
              {total === 0 ? (
                <div className="pps__seg pps__seg--todo" style={{ flex: 1 }} />
              ) : (
                <>
                  {completed  > 0 && <div className="pps__seg pps__seg--done"     style={{ flex: completed }} />}
                  {inProgress > 0 && <div className="pps__seg pps__seg--progress" style={{ flex: inProgress }} />}
                  {todo       > 0 && <div className="pps__seg pps__seg--todo"     style={{ flex: todo }} />}
                </>
              )}
            </div>
            <span className="pps__label">{label}</span>
            {isIslamic && <span className="pps__arabic">{pillar.arabicRootAr}</span>}
          </Link>
        );
      })}
    </div>
  );
}
