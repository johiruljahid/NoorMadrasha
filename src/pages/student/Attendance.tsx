import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

export default function StudentAttendance() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const stats = {
    present: 22,
    absent: 2,
    late: 1,
    percentage: 92
  };

  // Mock attendance data for the month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const attendanceData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isWeekend = date.getDay() === 5 || date.getDay() === 6; // Fri, Sat as weekend
    
    let status: 'present' | 'absent' | 'late' | 'weekend' | 'none' = 'none';
    if (isWeekend) status = 'weekend';
    else if (day < 24) {
      if (day === 5 || day === 15) status = 'absent';
      else if (day === 10) status = 'late';
      else status = 'present';
    }

    return { day, status };
  });

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });

  return (
    <div className="space-y-10 pb-20">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'উপস্থিত', value: stats.present, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'অনুপস্থিত', value: stats.absent, icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
          { label: 'বিলম্ব', value: stats.late, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'শতকরা হার', value: `${stats.percentage}%`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/5' },
        ].map((stat, i) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={i} 
            className={`card-3d p-6 ${stat.bg} border-none flex items-center gap-5`}
          >
            <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center ${stat.color} shadow-sm`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2 card-3d p-8">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Calendar className="text-primary" /> উপস্থিতি ক্যালেন্ডার
            </h3>
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <button className="p-2 hover:bg-white rounded-lg transition-all"><ChevronLeft size={20} /></button>
              <span className="font-bold text-slate-700 min-w-[120px] text-center">{monthName} {currentMonth.getFullYear()}</span>
              <button className="p-2 hover:bg-white rounded-lg transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 mb-4">
            {['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'].map(day => (
              <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            {attendanceData.map((item, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative group transition-all border-2 ${
                  item.status === 'present' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                  item.status === 'absent' ? 'bg-rose-50 border-rose-100 text-rose-600' :
                  item.status === 'late' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                  item.status === 'weekend' ? 'bg-slate-100 border-slate-200 text-slate-400' :
                  'bg-white border-slate-50 text-slate-300'
                }`}
              >
                <span className="text-sm font-bold">{item.day}</span>
                {item.status !== 'none' && item.status !== 'weekend' && (
                  <div className="absolute bottom-2 w-1 h-1 rounded-full bg-current"></div>
                )}
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {item.status === 'present' ? 'উপস্থিত' : item.status === 'absent' ? 'অনুপস্থিত' : item.status === 'late' ? 'বিলম্ব' : item.status === 'weekend' ? 'ছুটি' : ''}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap gap-6">
            {[
              { label: 'উপস্থিত', color: 'bg-emerald-500' },
              { label: 'অনুপস্থিত', color: 'bg-rose-500' },
              { label: 'বিলম্ব', color: 'bg-amber-500' },
              { label: 'ছুটি', color: 'bg-slate-300' },
            ].map((legend, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${legend.color}`}></div>
                <span className="text-xs font-bold text-slate-500">{legend.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary & Insights */}
        <div className="space-y-8">
          <div className="card-3d p-8 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Info size={20} className="text-accent" /> উপস্থিতির তথ্য
              </h3>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                <p className="text-sm text-slate-400 leading-relaxed">
                  এই মাসে আপনার উপস্থিতি <span className="text-emerald-400 font-bold">চমৎকার</span>। আপনি নিয়মিত ক্লাসে উপস্থিত ছিলেন।
                </p>
                <div className="flex items-center gap-3 text-xs font-bold text-accent">
                  <TrendingUp size={16} /> গত মাসের তুলনায় ৫% বৃদ্ধি
                </div>
              </div>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/10">
                বিস্তারিত রিপোর্ট দেখুন
              </button>
            </div>
          </div>

          <div className="card-3d p-8">
            <h4 className="font-bold text-slate-900 mb-6">মাসিক বিবরণ</h4>
            <div className="space-y-6">
              {[
                { month: 'জানুয়ারি', perc: 95 },
                { month: 'ডিসেম্বর', perc: 88 },
                { month: 'নভেম্বর', perc: 92 },
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">{m.month}</span>
                    <span className="text-slate-900">{m.perc}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-primary" style={{ width: `${m.perc}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
