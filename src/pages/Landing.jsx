import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cloudAccountsEnabled } from '../services/supabase';
import { ChevronDown, ArrowRight, Star, LogIn, X, Moon, Check, BookOpen, Shield, Sparkles } from 'lucide-react';
import { MAQASID_CORE_PILLARS } from '../data/maqasid';
import { ICON_REGISTRY, getIcon } from '../data/icon-registry';
import { AMANAH_TIERS } from '../data/config/amanah-tiers';
import { RELEVANCE_CHIPS } from '../data/config/relevance-chips';
import { useAuthStore } from '../store/auth-store';
import { genUserId } from '../services/id';
import MaqasidComparisonWheel from '../components/faith/MaqasidComparisonWheel';
import PropheticPathPreview from '../components/landing/PropheticPathPreview';
import '../styles/landing.css';

const PILLAR_ICON_MAP = ICON_REGISTRY;

const PILLAR_FEATURES = {
  faith: {
    description: 'Preserve and cultivate your relationship with Allah through the five pillars of Islam, spiritual reflection, and access to primary sources.',
    items: [
      { title: 'Five Pillars Boards', desc: 'Dedicated Kanban boards for Shahada, Salah, Zakah, Siyam, and Hajj' },
      { title: 'Primary Sources', desc: "Integrated Qur\u2019an study, Hadith collections, and Islamic knowledge" },
      { title: 'Spiritual Readiness', desc: 'Quranic grounding checks before every task to align intention with action' },
      { title: 'Three-Tier Growth', desc: 'Progress through Core, Growth, and Excellence in your faith journey' },
    ],
  },
  health: {
    description: 'Protect and develop your physical health, mental well-being, personal safety, and social character.',
    items: [
      { title: 'Physical Health', desc: 'Track nutrition, exercise, and vitality goals across three growth tiers' },
      { title: 'Mental Well-being', desc: 'Monitor emotional resilience, stress management, and inner peace' },
      { title: 'Safety & Security', desc: 'Plan for personal protection, emergency preparedness, and stability' },
      { title: 'Social Character', desc: 'Cultivate adab, integrity, and exemplary social presence' },
    ],
  },
  intellect: {
    description: 'Sharpen your mind through continuous learning, critical thinking, cognitive protection, and professional skill development.',
    items: [
      { title: 'Learning & Literacy', desc: 'Foundational competency, continuous education, and intellectual legacy' },
      { title: 'Critical Thinking', desc: 'Truth-seeking, logical reasoning, and visionary insight' },
      { title: 'Cognitive Integrity', desc: 'Protect focus, attention, and flow states from digital distraction' },
      { title: 'Skill Proficiency', desc: 'Ethical craftsmanship, specialized expertise, and industry leadership' },
    ],
  },
  family: {
    description: 'Strengthen the bonds of marriage, parenting, kinship, and home life as the foundation of a purposeful legacy.',
    items: [
      { title: 'Foundations of Marriage', desc: 'Legal union, emotional tranquility, and partnership in virtue' },
      { title: 'Parenting & Mentorship', desc: 'Provision, tarbiyah, and intergenerational wisdom transfer' },
      { title: 'Extended Family', desc: 'Silat al-Rahim \u2014 maintaining kinship ties and proactive support' },
      { title: 'Home Environment', desc: 'Sanctity, wholesome atmosphere, and hospitality of the household' },
    ],
  },
  wealth: {
    description: 'Manage your livelihood with integrity \u2014 from halal earning and financial literacy to ownership rights and charitable circulation.',
    items: [
      { title: 'Earning & Provision', desc: 'Track halal income streams, value expansion, and economic empowerment' },
      { title: 'Financial Literacy', desc: 'Budgets, expense tracking, invoicing, and financial reports' },
      { title: 'Ownership & Rights', desc: 'Protect heirs, maintain transparent dealings, build generational legacy' },
      { title: 'Business Operations', desc: 'Projects, people, office, and tech modules for your ventures' },
    ],
  },
  environment: {
    description: 'Honor your role as khalifah of the earth through conscious resource use, waste reduction, and ecological stewardship.',
    items: [
      { title: 'Resource Consumption', desc: 'Anti-extravagance in water and energy \u2014 track efficiency goals' },
      { title: 'Waste & Pollution', desc: 'Harm reduction, conscious consumption, and zero-waste aspirations' },
      { title: 'Ecosystem & Biodiversity', desc: 'Respect for creation, active stewardship, and ecological restoration' },
      { title: 'Ethical Sourcing', desc: 'Ethical origins, sustainable supply chains, and circular economy' },
    ],
  },
  ummah: {
    description: 'Serve and strengthen your community \u2014 from neighbors and local networks to collective initiatives and shared impact.',
    items: [
      { title: 'Neighbors', desc: 'Neighborly relations, local connections, and mutual aid' },
      { title: 'Community', desc: 'Group initiatives, collective impact, and civic engagement' },
      { title: 'MTC', desc: 'Faith-rooted land destination \u2014 experiences, stewardship, and community' },
    ],
  },
};

