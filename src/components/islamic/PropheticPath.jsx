import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Moon,
  Sparkles,
  Sunrise,
  Briefcase,
  Sun,
  SunMedium,
  Sunset,
  HardHat,
  ArrowRight,
  BookOpen,
  Play,
} from 'lucide-react';
import { useSettingsStore } from '@store/settings-store';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { useThresholdStore } from '@store/threshold-store';
import { usePrayerTimes } from '@hooks/usePrayerTimes';
import { MODULES, PRIORITIES } from '@data/modules';
import { MAQASID_PILLARS } from '@data/maqasid';
import {
  buildTasksForNode,
  buildUserProjectsForScope,
  getModuleGroups,
  inferNodeFromHour,
  submodulesForNode,
  LEVEL_LABEL,
  LEVEL_FULL_LABEL,
} from '@data/prophetic-path-submodules';
import {
  getSubmoduleDisplayLabel,
  getSubmodulePillarColor,
  getPillarSubmoduleIds,
} from '@data/submodule-registry';
import DashboardTaskCard from '@components/shared/DashboardTaskCard';
import TaskDetailPanel from '@components/work/TaskDetailPanel';
import ProjectSlideUp from '@components/work/ProjectSlideUp';
import SubmoduleSlideUp from './SubmoduleSlideUp';
import PrayerSlideUp from './PrayerSlideUp';
import './PropheticPath.css';

// Maqasid level → accent colour (mirrors PillarLevelDashboard.LEVEL_COLORS).
const LEVEL_COLOR = { 1: '#C8A96E', 2: '#4ab8a8', 3: '#8b5cf6' };

// Resolve a pillar-chip label to its canonical Maqasid accent color.
// NODES uses a mix of `sidebarLabel` (Faith/Life/…), `id` (e.g. 'ummah'), and
// editorial labels (e.g. 'Soul'). We try each lookup and return null for
// unmatched labels so the chip falls back to its `data-tone` styling.
const _PILLAR_ACCENT_BY_KEY = (() => {
  const out = {};
  for (const p of MAQASID_PILLARS) {
    out[p.id.toLowerCase()] = p.accentColor;
    if (p.sidebarLabel) out[p.sidebarLabel.toLowerCase()] = p.accentColor;
    if (p.universalLabel) out[p.universalLabel.toLowerCase()] = p.accentColor;
  }
  // "Ummah" is used in NODES even though the canonical sidebarLabel is
  // "Community". Alias it here for parity with the rest of the codebase.
  out['ummah'] = out['community'] || null;
  return out;
})();
function resolvePillarAccent(label) {
  if (!label) return null;
  return _PILLAR_ACCENT_BY_KEY[label.toLowerCase()] || null;
}

