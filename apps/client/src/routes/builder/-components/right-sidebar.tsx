import { cn } from '~/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { LayersIcon, SlidersHorizontalIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'

type RightSidebarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function RightSidebar({ className, style }: RightSidebarProps) {
  return (
    <Tabs className={cn('size-full overflow-y-auto flex', className)} style={style} defaultValue="properties">
      <div className="flex-1 px-2">
        <TabsContent value="objects">Objects</TabsContent>
        <TabsContent value="properties">Properties</TabsContent>
      </div>

      <TooltipProvider delayDuration={0}>
        <TabsList className="flex-col p-1 h-auto justify-start rounded-none gap-2 bg-transparent border-l">
          <Tooltip>
            <TabsTrigger asChild value="properties" className="data-[state=active]:border">
              <TooltipTrigger>
                <SlidersHorizontalIcon className="size-5" />
              </TooltipTrigger>
            </TabsTrigger>

            <TooltipContent side="left" sideOffset={0.5}>
              Properties
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TabsTrigger asChild value="objects" className="data-[state=active]:border">
              <TooltipTrigger>
                <LayersIcon className="size-5" />
              </TooltipTrigger>
            </TabsTrigger>

            <TooltipContent side="left" sideOffset={0.5}>
              Objects
            </TooltipContent>
          </Tooltip>
        </TabsList>
      </TooltipProvider>
    </Tabs>
  )
}
