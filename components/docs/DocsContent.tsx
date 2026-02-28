import React from "react";
import { sections } from "./data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface DocsContentProps {
    activeCategory: string;
}

export function DocsContent({ activeCategory }: DocsContentProps) {
    const category = sections.flatMap(s => s.items).find((c) => c.id === activeCategory);

    if (!category) return null;

    return (
        <ScrollArea className="flex-1 h-full w-full">
            <div className="px-4 py-6 md:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">{category.label}</h1>
                    <p className="text-muted-foreground">
                        Explore {category.label.toLowerCase()} guidelines and expectations.
                    </p>
                </div>
                <Separator />
                <div className="space-y-12">
                    {category.sections.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight capitalize border-b pb-2">
                                {section.title}
                            </h2>
                            <div className="text-base leading-relaxed">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ScrollArea>
    );
}
