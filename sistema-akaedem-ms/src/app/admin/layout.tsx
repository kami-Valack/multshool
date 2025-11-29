"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Verificar se está na página de completar perfil
  const isCompletingProfile = pathname?.includes('/completar-perfil') || false;
  
  return (
    <ProtectedRoute requireCompleteProfile={!isCompletingProfile}>
      <SidebarProvider>
        <SidebarInset className="p-4">
          {!isCompletingProfile && <SidebarTrigger />}
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}