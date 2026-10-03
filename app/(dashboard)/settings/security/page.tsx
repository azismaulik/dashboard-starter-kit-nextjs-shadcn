"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Shield, Smartphone, Monitor, Globe, Trash2 } from "lucide-react"

const activeSessions = [
  {
    id: "s1",
    device: "MacBook Pro",
    browser: "Chrome 128",
    location: "Bangkok, TH",
    lastActive: "Active now",
    icon: Monitor,
    current: true,
  },
  {
    id: "s2",
    device: "iPhone 15",
    browser: "Safari",
    location: "Bangkok, TH",
    lastActive: "2 hours ago",
    icon: Smartphone,
    current: false,
  },
  {
    id: "s3",
    device: "Windows PC",
    browser: "Firefox 119",
    location: "New York, US",
    lastActive: "3 days ago",
    icon: Globe,
    current: false,
  },
]

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-w-md">
            <div>
              <label htmlFor="current-password" className="mb-1.5 block text-sm font-medium">
                Current password
              </label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <label htmlFor="new-password" className="mb-1.5 block text-sm font-medium">
                New password
              </label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium">
                Confirm new password
              </label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button
              size="sm"
              id="update-password-button"
              onClick={() => toast.success("Password updated successfully.")}
            >
              Update password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2FA */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                <Shield className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Authenticator app</p>
                <p className="text-xs text-muted-foreground">Not configured</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              id="setup-2fa-button"
              onClick={() => toast.info("2FA setup would start here")}
            >
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage and revoke active sessions across your devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                  <session.icon className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {session.device}
                    {session.current && (
                      <span className="ml-2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.browser} · {session.location} · {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="xs"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => toast.success("Session revoked")}
                  aria-label={`Revoke session on ${session.device}`}
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}

          <div className="pt-1">
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              id="revoke-all-sessions-button"
              onClick={() => toast.success("All other sessions revoked")}
            >
              <Trash2 />
              Revoke all other sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
