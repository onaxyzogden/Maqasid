import { useTechStore } from '../../store/tech-store';
import './TechOverview.css';

export default function TechOverview({ onNavigate }) {
  const monitors = useTechStore((s) => s.monitors);
  const breaches = useTechStore((s) => s.breaches);
  const darkWebEmails = useTechStore((s) => s.darkWebEmails);
  const darkWebEnabled = useTechStore((s) => s.darkWebEnabled);

  const openBreaches = breaches.filter((b) => b.status === 'open').length;
  const clearedBreaches = breaches.filter((b) => b.status === 'cleared').length;
  const activeMonitors = monitors.filter((m) => m.monitoringStatus === 'active');
  const hasIssues = openBreaches > 0 || monitors.some((m) => m.status === 'down');

  return (
    <div className="tech-overview">
      <h3 className="tech-overview-title">Tech Overview</h3>
      <p className="tech-overview-desc">
        This page is the central dashboard for managing and monitoring all tech-related activities, from dark web checks to website performance. The radar will also display any identified issues.
      </p>

      <div className="tech-overview-layout">
        <div className="tech-overview-left">
          {/* Dark Web Check card */}
          <div className="tech-overview-card">
            <div className="tech-overview-card-header">
              <span className="tech-overview-card-title">Dark Web Check</span>
              <span className={`tech-active-badge ${darkWebEnabled ? '' : 'inactive'}`}>
                <span className="tech-active-dot" /> {darkWebEnabled ? 'active' : 'inactive'}
              </span>
            </div>
            <p className="tech-overview-card-text">
              Currently monitoring <strong>{darkWebEmails.length} e-mails</strong>.
            </p>
            <div className="tech-overview-stats-row">
              <div className="tech-overview-stat">
                <span className="tech-overview-stat-num">{breaches.length}</span>
                <span>Total breaches</span>
              </div>
              <div className="tech-overview-stat">
                <span className="tech-overview-stat-num">{clearedBreaches}</span>
                <span>Cleared</span>
              </div>
              <div className="tech-overview-stat">
                <span className="tech-overview-stat-num">{openBreaches}</span>
                <span>Open</span>
              </div>
            </div>
            <button className="tech-view-list-btn" onClick={() => onNavigate('darkweb')}>View list</button>
          </div>

          {/* Website monitoring card */}
          <div className="tech-overview-card">
            <div className="tech-overview-card-header">
              <span className="tech-overview-card-title">Website monitoring</span>
              <span className={`tech-active-badge ${activeMonitors.length > 0 ? '' : 'inactive'}`}>
                <span className="tech-active-dot" /> {activeMonitors.length > 0 ? 'active' : 'inactive'}
              </span>
            </div>
            <p className="tech-overview-card-text">
              Monitoring <strong>{activeMonitors.length} websites</strong>.
            </p>
            {monitors.length > 0 && (
              <div className="tech-website-thumbs">
                {monitors.slice(0, 3).map((m) => (
                  <div key={m.id} className="tech-website-thumb">
                    <div className="tech-website-thumb-img">
                      <span>{m.url?.replace(/https?:\/\//, '').slice(0, 20)}</span>
                    </div>
                    <span className="tech-website-thumb-domain">{m.name || m.url}</span>
                  </div>
                ))}
              </div>
            )}
            <button className="tech-view-list-btn" onClick={() => onNavigate('websites')}>View all websites</button>
          </div>
        </div>

        <div className="tech-overview-right">
          {/* Radar */}
          <div className="tech-radar-container">
            <div className="tech-radar">
              <div className="tech-radar-ring tech-radar-ring-1" />
              <div className="tech-radar-ring tech-radar-ring-2" />
              <div className="tech-radar-ring tech-radar-ring-3" />
              <div className="tech-radar-ring tech-radar-ring-4" />
              <div className="tech-radar-cross" />
              <div className="tech-radar-sweep" />
              {!hasIssues && <div className="tech-radar-dot" />}
              {hasIssues && (
                <>
                  <div className="tech-radar-dot tech-radar-dot-alert" style={{ top: '30%', left: '60%' }} />
                  <div className="tech-radar-dot tech-radar-dot-alert" style={{ top: '55%', left: '35%' }} />
                </>
              )}
            </div>
          </div>

          {/* Status message */}
          <div className="tech-radar-status">
            <div className={`tech-radar-status-dot ${hasIssues ? 'warning' : ''}`} />
            <div className="tech-zen-icon">
              <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
                <circle cx="32" cy="12" r="6" fill="currentColor" />
                <path d="M32 20 c-12 0-18 8-18 16 c0 2 1 3 2 3 h32 c1 0 2-1 2-3 c0-8-6-16-18-16z" fill="currentColor" />
                <path d="M20 40 c-4 4-6 10-6 14 h36 c0-4-2-10-6-14" fill="currentColor" />
              </svg>
            </div>
            <span className={`tech-radar-status-text ${hasIssues ? 'warning' : ''}`}>
              {hasIssues ? 'Issues detected. Check your alerts.' : 'Everything is fine, for now.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
