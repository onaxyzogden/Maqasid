import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from './CeremonyGate';

// Route-level wrapper: renders the opening ceremony until the operator has
// completed it for this moduleId, then renders the wrapped page. Used in
// App.jsx around pillar-page routes so each page stays pure content.
// For param-driven moduleId (e.g. /app/:moduleId), use CeremonyGuardDynamic.
// Only remaining in-body gates by design: QuranPage / HadithPage /
// IslamicKnowledgePage — per-tab gates inside SourcesPage (activeTab is
// local state, not URL-driven; collapsing would change UX).
export default function CeremonyGuard({ moduleId, children }) {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening[moduleId]);
  if (import.meta.env.DEV && !moduleId) {
    console.warn('[CeremonyGuard] missing moduleId prop');
  }
  if (!hasCompletedOpening) return <CeremonyGate moduleId={moduleId} />;
  return children;
}
