"use client"

import * as React from "react"
import { Check, Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ThemeOption = { value: string; label: string }
type ThemeGroup = { group: string; options: ThemeOption[] }

// Flat list, grouped by palette. `value` matches the classes registered in
// app/layout.tsx <ThemeProvider themes={...}> and the token blocks in
// app/globals.css.
const THEME_GROUPS: ThemeGroup[] = [
  {
    group: "AVS",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
    ],
  },
  {
    group: "Rosé",
    options: [
      { value: "soft-light", label: "Light" },
      { value: "soft-dark", label: "Dark" },
    ],
  },
  {
    group: "Steel",
    options: [
      { value: "bold-light", label: "Light" },
      { value: "bold-dark", label: "Dark" },
    ],
  },
]

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Choose theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
          {theme === "system" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        {THEME_GROUPS.map((group) => (
          <React.Fragment key={group.group}>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              {group.group}
            </DropdownMenuLabel>
            {group.options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setTheme(option.value)}
              >
                {option.label}
                {theme === option.value && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
