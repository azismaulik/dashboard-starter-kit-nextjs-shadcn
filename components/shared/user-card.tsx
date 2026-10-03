"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge, RoleBadge, UserAvatar, RelativeTime } from "@/components/shared/badges"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, UserCheck, Mail, Edit, Ban, Clock } from "lucide-react"
import { toast } from "sonner"
import type { User } from "@/lib/demo-data"

export interface UserCardProps {
  user: User
  onStatusChange?: (userId: string, newStatus: User["status"]) => void
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:border-primary/40 transition-all hover:shadow-md">
      <CardContent className="p-4 space-y-3.5">
        {/* Top: Avatar, Name, Email, Menu */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <UserAvatar name={user.name} size="default" className="shrink-0" />
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">{user.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Actions for ${user.name}`}
                  className="shrink-0 text-muted-foreground hover:text-foreground"
                />
              }
            >
              <MoreHorizontal className="size-4" />
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

        {/* Badges: Role and Status */}
        <div className="flex items-center gap-2 flex-wrap">
          <RoleBadge role={user.role} />
          <StatusBadge status={user.status} />
        </div>

        {/* Footer: Last active & Quick action */}
        <div className="flex items-center justify-between border-t border-border/60 pt-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 min-w-0">
            <Clock className="size-3 shrink-0 text-muted-foreground/70" />
            <span className="text-[11px] truncate">
              Active <RelativeTime date={user.lastActiveAt} />
            </span>
          </div>
          <Button
            variant="ghost"
            size="xs"
            className="h-6 px-2 text-[11px] gap-1 hover:text-foreground shrink-0"
            onClick={() => toast.info(`Opening email client for ${user.email}`)}
          >
            <Mail className="size-3" />
            <span>Email</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
