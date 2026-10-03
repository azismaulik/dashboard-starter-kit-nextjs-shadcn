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
import {
  DateFormatSelect,
  LanguageSelect,
  TimezoneSelect,
} from "@/components/shared/selects"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
      {children}
    </label>
  )
}

export default function PreferencesPage() {
  const { theme, setTheme } = useTheme()
  const [dateFormat, setDateFormat] = React.useState("MMM DD, YYYY")
  const [timezone, setTimezone] = React.useState("Asia/Bangkok")
  const [language, setLanguage] = React.useState("en")

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  function handleSave() {
    toast.success("Preferences saved.", {
      description: "Your changes will take effect immediately.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose your preferred color theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 max-w-sm">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors ${
                  theme === t.value
                    ? "border-primary bg-accent"
                    : "border-border hover:bg-accent/50"
                }`}
                id={`theme-${t.value}-button`}
              >
                <t.icon className="size-5" />
                <span className="text-xs font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date & Time (includes Language) */}
      <Card>
        <CardHeader>
          <CardTitle>Date, Time & Language</CardTitle>
          <CardDescription>
            Set your preferred language, date format, and timezone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm space-y-4">
            <div>
              <FieldLabel htmlFor="language-select">Language</FieldLabel>
              <LanguageSelect
                id="language-select"
                value={language}
                onValueChange={setLanguage}
              />
            </div>

            <div>
              <FieldLabel htmlFor="date-format-select">Date format</FieldLabel>
              <DateFormatSelect
                id="date-format-select"
                value={dateFormat}
                onValueChange={setDateFormat}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Preview:{" "}
                <span className="font-medium text-foreground">{dateFormat}</span>
              </p>
            </div>

            <div>
              <FieldLabel htmlFor="timezone-select">Timezone</FieldLabel>
              <TimezoneSelect
                id="timezone-select"
                value={timezone}
                onValueChange={setTimezone}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button id="save-preferences-button" onClick={handleSave}>
          Save preferences
        </Button>
      </div>
    </div>
  )
}
