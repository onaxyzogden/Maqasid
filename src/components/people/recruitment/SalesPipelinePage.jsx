import { useState, useMemo } from 'react';
import { UserPlus, MoreHorizontal, ArrowDown } from 'lucide-react';
import { useContactsStore } from '@store/contacts-store';
import { LEAD_STAGES, getDisplayName, getAvatarColor } from '@data/config/contact-config';
import AvatarInitials from '../shared/AvatarInitials';
import AddContactModal from '../contacts/AddContactModal';
import './SalesPipelinePage.css';

const PIPELINE_COLUMNS = LEAD_STAGES.filter((s) => s.id !== 'unassigned');

export default function SalesPipelinePage() {
  const contacts  = useContactsStore((s) => s.contacts);
  const companies = useContactsStore((s) => s.companies);
  const updateContact = useContactsStore((s) => s.updateContact);
  const selectContact = useContactsStore((s) => s.selectContact);

  const [stageFilter, setStageFilter] = useState('all');
  const [showAdd, setShowAdd]         = useState(false);

  // All leads (person contacts with contactType === 'lead')
  const leads = useMemo(() =>
    contacts.filter((c) => c.contactType === 'lead' && c.status !== 'archived'),
    [contacts]
  );

  // Group leads by stage
  const leadsByStage = useMemo(() => {
    const m = {};
    LEAD_STAGES.forEach((s) => { m[s.id] = []; });
    leads.forEach((lead) => {
      const stage = lead.leadStatus || 'unassigned';
      if (m[stage]) m[stage].push(lead);
      else m['unassigned'].push(lead);
    });
    return m;
  }, [leads]);

  // Company lookup
  const companyMap = useMemo(() => {
    const m = {};
    companies.forEach((c) => { m[c.id] = c; });
    return m;
  }, [companies]);

  const moveToStage = (contactId, newStage) => {
    updateContact(contactId, { leadStatus: newStage });
  };

  // Filter columns if stage filter is active
  const visibleColumns = stageFilter === 'all'
    ? PIPELINE_COLUMNS
    : PIPELINE_COLUMNS.filter((s) => s.id === stageFilter);

  return (
    <div className="sp-page">
      {/* Stage filter tabs */}
      <div className="sp-filter-tabs">
        <button
          className={`sp-filter-tab ${stageFilter === 'all' ? 'active' : ''}`}
          onClick={() => setStageFilter('all')}
        >
          All
        </button>
        {LEAD_STAGES.map((s) => (
          <button
            key={s.id}
            className={`sp-filter-tab ${stageFilter === s.id ? 'active' : ''}`}
            onClick={() => setStageFilter(s.id)}
          >
            {s.label}
          </button>
        ))}

        <div className="sp-filter-tabs__actions">
          <button className="sp-add-btn" onClick={() => setShowAdd(true)}>
            <UserPlus size={14} /> + Lead
          </button>
        </div>
      </div>

      {/* Kanban board */}
      <div className="sp-board">
        {visibleColumns.map((stage) => {
          const stageLeads = leadsByStage[stage.id] || [];
          return (
            <div key={stage.id} className="sp-column">
              <div className="sp-column__header">
                <div className="sp-column__title">
                  <div className="sp-column__dot" style={{ background: stage.color }} />
                  {stage.label.toUpperCase()}
                  <span className="sp-column__count">{stageLeads.length}</span>
                </div>
              </div>
              <div className="sp-column__body">
                {stageLeads.map((lead) => {
                  const name = getDisplayName(lead);
                  const company = lead.companyId ? companyMap[lead.companyId] : null;
                  return (
                    <div
                      key={lead.id}
                      className="sp-card"
                      onClick={() => selectContact(lead.id)}
                    >
                      <div className="sp-card__top">
                        <AvatarInitials
                          firstName={lead.firstName || ''}
                          lastName={lead.lastName || ''}
                          color={lead.avatarColor || getAvatarColor(lead.id)}
                          size={32}
                        />
                        <div className="sp-card__info">
                          <div className="sp-card__name">{name}</div>
                          {company && <div className="sp-card__company">{company.name}</div>}
                          {lead.email && <div className="sp-card__email">{lead.email}</div>}
                        </div>
                        <button className="sp-card__menu" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                      {/* Quick-move buttons — show adjacent stages in pipeline order */}
                      <div className="sp-card__moves">
                        {(() => {
                          const idx = PIPELINE_COLUMNS.findIndex((s) => s.id === stage.id);
                          const forward = PIPELINE_COLUMNS.slice(idx + 1, idx + 3);
                          const back    = idx > 0 ? [PIPELINE_COLUMNS[idx - 1]] : [];
                          return [...forward, ...back].slice(0, 3);
                        })().map((s) => (
                            <button
                              key={s.id}
                              className="sp-move-btn"
                              style={{ borderColor: s.color + '40', color: s.color }}
                              onClick={(e) => { e.stopPropagation(); moveToStage(lead.id, s.id); }}
                              title={`Move to ${s.label}`}
                            >
                              {s.label.length > 10 ? s.label.slice(0, 8) + '...' : s.label}
                            </button>
                          ))}
                      </div>
                    </div>
                  );
                })}
                {stageLeads.length === 0 && (
                  <div className="sp-empty">
                    <ArrowDown size={16} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <AddContactModal
          onClose={() => setShowAdd(false)}
          initialContactType="lead"
          initialLeadStatus="pending_contact"
        />
      )}
    </div>
  );
}
