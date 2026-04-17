import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from './CeremonyGate';

// Route-level wrapper: renders the opening ceremony until the operator has
// completed it for this moduleId, then renders the wrapped page. Used in
// App.jsx around thin pillar-page routes so each page stays pure content.
// Remaining in-body gates: Project (route-id mismatch — gates "work"),
// ModulePlaceholder / ComingSoon (dynamic moduleId from useParams),
// QuranPage / HadithPage / IslamicKnowledgePage (per-tab gates inside
// SourcesPage — intentionally not lifted to preserve per-tab semantics).
export default function CeremonyGuard({ moduleId, children }) {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening[moduleId]);
  if (import.meta.env.DEV && !moduleId) {
    console.warn('[CeremonyGuard] missing moduleId prop');
  }
  if (!hasCompletedOpening) return <CeremonyGate moduleId={moduleId} />;
  return children;
}
