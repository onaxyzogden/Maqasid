import { useSettingsStore } from "@store/settings-store";
import { stripDiacritics } from "@/utils/arabic";

// Returns a formatter for Arabic strings honoring the global showDiacritics setting.
// Usage: const fmt = useArabic(); <span>{fmt(step.arabic)}</span>
export function useArabic() {
  const show = useSettingsStore((s) => s.showDiacritics);
  return (s) => (show ? s : stripDiacritics(s));
}
