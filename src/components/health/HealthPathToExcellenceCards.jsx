import { Sparkles, HandHeart, BookOpen } from 'lucide-react';
import '@components/faith/PathToExcellenceCards.css';

const CARDS = [
  {
    id: 'foundation',
    Icon: Sparkles,
    title: 'Foundation: Physical & Mental Baseline',
    body: 'Daily movement, rest, and dua for wellbeing — care for the body and mind as trusts from Allah.',
    cta: 'Schedule & Track',
  },
  {
    id: 'obligation',
    Icon: HandHeart,
    title: 'Obligation: Safety & Responsibility',
    body: 'Protect self, family, and community from harm — the preservation of life is a core maqsad.',
    cta: 'Plan Safeguards',
  },
  {
    id: 'aspiration',
    Icon: BookOpen,
    title: 'Aspiration: Social Character Excellence',
    body: 'Refined akhlaq with neighbors, strangers, and companions — beautify the character you leave behind.',
    cta: 'Grow Character',
  },
];

export default function HealthPathToExcellenceCards() {
  return (
    <div className="pte-card">
      <h2 className="pte-title">Path to Excellence: Closing the Gap</h2>
      <div className="pte-grid">
        {CARDS.map(({ id, Icon, title, body, cta }) => (
          <div key={id} className="pte-item">
            <div className="pte-item-head">
              <Icon size={20} className="pte-icon" />
              <h3 className="pte-item-title">{title}</h3>
            </div>
            <p className="pte-body">{body}</p>
            <button type="button" className="pte-cta">{cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