// `a` may be a string or an array of paragraphs (see the FAQ renderer below).
const FAQS = [
  {
    q: 'What is MIOS?',
    a: "MIOS \u2014 the Maqasid Islam Orienting System \u2014 organises every dimension of your life under the Maqasid al-Shari\u2019ah, the higher objectives of Islamic law. MIOS names them Faith (Hifz al-Din), Health (Hifz al-Nafs \u2014 the preservation of life and self), Intellect (Hifz al-\u2018Aql), Family (Hifz al-Nasl), Wealth (Hifz al-Mal), Environment (Hifz al-Bi\u2019ah), and Community (Hifz al-Ummah). Every task hangs off one of them \u2014 and MIOS will always name which one to work on next.",
  },
  {
    q: 'What does MIOS actually tell me to do?',
    a: "Open Orientation and it surfaces exactly one subtask \u2014 never a list. It is ranked by necessity tier across all seven objectives, and shown with the ladder it came from and the evidence behind it. Four exits are always open: mark it done, say it doesn\u2019t apply, ask for something else, or not today. None of them count against you.",
  },
  {
    q: 'Where does the evidence come from?',
    a: "Every subtask MIOS ships with carries at least one citation. Qur\u2019an passages render word-by-word with translation; hadith render with their collection, number, and \u2014 where the collection assigns one \u2014 their grade. Each citation is labelled on two axes: a provenance tier (Bayyinah, Qarina, or Niyyah) for how verified the evidence is, and a relevance mark (direct, contextual, or thematic) for how closely it bears on that task. MIOS does not issue rulings \u2014 citations are starting points for reflection and study, not a fatwa. Verify with a qualified scholar before acting on contested matters. Tasks you write yourself carry no citations until you add them.",
  },
  {
    q: 'Does the day change during Ramadan or travel?',
    a: "Yes. MIOS reads the Hijri date, so Ramadan, the last ten nights, Arafah, the Days of Tashreeq, Ashura, Ayyam al-Bid and Jumu\u02bbah each reshape the Prophetic Path on their own \u2014 and the day turns over at Maghrib, not midnight. Fasting and travel are switches you control in Settings; travel can be set to expire after a set number of days so it never stays on by accident.",
  },
  {
    q: 'Is MIOS only for Muslims?',
    a: 'The system is built on Islamic principles, but during onboarding you can choose between an Islamic values layer and a universal ethics path. The core tools \u2014 task management, goal tracking, financial planning \u2014 work identically either way.',
  },
  {
    q: 'Where does my data live?',
    a: [
      "On your device. MIOS keeps everything in your browser\u2019s local storage, runs with no account at all, and can export the whole dataset as JSON from Settings at any time. Online accounts and cross-device sync are switched off while that backend is unfinished, so nothing you write is uploaded anywhere.",
      "Two things reach the network, and only when you use them. Prayer times: the Aladhan API receives your coordinates to return today\u2019s timings and the Hijri date, OpenStreetMap\u2019s Nominatim receives them to name your city, and if your browser refuses location MIOS falls back to an IP lookup at ipapi.co. Qur\u2019an reader: the sources panel embeds the reader from quran.com.",
      "There are no analytics, trackers, or advertising scripts anywhere in MIOS.",
    ],
  },
  {
    q: 'Is it free?',
    a: 'Yes. MIOS is free to use with full access to all seven higher objectives and every sub-module. No paywalls, no premium tiers.',
  },
];

