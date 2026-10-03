"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { toast } from "sonner"

function ToggleRow({
  title,
  description,
  id,
  defaultChecked = false,
}: {
  title: string
  description?: string
  id: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = React.useState(defaultChecked)

  return (
    <div className="flex items-start sm:items-center justify-between gap-4 py-3">
      <div className="flex-1 space-y-0.5 min-w-0">
        <label htmlFor={id} className="text-sm font-medium cursor-pointer block">
          {title}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
        className="shrink-0 mt-0.5 sm:mt-0"
      />
    </div>
  )
}

const notificationCategories = [
  {
    title: "Email Notifications",
    description: "Manage what updates we send directly to your inbox.",
    items: [
      {
        id: "email-security",
        title: "Security alerts",
        description: "Sign-in from new device, password changes",
        defaultChecked: true,
      },
      {
        id: "email-product",
        title: "Product updates",
        description: "New features and improvements",
        defaultChecked: true,
      },
      {
        id: "email-billing",
        title: "Billing",
        description: "Receipts, invoices, and payment failures",
        defaultChecked: true,
      },
      {
        id: "email-marketing",
        title: "Marketing",
        description: "Tips, promotions, and offers",
        defaultChecked: false,
      },
    ],
  },
  {
    title: "Push Notifications",
    description: "Receive instant notifications in your browser or desktop.",
    items: [
      {
        id: "push-activity",
        title: "Team activity",
        description: "When teammates mention you or make changes",
        defaultChecked: true,
      },
      {
        id: "push-alerts",
        title: "System alerts",
        description: "Errors, warnings, and critical issues",
        defaultChecked: true,
      },
      {
        id: "push-reminders",
        title: "Reminders",
        description: "Project deadlines and task reminders",
        defaultChecked: false,
      },
    ],
  },
]

export default function NotificationsSettingsPage() {
  return (
    <div className="space-y-6">
      {notificationCategories.map((category) => (
        <Card key={category.title}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border pt-0">
            {category.items.map((item) => (
              <ToggleRow key={item.id} {...item} />
            ))}
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button
          id="save-notifications-button"
          className="w-full sm:w-auto"
          onClick={() => toast.success("Notification preferences saved.")}
        >
          Save preferences
        </Button>
      </div>
    </div>
  )
}
