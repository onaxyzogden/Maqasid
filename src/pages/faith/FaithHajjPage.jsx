import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import FaithPillarPage from './FaithPillarPage';

export default function FaithHajjPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-hajj']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="faith-hajj" />;
  return <FaithPillarPage pillarKey="hajj" />;
}
