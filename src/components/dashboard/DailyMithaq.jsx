import { useState, useMemo } from 'react';
import { Pencil, Moon, Sunrise, CheckCircle2 } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { useAppStore } from '../../store/app-store';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import {
  MAQASID_PILLARS,
  getPillarLabel,
  getSubmoduleLabel,
} from '../../data/maqasid';
import { getFeeling, getFeelingLabel } from '../../data/niyyah-feelings';
import EveningReflectModal from './EveningReflectModal';
import './DailyMithaq.css';

/**
 * Daily Mithaq (covenant) — single widget that narrates the day's arc.
 *
 *  Morning (before Maghrib) → Niyyah state: manifesto sentence + edit pencil
 *  Evening (after Maghrib)  → Muhasaba state: manifesto + "Reflect" CTA
 *  After reflection saved    → Fulfilled state: reflection summary + edit pencil
 *
 * Replaces the paired ManifestoBanner + EveningReflectButton chips.
 *
 * Props:
 *   deepWorkPct — number (0..100). If >= 50%, the Reflect CTA shows even
 *                 before Maghrib (early-finish bonus path).
 */
export default function DailyMithaq({ deepWorkPct = 0 }) {
  const feelingId = useThresholdStore((s) => s.niyyahFeeling);
  const focus = useThresholdStore((s) => s.niyyahFocus);
  const submoduleId = useThresholdStore((s) => s.niyyahSubmodule);
  const reflection = useThresholdStore((s) => s.niyyahReflection);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const openNiyyahOverride = useAppStore((s) => s.openNiyyahOverride);
  const { timings } = usePrayerTimes();
  const [reflectOpen, setReflectOpen] = useState(false);

  const isIslamic = valuesLayer === 'islamic';
  const primaryPillarId = focus?.[0];

  /** Determine if we've passed Maghrib (Islamic day pivot). */
  const isEvening = useMemo(() => {
    // If Maghrib is known, use it as the pivot.
    if (timings?.Maghrib) {
      const clean = timings.Maghrib.replace(/\s*\(.*\)/, '');
      const [h, m] = clean.split(':').map(Number);
      const now = new Date();
      const maghrib = new Date(now);
      maghrib.setHours(h, m, 0, 0);
      return now >= maghrib;
    }
    // Fallback: 6pm local.
    return new Date().getHours() >= 18;
  }, [timings]);

  // Gate — hide entirely when no niyyah is set.
  if (!feelingId || !primaryPillarId || primaryPillarId === '_skipped' || !submoduleId) {
    return null;
  }
  const feeling = getFeeling(feelingId);
  const pillar = MAQASID_PILLARS.find((p) => p.id === primaryPillarId);
  if (!feeling || !pillar) return null;

  const feelingLabel = getFeelingLabel(feelingId, isIslamic ? 'islamic' : 'universal');
  const pillarLabel = getPillarLabel(pillar, isIslamic ? 'islamic' : 'universal');
  const submoduleLabel = getSubmoduleLabel(submoduleId, pillar.id);
  const accent = pillar.accentColor;

  // Reflection saved → fulfilled state
  if (reflection) {
    return (
      <div
        className="mithaq mithaq--fulfilled"
        style={{ '--mithaq-accent': accent }}
      >
        <span className="mithaq__rail" aria-hidden="true" />
        <div className="mithaq__body">
          <div className="mithaq__eyebrow mithaq__eyebrow--fulfilled">
            <CheckCircle2 size={12} />
            <span>{isIslamic ? "Today's muhasaba" : "Today's reflection"}</span>
          </div>
          {reflection.feeling && (
            <div className="mithaq__sentence">
              I ended the day feeling{' '}
              <em className="mithaq__accent">{reflection.feeling}</em>.
            </div>
          )}
          {reflection.note && (
            <div className="mithaq__note">&ldquo;{reflection.note}&rdquo;</div>
          )}
        </div>
        <button
          type="button"
          className="mithaq__edit"
          onClick={openNiyyahOverride}
          aria-label="Edit today's intention"
        >
          <Pencil size={14} />
        </button>
      </div>
    );
  }

  // Eligibility for evening Reflect CTA:
  // either past Maghrib, OR the user has completed 50%+ of their deep work early.
  const showReflect = isEvening || deepWorkPct >= 50;

  return (
    <>
      <div
        className={`mithaq mithaq--${showReflect ? 'evening' : 'morning'}`}
        style={{ '--mithaq-accent': accent }}
      >
        <span className="mithaq__rail" aria-hidden="true" />
        <button
          type="button"
          className="mithaq__body mithaq__body--btn"
          onClick={openNiyyahOverride}
          aria-label="Edit today's intention"
        >
          <div className="mithaq__eyebrow">
            {showReflect
              ? <><Moon size={12} /><span>{isIslamic ? "Tonight's muhasaba" : "Tonight's reflection"}</span></>
              : <><Sunrise size={12} /><span>{isIslamic ? "Today's niyyah" : "Today's intention"}</span></>
            }
          </div>
          <div className="mithaq__sentence">
            My heart feels <em className="mithaq__accent">{feelingLabel}</em>
            {isIslamic && feeling.translit && (
              <span className="mithaq__translit"> ({feeling.translit})</span>
            )}
            . I am honoring my{' '}
            <em className="mithaq__accent">{pillarLabel}</em>
            {' '}by tending to{' '}
            <em className="mithaq__accent">{submoduleLabel}</em>.
          </div>
        </button>
        {showReflect ? (
          <button
            type="button"
            className="mithaq__reflect-cta"
            onClick={() => setReflectOpen(true)}
            aria-label="Open evening reflection"
          >
            <Moon size={14} />
            <span>Reflect</span>
          </button>
        ) : (
          <button
            type="button"
            className="mithaq__edit"
            onClick={openNiyyahOverride}
            aria-label="Edit today's intention"
          >
            <Pencil size={14} />
          </button>
        )}
      </div>
      {reflectOpen && <EveningReflectModal onClose={() => setReflectOpen(false)} />}
    </>
  );
}
