import { useState, useCallback } from 'react';
import { Droplets } from 'lucide-react';

const KEY = 'bbiz_hydrate_today';

function todayKey() {
  return `${KEY}_${new Date().toISOString().slice(0, 10)}`;
}

export default function HydrateWidget() {
  const [count, setCount] = useState(() => {
    try { return Number(localStorage.getItem(todayKey())) || 0; }
    catch { return 0; }
  });

  const log = useCallback(() => {
    setCount((c) => {
      const next = c + 1;
      try { localStorage.setItem(todayKey(), String(next)); } catch { /* ignore */ }
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
