import { PiggyBank } from 'lucide-react';

export default function BudgetTab() {
  return (
    <div className="money-empty">
      <PiggyBank size={40} className="money-empty-icon" />
      <h4>Budgets</h4>
      <p>Budget management — coming in the next release.</p>
    </div>
  );
}
