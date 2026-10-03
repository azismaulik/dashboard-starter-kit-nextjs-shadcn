"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { SearchDialog } from "@/components/layout/search-dialog";
import { cn } from "@/lib/utils";

export interface SearchTriggerProps {
  className?: string;
}

export function SearchTrigger({ className }: SearchTriggerProps) {
  const [open, setOpen] = React.useState(false);

  // OS detection for shortcut badge without SSR hydration mismatch
  const isMac = React.useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && navigator.userAgent.toUpperCase().includes("MAC"),
    () => false
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        title={isMac ? "Search everything (⌘K)" : "Search everything (Ctrl+K)"}
        className={cn(
          "w-9 sm:w-56 md:w-72 justify-between px-2 sm:px-2.5 font-normal text-muted-foreground hover:text-foreground cursor-pointer shrink-0 shadow-none bg-muted/40 hover:bg-muted/70 border-border h-9 rounded-lg transition-colors",
          className
        )}
      >
        <div className="flex items-center gap-2 truncate">
          <Search className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          <span className="hidden sm:inline text-xs truncate">Search everything...</span>
        </div>
        <div className="hidden sm:flex items-center gap-0.5">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </div>
      </Button>

      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
