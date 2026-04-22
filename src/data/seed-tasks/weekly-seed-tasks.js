// Weekly seed tasks — populate the three `weekly_{moduleId}` boards with
// weekly-cadence planning items that used to surface inside the Prophetic
// Path MirrorCard for Morning and Midday Labor Before/After. Those slots now
// trigger the Threshold (opening/closing) modal; the planning items live
// here so they are still accessible as a standalone kanban.
//
// Shape: { weekly_{moduleId}: [task, ...] } — consumed by seedTasks() in
// project-store.js, which lands every row in the `col_{boardId}_to_do`
// column (matches the invariant documented for other `ensure*Projects`).

export const WEEKLY_SEED_TASKS = {
  weekly_work: [
    {
      title: 'Review and refine your professional mission statement',
      priority: 'high',
      tags: ['weekly', 'planning', 'niyyah', 'cadence:weekly'],
      subtasks: [
        { title: 'Re-read last week\u2019s mission statement aloud before planning' },
        { title: 'Note any drift between the statement and the past week\u2019s work' },
        { title: 'Tighten one sentence so it filters more decisions this week' },
      ],
    },
    {
      title: 'Set three weekly outcomes that serve the mission',
      priority: 'high',
      tags: ['weekly', 'planning', 'cadence:weekly'],
      subtasks: [
        { title: 'Name the outcome (not the activity) for each of the three' },
        { title: 'Anchor each outcome to a Maqasid pillar it advances' },
        { title: 'Block the calendar hours that protect deep work on them' },
      ],
    },
    {
      title: 'Conduct a weekly shutdown review',
      priority: 'medium',
      tags: ['weekly', 'retro', 'muhasabah', 'cadence:weekly'],
      subtasks: [
        { title: 'What did I finish this week? What did I start and leave open?' },
        { title: 'What pulled attention away from the craft?' },
        { title: 'What one adjustment would honour the amanah next week?' },
      ],
    },
    {
      title: 'Plan the week\u2019s learning and skill block',
      priority: 'medium',
      tags: ['weekly', 'learning', 'cadence:weekly'],
      subtasks: [
        { title: 'Identify the highest-leverage skill gap for the next 90 days' },
        { title: 'Schedule two 60-minute deep-study sessions on the calendar' },
      ],
    },
  ],

  weekly_wealth: [
    {
      title: 'Review revenue, invoices, and halal-income hygiene',
      priority: 'high',
      tags: ['weekly', 'wealth', 'rizq', 'cadence:weekly'],
      subtasks: [
        { title: 'Reconcile last week\u2019s income against commitments delivered' },
        { title: 'Flag any revenue stream that drifted toward gharar or riba' },
        { title: 'Queue invoices or follow-ups that should go out Monday' },
      ],
    },
    {
      title: 'Weekly client and opportunity triage',
      priority: 'high',
      tags: ['weekly', 'business', 'cadence:weekly'],
      subtasks: [
        { title: 'List active clients/opportunities; mark status (green/amber/red)' },
        { title: 'Decide one client to delight and one conversation to close' },
        { title: 'Note any opportunity that does not pass the mission filter \u2014 decline it' },
      ],
    },
    {
      title: 'Plan this week\u2019s deep-work and shipping blocks',
      priority: 'medium',
      tags: ['weekly', 'planning', 'deep-work', 'cadence:weekly'],
      subtasks: [
        { title: 'Choose the single deliverable that must ship this week' },
        { title: 'Protect two mornings of uninterrupted deep-work time' },
      ],
    },
    {
      title: 'Financial stewardship check-in',
      priority: 'medium',
      tags: ['weekly', 'financial', 'zakah', 'cadence:weekly'],
      subtasks: [
        { title: 'Review spend vs. budget; surface any anomaly' },
        { title: 'Log any sadaqah or zakah movement for the week' },
      ],
    },
    {
      title: 'Close the week with gratitude + handoff',
      priority: 'low',
      tags: ['weekly', 'retro', 'alhamdulillah', 'cadence:weekly'],
      subtasks: [
        { title: 'Write three alhamdulillah\u2019s from the week\u2019s work' },
        { title: 'Leave a clean handoff note for Monday self' },
      ],
    },
  ],

  weekly_community: [
    {
      title: 'Plan one act of service for the community this week',
      priority: 'high',
      tags: ['weekly', 'community', 'ihsan', 'cadence:weekly'],
      subtasks: [
        { title: 'Identify a neighbour, masjid, or collective in current need' },
        { title: 'Decide the specific act (time, resource, skill) you will offer' },
        { title: 'Schedule it before it becomes an abstraction' },
      ],
    },
    {
      title: 'Check in on three people you have not spoken to this month',
      priority: 'medium',
      tags: ['weekly', 'silat-al-rahim', 'cadence:weekly'],
      subtasks: [
        { title: 'List three names; prefer relatives or neighbours first' },
        { title: 'Send a short, sincere du\u2019a or voice note \u2014 not a favour request' },
      ],
    },
    {
      title: 'Weekly ummah-facing retro',
      priority: 'medium',
      tags: ['weekly', 'retro', 'cadence:weekly'],
      subtasks: [
        { title: 'Where did my work this week benefit someone beyond my household?' },
        { title: 'Where did I default to extraction rather than contribution?' },
        { title: 'What one adjustment will make next week more amanah-aligned?' },
      ],
    },
    {
      title: 'Review mutual-aid and collective commitments',
      priority: 'low',
      tags: ['weekly', 'collective', 'cadence:weekly'],
      subtasks: [
        { title: 'List any standing collective commitments (circle, rotation, jam\u2019iyya)' },
        { title: 'Confirm or renegotiate what you can sustain this week' },
      ],
    },
  ],
};

// Board metadata consumed by ensureWeeklyProjects in project-store.js.
export const WEEKLY_BOARDS = [
  {
    id: 'weekly_work',
    name: 'Weekly \u00b7 Work',
    description: 'Weekly-cadence planning, shutdown, and learning blocks for the work module.',
    color: '#4ab8a8',
    icon: 'CalendarCheck',
    moduleId: 'work',
  },
  {
    id: 'weekly_wealth',
    name: 'Weekly \u00b7 Wealth',
    description: 'Weekly-cadence revenue, client, and stewardship review for the wealth module.',
    color: '#8b5cf6',
    icon: 'Coins',
    moduleId: 'wealth-earning',
  },
  {
    id: 'weekly_community',
    name: 'Weekly \u00b7 Community',
    description: 'Weekly-cadence community service, silat al-rahim, and collective retro.',
    color: '#f59e0b',
    icon: 'Users',
    moduleId: 'community',
  },
];
