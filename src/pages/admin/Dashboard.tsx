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
    { title: 'Total Students', value: '524', icon: Users, color: 'bg-blue-500', trend: '+12%', isUp: true },
    { title: 'Total Teachers', value: '42', icon: GraduationCap, color: 'bg-purple-500', trend: '+2', isUp: true },
    { title: 'Today Attendance', value: '94%', icon: UserCheck, color: 'bg-emerald-500', trend: '-2%', isUp: false },
    { title: 'Monthly Income', value: formatCurrency(125000), icon: Wallet, color: 'bg-amber-500', trend: '+15%', isUp: true },
  ];

  const recentTransactions = [
    { id: '1', type: 'income', category: 'Monthly Fee', amount: 2500, date: '2026-02-22', student: 'Abdullah Al Mamun' },
    { id: '2', type: 'expense', category: 'Electricity Bill', amount: 4500, date: '2026-02-21', student: '-' },
    { id: '3', type: 'income', category: 'Admission Fee', amount: 5000, date: '2026-02-21', student: 'Omar Faruk' },
    { id: '4', type: 'expense', category: 'Teacher Salary', amount: 15000, date: '2026-02-20', student: '-' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-islamic text-slate-900 mb-1">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary py-2 px-4 text-sm">
            <Plus size={18} /> Add Student
          </button>
          <button className="btn-primary py-2 px-4 text-sm">
            <Calendar size={18} /> Attendance
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 flex items-center gap-6"
          >
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financial Summary */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Recent Transactions</h3>
              <button className="text-primary font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Student/Entity</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentTransactions.map((t) => (
                    <tr key={t.id} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {t.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          </div>
                          <span className="font-bold text-slate-900">{t.category}</span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-500 text-sm">{t.student}</td>
                      <td className="py-4 text-slate-500 text-sm">{t.date}</td>
                      <td className={`py-4 text-right font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-8 bg-primary text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/10 transition-all text-center">
                    <Users size={24} className="mx-auto mb-2 text-accent" />
                    <span className="text-xs font-bold uppercase">Add Student</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/10 transition-all text-center">
                    <FileSpreadsheet size={24} className="mx-auto mb-2 text-accent" />
                    <span className="text-xs font-bold uppercase">Enter Marks</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/10 transition-all text-center">
                    <Wallet size={24} className="mx-auto mb-2 text-accent" />
                    <span className="text-xs font-bold uppercase">Collect Fee</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/10 transition-all text-center">
                    <Bell size={24} className="mx-auto mb-2 text-accent" />
                    <span className="text-xs font-bold uppercase">Post Notice</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Attendance Overview</h3>
              <div className="space-y-6">
                {[
                  { class: 'Class 10', present: 48, total: 50 },
                  { class: 'Class 9', present: 42, total: 45 },
                  { class: 'Class 8', present: 38, total: 40 },
                ].map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-slate-700">{c.class}</span>
                      <span className="text-slate-500">{c.present}/{c.total} Present</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${(c.present / c.total) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="card p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Bell size={20} className="text-primary" /> Recent Notices
            </h3>
            <div className="space-y-6">
              {[
                { title: 'Admission Open 2026', date: '20 Feb', category: 'Admission' },
                { title: 'Ramadan Timing Update', date: '18 Feb', category: 'Notice' },
                { title: 'Staff Meeting Tomorrow', date: '17 Feb', category: 'Admin' },
              ].map((n, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <span className="text-[10px] font-bold uppercase">{n.date.split(' ')[1]}</span>
                    <span className="text-lg font-bold">{n.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{n.category}</span>
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{n.title}</h4>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary w-full mt-8 py-3 text-sm">Post New Notice</button>
          </div>

          <div className="card p-8 bg-accent/10 border-accent/20">
            <h3 className="text-lg font-bold text-primary mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Database</span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div> Connected
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Storage</span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div> Active
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Last Backup</span>
                <span className="text-slate-900 font-bold">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
