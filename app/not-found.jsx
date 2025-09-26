"use client";
import { AppSidebar } from "@/components/appLayouts/app-sidebar";
import ModeToggle from "@/components/appLayouts/ModeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
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
    <div className="p-3">
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
          <div className="container mx-auto flex flex-1 flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-7xl font-extrabold mb-4 text-blue-700 drop-shadow-lg">
              404
            </h1>
            <p className="text-2xl md:text-3xl font-medium mb-6">
              Oops! The page you're looking for doesn't exist.
            </p>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/basics/portals")}
            >
              Go to Home
            </Button>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default NotFoundPage;
