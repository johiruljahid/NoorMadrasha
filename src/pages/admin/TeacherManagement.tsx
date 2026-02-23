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

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    designation: 'Assistant Teacher',
    phone: '',
    salary: '',
    photoPreview: ''
  });

  useEffect(() => {
    setTeachers([
      {
        id: 'T101',
        name: 'Maulana Ahmedullah',
        subject: 'Arabic & Fiqh',
        designation: 'Principal',
        phone: '01711111111',
        salary: 45000,
        joinDate: '2010-05-15',
        photoUrl: 'https://picsum.photos/seed/teacher1/100/100'
      },
      {
        id: 'T102',
        name: 'Hafiz Abdur Rahim',
        subject: 'Quran Hifz',
        designation: 'Senior Teacher',
        phone: '01822222222',
        salary: 35000,
        joinDate: '2015-02-10',
        photoUrl: 'https://picsum.photos/seed/teacher2/100/100'
      }
    ]);
  }, []);

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
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
    setIsModalOpen(false);
    resetForm();
    toast.success('Teacher added successfully!');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      designation: 'Assistant Teacher',
      phone: '',
      salary: '',
      photoPreview: ''
    });
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-islamic text-slate-900 mb-1">Teacher Management</h1>
          <p className="text-slate-500">Manage your faculty members and their profiles.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="btn-primary"
        >
          <Plus size={20} /> Add New Teacher
        </button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={teacher.id}
            className="card p-0 overflow-hidden group"
          >
            <div className="p-8 flex flex-col items-center text-center border-b border-slate-50">
              <div className="w-24 h-24 rounded-3xl overflow-hidden bg-slate-100 mb-6 shadow-lg">
                <img src={teacher.photoUrl} alt={teacher.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{teacher.name}</h3>
              <p className="text-primary font-bold text-sm mb-4">{teacher.designation}</p>
              
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {teacher.subject}
                </span>
                <span className="px-3 py-1 bg-emerald-50 rounded-full text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                  {formatCurrency(teacher.salary)}
                </span>
              </div>
            </div>
            
            <div className="p-4 grid grid-cols-2 gap-2 bg-slate-50/50">
              <button className="flex items-center justify-center gap-2 p-2 text-slate-600 hover:text-primary hover:bg-white rounded-xl transition-all text-sm font-bold">
                <Phone size={16} /> Call
              </button>
              <button className="flex items-center justify-center gap-2 p-2 text-slate-600 hover:text-primary hover:bg-white rounded-xl transition-all text-sm font-bold">
                <Edit2 size={16} /> Edit
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
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <h2 className="text-xl font-islamic font-bold">Add New Teacher</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddTeacher} className="p-8 overflow-y-auto space-y-8">
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
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setFormData({ ...formData, photoPreview: URL.createObjectURL(file) });
                      }} />
                    </label>
                  </div>
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
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Main Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Designation</label>
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="input-field"
                    >
                      <option value="Principal">Principal</option>
                      <option value="Vice Principal">Vice Principal</option>
                      <option value="Senior Teacher">Senior Teacher</option>
                      <option value="Assistant Teacher">Assistant Teacher</option>
                      <option value="Hafiz">Hafiz</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Monthly Salary (BDT)</label>
                    <input
                      type="number"
                      required
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="input-field"
                    />
                  </div>
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
                    <Check size={20} /> Save Teacher
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
