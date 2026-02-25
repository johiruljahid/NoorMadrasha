export interface Student {
  id: string;
  name: string;
  className: string;
  roll: string;
  accessCode: string;
  photoUrl?: string;
  fatherName: string;
  motherName: string;
  phone: string;
  address: string;
  admissionDate: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  phone: string;
  salary: number;
  photoUrl?: string;
  designation: string;
  joinDate: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent';
  className: string;
}

export interface Result {
  id: string;
  studentId: string;
  examName: string;
  year: string;
  subjects: {
    name: string;
    marks: number;
    grade: string;
    gpa: number;
  }[];
  totalGPA: number;
  finalGrade: string;
}

export interface Fee {
  id: string;
  studentId: string;
  type: string;
  amount: number;
  date: string;
  status: 'paid' | 'due';
  month?: string;
}

export interface AccountEntry {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'general' | 'exam' | 'holiday' | 'admission';
  isPublic: boolean;
  fileUrl?: string;
  fileName?: string;
}
