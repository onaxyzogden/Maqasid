import { Sparkles, HandHeart, BookOpen } from 'lucide-react';
import '@components/faith/PathToExcellenceCards.css';

const CARDS = [
  {
    id: 'foundation',
    Icon: Sparkles,
    title: 'Foundation: Learning & Literacy',
    body: 'Daily reading, Quran study, and structured inquiry — seeking knowledge is an obligation upon every Muslim.',
    cta: 'Build Habit',
  },
  {
    id: 'obligation',
    Icon: HandHeart,
    title: 'Obligation: Thinking & Cognition',
    body: 'Reflect (tadabbur), question, and reason with adab — guard the intellect from heedlessness and passivity.',
    cta: 'Sharpen Mind',
  },
  {
    id: 'aspiration',
    Icon: BookOpen,
    title: 'Aspiration: Skill Mastery',
    body: 'Refine professional craft and contribute useful knowledge — beneficial knowledge outlives the one who taught it.',
    cta: 'Master Craft',
  },
];

export default function IntellectPathToExcellenceCards() {
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