// Nodes that open the PrayerSlideUp (Before/During/After tabs) instead of
// toggling inline satellite expansion. Tahajjud is included per the
// "all prayer-like nodes" decision, even though it lacks a standard window.
const PRAYER_NODE_IDS = new Set(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud']);

// Nodes whose Before/After satellites trigger the opening/closing Threshold
// modal instead of expanding the inline MirrorCard. The weekly-cadence tasks
// that used to surface here live in the new `weekly_{moduleId}` boards
// (see ensureWeeklyProjects in project-store.js).
const THRESHOLD_TRIGGER_NODES = new Set(['midday-labor', 'morning']);
// Morning has no moduleGroups; default to the `work` ceremony module.
const DEFAULT_THRESHOLD_MODULE_BY_NODE = { morning: 'work' };

// Map each timeline node to the Aladhan `timings` key it anchors on.
// Aladhan returns Fajr, Sunrise, Dhuhr, Asr, Sunset, Maghrib, Isha, Imsak,
// Midnight, Firstthird, Lastthird — we consume the five salawat plus
// Sunrise / Lastthird for the transition nodes.
// `offsetMin` shifts a labor/transition node's *effective* anchor forward from
// its prayer key (only used for active/next/past math; the displayed time is
// still the raw prayer time). Without this, midday-labor would tie with dhuhr
// and never become active. 15 min mirrors PHASE_DURING_MIN in the right rail.
const NODE_TIMING = {
  isha:           { key: 'Isha',      label: null },
  tahajjud:       { key: 'Lastthird', label: 'Last Third' },
  fajr:           { key: 'Fajr',      label: null },
  morning:        { key: 'Sunrise',   label: 'Sunrise' },
  dhuhr:          { key: 'Dhuhr',     label: null },
  'midday-labor': { key: 'Dhuhr',     label: 'After Dhuhr', offsetMin: 15 },
  asr:            { key: 'Asr',       label: null },
  maghrib:        { key: 'Maghrib',   label: null },
};

function effectiveAnchorMs(spec, timings, today) {
  const ms = timeToMs(timings[spec.key], today);
  if (ms == null) return null;
  return ms + (spec.offsetMin ?? 0) * 60_000;
}

// Canonical ordering used for past/upcoming calculation.
const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function stripTz(str) {
  return typeof str === 'string' ? str.replace(/\s*\(.*\)/, '') : '';
}

function formatTime12(raw) {
  const clean = stripTz(raw);
  if (!/^\d{1,2}:\d{2}/.test(clean)) return '';
  const [hh, mm] = clean.split(':').map(Number);
  const period = hh >= 12 ? 'PM' : 'AM';
  const h12 = ((hh + 11) % 12) + 1;
  return `${h12}:${String(mm).padStart(2, '0')} ${period}`;
}

function timeToMs(raw, today) {
  const clean = stripTz(raw);
  if (!/^\d{1,2}:\d{2}/.test(clean)) return null;
  const [h, m] = clean.split(':').map(Number);
  const d = new Date(today);
  d.setHours(h, m, 0, 0);
  return d.getTime();
}

// Compute the nodeId whose anchor time is soonest in the future, wrapping
// around midnight. Tahajjud at 03:00 beats Fajr at 05:00 when now is 02:35.
// Returns null if no node has a usable anchor time.
// Compute the node whose anchor is the most-recent past anchor — i.e. now
// sits inside [thisNodeAnchor, nextNodeAnchor). Applies to all 8 nodes so
// Tahajjud / Morning / Midday-Labor can be 'active' during their window.
function computeActiveNodeId(timings) {
  if (!timings) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const ONE_DAY = 24 * 60 * 60 * 1000;
  let bestId = null;
  let bestDiff = Infinity;
  for (const [nodeId, spec] of Object.entries(NODE_TIMING)) {
    const ms = effectiveAnchorMs(spec, timings, today);
    if (ms == null) continue;
    let diff = now.getTime() - ms;
    if (diff < 0) diff += ONE_DAY; // anchor later today → count as yesterday's occurrence
    if (diff < bestDiff) {
      bestDiff = diff;
      bestId = nodeId;
    }
  }
  return bestId;
}

function computeNextNodeId(timings) {
  if (!timings) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const ONE_DAY = 24 * 60 * 60 * 1000;
  let bestId = null;
  let bestDiff = Infinity;
  for (const [nodeId, spec] of Object.entries(NODE_TIMING)) {
    const ms = effectiveAnchorMs(spec, timings, today);
    if (ms == null) continue;
    let diff = ms - now.getTime();
    if (diff <= 0) diff += ONE_DAY; // already passed today → tomorrow's occurrence
    if (diff < bestDiff) {
      bestDiff = diff;
      bestId = nodeId;
    }
  }
  return bestId;
}

// For a given node + timings snapshot, return { time, state } where state is
// 'active' | 'next' | 'past' | 'upcoming' | null. 'active' is driven by the
// hook's activePrayer (canonical 5 only). 'next' is computed locally across
// ALL nodes so Tahajjud / Morning / Midday-Labor can take the next slot.
function deriveNodeTiming(nodeId, timings, activeNodeId, nextNodeId) {
  const spec = NODE_TIMING[nodeId];
  if (!spec || !timings) return { time: '', label: spec?.label || null, state: null };
  const raw = timings[spec.key];
  const time = formatTime12(raw);
  const today = new Date();
  const anchorMs = effectiveAnchorMs(spec, timings, today);

  let state = null;
  if (nodeId === activeNodeId) {
    state = 'active';
  } else if (nodeId === nextNodeId) {
    const leadMs = anchorMs != null ? anchorMs - Date.now() : Infinity;
    state = leadMs > 0 && leadMs <= 10 * 60 * 1000 ? 'next-soon' : 'next';
  } else if (anchorMs != null) {
    state = anchorMs < Date.now() ? 'past' : 'upcoming';
  }

  return { time, label: spec.label, state };
}

function statusLabel(s) {
  return s === 'done' ? 'Done' : s === 'in-progress' ? 'In Progress' : 'To Do';
}

function deriveStatus(task) {
  const cols = task._project?.columns || [];
  const doneCol = cols.find((c) => c.id.endsWith('_done'))?.id;
  const progressCol = cols.find((c) => c.id.endsWith('_progress'))?.id;
  if (task.columnId === doneCol) return 'done';
  if (task.columnId === progressCol) return 'in-progress';
  return 'todo';
}

function formatDue(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const days = Math.ceil((d - now) / 86400000);
  if (days < 0) return { text: 'Overdue', colorVar: 'var(--danger)' };
  if (days === 0) return { text: 'Today', colorVar: 'var(--warning)' };
  if (days <= 3) return { text: `${days}d`, colorVar: 'var(--warning)' };
  return { text: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }), colorVar: 'var(--text3)' };
}

