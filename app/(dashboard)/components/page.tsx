"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  StatusBadge,
  RoleBadge,
  UserAvatar,
  UserAvatarGroup,
  RelativeTime,
  DateDisplay,
} from "@/components/shared/badges"
import {
  CopyButton,
  CopyableText,
  CopyableField,
  CurrencyDisplay,
  TrendBadge,
  InlineCode,
  Kbd,
  Dot,
} from "@/components/shared/display"
import {
  ConfirmDialog,
  DeleteConfirmDialog,
} from "@/components/shared/confirm-dialog"
import { StatCard, StatCardGrid } from "@/components/blocks/stat-card"
import { ActivityFeed, type ActivityItemData } from "@/components/blocks/activity-feed"
import {
  EmptyState,
  ErrorState,
  LoadingState,
  InlineAlert,
} from "@/components/blocks/feedback"
import {
  Users,
  FolderKanban,
  DollarSign,
  TrendingUp,
  Bell,
  Inbox,
  Search,
} from "lucide-react"

// ─── Demo data — module-level constants (stable across re-renders) ─────────────
// Using fixed timestamps avoids the React Compiler "impure function" error
// that occurs when Date.now() is called directly inside JSX.
const DEMO_35_MIN_AGO = new Date(Date.now() - 1000 * 60 * 35)
const DEMO_1_DAY_AGO = new Date(Date.now() - 1000 * 60 * 60 * 24)
const DEMO_3_DAYS_AGO = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
const DEMO_1_WEEK_AGO = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)

const DEMO_USERS = [
  { name: "Alice Martin" },
  { name: "Bob Chen" },
  { name: "Carol Davis" },
  { name: "Dan Wilson" },
  { name: "Eva López" },
]

const DEMO_ACTIVITY: ActivityItemData[] = [
  {
    id: "1",
    user: { name: "Alice Martin" },
    action: "created project",
    target: "Dashkit v2",
    timestamp: DEMO_35_MIN_AGO,
    status: "active",
  },
  {
    id: "2",
    user: { name: "Bob Chen" },
    action: "invited",
    target: "carol@example.com",
    timestamp: DEMO_1_DAY_AGO,
  },
  {
    id: "3",
    user: { name: "Carol Davis" },
    action: "completed task",
    target: "Design system tokens",
    timestamp: DEMO_3_DAYS_AGO,
    status: "completed",
  },
  {
    id: "4",
    user: { name: "Dan Wilson" },
    action: "archived project",
    target: "Old CRM",
    timestamp: DEMO_1_WEEK_AGO,
    status: "archived",
  },
]

// ─── Page layout helpers ──────────────────────────────────────────────────────

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator />
      <div className="space-y-8">{children}</div>
    </section>
  )
}

function SubSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 px-4 py-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-muted-foreground">
          A showcase of all shared and block-level components in Dashkit.
        </p>
      </div>

      {/* ── Badges ─────────────────────────────────────────────────────────── */}
      <Section
        title="Badges"
        description="Status, role, and generic badge variants."
      >
        <SubSection title="Status badges">
          <StatusBadge status="active" />
          <StatusBadge status="inactive" />
          <StatusBadge status="suspended" />
          <StatusBadge status="invited" />
          <StatusBadge status="pending" />
          <StatusBadge status="completed" />
          <StatusBadge status="paused" />
          <StatusBadge status="archived" />
        </SubSection>

        <SubSection title="Role badges">
          <RoleBadge role="owner" />
          <RoleBadge role="admin" />
          <RoleBadge role="member" />
          <RoleBadge role="viewer" />
        </SubSection>

        <SubSection title="Generic badges">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </SubSection>
      </Section>

      {/* ── Avatars ─────────────────────────────────────────────────────────── */}
      <Section title="Avatars" description="User avatar and avatar group.">
        <SubSection title="Sizes">
          <UserAvatar name="Alice Martin" size="sm" />
          <UserAvatar name="Bob Chen" size="default" />
          <UserAvatar name="Carol Davis" size="lg" />
        </SubSection>

        <SubSection title="Avatar group">
          <UserAvatarGroup users={DEMO_USERS} max={3} />
          <UserAvatarGroup users={DEMO_USERS} max={4} />
          <UserAvatarGroup users={DEMO_USERS} max={5} />
        </SubSection>

        <SubSection title="Dot indicators">
          <Dot color="green" />
          <Dot color="yellow" />
          <Dot color="red" />
          <Dot color="blue" />
          <Dot color="gray" />
        </SubSection>
      </Section>

      {/* ── Display ─────────────────────────────────────────────────────────── */}
      <Section
        title="Display"
        description="Currency, trend, date, copy, and code display components."
      >
        <SubSection title="Currency">
          <CurrencyDisplay amount={12500} />
          <CurrencyDisplay amount={12500} currency="EUR" locale="de-DE" />
          <CurrencyDisplay amount={12500000} compact />
          <CurrencyDisplay amount={-1234.5} />
        </SubSection>

        <SubSection title="Trend badges">
          <TrendBadge value={12.5} />
          <TrendBadge value={-3.2} />
          <TrendBadge value={0} />
          <TrendBadge value={8.4} inverse label="Churn" />
        </SubSection>

        <SubSection title="Date & time">
          <DateDisplay date="2025-01-15" />
          <DateDisplay date="2025-01-15" format="long" />
          <DateDisplay date="2025-01-15" format="short" />
          {/* Date.now() extracted to module-level constants — no impure call in JSX */}
          <RelativeTime date={DEMO_35_MIN_AGO} />
          <RelativeTime date={DEMO_1_DAY_AGO} />
          <RelativeTime date={DEMO_3_DAYS_AGO} />
          <RelativeTime date={DEMO_1_WEEK_AGO} />
        </SubSection>

        <SubSection title="Inline code & kbd">
          <InlineCode>npm run dev</InlineCode>
          <InlineCode>⌘K</InlineCode>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <Kbd>Enter</Kbd>
        </SubSection>

        <SubSection title="Copy">
          <CopyButton value="copy-me" />
          <CopyButton value="copy-me" showText />
          <CopyableText value="sk_live_abc123xyz" />
          <div className="w-full max-w-sm">
            <CopyableField
              label="API Key"
              value="sk_live_abc123xyz456def789ghi"
            />
          </div>
        </SubSection>

        <SubSection title="Progress">
          <div className="w-full max-w-sm space-y-2">
            <Progress value={25} className="h-2" />
            <Progress value={60} className="h-2" />
            <Progress value={90} className="h-2" />
          </div>
        </SubSection>
      </Section>

      {/* ── Buttons ─────────────────────────────────────────────────────────── */}
      <Section title="Buttons" description="Button variants and sizes.">
        <SubSection title="Variants">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </SubSection>

        <SubSection title="Sizes">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Bell />
          </Button>
        </SubSection>

        <SubSection title="States">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled outline
          </Button>
        </SubSection>
      </Section>

      {/* ── Blocks: Stat Cards ──────────────────────────────────────────────── */}
      <Section
        title="Stat Cards"
        description="Metric summary cards with optional trend indicators."
      >
        <StatCardGrid cols={4}>
          <StatCard
            title="Total Users"
            value="24,521"
            trend={12.4}
            description="vs. last month"
            icon={<Users className="size-4" />}
          />
          <StatCard
            title="Active Projects"
            value="142"
            trend={-2.1}
            description="vs. last month"
            icon={<FolderKanban className="size-4" />}
          />
          <StatCard
            title="Revenue"
            value="$48,290"
            trend={8.7}
            description="vs. last month"
            icon={<DollarSign className="size-4" />}
          />
          <StatCard
            title="Churn Rate"
            value="2.3%"
            trend={0.4}
            trendInverse
            description="vs. last month"
            icon={<TrendingUp className="size-4" />}
          />
        </StatCardGrid>

        <SubSection title="Loading state">
          <div className="w-full max-w-xs">
            <StatCard title="Revenue" value="" loading />
          </div>
        </SubSection>
      </Section>

      {/* ── Blocks: Activity Feed ───────────────────────────────────────────── */}
      <Section
        title="Activity Feed"
        description="Timeline of user actions with avatars and relative timestamps."
      >
        <div className="max-w-lg">
          <ActivityFeed items={DEMO_ACTIVITY} />
        </div>

        <SubSection title="Empty state">
          <div className="w-full max-w-lg rounded-lg border">
            <ActivityFeed items={[]} />
          </div>
        </SubSection>
      </Section>

      {/* ── Blocks: Feedback ────────────────────────────────────────────────── */}
      <Section
        title="Feedback"
        description="States and inline alerts for loading, errors, and empty data."
      >
        <SubSection title="Inline alerts">
          <div className="w-full max-w-lg space-y-2">
            <InlineAlert variant="info" title="Heads up" description="Your trial expires in 3 days." />
            <InlineAlert variant="success" title="Changes saved" description="Your profile has been updated." />
            <InlineAlert variant="warning" title="Approaching limit" description="You've used 85% of your storage." />
            <InlineAlert variant="error" title="Payment failed" description="Please update your payment method." />
            <InlineAlert variant="info" title="Dismissible" description="Click the × to dismiss." dismissible />
          </div>
        </SubSection>

        <SubSection title="Empty states">
          <div className="w-full max-w-sm rounded-lg border">
            <EmptyState
              icon={<Inbox className="size-5" />}
              title="No notifications"
              description="You're all caught up! Check back later."
              action={<Button size="sm" variant="outline">Refresh</Button>}
            />
          </div>
          <div className="w-full max-w-sm rounded-lg border">
            <EmptyState
              icon={<Search className="size-5" />}
              title="No results"
              description="Try adjusting your search or filters."
              size="sm"
            />
          </div>
        </SubSection>

        <SubSection title="Loading state">
          <div className="w-full max-w-xs rounded-lg border">
            <LoadingState title="Fetching data…" description="This may take a moment." />
          </div>
        </SubSection>

        <SubSection title="Error state">
          <div className="w-full max-w-xs rounded-lg border">
            <ErrorState onRetry={() => {}} />
          </div>
        </SubSection>
      </Section>

      {/* ── Dialogs ─────────────────────────────────────────────────────────── */}
      <Section
        title="Dialogs"
        description="Confirm dialog and pre-built destructive variants."
      >
        <SubSection title="Confirm dialogs">
          <ConfirmDialog
            trigger={<Button variant="outline">Open confirm</Button>}
            title="Are you sure?"
            description="This action will apply immediately and cannot be undone."
            confirmLabel="Confirm"
            variant="default"
            onConfirm={async () => {
              await new Promise((r) => setTimeout(r, 1000))
            }}
          />
          <DeleteConfirmDialog
            trigger={<Button variant="destructive">Delete item</Button>}
            resourceName="this project"
            onConfirm={async () => {
              await new Promise((r) => setTimeout(r, 1000))
            }}
          />
        </SubSection>
      </Section>

      {/* ── File inventory note ─────────────────────────────────────────────── */}
      <Section title="Component inventory">
        <div className="w-full max-w-2xl">
          <InlineAlert
            variant="info"
            title="Where to find these components"
          >
            <ul className="mt-1 space-y-0.5 text-xs opacity-80">
              <li><InlineCode>components/shared/badges.tsx</InlineCode> — StatusBadge, RoleBadge, UserAvatar, RelativeTime, DateDisplay</li>
              <li><InlineCode>components/shared/display.tsx</InlineCode> — CopyButton, CurrencyDisplay, TrendBadge, InlineCode, Kbd, Dot</li>
              <li><InlineCode>components/shared/confirm-dialog.tsx</InlineCode> — ConfirmDialog, DeleteConfirmDialog, …</li>
              <li><InlineCode>components/blocks/stat-card.tsx</InlineCode> — StatCard, StatCardGrid</li>
              <li><InlineCode>components/blocks/activity-feed.tsx</InlineCode> — ActivityFeed, ActivityItem</li>
              <li><InlineCode>components/blocks/feedback.tsx</InlineCode> — EmptyState, ErrorState, LoadingState, InlineAlert</li>
            </ul>
          </InlineAlert>
        </div>
      </Section>
    </div>
  )
}
