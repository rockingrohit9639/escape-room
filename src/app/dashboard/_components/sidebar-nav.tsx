import { ImagesIcon, LayoutDashboardIcon, PuzzleIcon } from "lucide-react"
import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"

const MENU_ITEMS = [
  {
    to: "/dashboard",
    Icon: LayoutDashboardIcon,
    label: "Dashboard",
  },
  {
    to: "/dashboard/escape-room",
    Icon: PuzzleIcon,
    label: "Your Rooms",
  },
  {
    to: "/dashboard/gallery",
    Icon: ImagesIcon,
    label: "Gallery",
  },
]

export default function SidebarNav() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Builder</SidebarGroupLabel>
      <SidebarMenu>
        {MENU_ITEMS.map((item) => (
          <SidebarMenuItem key={item.to}>
            <SidebarMenuButton asChild tooltip={item.label}>
              <Link href={item.to}>
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