const NODES = [
  {
    id: 'maghrib',
    cardStyle: 'primary',
    eyebrow: 'Sunset',
    eyebrowTone: 'primary',
    title: 'Maghrib Prayers',
    titleTone: 'on-surface',
    body: 'Transitioning from work to family. The close of the active day.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Family', tone: 'secondary' },
    ],
    Icon: Sunset,
    markerTone: 'primary',
  },
  {
    id: 'isha',
    cardStyle: 'muted',
    eyebrow: 'Late Night',
    eyebrowTone: 'variant',
    title: 'Isha & Rest',
    titleTone: 'on-surface',
    body: 'Preparation for the final third of the night. A time of stillness and surrender.',
    pillars: [{ label: 'Faith', tone: 'secondary' }],
    Icon: Moon,
    markerTone: 'muted',
  },
  {
    id: 'tahajjud',
    cardStyle: 'divine',
    eyebrow: 'Divine Moment',
    eyebrowTone: 'tertiary',
    title: 'Tahajjud',
    titleTone: 'tertiary',
    body: 'The sacred dialogue in the depths of night. Seeking profound guidance.',
    pillars: [
      { label: 'Soul', tone: 'tertiary' },
      { label: 'Faith', tone: 'tertiary' },
    ],
    Icon: Sparkles,
    markerTone: 'tertiary',
    pulse: true,
  },
  {
    id: 'fajr',
    cardStyle: 'primary',
    eyebrow: 'Dawn',
    eyebrowTone: 'primary',
    title: 'Fajr Prayers',
    titleTone: 'on-surface',
    body: 'The start of the spiritual day. Greeting the light with remembrance.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Life', tone: 'secondary' },
    ],
    Icon: Sunrise,
    markerTone: 'primary',
  },
  {
    id: 'morning',
    cardStyle: 'subtle',
    eyebrow: 'Morning',
    eyebrowTone: 'secondary',
    title: 'Official Start of Day',
    titleTone: 'on-surface',
    body: 'Engagement with the world. Productivity, work, and social affairs.',
    pillars: [
      { label: 'Intellect', tone: 'secondary' },
      { label: 'Wealth', tone: 'secondary' },
    ],
    Icon: Briefcase,
    markerTone: 'secondary',
  },
  {
    id: 'dhuhr',
    cardStyle: 'primary',
    eyebrow: 'Mid-day',
    eyebrowTone: 'primary',
    title: 'Dhuhr Prayers',
    titleTone: 'on-surface',
    body: 'A spiritual reset amidst the hustle. Realignment with primary purpose.',
    pillars: [{ label: 'Faith', tone: 'primary' }],
    Icon: Sun,
    markerTone: 'primary',
  },
  {
    id: 'midday-labor',
    cardStyle: 'subtle',
    eyebrow: 'Midday Labor',
    eyebrowTone: 'secondary',
    title: 'Livelihood & Stewardship',
    titleTone: 'on-surface',
    body: 'The post-Dhuhr execution window. Earning rizq with ihsan and serving the community that surrounds the work.',
    pillars: [
      { label: 'Wealth', tone: 'secondary' },
      { label: 'Ummah', tone: 'secondary' },
    ],
    Icon: HardHat,
    markerTone: 'secondary',
  },
  {
    id: 'asr',
    cardStyle: 'primary-flat',
    eyebrow: 'Afternoon',
    eyebrowTone: 'primary',
    title: 'Asr Prayers',
    titleTone: 'on-surface',
    body: 'Continued focus and wrapping up daily worldly duties.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Life', tone: 'secondary' },
    ],
    Icon: SunMedium,
    markerTone: 'primary',
  },
];

