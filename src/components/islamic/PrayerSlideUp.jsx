import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import PrayerLevelPage from '@pages/shared/PrayerLevelPage';
import '@components/work/ProjectSlideUp.css';
import './PrayerSlideUp.css';

const PRAYER_DISPLAY = {
  fajr: 'Fajr',
  dhuhr: 'Dhuhr',
  asr: 'Asr',
  maghrib: 'Maghrib',
  isha: 'Isha',
  tahajjud: 'Tahajjud',
};

export default function PrayerSlideUp({ nodeId, onClose, onNavigate }) {
  const [pillarKey, setPillarKey] = useState(nodeId);

  // External nav (clicking another prayer node on the timeline) should update
  // our local state too so the FLN navigator reflects the new prayer.
  useEffect(() => { setPillarKey(nodeId); }, [nodeId]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handlePillarChange = (nextKey) => {
    setPillarKey(nextKey);
    // Bubble upstream so PropheticPath's tracked slide-up id stays in sync.
    onNavigate?.(nextKey);
  };

  const label = PRAYER_DISPLAY[pillarKey] || pillarKey;

  return createPortal(
    <div className="pp-slideup__root" role="dialog" aria-modal="true" aria-label={`Prayer: ${label}`}>
      <button
        type="button"
        className="pp-slideup__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="pp-slideup__panel pp-prayer-panel" role="document">
        <header className="pp-slideup__header">
          <div className="pp-slideup__title-wrap">
            <span className="pp-slideup__swatch" style={{ background: '#C8A96E' }} aria-hidden="true" />
            <h2 className="pp-slideup__title">{label}</h2>
          </div>
          <button type="button" className="pp-slideup__close" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={2.25} />
          </button>
        </header>
        <div className="pp-prayer-panel__body">
          <PrayerLevelPage pillarKey={pillarKey} onPillarKeyChange={handlePillarChange} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
