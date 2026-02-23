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
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent'>>({});

  useEffect(() => {
    // Mock students for the selected class
    const mockStudents = [
      { id: 'S1001', name: 'Abdullah Al Mamun', roll: '12' },
      { id: 'S1002', name: 'Omar Faruk', roll: '15' },
      { id: 'S1003', name: 'Zubair Ahmed', roll: '01' },
      { id: 'S1004', name: 'Hasan Ali', roll: '05' },
      { id: 'S1005', name: 'Mustafa Kamal', roll: '08' },
    ];
    setStudents(mockStudents);
    
    // Initialize all as present
    const initial: Record<string, 'present' | 'absent'> = {};
    mockStudents.forEach(s => initial[s.id] = 'present');
    setAttendance(initial);
  }, [selectedClass]);

  const toggleAttendance = (id: string) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === 'present' ? 'absent' : 'present'
    }));
  };

  const handleSave = () => {
    toast.success(`Attendance for ${selectedClass} on ${format(selectedDate, 'dd MMM yyyy')} saved!`);
  };

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-islamic text-slate-900 mb-1">Attendance System</h1>
          <p className="text-slate-500">Mark daily attendance for students class-wise.</p>
        </div>
        <button onClick={handleSave} className="btn-primary">
          <Save size={20} /> Save Attendance
        </button>
      </div>

      {/* Controls */}
      <div className="card p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
            className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-grow md:flex-grow-0 flex items-center gap-3 px-6 py-3 bg-primary/5 rounded-2xl border border-primary/10">
            <Calendar size={20} className="text-primary" />
            <span className="font-bold text-slate-900">{format(selectedDate, 'dd MMMM, yyyy')}</span>
          </div>
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
            className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="flex-grow md:flex-grow-0 px-6 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700"
          >
            {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 font-bold whitespace-nowrap">
            {presentCount} / {students.length} Present
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Roll</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Student Name</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-400">#{student.roll}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      attendance[student.id] === 'present' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-rose-100 text-rose-600'
                    }`}>
                      {attendance[student.id] === 'present' ? <Check size={14} /> : <X size={14} />}
                      {attendance[student.id]}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => toggleAttendance(student.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        attendance[student.id] === 'present'
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      Mark as {attendance[student.id] === 'present' ? 'Absent' : 'Present'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-emerald-50 border-emerald-100">
          <h4 className="text-emerald-800 font-bold mb-2">Monthly Presence</h4>
          <p className="text-3xl font-bold text-emerald-600">92.5%</p>
          <p className="text-xs text-emerald-700 mt-1">Average for {selectedClass}</p>
        </div>
        <div className="card p-6 bg-rose-50 border-rose-100">
          <h4 className="text-rose-800 font-bold mb-2">Highest Absentees</h4>
          <p className="text-3xl font-bold text-rose-600">3 Students</p>
          <p className="text-xs text-rose-700 mt-1">More than 5 days absent</p>
        </div>
        <div className="card p-6 bg-primary/5 border-primary/10">
          <h4 className="text-primary font-bold mb-2">Class Performance</h4>
          <p className="text-3xl font-bold text-primary">Excellent</p>
          <p className="text-xs text-primary/70 mt-1">Based on attendance consistency</p>
        </div>
      </div>
    </div>
  );
}
