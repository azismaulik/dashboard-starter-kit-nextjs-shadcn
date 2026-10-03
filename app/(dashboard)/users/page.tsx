"use client"

import * as React from "react"
import {
  DataTable,
  DataTableColumnHeader,
  type ColumnDef,
} from "@/components/data-table/data-table"
import {
  StatusBadge,
  RoleBadge,
  UserAvatar,
  RelativeTime,
} from "@/components/shared/badges"
import { Button } from "@/components/ui/button"
import { demoUsers, type User } from "@/lib/demo-data"
import {
  MoreHorizontal,
  Users,
  UserCheck,
  Clock,
  ShieldCheck,
  Mail,
  Ban,
  Edit,
  UserPlus,
  LayoutGrid,
  List,
  Search,
  X,
  RotateCcw,
} from "lucide-react"
import { InviteUserDialog } from "@/components/shared/invite-user-dialog"
import { UserCard } from "@/components/shared/user-card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const columns: ColumnDef<User, unknown>[] = [
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
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-2.5 min-w-0">
          <UserAvatar name={user.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      )
    },
    size: 240,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
    size: 110,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} />
    ),
    size: 110,
  },
  {
    accessorKey: "lastActiveAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Active" />
    ),
    cell: ({ row }) => (
      <RelativeTime date={row.original.lastActiveAt} className="text-xs" />
    ),
    size: 130,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center justify-end gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Actions for ${user.name}`}
                />
              }
            >
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info(`Viewing profile: ${user.name}`)}>
                <UserCheck className="mr-2 size-3.5" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info(`Emailing: ${user.email}`)}>
                <Mail className="mr-2 size-3.5" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info(`Editing role for ${user.name}`)}>
                <Edit className="mr-2 size-3.5" />
                Change Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => toast.error(`Suspended ${user.name}`)}
              >
                <Ban className="mr-2 size-3.5" />
                Suspend Access
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
]

export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>(demoUsers)
  const [activeTab, setActiveTab] = React.useState("all")
  const [search, setSearch] = React.useState("")
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("table")

  const filteredUsers = React.useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        search.trim() === "" ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())

      const matchesTab =
        activeTab === "all"
          ? true
          : activeTab === "active"
          ? u.status === "active"
          : activeTab === "invited"
          ? u.status === "invited"
          : u.status === "inactive" || u.status === "suspended"

      return matchesSearch && matchesTab
    })
  }, [users, activeTab, search])

  const hasActiveFilters = search.trim() !== "" || activeTab !== "all"

  const resetFilters = () => {
    setSearch("")
    setActiveTab("all")
  }

  const stats = [
    { label: "Total Members", value: users.length, icon: Users, change: "+2 this month" },
    { label: "Active Now", value: users.filter((u) => u.status === "active").length, icon: UserCheck, change: "70% active rate" },
    { label: "Pending Invites", value: users.filter((u) => u.status === "invited").length, icon: Clock, change: "Awaiting response" },
    { label: "Admins & Owners", value: users.filter((u) => u.role === "admin" || u.role === "owner").length, icon: ShieldCheck, change: "Privileged access" },
  ]

  const handleInvite = (newUser: { name: string; email: string; role: string }) => {
    const created: User = {
      id: `u-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as User["role"],
      status: "invited",
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    }
    setUsers((prev) => [created, ...prev])
  }

  return (
    <div className="space-y-5 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Users & Team</h1>
          <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
            Manage your workspace team members, invitations, and access permissions.
          </p>
        </div>
        <InviteUserDialog onInvite={handleInvite}>
          <Button id="invite-user-button" className="w-full sm:w-auto gap-1.5">
            <UserPlus className="size-4" />
            <span>Invite user</span>
          </Button>
        </InviteUserDialog>
      </div>

      {/* Summary KPI Cards - 2x2 on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="overflow-hidden">
              <CardContent className="p-3.5 sm:p-4 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground truncate">{s.label}</p>
                  <p className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5 tabular-nums">{s.value}</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground/80 mt-0.5 truncate">{s.change}</p>
                </div>
                <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground border border-border/60">
                  <Icon className="size-4 sm:size-5" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Controls & Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Scrollable tabs on mobile */}
        <div className="overflow-x-auto no-scrollbar max-w-full pb-0.5">
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val ?? "all")}>
            <TabsList className="w-full sm:w-fit justify-start">
              <TabsTrigger value="all">All ({users.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({users.filter((u) => u.status === "active").length})</TabsTrigger>
              <TabsTrigger value="invited">Pending ({users.filter((u) => u.status === "invited").length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
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
              placeholder="Search members..."
              className="h-8 pl-8 pr-8 text-xs"
              id="users-search-input"
              aria-label="Search members"
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

      {/* Main Content: Grid / Cards or Table */}
      {viewMode === "grid" ? (
        filteredUsers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center bg-card/40 my-4">
            <Users className="size-8 mx-auto text-muted-foreground/60 mb-2.5" />
            <h3 className="text-sm font-semibold text-foreground">
              No members found
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              {hasActiveFilters
                ? `No members match "${search || activeTab}". Try adjusting your filters or search keywords.`
                : "No members in this workspace yet. Invite someone to collaborate."}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )
      ) : (
        <DataTable
          columns={columns}
          data={filteredUsers}
          emptyTitle="No members found"
          emptyDescription="No users match your selected filter or search keyword."
        />
      )}
    </div>
  )
}
