import { useParams } from 'react-router-dom';
import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from './CeremonyGate';
import { MODULES } from '../../data/modules';
import { getPillarById } from '../../data/maqasid';

const MODULE_IDS = new Set(MODULES.map((m) => m.id));

// Param-driven variant of CeremonyGuard. Reads moduleId from the URL via
// useParams(paramKey) so catch-all routes (e.g. /app/:moduleId) can gate
// without each page importing the threshold store.
export default function CeremonyGuardDynamic({ paramKey = 'moduleId', children }) {
  const params = useParams();
  const moduleId = params[paramKey];
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening[moduleId]);
  if (import.meta.env.DEV && !moduleId) {
    console.warn(`[CeremonyGuardDynamic] missing "${paramKey}" param`);
  }
  // An id that names no module or pillar has nothing to open — let the page
  // render its "not found" state (with a way back) instead of a ceremony.
  const isKnown = MODULE_IDS.has(moduleId) || !!getPillarById(moduleId);
  if (isKnown && !hasCompletedOpening) return <CeremonyGate moduleId={moduleId} />;
  return children;
}
