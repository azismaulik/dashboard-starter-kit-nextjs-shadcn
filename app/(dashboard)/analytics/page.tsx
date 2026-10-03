"use client";

import * as React from "react";
import { ChartCard } from "@/components/dashboard/stat-card";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { revenueData } from "@/lib/demo-data";
import { formatCurrency, formatCompact, cn } from "@/lib/utils";
import {
  Users,
  TrendingUp,
  BarChart3,
  Download,
  Zap,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toast } from "sonner";

const topPages = [
  {
    path: "/api/v1/auth/login",
    views: "142,390",
    latency: "42ms",
    errorRate: "0.02%",
    status: "healthy",
  },
  {
    path: "/dashboard/analytics",
    views: "98,210",
    latency: "65ms",
    errorRate: "0.00%",
    status: "healthy",
  },
  {
    path: "/api/v1/projects",
    views: "64,800",
    latency: "112ms",
    errorRate: "0.15%",
    status: "degraded",
  },
  {
    path: "/settings/billing",
    views: "24,510",
    latency: "89ms",
    errorRate: "0.01%",
    status: "healthy",
  },
  {
    path: "/api/v1/webhooks",
    views: "18,920",
    latency: "38ms",
    errorRate: "0.00%",
    status: "healthy",
  },
];

const deviceData = [
  { name: "Desktop", value: 68, fill: "var(--color-primary)" },
  { name: "Mobile", value: 24, fill: "var(--color-chart-2)" },
  { name: "Tablet & Others", value: 8, fill: "var(--color-chart-3)" },
];

const timeRangeStats: Record<
  string,
  {
    revenue: number;
    revenueTrend: number;
    users: number;
    usersTrend: number;
    latency: number;
    latencyTrend: number;
    conversion: number;
    conversionTrend: number;
  }
