import { Sparkles, HandHeart, BookOpen } from 'lucide-react';
import '@components/faith/PathToExcellenceCards.css';

const CARDS = [
  {
    id: 'foundation',
    Icon: Sparkles,
    title: 'Foundation: Land Stewardship',
    body: 'Care for the soil, water, and seed \u2014 the earth is a mosque, and tending it is an act of worship.',
    cta: 'Tend & Plant',
  },
  {
    id: 'obligation',
    Icon: HandHeart,
    title: 'Obligation: Seasonal Rhythm',
    body: 'Live by the cycles Allah set in the earth \u2014 plant, tend, harvest, rest, reflect.',
    cta: 'Walk the Season',
  },
  {
    id: 'aspiration',
    Icon: BookOpen,
    title: 'Aspiration: Residency & Waqf',
    body: 'Build a permanent community of trust \u2014 a waqf of land and of lives dedicated to Allah.',
    cta: 'Root Deeply',
  },
];

export default function MoontrancePathToExcellenceCards() {
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
