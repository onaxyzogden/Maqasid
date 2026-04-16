import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { FAMILY_PILLARS, FAMILY_LEVEL_ROUTES, FAMILY_STORAGE_KEY, FAMILY_ENSURE_PROJECTS, FAMILY_LEVEL_DESCRIPTIONS } from './FamilyCorePage';

export default function FamilyMarriagePage() {
  return (
    <PillarLevelPage
      pillarKey="marriage"
      boardPrefix="family"
      storageKey={FAMILY_STORAGE_KEY}
      ensureProjects={FAMILY_ENSURE_PROJECTS}
      pillars={FAMILY_PILLARS}
      levelRoutes={FAMILY_LEVEL_ROUTES}
      levelDescriptions={FAMILY_LEVEL_DESCRIPTIONS}
    />
  );
}
