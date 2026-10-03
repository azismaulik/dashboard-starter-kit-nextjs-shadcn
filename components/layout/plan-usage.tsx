"use client";

import * as React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export interface PlanUsageProps {
  planName?: string;
  used?: number;
  total?: number;
  unit?: string;
}

export function PlanUsage({
  planName = "Pro Plan",
  used = 8200,
  total = 10000,
  unit = "API units",
}: PlanUsageProps) {
  const { state } = useSidebar();
  if (state === "collapsed") return null;

  const percentage = Math.round((used / total) * 100);

  return (
    <div className="mx-2 mb-2 rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-sidebar-foreground">
          {planName}
        </span>
        <Badge
          variant="secondary"
          className="gap-1 bg-primary/10 text-primary hover:bg-primary/20"
        >
          <Sparkles className="size-2.5" />
          Active
        </Badge>
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground font-mono">
        {formatNumber(used)} / {formatNumber(total)} {unit}
      </p>
      <div className="mt-2">
        <Progress value={percentage} className="h-1.5" />
      </div>
    </div>
  );
}
