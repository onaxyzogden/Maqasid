export const JOB_STAGES = [
  { id: 'draft',     label: 'Draft',     color: '#6b7280' },
  { id: 'published', label: 'Published', color: '#3b82f6' },
  { id: 'on_hold',   label: 'On Hold',   color: '#f59e0b' },
  { id: 'filled',    label: 'Filled',    color: '#22c55e' },
  { id: 'inactive',  label: 'Inactive',  color: '#9ca3af' },
];

export const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'draft', label: 'Draft' },
  { id: 'published', label: 'Published' },
  { id: 'on_hold', label: 'On Hold' },
  { id: 'filled', label: 'Filled' },
  { id: 'closed', label: 'Closed' },
];

export const EMPLOYMENT_OPTIONS = [
  { id: 'full_time',  label: 'Full Time' },
  { id: 'part_time',  label: 'Part Time' },
  { id: 'contract',   label: 'Contract' },
  { id: 'intern',     label: 'Intern' },
];

export const SENIORITY_OPTIONS = [
  { id: 'not_specified', label: 'Not Specified' },
  { id: 'junior',       label: 'Junior' },
  { id: 'mid',          label: 'Mid-Level' },
  { id: 'senior',       label: 'Senior' },
  { id: 'lead',         label: 'Lead' },
  { id: 'manager',      label: 'Manager' },
  { id: 'director',     label: 'Director' },
  { id: 'executive',    label: 'Executive' },
];

export const LOCATION_TYPE_OPTIONS = [
  { id: 'not_specified', label: 'Not Specified' },
  { id: 'onsite',       label: 'On-site' },
  { id: 'remote',       label: 'Remote' },
  { id: 'hybrid',       label: 'Hybrid' },
];

export function generatePostingLink(posting) {
  const slug = posting.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `careers/${slug}-${posting.id.slice(-6)}`;
}
