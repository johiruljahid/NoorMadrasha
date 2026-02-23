import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, User, CreditCard, FileText, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

export default function StudentLayout() {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/student/dashboard', icon: Home },
    { name: 'Profile', path: '/student/profile', icon: User },
    { name: 'Fees', path: '/student/fees', icon: CreditCard },
    { name: 'Results', path: '/student/results', icon: FileText },
  ];

  const handleLogout = () => {
    // Clear student session
    localStorage.removeItem('student_session');
    navigate('/student-access');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0 md:pl-64">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-primary text-white fixed inset-y-0 left-0 z-50">
        <div className="p-6 border-b border-primary-foreground/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-primary rounded-lg flex items-center justify-center font-bold">N</div>
            <span className="font-islamic font-bold text-lg">Student Portal</span>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${isActive ? 'bg-white text-primary shadow-lg' : 'hover:bg-white/10 text-white/80'}
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-foreground/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-white/80 hover:bg-white/10 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-primary text-white p-4 sticky top-0 z-40 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-primary rounded-lg flex items-center justify-center font-bold">N</div>
          <span className="font-islamic font-bold">Noor Madrasha</span>
        </div>
        <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-lg">
          <LogOut size={20} />
        </button>
      </header>

      {/* Content */}
      <main className="p-4 md:p-8 max-w-5xl mx-auto">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 transition-all
              ${isActive ? 'text-primary' : 'text-slate-400'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-primary/10' : ''}`}>
                  <item.icon size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
