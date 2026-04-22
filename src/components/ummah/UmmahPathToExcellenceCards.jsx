import { Sparkles, HandHeart, BookOpen } from 'lucide-react';
import '@components/faith/PathToExcellenceCards.css';

const CARDS = [
  {
    id: 'foundation',
    Icon: Sparkles,
    title: 'Foundation: Collective Stewardship',
    body: 'Belong to the jama\u2019ah — remembrance, congregational prayer, and shared purpose protect every individual believer.',
    cta: 'Join & Serve',
  },
  {
    id: 'obligation',
    Icon: HandHeart,
    title: 'Obligation: Rights of Neighbors',
    body: 'The Prophet \ufe37 warned us so often of neighbors\u2019 rights we thought they would inherit. Know their needs; fulfill them.',
    cta: 'Reach Out',
  },
  {
    id: 'aspiration',
    Icon: BookOpen,
    title: 'Aspiration: Community Building',
    body: 'Institutions, mosques, schools, and MTC \u2014 the lasting infrastructure of a righteous ummah.',
    cta: 'Contribute',
  },
];

export default function UmmahPathToExcellenceCards() {
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
