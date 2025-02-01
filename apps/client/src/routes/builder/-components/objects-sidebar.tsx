import { cn } from '~/lib/utils'

type ObjectsSidebarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function ObjectsSidebar({ className, style }: ObjectsSidebarProps) {
  return (
    <div className={cn(className)} style={style}>
      Objects sidebar
    </div>
  )
}
