import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, GraduationCap, Award, BookOpen, Sparkles, Star, UserCheck, Heart, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Teachers() {
  const teachers = [
    {
      name: 'মাওলানা আবদুর রহমান',
      nameEn: 'Maulana Abdur Rahman',
      designation: 'অধ্যক্ষ',
      designationEn: 'Principal',
      subject: 'কুরআন ও হাদিস',
      subjectEn: 'Quran & Hadith',
      education: 'এম.এ (ইসলামিক স্টাডিজ)',
      educationEn: 'M.A (Islamic Studies)',
      experience: '১৫ বছর',
      experienceEn: '15 Years',
      photo: 'https://picsum.photos/seed/teacher1/600/800',
    },
    {
      name: 'মুফতি ইব্রাহিম খলিল',
      nameEn: 'Mufti Ibrahim Khalil',
      designation: 'সহকারী অধ্যাপক',
      designationEn: 'Assistant Professor',
      subject: 'ফিকহ ও উসুল',
      subjectEn: 'Fiqh & Usul',
      education: 'কামিল (ফিকহ)',
      educationEn: 'Kamil (Fiqh)',
      experience: '১০ বছর',
      experienceEn: '10 Years',
      photo: 'https://picsum.photos/seed/teacher2/600/800',
    },
    {
      name: 'ড. আবদুল্লাহ আল মামুন',
      nameEn: 'Dr. Abdullah Al Mamun',
      designation: 'জ্যেষ্ঠ শিক্ষক',
      designationEn: 'Senior Teacher',
      subject: 'আরবি ভাষা ও সাহিত্য',
      subjectEn: 'Arabic Language',
      education: 'পিএইচডি (আরবি)',
      educationEn: 'PhD (Arabic)',
      experience: '১২ বছর',
      experienceEn: '12 Years',
      photo: 'https://picsum.photos/seed/teacher3/600/800',
    },
    {
      name: 'হাফেজ মোস্তফা কামাল',
      nameEn: 'Hafez Mostafa Kamal',
      designation: 'হিফজ বিভাগীয় প্রধান',
      designationEn: 'Head of Hifz',
      subject: 'হিফজুল কুরআন',
      subjectEn: 'Hifzul Quran',
      education: 'হাফেজ-ই-কুরআন',
      educationEn: 'Hafez-e-Quran',
      experience: '৮ বছর',
      experienceEn: '8 Years',
      photo: 'https://picsum.photos/seed/teacher4/600/800',
    },
  ];

  return (
    <div className="flex flex-col bg-slate-50 overflow-hidden">
      {/* Hero Section with 3D Background */}
      <section className="relative pt-40 pb-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050335392-9bc5ad06490d?auto=format&fit=crop&q=80&w=2000" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/80 to-slate-50"></div>
          <div className="absolute inset-0 islamic-pattern-premium opacity-10"></div>
          
          {/* Animated Blobs */}
          <div className="shape-blob w-[30rem] h-[30rem] bg-accent/20 top-0 -left-32"></div>
          <div className="shape-blob w-[30rem] h-[30rem] bg-primary/30 bottom-0 -right-32 animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 lg:gap-4 px-6 lg:px-10 py-3 lg:py-4 rounded-full bg-gradient-to-r from-primary-dark/60 to-transparent backdrop-blur-2xl border-2 border-accent/30 mb-8 lg:mb-12 floating-3d shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <UserCheck size={20} className="text-accent animate-pulse lg:w-7 lg:h-7" />
              <span className="uppercase tracking-[0.2em] lg:tracking-[0.3em] font-black text-[10px] lg:text-sm text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                আমাদের শিক্ষকবৃন্দ • <span className="text-accent">আমাদের শিক্ষক</span>
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white mb-8 lg:mb-10 leading-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              দক্ষ ও অভিজ্ঞ <br />
              <span className="text-accent text-3d-premium">শিক্ষকমণ্ডলী</span>
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-bold drop-shadow-xl">
              আমাদের প্রতিটি শিক্ষক অত্যন্ত মেধাবী, অভিজ্ঞ এবং শিক্ষার্থীদের সঠিক দিকনির্দেশনা দিতে প্রতিশ্রুতিবদ্ধ।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Teachers Grid with 3D Cards */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full -mt-48 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {teachers.map((teacher, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -20, rotateY: 10, scale: 1.02 }}
              className="card-3d-neo p-0 overflow-hidden group bg-white/90 backdrop-blur-xl border-4 border-transparent hover:border-accent/30"
            >
              {/* Teacher Image with 3D Effect */}
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={teacher.photo} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center gap-6">
                  <div className="flex gap-4">
                    <button className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary-dark shadow-2xl hover:scale-110 hover:rotate-12 transition-all">
                      <Phone size={24} />
                    </button>
                    <button className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-dark shadow-2xl hover:scale-110 hover:-rotate-12 transition-all">
                      <Mail size={24} />
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <Facebook size={20} className="text-white/60 hover:text-accent cursor-pointer transition-colors" />
                    <Twitter size={20} className="text-white/60 hover:text-accent cursor-pointer transition-colors" />
                    <Linkedin size={20} className="text-white/60 hover:text-accent cursor-pointer transition-colors" />
                  </div>
                </div>
                {/* Designation Badge */}
                <div className="absolute top-6 right-6 bg-accent text-primary-dark px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl border border-white/20">
                  {teacher.designationEn}
                </div>
              </div>

              {/* Teacher Info */}
              <div className="p-10 text-center relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-accent border border-slate-100 group-hover:rotate-[360deg] transition-transform duration-1000">
                  <Award size={32} />
                </div>
                
                <h3 className="text-3xl font-black text-primary-dark mb-2 mt-4">{teacher.name}</h3>
                <p className="text-accent-dark text-sm font-black tracking-[0.2em] uppercase mb-6 opacity-60">{teacher.nameEn}</p>
                
                <div className="w-20 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8 rounded-full"></div>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-center gap-3 text-slate-700 font-bold text-lg">
                    <BookOpen size={20} className="text-primary" />
                    <span>{teacher.subject}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-slate-500 text-base font-medium">
                    <GraduationCap size={20} className="text-primary" />
                    <span>{teacher.education}</span>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">অভিজ্ঞতা</p>
                    <p className="font-black text-primary-dark text-xl">{teacher.experience}</p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Our Teachers Section */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/5 -skew-y-6 origin-right scale-110"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="inline-block px-8 py-3 bg-primary/10 rounded-2xl text-primary text-xs font-black uppercase tracking-[0.4em] shadow-inner">কেন আমাদের বেছে নেবেন</div>
              <h2 className="text-6xl font-black text-primary-dark leading-tight">আমাদের শিক্ষকদের <br /><span className="text-accent-dark text-3d-premium">অনন্য বৈশিষ্ট্যসমূহ</span></h2>
              <div className="w-32 h-3 bg-accent rounded-full shadow-lg"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                {[
                  { icon: Award, title: 'উচ্চ শিক্ষিত', desc: 'প্রতিটি শিক্ষক দেশ-বিদেশের স্বনামধন্য প্রতিষ্ঠান থেকে ডিগ্রিপ্রাপ্ত।' },
                  { icon: Heart, title: 'আন্তরিকতা', desc: 'শিক্ষার্থীদের প্রতি অত্যন্ত যত্নশীল ও বন্ধুসুলভ আচরণ।' },
                  { icon: Star, title: 'অভিজ্ঞতা', desc: 'দীর্ঘদিনের শিক্ষকতার অভিজ্ঞতা ও গভীর জ্ঞান।' },
                  { icon: Sparkles, title: 'আধুনিক পদ্ধতি', desc: 'আধুনিক ও বৈজ্ঞানিক পদ্ধতিতে পাঠদান নিশ্চিতকরণ।' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 15 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-2xl shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-slate-100">
                      <item.icon size={32} />
                    </div>
                    <div>
                      <h4 className="font-black text-primary-dark text-2xl mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-accent/20 rounded-[5rem] blur-[100px] animate-pulse"></div>
              <div className="relative card-3d-neo p-6 bg-white/50 backdrop-blur-2xl border-8 border-white/40 overflow-hidden group shadow-[0_80px_150px_rgba(0,0,0,0.2)]">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000" 
                  alt="Teachers Group" 
                  className="rounded-[3rem] w-full shadow-2xl group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-48 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" 
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
            <h2 className="text-6xl font-black text-white mb-10 leading-tight">আপনি কি আমাদের সাথে <br /><span className="text-accent text-3d-premium">যোগ দিতে চান?</span></h2>
            <p className="text-white/70 text-2xl mb-14 font-bold leading-relaxed max-w-3xl mx-auto">
              আমরা সর্বদা মেধাবী ও নিবেদিতপ্রাণ শিক্ষকদের সন্ধান করি। আপনি যদি আমাদের মিশনের অংশ হতে চান, তবে আজই আবেদন করুন।
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <button className="btn-premium-gold px-16 py-7 text-2xl shadow-[0_30px_60px_rgba(242,125,38,0.4)]">
                আবেদন করুন <Sparkles size={28} className="ml-3" />
              </button>
              <button className="btn-premium-3d bg-white/10 border-white/20 hover:bg-white/20 px-16 py-7 text-2xl">
                যোগাযোগ করুন <Phone size={28} className="ml-3" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



