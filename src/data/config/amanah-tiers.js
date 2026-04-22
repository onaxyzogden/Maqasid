// Amanah Gate Protocol — universal evidence tiers (Bayyinah / Qarina / Niyyah).
// See wiki/concepts/amanah-gate-protocol.md for full semantics and theological grounding.
// T1/T2/T3 is the cross-product display surface; products may preserve
// internal sub-grades (e.g. BBOS G1-G4 within T1) separately.

export const AMANAH_TIERS = [
  {
    id: 'T1',
    label: 'Bayyinah',
    arabic: 'بَيِّنَة',
    description: 'Clear proof — named evidence, primary source, or documented pattern. The system may proceed.',
    color: '#22c55e',
    bg: '#22c55e18',
  },
  {
    id: 'T2',
    label: 'Qarina',
    arabic: 'قَرِينَة',
    description: 'Contextual indication — inferred, estimated, or user-provided. Proceed with awareness.',
    color: '#f59e0b',
    bg: '#f59e0b18',
  },
  {
    id: 'T3',
    label: 'Niyyah',
    arabic: 'نِيَّة',
    description: 'Declared intention — aspiration, stated but not yet evidenced. The gate holds.',
    color: '#8b5cf6',
    bg: '#8b5cf618',
  },
];

export function getAmanahTier(id) {
  return AMANAH_TIERS.find((t) => t.id === id) || null;
}
