import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  GraduationCap, 
  FileSpreadsheet, 
  Wallet, 
  PieChart, 
  Bell, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Teachers', path: '/admin/teachers', icon: GraduationCap },
    { name: 'Attendance', path: '/admin/attendance', icon: UserCheck },
    { name: 'Results', path: '/admin/results', icon: FileSpreadsheet },
    { name: 'Fees', path: '/admin/fees', icon: Wallet },
    { name: 'Accounts', path: '/admin/accounts', icon: PieChart },
    { name: 'Notices', path: '/admin/notices', icon: Bell },
  ];

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin-access');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">N</div>
              <div className="flex flex-col">
                <span className="text-white font-islamic font-bold text-lg leading-tight">Admin Panel</span>
                <span className="text-accent text-[10px] font-bold tracking-widest uppercase">Noor Madrasha</span>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-slate-800 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900">Admin User</span>
              <span className="text-xs text-slate-500">Super Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-primary font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-8 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
