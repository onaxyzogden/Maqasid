import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { NIYYAH_FEELINGS, getFeelingLabel } from '../../data/niyyah-feelings';
import { MAQASID_PILLARS, getPillarLabel } from '../../data/maqasid';
import { useArabic } from '../../hooks/useArabic';
import Modal from '../shared/Modal';
import './EveningReflectModal.css';

export default function EveningReflectModal({ onClose }) {
  const fmt = useArabic();
  const morningFeelingId = useThresholdStore((s) => s.niyyahFeeling);
  const focus = useThresholdStore((s) => s.niyyahFocus);
  const saveReflection = useThresholdStore((s) => s.saveReflection);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';

  const [eveningFeeling, setEveningFeeling] = useState(null);
  const [note, setNote] = useState('');

  const morningLabel = morningFeelingId
    ? getFeelingLabel(morningFeelingId, isIslamic ? 'islamic' : 'universal')
    : null;
  const primaryPillar = MAQASID_PILLARS.find((p) => p.id === focus?.[0]) || null;
  const pillarLabel = primaryPillar ? getPillarLabel(primaryPillar, isIslamic ? 'islamic' : 'universal') : '';

  const handleSave = () => {
    if (!eveningFeeling) return;
    saveReflection({ feeling: eveningFeeling, note: note.trim() });
    onClose?.();
  };

  return createPortal(
    <Modal
      onClose={onClose}
      labelledBy="erm-title"
      dirty={!!eveningFeeling || !!note.trim()}
      overlayClassName="erm-overlay"
      className="erm-card"
      style={{ outline: 'none', ...(primaryPillar ? { '--erm-accent': primaryPillar.accentColor } : null) }}
    >
        <button type="button" className="erm-close" onClick={onClose} aria-label="Close">
          <X size={16} aria-hidden="true" />
        </button>
        <h2 id="erm-title" className="erm-title">Evening Reflection</h2>
        <p id="erm-prompt" className="erm-prompt">
          You set out to focus on <strong>{pillarLabel}</strong> today
          {morningLabel && <> — feeling <strong>{morningLabel}</strong></>}.
          How does your heart feel now?
        </p>

        <div className="erm-pills" role="group" aria-labelledby="erm-prompt">
          {NIYYAH_FEELINGS.map((f) => {
            const active = eveningFeeling === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                className={`erm-pill${active ? ' erm-pill--active' : ''}${f.valence === 'negative' ? ' erm-pill--neg' : ''}`}
                onClick={() => setEveningFeeling(f.id)}
              >
                <span className="erm-pill-label">
                  {isIslamic ? f.englishIslamic : f.universal}
                </span>
                {isIslamic && <span className="erm-pill-arabic">{fmt(f.arabic)}</span>}
              </button>
            );
          })}
        </div>

        <label className="erm-note">
          <span className="erm-note-label">A line for future you (optional)</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="What you learned, what felt true…"
          />
        </label>

        <div className="erm-actions">
          <button type="button" className="erm-btn erm-btn--ghost" onClick={onClose}>Later</button>
          <button
            type="button"
            className="erm-btn"
            onClick={handleSave}
            disabled={!eveningFeeling}
          >
            Save reflection
          </button>
        </div>
    </Modal>,
    document.body
  );
}
