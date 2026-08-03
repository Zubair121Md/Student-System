import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { APP_NAME, COMPANY } from "@/data/mock";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatRole(role: string) {
  return role.replaceAll("_", " ");
}

export { APP_NAME, COMPANY };
