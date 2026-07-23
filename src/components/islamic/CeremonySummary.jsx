import { ArrowRight } from 'lucide-react';
import { useSettingsStore } from '@store/settings-store';
import { MODULES } from '@data/modules';
import { resolveCeremonyData, ONGOING_DUA } from '@data/islamic/islamic-data';
import AttributeCard from './AttributeCard';
import DuaSection from './DuaSection';
import './CeremonySummary.css';

// A condensed, read-only preview of a threshold ceremony: the du'a (or the
// universal-layer mindfulness line) plus the first couple of governing
// attributes, then a button that hands off to the real ceremony.
//
// Readiness / pause / confirm deliberately stay out — those belong to
// ThresholdModal. This is the doorway, not the door.

const ATTR_PREVIEW_COUNT = 2;

const CLOSING_MINDFULNESS_FALLBACK =
  'Take a moment to reflect on your session and what you accomplished.';

export default function CeremonySummary({ moduleId, type, onBegin, color = 'var(--accent)' }) {
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const isOpening = type === 'opening';

  const data = resolveCeremonyData(moduleId, valuesLayer);
  const moduleName = MODULES.find((m) => m.id === moduleId)?.name;
  const phaseLabel = isOpening ? 'Opening threshold' : 'Closing threshold';
  const beginLabel = isOpening ? 'Begin opening' : 'Begin closing';

  if (!data) {
    return (
      <div className="pp-ceremony">
        <p className="pp-ceremony__empty">
          No {isOpening ? 'opening' : 'closing'} threshold is authored for this window yet.
        </p>
      </div>
    );
  }

  const dua = isOpening ? data.dua : (data.closingDua || ONGOING_DUA);
  const mindfulness = isOpening
    ? data.mindfulness
    : (data.closingMindfulness || CLOSING_MINDFULNESS_FALLBACK);
  const attrs = (isIslamic ? data.attrs : data.principles) || [];
  const shown = attrs.slice(0, ATTR_PREVIEW_COUNT);
  const remaining = attrs.length - shown.length;

  return (
    <div className="pp-ceremony">
      <span className="pp-ceremony__eyebrow">
        {phaseLabel}{moduleName ? ` · ${moduleName}` : ''}
      </span>

      {isIslamic ? (
        <DuaSection dua={dua} color={color} />
      ) : (
        mindfulness && <p className="pp-ceremony__mindfulness">{mindfulness}</p>
      )}

      {shown.length > 0 && (
        <div className="pp-ceremony__attrs">
          {shown.map((attr, i) => (
            <AttributeCard key={i} attr={attr} color={color} />
          ))}
          {remaining > 0 && (
            <p className="pp-ceremony__more">
              +{remaining} more in the full ceremony
            </p>
          )}
        </div>
      )}

      <button type="button" className="pp-ceremony__begin" onClick={onBegin}>
        {beginLabel}
        <ArrowRight size={14} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </div>
  );
}
