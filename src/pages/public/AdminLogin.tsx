import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (accessCode === 'Jahid') {
        toast.success('Welcome, Admin!');
        localStorage.setItem('admin_session', 'active');
        navigate('/admin/dashboard');
      } else {
        toast.error('Access Denied. Invalid Admin Code.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0a0f18] relative overflow-hidden">
      {/* Animated 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -120, 0],
            x: [0, -150, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-32 w-[40rem] h-[40rem] bg-accent/10 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-secondary/20 rounded-[2rem] blur-2xl border border-white/10"
        />
      </div>

      <div className="absolute inset-0 opacity-5 islamic-pattern pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Floating 3D Icon Container */}
        <div className="relative mb-12">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-[0_20px_50px_rgba(var(--primary-rgb),0.4)] border-4 border-white/10 relative z-20"
          >
            <ShieldCheck size={48} />
          </motion.div>
          {/* Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary/20 rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-primary/10 rounded-full opacity-10"></div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight uppercase">অ্যাডমিন পোর্টাল</h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-white/20"></div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">সুরক্ষিত প্রবেশাধিকার</p>
            <div className="h-px w-8 bg-white/20"></div>
          </div>
        </div>

        <div className="card-3d p-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">অ্যাডমিন অ্যাক্সেস কোড</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border-2 border-white/5 text-white focus:border-primary/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-700 font-black tracking-widest text-lg shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-3d w-full py-5 bg-primary text-white border-primary-dark font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(var(--primary-rgb),0.3)]"
            >
              {isLoading ? (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  যাচাই করা হচ্ছে...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  ড্যাশবোর্ড আনলক করুন
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">সিস্টেম অনলাইন</span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]"
        >
          নূর মাদ্রাসা সিকিউরিটি সিস্টেম v২.০
        </motion.p>
      </motion.div>
    </div>
  );
}
