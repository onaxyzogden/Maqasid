// MILOS-side wrapper around @ogden/ui-components' LevelNavigator.
//
// The package component is "pure": it takes pillarTasks as a prop and expects
// each pillar to carry a glossaryEntry object. This wrapper preserves the
// MILOS call signature by:
//   1. Deriving pillarTasks from useProjectStore + useTaskStore for the
//      currently-active level when the consumer doesn't provide its own.
//   2. Mapping each pillar's `glossaryId` (string) to its full glossary entry
//      via getGlossaryEntry().
//   3. Calling ensureProjects(s) once on mount (was an internal selector
//      before; now a side effect we drive externally).
//   4. Preserving the BBOS gate scroll-into-view side effect that fires when
//      a gate diamond is clicked.
//
// We always run the package in controlled mode (we own activeLevel state
// here when the consumer doesn't), so we can compute pillarTasks for the
// correct level.
import { useEffect, useState } from 'react';
import { LevelNavigator as PkgLevelNavigator } from '@ogden/ui-components';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { getGlossaryEntry } from '@data/islamic/islamic-glossary';

const NOOP = () => {};
const PRIORITY_ORDER = { urgent: 0, high: 1, medium: 2, low: 3 };

const DEFAULT_LEVELS = [
  { key: 'core',       label: 'LEVEL 1', subtitle: '(DARURIYYAT)',  title: 'Core Higher Objectives', desc: 'Foundational obligations — the essential duties that must be established before all else.', color: '#C8A96E', routeSuffix: 'core' },
  { key: 'growth',     label: 'LEVEL 2', subtitle: '(HAJIYYAT)',    title: 'Growth Space',           desc: 'Development needs — structured progression that deepens practice and knowledge.',          color: '#4ab8a8', routeSuffix: 'growth' },
  { key: 'excellence', label: 'LEVEL 3', subtitle: '(TAHSINIYYAT)', title: 'Embellishments',         desc: 'Refinement pursuits — aspirational mastery that elevates and perfects.',                  color: '#8b5cf6', routeSuffix: 'excellence' },
];

export default function LevelNavigator({
  pillars = [],
  ensureProjects,
  controlledLevel,
  onLevelChange,
  pillarTasks: externalPillarTasks,
  levels: customLevels,
  gateIndicators,
  onSegmentClick,
  ...rest
} = {}) {
  const baseLevels = customLevels || DEFAULT_LEVELS;
  const [internalLevel, setInternalLevel] = useState(baseLevels[0]?.key);
  const activeLevelKey = controlledLevel ?? internalLevel;

  const ensureProjectsFn = useProjectStore((s) => ensureProjects ? ensureProjects(s) : NOOP);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const moduleIds = pillars.map((p) => p.id);

  useEffect(() => {
    if (ensureProjects) ensureProjectsFn();
    // ensureProjectsFn is a selector wrapper — exclude from deps to avoid loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (externalPillarTasks) return;
    const moduleProjects = projects.filter((p) => p.moduleId && moduleIds.includes(p.moduleId));
    for (const proj of moduleProjects) loadTasks(proj.id);
    // moduleIds rebuilds each render; including it would refire constantly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, loadTasks, externalPillarTasks]);

  // Build per-pillar task lists for the active level.
  let derivedPillarTasks = externalPillarTasks;
  if (!externalPillarTasks) {
    const next = {};
    for (const { id } of pillars) {
      const proj = projects.find((p) => p.moduleId === id && p.id.endsWith('_' + activeLevelKey));
      const raw = proj ? (tasksByProject[proj.id] || []) : [];
      // Match PillarLevelDashboard: group by first tag (largest first), then
      // sort by priority within group.
      const grouped = new Map();
      for (const t of raw) {
        const tag = t.tags?.[0] ?? 'General';
        if (!grouped.has(tag)) grouped.set(tag, []);
        grouped.get(tag).push(t);
      }
      next[id] = [...grouped.entries()]
        .sort((a, b) => b[1].length - a[1].length)
        .flatMap(([, items]) =>
          [...items].sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 4) - (PRIORITY_ORDER[b.priority] ?? 4))
        );
    }
    derivedPillarTasks = next;
  }

  // Map pillar.glossaryId → pillar.glossaryEntry expected by the package.
  const pillarsForPkg = pillars.map((p) =>
    p.glossaryEntry || !p.glossaryId
      ? p
      : { ...p, glossaryEntry: getGlossaryEntry(p.glossaryId) || undefined }
  );

  // Preserve BBOS gate scroll-into-view: when a gate diamond is clicked, the
  // package fires onSegmentClick(gate.afterSegmentId, level). We decorate it
  // to also scroll the assembly-gate / SSC node into view.
  const decoratedOnSegmentClick = onSegmentClick && gateIndicators?.length
    ? (pillarId, levelKey) => {
        onSegmentClick(pillarId, levelKey);
        if (gateIndicators.some((g) => g.afterSegmentId === pillarId)) {
          setTimeout(() => {
            const target = document.querySelector('.bfd__assembly-gate') || document.querySelector('.bfd__ssc');
            target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
      }
    : onSegmentClick;

  // Always run the package in controlled mode so our pillarTasks derivation
  // sees the same activeLevelKey the package is rendering.
  const handleLevelChange = (key) => {
    if (onLevelChange) onLevelChange(key);
    if (controlledLevel == null) setInternalLevel(key);
  };

  return (
    <PkgLevelNavigator
      pillars={pillarsForPkg}
      pillarTasks={derivedPillarTasks}
      controlledLevel={activeLevelKey}
      onLevelChange={handleLevelChange}
      levels={customLevels}
      gateIndicators={gateIndicators}
      onSegmentClick={decoratedOnSegmentClick}
      {...rest}
    />
  );
}
