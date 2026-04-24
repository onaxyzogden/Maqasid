// Placeholder wisdom payloads for non-Faith module wheels.
//
// Each entry follows the same shape as FAITH_PILLAR_WISDOM:
//   { arabic, english, citation }
//
// These are intentionally stub messages — no Quranic ayah or hadith is placed
// here until curated per-module content is sourced from the Muslim Scholar
// NotebookLM corpus (1c17b03b). The wheel surfaces these via
// WheelWisdomTooltip only after a 1s hover; a null entry suppresses the
// tooltip entirely.
//
// When a module is ready for real content, replace its object below.
// Pass PILLAR_WISDOM.<module> to <ModuleWheelSection pillarWisdom={...} />.

const stub = (label) => ({
  arabic: '',
  english: `Wisdom for ${label} is being curated. Reflection coming soon.`,
  citation: '',
});

export const PILLAR_WISDOM = {
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
  ogden: {
    bbos:    stub('BBOS'),
    maqasid: stub('MILOS'),
    atlas:   stub('Atlas'),
  },
};

export default PILLAR_WISDOM;
