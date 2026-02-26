"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  Settings,
  type LucideIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface BusinessNavMainProps {
  businessId: string;
}

export function BusinessNavMain({ businessId }: BusinessNavMainProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "Overview",
      href: `/business/${businessId}`,
      icon: LayoutDashboard,
    },
    {
      title: "Blog",
      href: `/business/${businessId}/blog`,
      icon: FileText,
    },
    {
      title: "Staff",
      href: `/business/${businessId}/staff`,
      icon: Users,
    },
    {
      title: "Job Posts",
      href: `/business/${businessId}/job-posts`,
      icon: Briefcase,
    },
    {
      title: "EOD Reports",
      href: `/business/${businessId}/eod`,
      icon: FileText,
    },
    {
      title: "Invoices",
      href: `/business/${businessId}/invoice`,
      icon: FileText,
    },
    {
      title: "Settings",
      href: `/business/${businessId}/settings`,
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    if (href === `/business/${businessId}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive(item.href)}
              tooltip={item.title}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
