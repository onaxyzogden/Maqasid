import { useThresholdStore } from '@store/threshold-store';
import { useSettingsStore } from '@store/settings-store';
import CeremonyGate from './CeremonyGate';

export default function CeremonyGuard({ moduleId, isLevel1 = false, isLevel23 = false, children }) {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening[moduleId]);
  const disableL1 = useSettingsStore((s) => s.disableL1ThresholdGate);
  const disableL23 = useSettingsStore((s) => s.disableL23ThresholdGate);
  if (import.meta.env.DEV && !moduleId) {
    console.warn('[CeremonyGuard] missing moduleId prop');
  }
  if (isLevel1 && disableL1) return children;
  if (isLevel23 && disableL23) return children;
  if (!hasCompletedOpening) return <CeremonyGate moduleId={moduleId} />;
  return children;
}
