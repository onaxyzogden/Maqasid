import PillarLevelPage from '@pages/shared/PillarLevelPage';
import {
  OGDEN_SUB_PILLARS,
  OGDEN_LEVEL_ROUTES,
  OGDEN_STORAGE_KEY,
  OGDEN_ENSURE_PROJECTS,
  OGDEN_LEVELS,
} from '@data/ogden-ecosystem';

// pillarKey \u2194 moduleId (identity map for Ogden \u2014 board infix is the pillar id itself)
const OGDEN_PILLAR_MODULE_MAP = {
  bbos:  'bbos',
  milos: 'milos',
  atlas: 'atlas',
};

export default function OgdenPillarPage({ pillarKey }) {
  return (
    <PillarLevelPage
      pillarKey={pillarKey}
      pillarModuleMap={OGDEN_PILLAR_MODULE_MAP}
      boardPrefix="ogden"
      storageKey={OGDEN_STORAGE_KEY}
      ensureProjects={OGDEN_ENSURE_PROJECTS}
      pillars={OGDEN_SUB_PILLARS}
      levelRoutes={OGDEN_LEVEL_ROUTES}
      levelDescriptions={OGDEN_LEVELS}
    />
  );
}
