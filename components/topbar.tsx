"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LogOut, Settings, User, Slash, Search, Bell } from "lucide-react";
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
import { useLogout } from "@/hooks/useAuth";
import { useAdminStore } from "@/store/admin.store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// Base navigation items for all admins
const baseNavigation = [
  { name: "Overview", href: "/overview" },
  { name: "Staff", href: "/staff" },
];

// Super-admin only navigation items
const superAdminNavigation = [
  { name: "Settings", href: "/settings" },
];

export function Topbar() {
  const logout = useLogout();
  const pathname = usePathname();
  const { admin, isSuperAdmin, getFullName, getInitials } = useAdminStore();

  // Build navigation based on role
  const navigation = isSuperAdmin()
    ? [...baseNavigation, ...superAdminNavigation]
    : baseNavigation;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col w-full max-w-[2000px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Row: Global Context, Search, & Actions */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Branding & Context */}
          <div className="flex items-center gap-3">
            <Link href="/overview" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                <Building2 className="h-4 w-4" />
              </div>
              <span className="font-semibold text-sm tracking-tight hidden sm:inline-block">
                Admin Console
              </span>
            </Link>

            <div className="h-4 w-[1px] bg-border hidden sm:block" />

            <div className="items-center gap-2 hidden sm:flex">
              <div className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted/50 transition-colors cursor-pointer">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-[10px] bg-indigo-500 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{getFullName()}</span>
              </div>
            </div>
          </div>

          {/* Center: Search (Optional, Vercel-like) */}
          {/* <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full h-9 pl-9 bg-muted/40 border-border/50 focus-visible:bg-background transition-colors"
              />
              <div className="absolute right-2.5 top-2.5 flex gap-1">
                <kbd className="pointer-events-none inline-flex h-4 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
          </div> */}

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ModeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground relative"
            >
              <Bell className="h-4 w-4" />
              {/* Notification indicator */}
              <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 border border-background" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 ml-1"
                >
                  <Avatar className="h-8 w-8 border border-border/50">
                    <AvatarFallback className="text-xs">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bottom Row: Navigation Tabs */}
        <div className="flex items-center -ml-2 overflow-x-auto scrollbar-none pb-0">
          <nav className="flex space-x-1">
            {navigation.map((item) => {
              const isActive =
                item.href === "/overview"
                  ? pathname === "/overview"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2.5 text-sm transition-all duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground shadow-[0_0_12px_rgba(0,0,0,0.5)] dark:shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
