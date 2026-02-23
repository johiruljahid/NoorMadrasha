import React, { useState, useEffect } from 'react';
import { 
  PieChart, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../lib/utils';

export default function AccountsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [type, setType] = useState<'income' | 'expense'>('income');

  useEffect(() => {
    setEntries([
      { id: '1', type: 'income', category: 'Monthly Fee', amount: 45000, date: '2026-02-22', description: 'Collection from Class 8 & 9' },
      { id: '2', type: 'expense', category: 'Electricity Bill', amount: 5200, date: '2026-02-21', description: 'January Bill' },
      { id: '3', type: 'income', category: 'Admission Fee', amount: 15000, date: '2026-02-20', description: 'New Admissions' },
      { id: '4', type: 'expense', category: 'Maintenance', amount: 2500, date: '2026-02-19', description: 'Fan Repairing' },
    ]);
  }, []);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Transaction recorded successfully!');
    setIsModalOpen(false);
  };

  const totalIncome = entries.filter(e => e.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalExpense = entries.filter(e => e.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-islamic text-slate-900 mb-1">Accounts Section</h1>
          <p className="text-slate-500">Track all income and expenses of the Madrasha.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setType('income'); setIsModalOpen(true); }} className="btn-secondary">
            <Plus size={20} /> Add Income
          </button>
          <button onClick={() => { setType('expense'); setIsModalOpen(true); }} className="btn-primary bg-rose-600 hover:bg-rose-700 shadow-rose-200">
            <Plus size={20} /> Add Expense
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-8 bg-emerald-50 border-emerald-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              <TrendingUp size={24} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-white px-2 py-1 rounded-full border border-emerald-100">This Month</span>
          </div>
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">Total Income</p>
          <p className="text-3xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="card p-8 bg-rose-50 border-rose-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              <TrendingDown size={24} />
            </div>
            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest bg-white px-2 py-1 rounded-full border border-rose-100">This Month</span>
          </div>
          <p className="text-xs font-bold text-rose-800 uppercase tracking-widest mb-1">Total Expense</p>
          <p className="text-3xl font-bold text-rose-600">{formatCurrency(totalExpense)}</p>
        </div>
        <div className="card p-8 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white shadow-lg backdrop-blur-md">
                <PieChart size={24} />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-white/10 px-2 py-1 rounded-full border border-white/10">Current Balance</span>
            </div>
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">Net Balance</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(balance)}</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-xl font-bold text-slate-900">Transaction History</h3>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Select Date Range" className="input-field pl-12 py-2 text-sm" />
            </div>
            <button className="p-2 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 transition-all">
              <Download size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Description</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {entries.map((entry) => (
                <tr key={entry.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 text-sm text-slate-500">{entry.date}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${entry.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {entry.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      </div>
                      <span className="font-bold text-slate-900">{entry.category}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500">{entry.description}</td>
                  <td className={`px-8 py-5 text-right font-bold ${entry.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {entry.type === 'income' ? '+' : '-'}{formatCurrency(entry.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className={`p-6 border-b border-slate-100 flex items-center justify-between text-white ${type === 'income' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                <h2 className="text-xl font-islamic font-bold">Add {type === 'income' ? 'Income' : 'Expense'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddEntry} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Category</label>
                    <select className="input-field">
                      {type === 'income' ? (
                        <>
                          <option>Monthly Fee</option>
                          <option>Admission Fee</option>
                          <option>Donation</option>
                          <option>Other</option>
                        </>
                      ) : (
                        <>
                          <option>Electricity Bill</option>
                          <option>Maintenance</option>
                          <option>Teacher Salary</option>
                          <option>Stationery</option>
                          <option>Other</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Amount (BDT)</label>
                    <input type="number" required className="input-field" placeholder="0.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Date</label>
                  <input type="date" required className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Description</label>
                  <textarea rows={3} className="input-field resize-none" placeholder="Enter transaction details..." />
                </div>

                <div className="pt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex-grow py-4 rounded-xl text-white font-bold shadow-lg transition-all active:scale-95 ${type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'}`}
                  >
                    <Save size={20} className="inline mr-2" /> Record Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
