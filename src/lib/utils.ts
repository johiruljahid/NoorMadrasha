import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAccessCode(className: string, roll: string) {
  const random = Math.floor(100 + Math.random() * 900);
  return `${className}-${roll}-${random}`;
}

export function generateStudentId() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `NM-${random}`;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0
  }).format(amount);
}