const PILLAR_MOCK_TASKS = {
  faith:       { col1: ['Study conditions of Shahada', 'Memorise hadith of Jibril'], col2: ['Establish 5 daily prayers on time', 'Learn rules of zakah'], col3: ['Calculate nisab', 'Ramadan fasting intention'] },
  health:      { col1: ['Morning exercise routine', 'Sleep hygiene check'], col2: ['Weekly reflection journal', 'Reduce screen time 1hr'], col3: ['Meal prep Sunday', 'Gratitude practice'] },
  intellect:   { col1: ['Read 20 pages/day', 'Deep work block (2hr)'], col2: ['Critical analysis journal', 'Learn Arabic vocabulary'], col3: ['Finish online course', 'Summarise key learnings'] },
  family:      { col1: ['Weekly family check-in', 'Read to children (30min)'], col2: ['Call extended family', 'Plan family outing'], col3: ['Home maintenance list', 'Mealtime without devices'] },
  wealth:      { col1: ['Review monthly budget', 'Track halal income streams'], col2: ['Calculate annual zakah', 'Update financial statement'], col3: ['Invoice client #3', 'Review investment halal status'] },
  environment: { col1: ['Reduce energy use 20%', 'Zero-waste kitchen goal'], col2: ['Source ethical produce', 'Carbon footprint audit'], col3: ['Plant herb garden', 'Repair vs. replace audit'] },
  ummah:       { col1: ['Visit neighbour this week', 'Volunteer at masjid'], col2: ['Community clean-up drive', 'Support local business'], col3: ['Eid gift for neighbour', 'Join Quran circle'] },
};

const MOCK_COLS = [
  { label: 'To Do',       dot: '#94a3b8' },
  { label: 'In Progress', dot: '#f59e0b' },
  { label: 'Done',        dot: '#22c55e' },
];

