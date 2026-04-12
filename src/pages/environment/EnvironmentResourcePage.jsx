import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { ENVIRONMENT_PILLARS, ENVIRONMENT_LEVEL_ROUTES, ENVIRONMENT_STORAGE_KEY, ENVIRONMENT_ENSURE_PROJECTS, ENVIRONMENT_LEVEL_DESCRIPTIONS } from './EnvironmentCorePage';

export default function EnvironmentResourcePage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['env-resource']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="env-resource" />;
  return (
    <PillarLevelPage
      pillarKey="resource"
      boardPrefix="environment"
      storageKey={ENVIRONMENT_STORAGE_KEY}
      ensureProjects={ENVIRONMENT_ENSURE_PROJECTS}
      pillars={ENVIRONMENT_PILLARS}
      levelRoutes={ENVIRONMENT_LEVEL_ROUTES}
      levelDescriptions={ENVIRONMENT_LEVEL_DESCRIPTIONS}
    />
  );
}
