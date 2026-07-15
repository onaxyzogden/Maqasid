import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useSettingsStore } from '../../store/settings-store';
import { useArabic } from '../../hooks/useArabic';
import { PRESENCE_CONFIG } from '@data/islamic/islamic-data';
import './PrayerOverlay.css';

// Slim, non-blocking prayer-time banner. Shows that it is time to pray without
// stopping the user from working — it is clearly dismissible and also clears
// itself once the prayer window (PRAYER_TRAIL_MS after the prayer) has passed.
export default function PrayerOverlay({ prayerName, prayerTimeMs, onDismiss }) {
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const fmt = useArabic();

  const [leaving, setLeaving] = useState(false);

  // Whether we are still before the prayer's start time — flips once at prayerTimeMs.
  const [beforePrayer, setBeforePrayer] = useState(
    () => (prayerTimeMs ? Date.now() < prayerTimeMs : false)
  );

  // Keep onDismiss in a ref so the timers never need to be recreated.
  const onDismissRef = useRef(onDismiss);
  useEffect(() => { onDismissRef.current = onDismiss; }, [onDismiss]);

  // Animated dismiss for user-initiated close.
  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismissRef.current?.(), 200);
  };

  // Two lightweight timers — no per-second tick, no visible countdown:
  //   1. flip the message from "approaching" to "it is time" at prayerTimeMs
  //   2. auto-clear the banner once the prayer window has fully passed
  // beforePrayer's starting value comes from the useState initializer above;
  // AppShell mounts a fresh PrayerOverlay per prayer, so prayerTimeMs is stable
  // for this instance and never needs a synchronous reset here.
  useEffect(() => {
    if (!prayerTimeMs) return undefined;
    const timers = [];

    const msToPrayer = prayerTimeMs - Date.now();
    if (msToPrayer > 0) {
      timers.push(setTimeout(() => setBeforePrayer(false), msToPrayer));
    }

    const msToEnd = prayerTimeMs + PRESENCE_CONFIG.PRAYER_TRAIL_MS - Date.now();
    if (msToEnd > 0) {
      timers.push(setTimeout(() => onDismissRef.current?.(), msToEnd));
    } else {
      onDismissRef.current?.();
    }

    return () => timers.forEach(clearTimeout);
  }, [prayerTimeMs]);

  return (
    <div className={`prayer-overlay${leaving ? ' prayer-overlay--leaving' : ''}`} role="status" aria-live="polite">
      <div className="prayer-content">
        {isIslamic ? (
          <p className="prayer-prompt" id="prayer-overlay-title">
            {beforePrayer
              ? `${prayerName} is approaching.`
              : `It is time for ${prayerName}.`}
          </p>
        ) : (
          <p className="prayer-prompt" id="prayer-overlay-title">
            {`Time for a break — step away when you're able.`}
          </p>
        )}

        {isIslamic && (
          <button className="prayer-dismiss" onClick={handleDismiss}>
            <span className="prayer-dismiss-ar arabic">{fmt('الْحَمْدُ لِلَّهِ')}</span>
            <span className="prayer-dismiss-en">Alhamdulillah</span>
          </button>
        )}

        <button className="prayer-close" onClick={handleDismiss} aria-label="Dismiss">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
