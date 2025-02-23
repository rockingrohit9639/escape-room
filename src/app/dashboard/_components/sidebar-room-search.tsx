import { Input } from "~/components/ui/input"
import { cn } from "~/lib/utils"

type SidebarRoomSearchProps = {
  className?: string
  style?: React.CSSProperties
}

export default function SidebarRoomSearch({ className, style }: SidebarRoomSearchProps) {
  return (
    <Input
      placeholder="Search for your room..."
      className={cn("w-[400px]", className)}
      style={style}
    />
  )
}
