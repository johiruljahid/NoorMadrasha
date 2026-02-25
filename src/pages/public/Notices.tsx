import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Calendar, 
  Tag, 
  Download, 
  FileText, 
  Search, 
  X, 
  ArrowRight,
  Paperclip,
  ChevronRight
} from 'lucide-react';
import { noticeService } from '../../services/noticeService';
import { Notice } from '../../types';

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  useEffect(() => {
    // Only show public notices
    setNotices(noticeService.getNotices().filter(n => n.isPublic));
  }, []);

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-accent font-black uppercase tracking-[0.4em] text-sm mb-4 block">নোটিশ বোর্ড | NOTICE BOARD</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8">সর্বশেষ <span className="text-primary">সংবাদ ও নোটিশ</span></h1>
            <div className="w-48 h-2 bg-gradient-to-r from-primary to-accent mx-auto rounded-full shadow-lg"></div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={28} />
            <input
              type="text"
              placeholder="নোটিশ খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white border-4 border-transparent focus:border-primary/10 outline-none font-bold text-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all"
            />
          </div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotices.map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedNotice(notice)}
              className="card-3d-neo p-8 cursor-pointer group bg-white/80 backdrop-blur-xl border-2 border-transparent hover:border-primary/20 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                  notice.category === 'exam' ? 'bg-rose-500 text-white' :
                  notice.category === 'holiday' ? 'bg-emerald-500 text-white' :
                  'bg-primary text-white'
                }`}>
                  <Bell size={28} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={14} /> {notice.date}
                </span>
              </div>

              <div className="mb-6">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm mb-4 inline-block ${
                  notice.category === 'exam' ? 'bg-rose-100 text-rose-600' :
                  notice.category === 'holiday' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-primary/10 text-primary'
                }`}>
                  {notice.category === 'exam' ? 'পরীক্ষা' : 
                   notice.category === 'holiday' ? 'ছুটি' : 
                   notice.category === 'admission' ? 'ভর্তি' : 'সাধারণ'}
                </span>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">{notice.title}</h3>
              </div>

              <p className="text-slate-500 font-medium leading-relaxed line-clamp-3 mb-8">{notice.content}</p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="text-primary font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  বিস্তারিত দেখুন <ChevronRight size={16} />
                </span>
                {notice.fileName && (
                  <div className="p-2 bg-primary/5 text-primary rounded-lg">
                    <Paperclip size={18} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Bell size={48} />
            </div>
            <p className="text-slate-400 font-black text-2xl">কোনো নোটিশ পাওয়া যায়নি</p>
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNotice(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-12">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl ${
                      selectedNotice.category === 'exam' ? 'bg-rose-500 text-white' :
                      selectedNotice.category === 'holiday' ? 'bg-emerald-500 text-white' :
                      'bg-primary text-white'
                    }`}>
                      <Bell size={40} />
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          selectedNotice.category === 'exam' ? 'bg-rose-100 text-rose-600' :
                          selectedNotice.category === 'holiday' ? 'bg-emerald-100 text-emerald-600' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {selectedNotice.category === 'exam' ? 'পরীক্ষা' : 
                           selectedNotice.category === 'holiday' ? 'ছুটি' : 
                           selectedNotice.category === 'admission' ? 'ভর্তি' : 'সাধারণ'}
                        </span>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Calendar size={16} /> {selectedNotice.date}
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{selectedNotice.title}</h2>
                    </div>
                  </div>
                  <button onClick={() => setSelectedNotice(null)} className="p-4 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                    <X size={28} />
                  </button>
                </div>

                <div className="prose prose-slate max-w-none mb-12">
                  <p className="text-xl text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                    {selectedNotice.content}
                  </p>
                </div>

                {selectedNotice.fileName && (
                  <div className="p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                        <FileText size={32} />
                      </div>
                      <div>
                        <p className="text-slate-900 font-black text-lg">{selectedNotice.fileName}</p>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">সংযুক্ত ফাইল</p>
                      </div>
                    </div>
                    <a 
                      href={selectedNotice.fileUrl} 
                      download
                      className="btn-premium-3d py-4 px-10 flex items-center gap-3 text-lg"
                    >
                      <Download size={24} /> ডাউনলোড করুন
                    </a>
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={() => setSelectedNotice(null)}
                    className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs hover:text-primary transition-colors"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
