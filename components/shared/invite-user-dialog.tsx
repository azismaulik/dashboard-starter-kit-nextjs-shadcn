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
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserPlus } from "lucide-react"
import { toast } from "sonner"

export interface InviteUserDialogProps {
  children?: React.ReactElement
  onInvite?: (user: { name: string; email: string; role: string }) => void
}

export function InviteUserDialog({ children, onInvite }: InviteUserDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [role, setRole] = React.useState("member")
  const [canManageBilling, setCanManageBilling] = React.useState(false)
  const [canInviteMembers, setCanInviteMembers] = React.useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter a valid email address")
      return
    }

    toast.success(`Invitation sent to ${email} as ${role}`)
    onInvite?.({ name: name || email.split("@")[0], email, role })
    setOpen(false)
    setName("")
    setEmail("")
    setRole("member")
  }

  const defaultTrigger = (
    <Button id="invite-user-button">
      <UserPlus />
      Invite user
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        nativeButton={true}
        render={children ?? defaultTrigger}
      />
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserPlus className="size-5" />
              </div>
              <div>
                <DialogTitle>Invite team member</DialogTitle>
                <DialogDescription>
                  Send an email invitation to collaborate on your workspace.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-1">
            <div className="space-y-1.5">
              <label htmlFor="invite-name" className="text-xs font-medium text-foreground">
                Full Name
              </label>
              <Input
                id="invite-name"
                placeholder="e.g. Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="invite-email" className="text-xs font-medium text-foreground">
                Email address <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="alex@acmecorp.io"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="invite-role" className="text-xs font-medium text-foreground">
                Role & Permissions
              </label>
              <Select value={role} onValueChange={(val) => setRole(val ?? "member")}>
                <SelectTrigger id="invite-role" className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin (Full workspace access)</SelectItem>
                  <SelectItem value="member">Member (Can edit and manage projects)</SelectItem>
                  <SelectItem value="viewer">Viewer (Read-only access)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-xl border border-border/70 bg-muted/30 p-3 space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Granular Permissions
              </span>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-foreground">Invite other members</p>
                  <p className="text-[11px] text-muted-foreground">Allow user to add team members</p>
                </div>
                <Switch
                  checked={canInviteMembers}
                  onCheckedChange={setCanInviteMembers}
                  aria-label="Allow invite members"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-foreground">Billing management</p>
                  <p className="text-[11px] text-muted-foreground">Allow viewing and modifying invoices</p>
                </div>
                <Switch
                  checked={canManageBilling}
                  onCheckedChange={setCanManageBilling}
                  aria-label="Allow billing management"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" />}>
              Cancel
            </DialogClose>
            <Button type="submit">
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
