// Placeholder "Next action" prompts for non-Faith module wheels.
//
// Each entry: { core, growth, excellence }. Shown in the sector-adjacent
// pop-out card when the user hovers a sector and the pillar is not yet at
// 100%. Strings here are polite defaults derived from each pillar's label —
// curated per-module sprints will replace them with concrete invitations.

const stub = (label) => ({
  core:       `Establish ${label}`,
  growth:     `Deepen ${label}`,
  excellence: `Refine ${label}`,
});

export const PILLAR_NEXT_ACTIONS = {
  life: {
    physical: stub('Physical Health'),
    mental:   stub('Mental Well-being'),
    safety:   stub('Safety & Security'),
    social:   stub('Social Character'),
  },
  intellect: {
    learning:     stub('Learning & Literacy'),
    thinking:     stub('Critical Thinking'),
    cognitive:    stub('Cognitive Integrity'),
    professional: stub('Skill Proficiency'),
  },
  family: {
    marriage:  stub('Foundations of Marriage'),
    parenting: stub('Parenting & Mentorship'),
    kinship:   stub('Extended Family'),
    home:      stub('Home Environment'),
  },
  wealth: {
    earning:     stub('Halal Earning'),
    financial:   stub('Financial Management'),
    ownership:   stub('Ownership & Rights'),
    circulation: stub('Wealth Circulation'),
  },
  environment: {
    resource:  stub('Resource Consumption'),
    waste:     stub('Waste & Pollution'),
    ecosystem: stub('Ecosystem & Biodiversity'),
    sourcing:  stub('Ethical Sourcing'),
  },
  ummah: {
    collective: stub('Collective Stewardship'),
    neighbors:  stub('Neighbors'),
    community:  stub('Community'),
  },
  moontrance: {
    'moontrance-land':      stub('Moontrance Land'),
    'moontrance-seasonal':  stub('Moontrance Seasonal'),
    'moontrance-residency': stub('Moontrance Residency'),
  },
};

export default PILLAR_NEXT_ACTIONS;
