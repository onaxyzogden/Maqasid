import { getAmanahTier } from '@data/config/amanah-tiers';

export default function AmanahTierBadge({ tier, size = 'sm' }) {
  const t = getAmanahTier(tier);
  if (!t) return null;

  const isSm = size === 'sm';

  return (
    <span
      className="amanah-tier-badge"
      title={`${t.id} (${t.label}) — ${t.description}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        padding: isSm ? '1px 6px' : '2px 8px',
        fontSize: isSm ? '0.65rem' : '0.72rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        color: t.color,
        background: t.bg,
        border: `1px solid ${t.color}30`,
        borderRadius: '4px',
        letterSpacing: '0.03em',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {t.label}
    </span>
  );
}
