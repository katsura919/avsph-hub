"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Wallet,
  Settings,
  Receipt,
  ClipboardList,
  Newspaper,
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

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface BusinessNavMainProps {
  businessId: string;
}

export function BusinessNavMain({ businessId }: BusinessNavMainProps) {
  const pathname = usePathname();

  const navGroups: NavGroup[] = [
    {
      label: "Platform",
      items: [
        {
          title: "Overview",
          href: `/business/${businessId}`,
          icon: LayoutDashboard,
        },
        {
          title: "End of Day Reports",
          href: `/business/${businessId}/eod`,
          icon: ClipboardList,
        },
      ],
    },
    {
      label: "Human Resources",
      items: [
        {
          title: "Staff Members",
          href: `/business/${businessId}/staff`,
          icon: Users,
        },
        {
          title: "Recruitment",
          href: `/business/${businessId}/job-posts`,
          icon: Briefcase,
        },
        {
          title: "Compensation",
          href: `/business/${businessId}/compensation-profiles`,
          icon: Wallet,
        },
      ],
    },
    {
      label: "Administration",
      items: [
        {
          title: "Billing & Invoices",
          href: `/business/${businessId}/invoice`,
          icon: Receipt,
        },
        {
          title: "Content & Blog",
          href: `/business/${businessId}/blog`,
          icon: Newspaper,
        },
        {
          title: "Business Settings",
          href: `/business/${businessId}/settings`,
          icon: Settings,
        },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === `/business/${businessId}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {navGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
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
      ))}
    </>
  );
}
