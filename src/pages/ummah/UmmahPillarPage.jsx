import PillarLevelPage from '@pages/shared/PillarLevelPage';
import {
  UMMAH_PILLARS,
  UMMAH_LEVEL_ROUTES,
  UMMAH_STORAGE_KEY,
  UMMAH_ENSURE_PROJECTS,
} from './UmmahLevelNavigator';

// Identity map — pillarKey segments match module IDs exactly
const UMMAH_PILLAR_MODULE_MAP = {
  'moontrance-land':      'moontrance-land',
  'moontrance-seasonal':  'moontrance-seasonal',
  'moontrance-residency': 'moontrance-residency',
};

export default function UmmahPillarPage({ pillarKey }) {
  return (
    <PillarLevelPage
      pillarKey={pillarKey}
      pillarModuleMap={UMMAH_PILLAR_MODULE_MAP}
      boardPrefix="ummah"
      storageKey={UMMAH_STORAGE_KEY}
      ensureProjects={UMMAH_ENSURE_PROJECTS}
      pillars={UMMAH_PILLARS}
      levelRoutes={UMMAH_LEVEL_ROUTES}
    />
  );
}