> = {
  "7d": {
    revenue: 8420,
    revenueTrend: 5.4,
    users: 142,
    usersTrend: 3.1,
    latency: 45,
    latencyTrend: -8.2,
    conversion: 3.92,
    conversionTrend: 0.8,
  },
  "30d": {
    revenue: 34100,
    revenueTrend: 12.4,
    users: 521,
    usersTrend: 8.2,
    latency: 48,
    latencyTrend: -14.5,
    conversion: 3.84,
    conversionTrend: 1.2,
  },
  "90d": {
    revenue: 98600,
    revenueTrend: 18.7,
    users: 1480,
    usersTrend: 15.3,
    latency: 49,
    latencyTrend: -10.1,
    conversion: 3.75,
    conversionTrend: 0.5,
  },
  "12m": {
    revenue: 348500,
    revenueTrend: 28.3,
    users: 4920,
    usersTrend: 24.6,
    latency: 52,
    latencyTrend: -6.4,
    conversion: 3.68,
    conversionTrend: 1.9,
  },
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState("30d");
  const [activeMetric, setActiveMetric] = React.useState<"revenue" | "users">(
    "revenue",
  );

  const currentStats = timeRangeStats[timeRange] ?? timeRangeStats["30d"];

  return (
    <div className="space-y-5 sm:space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Analytics & Performance
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
            Track real-time traffic, conversion funnels, latency metrics, and
            user growth.
          </p>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <div className="overflow-x-auto no-scrollbar">
            <Tabs
              value={timeRange}
              onValueChange={(val) => setTimeRange(val ?? "30d")}
            >
              <TabsList className="h-8">
                <TabsTrigger value="7d" className="px-2.5 text-xs">
                  7D
                </TabsTrigger>
                <TabsTrigger value="30d" className="px-2.5 text-xs">
                  30D
                </TabsTrigger>
                <TabsTrigger value="90d" className="px-2.5 text-xs">
                  90D
                </TabsTrigger>
                <TabsTrigger value="12m" className="px-2.5 text-xs">
                  1Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.success(
                `Analytics report for ${timeRange.toUpperCase()} downloaded`,
              )
            }
            className="gap-1.5 h-8 px-2.5 sm:px-3 text-xs shrink-0"
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats - 2x2 on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(currentStats.revenue)}
          trend={currentStats.revenueTrend}
          trendLabel="vs prev"
          icon={<TrendingUp className="size-4" />}
        />
        <StatCard
          title="Active Users"
          value={formatCompact(currentStats.users)}
          trend={currentStats.usersTrend}
          trendLabel="vs prev"
          icon={<Users className="size-4" />}
        />
        <StatCard
          title="Avg. Latency"
          value={`${currentStats.latency}ms`}
          trend={currentStats.latencyTrend}
          trendInverse={true}
          trendLabel="latency"
          icon={<Zap className="size-4" />}
        />
        <StatCard
          title="Conversion Rate"
          value={`${currentStats.conversion}%`}
          trend={currentStats.conversionTrend}
          trendLabel="vs prev"
          icon={<BarChart3 className="size-4" />}
        />
      </div>

      {/* System Vitals Ribbon - responsive on all screen sizes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 rounded-xl border border-border/80 bg-muted/30 p-2.5 sm:p-3">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider truncate">
              System Status
            </p>
            <p className="text-xs font-semibold text-foreground truncate">
              All Operational
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-blue-500 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider truncate">
              Uptime (30d)
            </p>
            <p className="text-xs font-semibold text-foreground tabular-nums truncate">
              99.98%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-indigo-500 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider truncate">
              Global TTFB
            </p>
            <p className="text-xs font-semibold text-foreground tabular-nums truncate">
              34ms
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider truncate">
              Cache Hit Rate
            </p>
            <p className="text-xs font-semibold text-foreground tabular-nums truncate">
              94.8%
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main Growth Trajectory Chart (2 cols on lg) */}
        <ChartCard
          title={
            activeMetric === "revenue"
              ? "Revenue Growth Trajectory"
              : "Active Users Trajectory"
          }
          description="Gross volume and target projections over time"
          className="lg:col-span-2"
          action={
            <div className="flex items-center rounded-lg border border-border/70 bg-muted/60 p-0.5 backdrop-blur-sm shrink-0">
              <button
                type="button"
                onClick={() => setActiveMetric("revenue")}
                className={cn(
                  "px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer",
                  activeMetric === "revenue"
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Revenue
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric("users")}
                className={cn(
                  "px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer",
                  activeMetric === "users"
                    ? "bg-background text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Users
              </button>
            </div>
          }
        >
          <div className="h-55 sm:h-65 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="analyticsGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) =>
                    activeMetric === "revenue"
                      ? `$${(v / 1000).toFixed(0)}k`
                      : `${v}`
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(v) => [
                    activeMetric === "revenue"
                      ? formatCurrency(v as number)
                      : `${v} users`,
                    activeMetric === "revenue" ? "Revenue" : "Users",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  stroke="var(--color-primary)"
                  strokeWidth={2.5}
                  fill="url(#analyticsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Device Breakdown Donut (1 col) */}
        <ChartCard
          title="Platform Distribution"
          description="Traffic segmented by client type"
        >
          <div className="h-55 sm:h-65 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(v) => [`${v}%`, "Traffic Share"]}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Second Row: User Acquisition vs Top Endpoints */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* User Acquisition BarChart */}
        <ChartCard
          title="User Acquisition"
          description="New monthly signups and onboarding"
        >
          <div className="h-52.5 sm:h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(v) => [v as number, "New Signups"]}
                />
                <Bar
                  dataKey="users"
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Top Endpoints Table */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border/60 py-3 px-3.5 sm:py-3.5 sm:px-4.5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">
                  Top Performing Endpoints
                </CardTitle>
                <CardDescription className="mt-0.5 text-xs">
                  Most requested routes and health status
                </CardDescription>
              </div>
              <Activity className="size-4 text-muted-foreground/70 shrink-0" />
            </div>
          </CardHeader>
          <CardContent className="p-3.5 sm:p-4 pt-1 sm:pt-1">
            <div className="divide-y divide-border/60">
              {topPages.map((page) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between py-2.5 text-xs gap-2 sm:gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono font-medium truncate text-foreground text-[11px] sm:text-xs">
                      {page.path}
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">
                      <span>{page.views} reqs</span>
                      <span>•</span>
                      <span className="font-mono">{page.latency}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] sm:text-[11px] font-medium px-1.5 py-0.5",
                        page.status === "healthy"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
                      )}
                    >
                      {page.errorRate}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
