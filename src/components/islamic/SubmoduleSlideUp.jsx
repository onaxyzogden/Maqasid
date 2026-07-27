import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import PillarLevelPage from '@pages/shared/PillarLevelPage';
import {
  lookupSubmodule,
  getSubmodulePillarColor,
  getSubmoduleDisplayLabel,
} from '@data/submodule-registry';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import '@components/work/ProjectSlideUp.css';

export default function SubmoduleSlideUp({ submoduleId, fallbackLabel, onClose }) {
  const trapRef = useFocusTrap(!!submoduleId, onClose);

  if (!submoduleId) return null;

  const entry = lookupSubmodule(submoduleId);
  const label = getSubmoduleDisplayLabel(submoduleId, fallbackLabel);
  const color = getSubmodulePillarColor(submoduleId);

  return createPortal(
    <div className="pp-slideup__root" role="dialog" aria-modal="true" aria-label={`Submodule: ${label}`}>
      <button
        type="button"
        className="pp-slideup__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="pp-slideup__panel pp-slideup__panel--wide" role="document" ref={trapRef}>
        <header className="pp-slideup__header">
          <div className="pp-slideup__title-wrap">
            <span className="pp-slideup__swatch" style={{ background: color }} aria-hidden="true" />
            <h2 className="pp-slideup__title">{label}</h2>
          </div>
          <button type="button" className="pp-slideup__close" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={2.25} />
          </button>
        </header>
        <div className="pp-slideup__body">
          {entry ? (
            <PillarLevelPage {...entry} />
          ) : (
            <div className="pp-slideup__empty">
              Dashboard coming soon for this module.
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
