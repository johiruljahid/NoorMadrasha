import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Shield, Award, Users, BookOpen, Heart, Sparkles, GraduationCap, History, Star, Zap, ChevronRight, Globe, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col bg-slate-50 overflow-hidden">
      {/* Hero Section with Advanced 3D Background */}
      <section className="relative pt-40 pb-72 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050853063-bd80e295ce7f?auto=format&fit=crop&q=80&w=2000" 
            alt="Madrasha Background" 
            className="w-full h-full object-cover opacity-30 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/80 to-slate-50"></div>
          <div className="absolute inset-0 islamic-pattern-premium opacity-10"></div>
          
          {/* Floating 3D Elements */}
          <motion.div 
            animate={{ 
              y: [0, -60, 0],
              rotate: [0, 15, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              y: [0, 80, 0],
              rotate: [0, -20, 0],
              scale: [1, 1.25, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-10 w-[40rem] h-[40rem] bg-primary/30 rounded-full blur-[150px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 lg:gap-4 px-6 lg:px-10 py-3 lg:py-4 rounded-full bg-gradient-to-r from-primary-dark/60 to-transparent backdrop-blur-2xl border-2 border-accent/30 mb-8 lg:mb-12 floating-3d shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <Sparkles size={20} className="text-accent animate-pulse lg:w-7 lg:h-7" />
              <span className="uppercase tracking-[0.2em] lg:tracking-[0.4em] font-black text-[10px] lg:text-sm text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                আমাদের সম্পর্কে • <span className="text-accent">আমাদের ঐতিহ্য</span>
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl md:text-[10rem] font-black text-white mb-8 lg:mb-10 leading-tight drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              নূর মাদ্রাসার <br />
              <span className="text-accent text-3d-premium">গৌরবময় পথচলা</span>
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl md:text-4xl text-white/80 max-w-5xl mx-auto leading-relaxed font-bold drop-shadow-xl">
              একটি আদর্শ দ্বীনি শিক্ষা প্রতিষ্ঠান যেখানে আধুনিক শিক্ষার সাথে ইসলামী মূল্যবোধের এক অপূর্ব সমন্বয় ঘটে।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision - 3D Bento Grid Style */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full -mt-56 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div 
            whileHover={{ y: -25, rotateX: 10, rotateY: -8 }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80 }}
            className="card-3d-neo p-16 bg-white/95 backdrop-blur-2xl group relative overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] border-8 border-white/40"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[10rem] -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="w-28 h-28 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary mb-12 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-700 border border-primary/10">
              <Target size={56} />
            </div>
            <h2 className="text-6xl font-black text-primary-dark mb-6">আমাদের লক্ষ্য</h2>
            <p className="text-accent text-xs font-black tracking-[0.5em] uppercase mb-10 opacity-60">আমাদের কৌশলগত লক্ষ্য</p>
            <p className="text-slate-600 text-2xl leading-relaxed font-bold">
              আমাদের লক্ষ্য হলো শিক্ষার্থীদের এমনভাবে গড়ে তোলা যাতে তারা দ্বীনি ও দুনিয়াবী উভয় শিক্ষায় পারদর্শী হয়ে দেশ ও জাতির কল্যাণে কাজ করতে পারে। আমরা চাই প্রতিটি শিক্ষার্থী যেন একজন আদর্শ মানুষ হিসেবে সমাজে প্রতিষ্ঠিত হয়।
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -25, rotateX: 10, rotateY: 8 }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80 }}
            className="card-3d-neo p-16 bg-white/95 backdrop-blur-2xl group relative overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] border-8 border-white/40"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-bl-[10rem] -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="w-28 h-28 bg-accent/10 rounded-[2.5rem] flex items-center justify-center text-accent mb-12 shadow-inner group-hover:bg-accent group-hover:text-primary-dark transition-all duration-700 border border-accent/10">
              <Eye size={56} />
            </div>
            <h2 className="text-6xl font-black text-primary-dark mb-6">আমাদের ভিশন</h2>
            <p className="text-accent text-xs font-black tracking-[0.5em] uppercase mb-10 opacity-60">আমাদের ভবিষ্যৎ দৃষ্টিভঙ্গি</p>
            <p className="text-slate-600 text-2xl leading-relaxed font-bold">
              একটি আধুনিক ও যুগোপযোগী ইসলামী শিক্ষা ব্যবস্থা গড়ে তোলা, যেখানে কুরআন-সুন্নাহর শিক্ষার পাশাপাশি বিজ্ঞান ও প্রযুক্তির সমন্বয় থাকবে। আমরা এমন একটি প্রজন্ম তৈরি করতে চাই যারা নৈতিকতা ও মেধার দিক থেকে হবে অনন্য।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values with 3D Floating Cards */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/5 -skew-y-6 origin-left scale-110"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl font-black text-primary-dark mb-8">আমাদের মূল বৈশিষ্ট্যসমূহ</h2>
              <p className="text-accent text-sm font-black tracking-[0.6em] uppercase opacity-80">মূল মূল্যবোধ ও অনন্য বৈশিষ্ট্য</p>
              <div className="w-40 h-3 bg-accent mx-auto mt-12 rounded-full shadow-[0_10px_30px_rgba(242,125,38,0.5)]"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Shield, title: 'নৈতিকতা', enTitle: 'Integrity', desc: 'কুরআন ও সুন্নাহর আলোকে চরিত্র গঠন।', color: 'bg-emerald-500', delay: 0 },
              { icon: Award, title: 'শ্রেষ্ঠত্ব', enTitle: 'Excellence', desc: 'শিক্ষায় সর্বোচ্চ মান নিশ্চিতকরণ।', color: 'bg-amber-500', delay: 0.1 },
              { icon: BookOpen, title: 'আধুনিক শিক্ষা', enTitle: 'Modern Education', desc: 'বিজ্ঞান ও প্রযুক্তির সমন্বয়।', color: 'bg-blue-500', delay: 0.2 },
              { icon: Heart, title: 'সেবা', enTitle: 'Service', desc: 'মানবতার কল্যাণে নিবেদিত প্রাণ।', color: 'bg-rose-500', delay: 0.3 },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: value.delay }}
                whileHover={{ y: -20, rotateY: 20, scale: 1.05 }}
                className="card-3d-neo p-12 text-center group bg-white/95 backdrop-blur-2xl border-4 border-transparent hover:border-accent/20 shadow-[0_40px_80px_rgba(0,0,0,0.1)]"
              >
                <div className={`w-24 h-24 ${value.color} rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-[0_25px_50px_rgba(0,0,0,0.2)] group-hover:rotate-[25deg] transition-transform duration-700`}>
                  <value.icon size={48} />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-3">{value.title}</h3>
                <p className="text-accent text-[10px] font-black tracking-[0.4em] uppercase mb-8 opacity-60">{value.enTitle}</p>
                <p className="text-slate-500 font-bold text-xl leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Premium Glassmorphism */}
      <section className="py-48 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-dark/95"></div>
          <div className="absolute inset-0 islamic-pattern-premium opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, type: "spring", damping: 12 }}
              className="text-center group"
            >
              <div className="w-28 h-28 bg-white/5 rounded-[3rem] flex items-center justify-center text-accent mx-auto mb-10 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] group-hover:bg-accent group-hover:text-primary-dark transition-all duration-700 group-hover:scale-115 group-hover:rotate-12">
                <Users size={56} />
              </div>
              <div className="text-7xl font-black text-white mb-4 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">৫০০+</div>
              <div className="text-accent font-black text-2xl mb-2">মোট শিক্ষার্থী</div>
              <div className="text-white/40 text-[10px] font-black tracking-[0.5em] uppercase">মোট শিক্ষার্থী</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, type: "spring", damping: 12 }}
              className="text-center group"
            >
              <div className="w-28 h-28 bg-white/5 rounded-[3rem] flex items-center justify-center text-accent mx-auto mb-10 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] group-hover:bg-accent group-hover:text-primary-dark transition-all duration-700 group-hover:scale-115 group-hover:rotate-12">
                <GraduationCap size={56} />
              </div>
              <div className="text-7xl font-black text-white mb-4 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">৩০+</div>
              <div className="text-accent font-black text-2xl mb-2">অভিজ্ঞ শিক্ষক</div>
              <div className="text-white/40 text-[10px] font-black tracking-[0.5em] uppercase">দক্ষ শিক্ষকবৃন্দ</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", damping: 12 }}
              className="text-center group"
            >
              <div className="w-28 h-28 bg-white/5 rounded-[3rem] flex items-center justify-center text-accent mx-auto mb-10 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] group-hover:bg-accent group-hover:text-primary-dark transition-all duration-700 group-hover:scale-115 group-hover:rotate-12">
                <Lightbulb size={56} />
              </div>
              <div className="text-7xl font-black text-white mb-4 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">১২+</div>
              <div className="text-accent font-black text-2xl mb-2">কোর্সসমূহ</div>
              <div className="text-white/40 text-[10px] font-black tracking-[0.5em] uppercase">মোট কোর্স</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, type: "spring", damping: 12 }}
              className="text-center group"
            >
              <div className="w-28 h-28 bg-white/5 rounded-[3rem] flex items-center justify-center text-accent mx-auto mb-10 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] group-hover:bg-accent group-hover:text-primary-dark transition-all duration-700 group-hover:scale-115 group-hover:rotate-12">
                <Star size={56} />
              </div>
              <div className="text-7xl font-black text-white mb-4 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">১০০%</div>
              <div className="text-accent font-black text-2xl mb-2">সাফল্যের হার</div>
              <div className="text-white/40 text-[10px] font-black tracking-[0.5em] uppercase">সাফল্যের হার</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section with 3D Image Frame */}
      <section className="py-48 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-16 bg-accent/20 rounded-[5rem] blur-[100px]"></div>
            
            {/* Main Image Frame */}
            <div className="relative card-3d-neo p-8 bg-white/40 backdrop-blur-3xl border-white/40 overflow-hidden group shadow-[0_80px_150px_rgba(0,0,0,0.3)] border-8">
              <img 
                src="https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=1000" 
                alt="Madrasha Student Studying" 
                className="rounded-[4rem] w-full h-[600px] object-cover shadow-2xl group-hover:scale-115 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end p-20">
                <div className="flex items-center gap-6">
                  <History size={48} className="text-accent" />
                  <p className="text-white font-black text-4xl drop-shadow-2xl">আমাদের ঐতিহ্যের এক ঝলক</p>
                </div>
              </div>
            </div>

            {/* Secondary Floating Image */}
            <motion.div
              animate={{ 
                y: [0, 30, 0],
                x: [0, -20, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -left-16 w-64 h-64 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden z-30 hidden xl:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?auto=format&fit=crop&q=80&w=500" 
                alt="Student Reading" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -40, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -right-20 bg-accent text-primary-dark p-16 rounded-[4.5rem] shadow-[0_40px_80px_rgba(242,125,38,0.5)] border-[12px] border-white z-20"
            >
              <div className="text-7xl font-black mb-2">১০+</div>
              <div className="text-lg font-black uppercase tracking-[0.3em]">বছরের অভিজ্ঞতা</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-12"
          >
            <div className="inline-flex items-center gap-4 px-8 py-3 bg-primary/10 rounded-2xl text-primary text-sm font-black uppercase tracking-[0.4em] shadow-inner border border-primary/10">
              <Star size={24} className="text-accent animate-pulse" />
              <span>আমাদের যাত্রা</span>
            </div>
            <h2 className="text-7xl md:text-8xl font-black text-primary-dark leading-tight">আমাদের দীর্ঘ পথচলা ও <br /><span className="text-accent text-3d-premium">সাফল্যের ইতিহাস</span></h2>
            <div className="w-40 h-3 bg-accent rounded-full shadow-xl"></div>
            <p className="text-slate-600 text-3xl leading-relaxed font-bold">
              ২০১৫ সালে মাত্র কয়েকজন শিক্ষার্থী নিয়ে নূর মাদ্রাসার যাত্রা শুরু হয়েছিল। আজ আমরা শত শত শিক্ষার্থীর পদচারণায় মুখরিত একটি পূর্ণাঙ্গ শিক্ষা প্রতিষ্ঠান।
            </p>
            <p className="text-slate-500 text-2xl leading-relaxed font-bold">
              আমাদের এই দীর্ঘ পথচলায় আমরা অসংখ্য মেধাবী শিক্ষার্থী তৈরি করেছি যারা আজ দেশ-বিদেশে সুনামের সাথে কাজ করছে। আমরা বিশ্বাস করি শিক্ষা কেবল পুঁথিগত বিদ্যা নয়, বরং এটি একটি জীবনব্যাপী প্রক্রিয়া।
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, x: 15 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium-gold px-16 py-7 text-3xl shadow-[0_30px_60px_rgba(242,125,38,0.4)] group"
            >
              <span>আরও জানুন</span>
              <ChevronRight size={32} className="ml-4 inline group-hover:translate-x-3 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Values Section with 3D Grid */}
      <section className="py-48 bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-premium opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-7xl font-black text-white mb-8">আমরা যা বিশ্বাস করি</h2>
            <p className="text-accent text-sm font-black tracking-[0.6em] uppercase opacity-80">আমাদের মূল বিশ্বাস ও দর্শন</p>
            <div className="w-40 h-3 bg-accent mx-auto mt-12 rounded-full shadow-2xl"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: 'সুন্নাহর অনুসরণ', desc: 'প্রতিটি কাজে রাসূল (সা.)-এর সুন্নাহর প্রতিফলন ঘটানো।', icon: Shield },
              { title: 'আধুনিকতা', desc: 'ইসলামী শিক্ষার সাথে আধুনিক বিজ্ঞানের মেলবন্ধন।', icon: Globe },
              { title: 'সামাজিক দায়বদ্ধতা', desc: 'সমাজের অসহায় মানুষের পাশে দাঁড়ানো ও সেবা করা।', icon: Heart },
            ].map((belief, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -25, scale: 1.02 }}
                className="p-16 rounded-[4rem] bg-white/5 border-4 border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-700 group shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
              >
                <div className="w-24 h-24 bg-accent/10 rounded-[2rem] flex items-center justify-center text-accent mb-12 group-hover:bg-accent group-hover:text-primary-dark transition-all duration-700 shadow-inner">
                  <belief.icon size={64} className="group-hover:scale-125 transition-transform duration-700" />
                </div>
                <h3 className="text-4xl font-black text-white mb-6">{belief.title}</h3>
                <p className="text-white/60 text-2xl font-bold leading-relaxed">{belief.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}




