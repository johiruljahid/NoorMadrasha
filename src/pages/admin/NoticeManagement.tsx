import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  X,
  Save,
  Calendar,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { Notice } from '../../types';

export default function NoticeManagement() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general' as Notice['category'],
    isPublic: true
  });

  useEffect(() => {
    setNotices([
      { id: '1', title: 'Admission Open for 2026 Session', content: 'Limited seats available for all classes. Apply now.', date: '2026-02-20', category: 'admission', isPublic: true },
      { id: '2', title: 'Ramadan Timing Update', content: 'Madrasha timing will be 8:00 AM to 1:00 PM during Ramadan.', date: '2026-02-18', category: 'general', isPublic: true },
      { id: '3', title: 'Staff Meeting Tomorrow', content: 'All teachers are requested to attend the meeting at 2:00 PM.', date: '2026-02-17', category: 'exam', isPublic: false },
    ]);
  }, []);

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: Notice = {
      id: String(notices.length + 1),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      isPublic: formData.isPublic,
      date: new Date().toISOString().split('T')[0]
    };

    setNotices([newNotice, ...notices]);
    setIsModalOpen(false);
    setFormData({ title: '', content: '', category: 'general', isPublic: true });
    toast.success('Notice published successfully!');
  };

  const togglePublic = (id: string) => {
    setNotices(notices.map(n => n.id === id ? { ...n, isPublic: !n.isPublic } : n));
    toast.success('Visibility updated');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-islamic text-slate-900 mb-1">Notice Management</h1>
          <p className="text-slate-500">Create and manage notices for students and public.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={20} /> Create New Notice
        </button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notices.map((notice) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={notice.id}
            className={`card p-8 border-l-4 ${notice.isPublic ? 'border-l-primary' : 'border-l-slate-300'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${notice.isPublic ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                  <Bell size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Calendar size={10} /> {notice.date}
                  </span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                    <Tag size={10} /> {notice.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => togglePublic(notice.id)}
                  className={`p-2 rounded-lg transition-all ${notice.isPublic ? 'text-primary hover:bg-primary/5' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                  {notice.isPublic ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all">
                  <Edit2 size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{notice.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">{notice.content}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${notice.isPublic ? 'text-emerald-600' : 'text-slate-400'}`}>
                {notice.isPublic ? 'Publicly Visible' : 'Internal Only'}
              </span>
              <button className="text-xs font-bold text-primary hover:underline">Read Full Notice</button>
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
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <h2 className="text-xl font-islamic font-bold">Create New Notice</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddNotice} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Notice Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Annual Sports Day 2026"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="input-field"
                    >
                      <option value="general">General</option>
                      <option value="admission">Admission</option>
                      <option value="exam">Examination</option>
                      <option value="holiday">Holiday</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Visibility</label>
                    <div className="flex items-center gap-4 h-12">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isPublic}
                          onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-bold text-slate-600">Public Website</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Notice Content</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Write the full notice content here..."
                  />
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
                    <Save size={20} /> Publish Notice
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
