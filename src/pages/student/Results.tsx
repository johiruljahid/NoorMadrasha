import React, { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  FileText, 
  Download, 
  ChevronRight, 
  Star,
  Award,
  BookOpen,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function StudentResults() {
  const [activeTerm, setActiveTerm] = useState('Final Exam');

  const examTerms = [
    { id: '1st Term', name: 'First Term Exam', bn: 'প্রথম সাময়িক পরীক্ষা', gpa: 4.75, status: 'completed' },
    { id: '2nd Term', name: 'Second Term Exam', bn: 'দ্বিতীয় সাময়িক পরীক্ষা', gpa: 4.85, status: 'completed' },
    { id: 'Final Exam', name: 'Final Exam 2025', bn: 'বার্ষিক পরীক্ষা ২০২৫', gpa: 4.92, status: 'completed' },
  ];

  const subjectResults: any = {
    '1st Term': [
      { subject: 'কুরআন', marks: 92, grade: 'A+' },
      { subject: 'হাদিস', marks: 85, grade: 'A' },
      { subject: 'আরবি', marks: 88, grade: 'A' },
      { subject: 'গণিত', marks: 75, grade: 'B' },
      { subject: 'ইংরেজি', marks: 80, grade: 'A-' },
    ],
    '2nd Term': [
      { subject: 'কুরআন', marks: 95, grade: 'A+' },
      { subject: 'হাদিস', marks: 88, grade: 'A' },
      { subject: 'আরবি', marks: 90, grade: 'A+' },
      { subject: 'গণিত', marks: 82, grade: 'A-' },
      { subject: 'ইংরেজি', marks: 84, grade: 'A-' },
    ],
    'Final Exam': [
      { subject: 'কুরআন', marks: 98, grade: 'A+' },
      { subject: 'হাদিস', marks: 92, grade: 'A+' },
      { subject: 'আরবি', marks: 94, grade: 'A+' },
      { subject: 'গণিত', marks: 88, grade: 'A' },
      { subject: 'ইংরেজি', marks: 86, grade: 'A' },
    ],
  };

  const chartData = examTerms.map(term => ({
    name: term.id,
    gpa: term.gpa
  }));

  return (
    <div className="space-y-10 pb-20">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div whileHover={{ scale: 1.02 }} className="card-3d p-8 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
          <div className="relative z-10">
            <Trophy size={40} className="text-accent mb-4" />
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">বর্তমান জিপিএ</p>
            <h3 className="text-4xl font-black">৪.৯২</h3>
            <p className="text-xs text-accent mt-2 font-bold">ক্লাসের সেরা ৫% এর মধ্যে</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card-3d p-8 bg-white border-2 border-slate-100 flex flex-col justify-center">
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="gpa" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#F27D26' : '#065F46'} />
                  ))}
                </Bar>
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">ফলাফলের ধারা</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card-3d p-8 bg-secondary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
          <div className="relative z-10">
            <Award size={40} className="text-white mb-4" />
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">মোট ক্রেডিট</p>
            <h3 className="text-4xl font-black">১২০</h3>
            <p className="text-xs text-white/80 mt-2 font-bold">সেশন: ২০২৫-২৬</p>
          </div>
        </motion.div>
      </div>

      {/* Term Selection */}
      <div className="flex flex-wrap gap-4">
        {examTerms.map((term) => (
          <button
            key={term.id}
            onClick={() => setActiveTerm(term.id)}
            className={`px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 shadow-sm ${
              activeTerm === term.id 
                ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/20' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            <FileText size={20} />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest opacity-60 leading-none mb-1">{term.id}</p>
              <p>{term.bn}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Results Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-3d p-8">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <BookOpen className="text-primary" /> মার্কশিট বিবরণ
            </h3>
            <button className="btn-3d text-sm py-2 px-4">
              <Download size={18} /> পিডিএফ ডাউনলোড
            </button>
          </div>

          <div className="space-y-4">
            {subjectResults[activeTerm].map((item: any, i: number) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 group hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="font-black">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{item.subject}</h4>
                    <p className="text-xs text-slate-400 font-medium">শিক্ষাবর্ষ ২০২৫</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">মার্কস</p>
                    <p className="text-xl font-black text-slate-900">{item.marks}</p>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-2 border-slate-100 shadow-sm group-hover:border-primary transition-colors">
                    <span className="text-xl font-black text-primary">{item.grade}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="card-3d p-8 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
            <div className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 bg-accent/20 rounded-[2rem] flex items-center justify-center text-accent mx-auto shadow-2xl">
                <Star size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold">পরীক্ষার সারসংক্ষেপ</h3>
                <p className="text-slate-400 text-sm mt-2">{activeTerm}-এর সামগ্রিক ফলাফল</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-bold">জিপিএ</p>
                  <p className="text-2xl font-black text-accent">{examTerms.find(t => t.id === activeTerm)?.gpa}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-bold">গ্রেড</p>
                  <p className="text-2xl font-black text-emerald-400">A+</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-3d p-8 border-2 border-primary/10">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <PieChart size={20} className="text-primary" /> বিষয়ের ফলাফল বিন্যাস
            </h4>
            <div className="space-y-4">
              {[
                { label: 'চমৎকার', perc: 80 },
                { label: 'ভালো', perc: 15 },
                { label: 'সাধারণ', perc: 5 },
              ].map((level, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">{level.label}</span>
                    <span className="text-slate-900">{level.perc}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-secondary' : 'bg-rose-400'}`} 
                      style={{ width: `${level.perc}%` }}
                    ></div>
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
