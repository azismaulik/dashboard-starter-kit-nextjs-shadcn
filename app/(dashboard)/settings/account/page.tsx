"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
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
              <div className="flex rounded-md border border-input bg-background">
                <span className="flex items-center px-3 text-xs text-muted-foreground border-r border-border">
                  dashkit.app/
                </span>
                <input
                  id="account-slug"
                  defaultValue="acme-corp"
                  className="flex-1 h-9 bg-transparent px-3 text-sm focus:outline-none"
                />
              </div>
            </div>
            <Button
              size="sm"
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              id="delete-account-button"
              onClick={() => toast.error("Account deletion requires confirmation")}
            >
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
