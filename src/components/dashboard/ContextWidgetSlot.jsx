import { Sparkles } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { MAQASID_PILLARS, getSubmoduleLabel } from '../../data/maqasid';
import PrayerCountdownWidget from './widgets/PrayerCountdownWidget';
import PomodoroWidget from './widgets/PomodoroWidget';
import HydrateWidget from './widgets/HydrateWidget';
import PriorityProjectWidget from './widgets/PriorityProjectWidget';
import './ContextWidgetSlot.css';

const WIDGETS = {
  'faith-salah': PrayerCountdownWidget,
  'intellect-learning': PomodoroWidget,
  'life-physical': HydrateWidget,
  'wealth-earning': PriorityProjectWidget,
  work: PriorityProjectWidget,
};

function FocusTipWidget({ primaryPillar, submoduleId }) {
  const submoduleLabel = getSubmoduleLabel(submoduleId, primaryPillar?.id);
  return (
    <div className="ctx-widget ctx-widget--tip">
      <div className="ctx-widget__title"><Sparkles size={14} /> Focus Tip</div>
      <div className="ctx-widget__big">{submoduleLabel}</div>
      <div className="ctx-widget__muted">
        Today&apos;s intention anchors you here. Start with the smallest
        Deep Work task and let momentum carry you.
      </div>
    </div>
  );
}

export default function ContextWidgetSlot() {
  const niyyahSubmodule = useThresholdStore((s) => s.niyyahSubmodule);
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);

  if (!niyyahSubmodule || niyyahSubmodule === '_skipped') return null;

  const primaryPillarId = (niyyahFocus || []).find((id) => id && id !== '_skipped');
  const primaryPillar = MAQASID_PILLARS.find((p) => p.id === primaryPillarId) || null;
  const Widget = WIDGETS[niyyahSubmodule];

  const accent = primaryPillar?.accentColor ?? 'var(--accent)';

  return (
    <div className="ctx-widget-slot" style={{ '--ctx-accent': accent }}>
      {Widget
        ? <Widget />
        : <FocusTipWidget primaryPillar={primaryPillar} submoduleId={niyyahSubmodule} />}
    </div>
  );
}
