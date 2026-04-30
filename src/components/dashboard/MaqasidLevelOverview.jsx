import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaqasidLevelOverview as PackageMaqasidLevelOverview } from '@ogden/ui-components';
import { useModulesProgress } from '@hooks/useModuleProgress';
import { MAQASID_CORE_PILLARS } from '@data/maqasid';
import {
  getPillarSubmoduleIds,
  getSubmoduleDisplayLabel,
} from '@data/submodule-registry';
import { useToastStore } from '@store/toastStore';
import { getIcon } from '@data/icon-registry';

const LEVEL_META = {
  core:       { color: '#C8A96E' },
  growth:     { color: '#4ab8a8' },
  excellence: { color: '#8b5cf6' },
};

const PILLAR_NAV = MAQASID_CORE_PILLARS.map((p) => ({
  id: p.id,
  label: p.sidebarLabel,
  Icon: getIcon(p.icon),
  route: `/app/pillar/${p.id}`,
  accentColor: p.accentColor,
}));
const PILLAR_IDS = PILLAR_NAV.map((p) => p.id);

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

  return (
    <PackageMaqasidLevelOverview
      pillars={PILLAR_NAV}
      pillarTasks={SUBMODULE_TASKS}
      progressMap={progressMap}
      level={level}
      onLevelChange={(key) => key && setLevel(key)}
      onSegmentClick={(pillarId) => {
        const seg = PILLAR_NAV.find((p) => p.id === pillarId);
        if (seg?.route) navigate(seg.route, { viewTransition: true });
      }}
      onSubsegClick={(submoduleId) => {
        if (submoduleId) navigate(`/app/${submoduleId}`, { viewTransition: true });
      }}
      onReach100={onReach100}
      storageKey="dashboard_maqasid_level"
      taskColorFn={submoduleColor}
    />
  );
}
