import './Skeleton.css';

/**
 * Skeleton — shimmer placeholder for loading states.
 *
 * Per NLM design intelligence: skeleton screens are mandatory for data-heavy
 * dashboards. Shimmer animations occupy exact layout space so the page feels
 * "alive" before content slots in. Never leave the user staring at empty space.
 *
 * Usage:
 *   // Single line
 *   <Skeleton width="60%" height={16} />
 *
 *   // Card-shaped block
 *   <Skeleton height={120} radius="lg" />
 *
 *   // Preset layouts
 *   <SkeletonCard />
 *   <SkeletonStatCard />
 *   <SkeletonPillarStrip />
 */
export default function Skeleton({
  width = '100%',
  height = 14,
  radius = 'sm',
  className = '',
  style = {},
}) {
  return (
    <div
      className={`skeleton skeleton--${radius} ${className}`}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  );
}

/** A generic module card skeleton — title + 3 lines of text */
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`skeleton-card ${className}`} aria-hidden="true">
      <div className="skeleton-card__header">
        <Skeleton width={28} height={28} radius="sm" />
        <div className="skeleton-card__title-wrap">
          <Skeleton width="55%" height={14} />
          <Skeleton width="35%" height={12} />
        </div>
      </div>
      <div className="skeleton-card__body">
        <Skeleton width="100%" height={12} />
        <Skeleton width="90%" height={12} />
        <Skeleton width="70%" height={12} />
      </div>
    </div>
  );
}

/** Stat card skeleton — icon + number + label */
export function SkeletonStatCard({ className = '' }) {
  return (
    <div className={`skeleton-stat ${className}`} aria-hidden="true">
      <Skeleton width={32} height={32} radius="sm" />
      <div className="skeleton-stat__text">
        <Skeleton width="50%" height={22} />
        <Skeleton width="70%" height={12} />
      </div>
    </div>
  );
}

/** Pillar progress strip row skeleton */
export function SkeletonPillarRow({ className = '' }) {
  return (
    <div className={`skeleton-pillar-row ${className}`} aria-hidden="true">
      <Skeleton width={8} height={40} radius="xs" />
      <div className="skeleton-pillar-row__content">
        <Skeleton width="40%" height={14} />
        <Skeleton width="100%" height={6} radius="full" />
      </div>
      <Skeleton width={32} height={20} radius="sm" />
    </div>
  );
}

/** Dashboard grid skeleton — 4 stat cards + 3 pillar rows */
export function SkeletonDashboard() {
  return (
    <div className="skeleton-dashboard" aria-hidden="true" aria-label="Loading dashboard…">
      <div className="skeleton-dashboard__stats">
        {[0, 1].map((i) => <SkeletonStatCard key={i} />)}
      </div>
      <div className="skeleton-dashboard__pillars">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <SkeletonPillarRow key={i} />)}
      </div>
    </div>
  );
}
