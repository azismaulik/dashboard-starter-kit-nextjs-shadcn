"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  Search,
  LayoutDashboard,
  FolderOpen,
  Users,
  BarChart3,
  Bell,
  Activity,
  User,
  Shield,
  CreditCard,
  Sliders,
  Sun,
  Moon,
  Monitor,
  X,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { demoProjects, demoUsers } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export type SearchCategory = "Pages" | "Projects" | "Team" | "Settings" | "Actions";

export interface SearchItem {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle?: string;
  href?: string;
  action?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const CATEGORY_ORDER: SearchCategory[] = ["Pages", "Projects", "Team", "Settings", "Actions"];

export interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const listRef = React.useRef<HTMLDivElement>(null);

  // Compile all search items from real project data
  const allItems = React.useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [
      // 1. Pages & Navigation
      {
        id: "page-dashboard",
        category: "Pages",
        title: "Dashboard",
        subtitle: "Overview metrics, revenue charts, and quick statistics",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "page-projects",
        category: "Pages",
        title: "Projects",
        subtitle: "Workspace projects, task tracking, and team progress",
        href: "/projects",
        icon: FolderOpen,
      },
      {
        id: "page-users",
        category: "Pages",
        title: "Users & Team",
        subtitle: "Member directory, role management, and access levels",
        href: "/users",
        icon: Users,
      },
      {
        id: "page-analytics",
        category: "Pages",
        title: "Analytics",
        subtitle: "Deep-dive performance graphs, revenue breakdown, and growth",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        id: "page-activity",
        category: "Pages",
        title: "Activity Log",
        subtitle: "Audit log of actions, events, and workspace updates",
        href: "/activity",
        icon: Activity,
      },
      {
        id: "page-notifications",
        category: "Pages",
        title: "Notifications",
        subtitle: "System alerts, project mentions, and team messages",
        href: "/notifications",
        icon: Bell,
      },

      // 2. Projects (from demoProjects)
      ...demoProjects.map((project) => ({
        id: `project-${project.id}`,
        category: "Projects" as SearchCategory,
        title: project.name,
        subtitle: `${project.description} • ${project.status}`,
        href: "/projects",
        action: () => toast.info(`Viewing project: ${project.name}`),
        icon: FolderOpen,
        badge: `${project.progress}%`,
      })),

      // 3. Team Members (from demoUsers)
      ...demoUsers.map((user) => ({
        id: `user-${user.id}`,
        category: "Team" as SearchCategory,
        title: user.name,
        subtitle: `${user.email} • ${user.role}`,
        href: "/users",
        action: () => toast.info(`Selected member: ${user.name}`),
        icon: User,
        badge: user.role,
      })),

      // 4. Settings & Account
      {
        id: "settings-profile",
        category: "Settings",
        title: "Profile Settings",
        subtitle: "Update personal details, avatar, and display name",
        href: "/settings/profile",
        icon: User,
      },
      {
        id: "settings-security",
        category: "Settings",
        title: "Security & 2FA",
        subtitle: "Manage password, active sessions, and two-factor auth",
        href: "/settings/security",
        icon: Shield,
      },
      {
        id: "settings-billing",
        category: "Settings",
        title: "Billing & Plans",
        subtitle: "Manage active subscription, payment methods, and invoices",
        href: "/settings/billing",
        icon: CreditCard,
      },
      {
        id: "settings-notifications",
        category: "Settings",
        title: "Notification Preferences",
        subtitle: "Configure email digest, in-app alerts, and push updates",
        href: "/settings/notifications",
        icon: Sliders,
      },

      // 5. Actions / Theme
      {
        id: "action-theme-light",
        category: "Actions",
        title: "Switch to Light Theme",
        subtitle: "Set visual appearance to light mode",
        action: () => {
          setTheme("light");
          toast.success("Theme changed to Light");
        },
        icon: Sun,
      },
      {
        id: "action-theme-dark",
        category: "Actions",
        title: "Switch to Dark Theme",
        subtitle: "Set visual appearance to dark mode",
        action: () => {
          setTheme("dark");
          toast.success("Theme changed to Dark");
        },
        icon: Moon,
      },
      {
        id: "action-theme-system",
        category: "Actions",
        title: "Switch to System Theme",
        subtitle: "Follow operating system theme settings",
        action: () => {
          setTheme("system");
          toast.success("Theme set to System default");
        },
        icon: Monitor,
      },
    ];

