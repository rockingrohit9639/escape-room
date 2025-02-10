import { cn } from '~/lib/utils'

type StageObjectsSidebarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function StageObjectsSidebar({ className, style }: StageObjectsSidebarProps) {
  return (
    <div
      className={cn(
        'w-80 border h-[calc(100vh_-_60px)] fixed left-8 top-1/2 -translate-y-1/2 rounded-xl bg-background',
        className,
      )}
      style={style}
    >
      <h1 className="p-4">ER</h1>

      <div className="px-4">
        <p className="font-medium mb-2">Stage name</p>

        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="text-sm rounded-md px-2 py-1 hover:bg-accent cursor-pointer mb-1">
            Object {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
