import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, Sparkles, MessageSquare, Clock, Globe, Headphones, HelpCircle, ChevronRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('বার্তাটি সফলভাবে পাঠানো হয়েছে!');
  };

  return (
    <div className="flex flex-col bg-slate-50 overflow-hidden">
      {/* Hero Section with 3D Background */}
      <section className="relative pt-40 pb-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/80 to-slate-50"></div>
          <div className="absolute inset-0 islamic-pattern-premium opacity-10"></div>
          
          {/* Animated Blobs */}
          <div className="shape-blob w-[40rem] h-[40rem] bg-accent/20 top-0 -left-40"></div>
          <div className="shape-blob w-[40rem] h-[40rem] bg-primary/30 bottom-0 -right-40 animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 lg:gap-4 px-6 lg:px-10 py-3 lg:py-4 rounded-full bg-gradient-to-r from-primary-dark/60 to-transparent backdrop-blur-2xl border-2 border-accent/30 mb-8 lg:mb-12 floating-3d shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <Headphones size={20} className="text-accent animate-pulse lg:w-7 lg:h-7" />
              <span className="uppercase tracking-[0.2em] lg:tracking-[0.4em] font-black text-[10px] lg:text-sm text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                যোগাযোগ • <span className="text-accent">আমাদের সাথে যুক্ত হোন</span>
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white mb-8 lg:mb-10 leading-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              আপনার যেকোনো <br />
              <span className="text-accent text-3d-premium">জিজ্ঞাসায় পাশে আছি</span>
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-bold drop-shadow-xl">
              মাদ্রাসা সম্পর্কিত যেকোনো তথ্য বা জিজ্ঞাসার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা আপনার প্রশ্নের উত্তর দিতে সদা প্রস্তুত।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full -mt-48 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="grid grid-cols-1 gap-10">
              {[
                { icon: MapPin, title: 'অবস্থান', bn: '১২৩ ইসলামিক সেন্টার রোড, ঢাকা', en: 'আমাদের অবস্থান', color: 'bg-primary' },
                { icon: Phone, title: 'ফোন নম্বর', bn: '+৮৮০ ১২৩৪ ৫৬৭৮৯০', en: 'যেকোনো সময় কল করুন', color: 'bg-secondary' },
                { icon: Mail, title: 'ইমেইল', bn: 'info@darussunnah.com', en: 'বার্তা পাঠান', color: 'bg-accent' },
                { icon: Clock, title: 'অফিস সময়', bn: 'শনি - বৃহস্পতি: ৮টা - ৪টা', en: 'কাজের সময়', color: 'bg-emerald-500' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 15, rotateY: -5, scale: 1.02 }}
                  className="card-3d-neo p-10 bg-white/95 backdrop-blur-2xl group border-l-8 border-l-transparent hover:border-l-accent transition-all duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.05)]"
                >
                  <div className={`w-20 h-20 ${item.color}/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-accent group-hover:text-primary-dark transition-all duration-500 shadow-inner border border-primary/5`}>
                    <item.icon size={40} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-3xl font-black text-primary-dark mb-2">{item.title}</h3>
                  <p className="text-accent text-[10px] font-black tracking-[0.4em] uppercase mb-6 opacity-70">{item.en}</p>
                  <p className="text-slate-600 font-bold text-xl leading-relaxed">{item.bn}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Social Connect */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-3d-neo p-12 bg-primary-dark text-white relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute inset-0 islamic-pattern-premium opacity-5"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-accent/20 rounded-[2rem] flex items-center justify-center text-accent mb-10 shadow-inner border border-accent/10 group-hover:rotate-12 transition-transform duration-700">
                  <Globe size={48} />
                </div>
                <h3 className="text-4xl font-black mb-4">সামাজিক যোগাযোগ</h3>
                <p className="text-white/60 mb-10 font-bold text-lg">আমাদের সব আপডেট পেতে সামাজিক যোগাযোগ মাধ্যমে যুক্ত থাকুন।</p>
                <div className="flex gap-6">
                  {[
                    { icon: Facebook, color: 'hover:bg-blue-600' },
                    { icon: Twitter, color: 'hover:bg-sky-500' },
                    { icon: Instagram, color: 'hover:bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500' },
                    { icon: Youtube, color: 'hover:bg-red-600' }
                  ].map((social, idx) => (
                    <button key={idx} className={`w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-500 shadow-2xl ${social.color} hover:scale-115 hover:-translate-y-2`}>
                      <social.icon size={28} />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form with Premium 3D Design */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-3d-neo p-8 lg:p-24 bg-white/95 backdrop-blur-2xl relative overflow-hidden h-full shadow-[0_80px_150px_rgba(0,0,0,0.1)] border-4 lg:border-8 border-white"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-48 lg:w-96 h-48 lg:h-96 bg-accent/5 rounded-full -mr-24 lg:-mr-48 -mt-24 lg:-mt-48 blur-[60px] lg:blur-[120px]"></div>
              <div className="absolute bottom-0 left-0 w-48 lg:w-96 h-48 lg:h-96 bg-primary/5 rounded-full -ml-24 lg:-mr-48 -mb-24 lg:-mb-48 blur-[60px] lg:blur-[120px]"></div>

              <div className="flex flex-col md:flex-row md:items-center gap-6 lg:gap-10 mb-12 lg:mb-20 relative z-10 text-center md:text-left">
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-2xl lg:rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/5 group-hover:scale-110 transition-transform duration-700 mx-auto md:mx-0">
                  <MessageSquare size={40} className="lg:w-14 lg:h-14" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-6xl font-black text-primary-dark">সরাসরি বার্তা পাঠান</h2>
                  <p className="text-accent text-[10px] lg:text-sm font-black tracking-[0.2em] lg:tracking-[0.4em] mt-2 lg:mt-3 uppercase">আমাদের একটি প্রিমিয়াম বার্তা পাঠান</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-4 lg:space-y-5">
                    <label className="text-xs lg:text-sm font-black text-slate-700 flex justify-between uppercase tracking-[0.1em] lg:tracking-[0.2em]">
                      <span>আপনার নাম</span>
                      <span className="text-slate-300">আপনার নাম</span>
                    </label>
                    <div className="relative group">
                      <input type="text" required className="input-field py-4 lg:py-6 px-6 lg:px-10 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:ring-8 focus:ring-accent/10 transition-all text-lg lg:text-2xl font-bold w-full rounded-2xl lg:rounded-3xl" placeholder="আব্দুল্লাহ" />
                      <div className="absolute inset-y-0 right-6 lg:right-8 flex items-center text-slate-300 group-focus-within:text-accent transition-colors">
                        <Sparkles size={20} className="lg:w-6 lg:h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 lg:space-y-5">
                    <label className="text-xs lg:text-sm font-black text-slate-700 flex justify-between uppercase tracking-[0.1em] lg:tracking-[0.2em]">
                      <span>ইমেইল</span>
                      <span className="text-slate-300">ইমেইল ঠিকানা</span>
                    </label>
                    <div className="relative group">
                      <input type="email" required className="input-field py-4 lg:py-6 px-6 lg:px-10 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:ring-8 focus:ring-accent/10 transition-all text-lg lg:text-2xl font-bold w-full rounded-2xl lg:rounded-3xl" placeholder="example@mail.com" />
                      <div className="absolute inset-y-0 right-6 lg:right-8 flex items-center text-slate-300 group-focus-within:text-accent transition-colors">
                        <Mail size={20} className="lg:w-6 lg:h-6" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 lg:space-y-5">
                  <label className="text-xs lg:text-sm font-black text-slate-700 flex justify-between uppercase tracking-[0.1em] lg:tracking-[0.2em]">
                    <span>বিষয়</span>
                    <span className="text-slate-300">বিষয়</span>
                  </label>
                  <div className="relative group">
                    <input type="text" required className="input-field py-4 lg:py-6 px-6 lg:px-10 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:ring-8 focus:ring-accent/10 transition-all text-lg lg:text-2xl font-bold w-full rounded-2xl lg:rounded-3xl" placeholder="কিভাবে আমরা আপনাকে সাহায্য করতে পারি?" />
                    <div className="absolute inset-y-0 right-6 lg:right-8 flex items-center text-slate-300 group-focus-within:text-accent transition-colors">
                      <HelpCircle size={20} className="lg:w-6 lg:h-6" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-5">
                  <label className="text-xs lg:text-sm font-black text-slate-700 flex justify-between uppercase tracking-[0.1em] lg:tracking-[0.2em]">
                    <span>আপনার বার্তা</span>
                    <span className="text-slate-300">আপনার বার্তা</span>
                  </label>
                  <textarea rows={6} required className="input-field py-6 lg:py-8 px-6 lg:px-10 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:ring-8 focus:ring-accent/10 transition-all text-lg lg:text-2xl font-bold w-full rounded-2xl lg:rounded-[3rem] resize-none" placeholder="আপনার বার্তাটি এখানে লিখুন..."></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="btn-premium-gold w-full py-6 lg:py-8 text-xl lg:text-3xl flex justify-center items-center gap-4 lg:gap-8 shadow-[0_40px_80px_rgba(242,125,38,0.4)] group"
                >
                  <span className="font-black">বার্তা পাঠান</span>
                  <Send size={28} className="lg:w-9 lg:h-9 group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section with 3D Frame */}
      <section className="py-48 px-4 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-premium opacity-[0.05]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl md:text-8xl font-black text-white mb-8">আমাদের অবস্থান <span className="text-accent text-3d-premium">ম্যাপে</span></h2>
              <p className="text-accent text-sm font-black tracking-[0.6em] uppercase opacity-80">ইন্টারেক্টিভ ম্যাপে আমাদের খুঁজুন</p>
              <div className="w-48 h-3 bg-accent mx-auto mt-12 rounded-full shadow-[0_0_30px_rgba(242,125,38,0.6)]"></div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="card-3d-neo p-10 bg-white/5 border-8 border-white/10 overflow-hidden h-[700px] shadow-[0_100px_200px_rgba(0,0,0,0.6)]"
          >
            <div className="w-full h-full rounded-[3.5rem] overflow-hidden border-4 border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301394!2d90.3910801!3d23.7508671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b898376d552f%3A0x199d399c483f12ab!2sDhaka!5e0!3m2!1sen!2sbd!4v1645535535000!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Quick Link */}
      <section className="py-48 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-20"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-32 h-32 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary mx-auto mb-12 shadow-inner group"
          >
            <HelpCircle size={72} className="opacity-40 group-hover:scale-115 transition-transform duration-700" />
          </motion.div>
          <h2 className="text-5xl font-black text-primary-dark mb-8">সাধারণ কিছু জিজ্ঞাসা আছে?</h2>
          <p className="text-slate-500 text-2xl mb-16 font-bold leading-relaxed max-w-3xl mx-auto">আমাদের মাদ্রাসার ভর্তি, সিলেবাস বা অন্যান্য সাধারণ প্রশ্নের উত্তরের জন্য আমাদের FAQ পেজটি দেখতে পারেন।</p>
          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="btn-premium-3d border-primary/20 text-primary hover:bg-primary hover:text-white px-16 py-6 text-2xl font-black group shadow-2xl"
          >
            <span>সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)</span>
            <ChevronRight size={32} className="ml-4 inline group-hover:translate-x-3 transition-transform" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}



