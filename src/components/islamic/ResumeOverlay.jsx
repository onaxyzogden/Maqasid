import { useState } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useSettingsStore } from '../../store/settings-store';
import { useCitations } from '../../hooks/useCitations';
import { MODULES } from '../../data/modules';
import { getModuleData } from '@data/islamic/islamic-data';
import DuaSection from './DuaSection';
import ReferenceList from './ReferenceList';
import './ResumeOverlay.css';

export default function ResumeOverlay({ moduleId, onDismiss }) {
  const trapRef = useFocusTrap(true, onDismiss);
  const [leaving, setLeaving] = useState(false);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const mod = MODULES.find((m) => m.id === moduleId);
  const data = getModuleData(moduleId, valuesLayer);

  // Build a dua object with the resume title
  const resumeDua = isIslamic && data?.dua ? {
    ...data.dua,
    title: data.dua.resumeTitle || data.dua.title,
  } : null;

  const { citations, citationMap, citationsVisible } = useCitations(
    isIslamic && resumeDua ? [resumeDua.source] : []
  );

  if (!data) return null;

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismiss?.(), 200);
  };

  return (
    <div className={`resume-overlay${leaving ? ' resume-overlay--leaving' : ''}`}>
      <div className="resume-card" ref={trapRef} role="dialog" aria-modal="true" aria-labelledby="resume-overlay-title">
        <h2 className="resume-title" id="resume-overlay-title">
          {isIslamic ? 'Resuming Work' : 'Returning to Focus'}
        </h2>

        {mod && (
          <p className="resume-module">{mod.name}</p>
        )}

        <div className="resume-content">
          {isIslamic && resumeDua ? (
            <DuaSection dua={resumeDua} color="var(--accent)" citationIndex={citationMap[resumeDua?.source]} showCitations={citationsVisible} />
          ) : (
            <div className="resume-mindfulness">
              <p>{data.resumeMindfulness || data.mindfulness}</p>
            </div>
          )}
        </div>

        <ReferenceList citations={citations} visible={citationsVisible && isIslamic} />

        <button className="resume-btn" onClick={handleDismiss}>
          {isIslamic ? 'I am present' : "I'm here"}
        </button>
      </div>
    </div>
  );
}
