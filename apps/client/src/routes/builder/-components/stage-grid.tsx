import { cn } from '~/lib/utils'

type StageGridProps = {
  className?: string
  style?: React.CSSProperties
}

export default function StageGrid({ className, style }: StageGridProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)} style={style}>
      Stage grid
    </div>
  )
}
