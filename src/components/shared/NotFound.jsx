import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Shared "nothing here" state for unknown routes, pillars and objectives —
// always with a way back, never a dead end.
export default function NotFound({
  title = 'Page not found',
  message = 'This link may be out of date, or the page has moved.',
  to = '/app',
  linkLabel = 'Back to Dashboard',
}) {
  return (
    <div role="status" style={{ padding: 'var(--space-8) var(--space-4)', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--text)' }}>{title}</h2>
      <p style={{ color: 'var(--text2)', marginTop: 'var(--space-2)' }}>{message}</p>
      <Link
        to={to}
        className="btn btn-secondary"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-5)', minHeight: 44 }}
      >
        <ArrowLeft size={16} aria-hidden="true" /> {linkLabel}
      </Link>
    </div>
  );
}
