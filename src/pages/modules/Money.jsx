import { useState } from 'react';
import { LayoutDashboard, Receipt, TrendingUp, FileText, Landmark, Store, Package, PiggyBank } from 'lucide-react';
import MoneyDashboard from '@components/money/MoneyDashboard';
import ExpenseList from '@components/money/ExpenseList';
import IncomeTab from '@components/money/IncomeTab';
import ProposalTab from '@components/money/ProposalTab';
import AccountsTab from '@components/money/AccountsTab';
import VendorsTab from '@components/money/VendorsTab';
import AssetsTab from '@components/money/AssetsTab';
import BudgetTab from '@components/money/BudgetTab';
import PillarHeader from '@components/shared/PillarHeader';
import '@components/money/MoneyDashboard.css';
import './Money.css';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'income', label: 'Income', icon: TrendingUp },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'proposal', label: 'Proposal', icon: FileText },
  { id: 'accounts', label: 'Accounts', icon: Landmark },
  { id: 'vendors', label: 'Vendors', icon: Store },
  { id: 'assets', label: 'Assets', icon: Package },
  { id: 'budgets', label: 'Budgets', icon: PiggyBank },
];

export default function Money({ embedded = false }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="money">
      {!embedded && <PillarHeader moduleId="money" />}

      <div className="money-tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`money-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="money-content">
        {activeTab === 'dashboard' && <MoneyDashboard onNavigate={setActiveTab} />}
        {activeTab === 'expenses' && <ExpenseList />}
        {activeTab === 'income' && <IncomeTab />}
        {activeTab === 'proposal' && <ProposalTab />}
        {activeTab === 'accounts' && <AccountsTab />}
        {activeTab === 'vendors' && <VendorsTab />}
        {activeTab === 'assets' && <AssetsTab />}
        {activeTab === 'budgets' && <BudgetTab />}
      </div>
    </div>
  );
}
