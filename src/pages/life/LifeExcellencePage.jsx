import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import { LIFE_PILLARS, LIFE_LEVEL_ROUTES, LIFE_STORAGE_KEY, LIFE_ENSURE_PROJECTS, LIFE_LEVEL_DESCRIPTIONS } from './LifeCorePage';

export default function LifeExcellencePage() {
  return (
    <LevelOverviewPage
      level="excellence"
      levelColor="#8b5cf6"
      pillars={LIFE_PILLARS}
      storageKey={LIFE_STORAGE_KEY}
      ensureProjects={LIFE_ENSURE_PROJECTS}
      levelRoutes={LIFE_LEVEL_ROUTES}
      boardPrefix="life"
      levelDescriptions={LIFE_LEVEL_DESCRIPTIONS}
    />
  );
}
