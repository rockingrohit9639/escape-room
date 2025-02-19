import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { TOOLS } from '~/lib/toolbar'
import { cn } from '~/lib/utils'

type ToolbarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Toolbar({ className, style }: ToolbarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 border rounded-md fixed bottom-4 left-1/2 -translate-x-1/2 p-1',
        className,
      )}
      style={style}
    >
      <TooltipProvider>
        {TOOLS.map((tool) => (
          <Tooltip key={tool.type}>
            <TooltipTrigger asChild>
              <Button key={tool.type} icon={<tool.icon />} variant="ghost" />
            </TooltipTrigger>

            <TooltipContent>{tool.tooltip}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
