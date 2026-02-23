import { motion } from 'motion/react';
import React, { useState } from 'react';
import { CheckCircle2, Info, Send, Sparkles, User, Users, FileText, ChevronRight, ChevronLeft, Calendar, MapPin, GraduationCap, Phone, ShieldCheck, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Admission() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success('আবেদনটি সফলভাবে জমা দেওয়া হয়েছে!');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 z-0">
          <div className="shape-blob w-[40rem] h-[40rem] bg-primary/10 top-0 -left-32"></div>
          <div className="shape-blob w-[40rem] h-[40rem] bg-accent/10 bottom-0 -right-32 animation-delay-2000"></div>
          <div className="absolute inset-0 islamic-pattern-premium opacity-5"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="card-3d-neo p-16 text-center max-w-3xl bg-white/90 backdrop-blur-2xl relative z-10 border-8 border-white/40 shadow-[0_100px_200px_rgba(0,0,0,0.2)]"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="w-36 h-36 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-2xl transform hover:rotate-12 transition-transform"
          >
            <CheckCircle2 size={72} />
          </motion.div>
          
          <h2 className="text-6xl font-black text-primary-dark mb-4">আবেদন সফল হয়েছে!</h2>
          <p className="text-accent-dark text-sm font-black tracking-[0.4em] uppercase mb-12">Application Received Successfully</p>
          
          <p className="text-slate-600 mb-12 leading-relaxed text-2xl font-bold">
            নূর মাদ্রাসায় আবেদনের জন্য আপনাকে ধন্যবাদ। আপনার আবেদনটি সফলভাবে জমা হয়েছে। আমাদের ভর্তি টিম এটি পর্যালোচনা করবে এবং পরবর্তী ৩-৫ কার্যদিবসের মধ্যে আপনার সাথে যোগাযোগ করবে।
          </p>
          
          <div className="p-10 bg-white/50 rounded-[3rem] text-left border-4 border-slate-100 mb-12 shadow-inner backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <h4 className="font-black text-primary-dark mb-8 flex items-center gap-4 text-2xl">
              <Info size={32} className="text-accent" /> পরবর্তী পদক্ষেপসমূহ:
            </h4>
            <ul className="space-y-6">
              {[
                { text: 'আপনার আবেদন আইডি সংরক্ষণ করুন:', val: 'ADM-২০২৬-৮৪৯২' },
                { text: 'ভর্তি পরীক্ষার তারিখের জন্য আমাদের কল বা এসএসএম-এর অপেক্ষা করুন।' },
                { text: 'প্রয়োজনীয় কাগজপত্র (জন্ম নিবন্ধন, পূর্ববর্তী মার্কশিট) প্রস্তুত রাখুন।' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-6">
                  <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-slate-600 font-black leading-relaxed text-xl">
                    {item.text} {item.val && <span className="text-primary-dark bg-primary/10 px-4 py-1.5 rounded-xl ml-3 border border-primary/10">{item.val}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'} 
            className="btn-premium-gold w-full py-7 text-2xl shadow-[0_30px_60px_rgba(242,125,38,0.4)]"
          >
            হোম পেজে ফিরে যান
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-slate-50 overflow-hidden">
      {/* Hero Section with 3D Background */}
      <section className="relative pt-40 pb-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=2000" 
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
              <Sparkles size={20} className="text-accent animate-pulse lg:w-7 lg:h-7" />
              <span className="uppercase tracking-[0.2em] lg:tracking-[0.4em] font-black text-[10px] lg:text-sm text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                ভর্তি চলছে • <span className="text-accent">ONLINE ADMISSION OPEN</span>
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white mb-8 lg:mb-10 leading-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              আপনার সন্তানের <br />
              <span className="text-accent text-3d-premium">উজ্জ্বল ভবিষ্যৎ</span>
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-bold drop-shadow-xl">
              নূর মাদ্রাসায় আমরা আপনার সন্তানকে দ্বীনি ও আধুনিক শিক্ষার এক অনন্য পরিবেশে গড়ে তুলি। নিচের ফর্মটি পূরণ করে আপনার আবেদন প্রক্রিয়া শুরু করুন।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section with 3D Card */}
      <section className="py-24 px-4 max-w-6xl mx-auto w-full -mt-48 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-3d-neo p-12 md:p-24 bg-white/95 backdrop-blur-2xl relative overflow-hidden border-8 border-white/40 shadow-[0_100px_200px_rgba(0,0,0,0.2)]"
        >
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-20 lg:mb-32 relative max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-1 lg:h-2 bg-slate-100 -translate-y-1/2 z-0 rounded-full shadow-inner"></div>
            {[
              { id: 1, label: 'শিক্ষার্থী', icon: User, labelEn: 'Student' },
              { id: 2, label: 'অভিভাবক', icon: Users, labelEn: 'Parent' },
              { id: 3, label: 'পর্যালোচনা', icon: FileText, labelEn: 'Review' }
            ].map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center group">
                <motion.div 
                  animate={{ 
                    scale: step === s.id ? 1.2 : 1,
                    backgroundColor: step >= s.id ? 'var(--color-primary)' : '#fff',
                    rotate: step === s.id ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 lg:w-24 lg:h-24 rounded-2xl lg:rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-2xl border-2 lg:border-4 ${
                    step >= s.id 
                      ? 'border-primary-light text-white' 
                      : 'border-slate-100 text-slate-300'
                  }`}
                >
                  <s.icon size={24} className="lg:w-10 lg:h-10" />
                </motion.div>
                <div className="absolute -bottom-12 lg:-bottom-16 whitespace-nowrap text-center">
                  <span className={`text-xs lg:text-lg font-black uppercase tracking-[0.1em] lg:tracking-[0.2em] transition-colors block ${step >= s.id ? 'text-primary' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                  <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-slate-300">{s.labelEn}</span>
                </div>
              </div>
            ))}
            {/* Active Progress Line */}
            <motion.div 
              className="absolute top-1/2 left-0 h-1 lg:h-2 bg-gradient-to-r from-primary via-accent to-primary -translate-y-1/2 z-0 rounded-full shadow-lg"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 1, ease: "circOut" }}
            ></motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-20">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="space-y-16"
              >
                <div className="flex items-center gap-8 border-b-4 border-slate-50 pb-10">
                  <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
                    <User size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-primary-dark">শিক্ষার্থীর তথ্য</h3>
                    <p className="text-accent-dark text-xs font-black uppercase tracking-[0.4em] opacity-60">Student Personal Details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-5">
                    <label className="text-lg font-black text-primary-dark flex justify-between uppercase tracking-widest">
                      <span>শিক্ষার্থীর পূর্ণ নাম</span>
                      <span className="text-slate-400 text-sm">Full Name</span>
                    </label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                      <input type="text" required className="w-full py-6 pl-16 pr-8 bg-slate-50 border-4 border-slate-100 rounded-[2rem] focus:bg-white focus:border-primary transition-all text-xl font-bold outline-none shadow-inner" placeholder="উদা: আব্দুল্লাহ আল মামুন" />
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <label className="text-lg font-black text-primary-dark flex justify-between uppercase tracking-widest">
                      <span>আবেদনকৃত শ্রেণী</span>
                      <span className="text-slate-400 text-sm">Applying for Class</span>
                    </label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                      <select className="w-full py-6 pl-16 pr-8 bg-slate-50 border-4 border-slate-100 rounded-[2rem] focus:bg-white focus:border-primary transition-all text-xl font-bold outline-none shadow-inner appearance-none cursor-pointer">
                        {['প্রথম শ্রেণী', 'দ্বিতীয় শ্রেণী', 'তৃতীয় শ্রেণী', 'চতুর্থ শ্রেণী', 'পঞ্চম শ্রেণী', 'ষষ্ঠ শ্রেণী', 'সপ্তম শ্রেণী', 'অষ্টম শ্রেণী', 'নবম শ্রেণী', 'দশম শ্রেণী'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <label className="text-lg font-black text-primary-dark flex justify-between uppercase tracking-widest">
                      <span>জন্ম তারিখ</span>
                      <span className="text-slate-400 text-sm">Date of Birth</span>
                    </label>
                    <div className="relative group">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                      <input type="date" required className="w-full py-6 pl-16 pr-8 bg-slate-50 border-4 border-slate-100 rounded-[2rem] focus:bg-white focus:border-primary transition-all text-xl font-bold outline-none shadow-inner" />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <label className="text-lg font-black text-primary-dark flex justify-between uppercase tracking-widest">
                      <span>লিঙ্গ</span>
                      <span className="text-slate-400 text-sm">Gender</span>
                    </label>
                    <div className="relative group">
                      <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                      <select className="w-full py-6 pl-16 pr-8 bg-slate-50 border-4 border-slate-100 rounded-[2rem] focus:bg-white focus:border-primary transition-all text-xl font-bold outline-none shadow-inner appearance-none cursor-pointer">
                        <option>ছেলে (Male)</option>
                        <option>মেয়ে (Female)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={() => setStep(2)} 
                  className="btn-premium-gold w-full py-8 text-2xl flex justify-center items-center gap-6 group shadow-[0_30px_60px_rgba(242,125,38,0.4)]"
                >
                  <span>পরবর্তী ধাপ</span>
                  <ChevronRight size={32} className="group-hover:translate-x-3 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="space-y-16"
              >
                <div className="flex items-center gap-8 border-b-4 border-slate-50 pb-10">
                  <div className="w-20 h-20 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent shadow-inner border border-accent/10">
                    <Users size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-primary-dark">অভিভাবকের তথ্য</h3>
                    <p className="text-accent-dark text-xs font-black uppercase tracking-[0.4em] opacity-60">Parental & Contact Details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-5">
                    <label className="text-lg font-black text-primary-dark flex justify-between uppercase tracking-widest">
                      <span>পিতার নাম</span>
                      <span className="text-slate-400 text-sm">Father's Name</span>
                    </label>
                    <input type="text" required className="w-full py-6 px-8 bg-slate-50 border-4 border-slate-100 rounded-[2rem] focus:bg-white focus:border-primary transition-all text-xl font-bold outline-none shadow-inner" />
                  </div>
                  <div className="space-y-5">
                    <label className="text-lg font-black text-primary-dark flex justify-between uppercase tracking-widest">
                      <span>মাতার নাম</span>
                      <span className="text-slate-400 text-sm">Mother's Name</span>
                    </label>
                    <input type="text" required className="w-full py-6 px-8 bg-slate-50 border-4 border-slate-100 rounded-[2rem] focus:bg-white focus:border-primary transition-all text-xl font-bold outline-none shadow-inner" />
                  </div>
                  <div className="space-y-5">
                    <label className="text-lg font-black text-primary-dark flex justify-between uppercase tracking-widest">
                      <span>অভিভাবকের ফোন নম্বর</span>
                      <span className="text-slate-400 text-sm">Guardian's Phone</span>
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                      <input type="tel" required className="w-full py-6 pl-16 pr-8 bg-slate-50 border-4 border-slate-100 rounded-[2rem] focus:bg-white focus:border-primary transition-all text-xl font-bold outline-none shadow-inner" placeholder="০১XXXXXXXXX" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <label className="text-lg font-black text-primary-dark flex justify-between uppercase tracking-widest">
                      <span>বর্তমান ঠিকানা</span>
                      <span className="text-slate-400 text-sm">Current Address</span>
                    </label>
                    <div className="relative group">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                      <input type="text" required className="w-full py-6 pl-16 pr-8 bg-slate-50 border-4 border-slate-100 rounded-[2rem] focus:bg-white focus:border-primary transition-all text-xl font-bold outline-none shadow-inner" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-10">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="flex-grow py-8 rounded-[2rem] font-black text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all flex justify-center items-center gap-4 shadow-xl border-4 border-transparent hover:border-slate-200"
                  >
                    <ChevronLeft size={32} />
                    <span className="text-2xl">পিছনে</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)} 
                    className="flex-[2] btn-premium-gold py-8 text-2xl flex justify-center items-center gap-6 group shadow-[0_30px_60px_rgba(242,125,38,0.4)]"
                  >
                    <span>পরবর্তী ধাপ</span>
                    <ChevronRight size={32} className="group-hover:translate-x-3 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="space-y-16"
              >
                <div className="flex items-center gap-8 border-b-4 border-slate-50 pb-10">
                  <div className="w-20 h-20 rounded-[2rem] bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner border border-emerald-100">
                    <FileText size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-primary-dark">চূড়ান্ত পর্যালোচনা</h3>
                    <p className="text-accent-dark text-xs font-black uppercase tracking-[0.4em] opacity-60">Review & Submit Application</p>
                  </div>
                </div>

                <div className="p-12 bg-slate-50 rounded-[4rem] space-y-10 border-4 border-slate-100 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-primary via-accent to-primary"></div>
                  <p className="text-2xl text-slate-600 leading-relaxed font-bold">
                    আবেদনটি জমা দেওয়ার আগে দয়া করে সমস্ত তথ্য পুনরায় যাচাই করে নিন। 'আবেদন জমা দিন' বাটনে ক্লিক করার মাধ্যমে আপনি নূর মাদ্রাসার নিয়ম ও শৃঙ্খলা মেনে চলতে সম্মত হচ্ছেন।
                  </p>
                  <label className="flex items-start gap-8 cursor-pointer group p-10 bg-white rounded-[3rem] border-4 border-slate-100 hover:border-primary/30 transition-all shadow-xl">
                    <div className="relative flex items-center mt-1">
                      <input type="checkbox" required className="w-10 h-10 rounded-2xl border-4 border-slate-200 text-primary focus:ring-primary transition-all cursor-pointer appearance-none checked:bg-primary checked:border-primary" />
                      <CheckCircle2 size={24} className="absolute left-2 text-white opacity-0 group-has-[:checked]:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <span className="text-2xl text-slate-700 font-black leading-relaxed">আমি নিশ্চিত করছি যে প্রদত্ত সকল তথ্য সঠিক এবং আমি ভর্তির সকল শর্তাবলী মেনে নিচ্ছি।</span>
                  </label>
                </div>

                <div className="flex gap-10">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)} 
                    className="flex-grow py-8 rounded-[2rem] font-black text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all flex justify-center items-center gap-4 shadow-xl border-4 border-transparent hover:border-slate-200"
                  >
                    <ChevronLeft size={32} />
                    <span className="text-2xl">পিছনে</span>
                  </button>
                  <button 
                    type="submit" 
                    className="flex-[2] btn-premium-gold py-8 text-2xl flex justify-center items-center gap-6 group shadow-[0_30px_60px_rgba(242,125,38,0.4)]"
                  >
                    <span>আবেদন জমা দিন</span>
                    <Send size={32} className="group-hover:translate-x-3 group-hover:-translate-y-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </section>

      {/* Info Cards Section */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/5 -skew-y-6 origin-left scale-110"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-6xl font-black text-primary-dark mb-8">ভর্তি সংক্রান্ত <span className="text-accent-dark text-3d-premium">গুরুত্বপূর্ণ তথ্য</span></h2>
            <div className="w-32 h-3 bg-accent mx-auto rounded-full shadow-lg"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: 'ভর্তি পরীক্ষা', desc: 'আবেদন জমা দেওয়ার পর আপনাকে ভর্তি পরীক্ষার তারিখ জানানো হবে।', icon: Award, color: 'bg-blue-500' },
              { title: 'প্রয়োজনীয় কাগজপত্র', desc: 'জন্ম নিবন্ধন, ২ কপি পাসপোর্ট সাইজ ছবি এবং পূর্ববর্তী স্কুলের মার্কশিট।', icon: ShieldCheck, color: 'bg-amber-500' },
              { title: 'ফলাফল', desc: 'ভর্তি পরীক্ষার ২-৩ দিনের মধ্যে ফলাফল আমাদের ওয়েবসাইটে এবং এসএমএস-এর মাধ্যমে জানানো হবে।', icon: CheckCircle2, color: 'bg-emerald-500' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -20, scale: 1.02 }}
                className="card-3d-neo p-12 bg-white/90 backdrop-blur-xl group hover:bg-primary-dark transition-all duration-700 border-4 border-transparent hover:border-accent/30 shadow-[0_50px_100px_rgba(0,0,0,0.1)]"
              >
                <div className={`w-20 h-20 ${item.color}/10 rounded-[2rem] flex items-center justify-center text-primary mb-10 group-hover:bg-white/10 group-hover:text-white transition-all duration-700 shadow-inner`}>
                  <item.icon size={40} />
                </div>
                <h4 className="text-3xl font-black text-primary-dark mb-6 group-hover:text-white transition-colors">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed font-bold text-xl group-hover:text-white/70 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-48 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000" 
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
            <h2 className="text-6xl font-black text-white mb-10 leading-tight">ভর্তি সংক্রান্ত কোনো <br /><span className="text-accent text-3d-premium">জিজ্ঞাসা আছে?</span></h2>
            <p className="text-white/70 text-2xl mb-14 font-bold leading-relaxed max-w-3xl mx-auto">
              আমাদের ভর্তি হেল্পলাইন সর্বদা আপনার সহযোগিতায় নিয়োজিত। যেকোনো তথ্যের জন্য সরাসরি কল করুন।
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <button className="btn-premium-gold px-16 py-7 text-2xl shadow-[0_30px_60px_rgba(242,125,38,0.4)]">
                কল করুন: ০১৮XXXXXXXX
              </button>
              <button className="btn-premium-3d bg-white/10 border-white/20 hover:bg-white/20 px-16 py-7 text-2xl">
                যোগাযোগ করুন <ChevronRight size={28} className="ml-3" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



