import { useCallback } from 'react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import FamilyPathToExcellenceCards from '@components/family/FamilyPathToExcellenceCards';
import { useToastStore } from '@store/toastStore';
import { PILLAR_WISDOM } from '@data/pillar-wisdom';
import { PILLAR_NEXT_ACTIONS } from '@data/pillar-next-actions';
import {
  FAMILY_PILLARS,
  FAMILY_LEVEL_ROUTES,
  FAMILY_STORAGE_KEY,
  FAMILY_ENSURE_PROJECTS,
} from './FamilyLevelNavigator';

const LEVEL_PATTERN = {
  core: 'dots',
  growth: 'stripes',
  excellence: 'crosshatch',
};

export default function FamilyLevelOverview({ level, levelColor }) {
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
      pillars={FAMILY_PILLARS}
      storageKey={FAMILY_STORAGE_KEY}
      ensureProjects={FAMILY_ENSURE_PROJECTS}
      levelRoutes={FAMILY_LEVEL_ROUTES}
      boardPrefix="family"
      showComparisonWheel
      wheelCenterLabel="FAMILY"
      wheelExtraProps={{
        levelPattern: LEVEL_PATTERN[level] || 'dots',
        level,
        onReach100,
        pillarWisdom: PILLAR_WISDOM.family,
        nextActions: PILLAR_NEXT_ACTIONS.family,
      }}
      ComparisonWheelComponent={MaqasidComparisonWheel}
      ExcellenceCardsComponent={FamilyPathToExcellenceCards}
    />
  );
}
