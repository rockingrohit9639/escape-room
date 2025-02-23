import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { ImagesIcon, LayoutDashboardIcon, PuzzleIcon } from 'lucide-react'
import RoomSearchForm from '~/components/builder/room-search-form'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '~/components/ui/sidebar'
import { apiClient } from '~/lib/client'
import { CURRENT_USER_QUERY_KEY } from '~/lib/constants'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  loader: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      queryKey: CURRENT_USER_QUERY_KEY,
      queryFn: () => apiClient.user.me.query(),
    })

    if (user.status !== 200) {
      throw redirect({ to: '/login' })
    }
  },
})

function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Header />
        </SidebarHeader>
        <SidebarContent>
          <NavigationMenu />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center border-b gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between px-4">
          <SidebarTrigger />
          <RoomSearchForm />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

function Header() {
  const { state } = useSidebar()

  if (state === 'collapsed') {
    return <div className="size-8 bg-accent-foreground rounded-md" />
  }

  return (
    <Link to="/builder" className="text-2xl font-heading text-center mt-2">
      Escape Room
    </Link>
  )
}

const MENU_ITEMS = [
  {
    to: '/dashboard',
    Icon: LayoutDashboardIcon,
    label: 'Dashboard',
  },
  {
    to: '/dashboard/escape-room',
    Icon: PuzzleIcon,
    label: 'Your Rooms',
  },
  {
    to: '/dashboard/gallery',
    Icon: ImagesIcon,
    label: 'Gallery',
  },
]

function NavigationMenu() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Builder</SidebarGroupLabel>
      <SidebarMenu>
        {MENU_ITEMS.map((item) => (
          <SidebarMenuItem key={item.to}>
            <SidebarMenuButton asChild tooltip={item.label}>
              <Link to={item.to}>
                <item.Icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
