"use client"

import * as React from "react"
import {
  useLegacyTable as useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type LegacyColumnDef as ColumnDef,
  type LegacyColumn as Column,
  type LegacyReactTable as Table,
  type LegacyRow as Row,
  type LegacyCell as Cell,
  type LegacyHeader as Header,
  type LegacyHeaderGroup as HeaderGroup,
} from "@tanstack/react-table/legacy"
import { flexRender } from "@tanstack/react-table"
import type {
  RowSelectionState,
  ColumnVisibilityState as VisibilityState,
  SortingState,
  PaginationState,
} from "@tanstack/table-core"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Table as TableComponent,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Settings2,
  X,
  Search,
} from "lucide-react"
import { TableSkeleton, EmptyState } from "@/components/feedback/states"

export type { ColumnDef, Column, Table, Row, Cell, Header, HeaderGroup }

// ─── DataTable Component ──────────────────────────────────────────────────────

export interface DataTableProps<TData extends object> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  loading?: boolean
  searchKey?: string
  searchPlaceholder?: string
  toolbar?: React.ReactNode
  emptyTitle?: string
  emptyDescription?: string
  className?: string
}

export function DataTable<TData extends object>({
  columns,
  data,
  loading,
  searchKey,
  searchPlaceholder = "Search...",
  toolbar,
  emptyTitle = "No results",
  emptyDescription = "No items match your current filters.",
  className,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable<TData>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      rowSelection,
      columnVisibility,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    globalFilterFn: "includesString",
  })

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Toolbar */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 w-full">
          {searchKey !== undefined && (
            <DataTableSearch
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder={searchPlaceholder}
            />
          )}
          {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
        </div>
        <div className="flex items-center justify-end gap-2 shrink-0">
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedCount > 0 && (
        <DataTableBulkActions
          count={selectedCount}
          onClear={() => setRowSelection({})}
        />
      )}

      {/* Table */}
      <div className="rounded-md border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="p-4">
            <TableSkeleton rows={5} />
          </div>
        ) : (
          <TableComponent>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header: Header<TData, unknown>) => (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center"
                  >
                    <EmptyState
                      title={emptyTitle}
                      description={emptyDescription}
                      className="py-6"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row: Row<TData>) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row
                      .getVisibleCells()
                      .map((cell: Cell<TData, unknown>) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </TableComponent>
        )}
      </div>

      {/* Pagination */}
      {!loading && table.getRowModel().rows.length > 0 && (
        <DataTablePagination
          table={table}
          totalRows={table.getFilteredRowModel().rows.length}
        />
      )}
    </div>
  )
}

// ─── DataTableSearch ──────────────────────────────────────────────────────────

interface DataTableSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function DataTableSearch({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: DataTableSearchProps) {
  return (
    <div className={cn("relative w-full sm:max-w-xs", className)}>
      <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8.5 w-full rounded-lg border border-input/80 bg-background/80 pl-8 pr-7 text-xs placeholder:text-muted-foreground shadow-2xs focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
        id="data-table-search"
        aria-label="Search"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
          aria-label="Clear search"
        >
          <X className="size-3" />
        </button>
      )}
    </div>
  )
}

// ─── DataTableColumnHeader ────────────────────────────────────────────────────

interface DataTableColumnHeaderProps<TData extends object, TValue = unknown> {
  column: Column<TData, TValue>
  title: string
  className?: string
}

export function DataTableColumnHeader<TData extends object, TValue = unknown>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <span className={cn("text-xs font-semibold", className)}>{title}</span>
  }

  const isSorted = column.getIsSorted()

  return (
    <button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={cn(
        "group -ml-1.5 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        isSorted && "text-foreground",
        className
      )}
    >
      <span>{title}</span>
      {isSorted === "desc" ? (
        <ChevronDown className="size-3" />
      ) : isSorted === "asc" ? (
        <ChevronUp className="size-3" />
      ) : (
        <ChevronsUpDown className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  )
}

// ─── DataTableBulkActions ─────────────────────────────────────────────────────

interface DataTableBulkActionsProps {
  count: number
  onClear: () => void
  onDelete?: () => void
}

export function DataTableBulkActions({
  count,
  onClear,
}: DataTableBulkActionsProps) {
  return (
    <div className="flex items-center justify-between rounded-md bg-accent px-3 py-1.5 text-xs">
      <span className="font-medium">
        {count} item{count !== 1 ? "s" : ""} selected
      </span>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="xs" onClick={onClear}>
          Deselect all
        </Button>
      </div>
    </div>
  )
}

// ─── DataTableViewOptions ─────────────────────────────────────────────────────

export interface DataTableViewOptionsProps<TData extends object> {
  table: Table<TData>
}

export function DataTableViewOptions<TData extends object>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            id="data-table-view-options"
            aria-label="Toggle column visibility"
          />
        }
      >
        <Settings2 className="mr-1.5 size-3.5" />
        Columns
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((col: Column<TData, unknown>) => col.getCanHide())
            .map((col: Column<TData, unknown>) => (
              <label
                key={col.id}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-xs hover:bg-accent select-none"
              >
                <input
                  type="checkbox"
                  checked={col.getIsVisible()}
                  onChange={(e) => col.toggleVisibility(e.target.checked)}
                  className="size-3.5 rounded border-border"
                />
                <span className="truncate">
                  {typeof col.columnDef.header === "string"
                    ? col.columnDef.header
                    : col.id}
                </span>
              </label>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── DataTablePagination ──────────────────────────────────────────────────────

interface DataTablePaginationProps<TData extends object> {
  table: Table<TData>
  totalRows: number
}

export function DataTablePagination<TData extends object>({
  table,
  totalRows,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination
  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalRows)

  return (
    <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
      <div>
        <span>
          {start}–{end} of {totalRows} result{totalRows !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="First page"
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </Button>
        <span className="px-2 text-xs">
          Page {pageIndex + 1} of {table.getPageCount() || 1}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Last page"
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
