import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TOP_LINKS } from "./data";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

interface DocsSidebarProps {
    activeCategory: string;
    setActiveCategory: (id: string) => void;
    activeTopLink: string;
    setActiveTopLink: (id: string) => void;
    sections: any[];
    className?: string;
}

export function DocsSidebar({ 
    activeCategory, 
    setActiveCategory, 
    activeTopLink,
    setActiveTopLink,
    sections: propSections, 
    className 
}: DocsSidebarProps) {
    const currentTopLinkInfo = TOP_LINKS.find((link) => link.id === activeTopLink)!;
    const CurrentIcon = currentTopLinkInfo.icon;

    return (
        <div className={cn("w-full h-full flex-shrink-0 flex flex-col bg-background", className)}>
            {/* Module Switcher Header */}
            <div className="p-4 border-b border-border/40">
                <DropdownMenu>
                    <DropdownMenuTrigger className="w-full outline-none pt-7 sm:pt-0">
                        <div className="flex w-full items-center justify-between bg-transparent border border-transparent hover:bg-muted/50 shadow-none px-3 py-2 rounded-lg cursor-pointer group transition-colors">
                            <div className="flex items-center gap-3">

                                <div className="flex flex-col items-start gap-0">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Module</span>
                                    <span className="text-[13px] font-bold text-foreground truncate max-w-[140px] group-hover:text-primary transition-colors">
                                        {currentTopLinkInfo.title}
                                    </span>
                                </div>
                            </div>
                            <ChevronsUpDown className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[240px] p-2 space-y-1">
                        {TOP_LINKS.map((link) => {
                            const Icon = link.icon;
                            const isActive = link.id === activeTopLink;
                            return (
                                <DropdownMenuItem 
                                    key={link.id} 
                                    className={cn("cursor-pointer p-2 rounded-md", isActive && "bg-muted")}
                                    onClick={() => setActiveTopLink(link.id)}
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-md border text-foreground/70 bg-background">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col gap-0 select-none">
                                            <span className="text-[13px] font-semibold">{link.title}</span>
                                            <span className="text-[10px] text-muted-foreground/80">{link.desc}</span>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <ScrollArea className="flex-1">
                <div className="flex flex-col p-3 gap-1">
                    {propSections.map((section, idx) => (
                        <Collapsible key={idx} defaultOpen className="group/collapsible">
                            <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-muted/50 rounded-md transition-colors group outline-none">
                                <div className="text-[11px] font-bold text-muted-foreground tracking-[0.08em] uppercase font-mono group-hover:text-foreground transition-colors select-none">
                                    {section.title}
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-0.5 mt-1 animate-in fade-in slide-in-from-top-1">
                                {section.items.map((category: any) => {
                                    const Icon = category.icon;
                                    const isActive = activeCategory === category.id;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer w-full text-left rounded-md outline-none",
                                                isActive
                                                    ? "text-primary bg-primary/10 font-semibold"
                                                    : "text-muted-foreground bg-transparent hover:text-foreground hover:bg-muted/50 focus-visible:bg-muted/50",
                                            )}
                                        >
                                            <Icon className={cn(
                                                "h-4 w-4 flex-shrink-0",
                                                isActive ? "text-primary" : "text-muted-foreground/70"
                                            )} />
                                            <span className="leading-snug truncate select-none">{category.label}</span>
                                        </button>
                                    );
                                })}
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
