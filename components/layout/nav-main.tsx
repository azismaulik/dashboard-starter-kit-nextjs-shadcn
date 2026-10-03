"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavGroup, NavItem } from "@/types";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";

export function NavGroupItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  const isActive =
    pathname === item.href ||
    (item.href !== "/dashboard" && pathname.startsWith(item.href));

  const hasChildren = item.children && item.children.length > 0;
  const isChildActive = hasChildren
    ? item.children!.some(
        (child) => pathname === child.href || pathname.startsWith(child.href)
      )
    : false;

  const [prevChildActive, setPrevChildActive] = React.useState(isChildActive);
  const [isOpen, setIsOpen] = React.useState(isChildActive);

  if (isChildActive !== prevChildActive) {
    setPrevChildActive(isChildActive);
    if (isChildActive) {
      setIsOpen(true);
    }
  }

  if (item.disabled) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive || isChildActive}
        tooltip={item.title}
        render={<Link href={item.href} />}
        onClick={() => {
          if (isMobile) {
            setOpenMobile(false);
          }
        }}
      >
        <item.icon className="size-4 shrink-0" />
        <span className="truncate">{item.title}</span>
      </SidebarMenuButton>

      {item.badge !== undefined && !isCollapsed && (
        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
      )}

      {hasChildren && !isCollapsed && (
        <>
          <SidebarMenuAction
            showOnHover={false}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            aria-label={`Toggle ${item.title} submenu`}
          >
            <ChevronRight
              className={cn(
                "size-3.5 transition-transform duration-200",
                isOpen && "rotate-90"
              )}
            />
          </SidebarMenuAction>

          {isOpen && (
            <SidebarMenuSub>
              {item.children!.map((child) => {
                const isSubActive = pathname === child.href;
                return (
                  <SidebarMenuSubItem key={child.href}>
                    <SidebarMenuSubButton
                      isActive={isSubActive}
                      render={<Link href={child.href} />}
                      onClick={() => {
                        if (isMobile) {
                          setOpenMobile(false);
                        }
                      }}
                    >
                      <child.icon className="size-3.5 shrink-0" />
                      <span className="truncate">{child.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          )}
        </>
      )}
    </SidebarMenuItem>
  );
}

export function NavMain({ groups }: { groups: NavGroup[] }) {
  return (
    <>
      {groups.map((group, index) => (
        <SidebarGroup key={group.label ?? `group-${index}`}>
          {group.label && (
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <NavGroupItem key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
