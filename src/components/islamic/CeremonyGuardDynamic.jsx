import { useParams } from 'react-router-dom';
import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from './CeremonyGate';

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
  if (!hasCompletedOpening) return <CeremonyGate moduleId={moduleId} />;
  return children;
}
