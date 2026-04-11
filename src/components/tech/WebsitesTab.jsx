import { useState, useMemo } from 'react';
import { Plus, X } from 'lucide-react';
import { useTechStore } from '../../store/tech-store';
import { useAuthStore } from '../../store/auth-store';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function WebsitesTab() {
  const monitors = useTechStore((s) => s.monitors);
  const addMonitor = useTechStore((s) => s.addMonitor);
  const checkMonitor = useTechStore((s) => s.checkMonitor);
  const pauseMonitor = useTechStore((s) => s.pauseMonitor);
  const resumeMonitor = useTechStore((s) => s.resumeMonitor);
  const user = useAuthStore((s) => s.user);
  const [view, setView] = useState('active');
  const [showPanel, setShowPanel] = useState(false);
  const [fName, setFName] = useState('');
  const [fUrl, setFUrl] = useState('');

  const filtered = useMemo(() => {
    if (view === 'active') return monitors.filter((m) => m.monitoringStatus !== 'paused');
    return monitors.filter((m) => m.monitoringStatus === 'paused');
  }, [monitors, view]);

  // Generate uptime data per weekday from all monitors
  const uptimeByDay = useMemo(() => {
    const days = DAYS.map((d) => ({ day: d, up: 0, down: 0 }));
    monitors.forEach((m) => {
      (m.uptimeHistory || []).forEach((h) => {
        const dayIdx = new Date(h.date + 'T12:00:00').getDay();
        days[dayIdx].up += h.upMinutes || 0;
        days[dayIdx].down += h.downMinutes || 0;
      });
    });
    return days;
  }, [monitors]);

  const maxUptime = Math.max(1, ...uptimeByDay.map((d) => d.up + d.down));

  const handleAdd = () => {
    if (!fUrl.trim()) return;
    const mon = addMonitor({ name: fName || fUrl, url: fUrl });
    checkMonitor(mon.id);
    setShowPanel(false); setFName(''); setFUrl('');
  };

  return (
    <div>
      <div className="tech-websites-filter">
        <div className="money-toggle-group">
          <button className={`money-toggle-btn ${view === 'active' ? 'active' : ''}`} onClick={() => setView('active')}>Active</button>
          <button className={`money-toggle-btn ${view === 'archived' ? 'active' : ''}`} onClick={() => setView('archived')}>Archived</button>
        </div>
        <button className="btn btn-primary" onClick={() => setShowPanel(true)} style={{ background: 'var(--mod-tech)' }}>
          <Plus size={14} /> Add Website
        </button>
      </div>

      {/* Uptime per Day chart */}
      <div className="tech-uptime-chart">
        <h4 style={{ fontSize: '0.9rem', marginBottom: 'var(--space-2)' }}>Uptime per Day:</h4>
        <div className="tech-uptime-legend">
          <div className="tech-uptime-legend-item"><div className="tech-uptime-legend-dot up" /> Up</div>
          <div className="tech-uptime-legend-item"><div className="tech-uptime-legend-dot down" /> Down</div>
        </div>
        <div className="tech-uptime-bars">
          {uptimeByDay.map((d) => {
            const total = d.up + d.down;
            const upPct = total ? (d.up / maxUptime) * 100 : 0;
            const downPct = total ? (d.down / maxUptime) * 100 : 0;
            return (
              <div key={d.day} className="tech-uptime-bar-col">
                <div className="tech-uptime-bar-stack">
                  {downPct > 0 && <div className="tech-uptime-bar-down" style={{ height: `${downPct}%` }} />}
                  {upPct > 0 && <div className="tech-uptime-bar-up" style={{ height: `${upPct}%` }} />}
                </div>
                <span className="tech-uptime-bar-label">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Website cards */}
      <div className="tech-website-cards">
        {filtered.map((mon) => {
          const initials = (user?.name || 'U').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
          const domain = mon.url?.replace(/https?:\/\//, '').replace(/\/.*/, '') || mon.name;
          const isActive = mon.monitoringStatus === 'active';
          return (
            <div key={mon.id} className="tech-website-card">
              <div className="tech-website-card-preview">
                <span>{domain}</span>
              </div>
              <div className="tech-website-card-body">
                <div className="tech-website-card-domain">{domain}</div>
                <div className="tech-website-card-status-row">
                  <span className="tech-website-card-monitoring">Monitoring</span>
                  <span className={isActive ? 'tech-website-card-active' : 'tech-website-card-paused'}>
                    {isActive ? 'ACTIVE' : 'PAUSED'}
                  </span>
                  <button className="tech-pause-btn"
                    onClick={() => isActive ? pauseMonitor(mon.id) : resumeMonitor(mon.id)}>
                    {isActive ? 'Pause' : 'Resume'}
                  </button>
                </div>
                <div className="tech-website-card-meta">
                  <span>Added by</span>
                  <span className="tech-added-by-avatar">{initials}</span>
                  <span>Created {new Date(mon.createdAt).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })} @ {new Date(mon.createdAt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="tech-zen-empty">
            <span>No {view === 'active' ? 'active' : 'archived'} websites found.</span>
          </div>
        )}
      </div>

      {/* Add Website slide-in */}
      {showPanel && (
        <div className="money-slidein-overlay" onClick={() => setShowPanel(false)}>
          <div className="money-slidein" onClick={(e) => e.stopPropagation()}>
            <div className="money-slidein-header">
              <h3>Add Website</h3>
              <button className="money-slidein-close" onClick={() => setShowPanel(false)}><X size={18} /></button>
            </div>
            <div className="money-slidein-body">
              <div className="money-field">
                <label>URL *</label>
                <input value={fUrl} onChange={(e) => setFUrl(e.target.value)} placeholder="https://example.com" autoFocus />
              </div>
              <div className="money-field">
                <label>Name</label>
                <input value={fName} onChange={(e) => setFName(e.target.value)} placeholder="My Website" />
              </div>
            </div>
            <div className="money-slidein-footer">
              <div style={{ flex: 1 }} />
              <button className="btn btn-ghost" onClick={() => setShowPanel(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!fUrl.trim()} style={{ background: 'var(--mod-tech)' }}>
                Add Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
