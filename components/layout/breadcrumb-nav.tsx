"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function formatSegment(segment: string): string {
  if (segment.startsWith("[") && segment.endsWith("]")) {
    return segment.slice(1, -1);
  }
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export interface BreadcrumbNavProps {
  className?: string;
}

export function BreadcrumbNav({ className }: BreadcrumbNavProps) {
  const pathname = usePathname();
  const rawSegments = pathname.split("/").filter(Boolean);

  // Generate breadcrumb trail
  const breadcrumbs = React.useMemo(() => {
    // If root or /dashboard
    if (rawSegments.length === 0 || (rawSegments.length === 1 && rawSegments[0] === "dashboard")) {
      return [{ id: "dashboard", name: "Dashboard", href: "/dashboard" }];
    }

    const trail = [{ id: "dashboard", name: "Dashboard", href: "/dashboard" }];

    let currentPath = "";
    for (const segment of rawSegments) {
      if (segment === "dashboard") continue;
      currentPath += `/${segment}`;
      trail.push({
        id: currentPath,
        name: formatSegment(segment),
        href: currentPath,
      });
    }

    return trail;
  }, [rawSegments]);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1.5 text-sm overflow-x-auto no-scrollbar py-1",
        className
      )}
    >
      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        const isFirst = idx === 0;
        const hideOnMobile = !isLast && breadcrumbs.length > 2 && isFirst;

        return (
          <div
            key={crumb.id}
            className={cn(
              "flex items-center gap-1.5 shrink-0",
              hideOnMobile && "hidden sm:flex"
            )}
          >
            {idx > 0 && (
              <ChevronRight
                className={cn(
                  "size-3.5 text-muted-foreground/40 shrink-0",
                  hideOnMobile && "hidden sm:block"
                )}
              />
            )}
            {isLast ? (
              <span
                aria-current="page"
                className="font-semibold text-foreground truncate max-w-28 sm:max-w-52 text-xs sm:text-sm"
              >
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="font-medium text-muted-foreground hover:text-foreground transition-colors truncate max-w-24 sm:max-w-36 text-xs sm:text-sm cursor-pointer"
              >
                {crumb.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
