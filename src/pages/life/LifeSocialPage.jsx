import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { LIFE_PILLARS, LIFE_LEVEL_ROUTES, LIFE_STORAGE_KEY, LIFE_ENSURE_PROJECTS, LIFE_LEVEL_DESCRIPTIONS } from './LifeCorePage';

export default function LifeSocialPage() {
  return (
    <PillarLevelPage
      pillarKey="social"
      boardPrefix="life"
      storageKey={LIFE_STORAGE_KEY}
      ensureProjects={LIFE_ENSURE_PROJECTS}
      pillars={LIFE_PILLARS}
      levelRoutes={LIFE_LEVEL_ROUTES}
      levelDescriptions={LIFE_LEVEL_DESCRIPTIONS}
    />
  );
}
