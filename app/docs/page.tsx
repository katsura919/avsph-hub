"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { docsData, TOP_LINKS } from "@/components/docs/data";
import { ModeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useCurrentStaff } from "@/hooks/useAuthStaff";
import { useCurrentAdmin } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function DocsPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading documentation...</div>}>
      <DocsInner />
    </Suspense>
  );
}

function DocsInner() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTopLink, setActiveTopLink] = useState("onboarding");

  useEffect(() => {
    if (tabParam && docsData[tabParam]) {
      setActiveTopLink(tabParam);
    }
  }, [tabParam]);

  const currentData = docsData[activeTopLink] || docsData.onboarding;

  const [activeCategory, setActiveCategory] = useState(
    currentData[0].items[0].id,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Re-sync active category when top link changes if necessary
  useEffect(() => {
    const newData = docsData[activeTopLink] || docsData.onboarding;
    if (!newData[0].items.some(item => item.id === activeCategory)) {
        setActiveCategory(newData[0].items[0].id);
    }
  }, [activeTopLink]);

  const { data: staffData, isLoading: isLoadingStaff } = useCurrentStaff();
  const { data: adminData, isLoading: isLoadingAdmin } = useCurrentAdmin();

  const currentTopLinkInfo = TOP_LINKS.find(
    (link) => link.id === activeTopLink,
  )!;

  const handleTopLinkSelect = (id: string) => {
    setActiveTopLink(id);
    const newData = docsData[id] || docsData.onboarding;
    setActiveCategory(newData[0].items[0].id);
  };

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    setIsMobileMenuOpen(false);
  };

  const handleSearchResultSelect = (moduleId: string, categoryId: string) => {
    setActiveTopLink(moduleId);
    setActiveCategory(categoryId);
  };

  const isLoading = isLoadingStaff || isLoadingAdmin;
  const isLoggedIn = !!(staffData || adminData);
  const dashboardUrl = adminData ? "/overview" : "/dashboard";

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* ── TOP NAV BAR ── */}
      <header className="flex-none h-14 flex items-center z-30 bg-background border-b border-border shadow-sm">

        {/* Brand / Logo Section */}
        <div className="flex-shrink-0 w-auto md:w-[260px] px-3 md:px-5 flex items-center gap-2.5 md:border-r border-border h-full">
          {/* Mobile menu trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground/80 hover:text-foreground hover:bg-muted h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 pt-0 bg-sidebar border-r border-sidebar-border">
              <SheetTitle className="sr-only">Directory</SheetTitle>
              <DocsSidebar
                activeCategory={activeCategory}
                setActiveCategory={handleCategorySelect}
                activeTopLink={activeTopLink}
                setActiveTopLink={handleTopLinkSelect}
                sections={currentData}
                className="border-none w-full"
              />
            </SheetContent>
          </Sheet>

          {/* Logo mark */}
          <div className="hidden md:flex w-10 h-10   rounded-[9px] items-center justify-center flex-shrink-0">
            <img
              src="/assets/logo.jpeg"
              alt="TM"
              className="w-full h-full object-contain rounded-[9px]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-primary-foreground text-[11px] font-black font-serif">TM</span>';
              }}
            />
          </div>

          {/* Brand text */}
          <div className="hidden md:block">
            <div className="text-[13px] font-bold text-foreground tracking-[0.03em] leading-tight flex items-center gap-1.5">
              Advanced Virtual Staff
            </div>
          </div>
        </div>

        {/* Search Bar / Center Nav */}
        <div className="flex-1 flex items-center px-4 max-w-2xl">
           <DocsSearch onSelectResult={handleSearchResultSelect} />
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2.5 px-4 h-full border-l border-border">
          <ModeToggle />
          {!isLoading && (
            isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-foreground/70 hover:text-foreground hover:bg-muted border border-border bg-background rounded-full px-3 py-1 text-[11px] font-mono h-auto"
              >
                <Link href={dashboardUrl}>Dashboard</Link>
              </Button>
            ) : (
              <Button
                size="sm"
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 text-[11px] h-7"
              >
                <Link href="/login">Login</Link>
              </Button>
            )
          )}
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-[260px] flex-shrink-0 flex-col border-r border-sidebar-border bg-sidebar overflow-hidden">
          <DocsSidebar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeTopLink={activeTopLink}
            setActiveTopLink={handleTopLinkSelect}
            sections={currentData}
            className="h-full"
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative bg-background">
          <DocsContent 
             activeCategory={activeCategory} 
             setActiveCategory={setActiveCategory} 
             sections={currentData} 
             activeTopLinkInfo={currentTopLinkInfo}
          />
        </main>
      </div>
    </div>
  );
}
