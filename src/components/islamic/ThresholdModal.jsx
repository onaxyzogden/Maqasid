import { useState } from 'react';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useThresholdStore } from '../../store/threshold-store';
import { MODULES } from '../../data/modules';
import CeremonyFlow from './CeremonyFlow';
import './ThresholdModal.css';

// Thin overlay host for the ceremony. The whole interactive flow (step tabs,
// bodies, footer, citations) lives in CeremonyFlow — extracted 2026-07-27 so
// the Prophetic Path node popup can embed the same flow inline. This wrapper
// keeps what only the modal needs: threshold-store wiring, the overlay /
// leaving animation, the header with module badge + close, and the focus trap.
// File/store identifiers keep the historical "threshold" name; all user-facing
// copy says "ceremony".

export default function ThresholdModal({ type }) {
  const openingModuleId = useThresholdStore((s) => s.openingModuleId);
  const closingModuleId = useThresholdStore((s) => s.closingModuleId);
  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const setClosingModuleId = useThresholdStore((s) => s.setClosingModuleId);
  const completeOpening = useThresholdStore((s) => s.completeOpening);
  const completeClosing = useThresholdStore((s) => s.completeClosing);

  const [leaving, setLeaving] = useState(false);

  const isOpening = type === 'opening';
  const moduleId = isOpening ? openingModuleId : closingModuleId;

  // BBOS stage ceremony keys (e.g. 'bbos:IDY') have no MODULES entry
  const isBbosStage = moduleId?.startsWith('bbos:');
  const mod = isBbosStage ? null : MODULES.find((m) => m.id === moduleId);

  const close = () => {
    setLeaving(true);
    setTimeout(() => {
      setLeaving(false);
      if (isOpening) setOpeningModuleId(null);
      else setClosingModuleId(null);
    }, 200);
  };

  const handleComplete = () => {
    setLeaving(true);
    setTimeout(() => {
      if (isOpening) completeOpening(moduleId);
      else completeClosing(moduleId);
      setLeaving(false);
    }, 200);
  };

  const trapRef = useFocusTrap(!!moduleId, close);

  if (!moduleId) return null;

  return (
    <div className={`thr-overlay${leaving ? ' thr-overlay--leaving' : ''}`}>
      <div className="thr-modal" ref={trapRef} role="dialog" aria-modal="true" aria-labelledby="threshold-modal-title">
        <div className="thr-header">
          <div>
            <span className="thr-module-badge">{mod?.name || 'Objective'}</span>
            <h2 className="thr-title" id="threshold-modal-title">
              {isOpening ? 'Opening Ceremony' : 'Closing Ceremony'}
            </h2>
          </div>
          <button className="thr-close" onClick={close} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* key remounts the flow (fresh step state) when the module changes */}
        <CeremonyFlow
          key={moduleId}
          moduleId={moduleId}
          type={type}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
