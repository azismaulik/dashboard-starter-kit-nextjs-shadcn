import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserAvatar } from "@/components/shared/badges"
import { RelativeTime } from "@/components/shared/badges"
import { StatusBadge } from "@/components/shared/badges"

// ─── ActivityItem ─────────────────────────────────────────────────────────────

export interface ActivityItemData {
  id: string
  user: {
    name: string
    avatarUrl?: string
  }
  action: string
  target?: string
  timestamp: string | Date
  status?: string
}

export interface ActivityItemProps {
  item: ActivityItemData
  className?: string
}

export function ActivityItem({ item, className }: ActivityItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 py-3 first:pt-0 last:pb-0",
        className,
      )}
    >
      <UserAvatar
        name={item.user.name}
        src={item.user.avatarUrl}
        size="sm"
        className="mt-0.5 shrink-0"
      />
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm leading-none">
          <span className="font-medium">{item.user.name}</span>{" "}
          <span className="text-muted-foreground">{item.action}</span>
          {item.target && (
            <>
              {" "}
              <span className="font-medium">{item.target}</span>
            </>
          )}
        </p>
        <div className="flex items-center gap-2">
          <RelativeTime date={item.timestamp} className="text-xs" />
          {item.status && (
            <StatusBadge status={item.status} className="text-[10px] h-4" />
          )}
        </div>
      </div>
    </div>
  )
}

// ─── ActivityFeed ─────────────────────────────────────────────────────────────

export interface ActivityFeedProps {
  items: ActivityItemData[]
  title?: string
  className?: string
  maxItems?: number
  emptyMessage?: string
}

export function ActivityFeed({
  items,
  title = "Recent Activity",
  className,
  maxItems,
  emptyMessage = "No recent activity.",
}: ActivityFeedProps) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items

  return (
    <Card className={className}>
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("pt-0", !title && "pt-6")}>
        {displayItems.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        ) : (
          <div className="divide-y divide-border">
            {displayItems.map((item) => (
              <ActivityItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
