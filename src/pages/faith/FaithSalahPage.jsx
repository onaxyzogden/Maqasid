import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import FaithPillarPage from './FaithPillarPage';

export default function FaithSalahPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-salah']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="faith-salah" />;
  return <FaithPillarPage pillarKey="salah" />;
}
