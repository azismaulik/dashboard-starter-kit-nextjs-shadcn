"use client";

import * as React from "react";
import { demoNotifications, type Notification } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCheck,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Settings,
  Mail,
  Smartphone,
  MessageSquare,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const typeConfig: Record<string, { icon: React.ReactNode; badge: string; bg: string }> = {
  info: {
    icon: <Info className="size-4 text-blue-500" />,
    badge: "Info",
    bg: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  success: {
    icon: <CheckCircle2 className="size-4 text-emerald-500" />,
    badge: "Success",
    bg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  warning: {
    icon: <AlertTriangle className="size-4 text-amber-500" />,
    badge: "Warning",
    bg: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  error: {
    icon: <AlertCircle className="size-4 text-rose-500" />,
    badge: "Alert",
    bg: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState<Notification[]>(demoNotifications);
  const [activeTab, setActiveTab] = React.useState("all");

  // Notification channels preferences
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [pushAlerts, setPushAlerts] = React.useState(true);
  const [slackAlerts, setSlackAlerts] = React.useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = React.useMemo(() => {
    if (activeTab === "all") return notifications;
    if (activeTab === "unread") return notifications.filter((n) => !n.read);
    if (activeTab === "alerts") return notifications.filter((n) => n.type === "error" || n.type === "warning");
    if (activeTab === "updates") return notifications.filter((n) => n.type === "info" || n.type === "success");
    return notifications;
  }, [notifications, activeTab]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.info("Notification dismissed");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Notifications Center</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}.`
              : "All caught up! No unread notifications."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllRead}
              className="gap-1.5"
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Notifications Feed (2 cols) */}
        <div className="space-y-4 lg:col-span-2">
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val ?? "all")}>
            <TabsList>
              <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="alerts">Warnings & Alerts</TabsTrigger>
              <TabsTrigger value="updates">System Updates</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2.5">
            {filtered.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="mx-auto size-8 text-muted-foreground/40 mb-2" />
                <p className="text-sm font-medium text-foreground">No notifications found</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  You don&apos;t have any notifications under this filter.
                </p>
              </Card>
            ) : (
              filtered.map((notif) => {
                const cfg = typeConfig[notif.type] || typeConfig.info;
                return (
                  <Card
                    key={notif.id}
                    className={cn(
                      "p-4 transition-all hover:border-primary/40",
                      !notif.read && "bg-muted/30 border-primary/30"
                    )}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-muted border border-border/60">
                        {cfg.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <p className={cn("text-xs font-semibold", !notif.read ? "text-foreground" : "text-muted-foreground")}>
                              {notif.title}
                            </p>
                            <Badge variant="outline" className={cn("text-[10px] py-0 h-4 font-normal", cfg.bg)}>
                              {cfg.badge}
                            </Badge>
                          </div>
                          {!notif.read && (
                            <span className="size-2 rounded-full bg-primary shrink-0" />
                          )}
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {notif.description}
                        </p>

                        <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>{formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleRead(notif.id)}
                              className="hover:text-foreground transition-colors cursor-pointer"
                            >
                              {notif.read ? "Mark unread" : "Mark read"}
                            </button>
                            <span>·</span>
                            <button
                              type="button"
                              onClick={() => handleDelete(notif.id)}
                              className="hover:text-destructive transition-colors cursor-pointer"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Right Sidebar: Notification Channel Preferences Card */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Settings className="size-4 text-muted-foreground" />
                <CardTitle className="text-base">Delivery Channels</CardTitle>
              </div>
              <CardDescription>
                Configure where you receive workspace announcements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Mail className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">Email Digest</p>
                    <p className="text-[11px] text-muted-foreground">Daily activity summary</p>
                  </div>
                </div>
                <Switch
                  checked={emailAlerts}
                  onCheckedChange={setEmailAlerts}
                  aria-label="Email Digest"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">Push Notifications</p>
                    <p className="text-[11px] text-muted-foreground">Browser and desktop</p>
                  </div>
                </div>
                <Switch
                  checked={pushAlerts}
                  onCheckedChange={setPushAlerts}
                  aria-label="Push Notifications"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">Slack Integration</p>
                    <p className="text-[11px] text-muted-foreground">Post to #engineering</p>
                  </div>
                </div>
                <Switch
                  checked={slackAlerts}
                  onCheckedChange={setSlackAlerts}
                  aria-label="Slack Integration"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                <Bell className="size-4" />
                <span>Need webhook alerts?</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Connect external endpoints, PagerDuty, or Discord bots in your workspace developer settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
