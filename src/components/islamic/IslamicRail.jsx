import { Play, Square } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/app-store';
import { useSettingsStore } from '../../store/settings-store';
import { useThresholdStore } from '../../store/threshold-store';
import { useIslamicSections } from './useIslamicSections';
import './IslamicRail.css';

/**
 * Always-visible vertical icon rail pinned to the far-right edge of the app
 * shell, mirroring the collapsed left sidebar. Each icon corresponds to a
 * section of the Islamic Layer panel; clicking opens the panel (if closed) and
 * scrolls/expands to that section. Desktop only — the panel keeps its own
 * mobile overlay path.
 */
export default function IslamicRail() {
  const sections = useIslamicSections();
  const islamicActiveSection = useAppStore((s) => s.islamicActiveSection);
  const islamicPanelOpen = useAppStore((s) => s.islamicPanelOpen);
  const focusIslamicSection = useAppStore((s) => s.focusIslamicSection);
  const activeModule = useAppStore((s) => s.activeModule);
  const activeBbosStage = useAppStore((s) => s.activeBbosStage);

  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';

  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const setClosingModuleId = useThresholdStore((s) => s.setClosingModuleId);
  const completedOpening = useThresholdStore((s) => s.completedOpening);
  const completedClosing = useThresholdStore((s) => s.completedClosing);

  const { pathname } = useLocation();
  const isTimelineRoute = pathname.startsWith('/app/prophetic-path');
  const ceremonyKey = isTimelineRoute
    ? 'timeline'
    : (activeBbosStage ? `bbos:${activeBbosStage}` : activeModule);
  const hasOpenedModule = !!completedOpening[ceremonyKey];
  const hasClosedModule = !!completedClosing[ceremonyKey];

  const available = sections.filter((s) => s.available);

  return (
    <nav className="il-rail" aria-label="Islamic Layer sections">
      {/* Ceremony actions — parity with the panel's Begin / Close buttons */}
      <div className="il-rail-group">
        <button
          className={`il-rail-item${hasOpenedModule ? ' done' : ''}`}
          onClick={() => setOpeningModuleId(ceremonyKey)}
          title={isIslamic ? 'Begin Module' : 'Set Intention'}
          aria-label={isIslamic ? 'Begin Module' : 'Set Intention'}
        >
          <Play size={18} />
        </button>
        <button
          className={`il-rail-item${hasClosedModule ? ' done' : ''}`}
          onClick={() => setClosingModuleId(ceremonyKey)}
          title={isIslamic ? 'Close Session' : 'Reflect & Close'}
          aria-label={isIslamic ? 'Close Session' : 'Reflect & Close'}
        >
          <Square size={18} />
        </button>
      </div>

      <div className="il-rail-divider" />

      {/* Section jump targets */}
      <div className="il-rail-group">
        {available.map(({ id, label, Icon, color }) => {
          const isActive = islamicPanelOpen && islamicActiveSection === id;
          return (
            <button
              key={id}
              className={`il-rail-item${isActive ? ' active' : ''}`}
              onClick={() => focusIslamicSection(id)}
              title={label}
              aria-label={label}
              aria-current={isActive ? 'true' : undefined}
              style={isActive ? { color } : undefined}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
