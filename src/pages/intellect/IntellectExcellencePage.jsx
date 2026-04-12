import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import { INTELLECT_PILLARS, INTELLECT_LEVEL_ROUTES, INTELLECT_STORAGE_KEY, INTELLECT_ENSURE_PROJECTS, INTELLECT_LEVEL_DESCRIPTIONS } from './IntellectCorePage';

export default function IntellectExcellencePage() {
  return (
    <LevelOverviewPage
      level="excellence"
      levelColor="#8b5cf6"
      pillars={INTELLECT_PILLARS}
      storageKey={INTELLECT_STORAGE_KEY}
      ensureProjects={INTELLECT_ENSURE_PROJECTS}
      levelRoutes={INTELLECT_LEVEL_ROUTES}
      boardPrefix="intellect"
      levelDescriptions={INTELLECT_LEVEL_DESCRIPTIONS}
    />
  );
}
