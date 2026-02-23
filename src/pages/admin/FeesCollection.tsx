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
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../lib/utils';
import jsPDF from 'jspdf';

export default function FeesCollection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fees, setFees] = useState<any[]>([]);
  const [currentFee, setCurrentFee] = useState<any>(null);

  useEffect(() => {
    setFees([
      { id: 'F101', studentName: 'Abdullah Al Mamun', roll: '12', className: 'Class 8', type: 'Monthly Fee', amount: 2500, date: '2026-02-22', status: 'paid' },
      { id: 'F102', studentName: 'Omar Faruk', roll: '15', className: 'Class 8', type: 'Monthly Fee', amount: 2500, date: '2026-02-21', status: 'due' },
      { id: 'F103', studentName: 'Zubair Ahmed', roll: '01', className: 'Class 8', type: 'Admission Fee', amount: 5000, date: '2026-02-20', status: 'paid' },
    ]);
  }, []);

  const handleCollectFee = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Payment collected successfully!');
    setIsModalOpen(false);
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-islamic text-slate-900 mb-1">Fees Collection</h1>
          <p className="text-slate-500">Collect admission, monthly and other custom fees.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={20} /> Collect New Fee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-emerald-50 border-emerald-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">Total Collected</p>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(85000)}</p>
          </div>
        </div>
        <div className="card p-6 bg-rose-50 border-rose-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-rose-800 uppercase tracking-widest mb-1">Total Due</p>
            <p className="text-2xl font-bold text-rose-600">{formatCurrency(12500)}</p>
          </div>
        </div>
        <div className="card p-6 bg-primary/5 border-primary/10 flex items-center gap-6">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
            <CreditCard size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Today's Collection</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(7500)}</p>
          </div>
        </div>
      </div>

      {/* Search & List */}
      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by student name or roll..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Fee Type</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {fees.map((fee) => (
                <tr key={fee.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{fee.studentName}</span>
                      <span className="text-xs text-slate-500">{fee.className} • Roll: {fee.roll}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-medium text-slate-700">{fee.type}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-bold text-slate-900">{formatCurrency(fee.amount)}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      fee.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {fee.status === 'paid' ? (
                      <button 
                        onClick={() => generateReceipt(fee)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
                      >
                        <Download size={18} />
                      </button>
                    ) : (
                      <button className="text-xs font-bold text-primary hover:underline">Collect Now</button>
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
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <h2 className="text-xl font-islamic font-bold">Collect Fee</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCollectFee} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Select Student</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Search by name or roll..." className="input-field pl-12" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Fee Type</label>
                    <select className="input-field">
                      <option>Monthly Fee</option>
                      <option>Admission Fee</option>
                      <option>Exam Fee</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Amount (BDT)</label>
                    <input type="number" className="input-field" placeholder="0.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button type="button" className="p-4 border-2 border-primary bg-primary/5 rounded-2xl text-primary font-bold text-sm">Cash</button>
                    <button type="button" className="p-4 border-2 border-slate-100 rounded-2xl text-slate-500 font-bold text-sm">bKash</button>
                    <button type="button" className="p-4 border-2 border-slate-100 rounded-2xl text-slate-500 font-bold text-sm">Nagad</button>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-grow btn-primary py-4"
                  >
                    <Save size={20} /> Collect Payment
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
