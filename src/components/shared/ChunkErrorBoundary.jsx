import { Component } from 'react';
import { RefreshCw } from 'lucide-react';

/**
 * Error boundary for React.lazy() chunks. When a chunk fails to load
 * (network blip, stale cache after a deploy), the bare Suspense fallback
 * spins indefinitely. This boundary catches the error and offers a retry.
 *
 * Usage:
 *   <ChunkErrorBoundary>
 *     <Suspense fallback={<RouteSpinner />}>
 *       <LazyRoute />
 *     </Suspense>
 *   </ChunkErrorBoundary>
 */
export default class ChunkErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.warn('[ChunkErrorBoundary] caught lazy-load error:', error, info);
  }

  handleRetry = () => {
    // Hard reload — re-fetches the chunk manifest and any new build's hashes.
    if (typeof window !== 'undefined') window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '40vh',
          gap: 'var(--space-3, 12px)',
          padding: 'var(--space-4, 16px)',
          color: 'var(--text2, #888)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text, #222)' }}>
          {this.props.label || 'Could not load this section.'}
        </div>
        <div style={{ fontSize: 13, maxWidth: 320 }}>
          A network or cache issue prevented loading. Reload to try again.
        </div>
        <button
          type="button"
          onClick={this.handleRetry}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            fontSize: 13,
            border: '1px solid var(--border, #ccc)',
            borderRadius: 6,
            background: 'var(--surface, #fff)',
            color: 'var(--text, #222)',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }
}
