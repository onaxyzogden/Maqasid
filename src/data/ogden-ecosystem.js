// OGDEN Ecosystem — a meta-module that tracks the journey of BBOS + MILOS + Atlas
// converging to produce Moontrance. Not a Maqasid pillar; sits below them in the sidebar.
//
// Internal level keys remain `core | growth | excellence` to stay compatible with
// LevelNavigator, useModulesProgress, and board id conventions. Display copy
// overrides the defaults via `levelDescriptions`.

import { Briefcase, Compass, Globe2 } from 'lucide-react';

export const OGDEN_ACCENT = '#7E6EAD';

export const OGDEN_SUB_PILLARS = [
  { id: 'bbos',    label: 'BBOS',    Icon: Briefcase, route: '/app/ogden-bbos',    glossaryId: 'ogden-bbos' },
  { id: 'maqasid', label: 'Maqasid', Icon: Compass,   route: '/app/ogden-maqasid', glossaryId: 'ogden-maqasid' },
  { id: 'atlas',   label: 'Atlas',   Icon: Globe2,    route: '/app/ogden-atlas',   glossaryId: 'ogden-atlas' },
];

// Map pillar.id (board infix) \u2194 MODULES entry id (sidebar/route id).
export const OGDEN_MODULE_ID = {
  bbos:    'ogden-bbos',
  maqasid: 'ogden-maqasid',
  atlas:   'ogden-atlas',
};

export const OGDEN_LEVEL_ROUTES = {
  core:       '/app/ogden-foundation',
  growth:     '/app/ogden-integration',
  excellence: '/app/ogden-realization',
};

// Overrides the default Daruriyyat / Hajiyyat / Tahsiniyyat copy in LevelNavigator
// while keeping internal keys stable.
export const OGDEN_LEVELS = {
  core: {
    label:    'LEVEL 1',
    subtitle: '(FOUNDATION)',
    title:    'Foundation',
    desc:     'Each system stood up on its own \u2014 BBOS, MILOS, Atlas operating independently.',
    color:    OGDEN_ACCENT,
  },
  growth: {
    label:    'LEVEL 2',
    subtitle: '(INTEGRATION)',
    title:    'Integration',
    desc:     'Systems wired together \u2014 shared data, shared gates, shared covenant.',
    color:    OGDEN_ACCENT,
  },
  excellence: {
    label:    'LEVEL 3',
    subtitle: '(REALIZATION)',
    title:    'Realization',
    desc:     'The ecosystem delivers Moontrance \u2014 land, community, and worship in one flow.',
    color:    OGDEN_ACCENT,
  },
};

export const OGDEN_STORAGE_KEY = 'ogden_active_tab';

export const OGDEN_ENSURE_PROJECTS = (s) => s.ensureOgdenProjects;
