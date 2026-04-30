// Re-exported from @ogden/ui-components so the MILOS wheel wrapper and the
// package wheel resolve to the same singleton. The package's persist key is
// "ogden-mithaq" (not "milos-mithaq"), so any pre-existing activations from
// before this migration will not carry over — they expire at next Fajr (5am)
// anyway, so the impact is at most one extra press-and-hold.
export { useMithaqStore } from '@ogden/ui-components';
