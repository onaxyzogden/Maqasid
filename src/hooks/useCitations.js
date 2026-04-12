import { useAppStore } from '../store/app-store';

/**
 * Build a citation collection and map from an array of source strings.
 * Deduplicates automatically.
 *
 * @param {string[]} sources — array of source strings (may contain duplicates/nulls)
 * @returns {{ citations: string[], citationMap: Object<string,number>, citationsVisible: boolean }}
 */
export function useCitations(sources) {
  const citationsVisible = useAppStore((s) => s.citationsVisible);

  const unique = [...new Set(sources.filter(Boolean))];
  const citationMap = Object.fromEntries(unique.map((src, i) => [src, i + 1]));

  return { citations: unique, citationMap, citationsVisible };
}
