import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Plus, 
  Search, 
  Download, 
  Save, 
  Trash2, 
  Calculator,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import { formatCurrency } from '../../lib/utils';

export default function ResultManagement() {
  const [selectedClass, setSelectedClass] = useState('অষ্টম শ্রেণী');
  const [selectedExam, setSelectedExam] = useState('প্রথম সাময়িক পরীক্ষা');
  const [students, setStudents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [subjectTargetClass, setSubjectTargetClass] = useState('অষ্টম শ্রেণী');
  const [searchTerm, setSearchTerm] = useState('');

  // Marks Entry State (Subjects per Class)
  const [classSubjects, setClassSubjects] = useState<Record<string, string[]>>({
    'প্রথম শ্রেণী': ['আরবি', 'কুরআন', 'ইংরেজি', 'গণিত'],
    'অষ্টম শ্রেণী': ['আরবি', 'কুরআন', 'হাদিস', 'ইংরেজি', 'গণিত', 'বিজ্ঞান', 'সমাজ বিজ্ঞান'],
    'নবম শ্রেণী': ['আরবি', 'কুরআন', 'হাদিস', 'ইংরেজি', 'গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান'],
    'দশম শ্রেণী': ['আরবি', 'কুরআন', 'হাদিস', 'ইংরেজি', 'গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'উচ্চতর গণিত']
  });

  const [marks, setMarks] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize marks for the selected class subjects
    const subjects = classSubjects[selectedClass] || ['সাধারণ'];
    const initialMarks: Record<string, number> = {};
    subjects.forEach(sub => {
      initialMarks[sub] = 0;
    });
    setMarks(initialMarks);
  }, [selectedClass, classSubjects]);

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubjectName.trim()) {
      setClassSubjects(prev => ({
        ...prev,
        [subjectTargetClass]: [...(prev[subjectTargetClass] || []), newSubjectName.trim()]
      }));
      setNewSubjectName('');
      setIsSubjectModalOpen(false);
      toast.success(`বিষয় "${newSubjectName}" ${subjectTargetClass}-এ যোগ করা হয়েছে!`);
    }
  };

  useEffect(() => {
    setStudents([
      { id: 'S1001', name: 'আবদুল্লাহ আল মামুন', roll: '১২', gpa: 4.85, grade: 'A+' },
      { id: 'S1002', name: 'ওমর ফারুক', roll: '১৫', gpa: 4.50, grade: 'A' },
      { id: 'S1003', name: 'জুবায়ের আহমেদ', roll: '০১', gpa: 5.00, grade: 'A+' },
    ]);
  }, [selectedClass]);

  const calculateGPA = (totalMarks: number) => {
    const avg = totalMarks / Object.keys(marks).length;
    if (avg >= 80) return { gpa: 5.00, grade: 'A+' };
    if (avg >= 70) return { gpa: 4.00, grade: 'A' };
    if (avg >= 60) return { gpa: 3.50, grade: 'A-' };
    if (avg >= 50) return { gpa: 3.00, grade: 'B' };
    return { gpa: 0.00, grade: 'F' };
  };

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Object.values(marks).reduce((a, b) => (a as number) + (b as number), 0) as number;
    const { gpa, grade } = calculateGPA(total);
    
    toast.success(`${currentStudent.name}-এর মার্কস সংরক্ষিত হয়েছে। GPA: ${gpa}`);
    setIsModalOpen(false);
  };

  const generateReportCard = (student: any) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(6, 95, 70); // Primary color
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('NOOR MADRASHA SMART SYSTEM', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Academic Progress Report', 105, 30, { align: 'center' });

    // Student Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`Student Name: ${student.name}`, 20, 60);
    doc.text(`Class: ${selectedClass}`, 20, 70);
    doc.text(`Roll: ${student.roll}`, 150, 70);
    doc.text(`Exam: ${selectedExam}`, 20, 80);

    // Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 95, 170, 10, 'F');
    doc.setFontSize(10);
    doc.text('Subject', 25, 102);
    doc.text('Full Marks', 80, 102);
    doc.text('Obtained Marks', 120, 102);
    doc.text('Grade', 170, 102);

    // Table Content (Mock)
    let y = 115;
    Object.keys(marks).forEach((sub) => {
      doc.text(sub, 25, y);
      doc.text('100', 80, y);
      doc.text('85', 120, y);
      doc.text('A+', 170, y);
      y += 10;
    });

    // Footer
    doc.line(20, y + 10, 190, y + 10);
    doc.setFontSize(14);
    doc.text(`Final GPA: ${student.gpa}`, 20, y + 25);
    doc.text(`Final Grade: ${student.grade}`, 150, y + 25);

    doc.save(`Report_Card_${student.name}.pdf`);
  };

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
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">ফলাফল ব্যবস্থাপনা</h1>
          <p className="text-slate-500 font-medium">মার্কস এন্ট্রি করুন, জিপিএ গণনা করুন এবং রিপোর্ট কার্ড তৈরি করুন।</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsSubjectModalOpen(true)}
            className="btn-smart-indigo flex items-center gap-2"
          >
            <Plus size={20} /> বিষয় যোগ করুন
          </button>
          <button className="btn-smart-amber flex items-center gap-2">
            <Calculator size={20} /> অটো ক্যালকুলেট
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card-3d p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">শ্রেণী নির্বাচন করুন</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-black text-slate-700 shadow-inner"
            >
              {['প্রথম শ্রেণী', 'দ্বিতীয় শ্রেণী', 'তৃতীয় শ্রেণী', 'চতুর্থ শ্রেণী', 'পঞ্চম শ্রেণী', 'ষষ্ঠ শ্রেণী', 'সপ্তম শ্রেণী', 'অষ্টম শ্রেণী', 'নবম শ্রেণী', 'দশম শ্রেণী'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পরীক্ষা নির্বাচন করুন</label>
            <select 
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-black text-slate-700 shadow-inner"
            >
              <option value="First Term Exam">প্রথম সাময়িক পরীক্ষা</option>
              <option value="Mid Term Exam">অর্ধ-বার্ষিক পরীক্ষা</option>
              <option value="Final Exam">বার্ষিক পরীক্ষা</option>
            </select>
          </div>
        </div>
        <div className="flex items-end">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input 
              type="text" 
              placeholder="নাম, রোল বা আইডি দিয়ে খুঁজুন..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-medium text-lg shadow-inner" 
            />
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="card-3d p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">রোল</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">শিক্ষার্থীর নাম</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">জিপিএ</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">গ্রেড</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students
                .filter(s => 
                  s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  s.roll.includes(searchTerm) ||
                  s.id.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6 font-black text-slate-400">
                    <div className="flex flex-col">
                      <span>#{student.roll}</span>
                      <span className="text-[10px] uppercase tracking-widest opacity-50">{student.id}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-lg font-black text-slate-900">{student.name}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-xl font-black text-primary">{student.gpa.toFixed(2)}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      student.grade === 'A+' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right space-x-4">
                    <button 
                      onClick={() => { setCurrentStudent(student); setIsModalOpen(true); }}
                      className="p-3 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all shadow-sm"
                      title="মার্কস এন্ট্রি করুন"
                    >
                      <Plus size={20} />
                    </button>
                    <button 
                      onClick={() => generateReportCard(student)}
                      className="p-3 text-slate-400 hover:text-secondary hover:bg-secondary/10 rounded-xl transition-all shadow-sm"
                      title="রিপোর্ট কার্ড ডাউনলোড করুন"
                    >
                      <Download size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Marks Entry Modal */}
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
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">মার্কস এন্ট্রি</h2>
                  <p className="text-white/70 text-sm font-bold">{currentStudent?.name} • {selectedClass}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveMarks} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.keys(marks).map((subject) => (
                    <div key={subject} className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{subject}</label>
                      <input
                        type="number"
                        max="100"
                        min="0"
                        value={marks[subject]}
                        onChange={(e) => setMarks({ ...marks, [subject]: Number(e.target.value) })}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                        placeholder="0-100"
                      />
                    </div>
                  ))}
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
                    className="flex-grow btn-3d bg-emerald-600 text-white border-emerald-700 py-4 font-black uppercase tracking-widest hover:bg-emerald-700"
                  >
                    <Save size={20} className="inline mr-2" /> মার্কস সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Subject Modal */}
      <AnimatePresence>
        {isSubjectModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubjectModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-secondary text-white">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">নতুন বিষয় যোগ করুন</h2>
                  <p className="text-white/70 text-sm font-bold">{selectedClass}-এর জন্য বিষয় যোগ করা হচ্ছে</p>
                </div>
                <button onClick={() => setIsSubjectModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddSubject} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">শ্রেণী নির্বাচন করুন</label>
                  <select 
                    value={subjectTargetClass}
                    onChange={(e) => setSubjectTargetClass(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary/20 outline-none font-black text-slate-700 shadow-inner"
                  >
                    {['প্রথম শ্রেণী', 'দ্বিতীয় শ্রেণী', 'তৃতীয় শ্রেণী', 'চতুর্থ শ্রেণী', 'পঞ্চম শ্রেণী', 'ষষ্ঠ শ্রেণী', 'সপ্তম শ্রেণী', 'অষ্টম শ্রেণী', 'নবম শ্রেণী', 'দশম শ্রেণী'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">বিষয়ের নাম</label>
                  <input
                    type="text"
                    required
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary/20 outline-none font-bold shadow-inner"
                    placeholder="যেমন: ইতিহাস"
                  />
                </div>

                <div className="pt-4 flex gap-6">
                  <button
                    type="button"
                    onClick={() => setIsSubjectModalOpen(false)}
                    className="flex-grow btn-3d bg-rose-50 text-rose-600 border-rose-100 py-4 font-black uppercase tracking-widest text-xs hover:bg-rose-100"
                  >
                    <X size={16} className="inline mr-2" /> বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-grow btn-3d bg-emerald-600 text-white border-emerald-700 py-4 font-black uppercase tracking-widest text-xs hover:bg-emerald-700"
                  >
                    <Plus size={16} className="inline mr-2" /> বিষয় যোগ করুন
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
