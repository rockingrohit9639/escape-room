import { cn } from "~/lib/utils"

type CanvasProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Canvas({ className, style }: CanvasProps) {
  return (
    <div
      className={cn(
        "fixed left-1/2 top-1/2 aspect-video w-[700px] -translate-x-1/2 -translate-y-1/2 border",
        className,
      )}
      style={style}
    >
      Canvas
    </div>
  )
}
