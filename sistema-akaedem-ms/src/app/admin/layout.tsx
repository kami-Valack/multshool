import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <SidebarInset className="p-4">
          <SidebarTrigger />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}