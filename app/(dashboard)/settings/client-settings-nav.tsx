"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const settingsNav = [
  { title: "Profile", href: "/settings/profile" },
  { title: "Account", href: "/settings/account" },
  { title: "Security", href: "/settings/security" },
  { title: "Notifications", href: "/settings/notifications" },
  { title: "Preferences", href: "/settings/preferences" },
  { title: "Billing", href: "/settings/billing" },
]

export function ClientSettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none border-b border-border md:border-none -mx-4 px-4 sm:mx-0 sm:px-0">
      {settingsNav.map((item) => {
        const isActive =
          pathname === item.href ||
          (pathname.startsWith(item.href) && item.href !== "/settings")

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
