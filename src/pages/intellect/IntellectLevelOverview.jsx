import { useCallback } from 'react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import IntellectPathToExcellenceCards from '@components/intellect/IntellectPathToExcellenceCards';
import { useToastStore } from '@store/toastStore';
import { PILLAR_WISDOM } from '@data/pillar-wisdom';
import { PILLAR_NEXT_ACTIONS } from '@data/pillar-next-actions';
import { MODULE_PALETTE } from '@data/module-palette';
import {
  INTELLECT_PILLARS,
  INTELLECT_LEVEL_ROUTES,
  INTELLECT_STORAGE_KEY,
  INTELLECT_ENSURE_PROJECTS,
} from './IntellectLevelNavigator-constants';

const LEVEL_PATTERN = {
  core: 'dots',
  growth: 'stripes',
  excellence: 'crosshatch',
};

export default function IntellectLevelOverview({ level, levelColor }) {
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
      pillars={INTELLECT_PILLARS}
      storageKey={INTELLECT_STORAGE_KEY}
      ensureProjects={INTELLECT_ENSURE_PROJECTS}
      levelRoutes={INTELLECT_LEVEL_ROUTES}
      boardPrefix="intellect"
      showComparisonWheel
      wheelCenterLabel="INTELLECT"
      wheelExtraProps={{
        levelPattern: LEVEL_PATTERN[level] || 'dots',
        level,
        onReach100,
        pillarWisdom: PILLAR_WISDOM.intellect,
        nextActions: PILLAR_NEXT_ACTIONS.intellect,
        themeColor: MODULE_PALETTE.intellect.theme,
      }}
      ComparisonWheelComponent={MaqasidComparisonWheel}
      ExcellenceCardsComponent={IntellectPathToExcellenceCards}
    />
  );
}
