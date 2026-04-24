import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import { PILLAR_WISDOM } from '@data/pillar-wisdom';
import { PILLAR_NEXT_ACTIONS } from '@data/pillar-next-actions';
import { MODULE_PALETTE } from '@data/module-palette';
import {
  OGDEN_SUB_PILLARS,
  OGDEN_LEVEL_ROUTES,
  OGDEN_STORAGE_KEY,
  OGDEN_ENSURE_PROJECTS,
  OGDEN_LEVELS,
  OGDEN_ACCENT,
} from '@data/ogden-ecosystem';

const LEVEL_PATTERN = {
  core:       'dots',
  growth:     'stripes',
  excellence: 'crosshatch',
};

export default function OgdenLevelOverview({ level, levelColor }) {
  return (
    <LevelOverviewPage
      level={level}
      levelColor={levelColor || OGDEN_ACCENT}
      pillarAccent={OGDEN_ACCENT}
      pillars={OGDEN_SUB_PILLARS}
      storageKey={OGDEN_STORAGE_KEY}
      ensureProjects={OGDEN_ENSURE_PROJECTS}
      levelRoutes={OGDEN_LEVEL_ROUTES}
      levelDescriptions={OGDEN_LEVELS}
      boardPrefix="ogden"
      showComparisonWheel
      wheelCenterLabel="OGDEN"
      wheelExtraProps={{
        levelPattern: LEVEL_PATTERN[level] || 'dots',
        level,
        pillarWisdom: PILLAR_WISDOM.ogden,
        nextActions: PILLAR_NEXT_ACTIONS.ogden,
        themeColor: MODULE_PALETTE.ogden?.theme || OGDEN_ACCENT,
      }}
      ComparisonWheelComponent={MaqasidComparisonWheel}
    />
  );
}
