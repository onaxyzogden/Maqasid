import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { INTELLECT_PILLARS, INTELLECT_LEVEL_ROUTES, INTELLECT_STORAGE_KEY, INTELLECT_ENSURE_PROJECTS, INTELLECT_LEVEL_DESCRIPTIONS } from './IntellectCorePage';

export default function IntellectLearningPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['intellect-learning']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="intellect-learning" />;
  return (
    <PillarLevelPage
      pillarKey="learning"
      boardPrefix="intellect"
      storageKey={INTELLECT_STORAGE_KEY}
      ensureProjects={INTELLECT_ENSURE_PROJECTS}
      pillars={INTELLECT_PILLARS}
      levelRoutes={INTELLECT_LEVEL_ROUTES}
      levelDescriptions={INTELLECT_LEVEL_DESCRIPTIONS}
    />
  );
}
