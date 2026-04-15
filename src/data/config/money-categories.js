// Preset expense categories and payment methods

export const PRESET_CATEGORIES = [
  { id: 'cat_addcomp', name: 'Additional Compensation', color: '#8b5cf6', isPreset: true, isEssential: false },
  { id: 'cat_food', name: 'Food', color: '#f59e0b', isPreset: true, isEssential: false },
  { id: 'cat_office', name: 'Office Supplies', color: '#6366f1', isPreset: true, isEssential: false },
  { id: 'cat_other', name: 'Other', color: '#6b7280', isPreset: true, isEssential: false },
  { id: 'cat_payroll', name: 'Payroll', color: '#ef4444', isPreset: true, isEssential: true },
  { id: 'cat_rent', name: 'Rent', color: '#3b82f6', isPreset: true, isEssential: true },
  { id: 'cat_repairs', name: 'Repairs', color: '#f97316', isPreset: true, isEssential: false },
  { id: 'cat_tech', name: 'Tech', color: '#06b6d4', isPreset: true, isEssential: false },
  { id: 'cat_transport', name: 'Transport', color: '#14b8a6', isPreset: true, isEssential: true },
  { id: 'cat_travel', name: 'Travel', color: '#ec4899', isPreset: true, isEssential: false },
  { id: 'cat_utility', name: 'Utility', color: '#22c55e', isPreset: true, isEssential: true },
  { id: 'cat_utbills', name: 'Utility Bills', color: '#0ea5e9', isPreset: true, isEssential: true },
];

export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash' },
  { id: 'card', label: 'Card' },
  { id: 'bank', label: 'Bank Transfer' },
  { id: 'other', label: 'Other' },
];

export const CATEGORY_COLORS = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b',
  '#6366f1', '#ec4899', '#14b8a6', '#ef4444',
  '#22c55e', '#f97316', '#6b7280', '#0ea5e9',
];

export const CURRENCIES = [
  { id: 'CAD', label: 'CAD', flag: '\u{1F1E8}\u{1F1E6}' },
  { id: 'USD', label: 'USD', flag: '\u{1F1FA}\u{1F1F8}' },
  { id: 'EUR', label: 'EUR', flag: '\u{1F1EA}\u{1F1FA}' },
  { id: 'GBP', label: 'GBP', flag: '\u{1F1EC}\u{1F1E7}' },
  { id: 'AED', label: 'AED', flag: '\u{1F1E6}\u{1F1EA}' },
  { id: 'SAR', label: 'SAR', flag: '\u{1F1F8}\u{1F1E6}' },
];

export const INVOICE_STATUSES = [
  { id: 'draft', label: 'Draft', color: '#6b7280' },
  { id: 'voided', label: 'Voided', color: '#ef4444' },
  { id: 'issued', label: 'Issued', color: '#3b82f6' },
  { id: 'sent', label: 'Sent', color: '#22c55e' },
  { id: 'part_paid', label: 'Part Paid', color: '#f59e0b' },
  { id: 'paid', label: 'Paid', color: '#22c55e' },
  { id: 'overpaid', label: 'Overpaid', color: '#f59e0b' },
  { id: 'overdue', label: 'Overdue', color: '#ef4444' },
];

export const BANKS = [
  'ATB Financial', 'BMO', 'CIBC', 'Desjardins', 'HSBC Canada',
  'National Bank', 'RBC', 'Scotiabank', 'Simplii', 'Tangerine', 'TD', 'Other',
];
