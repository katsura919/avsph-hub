"use client";

import { useState } from "react";
import { Loader2, DollarSign } from "lucide-react";
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
import { useHireApplicant } from "@/hooks/useJobPost";
import type { Applicant } from "@/types/jobPost.types";

interface HireDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    applicant: Applicant | null;
}

export function HireDialog({ open, onOpenChange, applicant }: HireDialogProps) {
    const [salary, setSalary] = useState("");
    const [salaryType, setSalaryType] = useState<string>("monthly");
    const { mutate: hire, isPending } = useHireApplicant();

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setSalary("");
            setSalaryType("monthly");
        }
        onOpenChange(newOpen);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!applicant) return;

        hire(
            {
                id: applicant._id,
                data: {
                    salary: parseFloat(salary),
                    salaryType: salaryType as "hourly" | "daily" | "monthly" | "annual",
                },
            },
            {
                onSuccess: () => {
                    handleOpenChange(false);
                },
            },
        );
    };

    const isValid = salary && parseFloat(salary) > 0 && salaryType;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[420px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Hire Applicant</DialogTitle>
                        <DialogDescription>
                            Convert{" "}
                            <span className="font-medium text-foreground">
                                {applicant?.firstName} {applicant?.lastName}
                            </span>{" "}
                            to a staff member. They will receive an email with login
                            credentials.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Applicant Info Summary */}
                        <div className="rounded-lg border bg-muted/50 p-3 space-y-1">
                            <p className="text-sm">
                                <span className="text-muted-foreground">Position:</span>{" "}
                                <span className="font-medium">{applicant?.position}</span>
                            </p>
                            <p className="text-sm">
                                <span className="text-muted-foreground">Email:</span>{" "}
                                <span className="font-medium">{applicant?.email}</span>
                            </p>
                        </div>

                        {/* Salary Input */}
                        <div className="grid gap-2">
                            <Label htmlFor="salary">
                                Salary <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="salary"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    disabled={isPending}
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>

                        {/* Salary Type */}
                        <div className="grid gap-2">
                            <Label>
                                Salary Type <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={salaryType}
                                onValueChange={setSalaryType}
                                disabled={isPending}
                            >
                                <SelectTrigger>
                                    <SelectValue />
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
                            Hire & Create Staff
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
