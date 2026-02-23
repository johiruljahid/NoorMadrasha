import React, { useState, useEffect } from 'react';
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
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatCurrency } from '../../lib/utils';

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    // Mock student data
    setStudent({
      id: 'NM251001',
      name: 'Abdullah Al Mamun',
      nameBn: 'আবদুল্লাহ আল মামুন',
      className: 'Class 8',
      classNameBn: 'অষ্টম শ্রেণী',
      roll: '12',
      accessCode: 'NM251001',
      photoUrl: 'https://images.unsplash.com/photo-1544717297-fa15c3902727?auto=format&fit=crop&q=80&w=400',
      attendance: { present: 85, total: 100 },
      results: { gpa: 4.85, grade: 'A+' },
      fees: { status: 'paid', amount: 2500 },
    });
  }, []);

  if (!student) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  const downloadIDCard = async () => {
    const element = document.getElementById('id-card-template');
    if (!element) return;
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 10, 10, 85, 135); // ID Card size approx
    pdf.save(`ID_Card_${student.name}.pdf`);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-islamic text-slate-900 mb-2">Assalamu Alaikum, {student.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 font-medium">Welcome to your smart student dashboard. | আপনার স্মার্ট স্টুডেন্ট ড্যাশবোর্ডে স্বাগতম।</p>
        </div>
        <button 
          onClick={downloadIDCard}
          className="btn-3d group"
        >
          <Download size={20} className="group-hover:translate-y-1 transition-transform" /> Download ID Card | আইডি কার্ড ডাউনলোড
        </button>
      </div>

      {/* Profile Card - 3D Style */}
      <div className="card-3d-primary p-0 overflow-hidden relative group">
        <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
        <div className="p-10 relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 rounded-[2rem] border-4 border-white/30 overflow-hidden shadow-2xl bg-white floating">
            <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">{student.name}</h2>
            <h3 className="text-2xl text-white/80 mb-6 font-medium">{student.nameBn}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 backdrop-blur-md">
                <GraduationCap size={18} className="text-accent" /> {student.className} ({student.classNameBn})
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 backdrop-blur-md">
                <User size={18} className="text-accent" /> Roll: {student.roll}
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 backdrop-blur-md">
                <QrCode size={18} className="text-accent" /> ID: {student.id}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border-t border-white/10 p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Student ID', labelBn: 'স্টুডেন্ট আইডি', value: student.id, color: 'text-accent' },
            { label: 'Status', labelBn: 'অবস্থা', value: 'Active', color: 'text-emerald-400' },
            { label: 'Blood Group', labelBn: 'রক্তের গ্রুপ', value: 'B+', color: 'text-rose-400' },
            { label: 'Session', labelBn: 'সেশন', value: '2026', color: 'text-white' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1">{item.label}</p>
              <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
              <p className="text-[10px] text-white/30">{item.labelBn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid - 3D Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Attendance */}
        <motion.div whileHover={{ scale: 1.02 }} className="card-3d flex flex-col items-center text-center group">
          <div className="w-20 h-20 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary mb-8 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
            <Calendar size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-1 text-slate-900">Attendance</h3>
          <p className="text-primary font-bold mb-4">উপস্থিতি</p>
          <div className="text-5xl font-bold text-slate-900 mb-2">{student.attendance.present}%</div>
          <p className="text-slate-500 text-sm mb-8">Present this month | এই মাসে উপস্থিত</p>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-primary to-emerald-400 h-full" style={{ width: `${student.attendance.present}%` }}></div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div whileHover={{ scale: 1.02 }} className="card-3d flex flex-col items-center text-center group">
          <div className="w-20 h-20 bg-secondary/10 rounded-[1.5rem] flex items-center justify-center text-secondary mb-8 shadow-inner group-hover:bg-secondary group-hover:text-white transition-all duration-500">
            <TrendingUp size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-1 text-slate-900">Academic Result</h3>
          <p className="text-secondary font-bold mb-4">একাডেমিক ফলাফল</p>
          <div className="text-5xl font-bold text-slate-900 mb-2">{student.results.gpa}</div>
          <p className="text-slate-500 text-sm mb-8">GPA (Last Exam: {student.results.grade})</p>
          <button className="btn-3d bg-secondary hover:bg-emerald-600 w-full">
            View Marksheet | মার্কশিট দেখুন <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Fees */}
        <motion.div whileHover={{ scale: 1.02 }} className="card-3d flex flex-col items-center text-center group">
          <div className="w-20 h-20 bg-accent/10 rounded-[1.5rem] flex items-center justify-center text-accent mb-8 shadow-inner group-hover:bg-accent group-hover:text-primary transition-all duration-500">
            <CreditCard size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-1 text-slate-900">Fee Status</h3>
          <p className="text-accent font-bold mb-4">ফি-এর অবস্থা</p>
          <div className={`text-3xl font-bold mb-2 flex items-center gap-3 ${student.fees.status === 'paid' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {student.fees.status === 'paid' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
            {student.fees.status.toUpperCase()}
          </div>
          <p className="text-slate-500 text-sm mb-8">Monthly Fee: {formatCurrency(student.fees.amount)}</p>
          <button className="btn-3d-accent w-full">Pay Now | এখনই পরিশোধ করুন</button>
        </motion.div>
      </div>

      {/* Recent Activity & Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock size={20} className="text-primary" /> Recent Activity
          </h3>
          <div className="space-y-6">
            {[
              { title: 'Attendance Marked', desc: 'You were present today', time: '9:00 AM' },
              { title: 'Fee Paid', desc: 'Monthly fee for February paid', time: 'Yesterday' },
              { title: 'Result Published', desc: 'First Term Exam results are out', time: '2 days ago' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-8 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Bell size={20} className="text-accent" /> Important Notice
            </h3>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <h4 className="font-bold mb-1">Annual Sports Day 2026</h4>
                <p className="text-sm text-white/70">The annual sports day has been scheduled for March 15th. All students must participate.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <h4 className="font-bold mb-1">Ramadan Timing</h4>
                <p className="text-sm text-white/70">Madrasha timing will be 8:00 AM to 1:00 PM during the holy month of Ramadan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden ID Card Template for PDF Generation */}
      <div className="fixed -left-[9999px]">
        <div id="id-card-template" className="w-[350px] h-[550px] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col">
          <div className="bg-primary p-8 text-white relative text-center">
            <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">N</div>
              <h2 className="text-xl font-islamic font-bold">Noor Madrasha</h2>
              <p className="text-[10px] font-bold tracking-widest uppercase text-accent">Smart Identity Card</p>
            </div>
          </div>
          <div className="flex-grow p-8 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-2xl border-4 border-primary/10 overflow-hidden mb-6 bg-slate-50">
              <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{student.name}</h3>
            <p className="text-primary font-bold mb-6">{student.className}</p>
            
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Roll No</p>
                <p className="font-bold text-slate-900">{student.roll}</p>
              </div>
              <div className="text-left col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Student ID (Access Code)</p>
                <p className="font-bold text-primary">{student.id}</p>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Blood Group</p>
                <p className="font-bold text-rose-600">B+</p>
              </div>
            </div>

            <div className="mt-auto">
              <QRCodeSVG value={`https://noormadrasha.com/student/${student.id}`} size={80} />
              <p className="text-[8px] text-slate-400 mt-2">Scan to verify profile</p>
            </div>
          </div>
          <div className="bg-slate-900 p-4 text-center">
            <p className="text-[10px] text-slate-500">Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}
