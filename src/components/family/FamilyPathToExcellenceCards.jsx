import { Sparkles, HandHeart, BookOpen } from 'lucide-react';
import '@components/faith/PathToExcellenceCards.css';

const CARDS = [
  {
    id: 'foundation',
    Icon: Sparkles,
    title: 'Foundation: Marriage & Parenting',
    body: 'Honor the covenant of marriage and raise children on tawhid — the nearest trusts upon every believer.',
    cta: 'Nurture Bonds',
  },
  {
    id: 'obligation',
    Icon: HandHeart,
    title: 'Obligation: Kinship Ties',
    body: 'Maintain silat al-rahm — visit, forgive, and care for relatives; severing kinship is among the greatest sins.',
    cta: 'Reach Out',
  },
  {
    id: 'aspiration',
    Icon: BookOpen,
    title: 'Aspiration: Household of Barakah',
    body: 'Cultivate a home of mercy, remembrance, and generational faith — a sanctuary that outlives its founders.',
    cta: 'Build Legacy',
  },
];

export default function FamilyPathToExcellenceCards() {
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
