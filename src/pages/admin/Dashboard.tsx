import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  GraduationCap, 
  FileSpreadsheet, 
  Wallet, 
  PieChart, 
  Bell, 
  LogOut,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export default function AdminDashboard() {
  const stats = [
    { title: 'মোট ছাত্র', value: '৫২৪', icon: Users, color: 'bg-blue-500', trend: '+১২%', isUp: true },
    { title: 'মোট শিক্ষক', value: '৪২', icon: GraduationCap, color: 'bg-purple-500', trend: '+২', isUp: true },
    { title: 'আজকের উপস্থিতি', value: '৯৪%', icon: UserCheck, color: 'bg-emerald-500', trend: '-২%', isUp: false },
    { title: 'মাসিক আয়', value: formatCurrency(125000), icon: Wallet, color: 'bg-blue-600', trend: '+১৫%', isUp: true },
    { title: 'মাসিক ব্যয়', value: formatCurrency(45000), icon: TrendingDown, color: 'bg-rose-500', trend: '+৫%', isUp: false },
    { title: 'অনুদান', value: formatCurrency(25000), icon: PieChart, color: 'bg-amber-500', trend: '+২০%', isUp: true },
  ];

  const recentTransactions = [
    { id: '1', type: 'income', category: 'মাসিক ফি', amount: 2500, date: '২০২৬-০২-২২', student: 'আবদুল্লাহ আল মামুন' },
    { id: '2', type: 'expense', category: 'বিদ্যুৎ বিল', amount: 4500, date: '২০২৬-০২-২১', student: '-' },
    { id: '3', type: 'income', category: 'ভর্তি ফি', amount: 5000, date: '২০২৬-০২-২১', student: 'ওমর ফারুক' },
    { id: '4', type: 'expense', category: 'শিক্ষকের বেতন', amount: 15000, date: '২০২৬-০২-২০', student: '-' },
  ];

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -120, 0],
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-20 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">ড্যাশবোর্ড ওভারভিউ</h1>
          <p className="text-slate-500 font-medium">স্বাগতম অ্যাডমিন। আজকের কার্যক্রমের সারসংক্ষেপ এখানে দেখুন।</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-smart-indigo flex items-center gap-2">
            <Plus size={20} /> ছাত্র যোগ করুন
          </button>
          <button className="btn-smart-primary flex items-center gap-2">
            <Calendar size={20} /> উপস্থিতি
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="card-3d p-8 flex items-center gap-6 group cursor-pointer"
          >
            <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                <span className={`text-xs font-bold flex items-center mb-1 ${stat.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Financial Summary */}
        <div className="lg:col-span-2 space-y-10">
          <div className="card-3d p-8">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-900">সাম্প্রতিক লেনদেন</h3>
              <button className="text-primary font-bold text-sm hover:underline">সব দেখুন</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">বিভাগ</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ছাত্র/প্রতিষ্ঠান</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">তারিখ</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">পরিমাণ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentTransactions.map((t) => (
                    <tr key={t.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                          </div>
                          <span className="font-bold text-slate-900">{t.category}</span>
                        </div>
                      </td>
                      <td className="py-5 text-slate-600 font-medium">{t.student}</td>
                      <td className="py-5 text-slate-500 text-sm">{t.date}</td>
                      <td className={`py-5 text-right font-black text-lg ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-3d p-8 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-8">দ্রুত অ্যাকশন</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Users, label: 'ছাত্র যোগ' },
                    { icon: FileSpreadsheet, label: 'মার্কস এন্ট্রি' },
                    { icon: Wallet, label: 'ফি সংগ্রহ' },
                    { icon: Bell, label: 'নোটিশ দিন' },
                  ].map((action, i) => (
                    <button key={i} className="bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 transition-all text-center group">
                      <action.icon size={28} className="mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-3d p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-8">উপস্থিতি ওভারভিউ</h3>
              <div className="space-y-8">
                {[
                  { class: 'নূরানী-১ম', present: 48, total: 50, color: 'bg-emerald-500' },
                  { class: 'নূরানী-২য়', present: 42, total: 45, color: 'bg-primary' },
                  { class: 'নূরানী-৩য়', present: 38, total: 40, color: 'bg-secondary' },
                ].map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="font-bold text-slate-700">{c.class}</span>
                      <span className="text-slate-500 font-bold">{c.present}/{c.total} উপস্থিত</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                      <div className={`${c.color} h-full rounded-full`} style={{ width: `${(c.present / c.total) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-10">
          <div className="card-3d p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Bell size={24} className="text-primary" /> সাম্প্রতিক নোটিশ
            </h3>
            <div className="space-y-8">
              {[
                { title: 'ভর্তি চলছে ২০২৬', date: '২০ ফেব্রু', category: 'ভর্তি' },
                { title: 'রমজানের সময়সূচী', date: '১৮ ফেব্রু', category: 'নোটিশ' },
                { title: 'আগামীকাল স্টাফ মিটিং', date: '১৭ ফেব্রু', category: 'অ্যাডমিন' },
              ].map((n, i) => (
                <div key={i} className="flex gap-5 group cursor-pointer">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{n.date.split(' ')[1]}</span>
                    <span className="text-xl font-black">{n.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{n.category}</span>
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight mt-1">{n.title}</h4>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-3d w-full mt-10 py-4 text-sm uppercase tracking-widest">নতুন নোটিশ দিন</button>
          </div>

          <div className="card-3d p-8 bg-accent/5 border-accent/20">
            <h3 className="text-lg font-bold text-primary mb-6">সিস্টেম স্ট্যাটাস</h3>
            <div className="space-y-5">
              {[
                { label: 'ডেটাবেস', status: 'সংযুক্ত', active: true },
                { label: 'স্টোরেজ', status: 'সক্রিয়', active: true },
                { label: 'শেষ ব্যাকআপ', status: '২ ঘণ্টা আগে', active: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">{s.label}</span>
                  <span className={`flex items-center gap-2 font-bold ${s.active ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {s.active && <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>}
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
