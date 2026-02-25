import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Calendar, 
  Search, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Save,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function AttendanceSystem() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [viewType, setViewType] = useState<'student' | 'teacher'>('student');
  const [data, setData] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent'>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (viewType === 'student') {
      const mockStudents = [
        { id: 'S1001', name: 'আবদুল্লাহ আল মামুন', roll: '১২', type: 'Student' },
        { id: 'S1002', name: 'ওমর ফারুক', roll: '১৫', type: 'Student' },
        { id: 'S1003', name: 'জুবায়ের আহমেদ', roll: '০১', type: 'Student' },
        { id: 'S1004', name: 'হাসান আলী', roll: '০৫', type: 'Student' },
        { id: 'S1005', name: 'মুস্তফা কামাল', roll: '০৮', type: 'Student' },
      ];
      setData(mockStudents);
      const initial: Record<string, 'present' | 'absent'> = {};
      mockStudents.forEach(s => initial[s.id] = 'present');
      setAttendance(initial);
    } else {
      const mockTeachers = [
        { id: 'T101', name: 'মাওলানা আহমেদউল্লাহ', roll: 'অধ্যক্ষ', type: 'Teacher' },
        { id: 'T102', name: 'হাফেজ আবদুর রহিম', roll: 'সিনিয়র শিক্ষক', type: 'Teacher' },
        { id: 'T103', name: 'মুফতি জুনায়েদ', roll: 'সহকারী শিক্ষক', type: 'Teacher' },
      ];
      setData(mockTeachers);
      const initial: Record<string, 'present' | 'absent'> = {};
      mockTeachers.forEach(t => initial[t.id] = 'present');
      setAttendance(initial);
    }
  }, [selectedClass, viewType]);

  const toggleAttendance = (id: string) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === 'present' ? 'absent' : 'present'
    }));
  };

  const handleSave = () => {
    toast.success(`${viewType === 'student' ? selectedClass : 'শিক্ষকদের'} উপস্থিতি ${format(selectedDate, 'dd MMM yyyy')} তারিখের জন্য সংরক্ষিত হয়েছে!`);
  };

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
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
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">উপস্থিতি ব্যবস্থা</h1>
          <p className="text-slate-500 font-medium">{viewType === 'student' ? 'শিক্ষার্থীদের' : 'শিক্ষকদের'} দৈনিক উপস্থিতি চিহ্নিত করুন।</p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-1.5 bg-slate-100 rounded-[2rem] shadow-inner">
            <button 
              onClick={() => setViewType('student')}
              className={`px-8 py-3 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${viewType === 'student' ? 'bg-white text-primary shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              শিক্ষার্থী
            </button>
            <button 
              onClick={() => setViewType('teacher')}
              className={`px-8 py-3 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${viewType === 'teacher' ? 'bg-white text-primary shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              শিক্ষক
            </button>
          </div>
          <button 
            onClick={handleSave} 
            className="btn-smart-emerald flex items-center gap-2"
          >
            <Save size={20} className="inline mr-2" /> উপস্থিতি সংরক্ষণ করুন
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="card-3d p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
            className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all shadow-inner"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-grow md:flex-grow-0 flex items-center gap-4 px-8 py-4 bg-primary/5 rounded-[2rem] border-2 border-primary/10 shadow-inner">
            <Calendar size={24} className="text-primary" />
            <span className="text-xl font-black text-slate-900">{format(selectedDate, 'dd MMMM, yyyy')}</span>
          </div>
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
            className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all shadow-inner"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto">
          {viewType === 'student' && (
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="flex-grow md:flex-grow-0 px-8 py-4 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-black text-slate-700 shadow-inner"
            >
              {['প্রথম শ্রেণী', 'দ্বিতীয় শ্রেণী', 'তৃতীয় শ্রেণী', 'চতুর্থ শ্রেণী', 'পঞ্চম শ্রেণী', 'ষষ্ঠ শ্রেণী', 'সপ্তম শ্রেণী', 'অষ্টম শ্রেণী', 'নবম শ্রেণী', 'দশম শ্রেণী'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
          <div className="px-8 py-4 bg-emerald-50 rounded-[2rem] border-2 border-emerald-100 text-emerald-600 font-black text-lg whitespace-nowrap shadow-sm">
            {presentCount} / {data.length} উপস্থিত
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card-3d p-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input
            type="text"
            placeholder={`${viewType === 'student' ? 'শিক্ষার্থী' : 'শিক্ষক'} নাম, রোল বা আইডি দিয়ে খুঁজুন...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-medium text-lg shadow-inner"
          />
        </div>
      </div>

      {/* Attendance List */}
      <div className="card-3d p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{viewType === 'student' ? 'রোল' : 'পদবী'}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">নাম</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">অবস্থা</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data
                .filter(item => 
                  item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  item.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.id.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-400 text-xs uppercase tracking-widest">
                        {viewType === 'student' ? `#${item.roll}` : item.roll}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest opacity-50">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg shadow-sm">
                        {item.name.charAt(0)}
                      </div>
                      <span className="text-lg font-black text-slate-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-center">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      attendance[item.id] === 'present' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-rose-100 text-rose-600'
                    }`}>
                      {attendance[item.id] === 'present' ? <Check size={14} /> : <X size={14} />}
                      {attendance[item.id] === 'present' ? 'উপস্থিত' : 'অনুপস্থিত'}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button 
                      onClick={() => toggleAttendance(item.id)}
                      className={`btn-3d text-[10px] py-2 px-6 uppercase tracking-widest ${
                        attendance[item.id] === 'present'
                          ? 'bg-rose-50 text-rose-600 border-rose-100'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}
                    >
                      {attendance[item.id] === 'present' ? 'অনুপস্থিত চিহ্নিত করুন' : 'উপস্থিত চিহ্নিত করুন'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: `${viewType === 'student' ? 'শিক্ষার্থী' : 'শিক্ষক'} উপস্থিতি`, value: '৯২.৫%', sub: `এই মাসের গড়`, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
          { title: 'সর্বোচ্চ অনুপস্থিতি', value: '৩ জন', sub: '৫ দিনের বেশি অনুপস্থিত', color: 'bg-rose-50 text-rose-600', border: 'border-rose-100' },
          { title: 'সামগ্রিক পারফরম্যান্স', value: 'চমৎকার', sub: 'ধারাবাহিকতার ভিত্তিতে', color: 'bg-primary/5 text-primary', border: 'border-primary/10' },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`card-3d p-8 ${card.color} ${card.border}`}
          >
            <h4 className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-70">{card.title}</h4>
            <p className="text-4xl font-black mb-2">{card.value}</p>
            <p className="text-xs font-bold opacity-60">{card.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
