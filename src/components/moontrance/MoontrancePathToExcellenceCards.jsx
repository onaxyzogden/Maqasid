import { Sparkles, HandHeart, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '@components/faith/PathToExcellenceCards.css';

const CARDS = [
  {
    id: 'foundation',
    Icon: Sparkles,
    title: 'Foundation: Land Stewardship',
    body: 'Care for the soil, water, and seed \u2014 the earth is a mosque, and tending it is an act of worship.',
    cta: 'Tend & Plant',
    route: '/app/moontrance-land',
  },
  {
    id: 'obligation',
    Icon: HandHeart,
    title: 'Obligation: Seasonal Rhythm',
    body: 'Live by the cycles Allah set in the earth \u2014 plant, tend, harvest, rest, reflect.',
    cta: 'Walk the Season',
    route: '/app/moontrance-seasonal',
  },
  {
    id: 'aspiration',
    Icon: BookOpen,
    title: 'Aspiration: Residency & Waqf',
    body: 'Build a permanent community of trust \u2014 a waqf of land and of lives dedicated to Allah.',
    cta: 'Root Deeply',
    route: '/app/moontrance-residency',
  },
];

export default function MoontrancePathToExcellenceCards() {
  const navigate = useNavigate();

  return (
    <div className="pte-card">
      <h2 className="pte-title">Path to Excellence: Closing the Gap</h2>
      <div className="pte-grid">
        {CARDS.map(({ id, Icon, title, body, cta, route }) => (
          <div key={id} className="pte-item">
            <div className="pte-item-head">
              <Icon size={20} className="pte-icon" />
              <h3 className="pte-item-title">{title}</h3>
            </div>
            <p className="pte-body">{body}</p>
            <button
              type="button"
              className="pte-cta"
              onClick={() => navigate(route, { viewTransition: true })}
            >
              {cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
