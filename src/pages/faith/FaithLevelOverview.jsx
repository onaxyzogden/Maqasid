import { useCallback } from 'react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import PathToExcellenceCards from '@components/faith/PathToExcellenceCards';
import { useToastStore } from '@store/toastStore';
import { FAITH_PILLAR_WISDOM } from '@data/faith-pillar-wisdom';
import { FAITH_NEXT_ACTIONS } from '@data/faith-next-actions';
import { MODULE_PALETTE } from '@data/module-palette';
import {
  FAITH_PILLARS,
  FAITH_LEVEL_ROUTES,
  FAITH_STORAGE_KEY,
  FAITH_ENSURE_PROJECTS,
} from './FaithLevelNavigator-constants';

// Augment Faith pillars with glossaryIds (used by IslamicTerm tooltips)
const FAITH_OVERVIEW_PILLARS = FAITH_PILLARS.map((p) => ({
  ...p,
  glossaryId: p.id,
}));

const LEVEL_PATTERN = {
  core: 'dots',
  growth: 'stripes',
  excellence: 'crosshatch',
};

export default function FaithLevelOverview({ level, levelColor }) {
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
      pillars={FAITH_OVERVIEW_PILLARS}
      storageKey={FAITH_STORAGE_KEY}
      ensureProjects={FAITH_ENSURE_PROJECTS}
      levelRoutes={FAITH_LEVEL_ROUTES}
      boardPrefix="faith"
      showComparisonWheel
      wheelCenterLabel="FAITH"
      wheelExtraProps={{
        levelPattern: LEVEL_PATTERN[level] || 'dots',
        level,
        onReach100,
        pillarWisdom: FAITH_PILLAR_WISDOM,
        nextActions: FAITH_NEXT_ACTIONS,
        themeColor: MODULE_PALETTE.faith.theme,
      }}
      ComparisonWheelComponent={MaqasidComparisonWheel}
      ExcellenceCardsComponent={PathToExcellenceCards}
    />
  );
}
