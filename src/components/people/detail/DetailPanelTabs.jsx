import { useContactsStore } from '@store/contacts-store';
import HRTab from '../tabs/HRTab';
import AbsenceTab from '../tabs/AbsenceTab';
import PersonalTab from '../tabs/PersonalTab';
import SalaryTab from '../tabs/SalaryTab';
import SkillsTab from '../tabs/SkillsTab';
import DocsTab from '../tabs/DocsTab';
import WorkTab from '../tabs/WorkTab';
import ClockInsTab from '../tabs/ClockInsTab';
import LeadTab from '../tabs/LeadTab';
import CompanyInfoTab from '../tabs/CompanyInfoTab';
import CompanyPeopleTab from '../tabs/CompanyPeopleTab';
import CompanyNotesTab from '../tabs/CompanyNotesTab';

const TABS_BY_TYPE = {
  lead: [
    { id: 'pipeline', label: 'Pipeline' },
    { id: 'personal', label: 'Personal' },
    { id: 'docs',     label: 'Docs' },
    { id: 'work',     label: 'Work' },
  ],
  contact: [
    { id: 'personal', label: 'Personal' },
    { id: 'work',     label: 'Work' },
    { id: 'docs',     label: 'Docs' },
  ],
  client: [
    { id: 'personal', label: 'Personal' },
    { id: 'work',     label: 'Work' },
    { id: 'docs',     label: 'Docs' },
    { id: 'skills',   label: 'Skills' },
  ],
  employee: [
    { id: 'hr',       label: 'HR' },
    { id: 'absence',  label: 'Absence' },
    { id: 'personal', label: 'Personal' },
    { id: 'salary',   label: 'Salary' },
    { id: 'skills',   label: 'Skills' },
    { id: 'docs',     label: 'Docs' },
    { id: 'work',     label: 'Work' },
    { id: 'clockins', label: 'Clock Ins' },
  ],
};

const COMPANY_TABS = [
  { id: 'info',   label: 'Info' },
  { id: 'people', label: 'People' },
  { id: 'notes',  label: 'Notes' },
];

export default function DetailPanelTabs({ entry }) {
  const detailTab    = useContactsStore((s) => s.detailTab);
  const setDetailTab = useContactsStore((s) => s.setDetailTab);

  const isCompany = entry.entityType === 'company' || entry._isCompany;
  const tabs = isCompany ? COMPANY_TABS : (TABS_BY_TYPE[entry.contactType] || TABS_BY_TYPE.employee);

  // Fall back to first tab if stored tab isn't valid for this contact type
  const effectiveTab = tabs.some((t) => t.id === detailTab) ? detailTab : tabs[0].id;

  const tabStyle = (active) => ({
    padding: '8px 14px',
    background: 'none',
    border: 'none',
    borderBottom: `2px solid ${active ? 'var(--mod-people)' : 'transparent'}`,
    color: active ? 'var(--mod-people)' : 'var(--text2)',
    fontWeight: active ? 600 : 400,
    fontSize: 13,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all var(--duration) var(--ease)',
  });

  function renderTab() {
    const id = entry.id;
    if (isCompany) {
      if (effectiveTab === 'info')   return <CompanyInfoTab company={entry._raw || entry} />;
      if (effectiveTab === 'people') return <CompanyPeopleTab companyId={id} />;
      if (effectiveTab === 'notes')  return <CompanyNotesTab companyId={id} />;
    } else {
      if (effectiveTab === 'pipeline') return <LeadTab contactId={id} />;
      if (effectiveTab === 'hr')       return <HRTab contactId={id} />;
      if (effectiveTab === 'absence')  return <AbsenceTab contactId={id} />;
      if (effectiveTab === 'personal') return <PersonalTab contactId={id} />;
      if (effectiveTab === 'salary')   return <SalaryTab contactId={id} />;
      if (effectiveTab === 'skills')   return <SkillsTab />;
      if (effectiveTab === 'docs')     return <DocsTab contactId={id} />;
      if (effectiveTab === 'work')     return <WorkTab contactId={id} />;
      if (effectiveTab === 'clockins') return <ClockInsTab contactId={id} />;
    }
    return null;
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        borderBottom: '1px solid var(--border)',
        padding: '0 20px',
        scrollbarWidth: 'none',
      }}>
        {tabs.map((t) => (
          <button key={t.id} style={tabStyle(effectiveTab === t.id)} onClick={() => setDetailTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="detail-panel__body">
        {renderTab()}
      </div>
    </div>
  );
}
