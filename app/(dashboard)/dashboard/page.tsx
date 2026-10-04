"use client";

import * as React from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/stat-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, formatCompact } from "@/lib/utils";
import {
  demoActivity,
  demoTransactions,
  demoProjects,
  revenueData,
  projectStatusData,
} from "@/lib/demo-data";
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Download,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Database,
  Globe,
  FolderPlus,
  UserPlus,
  Key,
  CreditCard,
  Zap,
} from "lucide-react";
import {
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
import { StatusBadge, RelativeTime } from "@/components/shared/badges";
import { InviteUserDialog } from "@/components/shared/invite-user-dialog";
import { CreateProjectDialog } from "@/components/shared/create-project-dialog";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const stats = [
  {
    title: "Total Revenue",
    value: formatCurrency(34100),
    trend: 12.4,
    trendLabel: "vs last month",
    icon: <DollarSign className="size-5" />,
  },
  {
    title: "Active Users",
    value: formatCompact(521),
    trend: 8.2,
    trendLabel: "vs last month",
    icon: <Users className="size-5" />,
  },
  {
    title: "Orders & Sales",
    value: formatCompact(1284),
    trend: -3.1,
    trendLabel: "vs last month",
    icon: <ShoppingCart className="size-5" />,
  },
  {
    title: "Growth Rate",
    value: "18.7%",
    trend: 4.5,
    trendLabel: "vs last month",
    icon: <TrendingUp className="size-5" />,
  },
];

const systemServices = [
  { name: "API Gateway", status: "Operational", uptime: "99.99%", icon: Globe },
  {
    name: "PostgreSQL Database",
    status: "Healthy (12ms)",
    uptime: "99.98%",
    icon: Database,
  },
  {
    name: "Auth & Identity",
    status: "Operational",
    uptime: "100%",
    icon: ShieldCheck,
  },
  {
    name: "Edge Cache CDN",
    status: "28 regions live",
    uptime: "99.99%",
    icon: Server,
  },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = React.useState("30d");

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page header with actions & time filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {getGreeting()}, Ethan 👋
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your workspace today.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <Tabs
            value={timeRange}
            onValueChange={(val) => setTimeRange(val ?? "30d")}
          >
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="12m">1Y</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exporting workspace summary PDF...")}
            className="gap-1.5"
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button size="sm" className="gap-1.5 shrink-0">
                  <Plus className="size-3.5" />
                  <span>Create</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56 min-w-52 p-1.5">
              <InviteUserDialog>
                <button
                  type="button"
                  className="w-full relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium outline-none hover:bg-accent hover:text-accent-foreground text-left whitespace-nowrap"
                >
                  <UserPlus className="size-4 shrink-0 text-muted-foreground" />
                  <span className="whitespace-nowrap">Invite team member</span>
                </button>
              </InviteUserDialog>
              <CreateProjectDialog>
                <button
                  type="button"
                  className="w-full relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium outline-none hover:bg-accent hover:text-accent-foreground text-left whitespace-nowrap"
                >
                  <FolderPlus className="size-4 shrink-0 text-muted-foreground" />
                  <span className="whitespace-nowrap">New project</span>
                </button>
              </CreateProjectDialog>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                onClick={() => toast.info("Opening API keys page...")}
                className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium whitespace-nowrap cursor-pointer"
              >
                <Key className="size-4 shrink-0 text-muted-foreground" />
                <span className="whitespace-nowrap">API token</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toast.info("Navigating to billing...")}
                className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium whitespace-nowrap cursor-pointer"
              >
                <CreditCard className="size-4 shrink-0 text-muted-foreground" />
                <span className="whitespace-nowrap">Add subscription</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Launch Shortcuts Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <InviteUserDialog>
          <button
            type="button"
            className="group text-left w-full flex items-center gap-3 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xl p-3.5 text-card-foreground shadow-xs dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:bg-accent/40 hover:border-border hover:shadow-xs transition-all duration-200 cursor-pointer"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/80 text-foreground border border-border/60 shadow-2xs group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary/30 transition-all duration-200">
              <UserPlus className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground group-hover:text-foreground transition-colors">
                Invite Team
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                Add collaborators
              </p>
            </div>
          </button>
        </InviteUserDialog>

        <CreateProjectDialog>
          <button
            type="button"
            className="group text-left w-full flex items-center gap-3 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xl p-3.5 text-card-foreground shadow-xs dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:bg-accent/40 hover:border-border hover:shadow-xs transition-all duration-200 cursor-pointer"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/80 text-foreground border border-border/60 shadow-2xs group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary/30 transition-all duration-200">
              <FolderPlus className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground group-hover:text-foreground transition-colors">
                New Project
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                Create workspace
              </p>
            </div>
          </button>
        </CreateProjectDialog>

        <Link
          href="/analytics"
          className="group flex items-center gap-3 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xl p-3.5 text-card-foreground shadow-xs dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:bg-accent/40 hover:border-border hover:shadow-xs transition-all duration-200 cursor-pointer"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/80 text-foreground border border-border/60 shadow-2xs group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary/30 transition-all duration-200">
            <TrendingUp className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground group-hover:text-foreground transition-colors">
              Analytics Hub
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              Real-time metrics
            </p>
          </div>
        </Link>

        <Link
          href="/settings/billing"
          className="group flex items-center gap-3 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xl p-3.5 text-card-foreground shadow-xs dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:bg-accent/40 hover:border-border hover:shadow-xs transition-all duration-200 cursor-pointer"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/80 text-foreground border border-border/60 shadow-2xs group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary/30 transition-all duration-200">
            <Zap className="size-4 fill-current" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground group-hover:text-foreground transition-colors">
              Pro Plan
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              82% usage active
            </p>
          </div>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue chart - spans 2/3 */}
        <ChartCard
          title="Revenue Trajectory"
          description="Monthly recurring revenue & target forecast"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart
              data={revenueData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0.2}
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
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(v) => [formatCurrency(v as number), "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Project status donut */}
        <ChartCard
          title="Project Distribution"
          description="Active workload breakdown"
        >
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {projectStatusData.map((entry, index) => (
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
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Active Projects Milestones + System Health row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Active Projects Milestones (2 cols) */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">
                Active Project Milestones
              </CardTitle>
              <CardDescription>
                Track progress and deadlines across key initiatives
              </CardDescription>
            </div>
            <Link
              href="/projects"
              className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="size-3" />
            </Link>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {demoProjects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="space-y-1.5 rounded-xl border border-border/60 bg-muted/20 p-3 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-foreground">
                    {project.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={project.status} />
                    <span className="text-xs font-mono font-medium text-foreground">
                      {project.progress}%
                    </span>
                  </div>
                </div>
                <Progress value={project.progress} className="h-1.5" />
                <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                  <span>{project.description}</span>
                  <RelativeTime date={project.updatedAt} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System & Infrastructure Health (1 col) */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Infrastructure</CardTitle>
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] h-5"
              >
                All Systems Normal
              </Badge>
            </div>
            <CardDescription>Global services & cloud status</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {systemServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.name}
                  className="flex items-center justify-between py-1 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Icon className="size-3.5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {service.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {service.status}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {service.uptime}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Bottom row: Recent Activity + Recent Transactions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Activity */}
        <ChartCard
          title="Recent Activity"
          description="Latest team events and logs"
        >
          <ActivityFeed activities={demoActivity} />
        </ChartCard>

        {/* Recent Transactions */}
        <ChartCard
          title="Recent Transactions"
          description="Latest invoices, payments, and payouts"
        >
          <div className="divide-y divide-border/60">
            {demoTransactions.slice(0, 5).map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between py-2.5 text-xs transition-colors hover:bg-muted/30 -mx-2 px-2 rounded-lg"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted border border-border/60 text-muted-foreground">
                    <CreditCard className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">
                      {txn.description}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {txn.customer} ·{" "}
                      {formatDistanceToNow(new Date(txn.date), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="ml-3 flex shrink-0 items-center gap-2.5">
                  <span
                    className={
                      txn.amount < 0
                        ? "text-xs font-mono font-semibold text-destructive"
                        : "text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400"
                    }
                  >
                    {txn.amount < 0 ? "-" : "+"}
                    {formatCurrency(Math.abs(txn.amount))}
                  </span>
                  <StatusBadge status={txn.status} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
