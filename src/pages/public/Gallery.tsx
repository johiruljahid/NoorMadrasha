import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, Maximize2, Camera, Heart, Share2, ChevronRight, Play, Award } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{url: string, title: string, bnTitle: string} | null>(null);

  const images = [
    { url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200', title: 'Madrasha Building', bnTitle: 'মাদ্রাসা ভবন' },
    { url: 'https://images.unsplash.com/photo-1523050853063-bd80e295ce7f?auto=format&fit=crop&q=80&w=1200', title: 'Modern Classroom', bnTitle: 'আধুনিক ক্লাসরুম' },
    { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200', title: 'Islamic Library', bnTitle: 'ইসলামিক লাইব্রেরি' },
    { url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200', title: 'Annual Sports Day', bnTitle: 'বার্ষিক ক্রীড়া প্রতিযোগিতা' },
    { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200', title: 'Prize Giving Ceremony', bnTitle: 'পুরস্কার বিতরণী অনুষ্ঠান' },
    { url: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=1200', title: 'Grand Prayer Hall', bnTitle: 'বিশাল প্রার্থনা হল' },
    { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200', title: 'Advanced Computer Lab', bnTitle: 'উন্নত কম্পিউটার ল্যাব' },
    { url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1200', title: 'Science Laboratory', bnTitle: 'বিজ্ঞান গবেষণাগার' },
    { url: 'https://images.unsplash.com/photo-1501333190703-43f1feb89670?auto=format&fit=crop&q=80&w=1200', title: 'Lush Green Garden', bnTitle: 'সবুজ বাগান' },
  ];

  return (
    <div className="flex flex-col bg-slate-50 overflow-hidden">
      {/* Hero Section with 3D Background */}
      <section className="relative pt-40 pb-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=2000" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/80 to-slate-50"></div>
          <div className="absolute inset-0 islamic-pattern-premium opacity-10"></div>
          
          {/* Animated Blobs */}
          <div className="shape-blob w-[35rem] h-[35rem] bg-accent/20 top-0 -left-32"></div>
          <div className="shape-blob w-[35rem] h-[35rem] bg-primary/30 bottom-0 -right-32 animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 lg:gap-4 px-6 lg:px-10 py-3 lg:py-4 rounded-full bg-gradient-to-r from-primary-dark/60 to-transparent backdrop-blur-2xl border-2 border-accent/30 mb-8 lg:mb-12 floating-3d shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <Camera size={20} className="text-accent animate-pulse lg:w-7 lg:h-7" />
              <span className="uppercase tracking-[0.2em] lg:tracking-[0.4em] font-black text-[10px] lg:text-sm text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                গ্যালারি • <span className="text-accent">OUR VISUAL JOURNEY</span>
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white mb-8 lg:mb-10 leading-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              স্মরণীয় <br />
              <span className="text-accent text-3d-premium">মুহূর্তসমূহ</span>
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-bold drop-shadow-xl">
              নূর মাদ্রাসার প্রাণবন্ত ক্যাম্পাস জীবন, আধুনিক সুযোগ-সুবিধা এবং বিভিন্ন অনুষ্ঠানের এক ঝলক দেখে নিন আমাদের গ্যালারিতে।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid with 3D Cards */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full -mt-48 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -20, rotateY: 8, scale: 1.02 }}
              onClick={() => setSelectedImage(img)}
              className="card-3d-neo p-6 bg-white/95 backdrop-blur-2xl cursor-pointer group relative overflow-hidden border-4 border-transparent hover:border-accent/30 shadow-[0_50px_100px_rgba(0,0,0,0.1)]"
            >
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative shadow-2xl border-4 border-white">
                <img 
                  src={img.url} 
                  alt={img.bnTitle} 
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000" 
                  referrerPolicy="no-referrer" 
                />
                {/* Overlay with 3D Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="flex justify-between items-end"
                  >
                    <div>
                      <h3 className="text-white font-black text-3xl mb-2 drop-shadow-2xl">{img.bnTitle}</h3>
                      <p className="text-accent text-[10px] font-black tracking-[0.4em] uppercase opacity-90">{img.title}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/30 shadow-2xl hover:bg-accent hover:text-primary-dark transition-all duration-500">
                        <Maximize2 size={24} />
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Quick Actions Badge */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-10 group-hover:translate-x-0">
                  <button className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-rose-500 transition-all duration-500 shadow-2xl">
                    <Heart size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all duration-500 shadow-2xl">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox with Premium Design */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative max-w-7xl w-full h-full max-h-[90vh] rounded-[4rem] overflow-hidden shadow-[0_0_200px_rgba(0,0,0,0.9)] border-8 border-white/10 bg-black/40"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-10 right-10 p-6 bg-white/10 hover:bg-accent text-white rounded-[2rem] backdrop-blur-2xl z-20 transition-all border border-white/10 shadow-2xl group"
              >
                <X size={40} className="group-hover:rotate-90 transition-transform" />
              </button>
              
              <div className="w-full h-full relative flex items-center justify-center p-10">
                <img 
                  src={selectedImage.url} 
                  className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl" 
                  alt={selectedImage.bnTitle}
                  referrerPolicy="no-referrer" 
                />
                
                {/* Info Bar with Glassmorphism */}
                <div className="absolute bottom-0 left-0 w-full p-16 md:p-24 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-10"
                  >
                    <div className="w-2 h-24 bg-accent rounded-full shadow-[0_0_30px_rgba(242,125,38,0.6)]"></div>
                    <div>
                      <h2 className="text-6xl font-black text-white mb-3 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">{selectedImage.bnTitle}</h2>
                      <p className="text-accent text-sm font-black tracking-[0.5em] uppercase opacity-90">{selectedImage.title}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/5 -skew-y-6 origin-left scale-110"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            {[
              { label: 'Photos', val: '৫০০+', icon: ImageIcon, color: 'text-blue-500' },
              { label: 'Events', val: '৫০+', icon: Sparkles, color: 'text-amber-500' },
              { label: 'Memories', val: '১০০০+', icon: Heart, color: 'text-rose-500' },
              { label: 'Awards', val: '১০+', icon: Award, color: 'text-emerald-500' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-115 group-hover:rotate-12 transition-all duration-500 border-4 border-transparent hover:border-accent/20">
                  <stat.icon size={48} className={stat.color} />
                </div>
                <h4 className="text-5xl font-black text-primary-dark mb-3 group-hover:text-accent transition-colors">{stat.val}</h4>
                <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA with 3D Effect */}
      <section className="py-48 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-dark/95"></div>
          <div className="absolute inset-0 islamic-pattern-premium opacity-10"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-3d-neo bg-white/5 backdrop-blur-3xl border-white/10 p-20 shadow-[0_100px_200px_rgba(0,0,0,0.5)]"
          >
            <h2 className="text-6xl font-black text-white mb-10 leading-tight">আমাদের ক্যাম্পাস <br /><span className="text-accent text-3d-premium">ঘুরে দেখতে চান?</span></h2>
            <p className="text-white/70 text-2xl mb-14 font-bold leading-relaxed max-w-3xl mx-auto">
              সরাসরি আমাদের ক্যাম্পাস পরিদর্শনের জন্য আমন্ত্রণ রইল। আমাদের পরিবেশ এবং শিক্ষা পদ্ধতি সম্পর্কে আরও জানতে আজই যোগাযোগ করুন।
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="btn-premium-gold px-16 py-7 text-2xl shadow-[0_30px_60px_rgba(242,125,38,0.4)]"
              >
                সরাসরি যোগাযোগ করুন
              </button>
              <button className="btn-premium-3d bg-white/10 border-white/20 hover:bg-white/20 px-16 py-7 text-2xl group">
                <span>ভার্চুয়াল ট্যুর</span>
                <Play size={28} className="ml-4 inline group-hover:scale-125 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



