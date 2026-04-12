import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import FaithPillarPage from './FaithPillarPage';

export default function FaithShahadaPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-shahada']);
  if (!hasCompletedOpening) return <CeremonyGate moduleId="faith-shahada" />;
  return <FaithPillarPage pillarKey="shahada" />;
}
