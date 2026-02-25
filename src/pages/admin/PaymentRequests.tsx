import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Smartphone,
  User,
  Calendar,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { paymentService, PaymentRequest } from '../../services/paymentService';
import { financeService } from '../../services/financeService';
import { formatCurrency } from '../../lib/utils';

export default function PaymentRequests() {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setRequests(paymentService.getRequests().filter(r => r.status === 'pending'));
  }, []);

  const handleApprove = (id: string) => {
    const request = requests.find(r => r.id === id);
    if (request) {
      paymentService.updateStatus(id, 'approved');
      
      // Record in Finance
      financeService.addEntry({
        type: 'income',
        category: 'ফি সংগ্রহ (অনলাইন)',
        amount: request.amount,
        description: `${request.studentName} এর অনলাইন পেমেন্ট অনুমোদন (${request.type})`
      });
      
      setRequests(paymentService.getRequests().filter(r => r.status === 'pending'));
      toast.success('পেমেন্ট সফলভাবে অনুমোদন করা হয়েছে!');
    }
  };

  const handleReject = (id: string) => {
    paymentService.updateStatus(id, 'rejected');
    setRequests(paymentService.getRequests().filter(r => r.status === 'pending'));
    toast.error('পেমেন্ট বাতিল করা হয়েছে।');
  };

  const filteredRequests = requests.filter(r => 
    r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-amber-50 rounded-full blur-3xl"
        />
      </div>

      <div>
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">পেমেন্ট রিকোয়েস্ট</h1>
        <p className="text-slate-500 font-medium">শিক্ষার্থীদের পাঠানো অনলাইন পেমেন্ট রিকোয়েস্টগুলো যাচাই ও অনুমোদন করুন।</p>
      </div>

      <div className="card-3d p-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input
            type="text"
            placeholder="ছাত্রের নাম, আইডি বা ট্রানজেকশন আইডি দিয়ে সার্চ করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-amber-200 outline-none font-medium text-lg shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={req.id}
                className="card-3d p-8 bg-white border-2 border-amber-100 flex flex-col md:flex-row items-center justify-between gap-8"
              >
                <div className="flex items-center gap-6 flex-grow">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <Smartphone size={32} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-black text-slate-900">{req.studentName}</h3>
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                        ID: {req.studentId}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {req.date}</span>
                      <span className="flex items-center gap-1.5"><CreditCard size={14} /> {req.type}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase ${req.method === 'bkash' ? 'bg-pink-100 text-pink-600' : 'bg-orange-100 text-orange-600'}`}>
                        {req.method}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</p>
                  <p className="font-mono text-lg font-black text-primary bg-primary/5 px-4 py-1 rounded-lg border border-primary/10">
                    {req.transactionId}
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 px-8 border-x border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</p>
                  <p className="text-3xl font-black text-slate-900">{formatCurrency(req.amount)}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="btn-3d bg-emerald-500 text-white border-emerald-600 py-3 px-8 font-black uppercase tracking-widest text-xs flex items-center gap-2"
                  >
                    <CheckCircle2 size={18} /> অনুমোদন
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="btn-3d bg-rose-500 text-white border-rose-600 py-3 px-8 font-black uppercase tracking-widest text-xs flex items-center gap-2"
                  >
                    <XCircle size={18} /> বাতিল
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 card-3d bg-white"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Clock size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">কোনো পেন্ডিং রিকোয়েস্ট নেই</h3>
              <p className="text-slate-500 font-medium">সব পেমেন্ট রিকোয়েস্ট প্রসেস করা হয়েছে।</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
