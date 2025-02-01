import { cn } from '~/lib/utils'

type StageSidebarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function StageSidebar({ className, style }: StageSidebarProps) {
  return (
    <div className={cn(className)} style={style}>
      Stage Sidebar
    </div>
  )
}
