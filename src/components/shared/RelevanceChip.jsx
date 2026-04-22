import { getRelevanceChip } from '@data/config/relevance-chips';

export default function RelevanceChip({ value, size = 'sm' }) {
  const c = getRelevanceChip(value);
  if (!c) return null;

  const isSm = size === 'sm';

  return (
    <span
      className="relevance-chip"
      title={`${c.label} relevance — ${c.description}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: isSm ? '1px 6px' : '2px 8px',
        fontSize: isSm ? '0.65rem' : '0.72rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.color}30`,
        borderRadius: '4px',
        letterSpacing: '0.03em',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {c.label}
    </span>
  );
}
