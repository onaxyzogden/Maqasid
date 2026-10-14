// Per-route document title (WCAG 2.4.2 Page Titled). Every route used to share
// one static title, so screen-reader and tab-switching users could not tell
// pages apart. Format: "<Page> · MIOS"; the landing page keeps the full name.
import { MAQASID_PILLARS, getPillarById, getPillarForModule, getSubmoduleLabel } from '../data/maqasid';

export const APP_NAME = 'MIOS';
export const FULL_TITLE = 'MIOS — Maqasid Islam Orienting System';

const NAMED = {
  'get-started': 'Get started',
  auth: 'Sign in',
  '': 'Dashboard',
  'prophetic-path': 'Prophetic Path',
  orientation: 'Orientation',
  settings: 'Settings',
  account: 'Account',
  notifications: 'Notifications',
  tasks: 'Tasks',
  journal: 'Journal',
  assets: 'Assets',
  quran: "Qur'an",
  hadith: 'Hadith',
  'islamic-knowledge': 'Islamic Knowledge',
};
const LEVEL = { core: 'Core', growth: 'Growth', excellence: 'Excellence' };
const titleCase = (s) => s.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

export function titleForPath(pathname = '/') {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (parts.length === 0) return FULL_TITLE;
  const inApp = parts[0] === 'app';
  const seg = inApp ? (parts[1] ?? '') : parts[0];

  let page;
  if (inApp && seg === 'pillar' && parts[2]) {
    page = getPillarById(parts[2])?.sidebarLabel ?? titleCase(parts[2]);
  } else if (NAMED[seg] !== undefined) {
    page = NAMED[seg];
  } else {
    const level = seg.match(/^([a-z]+)-(core|growth|excellence)$/);
    const pillarOfLevel = level && MAQASID_PILLARS.find((p) => p.id === level[1]);
    if (pillarOfLevel) page = `${pillarOfLevel.sidebarLabel} · ${LEVEL[level[2]]}`;
    else {
      const pillar = getPillarForModule(seg);
      page = pillar ? getSubmoduleLabel(seg, pillar.id) : titleCase(seg);
    }
  }
  return page ? `${page} · ${APP_NAME}` : FULL_TITLE;
}
