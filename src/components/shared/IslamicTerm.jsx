// MILOS-side wrapper around @ogden/ui-components' IslamicTerm.
// The package component is "pure": it takes an `entry` object plus
// `tooltipsEnabled` / `showDiacritics` flags as props. This wrapper preserves
// the MILOS call signature — `<IslamicTerm id="niyyah">label</IslamicTerm>` —
// by looking up the entry via getGlossaryEntry(id) and pulling the toggles
// from the settings store.
import { IslamicTerm as PkgIslamicTerm } from '@ogden/ui-components';
import { getGlossaryEntry } from '@data/islamic/islamic-glossary';
import { useSettingsStore } from '../../store/settings-store';

export default function IslamicTerm({ id, children, ...rest }) {
  const tooltipsEnabled = useSettingsStore((s) => s.tooltipsEnabled);
  const showDiacritics = useSettingsStore((s) => s.showDiacritics);
  const entry = getGlossaryEntry(id);
  if (!entry) return children ?? null;
  return (
    <PkgIslamicTerm
      entry={entry}
      tooltipsEnabled={tooltipsEnabled}
      showDiacritics={showDiacritics}
      {...rest}
    >
      {children}
    </PkgIslamicTerm>
  );
}
