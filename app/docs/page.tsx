"use client";

import React, { useState } from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";
import { sections } from "@/components/docs/data";
import { ModeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function DocsPage() {
    const [activeCategory, setActiveCategory] = useState(sections[0].items[0].id);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleCategorySelect = (id: string) => {
        setActiveCategory(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-background">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-muted/20">
                <DocsSidebar
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    className="pt-6 h-screen sticky top-0"
                />
            </aside>

            {/* Main Content area */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                {/* Topbar */}
                <header className="flex-none h-14 border-b flex items-center justify-between md:justify-end px-4 lg:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20">
                    <div className="md:hidden flex items-center gap-2">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] p-0 pt-10">
                                <DocsSidebar
                                    activeCategory={activeCategory}
                                    setActiveCategory={handleCategorySelect}
                                    className="border-none w-full"
                                />
                            </SheetContent>
                        </Sheet>
                        <span className="font-bold tracking-tight">AVS Guide</span>
                    </div>
                    <ModeToggle />
                </header>

                {/* Content Scroll Area */}
                <DocsContent activeCategory={activeCategory} />
            </main>
        </div>
    );
}
