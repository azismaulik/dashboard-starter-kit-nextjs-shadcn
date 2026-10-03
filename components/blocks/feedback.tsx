import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, Info, CheckCircle2, XCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── EmptyState ───────────────────────────────────────────────────────────────

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
  size?: "sm" | "default" | "lg"
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  size = "default",
}: EmptyStateProps) {
  const sizeClasses = {
    sm: "py-6 px-4 gap-2",
    default: "py-10 px-6 gap-3",
    lg: "py-16 px-8 gap-4",
  }

  const iconSizeClasses = {
    sm: "size-8",
    default: "size-10",
    lg: "size-14",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizeClasses[size],
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted text-muted-foreground",
            iconSizeClasses[size],
            size === "lg" ? "mb-1 size-14 p-3" : "size-10 p-2",
          )}
        >
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p
          className={cn(
            "font-semibold",
            size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base",
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={cn(
              "text-muted-foreground",
              size === "sm" ? "text-xs" : "text-sm",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}

// ─── ErrorState ───────────────────────────────────────────────────────────────

export interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <EmptyState
      icon={<XCircle className="text-destructive" />}
      title={title}
      description={description}
      action={
        onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        )
      }
      className={className}
    />
  )
}

// ─── LoadingState ─────────────────────────────────────────────────────────────

export interface LoadingStateProps {
  title?: string
  description?: string
  className?: string
}

export function LoadingState({
  title = "Loading…",
  description,
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-10 px-6 text-center",
        className,
      )}
    >
      <div className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

// ─── InlineAlert ──────────────────────────────────────────────────────────────

type AlertVariant = "info" | "success" | "warning" | "error"

const alertConfig: Record<
  AlertVariant,
  { icon: React.ReactNode; className: string; iconClassName: string }
> = {
  info: {
    icon: <Info className="size-4" />,
    className: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300",
    iconClassName: "text-blue-500",
  },
  success: {
    icon: <CheckCircle2 className="size-4" />,
    className:
      "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    iconClassName: "text-emerald-500",
  },
  warning: {
    icon: <AlertTriangle className="size-4" />,
    className:
      "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300",
    iconClassName: "text-amber-500",
  },
  error: {
    icon: <XCircle className="size-4" />,
    className:
      "bg-destructive/10 border-destructive/20 text-destructive dark:text-destructive",
    iconClassName: "text-destructive",
  },
}

export interface InlineAlertProps {
  variant?: AlertVariant
  title?: string
  description?: string
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
  children?: React.ReactNode
}

export function InlineAlert({
  variant = "info",
  title,
  description,
  dismissible,
  onDismiss,
  className,
  children,
}: InlineAlertProps) {
  const config = alertConfig[variant]

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 text-sm",
        config.className,
        className,
      )}
    >
      <span className={cn("mt-0.5 shrink-0", config.iconClassName)}>
        {config.icon}
      </span>
      <div className="flex-1 space-y-0.5">
        {title && <p className="font-medium leading-none">{title}</p>}
        {description && (
          <p className="opacity-80">{description}</p>
        )}
        {children}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="shrink-0 opacity-60 hover:opacity-100"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
