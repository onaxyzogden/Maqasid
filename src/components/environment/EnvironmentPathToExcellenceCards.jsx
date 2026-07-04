import { Sparkles, HandHeart, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '@components/faith/PathToExcellenceCards.css';

const CARDS = [
  {
    id: 'foundation',
    Icon: Sparkles,
    title: 'Foundation: Resource Stewardship',
    body: 'Do not waste water, food, or energy \u2014 even by a flowing river. Conservation is a sign of iman.',
    cta: 'Reduce Waste',
    route: '/app/env-resource',
  },
  {
    id: 'obligation',
    Icon: HandHeart,
    title: 'Obligation: Ethical Sourcing',
    body: 'Buy halal, just, and clean. Every purchase is a vote for the kind of world we consent to.',
    cta: 'Audit Sources',
    route: '/app/env-sourcing',
  },
  {
    id: 'aspiration',
    Icon: BookOpen,
    title: 'Aspiration: Ecosystem Khalifa',
    body: 'Plant, restore, and protect. The Prophet \ufe37 praised planting trees even at the edge of the Hour.',
    cta: 'Plant & Protect',
    route: '/app/env-ecosystem',
  },
];

export default function EnvironmentPathToExcellenceCards() {
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
