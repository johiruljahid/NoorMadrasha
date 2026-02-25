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
  Tag,
  Upload,
  Paperclip,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { Notice } from '../../types';
import { noticeService } from '../../services/noticeService';

export default function NoticeManagement() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general' as Notice['category'],
    isPublic: true,
    fileName: '',
    fileUrl: ''
  });

  useEffect(() => {
    setNotices(noticeService.getNotices());
  }, []);

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    noticeService.addNotice({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      isPublic: formData.isPublic,
      fileName: formData.fileName,
      fileUrl: formData.fileUrl
    });

    setNotices(noticeService.getNotices());
    setIsModalOpen(false);
    setFormData({ title: '', content: '', category: 'general', isPublic: true, fileName: '', fileUrl: '' });
    toast.success('নোটিশ সফলভাবে প্রকাশ করা হয়েছে!');
  };

  const togglePublic = (id: string) => {
    setNotices(notices.map(n => n.id === id ? { ...n, isPublic: !n.isPublic } : n));
    toast.success('দৃশ্যমানতা আপডেট করা হয়েছে');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে আপনি এই নোটিশটি মুছে ফেলতে চান?')) {
      noticeService.deleteNotice(id);
      setNotices(noticeService.getNotices());
      toast.success('নোটিশ মুছে ফেলা হয়েছে');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock file upload
      setFormData({
        ...formData,
        fileName: file.name,
        fileUrl: '#' // In a real app, this would be the uploaded file URL
      });
      toast.success('ফাইল সংযুক্ত করা হয়েছে');
    }
  };

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <img 
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=2000" 
          alt="Islamic Madrasa" 
          className="w-full h-full object-cover opacity-[0.03]"
          referrerPolicy="no-referrer"
        />
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
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">নোটিশ ব্যবস্থাপনা</h1>
          <p className="text-slate-500 font-medium">ছাত্র এবং শিক্ষকদের জন্য নোটিশ প্রকাশ ও পরিচালনা করুন।</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn-3d py-4 px-8 bg-primary text-white border-primary-dark font-black uppercase tracking-widest text-xs"
        >
          <Plus size={20} /> নতুন নোটিশ তৈরি করুন
        </button>
      </div>

      <div className="card-3d p-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input
            type="text"
            placeholder="নোটিশের শিরোনাম দিয়ে সার্চ করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-medium text-lg shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredNotices.map((notice) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            key={notice.id}
            className={`card-3d p-10 border-l-8 ${notice.isPublic ? 'border-l-primary' : 'border-l-slate-300'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl shadow-sm ${notice.isPublic ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                  <Bell size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <Calendar size={12} /> {notice.date}
                    </span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-1.5 bg-primary/5 px-2 py-0.5 rounded-full">
                      <Tag size={12} /> {notice.category === 'exam' ? 'পরীক্ষা' : notice.category === 'holiday' ? 'ছুটি' : notice.category === 'admission' ? 'ভর্তি' : 'সাধারণ'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => togglePublic(notice.id)}
                  className={`p-3 rounded-xl transition-all shadow-sm ${notice.isPublic ? 'text-primary bg-primary/5 hover:bg-primary/10' : 'text-slate-400 bg-slate-50 hover:bg-slate-100'}`}
                >
                  {notice.isPublic ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                <button className="p-3 text-slate-400 bg-slate-50 hover:text-primary hover:bg-primary/5 rounded-xl transition-all shadow-sm">
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(notice.id)}
                  className="p-3 text-slate-400 bg-slate-50 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shadow-sm"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{notice.title}</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-6 font-medium">{notice.content}</p>
            
            {notice.fileName && (
              <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-4 py-2 rounded-xl w-fit mb-6">
                <Paperclip size={16} />
                {notice.fileName}
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${notice.isPublic ? 'text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full' : 'text-slate-400 bg-slate-50 px-3 py-1 rounded-full'}`}>
                {notice.isPublic ? 'পাবলিক নোটিশ' : 'অভ্যন্তরীণ নোটিশ'}
              </span>
              <button className="text-sm font-black text-primary hover:underline uppercase tracking-widest">পুরো নোটিশ পড়ুন</button>
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
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">নতুন নোটিশ প্রকাশ করুন</h2>
                  <p className="text-white/70 text-sm font-bold">একটি নতুন ঘোষণা প্রকাশ করুন</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddNotice} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">নোটিশের শিরোনাম</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner"
                    placeholder="যেমন: বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">বিভাগ</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-black text-slate-700 shadow-inner"
                    >
                      <option value="general">সাধারণ</option>
                      <option value="admission">ভর্তি</option>
                      <option value="exam">পরীক্ষা</option>
                      <option value="holiday">ছুটি</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">দৃশ্যমানতা</label>
                    <div className="flex items-center gap-4 h-14">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={formData.isPublic}
                            onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                            className="peer sr-only"
                          />
                          <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:bg-primary transition-all duration-300 shadow-inner"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-all duration-300 shadow-md"></div>
                        </div>
                        <span className="text-sm font-black text-slate-600 uppercase tracking-widest">পাবলিক ওয়েবসাইট</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">নোটিশের বিস্তারিত</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner resize-none"
                    placeholder="নোটিশের বিস্তারিত এখানে লিখুন..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ফাইল সংযুক্ত করুন (ঐচ্ছিক)</label>
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-3 w-full px-6 py-8 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group"
                    >
                      {formData.fileName ? (
                        <div className="flex items-center gap-3 text-primary font-bold">
                          <Paperclip size={24} />
                          <span>{formData.fileName}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-primary transition-colors">
                          <Upload size={32} />
                          <span className="font-black text-[10px] uppercase tracking-widest">ফাইল আপলোড করতে ক্লিক করুন</span>
                        </div>
                      )}
                    </label>
                  </div>
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
                    <Save size={20} className="inline mr-2" /> প্রকাশ করুন
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
