// Shown once after a user first signs in when there is a data conflict between
// the local device and the cloud.  Three variants based on firstLoginConflict.

import { useState } from 'react';
import { useAuthStore } from '../../store/auth-store';
import { Cloud, HardDrive, RefreshCw } from 'lucide-react';

export default function FirstLoginModal() {
  const firstLoginConflict = useAuthStore((s) => s.firstLoginConflict);
  const resolveFirstLoginConflict = useAuthStore((s) => s.resolveFirstLoginConflict);
  const syncStatus = useAuthStore((s) => s.syncStatus);
  const [resolving, setResolving] = useState(false);

  if (!firstLoginConflict) return null;

  const isLoading = resolving || syncStatus === 'syncing';

  const resolve = async (choice) => {
    setResolving(true);
    await resolveFirstLoginConflict(choice);
    setResolving(false);
  };

  const overlayStyle = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999, padding: '1rem',
  };
  const cardStyle = {
    background: 'var(--surface, #1a1a2e)', border: '1px solid var(--border)',
    borderRadius: '16px', padding: '2rem', maxWidth: '440px', width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  };
  const btnBase = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer', fontSize: '0.92rem', fontWeight: 500,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    opacity: isLoading ? 0.6 : 1, transition: 'opacity 0.2s',
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        {/* has_local_and_cloud — two datasets, need to choose */}
        {firstLoginConflict === 'has_local_and_cloud' && (
          <>
            <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1rem' }}>⚖️</div>
            <h3 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--text)' }}>Data conflict</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              This device has local data <strong>and</strong> your account has saved cloud data.
              Which version should be used going forward?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={() => resolve('keep_local')} disabled={isLoading} style={{ ...btnBase, background: 'var(--accent)', color: '#fff' }}>
                <HardDrive size={16} /> Keep this device&apos;s data &amp; back up to cloud
              </button>
              <button onClick={() => resolve('use_cloud')} disabled={isLoading} style={{ ...btnBase, background: 'var(--surface-2)', color: 'var(--text)' }}>
                <Cloud size={16} /> Use my saved cloud data
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}> (page will reload)</span>
              </button>
              <button onClick={() => resolve('keep_local_no_push')} disabled={isLoading} style={{ ...btnBase, background: 'transparent', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                Decide later
              </button>
            </div>
          </>
        )}

        {/* has_local_no_cloud — offer backup */}
        {firstLoginConflict === 'has_local_no_cloud' && (
          <>
            <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1rem' }}>💾</div>
            <h3 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--text)' }}>Back up your data?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              You have data on this device. Would you like to save it to your cloud account so it&apos;s accessible from other devices?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={() => resolve('keep_local')} disabled={isLoading} style={{ ...btnBase, background: 'var(--accent)', color: '#fff' }}>
                {isLoading ? <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Cloud size={16} />}
                Yes, back up to cloud
              </button>
              <button onClick={() => resolve('keep_local_no_push')} disabled={isLoading} style={{ ...btnBase, background: 'transparent', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No thanks, I&apos;ll manage it later
              </button>
            </div>
          </>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
