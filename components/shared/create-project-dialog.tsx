"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FolderPlus, Lock } from "lucide-react"
import { toast } from "sonner"
import type { ProjectStatus } from "@/types"

export interface CreateProjectDialogProps {
  children?: React.ReactElement
  onCreate?: (project: { name: string; description: string; status: ProjectStatus; isPrivate: boolean }) => void
}

export function CreateProjectDialog({ children, onCreate }: CreateProjectDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [status, setStatus] = React.useState<ProjectStatus>("active")
  const [isPrivate, setIsPrivate] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error("Project name is required")
      return
    }

    toast.success(`Project "${name}" created successfully`)
    onCreate?.({ name, description, status, isPrivate })
    setOpen(false)
    setName("")
    setDescription("")
    setStatus("active")
    setIsPrivate(false)
  }

  const defaultTrigger = (
    <Button id="new-project-button">
      <FolderPlus />
      New project
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        nativeButton={true}
        render={children ?? defaultTrigger}
      />
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FolderPlus className="size-5" />
              </div>
              <div>
                <DialogTitle>Create new project</DialogTitle>
                <DialogDescription>
                  Start a new project workspace for your team.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-1">
            <div className="space-y-1.5">
              <label htmlFor="project-name" className="text-xs font-medium text-foreground">
                Project Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="project-name"
                placeholder="e.g. Mobile App Redesign"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="project-description" className="text-xs font-medium text-foreground">
                Description
              </label>
              <Textarea
                id="project-description"
                placeholder="Briefly describe project objectives and scope..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none rounded-lg border border-input/80 bg-input/20 px-3 py-2 text-sm focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="project-status" className="text-xs font-medium text-foreground">
                  Initial Status
                </label>
                <Select value={status} onValueChange={(val) => setStatus((val as ProjectStatus) ?? "active")}>
                  <SelectTrigger id="project-status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="project-priority" className="text-xs font-medium text-foreground">
                  Priority
                </label>
                <Select defaultValue="Medium">
                  <SelectTrigger id="project-priority" className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High Priority</SelectItem>
                    <SelectItem value="Medium">Medium Priority</SelectItem>
                    <SelectItem value="Low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 p-3.5">
              <div className="flex items-center gap-2.5">
                <Lock className="size-4 text-muted-foreground" />
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-foreground">Private Repository</p>
                  <p className="text-[11px] text-muted-foreground">Only invited team members can view this</p>
                </div>
              </div>
              <Switch
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
                aria-label="Make project private"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" />}>
              Cancel
            </DialogClose>
            <Button type="submit">
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
