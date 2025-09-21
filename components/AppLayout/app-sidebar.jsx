"use client";

import * as React from "react";

import { NavMain } from "@/components/appLayout/nav-main";
import { NavProjects } from "@/components/appLayout/nav-projects";
import { NavUser } from "@/components/appLayout/nav-user";
import { TeamSwitcher } from "@/components/appLayout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { mainNavMenu } from "@/settings/navMenu";

export function AppSidebar({ ...props }) {
  const data = mainNavMenu;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
