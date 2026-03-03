"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateCompensationProfile,
  useUpdateCompensationProfile,
} from "@/hooks/useCompensationProfile";
import type {
  CompensationProfile,
  CreateCompensationProfileRequest,
  UpdateCompensationProfileRequest,
} from "@/types/compensation-profile.types";

interface CompensationProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessId: string;
  profile?: CompensationProfile | null;
}

interface FormState {
  name: string;
  currency: string;
  hourlyRate: string;
  overtimeRateMultiplier: string;
  sundayRateMultiplier: string;
  nightDifferentialRateMultiplier: string;
  isTransportationAllowanceEnabled: boolean;
  transportationAllowanceMonthlyAmount: string;
  isSssEnabled: boolean;
  sssDeductionFixedAmount: string;
  isPagIbigEnabled: boolean;
  pagIbigDeductionFixedAmount: string;
  isPhilHealthEnabled: boolean;
  philHealthDeductionFixedAmount: string;
  effectiveFrom: string;
  effectiveTo: string;
}

const today = () => new Date().toISOString().split("T")[0];
const toNumber = (value: string) => Number.parseFloat(value);
const toDateInput = (value?: string) => (value ? value.slice(0, 10) : "");

function buildInitialForm(profile?: CompensationProfile | null): FormState {
  if (profile) {
    return {
      name: profile.name,
      currency: profile.currency || "PHP",
      hourlyRate: String(profile.hourlyRate),
      overtimeRateMultiplier: String(profile.overtimeRateMultiplier),
      sundayRateMultiplier: String(profile.sundayRateMultiplier),
      nightDifferentialRateMultiplier: String(
        profile.nightDifferentialRateMultiplier,
      ),
      isTransportationAllowanceEnabled:
        profile.isTransportationAllowanceEnabled,
      transportationAllowanceMonthlyAmount: String(
        profile.transportationAllowanceMonthlyAmount,
      ),
      isSssEnabled: profile.isSssEnabled,
      sssDeductionFixedAmount: String(profile.sssDeductionFixedAmount),
      isPagIbigEnabled: profile.isPagIbigEnabled,
      pagIbigDeductionFixedAmount: String(profile.pagIbigDeductionFixedAmount),
      isPhilHealthEnabled: profile.isPhilHealthEnabled,
      philHealthDeductionFixedAmount: String(
        profile.philHealthDeductionFixedAmount,
      ),
      effectiveFrom: toDateInput(profile.effectiveFrom) || today(),
      effectiveTo: toDateInput(profile.effectiveTo),
    };
  }

  return {
    name: "",
    currency: "PHP",
    hourlyRate: "",
    overtimeRateMultiplier: "1.25",
    sundayRateMultiplier: "1.30",
    nightDifferentialRateMultiplier: "1.10",
    isTransportationAllowanceEnabled: false,
    transportationAllowanceMonthlyAmount: "0",
    isSssEnabled: false,
    sssDeductionFixedAmount: "0",
    isPagIbigEnabled: false,
    pagIbigDeductionFixedAmount: "0",
    isPhilHealthEnabled: false,
    philHealthDeductionFixedAmount: "0",
    effectiveFrom: today(),
    effectiveTo: "",
  };
}

