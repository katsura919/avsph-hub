"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RefreshButtonProps {
  /** Trigger a refetch of the page's data (e.g. react-query refetch) */
  onRefresh: () => void;
  /** Spins the icon and disables the button while a refetch is in flight */
  isRefreshing?: boolean;
  /** Optional text label; when omitted the button is icon-only */
  label?: string;
  className?: string;
}

/**
 * Reusable refresh control for table pages. Wire `onRefresh` to the list
 * query's `refetch` and `isRefreshing` to its `isFetching` flag.
 */
export function RefreshButton({
  onRefresh,
  isRefreshing = false,
  label,
  className,
}: RefreshButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onRefresh}
      disabled={isRefreshing}
      aria-label="Refresh"
      title="Refresh"
      className={cn("h-9", label ? "gap-2" : "w-9 p-0", className)}
    >
      <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
      {label && <span className="hidden sm:inline">{label}</span>}
    </Button>
  );
}
