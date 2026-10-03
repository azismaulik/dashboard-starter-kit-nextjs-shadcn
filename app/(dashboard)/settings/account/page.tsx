"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { DeleteConfirmDialog } from "@/components/shared/confirm-dialog"
import { CopyButton } from "@/components/shared/display"
import { toast } from "sonner"

export default function AccountPage() {
  return (
    <div className="space-y-6">
      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Manage your workspace details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-w-md">
            <div>
              <label htmlFor="account-name" className="mb-1.5 block text-sm font-medium">
                Organization name
              </label>
              <Input id="account-name" defaultValue="Acme Corp" />
            </div>
            <div>
              <label htmlFor="account-slug" className="mb-1.5 block text-sm font-medium">
                Workspace URL
              </label>
              <div className="flex items-center rounded-md border border-input bg-background overflow-hidden pr-1">
                <span className="flex items-center px-3 text-xs text-muted-foreground border-r border-border shrink-0 bg-muted/30 h-9">
                  dashkit.app/
                </span>
                <input
                  id="account-slug"
                  defaultValue="acme-corp"
                  className="flex-1 min-w-0 h-9 bg-transparent px-3 text-sm focus:outline-none"
                />
                <CopyButton value="https://dashkit.app/acme-corp" />
              </div>
            </div>
            <Button
              size="sm"
              className="w-full sm:w-auto"
              id="save-account-button"
              onClick={() => toast.success("Account settings saved.")}
            >
              Save changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            These actions are irreversible. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <DeleteConfirmDialog
              resourceName="your account and workspace data"
              trigger={
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto shrink-0"
                  id="delete-account-button"
                >
                  Delete account
                </Button>
              }
              onConfirm={async () => {
                toast.success("Account deletion request submitted.")
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
