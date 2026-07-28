import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cloudAccountsEnabled } from '../services/supabase';
import {
  ChevronDown, ArrowRight, Star, LogIn, X, Moon, BookOpen, Shield, Sparkles,
  Menu, Compass, Sunrise, HelpCircle,
} from 'lucide-react';
import { MAQASID_CORE_PILLARS } from '../data/maqasid';
import { ICON_REGISTRY, getIcon } from '../data/icon-registry';
import { AMANAH_TIERS } from '../data/config/amanah-tiers';
import { RELEVANCE_CHIPS } from '../data/config/relevance-chips';
import { useAuthStore } from '../store/auth-store';
import { genUserId } from '../services/id';
import MaqasidComparisonWheel from '../components/faith/MaqasidComparisonWheel';
import PropheticPathPreview from '../components/landing/PropheticPathPreview';
import { useRevealSection, useScrolledPast } from '../components/landing/use-landing-scroll';
import '../styles/landing.css';

// One source for both navs. The bar shows the first three; the mobile sheet
// shows all six with their icons, which is what makes it worth opening.
const NAV_LINKS = [
  { href: '#orientation', label: 'Orientation', Icon: Compass },
  { href: '#evidence', label: 'Evidence', Icon: Shield },
  { href: '#prophetic-path', label: 'The Day', Icon: Sunrise },
  { href: '#sunnah', label: 'Sunnah Mode', Icon: Moon },
  { href: '#how-it-works', label: 'How It Works', Icon: Sparkles },
  { href: '#faq', label: 'FAQ', Icon: HelpCircle },
];

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

// The demo card's provenance badge and pillar tint. Read from the canonical
// data rather than typed out, so the badge, its tooltip, and the Family accent
// stay identical to their sources.
const ORIENT_TIER = AMANAH_TIERS.find((t) => t.id === 'T2');
const ORIENT_PILLAR = MAQASID_CORE_PILLARS.find((p) => p.id === 'family');

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

// Each Amanah tier description is two sentences: what the tier means, then what
// the gate does about it. Splitting them lets the card give the verdict its own
// tinted line instead of burying it at the end of a paragraph. Only the break
// point is chosen here — both halves come from AMANAH_TIERS verbatim.
function splitTierDescription(description) {
  const cut = description.lastIndexOf('. ');
  return cut === -1
    ? [description, '']
    : [description.slice(0, cut + 1), description.slice(cut + 2)];
}

