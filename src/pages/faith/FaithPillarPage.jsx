import { useState, useEffect } from 'react';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { safeGet, safeSet } from '@services/storage';
import FaithLevelNavigator from './FaithLevelNavigator';
import ProjectBoard from '@components/work/ProjectBoard';
import './FaithPillarPage.css';

// Maps pillarKey (board ID segment) → moduleId (FaithLevelNavigator PILLARS id)
const PILLAR_MODULE_MAP = {
  shahada: 'shahada',
  salah:   'salat',
  zakah:   'zakat',
  sawm:    'siyam',
  hajj:    'hajj',
};

const STORAGE_KEY = 'faith_active_tab';
const VALID_LEVELS = ['core', 'growth', 'excellence'];

export default function FaithPillarPage({ pillarKey }) {
  const [activeLevel, setActiveLevelRaw] = useState(() => {
    const saved = safeGet(STORAGE_KEY, 'core');
    return VALID_LEVELS.includes(saved) ? saved : 'core';
  });

  const setActiveLevel = (key) => {
    setActiveLevelRaw(key);
    safeSet(STORAGE_KEY, key);
  };

  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);
  const getProject = useProjectStore((s) => s.getProject);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => { ensureFaithProjects(); }, []);

  useEffect(() => {
    for (const lvl of VALID_LEVELS) {
      const boardId = `faith_${pillarKey}_${lvl}`;
      if (projects.some((p) => p.id === boardId)) loadTasks(boardId);
    }
  }, [projects, pillarKey, loadTasks]);

  const boardId = `faith_${pillarKey}_${activeLevel}`;
  const project = getProject(boardId);
  const moduleId = PILLAR_MODULE_MAP[pillarKey];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <FaithLevelNavigator
        compact
        controlledLevel={activeLevel}
        onLevelChange={setActiveLevel}
        currentPillarId={moduleId}
      />
      <div className="fpb-layout">
        <div className="fpb-spacer" />
        <div className="fpb-content">
          {project ? (
            <ProjectBoard projectId={boardId} project={project} hideFilter hideViewSwitcher inlinePanel />
          ) : (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text2)' }}>
              Loading board...
            </div>
          )}
        </div>
        <div className="fpb-spacer" />
      </div>
    </div>
  );
}
