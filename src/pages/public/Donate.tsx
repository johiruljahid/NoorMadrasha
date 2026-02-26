import React, { useState, useRef } from 'react';
import { Heart, Send, Smartphone, Download, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import { donationService } from '../../services/donationService';

export default function Donate() {
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      toast.error('অনুগ্রহ করে সঠিক পরিমাণ লিখুন।');
      return;
    }
    
    setIsProcessing(true);
    // Record donation in service
    donationService.recordDonation({
      donorName: donorName || 'Anonymous',
      amount: Number(amount),
      method: 'bKash'
    });

    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      toast.success('আপনার অনুদান সফলভাবে গৃহীত হয়েছে। জাজাকাল্লাহু খাইরান!');
    }, 2000);
  };

  const downloadReceipt = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current);
      const link = document.createElement('a');
      link.download = `Donation_Receipt_${donorName || 'Anonymous'}.jpg`;
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50"></div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-rose-50 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -120, 0], x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-20 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-xs font-black uppercase tracking-widest"
          >
            <Heart size={14} /> সাদাকাহ ও অনুদান
          </motion.div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">আপনার অনুদান আমাদের শক্তি</h1>
          <p className="text-slate-600 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            "নিশ্চয়ই দানশীল পুরুষ ও দানশীল নারী এবং যারা আল্লাহকে উত্তম ঋণ দান করে, তাদের জন্য তা বহুগুণ বৃদ্ধি করা হবে এবং তাদের জন্য রয়েছে সম্মানজনক পুরস্কার।" (সূরা আল-হাদীদ: ১৮)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-3d p-10 bg-white space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900">অনুদান দিন</h3>
              <p className="text-slate-500 font-medium">আপনার সামান্য অনুদান একটি শিশুর জীবন বদলে দিতে পারে।</p>
            </div>

            <form onSubmit={handleDonate} className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">আপনার নাম (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold shadow-inner transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">অনুদানের পরিমাণ (BDT)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400">৳</span>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="পরিমাণ লিখুন"
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-xl shadow-inner transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[500, 1000, 5000].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val.toString())}
                    className="py-3 rounded-xl border-2 border-slate-100 font-black text-slate-500 hover:border-primary/20 hover:bg-primary/5 transition-all"
                  >
                    ৳{val}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                onClick={(e) => setClickPos({ x: e.clientX, y: e.clientY })}
                className="w-full btn-smart-primary py-5 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={24} />
                    <span>অনুদান প্রদান করুন</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="card-3d p-10 bg-gradient-to-br from-pink-500 to-rose-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <Smartphone size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black">বিকাশ পেমেন্ট</h4>
                    <p className="text-white/70 font-bold text-sm uppercase tracking-widest">bKash Merchant</p>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Merchant Number</p>
                  <p className="text-3xl font-black tracking-tighter">+৮৮০ ১৭০০-০০০০০০</p>
                </div>

                <p className="text-sm font-medium leading-relaxed opacity-90">
                  পেমেন্ট করার সময় রেফারেন্স হিসেবে আপনার নাম অথবা মোবাইল নম্বর ব্যবহার করতে পারেন।
                </p>
              </div>
            </div>

            <div className="card-3d p-8 bg-white border-primary/10">
              <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                <CheckCircle2 size={24} className="text-emerald-500" /> কেন অনুদান দিবেন?
              </h4>
              <ul className="space-y-4">
                {[
                  'অসহায় ও এতিম শিশুদের শিক্ষার খরচ বহন।',
                  'মাদ্রাসার অবকাঠামোগত উন্নয়ন ও সংস্কার।',
                  'শিক্ষক ও স্টাফদের বেতন ও সম্মানী প্রদান।',
                  'দরিদ্র শিক্ষার্থীদের জন্য বিনামূল্যে বই ও পোশাক।'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccess(false)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
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
                className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
              >
                <div className="p-10 text-center space-y-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-100/50"
                  >
                    <CheckCircle2 size={56} />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900">অনুদান সফল হয়েছে!</h2>
                    <p className="text-slate-500 font-bold text-lg">জাজাকাল্লাহু খাইরান, আপনার অনুদানটি আমরা পেয়েছি।</p>
                  </div>

                  {/* Receipt for JPG Capture */}
                  <div ref={receiptRef} className="bg-slate-50 p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-left space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                    <div className="text-center border-b border-slate-200 pb-6 mb-6">
                      <h4 className="text-xl font-black text-primary">সামছুন্নাহার দারুস সুন্নাহ মহিলা টাইটেল মাদরাসা</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">অনুরসিদ (Donation Receipt)</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">দাতার নাম</span>
                        <span className="font-black text-slate-900">{donorName || 'বেনামী দাতা'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">প্রদানকৃত পরিমাণ</span>
                        <span className="text-2xl font-black text-primary">৳{amount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">তারিখ</span>
                        <span className="font-bold text-slate-700">{new Date().toLocaleDateString('bn-BD')}</span>
                      </div>
                    </div>
                    <div className="pt-6 text-center">
                      <p className="text-[10px] font-bold text-slate-400 italic">"দান সম্পদ কমায় না, বরং বৃদ্ধি করে।"</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={downloadReceipt}
                      className="btn-smart-primary py-5 flex items-center justify-center gap-3"
                    >
                      <Download size={24} />
                      <span>রসিদ ডাউনলোড করুন (JPG)</span>
                    </button>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-xs"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
