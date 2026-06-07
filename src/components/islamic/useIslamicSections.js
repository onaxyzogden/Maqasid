import { useLocation } from 'react-router-dom';
import { Clock, BookOpen, Sparkles, ClipboardCheck, Activity, Moon, Quote } from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useSettingsStore } from '../../store/settings-store';
import { useCitations } from '../../hooks/useCitations';
import { getModuleData, ONGOING_DUA } from '@data/islamic/islamic-data';
import { getPillarForModule } from '../../data/maqasid';
import { getBbosStageIslamic } from '@data/bbos/bbos-stage-islamic';

/**
 * Single source of truth for the Islamic Layer panel's sections.
 *
 * Both the right-edge rail (IslamicRail) and the panel body (IslamicPanel)
 * read from this hook so their section set never drifts. Availability mirrors
 * exactly what the panel renders for the current module / values layer / route.
 *
 * @returns {Array<{ id, label, Icon, color, available }>} ordered descriptors
 */
export function useIslamicSections() {
  const activeModule = useAppStore((s) => s.activeModule);
  const activeBbosStage = useAppStore((s) => s.activeBbosStage);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const { pathname } = useLocation();

  const isIslamic = valuesLayer === 'islamic';
  const isTimelineRoute = pathname.startsWith('/app/prophetic-path');

  // Resolve the content set the panel would render (same logic as IslamicPanel).
  const data = getModuleData(activeModule, valuesLayer);
  const pillarForFallback = getPillarForModule(activeModule);
  const pillarFallbackData = pillarForFallback
    ? getModuleData(pillarForFallback.id, valuesLayer)
    : null;
  const resolvedData = data ?? pillarFallbackData;
  const bbosData = activeBbosStage ? getBbosStageIslamic(activeBbosStage) : null;
  const effectiveData = bbosData || resolvedData;

  // Content sections only show when the panel is NOT in timeline-Islamic mode
  // (which swaps in TimelineIslamicContent) and there is content to render.
  const hasContent = !(isTimelineRoute && isIslamic) && !!effectiveData;

  // Citations — only in Islamic mode, only when dua sources resolve to entries.
  const { citations } = useCitations(
    isIslamic ? [effectiveData?.dua?.source, ONGOING_DUA?.source] : []
  );
  const hasCitations = isIslamic && citations.length > 0;

  const accent = 'var(--accent)';

  const labelFor = (islamicLabel, universalLabel) => (isIslamic ? islamicLabel : universalLabel);

  return [
    { id: 'prayer', label: 'Prayer Times', Icon: Clock, color: accent, available: isIslamic },
    { id: 'opening', label: labelFor('Opening Dua', 'Set Intention'), Icon: BookOpen, color: accent, available: hasContent },
    { id: 'attributes', label: labelFor('Governing Attributes', 'Guiding Principles'), Icon: Sparkles, color: accent, available: hasContent },
    { id: 'readiness', label: 'Readiness Check', Icon: ClipboardCheck, color: accent, available: hasContent },
    { id: 'during', label: labelFor('During Work', 'Presence'), Icon: Activity, color: accent, available: hasContent },
    { id: 'reflection', label: 'Reflection', Icon: Moon, color: accent, available: hasContent },
    { id: 'citations', label: 'Citations', Icon: Quote, color: accent, available: hasCitations },
  ];
}
