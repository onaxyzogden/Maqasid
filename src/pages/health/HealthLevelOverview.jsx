import { useCallback } from 'react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import HealthPathToExcellenceCards from '@components/health/HealthPathToExcellenceCards';
import { useToastStore } from '@store/toastStore';
import { PILLAR_WISDOM } from '@data/pillar-wisdom';
import { PILLAR_NEXT_ACTIONS } from '@data/pillar-next-actions';
import {
  HEALTH_PILLARS,
  HEALTH_LEVEL_ROUTES,
  HEALTH_STORAGE_KEY,
  HEALTH_ENSURE_PROJECTS,
} from './HealthLevelNavigator-constants';

const LEVEL_PATTERN = {
  core: 'dots',
  growth: 'stripes',
  excellence: 'crosshatch',
};

export default function HealthLevelOverview({ level, levelColor }) {
  const pushToast = useToastStore((s) => s.push);

  const onReach100 = useCallback(
    (seg) => {
      pushToast({
        message: `Your consistency in ${seg.label} has flourished today.`,
        pillar: seg.label,
        levelColor,
      });
    },
    [pushToast, levelColor],
  );

  return (
    <LevelOverviewPage
      level={level}
      levelColor={levelColor}
      pillars={HEALTH_PILLARS}
      storageKey={HEALTH_STORAGE_KEY}
      ensureProjects={HEALTH_ENSURE_PROJECTS}
      levelRoutes={HEALTH_LEVEL_ROUTES}
      boardPrefix="health"
      showComparisonWheel
      wheelCenterLabel="HEALTH"
      wheelExtraProps={{
        levelPattern: LEVEL_PATTERN[level] || 'dots',
        level,
        onReach100,
        pillarWisdom: PILLAR_WISDOM.life,
        nextActions: PILLAR_NEXT_ACTIONS.life,
      }}
      ComparisonWheelComponent={MaqasidComparisonWheel}
      ExcellenceCardsComponent={HealthPathToExcellenceCards}
    />
  );
}
