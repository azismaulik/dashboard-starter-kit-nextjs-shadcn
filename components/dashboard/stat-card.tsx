import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";

// Re-export StatCard from blocks to ensure dashboard and components showcase use the exact same canonical implementation
export { StatCard, type StatCardProps } from "@/components/blocks/stat-card";

export interface ChartCardProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  loading?: boolean;
  empty?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ChartCard({
  title,
  description,
  action,
  loading,
  empty,
  children,
  className,
  contentClassName,
}: ChartCardProps) {
  return (
    <Card className={cn("overflow-hidden py-0 gap-0", className)}>
      <CardHeader className="border-b border-border/60 py-3 px-3.5 sm:py-3.5 sm:px-4.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
          <div className="min-w-0">
            <CardTitle className="text-sm font-semibold truncate">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-0.5 text-xs truncate">
                {description}
              </CardDescription>
            )}
          </div>
          {action && <CardAction className="self-end sm:self-auto shrink-0">{action}</CardAction>}
        </div>
      </CardHeader>
      <CardContent className={cn("p-3 sm:p-4.5 pt-2 pb-3 sm:pb-3.5", contentClassName)}>
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="size-2 animate-bounce rounded-full bg-muted-foreground"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        ) : empty ? (
          <div className="flex h-48 items-center justify-center text-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                No data
              </p>
              <p className="text-xs text-muted-foreground/60">
                Data will appear here once available
              </p>
            </div>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
