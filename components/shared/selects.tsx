"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

// ─── SimpleSelect ─────────────────────────────────────────────────────────────
// Wraps shadcn Select for flat option lists — zero boilerplate

export interface SimpleSelectProps {
  id?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  size?: "sm" | "default"
  className?: string
  triggerClassName?: string
}

export function SimpleSelect({
  id,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  options,
  disabled,
  size = "default",
  className,
  triggerClassName,
}: SimpleSelectProps) {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (val) => { if (val !== null) onValueChange(val) } : undefined}
      disabled={disabled}
    >
      <SelectTrigger id={id} size={size} className={cn("w-full", triggerClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={className}>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// ─── GroupedSelect ────────────────────────────────────────────────────────────
// Select with grouped options and optional separator between groups

export interface GroupedSelectProps {
  id?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  groups: SelectOptionGroup[]
  disabled?: boolean
  size?: "sm" | "default"
  className?: string
  triggerClassName?: string
}

export function GroupedSelect({
  id,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  groups,
  disabled,
  size = "default",
  triggerClassName,
}: GroupedSelectProps) {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (val) => { if (val !== null) onValueChange(val) } : undefined}
      disabled={disabled}
    >
      <SelectTrigger id={id} size={size} className={cn("w-full", triggerClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {groups.map((group, gi) => (
          <React.Fragment key={group.label}>
            {gi > 0 && <SelectSeparator />}
            <SelectGroup>
              <SelectLabel>{group.label}</SelectLabel>
              {group.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </React.Fragment>
        ))}
      </SelectContent>
    </Select>
  )
}

// ─── Pre-built domain selects ─────────────────────────────────────────────────

const STATUS_OPTIONS: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "suspended", label: "Suspended" },
  { value: "invited", label: "Invited" },
  { value: "archived", label: "Archived" },
]

export function StatusSelect(props: Omit<SimpleSelectProps, "options">) {
  return <SimpleSelect options={STATUS_OPTIONS} placeholder="Select status" {...props} />
}

const ROLE_OPTIONS: SelectOption[] = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
  { value: "viewer", label: "Viewer" },
]

export function RoleSelect(props: Omit<SimpleSelectProps, "options">) {
  return <SimpleSelect options={ROLE_OPTIONS} placeholder="Select role" {...props} />
}

const PRIORITY_OPTIONS: SelectOption[] = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]

export function PrioritySelect(props: Omit<SimpleSelectProps, "options">) {
  return <SimpleSelect options={PRIORITY_OPTIONS} placeholder="Select priority" {...props} />
}

const PER_PAGE_OPTIONS: SelectOption[] = [
  { value: "10", label: "10 per page" },
  { value: "25", label: "25 per page" },
  { value: "50", label: "50 per page" },
  { value: "100", label: "100 per page" },
]

export function PerPageSelect(props: Omit<SimpleSelectProps, "options">) {
  return <SimpleSelect options={PER_PAGE_OPTIONS} placeholder="Rows per page" {...props} />
}

const DATE_RANGE_OPTIONS: SelectOption[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_30_days", label: "Last 30 days" },
  { value: "last_90_days", label: "Last 90 days" },
  { value: "this_month", label: "This month" },
  { value: "last_month", label: "Last month" },
  { value: "this_year", label: "This year" },
  { value: "custom", label: "Custom range…" },
]

export function DateRangeSelect(props: Omit<SimpleSelectProps, "options">) {
  return (
    <SimpleSelect options={DATE_RANGE_OPTIONS} placeholder="Select period" {...props} />
  )
}

const CURRENCY_OPTIONS: SelectOption[] = [
  { value: "USD", label: "USD — US Dollar" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "GBP", label: "GBP — British Pound" },
  { value: "IDR", label: "IDR — Indonesian Rupiah" },
  { value: "SGD", label: "SGD — Singapore Dollar" },
  { value: "JPY", label: "JPY — Japanese Yen" },
  { value: "AUD", label: "AUD — Australian Dollar" },
  { value: "CAD", label: "CAD — Canadian Dollar" },
  { value: "INR", label: "INR — Indian Rupee" },
]

