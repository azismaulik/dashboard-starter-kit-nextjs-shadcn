import * as React from "react"
import { ClientSettingsNav } from "./client-settings-nav"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Manage your account, preferences, and workspace settings.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Side nav */}
        <aside className="w-44 shrink-0">
          <ClientSettingsNav />
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}
