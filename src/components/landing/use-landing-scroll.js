import { useEffect, useRef, useState } from 'react';

/**
 * Scroll hooks shared by the landing page and its embedded previews.
 *
 * Extracted from PropheticPathPreview so the landing sections and the sticky
 * phone mock share one IntersectionObserver/rAF implementation rather than
 * registering a second set of scroll listeners each.
 */

/**
 * Progress 0–1 of an element travelling through the viewport, rAF-throttled.
 * Returns 0 while the element is shorter than the viewport (nothing to track).
 */
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height - vh;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref]);
  return progress;
}

const REVEAL_THRESHOLD = 0.15;

/** Is the element already showing at least THRESHOLD of itself? */
function isOnScreen(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 0;
  if (!rect.height || !vh) return false;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  return visible / Math.min(rect.height, vh) >= REVEAL_THRESHOLD;
}

/**
 * True once the element has first entered the viewport; the observer then
 * disconnects, so the reveal never replays on scroll-back.
 *
 * Backed by a fallback timer, because anything gated on this hook stays
 * invisible until it returns true. A backgrounded or non-compositing tab never
 * delivers IntersectionObserver callbacks at all — the Claude Code preview pane
 * does exactly this when it isn't displayed — so content would be stranded at
 * opacity 0 with no way back. The timer covers that, and also reveals anything
 * already on screen at mount without waiting on the observer.
 */
export function useFirstReveal(ref) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );
    io.observe(el);

    // Whichever resolves first wins; the observer usually does.
    const fallback = window.setTimeout(() => {
      if (document.visibilityState === 'hidden' || isOnScreen(el)) setRevealed(true);
    }, 0);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [ref, revealed]);
  return revealed;
}

/**
 * Convenience wrapper for section reveals: owns the ref, and hands back the
 * className to spread onto the section.
 *
 * Visibility is driven by this class toggle and never by a keyframe alone.
 * main.jsx adds `.reduce-motion` to <html> under the Claude Code preview and
 * global.css clamps every animation to 0.001ms there — an element resting at
 * opacity 0 while waiting on a keyframe would render permanently blank. With
 * the class doing the work, the clamp simply snaps it visible, which is the
 * correct degraded behaviour for genuine reduced-motion users too.
 */
export function useRevealSection() {
  const ref = useRef(null);
  const revealed = useFirstReveal(ref);
  return [ref, revealed ? 'is-in' : ''];
}
