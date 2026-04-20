import { useState } from 'react';
import { Moon } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import EveningReflectModal from './EveningReflectModal';

export default function EveningReflectButton({ deepWorkPct = 0 }) {
  const reflection = useThresholdStore((s) => s.niyyahReflection);
  const niyyahSubmodule = useThresholdStore((s) => s.niyyahSubmodule);
  const [open, setOpen] = useState(false);

  if (reflection) return null;
  if (!niyyahSubmodule || niyyahSubmodule === '_skipped') return null;

  const hour = new Date().getHours();
  const eligible = deepWorkPct >= 50 || hour >= 18;
  if (!eligible) return null;

  return (
    <>
      <button
        type="button"
        className="erm-chip"
        onClick={() => setOpen(true)}
        aria-label="Open evening reflection"
      >
        <Moon size={13} />
        <span>Reflect</span>
      </button>
      {open && <EveningReflectModal onClose={() => setOpen(false)} />}
    </>
  );
}
