import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import FaithPillarPage from './FaithPillarPage';

export default function FaithZakahPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-zakah']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="faith-zakah" />;
  return <FaithPillarPage pillarKey="zakah" />;
}
