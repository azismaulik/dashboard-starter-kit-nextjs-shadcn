"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Bell, CheckCheck } from "lucide-react";
import { demoNotifications, type Notification } from "@/lib/demo-data";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface NotificationBellProps {
  className?: string;
}

export function NotificationBell({ className }: NotificationBellProps) {
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>(demoNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Notifications (${unreadCount} unread)`}
            id="notification-bell-button"
            className={cn(
              "relative size-8 text-muted-foreground hover:text-foreground cursor-pointer transition-colors",
              className
            )}
          />
        }
      >
        <Bell className="size-4" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-destructive" />
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-destructive/10 px-1.5 py-0.2 text-[10px] font-semibold text-destructive">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <CheckCheck className="size-3" />
                <span>Mark read</span>
              </button>
            )}
            <Link
              href="/notifications"
              className="text-[11px] font-medium text-primary hover:underline"
              onClick={() => setOpen(false)}
            >
              View all
            </Link>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-72 divide-y divide-border overflow-y-auto">
          {notifications.slice(0, 5).map((notif) => (
            <div
              key={notif.id}
              className={cn(
                "group relative flex items-start gap-3 p-3 text-xs transition-colors hover:bg-muted/50",
                !notif.read && "bg-muted/20"
              )}
            >
              <span
                className={cn(
                  "mt-1 size-2 shrink-0 rounded-full",
                  notif.read ? "bg-muted-foreground/30" : "bg-primary"
                )}
              />
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none text-foreground">{notif.title}</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                  {notif.description}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted/20 px-3 py-2 text-center">
          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            See all notifications →
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
