"use client";

import * as React from "react";
import {
  DataTable,
  DataTableColumnHeader,
  type ColumnDef,
} from "@/components/data-table/data-table";
import {
  StatusBadge,
  UserAvatarGroup,
  RelativeTime,
} from "@/components/shared/badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoProjects, demoUsers, type Project } from "@/lib/demo-data";
import {
  MoreHorizontal,
  LayoutGrid,
  List,
  FolderKanban,
  CheckCircle2,
  Clock,
  PauseCircle,
  ExternalLink,
  Edit,
  Trash2,
  Search,
  X,
  RotateCcw,
} from "lucide-react";
import { CreateProjectDialog } from "@/components/shared/create-project-dialog";
import { ProjectCard } from "@/components/shared/project-card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const columns: ColumnDef<Project, unknown>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        aria-label="Select all"
        className="size-3.5 rounded"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
        aria-label="Select row"
        className="size-3.5 rounded"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 32,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div>
          <p className="font-medium text-foreground">{project.name}</p>
          <p className="mt-0.5 max-w-70 truncate text-xs text-muted-foreground">
            {project.description}
          </p>
        </div>
      );
    },
    size: 300,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    size: 110,
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progress" />
    ),
    cell: ({ row }) => {
      const progress = row.original.progress;
      return (
        <div className="flex items-center gap-2 min-w-20">
          <div className="flex-1 rounded-full bg-muted h-1.5">
            <div
              className="h-1.5 rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">
            {progress}%
          </span>
        </div>
      );
    },
    size: 140,
  },
  {
    accessorKey: "members",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team" />
    ),
    cell: ({ row }) => {
      const memberSlice = demoUsers.slice(0, row.original.members);
      return (
        <div className="flex items-center gap-1.5">
          <UserAvatarGroup users={memberSlice} max={3} />
          <span className="text-xs text-muted-foreground tabular-nums">
            {row.original.members}
          </span>
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
    cell: ({ row }) => (
      <RelativeTime date={row.original.updatedAt} className="text-xs" />
    ),
    size: 120,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="flex items-center justify-end gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Actions for ${project.name}`}
                />
              }
            >
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => toast.info(`Viewing ${project.name}`)}
              >
                <ExternalLink className="mr-2 size-3.5" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toast.info(`Editing ${project.name}`)}
              >
                <Edit className="mr-2 size-3.5" />
                Edit Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => toast.error(`Deleted ${project.name}`)}
              >
                <Trash2 className="mr-2 size-3.5" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>(demoProjects);
  const [viewMode, setViewMode] = React.useState<"table" | "grid">("grid");
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const stats = [
    {
      label: "Active Projects",
      value: projects.filter((p) => p.status === "active").length,
      icon: FolderKanban,
      sub: "Currently in sprint",
    },
    {
      label: "Completed",
      value: projects.filter((p) => p.status === "completed").length,
      icon: CheckCircle2,
      sub: "Successfully delivered",
    },
    {
      label: "Paused",
      value: projects.filter((p) => p.status === "paused").length,
      icon: PauseCircle,
      sub: "Waiting for review",
    },
    {
      label: "Archived",
      value: projects.filter((p) => p.status === "archived").length,
      icon: Clock,
      sub: "Archived & legacy",
    },
  ];

  const handleCreateProject = (newProj: {
    name: string;
    description: string;
    status: Project["status"];
  }) => {
    const created: Project = {
      id: `p-${Date.now()}`,
      name: newProj.name,
      description: newProj.description,
      status: newProj.status,
      progress: 0,
      members: 1,
      owner: "usr_1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects((prev) => [created, ...prev]);
  };

  const filteredProjects = React.useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const hasActiveFilters = search.trim() !== "" || statusFilter !== "all";

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
            Manage, collaborate, and track milestones across your workspace
            projects.
          </p>
        </div>
        <div className="flex items-center gap-2.5 sm:self-auto self-start">
          <CreateProjectDialog onCreate={handleCreateProject} />
        </div>
      </div>

      {/* KPI Stats - 2x2 grid on mobile, 4 cols on desktop */}
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
        {/* Status filter tabs */}
        <div className="overflow-x-auto no-scrollbar max-w-full pb-0.5">
          <Tabs
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val ?? "all")}
          >
            <TabsList>
              <TabsTrigger value="all">All ({projects.length})</TabsTrigger>
              <TabsTrigger value="active">
                Active ({projects.filter((p) => p.status === "active").length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed (
                {projects.filter((p) => p.status === "completed").length})
              </TabsTrigger>
              <TabsTrigger value="paused">
                Paused ({projects.filter((p) => p.status === "paused").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search input & View switcher */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64 lg:w-72">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="h-8 pl-8 pr-8 text-xs"
              id="projects-search-input"
              aria-label="Search projects"
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

          <div className="flex items-center rounded-lg border border-border/70 bg-muted/60 p-0.5 backdrop-blur-sm shrink-0">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="gap-1.5 h-7 px-2.5 text-xs font-medium"
              aria-label="Grid view"
            >
              <LayoutGrid className="size-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="gap-1.5 h-7 px-2.5 text-xs font-medium"
              aria-label="Table view"
            >
              <List className="size-3.5" />
              <span className="hidden sm:inline">Table</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main View: Grid or Table */}
      {viewMode === "grid" ? (
        filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center bg-card/40 my-6">
            <FolderKanban className="size-8 mx-auto text-muted-foreground/60 mb-2.5" />
            <h3 className="text-sm font-semibold text-foreground">
              No projects found
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              {hasActiveFilters
                ? `No projects matched "${search || statusFilter}". Try adjusting your search term or filters.`
                : "No projects in this workspace yet. Create one to get started."}
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                teamMembers={demoUsers}
              />
            ))}
          </div>
        )
      ) : (
        <DataTable
          columns={columns}
          data={filteredProjects}
          emptyTitle="No projects found"
          emptyDescription="No projects match your current filters. Create one to get started."
        />
      )}
    </div>
  );
}
