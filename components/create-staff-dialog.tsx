"use client";

import { useState } from "react";
import {
  Loader2,
  User,
  Mail,
  Phone,
  Lock,
  Briefcase,
  Building2,
  CalendarIcon,
  DollarSign,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCreateStaff } from "@/hooks/useStaff";
import type { CreateStaffRequest } from "@/types/staff.types";

interface CreateStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessId: string;
}

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  position: "",
  department: "",
  dateHired: new Date().toISOString().split("T")[0],
  salary: "",
  salaryType: "" as string,
  employmentType: "" as string,
};

export function CreateStaffDialog({
  open,
  onOpenChange,
  businessId,
}: CreateStaffDialogProps) {
  const [form, setForm] = useState(initialForm);
  const { mutate: createStaff, isPending } = useCreateStaff();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetForm();
    onOpenChange(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateStaffRequest = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      position: form.position.trim(),
      dateHired: new Date(form.dateHired).toISOString(),
      businessId,
      ...(form.phone && { phone: form.phone.trim() }),
      ...(form.department && { department: form.department.trim() }),
      ...(form.salary && { salary: parseFloat(form.salary) }),
      ...(form.salaryType && {
        salaryType: form.salaryType as CreateStaffRequest["salaryType"],
      }),
      ...(form.employmentType && {
        employmentType:
          form.employmentType as CreateStaffRequest["employmentType"],
      }),
    };

    createStaff(payload, {
      onSuccess: () => {
        resetForm();
        onOpenChange(false);
      },
    });
  };

  const isValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.password.length >= 6 &&
    form.position.trim() &&
    form.dateHired;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Staff Member</DialogTitle>
            <DialogDescription>
              Create a new staff member for this business. They will receive
              login credentials via email.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* ── Personal Information ── */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Personal Information
              </h4>
              <div className="grid gap-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={form.firstName}
                        onChange={handleChange}
                        disabled={isPending}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={handleChange}
                        disabled={isPending}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={form.email}
                      onChange={handleChange}
                      disabled={isPending}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={form.password}
                      onChange={handleChange}
                      disabled={isPending}
                      className="pl-9"
                      minLength={6}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 6 characters
                  </p>
                </div>

                {/* Phone */}
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={isPending}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* ── Employment Details ── */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Employment Details
              </h4>
              <div className="grid gap-4">
                {/* Position & Department */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="position">
                      Position <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="position"
                        name="position"
                        placeholder="Software Engineer"
                        value={form.position}
                        onChange={handleChange}
                        disabled={isPending}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="department"
                        name="department"
                        placeholder="Engineering"
                        value={form.department}
                        onChange={handleChange}
                        disabled={isPending}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                {/* Date Hired & Employment Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="dateHired">
                      Date Hired <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="dateHired"
                        name="dateHired"
                        type="date"
                        value={form.dateHired}
                        onChange={handleChange}
                        disabled={isPending}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Employment Type</Label>
                    <Select
                      value={form.employmentType}
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, employmentType: value }))
                      }
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Salary & Salary Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="salary">Salary</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="salary"
                        name="salary"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={form.salary}
                        onChange={handleChange}
                        disabled={isPending}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Salary Type</Label>
                    <Select
                      value={form.salaryType}
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, salaryType: value }))
                      }
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Staff Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
