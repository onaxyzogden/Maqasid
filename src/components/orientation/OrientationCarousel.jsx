import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getPillarLabel } from '../../data/maqasid';
import OrientationCard from './OrientationCard';

// Horizontal scroll-snap carousel of the seven Maqasid cards, one centred with
// its neighbours peeking (~11% each side, matching the prototype). Below it a
// dot row doubles as a position indicator and a recommended-domain marker.
//
// Scroll → nearest-card tracking, initial centring, and re-centring are done by
// nudging the track's own scrollLeft (scrollBy on a computed delta) rather than
// element.scrollIntoView — scrollIntoView can also scroll ancestor containers
// vertically (a page jump); scrollBy on the track only ever moves the track.
// All layout reads happen inside effects/handlers, never the render body.
export default function OrientationCarousel({ cards, valuesLayer, focusPillarId, onOpenCard }) {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const recIndex = cards.findIndex((c) => c.isRecommended);
  const [viewIndex, setViewIndex] = useState(recIndex < 0 ? 0 : recIndex);

  const centerEl = useCallback((el, behavior) => {
    const track = trackRef.current;
    if (!track || !el) return;
    const tr = track.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const delta = (er.left + er.width / 2) - (tr.left + tr.width / 2);
    // Honour reduced-motion for programmatic scrolling (CSS transitions are
    // already gated globally in tokens.css, but scroll behaviour is not).
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: delta, behavior: reduce ? 'auto' : behavior });
  }, []);

  const nearestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const tr = track.getBoundingClientRect();
    const cx = tr.left + tr.width / 2;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dist = Math.abs((r.left + r.width / 2) - cx);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    return best;
  }, []);

  // Debounced scroll → view index, so the dots track the swipe (90ms settle,
  // matching the prototype).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let timer;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setViewIndex(nearestIndex()), 90);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => { track.removeEventListener('scroll', onScroll); clearTimeout(timer); };
  }, [nearestIndex]);

  // Establish the initial centre on the recommended card, instantly (no smooth
  // animation on first paint). Runs once on mount by design.
  useLayoutEffect(() => {
    const i = recIndex < 0 ? 0 : recIndex;
    centerEl(cardRefs.current[i], 'auto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-centre (smooth) when the container asks us to focus a different pillar
  // — e.g. after a task completes and the recommendation moves. Skips the first
  // run (mount centring is handled above) and looks the card up by id, so it
  // never goes stale on the cards array.
  const firstFocus = useRef(true);
  useEffect(() => {
    if (firstFocus.current) { firstFocus.current = false; return undefined; }
    if (!focusPillarId) return undefined;
    const track = trackRef.current;
    const el = track?.querySelector(`[data-pillar="${CSS.escape(focusPillarId)}"]`);
    if (!el) return undefined;
    const t = setTimeout(() => centerEl(el, 'smooth'), 160);
    return () => clearTimeout(t);
  }, [focusPillarId, centerEl]);

  return (
    <>
      <div
        className="orient-carousel"
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Maqasid domains"
      >
        {cards.map((card, i) => (
          <OrientationCard
            key={card.pillar.id}
            card={card}
            valuesLayer={valuesLayer}
            onOpen={onOpenCard}
            ref={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
      </div>

      <div className="orient-dots">
        {cards.map((card, i) => (
          <button
            key={card.pillar.id}
            type="button"
            className="orient-dots__wrap"
            aria-label={getPillarLabel(card.pillar, valuesLayer)}
            aria-current={i === viewIndex ? 'true' : undefined}
            onClick={() => centerEl(cardRefs.current[i], 'smooth')}
          >
            <span className={`orient-dots__dot${i === viewIndex ? ' orient-dots__dot--cur' : ''}`} />
            <span
              className={`orient-dots__mark${i === recIndex ? '' : ' orient-dots__mark--hide'}`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </>
  );
}
