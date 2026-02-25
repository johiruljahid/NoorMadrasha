import React, { useState } from 'react';
import { Search, User, FileText, Download, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import { formatCurrency } from '../../lib/utils';

export default function VerifyStudent() {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const mockStudents: Record<string, any> = {
    'NM-1001': {
      id: 'NM-1001',
      name: 'আব্দুল্লাহ আল মামুন',
      className: 'অষ্টম শ্রেণী',
      roll: '১২',
      fatherName: 'আবদুর রহমান',
      motherName: 'ফাতেমা বেগম',
      photoUrl: 'https://picsum.photos/seed/student1/200/200',
      results: [
        { subject: 'আরবি', marks: 85, grade: 'A+' },
        { subject: 'কুরআন', marks: 92, grade: 'A+' },
        { subject: 'হাদিস', marks: 88, grade: 'A+' },
        { subject: 'ইংরেজি', marks: 78, grade: 'A' },
        { subject: 'গণিত', marks: 95, grade: 'A+' },
      ],
      gpa: 4.90,
      grade: 'A+'
    },
    'NM-1002': {
      id: 'NM-1002',
      name: 'ওমর ফারুক',
      className: 'অষ্টম শ্রেণী',
      roll: '১৫',
      fatherName: 'ইব্রাহিম আলী',
      motherName: 'খাদিজা খাতুন',
      photoUrl: 'https://picsum.photos/seed/student2/200/200',
      results: [
        { subject: 'আরবি', marks: 80, grade: 'A+' },
        { subject: 'কুরআন', marks: 85, grade: 'A+' },
        { subject: 'হাদিস', marks: 82, grade: 'A+' },
        { subject: 'ইংরেজি', marks: 75, grade: 'A' },
        { subject: 'গণিত', marks: 88, grade: 'A+' },
      ],
      gpa: 4.75,
      grade: 'A+'
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    setStudent(null);

    setTimeout(() => {
      const found = mockStudents[studentId.toUpperCase()];
      if (found) {
        setStudent(found);
      } else {
        setError('দুঃখিত, এই আইডি দিয়ে কোনো শিক্ষার্থী পাওয়া যায়নি।');
      }
      setIsSearching(false);
    }, 1000);
  };

  const downloadPDF = () => {
    if (!student) return;
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(6, 95, 70);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('নূর মাদ্রাসা স্মার্ট সিস্টেম', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('অফিসিয়াল শিক্ষার্থী যাচাইকরণ ও ফলাফল রিপোর্ট', 105, 30, { align: 'center' });

    // Student Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`Student Name: ${student.name}`, 20, 60);
    doc.text(`Student ID: ${student.id}`, 20, 70);
    doc.text(`Class: ${student.className}`, 20, 80);
    doc.text(`Roll: ${student.roll}`, 150, 80);

    // Results Table
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 95, 170, 10, 'F');
    doc.setFontSize(10);
    doc.text('Subject', 25, 102);
    doc.text('Marks', 100, 102);
    doc.text('Grade', 160, 102);

    let y = 115;
    student.results.forEach((res: any) => {
      doc.text(res.subject, 25, y);
      doc.text(res.marks.toString(), 100, y);
      doc.text(res.grade, 160, y);
      y += 10;
    });

    doc.line(20, y + 5, 190, y + 5);
    doc.setFontSize(14);
    doc.text(`Final GPA: ${student.gpa.toFixed(2)}`, 20, y + 20);
    doc.text(`Final Grade: ${student.grade}`, 150, y + 20);

    doc.save(`Verification_${student.id}_${student.name}.pdf`);
  };

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50"></div>
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

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest"
          >
            <CheckCircle2 size={14} /> শিক্ষার্থীর তথ্য যাচাইকরণ
          </motion.div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">শিক্ষার্থী যাচাইকরণ</h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            শিক্ষার্থীর আইডি কার্ড নম্বর ব্যবহার করে তার প্রোফাইল এবং একাডেমিক ফলাফল যাচাই করুন।
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-3d p-8 md:p-12 bg-white/80 backdrop-blur-xl border-white/20"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input
                type="text"
                placeholder="শিক্ষার্থীর আইডি লিখুন (যেমন: NM-1001)"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-lg shadow-inner transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="btn-smart-primary px-12 py-5 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Search size={24} />
                  <span>খুঁজুন</span>
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 text-rose-600"
              >
                <AlertCircle size={24} />
                <p className="font-bold">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {student && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="space-y-10"
            >
              <div className="card-3d p-10 bg-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                  <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl shrink-0">
                    <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow text-center md:text-left space-y-6">
                    <div>
                      <h2 className="text-4xl font-black text-slate-900 mb-2">{student.name}</h2>
                      <p className="text-primary font-black text-sm uppercase tracking-[0.2em]">{student.className} • রোল: {student.roll}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">পিতার নাম</p>
                        <p className="font-bold text-slate-700">{student.fatherName}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">মাতার নাম</p>
                        <p className="font-bold text-slate-700">{student.motherName}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 font-black text-lg">
                        জিপিএ: {student.gpa.toFixed(2)}
                      </div>
                      <div className="px-6 py-3 bg-primary text-white rounded-2xl border border-primary-dark font-black text-lg shadow-lg shadow-primary/20">
                        গ্রেড: {student.grade}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-3d p-10 bg-white">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <FileText size={28} className="text-primary" /> একাডেমিক ফলাফল
                  </h3>
                  <button
                    onClick={downloadPDF}
                    className="btn-smart-indigo flex items-center gap-2"
                  >
                    <Download size={20} /> পিডিএফ ডাউনলোড
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">বিষয়</th>
                        <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">নম্বর</th>
                        <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">গ্রেড</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {student.results.map((res: any, i: number) => (
                        <tr key={i} className="group hover:bg-slate-50 transition-colors">
                          <td className="py-5">
                            <span className="font-bold text-slate-900">{res.subject}</span>
                          </td>
                          <td className="py-5 text-center">
                            <span className="font-black text-slate-700">{res.marks}</span>
                          </td>
                          <td className="py-5 text-right">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                              res.grade === 'A+' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {res.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
