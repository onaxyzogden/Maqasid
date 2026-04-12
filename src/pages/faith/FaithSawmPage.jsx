import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import FaithPillarPage from './FaithPillarPage';

export default function FaithSawmPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-sawm']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="faith-sawm" />;
  return <FaithPillarPage pillarKey="sawm" />;
}
