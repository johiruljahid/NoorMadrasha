import { financeService } from './financeService';

export interface PaymentRequest {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  method: 'bkash' | 'nagad' | 'cash';
  transactionId: string;
  type?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const STORAGE_KEY = 'nm_payment_requests';

export const paymentService = {
  getRequests: (): PaymentRequest[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  submitRequest: (request: Omit<PaymentRequest, 'id' | 'status' | 'date'>) => {
    const requests = paymentService.getRequests();
    const newRequest: PaymentRequest = {
      ...request,
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    requests.push(newRequest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return newRequest;
  },

  updateStatus: (id: string, status: 'approved' | 'rejected') => {
    const requests = paymentService.getRequests();
    const updated = requests.map(req => {
      if (req.id === id && status === 'approved' && req.status !== 'approved') {
        // Record as income in finance service
        financeService.addEntry({
          type: 'income',
          category: req.type || 'ফি সংগ্রহ',
          amount: req.amount,
          description: `${req.studentName} (${req.studentId}) এর কাছ থেকে ফি সংগ্রহ`
        });
      }
      return req.id === id ? { ...req, status } : req;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  recordPayment: (payment: Omit<PaymentRequest, 'id' | 'status' | 'date'>) => {
    const requests = paymentService.getRequests();
    const newPayment: PaymentRequest = {
      ...payment,
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'approved',
      date: new Date().toISOString().split('T')[0],
    };
    requests.push(newPayment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    
    // Record as income in finance service
    financeService.addEntry({
      type: 'income',
      category: payment.type || 'ফি সংগ্রহ',
      amount: payment.amount,
      description: `${payment.studentName} (${payment.studentId}) এর কাছ থেকে ফি সংগ্রহ (সরাসরি)`
    });

    window.dispatchEvent(new Event('storage'));
    return newPayment;
  },

  getStudentPayments: (studentId: string): PaymentRequest[] => {
    return paymentService.getRequests().filter(req => req.studentId === studentId);
  }
};
