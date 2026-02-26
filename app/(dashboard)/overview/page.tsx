"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Building2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessCard } from "@/components/business-card";
import { useBusinesses } from "@/hooks/useBusiness";
import { useAdminStore } from "@/store/admin.store";
import { Separator } from "@/components/ui/separator";

export default function OverviewPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: businesses = [], isLoading } = useBusinesses();
  const { isSuperAdmin } = useAdminStore();
  const canCreateBusiness = isSuperAdmin();

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (business.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ??
        false),
  );

  const isAdminWithNoAccess = !canCreateBusiness && businesses.length === 0;

  const handleCreateBusiness = () => {
    router.push("/create");
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor your businesses.
          </p>
        </div>

        {canCreateBusiness && (
          <Button
            onClick={handleCreateBusiness}
            className="shrink-0 gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            New Business
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      {/* Access Denied State */}
      {isAdminWithNoAccess ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center animate-in fade-in-50">
          <div className="mx-auto flex max-w-[480px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100/50 dark:bg-amber-900/20 mb-6">
              <ShieldAlert className="h-8 w-8 text-amber-600 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              No Business Access
            </h3>
            <p className="mb-6 mt-2 text-muted-foreground leading-relaxed">
              You haven't been assigned to any businesses yet. Please contact
              your Super Admin to request access.
            </p>
            <div className="w-full rounded-lg bg-card border shadow-sm p-4 text-sm">
              <p className="font-medium text-foreground">Next Steps</p>
              <p className="mt-1 text-muted-foreground">
                Ask your Super Admin to add you via the Admin Management panel.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background/50 focus:bg-background transition-all"
              />
            </div>
          </div>

          {/* Content Area */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[200px] rounded-xl border bg-card/50 px-6 py-6 space-y-4 animate-pulse"
                >
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBusinesses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 animate-in fade-in-50 duration-500">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business._id} business={business} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center animate-in fade-in-50">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {searchQuery ? "No matching projects" : "No projects created"}
                </h3>
                <p className="mb-6 mt-2 text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search terms."
                    : "Get started by creating your first business project."}
                </p>
                {!searchQuery && canCreateBusiness && (
                  <Button onClick={handleCreateBusiness} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Business
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
