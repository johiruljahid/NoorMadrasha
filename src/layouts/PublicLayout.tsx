import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', bnName: 'হোম', path: '/', color: 'from-rose-500 to-rose-600' },
    { name: 'About', bnName: 'আমাদের সম্পর্কে', path: '/about', color: 'from-sky-500 to-sky-600' },
    { name: 'Teachers', bnName: 'শিক্ষকবৃন্দ', path: '/teachers', color: 'from-emerald-500 to-emerald-600' },
    { name: 'Admission', bnName: 'ভর্তি তথ্য', path: '/admission', color: 'from-amber-500 to-amber-600' },
    { name: 'Gallery', bnName: 'গ্যালারি', path: '/gallery', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Verify', bnName: 'শিক্ষার্থী যাচাই', path: '/verify-student', color: 'from-violet-500 to-violet-600' },
    { name: 'Donate', bnName: 'অনুদান', path: '/donate', color: 'from-pink-500 to-pink-600' },
    { name: 'Notices', bnName: 'নোটিশ', path: '/notices', color: 'from-teal-500 to-teal-600' },
    { name: 'Contact', bnName: 'যোগাযোগ', path: '/contact', color: 'from-blue-500 to-blue-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 premium-glass border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 sm:h-24">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-16 h-16 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src="https://i.ibb.co.com/chnxgycR/madrasha-logo-removebg-preview.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary-dark font-islamic font-bold text-lg leading-tight tracking-tight max-w-[200px]">সামছুন্নাহার দারুস সুন্নাহ মহিলা টাইটেল মাদরাসা</span>
                  <span className="text-accent text-[8px] font-bold tracking-[0.1em] uppercase">Shamsunnahar Darus Sunnah Mohila Title Madrasha</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group px-4 py-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.color} rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -rotate-3 group-hover:rotate-0 scale-75 group-hover:scale-100 shadow-lg`}></div>
                  <span className="relative z-10 text-slate-600 font-black group-hover:text-white transition-colors text-sm whitespace-nowrap">
                    {link.bnName}
                  </span>
                </Link>
              ))}
              <div className="pl-4">
                <Link to="/student-access" className="btn-3d bg-primary text-white border-primary-dark py-2 px-6 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                  ছাত্র প্রবেশ
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
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
              className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl overflow-y-auto max-h-[80vh]"
            >
              <div className="px-4 pt-4 pb-8 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="relative group block overflow-hidden rounded-2xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-active:opacity-100 transition-opacity`}></div>
                    <div className="relative z-10 flex justify-between items-center px-6 py-5 border border-slate-100 group-hover:border-transparent transition-colors">
                      <span className="text-xl font-black text-slate-700 group-hover:text-white transition-colors">{link.bnName}</span>
                      <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] group-hover:text-white group-hover:opacity-70 transition-all">{link.name}</span>
                    </div>
                  </Link>
                ))}
                <div className="pt-4 px-2">
                  <Link
                    to="/student-access"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-3d bg-primary text-white border-primary-dark w-full py-4 flex justify-center items-center gap-3"
                  >
                    <span className="text-lg font-black">ছাত্র প্রবেশ</span>
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
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src="https://i.ibb.co.com/chnxgycR/madrasha-logo-removebg-preview.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-islamic font-bold text-xl leading-tight">সামছুন্নাহার দারুস সুন্নাহ মহিলা টাইটেল মাদরাসা</span>
                  <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">Shamsunnahar Darus Sunnah Mohila Title Madrasha</span>
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
              © {new Date().getFullYear()} সামছুন্নাহার দারুস সুন্নাহ মহিলা টাইটেল মাদরাসা। সর্বস্বত্ব সংরক্ষিত।
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
