import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Download,
  QrCode,
  X,
  Camera,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { generateStudentId } from '../../lib/utils';
import { Student } from '../../types';

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    className: 'Class 1',
    roll: '',
    fatherName: '',
    motherName: '',
    phone: '',
    address: '',
    photo: null as File | null,
    photoPreview: ''
  });

  useEffect(() => {
    // Mock initial data
    setStudents([
      {
        id: 'NM-1001',
        name: 'Abdullah Al Mamun',
        className: 'Class 8',
        roll: '12',
        accessCode: 'NM-1001',
        fatherName: 'Abdur Rahman',
        motherName: 'Fatema Begum',
        phone: '01712345678',
        address: 'Dhaka, Bangladesh',
        admissionDate: '2025-01-10',
        status: 'active',
        photoUrl: 'https://picsum.photos/seed/student1/100/100'
      },
      {
        id: 'NM-1002',
        name: 'Omar Faruk',
        className: 'Class 8',
        roll: '15',
        accessCode: 'NM-1002',
        fatherName: 'Ibrahim Ali',
        motherName: 'Khadija Khatun',
        phone: '01812345678',
        address: 'Dhaka, Bangladesh',
        admissionDate: '2025-01-12',
        status: 'active',
        photoUrl: 'https://picsum.photos/seed/student2/100/100'
      }
    ]);
  }, []);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const studentId = generateStudentId();
    const newStudent: Student = {
      id: studentId,
      name: formData.name,
      className: formData.className,
      roll: formData.roll,
      accessCode: studentId,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      phone: formData.phone,
      address: formData.address,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'active',
      photoUrl: formData.photoPreview || 'https://picsum.photos/seed/placeholder/100/100'
    };

    setStudents([newStudent, ...students]);
    setIsModalOpen(false);
    resetForm();
    toast.success('Student added successfully!');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      className: 'Class 1',
      roll: '',
      fatherName: '',
      motherName: '',
      phone: '',
      address: '',
      photo: null,
      photoPreview: ''
    });
    setEditingStudent(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file)
      });
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.roll.includes(searchTerm);
    const matchesClass = selectedClass === 'All' || s.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-islamic text-slate-900 mb-1">Student Management</h1>
          <p className="text-slate-500">Manage your students, their profiles and Student IDs.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="btn-primary"
        >
          <Plus size={20} /> Add New Student
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or roll..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-600"
          >
            <option value="All">All Classes</option>
            {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={student.id}
            className="card p-0 overflow-hidden group"
          >
            <div className="p-6 flex items-center gap-4 border-b border-slate-50">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-slate-900 truncate">{student.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{student.className} • Roll: {student.roll}</p>
                <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                  <QrCode size={10} /> ID: {student.id}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-4 bg-slate-50/50 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</span>
                <span className="text-xs font-bold text-slate-700">{student.phone}</span>
              </div>
              <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                <Download size={14} /> ID Card
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Student Modal */}
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
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <h2 className="text-xl font-islamic font-bold">Add New Student</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="p-8 overflow-y-auto space-y-8">
                {/* Photo Upload */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                      {formData.photoPreview ? (
                        <img src={formData.photoPreview} className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={32} className="text-slate-300" />
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all">
                      <Plus size={20} />
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                    </label>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upload Student Photo</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder="e.g. Abdullah Al Mamun"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Class</label>
                    <select
                      value={formData.className}
                      onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                      className="input-field"
                    >
                      {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Roll Number</label>
                    <input
                      type="text"
                      required
                      value={formData.roll}
                      onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                      className="input-field"
                      placeholder="e.g. 12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                      placeholder="e.g. 01712345678"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Father's Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fatherName}
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Mother's Name</label>
                    <input
                      type="text"
                      required
                      value={formData.motherName}
                      onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Address</label>
                  <textarea
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Enter permanent address"
                  />
                </div>

                <div className="pt-4 flex gap-4">
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
                    <Check size={20} /> Save Student
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
