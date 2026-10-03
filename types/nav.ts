import type { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: string | number
  disabled?: boolean
  external?: boolean
  permission?: string
  children?: NavItem[]
}

export interface NavGroup {
  label?: string
  items: NavItem[]
}

export interface SidebarNavItem extends NavItem {
  children?: SidebarNavItem[]
}
