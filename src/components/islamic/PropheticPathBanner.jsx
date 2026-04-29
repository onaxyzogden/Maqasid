import { Sparkles } from 'lucide-react';
import { getSpecialDayHeadline } from '@data/prophetic-path-submodules';
import './PropheticPathBanner.css';

// Single-headline strip rendered above the Prophetic Path spine. The
// resolver in `getSpecialDayHeadline` returns the highest-priority active
// event (e.g. Eid > Arafah > Last 10 Nights > Ramadan > Friday > Mon/Thu);
// when nothing matches, the banner renders nothing.
export default function PropheticPathBanner({ hijri, date = new Date() }) {
  const headline = getSpecialDayHeadline({ date, hijri });
  if (!headline) return null;
  const accent = headline.accentColor || 'var(--accent)';
  return (
    <div
      className="pp-special-day-banner"
      data-event={headline.id}
      style={{ '--banner-accent': accent }}
      role="status"
    >
      <Sparkles className="pp-special-day-banner__icon" size={16} aria-hidden="true" />
      <div className="pp-special-day-banner__body">
        <strong className="pp-special-day-banner__label">{headline.label}</strong>
        {headline.description && (
          <span className="pp-special-day-banner__desc">{headline.description}</span>
        )}
      </div>
    </div>
  );
}
