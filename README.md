# Dashboard Starter Kit (Next.js + shadcn/ui)

A modern, highly accessible, and fully responsive Dashboard Starter Kit built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**.

Designed as a versatile, production-ready foundation for any web application — including admin dashboards, client portals, internal tools, CRM, analytics platforms, and SaaS products.

🔗 **GitHub Repository**: [https://github.com/azismaulik/dashboard-starter-kit-nextjs-shadcn](https://github.com/azismaulik/dashboard-starter-kit-nextjs-shadcn)

---

## ✨ Features

- **⚡ Modern Architecture**: Built on Next.js 16 App Router with Turbopack and React 19.
- **📱 Fully Responsive**: Thoughtfully designed layouts that work seamlessly across mobile, tablet, and desktop screens.
- **🎨 Premium Styling**: Styled with Tailwind CSS v4, modern glassmorphism, tailored gradients, and CSS variables.
- **🌓 Dark & Light Mode**: Complete theme toggle support using `next-themes` with zero flicker.
- **⚙️ Modular Settings Hub**:
  - Subpages for **Profile**, **Account**, **Security**, **Notifications**, **Preferences**, and **Billing**.
  - Single Source of Truth configuration via `config/site.ts`.
  - Responsive horizontal tab navigation on mobile, persistent vertical sidebar on desktop.
  - Built-in interactive confirmation dialogs (`ConfirmDialog`, `DeleteConfirmDialog`).
- **📊 Analytics & Visualizations**: Charts powered by Recharts (area charts, status breakdowns, activity feeds).
- **📋 Data Tables**: Advanced tables with pagination, sorting, and search powered by TanStack Table.
- **🔍 Global Command Palette**: Quick navigation and instant search accessible via `Cmd+K` / `Ctrl+K`.
- **♿ Accessible by Design**: Keyboard navigable with ARIA semantics powered by Base UI and Radix primitives.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** (Node 22 LTS recommended) — [Download here](https://nodejs.org)
- **npm 8+** (comes with Node.js)

> **Note**: This project uses Next.js 16 and React 19 which require Node.js 20 or later. Running on Node.js 14 or 16 will result in errors.

### 1. Clone the repository

```bash
git clone https://github.com/azismaulik/dashboard-starter-kit-nextjs-shadcn.git
cd dashboard-starter-kit-nextjs-shadcn
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` to set your `NEXT_PUBLIC_APP_URL` and any other variables as needed.

### 3. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/                  # Authentication pages (login, register, forgot-password)
│   ├── (dashboard)/             # Main dashboard layout and pages
│   │   ├── dashboard/           # Overview dashboard with metrics & charts
│   │   ├── projects/            # Project management & cards
│   │   ├── users/               # User table with status filters
│   │   ├── analytics/           # Analytics & reports
│   │   ├── activity/            # Real-time activity audit log
│   │   ├── notifications/       # User notifications
│   │   └── settings/            # Settings module
│   │       ├── profile/         # Personal details & avatar
│   │       ├── account/         # Workspace info & danger zone
│   │       ├── security/        # Password, 2FA, session revocation
│   │       ├── notifications/   # Email & push preference toggles
│   │       ├── preferences/     # Theme, language, timezone formats
│   │       └── billing/         # Active plans, usage, invoices
│   └── layout.tsx               # Root application layout
├── components/
│   ├── layout/                  # Sidebar, navbar, breadcrumbs, command menu
│   ├── shared/                  # Reusable domain components (dialogs, cards, selects)
│   └── ui/                      # Base UI primitives (buttons, cards, inputs, dialogs)
├── config/
│   └── site.ts                  # Centralized site configuration & navigation routes
└── types/                       # TypeScript interfaces and types
```

---

## 🛠️ Customization Guide

### Centralized Navigation & Feature Flags
All navigation items and feature toggles are defined in [`config/site.ts`](config/site.ts):

```ts
export const siteConfig = {
  name: "Dashkit",
  author: "Azis Maulik",
  links: {
    github: "https://github.com/azismaulik/dashboard-starter-kit-nextjs-shadcn",
  },
  features: {
    analytics: true,
    billing: true,       // Toggle to hide/show billing across app & settings
    notifications: true,
    auditLog: true,
  },
}
```

### Adding New Settings Pages
1. Add an entry to `settingsNavConfig` in [`config/site.ts`](config/site.ts):
   ```ts
   {
     title: "Integrations",
     href: "/settings/integrations",
     icon: Blocks,
   }
   ```
2. Create the page file at `app/(dashboard)/settings/integrations/page.tsx`.
3. The responsive settings navigation and breadcrumbs will automatically update.

---

## 📜 Scripts

- `npm run dev`: Starts the Next.js development server
- `npm run build`: Builds the production bundle
- `npm run start`: Runs the built production application
- `npm run lint`: Runs ESLint checks

---

## 📄 License

MIT License. Free to use for personal and commercial projects.
