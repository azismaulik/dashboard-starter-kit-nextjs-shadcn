import { cn } from "@/lib/utils"
import { type Activity } from "@/lib/demo-data"
import { formatDistanceToNow } from "date-fns"
import { getInitials } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ActivityFeedProps {
  activities: Activity[]
  className?: string
}

function getActionLabel(action: string, resource: string, metadata?: Record<string, string>) {
  const resourceLabel = metadata?.[resource] ?? resource
  switch (action) {
    case "created":
      return `created ${resource} "${resourceLabel}"`
    case "updated":
      return `updated ${resource} "${metadata?.project ?? metadata?.[resource] ?? resourceLabel}"`
    case "invited":
      return `invited ${metadata?.user ?? resourceLabel}`
    case "changed role":
      return `changed ${metadata?.user ?? resourceLabel}'s role`
    case "deleted":
      return `deleted ${resource} "${resourceLabel}"`
    default:
      return `${action} ${resource}`
  }
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("divide-y divide-border/60", className)}>
      {activities.slice(0, 5).map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between py-2.5 text-xs transition-colors hover:bg-muted/30 -mx-2 px-2 rounded-lg"
        >
          {/* Left: Avatar + Details */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted border border-border/60 text-[10px] font-semibold text-muted-foreground">
              {getInitials(activity.actor.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">
                <span>{activity.actor.name}</span>{" "}
                <span className="text-muted-foreground font-normal">
                  {getActionLabel(activity.action, activity.resource, activity.metadata)}
                </span>
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Right: Badge */}
          <div className="ml-3 shrink-0">
            <Badge variant="outline" className="text-[10px] h-5 py-0 font-normal">
              {activity.action.split(" ")[0]}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
