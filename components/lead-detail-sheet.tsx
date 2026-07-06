"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Building2, Calendar, Loader2, X, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadTagMultiselect } from "@/components/lead-tag-multiselect";
import { useUpdateLead } from "@/hooks/useLeads";
import type { Lead } from "@/types/leads.types";

interface LeadDetailSheetProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tagOptions?: string[];
}

// Order-insensitive equality for two tag lists
function sameTags(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((t) => setB.has(t));
}

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "converted", label: "Converted" },
] as const;

const sourceLabels: Record<Lead["source"], string> = {
  contact_form: "Contact Form",
  newsletter: "Newsletter",
  other: "Other",
};

export function LeadDetailSheet({
  lead,
  open,
  onOpenChange,
  tagOptions = [],
}: LeadDetailSheetProps) {
  const { mutate: updateLead, isPending } = useUpdateLead();
  const [status, setStatus] = useState<Lead["status"]>("new");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      setNotes(lead.notes || "");
      setTags(lead.tags || []);
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = () => {
    updateLead(
      { id: lead._id, data: { status, notes, tags } },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const hasChanges =
    status !== lead.status ||
    notes !== (lead.notes || "") ||
    !sameTags(tags, lead.tags || []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {lead.lastName ? `${lead.firstName} ${lead.lastName}` : lead.firstName}
          </SheetTitle>
          <SheetDescription>Lead details from {sourceLabels[lead.source]}</SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{lead.email}</span>
          </div>
          {lead.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{lead.phone}</span>
            </div>
          )}
          {lead.company && (
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{lead.company}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Submitted{" "}
              {new Date(lead.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as Lead["status"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 pr-1 font-normal"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="rounded-sm hover:bg-muted-foreground/20"
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <LeadTagMultiselect
                options={tagOptions}
                selected={tags}
                onChange={setTags}
                allowCreate
                align="start"
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 gap-1 border-dashed px-2 text-xs font-normal"
                  >
                    <Plus className="h-3 w-3" />
                    Add tag
                  </Button>
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-notes">Notes</Label>
            <Textarea
              id="lead-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this lead..."
              rows={4}
            />
          </div>
        </div>

        <SheetFooter>
          <Button onClick={handleSave} disabled={!hasChanges || isPending} className="gap-2">
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
