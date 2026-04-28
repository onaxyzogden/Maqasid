import { useCallback } from 'react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import EnvironmentPathToExcellenceCards from '@components/environment/EnvironmentPathToExcellenceCards';
import { useToastStore } from '@store/toastStore';
import { PILLAR_WISDOM } from '@data/pillar-wisdom';
import { PILLAR_NEXT_ACTIONS } from '@data/pillar-next-actions';
import {
  ENVIRONMENT_PILLARS,
  ENVIRONMENT_LEVEL_ROUTES,
  ENVIRONMENT_STORAGE_KEY,
  ENVIRONMENT_ENSURE_PROJECTS,
} from './EnvironmentLevelNavigator-constants';

const LEVEL_PATTERN = {
  core: 'dots',
  growth: 'stripes',
  excellence: 'crosshatch',
};

export default function EnvironmentLevelOverview({ level, levelColor }) {
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
      pillars={ENVIRONMENT_PILLARS}
      storageKey={ENVIRONMENT_STORAGE_KEY}
      ensureProjects={ENVIRONMENT_ENSURE_PROJECTS}
      levelRoutes={ENVIRONMENT_LEVEL_ROUTES}
      boardPrefix="environment"
      showComparisonWheel
      wheelCenterLabel="ENVIRONMENT"
      wheelExtraProps={{
        levelPattern: LEVEL_PATTERN[level] || 'dots',
        level,
        onReach100,
        pillarWisdom: PILLAR_WISDOM.environment,
        nextActions: PILLAR_NEXT_ACTIONS.environment,
      }}
      ComparisonWheelComponent={MaqasidComparisonWheel}
      ExcellenceCardsComponent={EnvironmentPathToExcellenceCards}
    />
  );
}
