import { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import './PrayerTime.css';

export default function PrayerTime() {
  const {
    nextPrayer, loading, error, requestLocation, setCity, requestApproximateLocation, allPrayers, timings,
  } = usePrayerTimes();
  const [cityInput, setCityInput] = useState('');

  if (loading) {
    return (
      <div className="pt-container">
        <div className="pt-loading" role="status">Loading prayer times...</div>
      </div>
    );
  }

  // Error first: a blocked location must not fall back to the bare
  // "Enable" button, which would just fail again.
  if (error) {
    return (
      <div className="pt-container">
        <div className="pt-error" role="alert">{error}</div>
        <form
          className="pt-city"
          onSubmit={(e) => { e.preventDefault(); setCity(cityInput); }}
        >
          <label className="pt-city-label" htmlFor="pt-city-input">Enter your city instead</label>
          <div className="pt-city-row">
            <input
              id="pt-city-input"
              className="pt-city-input"
              type="text"
              autoComplete="address-level2"
              placeholder="e.g. Toronto, Canada"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <button type="submit" className="pt-city-go" disabled={!cityInput.trim()}>
              Set
            </button>
          </div>
        </form>
        <button className="pt-enable" onClick={requestLocation}>
          <MapPin size={14} aria-hidden="true" /> Try device location again
        </button>
        <button className="pt-link" onClick={requestApproximateLocation}>
          Use approximate location instead
        </button>
        <p className="pt-note">Approximate location sends your IP address to ipapi.co.</p>
      </div>
    );
  }

  if (!timings) {
    return (
      <div className="pt-container">
        <button className="pt-enable" onClick={requestLocation}>
          <MapPin size={14} aria-hidden="true" />
          <span>Enable prayer times</span>
        </button>
      </div>
    );
  }

  return (
    <div className="pt-container">
      {nextPrayer && (
        <div className="pt-next">
          <div className="pt-next-label">
            <Clock size={14} />
            <span>Next Prayer</span>
          </div>
          <div className="pt-next-name">{nextPrayer.name}</div>
          <div className="pt-next-time">
            {nextPrayer.time}
            <span className="pt-countdown">
              {nextPrayer.remaining === 'tomorrow' ? 'tomorrow' : `in ${nextPrayer.remaining}`}
            </span>
          </div>
        </div>
      )}
      <div className="pt-all">
        {allPrayers.map((p) => (
          <div
            key={p.name}
            className={`pt-row ${nextPrayer?.name === p.name ? 'pt-row-next' : ''}`}
          >
            <span className="pt-prayer-name">{p.name}</span>
            <span className="pt-prayer-time">{p.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
