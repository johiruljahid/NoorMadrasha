import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Plus, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  X,
  CreditCard,
  FileText,
  Save,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../lib/utils';
import jsPDF from 'jspdf';
import { paymentService, PaymentRequest } from '../../services/paymentService';
import { financeService } from '../../services/financeService';

export default function FeesCollection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeeTypeModalOpen, setIsFeeTypeModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastPayment, setLastPayment] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PaymentRequest[]>([]);
  const [feeTypes, setFeeTypes] = useState(['মাসিক ফি', 'ভর্তি ফি', 'পরীক্ষা ফি', 'লাইব্রেরি ফি', 'ইউনিফর্ম ফি']);
  const [newFeeType, setNewFeeType] = useState('');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const [modalSelectedFeeType, setModalSelectedFeeType] = useState('মাসিক ফি');
  const [modalAmount, setModalAmount] = useState<string>('২৫০০');

  const handleAddFeeType = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeeType.trim() && !feeTypes.includes(newFeeType.trim())) {
      setFeeTypes([...feeTypes, newFeeType.trim()]);
      setNewFeeType('');
      setIsFeeTypeModalOpen(false);
      toast.success(`ফি এর ধরন "${newFeeType}" যোগ করা হয়েছে!`);
    }
  };

  useEffect(() => {
    setFees([
      { id: 'F101', studentName: 'আবদুল্লাহ আল মামুন', roll: '১২', className: 'অষ্টম শ্রেণী', type: 'মাসিক ফি', amount: 2500, date: '২০২৬-০২-২২', status: 'paid' },
      { id: 'F102', studentName: 'ওমর ফারুক', roll: '১৫', className: 'অষ্টম শ্রেণী', type: 'মাসিক ফি', amount: 2500, date: '২০২৬-০২-২১', status: 'due' },
      { id: 'F103', studentName: 'জুবায়ের আহমেদ', roll: '০১', className: 'অষ্টম শ্রেণী', type: 'ভর্তি ফি', amount: 5000, date: '২০২৬-০২-২০', status: 'paid' },
    ]);

    // Load pending requests
    setPendingRequests(paymentService.getRequests().filter(r => r.status === 'pending'));
  }, []);

  useEffect(() => {
    if (modalSearchTerm) {
      const student = fees.find(f => f.id.toLowerCase() === modalSearchTerm.toLowerCase());
      if (student) {
        setSelectedStudent(student);
      }
    }
  }, [modalSearchTerm, fees]);

  useEffect(() => {
    if (modalSelectedFeeType === 'Monthly Fee' && selectedStudent) {
      setModalAmount('2500');
    }
  }, [modalSelectedFeeType, selectedStudent]);

  const handleDirectCollect = (student: any, amount: number, monthsList: number[]) => {
    const type = monthsList.length > 0 
      ? `মাসিক ফি (${monthsList.map(m => months[m]).join(', ')})` 
      : 'মাসিক ফি';
    
    const paymentData = {
      studentId: student.id,
      studentName: student.studentName,
      amount: amount,
      type: type,
      method: 'cash' as any,
      transactionId: `CASH-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    const recorded = paymentService.recordPayment(paymentData);
    setLastPayment(recorded);
    
    // Record in Finance
    financeService.addEntry({
      type: 'income',
      category: 'ফি সংগ্রহ',
      amount: amount,
      description: `${student.studentName} এর কাছ থেকে ফি সংগ্রহ (${type})`
    });
    
    toast.success('পেমেন্ট সফলভাবে সংগ্রহ করা হয়েছে!');
    setIsHistoryModalOpen(false);
    setSelectedMonths([]);
    setIsSuccessModalOpen(true);
  };

  const handleApprove = (id: string) => {
    const request = pendingRequests.find(r => r.id === id);
    if (request) {
      paymentService.updateStatus(id, 'approved');
      
      // Record in Finance
      financeService.addEntry({
        type: 'income',
        category: 'ফি সংগ্রহ (অনলাইন)',
        amount: request.amount,
        description: `${request.studentName} এর অনলাইন পেমেন্ট অনুমোদন (${request.type})`
      });
      
      setPendingRequests(paymentService.getRequests().filter(r => r.status === 'pending'));
      toast.success('পেমেন্ট সফলভাবে অনুমোদন করা হয়েছে!');
    }
  };

  const handleReject = (id: string) => {
    paymentService.updateStatus(id, 'rejected');
    setPendingRequests(paymentService.getRequests().filter(r => r.status === 'pending'));
    toast.error('পেমেন্ট বাতিল করা হয়েছে।');
  };

  const handleCollectFee = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = selectedMonths.length > 0 ? totalSelectedAmount : 2500;
    const type = selectedMonths.length > 0 
      ? `মাসিক ফি (${selectedMonths.map(m => months[m]).join(', ')})` 
      : 'মাসিক ফি';
    
    const paymentData = {
      studentId: selectedStudent?.id || 'S101',
      studentName: selectedStudent?.studentName || 'আবদুল্লাহ আল মামুন',
      amount: amount,
      type: type,
      method: 'cash' as any,
      transactionId: `CASH-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    const recorded = paymentService.recordPayment(paymentData);
    setLastPayment(recorded);
    
    // Record in Finance
    financeService.addEntry({
      type: 'income',
      category: 'ফি সংগ্রহ',
      amount: amount,
      description: `${selectedStudent?.studentName || 'ছাত্র'} এর কাছ থেকে ফি সংগ্রহ (${type})`
    });
    
    toast.success('পেমেন্ট সফলভাবে সংগ্রহ করা হয়েছে!');
    setIsModalOpen(false);
    setSelectedMonths([]);
    setIsSuccessModalOpen(true);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('receipt-content-preview');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - Noor Madrasha</title>
          <style>
            body { font-family: sans-serif; padding: 40px; }
            .header { text-align: center; border-bottom: 2px solid #065f46; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #065f46; margin: 0; font-size: 24px; }
            .details { margin-bottom: 30px; }
            .details p { margin: 8px 0; font-size: 16px; }
            .footer { text-align: right; margin-top: 60px; }
            .footer p { border-top: 1px solid #000; display: inline-block; padding-top: 5px; }
            .amount { font-weight: bold; font-size: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>NOOR MADRASHA SMART SYSTEM</h1>
            <p>Official Payment Receipt</p>
          </div>
          <div class="details">
            <p><strong>Transaction ID:</strong> ${lastPayment?.transactionId}</p>
            <p><strong>Student Name:</strong> ${lastPayment?.studentName}</p>
            <p><strong>Description:</strong> ${lastPayment?.type}</p>
            <p><strong>Date:</strong> ${lastPayment?.date}</p>
            <p class="amount"><strong>Total Amount:</strong> ${formatCurrency(lastPayment?.amount)}</p>
            <p><strong>Status:</strong> PAID (CASH)</p>
          </div>
          <div class="footer">
            <p>Authorized Signature</p>
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const generateReceipt = (fee: any) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(6, 95, 70);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('NOOR MADRASHA SMART SYSTEM', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Payment Receipt', 105, 30, { align: 'center' });

    // Receipt Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Receipt No: ${fee.id}`, 20, 50);
    doc.text(`Date: ${fee.date}`, 150, 50);

    // Student Info
    doc.setFontSize(12);
    doc.text(`Student Name: ${fee.studentName}`, 20, 70);
    doc.text(`Class: ${fee.className}`, 20, 80);
    doc.text(`Roll: ${fee.roll}`, 150, 80);

    // Table
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 95, 170, 10, 'F');
    doc.text('Description', 25, 102);
    doc.text('Amount', 150, 102);

    doc.text(fee.type, 25, 115);
    doc.text(formatCurrency(fee.amount), 150, 115);

    doc.line(20, 125, 190, 125);
    doc.setFontSize(14);
    doc.text('Total Paid:', 110, 140);
    doc.text(formatCurrency(fee.amount), 150, 140);

    doc.setFontSize(10);
    doc.text('Status: PAID', 20, 140);
    doc.text('Payment Method: Cash', 20, 150);

    // Footer
    doc.text('--------------------------', 150, 180);
    doc.text('Authorized Signature', 150, 185);

    doc.save(`Receipt_${fee.id}_${fee.studentName}.pdf`);
  };

  const toggleMonth = (index: number) => {
    if (index < 2) return; // Mock: Jan and Feb are already paid
    setSelectedMonths(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index].sort((a, b) => a - b)
    );
  };

  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const monthlyFeeAmount = 2500;
  const totalSelectedAmount = selectedMonths.length * monthlyFeeAmount;

  const filteredFees = fees.filter(f => 
    f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.roll.includes(searchTerm) ||
    f.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -120, 0], x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-20 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">ফি সংগ্রহ</h1>
          <p className="text-slate-500 font-medium">ভর্তি, মাসিক এবং অন্যান্য কাস্টম ফি সংগ্রহ করুন।</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsFeeTypeModalOpen(true)}
            className="btn-smart-white flex items-center gap-2"
          >
            <Plus size={20} /> ফি এর ধরন যোগ করুন
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn-smart-primary flex items-center gap-2">
            <Plus size={20} /> নতুন ফি সংগ্রহ
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'মোট সংগৃহীত', value: 85000, icon: CheckCircle2, color: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
          { title: 'মোট বকেয়া', value: 12500, icon: AlertCircle, color: 'bg-rose-500', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
          { title: "আজকের সংগ্রহ", value: 7500, icon: CreditCard, color: 'bg-primary', bg: 'bg-primary/5', text: 'text-primary', border: 'border-primary/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`card-3d p-8 ${stat.bg} ${stat.border} flex items-center gap-8`}
          >
            <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">{stat.title}</p>
              <p className={`text-3xl font-black ${stat.text}`}>{formatCurrency(stat.value)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Clock size={28} className="text-amber-500" /> পেন্ডিং পেমেন্ট রিকোয়েস্ট
          </h2>
          <div className="card-3d p-0 overflow-hidden border-2 border-amber-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-amber-50/50 border-b border-amber-100">
                    <th className="px-10 py-6 text-[10px] font-black text-amber-800 uppercase tracking-[0.2em]">ছাত্র</th>
                    <th className="px-10 py-6 text-[10px] font-black text-amber-800 uppercase tracking-[0.2em]">পদ্ধতি</th>
                    <th className="px-10 py-6 text-[10px] font-black text-amber-800 uppercase tracking-[0.2em]">ট্রানজেকশন আইডি</th>
                    <th className="px-10 py-6 text-[10px] font-black text-amber-800 uppercase tracking-[0.2em]">পরিমাণ</th>
                    <th className="px-10 py-6 text-[10px] font-black text-amber-800 uppercase tracking-[0.2em] text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {pendingRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-10 py-6">
                        <div className="flex flex-col">
                          <span className="text-lg font-black text-slate-900">{req.studentName}</span>
                          <span className="text-xs font-bold text-slate-500">আইডি: {req.studentId}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          req.method === 'bkash' ? 'bg-pink-100 text-pink-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {req.method}
                        </span>
                      </td>
                      <td className="px-10 py-6 font-mono text-sm font-bold text-slate-600">{req.transactionId}</td>
                      <td className="px-10 py-6 text-xl font-black text-slate-900">{formatCurrency(req.amount)}</td>
                      <td className="px-10 py-6 text-right space-x-4">
                        <button 
                          onClick={() => handleApprove(req.id)}
                          className="btn-3d bg-emerald-500 text-white border-emerald-600 text-[10px] py-2 px-6 uppercase tracking-widest"
                        >
                          অনুমোদন
                        </button>
                        <button 
                          onClick={() => handleReject(req.id)}
                          className="btn-3d bg-rose-500 text-white border-rose-600 text-[10px] py-2 px-6 uppercase tracking-widest"
                        >
                          বাতিল
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Search & List */}
      <div className="card-3d p-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input
            type="text"
            placeholder="ছাত্রের নাম বা রোল দিয়ে সার্চ করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-medium text-lg shadow-inner"
          />
        </div>
      </div>

      <div className="card-3d p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ছাত্র</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ফি এর ধরন</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পরিমাণ</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">স্ট্যাটাস</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredFees.map((fee) => (
                <tr 
                  key={fee.id} 
                  className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => { setSelectedStudent(fee); setIsHistoryModalOpen(true); }}
                >
                  <td className="px-10 py-6">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-slate-900">{fee.studentName}</span>
                      <span className="text-xs font-bold text-slate-500">{fee.className} • রোল: {fee.roll} • আইডি: {fee.id}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="font-bold text-slate-700">{fee.type}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-xl font-black text-slate-900">{formatCurrency(fee.amount)}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      fee.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {fee.status === 'paid' ? 'পরিশোধিত' : 'বকেয়া'}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right space-x-4" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => { setSelectedStudent(fee); setIsHistoryModalOpen(true); }}
                      className="p-3 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all shadow-sm"
                      title="ছাত্রের প্রোফাইল ও ইতিহাস দেখুন"
                    >
                      <Clock size={20} />
                    </button>
                    {fee.status === 'paid' ? (
                      <button 
                        onClick={() => generateReceipt(fee)}
                        className="p-3 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all shadow-sm"
                        title="রশিদ ডাউনলোড করুন"
                      >
                        <Download size={20} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => { setSelectedStudent(fee); setIsModalOpen(true); }}
                        className="btn-3d bg-emerald-600 text-white border-emerald-700 text-[10px] py-2 px-6 uppercase tracking-widest"
                      >
                        সংগ্রহ করুন
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collection Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">ফি সংগ্রহ</h2>
                  <p className="text-white/70 text-sm font-bold">নিচে পেমেন্টের বিবরণ দিন</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCollectFee} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ছাত্র নির্বাচন করুন</label>
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="আইডি দিয়ে সার্চ করুন (যেমন: F101)..." 
                      value={modalSearchTerm}
                      onChange={(e) => setModalSearchTerm(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner" 
                    />
                  </div>
                  {selectedStudent && modalSearchTerm && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                        {selectedStudent.studentName[0]}
                      </div>
                      <div>
                        <p className="font-black text-emerald-900">{selectedStudent.studentName}</p>
                        <p className="text-xs font-bold text-emerald-600">{selectedStudent.className} • Roll: {selectedStudent.roll}</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ফি এর ধরন</label>
                    <select 
                      value={modalSelectedFeeType}
                      onChange={(e) => setModalSelectedFeeType(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-black text-slate-700 shadow-inner"
                    >
                      {feeTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                      <option value="Other">অন্যান্য</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পরিমাণ (টাকা)</label>
                    <input 
                      type="number" 
                      value={modalAmount}
                      onChange={(e) => setModalAmount(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner" 
                      placeholder="0.00" 
                    />
                    {modalSelectedFeeType === 'Monthly Fee' && (
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        অটো-ডিটেক্টেড: মার্চ ২০২৬ (পরবর্তী বকেয়া)
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পেমেন্ট পদ্ধতি</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button type="button" className="p-4 border-2 border-primary bg-primary/5 rounded-2xl text-primary font-black text-xs uppercase tracking-widest shadow-sm">নগদ</button>
                    <button type="button" className="p-4 border-2 border-slate-100 rounded-2xl text-slate-400 font-black text-xs uppercase tracking-widest hover:border-primary/20 transition-all">বিকাশ</button>
                    <button type="button" className="p-4 border-2 border-slate-100 rounded-2xl text-slate-400 font-black text-xs uppercase tracking-widest hover:border-primary/20 transition-all">নগদ (অনলাইন)</button>
                  </div>
                </div>

                <div className="pt-8 flex gap-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow btn-3d bg-rose-50 text-rose-600 border-rose-100 py-4 font-black uppercase tracking-widest hover:bg-rose-100"
                  >
                    <X size={20} className="inline mr-2" /> বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-grow btn-3d bg-emerald-600 text-white border-emerald-700 py-4 font-black uppercase tracking-widest hover:bg-emerald-700"
                  >
                    <Save size={20} className="inline mr-2" /> পেমেন্ট সংগ্রহ করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Fee Type Modal */}
      <AnimatePresence>
        {isFeeTypeModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFeeTypeModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-secondary text-white">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">নতুন ফি এর ধরন যোগ করুন</h2>
                  <p className="text-white/70 text-sm font-bold">ফি এর একটি নতুন বিভাগ সংজ্ঞায়িত করুন</p>
                </div>
                <button onClick={() => setIsFeeTypeModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddFeeType} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ফি এর ধরনের নাম</label>
                  <input
                    type="text"
                    required
                    value={newFeeType}
                    onChange={(e) => setNewFeeType(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary/20 outline-none font-bold shadow-inner"
                    placeholder="যেমন: পিকনিক ফি"
                  />
                </div>

                <div className="pt-4 flex gap-6">
                  <button
                    type="button"
                    onClick={() => setIsFeeTypeModalOpen(false)}
                    className="flex-grow btn-3d bg-rose-50 text-rose-600 border-rose-100 py-4 font-black uppercase tracking-widest text-xs hover:bg-rose-100"
                  >
                    <X size={16} className="inline mr-2" /> বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-grow btn-3d bg-emerald-600 text-white border-emerald-700 py-4 font-black uppercase tracking-widest text-xs hover:bg-emerald-700"
                  >
                    <Plus size={16} className="inline mr-2" /> ফি যোগ করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Student Fee History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl">
                    <img src={`https://picsum.photos/seed/${selectedStudent?.id}/100/100`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{selectedStudent?.studentName}</h2>
                    <p className="text-white/70 text-sm font-bold">{selectedStudent?.className} • Roll: {selectedStudent?.roll} • ID: {selectedStudent?.id}</p>
                  </div>
                </div>
                <button onClick={() => setIsHistoryModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">মাসিক ফি স্ট্যাটাস (২০২৬)</h3>
                      {selectedMonths.length > 0 && (
                        <button 
                          onClick={() => setSelectedMonths([])}
                          className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                        >
                          সিলেকশন মুছুন
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {months.map((month, i) => {
                        const isPaid = i < 2; // Mock: Jan and Feb are paid
                        const isSelected = selectedMonths.includes(i);
                        const monthNames = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
                        return (
                          <motion.div 
                            key={month} 
                            whileTap={!isPaid ? { scale: 0.95 } : {}}
                            onClick={() => toggleMonth(i)}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative overflow-hidden ${
                              isPaid 
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-600 cursor-default' 
                                : isSelected
                                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                                  : 'bg-rose-50 border-rose-100 text-rose-600 hover:border-rose-300'
                            }`}
                          >
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white/80' : ''}`}>{monthNames[i]}</span>
                            {isPaid ? <CheckCircle2 size={16} /> : isSelected ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            {isSelected && (
                              <motion.div 
                                layoutId="activeMonth"
                                className="absolute inset-0 bg-white/10"
                              />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">আর্থিক সারসংক্ষেপ</h3>
                    <div className="space-y-4">
                      {selectedMonths.length > 0 ? (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-primary text-white p-6 rounded-2xl border-2 border-primary-dark shadow-xl"
                        >
                          <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">স্মার্ট পেমেন্ট সিলেকশন</p>
                          <p className="text-3xl font-black mb-2">{formatCurrency(totalSelectedAmount)}</p>
                          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                            পরিশোধ করা হচ্ছে: {selectedMonths.map(m => ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'][m]).join(', ')}
                          </p>
                        </motion.div>
                      ) : (
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">মোট বকেয়া</p>
                          <p className="text-3xl font-black text-rose-600">{formatCurrency(monthlyFeeAmount * 10)}</p>
                        </div>
                      )}
                      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">মোট পরিশোধিত (এই বছর)</p>
                        <p className="text-3xl font-black text-emerald-600">{formatCurrency(5000)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">সাম্প্রতিক পেমেন্টসমূহ</h3>
                  <div className="space-y-4">
                    {[
                      { type: 'মাসিক ফি', date: '২২ ফেব্রুয়ারি ২০২৬', amount: 2500, method: 'নগদ' },
                      { type: 'মাসিক ফি', date: '১৫ জানুয়ারি ২০২৬', amount: 2500, method: 'বিকাশ' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-black text-slate-900">{p.type}</p>
                            <p className="text-xs font-bold text-slate-500">{p.date} • {p.method}</p>
                          </div>
                        </div>
                        <p className="font-black text-slate-900">{formatCurrency(p.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6">
                  <button
                    onClick={() => setIsHistoryModalOpen(false)}
                    className="flex-grow btn-3d bg-rose-50 text-rose-600 border-rose-100 py-4 font-black uppercase tracking-widest hover:bg-rose-100"
                  >
                    <X size={20} className="inline mr-2" /> বন্ধ করুন
                  </button>
                  <button
                    onClick={() => { 
                      if (selectedMonths.length > 0) {
                        handleDirectCollect(selectedStudent, totalSelectedAmount, selectedMonths);
                      } else {
                        handleDirectCollect(selectedStudent, monthlyFeeAmount, [2]); // Default to next month (Mar)
                      }
                    }}
                    className={`flex-grow btn-3d py-4 font-black uppercase tracking-widest transition-all ${
                      selectedMonths.length > 0 
                        ? 'bg-primary text-white border-primary-dark hover:bg-primary-dark shadow-lg shadow-primary/30' 
                        : 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30'
                    }`}
                  >
                    <Plus size={20} className="inline mr-2" /> 
                    {selectedMonths.length > 0 
                      ? `${formatCurrency(totalSelectedAmount)} পরিশোধ করুন` 
                      : 'পেমেন্ট সংগ্রহ করুন'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Receipt Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-100/50"
                >
                  <CheckCircle2 size={56} />
                </motion.div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">পেমেন্ট সফল হয়েছে!</h2>
                  <p className="text-slate-500 font-bold text-lg">আলহামদুলিল্লাহ, পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।</p>
                </div>

                <div id="receipt-content-preview" className="bg-slate-50 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</span>
                    <span className="font-mono font-bold text-slate-900">{lastPayment?.transactionId}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-600">শিক্ষার্থীর নাম: <span className="text-slate-900">{lastPayment?.studentName}</span></p>
                    <p className="text-sm font-bold text-slate-600">বিবরণ: <span className="text-slate-900">{lastPayment?.type}</span></p>
                    <p className="text-sm font-bold text-slate-600">তারিখ: <span className="text-slate-900">{lastPayment?.date}</span></p>
                    <p className="text-sm font-bold text-slate-600">মোট টাকা: <span className="text-slate-900 font-black text-xl">{formatCurrency(lastPayment?.amount)}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={() => generateReceipt({
                      id: lastPayment?.transactionId,
                      studentName: lastPayment?.studentName,
                      className: 'Class 8',
                      roll: '12',
                      type: lastPayment?.type,
                      amount: lastPayment?.amount,
                      date: lastPayment?.date
                    })}
                    className="btn-3d bg-white text-primary border-slate-100 py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                  >
                    <Download size={18} /> Download PDF
                  </button>
                  <button
                    onClick={handlePrint}
                    className="btn-3d bg-slate-900 text-white border-slate-800 py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                  >
                    <FileText size={18} /> Print Receipt
                  </button>
                </div>

                <button
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-xs"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
