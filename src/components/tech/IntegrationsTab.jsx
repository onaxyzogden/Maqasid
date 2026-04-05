import { MessageSquare, DollarSign, Settings } from 'lucide-react';
import { useTechStore } from '../../store/tech-store';

const ICONS = {
  slack: MessageSquare,
  xero: DollarSign,
  default: Settings,
};

export default function IntegrationsTab() {
  const integrations = useTechStore((s) => s.integrations);
  const toggleIntegration = useTechStore((s) => s.toggleIntegration);

  return (
    <div>
      <div className="tech-integrations-header">
        <h3>Integrations</h3>
        <p>Manage your connected apps and integrations. Click an integration to configure it.</p>
      </div>

      <div className="tech-integrations-grid">
        {integrations.map((intg) => {
          const Icon = ICONS[intg.icon] || ICONS.default;
          return (
            <div key={intg.id} className="tech-integration-card">
              <div className="tech-integration-card-top">
                <div className="tech-integration-icon"><Icon size={20} /></div>
                <div className="tech-integration-info">
                  <div className="tech-integration-name">{intg.name}</div>
                  <div className="tech-integration-desc">{intg.description}</div>
                </div>
              </div>
              <div className="tech-integration-footer">
                <span className="tech-integration-category">{intg.category}</span>
                <button className="tech-configure-btn" onClick={() => toggleIntegration(intg.id)}>
                  {intg.status === 'connected' ? 'Disconnect' : 'Configure'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
