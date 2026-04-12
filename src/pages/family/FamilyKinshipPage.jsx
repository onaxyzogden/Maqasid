import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { FAMILY_PILLARS, FAMILY_LEVEL_ROUTES, FAMILY_STORAGE_KEY, FAMILY_ENSURE_PROJECTS, FAMILY_LEVEL_DESCRIPTIONS } from './FamilyCorePage';

export default function FamilyKinshipPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['family-kinship']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="family-kinship" />;
  return (
    <PillarLevelPage
      pillarKey="kinship"
      boardPrefix="family"
      storageKey={FAMILY_STORAGE_KEY}
      ensureProjects={FAMILY_ENSURE_PROJECTS}
      pillars={FAMILY_PILLARS}
      levelRoutes={FAMILY_LEVEL_ROUTES}
      levelDescriptions={FAMILY_LEVEL_DESCRIPTIONS}
    />
  );
}
