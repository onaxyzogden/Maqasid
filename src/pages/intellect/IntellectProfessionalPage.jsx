import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { INTELLECT_PILLARS, INTELLECT_LEVEL_ROUTES, INTELLECT_STORAGE_KEY, INTELLECT_ENSURE_PROJECTS, INTELLECT_LEVEL_DESCRIPTIONS } from './IntellectCorePage';

export default function IntellectProfessionalPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['intellect-professional']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="intellect-professional" />;
  return (
    <PillarLevelPage
      pillarKey="professional"
      boardPrefix="intellect"
      storageKey={INTELLECT_STORAGE_KEY}
      ensureProjects={INTELLECT_ENSURE_PROJECTS}
      pillars={INTELLECT_PILLARS}
      levelRoutes={INTELLECT_LEVEL_ROUTES}
      levelDescriptions={INTELLECT_LEVEL_DESCRIPTIONS}
    />
  );
}
