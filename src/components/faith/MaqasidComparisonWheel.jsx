// MILOS-side wrapper around @ogden/ui-components' MaqasidComparisonWheel.
// The package wheel preserves the full MILOS prop API; this wrapper exists
// only to inject the `showDiacritics` setting from the MILOS settings store
// (the package component itself has no opinion on user preferences).
import { MaqasidComparisonWheel as PkgWheel } from '@ogden/ui-components';
import { useSettingsStore } from '../../store/settings-store';

export default function MaqasidComparisonWheel(props) {
  const showDiacritics = useSettingsStore((s) => s.showDiacritics);
  return <PkgWheel showDiacritics={showDiacritics} {...props} />;
}
