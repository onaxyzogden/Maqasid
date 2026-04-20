import { useEffect, useState } from 'react';
import { Moon } from 'lucide-react';
import { usePrayerTimes } from '../../../hooks/usePrayerTimes';

function parsePrayerTime(hhmm) {
  if (!hhmm) return null;
  const [h, m] = hhmm.slice(0, 5).split(':').map(Number);
  const now = new Date();
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  if (d.getTime() < now.getTime()) d.setDate(d.getDate() + 1);
  return d;
}

export default function PrayerCountdownWidget() {
  const { nextPrayer } = usePrayerTimes();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  if (!nextPrayer) {
    return (
      <div className="ctx-widget ctx-widget--prayer">
        <div className="ctx-widget__title"><Moon size={14} /> Next Prayer</div>
        <div className="ctx-widget__muted">Enable location to see prayer times.</div>
      </div>
    );
  }

  const target = parsePrayerTime(nextPrayer.time);
  const msLeft = target ? Math.max(0, target.getTime() - now) : 0;
  const minutes = Math.floor(msLeft / 60000);
  const hours = Math.floor(minutes / 60);
  const remMin = minutes % 60;
  const label = hours > 0 ? `${hours}h ${remMin}m` : `${minutes}m`;

  return (
    <div className="ctx-widget ctx-widget--prayer">
      <div className="ctx-widget__title"><Moon size={14} /> Next Prayer</div>
      <div className="ctx-widget__big">{nextPrayer.name}</div>
      <div className="ctx-widget__meta">in {label} · {nextPrayer.time}</div>
    </div>
  );
}
