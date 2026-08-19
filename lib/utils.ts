import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveImageUrl(repoPath?: string | null): string {
  if (!repoPath) return ''
  if (repoPath.startsWith('http://') || repoPath.startsWith('https://')) {
    return repoPath
  }
  return '/' + repoPath.replace(/^public\//, '').replace(/^\//, '')
}


export function formatPrice(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency || 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const sanitizedNumber = number.replace(/\D/g, '')
  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`
}
