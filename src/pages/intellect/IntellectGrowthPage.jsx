import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import { INTELLECT_PILLARS, INTELLECT_LEVEL_ROUTES, INTELLECT_STORAGE_KEY, INTELLECT_ENSURE_PROJECTS, INTELLECT_LEVEL_DESCRIPTIONS } from './IntellectCorePage';

export default function IntellectGrowthPage() {
  return (
    <LevelOverviewPage
      level="growth"
      levelColor="#4ab8a8"
      pillars={INTELLECT_PILLARS}
      storageKey={INTELLECT_STORAGE_KEY}
      ensureProjects={INTELLECT_ENSURE_PROJECTS}
      levelRoutes={INTELLECT_LEVEL_ROUTES}
      boardPrefix="intellect"
      levelDescriptions={INTELLECT_LEVEL_DESCRIPTIONS}
    />
  );
}
