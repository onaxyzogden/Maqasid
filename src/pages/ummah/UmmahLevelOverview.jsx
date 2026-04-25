import { useCallback } from 'react';
import { BookOpen } from 'lucide-react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import UmmahPathToExcellenceCards from '@components/ummah/UmmahPathToExcellenceCards';
import OverviewCards from '@components/shared/OverviewCards';
import MaqasidTable from '@components/shared/MaqasidTable';
import { useToastStore } from '@store/toastStore';
import { PILLAR_WISDOM } from '@data/pillar-wisdom';
import { PILLAR_NEXT_ACTIONS } from '@data/pillar-next-actions';
import { MODULE_PALETTE } from '@data/module-palette';
import {
  OVERVIEW as COLLECTIVE_OVERVIEW,
  MAQASID as COLLECTIVE_MAQASID,
} from '@data/module-overviews/collective-overview';
import {
  OVERVIEW as NEIGHBORS_OVERVIEW,
  MAQASID as NEIGHBORS_MAQASID,
} from '@data/module-overviews/neighbors-overview';
import {
  OVERVIEW as COMMUNITY_OVERVIEW,
  MAQASID as COMMUNITY_MAQASID,
} from '@data/module-overviews/community-overview';
import {
  UMMAH_PILLARS,
  UMMAH_LEVEL_ROUTES,
  UMMAH_STORAGE_KEY,
  UMMAH_ENSURE_PROJECTS,
} from './UmmahLevelNavigator-constants';
import './UmmahDashboard.css';

const LEVEL_PATTERN = {
  core: 'dots',
  growth: 'stripes',
  excellence: 'crosshatch',
};

const FRAMEWORKS = [
  {
    id: 'collective',
    label: 'MTC',
    desc: 'Community-level coordination, shared governance, and collective wellbeing.',
    color: 'var(--mod-collective)',
    overview: COLLECTIVE_OVERVIEW,
    maqasid: COLLECTIVE_MAQASID,
    grounding: 'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 2:30, 3:103, 66:6, 51:19, 51:24-26.',
  },
  {
    id: 'neighbors',
    label: 'Neighbors',
    desc: 'Rights of neighbors, local engagement, and neighbourhood ihsan.',
    color: 'var(--mod-neighbors)',
    overview: NEIGHBORS_OVERVIEW,
    maqasid: NEIGHBORS_MAQASID,
    grounding: 'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayah 4:36. Hadith: Sunan al-Tirmidhi 1944.',
  },
  {
    id: 'community',
    label: 'Collective',
    desc: 'Broader community building, institutional engagement, and social contribution.',
    color: 'var(--mod-community)',
    overview: COMMUNITY_OVERVIEW,
    maqasid: COMMUNITY_MAQASID,
    grounding: 'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 3:110, 49:10, 5:2.',
  },
];

// Ummah pillars augmented with clearer labels for the overview template.
const UMMAH_OVERVIEW_PILLARS = UMMAH_PILLARS.map((p) => ({
  ...p,
  label: p.id === 'collective' ? 'Collective Stewardship' : p.label,
}));

export default function UmmahLevelOverview({ level, levelColor }) {
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
        pillars={UMMAH_OVERVIEW_PILLARS}
        storageKey={UMMAH_STORAGE_KEY}
        ensureProjects={UMMAH_ENSURE_PROJECTS}
        levelRoutes={UMMAH_LEVEL_ROUTES}
        boardPrefix="ummah"
        showComparisonWheel
        wheelCenterLabel="UMMAH"
        wheelExtraProps={{
          levelPattern: LEVEL_PATTERN[level] || 'dots',
          level,
          onReach100,
          pillarWisdom: PILLAR_WISDOM.ummah,
          nextActions: PILLAR_NEXT_ACTIONS.ummah,
          themeColor: MODULE_PALETTE.ummah.theme,
        }}
        ComparisonWheelComponent={MaqasidComparisonWheel}
        ExcellenceCardsComponent={UmmahPathToExcellenceCards}
      />

      {/* Frameworks — Qur\u2019anic grounding + Maqasid mapping per submodule.
          Moved to the bottom of the page per the unified module template. */}
      <div className="ummah-dash ummah-dash--appendix">
        <section className="ummah-section">
          <h2 className="ummah-section-title">
            <BookOpen size={18} />
            Frameworks
          </h2>
          <p className="ummah-section-desc">
            Qur&rsquo;anic grounding and Maqasid mapping for each Ummah submodule.
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
      </div>
    </>
  );
}
