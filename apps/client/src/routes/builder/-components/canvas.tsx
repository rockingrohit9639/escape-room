import { cn } from '~/lib/utils'

type CanvasProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Canvas({ className, style }: CanvasProps) {
  return (
    <div className={cn('flex items-center justify-center size-full', className)} style={style}>
      <div className="w-full max-w-screen-md aspect-video border" />
    </div>
  )
}
