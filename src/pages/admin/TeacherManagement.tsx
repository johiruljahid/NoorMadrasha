import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Phone, 
  Mail,
  X,
  Camera,
  Check,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { Teacher } from '../../types';
import { formatCurrency } from '../../lib/utils';

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    designation: 'সহকারী শিক্ষক',
    phone: '',
    salary: '',
    photoPreview: '',
    education: '',
    experience: '',
    email: ''
  });

  useEffect(() => {
    setTeachers([
      {
        id: 'T101',
        name: 'মাওলানা আহমেদউল্লাহ',
        subject: 'আরবি ও ফিকহ',
        designation: 'অধ্যক্ষ',
        phone: '০১৭১১১১১১১১',
        salary: 45000,
        joinDate: '২০১০-০৫-১৫',
        photoUrl: 'https://picsum.photos/seed/teacher1/100/100'
      },
      {
        id: 'T102',
        name: 'হাফেজ আবদুর রহিম',
        subject: 'কুরআন হিফজ',
        designation: 'সিনিয়র শিক্ষক',
        phone: '০১৮২২২২২২২২',
        salary: 35000,
        joinDate: '২০১৫-০২-১০',
        photoUrl: 'https://picsum.photos/seed/teacher2/100/100'
      }
    ]);
  }, []);

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      const updatedTeachers = teachers.map(t => 
        t.id === editingTeacher.id 
          ? { 
              ...t, 
              name: formData.name,
              subject: formData.subject,
              designation: formData.designation,
              phone: formData.phone,
              salary: Number(formData.salary),
              photoUrl: formData.photoPreview || t.photoUrl
            } 
          : t
      );
      setTeachers(updatedTeachers);
      toast.success('শিক্ষকের তথ্য সফলভাবে আপডেট করা হয়েছে!');
    } else {
      const newTeacher: Teacher = {
        id: `T${100 + teachers.length + 1}`,
        name: formData.name,
        subject: formData.subject,
        designation: formData.designation,
        phone: formData.phone,
        salary: Number(formData.salary),
        joinDate: new Date().toISOString().split('T')[0],
        photoUrl: formData.photoPreview || 'https://picsum.photos/seed/placeholder/100/100'
      };
      setTeachers([newTeacher, ...teachers]);
      toast.success('শিক্ষক সফলভাবে যোগ করা হয়েছে!');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      subject: teacher.subject,
      designation: teacher.designation,
      phone: teacher.phone,
      salary: teacher.salary.toString(),
      photoPreview: teacher.photoUrl || '',
      education: '',
      experience: '',
      email: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে আপনি এই শিক্ষককে ডিলিট করতে চান?')) {
      setTeachers(teachers.filter(t => t.id !== id));
      toast.success('শিক্ষক সফলভাবে ডিলিট করা হয়েছে!');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      designation: 'সহকারী শিক্ষক',
      phone: '',
      salary: '',
      photoPreview: '',
      education: '',
      experience: '',
      email: ''
    });
    setEditingTeacher(null);
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-4xl font-islamic text-slate-900 mb-2">শিক্ষক ব্যবস্থাপনা</h1>
          <p className="text-slate-500 font-medium">আপনার অনুষদ সদস্য এবং তাদের প্রোফাইল পরিচালনা করুন।</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="btn-smart-amber flex items-center gap-2"
        >
          <Plus size={24} /> নতুন শিক্ষক যোগ করুন
        </button>
      </div>

      <div className="card-3d p-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input
            type="text"
            placeholder="নাম বা বিষয় দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-medium text-lg shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredTeachers.map((teacher) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            key={teacher.id}
            className="card-3d p-0 overflow-hidden group"
          >
            <div className="p-10 flex flex-col items-center text-center border-b border-slate-50">
              <div className="w-28 h-28 rounded-[2rem] overflow-hidden bg-slate-100 mb-6 shadow-xl border-4 border-white group-hover:scale-105 transition-transform">
                <img src={teacher.photoUrl} alt={teacher.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">{teacher.name}</h3>
              <p className="text-primary font-black text-xs uppercase tracking-[0.2em] mb-6">{teacher.designation}</p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-sm">
                  {teacher.subject}
                </span>
                <span className="px-4 py-1.5 bg-emerald-50 rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-widest shadow-sm">
                  {formatCurrency(teacher.salary)}
                </span>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-4 bg-slate-50/50">
              <button 
                onClick={() => handleDelete(teacher.id)}
                className="btn-3d bg-rose-50 text-rose-600 border-rose-100 text-[10px] py-3 uppercase tracking-widest"
              >
                <Trash2 size={16} /> ডিলিট
              </button>
              <button 
                onClick={() => handleEdit(teacher)}
                className="btn-3d text-[10px] py-3 uppercase tracking-widest"
              >
                <Edit2 size={16} /> এডিট
              </button>
            </div>
          </motion.div>
        ))}
      </div>

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
                    {editingTeacher ? 'শিক্ষকের তথ্য পরিবর্তন' : 'নতুন শিক্ষক যোগ করুন'}
                  </h2>
                  <p className="text-white/70 text-sm font-bold">
                    {editingTeacher ? 'শিক্ষকের প্রোফাইল আপডেট করুন' : 'নতুন অনুষদ সদস্য নিবন্ধন করুন'}
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddTeacher} className="p-10 overflow-y-auto space-y-8 custom-scrollbar">
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
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setFormData({ ...formData, photoPreview: URL.createObjectURL(file) });
                      }} />
                    </label>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">শিক্ষকের ছবি আপলোড করুন</p>
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
                      placeholder="যেমন: মাওলানা আহমেদউল্লাহ"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">প্রধান বিষয়</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                      placeholder="যেমন: আরবি ও ফিকহ"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পদবী</label>
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-black text-slate-700 shadow-inner"
                    >
                      <option value="অধ্যক্ষ">অধ্যক্ষ</option>
                      <option value="উপাধ্যক্ষ">উপাধ্যক্ষ</option>
                      <option value="সিনিয়র শিক্ষক">সিনিয়র শিক্ষক</option>
                      <option value="সহকারী শিক্ষক">সহকারী শিক্ষক</option>
                      <option value="হাফেজ">হাফেজ</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ফোন নম্বর</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                      placeholder="যেমন: ০১৭১১১১১১১১"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ইমেইল ঠিকানা</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                      placeholder="teacher@example.com"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">মাসিক বেতন (টাকা)</label>
                    <input
                      type="number"
                      required
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">শিক্ষাগত যোগ্যতা</label>
                  <textarea
                    rows={3}
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner resize-none"
                    placeholder="যেমন: মাস্টার্স ইন ইসলামিক স্টাডিজ, আল-আজহার বিশ্ববিদ্যালয়"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">অভিজ্ঞতার বিবরণ</label>
                  <textarea
                    rows={3}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner resize-none"
                    placeholder="পূর্ববর্তী শিক্ষকতার অভিজ্ঞতা..."
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
