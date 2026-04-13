import { Component } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error(`[ErrorBoundary${this.props.name ? `: ${this.props.name}` : ''}]`, error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md, 8px)',
          background: 'color-mix(in srgb, var(--pri-urgent, #ef4444) 8%, var(--surface, #fff))',
          border: '1px solid color-mix(in srgb, var(--pri-urgent, #ef4444) 20%, transparent)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.82rem',
          color: 'var(--text2, #666)',
        }}>
          <AlertTriangle size={16} style={{ color: 'var(--pri-urgent, #ef4444)', flexShrink: 0 }} />
          <span style={{ flex: 1 }}>
            {this.props.name ? `${this.props.name} failed to render` : 'Something went wrong'}
          </span>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              border: '1px solid var(--border, #ddd)',
              borderRadius: 'var(--radius-sm, 4px)',
              background: 'var(--bg, #fff)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              color: 'var(--text2, #666)',
            }}
          >
            <RotateCcw size={12} />
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
