import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { LIFE_PILLARS, LIFE_LEVEL_ROUTES, LIFE_STORAGE_KEY, LIFE_ENSURE_PROJECTS, LIFE_LEVEL_DESCRIPTIONS } from './LifeCorePage';

export default function LifeMentalPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['life-mental']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="life-mental" />;
  return (
    <PillarLevelPage
      pillarKey="mental"
      boardPrefix="life"
      storageKey={LIFE_STORAGE_KEY}
      ensureProjects={LIFE_ENSURE_PROJECTS}
      pillars={LIFE_PILLARS}
      levelRoutes={LIFE_LEVEL_ROUTES}
      levelDescriptions={LIFE_LEVEL_DESCRIPTIONS}
    />
  );
}
