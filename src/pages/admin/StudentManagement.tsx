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
  const [selectedClass, setSelectedClass] = useState('সব');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    className: 'নূরানী-১ম',
    roll: '',
    fatherName: '',
    motherName: '',
    phone: '',
    address: '',
    photo: null as File | null,
    photoPreview: '',
    residentialStatus: 'অনাবাসিক',
    previousSchool: '',
    previousEducationHistory: ''
  });

  useEffect(() => {
    // Mock initial data
    setStudents([
      {
        id: 'NM-1001',
        name: 'আবদুল্লাহ আল মামুন',
        className: 'নূরানী-১ম',
        roll: '১২',
        accessCode: 'NM-1001',
        fatherName: 'আবদুর রহমান',
        motherName: 'ফাতেমা বেগম',
        phone: '০১৭১২৩৪৫৬৭৮',
        address: 'ঢাকা, বাংলাদেশ',
        admissionDate: '২০২৫-০১-১০',
        status: 'active',
        photoUrl: 'https://picsum.photos/seed/student1/100/100'
      },
      {
        id: 'NM-1002',
        name: 'ওমর ফারুক',
        className: 'নূরানী-১ম',
        roll: '১৫',
        accessCode: 'NM-1002',
        fatherName: 'ইব্রাহিম আলী',
        motherName: 'খাদিজা খাতুন',
        phone: '০১৮১২৩৪৫৬৭৮',
        address: 'ঢাকা, বাংলাদেশ',
        admissionDate: '২০২৫-০১-১২',
        status: 'active',
        photoUrl: 'https://picsum.photos/seed/student2/100/100'
      }
    ]);
  }, []);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStudent) {
      const updatedStudents = students.map(s => 
        s.id === editingStudent.id 
          ? { 
              ...s, 
              name: formData.name,
              className: formData.className,
              roll: formData.roll,
              fatherName: formData.fatherName,
              motherName: formData.motherName,
              phone: formData.phone,
              address: formData.address,
              photoUrl: formData.photoPreview || s.photoUrl
            } 
          : s
      );
      setStudents(updatedStudents);
      toast.success('ছাত্রের তথ্য সফলভাবে আপডেট করা হয়েছে!');
    } else {
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
        photoUrl: formData.photoPreview || 'https://picsum.photos/seed/placeholder/100/100',
      };
      setStudents([newStudent, ...students]);
      toast.success('ছাত্র সফলভাবে যোগ করা হয়েছে!');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      className: student.className,
      roll: student.roll,
      fatherName: student.fatherName || '',
      motherName: student.motherName || '',
      phone: student.phone,
      address: student.address || '',
      photo: null,
      photoPreview: student.photoUrl || '',
      residentialStatus: 'অনাবাসিক',
      previousSchool: '',
      previousEducationHistory: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে আপনি এই ছাত্রটিকে ডিলিট করতে চান?')) {
      setStudents(students.filter(s => s.id !== id));
      toast.success('ছাত্র সফলভাবে ডিলিট করা হয়েছে!');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      className: 'নূরানী-১ম',
      roll: '',
      fatherName: '',
      motherName: '',
      phone: '',
      address: '',
      photo: null,
      photoPreview: '',
      residentialStatus: 'অনাবাসিক',
      previousSchool: '',
      previousEducationHistory: ''
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
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.roll.includes(searchTerm) ||
                         s.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'সব' || s.className === selectedClass;
    return matchesSearch && matchesClass;
  });

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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-islamic text-slate-900 mb-2">ছাত্র ব্যবস্থাপনা</h1>
          <p className="text-slate-500 font-medium">আপনার ছাত্রদের প্রোফাইল এবং আইডি কার্ড পরিচালনা করুন।</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="btn-smart-indigo flex items-center gap-2"
        >
          <Plus size={24} /> নতুন ছাত্র যোগ করুন
        </button>
      </div>

      {/* Filters */}
      <div className="card-3d p-6 flex flex-col md:flex-row gap-6">
        <div className="relative flex-grow">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input
            type="text"
            placeholder="নাম বা রোল দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-medium text-lg shadow-inner"
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-slate-600 shadow-inner"
          >
            <option value="সব">সব শ্রেণী</option>
            {['নূরানী-১ম', 'নূরানী-২য়', 'নূরানী-৩য়', 'হিফজ- নাজেরা', 'হিফজ', '৫ম শ্রেণী', 'মিযান', 'নাহবেমীর', 'হেদায়াতুন্নাহু', 'কাফিয়া', 'জালালাইন', 'মিশকাত', 'তাকমিল ফিল হাদীস'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:bg-slate-100 transition-all shadow-inner">
            <Filter size={24} />
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredStudents.map((student) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            key={student.id}
            className="card-3d p-0 overflow-hidden group"
          >
            <div className="p-8 flex items-center gap-6 border-b border-slate-50">
              <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-slate-100 shrink-0 shadow-lg border-4 border-white group-hover:scale-105 transition-transform">
                <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-xl font-black text-slate-900 truncate mb-1">{student.name}</h3>
                <p className="text-sm text-slate-500 font-bold">{student.className} • রোল: {student.roll}</p>
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">
                  <QrCode size={12} /> আইডি: {student.id}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleEdit(student)}
                  className="p-3 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all shadow-sm"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(student.id)}
                  className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shadow-sm"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ফোন</span>
                <span className="text-sm font-black text-slate-700">{student.phone}</span>
              </div>
              <button className="btn-3d text-[10px] py-2 px-4 uppercase tracking-widest">
                <Download size={14} /> আইডি কার্ড
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
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    {editingStudent ? 'ছাত্রের তথ্য পরিবর্তন' : 'নতুন ছাত্র যোগ করুন'}
                  </h2>
                  <p className="text-white/70 text-sm font-bold">
                    {editingStudent ? 'ছাত্রের তথ্য আপডেট করুন' : 'নতুন ছাত্র নিবন্ধনের জন্য তথ্য প্রদান করুন'}
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
                {/* Photo Upload */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[2rem] bg-slate-50 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden group-hover:border-primary/20 transition-all">
                      {formData.photoPreview ? (
                        <img src={formData.photoPreview} className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={40} className="text-slate-300" />
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all border-4 border-white">
                      <Plus size={24} />
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                    </label>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ছাত্রের ছবি আপলোড করুন</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পুরো নাম</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                      placeholder="যেমন: আবদুল্লাহ আল মামুন"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">শ্রেণী</label>
                    <select
                      value={formData.className}
                      onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-black text-slate-700 shadow-inner"
                    >
                      {['নূরানী-১ম', 'নূরানী-২য়', 'নূরানী-৩য়', 'হিফজ- নাজেরা', 'হিফজ', '৫ম শ্রেণী', 'মিযান', 'নাহবেমীর', 'হেদায়াতুন্নাহু', 'কাফিয়া', 'জালালাইন', 'মিশকাত', 'তাকমিল ফিল হাদীস'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">রোল নম্বর</label>
                    <input
                      type="text"
                      required
                      value={formData.roll}
                      onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                      placeholder="যেমন: ১২"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ফোন নম্বর</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                      placeholder="যেমন: ০১৭১২৩৪৫৬৭৮"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পিতার নাম</label>
                    <input
                      type="text"
                      required
                      value={formData.fatherName}
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">মাতার নাম</label>
                    <input
                      type="text"
                      required
                      value={formData.motherName}
                      onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">আবাসিক অবস্থা</label>
                    <select
                      value={formData.residentialStatus}
                      onChange={(e) => setFormData({ ...formData, residentialStatus: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-black text-slate-700 shadow-inner"
                    >
                      <option>অনাবাসিক</option>
                      <option>আবাসিক</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পূর্ববর্তী স্কুল</label>
                    <input
                      type="text"
                      value={formData.previousSchool}
                      onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                      placeholder="শেষ যে স্কুলে পড়েছেন"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পূর্ববর্তী শিক্ষার ইতিহাস</label>
                  <textarea
                    rows={3}
                    value={formData.previousEducationHistory}
                    onChange={(e) => setFormData({ ...formData, previousEducationHistory: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner resize-none"
                    placeholder="পূর্ববর্তী একাডেমিক ফলাফল সম্পর্কে বিস্তারিত..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পুরো ঠিকানা</label>
                  <textarea
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner resize-none"
                    placeholder="স্থায়ী ঠিকানা লিখুন"
                  />
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
                    <Check size={20} className="inline mr-2" /> সংরক্ষণ করুন
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
