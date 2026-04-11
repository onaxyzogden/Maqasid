import { useEffect, useMemo, useRef, useState } from 'react';
import { LayoutDashboard, Kanban, List, GanttChart, GripVertical, Download, Upload } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useAppStore } from '../../store/app-store';
import { getBbosTaskDefsByStage } from '@data/bbos/bbos-task-definitions';
import { downloadStageBundleTemplate, validateStageBundleTemplate, importStageBundleTemplate } from '@services/bbos-template';
import DashboardView from './DashboardView';
import KanbanBoard from './KanbanBoard';
import ListView from './ListView';
import GanttView from './GanttView';
import TaskDetailPanel from './TaskDetailPanel';
import FilterBar from './FilterBar';
import BbosPipelineHeader from '../bbos/BbosPipelineHeader';

/**
 * Reusable board component that renders the full Kanban/List/Gantt experience
 * for any project. Used by both Project.jsx and the Faith board pages.
 */
export default function ProjectBoard({ projectId, project, hideBbos = false }) {
  const taskStore = useTaskStore();
  const loadTasks = taskStore.loadTasks;
  const filters = useAppStore((s) => s.filters[projectId]);
  const setActiveBbosStage = useAppStore((s) => s.setActiveBbosStage);
  const clearActiveBbosStage = useAppStore((s) => s.clearActiveBbosStage);
  const [view, setView] = useState(project?.defaultView || 'dashboard');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [draggable, setDraggable] = useState(false);
  const [bbosFilter, setBbosFilter] = useState(project?.bbosStage || 'FND');
  const stageBundleUploadRef = useRef(null);

  useEffect(() => {
    if (projectId) loadTasks(projectId);
  }, [projectId]);

  useEffect(() => {
    if (project?.bbosEnabled) setActiveBbosStage(bbosFilter);
    return () => clearActiveBbosStage();
  }, [project?.bbosEnabled]);

  if (!project) return null;

  const isBbos = project.bbosEnabled && !hideBbos;

  const handleStageDownload = () => {
    const stageDefs = getBbosTaskDefsByStage(bbosFilter);
    const existingTasks = taskStore.tasksByProject[projectId] || [];
    downloadStageBundleTemplate(bbosFilter, stageDefs, existingTasks);
  };

  const handleStageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        const validation = validateStageBundleTemplate(json, bbosFilter);
        if (!validation.valid) {
          alert('Bundle validation failed:\n' + validation.errors.join('\n'));
          return;
        }
        const items = importStageBundleTemplate(json);
        const existingTasks = taskStore.tasksByProject[projectId] || [];
        let count = 0;
        for (const { taskType, fieldData, gLabel } of items) {
          const task = existingTasks.find((t) => t.bbosTaskType === taskType);
          if (!task) continue;
          const nonEmpty = Object.fromEntries(
            Object.entries(fieldData).filter(([, v]) => v !== '')
          );
          if (Object.keys(nonEmpty).length > 0 || gLabel) {
            taskStore.updateTask(projectId, task.id, {
              bbosFieldData: { ...task.bbosFieldData, ...nonEmpty },
              ...(gLabel ? { gLabel } : {}),
            });
            count++;
          }
        }
        alert(`Stage bundle imported: ${count} task(s) updated.`);
      } catch (err) {
        alert('Bundle import failed: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };
  const stageStatusMap = useMemo(() => {
    if (!isBbos) return {};
    const tasks = taskStore.tasksByProject[projectId] || [];
    const doneCol = project.columns?.find((c) => c.name === 'Done')?.id;
    const acc = {};
    for (const t of tasks) {
      if (!t.bbosTaskType) continue;
      const stageId = t.bbosTaskType.split('-')[0];
      if (!acc[stageId]) acc[stageId] = { hasData: false, allDone: true };
      const fd = t.bbosFieldData || {};
      if (Object.values(fd).some((v) => (typeof v === 'string' ? v.trim() : !!v))) {
        acc[stageId].hasData = true;
      }
      if (!doneCol || t.columnId !== doneCol) acc[stageId].allDone = false;
    }
    const result = {};
    for (const [id, s] of Object.entries(acc)) {
      result[id] = !s.hasData ? 'empty' : s.allDone ? 'complete' : 'active';
    }
    return result;
  }, [taskStore.tasksByProject[projectId], project.columns, isBbos]);

  const mergedFilters = isBbos
    ? { ...filters, bbosStage: bbosFilter }
    : hideBbos && project.bbosEnabled
      ? { ...filters, excludeBbos: true }
      : filters;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* View toggle + BBOS actions */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 'var(--space-3)', marginBottom: 'var(--space-2)', flexShrink: 0,
      }}>
        {/* Left: stage bundle actions (BBOS only) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
          {isBbos && (
            <>
              <button
                onClick={handleStageDownload}
                className="btn btn-ghost"
                title={`Download ${bbosFilter} stage bundle`}
                style={{
                  padding: 'var(--space-1) var(--space-2)', fontSize: '0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: 'transparent', color: 'var(--text3)',
                  border: '1px solid var(--border)',
                }}
              >
                <Download size={13} />
                <span>Download <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', letterSpacing: '0.04em' }}>{bbosFilter}</span></span>
              </button>
              <button
                onClick={() => stageBundleUploadRef.current?.click()}
                className="btn btn-ghost"
                title={`Upload ${bbosFilter} stage bundle`}
                style={{
                  padding: 'var(--space-1) var(--space-2)', fontSize: '0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: 'transparent', color: 'var(--text3)',
                  border: '1px solid var(--border)',
                }}
              >
                <Upload size={13} />
                <span>Upload <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', letterSpacing: '0.04em' }}>{bbosFilter}</span></span>
              </button>
              <input
                ref={stageBundleUploadRef}
                type="file"
                accept=".json,.bbos"
                style={{ display: 'none' }}
                onChange={handleStageUpload}
              />
            </>
          )}
        </div>
        {/* Right: view switcher + drag toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)', background: 'var(--bg3)', borderRadius: 'var(--radius)', padding: 2 }}>
          <button
            onClick={() => setView('dashboard')}
            className="btn btn-ghost"
            style={{
              padding: 'var(--space-1) var(--space-3)', fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: view === 'dashboard' ? 'var(--surface)' : 'transparent',
              boxShadow: view === 'dashboard' ? 'var(--shadow-xs)' : 'none',
              color: view === 'dashboard' ? 'var(--text)' : 'var(--text2)',
            }}
          >
            <LayoutDashboard size={14} /> Dashboard
          </button>
          <button
            onClick={() => setView('board')}
            className="btn btn-ghost"
            style={{
              padding: 'var(--space-1) var(--space-3)', fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: view === 'board' ? 'var(--surface)' : 'transparent',
              boxShadow: view === 'board' ? 'var(--shadow-xs)' : 'none',
              color: view === 'board' ? 'var(--text)' : 'var(--text2)',
            }}
          >
            <Kanban size={14} /> Board
          </button>
          <button
            onClick={() => setView('list')}
            className="btn btn-ghost"
            style={{
              padding: 'var(--space-1) var(--space-3)', fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: view === 'list' ? 'var(--surface)' : 'transparent',
              boxShadow: view === 'list' ? 'var(--shadow-xs)' : 'none',
              color: view === 'list' ? 'var(--text)' : 'var(--text2)',
            }}
          >
            <List size={14} /> List
          </button>
          <button
            onClick={() => setView('gantt')}
            className="btn btn-ghost"
            style={{
              padding: 'var(--space-1) var(--space-3)', fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: view === 'gantt' ? 'var(--surface)' : 'transparent',
              boxShadow: view === 'gantt' ? 'var(--shadow-xs)' : 'none',
              color: view === 'gantt' ? 'var(--text)' : 'var(--text2)',
            }}
          >
            <GanttChart size={14} /> Gantt
          </button>
        </div>
        {view === 'board' && (
          <button
            onClick={() => setDraggable((d) => !d)}
            className="btn btn-ghost"
            style={{
              padding: 'var(--space-1) var(--space-3)', fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: draggable ? 'var(--primary-bg)' : 'transparent',
              color: draggable ? 'var(--primary)' : 'var(--text3)',
              border: draggable ? '1px solid var(--primary)' : '1px solid var(--border)',
            }}
            title={draggable ? 'Lock order' : 'Enable drag'}
          >
            <GripVertical size={14} />
          </button>
        )}
        </div>
      </div>

      {/* BBOS Pipeline Header — stage filter */}
      {isBbos && (
        <BbosPipelineHeader
          currentStageId={project.bbosStage}
          activeFilter={bbosFilter}
          bbosRole={project.bbosRole || 'all'}
          stageStatusMap={stageStatusMap}
          onStageClick={(stageId) => {
            setBbosFilter(stageId);
            setActiveBbosStage(stageId);
          }}
        />
      )}

      {/* Filter Bar */}
      <FilterBar projectId={projectId} />

      {/* Content */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {view === 'dashboard' ? (
            <DashboardView project={project} bbosFilter={isBbos ? bbosFilter : null} onSelectTask={setSelectedTaskId} />
          ) : view === 'board' ? (
            <KanbanBoard project={project} onSelectTask={setSelectedTaskId} selectedTaskId={selectedTaskId} filters={mergedFilters} bbosFilter={isBbos ? bbosFilter : null} bbosRole={project.bbosRole || 'all'} draggable={draggable} />
          ) : view === 'gantt' ? (
            <GanttView project={project} onSelectTask={setSelectedTaskId} filters={mergedFilters} />
          ) : (
            <ListView project={project} onSelectTask={setSelectedTaskId} filters={mergedFilters} />
          )}
        </div>

        {selectedTaskId && (
          <TaskDetailPanel
            project={project}
            projectId={projectId}
            taskId={selectedTaskId}
            onClose={() => setSelectedTaskId(null)}
          />
        )}
      </div>
    </div>
  );
}
