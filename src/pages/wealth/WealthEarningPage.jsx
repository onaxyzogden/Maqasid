import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { WEALTH_PILLARS, WEALTH_LEVEL_ROUTES, WEALTH_STORAGE_KEY, WEALTH_ENSURE_PROJECTS, WEALTH_LEVEL_DESCRIPTIONS } from './WealthCorePage';

export default function WealthEarningPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['wealth-earning']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="wealth-earning" />;
  return (
    <PillarLevelPage
      pillarKey="earning"
      boardPrefix="wealth"
      storageKey={WEALTH_STORAGE_KEY}
      ensureProjects={WEALTH_ENSURE_PROJECTS}
      pillars={WEALTH_PILLARS}
      levelRoutes={WEALTH_LEVEL_ROUTES}
      levelDescriptions={WEALTH_LEVEL_DESCRIPTIONS}
    />
  );
}
