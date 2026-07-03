import { Sparkles, HandHeart, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '@components/faith/PathToExcellenceCards.css';

const CARDS = [
  {
    id: 'foundation',
    Icon: Sparkles,
    title: 'Foundation: Halal Earning',
    body: 'Purify income — flee riba, gharar, and injustice. The one whose provision is pure has his duas answered.',
    cta: 'Audit Income',
    route: '/app/wealth-earning',
  },
  {
    id: 'obligation',
    Icon: HandHeart,
    title: 'Obligation: Zakah & Rights',
    body: 'Calculate and distribute zakah; fulfill debts, wages, and dependents\u2019 rights on time.',
    cta: 'Give Rights',
    route: '/app/wealth-ownership',
  },
  {
    id: 'aspiration',
    Icon: BookOpen,
    title: 'Aspiration: Circulation & Sadaqah Jariyah',
    body: 'Turn wealth into endowment — barakah that outlives the giver and transforms communities.',
    cta: 'Plan Waqf',
    route: '/app/wealth-circulation',
  },
];

export default function WealthPathToExcellenceCards() {
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
