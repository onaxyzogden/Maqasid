import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { HEALTH_PILLARS, HEALTH_LEVEL_ROUTES, HEALTH_STORAGE_KEY, HEALTH_ENSURE_PROJECTS, HEALTH_LEVEL_DESCRIPTIONS } from './HealthCorePage-constants';

export default function HealthSafetyPage() {
  return (
    <PillarLevelPage
      pillarKey="safety"
      boardPrefix="health"
      storageKey={HEALTH_STORAGE_KEY}
      ensureProjects={HEALTH_ENSURE_PROJECTS}
      pillars={HEALTH_PILLARS}
      levelRoutes={HEALTH_LEVEL_ROUTES}
      levelDescriptions={HEALTH_LEVEL_DESCRIPTIONS}
    />
  );
}
