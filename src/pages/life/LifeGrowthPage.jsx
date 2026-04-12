import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import { LIFE_PILLARS, LIFE_LEVEL_ROUTES, LIFE_STORAGE_KEY, LIFE_ENSURE_PROJECTS, LIFE_LEVEL_DESCRIPTIONS } from './LifeCorePage';

export default function LifeGrowthPage() {
  return (
    <LevelOverviewPage
      level="growth"
      levelColor="#4ab8a8"
      pillars={LIFE_PILLARS}
      storageKey={LIFE_STORAGE_KEY}
      ensureProjects={LIFE_ENSURE_PROJECTS}
      levelRoutes={LIFE_LEVEL_ROUTES}
      boardPrefix="life"
      levelDescriptions={LIFE_LEVEL_DESCRIPTIONS}
    />
  );
}
