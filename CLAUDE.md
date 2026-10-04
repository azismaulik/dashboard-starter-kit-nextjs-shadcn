# Dashkit — Claude Code & AI Agent Guide

Welcome to the **Dashboard Starter Kit (Next.js + shadcn/ui)** repository.

This project is a modern, production-ready, fully responsive dashboard foundation built with **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui** (Base UI). It is designed to be versatile for any web application (admin dashboards, client portals, internal tools, CRM, analytics, or SaaS).

---

## 🛠️ Commands & Workflows

```bash
# Development (Node 20+ required, Node 22 recommended)
npm run dev      # Start dev server on http://localhost:3000

# Verification & Builds (Must pass with 0 errors, 0 warnings)
npm run build    # Next.js 16 production build with typecheck
npm run lint     # ESLint checks
```

---

## 🏗️ Architecture & Key Conventions

### 1. Centralized Configuration (`config/site.ts`)
- **Single Source of Truth**: All app metadata (`siteConfig`), feature toggles (`siteConfig.features`), global navigation (`navConfig`), and settings navigation (`settingsNavConfig`) live in `config/site.ts`.
- **Never Hardcode Routes**: When adding or modifying routes, update `config/site.ts`. Components like `AppSidebar` and `ClientSettingsNav` dynamically consume these configs and filter out disabled features.

### 2. Responsive UI Standard
- **Mobile First**: All pages and dialogs must render flawlessly on viewports from 360px up to 4K displays without horizontal scrolling.
- **Settings Navigation**: Renders as a smooth, horizontal scrollable tab strip on mobile (`overflow-x-auto whitespace-nowrap`) and automatically transitions to a vertical sidebar on desktop (`md:flex-col`).
- **Dropdown Menus**: Dropdowns must use `w-auto min-w-40` or explicit widths (e.g. `w-52`) with `whitespace-nowrap` on items so menu options stay cleanly on a single line and never break downwards.
- **Flex & Text Containers**: Always apply `min-w-0` to flex child containers with text or inputs to prevent layout clipping or blowout.

### 3. UI Primitives & Styling
- **Base UI Integration**: Primitives in `components/ui/` use `@base-ui/react`. Use `render={<Element />}` prop for triggers.
- **Styling**: Tailwind CSS v4 using CSS variables and theme tokens defined in `app/globals.css`. Use `@/lib/utils` (`cn`) for merging classes.
- **Interactive Modals**: For destructive actions (e.g. Delete, Revoke), always use `<ConfirmDialog>` or `<DeleteConfirmDialog>` from `@/components/shared/confirm-dialog`.

### 4. Iconography
- Library: `lucide-react`
- **Pro / Subscription Tier**: Always use `Zap` (lightning bolt). Do **not** use `Sparkles` for subscriptions (reserve `Sparkles` for AI features).
- Always apply `shrink-0` to icons placed beside text.

---

## 📋 Directory Map

- `app/(dashboard)/`: Authenticated dashboard shell and subpages (`dashboard`, `projects`, `users`, `analytics`, `activity`, `notifications`, `settings`, `components`).
- `app/(auth)/`: Authentication pages (`login`, `register`, `forgot-password`).
- `components/ui/`: Base UI primitives.
- `components/layout/`: App layout shell (sidebar, navbar, breadcrumbs, search, user menu).
- `components/shared/`: Domain components (confirm dialogs, copy button, status badges, selects).
- `config/site.ts`: Site branding, feature flags, and navigation definitions.
- `lib/demo-data.ts`: Mock data for prototyping and UI development.

For detailed rules and agent directives, see [AGENTS.md](AGENTS.md).
