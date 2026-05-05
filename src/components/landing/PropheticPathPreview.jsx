import { useEffect, useRef, useState } from 'react';
import { Sun, Sunrise, Sunset, Moon, Star, Coffee, Utensils, UtensilsCrossed } from 'lucide-react';
import './PropheticPathPreview.css';

const PREVIEW_NODES = [
  {
    id: 'fajr', label: 'Fajr', time: '5:12 AM', Icon: Sunrise,
    satellite: {
      before: 'Make wudu, prepare niyyah for the day.',
      during: '2 raka’at sunnah · 2 raka’at fard.',
      after: 'Sit for adhkar al-sabah until sunrise.',
    },
  },
  {
    id: 'sahari', label: 'Sahari', time: '6:40 AM', Icon: Coffee,
    satellite: {
      before: 'Light meal window for fasting days.',
      during: 'Eat with intention — dates, water, simple food.',
      after: 'Log your fast in the tracker.',
    },
  },
  {
    id: 'duha', label: 'Duha', time: '9:18 AM', Icon: Sun,
    satellite: {
      before: 'Window opens 15 min after sunrise.',
      during: '2–8 raka’at — the prayer of the awwabin.',
      after: 'Shortest pause in the day.',
    },
  },
  {
    id: 'breakfast', label: 'Breakfast', time: '10:00 AM', Icon: Utensils,
    satellite: {
      before: 'Begin with bismillah and the right hand.',
      during: 'Eat slowly, share if you can.',
      after: 'Make the post-meal du’a.',
    },
  },
  {
    id: 'dhuhr', label: 'Dhuhr', time: '12:34 PM', Icon: Sun,
    satellite: {
      before: '4 raka’at sunnah qabliyah.',
      during: '4 raka’at fard · congregation if possible.',
      after: '2 raka’at sunnah ba’diyah.',
    },
  },
  {
    id: 'lunch', label: 'Lunch', time: '1:30 PM', Icon: UtensilsCrossed,
    satellite: {
      before: 'Pause work — the body has rights upon you.',
      during: 'Halal, balanced, no extravagance.',
      after: 'Brief rest before Asr.',
    },
  },
  {
    id: 'asr', label: 'Asr', time: '3:51 PM', Icon: Sun,
    satellite: {
      before: 'The middle prayer — guard it.',
      during: '4 raka’at fard.',
      after: 'Adhkar al-asr until Maghrib.',
    },
  },
  {
    id: 'maghrib', label: 'Maghrib', time: '6:12 PM', Icon: Sunset,
    satellite: {
      before: 'Break fast with dates and water if fasting.',
      during: '3 raka’at fard · do not delay.',
      after: '2 raka’at sunnah ba’diyah.',
    },
  },
  {
    id: 'dinner', label: 'Dinner', time: '7:00 PM', Icon: Utensils,
    satellite: {
      before: 'Family table — a barakah moment.',
      during: 'One-third food, one-third water, one-third air.',
      after: 'Walk briefly. Reflect on the day.',
    },
  },
  {
    id: 'isha', label: 'Isha', time: '7:48 PM', Icon: Moon,
    satellite: {
      before: '4 raka’at sunnah qabliyah (optional).',
      during: '4 raka’at fard.',
      after: '2 raka’at sunnah ba’diyah.',
    },
  },
  {
    id: 'witr', label: 'Witr', time: '9:30 PM', Icon: Star,
    satellite: {
      before: 'Last prayer before sleep — do not miss.',
      during: '1, 3, 5, 7, or 9 raka’at — odd-numbered.',
      after: 'Adhkar al-masa’, prepare for Tahajjud.',
    },
  },
  {
    id: 'tahajjud', label: 'Tahajjud', time: '3:00 AM', Icon: Moon,
    satellite: {
      before: 'Wake in the last third of the night.',
      during: 'The most beloved voluntary prayer.',
      after: 'Du’a is answered — ask Him.',
    },
  },
];

function useScrollProgress(ref) {
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

function useFirstReveal(ref) {
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, revealed]);
  return revealed;
}

export default function PropheticPathPreview() {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const revealed = useFirstReveal(phoneRef);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const count = PREVIEW_NODES.length;
  const scrollIdx = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
  const activeIdx = selectedIdx ?? scrollIdx;
  const active = PREVIEW_NODES[activeIdx];

  return (
    <div className="ppp-section" ref={sectionRef}>
      <div
        className={`ppp-phone ${revealed ? 'is-revealed' : ''}`}
        ref={phoneRef}
        style={{ '--ppp-active': activeIdx, '--ppp-count': count }}
      >
        <div className="ppp-phone-notch" />
        <div className="ppp-phone-screen">
          <div className="ppp-screen-header">
            <span className="ppp-screen-eyebrow">Prophetic Path</span>
            <span className="ppp-screen-date">15 Shawwal</span>
          </div>

          <div className="ppp-spine-wrap">
            <div className="ppp-spine" aria-hidden="true" />
            <ul className="ppp-nodes" role="list">
              {PREVIEW_NODES.map((node, i) => {
                const NodeIcon = node.Icon;
                const isActive = i === activeIdx;
                return (
                  <li
                    key={node.id}
                    className={`ppp-node ${isActive ? 'is-active' : ''}`}
                    style={{ '--ppp-idx': i }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => setSelectedIdx(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedIdx(i);
                      }
                    }}
                  >
                    <span className="ppp-node-dot">
                      <NodeIcon size={isActive ? 12 : 10} strokeWidth={2} />
                    </span>
                    <span className="ppp-node-label">{node.label}</span>
                    <span className="ppp-node-time">{node.time}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ppp-satellite" key={active.id}>
            <div className="ppp-satellite-title">{active.label} · {active.time}</div>
            <div className="ppp-satellite-row">
              <span className="ppp-satellite-tag">Before</span>
              <span className="ppp-satellite-text">{active.satellite.before}</span>
            </div>
            <div className="ppp-satellite-row">
              <span className="ppp-satellite-tag is-during">During</span>
              <span className="ppp-satellite-text">{active.satellite.during}</span>
            </div>
            <div className="ppp-satellite-row">
              <span className="ppp-satellite-tag">After</span>
              <span className="ppp-satellite-text">{active.satellite.after}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
