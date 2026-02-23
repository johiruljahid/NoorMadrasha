import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, HelpCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentLogin() {
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate database check
    setTimeout(() => {
      // Accepting both old and new formats for demo
      if (studentId === 'NM251001' || studentId === 'NM-1001') {
        toast.success('প্রবেশাধিকার অনুমোদিত! স্বাগতম।');
        localStorage.setItem('student_session', JSON.stringify({ studentId }));
        navigate('/student/dashboard');
      } else {
        toast.error('ভুল স্টুডেন্ট আইডি। আবার চেষ্টা করুন।');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=2000" 
          alt="Background" 
          className="w-full h-full object-cover opacity-10 scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/5 via-transparent to-accent/5"></div>
        <div className="absolute inset-0 islamic-pattern-premium opacity-5"></div>
        
        {/* Animated Blobs */}
        <div className="shape-blob w-[30rem] h-[30rem] bg-accent/10 top-0 -left-20"></div>
        <div className="shape-blob w-[30rem] h-[30rem] bg-primary/10 bottom-0 -right-20 animation-delay-2000"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div 
            whileHover={{ rotateY: 360 }}
            transition={{ duration: 1.5 }}
            className="w-32 h-32 bg-primary rounded-[2.5rem] flex items-center justify-center text-white font-black text-5xl mx-auto mb-10 shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-8 border-white/20 floating-3d"
          >
            N
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-primary-dark mb-8">ছাত্র পোর্টাল প্রবেশ</h1>
          <div className="inline-flex items-center gap-4 px-10 py-4 rounded-full bg-gradient-to-r from-primary-dark/80 to-primary-dark/60 backdrop-blur-2xl border-2 border-accent/30 mb-4 floating-3d shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <ShieldCheck size={28} className="text-accent animate-pulse" />
            <span className="uppercase tracking-[0.4em] font-black text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Student Portal <span className="text-accent">Access</span>
            </span>
          </div>
        </div>

        <div className="card-3d-neo p-12 md:p-16 bg-white/90 backdrop-blur-2xl shadow-[0_80px_150px_rgba(0,0,0,0.1)] border-8 border-white relative overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
          
          <form onSubmit={handleLogin} className="space-y-12 relative z-10">
            <div className="space-y-6">
              <label className="flex justify-between items-end text-sm font-black text-slate-700 uppercase tracking-[0.2em]">
                <span>স্টুডেন্ট আইডি</span>
                <span className="text-slate-300">Student ID</span>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="উদা: NM-1001"
                  className="input-field py-8 px-10 bg-slate-50 border-2 border-slate-100 focus:bg-white focus:ring-8 focus:ring-accent/10 transition-all text-3xl font-black w-full rounded-[2.5rem]"
                />
                <div className="absolute inset-y-0 right-10 flex items-center text-slate-300 group-focus-within:text-accent transition-colors">
                  <ShieldCheck size={32} />
                </div>
              </div>
              <p className="px-6 py-3 bg-slate-50 rounded-2xl text-xs font-bold text-slate-500 flex items-center gap-3 border border-slate-100">
                <HelpCircle size={18} className="text-accent" /> 
                আপনার স্টুডেন্ট আইডি কার্ডে থাকা ইউনিক কোডটি ব্যবহার করুন।
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="btn-premium-gold w-full py-8 text-3xl relative overflow-hidden group shadow-[0_40px_80px_rgba(242,125,38,0.3)]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-8 h-8 border-4 border-primary-dark/30 border-t-primary-dark rounded-full animate-spin"></div>
                  <span className="font-black">যাচাই করা হচ্ছে...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-6">
                  <LogIn size={32} />
                  <span className="font-black">পোর্টালে প্রবেশ করুন</span>
                  <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform" />
                </div>
              )}
            </motion.button>
          </form>

          <div className="mt-16 pt-12 border-t border-slate-100 text-center">
            <div className="inline-flex items-center gap-3 text-slate-400 mb-6">
              <Sparkles size={20} className="text-accent" />
              <p className="text-sm font-bold">আইডি কার্ড নেই?</p>
            </div>
            <p className="text-slate-500 text-lg font-bold leading-relaxed">
              আপনার যদি স্টুডেন্ট আইডি না থাকে, তবে অনুগ্রহ করে মাদ্রাসা অফিসের সাথে যোগাযোগ করুন।
            </p>
          </div>
        </div>

        {/* Demo Credentials Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 p-8 bg-primary-dark text-white rounded-[2.5rem] text-center shadow-2xl border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute inset-0 islamic-pattern-premium opacity-5"></div>
          <p className="text-xs text-accent font-black uppercase tracking-[0.4em] mb-3 relative z-10">Demo Credentials</p>
          <p className="text-2xl font-black relative z-10">Student ID: <span className="text-accent group-hover:scale-110 inline-block transition-transform">NM-1001</span></p>
        </motion.div>
      </motion.div>
    </div>
  );
}

