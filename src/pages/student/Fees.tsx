import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Smartphone, 
  Info, 
  Send,
  X,
  History,
  Calendar,
  Home as HomeIcon,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency } from '../../lib/utils';
import { paymentService, PaymentRequest } from '../../services/paymentService';
import toast from 'react-hot-toast';

export default function StudentFees() {
  const [student, setStudent] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [transactionId, setTransactionId] = useState('');
  const [paymentHistory, setPaymentHistory] = useState<PaymentRequest[]>([]);

  const months = [
    { name: 'January', bn: 'জানুয়ারি', status: 'paid' },
    { name: 'February', bn: 'ফেব্রুয়ারি', status: 'due' },
    { name: 'March', bn: 'মার্চ', status: 'upcoming' },
    { name: 'April', bn: 'এপ্রিল', status: 'upcoming' },
    { name: 'May', bn: 'মে', status: 'upcoming' },
    { name: 'June', bn: 'জুন', status: 'upcoming' },
    { name: 'July', bn: 'জুলাই', status: 'upcoming' },
    { name: 'August', bn: 'আগস্ট', status: 'upcoming' },
    { name: 'September', bn: 'সেপ্টেম্বর', status: 'upcoming' },
    { name: 'October', bn: 'অক্টোবর', status: 'upcoming' },
    { name: 'November', bn: 'নভেম্বর', status: 'upcoming' },
    { name: 'December', bn: 'ডিসেম্বর', status: 'upcoming' },
  ];

  useEffect(() => {
    const mockStudent = {
      id: 'NM251001',
      name: 'Abdullah Al Mamun',
      type: 'আবাসিক (Residential)',
      monthlyFee: 3500, // Higher for residential
      otherFees: 500,
      totalDue: 3500
    };
    setStudent(mockStudent);
    setPaymentHistory(paymentService.getStudentPayments(mockStudent.id));

    const handleStorageChange = () => {
      setPaymentHistory(paymentService.getStudentPayments(mockStudent.id));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId) {
      toast.error('অনুগ্রহ করে ট্রানজেকশন আইডি প্রদান করুন');
      return;
    }

    paymentService.submitRequest({
      studentId: student.id,
      studentName: student.name,
      amount: student.totalDue,
      method: paymentMethod,
      transactionId: transactionId,
    });

    toast.success('পেমেন্ট রিকোয়েস্ট সাবমিট করা হয়েছে! অ্যাডমিন অনুমোদনের জন্য অপেক্ষা করুন।');
    setIsPaymentModalOpen(false);
    setTransactionId('');
    setPaymentHistory(paymentService.getStudentPayments(student.id));
  };

  if (!student) return <div className="flex items-center justify-center h-screen font-bold text-primary">লোড হচ্ছে...</div>;

  return (
    <div className="space-y-10 pb-20">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div whileHover={{ y: -5 }} className="card-3d p-8 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">শিক্ষার্থীর ধরন</p>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <HomeIcon size={24} className="text-accent" /> {student.type}
            </h3>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card-3d p-8 bg-white border-2 border-rose-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">বকেয়া | Current Due</p>
          <h3 className="text-3xl font-black text-rose-600">{formatCurrency(student.totalDue)}</h3>
          <p className="text-xs text-rose-400 mt-1 font-bold">মাস: ফেব্রুয়ারি ২০২৬</p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card-3d p-8 bg-emerald-500 text-white">
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">মোট পরিশোধিত (২০২৬)</p>
          <h3 className="text-3xl font-black">{formatCurrency(3500)}</h3>
          <p className="text-xs text-white/80 mt-1 font-bold">সর্বশেষ পেমেন্ট: ১৫ জানুয়ারি, ২০২৬</p>
        </motion.div>
      </div>

      {/* Monthly Status Grid */}
      <div className="card-3d p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Calendar className="text-primary" /> মাসিক ফি-এর অবস্থা | Monthly Fee Status
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {months.map((month, i) => (
            <div 
              key={i} 
              onClick={(e) => {
                if (month.status === 'due') {
                  setClickPos({ x: e.clientX, y: e.clientY });
                  setIsPaymentModalOpen(true);
                }
              }}
              className={`p-4 rounded-2xl border-2 transition-all text-center space-y-2 cursor-pointer group ${
                month.status === 'paid' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                month.status === 'due' ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse hover:scale-105 shadow-lg shadow-rose-100' :
                'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100'
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest">{month.bn}</p>
              <p className="font-bold">{month.name}</p>
              <div className="pt-2">
                {month.status === 'paid' ? <CheckCircle2 size={20} className="mx-auto" /> : 
                 month.status === 'due' ? <AlertCircle size={20} className="mx-auto group-hover:scale-125 transition-transform" /> : 
                 <Clock size={20} className="mx-auto opacity-20" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment History */}
        <div className="card-3d p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <History className="text-primary" /> পেমেন্ট ইতিহাস | Payment History
          </h3>
          <div className="space-y-4">
            {paymentHistory.length > 0 ? (
              paymentHistory.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.method === 'bkash' ? 'bg-pink-100 text-pink-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.method === 'bkash' ? 'বিকাশ' : 'নগদ'} পেমেন্ট</h4>
                      <p className="text-xs text-slate-500 font-mono">আইডি: {item.transactionId}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">{formatCurrency(item.amount)}</p>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 
                      item.status === 'pending' ? 'bg-amber-100 text-amber-600' : 
                      'bg-rose-100 text-rose-600'
                    }`}>
                      {item.status === 'approved' ? 'অনুমোদিত' : item.status === 'pending' ? 'অপেক্ষমান' : 'প্রত্যাখ্যাত'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <CreditCard size={48} className="mx-auto mb-4 opacity-10" />
                <p className="font-medium">কোনো সাম্প্রতিক পেমেন্ট পাওয়া যায়নি।</p>
              </div>
            )}
          </div>
        </div>

        {/* Pay Now Section */}
        <div className="card-3d p-8 bg-slate-900 text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
          <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-accent/20 rounded-[2rem] flex items-center justify-center text-accent mx-auto shadow-2xl">
              <CreditCard size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">আপনার বকেয়া পরিশোধ করুন</h3>
              <p className="text-slate-400 max-w-xs mx-auto">বিকাশ বা নগদের মাধ্যমে আপনার মাসিক ফি নিরাপদে পরিশোধ করুন।</p>
            </div>
            <div className="py-4">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">পরিশোধযোগ্য পরিমাণ</p>
              <p className="text-4xl font-black text-accent">{formatCurrency(student.totalDue)}</p>
            </div>
            <button 
              onClick={(e) => {
                setClickPos({ x: e.clientX, y: e.clientY });
                setIsPaymentModalOpen(true);
              }}
              className="w-full py-5 bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_8px_0_rgb(159,18,57)] hover:shadow-[0_6px_0_rgb(159,18,57)] hover:translate-y-[2px] active:shadow-none active:translate-y-[8px] transition-all uppercase tracking-wider"
            >
              এখনই পরিশোধ করুন <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0, 
                x: clickPos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), 
                y: clickPos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) 
              }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0,
                x: clickPos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), 
                y: clickPos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) 
              }}
              transition={{ duration: 0.5, type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-rose-600 to-rose-700 text-white relative">
                <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
                <h2 className="text-2xl font-islamic font-bold relative z-10">ফি পরিশোধ | Pay Fees</h2>
                <button onClick={() => setIsPaymentModalOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors relative z-10">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="bg-rose-50 border-2 border-rose-100 p-6 rounded-3xl shadow-inner relative overflow-hidden group">
                  <h3 className="font-bold text-rose-800 mb-4 flex items-center gap-2 text-lg">
                    <Info size={20} /> পেমেন্ট নির্দেশিকা | Payment Instructions
                  </h3>
                  <ol className="text-sm text-slate-700 space-y-4 list-decimal pl-5 font-medium">
                    <li>আপনার বিকাশ বা নগদ অ্যাপে যান।</li>
                    <li>'Send Money' অপশনটি বেছে নিন।</li>
                    <li>এই নম্বরে টাকা পাঠান: <span className="font-black text-rose-600 text-lg bg-rose-100 px-2 py-0.5 rounded-md">01915344445</span></li>
                    <li>টাকার পরিমাণ: <span className="font-black text-rose-600 text-lg bg-rose-100 px-2 py-0.5 rounded-md">{formatCurrency(student.totalDue)}</span></li>
                    <li>পেমেন্ট সফল হলে ট্রানজেকশন আইডি (Transaction ID) টি সংগ্রহ করুন।</li>
                  </ol>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">মাধ্যম নির্বাচন করুন | Select Method</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`p-5 rounded-[1.5rem] border-2 transition-all flex flex-col items-center justify-center gap-2 font-bold shadow-sm ${
                          paymentMethod === 'bkash' ? 'border-pink-500 bg-pink-50 text-pink-600 scale-105 shadow-pink-100' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        <Smartphone size={28} />
                        <span>বিকাশ (bKash)</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('nagad')}
                        className={`p-5 rounded-[1.5rem] border-2 transition-all flex flex-col items-center justify-center gap-2 font-bold shadow-sm ${
                          paymentMethod === 'nagad' ? 'border-orange-500 bg-orange-50 text-orange-600 scale-105 shadow-orange-100' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        <Smartphone size={28} />
                        <span>নগদ (Nagad)</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">ট্রানজেকশন আইডি | Transaction ID</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-rose-500 transition-colors">
                        <CreditCard size={20} />
                      </div>
                      <input 
                        type="text" 
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="উদা: 8N7A6D5C"
                        className="w-full pl-12 pr-4 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-rose-500 focus:bg-white transition-all font-mono font-bold text-lg shadow-inner"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_8px_0_rgb(159,18,57)] hover:shadow-[0_6px_0_rgb(159,18,57)] hover:translate-y-[2px] active:shadow-none active:translate-y-[8px] transition-all uppercase tracking-wider">
                    <Send size={24} /> সাবমিট করুন | Submit Payment
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
