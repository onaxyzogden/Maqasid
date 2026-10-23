import { describe, it, expect, beforeEach } from 'vitest';

/** A Map-backed localStorage for node. */
function memoryStorage() {
  const m = new Map();
  return {
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    clear: () => m.clear(),
  };
}

globalThis.localStorage = memoryStorage();
const { useMoneyStore, invoiceNumbers } = await import('../money-store');
const { setOwnerSource } = await import('../../services/sync-owner');

beforeEach(() => {
  localStorage.clear();
  useMoneyStore.setState({ invoices: [], invoiceCounter: 0 });
  setOwnerSource(() => null);
});

describe('invoice numbers', () => {
  it('numbers an invoice on this device for a guest, as before', () => {
    const inv = useMoneyStore.getState().addInvoice({ clientName: 'A' });
    expect(inv.number).toBe('INV-001');
    expect(inv.numberPending).toBeUndefined();
  });

  it('leaves a signed-in invoice to be numbered by the account when it is sent', () => {
    setOwnerSource(() => 'user-a');
    const inv = useMoneyStore.getState().addInvoice({ clientName: 'A' });
    expect(inv.number).toBe('');
    expect(inv.numberPending).toBe(true);
    expect(useMoneyStore.getState().invoiceCounter).toBe(0);
  });

  it('tells the sender the highest number on this device and takes the number it was given', () => {
    useMoneyStore.setState({ invoices: [{ id: 'i1', number: 'INV-014' }, { id: 'i2', number: '', numberPending: true }], invoiceCounter: 3 });
    expect(invoiceNumbers.after()).toBe(14);
    invoiceNumbers.numbered('i2', 'INV-015');
    const i2 = useMoneyStore.getState().invoices.find((i) => i.id === 'i2');
    expect(i2.number).toBe('INV-015');
    expect(i2.numberPending).toBeUndefined();
    expect(JSON.parse(localStorage.getItem('bbiz_invoices'))[1].number).toBe('INV-015');
  });
});
