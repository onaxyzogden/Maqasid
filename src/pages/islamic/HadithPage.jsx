import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import {
  Share2, Bookmark, Sparkles, Scale, RefreshCw, Landmark, Users,
  Play, BookOpen, ScrollText, Copy, Search,
} from 'lucide-react';
import './HadithPage.css';

const CATEGORIES = [
  { label: 'Faith',      Icon: Sparkles,  count: '1,240', featured: false },
  { label: 'Ethics',     Icon: Scale,     count: '890',   featured: false },
  { label: 'Daily Life', Icon: RefreshCw, count: '2,105', featured: true  },
  { label: 'Worship',    Icon: Landmark,  count: '1,560', featured: false },
  { label: 'Society',    Icon: Users,     count: '742',   featured: false },
];

const SELECTIONS = [
  {
    grade: 'Sahih',  gradeStyle: 'sahih',
    quote: '"The best among you are those who have the best manners and character."',
    narrator: 'Abdullah ibn Amr',
    source: 'Sahih Bukhari 6035',
  },
  {
    grade: 'Sahih',  gradeStyle: 'sahih',
    quote: '"None of you truly believes until he loves for his brother what he loves for himself."',
    narrator: 'Anas ibn Malik',
    source: 'Sahih Bukhari 13',
  },
  {
    grade: 'Sahih',  gradeStyle: 'sahih',
    quote: '"The most beloved of deeds to Allah are those that are most consistent, even if they are small."',
    narrator: 'Aisha',
    source: 'Sahih Bukhari 6464',
  },
];

const TRENDING = ['Sincerity', 'Patience', 'Family Ties', 'Charity', 'Knowledge'];

export default function HadithPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['hadith']);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="hadith" />;
  }

  return (
    <div className="hd-page font-manrope">
      {/* Sticky Header */}
      <header className="hd-header">
        <div className="hd-header__inner">
          <div className="hd-header__left">
            <span className="hd-header__title">The Sacred Editorial</span>
            <nav className="hd-header__tabs">
              <a className="hd-header__tab" href="#">Maqasid</a>
              <a className="hd-header__tab" href="#">Curations</a>
              <a className="hd-header__tab hd-header__tab--active" href="#">Archives</a>
            </nav>
          </div>
          <div className="hd-header__right">
            <div className="hd-search">
              <input className="hd-search__input" type="text" placeholder="Search the tradition..." />
              <Search size={16} className="hd-search__icon" />
            </div>
          </div>
        </div>
      </header>

      {/* Canvas */}
      <div className="hd-canvas">
        {/* Hero: Hadith of the Moment */}
        <div className="hd-hero">
          {/* Main hadith card (8 cols) */}
          <div className="hd-hero__main">
            <div className="hd-hero__bg-icon">
              <ScrollText size={192} strokeWidth={0.5} />
            </div>
            <div className="hd-hero__content">
              <div className="hd-hero__meta">
                <span className="hd-badge--cream">Hadith of the Moment</span>
                <span className="hd-hero__ref">• Sahih Bukhari 1:1</span>
              </div>
              <h2 className="hd-hero__quote">
                "Actions are judged by their intentions, and every man shall have only that which he intended."
              </h2>
              <p className="hd-hero__note">
                Reported by Umar bin al-Khattab. This foundational principle highlights the spiritual essence of every human endeavor.
              </p>
            </div>
            <div className="hd-hero__footer">
              <div className="hd-hero__actions">
                <button className="hd-btn hd-btn--slate">
                  <Share2 size={15} /> Share Wisdom
                </button>
                <button className="hd-btn hd-btn--light">
                  <Bookmark size={15} /> Save to Sanctuary
                </button>
              </div>
              <div className="hd-hero__avatars">
                <div className="hd-avatar hd-avatar--teal">A</div>
                <div className="hd-avatar hd-avatar--gold">U</div>
                <div className="hd-avatar hd-avatar--count">+42</div>
              </div>
            </div>
          </div>

          {/* Side bento (4 cols) */}
          <div className="hd-hero__side">
            <div className="hd-bento hd-bento--adab">
              <div>
                <h3 className="hd-bento__title">Daily Adab</h3>
                <p className="hd-bento__desc">Explore the etiquette of the Prophetic character in the modern world.</p>
              </div>
              <div className="hd-bento__icon-wrap">
                <BookOpen size={36} className="hd-bento__icon" />
              </div>
            </div>
            <div className="hd-bento hd-bento--scholarship">
              <div>
                <h3 className="hd-bento__title">Scholarship</h3>
                <p className="hd-bento__new-label">New Lecture</p>
              </div>
              <div className="hd-bento__play-row">
                <div className="hd-play-btn">
                  <Play size={20} fill="white" />
                </div>
                <span className="hd-bento__play-label">Understanding Isnād</span>
              </div>
            </div>
          </div>
        </div>

        {/* Archives */}
        <div className="hd-archives">
          <div className="hd-archives__header">
            <div>
              <h2 className="hd-archives__title">Archives</h2>
              <div className="hd-archives__underline" />
            </div>
            <a className="hd-archives__browse" href="#">Browse Complete Index</a>
          </div>
          <div className="hd-archives__grid">
            {CATEGORIES.map(({ label, Icon, count, featured }) => (
              <div key={label} className={`hd-cat-card ${featured ? 'hd-cat-card--featured' : ''}`}>
                <Icon size={24} className={`hd-cat-card__icon ${featured ? 'hd-cat-card__icon--gold' : ''}`} />
                <h4 className="hd-cat-card__name">{label}</h4>
                <p className="hd-cat-card__count">{count} Entries</p>
              </div>
            ))}
          </div>
        </div>

        {/* Refined Selections */}
        <div className="hd-feed-layout">
          {/* Feed (8 cols) */}
          <div className="hd-feed">
            <h2 className="hd-feed__title">Refined Selections</h2>
            <div className="hd-feed__list">
              {SELECTIONS.map((item, i) => (
                <div key={i} className="hd-feed-item">
                  <div className="hd-feed-item__grade">
                    <span className="hd-grade-label">Authenticated</span>
                    <span className={`hd-grade-badge hd-grade-badge--${item.gradeStyle}`}>{item.grade}</span>
                  </div>
                  <div className="hd-feed-item__body">
                    <p className="hd-feed-item__quote">{item.quote}</p>
                    <div className="hd-feed-item__meta">
                      <span>Narrated by: {item.narrator}</span>
                      <span>Source: {item.source}</span>
                      <div className="hd-feed-item__actions">
                        <Bookmark size={15} className="hd-feed-item__action-icon" />
                        <Copy size={15} className="hd-feed-item__action-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="hd-sidebar">
            <div className="hd-insight-card">
              <div className="hd-insight-card__bg" />
              <div className="hd-insight-card__content">
                <h5 className="hd-insight-card__label">Scholarly Insight</h5>
                <p className="hd-insight-card__quote">
                  "The study of Hadith is the study of the living embodiment of the Quranic message."
                </p>
                <p className="hd-insight-card__attr">— Dr. Fazlur Rahman</p>
              </div>
            </div>
            <div className="hd-trending-card">
              <h5 className="hd-trending-card__title">Trending Topics</h5>
              <div className="hd-trending-card__tags">
                {TRENDING.map((tag) => (
                  <span key={tag} className="hd-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="hd-footer">
          <span className="hd-footer__brand">The Sacred Editorial</span>
          <span className="hd-footer__copy">Built for the seeker. Guided by Tradition. © 2024</span>
          <div className="hd-footer__links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
