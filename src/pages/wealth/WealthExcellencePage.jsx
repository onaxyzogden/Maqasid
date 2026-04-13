import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import { WEALTH_PILLARS, WEALTH_LEVEL_ROUTES, WEALTH_STORAGE_KEY, WEALTH_ENSURE_PROJECTS, WEALTH_LEVEL_DESCRIPTIONS } from './WealthCorePage';

export default function WealthExcellencePage() {
  return (
    <LevelOverviewPage
      level="excellence"
      levelColor="#8b5cf6"
      pillars={WEALTH_PILLARS}
      storageKey={WEALTH_STORAGE_KEY}
      ensureProjects={WEALTH_ENSURE_PROJECTS}
      levelRoutes={WEALTH_LEVEL_ROUTES}
      boardPrefix="wealth"
      levelDescriptions={WEALTH_LEVEL_DESCRIPTIONS}
    />
  );
}
