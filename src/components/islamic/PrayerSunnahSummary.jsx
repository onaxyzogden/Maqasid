import { useSettingsStore } from '@store/settings-store';
import { getPrayerPhaseSunnah } from '@data/seed-tasks/prayer-seed-tasks';
import './PrayerSunnahSummary.css';

// Condensed, read-only card of a single prayer's before/after Sunnah
// (rawatib), shown in the Prophetic Path node popup's Before / After tabs for
// the six prayer nodes. Replaces the generic faith-salah CeremonySummary on
// those nodes so each prayer surfaces its OWN hadith-graded sunan instead of
// one identical du'a. All content comes from PRAYER_GUIDE via
// getPrayerPhaseSunnah — this authors no fiqh, it only presents it.
//
// Honors valuesLayer: islamic shows the Arabic text of the grounding source;
// universal suppresses Arabic script and shows the translation only (matching
// DuaSection / AttributeCard).

const TIER_LABEL = {
  T1: "Mu'akkadah",
  T2: "Ghayr mu'akkadah",
  T3: 'Optional',
};

function formatCount(count) {
  if (typeof count === 'number') {
    return `${count} rakʿah${count === 1 ? '' : 's'}`;
  }
  return count; // e.g. "Pairs of 2", "1, 3, 5, 7 or 9"
}

export default function PrayerSunnahSummary({ prayerId, phase }) {
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';

  const data = getPrayerPhaseSunnah(prayerId, phase);
  if (!data) return null;

  const { prayerLabel, rows, fallbackNote } = data;

  return (
    <div className="pp-sunnah">
      <span className="pp-sunnah__eyebrow">
        Sunnah {phase} {prayerLabel}
      </span>

      {rows.length === 0 ? (
        <p className="pp-sunnah__none">
          {fallbackNote || 'No specific rawātib is authored for this window.'}
        </p>
      ) : (
        rows.map((row, i) => {
          const src = row.sources[0];
          const extraRefs = row.sources.slice(1).map((s) => s.ref).filter(Boolean);
          return (
            <div className="pp-sunnah__row" key={`${row.kind}-${i}`}>
              <div className="pp-sunnah__head">
                <span className="pp-sunnah__badge">{formatCount(row.count)}</span>
                {row.tier && (
                  <span className="pp-sunnah__tier" data-tier={row.tier}>
                    {TIER_LABEL[row.tier] || row.tier}
                  </span>
                )}
              </div>

              {row.note && <p className="pp-sunnah__note">{row.note}</p>}
              {row.why && <p className="pp-sunnah__why">{row.why}</p>}

              {src && (
                <div className="pp-sunnah__src">
                  {isIslamic && src.arabic && (
                    <p className="pp-sunnah__ar" dir="rtl" lang="ar">
                      {src.arabic}
                    </p>
                  )}
                  {src.translation && (
                    <p className="pp-sunnah__tr">&ldquo;{src.translation}&rdquo;</p>
                  )}
                  {src.ref && (
                    <p className="pp-sunnah__ref">
                      {src.ref}
                      {src.hadithGrade ? ` · ${src.hadithGrade}` : ''}
                      {extraRefs.length > 0 ? ` · ${extraRefs.join(' · ')}` : ''}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
