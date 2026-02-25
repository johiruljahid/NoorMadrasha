import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Teachers from './pages/public/Teachers';
import Admission from './pages/public/Admission';
import Contact from './pages/public/Contact';
import Gallery from './pages/public/Gallery';
import StudentLogin from './pages/public/StudentLogin';
import AdminLogin from './pages/public/AdminLogin';
import VerifyStudent from './pages/public/VerifyStudent';
import Donate from './pages/public/Donate';
import Notices from './pages/public/Notices';

// Components
import ScrollToTop from './components/ScrollToTop';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import StudentFees from './pages/student/Fees';
import StudentResults from './pages/student/Results';
import StudentAttendance from './pages/student/Attendance';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import StudentManagement from './pages/admin/StudentManagement';
import TeacherManagement from './pages/admin/TeacherManagement';
import AttendanceSystem from './pages/admin/AttendanceSystem';
import ResultManagement from './pages/admin/ResultManagement';
import FeesCollection from './pages/admin/FeesCollection';
import PaymentRequests from './pages/admin/PaymentRequests';
import AccountsSection from './pages/admin/AccountsSection';
import NoticeManagement from './pages/admin/NoticeManagement';
import DonationManagement from './pages/admin/DonationManagement';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/verify-student" element={<VerifyStudent />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/student-access" element={<StudentLogin />} />
          <Route path="/admin-access" element={<AdminLogin />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="fees" element={<StudentFees />} />
          <Route path="results" element={<StudentResults />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="teachers" element={<TeacherManagement />} />
          <Route path="attendance" element={<AttendanceSystem />} />
          <Route path="results" element={<ResultManagement />} />
          <Route path="fees" element={<FeesCollection />} />
          <Route path="payment-requests" element={<PaymentRequests />} />
          <Route path="accounts" element={<AccountsSection />} />
          <Route path="notices" element={<NoticeManagement />} />
          <Route path="donations" element={<DonationManagement />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
