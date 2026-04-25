import { useCallback } from 'react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import LifePathToExcellenceCards from '@components/life/LifePathToExcellenceCards';
import { useToastStore } from '@store/toastStore';
import { PILLAR_WISDOM } from '@data/pillar-wisdom';
import { PILLAR_NEXT_ACTIONS } from '@data/pillar-next-actions';
import { MODULE_PALETTE } from '@data/module-palette';
import {
  LIFE_PILLARS,
  LIFE_LEVEL_ROUTES,
  LIFE_STORAGE_KEY,
  LIFE_ENSURE_PROJECTS,
} from './LifeLevelNavigator-constants';

const LEVEL_PATTERN = {
  core: 'dots',
  growth: 'stripes',
  excellence: 'crosshatch',
};

export default function LifeLevelOverview({ level, levelColor }) {
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
      pillars={LIFE_PILLARS}
      storageKey={LIFE_STORAGE_KEY}
      ensureProjects={LIFE_ENSURE_PROJECTS}
      levelRoutes={LIFE_LEVEL_ROUTES}
      boardPrefix="life"
      showComparisonWheel
      wheelCenterLabel="LIFE"
      wheelExtraProps={{
        levelPattern: LEVEL_PATTERN[level] || 'dots',
        level,
        onReach100,
        pillarWisdom: PILLAR_WISDOM.life,
        nextActions: PILLAR_NEXT_ACTIONS.life,
        themeColor: MODULE_PALETTE.life.theme,
      }}
      ComparisonWheelComponent={MaqasidComparisonWheel}
      ExcellenceCardsComponent={LifePathToExcellenceCards}
    />
  );
}
