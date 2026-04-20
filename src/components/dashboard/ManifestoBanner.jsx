import { Pencil } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { useAppStore } from '../../store/app-store';
import {
  MAQASID_PILLARS,
  getPillarLabel,
  getSubmoduleLabel,
} from '../../data/maqasid';
import { getFeeling, getFeelingLabel } from '../../data/niyyah-feelings';
import './ManifestoBanner.css';

/**
 * Sticky "Daily Manifesto" banner. Reads the user's authored Ad-lib
 * sentence from threshold-store and keeps it visible at the top of
 * the dashboard all day. Click to re-edit (reopens NiyyahAct at the
 * pillars step via the existing override path).
 */
export default function ManifestoBanner() {
  const feelingId = useThresholdStore((s) => s.niyyahFeeling);
  const focus = useThresholdStore((s) => s.niyyahFocus);
  const submoduleId = useThresholdStore((s) => s.niyyahSubmodule);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const openNiyyahOverride = useAppStore((s) => s.openNiyyahOverride);

  const isIslamic = valuesLayer === 'islamic';
  const primaryPillarId = focus?.[0];

  // Hide when the user skipped or hasn't completed the Ad-lib yet.
  if (!feelingId || !primaryPillarId || primaryPillarId === '_skipped' || !submoduleId) {
    return null;
  }

  const feeling = getFeeling(feelingId);
  const pillar = MAQASID_PILLARS.find((p) => p.id === primaryPillarId);
  if (!feeling || !pillar) return null;

  const feelingLabel = getFeelingLabel(feelingId, isIslamic ? 'islamic' : 'universal');
  const pillarLabel = getPillarLabel(pillar, isIslamic ? 'islamic' : 'universal');
  const submoduleLabel = getSubmoduleLabel(submoduleId, pillar.id);

  return (
    <button
      type="button"
      className="manifesto-banner"
      onClick={openNiyyahOverride}
      style={{ '--manifesto-accent': pillar.accentColor }}
      aria-label="Edit today's intention"
    >
      <span className="manifesto-rail" aria-hidden="true" />
      <span className="manifesto-body">
        <span className="manifesto-eyebrow">
          {isIslamic ? "Today's niyyah" : "Today's intention"}
        </span>
        <span className="manifesto-sentence">
          My heart feels <em className="manifesto-accent">{feelingLabel}</em>
          {isIslamic && feeling.translit && (
            <span className="manifesto-translit"> ({feeling.translit})</span>
          )}
          . I am honoring my{' '}
          <em className="manifesto-accent">{pillarLabel}</em>
          {' '}by tending to{' '}
          <em className="manifesto-accent">{submoduleLabel}</em>.
        </span>
      </span>
      <span className="manifesto-edit" aria-hidden="true">
        <Pencil size={14} />
      </span>
    </button>
  );
}
