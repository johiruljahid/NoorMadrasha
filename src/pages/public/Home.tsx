import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle, 
  GraduationCap, 
  Users, 
  Calendar, 
  Bell, 
  Sparkles, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Globe, 
  Star, 
  Zap, 
  Award,
  X,
  Download,
  FileText,
  Paperclip,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { noticeService } from '../../services/noticeService';
import { Notice } from '../../types';

export default function Home() {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

  const features = [
    { 
      title: 'মানসম্মত শিক্ষা',
      icon: GraduationCap, 
      desc: 'ইসলামিক মূল্যবোধের সাথে আধুনিক একাডেমিক শিক্ষার এক অনন্য সমন্বয়।',
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-200'
    },
    { 
      title: 'দক্ষ শিক্ষক মন্ডলী',
      icon: Users, 
      desc: 'উচ্চ শিক্ষিত এবং নিবেদিতপ্রাণ ওলামায়ে কেরাম ও অভিজ্ঞ শিক্ষক মন্ডলী।',
      color: 'from-purple-500 to-fuchsia-600',
      shadow: 'shadow-purple-200'
    },
    { 
      title: 'স্মার্ট ম্যানেজমেন্ট',
      icon: CheckCircle, 
      desc: 'উপস্থিতি, ফলাফল এবং ফি-এর ডিজিটাল ট্র্যাকিং ও স্মার্ট মনিটরিং।',
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-200'
    },
  ];

  const notices = noticeService.getNotices().filter(n => n.isPublic).slice(0, 3);

  // Scroll lock when modal is open
  React.useEffect(() => {
    if (selectedNotice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedNotice]);

  return (
    <div className="flex flex-col bg-slate-50 overflow-hidden">
      {/* Hero Section - Grand & Premium */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.ourislam24.com/wp-content/uploads/2017/08/mohila-madrsa.jpg" 
            alt="Madrasha Background" 
            className="w-full h-full object-cover opacity-30 scale-105 blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/70 to-primary-dark/40"></div>
          <div className="absolute inset-0 islamic-pattern-premium opacity-30"></div>
          
          {/* Dynamic Glows */}
          <div className="glow-primary top-1/4 -left-32"></div>
          <div className="glow-accent bottom-1/4 right-0"></div>
          
          {/* Animated Blobs */}
          <div className="shape-blob bg-accent top-20 right-1/4 w-72 h-72"></div>
          <div className="shape-blob bg-emerald-400 bottom-20 left-1/4 w-96 h-96 animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
            <div className="inline-flex items-center gap-3 lg:gap-4 py-3 lg:py-4 px-6 lg:px-10 rounded-full bg-gradient-to-r from-primary-dark/60 to-transparent backdrop-blur-2xl border-2 border-accent/30 mb-8 lg:mb-12 floating-3d shadow-[0_30px_60px_rgba(0,0,0,0.5)] mx-auto lg:mx-0">
                <Sparkles size={20} className="text-accent animate-pulse lg:w-7 lg:h-7" /> 
                <span className="font-black tracking-[0.2em] lg:tracking-[0.3em] text-xs lg:text-lg uppercase text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                  স্বাগতম • <span className="text-accent">জ্ঞানের আলোকবর্তিকা</span>
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-white mb-8 lg:mb-10 leading-[1.2] lg:leading-[1.1] font-sans font-black drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center lg:text-left">
                প্রজ্ঞা ও নৈতিকতার <br />
                <span className="text-accent italic text-3d-premium">আলোকে</span> গড়ুন <br />
                <span className="text-emerald-300">সন্তানের ভবিষ্যৎ</span>
              </h1>
              
              <p className="text-lg sm:text-2xl lg:text-3xl text-white/80 mb-10 lg:mb-14 max-w-2xl leading-relaxed font-bold drop-shadow-lg text-center lg:text-left mx-auto lg:mx-0">
                একটি আধুনিক ও দ্বীনি শিক্ষা প্রতিষ্ঠান যেখানে কুরআন-সুন্নাহর শিক্ষার পাশাপাশি আধুনিক বিজ্ঞান ও প্রযুক্তির সমন্বয় ঘটানো হয়।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center lg:justify-start">
                <Link to="/admission" className="btn-premium-gold text-2xl px-12 py-6 group shadow-[0_20px_60px_rgba(242,125,38,0.4)]">
                  অনলাইনে ভর্তি হন <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
                </Link>
                <Link to="/student-access" className="btn-premium-3d bg-white/5 backdrop-blur-2xl border-white/20 text-2xl px-12 py-6 hover:bg-white/10">
                  ছাত্র পোর্টাল <Globe size={28} className="ml-3" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3D Floating Feature Card */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden xl:block w-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -40 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.6, duration: 1.5, type: "spring" }}
            className="perspective-2000"
          >
            <div className="card-3d-gold p-16 relative z-10 overflow-hidden border-8 border-white/40 backdrop-blur-2xl shadow-[0_80px_150px_-30px_rgba(0,0,0,0.5)]">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[100px]"></div>
              <Star size={120} className="text-primary mb-12 opacity-40 floating-3d" />
              <h3 className="text-5xl font-black mb-8 text-primary leading-tight">ইসলামিক শ্রেষ্ঠত্ব</h3>
              <p className="text-primary/80 text-2xl leading-relaxed font-black">
                হিফজ, আরবি ভাষা এবং আধুনিক একাডেমিক বিষয়ের এক অনন্য সমন্বয়। আমরা চরিত্র গঠনে আপোষহীন।
              </p>
              <div className="mt-16 flex items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center text-primary shadow-inner border border-primary/10">
                  <ShieldCheck size={40} />
                </div>
                <span className="font-black text-2xl tracking-widest uppercase">নিরাপদ ক্যাম্পাস</span>
              </div>
            </div>
            {/* Decorative 3D Elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500 rounded-[3rem] rotate-12 shadow-[30px_30px_80px_rgba(0,0,0,0.4)] z-0 floating-3d"></div>
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-accent rounded-full shadow-[30px_30px_80px_rgba(0,0,0,0.4)] z-0 floating-3d" style={{ animationDelay: '2s' }}></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Neumorphic 3D */}
      <section className="relative z-20 -mt-16 lg:-mt-32 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {[
            { label: 'সক্রিয় ছাত্র', value: '৫০০+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'দক্ষ শিক্ষক', value: '৪০+', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'বছরের শ্রেষ্ঠত্ব', value: '১৫+', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="card-3d-neo flex items-center gap-6 lg:gap-12 p-8 lg:p-12 group bg-white/90 backdrop-blur-xl"
            >
              <div className={`w-20 h-20 lg:w-28 lg:h-28 rounded-2xl lg:rounded-[2.5rem] ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner group-hover:scale-110 group-hover:rotate-12 transition-all duration-700`}>
                <stat.icon size={40} className="lg:w-14 lg:h-14" />
              </div>
              <div>
                <div className="text-4xl lg:text-6xl font-black text-slate-900 mb-1 lg:mb-2">{stat.value}</div>
                <div className="text-slate-500 font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] text-[10px] lg:text-xs">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features - Modern 3D Cards */}
      <section className="py-24 lg:py-48 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl lg:text-8xl text-slate-900 mb-6 lg:mb-10 font-black leading-tight">কেন আমাদের মাদ্রাসাকে <br /><span className="text-accent text-3d-premium">বেছে নেবেন?</span></h2>
            <div className="w-32 lg:w-64 h-2 lg:h-4 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full shadow-2xl"></div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -20, rotateY: 10 }}
              className="card-3d-neo text-center group relative overflow-hidden p-8 lg:p-12 bg-white/80 backdrop-blur-md"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
              <div className={`w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br ${f.color} rounded-3xl lg:rounded-[3rem] flex items-center justify-center text-white mx-auto mb-8 lg:mb-12 shadow-[0_30px_60px_rgba(0,0,0,0.2)] group-hover:rotate-[20deg] transition-all duration-700 ${f.shadow}`}>
                <f.icon size={48} className="lg:w-16 lg:h-16" />
              </div>
              <h3 className="text-2xl lg:text-4xl font-black mb-4 lg:mb-8 text-slate-900">{f.title}</h3>
              <p className="text-slate-500 text-lg lg:text-2xl leading-relaxed font-bold">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Principal Message - Premium Glassmorphism */}
      <section className="relative py-24 lg:py-48 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-950"></div>
          <div className="absolute inset-0 islamic-pattern-premium opacity-15"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[4/5] rounded-3xl lg:rounded-[5rem] overflow-hidden shadow-[0_80px_150px_rgba(0,0,0,0.8)] border-[8px] lg:border-[16px] border-white/5 relative group bg-white/10 backdrop-blur-md">
                <img 
                  src="https://i.ibb.co.com/nNZHk3VZ/Whats-App-Image-2026-02-26-at-1-50-15-PM-removebg-preview.png" 
                  alt="Principal" 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0], rotate: [6, 4, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-4 lg:-bottom-16 lg:-right-16 bg-accent p-6 lg:p-14 rounded-2xl lg:rounded-[4rem] shadow-[0_40px_80px_rgba(242,125,38,0.5)] max-w-[200px] lg:max-w-md border-4 lg:border-8 border-white/20 z-20"
              >
                <p className="text-primary font-black italic text-sm lg:text-3xl mb-4 lg:mb-8 leading-tight">"জ্ঞানই হলো মুমিনের হারানো সম্পদ।"</p>
                <div className="flex items-center gap-3 lg:gap-6">
                  <div className="w-1 lg:w-1.5 h-8 lg:h-16 bg-primary/30 rounded-full"></div>
                  <div>
                    <p className="text-primary font-black text-sm lg:text-3xl">মাওলানা আহমাদুল্লাহ</p>
                    <p className="text-primary/70 text-[8px] lg:text-sm font-black uppercase tracking-[0.2em] lg:tracking-[0.4em] mt-1 lg:mt-2">অধ্যক্ষ</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2 text-center lg:text-left"
            >
              <span className="text-accent font-black uppercase tracking-[0.4em] lg:tracking-[0.6em] text-[10px] lg:text-sm mb-6 lg:mb-10 block shadow-accent/20 drop-shadow-xl">অধ্যক্ষের বাণী | বাণী</span>
              <h2 className="text-4xl sm:text-6xl lg:text-8xl text-white mb-8 lg:mb-14 font-black leading-tight drop-shadow-2xl">প্রজ্ঞা ও ঈমানের <br /><span className="text-accent text-3d-premium">পথে অগ্রযাত্রা</span></h2>
              <div className="space-y-6 lg:space-y-12 text-white/70 text-lg lg:text-3xl leading-relaxed font-bold">
                <p>আসসালামু আলাইকুম। সামছুন্নাহার দারুস সুন্নাহ মহিলা টাইটেল মাদরাসায় আমরা বিশ্বাস করি যে প্রতিটি শিশু আল্লাহর পক্ষ থেকে একটি আমানত। আমাদের লক্ষ্য হলো তাদের এমনভাবে গড়ে তোলা যাতে তারা ইহকাল ও পরকালে সফল হতে পারে।</p>
                <p className="text-white font-black italic border-l-4 lg:border-l-[12px] border-accent pl-6 lg:pl-12 bg-white/5 py-6 lg:py-12 rounded-2xl lg:rounded-[3rem] shadow-2xl">আমরা ঐতিহ্যবাহী ইসলামিক শিক্ষার সাথে আধুনিক একাডেমিক শিক্ষার এক অপূর্ব সমন্বয় ঘটিয়েছি যাতে আমাদের ছাত্ররা আগামীর চ্যালেঞ্জ মোকাবেলায় সক্ষম হয়।</p>
              </div>
              <Link to="/about" className="btn-premium-gold mt-10 lg:mt-20 inline-flex px-8 lg:px-16 py-4 lg:py-7 text-lg lg:text-2xl shadow-[0_30px_60px_rgba(242,125,38,0.4)]">
                আমাদের সম্পর্কে আরও জানুন <ArrowRight size={24} className="ml-2 lg:ml-4 lg:w-8 lg:h-8" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Highlights - Replacing Notice Board */}
      <section className="py-24 lg:py-48 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center lg:items-end gap-8 lg:gap-12 mb-16 lg:mb-24 text-center lg:text-left">
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl text-slate-900 mb-6 lg:mb-10 font-black">মাদ্রাসার <span className="text-accent">গ্যালারি</span></h2>
            <div className="w-32 lg:w-64 h-2 lg:h-4 bg-gradient-to-r from-primary to-accent rounded-full shadow-2xl mx-auto lg:mx-0"></div>
          </div>
          <Link to="/gallery" className="btn-premium-3d py-4 lg:py-5 px-8 lg:px-12 text-lg lg:text-2xl shadow-xl">সব ছবি দেখুন</Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { url: 'https://images.unsplash.com/photo-1585858500266-9782833c76ef?auto=format&fit=crop&q=80&w=800', title: 'শ্রেণীকক্ষে পাঠদান' },
              { url: 'https://images.unsplash.com/photo-1577891729319-f28b3c14ad53?auto=format&fit=crop&q=80&w=800', title: 'ছাত্রদের গ্রুপ স্টাডি' },
              { url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800', title: 'মাদ্রাসার পরিবেশ' },
              { url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800', title: 'সাংস্কৃতিক অনুষ্ঠান' },
            ].map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white font-black text-2xl">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="lg:col-span-4">
            <div className="card-3d-gold h-full flex flex-col justify-between relative overflow-hidden border-4 lg:border-8 border-white/30 shadow-[0_50px_100px_rgba(0,0,0,0.2)] p-8 lg:p-12">
              <div className="absolute top-0 right-0 w-48 lg:w-[30rem] h-48 lg:h-[30rem] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[60px] lg:blur-[120px]"></div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-black mb-8 lg:mb-16 text-primary leading-tight text-center lg:text-left">দ্রুত লিঙ্ক</h3>
                <div className="space-y-4 lg:space-y-8">
                  {[
                    { label: 'ফলাফল দেখুন', to: '/student-access', icon: Award },
                    { label: 'অনলাইনে ফি প্রদান', to: '/student-access', icon: Zap },
                    { label: 'অনলাইন ভর্তি ফরম', to: '/admission', icon: BookOpen },
                  ].map((link, i) => (
                    <Link 
                      key={i}
                      to={link.to} 
                      className="flex items-center justify-between p-6 lg:p-10 bg-white/20 hover:bg-white/40 rounded-2xl lg:rounded-[3rem] transition-all border border-white/20 group backdrop-blur-2xl shadow-xl"
                    >
                      <div className="flex items-center gap-4 lg:gap-6">
                        <link.icon size={24} className="lg:w-8 lg:h-8 text-primary opacity-60" />
                        <span className="font-black text-xl lg:text-3xl text-primary">{link.label}</span>
                      </div>
                      <ArrowRight size={24} className="lg:w-9 lg:h-9 text-primary group-hover:translate-x-4 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-10 lg:mt-20 p-8 lg:p-12 bg-primary rounded-2xl lg:rounded-[3rem] text-white text-center shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-2 lg:border-4 border-white/10">
                <p className="font-black text-xl lg:text-3xl mb-2 lg:mb-4">সাহায্য প্রয়োজন?</p>
                <p className="text-lg lg:text-2xl font-black tracking-widest">+৮৮০ ১২৩৪ ৫৬৭৮৯০</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNotice(null)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0, 
                x: clickPos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), 
                y: clickPos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) 
              }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0,
                x: clickPos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), 
                y: clickPos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) 
              }}
              transition={{ duration: 0.5, type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl bg-white rounded-[2rem] lg:rounded-[3rem] shadow-2xl overflow-hidden my-auto"
            >
              <div className="p-6 sm:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-8 lg:mb-10">
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div className={`w-14 h-14 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-xl shrink-0 ${
                      selectedNotice.category === 'exam' ? 'bg-rose-500 text-white' :
                      selectedNotice.category === 'holiday' ? 'bg-emerald-500 text-white' :
                      'bg-primary text-white'
                    }`}>
                      <Bell size={32} className="lg:w-10 lg:h-10" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          selectedNotice.category === 'exam' ? 'bg-rose-100 text-rose-600' :
                          selectedNotice.category === 'holiday' ? 'bg-emerald-100 text-emerald-600' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {selectedNotice.category === 'exam' ? 'পরীক্ষা' : 
                           selectedNotice.category === 'holiday' ? 'ছুটি' : 
                           selectedNotice.category === 'admission' ? 'ভর্তি' : 'সাধারণ'}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Calendar size={14} /> {selectedNotice.date}
                        </span>
                      </div>
                      <h2 className="text-xl lg:text-4xl font-black text-slate-900 leading-tight">{selectedNotice.title}</h2>
                    </div>
                  </div>
                  <button onClick={() => setSelectedNotice(null)} className="p-3 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shrink-0">
                    <X size={24} />
                  </button>
                </div>

                <div className="prose prose-slate max-w-none mb-10 lg:mb-12">
                  <p className="text-base lg:text-xl text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                    {selectedNotice.content}
                  </p>
                </div>

                {selectedNotice.fileName && (
                  <div className="p-6 lg:p-8 bg-slate-50 rounded-2xl lg:rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                        <FileText size={28} className="lg:w-8 lg:h-8" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-black text-base lg:text-lg truncate max-w-[200px]">{selectedNotice.fileName}</p>
                        <p className="text-slate-400 font-bold text-[10px] lg:text-sm uppercase tracking-widest">সংযুক্ত ফাইল</p>
                      </div>
                    </div>
                    <a 
                      href={selectedNotice.fileUrl} 
                      download
                      className="btn-3d bg-primary text-white border-primary-dark py-3 lg:py-4 px-8 lg:px-10 flex items-center gap-3 text-sm lg:text-lg w-full sm:w-auto justify-center"
                    >
                      <Download size={20} className="lg:w-6 lg:h-6" /> ডাউনলোড
                    </a>
                  </div>
                )}

                <div className="mt-10 lg:mt-12 pt-6 lg:pt-8 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={() => setSelectedNotice(null)}
                    className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] hover:text-primary transition-colors"
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

