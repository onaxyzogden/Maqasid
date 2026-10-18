import { useLocation } from 'react-router-dom';
import { useOnboardingStore } from '../store/onboarding-store';

// ── Special-case route segments that map to non-obvious pillars ──
const WEALTH_SEGMENTS = new Set(['work', 'money', 'people', 'office', 'tech']);
const UMMAH_SEGMENTS  = new Set(['neighbors', 'community', 'collective']);
const NULL_SEGMENTS   = new Set(['sources', 'settings']);
const PILLAR_IDS      = new Set(['faith', 'health', 'intellect', 'family', 'wealth', 'environment', 'ummah']);

/**
 * Derive the active pillar ID from a pathname like /app/faith-shahada.
 * Handles:
 *   - /app/faith-shahada       → faith
 *   - /app/pillar/faith        → faith
 *   - /app/env-resource        → environment
 *   - /app/neighbors           → ummah
 * Returns a pillar ID string or null.
 */
export function getPillarFromPath(pathname) {
  const parts = pathname.replace('/app/', '').split('/');
  const first = parts[0];
  const second = parts[1] ?? '';

  // Handle /app/pillar/faith, /app/pillar/health, etc.
  if (first === 'pillar' && PILLAR_IDS.has(second)) return second;

  // Handle env-* routes (env-resource, env-waste, etc. → environment)
  if (first === 'env' || first.startsWith('env-')) return 'environment';

  // Handle segment-based routes (faith-shahada, wealth-finance, etc.)
  const segment = first.split('-')[0];

  if (NULL_SEGMENTS.has(segment))   return null;
  if (WEALTH_SEGMENTS.has(segment)) return 'wealth';
  if (UMMAH_SEGMENTS.has(segment))  return 'ummah';
  if (PILLAR_IDS.has(segment))      return segment;
  return null;
}

/**
 * The pillar whose first-entry intro is due on the current route, or null.
 * Shared by PillarFirstEntry (which shows it) and AppShell (which holds the
 * Resume overlay back until it has been seen).
 */
export function usePillarIntroPending() {
  const { pathname } = useLocation();
  const seenPillars = useOnboardingStore((s) => s.seenPillars);
  const pillarId = getPillarFromPath(pathname);
  return pillarId && !seenPillars.includes(pillarId) ? pillarId : null;
}
