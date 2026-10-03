import * as React from "react"
import { cn, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export {
  UserAvatar,
  UserAvatarGroup,
  type UserAvatarProps,
  type UserAvatarGroupProps,
} from "./user-avatar"

// Status Badge
type StatusVariant =
  | "active"
  | "inactive"
  | "suspended"
  | "invited"
  | "pending"
  | "completed"
  | "paused"
  | "archived"

const statusConfig: Record<
  StatusVariant,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground border-border",
  },
  suspended: {
    label: "Suspended",
    className:
      "bg-destructive/10 text-destructive border-destructive/20 dark:text-destructive dark:border-destructive/30",
  },
  invited: {
    label: "Invited",
    className:
      "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
  },
  pending: {
    label: "Pending",
    className:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400 dark:border-amber-500/30",
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
  },
  paused: {
    label: "Paused",
    className:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400 dark:border-amber-500/30",
  },
  archived: {
    label: "Archived",
    className: "bg-muted text-muted-foreground border-border",
  },
}

interface StatusBadgeProps {
  status: StatusVariant | string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status as StatusVariant] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border",
  }

  return (
    <Badge
      variant="outline"
      className={cn("gap-1 font-medium", config.className, className)}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {config.label}
    </Badge>
  )
}

// Role Badge
type RoleVariant = "owner" | "admin" | "member" | "viewer"

const roleConfig: Record<RoleVariant, { label: string; className: string }> = {
  owner: {
    label: "Owner",
    className:
      "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400 dark:border-violet-500/30",
  },
  admin: {
    label: "Admin",
    className:
      "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
  },
  member: {
    label: "Member",
    className: "bg-muted text-muted-foreground border-border",
  },
  viewer: {
    label: "Viewer",
    className: "bg-muted text-muted-foreground border-border",
  },
}

interface RoleBadgeProps {
  role: RoleVariant | string
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = roleConfig[role as RoleVariant] ?? {
    label: role,
    className: "bg-muted text-muted-foreground border-border",
  }

  return (
    <Badge
      variant="outline"
      className={cn("font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  )
}

// Relative time display
interface RelativeTimeProps {
  date: string | Date
  className?: string
}

export function RelativeTime({ date, className }: RelativeTimeProps) {
  const formatted = formatDistanceToNow(new Date(date), { addSuffix: true })
  return (
    <time
      dateTime={new Date(date).toISOString()}
      title={formatDate(date)}
      className={cn("text-muted-foreground", className)}
      suppressHydrationWarning
    >
      {formatted}
    </time>
  )
}

// Date display
interface DateDisplayProps {
  date: string | Date
  format?: "short" | "medium" | "long"
  className?: string
}

export function DateDisplay({
  date,
  format = "medium",
  className,
}: DateDisplayProps) {
  const d = new Date(date)
  const opts: Intl.DateTimeFormatOptions =
    format === "short"
      ? { month: "short", day: "numeric" }
      : format === "long"
      ? { year: "numeric", month: "long", day: "numeric" }
      : { year: "numeric", month: "short", day: "numeric" }

  return (
    <time dateTime={d.toISOString()} className={className}>
      {d.toLocaleDateString("en-US", opts)}
    </time>
  )
}
