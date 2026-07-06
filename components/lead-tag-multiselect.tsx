"use client";

import * as React from "react";
import { Check, Plus, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface LeadTagMultiselectProps {
  options: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
  allowCreate?: boolean;
  placeholder?: string;
  /** Custom trigger; falls back to a labelled button showing the count. */
  trigger?: React.ReactNode;
  triggerLabel?: string;
  className?: string;
  align?: "start" | "center" | "end";
}

export function LeadTagMultiselect({
  options,
  selected,
  onChange,
  allowCreate = false,
  placeholder = "Search tags...",
  trigger,
  triggerLabel = "Tags",
  className,
  align = "start",
}: LeadTagMultiselectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const normalizedQuery = query.trim();
  const filtered = options.filter((o) =>
    o.toLowerCase().includes(normalizedQuery.toLowerCase()),
  );
  const canCreate =
    allowCreate &&
    normalizedQuery.length > 0 &&
    !options.some((o) => o.toLowerCase() === normalizedQuery.toLowerCase());

  const toggle = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  const create = () => {
    if (!canCreate) return;
    onChange([...selected, normalizedQuery]);
    setQuery("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ?? (
          <Button
            variant="outline"
            className={cn("h-9 justify-start gap-2 font-normal", className)}
          >
            <TagIcon className="h-4 w-4 shrink-0" />
            {triggerLabel}
            {selected.length > 0 && (
              <span className="ml-1 rounded bg-primary/10 px-1.5 text-xs font-medium text-primary">
                {selected.length}
              </span>
            )}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align={align}>
        <div className="border-b p-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-8"
            onKeyDown={(e) => {
              if (e.key === "Enter" && canCreate) {
                e.preventDefault();
                create();
              }
            }}
          />
        </div>
        <ScrollArea className="max-h-[240px]">
          <div className="p-1">
            {filtered.length === 0 && !canCreate && (
              <p className="px-2 py-4 text-center text-xs text-muted-foreground">
                No tags found
              </p>
            )}
            {filtered.map((tag) => {
              const isSelected = selected.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggle(tag)}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/40",
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </span>
                  <span className="truncate">{tag}</span>
                </button>
              );
            })}
            {canCreate && (
              <button
                type="button"
                onClick={create}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-primary hover:bg-accent"
              >
                <Plus className="h-4 w-4" />
                Create &quot;{normalizedQuery}&quot;
              </button>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
