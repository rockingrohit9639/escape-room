import { cn } from "~/lib/utils"

type ObjectsSidebarProps = {
  className?: string
  style?: React.CSSProperties
  stage: string
  escapeRoom: string
}

export default function ObjectsSidebar({
  className,
  style,
  stage,
  escapeRoom,
}: ObjectsSidebarProps) {
  return (
    <div
      className={cn(
        "fixed left-8 top-1/2 z-[100] h-[calc(100vh_-_60px)] w-80 -translate-y-1/2 rounded-xl border bg-background",
        className,
      )}
      style={style}
    >
      <h1 className="p-4">{escapeRoom}</h1>

      <div className="px-4">
        <p className="mb-2 font-medium">{stage}</p>

        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="mb-1 cursor-pointer rounded-md p-2 text-sm hover:bg-accent">
            Object {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
