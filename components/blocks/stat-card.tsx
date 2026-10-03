import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// ─── StatCard ─────────────────────────────────────────────────────────────────
// Displays metric summaries with icon on the right (large, prominent) and trend below.

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  trendInverse?: boolean;
  trendLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export function StatCard({
  title,
  value,
  description,
  trend,
  trendInverse,
  trendLabel,
  icon,
  className,
  loading = false,
}: StatCardProps) {
  if (loading) {
    return (
      <Card className={cn("p-5", className)}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-8 w-28" />
          </div>
          <Skeleton className="size-12 rounded-xl shrink-0" />
        </div>
        <Skeleton className="mt-3 h-3.5 w-36" />
      </Card>
    );
  }

  const isPositive = trendInverse ? (trend ?? 0) < 0 : (trend ?? 0) > 0;
  const isNegative = trendInverse ? (trend ?? 0) > 0 : (trend ?? 0) < 0;

  const trendIcon =
    trend === undefined ? null : trend > 0 ? (
      <TrendingUp className="size-3.5" />
    ) : trend < 0 ? (
      <TrendingDown className="size-3.5" />
    ) : (
      <Minus className="size-3.5" />
    );

  const trendColor =
    trend === undefined
      ? ""
      : isPositive
        ? "text-emerald-600 dark:text-emerald-400"
        : isNegative
          ? "text-destructive"
          : "text-muted-foreground";

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-xs",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-4 p-3.5 sm:p-5 pb-1 sm:pb-2">
        <div className="space-y-0.5 sm:space-y-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground truncate">
            {title}
          </p>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground tabular-nums truncate">
            {value}
          </div>
        </div>
        {icon && (
          <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-muted/80 text-foreground border border-border/60 shadow-2xs [&_svg]:size-3.5 sm:[&_svg]:size-4! [&>svg]:size-3.5 sm:[&>svg]:size-4!">
            {icon}
          </div>
        )}
      </div>
      {(trend !== undefined || description || trendLabel) && (
        <div className="px-3.5 sm:px-5 pb-3 sm:pb-4 pt-0.5 flex items-center gap-1.5 text-[11px] sm:text-xs min-w-0">
          {trend !== undefined && (
            <span
              className={cn(
                "flex items-center gap-0.5 font-medium shrink-0",
                trendColor,
              )}
            >
              {trendIcon}
              {Math.abs(trend).toFixed(1)}%
            </span>
          )}
          {description && (
            <span className="text-muted-foreground truncate">{description}</span>
          )}
          {trendLabel && (
            <span className="text-muted-foreground truncate">{trendLabel}</span>
          )}
        </div>
      )}
    </Card>
  );
}

// ─── StatCardGrid ─────────────────────────────────────────────────────────────

export function StatCardGrid({
  children,
  className,
  cols = 4,
}: {
  children: React.ReactNode;
  className?: string;
  cols?: 2 | 3 | 4;
}) {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[cols];

  return (
    <div className={cn("grid gap-4", colClass, className)}>{children}</div>
  );
}
