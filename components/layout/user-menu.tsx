"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User as UserIcon,
  Settings,
  Shield,
  CreditCard,
  LogOut,
  ChevronDown,
  Zap,
} from "lucide-react";
import { getInitials, cn } from "@/lib/utils";

export interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  const router = useRouter();
  const user = {
    name: "Ethan Caldwell",
    email: "ethan.caldwell@acmecorp.io",
    role: "Owner",
    plan: "Pro",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-2 rounded-full p-1 pl-1.5 hover:bg-muted/60 transition-colors",
              className
            )}
            id="user-menu-button"
            aria-label="User account menu"
          />
        }
      >
        <Avatar size="sm" className="size-7 ring-1 ring-border">
          <AvatarFallback className="bg-primary text-[10px] font-semibold text-primary-foreground">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden text-xs font-medium text-foreground md:inline-block">
          {user.name}
        </span>
        <ChevronDown className="size-3 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 shadow-lg">
        {/* User profile header */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal p-2">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold leading-none text-foreground">{user.name}</p>
                <Badge variant="secondary" className="h-4 gap-1 px-1 text-[9px] font-semibold text-primary">
                  <Zap className="size-2.5 fill-primary/20 text-primary" />
                  {user.plan}
                </Badge>
              </div>
              <p className="text-[11px] leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Navigation items */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/settings/profile")}
            className="cursor-pointer"
          >
            <UserIcon className="mr-2 size-3.5" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/settings/security")}
            className="cursor-pointer"
          >
            <Shield className="mr-2 size-3.5" />
            <span>Security & 2FA</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/settings/billing")}
            className="cursor-pointer"
          >
            <CreditCard className="mr-2 size-3.5" />
            <span>Billing & Plans</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/settings")}
            className="cursor-pointer"
          >
            <Settings className="mr-2 size-3.5" />
            <span>Workspace Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Sign out */}
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
          onClick={() => router.push("/auth/login")}
        >
          <LogOut className="mr-2 size-3.5" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
