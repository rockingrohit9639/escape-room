import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { TOOLBAR_OBJECTS } from '~/lib/toolbar'
import { cn } from '~/lib/utils'
import { useStageStore } from '~/stores'

type ToolbarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Toolbar({ className, style }: ToolbarProps) {
  const addObject = useStageStore((store) => store.addObject)

  return (
    <div
      className={cn(
        'flex items-center gap-2 border rounded-md fixed bottom-4 left-1/2 -translate-x-1/2 p-1',
        className,
      )}
      style={style}
    >
      <TooltipProvider delayDuration={0}>
        {TOOLBAR_OBJECTS.map((toolbarObject) => (
          <Tooltip key={toolbarObject.type}>
            <TooltipTrigger asChild>
              <Button
                key={toolbarObject.type}
                icon={<toolbarObject.icon />}
                variant="ghost"
                onClick={() => {
                  addObject(toolbarObject.type)
                }}
              />
            </TooltipTrigger>

            <TooltipContent side="top" sideOffset={10}>
              {toolbarObject.tooltip}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
