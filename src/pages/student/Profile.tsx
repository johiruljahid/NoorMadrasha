import React, { useState, useEffect } from 'react';
import { 
  User, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Users, 
  Home as HomeIcon,
  Briefcase,
  Calendar,
  Droplets,
  AlertCircle,
  QrCode,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { formatCurrency } from '../../lib/utils';

export default function StudentProfile() {
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    setStudent({
      id: 'NM251001',
      name: 'Abdullah Al Mamun',
      nameBn: 'আবদুল্লাহ আল মামুন',
      className: 'নূরানী-১ম',
      roll: '১২',
      bloodGroup: 'B+',
      dob: '2012-05-15',
      phone: '+880 1712-345678',
      email: 'abdullah@example.com',
      address: 'House 45, Road 12, Sector 4, Uttara, Dhaka',
      photoUrl: 'https://images.unsplash.com/photo-1544717297-fa15c3902727?auto=format&fit=crop&q=80&w=400',
      family: {
        fatherName: 'মোঃ আবদুর রহমান',
        fatherOccupation: 'ব্যবসায়ী',
        motherName: 'ফাতেমা বেগম',
        motherOccupation: 'গৃহিণী',
        guardianName: 'মোঃ আবদুর রহমান',
        guardianPhone: '+880 1912-345678',
        emergencyContact: '+880 1812-345678'
      },
      academic: {
        admissionDate: '2024-01-10',
        session: '2026',
        status: 'সক্রিয়',
        type: 'আবাসিক (Residential)'
      }
    });
  }, []);

  if (!student) return <div className="flex items-center justify-center h-screen font-bold text-primary">লোড হচ্ছে...</div>;

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-48 h-48 rounded-[2.2rem] border-4 border-white overflow-hidden shadow-2xl bg-white">
            <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg">
            <ShieldCheck size={24} />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{student.nameBn}</h1>
          <p className="text-xl text-primary font-medium mb-4">{student.name}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/10">
              আইডি: {student.id}
            </span>
            <span className="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-bold border border-accent/10">
              {student.academic.type}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student ID Card / QR Section */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-3d p-8 bg-white border-2 border-primary/5 flex flex-col items-center text-center space-y-6"
        >
          <div className="p-6 bg-slate-50 rounded-[2.5rem] shadow-inner border-2 border-slate-100">
            <QRCodeSVG 
              value={`STUDENT_ID:${student.id}`}
              size={180}
              level="H"
              includeMargin={true}
              className="rounded-2xl"
            />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-1">ডিজিটাল আইডি কার্ড</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Digital Student ID</p>
          </div>
          <div className="w-full pt-4">
            <button className="w-full btn-smart-indigo py-4 flex items-center justify-center gap-2 text-sm">
              <Download size={18} /> আইডি কার্ড ডাউনলোড
            </button>
          </div>
        </motion.div>

        {/* Basic Info */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="lg:col-span-2 card-3d p-8 space-y-8"
        >
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4">
            <User className="text-primary" /> ব্যক্তিগত তথ্য
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Calendar, label: 'জন্ম তারিখ', value: student.dob },
              { icon: Droplets, label: 'রক্তের গ্রুপ', value: student.bloodGroup, color: 'text-rose-600' },
              { icon: Phone, label: 'ফোন নম্বর', value: student.phone },
              { icon: Mail, label: 'ইমেইল', value: student.email },
              { icon: MapPin, label: 'ঠিকানা', value: student.address, full: true },
            ].map((item, i) => (
              <div key={i} className={`${item.full ? 'md:col-span-2' : ''} flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100`}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <p className={`font-bold text-slate-900 ${item.color || ''}`}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Academic Status */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-3d p-8 bg-primary text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
          <div className="relative z-10 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-3 border-b border-white/10 pb-4">
              <ShieldCheck className="text-accent" /> একাডেমিক অবস্থা
            </h3>
            <div className="space-y-6">
              {[
                { label: 'শ্রেণী', value: student.className },
                { label: 'রোল নম্বর', value: student.roll },
                { label: 'সেশন', value: student.academic.session },
                { label: 'ভর্তির তারিখ', value: student.academic.admissionDate },
                { label: 'বর্তমান অবস্থা', value: student.academic.status, badge: true },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-white/60 font-medium">{item.label}</span>
                  {item.badge ? (
                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {item.value}
                    </span>
                  ) : (
                    <span className="font-bold">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Family History */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="lg:col-span-3 card-3d p-8 space-y-8"
        >
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4">
            <Users className="text-primary" /> পারিবারিক তথ্য
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Father */}
            <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 space-y-4">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <User size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">পিতার নাম</p>
                <p className="text-lg font-bold text-slate-900">{student.family.fatherName}</p>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <Briefcase size={14} /> {student.family.fatherOccupation}
                </p>
              </div>
            </div>

            {/* Mother */}
            <div className="p-6 bg-pink-50 rounded-[2rem] border border-pink-100 space-y-4">
              <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">মাতার নাম</p>
                <p className="text-lg font-bold text-slate-900">{student.family.motherName}</p>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <Briefcase size={14} /> {student.family.motherOccupation}
                </p>
              </div>
            </div>

            {/* Guardian */}
            <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 space-y-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">অভিভাবক ও জরুরি যোগাযোগ</p>
                <p className="text-lg font-bold text-slate-900">{student.family.guardianName}</p>
                <div className="space-y-1 mt-2">
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Phone size={14} className="text-emerald-600" /> {student.family.guardianPhone}
                  </p>
                  <p className="text-sm text-rose-500 font-bold flex items-center gap-2">
                    <AlertCircle size={14} /> জরুরি: {student.family.emergencyContact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
