import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import { genMonitorId, genBreachId, genIntegrationId, genCampaignId, genDarkWebEmailId } from '../services/id';

function persistMonitors(d) { safeSet('tech_monitors', d); }
function persistBreaches(d) { safeSet('tech_breaches', d); }
function persistDarkWebEmails(d) { safeSet('tech_dark_web_emails', d); }
function persistDarkWebEnabled(d) { safeSet('tech_dark_web_enabled', d); }
function persistIntegrations(d) { safeSet('tech_integrations', d); }
function persistCampaigns(d) { safeSet('tech_campaigns', d); }

export const MONITOR_STATUSES = [
  { id: 'up', label: 'Up', color: '#22c55e' },
  { id: 'down', label: 'Down', color: '#ef4444' },
  { id: 'degraded', label: 'Degraded', color: '#f59e0b' },
  { id: 'unknown', label: 'Unknown', color: '#6b7280' },
];

const DEFAULT_INTEGRATIONS = [
  { id: 'intg_slack', name: 'Slack', description: 'Get real-time project updates and notifications delivered to your Slack channels via Aqtobot.', category: 'Communication', status: 'disconnected', icon: 'slack', configuredAt: null },
  { id: 'intg_xero', name: 'Xero', description: 'Connect your Xero organisation to sync invoices and payments in both directions.', category: 'Finance', status: 'disconnected', icon: 'xero', configuredAt: null },
];

