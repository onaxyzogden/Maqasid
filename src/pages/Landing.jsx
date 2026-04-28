import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, Star, LogIn, X, Moon, Check, BookOpen, Shield, Sparkles } from 'lucide-react';
import { MAQASID_PILLARS, MAQASID_CORE_PILLARS } from '../data/maqasid';
import { ICON_REGISTRY, getIcon } from '../data/icon-registry';
import { useAuthStore } from '../store/auth-store';
import { genUserId } from '../services/id';
import MaqasidComparisonWheel from '../components/faith/MaqasidComparisonWheel';
import '../styles/landing.css';

const PILLAR_ICON_MAP = ICON_REGISTRY;

const PILLAR_FEATURES = {
  faith: {
    description: 'Preserve and cultivate your relationship with Allah through the five pillars of Islam, spiritual reflection, and access to primary sources.',
    items: [
      { title: 'Five Pillars Boards', desc: 'Dedicated Kanban boards for Shahada, Salah, Zakah, Siyam, and Hajj' },
      { title: 'Primary Sources', desc: "Integrated Qur\u2019an study, Hadith collections, and Islamic knowledge" },
      { title: 'Spiritual Readiness', desc: 'Quranic grounding checks before every task to align intention with action' },
      { title: 'Three-Tier Growth', desc: 'Progress through Necessities, Needs, and Excellence in your faith journey' },
    ],
  },
  life: {
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

const FAQS = [
  { q: 'What is MILOS?', a: "MILOS is an Islamic Life Operating System \u2014 a single platform to manage every dimension of your life across the Seven Maqasid: Faith, Life, Intellect, Family, Wealth, Environment, and Ummah. It replaces scattered apps with one purposeful system grounded in the higher objectives of Islamic Law." },
  { q: 'What are the Seven Maqasid?', a: "The Maqasid al-Shari\u2019ah are the higher objectives of Islamic law: preserving and developing Faith (Din), Life (Nafs), Intellect (\u2018Aql), Family (Nasl), Wealth (Mal), Environment (Bi\u2019ah), and Ummah (community). These seven higher objectives form the organizing structure of everything in MILOS." },
  { q: 'Is MILOS only for Muslims?', a: 'The system is built on Islamic principles, but during onboarding you can choose between an Islamic values layer and a universal ethics path. The core tools \u2014 task management, goal tracking, financial planning \u2014 work identically either way.' },
  { q: 'What can I actually track?', a: 'Each higher objective has dedicated sub-modules with Kanban boards, task management, and progress tracking. Examples: prayer consistency, health goals, learning plans, family commitments, budgets and expenses, environmental footprint, and community engagement.' },
  { q: 'Is my data private?', a: 'Yes. All data is stored locally on your device. Nothing is sent to external servers. You can export your full dataset as JSON at any time from Settings.' },
  { q: 'Is it free?', a: 'Yes. MILOS is completely free to use with full access to all seven higher objectives and every sub-module. No paywalls, no premium tiers.' },
];

const PILLAR_MOCK_TASKS = {
  faith:       { col1: ['Study conditions of Shahada', 'Memorise hadith of Jibril'], col2: ['Establish 5 daily prayers on time', 'Learn rules of zakah'], col3: ['Calculate nisab', 'Ramadan fasting intention'] },
  life:        { col1: ['Morning exercise routine', 'Sleep hygiene check'], col2: ['Weekly reflection journal', 'Reduce screen time 1hr'], col3: ['Meal prep Sunday', 'Gratitude practice'] },
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
        <span className="pm-header-level">Level 1 · Necessities</span>
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

// ── Carousel slide sub-components ────────────────────────────────────────────

const DASHBOARD_CHIPS = [
  { label: 'Faith',       color: '#C8A96E' },
  { label: 'Life',        color: '#6EAD8A' },
  { label: 'Intellect',   color: '#6E8EAD' },
  { label: 'Family',      color: '#AD6E9E' },
  { label: 'Wealth',      color: '#8EAD6E' },
  { label: 'Environment', color: '#6EADAD' },
  { label: 'Community',   color: '#AD8E6E' },
];

function Slide1Content() {
  return (
    <div className="demo-slide-inner">
      <div className="demo-slide-topbar">
        <span className="demo-slide-dot" style={{ background: '#ef4444' }} />
        <span className="demo-slide-dot" style={{ background: '#f59e0b' }} />
        <span className="demo-slide-dot" style={{ background: '#22c55e' }} />
        <span className="demo-slide-topbar-title">MAQASID Dashboard</span>
      </div>
      <div className="demo-slide-body">
        <p className="demo-slide-eyebrow" style={{ color: '#4ab8a8' }}>Your Higher Objectives</p>
        <div className="demo-chip-grid">
          {DASHBOARD_CHIPS.map((c) => (
            <div key={c.label} className="demo-chip" style={{ borderColor: c.color + '50', color: c.color }}>
              <span className="demo-chip-dot" style={{ background: c.color }} />
              {c.label}
            </div>
          ))}
        </div>
        <div className="demo-slide-progress-row">
          <div className="demo-slide-progress-bar" style={{ '--bar-color': '#4ab8a8', '--bar-pct': '62%' }} />
          <span className="demo-slide-progress-label">62% weekly goals met</span>
        </div>
      </div>
    </div>
  );
}

function Slide2Content() {
  const wealthPillar = MAQASID_PILLARS.find((p) => p.id === 'wealth');
  return (
    <div className="demo-slide-inner">
      <div className="demo-slide-topbar">
        <span className="demo-slide-dot" style={{ background: '#ef4444' }} />
        <span className="demo-slide-dot" style={{ background: '#f59e0b' }} />
        <span className="demo-slide-dot" style={{ background: '#22c55e' }} />
        <span className="demo-slide-topbar-title">Wealth · Hifz al-Mal</span>
      </div>
      <div className="demo-slide-body demo-slide-body--padded">
        <p className="demo-slide-eyebrow" style={{ color: '#C8A96E' }}>Higher Objective Deep Dive</p>
        {wealthPillar && <PillarMockup pillar={wealthPillar} />}
      </div>
    </div>
  );
}

const TASK_CHECKS = [
  { done: true,  text: 'Pull bank statement export' },
  { done: true,  text: 'Categorise expenses by higher objective' },
  { done: false, text: 'Verify zakah threshold' },
  { done: false, text: 'Share summary with spouse' },
];

function Slide3Content() {
  return (
    <div className="demo-slide-inner">
      <div className="demo-slide-topbar">
        <span className="demo-slide-dot" style={{ background: '#ef4444' }} />
        <span className="demo-slide-dot" style={{ background: '#f59e0b' }} />
        <span className="demo-slide-dot" style={{ background: '#22c55e' }} />
        <span className="demo-slide-topbar-title">Task Detail</span>
      </div>
      <div className="demo-slide-body demo-slide-body--padded">
        <p className="demo-slide-eyebrow" style={{ color: '#8b5cf6' }}>Task in Focus</p>
        <div className="demo-task-modal">
          <div className="demo-task-title">Review monthly budget</div>
          <div className="demo-task-meta">
            <span className="demo-task-badge" style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6' }}>Wealth</span>
            <span className="demo-task-badge" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>In Progress</span>
            <span className="demo-task-badge" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>High Priority</span>
          </div>
          <div className="demo-task-section-label">Description</div>
          <div className="demo-task-desc">Cross-check expense categories against the halal income statement. Flag any spending above nisab threshold.</div>
          <div className="demo-task-section-label">Subtasks</div>
          <div className="demo-task-checklist">
            {TASK_CHECKS.map((item, i) => (
              <div key={i} className="demo-task-check-item">
                <span className="demo-task-check-box" style={item.done ? { background: '#8b5cf6', borderColor: '#8b5cf6' } : {}}>
                  {item.done && <Check size={14} color="#fff" />}
                </span>
                <span style={{ textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'var(--text3)' : 'var(--text2)' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const DEMO_SLIDES = [
  { step: '01', title: 'The Dashboard',    subtitle: 'All seven higher objectives, one unified view.',      accent: '#4ab8a8', Content: Slide1Content },
  { step: '02', title: 'Higher Objective Deep Dive', subtitle: 'Each higher objective has its own Kanban board.',      accent: '#C8A96E', Content: Slide2Content },
  { step: '03', title: 'Task in Focus',    subtitle: 'Every task fully tracked, with context.',    accent: '#8b5cf6', Content: Slide3Content },
];

function DemoCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const COUNT = DEMO_SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActiveSlide((s) => (s + 1) % COUNT), 3500);
    return () => clearInterval(id);
    // reason: COUNT is module-constant; intentionally not a dep
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const prev = () => setActiveSlide((s) => (s - 1 + COUNT) % COUNT);
  const next = () => setActiveSlide((s) => (s + 1) % COUNT);

  return (
    <div
      className="carousel-scene"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="carousel-ring"
        style={{ transform: `rotateY(${-activeSlide * 120}deg)` }}
      >
        {DEMO_SLIDES.map((slide, i) => {
          const SlideContent = slide.Content;
          return (
            <div
              key={i}
              className={`carousel-card ${activeSlide === i ? 'is-active' : ''}`}
              style={{ transform: `rotateY(${i * 120}deg) translateZ(220px)`, '--card-accent': slide.accent }}
              onClick={() => setActiveSlide(i)}
            >
              <div className="carousel-card-step" style={{ color: slide.accent }}>STEP {slide.step}</div>
              <div className="carousel-card-header">
                <h4 className="carousel-card-title">{slide.title}</h4>
                <p className="carousel-card-subtitle">{slide.subtitle}</p>
              </div>
              <div className="carousel-card-preview">
                <SlideContent />
              </div>
            </div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button className="carousel-btn" onClick={prev} aria-label="Previous slide">&#8249;</button>
        <div className="carousel-dots">
          {DEMO_SLIDES.map((slide, i) => (
            <button
              key={i}
              className={`carousel-dot ${activeSlide === i ? 'is-active' : ''}`}
              style={activeSlide === i ? { background: slide.accent } : {}}
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="carousel-btn" onClick={next} aria-label="Next slide">&#8250;</button>
      </div>
    </div>
  );
}

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Path', desc: 'Select the Islamic values layer or universal ethics during onboarding. Set your name and preferences.', icon: ICON_REGISTRY.Compass },
  { step: '02', title: 'Explore Your Higher Objectives', desc: 'Each of the Seven Maqasid has its own dashboard with sub-modules, Kanban boards, and readiness checks.', icon: BookOpen },
  { step: '03', title: 'Track Your Growth', desc: 'Work through three tiers \u2014 Necessities, Needs, and Excellence \u2014 across every dimension of your life.', icon: Sparkles },
];

export default function Landing() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const [activeTab, setActiveTab] = useState('faith');
  const [openFaq, setOpenFaq] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

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

  const activePillar = MAQASID_PILLARS.find((p) => p.id === activeTab);
  const activeFeatures = PILLAR_FEATURES[activeTab];

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <Link to="/" className="landing-logo">
          <div className="logo-icon"><Moon size={16} /></div>
          MAQASID
        </Link>
        <ul className="landing-nav-links">
          <li><a href="#pillars">Higher Objectives</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <div className="landing-nav-actions">
          {user ? (
            <Link to="/app" className="btn btn-primary">
              Go to Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => setShowLogin(true)} style={{ fontSize: '0.9rem' }}>
                <LogIn size={16} /> Sign In
              </button>
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
              <h3>Sign In to MAQASID</h3>
              <button className="expense-form-close" onClick={() => setShowLogin(false)}><X size={18} /></button>
            </div>
            <div className="expense-form-body">
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
              <button className="btn btn-ghost" onClick={() => setShowLogin(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleLogin} disabled={!loginName.trim()}
                style={{ opacity: loginName.trim() ? 1 : 0.4 }}>
                Sign In <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="hero-section">
        {/* Break-the-box Faith ring */}
        <div className="hero-ring" aria-hidden="true">
          <svg viewBox="0 0 360 360">
            <defs>
              <linearGradient id="hrShimmerGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C8A96E" stopOpacity="0" />
                <stop offset="50%" stopColor="#C8A96E" stopOpacity="1" />
                <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle className="hr-track" cx="180" cy="180" r="160" fill="none" strokeWidth="2" />
            <circle
              className="hr-shimmer"
              cx="180" cy="180" r="160" fill="none" strokeWidth="3"
              strokeDasharray="250 1005"
              transform="rotate(-90 180 180)"
            />
          </svg>
          <div className="hero-ring-label">
            {(() => {
              const Compass = PILLAR_ICON_MAP.Compass;
              return Compass ? <Compass size={40} strokeWidth={1.25} /> : null;
            })()}
            <span className="hero-ring-label-name">Faith</span>
            <span className="hero-ring-label-ar">حفظ الدين</span>
          </div>
        </div>
        <div className="hero-badge">
          <Star size={14} /> Islamic Life Operating System
        </div>
        <h1 className="hero-title">
          Align your daily rhythm with <span className="highlight">what truly matters</span>
        </h1>
        <p className="hero-subtitle">
          One system for <span className="tag">faith</span>, <span className="tag">health</span>, <span className="tag">intellect</span>, <span className="tag">family</span>, <span className="tag">wealth</span>, <span className="tag">environment</span>, and <span className="tag">community</span> — grounded in the higher objectives of Islamic Law.
        </p>
        <div className="hero-cta">
          <Link to="/get-started" className="btn btn-primary btn-lg">
            Begin Your Path <ArrowRight size={18} />
          </Link>
          <a href="#pillars" className="btn btn-secondary btn-lg">Explore the Higher Objectives</a>
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <div className="hero-marquee-track">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} style={{ display: 'flex', gap: 'var(--space-10)' }}>
                <span className="hero-marquee-item">Grounded in the Maqasid al-Shari'ah</span>
                <span className="hero-marquee-item">Local-first · your data stays with you</span>
                <span className="hero-marquee-item">Zero tracking · zero ads</span>
                <span className="hero-marquee-item">Seven higher objectives · one rhythm</span>
                <span className="hero-marquee-item">Free forever</span>
                <span className="hero-marquee-item">Built with tawakkul</span>
              </div>
            ))}
          </div>
        </div>
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
              tooltipLabel: p.sidebarLabel,
              tooltipText: PILLAR_FEATURES[p.id]?.description,
              tooltipWidth: 280,
              tooltipHeight: 140,
            }))}
          />
          <div className="hero-wheel-legend" aria-hidden="true">
            {MAQASID_CORE_PILLARS.map((p) => (
              <span
                key={p.id}
                className="hero-wheel-legend-item"
                style={{ '--card-accent': p.accentColor }}
              >
                <span className="hero-wheel-legend-name">{p.sidebarLabel}</span>
                <span className="hero-wheel-legend-ar">{p.arabicRootAr}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Seven Pillars */}
      <section className="features-section" id="pillars">
        <p className="section-label">The Seven Maqasid</p>
        <h2 className="section-title">One system for every dimension of your life</h2>
        <p className="section-subtitle">
          The Maqasid al-Shariah — the higher objectives of Islamic law — provide the framework. Each higher objective has its own dashboard, sub-modules, and growth tiers.
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

      {/* Demo Carousel */}
      <section className="carousel-section" id="demo">
        <p className="section-label">See It in Action</p>
        <h2 className="section-title">A system that actually works</h2>
        <p className="section-subtitle">
          Three moments from your daily workflow — organized, purposeful, and always aligned.
        </p>
        <DemoCarousel />
      </section>

      {/* How It Works */}
      <section className="pricing-section" id="how-it-works">
        <p className="section-label">How It Works</p>
        <h2 className="section-title">Three steps to a purposeful life</h2>
        <p className="section-subtitle">Get started in under a minute. No account required — everything runs locally on your device.</p>

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
              {openFaq === i && <div className="faq-answer">{faq.a}</div>}
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
              MAQASID
            </div>
            <p>Islamic Life Operating System.<br />Built with tawakkul.</p>
          </div>
          <div className="footer-col">
            <h6>Product</h6>
            <ul>
              <li><a href="#pillars">Higher Objectives</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>The Seven Maqasid</h6>
            <ul>
              {MAQASID_CORE_PILLARS.map((p) => (
                <li key={p.id}><a href="#pillars">{p.sidebarLabel}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h6>Resources</h6>
            <ul>
              <li><a href="#faq">Documentation</a></li>
              <li><a href="#faq">Privacy</a></li>
              <li><a href="#faq">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} MAQASID. All rights reserved.</span>
          <span>Every dimension of life. With purpose.</span>
        </div>
      </footer>
    </div>
  );
}
