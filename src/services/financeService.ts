import { AccountEntry } from '../types';

const STORAGE_KEY = 'nm_finance_entries';

export const financeService = {
  getEntries: (): AccountEntry[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      { id: '1', type: 'income', category: 'Fees', amount: 25000, date: '2026-02-20', description: 'Monthly Fees Collection' },
      { id: '2', type: 'expense', category: 'Salary', amount: 15000, date: '2026-02-19', description: 'Teacher Salary - Feb' },
    ];
  },

  addEntry: (entry: Omit<AccountEntry, 'id' | 'date'>): AccountEntry => {
    const entries = financeService.getEntries();
    const newEntry: AccountEntry = {
      ...entry,
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0]
    };
    entries.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event('storage'));
    return newEntry;
  },

  getTotalIncome: (): number => {
    return financeService.getEntries()
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);
  },

  getTotalExpense: (): number => {
    return financeService.getEntries()
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
  }
};
