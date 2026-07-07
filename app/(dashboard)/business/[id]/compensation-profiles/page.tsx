"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Loader2,
  Pencil,
  Plus,
  Search,
  Wallet,
  ArrowRightLeft,
  Save,
  X,
} from "lucide-react";
import { CompensationProfileDialog } from "@/components/compensation-profile-dialog";
import { Button } from "@/components/ui/button";
import { RefreshButton } from "@/components/ui/refresh-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBusinessById } from "@/hooks/useBusiness";
import { useCompensationProfiles } from "@/hooks/useCompensationProfile";
import {
  useExchangeRates,
  useUpsertExchangeRate,
} from "@/hooks/useExchangeRate";
import type { CompensationProfile } from "@/types/compensation-profile.types";

export default function CompensationProfilesPage() {
  const params = useParams();
  const businessId = params.id as string;

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] =
    useState<CompensationProfile | null>(null);

  // Exchange rate form state
  const [rateForm, setRateForm] = useState<Record<string, string>>({});

  const { data: business, isLoading: isBusinessLoading } =
    useBusinessById(businessId);
  const {
    data: profiles,
    isLoading: isProfilesLoading,
    refetch: refetchProfiles,
    isFetching: isFetchingProfiles,
  } = useCompensationProfiles({
    businessId,
    isActive: true,
  });
  const {
    data: exchangeRates,
    isLoading: isRatesLoading,
    refetch: refetchRates,
  } = useExchangeRates();
  const upsertRateMutation = useUpsertExchangeRate();

  // Determine which non-PHP currencies are used in profiles
  const usedCurrencies = useMemo(() => {
    const set = new Set<string>();
    for (const p of profiles ?? []) {
      const cur = (p.currency || "PHP").toUpperCase();
      if (cur !== "PHP") set.add(cur);
    }
    return Array.from(set).sort();
  }, [profiles]);

  // Build a map from exchange rates: "USD" -> rate value
  const rateMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of exchangeRates ?? []) {
      if (r.toCurrency === "PHP") {
        map.set(r.fromCurrency, r.rate);
      }
    }
    return map;
  }, [exchangeRates]);

  const filteredProfiles = useMemo(() => {
    const rows = profiles ?? [];
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return rows;
    }

    return rows.filter((profile) => {
      const haystack = [
        profile.name.toLowerCase(),
        profile.effectiveFrom.toLowerCase(),
        String(profile.hourlyRate),
        (profile.currency || "PHP").toLowerCase(),
      ].join(" ");
      return haystack.includes(normalizedSearch);
    });
  }, [profiles, search]);

  const isLoading = isBusinessLoading || isProfilesLoading;

  const openCreateDialog = () => {
    setSelectedProfile(null);
    setDialogOpen(true);
  };

  const openEditDialog = (profile: CompensationProfile) => {
    setSelectedProfile(profile);
    setDialogOpen(true);
  };

  const handleSaveRate = (currency: string) => {
    const value = rateForm[currency];
    if (!value || isNaN(Number(value)) || Number(value) <= 0) return;
    upsertRateMutation.mutate(
      {
        fromCurrency: currency,
        toCurrency: "PHP",
        rate: Number(value),
      },
      {
        onSuccess: () => {
          setRateForm((prev) => {
            const next = { ...prev };
            delete next[currency];
            return next;
          });
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Compensation Profiles
          </h1>
          <p className="text-sm text-muted-foreground">
            Create and edit compensation settings for{" "}
            {business?.name ?? "this business"}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RefreshButton
            onRefresh={() => {
              refetchProfiles();
              refetchRates();
            }}
            isRefreshing={isFetchingProfiles}
          />
          <Button className="gap-2" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Profile
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profiles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="profiles">All Profiles</TabsTrigger>
          <TabsTrigger value="exchange-rates">Exchange Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="exchange-rates" className="mt-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-3 px-6 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base text-primary">Global Conversion Rates</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Configure exchange rates for non-PHP currencies used in your profiles.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {usedCurrencies.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center rounded-md border border-dashed">
                  <ArrowRightLeft className="h-6 w-6 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">No Exchange Rates Needed</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    All your compensation profiles are currently using PHP. Exchange rates will appear here when you create profiles with other currencies (like USD or GBP).
                  </p>
                </div>
              ) : isRatesLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  {usedCurrencies.map((currency) => {
                    const currentRate = rateMap.get(currency);
                    const inputValue =
                      rateForm[currency] ??
                      (currentRate != null ? String(currentRate) : "");
                    const hasChanged = rateForm[currency] !== undefined;

                    return (
                      <div
                        key={currency}
                        className="flex items-center gap-2 rounded-md border bg-muted/30 px-4 py-3 shadow-sm"
                      >
                        <Label className="text-sm font-medium whitespace-nowrap">
                          1 {currency} =
                        </Label>
                        <div className="relative w-28">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            ₱
                          </span>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="h-9 pl-6 pr-2 text-sm bg-background"
                            value={inputValue}
                            onChange={(e) =>
                              setRateForm((prev) => ({
                                ...prev,
                                [currency]: e.target.value,
                              }))
                            }
                            disabled={upsertRateMutation.isPending}
                          />
                        </div>
                        <Button
                          size="icon"
                          variant={hasChanged ? "default" : "secondary"}
                          className="h-9 w-9 shrink-0 ml-1"
                          disabled={!hasChanged || upsertRateMutation.isPending}
                          onClick={() => handleSaveRate(currency)}
                        >
                          {upsertRateMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          <span className="sr-only">Save</span>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="mt-4 space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search profiles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 pl-9 bg-background"
                />
              </div>
              {search && (
                <Button
                  variant="ghost"
                  onClick={() => setSearch("")}
                  className="h-9 px-2 lg:px-3"
                >
                  Reset
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-11 bg-muted/50 text-xs font-medium text-muted-foreground">
                    Profile Details
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-xs font-medium text-muted-foreground">
                    Base Rate
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-xs font-medium text-muted-foreground">
                    PHP Equivalent
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-xs font-medium text-muted-foreground">
                    Effective Period
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-right text-xs font-medium text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-[400px] text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Loading profiles...
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredProfiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-[400px] text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <Wallet className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">No profiles found</p>
                          <p className="text-xs text-muted-foreground">
                            {search
                              ? "Try adjusting your search or filters"
                              : "Get started by creating a compensation profile"}
                          </p>
                        </div>
                        {search && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSearch("")}
                            className="mt-2"
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProfiles.map((profile) => {
                    const currency = profile.currency || "PHP";
                    const isPhp = currency === "PHP";

                    const phpValue =
                      !isPhp && rateMap.has(currency)
                        ? profile.hourlyRate * rateMap.get(currency)!
                        : profile.hourlyRate;

                    return (
                      <TableRow key={profile._id} className="group">
                        <TableCell className="py-3 font-medium">
                          <div className="flex items-center gap-2">
                            {profile.name}
                            {!isPhp && (
                              <Badge
                                variant="outline"
                                className="ml-1 h-5 border-primary/20 bg-primary/5 px-1.5 text-[10px] text-primary"
                              >
                                {currency}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold">
                              {isPhp ? "₱" : `${currency} `}
                              {profile.hourlyRate.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              / hr
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          {isPhp ? (
                            <span className="text-sm text-muted-foreground">
                              —
                            </span>
                          ) : (
                            <span className="text-sm font-medium text-success">
                              ₱
                              {phpValue.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-3 text-sm text-muted-foreground">
                          {profile.effectiveFrom}
                          {profile.effectiveTo && (
                            <span className="ml-1.5 before:mr-1.5 before:text-muted-foreground/50 before:content-['→']">
                              {profile.effectiveTo}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-3 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                            onClick={() => openEditDialog(profile)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <CompensationProfileDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        businessId={businessId}
        profile={selectedProfile}
      />
    </div>
  );
}
