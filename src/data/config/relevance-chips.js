// Scriptural-relevance axis for grounded citations.
// See docs/grounding-schema.md §2 for definitions.
// Orthogonal to the Amanah Gate Protocol provenanceTier (Bayyinah/Qarina/Niyyah).

export const RELEVANCE_CHIPS = [
  {
    id: 'direct',
    label: 'Direct',
    description: 'The text names the practice, commands or prohibits it explicitly, or supplies the operative ruling.',
    color: '#0ea5e9',
    bg: '#0ea5e918',
  },
  {
    id: 'contextual',
    label: 'Contextual',
    description: 'The text addresses the same topic or principle and supports the subtask by reasonable inference.',
    color: '#14b8a6',
    bg: '#14b8a618',
  },
  {
    id: 'thematic',
    label: 'Thematic',
    description: 'Aligns with the spirit of the subtask without a direct textual link. Supplementary, not sufficient alone.',
    color: '#a855f7',
    bg: '#a855f718',
  },
];

export function getRelevanceChip(id) {
  return RELEVANCE_CHIPS.find((c) => c.id === id) || null;
}
