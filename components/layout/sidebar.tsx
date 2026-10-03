"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig, navConfig } from "@/config/site";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/layout/nav-main";
import { PlanUsage } from "@/components/layout/plan-usage";
import { NavUser } from "@/components/layout/nav-user";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header with macOS Window Controls & App Logo */}
      <SidebarHeader className="pt-2 pb-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/dashboard" />}
              onClick={() => {
                if (isMobile) {
                  setOpenMobile(false);
                }
              }}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-xs">
                D
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-sidebar-foreground">
                  {siteConfig.name}
                </span>
                <span className="truncate text-[10px] text-muted-foreground">
                  SaaS Starter Kit
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <NavMain groups={navConfig} />
      </SidebarContent>

      {/* Footer with Quota & User Profile */}
      <SidebarFooter>
        <PlanUsage />
        <NavUser />
      </SidebarFooter>

      {/* Sidebar Rail for desktop collapse/hover toggle */}
      <SidebarRail />
    </Sidebar>
  );
}

export { AppSidebar as Sidebar };
