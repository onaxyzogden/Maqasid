import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import { FAMILY_PILLARS, FAMILY_LEVEL_ROUTES, FAMILY_STORAGE_KEY, FAMILY_ENSURE_PROJECTS, FAMILY_LEVEL_DESCRIPTIONS } from './FamilyCorePage';

export default function FamilyGrowthPage() {
  return (
    <LevelOverviewPage
      level="growth"
      levelColor="#4ab8a8"
      pillars={FAMILY_PILLARS}
      storageKey={FAMILY_STORAGE_KEY}
      ensureProjects={FAMILY_ENSURE_PROJECTS}
      levelRoutes={FAMILY_LEVEL_ROUTES}
      boardPrefix="family"
      levelDescriptions={FAMILY_LEVEL_DESCRIPTIONS}
    />
  );
}
