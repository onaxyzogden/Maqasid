import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import PathToExcellenceCards from '@components/faith/PathToExcellenceCards';
import {
  FAITH_PILLARS,
  FAITH_LEVEL_ROUTES,
  FAITH_STORAGE_KEY,
  FAITH_ENSURE_PROJECTS,
} from './FaithLevelNavigator';

// Augment Faith pillars with glossaryIds (used by IslamicTerm tooltips)
const FAITH_OVERVIEW_PILLARS = FAITH_PILLARS.map((p) => ({
  ...p,
  glossaryId: p.id,
}));

export default function FaithLevelOverview({ level, levelColor }) {
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
      ComparisonWheelComponent={MaqasidComparisonWheel}
      ExcellenceCardsComponent={PathToExcellenceCards}
    />
  );
}
