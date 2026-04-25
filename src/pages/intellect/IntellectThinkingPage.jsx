import PillarLevelPage from '@pages/shared/PillarLevelPage';
import { INTELLECT_PILLARS, INTELLECT_LEVEL_ROUTES, INTELLECT_STORAGE_KEY, INTELLECT_ENSURE_PROJECTS, INTELLECT_LEVEL_DESCRIPTIONS } from './IntellectCorePage-constants';

export default function IntellectThinkingPage() {
  return (
    <PillarLevelPage
      pillarKey="thinking"
      boardPrefix="intellect"
      storageKey={INTELLECT_STORAGE_KEY}
      ensureProjects={INTELLECT_ENSURE_PROJECTS}
      pillars={INTELLECT_PILLARS}
      levelRoutes={INTELLECT_LEVEL_ROUTES}
      levelDescriptions={INTELLECT_LEVEL_DESCRIPTIONS}
    />
  );
}
