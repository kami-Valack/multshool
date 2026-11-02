"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import NavbarH from "@/components/ui/heroui/navbar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCompletingProfile = pathname?.includes("/completar-perfil") || false;

  return (
    <ProtectedRoute
      requireCompleteProfile={!isCompletingProfile}
      allowedRoles={["school"]}
    >
      {isCompletingProfile ? (
        children
      ) : (
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="sidebar" />
          <SidebarInset>
            <div className="flex flex-1 flex-col min-h-svh">
              <div className="flex items-center gap-2 border-b px-2">
                <SidebarTrigger />
                <div className="flex-1">
                  <NavbarH />
                </div>
              </div>
              <div className="@container/main flex flex-1 flex-col">{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      )}
    </ProtectedRoute>
  );
}
