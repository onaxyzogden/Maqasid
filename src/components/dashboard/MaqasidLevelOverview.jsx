import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelNavigator from '@components/shared/LevelNavigator';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import { useModulesProgress } from '@hooks/useModuleProgress';
import { MAQASID_CORE_PILLARS } from '@data/maqasid';
import {
  getPillarSubmoduleIds,
  getSubmoduleDisplayLabel,
} from '@data/submodule-registry';
import { useToastStore } from '@store/toastStore';
import { getIcon } from '@data/icon-registry';
import '@pages/shared/LevelOverviewPage.css';

const LEVEL_META = {
  core:       { color: '#C8A96E', pattern: 'dots' },
  growth:     { color: '#4ab8a8', pattern: 'stripes' },
  excellence: { color: '#8b5cf6', pattern: 'crosshatch' },
};

const PILLAR_NAV = MAQASID_CORE_PILLARS.map((p) => ({
  id: p.id,
  label: p.sidebarLabel,
  Icon: getIcon(p.icon),
  route: `/app/pillar/${p.id}`,
  accentColor: p.accentColor,
}));
const PILLAR_IDS = PILLAR_NAV.map((p) => p.id);

// One synthetic "task" per submodule, fed to LevelNavigator via pillarTasks so
// each pillar's segment-bar shows its submodules as clickable subsegs.
const SUBMODULE_TASKS = Object.fromEntries(
  PILLAR_NAV.map((p) => [
    p.id,
    getPillarSubmoduleIds(p.id).map((sid) => ({
      id: sid,
      title: getSubmoduleDisplayLabel(sid, sid),
      _pillarAccent: p.accentColor,
    })),
  ]),
);

function submoduleColor(task) {
  return task._pillarAccent || 'var(--border2)';
}

export default function MaqasidLevelOverview() {
  const navigate = useNavigate();
  const [level, setLevel] = useState('core');
  const pushToast = useToastStore((s) => s.push);

  const meta = LEVEL_META[level] || LEVEL_META.core;
  const { progressMap } = useModulesProgress(PILLAR_IDS, level);

  const onReach100 = useCallback(
    (seg) => {
      pushToast({
        message: `Your consistency in ${seg.label} has flourished today.`,
        pillar: seg.label,
        levelColor: meta.color,
      });
    },
    [pushToast, meta.color],
  );

  const segments = PILLAR_NAV.map((p) => ({
    ...p,
    current: progressMap[p.id]?.pct ?? 0,
  }));

  return (
    <div
      className="flo flo--dashboard"
      style={{ '--level-color': meta.color }}
    >
      <LevelNavigator
        compact
        controlledLevel={level}
        onLevelChange={(key) => key && setLevel(key)}
        pillars={PILLAR_NAV}
        storageKey="dashboard_maqasid_level"
        pillarTasks={SUBMODULE_TASKS}
        taskColorFn={submoduleColor}
        onSegmentClick={(pillarId) => {
          const seg = PILLAR_NAV.find((p) => p.id === pillarId);
          if (seg?.route) navigate(seg.route, { viewTransition: true });
        }}
        onSubsegClick={(submoduleId) => {
          if (submoduleId) navigate(`/app/${submoduleId}`, { viewTransition: true });
        }}
      />
      <section
        className="flo__section flo__section--wheel motif-soft-glass motif-shimmer-border"
        aria-label="Maqasid pattern at this tier"
      >
        <div className="flo__wheel">
          <MaqasidComparisonWheel
            centerLabel="MAQASID"
            levelColor={meta.color}
            level={level}
            levelPattern={meta.pattern}
            segments={segments}
            onReach100={onReach100}
          />
        </div>
      </section>
    </div>
  );
}