// Sections fade up the first time they enter the viewport. The `is-in` class is
// what makes them visible — never a keyframe. main.jsx adds `.reduce-motion` to
// <html> under the Claude Code preview and clamps every transition to 0.001ms
// there, so a keyframe-driven reveal would render permanently blank; with the
// class doing the work it simply snaps in.
function RevealSection({ className = '', children, ...rest }) {
  const [ref, revealClass] = useRevealSection();
  return (
    <section ref={ref} className={`reveal ${className} ${revealClass}`.trim()} {...rest}>
      {children}
    </section>
  );
}

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
            data-tip={p.stewardshipLabel}
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
  const [activeDay, setActiveDay] = useState('ramadan');
  const [openFaq, setOpenFaq] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const compact = useScrolledPast(40);
  const menuBtnRef = useRef(null);
  const sheetRef = useRef(null);

  // While the sheet is open: Escape closes it, the page behind it cannot
  // scroll, and focus moves inside. Closing hands focus back to the button
  // that opened it, so keyboard users don't get dropped at the top of the DOM.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const trigger = menuBtnRef.current; // same node at cleanup; captured to satisfy the lint rule
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    sheetRef.current?.querySelector('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [menuOpen]);

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

  const activeVariant = DAY_VARIANTS.find((v) => v.id === activeDay);

  return (
    <div className={`landing${compact ? ' is-compact' : ''}${menuOpen ? ' is-menu-open' : ''}`}>
      {/* Nav */}
      <nav className="landing-nav">
        <Link to="/" className="landing-logo">
          <div className="logo-icon"><Moon size={16} /></div>
          MIOS
        </Link>
        <ul className="landing-nav-links">
          {NAV_LINKS.slice(0, 3).map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <button
          type="button"
          ref={menuBtnRef}
          className="landing-nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="landing-mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="landing-nav-actions">
          {user ? (
            <Link to="/app" className="btn btn-primary">
              Go to Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              {cloudAccountsEnabled ? (
                <Link to="/auth" className="btn btn-ghost landing-nav-signin">
                  <LogIn size={16} /> Sign In
                </Link>
              ) : (
                <button className="btn btn-ghost landing-nav-signin" onClick={() => setShowLogin(true)}>
                  <LogIn size={16} /> Enter MIOS
                </button>
              )}
              <Link to="/get-started" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile sheet. Anchored under the nav and pulled up out of sight when
          closed — never pinned to the bottom edge, which is the failure mode
          the in-app MobileNav keeps hitting. `inert` keeps the closed sheet out
          of the tab order while still letting it transition. */}
      <div
        className="landing-sheet-backdrop"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        id="landing-mobile-nav"
        ref={sheetRef}
        className="landing-sheet"
        inert={!menuOpen || undefined}
      >
        <ul className="landing-sheet-links">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} style={{ '--i': i }}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>
                <span className="landing-sheet-icon"><l.Icon size={18} /></span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {/* The bar has no room for a second button at 375px, so the sign-in
            route lives here instead. The primary CTA stays in the bar. */}
        {!user && (
          <div className="landing-sheet-actions">
            {cloudAccountsEnabled ? (
              <Link to="/auth" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>
                <LogIn size={16} /> Sign In
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => { setMenuOpen(false); setShowLogin(true); }}
              >
                <LogIn size={16} /> Enter MIOS
              </button>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="expense-form-overlay landing-login-overlay">
          <div className="expense-form-modal landing-login-modal">
            <div className="expense-form-header">
              <h3>Continue locally</h3>
              <button className="expense-form-close" onClick={() => setShowLogin(false)}><X size={18} /></button>
            </div>
            <div className="expense-form-body">
              <p className="landing-login-note">
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
              <button className="btn btn-primary" onClick={handleLogin} disabled={!loginName.trim()}>
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
              {/* motif-shimmer-border is tokens.css's 4s mask-composite sweep;
                  it falls back to --primary when no --motif-tint is set. */}
              <Link to="/get-started" className="btn btn-primary btn-lg motif-shimmer-border">
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
              <div key={dup} className="hero-marquee-group">
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
      <RevealSection className="features-section" id="orientation">
        <div className="section-head section-head--split">
          <div className="section-head-lead">
            <p className="section-label">Orientation</p>
            <h2 className="section-title">One next step. Never a backlog.</h2>
          </div>
          <p className="section-subtitle">
            Open MIOS and it names a single subtask — the one your Core tier is missing first. Not a list to triage. One thing, with the trail that led to it.
          </p>
        </div>

        <div className="feature-content">
          <div className="orient-deck">
            <div className="orient-card orient-card--stacked orient-card--back" aria-hidden="true" />
            <div className="orient-card orient-card--stacked orient-card--mid" aria-hidden="true" />
            <div
              className="orient-card orient-card--front motif-halo"
              style={{ '--motif-tint': ORIENT_PILLAR.accentColor }}
            >
              <div className="orient-ladder">
                {/* Tinted off the --motif-tint the card above already carries. */}
                <span className="orient-ladder-pillar">{ORIENT_PILLAR.sidebarLabel}</span>
                <span className="orient-ladder-sep">&rsaquo;</span>
                <span>Core</span>
                <span className="orient-ladder-sep">&rsaquo;</span>
                <span>Extended Family</span>
                <span className="orient-ladder-sep">&rsaquo;</span>
                <span>Silat al-Rahim</span>
              </div>
              <p className="orient-task">Call one relative you haven&rsquo;t spoken to this month.</p>
              <div className="orient-meta">
                <span
                  className="orient-badge"
                  data-tip={ORIENT_TIER.description}
                  style={{ '--badge-color': ORIENT_TIER.color, '--badge-bg': ORIENT_TIER.bg }}
                >
                  {ORIENT_TIER.id} · {ORIENT_TIER.label.toUpperCase()}
                </span>
                <span className="orient-why">Why &amp; how</span>
              </div>
              <div className="orient-exits">
                {ORIENTATION_EXITS.map((label) => (
                  <span key={label} className="orient-exit">{label}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="feature-list">
            {ORIENTATION_POINTS.map((f, i) => (
              <div key={f.title} className="feature-item reveal-stagger" style={{ '--i': i }}>
                <div className="feature-icon">
                  {f.Icon && <f.Icon size={18} />}
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
      </RevealSection>

      {/* Evidence — the two-axis grounding schema */}
      <RevealSection className="pricing-section" id="evidence">
        <p className="section-label">Evidence</p>
        <h2 className="section-title">Every task carries its evidence.</h2>
        <p className="section-subtitle">
          Not a quote bolted on afterwards. Each subtask MIOS ships with carries its Qur&rsquo;an and hadith references — and each reference is graded on two independent axes.
        </p>

        <p className="evidence-axis-label">Provenance — how verified the evidence is</p>
        <div className="evidence-bento">
          {AMANAH_TIERS.map((tier, i) => {
            const [meaning, verdict] = splitTierDescription(tier.description);
            return (
              <article
                key={tier.id}
                className={`evidence-bento-card reveal-stagger${i === 0 ? ' is-featured' : ''}`}
                style={{ '--tier-color': tier.color, '--tier-bg': tier.bg, '--i': i }}
              >
                <div className="evidence-tier-head">
                  <span className="evidence-badge">{tier.id}</span>
                  <div>
                    <div className="evidence-tier-name">{tier.label}</div>
                    <div className="evidence-tier-ar">{tier.arabic}</div>
                  </div>
                </div>
                <p className="evidence-tier-desc">{meaning}</p>
                {verdict && <p className="evidence-tier-verdict">{verdict}</p>}
              </article>
            );
          })}
        </div>

        <p className="evidence-axis-label">Relevance — how closely the citation bears on the task</p>
        <div className="evidence-rail">
          {RELEVANCE_CHIPS.map((chip, i) => (
            <div
              key={chip.id}
              className="evidence-rail-item reveal-stagger"
              style={{ '--chip-color': chip.color, '--chip-bg': chip.bg, '--i': i }}
            >
              <span className="evidence-badge is-chip">{chip.label}</span>
              <p>{chip.description}</p>
            </div>
          ))}
        </div>

        <p className="evidence-note">
          Qur&rsquo;an passages render word-by-word with translation; hadith render with their collection, number, and — where the collection assigns one — their grade. MIOS does not issue rulings: citations are starting points for reflection and study, not a fatwa. Verify with a qualified scholar before acting on contested matters.
        </p>
      </RevealSection>

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
      <RevealSection className="features-section" id="sunnah">
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
              style={{ '--tab-accent': v.accent }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {activeVariant && (
          <div className="day-panel" style={{ '--day-accent': activeVariant.accent }} aria-live="polite">
            <p className="day-panel-headline">{activeVariant.headline}</p>
            <p className="day-panel-quote">{activeVariant.quote}</p>
            <p className="day-panel-shift">{activeVariant.shift}</p>
          </div>
        )}
      </RevealSection>

      {/* How It Works */}
      <RevealSection className="pricing-section" id="how-it-works">
        <div className="section-head section-head--split">
          <div className="section-head-lead">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">Three steps to a purposeful life</h2>
          </div>
          <p className="section-subtitle">Get started in under a minute. No account required — everything runs on your device until you choose to sync.</p>
        </div>

        <div className="how-steps">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="how-step reveal-stagger" style={{ '--i': i }}>
                <span className="how-step-num" aria-hidden="true">{step.step}</span>
                <div className="how-step-icon"><Icon size={24} /></div>
                <p className="how-step-eyebrow">Step {step.step}</p>
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </RevealSection>

      {/* CTA */}
      <RevealSection className="cta-section">
        <h2>Ready to align your life with purpose?</h2>
        <p>Join those who organize every dimension of their life around the objectives that truly matter.</p>
        <Link to="/get-started" className="btn btn-primary btn-lg motif-shimmer-border">
          Get Started Free <ArrowRight size={18} />
        </Link>
      </RevealSection>

      {/* FAQ */}
      <RevealSection className="faq-section" id="faq">
        <p className="section-label">FAQ</p>
        <h2 className="section-title">Frequently asked questions</h2>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item reveal-stagger" style={{ '--i': i }}>
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
      </RevealSection>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="landing-logo">
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
