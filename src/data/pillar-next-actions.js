// Curated "Next action" prompts for non-Faith module wheels.
//
// Each entry: { core, growth, excellence }. Shown in the sector-adjacent
// pop-out card when the user hovers a sector and the pillar is not yet at
// 100%. The three tiers correspond to the three Path-to-Excellence levels
// (Core / Growth / Excellence) — concrete invitations matched to each
// sub-module's Quranic anchor in `pillar-wisdom.js`.
//
// `moontrance` and `ogden` entries remain stubs by design — see notes in
// pillar-wisdom.js (deferred pending top-level Moontrance MODULE_ATTRS;
// Ogden tools are not Maqasid life domains).

const stub = (label) => ({
  core:       `Establish ${label}`,
  growth:     `Deepen ${label}`,
  excellence: `Refine ${label}`,
});

export const PILLAR_NEXT_ACTIONS = {
  life: {
    physical: {
      core:       'Tend the body as a trust — eat, sleep, move',
      growth:     'Build a sustainable rhythm of rest and movement',
      excellence: 'Steward the body so it serves your worship',
    },
    mental: {
      core:       'Anchor the heart with daily dhikr',
      growth:     'Pair dhikr with rest from anxious thought',
      excellence: 'Carry tranquility into work, family, decisions',
    },
    safety: {
      core:       'Secure shelter, food, and household safety',
      growth:     'Build resilience for crisis — savings, plans, drills',
      excellence: 'Be a refuge so others find safety in you',
    },
    social: {
      core:       'Hold to truthfulness in every encounter',
      growth:     'Practice courtesy, restraint, and good company',
      excellence: 'Carry character that others recognize as proof',
    },
  },
  intellect: {
    learning: {
      core:       'Read, listen, absorb something each day',
      growth:     'Choose one discipline and pursue it consistently',
      excellence: 'Teach what you know — let learning multiply',
    },
    thinking: {
      core:       "Pause before opinion — ask 'on what basis?'",
      growth:     'Test claims against evidence; revise when wrong',
      excellence: 'Reason carefully across domains, with humility',
    },
    cognitive: {
      core:       "Don't repeat what you cannot verify",
      growth:     'Filter input — protect attention from noise',
      excellence: 'Refuse rumor; seek truth even when uncomfortable',
    },
    professional: {
      core:       'Take craftsmanship seriously — itqan in every task',
      growth:     'Refine the work until quality becomes habit',
      excellence: 'Make ihsan your signature — excellence as worship',
    },
  },
  family: {
    marriage: {
      core:       'Make the home a place of mercy, not just function',
      growth:     'Tend the marriage with patience, gratitude, du`a',
      excellence: 'Build a partnership the next generation can model',
    },
    parenting: {
      core:       'Teach tawhid before all else',
      growth:     'Mentor with patience — correct without breaking',
      excellence: 'Raise children whose hearts are anchored, not just informed',
    },
    kinship: {
      core:       'Reach out to one relative this week',
      growth:     'Maintain ties that distance has frayed',
      excellence: 'Carry the family through hardship — silat ar-rahim',
    },
    home: {
      core:       'Make the home a sanctuary for prayer and rest',
      growth:     'Order the home so worship and tranquility return',
      excellence: 'Welcome guests — earn the home its barakah',
    },
  },
  wealth: {
    earning: {
      core:       'Verify the source — only halal, only tayyib',
      growth:     'Build income that holds up under scrutiny',
      excellence: 'Earn so that what you carry is pure',
    },
    financial: {
      core:       'Spend within means; track what flows in and out',
      growth:     'Build savings, avoid riba, plan beyond the month',
      excellence: 'Steward wealth as a trust — qawam, never extreme',
    },
    ownership: {
      core:       'Honor contracts; refuse what was not yours',
      growth:     'Trade by mutual consent; avoid gharar and deception',
      excellence: 'Let ownership be visibly just, even at cost',
    },
    circulation: {
      core:       'Pay zakat; give sadaqah regularly',
      growth:     'Direct wealth toward those without',
      excellence: 'Build systems that keep wealth flowing — not hoarded',
    },
  },
  environment: {
    resource: {
      core:       "Take what you need; leave what you don't",
      growth:     'Cut waste in food, water, energy, things',
      excellence: "Live lightly — consumption that won't be questioned",
    },
    waste: {
      core:       'Refuse, reduce, reuse — in that order',
      growth:     'Compost, repair, donate — close the loop',
      excellence: 'Make waste rare — your habits leave no trail',
    },
    ecosystem: {
      core:       'Treat creatures as kin, not commodity',
      growth:     'Protect habitat — plant, restore, observe',
      excellence: 'Tend a piece of land or life so it thrives after you',
    },
    sourcing: {
      core:       'Ask where it came from before you buy',
      growth:     'Choose tayyib origin — fair, clean, halal',
      excellence: "Build supply chains you'd be willing to defend",
    },
  },
  ummah: {
    collective: {
      core:       'Show up — the jamaah needs your presence',
      growth:     'Repair fractures in the community before they spread',
      excellence: 'Bind the ummah together — prefer unity over rightness',
    },
    neighbors: {
      core:       'Greet your neighbor by name',
      growth:     "Share food, offer help, attend their joys and griefs",
      excellence: "Be the neighbor whose presence elevates the street",
    },
    community: {
      core:       "Reconcile when there's friction",
      growth:     'Carry community responsibilities — masjid, charity, leadership',
      excellence: 'Leave the community better than you found it',
    },
  },
  moontrance: {
    'moontrance-land':      stub('Moontrance Land'),
    'moontrance-seasonal':  stub('Moontrance Seasonal'),
    'moontrance-residency': stub('Moontrance Residency'),
  },
  ogden: {
    bbos:    stub('BBOS'),
    milos:   stub('MILOS'),
    atlas:   stub('Atlas'),
  },
};

export default PILLAR_NEXT_ACTIONS;
