import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { ENVIRONMENT_PILLARS, ENVIRONMENT_LEVEL_ROUTES, ENVIRONMENT_STORAGE_KEY, ENVIRONMENT_ENSURE_PROJECTS, ENVIRONMENT_LEVEL_DESCRIPTIONS } from './EnvironmentCorePage';

export default function EnvironmentWastePage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['env-waste']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="env-waste" />;
  return (
    <PillarLevelPage
      pillarKey="waste"
      boardPrefix="environment"
      storageKey={ENVIRONMENT_STORAGE_KEY}
      ensureProjects={ENVIRONMENT_ENSURE_PROJECTS}
      pillars={ENVIRONMENT_PILLARS}
      levelRoutes={ENVIRONMENT_LEVEL_ROUTES}
      levelDescriptions={ENVIRONMENT_LEVEL_DESCRIPTIONS}
    />
  );
}