export function CurrencySelect(props: Omit<SimpleSelectProps, "options">) {
  return <SimpleSelect options={CURRENCY_OPTIONS} placeholder="Select currency" {...props} />
}

const COUNTRY_OPTIONS: SelectOption[] = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "ID", label: "Indonesia" },
  { value: "SG", label: "Singapore" },
  { value: "MY", label: "Malaysia" },
  { value: "AU", label: "Australia" },
  { value: "JP", label: "Japan" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "CA", label: "Canada" },
  { value: "IN", label: "India" },
  { value: "BR", label: "Brazil" },
  { value: "NL", label: "Netherlands" },
]

export function CountrySelect(props: Omit<SimpleSelectProps, "options">) {
  return <SimpleSelect options={COUNTRY_OPTIONS} placeholder="Select country" {...props} />
}

const PLAN_OPTIONS: SelectOption[] = [
  { value: "free", label: "Free" },
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
  { value: "enterprise", label: "Enterprise" },
]

export function PlanSelect(props: Omit<SimpleSelectProps, "options">) {
  return <SimpleSelect options={PLAN_OPTIONS} placeholder="Select plan" {...props} />
}

export const DATE_FORMAT_OPTIONS: SelectOption[] = [
  { value: "MMM DD, YYYY", label: "Jan 01, 2025" },
  { value: "DD/MM/YYYY", label: "01/01/2025" },
  { value: "MM/DD/YYYY", label: "01/01/2025 (US)" },
  { value: "YYYY-MM-DD", label: "2025-01-01 (ISO)" },
  { value: "DD MMM YYYY", label: "01 Jan 2025" },
  { value: "MMMM D, YYYY", label: "January 1, 2025" },
]

export function DateFormatSelect(props: Omit<SimpleSelectProps, "options">) {
  return (
    <SimpleSelect options={DATE_FORMAT_OPTIONS} placeholder="Select date format" {...props} />
  )
}

export const TIMEZONE_OPTIONS: SelectOptionGroup[] = [
  {
    label: "Americas",
    options: [
      { value: "America/New_York", label: "Eastern Time (ET) — UTC-5/4" },
      { value: "America/Chicago", label: "Central Time (CT) — UTC-6/5" },
      { value: "America/Denver", label: "Mountain Time (MT) — UTC-7/6" },
      { value: "America/Los_Angeles", label: "Pacific Time (PT) — UTC-8/7" },
      { value: "America/Sao_Paulo", label: "Brasília (BRT) — UTC-3" },
    ],
  },
  {
    label: "Europe & Africa",
    options: [
      { value: "Europe/London", label: "London (GMT/BST) — UTC+0/1" },
      { value: "Europe/Paris", label: "Central European (CET) — UTC+1/2" },
      { value: "Europe/Moscow", label: "Moscow (MSK) — UTC+3" },
    ],
  },
  {
    label: "Asia & Pacific",
    options: [
      { value: "Asia/Dubai", label: "Gulf Standard (GST) — UTC+4" },
      { value: "Asia/Kolkata", label: "India (IST) — UTC+5:30" },
      { value: "Asia/Bangkok", label: "Indochina (ICT) — UTC+7" },
      { value: "Asia/Singapore", label: "Singapore (SGT) — UTC+8" },
      { value: "Asia/Tokyo", label: "Japan (JST) — UTC+9" },
      { value: "Australia/Sydney", label: "Australian Eastern (AEST) — UTC+10/11" },
      { value: "Pacific/Auckland", label: "New Zealand (NZST) — UTC+12/13" },
    ],
  },
]

export function TimezoneSelect(props: Omit<GroupedSelectProps, "groups">) {
  return (
    <GroupedSelect groups={TIMEZONE_OPTIONS} placeholder="Select timezone" {...props} />
  )
}

export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: "en", label: "English" },
  { value: "id", label: "Bahasa Indonesia" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "pt", label: "Português" },
  { value: "ja", label: "日本語" },
  { value: "zh", label: "中文 (简体)" },
  { value: "ko", label: "한국어" },
  { value: "ar", label: "العربية" },
]

export function LanguageSelect(props: Omit<SimpleSelectProps, "options">) {
  return <SimpleSelect options={LANGUAGE_OPTIONS} placeholder="Select language" {...props} />
}
