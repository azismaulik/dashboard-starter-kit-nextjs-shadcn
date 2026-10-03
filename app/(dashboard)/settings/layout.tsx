import * as React from "react"
import { ClientSettingsNav } from "./client-settings-nav"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, preferences, and workspace settings.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Side / Top nav */}
        <aside className="w-full md:w-48 shrink-0">
          <ClientSettingsNav />
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1 max-w-4xl">{children}</div>
      </div>
    </div>
  )
}

