"use client";

import * as React from "react";
import {
  cn,
  formatCurrency,
  formatCompact,
  formatPercentage,
} from "@/lib/utils";
import { Copy, Check, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── CopyButton ───────────────────────────────────────────────────────────────

export interface CopyButtonProps {
  value: string;
  label?: string;
  successLabel?: string;
  size?: "xs" | "sm" | "default" | "icon" | "icon-xs" | "icon-sm";
  variant?: "ghost" | "outline" | "default" | "secondary";
  showText?: boolean;
  className?: string;
  onCopy?: () => void;
}

export function CopyButton({
  value,
  label = "Copy",
  successLabel = "Copied!",
  size = "icon-sm",
  variant = "ghost",
  showText = false,
  className,
  onCopy,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant={variant}
            size={showText ? "sm" : size}
            onClick={handleCopy}
            className={cn("shrink-0", className)}
            aria-label={copied ? successLabel : label}
          >
            {copied ? <Check className="text-emerald-500" /> : <Copy />}
            {showText && <span>{copied ? successLabel : label}</span>}
          </Button>
        }
      />
      <TooltipContent>{copied ? successLabel : label}</TooltipContent>
    </Tooltip>
  );
}

// ─── CopyableText ─────────────────────────────────────────────────────────────
// Inline text with a copy icon

export interface CopyableTextProps {
  value: string;
  displayValue?: string;
  className?: string;
  textClassName?: string;
}

export function CopyableText({
  value,
  displayValue,
  className,
  textClassName,
}: CopyableTextProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className={cn("font-mono text-sm", textClassName)}>
        {displayValue ?? value}
      </span>
      <CopyButton value={value} size="icon-xs" variant="ghost" />
    </span>
  );
}

// ─── CopyableField ────────────────────────────────────────────────────────────
// Full-width input-like display with copy button

export interface CopyableFieldProps {
  value: string;
  label?: string;
  className?: string;
}

export function CopyableField({ value, label, className }: CopyableFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      )}
      <div className="flex h-9 items-center gap-2 rounded-lg border border-input bg-muted/40 px-3 text-sm">
        <span className="flex-1 truncate font-mono text-xs">{value}</span>
        <CopyButton value={value} size="icon-xs" variant="ghost" />
      </div>
    </div>
  );
}

// ─── CurrencyDisplay ──────────────────────────────────────────────────────────

export interface CurrencyDisplayProps {
  amount: number;
  currency?: string;
  locale?: string;
  compact?: boolean;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function CurrencyDisplay({
  amount,
  currency = "USD",
  locale = "en-US",
  compact = false,
  className,
  prefix,
  suffix,
}: CurrencyDisplayProps) {
  const formatted = compact
    ? `${currency} ${formatCompact(amount)}`
    : formatCurrency(amount, currency, locale);

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ─── TrendBadge ───────────────────────────────────────────────────────────────

export interface TrendBadgeProps {
  value: number;
  /** If true, higher is worse (e.g., churn, errors) */
  inverse?: boolean;
  showIcon?: boolean;
  className?: string;
  /** Optional label shown after the value */
  label?: string;
}

export function TrendBadge({
  value,
  inverse = false,
  showIcon = true,
  label,
  className,
}: TrendBadgeProps) {
  const isPositive = inverse ? value < 0 : value > 0;
  const isNegative = inverse ? value > 0 : value < 0;
  const isNeutral = value === 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium",
        isPositive && "text-emerald-600 dark:text-emerald-400",
        isNegative && "text-destructive",
        isNeutral && "text-muted-foreground",
        className,
      )}
    >
      {showIcon &&
        (isPositive ? (
          <TrendingUp className="size-3" />
        ) : isNegative ? (
          <TrendingDown className="size-3" />
        ) : (
          <Minus className="size-3" />
        ))}
      {formatPercentage(value)}
      {label && <span className="ml-0.5 opacity-70">{label}</span>}
    </span>
  );
}

// ─── InlineCode ───────────────────────────────────────────────────────────────

export function InlineCode({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground",
        className,
      )}
    >
      {children}
    </code>
  );
}

// ─── Kbd ─────────────────────────────────────────────────────────────────────

export function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] text-muted-foreground shadow-sm",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

// ─── Dot indicator ───────────────────────────────────────────────────────────

type DotColor = "green" | "yellow" | "red" | "blue" | "gray";

export function Dot({
  color = "gray",
  className,
}: {
  color?: DotColor;
  className?: string;
}) {
  const colors: Record<DotColor, string> = {
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-destructive",
    blue: "bg-blue-500",
    gray: "bg-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-block size-2 rounded-full",
        colors[color],
        className,
      )}
      aria-hidden="true"
    />
  );
}