export const useTechStore = create((set) => ({
  // ── Monitors / Websites ──
  monitors: safeGetJSON('tech_monitors', []),

  addMonitor: ({ name, url }) => {
    const mon = {
      id: genMonitorId(), name: name || '', url: url || '',
      status: 'unknown', lastChecked: null,
      responseTime: null, monitoringStatus: 'active',
      uptimeHistory: [], addedBy: null,
      createdAt: new Date().toISOString(),
    };
    set((s) => { const monitors = [...s.monitors, mon]; persistMonitors(monitors); return { monitors }; });
    return mon;
  },
  updateMonitor: (id, updates) => set((s) => {
    const monitors = s.monitors.map((m) => m.id === id ? { ...m, ...updates } : m);
    persistMonitors(monitors); return { monitors };
  }),
  deleteMonitor: (id) => set((s) => {
    const monitors = s.monitors.filter((m) => m.id !== id);
    persistMonitors(monitors); return { monitors };
  }),
  pauseMonitor: (id) => set((s) => {
    const monitors = s.monitors.map((m) => m.id === id ? { ...m, monitoringStatus: 'paused' } : m);
    persistMonitors(monitors); return { monitors };
  }),
  resumeMonitor: (id) => set((s) => {
    const monitors = s.monitors.map((m) => m.id === id ? { ...m, monitoringStatus: 'active' } : m);
    persistMonitors(monitors); return { monitors };
  }),
  checkMonitor: (id) => set((s) => {
    const monitors = s.monitors.map((m) => {
      if (m.id !== id) return m;
      const statuses = ['up', 'up', 'up', 'up', 'up', 'degraded', 'down'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const responseTime = newStatus === 'up' ? Math.floor(Math.random() * 300) + 50 : newStatus === 'degraded' ? Math.floor(Math.random() * 1000) + 500 : null;
      const today = new Date().toISOString().slice(0, 10);
      const history = [...(m.uptimeHistory || [])];
      const todayEntry = history.find((h) => h.date === today);
      if (todayEntry) {
        if (newStatus === 'up') todayEntry.upMinutes += 5;
        else todayEntry.downMinutes += 5;
      } else {
        history.push({ date: today, upMinutes: newStatus === 'up' ? 5 : 0, downMinutes: newStatus !== 'up' ? 5 : 0 });
      }
      return { ...m, status: newStatus, lastChecked: new Date().toISOString(), responseTime, uptimeHistory: history };
    });
    persistMonitors(monitors); return { monitors };
  }),

  // ── Dark Web ──
  darkWebEnabled: safeGetJSON('tech_dark_web_enabled', true),
  darkWebEmails: safeGetJSON('tech_dark_web_emails', []),
  breaches: safeGetJSON('tech_breaches', []),

  toggleDarkWeb: () => set((s) => {
    const darkWebEnabled = !s.darkWebEnabled;
    persistDarkWebEnabled(darkWebEnabled);
    return { darkWebEnabled };
  }),
  addDarkWebEmail: (email) => {
    const entry = { id: genDarkWebEmailId(), email, status: 'monitoring', createdAt: new Date().toISOString() };
    set((s) => { const darkWebEmails = [...s.darkWebEmails, entry]; persistDarkWebEmails(darkWebEmails); return { darkWebEmails }; });
    return entry;
  },
  removeDarkWebEmail: (id) => set((s) => {
    const darkWebEmails = s.darkWebEmails.filter((e) => e.id !== id);
    persistDarkWebEmails(darkWebEmails); return { darkWebEmails };
  }),
  addBreach: ({ email, source, severity }) => {
    const breach = {
      id: genBreachId(), email: email || '', source: source || '',
      severity: severity || 'info', status: 'open',
      detectedAt: new Date().toISOString(), clearedAt: null,
    };
    set((s) => { const breaches = [...s.breaches, breach]; persistBreaches(breaches); return { breaches }; });
    return breach;
  },
  clearBreach: (id) => set((s) => {
    const breaches = s.breaches.map((b) => b.id === id ? { ...b, status: 'cleared', clearedAt: new Date().toISOString() } : b);
    persistBreaches(breaches); return { breaches };
  }),
  deleteBreach: (id) => set((s) => {
    const breaches = s.breaches.filter((b) => b.id !== id);
    persistBreaches(breaches); return { breaches };
  }),

  // ── Integrations ──
  integrations: safeGetJSON('tech_integrations', DEFAULT_INTEGRATIONS),

  toggleIntegration: (id) => set((s) => {
    const integrations = s.integrations.map((i) =>
      i.id === id ? { ...i, status: i.status === 'connected' ? 'disconnected' : 'connected', configuredAt: i.status === 'disconnected' ? new Date().toISOString() : null } : i
    );
    persistIntegrations(integrations); return { integrations };
  }),
  addIntegration: ({ name, description, category }) => {
    const intg = {
      id: genIntegrationId(), name: name || '', description: description || '',
      category: category || 'Other', status: 'disconnected',
      icon: 'default', configuredAt: null,
    };
    set((s) => { const integrations = [...s.integrations, intg]; persistIntegrations(integrations); return { integrations }; });
    return intg;
  },

  // ── Email Campaigns ──
  campaigns: safeGetJSON('tech_campaigns', []),

  addCampaign: ({ name, subject, content }) => {
    const campaign = {
      id: genCampaignId(), name: name || '', subject: subject || '',
      content: content || '', status: 'pending', isArchived: false,
      createdAt: new Date().toISOString(), sentAt: null,
    };
    set((s) => { const campaigns = [...s.campaigns, campaign]; persistCampaigns(campaigns); return { campaigns }; });
    return campaign;
  },
  updateCampaign: (id, updates) => set((s) => {
    const campaigns = s.campaigns.map((c) => c.id === id ? { ...c, ...updates } : c);
    persistCampaigns(campaigns); return { campaigns };
  }),
  deleteCampaign: (id) => set((s) => {
    const campaigns = s.campaigns.filter((c) => c.id !== id);
    persistCampaigns(campaigns); return { campaigns };
  }),
  sendCampaign: (id) => set((s) => {
    const campaigns = s.campaigns.map((c) => c.id === id ? { ...c, status: 'sent', sentAt: new Date().toISOString() } : c);
    persistCampaigns(campaigns); return { campaigns };
  }),
  archiveCampaign: (id) => set((s) => {
    const campaigns = s.campaigns.map((c) => c.id === id ? { ...c, isArchived: !c.isArchived } : c);
    persistCampaigns(campaigns); return { campaigns };
  }),
}));
