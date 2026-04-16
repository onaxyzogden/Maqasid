import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from './CeremonyGate';

// Route-level wrapper: renders the opening ceremony until the operator has
// completed it for this moduleId, then renders the wrapped page. Used in
// App.jsx around thin pillar-page routes so each page stays pure content.
// Thick pages (Work, Money, People, Project, FivePillars, ModulePlaceholder,
// etc.) still gate themselves in-body — this guard only handles static-id routes.
export default function CeremonyGuard({ moduleId, children }) {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening[moduleId]);
  if (import.meta.env.DEV && !moduleId) {
    console.warn('[CeremonyGuard] missing moduleId prop');
  }
  if (!hasCompletedOpening) return <CeremonyGate moduleId={moduleId} />;
  return children;
}
