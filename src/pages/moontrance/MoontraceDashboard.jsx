import { useNavigate } from 'react-router-dom';
import { Moon, MapPinned, Leaf, HousePlus, ArrowRight, Milestone, ExternalLink, BookOpen } from 'lucide-react';
import OverviewCards from '@components/shared/OverviewCards';
import MaqasidTable from '@components/shared/MaqasidTable';
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
import '../ummah/UmmahDashboard.css';

const SUBMODULES = [
  { id: 'moontrance-land',      label: 'Moontrance Land',      desc: 'Land acquisition, soil stewardship (khilafah), water systems, and regenerative agriculture.',  Icon: MapPinned, route: '/app/moontrance-land'      },
  { id: 'moontrance-seasonal',  label: 'Moontrance Seasonal',  desc: 'Seasonal participation pathway — planting, tending, harvest, and reflection.',                  Icon: Leaf,      route: '/app/moontrance-seasonal'  },
  { id: 'moontrance-residency', label: 'Moontrance Residency', desc: 'Long-term community formation, residency model, trust-building, and permanence.',               Icon: HousePlus, route: '/app/moontrance-residency' },
];

const MILESTONES = [
  { id: 'mt1', label: 'Land Acquisition',    status: 'planned', desc: 'Identify and secure land for the eco-village development.' },
  { id: 'mt2', label: 'Community Formation', status: 'planned', desc: 'Gather founding families and establish shared governance.' },
  { id: 'mt3', label: 'Infrastructure Design', status: 'planned', desc: 'Design water, energy, and agricultural systems (OLOS integration).' },
  { id: 'mt4', label: 'Waqf Entity',         status: 'planned', desc: 'Establish three-entity legal structure (Ontario Waqf model).' },
  { id: 'mt5', label: 'First Experience',    status: 'planned', desc: 'Launch the first Moontrance collective experience.' },
];

const FRAMEWORKS = [
  {
    id: 'moontrance-land',
    label: 'MTC Land',
    desc: 'Land acquisition, soil stewardship (khilafah), water systems, regenerative agriculture.',
    color: 'var(--mod-moontrance-land)',
    overview: LAND_OVERVIEW,
    maqasid: LAND_MAQASID,
    grounding: 'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 2:30, 7:56, 55:10.',
  },
  {
    id: 'moontrance-seasonal',
    label: 'MTC Seasonal',
    desc: 'Seasonal participation pathway — planting, tending, harvest, and reflection.',
    color: 'var(--mod-moontrance-seasonal)',
    overview: SEASONAL_OVERVIEW,
    maqasid: SEASONAL_MAQASID,
    grounding: 'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 6:99, 36:33-35, 14:24-25.',
  },
  {
    id: 'moontrance-residency',
    label: 'MTC Residency',
    desc: 'Long-term community formation, residency model, trust-building, and permanence.',
    color: 'var(--mod-moontrance-residency)',
    overview: RESIDENCY_OVERVIEW,
    maqasid: RESIDENCY_MAQASID,
    grounding: 'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 59:9, 49:13, 42:38.',
  },
];

export default function MoontraceDashboard() {
  const navigate = useNavigate();

  return (
    <div className="ummah-dash">
      {/* Hero */}
      <div className="ummah-hero" style={{ '--pillar-accent': 'var(--pillar-moontrance)' }}>
        <div className="ummah-hero-inner">
          <Moon size={28} style={{ color: 'var(--pillar-moontrance)', marginBottom: '0.5rem' }} />
          <h1 className="ummah-title">Moontrance</h1>
          <p className="ummah-subtitle">Land Stewardship</p>
          <p className="ummah-arabic">Hifz al-Ard &middot; حفظ الأرض</p>
        </div>
      </div>

      {/* Submodule Cards */}
      <section className="ummah-section">
        <h2 className="ummah-section-title">Submodules</h2>
        <div className="ummah-cards">
          {SUBMODULES.map((mod) => (
            <button
              key={mod.id}
              className="ummah-card"
              onClick={() => navigate(mod.route)}
            >
              <div className="ummah-card-icon" style={{ color: 'var(--pillar-moontrance)' }}>
                <mod.Icon size={20} />
              </div>
              <div className="ummah-card-body">
                <h3>{mod.label}</h3>
                <p>{mod.desc}</p>
              </div>
              <ArrowRight size={16} className="ummah-card-arrow" />
            </button>
          ))}
        </div>
      </section>

      {/* Milestone Tracker */}
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

      {/* Frameworks — OVERVIEW + MAQASID per submodule */}
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

      {/* OLOS Bridge */}
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
  );
}
