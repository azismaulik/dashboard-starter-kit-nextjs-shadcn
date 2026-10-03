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
    <nav className="flex flex-col gap-0.5">
      {settingsNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/settings")
              ? "bg-accent text-accent-foreground font-medium"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
