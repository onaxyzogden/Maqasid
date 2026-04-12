import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { LIFE_PILLARS, LIFE_LEVEL_ROUTES, LIFE_STORAGE_KEY, LIFE_ENSURE_PROJECTS, LIFE_LEVEL_DESCRIPTIONS } from './LifeCorePage';

export default function LifePhysicalPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['life-physical']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="life-physical" />;
  return (
    <PillarLevelPage
      pillarKey="physical"
      boardPrefix="life"
      storageKey={LIFE_STORAGE_KEY}
      ensureProjects={LIFE_ENSURE_PROJECTS}
      pillars={LIFE_PILLARS}
      levelRoutes={LIFE_LEVEL_ROUTES}
      levelDescriptions={LIFE_LEVEL_DESCRIPTIONS}
    />
  );
}
