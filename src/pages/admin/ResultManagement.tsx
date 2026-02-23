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
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedExam, setSelectedExam] = useState('First Term Exam');
  const [students, setStudents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  // Marks Entry State
  const [marks, setMarks] = useState<Record<string, number>>({
    'Arabic': 0,
    'Quran': 0,
    'Hadith': 0,
    'English': 0,
    'Math': 0,
    'Science': 0,
    'Social Science': 0
  });

  useEffect(() => {
    setStudents([
      { id: 'S1001', name: 'Abdullah Al Mamun', roll: '12', gpa: 4.85, grade: 'A+' },
      { id: 'S1002', name: 'Omar Faruk', roll: '15', gpa: 4.50, grade: 'A' },
      { id: 'S1003', name: 'Zubair Ahmed', roll: '01', gpa: 5.00, grade: 'A+' },
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
    
    toast.success(`Marks saved for ${currentStudent.name}. GPA: ${gpa}`);
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-islamic text-slate-900 mb-1">Result Management</h1>
          <p className="text-slate-500">Enter marks, calculate GPA and generate report cards.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Calculator size={20} /> Auto Calculate
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Class</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input-field"
            >
              {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Exam</label>
            <select 
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="input-field"
            >
              <option>First Term Exam</option>
              <option>Mid Term Exam</option>
              <option>Final Exam</option>
            </select>
          </div>
        </div>
        <div className="flex items-end">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search student..." className="input-field pl-12" />
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Roll</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Student Name</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">GPA</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Grade</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-400">#{student.roll}</td>
                  <td className="px-8 py-5">
                    <span className="font-bold text-slate-900">{student.name}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-bold text-primary">{student.gpa.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      student.grade === 'A+' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <button 
                      onClick={() => { setCurrentStudent(student); setIsModalOpen(true); }}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
                    >
                      <Plus size={18} />
                    </button>
                    <button 
                      onClick={() => generateReportCard(student)}
                      className="p-2 text-slate-400 hover:text-secondary hover:bg-slate-50 rounded-lg transition-all"
                    >
                      <Download size={18} />
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
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <div>
                  <h2 className="text-xl font-islamic font-bold">Enter Marks</h2>
                  <p className="text-xs text-white/70">{currentStudent?.name} • {selectedClass}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveMarks} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(marks).map((subject) => (
                    <div key={subject} className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{subject}</label>
                      <input
                        type="number"
                        max="100"
                        min="0"
                        value={marks[subject]}
                        onChange={(e) => setMarks({ ...marks, [subject]: Number(e.target.value) })}
                        className="input-field"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-grow btn-primary py-4"
                  >
                    <Save size={20} /> Save Marks
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
