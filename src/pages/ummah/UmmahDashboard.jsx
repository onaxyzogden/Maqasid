import { useNavigate } from 'react-router-dom';
import { Globe, Users, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import OverviewCards from '@components/shared/OverviewCards';
import MaqasidTable from '@components/shared/MaqasidTable';
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
import './UmmahDashboard.css';

const SUBMODULES = [
  { id: 'collective', label: 'Collective Stewardship', desc: 'Community-level coordination, shared governance, and collective wellbeing.', Icon: Globe,  route: '/app/collective' },
  { id: 'neighbors',  label: 'Neighbors',              desc: 'Rights of neighbors, local engagement, and neighbourhood ihsan.',            Icon: MapPin, route: '/app/neighbors'  },
  { id: 'community',  label: 'Community',              desc: 'Broader community building, institutional engagement, and social contribution.', Icon: Users, route: '/app/community'  },
];

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

export default function UmmahDashboard() {
  const navigate = useNavigate();

  return (
    <div className="ummah-dash">
      {/* Hero */}
      <div className="ummah-hero">
        <div className="ummah-hero-inner">
          <h1 className="ummah-title">Ummah</h1>
          <p className="ummah-subtitle">Collective Stewardship</p>
          <p className="ummah-arabic">Hifz al-Ummah &middot; حفظ الأمة</p>
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
              <div className="ummah-card-icon">
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

      {/* Frameworks — OVERVIEW + MAQASID per submodule */}
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
  );
}
