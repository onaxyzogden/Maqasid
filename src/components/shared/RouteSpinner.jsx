import { Loader2 } from 'lucide-react';

/**
 * Minimal route-level loading fallback for React.lazy()-split routes.
 * Centered 24px spinner — intentionally calm so it doesn't flash for
 * fast connections.
 */
export default function RouteSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        color: 'var(--text2, #888)',
      }}
    >
      <Loader2
        size={24}
        style={{ animation: 'route-spin 900ms linear infinite' }}
      />
      <style>{`
        @keyframes route-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
