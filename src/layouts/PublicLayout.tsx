import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', bnName: 'হোম', path: '/', color: 'from-blue-500 to-blue-700', shadow: 'shadow-blue-200' },
    { name: 'About', bnName: 'আমাদের সম্পর্কে', path: '/about', color: 'from-emerald-500 to-emerald-700', shadow: 'shadow-emerald-200' },
    { name: 'Teachers', bnName: 'শিক্ষকবৃন্দ', path: '/teachers', color: 'from-purple-500 to-purple-700', shadow: 'shadow-purple-200' },
    { name: 'Admission', bnName: 'ভর্তি তথ্য', path: '/admission', color: 'from-amber-500 to-amber-700', shadow: 'shadow-amber-200' },
    { name: 'Gallery', bnName: 'গ্যালারি', path: '/gallery', color: 'from-rose-500 to-rose-700', shadow: 'shadow-rose-200' },
    { name: 'Verify', bnName: 'শিক্ষার্থী যাচাই', path: '/verify-student', color: 'from-indigo-500 to-indigo-700', shadow: 'shadow-indigo-200' },
    { name: 'Donate', bnName: 'অনুদান', path: '/donate', color: 'from-orange-500 to-orange-700', shadow: 'shadow-orange-200' },
    { name: 'Notices', bnName: 'নোটিশ', path: '/notices', color: 'from-cyan-500 to-cyan-700', shadow: 'shadow-cyan-200' },
    { name: 'Contact', bnName: 'যোগাযোগ', path: '/contact', color: 'from-slate-500 to-slate-700', shadow: 'shadow-slate-200' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 premium-glass border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 sm:h-24">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300 border border-white/20">
                  ন
                </div>
                <div className="flex flex-col">
                  <span className="text-primary-dark font-islamic font-bold text-xl leading-tight tracking-tight">নূর মাদ্রাসা</span>
                  <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">Noor Madrasha</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    px-4 py-2 rounded-xl text-slate-700 font-bold transition-all duration-300 
                    hover:scale-110 hover:-translate-y-1 active:scale-95
                    flex flex-col items-center group relative
                  `}
                >
                  <span className={`
                    text-sm font-black px-3 py-1 rounded-lg transition-all
                    group-hover:bg-gradient-to-r ${link.color} group-hover:text-white group-hover:shadow-lg ${link.shadow}
                  `}>
                    {link.bnName}
                  </span>
                  <span className="text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-opacity leading-none mt-1">{link.name}</span>
                </Link>
              ))}
              <div className="pl-4">
                <Link to="/student-access" className="btn-premium-3d py-2.5 px-6 text-sm flex items-center gap-2">
                  <span>ছাত্র প্রবেশ</span>
                  <span className="text-[10px] opacity-70 border-l border-white/30 pl-2">Login</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-primary-dark p-2 hover:bg-primary/10 rounded-xl transition-colors"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl overflow-y-auto max-h-[80vh]"
            >
              <div className="px-4 pt-4 pb-8 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex justify-between items-center px-6 py-5 rounded-2xl transition-all
                      bg-gradient-to-r ${link.color} text-white shadow-lg ${link.shadow}
                      active:scale-95
                    `}
                  >
                    <span className="text-lg font-black">{link.bnName}</span>
                    <span className="text-xs font-bold opacity-70 uppercase tracking-widest">{link.name}</span>
                  </Link>
                ))}
                <div className="pt-6 px-2">
                  <Link
                    to="/student-access"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-premium-3d w-full py-5 flex justify-center items-center gap-3"
                  >
                    <span className="text-xl font-black">ছাত্র প্রবেশ</span>
                    <span className="text-xs opacity-70 border-l border-white/30 pl-3">Student Login</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 pt-24 pb-12 relative overflow-hidden">
        {/* Background Islamic Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none islamic-pattern-premium"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-8 group">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl border border-white/10">
                  ন
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-islamic font-bold text-2xl leading-tight">নূর মাদ্রাসা</span>
                  <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Noor Madrasha</span>
                </div>
              </Link>
              <p className="text-slate-400 max-w-md mb-10 text-lg leading-relaxed font-medium">
                আমাদের লক্ষ্য হলো আগামী প্রজন্মকে দ্বীনি ও আধুনিক শিক্ষায় শিক্ষিত করে তোলা। নৈতিকতা ও আদর্শের সমন্বয়ে এক আলোকিত সমাজ গঠনই আমাদের মূল উদ্দেশ্য।
              </p>
              <div className="flex gap-5">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <div key={social} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg group">
                    <span className="text-white group-hover:scale-110 transition-transform uppercase text-[10px] font-bold">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-xl mb-8 flex items-center gap-2">
                <div className="w-1 h-6 bg-accent rounded-full"></div>
                দ্রুত লিঙ্ক
              </h4>
              <ul className="space-y-5">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="flex items-center gap-2 hover:text-accent transition-all hover:translate-x-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="font-medium">{link.bnName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-8 flex items-center gap-2">
                <div className="w-1 h-6 bg-accent rounded-full"></div>
                যোগাযোগ করুন
              </h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <span className="text-sm leading-relaxed">১২৩ ইসলামিক সেন্টার রোড, ঢাকা, বাংলাদেশ</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <span className="text-sm">+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail size={20} className="text-accent" />
                  </div>
                  <span className="text-sm">info@noormadrasha.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-slate-500 font-medium">
              © {new Date().getFullYear()} নূর মাদ্রাসা স্মার্ট সিস্টেম। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <div className="flex items-center gap-8">
              <Link to="/admin-access" className="text-[10px] text-slate-600 hover:text-accent transition-all uppercase tracking-[0.3em] font-bold border border-white/5 px-4 py-2 rounded-lg hover:bg-white/5">
                Admin Portal
              </Link>
              <div className="flex items-center gap-2 text-[10px] text-slate-700 font-bold uppercase tracking-widest">
                <span>Made with</span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>for Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
