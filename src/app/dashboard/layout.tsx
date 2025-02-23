import {
  Sidebar,
  SidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import SidebarHeader from "./_components/sidebar-header"
import SidebarNav from "./_components/sidebar-nav"
import SidebarRoomSearch from "./_components/sidebar-room-search"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <ShadcnSidebarHeader>
          <SidebarHeader />
        </ShadcnSidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger />
          <SidebarRoomSearch />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
