"use client";

import * as React from "react";
import { demoActivity } from "@/lib/demo-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar, RelativeTime } from "@/components/shared/badges";
import {
  Activity,
  Download,
  Search,
  ShieldAlert,
  GitCommit,
  UserPlus,
  CreditCard,
  Layers,
  CheckCircle2,
  X,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

const categoryIcons: Record<string, React.ReactNode> = {
  project: <Layers className="size-3.5 text-blue-500" />,
  user: <UserPlus className="size-3.5 text-emerald-500" />,
  deploy: <GitCommit className="size-3.5 text-purple-500" />,
  billing: <CreditCard className="size-3.5 text-amber-500" />,
  security: <ShieldAlert className="size-3.5 text-rose-500" />,
  default: <Activity className="size-3.5 text-muted-foreground" />,
};

export default function ActivityPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("all");

  const filtered = React.useMemo(() => {
    return demoActivity.filter((item) => {
      const actorName = item.actor.name;
      const resource = item.resource;
      const metaProject = item.metadata?.project ?? "";
      const metaUser = item.metadata?.user ?? "";

      const matchesSearch =
        search.trim() === "" ||
        actorName.toLowerCase().includes(search.toLowerCase()) ||
        item.action.toLowerCase().includes(search.toLowerCase()) ||
        resource.toLowerCase().includes(search.toLowerCase()) ||
        metaProject.toLowerCase().includes(search.toLowerCase()) ||
        metaUser.toLowerCase().includes(search.toLowerCase());

      if (category === "all") return matchesSearch;
      if (category === "projects") {
        return (
          matchesSearch &&
          (item.resource === "project" ||
            item.action.toLowerCase().includes("project") ||
            metaProject !== "")
        );
      }
      if (category === "team") {
        return (
          matchesSearch &&
          (item.resource === "user" ||
            item.action.toLowerCase().includes("user") ||
            item.action.toLowerCase().includes("role") ||
            item.action.toLowerCase().includes("invite") ||
            metaUser !== "")
        );
      }
      if (category === "security") {
        return (
          matchesSearch &&
          (item.resource === "security" ||
            item.action.toLowerCase().includes("key") ||
            item.action.toLowerCase().includes("security") ||
            item.action.toLowerCase().includes("api"))
        );
      }
      return matchesSearch;
    });
  }, [search, category]);

  const stats = [
    {
      label: "Total Events",
      value: "1,428",
      sub: "Past 30 days",
      icon: Activity,
    },
    {
      label: "Deployments",
      value: "48",
      sub: "100% success",
      icon: GitCommit,
    },
    {
      label: "Security Audits",
      value: "0 alerts",
      sub: "All enforced",
      icon: ShieldAlert,
    },
    {
      label: "Active Members",
      value: "14",
      sub: "Across workspace",
      icon: CheckCircle2,
    },
  ];

  const hasActiveFilters = search.trim() !== "" || category !== "all";

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
  };

  return (
    <div className="space-y-5 sm:space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Activity & Audit Log
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
            A comprehensive, real-time record of all actions, deployments, and security events.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Exporting audit log as CSV...")}
          className="w-full sm:w-auto gap-1.5 h-8 px-3 text-xs"
        >
          <Download className="size-3.5" />
          <span>Export log</span>
        </Button>
      </div>

      {/* KPI Stats - 2x2 on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="overflow-hidden">
              <CardContent className="p-3.5 sm:p-4 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground truncate">
                    {s.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5 tabular-nums">
                    {s.value}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground/80 mt-0.5 truncate">
                    {s.sub}
                  </p>
                </div>
                <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground border border-border/60">
                  <Icon className="size-4 sm:size-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Horizontal scrollable category tabs */}
        <div className="overflow-x-auto no-scrollbar max-w-full pb-0.5">
          <Tabs
            value={category}
            onValueChange={(val) => setCategory(val ?? "all")}
          >
            <TabsList className="w-full sm:w-fit justify-start h-8">
              <TabsTrigger value="all" className="px-2.5 text-xs">
                All ({demoActivity.length})
              </TabsTrigger>
              <TabsTrigger value="projects" className="px-2.5 text-xs">
                Projects
              </TabsTrigger>
              <TabsTrigger value="team" className="px-2.5 text-xs">
                Team
              </TabsTrigger>
              <TabsTrigger value="security" className="px-2.5 text-xs">
                Security
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search input with clear button */}
        <div className="relative w-full sm:w-64 lg:w-72">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-8 text-xs h-8"
            id="activity-search-input"
            aria-label="Search activities"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Timeline Card */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border/60 py-3.5 px-4 sm:px-5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm sm:text-base font-semibold">Audit Trail</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Showing {filtered.length} event{filtered.length !== 1 ? "s" : ""} matching your criteria.
              </CardDescription>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">Live Stream</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3.5 sm:p-5">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center bg-card/40 my-2">
              <Activity className="size-8 mx-auto text-muted-foreground/60 mb-2.5" />
              <h3 className="text-sm font-semibold text-foreground">
                No events found
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                {hasActiveFilters
                  ? `No activity matches "${search || category}". Try adjusting your search keywords or category.`
                  : "No events recorded in this workspace yet."}
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3.5 gap-1.5"
                  onClick={resetFilters}
                >
                  <RotateCcw className="size-3" />
                  <span>Reset filters</span>
                </Button>
              )}
            </div>
          ) : (
            <div className="relative pl-5 sm:pl-7 space-y-4 sm:space-y-5 before:absolute before:left-2 sm:before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-border/80">
              {filtered.map((item, index) => {
                const icon =
                  item.resource === "project" || item.action.includes("project")
                    ? categoryIcons.project
                    : item.resource === "user" || item.action.includes("user") || item.action.includes("role")
                    ? categoryIcons.user
                    : item.resource === "security" || item.action.includes("key")
                    ? categoryIcons.security
                    : categoryIcons.default;

                const targetName =
                  item.metadata?.project ||
                  item.metadata?.user ||
                  item.resource;

                return (
                  <div key={item.id || index} className="relative group">
                    {/* Timeline icon node */}
                    <div className="absolute -left-5 sm:-left-7 top-1 flex size-4.5 sm:size-5 items-center justify-center rounded-full bg-background border border-border shadow-2xs">
                      {icon}
                    </div>

                    <div className="rounded-xl border border-border/60 bg-card p-3 sm:p-3.5 hover:bg-muted/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        {/* Actor & Action */}
                        <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                          <UserAvatar
                            name={item.actor.name}
                            size="sm"
                            className="shrink-0 mt-0.5 sm:mt-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs text-foreground leading-snug">
                              <span className="font-semibold text-foreground">
                                {item.actor.name}
                              </span>{" "}
                              <span className="text-muted-foreground">
                                {item.action}
                              </span>{" "}
                              <span className="font-medium text-foreground underline-offset-2 hover:underline cursor-pointer">
                                {targetName}
                              </span>
                            </p>
                            {item.metadata?.field && (
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                changed <span className="font-mono text-foreground/80">{item.metadata.field}</span>
                                {item.metadata.value && (
                                  <> to <span className="font-medium text-foreground">{item.metadata.value}</span></>
                                )}
                              </p>
                            )}
                            {item.metadata?.role && (
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                assigned as <span className="font-medium text-foreground">{item.metadata.role}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Badges & Timestamp */}
                        <div className="shrink-0 flex items-center justify-between sm:justify-end gap-2 pl-8 sm:pl-0 pt-0.5 sm:pt-0">
                          <Badge
                            variant="outline"
                            className="text-[10px] font-normal py-0 h-5 capitalize"
                          >
                            {item.resource}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground tabular-nums font-medium">
                            <RelativeTime date={item.timestamp} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
