import { useArabic } from '../../hooks/useArabic';
import './DuaSection.css';

export default function DuaSection({ dua, color, isUniversal, citationIndex, showCitations }) {
  const fmt = useArabic();
  if (!dua) return null;

  const accentColor = color || 'var(--accent)';

  return (
    <div className="dua" style={{ borderColor: accentColor + '30', background: accentColor + '08' }}>
      {/* The module colour is mixed toward the body text so the small title
          stays legible (≥4.5:1) whatever hue the caller passes. */}
      <div className="dua-title" style={{ color: `color-mix(in oklab, ${accentColor} 55%, var(--text))` }}>
        {isUniversal ? 'Mindfulness' : dua.title}
      </div>

      {!isUniversal && dua.arabic && (
        <p className="dua-arabic arabic">{fmt(dua.arabic)}</p>
      )}

      {!isUniversal && dua.trans && (
        <p className="dua-trans">{dua.trans}</p>
      )}

      <p className="dua-meaning" style={{ borderLeftColor: accentColor + '40' }}>
        {isUniversal ? (dua.meaning || dua) : dua.meaning}
      </p>

      {!isUniversal && dua.source && (
        <p className="dua-source">
          {dua.source}
          {showCitations && citationIndex != null && (
            <span className="dua-citation-badge">[{citationIndex}]</span>
          )}
        </p>
      )}
    </div>
  );
}
