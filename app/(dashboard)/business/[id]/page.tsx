"use client";

import { useParams } from "next/navigation";
import {
    Building2,
    ExternalLink,
    Globe,
    Calendar,
    Loader2,
    Users,
    Briefcase,
    FileText,
    TrendingUp,
    Activity,
    Mail,
    Phone
} from "lucide-react";
import Image from "next/image";
import { useBusinessById } from "@/hooks/useBusiness";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BusinessOverviewPage() {
    const params = useParams();
    const businessId = params.id as string;
    const { data: business, isLoading, isError } = useBusinessById(businessId);

    if (isLoading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError || !business) {
        return (
            <div className="flex min-h-[500px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/10 p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                    <Building2 className="h-10 w-10 text-destructive" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Business Not Found</h3>
                <p className="mt-2 text-base text-muted-foreground max-w-sm">
                    The business you're looking for doesn't exist or you don't have access to it.
                </p>
            </div>
        );
    }

    // Mock data for business-specific metrics
    const mockStaffCount = 12;
    const mockActiveJobs = 3;
    const mockMonthlyExpenses = "₱145,000";
    const mockRecentEod = 8;

    // Mock contact info if none exists
    const mockEmail = "contact@business.com";
    const mockPhone = "+63 912 345 6789";

    return (
        <div className="space-y-8 animate-in fade-in-50">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 p-6 rounded-xl border bg-card shadow-sm">
                <div className="flex items-start gap-5">
                    {business.logo ? (
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border shadow-sm">
                            <Image
                                src={business.logo}
                                alt={`${business.name} logo`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-primary/10 border shadow-sm">
                            <Building2 className="h-10 w-10 text-primary" />
                        </div>
                    )}
                    <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <h1 className="text-2xl font-bold tracking-tight">{business.name}</h1>
                            <Badge variant={business.isActive ? "default" : "secondary"} className="h-6">
                                {business.isActive ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        {business.description ? (
                            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                                {business.description}
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">No description provided.</p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
                            {business.website && (
                                <a
                                    href={business.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                                >
                                    <Globe className="h-3.5 w-3.5" />
                                    {business.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Quick Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Staff
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStaffCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Active members
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Open Positions
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockActiveJobs}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Currently recruiting
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Recent EODs
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockRecentEod}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Submitted this week
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Est. Expenses
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">{mockMonthlyExpenses}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Projected for this month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Two Column Layout for deeper details */}
            <div className="grid gap-6 md:grid-cols-7">
                {/* Main Content Area (span 4) */}
                <div className="md:col-span-4 space-y-6">
                    <Card className="shadow-sm h-[400px]">
                        <CardHeader>
                            <CardTitle>Performance Overview</CardTitle>
                            <CardDescription>
                                Placeholder for charts showing attendance, productivity, or recruitment pipelines.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center h-[280px]">
                            <div className="w-full h-full border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/20 text-muted-foreground flex-col gap-3 object-cover">
                                <TrendingUp className="h-8 w-8 opacity-20" />
                                <span className="text-sm font-medium">Chart Visualization Area</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Area (span 3) */}
                <div className="md:col-span-3 space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                {/* Activity List Mockup */}
                                {[
                                    { title: "EOD Report Submitted", desc: "Jane Smith submitted their daily report.", time: "1 hr ago" },
                                    { title: "New Job Application", desc: "Mark Johnson applied for 'Frontend Developer'.", time: "3 hrs ago" },
                                    { title: "Invoice Paid", desc: "Invoice #INV-OCT-01 marked as paid.", time: "1 day ago" },
                                    { title: "Meeting Scheduled", desc: "Team sync arranged via calendar.", time: "2 days ago" },
                                ].map((activity, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0 relative after:absolute after:top-3 after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2 after:w-[1px] after:bg-border last:after:hidden" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">{activity.title}</p>
                                            <p className="text-xs text-muted-foreground">{activity.desc}</p>
                                            <p className="text-[10px] text-muted-foreground font-mono mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-6" size="sm">
                                View All Activity
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
