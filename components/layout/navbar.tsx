"use client";

import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";
import { SearchTrigger } from "@/components/layout/search-trigger";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NotificationBell } from "@/components/layout/notification-bell";
import { UserMenu } from "@/components/layout/user-menu";
import { cn } from "@/lib/utils";

export type NavbarProps = React.HTMLAttributes<HTMLElement>;

export function Navbar({ className, ...props }: NavbarProps = {}) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-30",
        className,
      )}
      {...props}
    >
      {/* Left section: Sidebar trigger, Separator, Breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        <Separator orientation="vertical" className="h-4" />
        <BreadcrumbNav />
      </div>

      {/* Right section: Search Everything, Theme toggle, Notifications, User menu */}
      <div className="flex items-center gap-2 shrink-0">
        <SearchTrigger />
        <Separator orientation="vertical" className="hidden sm:block h-4" />
        <ThemeToggle />
        <NotificationBell />
        <Separator orientation="vertical" className="h-4" />
        <UserMenu />
      </div>
    </header>
  );
}
