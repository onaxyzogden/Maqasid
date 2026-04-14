import { useCallback, useEffect, useMemo, useRef, useState, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutDashboard, Kanban, List, GanttChart, GripVertical, Download, Upload, RefreshCw } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useAppStore } from '../../store/app-store';
import { useProjectStore } from '../../store/project-store';
import BbosRolePicker from '../bbos/BbosRolePicker';
import { PROJECT_COLORS } from '../../data/modules';
import { getBbosTaskDefsByStage } from '@data/bbos/bbos-task-definitions';
import { BBOS_NAV_LEVELS, BBOS_LAYERS, getBbosNavPillars, getLayerForStage } from '@data/bbos/bbos-pipeline';
import { downloadStageBundleTemplate, validateStageBundleTemplate, importStageBundleTemplate } from '@services/bbos-template';
import DashboardView from './DashboardView';
import KanbanBoard from './KanbanBoard';
import ListView from './ListView';
import GanttView from './GanttView';
import TaskDetailPanel from './TaskDetailPanel';
import FilterBar from './FilterBar';
import LevelNavigator from '../shared/LevelNavigator';

/**
 * Reusable board component that renders the full Kanban/List/Gantt experience
 * for any project. Used by both Project.jsx and the Faith board pages.
 */
export default function ProjectBoard({ projectId, project, hideBbos = false, hideFilter = false, hideViewSwitcher = false, inlinePanel = false }) {
  const taskStore = useTaskStore();
  const loadTasks = taskStore.loadTasks;
  const filters = useAppStore((s) => s.filters[projectId]);
  const setActiveBbosStage = useAppStore((s) => s.setActiveBbosStage);
  const clearActiveBbosStage = useAppStore((s) => s.clearActiveBbosStage);
  const setBbosRole = useProjectStore((s) => s.setBbosRole);
  const startNewBbosCycle = useProjectStore((s) => s.startNewBbosCycle);
  const advanceBbosStage = useProjectStore((s) => s.advanceBbosStage);
  const updateProject = useProjectStore((s) => s.updateProject);
  const [view, setView] = useState(project?.defaultView || 'dashboard');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const colorPickerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [draggable, setDraggable] = useState(false);
  const [bbosFilter, setBbosFilter] = useState(project?.bbosStage || 'FND');
  const stageBundleUploadRef = useRef(null);

  useEffect(() => {
    if (projectId) loadTasks(projectId);
  }, [projectId]);

  // Auto-open task from URL ?task= param
  useEffect(() => {
    const taskParam = searchParams.get('task');
    if (taskParam) {
      setSelectedTaskId(taskParam);
      searchParams.delete('task');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams]);

  useEffect(() => {
    if (project?.bbosEnabled) setActiveBbosStage(bbosFilter);
    return () => clearActiveBbosStage();
  }, [project?.bbosEnabled, bbosFilter]);

  useEffect(() => {
    if (!colorPickerOpen) return;
    const handler = (e) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) setColorPickerOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [colorPickerOpen]);

  const isBbos = project?.bbosEnabled && !hideBbos;

  const activeLayer = isBbos ? getLayerForStage(bbosFilter) : null;
  const activePillars = useMemo(() => isBbos ? getBbosNavPillars(activeLayer) : [], [activeLayer, isBbos]);
  const doneCol = isBbos ? project?.columns?.find((c) => c.name === 'Done')?.id : null;
  const todoCol = isBbos ? project?.columns?.find((c) => c.name === 'To Do')?.id : null;

  const bbosPillarTasks = useMemo(() => {
    if (!isBbos) return null;
    const tasks = taskStore.tasksByProject[projectId] || [];
    const result = {};
    for (const p of activePillars) {
      const validIds = new Set(getBbosTaskDefsByStage(p.id).map((d) => d.id));
      result[p.id] = tasks
        .filter((t) => t.bbosTaskType && validIds.has(t.bbosTaskType))
        .sort((a, b) => (a.seedOrder ?? 999) - (b.seedOrder ?? 999));
    }
    return result;
  }, [taskStore.tasksByProject[projectId], activePillars, isBbos]);

  const pillarProgress = useMemo(() => {
    if (!isBbos) return null;
    const tasks = taskStore.tasksByProject[projectId] || [];
    const result = {};
    for (const p of activePillars) {
      const stageDefs = getBbosTaskDefsByStage(p.id);
      const done = stageDefs.filter((d) => {
        const t = tasks.find((t) => t.bbosTaskType === d.id);
        return t && (t.columnId === doneCol || t.completedAt);
      }).length;
      result[p.id] = stageDefs.length > 0 ? Math.round((done / stageDefs.length) * 100) : 0;
    }
    return result;
  }, [taskStore.tasksByProject[projectId], activePillars, isBbos, doneCol]);

  const handleStageAdvance = useCallback(() => {
    const currentIdx = BBOS_STAGES.findIndex((s) => s.id === bbosFilter);
    const next = BBOS_STAGES[currentIdx + 1] ?? null;
    if (next) {
      advanceBbosStage(projectId, next.id);
      setBbosFilter(next.id);
      setActiveBbosStage(next.id);
    } else {
      if (confirm('All stages complete. Start a new BBOS cycle? This will reset the pipeline to Identity (FND).')) {
        startNewBbosCycle(projectId);
        setBbosFilter('FND');
        setActiveBbosStage('FND');
      }
    }
  }, [bbosFilter, projectId, advanceBbosStage, setBbosFilter, setActiveBbosStage, startNewBbosCycle]);

  const handleStageSelect = useCallback((stageId) => {
    setBbosFilter(stageId);
    setActiveBbosStage(stageId);
  }, [setBbosFilter, setActiveBbosStage]);

  const bbosTaskColorFn = useCallback((task) => {
    if (task.columnId === doneCol || task.completedAt) return '#22c55e';
    if (task.columnId !== todoCol) return '#F59E0B';
    const fd = task.bbosFieldData;
    const hasProgress = fd && Object.entries(fd).some(
      ([k, v]) => !k.startsWith('_') && v !== undefined && v !== null && String(v).trim() !== ''
    );
    if (hasProgress) return '#F59E0B';
    return 'var(--bg3)';
  }, [doneCol, todoCol]);

  if (!project) return null;

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

  const mergedFilters = isBbos
    ? { ...filters, bbosStage: bbosFilter }
    : hideBbos && project.bbosEnabled
      ? { ...filters, excludeBbos: true }
      : filters;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Unified header: project info + BBOS actions + view switcher */}
      {!hideViewSwitcher && <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 'var(--space-3)', marginBottom: 'var(--space-2)', flexShrink: 0,
      }}>
        {/* Left: project color + BBOS info + stage bundle actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div ref={colorPickerRef} style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setColorPickerOpen((v) => !v)}
              title="Change project color"
              style={{
                width: 12, height: 12, borderRadius: 3, background: project.color,
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'transform var(--duration) var(--ease)',
                transform: colorPickerOpen ? 'scale(1.4)' : 'scale(1)',
              }}
            />
            {colorPickerOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 50,
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4,
                padding: 6, background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-lg)',
              }}>
                {PROJECT_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => { updateProject(projectId, { color: c }); setColorPickerOpen(false); }}
                    style={{
                      width: 18, height: 18, borderRadius: 3, background: c,
                      border: c === project.color ? '2px solid var(--text)' : '2px solid transparent',
                      padding: 0, cursor: 'pointer',
                      transition: 'transform var(--duration) var(--ease)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.2)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                ))}
              </div>
            )}
          </div>
          {isBbos && (
            <>
              <span style={{
                fontSize: '0.68rem', fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-xs)',
                background: 'color-mix(in srgb, #c9a05a 10%, transparent)',
                color: '#c9a05a', border: '1px solid color-mix(in srgb, #c9a05a 20%, transparent)',
                whiteSpace: 'nowrap',
              }}>
                BBOS Cycle {project.bbosCycle || 1}
              </span>
              <BbosRolePicker
                value={project.bbosRole || 'all'}
                onChange={(roleId) => setBbosRole(projectId, roleId)}
              />
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
              {project.bbosStage === 'OPT' && (
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: '0.8rem', color: '#c9a05a', display: 'flex', alignItems: 'center', gap: 4 }}
                  onClick={() => { if (confirm('Start a new BBOS cycle? This resets the pipeline to Foundation (FND).')) startNewBbosCycle(projectId); }}
                  title="Complete this cycle and start a new one from Foundation"
                >
                  <RefreshCw size={14} /> New Cycle
                </button>
              )}
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
      </div>}

      {/* Scrollable area — LevelNavigator scrolls with content in dashboard view */}
      <div style={{
        flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
        ...(view === 'dashboard' ? {
          overflowY: 'auto',
          marginRight: 'calc(-1 * var(--space-6))',
          paddingRight: 'var(--space-6)',
        } : {}),
      }}>
        {/* BBOS Stage Navigator — layer carousel with stage segments */}
        {isBbos && (
          <LevelNavigator
            compact
            levels={BBOS_NAV_LEVELS}
            pillars={activePillars}
            pillarTasks={bbosPillarTasks}
            pillarProgress={pillarProgress}
            controlledLevel={activeLayer}
            onLevelChange={(layerKey) => {
              const first = BBOS_LAYERS.find((l) => l.id === layerKey)?.stages[0];
              if (first) { setBbosFilter(first); setActiveBbosStage(first); }
            }}
            onSegmentClick={(stageId) => {
              setBbosFilter(stageId);
              setActiveBbosStage(stageId);
            }}
            onSubsegClick={(taskId) => setSelectedTaskId(taskId)}
            taskColorFn={bbosTaskColorFn}
            currentPillarId={bbosFilter}
          />
        )}

        {/* Filter Bar */}
        {!hideFilter && <FilterBar projectId={projectId} />}

        {/* Content */}
        <div style={{ flex: 1, minHeight: view === 'dashboard' ? undefined : 0, display: 'flex' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {view === 'dashboard' ? (
              <DashboardView project={project} bbosFilter={isBbos ? bbosFilter : null} onSelectTask={setSelectedTaskId} selectedTaskId={inlinePanel ? selectedTaskId : null} onStageAdvance={isBbos ? handleStageAdvance : undefined} onStageSelect={isBbos ? handleStageSelect : undefined} />
            ) : view === 'board' ? (
              <KanbanBoard project={project} onSelectTask={setSelectedTaskId} selectedTaskId={selectedTaskId} filters={mergedFilters} bbosFilter={isBbos ? bbosFilter : null} bbosRole={project.bbosRole || 'all'} draggable={draggable} />
            ) : view === 'gantt' ? (
              <GanttView project={project} onSelectTask={setSelectedTaskId} filters={mergedFilters} bbosRole={project.bbosRole || 'all'} bbosFilter={isBbos ? bbosFilter : null} />
            ) : (
              <ListView project={project} onSelectTask={setSelectedTaskId} filters={mergedFilters} bbosRole={project.bbosRole || 'all'} bbosFilter={isBbos ? bbosFilter : null} />
            )}
          </div>

          {!inlinePanel && selectedTaskId && (
            <TaskDetailPanel
              project={project}
              projectId={projectId}
              taskId={selectedTaskId}
              onClose={() => setSelectedTaskId(null)}
              bbosRole={project.bbosRole || 'all'}
            />
          )}
        </div>
      </div>
    </div>
  );
}
