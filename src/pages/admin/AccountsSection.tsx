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
  Save,
  Search,
  Trash2,
  Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../lib/utils';
import { financeService } from '../../services/financeService';
import { AccountEntry } from '../../types';

export default function AccountsSection() {
  const [entries, setEntries] = useState<AccountEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    setEntries(financeService.getEntries());
  }, []);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    financeService.addEntry({
      type,
      category: formData.category,
      amount: Number(formData.amount),
      description: formData.description
    });
    setEntries(financeService.getEntries());
    setIsModalOpen(false);
    setFormData({
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    toast.success('লেনদেন সফলভাবে যোগ করা হয়েছে!');
  };

  const totalIncome = financeService.getTotalIncome();
  const totalExpense = financeService.getTotalExpense();
  const balance = totalIncome - totalExpense;

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || entry.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <img 
          src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=2000" 
          alt="Islamic Madrasa" 
          className="w-full h-full object-cover opacity-[0.03]"
          referrerPolicy="no-referrer"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -120, 0], x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-20 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl"
        />
        {/* Additional 3D Decorative Shapes */}
        <motion.div 
          animate={{ 
            z: [0, 50, 0],
            rotateX: [0, 45, 0],
            rotateY: [0, 45, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl blur-xl"
        />
        <motion.div 
          animate={{ 
            z: [0, -50, 0],
            rotateX: [0, -45, 0],
            rotateY: [0, -45, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-rose-400/20 to-pink-500/20 rounded-full blur-xl"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">হিসাব রক্ষণ</h1>
          <p className="text-slate-500 font-medium">প্রতিষ্ঠানের আয় ও ব্যয়ের হিসাব পরিচালনা করুন।</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={(e) => { 
              setClickPos({ x: e.clientX, y: e.clientY });
              setType('income'); 
              setIsModalOpen(true); 
            }} 
            className="btn-3d bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-700 py-4 px-8 flex items-center gap-3 font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-200"
          >
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Plus size={18} />
            </div>
            আয় যোগ করুন
          </button>
          <button 
            onClick={(e) => { 
              setClickPos({ x: e.clientX, y: e.clientY });
              setType('expense'); 
              setIsModalOpen(true); 
            }} 
            className="btn-3d bg-gradient-to-br from-rose-500 to-pink-600 text-white border-rose-700 py-4 px-8 flex items-center gap-3 font-black uppercase tracking-widest text-xs shadow-xl shadow-rose-200"
          >
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Plus size={18} />
            </div>
            ব্যয় যোগ করুন
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div whileHover={{ y: -5 }} className="card-3d p-10 bg-emerald-50 border-emerald-100">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <TrendingUp size={32} />
            </div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] bg-white px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm">এই মাস</span>
          </div>
          <p className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-2 opacity-70">মোট আয়</p>
          <p className="text-4xl font-black text-emerald-600 tracking-tight">{formatCurrency(totalIncome)}</p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card-3d p-10 bg-rose-50 border-rose-100">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <TrendingDown size={32} />
            </div>
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] bg-white px-4 py-1.5 rounded-full border border-rose-100 shadow-sm">এই মাস</span>
          </div>
          <p className="text-[10px] font-black text-rose-800 uppercase tracking-[0.2em] mb-2 opacity-70">মোট ব্যয়</p>
          <p className="text-4xl font-black text-rose-600 tracking-tight">{formatCurrency(totalExpense)}</p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card-3d p-10 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white shadow-xl backdrop-blur-md border border-white/20">
                <PieChart size={32} />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">বর্তমান ব্যালেন্স</span>
            </div>
            <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mb-2">নিট ব্যালেন্স</p>
            <p className="text-4xl font-black text-white tracking-tight">{formatCurrency(balance)}</p>
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="card-3d p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input
              type="text"
              placeholder="বিভাগ বা বিবরণ দিয়ে সার্চ করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-medium text-lg shadow-inner"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner">
              {[
                { id: 'all', label: 'সব' },
                { id: 'income', label: 'আয়' },
                { id: 'expense', label: 'ব্যয়' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFilterType(t.id as any)}
                  className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    filterType === t.id 
                      ? 'bg-white text-primary shadow-md' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button className="btn-smart-white flex items-center gap-2">
              <Download size={20} /> রিপোর্ট
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card-3d p-0 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <h3 className="text-2xl font-black text-slate-900">লেনদেনের ইতিহাস</h3>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-80">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder="তারিখের সীমা নির্বাচন করুন" 
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-primary/20 outline-none font-medium shadow-inner" 
              />
            </div>
            <button className="p-4 bg-white rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm border border-slate-100">
              <Download size={24} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">তারিখ</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">বিভাগ</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">বিবরণ</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">পরিমাণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6 text-sm font-bold text-slate-400">{entry.date}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${entry.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {entry.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                      </div>
                      <span className="text-lg font-black text-slate-900">{entry.category}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-sm font-medium text-slate-500">{entry.description}</td>
                  <td className={`px-10 py-6 text-right text-xl font-black ${entry.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
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
              initial={{ 
                opacity: 0, 
                scale: 0, 
                x: clickPos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), 
                y: clickPos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) 
              }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0,
                x: clickPos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), 
                y: clickPos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) 
              }}
              transition={{ duration: 0.5, type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className={`p-8 border-b border-slate-100 flex items-center justify-between text-white ${type === 'income' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">নতুন {type === 'income' ? 'আয়' : 'ব্যয়'} যোগ করুন</h2>
                  <p className="text-white/70 text-sm font-bold">একটি নতুন আর্থিক লেনদেন রেকর্ড করুন</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddEntry} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">বিভাগ</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-black text-slate-700 shadow-inner"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {type === 'income' ? (
                        <>
                          <option value="মাসিক ফি">মাসিক ফি</option>
                          <option value="ভর্তি ফি">ভর্তি ফি</option>
                          <option value="অনুদান">অনুদান</option>
                          <option value="অন্যান্য">অন্যান্য</option>
                        </>
                      ) : (
                        <>
                          <option value="বিদ্যুৎ বিল">বিদ্যুৎ বিল</option>
                          <option value="রক্ষণাবেক্ষণ">রক্ষণাবেক্ষণ</option>
                          <option value="শিক্ষকের বেতন">শিক্ষকের বেতন</option>
                          <option value="স্টেশনারি">স্টেশনারি</option>
                          <option value="অন্যান্য">অন্যান্য</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পরিমাণ (টাকা)</label>
                    <input 
                      type="number" 
                      required 
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner" 
                      placeholder="0.00" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">তারিখ</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">বিবরণ</label>
                  <textarea 
                    rows={3} 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner resize-none" 
                    placeholder="লেনদেনের বিস্তারিত লিখুন..." 
                  />
                </div>

                <div className="pt-8 flex gap-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow btn-3d bg-rose-50 text-rose-600 border-rose-100 py-4 font-black uppercase tracking-widest hover:bg-rose-100"
                  >
                    <X size={20} className="inline mr-2" /> বাতিল
                  </button>
                  <button
                    type="submit"
                    className={`flex-grow btn-3d py-4 font-black uppercase tracking-widest text-white ${type === 'income' ? 'bg-emerald-600 border-emerald-700 hover:bg-emerald-700' : 'bg-rose-600 border-rose-700 hover:bg-rose-700'}`}
                  >
                    <Save size={20} className="inline mr-2" /> এন্ট্রি রেকর্ড করুন
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
