"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Account created! Welcome to Dashkit.")
    router.push("/dashboard")
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold">Create an account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started with Dashkit today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="register-name" className="text-sm font-medium">Full name</label>
          <input
            id="register-name"
            type="text"
            required
            placeholder="John Smith"
            className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div>
          <label htmlFor="register-email" className="text-sm font-medium">Email address</label>
          <input
            id="register-email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div>
          <label htmlFor="register-password" className="text-sm font-medium">Password</label>
          <div className="relative mt-1">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Min. 8 characters"
              className="h-9 w-full rounded-md border border-input bg-background px-3 pr-9 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading} id="register-submit-button">
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        By creating an account, you agree to our{" "}
        <Link href="#" className="text-foreground underline-offset-4 hover:underline">Terms of Service</Link>{" "}
        and{" "}
        <Link href="#" className="text-foreground underline-offset-4 hover:underline">Privacy Policy</Link>.
      </p>

      <div className="mt-4 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-foreground underline-offset-4 hover:underline">Sign in</Link>
      </div>
    </>
  )
}
