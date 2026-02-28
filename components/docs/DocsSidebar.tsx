import React from "react";
import { sections } from "./data";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocsSidebarProps {
    activeCategory: string;
    setActiveCategory: (id: string) => void;
    className?: string;
}

export function DocsSidebar({ activeCategory, setActiveCategory, className }: DocsSidebarProps) {
    return (
        <div className={cn("w-full md:w-64 flex-shrink-0 flex flex-col gap-2", className)}>
            <div className="px-4 py-2 mt-2 md:mt-0">
                <h2 className="text-lg font-semibold tracking-tight">Onboarding Guide</h2>
                <p className="text-sm text-muted-foreground">VA Expectation & Responsibility</p>
            </div>
            <ScrollArea className="flex-1 px-3">
                <div className="flex flex-col gap-6 pb-4 pt-2">
                    {sections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                            <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {section.title}
                            </h3>
                            <div className="flex flex-col gap-1">
                                {section.items.map((category) => {
                                    const Icon = category.icon;
                                    const isActive = activeCategory === category.id;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={cn(
                                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            )}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {category.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