function PPTaskCard({ task, index, onSelectTask }) {
  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const status = deriveStatus(task);
  const levelColor = LEVEL_COLOR[task._level] || LEVEL_COLOR[3];
  const subtaskTotal = task.subtasks?.length || 0;
  const subtaskDone = subtaskTotal > 0 ? task.subtasks.filter((s) => s.done).length : 0;

  return (
    <DashboardTaskCard
      taskId={task.id}
      index={index}
      title={task.title}
      span={12}
      status={status}
      accentColor={levelColor}
      statusTint={status === 'in-progress'
        ? { background: 'color-mix(in srgb, #F59E0B 12%, var(--surface))' }
        : undefined}
      onSelectTask={onSelectTask}
      chips={[
        {
          label: `${LEVEL_LABEL[task._level]} · ${LEVEL_FULL_LABEL[task._level]}`,
          className: 'dtc__chip',
          style: { background: `color-mix(in srgb, ${levelColor} 14%, transparent)`, color: levelColor },
        },
        { label: statusLabel(status), className: `dtc__chip dtc__chip--status-${status}` },
        ...(priority ? [{
          label: priority.label,
          className: 'dtc__chip dtc__chip--priority',
          style: { background: priority.bg, color: priority.color },
        }] : []),
      ]}
      subtasks={subtaskTotal > 0
        ? { done: subtaskDone, total: subtaskTotal, color: levelColor }
        : undefined}
      dueDate={formatDue(task.dueDate)}
      tags={[task._submoduleName, ...(task.tags?.slice(1) || [])]}
    />
  );
}

function ProjectRow({ project, onClick }) {
  return (
    <button type="button" className="pp-project-row" onClick={() => onClick(project.id)}>
      <span className="pp-project-row__swatch" style={{ background: project.color || '#70d8c8' }} aria-hidden="true" />
      <span className="pp-project-row__name">{project.name}</span>
      <ArrowRight size={14} strokeWidth={2} className="pp-project-row__chev" />
    </button>
  );
}

