"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  X,
  Check,
  Loader2,
  Trash2,
  Upload,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  Briefcase,
  FileText,
  User,
  StickyNote,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useStaffById,
  useUpdateStaff,
  useDeleteStaff,
  useUploadStaffPhoto,
  useUploadStaffDocument,
} from "@/hooks/useStaff";
import { useCompensationProfiles } from "@/hooks/useCompensationProfile";
import type { UpdateStaffRequest } from "@/types/staff.types";

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  on_leave: {
    label: "On Leave",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  terminated: {
    label: "Terminated",
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
};

const employmentTypeConfig = {
  "full-time": {
    label: "Full-time",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  "part-time": {
    label: "Part-time",
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  contract: {
    label: "Contract",
    className: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
};

export default function StaffDetailPage() {
  const router = useRouter();
  const params = useParams();
  const businessId = params.id as string;
  const staffId = params.staffId as string;

  const [isEditing, setIsEditing] = useState(false);
  const [selectedLinkProfileId, setSelectedLinkProfileId] = useState("");
  const [form, setForm] = useState<UpdateStaffRequest>({});
  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const { data: staff, isLoading, isError } = useStaffById(staffId);
  const { mutate: updateStaff, isPending: isUpdating } = useUpdateStaff();
  const { mutate: deleteStaff, isPending: isDeleting } = useDeleteStaff();
  const { mutate: uploadPhoto, isPending: isUploadingPhoto } =
    useUploadStaffPhoto();
  const { mutate: uploadDocument, isPending: isUploadingDoc } =
    useUploadStaffDocument();
  const { data: compensationProfiles, isLoading: isCompensationLoading } =
    useCompensationProfiles({
      businessId,
      isActive: true,
    });

  useEffect(() => {
    if (!staff) {
      setSelectedLinkProfileId("");
      return;
    }

    const profiles = compensationProfiles ?? [];
    const linked =
      profiles.find((profile) => profile._id === staff.compensationProfileId) ??
      null;

    setSelectedLinkProfileId(linked?._id ?? "");
  }, [staff, compensationProfiles]);

  const handleEditToggle = () => {
    if (!staff) return;
    setForm({
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      phone: staff.phone ?? "",
      position: staff.position,
      department: staff.department ?? "",
      dateHired: staff.dateHired,
      salary: staff.salary,
      employmentType: staff.employmentType,
      status: staff.status,
      notes: staff.notes ?? "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({});
  };

  const handleSave = () => {
    const payload: UpdateStaffRequest = {
      ...form,
      salaryType: "hourly",
    };
    updateStaff(
      { id: staffId, data: payload },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadPhoto({ id: staffId, file });
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadDocument({ id: staffId, file });
    e.target.value = "";
  };

  const handleDelete = () => {
    deleteStaff(
      { id: staffId, businessId },
      { onSuccess: () => router.push(`/business/${businessId}/staff`) },
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !staff) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <User className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Staff member not found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This staff member may have been removed or you may not have access.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push(`/business/${businessId}/staff`)}
        >
          Back to Staff
        </Button>
      </div>
    );
  }

  const status = (isEditing ? form.status : staff.status) ?? staff.status;
  const statusCfg = statusConfig[status];
  const empType =
    (isEditing ? form.employmentType : staff.employmentType) ??
    staff.employmentType;
  const empCfg = employmentTypeConfig[empType];
  const allCompensationProfiles = compensationProfiles ?? [];
  const linkedCompensationProfile =
    allCompensationProfiles.find(
      (profile) => profile._id === staff.compensationProfileId,
    ) ?? null;
  const activeCompensationProfile = linkedCompensationProfile;

  const handleLinkCompensationProfile = () => {
    if (!selectedLinkProfileId) return;
    const payload: UpdateStaffRequest = {
      compensationProfileId: selectedLinkProfileId,
      salaryType: "hourly",
    };
    updateStaff({ id: staffId, data: payload });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/business/${businessId}/staff`)}
          className="h-9 w-9 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {staff.firstName} {staff.lastName}
          </h1>
          <p className="text-sm text-muted-foreground">{staff.position}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {!isEditing ? (
            <>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleEditToggle}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="gap-2"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove{" "}
                      <strong>
                        {staff.firstName} {staff.lastName}
                      </strong>
                      ? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="gap-2"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                className="gap-2"
                onClick={handleSave}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column — profile card */}
        <div className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center gap-4 pt-6">
              {/* Avatar + photo upload */}
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-muted">
                  <AvatarImage
                    src={staff.photoUrl}
                    alt={`${staff.firstName} ${staff.lastName}`}
                  />
                  <AvatarFallback className="text-2xl font-medium bg-muted">
                    {staff.firstName[0]}
                    {staff.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => photoInputRef.current?.click()}
                  disabled={isUploadingPhoto}
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted transition-colors disabled:opacity-50"
                >
                  {isUploadingPhoto ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                </button>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              <div className="text-center">
                <p className="font-semibold text-lg">
                  {staff.firstName} {staff.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {staff.position}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {isEditing ? (
                  <Select
                    value={form.status}
                    onValueChange={(v) =>
                      setForm((f) => ({
                        ...f,
                        status: v as UpdateStaffRequest["status"],
                      }))
                    }
                  >
                    <SelectTrigger className="h-8 w-[130px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="outline" className={statusCfg.className}>
                    {statusCfg.label}
                  </Badge>
                )}
                <Badge variant="outline" className={empCfg.className}>
                  {empCfg.label}
                </Badge>
              </div>

              <Separator />

              <div className="w-full space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{staff.email}</span>
                </div>
                {staff.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{staff.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>
                    Hired{" "}
                    {new Date(staff.dateHired).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {staff.department && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span>{staff.department}</span>
                  </div>
                )}
                {staff.salary != null && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4 shrink-0" />
                    <span>{staff.salary.toLocaleString()} / hour</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <User className="h-4 w-4" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  First Name
                </Label>
                {isEditing ? (
                  <Input
                    value={form.firstName ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                  />
                ) : (
                  <p className="text-sm font-medium">{staff.firstName}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Last Name
                </Label>
                {isEditing ? (
                  <Input
                    value={form.lastName ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lastName: e.target.value }))
                    }
                  />
                ) : (
                  <p className="text-sm font-medium">{staff.lastName}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Email</Label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={form.email ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                ) : (
                  <p className="text-sm font-medium">{staff.email}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Phone</Label>
                {isEditing ? (
                  <Input
                    value={form.phone ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="—"
                  />
                ) : (
                  <p className="text-sm font-medium">{staff.phone || "—"}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Employment Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Briefcase className="h-4 w-4" />
                Employment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Position
                </Label>
                {isEditing ? (
                  <Input
                    value={form.position ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, position: e.target.value }))
                    }
                  />
                ) : (
                  <p className="text-sm font-medium">{staff.position}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Department
                </Label>
                {isEditing ? (
                  <Input
                    value={form.department ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, department: e.target.value }))
                    }
                    placeholder="—"
                  />
                ) : (
                  <p className="text-sm font-medium">
                    {staff.department || "—"}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Date Hired
                </Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={form.dateHired ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, dateHired: e.target.value }))
                    }
                  />
                ) : (
                  <p className="text-sm font-medium">
                    {new Date(staff.dateHired).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Employment Type
                </Label>
                {isEditing ? (
                  <Select
                    value={form.employmentType ?? ""}
                    onValueChange={(v) =>
                      setForm((f) => ({
                        ...f,
                        employmentType:
                          v as UpdateStaffRequest["employmentType"],
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm font-medium capitalize">
                    {staff.employmentType}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Hourly Rate
                </Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={form.salary ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        salary: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      }))
                    }
                    placeholder="—"
                  />
                ) : (
                  <p className="text-sm font-medium">
                    {staff.salary != null ? staff.salary.toLocaleString() : "—"}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Compensation Model
                </Label>
                <p className="text-sm font-medium">Hourly</p>
              </div>
            </CardContent>
          </Card>

          {/* Compensation Profile */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <DollarSign className="h-4 w-4" />
                Compensation Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isCompensationLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading compensation profile...
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
                    <Select
                      value={selectedLinkProfileId}
                      onValueChange={setSelectedLinkProfileId}
                      disabled={
                        isUpdating || allCompensationProfiles.length === 0
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an existing compensation profile" />
                      </SelectTrigger>
                      <SelectContent>
                        {allCompensationProfiles.map((profile) => (
                          <SelectItem key={profile._id} value={profile._id}>
                            {profile.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={handleLinkCompensationProfile}
                      disabled={
                        !selectedLinkProfileId ||
                        selectedLinkProfileId === staff.compensationProfileId ||
                        isUpdating ||
                        allCompensationProfiles.length === 0
                      }
                    >
                      Link Profile
                    </Button>
                  </div>

                  {allCompensationProfiles.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No existing profiles available yet. Create one first, then
                      you can link it to multiple staff.
                    </p>
                  )}

                  {activeCompensationProfile ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Link Status
                        </Label>
                        <p className="text-sm font-medium">
                          Linked to compensation profile
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Profile Name
                        </Label>
                        <p className="text-sm font-medium">
                          {activeCompensationProfile.name}
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Effective From
                        </Label>
                        <p className="text-sm font-medium">
                          {activeCompensationProfile.effectiveFrom}
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Hourly Rate
                        </Label>
                        <p className="text-sm font-medium">
                          {activeCompensationProfile.hourlyRate.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          OT / Sunday / Night Diff
                        </Label>
                        <p className="text-sm font-medium">
                          {activeCompensationProfile.overtimeRateMultiplier}x /{" "}
                          {activeCompensationProfile.sundayRateMultiplier}x /{" "}
                          {
                            activeCompensationProfile.nightDifferentialRateMultiplier
                          }
                          x
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Transportation Allowance
                        </Label>
                        <p className="text-sm font-medium">
                          {activeCompensationProfile.isTransportationAllowanceEnabled
                            ? `₱${activeCompensationProfile.transportationAllowanceMonthlyAmount.toLocaleString()}/mo`
                            : "Not enabled"}
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Statutory Deductions
                        </Label>
                        <p className="text-sm font-medium">
                          SSS:{" "}
                          {activeCompensationProfile.isSssEnabled
                            ? activeCompensationProfile.sssDeductionFixedAmount.toLocaleString()
                            : "Off"}{" "}
                          | Pag-IBIG:{" "}
                          {activeCompensationProfile.isPagIbigEnabled
                            ? activeCompensationProfile.pagIbigDeductionFixedAmount.toLocaleString()
                            : "Off"}{" "}
                          | PhilHealth:{" "}
                          {activeCompensationProfile.isPhilHealthEnabled
                            ? activeCompensationProfile.philHealthDeductionFixedAmount.toLocaleString()
                            : "Off"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No staff compensation profile yet. Link an existing
                      profile above, or create/manage profiles on the
                      compensation profile page.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <StickyNote className="h-4 w-4" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={form.notes ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  placeholder="Add notes about this staff member..."
                  rows={4}
                />
              ) : (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {staff.notes || "No notes added."}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <FileText className="h-4 w-4" />
                Documents
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => docInputRef.current?.click()}
                disabled={isUploadingDoc}
              >
                {isUploadingDoc ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Upload className="h-3.5 w-3.5" />
                )}
                Upload
              </Button>
              <input
                ref={docInputRef}
                type="file"
                accept=".pdf,.doc,.docx,image/jpeg,image/png"
                className="hidden"
                onChange={handleDocumentChange}
              />
            </CardHeader>
            <CardContent>
              {staff.documents && staff.documents.length > 0 ? (
                <ul className="divide-y">
                  {staff.documents.map((doc, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-2.5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {doc.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(doc.uploadedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 shrink-0"
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No documents uploaded.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
