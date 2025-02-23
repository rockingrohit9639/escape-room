import { CircleXIcon } from "lucide-react"
import { cn } from "~/lib/utils"

type ErrorMessageProps = {
  className?: string
  style?: React.CSSProperties
  title?: string
  description: string
}

export default function ErrorMessage({
  className,
  style,
  title = "Error",
  description,
}: ErrorMessageProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-2 text-center", className)}
      style={style}
    >
      <CircleXIcon className="size-10" />
      <h2>{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