function PillarMockup({ pillar }) {
  const Icon = PILLAR_ICON_MAP[pillar.icon];
  const color = pillar.accentColor;
  const tasks = PILLAR_MOCK_TASKS[pillar.id];
  const cols = [tasks.col1, tasks.col2, tasks.col3];

  return (
    <div className="pillar-mockup" style={{ '--mock-color': color }}>
      {/* Header */}
      <div className="pm-header">
        <div className="pm-header-icon">{Icon && <Icon size={14} />}</div>
        <span className="pm-header-name">{pillar.sidebarLabel}</span>
        <span className="pm-header-level">Level 1 · Core</span>
      </div>
      {/* Kanban columns */}
      <div className="pm-board">
        {MOCK_COLS.map((col, ci) => (
          <div key={ci} className="pm-col">
            <div className="pm-col-header">
              <span className="pm-dot" style={{ background: col.dot }} />
              <span className="pm-col-name">{col.label}</span>
              <span className="pm-col-count">{cols[ci].length}</span>
            </div>
            <div className="pm-cards">
              {cols[ci].map((task, ti) => (
                <div key={ti} className="pm-card" style={{ borderLeftColor: color }}>
                  <span className="pm-card-title">{task}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Progress footer */}
      <div className="pm-footer">
        <span className="pm-footer-label">Progress</span>
        <div className="pm-progress">
          <div className="pm-seg pm-seg-todo"    style={{ width: '40%' }} />
          <div className="pm-seg pm-seg-active"  style={{ width: '35%' }} />
          <div className="pm-seg pm-seg-done"    style={{ width: '25%', background: color }} />
        </div>
      </div>
    </div>
  );
}


const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Path', desc: 'Select the Islamic values layer or universal ethics during onboarding. Set your name and preferences. No account required.', icon: ICON_REGISTRY.Compass },
  { step: '02', title: 'Take the Next Step', desc: 'Open Orientation. It names one subtask, shows the ladder it came from, and shows the evidence behind it.', icon: BookOpen },
  { step: '03', title: 'Grow Through the Tiers', desc: 'Work up from Core (Daruriyyat) to Growth (Hajiyyat) to Excellence (Tahsiniyyat) across every dimension of your life.', icon: Sparkles },
];

const ORIENTATION_POINTS = [
  {
    Icon: ICON_REGISTRY.Compass,
    title: 'Core before Excellence',
    desc: 'Ranking is gated by tier, never blended. An objective still missing its Daruriyyat surfaces before one polishing its Tahsiniyyat.',
  },
  {
    Icon: BookOpen,
    title: 'The whole trail, not just the verdict',
    desc: 'Objective, tier, sub-module, task, and this exact step \u2014 you always see why this one surfaced, with its sources one tap away.',
  },
  {
    Icon: Shield,
    title: 'Four ways out, none of them guilt',
    desc: 'Mark it done, say it doesn\u2019t apply, ask for something else, or defer to tomorrow. Nothing is scored against you and no streak breaks.',
  },
];

const ORIENTATION_EXITS = ['Mark done', 'Doesn\u2019t apply', 'Something else', 'Not today'];

// Day-variant copy. Every `quote` is reproduced character-for-character from
// SPECIAL_DAY_RESOLVERS in src/data/prophetic-path-submodules.js (or, for
// travel, from the Sunnah Mode panel in src/pages/Settings.jsx:526). No ruling,
// rak\u02bfah count, or hadith grade is authored here \u2014 `shift` only ever describes
// what the software does, never what the reader must do.
const DAY_VARIANTS = [
  {
    id: 'ramadan',
    label: 'Ramadan',
    accent: '#4ab8a8',
    headline: 'Ramadan',
    quote: 'The month of the Qur\u02bcan \u2014 fast the day, stand the night, increase in giving.',
    shift: 'MIOS reads the Hijri month and marks you fasting for its duration \u2014 you set nothing.',
  },
  {
    id: 'jumuah',
    label: 'Jumu\u02bbah',
    accent: '#C8A96E',
    headline: 'Jumu\u02bbah',
    quote: 'Ghusl, white clothes, miswak, surah al-Kahf, abundant salawat.',
    shift: 'On Friday the spine hides the weekday nodes that Jumu\u02bbah replaces.',
  },
  {
    id: 'travel',
    label: 'Travel',
    accent: '#6E8EAD',
    headline: 'Travel',
    quote: "Activates qasr (2-rak\u02bfat fard), jam' (combine prayers), and the traveler du'a moments. Hides Friday Jumu\u02bfah; dhuhr returns. Fast deferral applies in Ramadan (Q 2:184).",
    shift: 'Begin Travel in Settings and set it to auto-expire, so it never stays on after you return.',
  },
  {
    id: 'ayyam-al-bid',
    label: 'White days',
    accent: '#4ab8a8',
    headline: 'Ayyam al-Bid',
    quote: 'The three white days \u2014 fast 13/14/15 of every lunar month (Tirmidhi 761).',
    shift: 'One switch in Settings covers Mon/Thu, Ayy\u0101m al-B\u012b\u1e0d, Arafah and \u02bb\u0100sh\u016br\u0101\u02bc.',
  },
  {
    id: 'tashreeq',
    label: 'Days of Tashreeq',
    accent: '#C8A96E',
    headline: 'Days of Tashreeq',
    quote: 'Eat, drink, remember Allah \u2014 no fasting today (Muslim 1141).',
    shift: 'On these days MIOS disables the fasting switch rather than letting a fast be logged against them.',
  },
];

function HeroWheel() {
  const [tappedId, setTappedId] = useState(MAQASID_CORE_PILLARS[0].id);
  const [hoverId, setHoverId] = useState(null);
  const activeId = hoverId || tappedId;
  const activePillar = MAQASID_CORE_PILLARS.find((p) => p.id === activeId);
  return (
    <div className="hero-wheel">
      <MaqasidComparisonWheel
        centerLabel="MAQASID"
        levelColor="#C8A96E"
        level="core"
        levelPattern="dots"
        segments={MAQASID_CORE_PILLARS.map((p, i) => ({
          id: p.id,
          label: p.sidebarLabel,
          Icon: getIcon(p.icon),
          accentColor: p.accentColor,
          current: [72, 58, 64, 80, 55, 48, 68][i] ?? 60,
        }))}
        onSegmentSelect={(seg) => seg?.id && setTappedId(seg.id)}
        onHoverChange={setHoverId}
        showNextCard={false}
      />
      {activePillar && (
        <div
          className="hero-wheel-detail"
          style={{ '--card-accent': activePillar.accentColor }}
          aria-live="polite"
        >
          <div className="hero-wheel-detail-head">
            <span className="hero-wheel-detail-name">{activePillar.sidebarLabel}</span>
            <span className="hero-wheel-detail-ar">{activePillar.arabicRootAr}</span>
          </div>
          <p className="hero-wheel-detail-desc">{activePillar.stewardshipLabel}</p>
        </div>
      )}
      <div className="hero-wheel-legend">
        {MAQASID_CORE_PILLARS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`hero-wheel-legend-item${p.id === activeId ? ' is-active' : ''}`}
            style={{ '--card-accent': p.accentColor }}
            onClick={() => setTappedId(p.id)}
          >
            <span className="hero-wheel-legend-name">{p.sidebarLabel}</span>
            <span className="hero-wheel-legend-ar">{p.arabicRootAr}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const [activeTab, setActiveTab] = useState('faith');
  const [activeDay, setActiveDay] = useState('ramadan');
  const [openFaq, setOpenFaq] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  // Warm the authenticated-shell chunks during idle so the first /app
  // navigation doesn't pay a cold fetch. import() is deduped against the
  // module graph — resolves to the same chunks App.jsx's lazy() requests.
  useEffect(() => {
    const preload = () => {
      import('../components/layout/AppShell');
      import('./Dashboard');                         // /app index route
      import('../components/islamic/CeremonyGuard'); // wraps most inner routes
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preload, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(preload, 1500); // Safari has no requestIdleCallback
    return () => clearTimeout(t);
  }, []);

  const handleLogin = () => {
    if (!loginName.trim()) return;
    login({
      id: genUserId(),
      name: loginName.trim(),
      email: loginEmail.trim(),
      org: '',
      modules: ['work'],
      valuesLayer: 'islamic',
      createdAt: new Date().toISOString(),
    });
    setShowLogin(false);
    navigate('/app');
  };

  const activePillar = MAQASID_CORE_PILLARS.find((p) => p.id === activeTab);
  const activeFeatures = PILLAR_FEATURES[activeTab];
  const activeVariant = DAY_VARIANTS.find((v) => v.id === activeDay);

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <Link to="/" className="landing-logo">
          <div className="logo-icon"><Moon size={16} /></div>
          MIOS
        </Link>
        <ul className="landing-nav-links">
          <li><a href="#orientation">Orientation</a></li>
          <li><a href="#evidence">Evidence</a></li>
          <li><a href="#prophetic-path">The Day</a></li>
          <li><a href="#pillars">Higher Objectives</a></li>
        </ul>
        <div className="landing-nav-actions">
          {user ? (
            <Link to="/app" className="btn btn-primary">
              Go to Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              {cloudAccountsEnabled ? (
                <Link to="/auth" className="btn btn-ghost" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <LogIn size={16} /> Sign In
                </Link>
              ) : (
                <button className="btn btn-ghost" onClick={() => setShowLogin(true)} style={{ fontSize: '0.9rem' }}>
                  <LogIn size={16} /> Enter MIOS
                </button>
              )}
              <Link to="/get-started" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="expense-form-overlay" style={{ zIndex: 300 }}>
          <div className="expense-form-modal" style={{ maxWidth: 400 }}>
            <div className="expense-form-header">
              <h3>Continue locally</h3>
              <button className="expense-form-close" onClick={() => setShowLogin(false)}><X size={18} /></button>
            </div>
            <div className="expense-form-body">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem', marginTop: '-0.25rem' }}>
                Your data stays on this device only. You can export a full backup any time from Settings.
              </p>
              <div className="expense-form-field">
                <label>Name *</label>
                <input value={loginName} onChange={(e) => setLoginName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                  placeholder="Your name" autoFocus />
              </div>
              <div className="expense-form-field">
                <label>Email (optional)</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                  placeholder="you@example.com" />
              </div>
            </div>
            <div className="expense-form-footer">
              {cloudAccountsEnabled ? (
                <Link to="/auth?mode=signup" className="btn btn-ghost" onClick={() => setShowLogin(false)}>
                  Create account
                </Link>
              ) : (
                <button className="btn btn-ghost" onClick={() => setShowLogin(false)}>Cancel</button>
              )}
              <button className="btn btn-primary" onClick={handleLogin} disabled={!loginName.trim()}
                style={{ opacity: loginName.trim() ? 1 : 0.4 }}>
                Continue <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-badge">
              <Star size={14} /> MIOS — Maqasid Islam Orienting System
            </div>
            <h1 className="hero-title">
              Align your daily rhythm with <span className="highlight">what truly matters</span>
            </h1>
            <p className="hero-subtitle">
              MIOS holds every dimension of your life under the Maqasid al-Shari&rsquo;ah — then names the one thing to do next, and shows the evidence it rests on.
            </p>
            <div className="hero-cta">
              <Link to="/get-started" className="btn btn-primary btn-lg">
                Begin Your Path <ArrowRight size={18} />
              </Link>
              <a href="#orientation" className="btn btn-secondary btn-lg">See what it recommends</a>
            </div>
          </div>
          <HeroWheel />
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <div className="hero-marquee-track">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} style={{ display: 'flex', gap: 'var(--space-10)' }}>
                <span className="hero-marquee-item">Grounded in the Maqasid al-Shari'ah</span>
                <span className="hero-marquee-item">Local-first · sync only if you ask</span>
                <span className="hero-marquee-item">Zero tracking · zero ads</span>
                <span className="hero-marquee-item">Every task carries its evidence</span>
                <span className="hero-marquee-item">Free — no paywalls, no tiers</span>
                <span className="hero-marquee-item">Built with tawakkul</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orientation — the single next step */}
      <section className="features-section" id="orientation">
        <p className="section-label">Orientation</p>
        <h2 className="section-title">One next step. Never a backlog.</h2>
        <p className="section-subtitle">
          Open MIOS and it names a single subtask — the one your Core tier is missing first. Not a list to triage. One thing, with the trail that led to it.
        </p>

        <div className="feature-content">
          <div className="orient-card">
            <div className="orient-ladder">
              <span style={{ color: '#AD6E9E' }}>Family</span>
              <span className="orient-ladder-sep">&rsaquo;</span>
              <span>Core</span>
              <span className="orient-ladder-sep">&rsaquo;</span>
              <span>Extended Family</span>
              <span className="orient-ladder-sep">&rsaquo;</span>
              <span>Silat al-Rahim</span>
            </div>
            <p className="orient-task">Call one relative you haven&rsquo;t spoken to this month.</p>
            <div className="orient-meta">
              <span className="orient-badge" style={{ color: '#f59e0b', background: '#f59e0b18' }}>T2 · QARINA</span>
              <span className="orient-why">Why &amp; how</span>
            </div>
            <div className="orient-exits">
              {ORIENTATION_EXITS.map((label) => (
                <span key={label} className="orient-exit">{label}</span>
              ))}
            </div>
          </div>
          <div className="feature-list">
            {ORIENTATION_POINTS.map((f) => (
              <div key={f.title} className="feature-item">
                <div className="feature-icon" style={{ background: 'var(--primary-bg)' }}>
                  {f.Icon && <f.Icon size={18} style={{ color: 'var(--primary)' }} />}
                </div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
            {user ? (
              <Link to="/app/orientation" className="btn btn-secondary">
                Open Orientation <ArrowRight size={16} />
              </Link>
            ) : (
              <Link to="/get-started" className="btn btn-secondary">
                Start with one step <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Evidence — the two-axis grounding schema */}
      <section className="pricing-section" id="evidence">
        <p className="section-label">Evidence</p>
        <h2 className="section-title">Every task carries its evidence.</h2>
        <p className="section-subtitle">
          Not a quote bolted on afterwards. Each subtask MIOS ships with carries its Qur&rsquo;an and hadith references — and each reference is graded on two independent axes.
        </p>

        <p className="evidence-axis-label">Provenance — how verified the evidence is</p>
        <div className="pricing-cards">
          {AMANAH_TIERS.map((tier) => (
            <div key={tier.id} className="pricing-card" style={{ borderTop: `3px solid ${tier.color}` }}>
              <div className="evidence-tier-head">
                <span className="evidence-badge" style={{ color: tier.color, background: tier.bg }}>{tier.id}</span>
                <div>
                  <div className="plan-name" style={{ marginBottom: 0 }}>{tier.label}</div>
                  <div className="evidence-tier-ar">{tier.arabic}</div>
                </div>
              </div>
              <p className="evidence-tier-desc">{tier.description}</p>
            </div>
          ))}
        </div>

        <p className="evidence-axis-label">Relevance — how closely the citation bears on the task</p>
        <div className="evidence-chips">
          {RELEVANCE_CHIPS.map((chip) => (
            <div key={chip.id} className="evidence-chip">
              <span className="evidence-badge" style={{ color: chip.color, background: chip.bg }}>{chip.label}</span>
              <p>{chip.description}</p>
            </div>
          ))}
        </div>

        <p className="evidence-note">
          Qur&rsquo;an passages render word-by-word with translation; hadith render with their collection, number, and — where the collection assigns one — their grade. MIOS does not issue rulings: citations are starting points for reflection and study, not a fatwa. Verify with a qualified scholar before acting on contested matters.
        </p>
      </section>

      {/* Prophetic Path live-demo preview */}
      <section className="prophetic-preview-section" id="prophetic-path">
        <div className="prophetic-preview-sticky">
          <div className="prophetic-preview-copy">
            <p className="section-label">The Day</p>
            <h2 className="section-title">Your day, mapped to the Sunnah.</h2>
            <p className="section-subtitle">
              From Fajr to Tahajjud — every prayer, every Sunnah moment, in one vertical spine.
              Scroll to walk the day; the active node moves with you.
            </p>
          </div>
          <PropheticPathPreview />
        </div>
      </section>

      {/* Sunnah Mode — the spine reshapes by day */}
      <section className="features-section" id="sunnah">
        <p className="section-label">Sunnah Mode</p>
        <h2 className="section-title">The day is not the same every day.</h2>
        <p className="section-subtitle">
          Ramadan, Jumu&#699;ah, travel, the white days, the Days of Tashreeq — each one reshapes the spine. MIOS reads the Hijri date and adjusts on its own; the rest are switches you hold in Settings. The day turns over at Maghrib, not midnight.
        </p>

        <div className="feature-tabs">
          {DAY_VARIANTS.map((v) => (
            <button
              key={v.id}
              className={`feature-tab ${activeDay === v.id ? 'active' : ''}`}
              onClick={() => setActiveDay(v.id)}
              style={activeDay === v.id ? { borderColor: v.accent, color: v.accent } : undefined}
            >
              {v.label}
            </button>
          ))}
        </div>

        {activeVariant && (
          <div className="day-panel" style={{ borderColor: `${activeVariant.accent}40` }} aria-live="polite">
            <p className="day-panel-headline" style={{ color: activeVariant.accent }}>{activeVariant.headline}</p>
            <p className="day-panel-quote">{activeVariant.quote}</p>
            <p className="day-panel-shift">{activeVariant.shift}</p>
          </div>
        )}
      </section>

      {/* Seven Pillars */}
      <section className="features-section" id="pillars">
        <p className="section-label">The Seven Maqasid</p>
        <h2 className="section-title">Underneath all of it — seven higher objectives.</h2>
        <p className="section-subtitle">
          The Maqasid al-Shari&rsquo;ah give the structure. Each objective has its own dashboard, its sub-modules, and three tiers: Core (Daruriyyat), Growth (Hajiyyat), Excellence (Tahsiniyyat).
        </p>

        <div className="feature-tabs">
          {MAQASID_CORE_PILLARS.map((pillar) => {
            const Icon = PILLAR_ICON_MAP[pillar.icon];
            return (
              <button
                key={pillar.id}
                className={`feature-tab ${activeTab === pillar.id ? 'active' : ''}`}
                onClick={() => setActiveTab(pillar.id)}
                style={activeTab === pillar.id ? { borderColor: pillar.accentColor, color: pillar.accentColor } : undefined}
              >
                {Icon && <Icon size={16} />} {pillar.sidebarLabel}
              </button>
            );
          })}
        </div>

        <div className="feature-content">
          <div className="feature-preview" style={{ borderColor: activePillar?.accentColor + '30', padding: 'var(--space-4)', background: 'var(--bg2)', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 'var(--space-3)' }}>
            {activePillar && (
              <>
                <div style={{ width: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', marginBottom: 2 }}>
                    {activePillar.sidebarLabel}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: activePillar.accentColor, fontStyle: 'italic', marginBottom: 'var(--space-2)' }}>
                    {activePillar.arabicRoot} · {activePillar.arabicRootAr}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                    {activeFeatures?.description}
                  </div>
                </div>
                <PillarMockup pillar={activePillar} />
              </>
            )}
          </div>
          <div className="feature-list">
            {activeFeatures?.items.map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon" style={{ background: activePillar?.accentColor + '18' }}>
                  <Check size={18} style={{ color: activePillar?.accentColor }} />
                </div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="pricing-section" id="how-it-works">
        <p className="section-label">How It Works</p>
        <h2 className="section-title">Three steps to a purposeful life</h2>
        <p className="section-subtitle">Get started in under a minute. No account required — everything runs on your device until you choose to sync.</p>

        <div className="pricing-cards">
          {HOW_IT_WORKS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="pricing-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 'var(--radius)',
                    background: 'var(--primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem', flexShrink: 0,
                  }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.06em' }}>STEP {step.step}</div>
                    <div className="plan-name" style={{ marginBottom: 0 }}>{step.title}</div>
                  </div>
                </div>
                <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to align your life with purpose?</h2>
        <p>Join those who organize every dimension of their life around the objectives that truly matter.</p>
        <Link to="/get-started" className="btn btn-primary btn-lg">
          Get Started Free <ArrowRight size={18} />
        </Link>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <p className="section-label">FAQ</p>
        <h2 className="section-title">Frequently asked questions</h2>
        <div style={{ marginTop: 'var(--space-8)' }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className={`faq-question ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <ChevronDown size={20} />
              </button>
              {openFaq === i && (
                <div className="faq-answer">
                  {Array.isArray(faq.a)
                    ? faq.a.map((para, j) => <p key={j} className="faq-para">{para}</p>)
                    : faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="landing-logo" style={{ marginBottom: 'var(--space-3)' }}>
              <div className="logo-icon"><Moon size={16} /></div>
              MIOS
            </div>
            <p>Maqasid Islam Orienting System.<br />Built with tawakkul.</p>
          </div>
          <div className="footer-col">
            <h6>Product</h6>
            <ul>
              <li><a href="#orientation">Orientation</a></li>
              <li><a href="#prophetic-path">The Day</a></li>
              <li><a href="#sunnah">Sunnah Mode</a></li>
              <li><a href="#pillars">Higher Objectives</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Grounding</h6>
            <ul>
              <li><a href="#evidence">Evidence &amp; provenance</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Get Started</h6>
            <ul>
              <li><Link to="/get-started">Choose your path</Link></li>
              {user
                ? <li><Link to="/app/orientation">Open Orientation</Link></li>
                : <li><button type="button" className="footer-link-btn" onClick={() => setShowLogin(true)}>Continue locally</button></li>}
              {cloudAccountsEnabled && <li><Link to="/auth">Sign in</Link></li>}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} MIOS. All rights reserved.</span>
          <span>Every dimension of life. With purpose.</span>
        </div>
      </footer>
    </div>
  );
}
