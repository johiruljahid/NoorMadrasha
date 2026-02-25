import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  FileText, 
  CreditCard, 
  Download, 
  QrCode,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  ArrowRight,
  GraduationCap,
  X,
  Smartphone,
  Info,
  Send,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatCurrency } from '../../lib/utils';
import { paymentService, PaymentRequest } from '../../services/paymentService';
import toast from 'react-hot-toast';

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    setStudent({
      id: 'NM251001',
      name: 'Abdullah Al Mamun',
      nameBn: 'আবদুল্লাহ আল মামুন',
      className: 'Class 8',
      classNameBn: 'অষ্টম শ্রেণী',
      roll: '12',
      photoUrl: 'https://images.unsplash.com/photo-1544717297-fa15c3902727?auto=format&fit=crop&q=80&w=400',
      attendance: { present: 85, total: 100 },
      results: { gpa: 4.85, grade: 'A+' },
      fees: { status: 'due', amount: 2500 },
      type: 'আবাসিক (Residential)'
    });
  }, []);

  if (!student) return <div className="flex items-center justify-center h-screen font-bold text-primary">লোড হচ্ছে...</div>;

  const downloadIDCard = async () => {
    const element = document.getElementById('id-card-template');
    if (!element) return;
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 10, 10, 85, 135);
    pdf.save(`ID_Card_${student.name}.pdf`);
  };

  return (
    <div className="space-y-12 pb-20 relative">
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-islamic text-slate-900 mb-2">আসসালামু আলাইকুম, {student.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 font-medium">আপনার স্মার্ট স্টুডেন্ট ড্যাশবোর্ডে স্বাগতম।</p>
        </div>
        <button onClick={downloadIDCard} className="btn-3d group">
          <Download size={20} className="group-hover:translate-y-1 transition-transform" /> আইডি কার্ড ডাউনলোড
        </button>
      </div>

      {/* Profile Summary Card */}
      <Link to="/student/profile">
        <motion.div whileHover={{ y: -5 }} className="card-3d-primary p-0 overflow-hidden relative group cursor-pointer">
          <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
          <div className="p-10 relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 rounded-[2rem] border-4 border-white/30 overflow-hidden shadow-2xl bg-white floating">
              <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-2">{student.nameBn}</h2>
              <p className="text-xl text-white/70 mb-6">{student.name}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 backdrop-blur-md text-sm">
                  <GraduationCap size={18} className="text-accent" /> {student.classNameBn}
                </span>
                <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 backdrop-blur-md text-sm">
                  <ShieldCheck size={18} className="text-accent" /> {student.type}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border-t border-white/10 p-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
            সম্পূর্ণ প্রোফাইল দেখতে ক্লিক করুন
          </div>
        </motion.div>
      </Link>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Attendance Summary */}
        <Link to="/student/attendance">
          <motion.div whileHover={{ scale: 1.02 }} className="card-3d flex flex-col items-center text-center group h-full">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-bold mb-1">উপস্থিতি</h3>
            <div className="text-4xl font-black text-slate-900 my-4">{student.attendance.present}%</div>
            <p className="text-slate-500 text-xs mb-6">এই মাসে উপস্থিতি</p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: `${student.attendance.present}%` }}></div>
            </div>
          </motion.div>
        </Link>

        {/* Results Summary */}
        <Link to="/student/results">
          <motion.div whileHover={{ scale: 1.02 }} className="card-3d flex flex-col items-center text-center group h-full">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold mb-1">ফলাফল</h3>
            <div className="text-4xl font-black text-slate-900 my-4">{student.results.gpa}</div>
            <p className="text-slate-500 text-xs mb-6">জিপিএ (সর্বশেষ পরীক্ষা)</p>
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
              <CheckCircle2 size={16} /> A+ পেয়ে উত্তীর্ণ
            </div>
          </motion.div>
        </Link>

        {/* Fees Summary */}
        <Link to="/student/fees">
          <motion.div whileHover={{ scale: 1.02 }} className="card-3d flex flex-col items-center text-center group h-full">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-primary transition-all">
              <CreditCard size={32} />
            </div>
            <h3 className="text-xl font-bold mb-1">বেতন ও ফি</h3>
            <div className={`text-2xl font-black my-4 flex items-center gap-2 ${student.fees.status === 'paid' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {student.fees.status === 'paid' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
              {student.fees.status === 'paid' ? 'পরিশোধিত' : 'বকেয়া'}
            </div>
            <p className="text-slate-500 text-xs mb-6">মাসিক বেতন: {formatCurrency(student.fees.amount)}</p>
            <div className="w-full py-3 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs group-hover:bg-rose-600 group-hover:text-white transition-all">
              এখনই পরিশোধ করুন
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Notices */}
      <div className="card-3d p-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
            <Bell size={24} className="text-accent" /> গুরুত্বপূর্ণ নোটিশ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <h4 className="font-bold mb-2">বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬</h4>
              <p className="text-sm text-white/50">আগামী ১৫ই মার্চ বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে। সকল শিক্ষার্থীর অংশগ্রহণ বাধ্যতামূলক।</p>
              <span className="text-[10px] font-bold text-accent uppercase mt-4 block">২০ ফেব্রুয়ারি, ২০২৬</span>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <h4 className="font-bold mb-2">রমজানের সময়সূচী</h4>
              <p className="text-sm text-white/50">পবিত্র রমজান মাসে মাদরাসার সময়সূচী সকাল ৮:০০ টা থেকে দুপুর ১:০০ টা পর্যন্ত হবে।</p>
              <span className="text-[10px] font-bold text-accent uppercase mt-4 block">১৮ ফেব্রুয়ারি, ২০২৬</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden ID Card Template */}
      <div className="fixed -left-[9999px]">
        <div id="id-card-template" className="w-[350px] h-[550px] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col">
          <div className="bg-primary p-8 text-white relative text-center">
            <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">N</div>
              <h2 className="text-xl font-islamic font-bold">নূর মাদরাসা</h2>
              <p className="text-[10px] font-bold tracking-widest uppercase text-accent">স্মার্ট আইডি কার্ড</p>
            </div>
          </div>
          <div className="flex-grow p-8 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-2xl border-4 border-primary/10 overflow-hidden mb-6 bg-slate-50">
              <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{student.nameBn}</h3>
            <p className="text-primary font-bold mb-6">{student.classNameBn}</p>
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase">রোল নম্বর</p>
                <p className="font-bold text-slate-900">{student.roll}</p>
              </div>
              <div className="text-left col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase">স্টুডেন্ট আইডি</p>
                <p className="font-bold text-primary">{student.id}</p>
              </div>
            </div>
            <div className="mt-auto">
              <QRCodeSVG value={`https://noormadrasha.com/student/${student.id}`} size={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
