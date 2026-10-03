import * as React from "react"
import { cn } from "@/lib/utils"
import { type LucideIcon, Inbox, AlertTriangle, Lock, FileQuestion, ServerCrash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  className?: string
}

function BaseState({ icon: Icon, title, description, action, className }: StateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className
      )}
    >
      {Icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      )}
      <div className="max-w-xs space-y-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

export function EmptyState({ className, ...props }: Omit<StateProps, "icon"> & { icon?: LucideIcon }) {
  return <BaseState icon={props.icon ?? Inbox} {...props} className={className} />
}

export function ErrorState({ className, ...props }: Omit<StateProps, "icon"> & { icon?: LucideIcon }) {
  return (
    <BaseState
      icon={props.icon ?? ServerCrash}
      title={props.title ?? "Something went wrong"}
      description={props.description ?? "We couldn't load this content. Please try again."}
      action={props.action}
      className={className}
    />
  )
}

export function UnauthorizedState({ className, ...props }: Partial<StateProps>) {
  return (
    <BaseState
      icon={Lock}
      title={props.title ?? "Access denied"}
      description={props.description ?? "You don't have permission to view this content."}
      action={props.action ?? { label: "Go back", onClick: () => history.back() }}
      className={className}
    />
  )
}

export function NotFoundState({ className, ...props }: Partial<StateProps>) {
  return (
    <BaseState
      icon={FileQuestion}
      title={props.title ?? "Not found"}
      description={props.description ?? "The resource you're looking for doesn't exist."}
      action={props.action ?? { label: "Go back", onClick: () => history.back() }}
      className={className}
    />
  )
}

export function LoadingState({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-16", className)}>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export { Skeleton }

export function AlertBanner({
  title,
  description,
  variant = "default",
  className,
}: {
  title?: string
  description: string
  variant?: "default" | "destructive"
  className?: string
}) {
  return (
    <Alert variant={variant} className={className}>
      <AlertTriangle className="size-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="size-8 rounded-full" />
      </div>
      <Skeleton className="mt-3 h-7 w-20" />
      <Skeleton className="mt-2 h-3 w-32" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-3 border-b border-border pb-2">
        {[80, 200, 120, 100, 80].map((w, i) => (
          <Skeleton key={i} className="h-3" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3 py-2">
          {[80, 200, 120, 100, 80].map((w, j) => (
            <Skeleton key={j} className="h-3" style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  )
}
