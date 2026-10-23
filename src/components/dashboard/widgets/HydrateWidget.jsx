import { useState, useCallback } from 'react';
import { Droplets } from 'lucide-react';
import { localDayKey } from '../../../lib/format-date';
import { safeGet, safeSet } from '../../../services/storage';

// Stored as bbiz_hydrate_today_<day>, the same bytes as before; going through
// storage.js lets the record sync see each glass.
export default function HydrateWidget() {
  const [count, setCount] = useState(() => Number(safeGet(`hydrate_today_${localDayKey()}`)) || 0);

  const log = useCallback(() => {
    setCount((c) => {
      const next = c + 1;
      safeSet(`hydrate_today_${localDayKey()}`, next);
      return next;
    });
  }, []);

  const goal = 8;
  const pct = Math.min(100, (count / goal) * 100);

  return (
    <div className="ctx-widget ctx-widget--hydrate">
      <div className="ctx-widget__title"><Droplets size={14} /> Hydrate</div>
      <div className="ctx-widget__big">{count}<span className="ctx-widget__unit"> / {goal} glasses</span></div>
      <div className="ctx-widget__bar">
        <div className="ctx-widget__bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="ctx-widget__actions">
        <button type="button" className="ctx-widget__btn" onClick={log}>+ Log a glass</button>
      </div>
    </div>
  );
}
