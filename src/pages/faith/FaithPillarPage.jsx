import PillarLevelPage from '@pages/shared/PillarLevelPage';
import {
  FAITH_PILLARS,
  FAITH_LEVEL_ROUTES,
  FAITH_STORAGE_KEY,
  FAITH_ENSURE_PROJECTS,
} from './FaithLevelNavigator-constants';

// Maps pillarKey (URL/board segment) → moduleId (pillar id in FAITH_PILLARS)
const FAITH_PILLAR_MODULE_MAP = {
  shahada: 'shahada',
  salah:   'salat',
  zakah:   'zakat',
  siyam:   'siyam',
  hajj:    'hajj',
};

export default function FaithPillarPage({ pillarKey }) {
  return (
    <PillarLevelPage
      pillarKey={pillarKey}
      pillarModuleMap={FAITH_PILLAR_MODULE_MAP}
      boardPrefix="faith"
      storageKey={FAITH_STORAGE_KEY}
      ensureProjects={FAITH_ENSURE_PROJECTS}
      pillars={FAITH_PILLARS}
      levelRoutes={FAITH_LEVEL_ROUTES}
    />
  );
}
