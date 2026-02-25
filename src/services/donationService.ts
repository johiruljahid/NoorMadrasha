export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  method: string;
  status: 'completed' | 'pending';
}

const STORAGE_KEY = 'nm_donations';

export const donationService = {
  getDonations: (): Donation[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      { id: 'DON-101', donorName: 'Anonymous', amount: 5000, date: '2026-02-20', method: 'bKash', status: 'completed' },
      { id: 'DON-102', donorName: 'Hasan Ali', amount: 10000, date: '2026-02-18', method: 'Bank', status: 'completed' },
    ];
  },

  recordDonation: (donation: Omit<Donation, 'id' | 'date' | 'status'>): Donation => {
    const donations = donationService.getDonations();
    const newDonation: Donation = {
      ...donation,
      id: `DON-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    donations.unshift(newDonation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
    window.dispatchEvent(new Event('storage'));
    return newDonation;
  }
};
