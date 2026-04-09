import { useState, useMemo } from 'react';
import { Plus, Landmark, X, Pencil, ChevronDown, Info } from 'lucide-react';
import { useMoneyStore, formatCurrency } from '../../store/money-store';
import { useAuthStore } from '../../store/auth-store';
import { CURRENCIES, BANKS } from '@data/config/money-categories';

function AccountPanel({ account, onClose }) {
  const addAccount = useMoneyStore((s) => s.addAccount);
  const updateAccount = useMoneyStore((s) => s.updateAccount);
  const isEdit = !!account;
  const [bankName, setBankName] = useState(account?.bankName || '');
  const [currency, setCurrency] = useState(account?.currency || 'CAD');
  const [accountNumber, setAccountNumber] = useState(account?.accountNumber || '');
  const [iban, setIban] = useState(account?.iban || '');
  const [swift, setSwift] = useState(account?.swift || '');
  const [currentBalance, setCurrentBalance] = useState(account?.currentBalance || '');
  const [availableBalance, setAvailableBalance] = useState(account?.availableBalance || '');
  const [reservedBalance, setReservedBalance] = useState(account?.reservedBalance || '');
  const [dateOpened, setDateOpened] = useState(account?.dateOpened || '');
  const [isPayroll, setIsPayroll] = useState(account?.isPayroll || false);

  const handleSave = () => {
    if (!bankName) return;
    const data = { bankName, currency, accountNumber, iban, swift, currentBalance, availableBalance, reservedBalance, dateOpened, isPayroll };
    if (isEdit) updateAccount(account.id, data);
    else addAccount(data);
    onClose();
  };

  return (
    <div className="money-slidein-overlay" onClick={onClose}>
      <div className="money-slidein" onClick={(e) => e.stopPropagation()}>
        <div className="money-slidein-header">
          <div>
            <h3>Add Bank Account</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text2)', margin: 0 }}>Add or link a bank account to better manage finances.</p>
          </div>
          <button className="money-slidein-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="money-slidein-body">
          <div className="money-field-row">
            <div className="money-field" style={{ flex: 1 }}>
              <label>Bank</label>
              <select value={bankName} onChange={(e) => setBankName(e.target.value)}>
                <option value="">Select bank...</option>
                {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="money-field" style={{ width: 120 }}>
              <label>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.id}</option>)}
              </select>
            </div>
          </div>
          <div className="money-field">
            <label>Account number</label>
            <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account number" />
          </div>
          <div className="money-field-divider">additional info...</div>
          <div className="money-field"><label>IBAN</label><input value={iban} onChange={(e) => setIban(e.target.value)} placeholder="IBAN" /></div>
          <div className="money-field"><label>Swift</label><input value={swift} onChange={(e) => setSwift(e.target.value)} placeholder="Swift" /></div>
          <div className="money-field"><label>Current Balance</label><input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} placeholder="0" /></div>
          <div className="money-field"><label>Available Balance</label><input type="number" value={availableBalance} onChange={(e) => setAvailableBalance(e.target.value)} placeholder="0" /></div>
          <div className="money-field"><label>Reserved Balance</label><input type="number" value={reservedBalance} onChange={(e) => setReservedBalance(e.target.value)} placeholder="0" /></div>
          <div className="money-field"><label>Date opened</label><input type="date" value={dateOpened} onChange={(e) => setDateOpened(e.target.value)} /></div>
          <label className="money-checkbox">
            <input type="checkbox" checked={isPayroll} onChange={(e) => setIsPayroll(e.target.checked)} />
            Is Payroll account
          </label>
        </div>
        <div className="money-slidein-footer">
          <button className="btn btn-primary" onClick={handleSave} disabled={!bankName} style={{ background: 'var(--mod-money)', width: '100%' }}>
            {isEdit ? 'Save' : 'Add new account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AccountsTab() {
  const accounts = useMoneyStore((s) => s.accounts);
  const updateAccount = useMoneyStore((s) => s.updateAccount);
  const user = useAuthStore((s) => s.user);
  const [statusFilter, setStatusFilter] = useState('active');
  const [showPanel, setShowPanel] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return accounts;
    return accounts.filter((a) => a.status === statusFilter);
  }, [accounts, statusFilter]);

  const totalBalance = useMemo(() =>
    accounts.filter((a) => a.status === 'active').reduce((s, a) => s + (Number(a.currentBalance) || 0), 0),
  [accounts]);

  const mainCurrency = accounts.length > 0 ? accounts[0].currency : 'CAD';

  return (
    <div>
      <div className="money-filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>Status:</span>
          <div className="money-toggle-group">
            {['all', 'active', 'archived'].map((s) => (
              <button key={s} className={`money-toggle-btn ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditAccount(null); setShowPanel(true); }} style={{ background: 'var(--mod-money)' }}>
          <Plus size={14} /> Add Account
        </button>
      </div>

      <div className="accounts-summary">
        <strong>{user?.name || 'User'}</strong>, your accounts currently hold <strong>{formatCurrency(totalBalance, mainCurrency)}</strong>. Spend wisely.
      </div>

      <div className="accounts-layout">
        <div className="accounts-list">
          {filtered.length === 0 ? (
            <div className="money-empty-state"><p>No accounts found.</p></div>
          ) : (
            filtered.map((acct) => (
              <div key={acct.id} className="account-row">
                <div className="account-row-main" onClick={() => setExpandedId(expandedId === acct.id ? null : acct.id)}>
                  <div className="account-info">
                    <div className="account-icon"><Landmark size={20} /></div>
                    <div>
                      <div className="account-name">{acct.bankName}</div>
                      <div className="account-number">Acc. #{acct.accountNumber ? '*'.repeat(Math.max(0, acct.accountNumber.length - 4)) + acct.accountNumber.slice(-4) : '****'}</div>
                    </div>
                    <span className="account-currency-badge">{acct.currency}</span>
                  </div>
                  <div className="account-balance-area">
                    <span className="account-balance">{formatCurrency(acct.currentBalance, acct.currency)}</span>
                    {acct.isPayroll && (
                      <span className="account-payroll-badge" title="This account is designated as the payroll account used for salary disbursements">
                        <Info size={12} /> Payroll
                      </span>
                    )}
                    <button className="row-action-btn" onClick={(e) => { e.stopPropagation(); setEditAccount(acct); setShowPanel(true); }} title="Edit">
                      <Pencil size={14} />
                    </button>
                    <ChevronDown size={16} className={`account-chevron ${expandedId === acct.id ? 'expanded' : ''}`} />
                  </div>
                </div>
                {expandedId === acct.id && (
                  <div className="account-expanded">
                    <div className="account-detail-grid">
                      {acct.iban && <div><span>IBAN:</span> {acct.iban}</div>}
                      {acct.swift && <div><span>Swift:</span> {acct.swift}</div>}
                      <div><span>Available:</span> {formatCurrency(acct.availableBalance, acct.currency)}</div>
                      <div><span>Reserved:</span> {formatCurrency(acct.reservedBalance, acct.currency)}</div>
                      {acct.dateOpened && <div><span>Opened:</span> {new Date(acct.dateOpened).toLocaleDateString()}</div>}
                    </div>
                    <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
                      <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }}
                        onClick={() => updateAccount(acct.id, { status: acct.status === 'active' ? 'archived' : 'active' })}>
                        {acct.status === 'active' ? 'Archive' : 'Activate'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <aside className="accounts-sidebar">
          <div className="accounts-chart-card">
            <div className="accounts-chart-header">
              <span>Balance over period</span>
              <div className="money-currency-select">
                <span>Currency</span>
                <span className="money-currency-badge">{mainCurrency}</span>
              </div>
            </div>
            <div className="accounts-chart-placeholder">
              <div className="mini-chart-line" />
            </div>
          </div>
          <div className="accounts-chart-card">
            <h4>Distribution across Accounts in {mainCurrency}</h4>
            <div className="accounts-chart-placeholder">
              {filtered.map((acct) => {
                const pct = totalBalance ? Math.max(2, Math.round((Math.abs(acct.currentBalance) / Math.abs(totalBalance)) * 100)) : 0;
                return (
                  <div key={acct.id} className="dist-bar-row">
                    <span className="dist-bar-label">{acct.bankName}</span>
                    <div className="dist-bar-track">
                      <div className="dist-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="dist-bar-value">{formatCurrency(acct.currentBalance, acct.currency)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {showPanel && <AccountPanel account={editAccount} onClose={() => { setShowPanel(false); setEditAccount(null); }} />}
    </div>
  );
}
