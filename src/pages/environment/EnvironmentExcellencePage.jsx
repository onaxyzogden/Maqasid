import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import { ENVIRONMENT_PILLARS, ENVIRONMENT_LEVEL_ROUTES, ENVIRONMENT_STORAGE_KEY, ENVIRONMENT_ENSURE_PROJECTS, ENVIRONMENT_LEVEL_DESCRIPTIONS } from './EnvironmentCorePage';

export default function EnvironmentExcellencePage() {
  return (
    <LevelOverviewPage
      level="excellence"
      levelColor="#8b5cf6"
      pillars={ENVIRONMENT_PILLARS}
      storageKey={ENVIRONMENT_STORAGE_KEY}
      ensureProjects={ENVIRONMENT_ENSURE_PROJECTS}
      levelRoutes={ENVIRONMENT_LEVEL_ROUTES}
      boardPrefix="environment"
      levelDescriptions={ENVIRONMENT_LEVEL_DESCRIPTIONS}
    />
  );
}
