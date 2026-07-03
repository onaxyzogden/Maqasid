import { Sparkles, HandHeart, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PathToExcellenceCards.css';

const CARDS = [
  {
    id: 'foundation',
    Icon: Sparkles,
    title: 'Foundation: Shahada & Salah',
    body: 'Daily declare faith with intent; establish all prayers on time with focus.',
    cta: 'Schedule & Track',
    route: '/app/faith-salah',
  },
  {
    id: 'obligation',
    Icon: HandHeart,
    title: 'Obligation: Zakah & Sawm',
    body: 'Calculate and distribute Zakah; observe full Ramadan fasting.',
    cta: 'Plan Giving',
    route: '/app/faith-zakah',
  },
  {
    id: 'aspiration',
    Icon: BookOpen,
    title: 'Aspiration: Hajj',
    body: 'Save and plan for the journey of a lifetime; fulfill the pilgrimage.',
    cta: 'Plan Hajj',
    route: '/app/faith-hajj',
  },
];

export default function PathToExcellenceCards() {
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
