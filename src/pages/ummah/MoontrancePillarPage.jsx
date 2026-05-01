import PillarLevelPage from '@pages/shared/PillarLevelPage';
import {
  MOONTRANCE_PILLARS,
  MOONTRANCE_LEVEL_ROUTES,
  MOONTRANCE_STORAGE_KEY,
  MOONTRANCE_ENSURE_PROJECTS,
} from '@pages/moontrance/MoontraceLevelNavigator-constants';

const MOONTRANCE_PILLAR_MODULE_MAP = {
  'moontrance-land':      'moontrance-land',
  'moontrance-seasonal':  'moontrance-seasonal',
  'moontrance-residency': 'moontrance-residency',
};

export default function MoontrancePillarPage({ pillarKey }) {
  return (
    <PillarLevelPage
      pillarKey={pillarKey}
      pillarModuleMap={MOONTRANCE_PILLAR_MODULE_MAP}
      boardPrefix="ummah"
      storageKey={MOONTRANCE_STORAGE_KEY}
      ensureProjects={MOONTRANCE_ENSURE_PROJECTS}
      pillars={MOONTRANCE_PILLARS}
      levelRoutes={MOONTRANCE_LEVEL_ROUTES}
    />
  );
}
