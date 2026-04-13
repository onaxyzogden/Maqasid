import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, Star, LogIn, X, Moon, Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe, Check, BookOpen, Shield, Sparkles } from 'lucide-react';
import { MAQASID_PILLARS } from '../data/maqasid';
import { useAuthStore } from '../store/auth-store';
import { genUserId } from '../services/id';
import '../styles/landing.css';

const PILLAR_ICON_MAP = { Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe };

const PILLAR_FEATURES = {
  faith: {
    description: 'Preserve and cultivate your relationship with Allah through the five pillars of Islam, spiritual reflection, and access to primary sources.',
    items: [
      { title: 'Five Pillars Boards', desc: 'Dedicated Kanban boards for Shahada, Salah, Zakah, Sawm, and Hajj' },
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
      { title: 'Moontrance', desc: 'Faith-rooted land destination \u2014 experiences, stewardship, and community' },
    ],
  },
};

const FAQS = [
  { q: 'What is Maqasid OS?', a: "Maqasid OS is an Islamic Life Operating System \u2014 a single platform to manage every dimension of your life across the Seven Maqasid: Faith, Life, Intellect, Family, Wealth, Environment, and Ummah. It replaces scattered apps with one purposeful system grounded in the higher objectives of the Shari\u2019ah." },
  { q: 'What are the Seven Maqasid?', a: "The Maqasid al-Shari\u2019ah are the higher objectives of Islamic law: preserving and developing Faith (Din), Life (Nafs), Intellect (\u2018Aql), Family (Nasl), Wealth (Mal), Environment (Bi\u2019ah), and Ummah (community). These seven pillars form the organizing structure of everything in Maqasid OS." },
  { q: 'Is Maqasid OS only for Muslims?', a: 'The system is built on Islamic principles, but during onboarding you can choose between an Islamic values layer and a universal ethics path. The core tools \u2014 task management, goal tracking, financial planning \u2014 work identically either way.' },
  { q: 'What can I actually track?', a: 'Each pillar has dedicated sub-modules with Kanban boards, task management, and progress tracking. Examples: prayer consistency, health goals, learning plans, family commitments, budgets and expenses, environmental footprint, and community engagement.' },
  { q: 'Is my data private?', a: 'Yes. All data is stored locally on your device. Nothing is sent to external servers. You can export your full dataset as JSON at any time from Settings.' },
  { q: 'Is it free?', a: 'Yes. Maqasid OS is completely free to use with full access to all seven pillars and every sub-module. No paywalls, no premium tiers.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Path', desc: 'Select the Islamic values layer or universal ethics during onboarding. Set your name and preferences.', icon: Compass },
  { step: '02', title: 'Explore Your Pillars', desc: 'Each of the Seven Maqasid has its own dashboard with sub-modules, Kanban boards, and readiness checks.', icon: BookOpen },
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
          <li><a href="#pillars">Pillars</a></li>
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
        <div className="hero-badge">
          <Star size={14} /> Islamic Life Operating System
        </div>
        <h1 className="hero-title">
          Organize your life around <span className="highlight">what truly matters</span>
        </h1>
        <p className="hero-subtitle">
          One system for <span className="tag">faith</span>, <span className="tag">health</span>, <span className="tag">intellect</span>, <span className="tag">family</span>, <span className="tag">wealth</span>, <span className="tag">environment</span>, and <span className="tag">community</span> — grounded in the higher objectives of the Shari'ah.
        </p>
        <div className="hero-cta">
          <Link to="/get-started" className="btn btn-primary btn-lg">
            Get Started Free <ArrowRight size={18} />
          </Link>
          <a href="#pillars" className="btn btn-secondary btn-lg">Explore the Pillars</a>
        </div>
        <div className="hero-modules">
          {MAQASID_PILLARS.map((pillar) => {
            const Icon = PILLAR_ICON_MAP[pillar.icon];
            return (
              <div key={pillar.id} className="hero-module-chip" style={{ borderColor: pillar.accentColor + '40' }}>
                {Icon && <Icon size={16} style={{ color: pillar.accentColor }} />}
                {pillar.sidebarLabel}
                <span style={{ fontSize: '0.75rem', color: pillar.accentColor, fontWeight: 600, fontStyle: 'italic' }}>{pillar.arabicRootAr}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Seven Pillars */}
      <section className="features-section" id="pillars">
        <p className="section-label">The Seven Maqasid</p>
        <h2 className="section-title">One system for every dimension of your life</h2>
        <p className="section-subtitle">
          The Maqasid al-Shariah — the higher objectives of Islamic law — provide the framework. Each pillar has its own dashboard, sub-modules, and growth tiers.
        </p>

        <div className="feature-tabs">
          {MAQASID_PILLARS.map((pillar) => {
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
          <div className="feature-preview" style={{ borderColor: activePillar?.accentColor + '30' }}>
            <div className="feature-preview-placeholder" style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)', color: activePillar?.accentColor }}>
                {activePillar && PILLAR_ICON_MAP[activePillar.icon] && (() => {
                  const Icon = PILLAR_ICON_MAP[activePillar.icon];
                  return <Icon size={48} />;
                })()}
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--space-1)' }}>
                {activePillar?.sidebarLabel}
              </div>
              <div style={{ fontSize: '1.1rem', color: activePillar?.accentColor, fontStyle: 'italic', marginBottom: 'var(--space-3)' }}>
                {activePillar?.arabicRoot} &middot; {activePillar?.arabicRootAr}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text2)', maxWidth: 320, margin: '0 auto', lineHeight: 1.6 }}>
                {activeFeatures?.description}
              </div>
            </div>
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
              <li><a href="#pillars">Pillars</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>The Seven Maqasid</h6>
            <ul>
              {MAQASID_PILLARS.map((p) => (
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