export function CompensationProfileDialog({
  open,
  onOpenChange,
  businessId,
  profile,
}: CompensationProfileDialogProps) {
  const [form, setForm] = useState<FormState>(buildInitialForm(profile));
  const isEditMode = !!profile?._id;

  const { mutate: createProfile, isPending: isCreating } =
    useCreateCompensationProfile();
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateCompensationProfile();
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (open) {
      setForm(buildInitialForm(profile));
    }
  }, [open, profile]);

  const isValid =
    form.name.trim().length > 0 &&
    !Number.isNaN(toNumber(form.hourlyRate)) &&
    toNumber(form.hourlyRate) > 0 &&
    !Number.isNaN(toNumber(form.overtimeRateMultiplier)) &&
    toNumber(form.overtimeRateMultiplier) >= 1 &&
    !Number.isNaN(toNumber(form.sundayRateMultiplier)) &&
    toNumber(form.sundayRateMultiplier) >= 1 &&
    !Number.isNaN(toNumber(form.nightDifferentialRateMultiplier)) &&
    toNumber(form.nightDifferentialRateMultiplier) >= 1 &&
    (!form.isTransportationAllowanceEnabled ||
      (!Number.isNaN(toNumber(form.transportationAllowanceMonthlyAmount)) &&
        toNumber(form.transportationAllowanceMonthlyAmount) >= 0)) &&
    (!form.isSssEnabled ||
      (!Number.isNaN(toNumber(form.sssDeductionFixedAmount)) &&
        toNumber(form.sssDeductionFixedAmount) >= 0)) &&
    (!form.isPagIbigEnabled ||
      (!Number.isNaN(toNumber(form.pagIbigDeductionFixedAmount)) &&
        toNumber(form.pagIbigDeductionFixedAmount) >= 0)) &&
    (!form.isPhilHealthEnabled ||
      (!Number.isNaN(toNumber(form.philHealthDeductionFixedAmount)) &&
        toNumber(form.philHealthDeductionFixedAmount) >= 0));

  const createPayload: CreateCompensationProfileRequest = {
    name: form.name.trim(),
    businessId,
    currency: form.currency,
    hourlyRate: toNumber(form.hourlyRate),
    overtimeRateMultiplier: toNumber(form.overtimeRateMultiplier),
    sundayRateMultiplier: toNumber(form.sundayRateMultiplier),
    nightDifferentialRateMultiplier: toNumber(
      form.nightDifferentialRateMultiplier,
    ),
    isTransportationAllowanceEnabled: form.isTransportationAllowanceEnabled,
    transportationAllowanceMonthlyAmount: form.isTransportationAllowanceEnabled
      ? toNumber(form.transportationAllowanceMonthlyAmount)
      : 0,
    isSssEnabled: form.isSssEnabled,
    sssDeductionFixedAmount: form.isSssEnabled
      ? toNumber(form.sssDeductionFixedAmount)
      : 0,
    isPagIbigEnabled: form.isPagIbigEnabled,
    pagIbigDeductionFixedAmount: form.isPagIbigEnabled
      ? toNumber(form.pagIbigDeductionFixedAmount)
      : 0,
    isPhilHealthEnabled: form.isPhilHealthEnabled,
    philHealthDeductionFixedAmount: form.isPhilHealthEnabled
      ? toNumber(form.philHealthDeductionFixedAmount)
      : 0,
    effectiveFrom: form.effectiveFrom,
    ...(form.effectiveTo && { effectiveTo: form.effectiveTo }),
    isActive: true,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    if (isEditMode && profile?._id) {
      const updatePayload: UpdateCompensationProfileRequest = createPayload;
      updateProfile(
        {
          id: profile._id,
          data: updatePayload,
        },
        {
          onSuccess: () => onOpenChange(false),
        },
      );
      return;
    }

    createProfile(createPayload, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[760px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditMode
                ? "Edit Compensation Profile"
                : "Create Compensation Profile"}
            </DialogTitle>
            <DialogDescription>
              Manage shared compensation settings and link them to staff from
              staff details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="profileName">
                  Profile Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="profileName"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Warehouse Team Default"
                  disabled={isPending}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hourlyRate">
                  Hourly Rate <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.hourlyRate}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, hourlyRate: e.target.value }))
                  }
                  placeholder="0.00"
                  disabled={isPending}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currency">
                  Currency <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.currency}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, currency: value }))
                  }
                  disabled={isPending}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PHP">PHP – Philippine Peso</SelectItem>
                    <SelectItem value="USD">USD – US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR – Euro</SelectItem>
                    <SelectItem value="GBP">GBP – British Pound</SelectItem>
                    <SelectItem value="AUD">AUD – Australian Dollar</SelectItem>
                    <SelectItem value="CAD">CAD – Canadian Dollar</SelectItem>
                    <SelectItem value="JPY">JPY – Japanese Yen</SelectItem>
                    <SelectItem value="SGD">SGD – Singapore Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="overtimeRateMultiplier">OT Multiplier</Label>
                <Input
                  id="overtimeRateMultiplier"
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.overtimeRateMultiplier}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      overtimeRateMultiplier: e.target.value,
                    }))
                  }
                  disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sundayRateMultiplier">Sunday Multiplier</Label>
                <Input
                  id="sundayRateMultiplier"
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.sundayRateMultiplier}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      sundayRateMultiplier: e.target.value,
                    }))
                  }
                  disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nightDiffMultiplier">
                  Night Diff Multiplier
                </Label>
                <Input
                  id="nightDiffMultiplier"
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.nightDifferentialRateMultiplier}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      nightDifferentialRateMultiplier: e.target.value,
                    }))
                  }
                  disabled={isPending}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Transportation Allowance
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Paid per on-site working day (PHP).
                  </p>
                </div>
                <Switch
                  checked={form.isTransportationAllowanceEnabled}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({
                      ...prev,
                      isTransportationAllowanceEnabled: checked,
                    }))
                  }
                  disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="transportationAllowanceAmount">
                  Monthly Amount (₱)
                </Label>
                <Input
                  id="transportationAllowanceAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.transportationAllowanceMonthlyAmount}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      transportationAllowanceMonthlyAmount: e.target.value,
                    }))
                  }
                  disabled={isPending || !form.isTransportationAllowanceEnabled}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <p className="text-sm font-medium">Statutory Deductions</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sssToggle">SSS</Label>
                    <Switch
                      id="sssToggle"
                      checked={form.isSssEnabled}
                      onCheckedChange={(checked) =>
                        setForm((prev) => ({ ...prev, isSssEnabled: checked }))
                      }
                      disabled={isPending}
                    />
                  </div>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.sssDeductionFixedAmount}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        sssDeductionFixedAmount: e.target.value,
                      }))
                    }
                    disabled={isPending || !form.isSssEnabled}
                  />
                </div>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pagIbigToggle">Pag-IBIG</Label>
                    <Switch
                      id="pagIbigToggle"
                      checked={form.isPagIbigEnabled}
                      onCheckedChange={(checked) =>
                        setForm((prev) => ({
                          ...prev,
                          isPagIbigEnabled: checked,
                        }))
                      }
                      disabled={isPending}
                    />
                  </div>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.pagIbigDeductionFixedAmount}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        pagIbigDeductionFixedAmount: e.target.value,
                      }))
                    }
                    disabled={isPending || !form.isPagIbigEnabled}
                  />
                </div>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="philHealthToggle">PhilHealth</Label>
                    <Switch
                      id="philHealthToggle"
                      checked={form.isPhilHealthEnabled}
                      onCheckedChange={(checked) =>
                        setForm((prev) => ({
                          ...prev,
                          isPhilHealthEnabled: checked,
                        }))
                      }
                      disabled={isPending}
                    />
                  </div>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.philHealthDeductionFixedAmount}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        philHealthDeductionFixedAmount: e.target.value,
                      }))
                    }
                    disabled={isPending || !form.isPhilHealthEnabled}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="effectiveFrom">Effective From</Label>
                <Input
                  id="effectiveFrom"
                  type="date"
                  value={form.effectiveFrom}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      effectiveFrom: e.target.value,
                    }))
                  }
                  disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="effectiveTo">Effective To (Optional)</Label>
                <Input
                  id="effectiveTo"
                  type="date"
                  value={form.effectiveTo}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      effectiveTo: e.target.value,
                    }))
                  }
                  disabled={isPending}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? "Update Profile" : "Create Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
