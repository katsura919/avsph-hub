"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Clock, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/theme-toggle";
import { useStaffLogout } from "@/hooks/useAuthStaff";
import { useStaffStore } from "@/store/staff.store";
import { cn } from "@/lib/utils";

// Staff navigation items
const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "EOD Reports", href: "/eod" },
  { name: "Invoice", href: "/invoice" },
  { name: "Settings", href: "/staff-settings" },
];

export function StaffTopbar() {
    const logout = useStaffLogout();
    const pathname = usePathname();
    const { staff, getFullName, getInitials } = useStaffStore();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
                {/* Left: Logo, Title & Nav */}
                <div className="flex min-w-0 items-center gap-6">
                    <Link
                        href="/staff/dashboard"
                        className="flex shrink-0 items-center gap-2 font-semibold"
                    >
                        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background overflow-hidden">
                            <Image
                                src="/assets/logo.jpeg"
                                alt="Company logo"
                                width={28}
                                height={28}
                                className="h-full w-full object-contain"
                                priority
                            />
                        </div>
                        <span className="text-lg font-medium text-foreground">VA Portal</span>
                    </Link>

                    <nav className="flex shrink-0 items-center gap-1 overflow-x-auto rounded-lg bg-muted/50 p-1">
                        {navigation.map((item) => {
                            const isActive =
                                pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Actions */}
                <div className="flex shrink-0 items-center gap-2">
                    <ModeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                                <Avatar className="h-7 w-7">
                                    <AvatarFallback className="text-xs">
                                        {getInitials()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium">{getFullName()}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {staff?.position}
                                        {staff?.department && ` • ${staff.department}`}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                My Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={logout}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
