import { useCallback } from 'react';
import { BookOpen, Milestone, ExternalLink } from 'lucide-react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import MoontrancePathToExcellenceCards from '@components/moontrance/MoontrancePathToExcellenceCards';
import OverviewCards from '@components/shared/OverviewCards';
import MaqasidTable from '@components/shared/MaqasidTable';
import { useToastStore } from '@store/toastStore';
import { PILLAR_WISDOM } from '@data/pillar-wisdom';
import { PILLAR_NEXT_ACTIONS } from '@data/pillar-next-actions';
import {
  OVERVIEW as LAND_OVERVIEW,
  MAQASID as LAND_MAQASID,
} from '@data/module-overviews/moontrance-land-overview';
import {
  OVERVIEW as SEASONAL_OVERVIEW,
  MAQASID as SEASONAL_MAQASID,
} from '@data/module-overviews/moontrance-seasonal-overview';
import {
  OVERVIEW as RESIDENCY_OVERVIEW,
  MAQASID as RESIDENCY_MAQASID,
} from '@data/module-overviews/moontrance-residency-overview';
import {
  MOONTRANCE_PILLARS,
  MOONTRANCE_LEVEL_ROUTES,
  MOONTRANCE_STORAGE_KEY,
  MOONTRANCE_ENSURE_PROJECTS,
} from './MoontraceLevelNavigator';
import '../ummah/UmmahDashboard.css';

const LEVEL_PATTERN = {
  core: 'dots',
  growth: 'stripes',
  excellence: 'crosshatch',
};

const MILESTONES = [
  { id: 'mt1', label: 'Land Acquisition',      status: 'planned', desc: 'Identify and secure land for the eco-village development.' },
  { id: 'mt2', label: 'Community Formation',   status: 'planned', desc: 'Gather founding families and establish shared governance.' },
  { id: 'mt3', label: 'Infrastructure Design', status: 'planned', desc: 'Design water, energy, and agricultural systems (OLOS integration).' },
  { id: 'mt4', label: 'Waqf Entity',           status: 'planned', desc: 'Establish three-entity legal structure (Ontario Waqf model).' },
  { id: 'mt5', label: 'First Experience',      status: 'planned', desc: 'Launch the first Moontrance collective experience.' },
];

const FRAMEWORKS = [
  {
    id: 'moontrance-land',
    label: 'Land',
    desc: 'Land acquisition, soil stewardship (khilafah), water systems, regenerative agriculture.',
    color: 'var(--mod-moontrance-land)',
    overview: LAND_OVERVIEW,
    maqasid: LAND_MAQASID,
    grounding: 'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 2:30, 7:56, 55:10.',
  },
  {
    id: 'moontrance-seasonal',
    label: 'Seasonal',
    desc: 'Seasonal participation pathway \u2014 planting, tending, harvest, and reflection.',
    color: 'var(--mod-moontrance-seasonal)',
    overview: SEASONAL_OVERVIEW,
    maqasid: SEASONAL_MAQASID,
    grounding: 'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 6:99, 36:33-35, 14:24-25.',
  },
  {
    id: 'moontrance-residency',
    label: 'Residency',
    desc: 'Long-term community formation, residency model, trust-building, and permanence.',
    color: 'var(--mod-moontrance-residency)',
    overview: RESIDENCY_OVERVIEW,
    maqasid: RESIDENCY_MAQASID,
    grounding: 'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 59:9, 49:13, 42:38.',
  },
];

export default function MoontranceLevelOverview({ level, levelColor }) {
  const pushToast = useToastStore((s) => s.push);

  const onReach100 = useCallback(
    (seg) => {
      pushToast({
        message: `Your consistency in ${seg.label} has flourished today.`,
        pillar: seg.label,
        levelColor,
      });
    },
    [pushToast, levelColor],
  );

  return (
    <>
      <LevelOverviewPage
        level={level}
        levelColor={levelColor}
        pillars={MOONTRANCE_PILLARS}
        storageKey={MOONTRANCE_STORAGE_KEY}
        ensureProjects={MOONTRANCE_ENSURE_PROJECTS}
        levelRoutes={MOONTRANCE_LEVEL_ROUTES}
        boardPrefix="ummah"
        showComparisonWheel
        wheelCenterLabel="MOONTRANCE"
        wheelExtraProps={{
          levelPattern: LEVEL_PATTERN[level] || 'dots',
          level,
          onReach100,
          pillarWisdom: PILLAR_WISDOM.moontrance,
          nextActions: PILLAR_NEXT_ACTIONS.moontrance,
        }}
        ComparisonWheelComponent={MaqasidComparisonWheel}
        ExcellenceCardsComponent={MoontrancePathToExcellenceCards}
      />

      {/* Milestones + Frameworks + OLOS Bridge — rendered below the unified
          module template per the Faith/Life/etc. layout. */}
      <div className="ummah-dash ummah-dash--appendix">
        <section className="ummah-section">
          <h2 className="ummah-section-title">
            <Milestone size={18} />
            MTC Milestones
          </h2>
          <p className="ummah-section-desc">
            Islamic eco-village development &mdash; CSRA offer architecture and Waqf-based governance.
          </p>
          <div className="ummah-milestones">
            {MILESTONES.map((ms, i) => (
              <div key={ms.id} className={`ummah-milestone ummah-milestone--${ms.status}`}>
                <div className="ummah-ms-number">{i + 1}</div>
                <div className="ummah-ms-body">
                  <h4>{ms.label}</h4>
                  <p>{ms.desc}</p>
                </div>
                <span className="ummah-ms-status">{ms.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ummah-section">
          <h2 className="ummah-section-title">
            <BookOpen size={18} />
            Frameworks
          </h2>
          <p className="ummah-section-desc">
            Qur&rsquo;anic grounding and Maqasid mapping for each Moontrance submodule.
          </p>
          <div className="ummah-frameworks">
            {FRAMEWORKS.map((fw) => (
              <details
                key={fw.id}
                className="ummah-framework"
                style={{ '--fw-color': fw.color }}
              >
                <summary className="ummah-framework-summary">
                  <span className="ummah-framework-dot" />
                  <span className="ummah-framework-label">{fw.label}</span>
                  <span className="ummah-framework-desc">{fw.desc}</span>
                </summary>
                <div className="ummah-framework-body">
                  <OverviewCards
                    items={fw.overview}
                    moduleColor={fw.color}
                    grounding={fw.grounding}
                  />
                  <MaqasidTable data={fw.maqasid} moduleColor={fw.color} />
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="ummah-section">
          <h2 className="ummah-section-title">
            <ExternalLink size={18} />
            OLOS Bridge
          </h2>
          <div className="ummah-atlas">
            <div className="ummah-atlas-body">
              <h3>OGDEN OLOS</h3>
              <p>Land design feasibility platform, water systems design, and parameterized land templates. OLOS provides the spatial intelligence layer for MTC development.</p>
            </div>
            <span className="ummah-atlas-status">Not Connected</span>
          </div>
        </section>
      </div>
    </>
  );
}
