import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatCompactNumber(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

export const formatCompact = formatCompactNumber

export function formatPercentage(value: number, decimals = 1): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(decimals)}%`
}

export const formatPercent = formatPercentage

export function formatDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
  locale = "en-US"
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((segment) => segment[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function truncate(text: string, length = 50): string {
  if (text.length <= length) return text
  return `${text.slice(0, length)}...`
}

