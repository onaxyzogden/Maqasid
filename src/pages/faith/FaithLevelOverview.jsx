import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, HeartHandshake, HandHeart, Moon, Landmark,

} from 'lucide-react';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { useModulesProgress } from '@hooks/useModuleProgress';
import IslamicTerm from '@components/shared/IslamicTerm';
import FaithLevelNavigator from './FaithLevelNavigator';
import './FaithLevelOverview.css';

const LEVEL_ROUTES = {
  core:       '/app/faith-core',
  growth:     '/app/faith-growth',
  excellence: '/app/faith-excellence',
};

const MODULE_IDS = ['shahada', 'salat', 'zakat', 'siyam', 'hajj'];

const PILLARS = [
  { id: 'shahada', label: 'Shahada', glossaryId: 'shahada', Icon: CheckCircle2,   route: '/app/faith-shahada' },
  { id: 'salat',   label: 'Salah',   glossaryId: 'salat',   Icon: HeartHandshake, route: '/app/faith-salah'   },
  { id: 'zakat',   label: 'Zakah',   glossaryId: 'zakat',   Icon: HandHeart,      route: '/app/faith-zakah'   },
  { id: 'siyam',   label: 'Siyam',   glossaryId: 'siyam',   Icon: Moon,           route: '/app/faith-sawm'    },
  { id: 'hajj',    label: 'Hajj',    glossaryId: 'hajj',    Icon: Landmark,       route: '/app/faith-hajj'    },
];

function MasteryRing({ percent, color, id }) {
  const r = 42;
  const stroke = 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const gradId = `floRing_${id}`;

  return (
    <svg width="110" height="110" viewBox="0 0 110 110" className="flo__ring">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <circle cx="55" cy="55" r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle
        cx="55" cy="55" r={r} fill="none"
        stroke={`url(#${gradId})`} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform="rotate(-90 55 55)"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text x="55" y="50" textAnchor="middle" className="flo__ring-pct">{percent}%</text>
      <text x="55" y="66" textAnchor="middle" className="flo__ring-label">Complete</text>
    </svg>
  );
}

export default function FaithLevelOverview({ level, levelColor }) {
  const navigate = useNavigate();
  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => {
    ensureFaithProjects();
  }, []);

  useEffect(() => {
    for (const mod of MODULE_IDS) {
      const boardId = `faith_${mod}_${level}`;
      if (projects.some((p) => p.id === boardId)) {
        loadTasks(boardId);
      }
    }
  }, [projects, level, loadTasks]);

  const { progressMap } = useModulesProgress(MODULE_IDS, level);

  return (
    <div className="flo">
      {/* Level selector */}
      <FaithLevelNavigator
        compact
        controlledLevel={level}
        onLevelChange={(key) => navigate(LEVEL_ROUTES[key])}
      />

      {/* Bento grid */}
      <div className="flo__grid">
        {PILLARS.map(({ id, label, glossaryId, Icon, route }, i) => {
          const pct = progressMap[id]?.pct ?? 0;
          return (
            <div
              key={id}
              className="flo__card"
              onClick={() => navigate(route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(route)}
              data-index={i}
            >
              <div
                className="flo__card-icon"
                style={{ color: levelColor, background: `color-mix(in srgb, ${levelColor} 12%, var(--surface))` }}
              >
                <Icon size={22} />
              </div>
              <h3 className="flo__card-name">
                <IslamicTerm id={glossaryId}>{label}</IslamicTerm>
              </h3>
              <MasteryRing percent={pct} color={levelColor} id={id} />

            </div>
          );
        })}
      </div>
    </div>
  );
}
