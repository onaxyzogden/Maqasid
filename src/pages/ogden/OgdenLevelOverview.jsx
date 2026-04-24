import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import {
  OGDEN_SUB_PILLARS,
  OGDEN_LEVEL_ROUTES,
  OGDEN_STORAGE_KEY,
  OGDEN_ENSURE_PROJECTS,
  OGDEN_LEVELS,
  OGDEN_ACCENT,
} from '@data/ogden-ecosystem';

export default function OgdenLevelOverview({ level }) {
  return (
    <LevelOverviewPage
      level={level}
      levelColor={OGDEN_ACCENT}
      pillars={OGDEN_SUB_PILLARS}
      storageKey={OGDEN_STORAGE_KEY}
      ensureProjects={OGDEN_ENSURE_PROJECTS}
      levelRoutes={OGDEN_LEVEL_ROUTES}
      levelDescriptions={OGDEN_LEVELS}
      boardPrefix="ogden"
    />
  );
}
