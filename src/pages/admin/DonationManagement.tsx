import React, { useState, useEffect } from 'react';
import { Heart, Search, Filter, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { donationService, Donation } from '../../services/donationService';
import { formatCurrency } from '../../lib/utils';
import toast from 'react-hot-toast';

export default function DonationManagement() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setDonations(donationService.getDonations());
  }, []);

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

  const filteredDonations = donations.filter(d => 
    d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-rose-50 rounded-full blur-3xl"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">অনুদান ব্যবস্থাপনা</h1>
          <p className="text-slate-500 font-medium">সকল অবদান এবং সদাকাহ ইতিহাস ট্র্যাক করুন।</p>
        </div>
        <div className="px-8 py-4 bg-rose-50 rounded-[2rem] border-2 border-rose-100 text-rose-600 font-black text-lg whitespace-nowrap shadow-sm flex items-center gap-3">
          <Heart size={24} className="fill-rose-600" />
          মোট: {formatCurrency(totalDonations)}
        </div>
      </div>

      <div className="card-3d p-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input
            type="text"
            placeholder="দাতার নাম বা আইডি দিয়ে খুঁজুন..."
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
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">আইডি / তারিখ</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">দাতার নাম</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পরিমাণ</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">পদ্ধতি</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">অবস্থা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 text-sm">{donation.id}</span>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{donation.date}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-lg font-black text-slate-700">{donation.donorName}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-xl font-black text-rose-600">{formatCurrency(donation.amount)}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-sm">
                      {donation.method === 'bkash' ? 'বিকাশ' : donation.method === 'nagad' ? 'নগদ' : donation.method}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                      <CheckCircle2 size={14} /> {donation.status === 'completed' ? 'সম্পন্ন' : donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
