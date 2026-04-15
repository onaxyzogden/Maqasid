import { Link } from 'react-router-dom';
import { Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe, Kanban } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import { useAppStore } from '../store/app-store';
import { MAQASID_PILLARS } from '../data/maqasid';
import './TodayFocusSection.css';

const PILLAR_ICONS = { Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe };

// pillarSummary: Array<{ pillar: object, openCount: number, overdueCount: number }>
export default function TodayFocusSection({ pillarSummary }) {
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);
  const openNiyyahOverride = useAppStore((s) => s.openNiyyahOverride);

  const focusedIds = (niyyahFocus || []).filter(
    (id) => id !== '_skipped' && MAQASID_PILLARS.some((p) => p.id === id)
  );

  if (focusedIds.length === 0) {
    return (
      <div className="tfs-cta">
        <div className="tfs-cta__icon">⚡</div>
        <div className="tfs-cta__body">
          <div className="tfs-cta__title">Set your focus for today</div>
          <div className="tfs-cta__sub">Choose which pillar(s) to direct your energy toward.</div>
        </div>
        <button className="tfs-cta__btn" type="button" onClick={openNiyyahOverride}>
          Set focus →
        </button>
      </div>
    );
  }

  return (
    <div className="tfs-cards">
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
        return (
          <div
            key={pid}
            className="tfs-card"
            style={{
              borderColor: pillar.accentColor + '30',
              background: pillar.accentColor + '08',
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
              <div className="tfs-card__name">{pillar.sidebarLabel}</div>
              <div className="tfs-card__arabic" style={{ color: pillar.accentColor + '80' }}>
                {pillar.arabicRootAr}
              </div>
              <div className="tfs-card__meta">{meta}</div>
            </div>
            <Link
              to={`/app/pillar/${pillar.id}`}
              className="tfs-card__btn"
              style={{ background: pillar.accentColor + '18', color: pillar.accentColor }}
            >
              Go →
            </Link>
          </div>
        );
      })}
    </div>
  );
}
