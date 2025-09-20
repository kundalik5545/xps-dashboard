"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ModeToggle from "@/components/AppLayout/ModeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

const MainLayout = ({ children }) => {
  const pathname = usePathname();
  // Get the current path from usePathname
  let pathSegments = [];

  if (pathname) {
    pathSegments = pathname.split("/").filter(Boolean);
  }

  // Build breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, idx) => {
    const href = "/" + pathSegments.slice(0, idx + 1).join("/");
    const isLast = idx === pathSegments.length - 1;
    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{decodeURIComponent(segment)}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={href}>
              {decodeURIComponent(segment)}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  {pathSegments.length > 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                  {breadcrumbItems}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <span className="pr-3">
              <ModeToggle />
            </span>
          </header>
          <div className="container mx-auto  flex flex-1 flex-col gap-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
