<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Dashkit — Agent & AI Assistant Guidelines

Welcome to the **Dashboard Starter Kit (Next.js + shadcn/ui)** codebase. This document serves as the primary technical reference for AI assistants, agents, and developers extending or maintaining this project.

---

## 1. Tech Stack & Environment

- **Framework**: Next.js 16 (App Router, Turbopack enabled)
- **Runtime / Language**: React 19, TypeScript 5 (Target ES2022)
- **Styling**: Tailwind CSS v4 (CSS variables, `@theme`, `@import "tailwindcss"`)
- **UI Primitives**: Base UI (`@base-ui/react`), shadcn/ui styling conventions
- **Icons**: `lucide-react`
- **Charts & Tables**: `recharts`, `@tanstack/react-table`
- **Notifications**: `sonner`
- **Theme**: `next-themes` (Dark / Light / System)
- **Node.js**: Requires Node 20+ (Node 22 LTS recommended)

### Essential Commands
```bash
npm run dev      # Start development server with Turbopack (default port 3000)
npm run build    # Optimized production build with strict type & page checking
npm run lint     # ESLint checks (maintain 0 errors, 0 warnings)
```

---

## 2. Architecture & File Structure

```
├── app/
│   ├── (auth)/                  # Public auth routes (login, register, forgot-password)
│   ├── (dashboard)/             # Authenticated dashboard app shell
│   │   ├── dashboard/           # Main overview with metrics, charts & quick actions
│   │   ├── projects/            # Project cards & lifecycle management
│   │   ├── users/               # Paginated, filterable user data table
│   │   ├── analytics/           # Deep-dive analytics, area charts, latency metrics
│   │   ├── activity/            # Real-time event audit logs
│   │   ├── notifications/       # Notification center
│   │   ├── settings/            # Settings hub (Profile, Account, Security, Notifications, Preferences, Billing)
│   │   ├── components/          # Interactive component catalog & design showcase
│   │   └── layout.tsx           # Group layout wrapping pages in <DashboardLayout>
│   ├── layout.tsx               # Root layout: font loading, Providers, global metadata
│   ├── globals.css              # Tailwind v4 styles, theme variables, glassmorphism
│   └── page.tsx                 # Root redirect (redirects to /dashboard)
├── components/
│   ├── ui/                      # Base UI primitives (button, card, dialog, dropdown, input, etc.)
│   ├── layout/                  # Shell components (sidebar, navbar, breadcrumbs, search dialog, user menu)
│   ├── shared/                  # Reusable domain components (confirm dialogs, copy button, badges, selects)
│   └── dashboard/               # Dashboard-specific widgets (stat cards, activity feed)
├── config/
│   ├── site.ts                  # SINGLE SOURCE OF TRUTH: branding, feature flags, navigation routes
│   └── app.ts                   # Backward-compatibility re-exports
├── lib/
│   ├── utils.ts                 # `cn` helper, currency/date formatters
│   └── demo-data.ts             # Typed mock datasets for development & showcasing
└── types/                       # Shared TypeScript definitions (nav, domain entities)
```

---

## 3. Core Architectural Principles for Agents

### A. Single Source of Truth (`config/site.ts`)
- **Branding & Metadata**: App name, description, author, repository URL, and URLs are defined in `siteConfig`. `app/layout.tsx` consumes this for dynamic metadata, OpenGraph, and title generation.
- **Navigation**: Both the main sidebar (`navConfig`) and the settings hub (`settingsNavConfig`) are configured here.
- **Feature Flags**: `siteConfig.features` controls module availability (e.g. `billing: false`). Navigation components dynamically filter out disabled items automatically.
- **Rule**: When adding new routes or settings tabs, **always** register them in `config/site.ts`. Never hardcode static route lists inside client components.

### B. Responsive-First Design Standard
- **Zero Horizontal Overflow**: Every page must render cleanly on mobile viewports (360px - 420px), tablets (768px), and desktops.
- **Settings Navigation**: Operates as a horizontal scrollable tab-strip (`overflow-x-auto whitespace-nowrap`) on mobile and transitions to a vertical sidebar on desktop (`md:flex-col`).
- **Navbar & Breadcrumbs**: On mobile viewports, the navbar keeps compact spacing (`px-3 sm:px-4`, `gap-2`). Breadcrumbs collapse intermediate ancestors on mobile to prevent squishing action buttons.
- **Dropdown Menus**: Dropdowns use `w-auto min-w-40` or explicit widths (`w-52`) with `whitespace-nowrap` on items so menu options remain on a single line and never wrap awkwardly.
- **Flex Items**: Always apply `min-w-0` to flex child containers with text or inputs to prevent flex layout blowout.

### C. UI Primitives & `@base-ui/react` Conventions
- Components in `components/ui/` use `@base-ui/react` (the foundation behind shadcn's latest release).
- Triggers for dialogs, popovers, and menus use the `render={<Element />}` prop or standard trigger syntax.
- Buttons utilize `class-variance-authority` (CVA) with custom variants (`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`).

### D. Iconography Standard (`lucide-react`)
- Use `lucide-react` icons.
- **Pro / Subscription Tier**: Always use `Zap` (lightning bolt) for Pro plans and active quotas to align with industry SaaS conventions.
- **Sparkles**: Reserve `Sparkles` strictly for AI/generative features, not billing or subscription tiers.
- Always apply `shrink-0` to icons placed beside text labels.

### E. Destructive Actions & Modals
- When implementing delete, revoke, or destructive actions, use the pre-built confirmation components from `@/components/shared/confirm-dialog`:
  - `<ConfirmDialog>`: General confirmation dialog with customizable titles, descriptions, and confirm labels.
  - `<DeleteConfirmDialog>`: Standard destructive delete modal.

---

## 4. Code Quality & Linter Rules

- **Zero-Warning Policy**: All code must compile cleanly via `npm run build` and pass `npm run lint` with 0 errors and 0 warnings.
- **No Unused Imports**: Remove unused variables and imports before committing.
- **Client vs Server Components**:
  - Keep interactive components marked with `"use client"`.
  - Leaf components with hooks (`useState`, `usePathname`, `useTheme`) must have `"use client"` at the top.
