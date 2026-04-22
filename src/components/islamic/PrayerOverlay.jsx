import { useState, useEffect, useRef } from 'react';
import { useSettingsStore } from '../../store/settings-store';
import { useArabic } from '../../hooks/useArabic';
import { PRESENCE_CONFIG } from '@data/islamic/islamic-data';
import './PrayerOverlay.css';

export default function PrayerOverlay({ prayerName, prayerTimeMs, onDismiss }) {
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const fmt = useArabic();

  const [leaving, setLeaving] = useState(false);

  // Real-time clock — ticks every second
  const [now, setNow] = useState(() => Date.now());

  // Keep onDismiss in a ref so the interval never needs to be recreated
  const onDismissRef = useRef(onDismiss);
  useEffect(() => { onDismissRef.current = onDismiss; }, [onDismiss]);

  // Animated dismiss for user-initiated close
  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismissRef.current?.(), 200);
  };

  // Stable interval — set up once on mount, never restarts
  useEffect(() => {
    const interval = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (prayerTimeMs) {
        const windowEnd = prayerTimeMs + PRESENCE_CONFIG.PRAYER_TRAIL_MS;
        if (t >= windowEnd) {
          clearInterval(interval);
          onDismissRef.current?.();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []); // intentionally stable — immune to re-renders and prop changes

  // Derived from real time — always accurate, no drift
  const beforePrayer = prayerTimeMs ? now < prayerTimeMs : false;
  const displayMs = prayerTimeMs
    ? beforePrayer
      ? Math.max(0, prayerTimeMs - now)                                   // approaching: time TO prayer
      : Math.max(0, prayerTimeMs + PRESENCE_CONFIG.PRAYER_TRAIL_MS - now) // prayer: time until return to work
    : 0;

  const mins = Math.floor(displayMs / 60000);
  const secs = Math.floor((displayMs % 60000) / 1000);
  const timeStr = `${mins}:${String(secs).padStart(2, '0')}`;

  return (
    <div className={`prayer-overlay${leaving ? ' prayer-overlay--leaving' : ''}`} role="status" aria-live="polite">
      <div className="prayer-content" aria-labelledby="prayer-overlay-title">
        {isIslamic ? (
          <>
            <p className="prayer-basmala arabic">{fmt('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ')}</p>
            <h1 className="prayer-name" id="prayer-overlay-title">{prayerName}</h1>
            <p className="prayer-prompt">
              {beforePrayer ? 'Prayer time is approaching.' : 'It is time for prayer.'}
            </p>
          </>
        ) : (
          <>
            <h1 className="prayer-name-universal" id="prayer-overlay-title">Time for a Break</h1>
            <p className="prayer-prompt">Take a moment to stretch, breathe, and rest your eyes.</p>
          </>
        )}

        <div className="prayer-countdown">{timeStr}</div>

        <button className="prayer-dismiss" onClick={handleDismiss}>
          <span className="prayer-dismiss-ar arabic">{fmt('بِسْمِ اللَّهِ')}</span>
          <span className="prayer-dismiss-en">Bismillah</span>
        </button>
      </div>
    </div>
  );
}
