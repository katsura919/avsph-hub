"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, FileText, ChevronRight } from "lucide-react";
import { docsData, TOP_LINKS } from "./data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SearchResult {
  moduleId: string;
  moduleName: string;
  sectionTitle: string;
  categoryId: string;
  categoryLabel: string;
  contentTitle: string;
}

interface DocsSearchProps {
  onSelectResult: (moduleId: string, categoryId: string, contentId?: string) => void;
}

export function DocsSearch({ onSelectResult }: DocsSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  // Keyboard shortcut (cmd+k or ctrl+k)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search through all modules
    Object.keys(docsData).forEach((moduleId) => {
      const moduleInfo = TOP_LINKS.find(link => link.id === moduleId);
      const moduleName = moduleInfo?.title || moduleId;
      const moduleData = docsData[moduleId as keyof typeof docsData];

      if (!moduleData) return;

      moduleData.forEach((section: any) => {
        section.items.forEach((category: any) => {
          category.sections.forEach((content: any) => {
            if (
              content.title.toLowerCase().includes(searchTerm) ||
              category.label.toLowerCase().includes(searchTerm) ||
              section.title.toLowerCase().includes(searchTerm)
            ) {
              newResults.push({
                moduleId,
                moduleName,
                sectionTitle: section.title,
                categoryId: category.id,
                categoryLabel: category.label,
                contentTitle: content.title,
              });
            }
          });
        });
      });
    });

    setResults(newResults);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    onSelectResult(result.moduleId, result.categoryId);
  };

  return (
    <>
      {/* Search trigger - Desktop/Tablet */}
      <div 
        className="relative w-full max-w-sm hidden md:block cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <div className="w-full pl-9 h-8 bg-muted/30 border border-border/50 text-muted-foreground group-hover:bg-muted/60 group-hover:text-foreground rounded-full text-xs flex items-center transition-all">
          Search documentation...
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:flex items-center gap-1">
          <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border/50 bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Search trigger - Mobile */}
      <button
        className="md:hidden flex h-8 w-8 items-center justify-center rounded-md text-foreground/80 hover:text-foreground hover:bg-muted transition-colors ml-auto"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
      >
        <Search className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-2xl gap-0 bg-background border-border/40 shadow-2xl [&>button]:hidden">
          <DialogTitle className="sr-only">Search Documentation</DialogTitle>
          <div className="flex items-center border-b border-border/40 ">
            <Input
              placeholder="Search in documentation..."
              className="h-14 w-full border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          
          <ScrollArea className="max-h-[60vh] overflow-y-auto">
            {query.trim() === "" ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Type to start searching...
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No results found for "{query}".
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {results.map((result, idx) => (
                  <button
                    key={`${result.moduleId}-${result.categoryId}-${idx}`}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group outline-none"
                    onClick={() => handleSelect(result)}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-sm font-medium text-foreground truncate">
                          {result.contentTitle}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                          <span className="truncate">{result.moduleName}</span>
                          <ChevronRight className="h-3 w-3 shrink-0" />
                          <span className="truncate">{result.sectionTitle}</span>
                          <ChevronRight className="h-3 w-3 shrink-0" />
                          <span className="font-medium text-foreground/70 truncate">{result.categoryLabel}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
