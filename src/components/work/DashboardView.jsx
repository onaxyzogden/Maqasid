import { useMemo } from 'react';
import { CheckCircle, AlertTriangle, Star, LayoutDashboard } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { BBOS_STAGES } from '../../data/bbos/bbos-pipeline';
import BbosFullDashboard from '../bbos/BbosFullDashboard';
import PillarLevelDashboard from './PillarLevelDashboard';
import './DashboardView.css';

export default function DashboardView({ project, bbosFilter, onSelectTask }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const metrics = useMemo(() => {
    const tasks = tasksByProject[project.id] || [];
    const columns = project.columns || [];

    // Column distribution
    const byColumn = columns.map((col) => {
      const colTasks = tasks.filter((t) => t.columnId === col.id);
      return { id: col.id, name: col.name, color: col.color, count: colTasks.length };
    });

    // Priority distribution
    const byPriority = { urgent: 0, high: 0, medium: 0, low: 0 };
    tasks.forEach((t) => {
      if (t.priority && byPriority[t.priority] !== undefined) byPriority[t.priority]++;
    });

    // Completion stats
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completedAt).length;
    const now = new Date();
    const overdue = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < now && !t.completedAt
    ).length;
    const noDueDate = tasks.filter((t) => !t.dueDate && !t.completedAt).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Subtask progress
    const totalSubtasks = tasks.reduce((s, t) => s + (t.subtasks?.length || 0), 0);
    const doneSubtasks = tasks.reduce(
      (s, t) => s + (t.subtasks?.filter((st) => st.done).length || 0),
      0
    );

    // Recent activity (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentlyCreated = tasks.filter(
      (t) => t.createdAt && new Date(t.createdAt) > weekAgo
    ).length;
    const recentlyUpdated = tasks.filter(
      (t) => t.updatedAt && new Date(t.updatedAt) > weekAgo
    ).length;

    // BBOS metrics
    let bbosMetrics = null;
    if (project.bbosEnabled) {
      const byStage = {};
      BBOS_STAGES.forEach((s) => {
        byStage[s.id] = { label: s.label, color: s.color, count: 0, completed: 0 };
      });
      const stageColMap = {};
      columns.forEach((col) => {
        const stage = BBOS_STAGES.find((s) => s.id === col.id || s.label === col.name);
        if (stage) stageColMap[col.id] = stage.id;
      });
      tasks.forEach((t) => {
        const stageId = stageColMap[t.columnId];
        if (stageId && byStage[stageId]) {
          byStage[stageId].count++;
          if (t.completedAt) byStage[stageId].completed++;
        }
      });
      bbosMetrics = { byStage, currentStage: project.bbosStage };
    }

    // Top columns (sorted by task count descending)
    const topColumns = [...byColumn].sort((a, b) => b.count - a.count);

    return {
      byColumn, byPriority, total, completed, overdue, noDueDate, pct,
      totalSubtasks, doneSubtasks, recentlyCreated, recentlyUpdated,
      bbosMetrics, topColumns,
    };
  }, [tasksByProject, project]);

  // Delegate to specialized dashboards (after hooks, per Rules of Hooks)
  if (project.bbosEnabled && bbosFilter) {
    return <BbosFullDashboard project={project} bbosFilter={bbosFilter} onSelectTask={onSelectTask} />;
  }
  if (/_(core|growth|excellence)$/.test(project.id)) {
    return <PillarLevelDashboard project={project} onSelectTask={onSelectTask} />;
  }

  const { byColumn, byPriority, total, completed, overdue, noDueDate, pct,
    totalSubtasks, doneSubtasks, recentlyCreated, recentlyUpdated,
    bbosMetrics, topColumns } = metrics;

  // Empty state
  if (total === 0) {
    return (
      <div className="proj-dash__empty">
        <LayoutDashboard size={48} className="proj-dash__empty-icon" />
        <span className="proj-dash__empty-text">
          No tasks yet — switch to Board view to get started.
        </span>
      </div>
    );
  }

  const maxColCount = Math.max(...byColumn.map((c) => c.count), 1);
  const subtaskPct = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;

  // Derive health rationale strings
  const topCol = topColumns[0];
  const activeCount = byColumn.filter((c) => c.count > 0).length;
  const healthPrimary = topCol
    ? `${topCol.name}: ${topCol.count} task${topCol.count !== 1 ? 's' : ''} concentrated here`
    : 'No tasks distributed yet';
  const healthPrimaryRationale = topCol
    ? `"Rationale: ${Math.round((topCol.count / total) * 100)}% of tasks are in ${topCol.name}. ${overdue > 0 ? `${overdue} overdue task${overdue !== 1 ? 's' : ''} require attention.` : 'No overdue items.'} ${pct}% overall completion."`
    : '';
  const healthSecondary = activeCount > 1
    ? `${activeCount} Active Columns in Use`
    : 'Single-column workflow';
  const healthSecondaryRationale = `"Rationale: ${byColumn.map((c) => `${c.name} (${c.count})`).join(', ')}. Pipeline distribution across ${activeCount} stage${activeCount !== 1 ? 's' : ''}."`;

  // Audit checks with scoring
  const checks = [
    { label: 'Task Coverage', sub: total > 10 ? 'Comprehensive' : total > 3 ? 'Building' : 'Minimal', score: total > 10 ? 3 : total > 3 ? 2 : total > 0 ? 1 : 1 },
    { label: 'Completion Rate', sub: pct > 50 ? 'Strong Progress' : pct > 0 ? 'In Progress' : 'Not Started', score: pct >= 80 ? 3 : pct >= 50 ? 2 : pct > 0 ? 1 : 1 },
    { label: 'Scheduling Discipline', sub: noDueDate < total * 0.3 ? 'Well Dated' : 'Dates Needed', score: noDueDate === 0 ? 3 : noDueDate < total * 0.3 ? 2 : 1 },
    { label: 'Subtask Depth', sub: totalSubtasks > 0 ? `${subtaskPct}% Complete` : 'Not Used', score: subtaskPct >= 80 ? 3 : subtaskPct >= 50 ? 2 : totalSubtasks > 0 ? 1 : 1 },
  ];
  if (bbosMetrics) {
    const currentStageData = bbosMetrics.byStage[bbosMetrics.currentStage];
    checks.push({
      label: 'Pipeline Activity',
      sub: currentStageData?.count > 0 ? 'Stage Active' : 'Stage Empty',
      score: currentStageData?.count > 5 ? 3 : currentStageData?.count > 0 ? 2 : 1,
    });
  }
  const avgScore = checks.length > 0 ? (checks.reduce((s, c) => s + c.score, 0) / checks.length) : 0;
  const verdict = avgScore >= 2.5 ? 'STRONG' : avgScore >= 2 ? 'QUALIFIED' : avgScore >= 1.5 ? 'DEVELOPING' : 'NEEDS WORK';
  const thresholdPct = Math.round((avgScore / 3) * 100);

  // Stars helper
  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 3; i++) {
      stars.push(
        <Star
          key={i}
          size={13}
          className={i <= score ? '' : 'proj-dash__star--empty'}
          fill={i <= score ? 'currentColor' : 'none'}
        />
      );
    }
    return <span className="proj-dash__stars">{stars}</span>;
  };

  return (
    <div className="proj-dash">
      <div className="proj-dash__header">
        <h2 className="proj-dash__title">{project.name} Dashboard</h2>
        <p className="proj-dash__desc">
          {project.description || `Aggregated intelligence for ${project.name}. This dossier evaluates pipeline health, priority distribution, and operational readiness.`}
        </p>
      </div>

      <div className="proj-dash__grid">
        {/* ── 01: Project Health (sub-cards like TRU-AF1) ── */}
        <div className="proj-dash__card proj-dash__card--health">
          <div className="proj-dash__card-head">
            <span className="proj-dash__card-num">01</span>
            <span className="proj-dash__card-label">Project Health</span>
          </div>
          <div className="proj-dash__health-cards">
            <div className="proj-dash__health-item">
              <div className="proj-dash__health-top">
                <span className="proj-dash__health-tag">Primary Focus</span>
                <span className={`proj-dash__health-badge ${overdue > 0 ? 'proj-dash__health-badge--warn' : 'proj-dash__health-badge--high'}`}>
                  {overdue > 0 ? 'Attention Needed' : pct > 50 ? 'On Track' : 'In Progress'}
                </span>
              </div>
              <div className="proj-dash__health-title">{healthPrimary}</div>
              <p className="proj-dash__health-rationale">{healthPrimaryRationale}</p>
            </div>
            <div className="proj-dash__health-item proj-dash__health-item--secondary">
              <div className="proj-dash__health-top">
                <span className="proj-dash__health-tag">Distribution</span>
                <span className="proj-dash__health-badge proj-dash__health-badge--med">
                  {bbosMetrics ? `Cycle ${project.bbosCycle || 1}` : `${activeCount} Columns`}
                </span>
              </div>
              <div className="proj-dash__health-title">{healthSecondary}</div>
              <p className="proj-dash__health-rationale">{healthSecondaryRationale}</p>
            </div>
          </div>
        </div>

        {/* ── 02: Pipeline Table (like TRU-AF2) ── */}
        <div className="proj-dash__card proj-dash__card--pipeline">
          <div className="proj-dash__pipe-head">
            <div className="proj-dash__card-head">
              <span className="proj-dash__card-num">02</span>
              <span className="proj-dash__card-label">Pipeline Stages</span>
            </div>
          </div>
          <table className="proj-dash__pipe-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Velocity</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {byColumn.map((col) => {
                const velocity = total > 0 ? ((col.count / total) * 10).toFixed(1) : '0.0';
                return (
                  <tr key={col.id}>
                    <td className="proj-dash__col-name">{col.name}</td>
                    <td>
                      <span className="proj-dash__col-bar-wrap">
                        <span className="proj-dash__col-bar-track">
                          <span
                            className="proj-dash__col-bar-fill"
                            style={{
                              width: `${(col.count / maxColCount) * 100}%`,
                              background: col.color || 'var(--primary)',
                            }}
                          />
                        </span>
                        <span className="proj-dash__col-bar-score">{velocity}/10</span>
                      </span>
                    </td>
                    <td className="proj-dash__col-count">{col.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── 03: Priority Matrix (2×2 quadrant like TRU-AF3) ── */}
        <div className="proj-dash__card proj-dash__card--priority">
          <div className="proj-dash__card-head">
            <span className="proj-dash__card-num">03</span>
            <span className="proj-dash__card-label">Priority Matrix</span>
          </div>
          <div className="proj-dash__matrix-wrap">
            <span className="proj-dash__matrix-axis proj-dash__matrix-axis--y">Task Volume</span>
            <div className="proj-dash__matrix-grid">
              {/* Top-left: Urgent (high priority, high friction) */}
              <div className="proj-dash__matrix-cell proj-dash__matrix-cell--tl">
                <span className="proj-dash__matrix-label">Critical</span>
                <div className="proj-dash__matrix-dots">
                  {byPriority.urgent > 0 && (
                    <span className="proj-dash__matrix-dot" style={{ background: 'var(--pri-urgent)' }}>
                      {byPriority.urgent}
                    </span>
                  )}
                </div>
              </div>
              {/* Top-right: High (top candidates) */}
              <div className="proj-dash__matrix-cell proj-dash__matrix-cell--tr">
                <span className="proj-dash__matrix-label">Top Priority</span>
                <div className="proj-dash__matrix-dots">
                  {byPriority.high > 0 && (
                    <span className="proj-dash__matrix-dot" style={{ background: 'var(--pri-high)' }}>
                      {byPriority.high}
                    </span>
                  )}
                </div>
              </div>
              {/* Bottom-left: Low (deferred) */}
              <div className="proj-dash__matrix-cell proj-dash__matrix-cell--bl">
                <span className="proj-dash__matrix-label">Deferred</span>
                <div className="proj-dash__matrix-dots">
                  {byPriority.low > 0 && (
                    <span className="proj-dash__matrix-dot proj-dash__matrix-dot--sm proj-dash__matrix-dot--muted" style={{ background: 'var(--text3)' }} />
                  )}
                </div>
              </div>
              {/* Bottom-right: Medium (standard) */}
              <div className="proj-dash__matrix-cell proj-dash__matrix-cell--br">
                <span className="proj-dash__matrix-label">Standard</span>
                <div className="proj-dash__matrix-dots">
                  {byPriority.medium > 0 && (
                    <span className="proj-dash__matrix-dot proj-dash__matrix-dot--sm" style={{ background: 'var(--pri-medium)' }} />
                  )}
                </div>
              </div>
            </div>
            <span className="proj-dash__matrix-axis">Priority Level</span>
          </div>
        </div>

        {/* ── 04: Analysis (like TRU-AF4) ── */}
        <div className="proj-dash__card proj-dash__card--activity">
          <div className="proj-dash__card-head">
            <span className="proj-dash__card-num">04</span>
            <span className="proj-dash__card-label">Activity Analysis</span>
          </div>
          <div className="proj-dash__analysis-section">
            <div className="proj-dash__analysis-label">Operational Insights</div>
            <p className="proj-dash__analysis-text">
              {recentlyCreated > 0 || recentlyUpdated > 0 ? (
                <>
                  Activity analysis shows <strong>{recentlyCreated} new task{recentlyCreated !== 1 ? 's' : ''}</strong> created
                  and <strong>{recentlyUpdated} update{recentlyUpdated !== 1 ? 's' : ''}</strong> in the past 7 days.
                  {completed > 0
                    ? ` Completion rate stands at ${pct}% across ${total} total tasks.`
                    : ' No tasks have been completed yet — focus on moving items through the pipeline.'}
                </>
              ) : (
                <>No recent activity detected. Consider reviewing the pipeline to ensure tasks are progressing.</>
              )}
            </p>
          </div>
          <div className="proj-dash__gap-box">
            <div className="proj-dash__gap-title">Coverage Report</div>
            <div className="proj-dash__gap-items">
              {noDueDate > 0 ? (
                <span className="proj-dash__gap-item">
                  <AlertTriangle size={13} style={{ color: 'var(--pri-urgent)', flexShrink: 0 }} />
                  {noDueDate} task{noDueDate !== 1 ? 's' : ''} missing due dates — scheduling gap identified.
                </span>
              ) : (
                <span className="proj-dash__gap-item">
                  <CheckCircle size={13} style={{ color: 'var(--col-done)', flexShrink: 0 }} />
                  All active tasks have due dates assigned.
                </span>
              )}
              {totalSubtasks > 0 ? (
                <span className="proj-dash__gap-item">
                  <CheckCircle size={13} style={{ color: 'var(--col-done)', flexShrink: 0 }} />
                  Subtask coverage: {doneSubtasks}/{totalSubtasks} completed ({subtaskPct}%).
                </span>
              ) : (
                <span className="proj-dash__gap-item">
                  <AlertTriangle size={13} style={{ color: 'var(--pri-high)', flexShrink: 0 }} />
                  No subtasks defined — consider breaking work into smaller steps.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── 05: Audit (like TRU-AF5 — verdict + star ratings) ── */}
        <div className="proj-dash__card proj-dash__card--audit">
          <div className="proj-dash__audit-left">
            <div className="proj-dash__card-head">
              <span className="proj-dash__card-num">05</span>
              <span className="proj-dash__card-label">Project Audit</span>
            </div>
            <div className="proj-dash__verdict-box">
              <div className="proj-dash__verdict-label">Audit Conclusion</div>
              <div className="proj-dash__verdict-value">{verdict}</div>
              <div className="proj-dash__verdict-sub">Health Threshold: {thresholdPct}% Met</div>
            </div>
          </div>
          <div className="proj-dash__audit-right">
            <div className="proj-dash__audit-checks-title">Audited Metrics</div>
            <div className="proj-dash__audit-grid">
              {checks.map((chk, i) => (
                <div key={i} className="proj-dash__audit-item">
                  <div className="proj-dash__audit-item-info">
                    <span className="proj-dash__audit-item-name">{chk.label}</span>
                    <span className="proj-dash__audit-item-sub">{chk.sub}</span>
                  </div>
                  {renderStars(chk.score)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
