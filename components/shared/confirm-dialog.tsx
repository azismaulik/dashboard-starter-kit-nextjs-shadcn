"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Trash2,
  LogOut,
  UserMinus,
  ShieldOff,
} from "lucide-react";

// ─── ConfirmDialog ────────────────────────────────────────────────────────────

export interface ConfirmDialogProps {
  /** The trigger element that opens the dialog */
  trigger?: React.ReactNode;
  /** Dialog open state (controlled) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  /** Label for the confirm button (default: "Confirm") */
  confirmLabel?: string;
  /** Label for the cancel button (default: "Cancel") */
  cancelLabel?: string;
  /** Variant of the confirm button */
  variant?: "default" | "destructive";
  /** Called when confirm is clicked. If async, loading state is handled. */
  onConfirm: () => void | Promise<void>;
  className?: string;
}

export function ConfirmDialog({
  trigger,
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  onConfirm,
  className,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled
    ? (onOpenChange ?? (() => {}))
    : setInternalOpen;

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger render={trigger as React.ReactElement} />}
      <DialogContent className={cn("sm:max-w-100", className)}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full",
                variant === "destructive"
                  ? "bg-destructive/10"
                  : "bg-primary/10",
              )}
            >
              <AlertTriangle
                className={cn(
                  "size-4",
                  variant === "destructive"
                    ? "text-destructive"
                    : "text-primary",
                )}
              />
            </div>
            <DialogTitle className="text-base">{title}</DialogTitle>
          </div>
          {description && (
            <DialogDescription className="pl-12">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={handleConfirm} disabled={loading}>
            {loading ? "Processing…" : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Pre-built confirm dialogs ────────────────────────────────────────────────

export interface SimpleConfirmProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  resourceName?: string;
  onConfirm: () => void | Promise<void>;
}

export function DeleteConfirmDialog({
  trigger,
  open,
  onOpenChange,
  resourceName = "this item",
  onConfirm,
}: SimpleConfirmProps) {
  return (
    <ConfirmDialog
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title={`Delete ${resourceName}?`}
      description="This action cannot be undone. The data will be permanently deleted."
      confirmLabel="Delete"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}

export function RemoveMemberConfirmDialog({
  trigger,
  open,
  onOpenChange,
  resourceName = "this member",
  onConfirm,
}: SimpleConfirmProps) {
  return (
    <ConfirmDialog
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title={`Remove ${resourceName}?`}
      description="They will lose access to the workspace immediately."
      confirmLabel="Remove"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}

export function RevokeAccessConfirmDialog({
  trigger,
  open,
  onOpenChange,
  resourceName = "this access",
  onConfirm,
}: SimpleConfirmProps) {
  return (
    <ConfirmDialog
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title={`Revoke ${resourceName}?`}
      description="This will immediately revoke the permission. This cannot be undone."
      confirmLabel="Revoke"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}

export function SignOutConfirmDialog({
  trigger,
  open,
  onOpenChange,
  onConfirm,
}: Omit<SimpleConfirmProps, "resourceName">) {
  return (
    <ConfirmDialog
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title="Sign out?"
      description="You will be signed out of your current session."
      confirmLabel="Sign out"
      cancelLabel="Stay"
      variant="default"
      onConfirm={onConfirm}
    />
  );
}

export function CancelSubscriptionConfirmDialog({
  trigger,
  open,
  onOpenChange,
  onConfirm,
}: Omit<SimpleConfirmProps, "resourceName">) {
  return (
    <ConfirmDialog
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      title="Cancel subscription?"
      description="Your plan will remain active until the end of the current billing period, then revert to Free."
      confirmLabel="Cancel subscription"
      variant="destructive"
      onConfirm={onConfirm}
    />
  );
}

// Export confirm dialog trigger helpers
export {
  Trash2 as DeleteIcon,
  UserMinus as RemoveMemberIcon,
  ShieldOff as RevokeIcon,
  LogOut as SignOutIcon,
};
