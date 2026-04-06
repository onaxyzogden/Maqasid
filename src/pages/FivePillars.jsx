import { CheckCircle2, Circle } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarHeader from '../components/shared/PillarHeader';
import { FIVE_PILLARS } from '../data/five-pillars-content';
import './FivePillars.css';

function PillarCard({ pillar }) {
  return (
    <div className="fp-card">
      {/* Header */}
      <div className="fp-card__header">
        <span className="fp-card__order">{pillar.order}</span>
        <div className="fp-card__names">
          <div className="fp-card__name">{pillar.name}</div>
          <div className="fp-card__meaning">{pillar.meaning}</div>
        </div>
        <span className="fp-card__arabic-name">{pillar.arabic}</span>
      </div>

      {/* Quranic Ayah */}
      <div className="fp-card__ayah">
        <div className="fp-card__ayah-arabic">{pillar.ayahArabic}</div>
        <div className="fp-card__ayah-translation">
          {pillar.ayahTranslation}
        </div>
        <div className="fp-card__ayah-ref">
          &mdash; Surah {pillar.ayahKey} (Abdel Haleem)
        </div>
      </div>

      {/* Description */}
      <p className="fp-card__desc">{pillar.description}</p>

      {/* Conditions + Virtues grid */}
      <div className="fp-card__grid">
        <div>
          <div className="fp-card__section-title">Conditions &amp; Requirements</div>
          <ul className="fp-card__list">
            {pillar.conditions.map((item, i) => (
              <li key={i} className="fp-card__list-item">
                <Circle size={10} style={{ color: 'var(--mod-five-pillars)' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="fp-card__section-title">Virtues &amp; Benefits</div>
          <ul className="fp-card__list">
            {pillar.virtues.map((item, i) => (
              <li key={i} className="fp-card__list-item">
                <CheckCircle2 size={10} style={{ color: 'var(--mod-five-pillars)' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function FivePillars() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['five-pillars']);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="five-pillars" />;
  }

  return (
    <div className="fp-page">
      <PillarHeader moduleId="five-pillars" />

      <div className="fp-cards">
        {FIVE_PILLARS.map((pillar) => (
          <PillarCard key={pillar.id} pillar={pillar} />
        ))}
      </div>

      <p className="fp-grounding">
        Grounded with quran.ai: fetch_quran &amp; fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 3:18, 2:43, 9:103, 2:183, 3:97.
      </p>
    </div>
  );
}
