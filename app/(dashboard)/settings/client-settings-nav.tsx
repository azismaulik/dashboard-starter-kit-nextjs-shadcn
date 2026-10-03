"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { settingsNavConfig } from "@/config/site"
import type { NavItem } from "@/types"

export interface ClientSettingsNavProps {
  /** Optional custom nav items list (defaults to `settingsNavConfig` from `config/site.ts`) */
  items?: NavItem[]
  /** Optional container className for custom styling */
  className?: string
}

export function ClientSettingsNav({
  items = settingsNavConfig,
  className,
}: ClientSettingsNavProps) {
  const pathname = usePathname()

  // Filter out disabled items so template adopters can toggle features from config/site.ts
  const activeItems = items.filter((item) => !item.disabled)

  return (
    <nav
      aria-label="Settings navigation"
      className={cn(
        "flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none border-b border-border md:border-none -mx-4 px-4 sm:mx-0 sm:px-0",
        className
      )}
    >
      {activeItems.map((item) => {
        const Icon = item.icon
        const isActive =
          pathname === item.href ||
          (pathname.startsWith(item.href) && item.href !== "/settings")

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-accent text-accent-foreground font-medium shadow-xs"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            {Icon && (
              <Icon
                className={cn(
                  "size-4 shrink-0 transition-colors",
                  isActive
                    ? "text-accent-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />
            )}
            <span>{item.title}</span>
            {item.badge !== undefined && (
              <span className="ml-auto rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

