// Displays the current cloud sync status in the Sidebar footer.
// Visible only when authStatus === 'authenticated'.

import { useAuthStore } from '../../store/auth-store';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, RefreshCw, WifiOff, AlertTriangle, CloudOff } from 'lucide-react';

const STATUS_CONFIG = {
  idle:           { icon: CloudOff,      color: 'var(--text-muted, #999)',   label: 'Not synced' },
  syncing:        { icon: RefreshCw,     color: 'var(--accent)',              label: 'Syncing...',   spin: true },
  synced:         { icon: CheckCircle,   color: 'var(--success, #4caf50)',    label: 'Synced' },
  error:          { icon: AlertTriangle, color: 'var(--warning, #ff9800)',    label: 'Sync error' },
  conflict:       { icon: AlertTriangle, color: 'var(--warning, #ff9800)',    label: 'Conflict' },
  pull_available: { icon: RefreshCw,     color: 'var(--accent)',              label: 'Update available' },
};

export default function SyncStatusChip({ collapsed }) {
  const authStatus = useAuthStore((s) => s.authStatus);
  const syncStatus = useAuthStore((s) => s.syncStatus);
  const lastSyncedAt = useAuthStore((s) => s.lastSyncedAt);
  const applyPendingPull = useAuthStore((s) => s.applyPendingPull);

  if (authStatus !== 'authenticated') return null;

  const cfg = STATUS_CONFIG[syncStatus] ?? STATUS_CONFIG.idle;
  const Icon = cfg.icon;

  const handleClick = () => {
    if (syncStatus === 'pull_available') applyPendingPull();
    if (syncStatus === 'error') useAuthStore.getState().syncNow();
  };

  const relativeTime = lastSyncedAt
    ? formatDistanceToNow(new Date(lastSyncedAt), { addSuffix: true })
    : null;

  return (
    <button
      onClick={handleClick}
      title={syncStatus === 'pull_available' ? 'New data available — click to restore' : syncStatus === 'error' ? 'Sync failed — click to retry' : `Sync status: ${cfg.label}${relativeTime ? ` (${relativeTime})` : ''}`}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.4rem 0.6rem', borderRadius: '6px',
        border: 'none', background: 'transparent', cursor: ['pull_available', 'error'].includes(syncStatus) ? 'pointer' : 'default',
        color: cfg.color, width: '100%', justifyContent: collapsed ? 'center' : 'flex-start',
      }}
    >
      <Icon
        size={15}
        style={{
          flexShrink: 0,
          animation: cfg.spin ? 'spin 1s linear infinite' : undefined,
        }}
      />
      {!collapsed && (
        <span style={{ fontSize: '0.78rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {syncStatus === 'synced' && relativeTime ? `Synced ${relativeTime}` : cfg.label}
        </span>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
