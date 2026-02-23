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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-900">
      <div className="absolute inset-0 opacity-10 islamic-pattern pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-2xl shadow-primary/40">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-islamic text-white mb-2">Admin Portal</h1>
          <p className="text-slate-400">Restricted access for authorized personnel only</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Admin Access Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter secret code"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 text-lg"
            >
              {isLoading ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Noor Madrasha Security System</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
