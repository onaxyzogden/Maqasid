import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import { FAMILY_PILLARS, FAMILY_LEVEL_ROUTES, FAMILY_STORAGE_KEY, FAMILY_ENSURE_PROJECTS, FAMILY_LEVEL_DESCRIPTIONS } from './FamilyCorePage';

export default function FamilyExcellencePage() {
  return (
    <LevelOverviewPage
      level="excellence"
      levelColor="#8b5cf6"
      pillars={FAMILY_PILLARS}
      storageKey={FAMILY_STORAGE_KEY}
      ensureProjects={FAMILY_ENSURE_PROJECTS}
      levelRoutes={FAMILY_LEVEL_ROUTES}
      boardPrefix="family"
      levelDescriptions={FAMILY_LEVEL_DESCRIPTIONS}
    />
  );
}
