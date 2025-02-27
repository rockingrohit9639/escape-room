import { Button } from "~/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { TOOLBAR_TOOLS } from "~/lib/toolbar"
import { cn } from "~/lib/utils"
import { useStageStore } from "~/stores"

type ToolbarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Toolbar({ className, style }: ToolbarProps) {
  const addObject = useStageStore((store) => store.addObject)

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md border p-1",
        className,
      )}
      style={style}
    >
      <TooltipProvider delayDuration={0}>
        {TOOLBAR_TOOLS.map((tool) => (
          <Tooltip key={String(tool.type)}>
            <TooltipTrigger asChild>
              <Button
                icon={<tool.icon />}
                variant="ghost"
                onClick={() => {
                  addObject(tool.type)
                }}
              />
            </TooltipTrigger>

            <TooltipContent side="top" sideOffset={10}>
              {tool.tooltip}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