    return items;
  }, [setTheme]);

  // Filter items based on query
  const filteredItems = React.useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return allItems;

    return allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchSubtitle = item.subtitle ? item.subtitle.toLowerCase().includes(trimmed) : false;
      const matchCategory = item.category.toLowerCase().includes(trimmed);
      return matchTitle || matchSubtitle || matchCategory;
    });
  }, [allItems, query]);

  // Group items by category in predetermined order
  const groups = React.useMemo(() => {
    const grouped = new Map<SearchCategory, SearchItem[]>();
    for (const item of filteredItems) {
      const list = grouped.get(item.category) ?? [];
      list.push(item);
      grouped.set(item.category, list);
    }

    return CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((cat) => ({
      category: cat,
      items: grouped.get(cat)!,
    }));
  }, [filteredItems]);

  // Flattened array for arrow key navigation
  const flatItems = React.useMemo(() => {
    return groups.flatMap((g) => g.items);
  }, [groups]);


  // Scroll active item into view
  React.useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  };

  const handleSelect = (item: SearchItem) => {
    onOpenChange(false);
    setQuery("");
    setSelectedIndex(0);

    if (item.action) {
      item.action();
    }
    if (item.href) {
      router.push(item.href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const total = flatItems.length;
    if (total === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % total);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? total - 1 : prev - 1));
    } else if (e.key === "Enter" && flatItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(flatItems[selectedIndex]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPopup className="fixed top-16 sm:top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 outline-none duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
          <DialogTitle className="sr-only">Search Everything</DialogTitle>
          <DialogDescription className="sr-only">
            Search pages, projects, team members, settings, and actions across Dashkit
          </DialogDescription>

          <div
            className="w-full rounded-2xl border border-border bg-background shadow-2xl backdrop-blur-md overflow-hidden"
            onKeyDown={handleKeyDown}
          >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
            <Search className="size-4.5 text-muted-foreground shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search everything... (pages, projects, users, settings)"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => handleQueryChange("")}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer transition-colors"
                aria-label="Clear search query"
              >
                <X className="size-4" />
              </button>
            ) : (
              <Kbd className="hidden sm:inline-flex text-[10px]">ESC</Kbd>
            )}
          </div>

          {/* Results List */}
          <div ref={listRef} className="max-h-96 overflow-y-auto p-2 space-y-3">
            {flatItems.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                <p className="font-medium text-foreground">No results found</p>
                <p className="mt-1 text-xs">
                  No matches for &quot;{query}&quot;. Try searching for pages, projects, users, or settings.
                </p>
              </div>
            ) : (
              groups.map((group) => (
                <div key={group.category} className="space-y-1">
                  <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.category}
                  </div>
                  {group.items.map((item) => {
                    const itemIndex = flatItems.indexOf(item);
                    const isSelected = itemIndex === selectedIndex;
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        data-index={itemIndex}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-2.5 cursor-pointer text-xs transition-colors",
                          isSelected
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-foreground hover:bg-accent/60"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={cn(
                              "flex size-8 items-center justify-center rounded-lg border shrink-0 transition-colors",
                              isSelected
                                ? "border-primary/30 bg-primary/10 text-primary"
                                : "border-border bg-muted/50 text-muted-foreground"
                            )}
                          >
                            <Icon className="size-4" />
                          </div>
                          <div className="min-w-0 truncate">
                            <p className="truncate text-xs font-medium text-foreground">
                              {item.title}
                            </p>
                            {item.subtitle && (
                              <p className="truncate text-[11px] text-muted-foreground">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 pl-2">
                          {item.badge && (
                            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {item.badge}
                            </span>
                          )}
                          {isSelected && (
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                              Jump to
                              <CornerDownLeft className="size-3" />
                            </span>
                          )}
                          <ArrowRight className="size-3.5 text-muted-foreground/60" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer with keyboard shortcuts */}
          <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Kbd className="text-[10px]">↑</Kbd>
                <Kbd className="text-[10px]">↓</Kbd>
                <span>navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <Kbd className="text-[10px]">↵</Kbd>
                <span>select</span>
              </span>
              <span className="flex items-center gap-1">
                <Kbd className="text-[10px]">ESC</Kbd>
                <span>close</span>
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground/70">Dashkit Search</span>
          </div>
        </div>
      </DialogPopup>
    </DialogPortal>
  </Dialog>
);
}
