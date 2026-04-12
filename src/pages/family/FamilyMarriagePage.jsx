import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { FAMILY_PILLARS, FAMILY_LEVEL_ROUTES, FAMILY_STORAGE_KEY, FAMILY_ENSURE_PROJECTS, FAMILY_LEVEL_DESCRIPTIONS } from './FamilyCorePage';

export default function FamilyMarriagePage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['family-marriage']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="family-marriage" />;
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
