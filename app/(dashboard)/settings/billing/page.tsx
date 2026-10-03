"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { toast } from "sonner"
import { CreditCard, ReceiptText, Zap } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const invoices = [
  { id: "inv_001", date: "Oct 1, 2026", amount: 29.00, status: "paid" },
  { id: "inv_002", date: "Sep 1, 2026", amount: 29.00, status: "paid" },
  { id: "inv_003", date: "Aug 1, 2026", amount: 29.00, status: "paid" },
  { id: "inv_004", date: "Jul 1, 2026", amount: 29.00, status: "paid" },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Your active subscription and usage this billing period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border p-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-primary" />
                  <span className="text-sm font-semibold">Pro Plan</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    Active
                  </span>
                </div>
                <p className="mt-1 text-2xl font-bold">
                  {formatCurrency(29)}
                  <span className="text-sm font-normal text-muted-foreground">/month</span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Next billing date: November 1, 2026
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto shrink-0"
                id="manage-subscription-button"
                onClick={() => toast.info("Billing portal would open here")}
              >
                Manage subscription
              </Button>
            </div>

            {/* Usage */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">API Requests</span>
                <span className="font-medium">8,200 / 10,000</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                <div
                  className="h-1.5 rounded-full bg-primary transition-all"
                  style={{ width: "82%" }}
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                82% used this month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            The card used for your subscription billing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                <CreditCard className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2028</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto shrink-0"
              id="update-payment-button"
              onClick={() => toast.info("Payment update dialog would open here")}
            >
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Download your billing history.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ReceiptText className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{inv.date}</p>
                    <p className="text-xs text-muted-foreground">{inv.id}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 pl-7 sm:pl-0 shrink-0">
                  <span className="text-sm font-medium">{formatCurrency(inv.amount)}</span>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => toast.info(`Downloading ${inv.id}`)}
                    aria-label={`Download invoice ${inv.id}`}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