function EducationList({ nodeId, moduleId, onSelectSubmodule }) {
  // Prefer the pillar's canonical submodule list (e.g., Wealth → all 4) when
  // moduleId is a registered pillar. Fall back to the node's moduleGroup scope
  // for non-pillar groups like 'community'.
  const pillarSubs = getPillarSubmoduleIds(moduleId);
  const submoduleIds = pillarSubs.length > 0 ? pillarSubs : submodulesForNode(nodeId, moduleId);
  if (!submoduleIds || submoduleIds.length === 0) {
    return <p className="pp-mirror-empty">No submodules for this window.</p>;
  }
  return (
    <div className="pp-project-list">
      {submoduleIds.map((id) => {
        const label = getSubmoduleDisplayLabel(id, id);
        const color = getSubmodulePillarColor(id);
        return (
          <button
            key={id}
            type="button"
            className="pp-project-row"
            onClick={() => onSelectSubmodule?.(id, label)}
          >
            <span
              className="pp-project-row__swatch"
              aria-hidden="true"
              style={{ background: color }}
            />
            <span className="pp-project-row__name">{label}</span>
            <ArrowRight size={14} strokeWidth={2} className="pp-project-row__chev" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

function MirrorCard({
  node,
  tasks,
  projects,
  onSelectTask,
  onSelectProject,
  onSelectSubmodule,
  phaseLabel = 'Now',
  viewMode,
  moduleGroups,
  moduleId,
  onViewMode,
  onModuleId,
  showProjects,
}) {
  return (
    <aside className="pp-mirror-card">
      <div className="pp-mirror-header">
        <span className="pp-mirror-eyebrow">{phaseLabel} · {node.eyebrow}</span>
        <h4 className="pp-mirror-title">{node.title}</h4>
        <div className="pp-mirror-toggles">
          {moduleGroups && moduleGroups.length > 1 && (
            <div className="pp-pill-switch" role="tablist" aria-label="Module">
              {moduleGroups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={moduleId === g.id}
                  className="pp-pill-switch__btn"
                  data-active={moduleId === g.id || undefined}
                  onClick={() => onModuleId(g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}
          <div className="pp-pill-switch" role="tablist" aria-label="View">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'action'}
              className="pp-pill-switch__btn"
              data-active={viewMode === 'action' || undefined}
              onClick={() => onViewMode('action')}
            >
              <Play size={12} strokeWidth={2.25} />
              Action
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'education'}
              className="pp-pill-switch__btn"
              data-active={viewMode === 'education' || undefined}
              onClick={() => onViewMode('education')}
            >
              <BookOpen size={12} strokeWidth={2.25} />
              Education
            </button>
          </div>
        </div>
      </div>
      {viewMode === 'education' ? (
        <EducationList nodeId={node.id} moduleId={moduleId} onSelectSubmodule={onSelectSubmodule} />
      ) : showProjects ? (
        (projects || []).length === 0 ? (
          <p className="pp-mirror-empty">No projects in this scope yet.</p>
        ) : (
          <div className="pp-project-list">
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} onClick={onSelectProject} />
            ))}
          </div>
        )
      ) : (tasks.length === 0 ? (
        <p className="pp-mirror-empty">No tasks queued for this window.</p>
      ) : (
        <div className="pp-task-list">
          {tasks.map((t, i) => (
            <PPTaskCard
              key={t.id}
              task={t}
              index={i}
              onSelectTask={onSelectTask}
            />
          ))}
        </div>
      ))}
      <Link to="/app/work" className="pp-mirror-footer">
        <span>View all in Work</span>
        <ArrowRight size={14} strokeWidth={2} />
      </Link>
    </aside>
  );
}

function TimelineNode({
  node,
  expandedSlot,
  onToggle,
  projects,
  tasksByProject,
  submoduleNameById,
  onSelectTask,
  onSelectProject,
  onSelectSubmodule,
  onOpenPrayer,
  timing,
}) {
  const { Icon, pulse } = node;
  const isPrayerNode = PRAYER_NODE_IDS.has(node.id);
  const isExpanded = !isPrayerNode && expandedSlot !== null;
  const mirrorId = `pp-mirror-${node.id}`;

  const moduleGroups = useMemo(() => getModuleGroups(node.id), [node.id]);
  const [moduleId, setModuleId] = useState(() => moduleGroups[0]?.id || null);
  const [viewMode, setViewMode] = useState('action');

  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const setClosingModuleId = useThresholdStore((s) => s.setClosingModuleId);
  const isThresholdNode = THRESHOLD_TRIGGER_NODES.has(node.id);
  const thresholdModuleId = moduleId || DEFAULT_THRESHOLD_MODULE_BY_NODE[node.id] || 'work';

  const handleBeforeClick = () => {
    if (isThresholdNode) setOpeningModuleId(thresholdModuleId);
    else onToggle(node.id, 'before');
  };
  const handleAfterClick = () => {
    if (isThresholdNode) setClosingModuleId(thresholdModuleId);
    else onToggle(node.id, 'after');
  };

  const phaseTasks = useMemo(() => {
    if (!isExpanded) return [];
    return buildTasksForNode(node.id, projects, tasksByProject, {
      limit: 8,
      submoduleNameById,
      phase: expandedSlot,
      moduleId,
    });
  }, [isExpanded, node.id, projects, tasksByProject, submoduleNameById, expandedSlot, moduleId]);

  const showProjects = node.id === 'midday-labor' && expandedSlot === 'main' && viewMode === 'action';
  const scopeProjects = useMemo(() => {
    if (!showProjects) return [];
    const pillarSubs = getPillarSubmoduleIds(moduleId);
    const scopeIds = pillarSubs.length > 0 ? pillarSubs : submodulesForNode(node.id, moduleId);
    return buildUserProjectsForScope(projects, scopeIds);
  }, [showProjects, projects, node.id, moduleId]);

  const handleSelectTask = (taskId) => {
    const row = phaseTasks.find((r) => r.id === taskId);
    if (row) onSelectTask(row);
  };

  const mirror = isExpanded ? (
    <div id={mirrorId}>
      <MirrorCard
        node={node}
        tasks={phaseTasks}
        projects={scopeProjects}
        onSelectTask={handleSelectTask}
        onSelectProject={onSelectProject}
        onSelectSubmodule={onSelectSubmodule}
        phaseLabel={slotLabel(expandedSlot)}
        viewMode={viewMode}
        moduleGroups={moduleGroups}
        moduleId={moduleId}
        onViewMode={setViewMode}
        onModuleId={setModuleId}
        showProjects={showProjects}
      />
    </div>
  ) : null;
  return (
    <div
      className="pp-node"
      data-expanded={isExpanded || undefined}
      data-prayer-state={timing?.state || undefined}
    >
      <div className="pp-marker" data-tone={node.markerTone} data-prayer-state={timing?.state || undefined}>
        <Icon className="pp-marker-icon" size={12} strokeWidth={2.25} />
      </div>
      <div className="pp-node-stack">
        {!isPrayerNode && (
          <>
            <button
              type="button"
              className="pp-satellite"
              data-slot="before"
              aria-expanded={!isThresholdNode && expandedSlot === 'before'}
              aria-controls={isThresholdNode ? undefined : mirrorId}
              onClick={handleBeforeClick}
            >
              Before
            </button>
            {!isThresholdNode && expandedSlot === 'before' && mirror}
          </>
        )}
        <button
          type="button"
          className="pp-card"
          data-style={node.cardStyle}
          data-prayer-state={timing?.state || undefined}
          aria-expanded={isPrayerNode ? undefined : expandedSlot === 'main'}
          aria-controls={isPrayerNode ? undefined : mirrorId}
          onClick={() => (isPrayerNode ? onOpenPrayer(node.id) : onToggle(node.id, 'main'))}
        >
          {node.cardStyle === 'divine' && <div className="pp-card-glow" aria-hidden="true" />}
          <div className="pp-card-hover" aria-hidden="true" />
          <div className="pp-card-body">
            <span className="pp-eyebrow" data-tone={node.eyebrowTone}>
              {pulse && <span className="pp-pulse-dot" aria-hidden="true" />}
              {node.eyebrow}
              {timing?.time && (
                <span className="pp-time-chip" data-state={timing.state || undefined}>
                  {timing.time}
                  {timing.label && <span className="pp-time-chip__label">{` · ${timing.label}`}</span>}
                </span>
              )}
              {!timing?.time && timing?.label && (
                <span className="pp-time-chip pp-time-chip--anchor">{timing.label}</span>
              )}
              {timing?.state === 'active' && <span className="pp-time-chip__badge">Current</span>}
              {(timing?.state === 'next' || timing?.state === 'next-soon') && <span className="pp-time-chip__badge pp-time-chip__badge--next">Next</span>}
            </span>
            <h3 className="pp-title" data-tone={node.titleTone}>
              {node.title}
            </h3>
            <p className="pp-body-text">{node.body}</p>
            <div className="pp-pillars">
              {node.pillars.map((p, i) => {
                const accent = resolvePillarAccent(p.label);
                return (
                  <span
                    key={i}
                    className="pp-pillar-chip"
                    data-tone={p.tone}
                    style={accent ? { '--chip-accent': accent } : undefined}
                  >
                    {p.label}
                  </span>
                );
              })}
            </div>
          </div>
        </button>
        {!isPrayerNode && expandedSlot === 'main' && mirror}
        {!isPrayerNode && (
          <>
            <button
              type="button"
              className="pp-satellite"
              data-slot="after"
              aria-expanded={!isThresholdNode && expandedSlot === 'after'}
              aria-controls={isThresholdNode ? undefined : mirrorId}
              onClick={handleAfterClick}
            >
              After
            </button>
            {!isThresholdNode && expandedSlot === 'after' && mirror}
          </>
        )}
      </div>
    </div>
  );
}

function slotLabel(slot) {
  if (slot === 'before') return 'Before';
  if (slot === 'after') return 'After';
  return 'Now';
}

export default function PropheticPath({ variant }) {
  const appTheme = useSettingsStore((s) => s.theme);
  const theme = variant ?? appTheme ?? 'light';
  const projects = useProjectStore((s) => s.projects);
  const ensureWeeklyProjects = useProjectStore((s) => s.ensureWeeklyProjects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);
  const niyyahPillars = useMemo(
    () =>
      (niyyahFocus || [])
        .filter((id) => id !== '_skipped')
        .map((id) => MAQASID_PILLARS.find((p) => p.id === id))
        .filter(Boolean),
    [niyyahFocus]
  );
  const { timings, cityName, loading: prayerLoading, error: prayerError, requestLocation } = usePrayerTimes();
  const prayerDegraded = !timings && !prayerLoading;
  const nextNodeId = useMemo(() => computeNextNodeId(timings), [timings]);
  const activeNodeId = useMemo(() => computeActiveNodeId(timings), [timings]);
  const orderedNodes = useMemo(() => {
    const idx = NODES.findIndex((n) => n.id === activeNodeId);
    if (idx <= 0) return NODES;
    return [...NODES.slice(idx), ...NODES.slice(0, idx)];
  }, [activeNodeId]);
  const activeNode = useMemo(
    () => NODES.find((n) => n.id === activeNodeId) || null,
    [activeNodeId]
  );
  const bookends = useMemo(() => {
    if (!timings) return null;
    const fajr = stripTz(timings.Fajr);
    const maghrib = stripTz(timings.Maghrib);
    return fajr && maghrib ? `Fajr ${fajr} — Maghrib ${maghrib}` : null;
  }, [timings]);


  // Weekly boards back the midday-labor + morning Before/After satellites
  // (which now trigger the Threshold modal). Ensure they exist so the
  // weekly-cadence tasks are reachable via direct project routes.
  useEffect(() => {
    ensureWeeklyProjects();
  }, [ensureWeeklyProjects]);

  const [expanded, setExpanded] = useState(() => ({ nodeId: inferNodeFromHour(new Date()), slot: 'main' }));
  // { taskId, project, projectId, levelColor } | null
  const [selectedTask, setSelectedTask] = useState(null);
  // projectId for the slide-up overlay (null = closed)
  const [slideUpProjectId, setSlideUpProjectId] = useState(null);
  // { id, label } for the submodule slide-up overlay (null = closed)
  const [slideUpSubmodule, setSlideUpSubmodule] = useState(null);
  // nodeId for the prayer slide-up overlay (null = closed)
  const [slideUpPrayerNodeId, setSlideUpPrayerNodeId] = useState(null);

  // Hydrate tasks for all relevant projects once on mount. The task store
  // lazily loads tasks per project — ensure every project referenced in the
  // TOD mapping has its tasks in memory so the mirror card isn't empty.
  useEffect(() => {
    (projects || []).forEach((p) => {
      if (!tasksByProject[p.id]) loadTasks(p.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  const submoduleNameById = useMemo(() => {
    const map = {};
    MODULES.forEach((m) => { map[m.id] = m.name; });
    return map;
  }, []);

  const toggleNode = (id, slot) => {
    setExpanded((curr) =>
      curr && curr.nodeId === id && curr.slot === slot ? null : { nodeId: id, slot }
    );
  };

  const openTask = (row) => {
    if (!row) { setSelectedTask(null); return; }
    setSelectedTask({
      taskId: row.id,
      project: row._project,
      projectId: row.projectId,
      levelColor: LEVEL_COLOR[row._level] || LEVEL_COLOR[3],
    });
  };

  return (
    <div className="prophetic-path" data-theme={theme}>
      <main className="pp-main">
        <div className="pp-ambient pp-ambient--teal" aria-hidden="true" />
        <div className="pp-ambient pp-ambient--gold" aria-hidden="true" />

        <div className="pp-content">
          <div className="pp-timeline-col">
            {prayerDegraded && (
              <div
                role="alert"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '10px 14px',
                  marginBottom: 12,
                  border: '1px solid var(--border, #d4b06f44)',
                  borderRadius: 8,
                  background: 'var(--surface-2, rgba(200,169,110,0.08))',
                  color: 'var(--text2, #888)',
                  fontSize: 13,
                }}
              >
                <span>
                  Prayer times unavailable
                  {prayerError ? ` — ${prayerError}` : ' — set city in Settings to ground today\'s rhythm'}.
                </span>
                <button
                  type="button"
                  onClick={requestLocation}
                  style={{
                    padding: '4px 10px',
                    fontSize: 12,
                    border: '1px solid var(--border, #ccc)',
                    borderRadius: 6,
                    background: 'var(--surface, #fff)',
                    color: 'var(--text, #222)',
                    cursor: 'pointer',
                  }}
                >
                  Retry
                </button>
              </div>
            )}
            {(cityName || activeNode || bookends || niyyahPillars.length > 0) && (
              <div className="pp-intro">
                {(cityName || activeNode || bookends) && (
                  <header className="pp-intro__header">
                    {cityName && (
                      <span className="pp-intro__eyebrow">{cityName}</span>
                    )}
                    {activeNode && (
                      <h1 className="pp-intro__hero">{activeNode.title}</h1>
                    )}
                    {bookends && (
                      <p className="pp-intro__bookends">{bookends}</p>
                    )}
                  </header>
                )}
                {niyyahPillars.length > 0 && (
                <div className="pp-niyyah-echo" role="status" aria-label="Today's intention">
                  <span className="pp-niyyah-echo__label">
                    <span className="pp-niyyah-echo__label-en">Today you carry</span>
                    <span className="pp-niyyah-echo__label-ar">نية اليوم</span>
                  </span>
                  <span className="pp-niyyah-echo__chips">
                    {niyyahPillars.map((p) => (
                      <span
                        key={p.id}
                        className="pp-niyyah-echo__chip"
                        style={{
                          borderColor: p.accentColor,
                          color: p.accentColor,
                          background: p.accentColor + '14',
                        }}
                      >
                        {p.sidebarLabel}
                      </span>
                    ))}
                  </span>
                </div>
                )}
              </div>
            )}

            <div className="pp-spine">
              {orderedNodes.map((node) => (
                <TimelineNode
                  key={node.id}
                  node={node}
                  expandedSlot={expanded && expanded.nodeId === node.id ? expanded.slot : null}
                  onToggle={toggleNode}
                  projects={projects}
                  tasksByProject={tasksByProject}
                  submoduleNameById={submoduleNameById}
                  onSelectTask={openTask}
                  onSelectProject={setSlideUpProjectId}
                  onSelectSubmodule={(id, label) => setSlideUpSubmodule({ id, label })}
                  onOpenPrayer={setSlideUpPrayerNodeId}
                  timing={deriveNodeTiming(node.id, timings, activeNodeId, nextNodeId)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      {selectedTask?.project && (
        <TaskDetailPanel
          project={selectedTask.project}
          projectId={selectedTask.projectId}
          taskId={selectedTask.taskId}
          onClose={() => setSelectedTask(null)}
          bbosRole={selectedTask.project.bbosRole || 'all'}
          accentColor={selectedTask.levelColor}
        />
      )}
      {slideUpProjectId && (
        <ProjectSlideUp
          projectId={slideUpProjectId}
          onClose={() => setSlideUpProjectId(null)}
        />
      )}
      {slideUpSubmodule?.id && (
        <SubmoduleSlideUp
          submoduleId={slideUpSubmodule.id}
          fallbackLabel={slideUpSubmodule.label}
          onClose={() => setSlideUpSubmodule(null)}
        />
      )}
      {slideUpPrayerNodeId && (
        <PrayerSlideUp
          nodeId={slideUpPrayerNodeId}
          onClose={() => setSlideUpPrayerNodeId(null)}
          onSelectTask={openTask}
          onNavigate={setSlideUpPrayerNodeId}
        />
      )}
    </div>
  );
}
