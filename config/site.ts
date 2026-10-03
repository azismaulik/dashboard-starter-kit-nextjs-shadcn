import {
  LayoutDashboard,
  Users,
  FolderOpen,
  BarChart3,
  Bell,
  Activity,
  Settings,
  Shield,
  CreditCard,
  UserCog,
  Blocks,
  UserCircle,
  Bell as BellIcon,
  SlidersHorizontal,
} from "lucide-react"
import type { NavGroup, NavItem } from "@/types"

export const siteConfig = {
  name: "Dashkit",
  description: "A modern, accessible Next.js dashboard starter kit built with shadcn/ui and Tailwind CSS",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "https://dashkit.dev/og.jpg",
  author: "Azis Maulik",
  links: {
    github: "https://github.com/azismaulik/dashboard-starter-kit-nextjs-shadcn",
    docs: "/docs",
  },
  features: {
    analytics: true,
    billing: true,
    teams: true,
    notifications: true,
    auditLog: true,
  },
} as const

export const settingsNavConfig: NavItem[] = [
  {
    title: "Profile",
    href: "/settings/profile",
    icon: UserCog,
  },
  {
    title: "Account",
    href: "/settings/account",
    icon: UserCircle,
  },
  {
    title: "Security",
    href: "/settings/security",
    icon: Shield,
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: BellIcon,
  },
  {
    title: "Preferences",
    href: "/settings/preferences",
    icon: SlidersHorizontal,
  },
  {
    title: "Billing",
    href: "/settings/billing",
    icon: CreditCard,
    disabled: !siteConfig.features.billing,
  },
]

export const navConfig: NavGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        title: "Projects",
        href: "/projects",
        icon: FolderOpen,
      },
      {
        title: "Users",
        href: "/users",
        icon: Users,
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
        disabled: !siteConfig.features.analytics,
      },
      {
        title: "Activity",
        href: "/activity",
        icon: Activity,
        disabled: !siteConfig.features.auditLog,
      },
      {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
        badge: 4,
        disabled: !siteConfig.features.notifications,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        children: settingsNavConfig,
      },
    ],
  },
  {
    label: "Developer",
    items: [
      {
        title: "Components",
        href: "/components",
        icon: Blocks,
      },
    ],
  },
]
