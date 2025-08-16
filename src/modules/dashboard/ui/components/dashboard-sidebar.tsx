"use client";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BookOpen, BotIcon, FolderGit, LaptopMinimalCheck, MessageCircleCode, SquareCode, UserRoundPenIcon, UsersRound, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import DashboardUserButton from "./dashboard-user-button";

const firstSection = [
  {
    icon: SquareCode,
    label: "Collab-X",
    href: "/collab-x",
  },
  {
    icon: UserRoundPenIcon,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: LaptopMinimalCheck,
    label: "Contests",
    href: "/contests",
  },
  {
    icon: FolderGit,
    label: "My Projects",
    href:"/projects",
  },
  {
    icon: UsersRound,
    label: "People",
    href: "/people",
  },
  {
    icon: BookOpen,
    label: "Journals",
    href:"/journals",
  },
];

const secondSection = [
  
  
  {
    icon: MessageCircleCode,
    label: "Project Discussions",
    href:"/discussions",
  }

];
const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href={"/"} className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" height={36} width={36} alt="logo" />
          <p className="text-2xl font-bold text-white">CollabUs</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="text-[#5d6b68] opacity-10" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#5d6b68]/10"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight ">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="px-4 py-2">
              <Separator className="text-[#5d6b68] opacity-10" />
            </div>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#5d6b68]/10"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight ">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
