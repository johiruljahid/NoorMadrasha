import { Notice } from '../types';

const STORAGE_KEY = 'nm_notices';

export const noticeService = {
  getNotices: (): Notice[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      { id: '1', title: '২০২৬ সেশনের ভর্তি চলছে', content: 'সকল শ্রেণীতে সীমিত আসন খালি আছে। দ্রুত আবেদন করুন।', date: '2026-02-20', category: 'admission', isPublic: true },
      { id: '2', title: 'রমজানের সময়সূচী পরিবর্তন', content: 'রমজানে মাদ্রাসার সময় সকাল ৮:০০ টা থেকে দুপুর ১:০০ টা পর্যন্ত হবে।', date: '2026-02-18', category: 'general', isPublic: true },
    ];
  },

  addNotice: (notice: Omit<Notice, 'id' | 'date'>): Notice => {
    const notices = noticeService.getNotices();
    const newNotice: Notice = {
      ...notice,
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0]
    };
    notices.unshift(newNotice);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    window.dispatchEvent(new Event('storage'));
    return newNotice;
  },

  deleteNotice: (id: string) => {
    const notices = noticeService.getNotices().filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    window.dispatchEvent(new Event('storage'));
  }
};
