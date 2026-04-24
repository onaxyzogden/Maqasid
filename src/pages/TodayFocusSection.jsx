import { Link } from 'react-router-dom';
import { Kanban, Sparkles, SquareChevronRight } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import { useAppStore } from '../store/app-store';
import { useSettingsStore } from '../store/settings-store';
import { MAQASID_PILLARS } from '../data/maqasid';
import { ICON_REGISTRY } from '../data/icon-registry';
import RippleRing from '../components/dashboard/RippleRing';
import './TodayFocusSection.css';

const PILLAR_ICONS = ICON_REGISTRY;

// pillarSummary: Array<{ pillar: object, openCount: number, overdueCount: number }>
export default function TodayFocusSection({ pillarSummary = [], primaryPillarId = null, focusProgress = null }) {
  const ringPct = focusProgress && focusProgress.total > 0
    ? (focusProgress.completed / focusProgress.total) * 100
    : 0;
  const showRing = !!focusProgress && focusProgress.total > 0 && !!primaryPillarId;
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);
  const openNiyyahOverride = useAppStore((s) => s.openNiyyahOverride);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';

  const focusedIds = (niyyahFocus || []).filter(
    (id) => id !== '_skipped' && MAQASID_PILLARS.some((p) => p.id === id)
  );

  if (focusedIds.length === 0) {
    return (
      <button className="tfs-hero" type="button" onClick={openNiyyahOverride}>
        <span className="tfs-hero__shimmer" aria-hidden="true" />
        <div className="tfs-hero__icon">
          <Sparkles size={22} />
        </div>
        <div className="tfs-hero__body">
          {isIslamic && (
            <div className="tfs-hero__eyebrow">
              <span>NIYYAH</span>
              <span className="tfs-hero__eyebrow-ar">نية</span>
            </div>
          )}
          <div className="tfs-hero__title">Begin today with intention</div>
          <div className="tfs-hero__sub">
            {isIslamic
              ? 'Choose the pillar(s) you will direct your energy toward — then the day ignites.'
              : 'Choose the pillar(s) you will direct your energy toward today.'}
          </div>
        </div>
        <div className="tfs-hero__cta-chip" aria-hidden="true">Set focus →</div>
      </button>
    );
  }

  return (
    <>
      <div className={`tfs-cards${primaryPillarId ? ' tfs-cards--sanctuary' : ''}`}>
        {focusedIds.map((pid) => {
          const pillar = MAQASID_PILLARS.find((p) => p.id === pid);
          if (!pillar) return null;
          const summary = pillarSummary.find((s) => s.pillar.id === pid);
          const openCount = summary?.openCount ?? 0;
          const overdueCount = summary?.overdueCount ?? 0;
          const meta = overdueCount > 0
            ? `${openCount} open · ${overdueCount} overdue`
            : `${openCount} open`;
          const Icon = PILLAR_ICONS[pillar.icon] ?? Kanban;
          const isSun = primaryPillarId === pid;
          const isStar = !!primaryPillarId && !isSun;
          return (
            <Link
              key={pid}
              to={`/app/pillar/${pillar.id}`}
              className={`tfs-card${isSun ? ' tfs-card--sun' : ''}${isStar ? ' tfs-card--star' : ''}`}
              style={{
                borderColor: pillar.accentColor + (isSun ? '60' : '30'),
                background: pillar.accentColor + (isSun ? '14' : '08'),
              }}
            >
              <div className="tfs-card__bar" style={{ background: pillar.accentColor }} />
              <div
                className="tfs-card__icon"
                style={{ background: pillar.accentColor + '18', color: pillar.accentColor }}
              >
                <Icon size={18} />
              </div>
              <div className="tfs-card__body">
                <div className="tfs-card__eyebrow" style={{ color: pillar.accentColor }}>
                  Today&apos;s Focus
                </div>
                <div className="tfs-card__name">{isIslamic ? pillar.sidebarLabel : pillar.universalLabel}</div>
                {isIslamic && (
                  <div className="tfs-card__arabic" style={{ color: pillar.accentColor }}>
                    {pillar.arabicRootAr}
                  </div>
                )}
                <div className="tfs-card__meta">{meta}</div>
              </div>
              {isSun && showRing && (
                <div className="tfs-card__ring" style={{ color: pillar.accentColor }}>
                  <RippleRing percent={ringPct} color={pillar.accentColor} size={52} stroke={4} />
                </div>
              )}
            </Link>
          );
        })}
      </div>
      <div className="tfs-handoff-row">
        <Link to="/app/prophetic-path-test" className="tfs-handoff">
          <SquareChevronRight size={16} />
          <span>Begin the day&apos;s rhythm</span>
        </Link>
        <button className="tfs-change" type="button" onClick={openNiyyahOverride}>
          Change focus
        </button>
      </div>
    </>
  );
}
