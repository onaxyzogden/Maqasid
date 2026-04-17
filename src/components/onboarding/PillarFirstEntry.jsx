import { useLocation } from 'react-router-dom';
import { Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe } from 'lucide-react';
import { MAQASID_PILLARS } from '../../data/maqasid';
import { useOnboardingStore } from '../../store/onboarding-store';

// ── Icon map ──
const ICON_MAP = { Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe };

// ── Pillar descriptions ──
const PILLAR_DESCRIPTIONS = {
  faith:       "This pillar protects your relationship with the Divine and keeps your spiritual practice consistent. It encompasses your Five Pillars and access to Quranic and Hadith sources.",
  life:        "This pillar protects your physical and mental wellbeing as a sacred trust. It covers health, safety, mental clarity, and your social connections.",
  intellect:   "This pillar protects the clarity and integrity of your mind. It covers learning, critical thinking, cognitive habits, and professional development.",
  family:      "This pillar protects the continuation of your lineage and the strength of your relationships. It covers marriage, parenting, kinship, home, and family office.",
  wealth:      "This pillar governs how wealth flows through your life in a halal and purposeful way. It covers earning, financial management, ownership, and your business operations.",
  environment: "This pillar protects your stewardship of the earth as a divine trust. It covers resource consumption, waste reduction, ecosystem health, and ethical sourcing.",
  ummah:       "This pillar protects the collective wellbeing of your community and the Muslim world. It covers community service, neighbor relations, and land stewardship.",
};

// ── Special ID label overrides ──
const ID_LABEL_OVERRIDES = {
  sources:  "Sources (Qur'an & Hadith)",
  work:     'Business Operations',
  money:    'Financial Management',
  people:   'People & HR',
  office:   'Office & Calendar',
  tech:     'Technology',
};

// ── Special-case route segments that map to non-obvious pillars ──
const WEALTH_SEGMENTS = new Set(['work', 'money', 'people', 'office', 'tech']);
const UMMAH_SEGMENTS  = new Set(['neighbors', 'community']);
const NULL_SEGMENTS   = new Set(['sources', 'settings']);
const PILLAR_IDS      = new Set(['faith', 'life', 'intellect', 'family', 'wealth', 'environment', 'ummah']);

/**
 * Derive the active pillar ID from a pathname like /app/faith-shahada.
 * Returns a pillar ID string or null.
 */
function getPillarFromPath(pathname) {
  const segment = pathname.replace('/app/', '').split('/')[0].split('-')[0];

  if (NULL_SEGMENTS.has(segment))   return null;
  if (WEALTH_SEGMENTS.has(segment)) return 'wealth';
  if (UMMAH_SEGMENTS.has(segment))  return 'ummah';
  if (PILLAR_IDS.has(segment))      return segment;
  return null;
}

/**
 * Convert a submodule ID to a human-readable label.
 * e.g. 'faith-shahada' → 'Shahada', 'life-physical' → 'Physical'
 */
function submoduleLabel(id, pillarId) {
  if (ID_LABEL_OVERRIDES[id]) return ID_LABEL_OVERRIDES[id];
  // Strip pillar prefix if present
  const prefix = pillarId + '-';
  const base = id.startsWith(prefix) ? id.slice(prefix.length) : id;
  // Title-case the remainder
  return base.charAt(0).toUpperCase() + base.slice(1);
}

// ── Component ──
export default function PillarFirstEntry() {
  const { pathname } = useLocation();
  const seenPillars    = useOnboardingStore((s) => s.seenPillars);
  const markPillarSeen = useOnboardingStore((s) => s.markPillarSeen);

  const pillarId = getPillarFromPath(pathname);
  if (!pillarId || seenPillars.includes(pillarId)) return null;

  const pillar = MAQASID_PILLARS.find((p) => p.id === pillarId);
  if (!pillar) return null;

  const Icon        = ICON_MAP[pillar.icon];
  const description = PILLAR_DESCRIPTIONS[pillarId] || '';
  const bullets     = pillar.subModuleIds.slice(0, 3).map((id) => submoduleLabel(id, pillarId));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 8000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '420px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: pillar.accentColor,
            padding: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          {Icon && <Icon size={28} color="#fff" />}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>
              {pillar.sidebarLabel}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem' }}>
              {pillar.arabicRoot}
              <br />
              {pillar.arabicRootAr}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 'var(--space-6)' }}>
          <p style={{ color: 'var(--text2)', lineHeight: 1.65, marginBottom: 'var(--space-4)' }}>
            {description}
          </p>

          <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 'var(--space-2)' }}>
            What you&apos;ll find here:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {bullets.map((label) => (
              <div key={label} style={{ fontSize: '0.875rem', color: 'var(--text2)' }}>
                &bull;&nbsp;{label}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
            <button className="btn btn-primary" onClick={() => markPillarSeen(pillarId)}>
              Got it &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
