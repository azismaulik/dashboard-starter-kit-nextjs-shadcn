"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState(false)
  const [sent, setSent] = React.useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
    toast.success("Password reset email sent.")
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/30">
          <span className="text-xl">✓</span>
        </div>
        <h1 className="text-lg font-semibold">Check your email</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve sent a password reset link to your email address.
        </p>
        <Link href="/auth/login" className="mt-4 inline-block text-xs text-muted-foreground hover:text-foreground">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold">Forgot password?</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="forgot-email" className="text-sm font-medium">Email address</label>
          <input
            id="forgot-email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading} id="forgot-password-submit">
          {loading ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Link href="/auth/login" className="text-xs text-muted-foreground hover:text-foreground">
          Back to sign in
        </Link>
      </div>
    </>
  )
}
