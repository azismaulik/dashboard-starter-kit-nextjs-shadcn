"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { StatusBadge, UserAvatarGroup, RelativeTime } from "@/components/shared/badges"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ExternalLink, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import type { Project, User } from "@/lib/demo-data"

export interface ProjectCardProps {
  project: Project
  teamMembers?: User[]
  onOpen?: () => void
}

export function ProjectCard({ project, teamMembers = [] }: ProjectCardProps) {
  const memberSlice = teamMembers.slice(0, project.members)

  return (
    <Card className="flex flex-col justify-between hover:border-primary/40 transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
              {project.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-xs">
              {project.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon-xs" aria-label="Project actions" />
              }
            >
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info(`Viewing ${project.name}`)}>
                <ExternalLink className="mr-2 size-3.5" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info(`Editing ${project.name}`)}>
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
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-1.5" />
        </div>

        <div className="flex items-center justify-between border-t border-border/60 pt-3">
          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} />
          </div>
          <div className="flex items-center gap-1.5">
            <UserAvatarGroup users={memberSlice} max={3} />
            <span className="text-xs text-muted-foreground">
              {project.members}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-muted-foreground/80 flex items-center justify-between">
          <span>Updated</span>
          <RelativeTime date={project.updatedAt} />
        </div>
      </CardContent>
    </Card>
  )
}
